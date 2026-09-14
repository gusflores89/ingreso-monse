
export function validarEvaluacion(value, noVisto = false, escritura = false) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("La devolución del tutor llegó incompleta. Probá enviar de nuevo; no se registró un error.");
  const sinCalificar=escritura && value.revision_pendiente===true && value.es_correcta===null;
  if (!sinCalificar && (noVisto ? value.es_correcta !== null : typeof value.es_correcta !== "boolean")) throw new Error("La devolución del tutor llegó incompleta. Probá enviar de nuevo; no se registró un error.");
  if (typeof value.retroalimentacion !== "string" || !value.retroalimentacion.trim()) throw new Error("Falta la explicación del tutor. Tu respuesta no fue calificada.");
  if ((noVisto || value.es_correcta === false) && [value.pista_concreta, value.paso_resuelto].some(v => typeof v !== "string" || !v.trim())) throw new Error("Falta una pista o el paso explicado. Probá de nuevo; tu respuesta no fue calificada.");
  return value;
}
export function huboAyuda(sesion, solicitada = false) {
  const p = sesion.ia_parametros_usados || {};
  return Boolean(solicitada || p.ayuda_utilizada || p.resuelto_con_ayuda || p.no_visto || sesion.es_correcta === false);
}
