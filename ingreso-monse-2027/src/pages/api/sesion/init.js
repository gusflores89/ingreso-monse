import { daysUntilExam } from "@/lib/date";
import { DEFAULT_TOPIC, getProximoTemaNoCompletado, getTopicMeta, isCurriculumTopic } from "@/lib/curriculum";
import { getCasoResuelto, getMetodoPasoAPaso } from "@/lib/casos-resueltos";
import { getTareaManuscrita } from "@/lib/ejercicios-manuscritos";
import { getExamenFinal } from "@/lib/examenes-monserrat";
import { parseJsonFromModel } from "@/lib/json";
import { callOpenRouter } from "@/lib/openrouter";
import { MODEL_TUTOR, hydratePrompt, SYSTEM_PROMPT_PRACTICE, SYSTEM_PROMPT_TEACHER } from "@/lib/prompts";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireMethod } from "@/lib/http";
import { requireAccess } from "@/lib/access";
import {
  crearTareaManuscrita,
  getTareaManuscritaActiva,
  isMissingHandwritingTable,
  tareaToResponse,
} from "@/lib/tareas-manuscritas";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const { user_id, tema, capa = 1, modo = "NORMAL", tiempo_disponible_sesion = 25, omitir_caso_resuelto = false } =
    req.body || {};

  if (!user_id) {
    return res.status(400).json({ error: "user_id es obligatorio." });
  }

  try {
    const supabase = getSupabaseAdmin();
    const reingreso = isCurriculumTopic(tema)
      ? { tema, capa: Number(capa) }
      : await resolverTemaDeReingreso(supabase, user_id);
    const temaActual = reingreso.tema;
    const capaActual = Number(reingreso.capa) || Number(capa) || 1;

    const usuario = assertSupabaseOk(
      await supabase.from("usuarios").select("*").eq("id", user_id).single(),
      "No se pudo obtener el usuario"
    );

    const progresoResult = await supabase
      .from("progreso")
      .select("*")
      .eq("user_id", user_id)
      .eq("tema", temaActual)
      .maybeSingle();

    if (progresoResult.error) throw new Error(`No se pudo obtener progreso: ${progresoResult.error.message}`);
    const progreso = progresoResult.data;

    const contexto = {
      tema: temaActual,
      capa: capaActual,
      modo,
      estilo_aprendizaje: usuario.estilo_aprendizaje || "visual",
      tasa_acierto: progreso?.tasa_acierto || 0,
      sesiones_en_tema: progreso?.total_sesiones || 0,
      errores_patrones_json: {},
      racha: 0,
      dias_falta_examen: daysUntilExam(),
    };

    const leccionResult = await supabase
      .from("lecciones_completadas")
      .select("*")
      .eq("user_id", user_id)
      .eq("tema", temaActual)
      .eq("leccion_numero", 1)
      .maybeSingle();

    if (leccionResult.error && !isMissingLessonsTable(leccionResult.error)) {
      throw new Error(`No se pudo obtener la leccion: ${leccionResult.error.message}`);
    }

    const leccion = leccionResult.data;
    const modoSesion = leccion?.completada ? "practica" : "leccion";

    if (modoSesion === "practica" && !omitir_caso_resuelto) {
      const practicasIniciadas = await getPracticasIniciadas(supabase, user_id, temaActual);
      const caso = practicasIniciadas.length === 0 ? getCasoResuelto(temaActual, capaActual) : null;

      if (caso) {
        return res.status(200).json({
          sesion_id: null,
          tipo: "caso_resuelto",
          tipo_pregunta: "caso_resuelto",
          tema: temaActual,
          capa: capaActual,
          metodo: getMetodoPasoAPaso(),
          caso,
          tiempo_estimado: 8,
        });
      }
    }

    if (modoSesion === "practica") {
      const examenResponse = await maybeCrearExamenFinal(supabase, user_id, temaActual, capaActual, modo, contexto);
      if (examenResponse) {
        return res.status(200).json(examenResponse);
      }
    }

    if (modoSesion === "practica") {
      const tareaResponse = await maybeAsignarTareaManuscrita(supabase, user_id, temaActual);
      if (tareaResponse) {
        return res.status(200).json(tareaResponse);
      }
    }

    const preguntasRecientes = await getPreguntasRecientes(supabase, user_id, temaActual);
    const systemPrompt = hydratePrompt(
      modoSesion === "leccion" ? SYSTEM_PROMPT_TEACHER : SYSTEM_PROMPT_PRACTICE,
      { ...contexto, preguntas_recientes: JSON.stringify(preguntasRecientes) }
    );
    const userInstruction =
      modoSesion === "leccion"
        ? "Ensena este tema a Abril por primera vez. Responde SOLO en JSON."
        : `Genera un ejercicio de practica. Responde SOLO en JSON.

Tema actual: ${temaActual}
Capa actual: ${capaActual}
Preguntas recientes que NO debes repetir ni espejar:
${preguntasRecientes.map((pregunta, index) => `${index + 1}. ${pregunta}`).join("\n") || "Ninguna"}

IMPORTANTE:
- No repitas los mismos numeros de las preguntas recientes.
- No hagas la misma cuenta al reves.
- Si es multiplicacion, cambia contexto y factores dentro del tema.
- Si el tema es tablas_multiplicar_2_5, usa solo tablas del 2 al 5.`;

    const respuestaIa = await callOpenRouter(
      MODEL_TUTOR,
      systemPrompt,
      userInstruction,
      modoSesion === "leccion" ? 3200 : 1024
    );

    const preguntaJson = parseJsonFromModel(respuestaIa);
    const preguntaGenerada =
      modoSesion === "leccion" ? preguntaJson.ejercicio_practica?.enunciado : preguntaJson.pregunta;
    const tipoPregunta =
      modoSesion === "leccion" ? "leccion" : preguntaJson.tipo_pregunta || preguntaJson.tipo || "produccion";

    if (!preguntaGenerada) {
      throw new Error("La IA no devolvio una pregunta o ejercicio valido.");
    }

    const sesion = assertSupabaseOk(
      await supabase
        .from("sesiones")
        .insert({
          user_id,
          tema: temaActual,
          capa: capaActual,
          tipo_pregunta: tipoPregunta,
          pregunta_generada: preguntaGenerada,
          contexto_json: contexto,
          modo,
          ia_parametros_usados: {
            provider: "openrouter",
            model: MODEL_TUTOR,
            max_tokens: modoSesion === "leccion" ? 3200 : 1024,
            endpoint: "/api/sesion/init",
            modo_sesion: modoSesion,
          },
        })
        .select()
        .single(),
      "No se pudo crear la sesion"
    );

    await supabase.from("parametros_sesion").insert({
      sesion_id: sesion.id,
      capa: capaActual,
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
      ...preguntaJson,
      pregunta: preguntaGenerada,
      tema: temaActual,
      tipo: modoSesion,
      tipo_pregunta: tipoPregunta,
      opciones: preguntaJson.opciones || null,
      indicaciones_visuales: preguntaJson.indicaciones_visuales || null,
      tiempo_estimado: preguntaJson.tiempo_estimado || 5,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

function isMissingLessonsTable(error) {
  return error?.code === "PGRST205" || error?.message?.includes("lecciones_completadas");
}

async function resolverTemaDeReingreso(supabase, userId) {
  const lastRecommended = await supabase
    .from("sesiones")
    .select("proximo_tema_recomendado, proxima_capa_recomendada, created_at")
    .eq("user_id", userId)
    .not("proximo_tema_recomendado", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastRecommended.error) {
    throw new Error(`No se pudo resolver el tema de reingreso: ${lastRecommended.error.message}`);
  }

  if (isCurriculumTopic(lastRecommended.data?.proximo_tema_recomendado)) {
    const recommendedTopic = lastRecommended.data.proximo_tema_recomendado;
    const alreadyApproved = await hasApprovedFinalExam(supabase, userId, recommendedTopic);

    if (alreadyApproved) {
      const materia = getTopicMeta(recommendedTopic)?.materia;
      const nextMateria = materia === "matematica" ? "lengua" : "matematica";
      return {
        tema: await getProximoTemaNoCompletado(supabase, userId, nextMateria),
        capa: 1,
      };
    }

    return {
      tema: recommendedTopic,
      capa: lastRecommended.data.proxima_capa_recomendada || 1,
    };
  }

  const lastSession = await supabase
    .from("sesiones")
    .select("tema, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastSession.error) {
    throw new Error(`No se pudo obtener la ultima sesion: ${lastSession.error.message}`);
  }

  return {
    tema: isCurriculumTopic(lastSession.data?.tema) ? lastSession.data.tema : DEFAULT_TOPIC,
    capa: 1,
  };
}

async function hasApprovedFinalExam(supabase, userId, tema) {
  const result = await supabase
    .from("sesiones")
    .select("id")
    .eq("user_id", userId)
    .eq("tema", tema)
    .eq("tipo_pregunta", "examen_final")
    .eq("es_correcta", true)
    .limit(1);

  if (result.error) {
    throw new Error(`No se pudo verificar examen aprobado: ${result.error.message}`);
  }

  return (result.data || []).length > 0;
}

async function getPreguntasRecientes(supabase, userId, tema) {
  const result = await supabase
    .from("sesiones")
    .select("pregunta_generada")
    .eq("user_id", userId)
    .eq("tema", tema)
    .not("pregunta_generada", "is", null)
    .order("created_at", { ascending: false })
    .limit(8);

  if (result.error) {
    throw new Error(`No se pudieron obtener preguntas recientes: ${result.error.message}`);
  }

  return (result.data || []).map((item) => item.pregunta_generada).filter(Boolean);
}

async function maybeAsignarTareaManuscrita(supabase, userId, tema) {
  const topic = getTopicMeta(tema);
  const ejercicio = getTareaManuscrita(tema);

  if (topic?.materia !== "lengua" || !ejercicio) return null;

  const tareaActiva = await getTareaManuscritaActiva(supabase, userId, tema);
  if (tareaActiva?.estado === "pendiente") return tareaToResponse(tareaActiva);
  if (tareaActiva) return null;

  const practicasResult = await supabase
    .from("sesiones")
    .select("id")
    .eq("user_id", userId)
    .eq("tema", tema)
    .not("es_correcta", "is", null)
    .neq("tipo_pregunta", "leccion");

  if (practicasResult.error) {
    throw new Error(`No se pudieron contar practicas del tema: ${practicasResult.error.message}`);
  }

  if ((practicasResult.data?.length || 0) < 2) return null;

  try {
    const nuevaTarea = await crearTareaManuscrita(supabase, userId, tema, ejercicio);
    return nuevaTarea ? tareaToResponse(nuevaTarea) : null;
  } catch (error) {
    if (isMissingHandwritingTable(error)) return null;
    throw error;
  }
}

async function maybeCrearExamenFinal(supabase, userId, tema, capa, modo, contexto) {
  const practicas = await getPracticasEvaluadas(supabase, userId, tema);
  const totalPracticas = practicas.length;
  const correctas = practicas.filter((item) => item.es_correcta).length;
  const tasaPractica = totalPracticas ? (correctas / totalPracticas) * 100 : 0;

  if (totalPracticas < 3 || tasaPractica < 80) return null;

  const examenAprobadoResult = await supabase
    .from("sesiones")
    .select("id")
    .eq("user_id", userId)
    .eq("tema", tema)
    .eq("tipo_pregunta", "examen_final")
    .eq("es_correcta", true)
    .limit(1);

  if (examenAprobadoResult.error) {
    throw new Error(`No se pudo verificar examen final aprobado: ${examenAprobadoResult.error.message}`);
  }

  if ((examenAprobadoResult.data || []).length > 0) return null;

  const examenDefinido = getExamenFinal(tema, capa);
  const examen = examenDefinido || (await generarExamenFinalConIa(tema, capa, contexto));

  const sesion = assertSupabaseOk(
    await supabase
      .from("sesiones")
      .insert({
        user_id: userId,
        tema,
        capa,
        tipo_pregunta: "examen_final",
        pregunta_generada: examen.enunciado,
        contexto_json: { ...contexto, examen_final: examen },
        modo,
        ia_parametros_usados: {
          provider: examenDefinido ? "static" : "openrouter",
          model: examenDefinido ? null : MODEL_TUTOR,
          endpoint: "/api/sesion/init",
          modo_sesion: "examen_final",
        },
      })
      .select()
      .single(),
    "No se pudo crear el examen final"
  );

  return {
    sesion_id: sesion.id,
    ...examen,
    pregunta: examen.enunciado,
    tipo: "examen_final",
    tipo_pregunta: "examen_final",
    tiempo_estimado: examen.tiempo_estimado || 20,
  };
}

async function getPracticasEvaluadas(supabase, userId, tema) {
  const result = await supabase
    .from("sesiones")
    .select("id, es_correcta, tipo_pregunta")
    .eq("user_id", userId)
    .eq("tema", tema)
    .not("es_correcta", "is", null)
    .neq("tipo_pregunta", "leccion")
    .neq("tipo_pregunta", "examen_final");

  if (result.error) {
    throw new Error(`No se pudieron contar practicas del tema: ${result.error.message}`);
  }

  return result.data || [];
}

async function getPracticasIniciadas(supabase, userId, tema) {
  const result = await supabase
    .from("sesiones")
    .select("id, tipo_pregunta")
    .eq("user_id", userId)
    .eq("tema", tema)
    .neq("tipo_pregunta", "leccion")
    .neq("tipo_pregunta", "examen_final")
    .neq("tipo_pregunta", "caso_resuelto");

  if (result.error) {
    throw new Error(`No se pudieron contar practicas iniciadas: ${result.error.message}`);
  }

  return result.data || [];
}

async function generarExamenFinalConIa(tema, capa, contexto) {
  const respuesta = await callOpenRouter(
    MODEL_TUTOR,
    `Eres Monse, generadora de examenes finales estilo ingreso Monserrat. Crea un examen final breve y exigente para una estudiante de 11 anos. Responde SOLO JSON valido.`,
    `Tema: ${tema}
Capa: ${capa}
Contexto: ${JSON.stringify(contexto)}

Genera un JSON con esta forma:
{
  "tipo": "examen_final",
  "dificultad": "monserrat",
  "instrucciones": "Necesitas 70% o mas para aprobar.",
  "enunciado": "consigna completa",
  "preguntas": [
    {"id":"a","texto":"...","respuesta_correcta":"...","alternativas_aceptables":["..."]},
    {"id":"b","texto":"...","respuesta_correcta":"...","alternativas_aceptables":["..."]},
    {"id":"c","texto":"...","respuesta_correcta":"...","alternativas_aceptables":["..."]}
  ]
}`,
    1400
  );

  const examen = parseJsonFromModel(respuesta);
  if (!examen.enunciado || !Array.isArray(examen.preguntas) || examen.preguntas.length === 0) {
    throw new Error("La IA no devolvio un examen final valido.");
  }

  return {
    tipo: "examen_final",
    dificultad: "monserrat",
    instrucciones: "Necesitas 70% o mas para aprobar.",
    ...examen,
  };
}
