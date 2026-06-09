import { daysUntilExam } from "@/lib/date";
import { DEFAULT_TOPIC, getProximoTemaNoCompletado, getTopicMeta, isCurriculumTopic, CURRICULUM_MATEMATICA, CURRICULUM_LENGUA } from "@/lib/curriculum";
import { getCasoResuelto, getMetodoPasoAPaso } from "@/lib/casos-resueltos";
import { getTareaManuscrita } from "@/lib/ejercicios-manuscritos";
import { getExamenFinal } from "@/lib/examenes-monserrat";
import { parseJsonFromModel } from "@/lib/json";
import { callOpenRouter } from "@/lib/openrouter";
import { MODEL_TUTOR, buildPromptPractice, buildPromptTeacher } from "@/lib/prompts";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireMethod } from "@/lib/http";
import { requireAccess } from "@/lib/access";
import { buildAlumnoProfile } from "@/lib/alumno";
import { getDefaultTopicForPlan, getTrialLimitPayload, getUserPlan, TRIAL_TOPICS } from "@/lib/planes";
import {
  crearTareaManuscrita,
  getTareaManuscritaActiva,
  isMissingHandwritingTable,
  tareaToResponse,
} from "@/lib/tareas-manuscritas";

import { checkDailyRateLimit } from "@/lib/rateLimit";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const {
    user_id,
    tema,
    capa = null,
    modo = "NORMAL",
    tiempo_disponible_sesion = 25,
    omitir_caso_resuelto = false,
    tutor_preference = null,
  } = req.body || {};

  if (!user_id) {
    return res.status(400).json({ error: "user_id es obligatorio." });
  }

  try {
    const supabase = getSupabaseAdmin();

    // Validar límite diario de abuso/seguridad para llamadas de IA
    const rateLimit = await checkDailyRateLimit(supabase, user_id);
    if (!rateLimit.ok) {
      return res.status(429).json({ error: rateLimit.error });
    }

    const usuario = assertSupabaseOk(
      await supabase.from("usuarios").select("*").eq("id", user_id).single(),
      "No se pudo obtener el usuario"
    );

    // Si no se especificó un tema en la petición, y hay una sugerencia activa del padre, priorizarla
    const activeSuggested = usuario.rasgos_especiales?.tema_sugerido;
    const hasActiveSugerencia = activeSuggested && !activeSuggested.completado && isCurriculumTopic(activeSuggested.tema);

    const reingreso = isCurriculumTopic(tema)
      ? { tema, capa: capa ? Number(capa) : null }
      : hasActiveSugerencia
        ? { tema: activeSuggested.tema, capa: null }
        : await resolverTemaDeReingreso(supabase, user_id);
    let temaActual = reingreso.tema;

    const resolvedPlan = getUserPlan(usuario);
    const unlockedTopicsSet = await getUnlockedTopics(supabase, user_id, resolvedPlan);

    if (!unlockedTopicsSet.has(temaActual)) {
      const curriculum = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA];
      const { data: approvedData } = await supabase
        .from("sesiones")
        .select("tema")
        .eq("user_id", user_id)
        .eq("tipo_pregunta", "examen_final")
        .eq("es_correcta", true);
      const approvedSet = new Set((approvedData || []).map(s => s.tema));
      
      const sortedCurriculum = [...curriculum].sort((a, b) => {
        if (a.fase !== b.fase) return a.fase - b.fase;
        return a.orden - b.orden;
      });
      
      const fallbackTopic = sortedCurriculum.find(t => unlockedTopicsSet.has(t.tema) && !approvedSet.has(t.tema));
      if (fallbackTopic) {
        temaActual = fallbackTopic.tema;
      } else {
        const firstUnlocked = sortedCurriculum.find(t => unlockedTopicsSet.has(t.tema));
        if (firstUnlocked) {
          temaActual = firstUnlocked.tema;
        }
      }
    }

    let capaActual = Number(reingreso.capa) || (capa ? Number(capa) : null);
    if (!capaActual || capaActual <= 0) {
      const { data: progresoData } = await supabase
        .from("progreso")
        .select("capa_actual")
        .eq("user_id", user_id)
        .eq("tema", temaActual)
        .maybeSingle();

      if (progresoData?.capa_actual) {
        capaActual = Number(progresoData.capa_actual);
      } else {
        const edad = usuario.edad ? Number(usuario.edad) : 10;
        const grado = usuario.grado || "5to";
        const rasgos = usuario.rasgos_especiales || {};
        capaActual = calcularCapaInicial(edad, grado, rasgos);
      }
    }
    const tutorOverrides = normalizeTutorPreference(tutor_preference);
    const usuarioConTutor = { ...usuario, ...tutorOverrides };
    const alumno = buildAlumnoProfile(usuarioConTutor);
    const tutor = getTutorPayload(usuarioConTutor);
    const plan = getUserPlan(usuario);
    temaActual = getDefaultTopicForPlan(usuario, temaActual);
    const planPayload = plan === "trial" ? getTrialLimitPayload() : { plan };

    // Si es plan trial, verificar si completó todos los temas de prueba
    if (plan === "trial") {
      const examenesAprobados = await Promise.all(
        TRIAL_TOPICS.map((t) => hasApprovedFinalExam(supabase, user_id, t))
      );
      const todosAprobados = examenesAprobados.every(Boolean);

      if (todosAprobados) {
        return res.status(200).json({
          sesion_id: null,
          tipo: "trial_completado",
          tipo_pregunta: "trial_completado",
          tema: temaActual,
          capa: capaActual,
          ...tutor,
          ...planPayload,
          tiempo_estimado: 0,
        });
      }
    }

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
      dias_falta_examen: daysUntilExam(new Date(), usuario.fecha_examen),
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
          ...tutor,
          ...planPayload,
          metodo: getMetodoPasoAPaso(),
          caso,
          tiempo_estimado: 8,
        });
      }
    }

    if (modoSesion === "practica") {
      const examenResponse = await maybeCrearExamenFinal(supabase, user_id, temaActual, capaActual, modo, contexto);
      if (examenResponse) {
        return res.status(200).json({ ...examenResponse, ...tutor, ...planPayload });
      }
    }

    if (modoSesion === "practica") {
      const tareaResponse = await maybeAsignarTareaManuscrita(supabase, user_id, temaActual);
      if (tareaResponse) {
        return res.status(200).json({ ...tareaResponse, ...tutor, ...planPayload });
      }
    }

    const preguntasRecientes = await getPreguntasRecientes(supabase, user_id, temaActual);
    const systemPrompt =
      modoSesion === "leccion"
        ? buildPromptTeacher(alumno, { ...contexto, preguntas_recientes: JSON.stringify(preguntasRecientes) })
        : buildPromptPractice(alumno, { ...contexto, preguntas_recientes: JSON.stringify(preguntasRecientes) });
    const isSpelling = temaActual.startsWith("ortografia_");
    const spellingSpecificPrompt = isSpelling
      ? `\n- Como el tema es de ortografía (${temaActual}), genera una historia breve (un párrafo de unas 100 palabras) e incluye exactamente 3 errores ortográficos relacionados con la regla (por ejemplo, si es ortografía B/V, escribe con B palabras que van con V o viceversa). Asegurate de variar las palabras y no repetir las mismas palabras que fueron probadas en las historias anteriores de la lista. Varía los personajes y contextos.`
      : "";

    const userInstruction =
      modoSesion === "leccion"
        ? `Ensena este tema a ${alumno.nombre} por primera vez. Responde SOLO en JSON.`
        : `Genera un ejercicio de practica. Responde SOLO en JSON.

Tema actual: ${temaActual}
Capa actual: ${capaActual}
Preguntas recientes que NO debes repetir ni espejar:
${preguntasRecientes.map((pregunta, index) => `${index + 1}. ${pregunta}`).join("\n") || "Ninguna"}

IMPORTANTE:
- No repitas los mismos numeros de las preguntas recientes.
- No hagas la misma cuenta al reves.
- Si es multiplicacion, cambia contexto y factores dentro del tema.
- Si el tema es tablas_multiplicar_2_5, usa solo tablas del 2 al 5.${spellingSpecificPrompt}`;

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
      ...tutor,
      ...planPayload,
      opciones: preguntaJson.opciones || null,
      indicaciones_visuales: preguntaJson.indicaciones_visuales || null,
      tiempo_estimado: preguntaJson.tiempo_estimado || 5,
      tema_sugerido: usuario.rasgos_especiales?.tema_sugerido || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

function isMissingLessonsTable(error) {
  return error?.code === "PGRST205" || error?.message?.includes("lecciones_completadas");
}

function getTutorPayload(usuario = {}) {
  const avatar = isValidAvatar(usuario.avatar) ? usuario.avatar : "buho";
  return {
    avatar,
    nombre_tutor: usuario.nombre_tutor || tutorNameForAvatar(avatar),
    color_tema: isValidHexColor(usuario.color_tema) ? usuario.color_tema : colorForAvatar(avatar),
    avatar_imagen: `/avatars/${avatar}.png`,
  };
}

function normalizeTutorPreference(preference) {
  if (!preference || typeof preference !== "object") return {};
  const avatar = isValidAvatar(preference.avatar) ? preference.avatar : null;
  if (!avatar) return {};

  return {
    avatar,
    nombre_tutor: preference.nombre_tutor || tutorNameForAvatar(avatar),
    color_tema: isValidHexColor(preference.color_tema) ? preference.color_tema : colorForAvatar(avatar),
  };
}

function isValidAvatar(avatar) {
  return ["atenea", "nyx", "lux", "buho"].includes(avatar);
}

function isValidHexColor(color) {
  return /^#[0-9a-f]{6}$/i.test(String(color || ""));
}

function tutorNameForAvatar(avatar) {
  return { atenea: "Atenea", nyx: "Nyx", lux: "Lux", buho: "Buho" }[avatar] || "Buho";
}

function colorForAvatar(avatar) {
  return { atenea: "#7F77DD", nyx: "#378ADD", lux: "#1D9E75", buho: "#D85A30" }[avatar] || "#D85A30";
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
    tema,
    tipo: "examen_final",
    tipo_pregunta: "examen_final",
    tiempo_estimado: examen.tiempo_estimado || 20,
  };
}

async function getPracticasEvaluadas(supabase, userId, tema) {
  const result = await supabase
    .from("sesiones")
    .select("id, es_correcta, tipo_pregunta, created_at")
    .eq("user_id", userId)
    .eq("tema", tema)
    .not("es_correcta", "is", null)
    .neq("tipo_pregunta", "leccion")
    .neq("tipo_pregunta", "examen_final")
    .order("created_at", { ascending: false })
    .limit(5);

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
    `Sos Profe, generadora de examenes finales estilo ingreso Monserrat. Crea un examen final breve y exigente para el perfil del alumno. Responde SOLO JSON valido.`,
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

function calcularCapaInicial(edad, grado, rasgos) {
  let capa = 1;
  if (edad >= 11 && grado === "6to") capa = 3;
  else if (edad >= 10) capa = 2;
  if (rasgos?.dislexia) capa = Math.max(1, capa - 1);
  return capa;
}

async function getUnlockedTopics(supabase, userId, plan) {
  const { data, error } = await supabase
    .from("sesiones")
    .select("tema")
    .eq("user_id", userId)
    .eq("tipo_pregunta", "examen_final")
    .eq("es_correcta", true);
  
  if (error) throw new Error("No se pudieron obtener temas completados");
  
  const approvedExams = new Set((data || []).map(s => s.tema));
  
  const topicsFase1 = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => t.fase === 1);
  const topicsFase2 = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => t.fase === 2);
  const topicsFase3 = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => t.fase === 3);
  const topicsFase4 = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => t.fase === 4);

  const approvedFase1 = topicsFase1.filter(t => approvedExams.has(t.tema)).length;
  const approvedFase2 = topicsFase2.filter(t => approvedExams.has(t.tema)).length;
  const approvedFase3 = topicsFase3.filter(t => approvedExams.has(t.tema)).length;
  const approvedFase4 = topicsFase4.filter(t => approvedExams.has(t.tema)).length;

  const unlockedFase1 = true;
  const unlockedFase2 = approvedFase1 >= 6;
  const unlockedFase3 = unlockedFase2 && approvedFase2 >= 4;
  const unlockedFase4 = unlockedFase3 && approvedFase3 >= 4;
  const unlockedFase5 = unlockedFase4 && approvedFase4 >= 10;

  const isPhaseUnlocked = (fase) => {
    if (fase === 1) return unlockedFase1;
    if (fase === 2) return unlockedFase2;
    if (fase === 3) return unlockedFase3;
    if (fase === 4) return unlockedFase4;
    if (fase === 5) return unlockedFase5;
    return false;
  };

  const isTrial = plan === "trial";
  const curriculum = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA];
  
  return new Set(
    curriculum
      .filter(t => {
        if (isTrial) {
          const TRIAL_TOPICS = ["tablas_multiplicar_2_5", "division_1_digito", "fracciones_concepto", "ortografia_b_v"];
          return TRIAL_TOPICS.includes(t.tema);
        }
        return isPhaseUnlocked(t.fase);
      })
      .map(t => t.tema)
  );
}
