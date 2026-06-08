import { daysUntilExam } from "@/lib/date";
import {
  CURRICULUM_LENGUA,
  CURRICULUM_MATEMATICA,
  getNextTopic,
  getProximoTemaNoCompletado,
  getProximoTemaAlternando,
  getTopicMeta,
} from "@/lib/curriculum";
import { evaluarExamenFinal, getExamenFinal } from "@/lib/examenes-monserrat";
import { parseJsonFromModel } from "@/lib/json";
import { callOpenRouter } from "@/lib/openrouter";
import { maybeCreateAlert, refreshTopicProgress } from "@/lib/progress";
import {
  MODEL_TUTOR,
  buildPromptMonse,
} from "@/lib/prompts";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireMethod } from "@/lib/http";
import { requireAccess } from "@/lib/access";
import { buildAlumnoProfile } from "@/lib/alumno";

import { checkDailyRateLimit } from "@/lib/rateLimit";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

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

    // Validar límite diario de abuso/seguridad para llamadas de IA
    const rateLimit = await checkDailyRateLimit(supabase, sesion.user_id);
    if (!rateLimit.ok) {
      return res.status(429).json({ error: rateLimit.error });
    }

    const contexto = sesion.contexto_json || {
      tema: sesion.tema,
      capa: sesion.capa,
      modo: sesion.modo,
    };
    const usuario = assertSupabaseOk(
      await supabase.from("usuarios").select("*").eq("id", sesion.user_id).single(),
      "No se pudo obtener el usuario"
    );
    const alumno = buildAlumnoProfile(usuario);
    const esLeccion = sesion.tipo_pregunta === "leccion";
    const esExamenFinal = sesion.tipo_pregunta === "examen_final";

    if (esExamenFinal) {
      const examen = getExamenFinal(sesion.tema, sesion.capa) || contexto.examen_final;
      const resultadoExamen = evaluarExamenFinal(examen, respuesta_usuario);
      const retroalimentacion = resultadoExamen.es_correcta
        ? `Examen final aprobado con ${resultadoExamen.puntaje}%. Ahora cambiamos de materia para entrenar de forma equilibrada.`
        : `Todavia no aprobaste el examen final. Puntaje: ${resultadoExamen.puntaje}%. Vamos a reforzar este tema antes de cambiar.`;

      assertSupabaseOk(
        await supabase
          .from("sesiones")
          .update({
            respuesta_usuario,
            tiempo_segundos: Number(tiempo_segundos) || null,
            es_correcta: resultadoExamen.es_correcta,
            retroalimentacion_ia: retroalimentacion,
            razon_evaluacion: JSON.stringify(resultadoExamen.detalle || []),
            ia_parametros_usados: {
              ...(sesion.ia_parametros_usados || {}),
              evaluacion: {
                provider: "deterministic",
                tipo: "examen_final",
                puntaje: resultadoExamen.puntaje,
                detalle: resultadoExamen.detalle,
              },
            },
          })
          .eq("id", sesion_id),
        "No se pudo guardar la evaluacion del examen final"
      );

      const progreso = await refreshTopicProgress(supabase, sesion.user_id, sesion.tema, sesion.capa);
      const proximoTema = resultadoExamen.es_correcta
        ? await getProximoTemaAlternando(supabase, sesion.user_id, sesion.tema)
        : sesion.tema;

      const decision = {
        proximo_tema: proximoTema,
        proxima_capa: resultadoExamen.es_correcta ? 1 : sesion.capa || 1,
        modo_recomendado: "NORMAL",
        razon: resultadoExamen.es_correcta
          ? `Examen final aprobado. Alternar materia hacia "${proximoTema}".`
          : `Reforzar "${sesion.tema}" antes de volver a intentar el examen final.`,
        alerta: null,
      };

      assertSupabaseOk(
        await supabase
          .from("sesiones")
          .update({
            proximo_tema_recomendado: decision.proximo_tema,
            proxima_capa_recomendada: decision.proxima_capa,
          })
          .eq("id", sesion_id),
        "No se pudo guardar la decision del examen final"
      );

      const activeSuggested = usuario.rasgos_especiales?.tema_sugerido;
      if (activeSuggested && !activeSuggested.completado && activeSuggested.tema === sesion.tema && resultadoExamen.es_correcta) {
        const updatedRasgos = {
          ...usuario.rasgos_especiales,
          tema_sugerido: {
            ...activeSuggested,
            completado: true,
            completado_el: new Date().toISOString()
          }
        };
        await supabase
          .from("usuarios")
          .update({
            rasgos_especiales: updatedRasgos,
            updated_at: new Date().toISOString()
          })
          .eq("id", sesion.user_id);
      }

      return res.status(200).json({
        es_correcta: resultadoExamen.es_correcta,
        retroalimentacion,
        razon_error: resultadoExamen.es_correcta ? null : "Examen final no aprobado",
        siguiente_accion: `Siguiente: ${decision.proximo_tema}, Capa ${decision.proxima_capa}`,
        decision,
        progreso,
        examen: {
          puntaje: resultadoExamen.puntaje,
          detalle: resultadoExamen.detalle,
        },
      });
    }

    const evaluacionPrompt = esLeccion
      ? `${buildPromptMonse(alumno, contexto)}

IMPORTANTE: ${alumno.nombre} esta respondiendo el ejercicio final de una leccion. Evalua con mucha paciencia.
Si demuestra que entendio la idea central aunque no use palabras perfectas, marca es_correcta true.
Devuelve SOLO JSON con es_correcta, retroalimentacion, razon_error y siguiente_pregunta.`
      : buildPromptMonse(alumno, contexto);

    const respuestaIa = await callOpenRouter(
      MODEL_TUTOR,
      evaluacionPrompt,
      `Pregunta: ${sesion.pregunta_generada}\nRespuesta de ${alumno.nombre}: ${respuesta_usuario}\n\nEvalua y retroalimenta. Devuelve solo JSON valido.`,
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
        .select("id, es_correcta, created_at")
        .eq("user_id", sesion.user_id)
        .eq("tema", sesion.tema)
        .not("es_correcta", "is", null)
        .neq("tipo_pregunta", "leccion")
        .neq("tipo_pregunta", "examen_final")
        .order("created_at", { ascending: false })
        .limit(5),
      "No se pudieron obtener practicas del tema"
    );

    const totalPracticas = practicas.length;
    const practicasCorrectas = practicas.filter((item) => item.es_correcta).length;
    const tasaPractica = totalPracticas ? Number(((practicasCorrectas / totalPracticas) * 100).toFixed(2)) : 0;
    const dominoTema = tasaPractica >= 80 && totalPracticas >= 3;

    let decision;

    if (dominoTema) {
      decision = {
        proximo_tema: sesion.tema,
        proxima_capa: sesion.capa || 1,
        modo_recomendado: "NORMAL",
        razon: `Practicas dominadas: ${tasaPractica}% de acierto en ${totalPracticas} practicas. Ahora corresponde examen final antes de cambiar de tema.`,
        alerta: null,
      };
      if (process.env.NODE_ENV !== "production") {
        console.debug(`Practicas dominadas. Siguiente paso: examen final de ${sesion.tema}`);
      }
    } else {
      const materiaActual = getTopicMeta(sesion.tema)?.materia;
      const materiaAlternada = materiaActual === "matematica" ? "lengua" : "matematica";
      const temaAlternado = await getProximoTemaNoCompletado(supabase, sesion.user_id, materiaAlternada);

      decision = {
        proximo_tema: temaAlternado,
        proxima_capa: 1,
        modo_recomendado: "NORMAL",
        razon: `Alternar materias para mantener equilibrio. "${sesion.tema}" sigue en progreso (${tasaPractica}% de acierto, ${totalPracticas}/3 practicas minimas). Ahora toca ${materiaAlternada}: "${temaAlternado}".`,
        alerta: null,
      };

      if (process.env.NODE_ENV !== "production") {
        console.debug(
          `Alternar materia: ${sesion.tema} -> ${temaAlternado}. Progreso practica actual: ${tasaPractica}%, ${totalPracticas}/3 practicas`
        );
      }
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

    const activeSuggested = usuario.rasgos_especiales?.tema_sugerido;
    if (activeSuggested && !activeSuggested.completado && activeSuggested.tema === sesion.tema && Boolean(evaluacion.es_correcta)) {
      const updatedRasgos = {
        ...usuario.rasgos_especiales,
        tema_sugerido: {
          ...activeSuggested,
          completado: true,
          completado_el: new Date().toISOString()
        }
      };
      await supabase
        .from("usuarios")
        .update({
          rasgos_especiales: updatedRasgos,
          updated_at: new Date().toISOString()
        })
        .eq("id", sesion.user_id);
    }

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
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

function isMissingLessonsTable(error) {
  return error?.code === "PGRST205" || error?.message?.includes("lecciones_completadas");
}
