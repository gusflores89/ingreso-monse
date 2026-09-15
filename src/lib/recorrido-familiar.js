import { createHash } from "node:crypto";
import { getEscrituraBase } from "@/lib/contenido-bases";

// Proyección pública: nunca enviar el JSON interno del evaluador ni sus claves.
const texto = (v, max = 6000) => typeof v === "string" ? v.slice(0, max) : "";
const respuesta = v => { try { const parsed = JSON.parse(v); if (typeof parsed?.texto === "string") return texto(parsed.texto,2000); } catch {} return texto(v,2000); };
const fecha = v => typeof v === "string" && Number.isFinite(Date.parse(v)) ? v : null;
// La huella identifica la respuesta evaluada, no los cambios posteriores de la familia.
export function versionRespuestaFamiliar(s) {
  const p=s.ia_parametros_usados || {};
  return createHash("sha256").update(JSON.stringify([s.respuesta_usuario,s.es_correcta,p.objetivo_id,p.actividad_id,p.contenido_version,
    (p.eventos_pedagogicos || []).filter(e=>e.tipo === "respuesta").map(e=>[e.id,e.estado,e.es_correcta])])).digest("hex");
}
function revisionPublica(r) {
  return {comentario:texto(r.comentario,2000),fecha:fecha(r.fecha),respuesta:texto(r.respuesta,2000),
    pregunta:texto(r.pregunta),texto_lectura:texto(r.texto_lectura)};
}
export function resumirSesionFamiliar(s) {
  const p = s.ia_parametros_usados || {}, vistos = new Set();
  const eventos = (Array.isArray(p.eventos_pedagogicos) ? p.eventos_pedagogicos : []).filter(e => {
    if (!e || !e.id || vistos.has(e.id)) return false;
    vistos.add(e.id); return true;
  }).map(e => {
    const ayuda = e.tipo === "ayuda", noVisto = e.tipo === "no_visto";
    const correcta = typeof e.es_correcta === "boolean" ? e.es_correcta : null;
    const conAyuda = Boolean(e.con_ayuda || e.ayuda_solicitada);
    let estado = "Sin evaluación registrada";
    if (ayuda) estado = e.retrospectiva ? "Consultó la explicación después de resolver" : "Pidió una explicación";
    else if (noVisto) estado = "Pidió aprenderlo antes de responder";
    else if (correcta === true) estado = s.tipo_pregunta === "leccion" ? "Práctica guiada completada" : conAyuda ? "Resuelto con ayuda" : "Resuelto sin ayuda registrada";
    else if (correcta === false) estado = "Necesitó otro intento o explicación";
    else if (e.salida?.revision_pendiente) estado = "Entregado para revisión";
    else if (e.estado === "fallido") estado = "Envío interrumpido; sin calificación";
    return { id: texto(e.id,100), fecha: fecha(e.evaluado_el || e.completado_el || e.fecha), estado,
      tipo: ayuda ? "ayuda" : noVisto ? "no_visto" : "respuesta", respuesta: ayuda || noVisto ? "" : respuesta(e.respuesta),
      es_correcta: correcta, con_ayuda: conAyuda,
      devolucion: texto(e.salida?.retroalimentacion || e.evaluacion?.retroalimentacion,2000) };
  }).sort((a,b) => (Date.parse(a.fecha) || 0) - (Date.parse(b.fecha) || 0));
  const revision = p.revision_familiar;
  const escritura = getEscrituraBase(s);
  const version = versionRespuestaFamiliar(s);
  const ocupada = p.envio_en_curso?.hasta > Date.now() || (p.eventos_pedagogicos || []).some(e=>["procesando","pendiente"].includes(e.estado) && e.tipo !== "ayuda");
  const comentable = !ocupada && (escritura ? Boolean(respuesta(s.respuesta_usuario).trim()) && (!revision || revision.version_respuesta !== version) : Boolean(p.revision_pendiente && s.tipo_pregunta === "examen_final"));
  const examen = s.contexto_json?.examen_final;
  const produccion = examen?.tipo_evaluacion === "produccion_manuscrita";
  let estado = "Sin respuesta registrada";
  if (p.revision_pendiente) estado = "Pendiente de devolución familiar";
  else if (revision && (!escritura || revision.version_respuesta === version)) estado = escritura ? "Con devolución familiar · conserva la evaluación del tutor" : "Con devolución familiar · sin nota automática";
  else if (s.es_correcta === true) estado = s.tipo_pregunta === "leccion" ? "Lección y práctica guiada completadas" : p.resuelto_con_ayuda || p.ayuda_utilizada ? "Resuelto con ayuda" : eventos.length ? "Resuelto sin ayuda registrada" : "Correcto · sin detalle de ayudas antiguo";
  else if (s.es_correcta === false) estado = "Para seguir aprendiendo";
  else if (eventos.some(e => e.tipo === "no_visto")) estado = "Pidió enseñanza previa";
  return { id:s.id, tema:texto(s.tema,160), tipo:texto(s.tipo_pregunta,80), fecha:fecha(s.created_at), estado,
    pregunta:texto(escritura ? escritura.actividad.enunciado : s.pregunta_generada), respuesta:respuesta(s.respuesta_usuario), eventos,
    escritura_guiada:Boolean(escritura), titulo:escritura ? texto(escritura.unidad.titulo,160) : "",
    texto_lectura:escritura ? texto(escritura.actividad.visual?.texto) : "",
    version_respuesta:version, puede_comentar:comentable,
    aspectos_escritura:escritura ? escritura.actividad.rubrica_escritura.map(c=>({id:c.id,detalle:texto(c.descripcion,500),
      estado:["logrado","revisar","incierto"].includes((p.criterios_escritura || []).find(v=>v.id===c.id)?.estado) ? p.criterios_escritura.find(v=>v.id===c.id).estado : "sin evaluar"})) : [],
    instrucciones:produccion ? texto(examen.instrucciones) : "",
    criterios:produccion && examen.criterios && typeof examen.criterios === "object" ? Object.entries(examen.criterios).slice(0,12).map(([nombre,detalle])=>({nombre:texto(nombre,100),detalle:texto(detalle,500)})).filter(c=>c.detalle) : [],
    intentos:eventos.filter(e => e.tipo === "respuesta" && e.es_correcta !== null).length,
    detalle_disponible:eventos.length > 0, revision_pendiente:Boolean(p.revision_pendiente),
    revisiones_anteriores:(Array.isArray(p.revisiones_familiares) ? p.revisiones_familiares : []).map(revisionPublica),
    revision:revision ? revisionPublica(revision) : null };
}
