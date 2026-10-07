import { temasHabilitados } from "@/lib/acceso-temas";
import { exigirLectura } from '@/lib/fichas-lectura';
import { TEMAS_BASES_MATEMATICA } from "@/lib/metadatos-bases";
import { VERSION_BASES, getUnidadBase, crearActividadBase, getCierreBase, esCierreActual } from "@/lib/contenido-bases";
import { quitarClaves } from "@/lib/contrato-actividad";
import { getLeccionH } from "@/lib/contenido-h";
import { daysUntilExam } from "@/lib/date";
import { DEFAULT_TOPIC, getProximoTemaNoCompletado, getTopicMeta, isCurriculumTopic, CURRICULUM_MATEMATICA, CURRICULUM_LENGUA } from "@/lib/curriculum";
import { getObjetivosParaTema, determinarProximoObjetivo, esElegibleParaExamenFinal } from "@/lib/objetivos-pedagogicos";
import { getCasoResuelto, getMetodoPasoAPaso } from "@/lib/casos-resueltos";
import { getTareaManuscrita } from "@/lib/ejercicios-manuscritos";
import { getExamenFinal } from "@/lib/examenes-monserrat";
import { parseJsonFromModel } from "@/lib/json";
import { callOpenRouter } from "@/lib/openrouter";
import { MODEL_TUTOR, buildPromptPractice, buildPromptTeacher } from "@/lib/prompts";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { loadUser } from "@/lib/usuarios";
import { requireMethod } from "@/lib/http";
import { requireAccess, requireOwnership } from "@/lib/access";
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
    forzar_practica = false,
    retomar_examen = false,
    rendir_examen = false,
    tutor_preference = null,
  } = req.body || {};

  if (!user_id) {
    return res.status(400).json({ error: "user_id es obligatorio." });
  }

  if (typeof user_id !== "string" || user_id.length > 100) {
    return res.status(400).json({ error: "user_id inválido o demasiado largo." });
  }

  if (tema && (typeof tema !== "string" || tema.length > 100)) {
    return res.status(400).json({ error: "tema inválido o demasiado largo." });
  }

  try {
    const supabase = getSupabaseAdmin();

    // Validar límite diario de abuso/seguridad para llamadas de IA
    const rateLimit = await checkDailyRateLimit(supabase, user_id);
    if (!rateLimit.ok) {
      return res.status(429).json({ error: rateLimit.error });
    }

    const usuario = assertSupabaseOk(
      await loadUser(supabase, user_id),
      "No se pudo obtener el usuario"
    );

    if (!requireOwnership(req, res, usuario.id)) return;

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
    const unlockedTopicsSet = await getUnlockedTopics(supabase, user_id, resolvedPlan, usuario);

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
        capaActual = calcularCapaInicial(edad, grado, rasgos, usuario.nivel_inicial);
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

    if (TEMAS_BASES_MATEMATICA.includes(temaActual) && modo !== 'REPASO' && !rendir_examen && !retomar_examen) {
      const historia = assertSupabaseOk(await supabase.from('sesiones').select('id, tema, tipo_pregunta, es_correcta, created_at, ia_parametros_usados').eq('user_id', user_id), 'No se pudo leer el recorrido');
      const fracciones = determinarProximoObjetivo('fracciones_concepto', historia);
      const multiplos = determinarProximoObjetivo('divisibilidad_primos_mcm_mcd', historia);
      // El puente hacia operaciones incluye todos los pasos hasta MCM, aunque se agreguen lecciones.
      const indiceMcm = getObjetivosParaTema('divisibilidad_primos_mcm_mcd').findIndex(o => o.id === 'div_primos_4_mcm');
      const faltaMcm = !multiplos.temaCompletado && (indiceMcm < 0 || multiplos.indiceObjetivo <= indiceMcm);
      if (!fracciones.temaCompletado) temaActual = 'fracciones_concepto';
      else if (faltaMcm) temaActual = 'divisibilidad_primos_mcm_mcd';
      else if (!determinarProximoObjetivo('fracciones_operaciones', historia).temaCompletado) temaActual = 'fracciones_operaciones';
      else if (!multiplos.temaCompletado) temaActual = 'divisibilidad_primos_mcm_mcd';
      capaActual = 1;
    }

    if (await exigirLectura(supabase, user_id, temaActual, res, { ...tutor, ...planPayload, capa: capaActual })) return;

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

    const { data: sesionesTema } = await supabase
      .from("sesiones")
      .select("id, tema, tipo_pregunta, es_correcta, created_at, ia_parametros_usados, contexto_json")
      .eq("user_id", user_id)
      .eq("tema", temaActual);

    const objetivoInfo = determinarProximoObjetivo(temaActual, sesionesTema || []);
    const objetivoActual = objetivoInfo.objetivoActual;
    const objetivo_id = objetivoActual?.id || null;
    contexto.objetivo_id = objetivo_id;
    contexto.objetivo_actual = objetivoActual;

    const unidadBase = getUnidadBase(objetivo_id);
    const responderBase = async () => {
      const modoBase = objetivoInfo.requiereExplicacion || modo === 'REPASO' ? 'leccion' : 'practica';
      const actividad = crearActividadBase(objetivo_id, modoBase, sesionesTema || []);
      const texto = modoBase === 'leccion' ? actividad.ejercicio_practica.enunciado : actividad.pregunta;
      const fila = assertSupabaseOk(await supabase.from('sesiones').insert({user_id, tema:temaActual, capa:1, modo,
        tipo_pregunta:modoBase === 'leccion' ? 'leccion':actividad.tipo_pregunta, pregunta_generada:texto,
        contexto_json:{...contexto, leccion:modoBase === 'leccion' ? actividad:null},
        ia_parametros_usados:{provider:'contenido_revisado',modo_sesion:modoBase,objetivo_id,contenido_version:VERSION_BASES,actividad_id:actividad.actividad_id}
      }).select().single(), 'No se pudo guardar la actividad');
      const cierre = getCierreBase(temaActual);
      const examenes = (sesionesTema || []).filter(s => s.tipo_pregunta === 'examen_final').sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at)));
      const aprobado = examenes.some(s=>s.es_correcta === true && (!cierre?.revision_cierre || esCierreActual(s.contexto_json?.examen_final, temaActual)));
      const ultimo = examenes.find(s=>esCierreActual(s.contexto_json?.examen_final, temaActual));
      const pendiente = ultimo?.es_correcta === null && !ultimo.ia_parametros_usados?.revision_pendiente && !ultimo.ia_parametros_usados?.revision_familiar;
      const practicas = (sesionesTema || []).filter(s=>typeof s.es_correcta === 'boolean' && !['leccion','examen_final'].includes(s.tipo_pregunta))
        .sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at))).slice(0,5);
      const independientes = practicas.filter(s=>s.es_correcta && !s.ia_parametros_usados?.resuelto_con_ayuda);
      const suficientes = practicas.length >= 3 && independientes.length / practicas.length >= 0.8;
      const recuperado = ultimo?.es_correcta !== false || independientes.filter(s=>new Date(s.created_at)>new Date(ultimo.created_at)).length >= 2;
      const disponible = Boolean(cierre && objetivoInfo.temaCompletado && !aprobado && suficientes && recuperado);
      return res.status(200).json(quitarClaves({...actividad, pregunta:texto, tipo_pregunta:modoBase === 'leccion'?'leccion':actividad.tipo_pregunta,
        sesion_id:fila.id,tema:temaActual,capa:1,...tutor,...planPayload,examen_disponible:disponible && !pendiente,examen_pendiente:disponible && Boolean(pendiente)}));
    };
    if (unidadBase && !((rendir_examen || retomar_examen) && objetivoInfo.temaCompletado)) return responderBase();

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
    const esModoRepaso = modo === "REPASO";
    const requiereExplicacion = objetivoInfo.requiereExplicacion || (!unidadBase && !leccion?.completada) || esModoRepaso;
    const modoSesion = requiereExplicacion ? "leccion" : "practica";

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

    if (modoSesion === "practica" && (!forzar_practica || retomar_examen)) {
      const examenResponse = await maybeCrearExamenFinal(
        supabase,
        user_id,
        temaActual,
        capaActual,
        modo,
        contexto,
        {
          forzar_practica: Boolean(forzar_practica),
          retomar_examen: Boolean(retomar_examen),
          rendir_examen: Boolean(rendir_examen),
        }
      );
      if (examenResponse) {
        return res.status(200).json(quitarClaves({ ...examenResponse, ...tutor, ...planPayload }));
      }
    }

    if (unidadBase) return responderBase();

    if (modoSesion === "practica") {
      const tareaResponse = await maybeAsignarTareaManuscrita(supabase, user_id, temaActual);
      if (tareaResponse) {
        return res.status(200).json({ ...tareaResponse, ...tutor, ...planPayload });
      }
    }

    const preguntasRecientes = await getPreguntasRecientes(supabase, user_id, temaActual);

    // Fetch approved exams to calculate completed prerequisites and unlearned topics
    const { data: approvedExamsData } = await supabase
      .from("sesiones")
      .select("tema")
      .eq("user_id", user_id)
      .eq("tipo_pregunta", "examen_final")
      .eq("es_correcta", true);
    
    const approvedExams = new Set((approvedExamsData || []).map(s => s.tema));
    const temasCompletados = Array.from(approvedExams);

    const topicMeta = getTopicMeta(temaActual);
    const curriculum = topicMeta?.materia === "lengua" ? CURRICULUM_LENGUA : CURRICULUM_MATEMATICA;
    const currentIndex = curriculum.findIndex(t => t.tema === temaActual);
    const conceptosNoEnseñados = [];
    if (currentIndex !== -1) {
      for (let i = currentIndex + 1; i < curriculum.length; i++) {
        conceptosNoEnseñados.push(curriculum[i].tema);
      }
    }

    const contextoPrompt = {
      ...contexto,
      preguntas_recientes: JSON.stringify(preguntasRecientes),
      temas_completados: temasCompletados,
      conceptos_no_ensenados: conceptosNoEnseñados,
    };

    const systemPrompt =
      modoSesion === "leccion"
        ? buildPromptTeacher(alumno, contextoPrompt)
        : buildPromptPractice(alumno, contextoPrompt);
    const isSpelling = temaActual.startsWith("ortografia_");
    const esDislexia = alumno?.necesidades_especiales === "dislexia";
    const cszExamples = temaActual === "ortografia_c_s_z"
      ? " (por ejemplo, escribe 'serca' en vez de 'cerca', 'despasio' en vez de 'despacio', 'Zol' en vez de 'Sol')"
      : "";
    const spellingSpecificPrompt = isSpelling
      ? esDislexia || capaActual <= 1
        ? `\n- Como el tema es de ortografía (${temaActual}) y ${alumno.nombre} requiere lectura accesible (oraciones cortas, evitar bloques densos): genera una consigna breve y directa (1 o 2 oraciones cotidianas, máximo 30 palabras) que plantee un desafío claro: completar la letra faltante, elegir entre opciones o identificar 1 palabra para corregir.${cszExamples}
        ¡CRÍTICO! NO generes textos largos ni historias densas con múltiples errores que confundan o sobrecarguen a un alumno con dislexia. Mantén la consigna limpia, amable y concreta.`
        : `\n- Como el tema es de ortografía (${temaActual}), genera una historia breve (un párrafo de unas 100 palabras) e incluye EXACTAMENTE 3 errores ortográficos relacionados con la regla${cszExamples} (por ejemplo, si es ortografía B/V, escribe con B palabras que van con V o viceversa).
        ¡CRÍTICO! Revisa el texto resultante palabra por palabra antes de responder y asegúrate de contar exactamente 3 errores de esta regla y que todas las demás palabras estén escritas 100% correctamente.`
      : "";

    const objetivoPrompt = objetivoActual
      ? `\n- Micro-objetivo actual a trabajar: "${objetivoActual.titulo}". Evidencia requerida: ${objetivoActual.evidencia_propuesta}. Pista pedagógica clave: ${objetivoActual.pista}.`
      : "";

    const userInstruction =
      modoSesion === "leccion"
        ? (esModoRepaso
            ? `El alumno ${alumno.nombre} necesita un repaso conceptual porque tuvo dificultades recientes en "${temaActual}". Re-explica el concepto desde cero usando una analogía cotidiana sencilla, lenguaje claro y un ejemplo paso a paso muy visual antes de proponer una actividad guiada.${objetivoPrompt} Responde SOLO en JSON.`
            : `Ensena este tema a ${alumno.nombre} por primera vez.${objetivoPrompt} Responde SOLO en JSON.`)
        : `Genera un ejercicio de practica. Responde SOLO en JSON.

Tema actual: ${temaActual}
Capa actual: ${capaActual}${objetivoPrompt}
Preguntas recientes que NO debes repetir ni espejar:
${preguntasRecientes.map((pregunta, index) => `${index + 1}. ${pregunta}`).join("\n") || "Ninguna"}

IMPORTANTE:
- No repitas los mismos numeros de las preguntas recientes.
- No hagas la misma cuenta al reves.
- Si es multiplicacion, cambia contexto y factores dentro del tema.
- Si el tema es tablas_multiplicar_2_5, usa solo tablas del 2 al 5.${spellingSpecificPrompt}`;

    // La explicación revisada y el apunte de H comparten la misma fuente.
    const leccionRevisada = temaActual === "ortografia_h" && modoSesion === "leccion"
      ? getLeccionH(objetivo_id, alumno.nombre) : null;
    const preguntaJson = leccionRevisada || parseJsonFromModel(await callOpenRouter(
      MODEL_TUTOR, systemPrompt, userInstruction, modoSesion === "leccion" ? 3200 : 1024
    ));
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
          contexto_json: { ...contexto, leccion: modoSesion === "leccion" ? preguntaJson : null },
          modo,
          ia_parametros_usados: {
            provider: leccionRevisada ? "contenido_revisado" : "openrouter",
            model: leccionRevisada ? null : MODEL_TUTOR,
            max_tokens: modoSesion === "leccion" ? 3200 : 1024,
            endpoint: "/api/sesion/init",
            modo_sesion: modoSesion,
            objetivo_id,
            estado_objetivo: objetivoInfo.estado,
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

    let examenPendiente = false;
    let examenPendienteId = null;
    try {
      const { data: examenPendienteData } = await supabase
        .from("sesiones")
        .select("id, respuesta_usuario, ia_parametros_usados")
        .eq("user_id", user_id)
        .eq("tema", temaActual)
        .eq("tipo_pregunta", "examen_final")
        .is("es_correcta", null);

      const examenesSinEntregar = (examenPendienteData || []).filter(
        (ex) => !ex.respuesta_usuario && !ex.ia_parametros_usados?.revision_pendiente
      );

      if (examenesSinEntregar.length > 0) {
        examenPendiente = true;
        examenPendienteId = examenesSinEntregar[0].id;
      }
    } catch {}

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
      examen_pendiente: examenPendiente && objetivoInfo.temaCompletado,
      examen_pendiente_id: examenPendienteId,
      examen_disponible: objetivoInfo.temaCompletado,
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

  let nombre_tutor = preference.nombre_tutor || tutorNameForAvatar(avatar);
  if (typeof nombre_tutor === "string" && nombre_tutor.length > 50) {
    nombre_tutor = nombre_tutor.slice(0, 50);
  }

  return {
    avatar,
    nombre_tutor,
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

async function maybeCrearExamenFinal(supabase, userId, tema, capa, modo, contexto, opciones = {}) {
  if (opciones.forzar_practica && !opciones.retomar_examen) return null;

  const cierreRevisado = getCierreBase(tema);
  // Un aprobado anterior se conserva, pero no acredita la secuencia ampliada.
  const examenAprobadoResult = await supabase
    .from("sesiones")
    .select("id, contexto_json")
    .eq("user_id", userId)
    .eq("tema", tema)
    .eq("tipo_pregunta", "examen_final")
    .eq("es_correcta", true);

  if (examenAprobadoResult.error) {
    throw new Error(`No se pudo verificar examen final aprobado: ${examenAprobadoResult.error.message}`);
  }

  if ((examenAprobadoResult.data || []).some(s => !cierreRevisado?.revision_cierre || esCierreActual(s.contexto_json?.examen_final, tema))) return null;

  // 2. Consultar el último examen final del tema (para evitar bucles ante examen fallido o pendiente)
  const ultimosExamenesResult = await supabase
    .from("sesiones")
    .select("id, es_correcta, created_at, pregunta_generada, contexto_json, tipo_pregunta, respuesta_usuario, ia_parametros_usados")
    .eq("user_id", userId)
    .eq("tema", tema)
    .eq("tipo_pregunta", "examen_final")
    .order("created_at", { ascending: false });

  if (ultimosExamenesResult.error) {
    throw new Error(`No se pudo verificar examen final previo: ${ultimosExamenesResult.error.message}`);
  }

  const examenPrevio = (ultimosExamenesResult.data || []).find(s => !cierreRevisado?.revision_cierre || esCierreActual(s.contexto_json?.examen_final, tema));
  // El examen legado se conserva como historial; no reabre preguntas ajenas a la enseñanza revisada.
  const ultimoExamen = cierreRevisado && !esCierreActual(examenPrevio?.contexto_json?.examen_final, tema) ? null : examenPrevio;

  // Si el último examen quedó pendiente (es_correcta === null):
  // - Si ya fue entregado y espera revisión (revision_pendiente: true), NO ofrecerlo como examen nuevo a rendir
  // - Si se solicita expresamente retomarlo (retomar_examen: true) y no fue entregado, se recupera la sesión existente
  //   sin crear nuevas filas (createdRows: 0) antes de evaluar umbrales de nuevas prácticas.
  // - Si no se solicita retomarlo, se devuelve null para conservar el modo práctica sin generar exámenes huérfanos.
  if (ultimoExamen && ultimoExamen.es_correcta === null) {
    const esRevisionPendiente = Boolean(
      ultimoExamen.ia_parametros_usados?.revision_pendiente ||
      ultimoExamen.contexto_json?.revision_pendiente ||
      ultimoExamen.respuesta_usuario
    );

    if (esRevisionPendiente) {
      if (opciones.retomar_examen) {
        const revisionFamiliar = ultimoExamen.ia_parametros_usados?.revision_familiar;
        return {
          sesion_id: ultimoExamen.id,
          revision_pendiente: !revisionFamiliar,
          revision_familiar: revisionFamiliar ? {comentario:revisionFamiliar.comentario,fecha:revisionFamiliar.fecha} : null,
          entregado: true,
          retomado: false,
          tema,
          tipo: "examen_final",
          tipo_pregunta: "examen_final",
          pregunta: ultimoExamen.pregunta_generada || "Producción escrita entregada",
          respuesta_guardada: ultimoExamen.respuesta_usuario,
          fecha_entrega: ultimoExamen.created_at,
          instrucciones: revisionFamiliar ? "Esta producción ya recibió una devolución familiar. Podés conversar sobre el próximo paso y seguir practicando." : "Esta producción ya fue entregada y está a la espera de revisión con rúbrica docente y familiar.",
        };
      }
      return null;
    }

    if (opciones.retomar_examen) {
      const examenGuardado = ultimoExamen.contexto_json?.examen_final || getExamenFinal(tema, capa) || {
        enunciado: ultimoExamen.pregunta_generada || "Examen final",
        preguntas: [],
      };
      return {
        sesion_id: ultimoExamen.id,
        ...examenGuardado,
        pregunta: examenGuardado.enunciado || ultimoExamen.pregunta_generada,
        tema,
        tipo: "examen_final",
        tipo_pregunta: "examen_final",
        tiempo_estimado: examenGuardado.tiempo_estimado || 20,
        retomado: true,
      };
    }
    // Examen pendiente o abandonado: no generar exámenes huérfanos repetidos, permitir practicar
    return null;
  }

  // 3. Verificar que TODOS los micro-objetivos del tema estén consolidados
  const todasSesionesResult = await supabase
    .from("sesiones")
    .select("tema, tipo_pregunta, es_correcta, ia_parametros_usados, created_at, id")
    .eq("user_id", userId)
    .eq("tema", tema);

  if (todasSesionesResult.error) {
    throw new Error(`No se pudieron verificar sesiones previas del tema: ${todasSesionesResult.error.message}`);
  }

  const fnElegible = typeof esElegibleParaExamenFinal === "function"
    ? esElegibleParaExamenFinal
    : (t, ses) => typeof determinarProximoObjetivo === "function" ? determinarProximoObjetivo(t, ses).temaCompletado === true : true;

  if (!fnElegible(tema, todasSesionesResult.data || [])) {
    return null;
  }

  // 4. Obtener prácticas evaluadas del tema para determinar si se habilita un examen NUEVO
  const practicas = await getPracticasEvaluadas(supabase, userId, tema);
  const totalPracticas = practicas.length;
  const correctasIndependientes = practicas.filter(
    (item) => item.es_correcta && !item.ia_parametros_usados?.resuelto_con_ayuda
  ).length;
  const tasaPractica = totalPracticas ? (correctasIndependientes / totalPracticas) * 100 : 0;

  if (totalPracticas < 3 || tasaPractica < 80) return null;
  if (!opciones.rendir_examen && !opciones.retomar_examen) return null;

  // 4. Si el último examen fue desaprobado (es_correcta === false):
  if (ultimoExamen && ultimoExamen.es_correcta === false) {
    // Examen desaprobado: exigir al menos 2 prácticas independientes correctas posteriores
    const practicasPosteriores = practicas.filter((p) => {
      if (!p.es_correcta || p.ia_parametros_usados?.resuelto_con_ayuda) return false;
      if (p.created_at && ultimoExamen.created_at) {
        return new Date(p.created_at) > new Date(ultimoExamen.created_at);
      }
      if (typeof p.id === "number" && typeof ultimoExamen.id === "number") {
        return p.id > ultimoExamen.id;
      }
      return false;
    });

    if (practicasPosteriores.length < 2) {
      return null; // Requiere consolidar y practicar antes de volver a ser elegible para examen
    }
  }

  const examenDefinido = cierreRevisado || getExamenFinal(tema, capa);
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
          contenido_version: examen.contenido_version || null,
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
    .select("id, es_correcta, tipo_pregunta, created_at, ia_parametros_usados")
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
    `Sos Profe, generadora de exámenes finales de nivel primario avanzado para el ingreso al Colegio Monserrat. Crea un examen final breve, riguroso y libre de errores sobre el tema: "${tema}". Responde únicamente con un objeto JSON válido, sin texto adicional ni marcas de código markdown.`,
    `Tema: ${tema}
Capa: ${capa}
Contexto: ${JSON.stringify(contexto)}
Habilidades enseñadas que delimitan este examen: ${JSON.stringify(getObjetivosParaTema(tema).map(o => ({ titulo: o.titulo, contenido: o.secuencia })))}

REGLAS DE GENERACIÓN DE PREGUNTAS (¡CRÍTICAS!):
1. COHERENCIA ESTRICTA CON EL TEMA: Todas las preguntas deben evaluar exclusivamente el tema actual: "${tema}". 
   - Por ejemplo, si es "ortografia_h", evalúa únicamente el uso correcto/incorrecto de la letra H y sus reglas en español. No incluyas palabras ajenas que no se escriben con H (como pedir escribir "tórax" o evaluar tildes de forma aislada).
2. PRECISION ABSOLUTA EN OPCIONES Y RESPUESTAS: 
   - Si una pregunta pide identificar una palabra MAL escrita, asegúrate de que en las opciones generadas esa palabra esté efectivamente escrita de forma incorrecta (ej. escribir "uerfano" sin H) y que la respuesta correcta corresponda exactamente a esa opción defectuosa. Revisa dos veces las letras de cada opción para que no tengan errores no deseados.
3. IDIOMA Y NORMAS: Todo debe estar en español de Argentina.
4. FORMATO: Genera 5 preguntas breves sobre las habilidades enseñadas enumeradas. No introduzcas reglas ni vocabulario ajenos a ellas. Para H, usa completar, elegir o escribir en contexto; nunca pidas justificar por qué hormiga o cohete llevan H.

Genera un JSON con esta forma:
{
  "tipo": "examen_final",
  "dificultad": "monserrat",
  "instrucciones": "Necesitás 70% o más para aprobar. Leé con atención cada consigna.",
  "enunciado": "Examen Final de [Nombre del Tema]",
  "preguntas": [
    {"id":"a","texto":"[Consigna de la pregunta A]","respuesta_correcta":"[Respuesta esperada exacta]","alternativas_aceptables":["[Variante aceptable 1]", "[Variante aceptable 2]"]},
    {"id":"b","texto":"[Consigna de la pregunta B]","respuesta_correcta":"[Respuesta esperada exacta]","alternativas_aceptables":["[Variante aceptable 1]"]},
    {"id":"c","texto":"[Consigna de la pregunta C]","respuesta_correcta":"[Respuesta esperada exacta]","alternativas_aceptables":["[Variante aceptable 1]"]},
    {"id":"d","texto":"[Consigna de la pregunta D]","respuesta_correcta":"[Respuesta esperada exacta]","alternativas_aceptables":["[Variante aceptable 1]"]},
    {"id":"e","texto":"[Consigna de la pregunta E]","respuesta_correcta":"[Respuesta esperada exacta]","alternativas_aceptables":["[Variante aceptable 1]"]}
  ]
}`,
    2000
  );

  const examen = parseJsonFromModel(respuesta);
  if (!examen.enunciado || !Array.isArray(examen.preguntas) || examen.preguntas.length === 0) {
    throw new Error("La IA no devolvió un examen final válido.");
  }

  return {
    tipo: "examen_final",
    dificultad: "monserrat",
    instrucciones: "Necesitás 70% o más para aprobar.",
    ...examen,
  };
}

function calcularCapaInicial(edad, grado, rasgos, nivel_inicial = null) {
  if (nivel_inicial === "recien_empieza" || rasgos?.modo_paciente) {
    return 1;
  }
  let capa = 1;
  if (edad >= 11 && grado === "6to") capa = 3;
  else if (edad >= 10) capa = 2;
  if (rasgos?.dislexia) capa = Math.max(1, capa - 1);
  return capa;
}

async function getUnlockedTopics(supabase, userId, plan, usuario = null) {
  const { data, error } = await supabase.from("sesiones").select("tema")
    .eq("user_id", userId).eq("tipo_pregunta", "examen_final").eq("es_correcta", true);
  if (error) throw new Error("No se pudieron obtener temas completados");
  return temasHabilitados({plan, aprobados: (data || []).map(s => s.tema), rutaFlexible: Boolean(usuario?.rasgos_especiales?.ruta_flexible)});
}
