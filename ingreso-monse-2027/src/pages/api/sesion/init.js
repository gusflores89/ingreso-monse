import { daysUntilExam } from "@/lib/date";
import { parseJsonFromModel } from "@/lib/json";
import { callGroq } from "@/lib/groq";
import { MODEL_TUTOR, hydratePrompt, SYSTEM_PROMPT_MONSE } from "@/lib/prompts";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireMethod } from "@/lib/http";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;

  const { user_id, tema, capa = 1, modo = "NORMAL", tiempo_disponible_sesion = 25 } = req.body || {};

  if (!user_id || !tema) {
    return res.status(400).json({ error: "user_id y tema son obligatorios." });
  }

  try {
    const supabase = getSupabaseAdmin();

    const usuario = assertSupabaseOk(
      await supabase.from("usuarios").select("*").eq("id", user_id).single(),
      "No se pudo obtener el usuario"
    );

    const progresoResult = await supabase
      .from("progreso")
      .select("*")
      .eq("user_id", user_id)
      .eq("tema", tema)
      .maybeSingle();

    if (progresoResult.error) throw new Error(`No se pudo obtener progreso: ${progresoResult.error.message}`);
    const progreso = progresoResult.data;

    const contexto = {
      tema,
      capa: Number(capa),
      modo,
      estilo_aprendizaje: usuario.estilo_aprendizaje || "visual",
      tasa_acierto: progreso?.tasa_acierto || 0,
      errores_patrones_json: {},
      racha: 0,
      dias_falta_examen: daysUntilExam(),
    };

    const respuestaIa = await callGroq(
      MODEL_TUTOR,
      hydratePrompt(SYSTEM_PROMPT_MONSE, contexto),
      "Genera una pregunta para Abril ahora. Devuelve solo JSON valido.",
      1024
    );

    const preguntaJson = parseJsonFromModel(respuestaIa);

    const sesion = assertSupabaseOk(
      await supabase
        .from("sesiones")
        .insert({
          user_id,
          tema,
          capa: Number(capa),
          tipo_pregunta: preguntaJson.tipo,
          pregunta_generada: preguntaJson.pregunta,
          contexto_json: contexto,
          modo,
          ia_parametros_usados: {
            provider: "groq",
            model: MODEL_TUTOR,
            max_tokens: 1024,
            endpoint: "/api/sesion/init",
          },
        })
        .select()
        .single(),
      "No se pudo crear la sesion"
    );

    await supabase.from("parametros_sesion").insert({
      sesion_id: sesion.id,
      capa: Number(capa),
      modo,
      estilo_aprendizaje: contexto.estilo_aprendizaje,
      errores_patrones: contexto.errores_patrones_json,
      fortalezas: {},
      racha_actual: contexto.racha,
      dias_sin_tema: 0,
      tasa_acierto_ultimo: contexto.tasa_acierto,
      tiempo_disponible_sesion,
    });

    res.status(200).json({
      sesion_id: sesion.id,
      pregunta: preguntaJson.pregunta,
      tipo: preguntaJson.tipo,
      opciones: preguntaJson.opciones || null,
      indicaciones_visuales: preguntaJson.indicaciones_visuales || null,
      tiempo_estimado: preguntaJson.tiempo_estimado || 5,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
