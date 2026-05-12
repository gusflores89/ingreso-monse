import { daysUntilExam } from "@/lib/date";
import { getTopicMeta } from "@/lib/curriculum";
import { getTareaManuscrita } from "@/lib/ejercicios-manuscritos";
import { parseJsonFromModel } from "@/lib/json";
import { callOpenRouter } from "@/lib/openrouter";
import { MODEL_TUTOR, hydratePrompt, SYSTEM_PROMPT_PRACTICE, SYSTEM_PROMPT_TEACHER } from "@/lib/prompts";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireMethod } from "@/lib/http";
import {
  crearTareaManuscrita,
  getTareaManuscritaActiva,
  isMissingHandwritingTable,
  tareaToResponse,
} from "@/lib/tareas-manuscritas";

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
      sesiones_en_tema: progreso?.total_sesiones || 0,
      errores_patrones_json: {},
      racha: 0,
      dias_falta_examen: daysUntilExam(),
    };

    const leccionResult = await supabase
      .from("lecciones_completadas")
      .select("*")
      .eq("user_id", user_id)
      .eq("tema", tema)
      .eq("leccion_numero", 1)
      .maybeSingle();

    if (leccionResult.error && !isMissingLessonsTable(leccionResult.error)) {
      throw new Error(`No se pudo obtener la leccion: ${leccionResult.error.message}`);
    }

    const leccion = leccionResult.data;
    const modoSesion = leccion?.completada ? "practica" : "leccion";

    if (modoSesion === "practica") {
      const tareaResponse = await maybeAsignarTareaManuscrita(supabase, user_id, tema);
      if (tareaResponse) {
        return res.status(200).json(tareaResponse);
      }
    }

    const systemPrompt = hydratePrompt(
      modoSesion === "leccion" ? SYSTEM_PROMPT_TEACHER : SYSTEM_PROMPT_PRACTICE,
      contexto
    );

    const respuestaIa = await callOpenRouter(
      MODEL_TUTOR,
      systemPrompt,
      modoSesion === "leccion"
        ? "Ensena este tema a Abril por primera vez. Responde SOLO en JSON."
        : "Genera un ejercicio de practica. Responde SOLO en JSON.",
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
          tema,
          capa: Number(capa),
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
      ...preguntaJson,
      pregunta: preguntaGenerada,
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
