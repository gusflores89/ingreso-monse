function guardar(storage,key,value) {
  try { storage.setItem(key,JSON.stringify(value)); }
  catch { throw new Error('No pudimos guardar el envío en esta computadora. Tu respuesta sigue disponible; probá de nuevo.'); }
}
function clave(usuario, sesion, canal) { return `monse_envio_${usuario}_${sesion}_${canal}`; }
export function leerEnvioPendiente(storage, usuario, sesion) {
  const raw=storage.getItem(clave(usuario,sesion,'respuesta'));
  if(!raw)return null;
  const saved=JSON.parse(raw);
  return saved.confirmado ? null : saved.payload;
}
export async function fetchRegistrado(url, options, usuario, storage=localStorage, fetcher=fetch) {
  const payload=JSON.parse(options.body), canal=url.endsWith('/ayuda')?'ayuda':'respuesta';
  const key=clave(usuario,payload.sesion_id,canal);
  const huella=JSON.stringify([payload.respuesta_usuario || '',Boolean(payload.no_visto),Boolean(payload.resuelto_con_ayuda)]);
  let record=JSON.parse(storage.getItem(key)||'null');
  if(record && !record.confirmado && record.huella!==huella) {
    throw new Error('Quedó un envío sin confirmar. Recargá la página para retomar esa respuesta antes de cambiarla.');
  }
  if(!record || record.huella!==huella || (canal==='ayuda' && record.confirmado)) {
    record={huella,payload:{...payload,envio_id:crypto.randomUUID()},confirmado:false};
  }
  // Save before sending. A reload or lost HTTP response must reuse the same ID.
  guardar(storage,key,record);
  let response;
  try { response=await fetcher(url,{...options,body:JSON.stringify(record.payload)}); }
  catch { throw new Error('Se cortó la conexión. Tu respuesta quedó guardada; volvé a enviarla.'); }
  if(response.ok){
    const recibo=await response.clone().json();
    guardar(storage,key,{...record,confirmado:true,recibo});
  }
  return response;
}
