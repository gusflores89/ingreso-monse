// Cola serial: conservar la operación pendiente permite reintentar tras perder su respuesta HTTP.
export function crearSincronizador({usuario,storage,fetcher,onStatus=()=>{},uuid=()=>crypto.randomUUID(),delay=900}) {
  const localKey='monse_mision_'+usuario, metaKey='monse_sync_'+usuario, ownerKey=metaKey+'_owner', instance=uuid();
  let meta=JSON.parse(storage.getItem(metaKey)||'null') || {revision:0}, disponible=false, listo=false, bloqueado=false, timer=null, running=null;
  const guardarMeta=()=>storage.setItem(metaKey,JSON.stringify(meta));
  const estadoLocal=()=>JSON.parse(storage.getItem(localKey)||'null');
  async function leer() {
    const r=await fetcher('/api/sesion/continuidad?user_id='+encodeURIComponent(usuario));const json=await r.json();if(!r.ok || typeof json.disponible!=='boolean')throw Error('No se pudo consultar la copia sincronizada.');return json;
  }
  function aplicar(estado){if(!estado)return false;const prev=estado.estrellas || 0;estado.estrellas=Math.max(prev,Number(storage.getItem('monse_estrellas_'+usuario)) || 0);storage.setItem(localKey,JSON.stringify(estado));storage.setItem('monse_estrellas_'+usuario,String(estado.estrellas));return estado.estrellas>prev;}
  async function iniciar() {
    storage.setItem(ownerKey,instance);
    try {
      const remote=await leer();disponible=remote.disponible;listo=true;
      if(disponible && !puedeEditar()){bloqueado=true;onStatus('conflicto');return false;}
      if(!disponible){onStatus('local');return true;}
      if(meta.pendiente){if(!await flush())return false;const next=await leer();aplicar(next.estado);meta.revision=next.revision;guardarMeta();onStatus('guardado');return true;}
      if(meta.sucio && remote.revision!==meta.revision){bloqueado=true;onStatus('conflicto');return false;}
      if(meta.sucio)return await flush();
      let importoEstrellas=false;
      if(remote.estado){
        const local=estadoLocal();if(local && !Object.hasOwn(meta,'sincronizado') && JSON.stringify(local)!==JSON.stringify(remote.estado)){storage.setItem(localKey+'_respaldo',JSON.stringify(local));}
        importoEstrellas=aplicar(remote.estado);
      }
      meta={revision:remote.revision,sincronizado:true};
      if(importoEstrellas || (!remote.estado && estadoLocal())){meta.sucio=true;guardarMeta();return await flush();}
      guardarMeta();onStatus('guardado');return true;
    } catch {onStatus('error');return false;}
  }
  function puedeEditar(){return !disponible || storage.getItem(ownerKey)===instance;}
  function programar(){if(!listo || !disponible || bloqueado || !puedeEditar())return;meta.sucio=true;guardarMeta();onStatus('pendiente');clearTimeout(timer);timer=setTimeout(()=>{flush().catch(()=>{});},delay);}
  async function guardarCola() {
    while(meta.pendiente || meta.sucio){
      if(!puedeEditar()){bloqueado=true;onStatus('conflicto');return false;}
      if(!meta.pendiente){meta.pendiente={user_id:usuario,revision:meta.revision,envio_id:uuid(),estado:estadoLocal()};guardarMeta();}
      const r=await fetcher('/api/sesion/continuidad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(meta.pendiente)});
      if(!puedeEditar() || r.status===409){bloqueado=true;onStatus('conflicto');return false;}
      if(r.status===400){meta.pendiente=null;meta.sucio=true;guardarMeta();}
      if(!r.ok)throw Error('No se pudo sincronizar.');const json=await r.json();
      const cambio=JSON.stringify(estadoLocal())!==JSON.stringify(meta.pendiente.estado);
      meta.revision=json.revision;meta.sincronizado=true;meta.pendiente=null;meta.sucio=cambio;guardarMeta();
      if(!meta.sucio){const local=estadoLocal();if(local){local.estrellas=Math.max(local.estrellas || 0,json.estado?.estrellas || 0);storage.setItem(localKey,JSON.stringify(local));storage.setItem('monse_estrellas_'+usuario,String(local.estrellas));}}
    }
    onStatus('guardado');return true;
  }
  async function flush(){clearTimeout(timer);if(!disponible)return listo;if(bloqueado)return false;if(running)return running;running=guardarCola().catch(()=>{onStatus('error');return false;}).finally(()=>{running=null;});return running;}
  async function cargarRemoto(){try{const remote=await leer();if(!remote.disponible)return false;const local=estadoLocal();if(local)storage.setItem(localKey+'_respaldo',JSON.stringify(local));aplicar(remote.estado);meta={revision:remote.revision,sincronizado:true};guardarMeta();return true;}catch{onStatus('error');return false;}}
  function detener(){clearTimeout(timer);if(storage.getItem(ownerKey)===instance)storage.removeItem(ownerKey);}
  return {iniciar,programar,flush,cargarRemoto,detener,puedeEditar};
}
