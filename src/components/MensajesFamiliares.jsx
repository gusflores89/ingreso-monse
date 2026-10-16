import { useEffect, useState } from "react";

const boton={background:"#0f2b48",color:"#ffffff",border:"1.5px solid #38bdf8",borderRadius:10,padding:"10px 18px",minHeight:44,fontWeight:700,fontSize:"0.88rem",boxShadow:"0 2px 8px rgba(0,0,0,0.3)"};
const dia=v=>v ? new Intl.DateTimeFormat("es-AR",{timeZone:"America/Argentina/Buenos_Aires",dateStyle:"short"}).format(new Date(v)) : "";
export default function MensajesFamiliares({userId}) {
  const [abierto,setAbierto]=useState(false),[pagina,setPagina]=useState(0),[data,setData]=useState(null),[error,setError]=useState(""),[loading,setLoading]=useState(false),[refresh,setRefresh]=useState(0);
  useEffect(()=>{
    if(!abierto)return;
    const control=new AbortController();setLoading(true);setData(null);setError("");
    fetch(`/api/familia/recorrido?user_id=${encodeURIComponent(userId)}&vista=devoluciones&pagina=${pagina}`,{signal:control.signal})
      .then(async r=>{const json=await r.json();if(!r.ok)throw Error("No pudimos abrir tus mensajes. Podés seguir con tu reto y probar después.");if(!control.signal.aborted)setData(json);})
      .catch(e=>{if(!control.signal.aborted)setError(e.message);}).finally(()=>{if(!control.signal.aborted)setLoading(false);});
    return ()=>control.abort();
  },[abierto,userId,pagina,refresh]);
  return <section aria-label="Mensajes de tu familia" style={{maxWidth:720,margin:"12px auto",color:"#f1f5f9",overflowWrap:"anywhere"}}>
    <button type="button" style={boton} aria-expanded={abierto} aria-controls="mensajes-familia" onClick={()=>setAbierto(v=>!v)}>Mensajes de tu familia</button>
    {abierto && <div id="mensajes-familia" style={{marginTop:12,padding:20,border:"1px solid #64748b",borderRadius:14,background:"#132238",lineHeight:1.6}}>
      <p>Acá podés volver a leer lo que conversaron sobre tus escritos. Tu reto sigue donde lo dejaste.</p>
      {loading && <p role="status">Buscando mensajes…</p>}
      {error && <p role="alert">{error}</p>}
      {data && <>
        {!data.sesiones?.length && <p>Todavía no hay mensajes en esta página. Cuando tu familia comente un escrito, podés leerlo acá.</p>}
        {(data.sesiones || []).map(s=><article key={s.id} style={{borderTop:"1px solid #64748b",paddingTop:12,marginTop:16}}>
          <h3>{s.titulo || s.tema.replace(/_/g," ")}</h3>
          {[...(s.revisiones_anteriores || []),...(s.revision ? [s.revision] : [])].map((r,i)=><section key={i} aria-label="Mensaje familiar" style={{marginBottom:20}}>
            <p><strong>Tu familia · {dia(r.fecha)}</strong></p><p style={{whiteSpace:"pre-wrap"}}>{r.comentario}</p>
            <details><summary style={{cursor:"pointer",minHeight:44}}>Volver a leer mi escrito</summary>
              {r.texto_lectura && <><strong>Texto que leíste</strong><p style={{whiteSpace:"pre-wrap"}}>{r.texto_lectura}</p></>}
              {r.pregunta && <p style={{whiteSpace:"pre-wrap"}}>{r.pregunta}</p>}
              {r.respuesta ? <><strong>Lo que escribiste</strong><p style={{whiteSpace:"pre-wrap"}}>{r.respuesta}</p></> : <p>Este mensaje antiguo no conserva una copia del escrito.</p>}
            </details>
          </section>)}
        </article>)}
      </>}
      <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center",marginTop:16}}>
        <button style={boton} type="button" disabled={loading} onClick={()=>setRefresh(v=>v+1)}>Actualizar mensajes</button>
        <button style={boton} type="button" disabled={loading || pagina===0} onClick={()=>setPagina(p=>p-1)}>Página anterior</button>
        <span>Página {pagina+1}</span>
        <button style={boton} type="button" disabled={loading || !data?.hay_mas} onClick={()=>setPagina(p=>p+1)}>Más mensajes</button>
      </div>
    </div>}
  </section>;
}
