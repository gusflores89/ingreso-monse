import { daysUntilExam } from "@/lib/date";
import { CURRICULUM_LENGUA, CURRICULUM_MATEMATICA, getNextTopic, getTopicMeta } from "@/lib/curriculum";
import { parseJsonFromModel } from "@/lib/json";
import { callOpenRouter } from "@/lib/openrouter";
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

    const respuestaIa = await callOpenRouter(
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
            evaluacion: { provider: "openrouter", model: MODEL_TUTOR, max_tokens: 700 },
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

    const practicas = assertSupabaseOk(
      await supabase
        .from("sesiones")
        .select("id, es_correcta")
        .eq("user_id", sesion.user_id)
        .eq("tema", sesion.tema)
        .not("es_correcta", "is", null)
        .neq("tipo_pregunta", "leccion"),
      "No se pudieron obtener practicas del tema"
    );

    const totalPracticas = practicas.length;
    const practicasCorrectas = practicas.filter((item) => item.es_correcta).length;
    const tasaPractica = totalPracticas ? Number(((practicasCorrectas / totalPracticas) * 100).toFixed(2)) : 0;
    const dominoTema = tasaPractica >= 80 && totalPracticas >= 3;

    let decision;

    if (dominoTema) {
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

      const analyzerInput = {
        tema_actual: sesion.tema,
        materia_actual: getTopicMeta(sesion.tema)?.materia || null,
        capa_actual: sesion.capa,
        tasa_acierto: tasaPractica,
        sesiones_en_tema: totalPracticas,
        modo: sesion.modo,
        dias_falta_examen: daysUntilExam(),
        errores_patrones: ultimas3.filter((item) => !item.es_correcta).map((item) => item.razon_evaluacion),
        ultimas_3_respuestas: ultimas3,
        curriculum_matematica: CURRICULUM_MATEMATICA,
        curriculum_lengua: CURRICULUM_LENGUA,
      };
      const deterministicNextTopic = getNextTopic(sesion.tema);

      const analyzerResponse = await callOpenRouter(
        MODEL_ANALYZER,
        SYSTEM_PROMPT_ANALYZER,
        `Abril domino "${sesion.tema}" con ${tasaPractica}% de acierto en ${totalPracticas} practicas. El proximo tema recomendado por el curriculum deterministico es "${deterministicNextTopic}". Usa ese tema salvo que haya una razon pedagogica fuerte para alternar materia. Responde SOLO en JSON. Input: ${JSON.stringify(analyzerInput)}`,
        1024
      );

      decision = parseJsonFromModel(analyzerResponse);
      decision.proximo_tema = decision.proximo_tema || deterministicNextTopic || sesion.tema;
      decision.proxima_capa = decision.proxima_capa || 1;
      decision.razon =
        decision.razon ||
        `Tema dominado: ${tasaPractica}% de acierto en ${totalPracticas} practicas. Pasar al proximo tema.`;
      console.log(`Tema dominado. Cambio a: ${decision.proximo_tema}`);
    } else {
      const nuevaCapa = tasaPractica >= 70 ? Math.min((sesion.capa || 1) + 1, 5) : sesion.capa || 1;

      decision = {
        proximo_tema: sesion.tema,
        proxima_capa: nuevaCapa,
        modo_recomendado: "NORMAL",
        razon: `Continuar practicando "${sesion.tema}". Progreso de practica: ${tasaPractica}% de acierto, ${totalPracticas}/3 practicas minimas necesarias.`,
        alerta: null,
      };

      console.log(`Continuar con mismo tema. Progreso practica: ${tasaPractica}%, ${totalPracticas}/3 practicas`);
    }

    assertSupabaseOk(
      await supabase
        .from("sesiones")
        .update({
          proximo_tema_recomendado: decision.proximo_tema,
          proxima_capa_recomendada: decision.proxima_capa,
          ia_parametros_usados: {
            ...(sesion.ia_parametros_usados || {}),
            progression: {
              domino_tema: dominoTema,
              tasa_practica: tasaPractica,
              total_practicas: totalPracticas,
              decision,
            },
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
      siguiente_accion: `Siguiente: ${decision.proximo_tema}, Capa ${decision.proxima_capa || sesion.capa}`,
      decision,
      alerta,
      progreso,
      dominio: {
        domino_tema: dominoTema,
        tasa_practica: tasaPractica,
        total_practicas: totalPracticas,
        practicas_correctas: practicasCorrectas,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

function isMissingLessonsTable(error) {
  return error?.code === "PGRST205" || error?.message?.includes("lecciones_completadas");
}
