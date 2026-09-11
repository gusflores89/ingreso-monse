import { getTareaManuscrita } from "@/lib/ejercicios-manuscritos";
import { assertSupabaseOk } from "@/lib/supabaseAdmin";

export function tareaToResponse(tarea) {
  return {
    tipo: "manuscrita",
    tarea_id: tarea.id,
    tema: tarea.tema,
    tipo_tarea: tarea.tipo_tarea,
    instruccion: tarea.instruccion,
    contenido: tarea.contenido || {},
    tiempo_estimado: tarea.tiempo_estimado,
    estado: tarea.estado,
  };
}

export async function getTareaManuscritaActiva(supabase, userId, tema) {
  const result = await supabase
    .from("tareas_manuscritas")
    .select("*")
    .eq("user_id", userId)
    .eq("tema", tema)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (result.error) {
    if (isMissingHandwritingTable(result.error)) return null;
    throw new Error(`No se pudo obtener tarea manuscrita: ${result.error.message}`);
  }

  return result.data;
}

export async function crearTareaManuscrita(supabase, userId, tema, ejercicio = getTareaManuscrita(tema)) {
  if (!ejercicio) return null;

  return assertSupabaseOk(
    await supabase
      .from("tareas_manuscritas")
      .insert({
        user_id: userId,
        tema,
        tipo_tarea: ejercicio.tipo,
        instruccion: ejercicio.instruccion,
        contenido: {
          oraciones: ejercicio.oraciones,
          texto: ejercicio.texto,
          inicio: ejercicio.inicio,
          requisitos: ejercicio.requisitos,
        },
        tiempo_estimado: ejercicio.tiempo_estimado,
        estado: "pendiente",
      })
      .select()
      .single(),
    "No se pudo crear tarea manuscrita"
  );
}

export function isMissingHandwritingTable(error) {
  return error?.code === "PGRST205" || error?.message?.includes("tareas_manuscritas");
}
