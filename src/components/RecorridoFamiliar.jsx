import { useEffect, useRef, useState } from "react";
const nombre = v => String(v || "Actividad").replace(/_/g," ");
function fecha(v) { return v ? new Intl.DateTimeFormat("es-AR",{timeZone:"America/Argentina/Buenos_Aires",dateStyle:"short",timeStyle:"short"}).format(new Date(v.endsWith("Z") || /[+-]\d\d:\d\d$/.test(v) ? v : v+"Z")) : "Fecha no registrada"; }
export default function RecorridoFamiliar({userId, nombreAlumno = "tu hijo/a"}) {
  const [vista,setVista]=useState("pendientes"),[pagina,setPagina]=useState(0),[data,setData]=useState(null),[error,setError]=useState(""),[loading,setLoading]=useState(false),[refresh,setRefresh]=useState(0);
  useEffect(()=>{
    const control=new AbortController();setLoading(true);setError("");setData(null);
    fetch(`/api/familia/recorrido?user_id=${encodeURIComponent(userId)}&vista=${vista}&pagina=${pagina}`,{signal:control.signal})
      .then(async r=>{const json=await r.json();if(!r.ok)throw Error(json.error || "No se pudo cargar el recorrido.");if(!control.signal.aborted)setData(json);})
      .catch(e=>{if(e.name!=="AbortError")setError(e.message);}).finally(()=>{if(!control.signal.aborted)setLoading(false);});
    return ()=>control.abort();
  },[userId,vista,pagina,refresh]);
  return <section className="dashboard-panel dashboard-section" aria-label="Recorrido de aprendizaje" style={{overflowWrap:"anywhere"}}>
    <h3>Recorrido de aprendizaje</h3>
    <p>Los intentos y las ayudas muestran cómo fue aprendiendo. Pedir apoyo no resta valor al trabajo.</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:12,margin:"16px 0"}}>
      <button type="button" aria-pressed={vista==="pendientes"} style={vista==="pendientes"?{border:"2px solid #075985",background:"#e0f2fe",color:"#0c4a6e"}:{}} onClick={()=>{setVista("pendientes");setPagina(0);}}>Entregas para comentar</button>
      <button type="button" aria-pressed={vista==="historial"} style={vista==="historial"?{border:"2px solid #075985",background:"#e0f2fe",color:"#0c4a6e"}:{}} onClick={()=>{setVista("historial");setPagina(0);}}>Actividades e intentos</button>
      <button type="button" aria-pressed={vista==="escritos"} style={vista==="escritos"?{border:"2px solid #075985",background:"#e0f2fe",color:"#0c4a6e"}:{}} onClick={()=>{setVista("escritos");setPagina(0);}}>Escritos y resúmenes</button>
      <button type="button" disabled={loading} onClick={()=>setRefresh(v=>v+1)}>Actualizar recorrido</button>
    </div>
    {loading && <p role="status">Cargando recorrido…</p>}
    {error && <p role="alert">{error}</p>}
    {data && <>
      {!data.sesiones.length && <p>{vista==="pendientes"?"No hay entregas digitales pendientes de devolución. Las tareas en papel se muestran debajo.":"Todavía no hay actividades registradas en esta página."}</p>}
      {data.sesiones.map(s=><Actividad key={s.id+":"+s.version_respuesta} sesion={s} nombreAlumno={nombreAlumno} alGuardar={()=>setRefresh(v=>v+1)} />)}
      <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:12,marginTop:16}}>
        <button type="button" disabled={pagina===0 || loading} onClick={()=>setPagina(p=>p-1)}>Página anterior</button>
        <span>Página {pagina+1}</span>
        <button type="button" disabled={!data.hay_mas || loading} onClick={()=>setPagina(p=>p+1)}>Página siguiente</button>
      </div>
    </>}
  </section>;
}
function Actividad({sesion:s,alGuardar,nombreAlumno = "tu hijo/a"}) {
  const [comentario,setComentario]=useState(""),[error,setError]=useState(""),[guardando,setGuardando]=useState(false),[guardada,setGuardada]=useState(false),enCurso=useRef(false);
  async function guardar(e) {
    e.preventDefault();if(enCurso.current)return;enCurso.current=true;setGuardando(true);setError("");
    try {const r=await fetch("/api/familia/devolucion",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sesion_id:s.id,comentario,version_respuesta:s.version_respuesta})});const json=await r.json();if(!r.ok)throw Error(json.error || "No se pudo guardar.");setGuardada(true);}
    catch(e){setError(e.message);}finally{setGuardando(false);enCurso.current=false;}
  }
  return <details style={{borderTop:"1px solid #64748b",padding:"16px 0"}}>
    <summary style={{cursor:"pointer",lineHeight:1.6}}><strong>{s.titulo || nombre(s.tema)}</strong> · {s.estado}<br/><small>Actividad del {fecha(s.fecha)} · {nombre(s.tipo)}</small></summary>
    {s.texto_lectura && <section aria-label="Texto original"><strong>Texto original</strong><p style={{whiteSpace:"pre-wrap"}}>{s.texto_lectura}</p></section>}
    <p style={{whiteSpace:"pre-wrap"}}>{s.pregunta || "Consigna no disponible en este registro."}</p>
    {s.instrucciones && <p style={{whiteSpace:"pre-wrap"}}><strong>Consigna: </strong>{s.instrucciones}</p>}
    {s.criterios?.length > 0 && <><strong>Aspectos para conversar</strong><ul>{s.criterios.map(c=><li key={c.nombre}>{nombre(c.nombre)}: {c.detalle}</li>)}</ul></>}
    {s.aspectos_escritura?.length > 0 && <><strong>Ideas que practicamos</strong><ul>{s.aspectos_escritura.map(c=><li key={c.id}>{c.detalle} <small>({c.estado === "logrado" ? "el tutor la reconoció" : c.estado === "revisar" ? "el tutor sugirió revisarla" : "sin evaluación concluyente"})</small></li>)}</ul><p>La revisión del tutor puede equivocarse. Compará estas ideas con el texto de {nombreAlumno} antes de conversar.</p></>}
    {s.exploracion_concreta && <p>Observación inicial con objetos; no acredita un tema ni habilita exámenes.{s.apoyo_acceso ? ' Usó lectura de la consigna; eso no se cuenta como pista matemática.' : ''}</p>}
    {s.respuesta && <p style={{whiteSpace:"pre-wrap"}}><strong>Última respuesta guardada: </strong>{s.respuesta}</p>}
    {!s.detalle_disponible && <p>Este registro no conserva el detalle de intentos y ayudas. No permite inferir que respondió sin apoyo.</p>}
    {s.detalle_disponible && <><p>{s.intentos} intentos evaluados. Una solicitud de explicación no cuenta como error.</p><ol>
      {s.eventos.map(e=><li key={e.id} style={{marginBottom:16}}><strong>{e.estado}</strong> · {fecha(e.fecha)}
        {e.respuesta && <p style={{whiteSpace:"pre-wrap"}}>Respuesta: {e.respuesta}</p>}
        {e.devolucion && <p style={{whiteSpace:"pre-wrap"}}>Tutor: {e.devolucion}</p>}
      </li>)}
    </ol></>}
    {[...(s.revisiones_anteriores || []),...(s.revision ? [s.revision] : [])].map((r,i)=><section key={i} aria-label="Devolución familiar guardada"><p style={{whiteSpace:"pre-wrap"}}><strong>Devolución familiar ({fecha(r.fecha)}): </strong>{r.comentario}</p>{r.respuesta && <p style={{whiteSpace:"pre-wrap"}}>Sobre este escrito: {r.respuesta}</p>}</section>)}
    {s.puede_comentar && (guardada ? <div role="status"><p>Devolución guardada. {nombreAlumno} puede leerla en «Mensajes de tu familia». La devolución no cambia la nota ni aprueba el tema.</p><button type="button" onClick={alGuardar}>Volver a la lista actualizada</button></div> : <form onSubmit={guardar}>
      <p>Revisá la producción junto con {nombreAlumno}. Contale qué logró y proponé un próximo paso. Esta devolución no asigna una nota ni aprueba el tema.</p>
      <label>Devolución para conversar con {nombreAlumno}<textarea disabled={guardando} required maxLength={2000} rows={4} value={comentario} onChange={e=>setComentario(e.target.value)} style={{width:"100%",boxSizing:"border-box"}} /></label>
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={guardando || !comentario.trim()}>{guardando?"Guardando devolución…":"Guardar devolución"}</button>
    </form>)}
  </details>;
}
