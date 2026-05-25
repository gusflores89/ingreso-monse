import { getWeekRange } from "@/lib/date";
import { callOpenRouter } from "@/lib/openrouter";
import { MODEL_DASHBOARD, buildPromptDashboard } from "@/lib/prompts";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireMethod } from "@/lib/http";
import { buildAlumnoProfile } from "@/lib/alumno";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;

  const { user_id } = req.body || {};
  if (!user_id) return res.status(400).json({ error: "user_id es obligatorio." });

  try {
    const supabase = getSupabaseAdmin();
    const week = getWeekRange();

    const usuario = assertSupabaseOk(
      await supabase.from("usuarios").select("*").eq("id", user_id).single(),
      "No se pudo obtener usuario"
    );
    const alumno = buildAlumnoProfile(usuario);

    const sesiones = assertSupabaseOk(
      await supabase
        .from("sesiones")
        .select("*")
        .eq("user_id", user_id)
        .gte("created_at", `${week.start}T00:00:00`)
        .lte("created_at", `${week.end}T23:59:59`),
      "No se pudieron obtener sesiones"
    );

    const alertas = assertSupabaseOk(
      await supabase
        .from("alertas")
        .select("*")
        .eq("user_id", user_id)
        .gte("created_at", `${week.start}T00:00:00`),
      "No se pudieron obtener alertas"
    );

    const correctas = sesiones.filter((sesion) => sesion.es_correcta).length;
    const evaluadas = sesiones.filter((sesion) => sesion.es_correcta !== null).length;

    const weeklyInput = {
      semana: `${week.start} a ${week.end}`,
      sesiones_completadas: evaluadas,
      temas_trabajados: [...new Set(sesiones.map((sesion) => sesion.tema))],
      tasa_promedio: evaluadas ? Math.round((correctas / evaluadas) * 100) : 0,
      distribucion_errores: sesiones
        .filter((sesion) => sesion.razon_evaluacion)
        .reduce((acc, sesion) => {
          acc[sesion.tema] = acc[sesion.tema] || [];
          acc[sesion.tema].push(sesion.razon_evaluacion);
          return acc;
        }, {}),
      racha_maxima: 0,
      alertas_generadas: alertas,
    };

    const markdown = await callOpenRouter(MODEL_DASHBOARD, buildPromptDashboard(alumno, {}), JSON.stringify(weeklyInput), 1800);

    const reporte = assertSupabaseOk(
      await supabase
        .from("reportes_semanales")
        .insert({
          user_id,
          semana_inicio: week.start,
          semana_fin: week.end,
          markdown_contenido: markdown,
        })
        .select()
        .single(),
      "No se pudo guardar el reporte"
    );

    res.status(200).json({ reporte, markdown });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
