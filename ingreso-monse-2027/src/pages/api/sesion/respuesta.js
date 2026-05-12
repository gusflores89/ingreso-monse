import { daysUntilExam } from "@/lib/date";
import { parseJsonFromModel } from "@/lib/json";
import { callGroq } from "@/lib/groq";
import { maybeCreateAlert, refreshTopicProgress } from "@/lib/progress";
import {
  MODEL_ANALYZER,
  MODEL_TUTOR,
  hydratePrompt,
  SYSTEM_PROMPT_ANALYZER,
  SYSTEM_PROMPT_MONSE,
} from "@/lib/prompts";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireMethod } from "@/lib/http";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;

  const { sesion_id, respuesta_usuario, tiempo_segundos } = req.body || {};

  if (!sesion_id || !respuesta_usuario) {
    return res.status(400).json({ error: "sesion_id y respuesta_usuario son obligatorios." });
  }

  try {
    const supabase = getSupabaseAdmin();

    const sesion = assertSupabaseOk(
      await supabase.from("sesiones").select("*").eq("id", sesion_id).single(),
      "No se pudo obtener la sesion"
    );

    const contexto = sesion.contexto_json || {
      tema: sesion.tema,
      capa: sesion.capa,
      modo: sesion.modo,
    };
    const esLeccion = sesion.tipo_pregunta === "leccion";
    const evaluacionPrompt = esLeccion
      ? `${hydratePrompt(SYSTEM_PROMPT_MONSE, contexto)}

IMPORTANTE: Abril esta respondiendo el ejercicio final de una leccion. Evalua con mucha paciencia.
Si demuestra que entendio la idea central aunque no use palabras perfectas, marca es_correcta true.
Devuelve SOLO JSON con es_correcta, retroalimentacion, razon_error y siguiente_pregunta.`
      : hydratePrompt(SYSTEM_PROMPT_MONSE, contexto);

    const respuestaIa = await callGroq(
      MODEL_TUTOR,
      evaluacionPrompt,
      `Pregunta: ${sesion.pregunta_generada}\nRespuesta de Abril: ${respuesta_usuario}\n\nEvalua y retroalimenta. Devuelve solo JSON valido.`,
      700
    );

    const evaluacion = parseJsonFromModel(respuestaIa);

    assertSupabaseOk(
      await supabase
        .from("sesiones")
        .update({
          respuesta_usuario,
          tiempo_segundos: Number(tiempo_segundos) || null,
          es_correcta: Boolean(evaluacion.es_correcta),
          retroalimentacion_ia: evaluacion.retroalimentacion,
          razon_evaluacion: evaluacion.razon_error || null,
          ia_parametros_usados: {
            ...(sesion.ia_parametros_usados || {}),
            evaluacion: { provider: "groq", model: MODEL_TUTOR, max_tokens: 700 },
          },
        })
        .eq("id", sesion_id),
      "No se pudo guardar la evaluacion"
    );

    if (esLeccion && evaluacion.es_correcta) {
      const leccionResult = await supabase.from("lecciones_completadas").upsert(
        {
          user_id: sesion.user_id,
          tema: sesion.tema,
          leccion_numero: 1,
          completada: true,
          fecha_completada: new Date().toISOString(),
        },
        { onConflict: "user_id,tema,leccion_numero" }
      );

      if (leccionResult.error && !isMissingLessonsTable(leccionResult.error)) {
        throw new Error(`No se pudo marcar la leccion como completada: ${leccionResult.error.message}`);
      }
    }

    const progreso = await refreshTopicProgress(supabase, sesion.user_id, sesion.tema, sesion.capa);

    const ultimas3 = assertSupabaseOk(
      await supabase
        .from("sesiones")
        .select("pregunta_generada, respuesta_usuario, es_correcta, razon_evaluacion, created_at")
        .eq("user_id", sesion.user_id)
        .eq("tema", sesion.tema)
        .not("es_correcta", "is", null)
        .order("created_at", { ascending: false })
        .limit(3),
      "No se pudieron obtener respuestas recientes"
    );

    const analyzerInput = JSON.stringify({
      tema_actual: sesion.tema,
      capa_actual: sesion.capa,
      tasa_acierto: progreso.tasa_acierto,
      sesiones_en_tema: progreso.total_sesiones,
      modo: sesion.modo,
      dias_falta_examen: daysUntilExam(),
      errores_patrones: ultimas3.filter((item) => !item.es_correcta).map((item) => item.razon_evaluacion),
      ultimas_3_respuestas: ultimas3,
    });

    const analyzerResponse = await callGroq(MODEL_ANALYZER, SYSTEM_PROMPT_ANALYZER, analyzerInput, 700);

    const decision = parseJsonFromModel(analyzerResponse);

    assertSupabaseOk(
      await supabase
        .from("sesiones")
        .update({
          proximo_tema_recomendado: decision.proximo_tema || sesion.tema,
          proxima_capa_recomendada: decision.proxima_capa || sesion.capa,
          ia_parametros_usados: {
            ...(sesion.ia_parametros_usados || {}),
            analyzer: { provider: "groq", model: MODEL_ANALYZER, max_tokens: 700, decision },
          },
        })
        .eq("id", sesion_id),
      "No se pudo guardar la decision"
    );

    const alerta = await maybeCreateAlert(supabase, sesion.user_id, decision.alerta);

    res.status(200).json({
      es_correcta: Boolean(evaluacion.es_correcta),
      retroalimentacion: evaluacion.retroalimentacion,
      razon_error: evaluacion.razon_error || null,
      siguiente_pregunta: evaluacion.siguiente_pregunta || null,
      siguiente_accion: decision.proximo_tema
        ? `Siguiente: ${decision.proximo_tema}, Capa ${decision.proxima_capa || sesion.capa}`
        : "Buen trabajo, descansa",
      decision,
      alerta,
      progreso,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

function isMissingLessonsTable(error) {
  return error?.code === "PGRST205" || error?.message?.includes("lecciones_completadas");
}
