import { assertSupabaseOk } from "./supabaseAdmin";

export async function refreshTopicProgress(supabase, userId, tema, capaActual) {
  const sesiones = assertSupabaseOk(
    await supabase
      .from("sesiones")
      .select("id, es_correcta, capa, created_at")
      .eq("user_id", userId)
      .eq("tema", tema)
      .not("es_correcta", "is", null)
      .order("created_at", { ascending: false }),
    "No se pudieron leer sesiones para progreso"
  );

  const total = sesiones.length;
  const correctas = sesiones.filter((sesion) => sesion.es_correcta).length;
  const tasa = total ? Number(((correctas / total) * 100).toFixed(2)) : 0;
  const capaMaxima = sesiones.reduce((max, sesion) => Math.max(max, sesion.capa || 1), capaActual || 1);
  const ultima = sesiones[0]?.created_at || null;

  const payload = {
    user_id: userId,
    tema,
    capa_actual: capaActual || 1,
    capa_maxima: capaMaxima,
    total_sesiones: total,
    total_correctas: correctas,
    tasa_acierto: tasa,
    fecha_ultima_sesion: ultima,
    updated_at: new Date().toISOString(),
  };

  const progreso = assertSupabaseOk(
    await supabase
      .from("progreso")
      .upsert(payload, { onConflict: "user_id,tema" })
      .select()
      .single(),
    "No se pudo actualizar progreso"
  );

  return progreso;
}

export async function maybeCreateAlert(supabase, userId, alerta) {
  if (!alerta?.tipo || !alerta?.mensaje) return null;

  return assertSupabaseOk(
    await supabase
      .from("alertas")
      .insert({
        user_id: userId,
        tipo: alerta.tipo,
        mensaje: alerta.mensaje,
        accion_recomendada: alerta.accion || alerta.accion_recomendada || null,
      })
      .select()
      .single(),
    "No se pudo crear alerta"
  );
}
