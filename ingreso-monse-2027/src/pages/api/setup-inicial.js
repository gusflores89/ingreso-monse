import { daysUntilExam } from "@/lib/date";
import { requireMethod } from "@/lib/http";
import { parseJsonFromModel } from "@/lib/json";
import { callOpenRouter } from "@/lib/openrouter";
import { MODEL_ANALYZER, SYSTEM_PROMPT_ANALYZER } from "@/lib/prompts";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;

  const {
    nombre = "Abril",
    email,
    fecha_examen = "2027-12-01",
    nivel_inicial = "recien_empieza",
    estilo_aprendizaje = "visual",
    rasgos_especiales = {},
  } = req.body || {};

  try {
    const supabase = getSupabaseAdmin();

    const usuario = assertSupabaseOk(
      await supabase
        .from("usuarios")
        .upsert(
          {
            nombre,
            email: email || null,
            fecha_examen,
            nivel_inicial,
            estilo_aprendizaje,
            rasgos_especiales,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "email" }
        )
        .select()
        .single(),
      "No se pudo guardar el perfil"
    );

    const planInput = JSON.stringify({
      tema_actual: "fracciones_del_resto",
      capa_actual: nivel_inicial === "bien_preparado" ? 3 : 1,
      tasa_acierto: 0,
      sesiones_en_tema: 0,
      modo: "NORMAL",
      dias_falta_examen: daysUntilExam(),
      errores_patrones: {},
      ultimas_3_respuestas: [],
    });

    const planResponse = await callOpenRouter(MODEL_ANALYZER, SYSTEM_PROMPT_ANALYZER, planInput, 700);

    const plan = parseJsonFromModel(planResponse);

    res.status(200).json({ usuario, plan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
