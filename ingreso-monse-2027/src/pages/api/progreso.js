import { requireMethod } from "@/lib/http";
import { callOpenRouter } from "@/lib/openrouter";
import { MODEL_DASHBOARD, SYSTEM_PROMPT_DASHBOARD_IA } from "@/lib/prompts";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "GET")) return;

  const userId = req.query.user_id;
  if (!userId) return res.status(400).json({ error: "user_id es obligatorio." });

  try {
    const supabase = getSupabaseAdmin();

    const usuario = assertSupabaseOk(
      await supabase.from("usuarios").select("*").eq("id", userId).single(),
      "No se pudo obtener usuario"
    );

    const progreso = assertSupabaseOk(
      await supabase.from("progreso").select("*").eq("user_id", userId).order("updated_at", { ascending: false }),
      "No se pudo obtener progreso"
    );

    const alertas = assertSupabaseOk(
      await supabase
        .from("alertas")
        .select("*")
        .eq("user_id", userId)
        .eq("resuelta", false)
        .order("created_at", { ascending: false }),
      "No se pudieron obtener alertas"
    );

    const sesiones = assertSupabaseOk(
      await supabase
        .from("sesiones")
        .select("tema, es_correcta, razon_evaluacion, created_at")
        .eq("user_id", userId)
        .not("es_correcta", "is", null)
        .order("created_at", { ascending: false })
        .limit(30),
      "No se pudieron obtener sesiones recientes"
    );

    const evaluadas = sesiones.length;
    const correctas = sesiones.filter((sesion) => sesion.es_correcta).length;
    const insightInput = {
      semana: "ultimos registros",
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

    let insightMarkdown = "";
    let insightError = null;

    try {
      insightMarkdown = await callOpenRouter(
        MODEL_DASHBOARD,
        SYSTEM_PROMPT_DASHBOARD_IA,
        JSON.stringify(insightInput),
        900
      );
    } catch (error) {
      console.error(error);
      insightError = error.message;
    }

    res.status(200).json({
      usuario,
      progreso,
      alertas,
      sesiones_recientes: sesiones,
      insight_markdown: insightMarkdown,
      insight_error: insightError,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
