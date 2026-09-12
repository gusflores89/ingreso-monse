import { createHash, randomUUID } from "node:crypto";

const DURACION_RESERVA = 90_000;
function conflicto(message = "Estamos guardando otra respuesta de este reto. Esperá un momento y volvé a enviar.") {
  return Object.assign(new Error(message), { status: 409 });
}
export function identidadEnvio(body, tipo = "respuesta") {
  const huella = createHash('sha256').update(JSON.stringify([tipo, body.respuesta_usuario || '', Boolean(body.no_visto), Boolean(body.resuelto_con_ayuda)])).digest('hex');
  const id = body.envio_id || `legacy_${huella}`;
  if (typeof id !== 'string' || !/^[a-zA-Z0-9_-]{8,100}$/.test(id)) throw Object.assign(new Error('Identificador de envío inválido.'), {status:400});
  return {id, huella, tipo: body.no_visto ? 'no_visto' : tipo};
}
// The UPDATE predicate is rechecked by PostgreSQL after taking the row lock.
// A short revision token keeps the filter independent of the size of the history.
export async function cambiarSesion(db, id, cambiar) {
  for (let retry = 0; retry < 12; retry++) {
    const read = await db.from('sesiones').select('*').eq('id', id).single();
    if (read.error || !read.data) throw new Error('No se pudo leer la actividad.');
    const actual = read.data;
    const cambios = cambiar(actual);
    if (!cambios) return actual;
    const anterior = actual.ia_parametros_usados || {};
    const next = {...cambios, ia_parametros_usados:{...anterior, ...cambios.ia_parametros_usados, revision_guardado:randomUUID()}};
    let query = db.from('sesiones').update(next).eq('id', id).eq('user_id', actual.user_id);
    query = anterior.revision_guardado
      ? query.eq('ia_parametros_usados->>revision_guardado', anterior.revision_guardado)
      : query.is('ia_parametros_usados->>revision_guardado', null);
    const result = await query.select().maybeSingle();
    if (result.error) throw new Error('No se pudo guardar la actividad.');
    if (result.data) return result.data;
  }
  throw conflicto();
}
function eventos(s) { return s.ia_parametros_usados?.eventos_pedagogicos || []; }
function exigirReserva(s, envio) {
  const lock = s.ia_parametros_usados?.envio_en_curso;
  if (!lock || lock.token !== envio.token || lock.hasta <= Date.now()) throw conflicto();
}
export async function iniciarEnvio(db, id, body) {
  const envio = {...identidadEnvio(body), token:randomUUID()};
  const sesion = await cambiarSesion(db, id, s => {
    const p = s.ia_parametros_usados || {}, es = eventos(s), previo = es.find(e=>e.id===envio.id);
    if (previo && previo.huella !== envio.huella) throw conflicto('Ese envío corresponde a otra respuesta. Volvé a abrir el reto.');
    if (previo?.estado === 'completado') return null;
    if (es.some(e=>e.estado==='completado' && (e.salida?.es_correcta === true || s.tipo_pregunta === 'examen_final'))) throw conflicto('Este reto ya está corregido. Avanzá al siguiente.');
    if (p.envio_en_curso?.hasta > Date.now()) throw conflicto();
    // Do not abandon a partially saved evaluation in favour of a different answer.
    const pendiente = es.find(e=>['procesando','pendiente'].includes(e.estado) && e.tipo!=='ayuda');
    if (pendiente && pendiente.id !== envio.id) throw conflicto('Hay un envío pendiente. Reenviá primero la respuesta que quedó guardada.');
    if (!previo && es.length >= 100) throw conflicto('Este reto alcanzó el límite de envíos. Podés guardar y elegir otro reto.');
    const evento = previo || {id:envio.id, huella:envio.huella, tipo:envio.tipo, fecha:new Date().toISOString(), respuesta:body.respuesta_usuario, ayuda_solicitada:Boolean(body.resuelto_con_ayuda || body.no_visto)};
    return {ia_parametros_usados:{...p, eventos_pedagogicos:[...es.filter(e=>e.id!==envio.id), {...evento,estado:'procesando'}], envio_en_curso:{id:envio.id,token:envio.token,hasta:Date.now()+DURACION_RESERVA}}};
  });
  const evento = eventos(sesion).find(e=>e.id===envio.id);
  return {...envio, sesion, evaluacion:evento?.evaluacion, salida:evento?.estado==='completado'?evento.salida:null};
}
export async function guardarPasoEnvio(db, id, envio, cambios) {
  return cambiarSesion(db, id, s => {
    exigirReserva(s, envio);
    const p=s.ia_parametros_usados || {}, solicitado=cambios.ia_parametros_usados || {};
    const asistida=Boolean(p.resuelto_con_ayuda || p.ayuda_utilizada || solicitado.resuelto_con_ayuda || solicitado.ayuda_utilizada);
    const es=eventos(s).map(e=>e.id===envio.id?{...e, ...(envio.evaluacion ? {evaluacion:envio.evaluacion}:{}), ...(Object.hasOwn(cambios,'es_correcta') ? {es_correcta:cambios.es_correcta, evaluado_el:new Date().toISOString(), con_ayuda:asistida}: {})}:e);
    return {...cambios, ia_parametros_usados:{...p,...solicitado,eventos_pedagogicos:es,envio_en_curso:p.envio_en_curso,resuelto_con_ayuda:asistida,ayuda_utilizada:asistida}};
  });
}
export async function completarEnvio(db, id, envio, salida) {
  await cambiarSesion(db,id,s=>{
    exigirReserva(s,envio);
    const p=s.ia_parametros_usados || {};
    return {ia_parametros_usados:{...p,envio_en_curso:null,eventos_pedagogicos:eventos(s).map(e=>e.id===envio.id?{...e,estado:'completado',completado_el:new Date().toISOString(),salida}:e)}};
  });
}
export async function liberarEnvio(db,id,envio) {
  await cambiarSesion(db,id,s=>{
    const p=s.ia_parametros_usados || {};
    if(p.envio_en_curso?.token!==envio.token)return null;
    return {ia_parametros_usados:{...p,envio_en_curso:null,eventos_pedagogicos:eventos(s).map(e=>e.id===envio.id?{...e,estado:e.evaluacion?'pendiente':'fallido'}:e)}};
  });
}
export async function registrarAyuda(db,id,body) {
  const envio=identidadEnvio(body,'ayuda');
  await cambiarSesion(db,id,s=>{
    const p=s.ia_parametros_usados || {}, es=eventos(s);
    const previo=es.find(e=>e.id===envio.id);
    if(previo){if(previo.huella!==envio.huella)throw conflicto();return null;}
    if(es.length>=100)throw conflicto('Este reto alcanzó el límite de envíos. Podés guardar y elegir otro reto.');
    // Help opened after a completed answer is review, not retroactive assistance.
    const retrospectiva=s.es_correcta===true && !p.envio_en_curso;
    return {ia_parametros_usados:{...p,ayuda_utilizada:Boolean(p.ayuda_utilizada || !retrospectiva),resuelto_con_ayuda:Boolean(p.resuelto_con_ayuda || !retrospectiva),eventos_pedagogicos:[...es.map(e=>!retrospectiva && e.id===p.envio_en_curso?.id ? {...e,con_ayuda:true}:e),{...envio,fecha:new Date().toISOString(),estado:'completado',retrospectiva}]}};
  });
  return {ok:true,envio_id:envio.id};
}
