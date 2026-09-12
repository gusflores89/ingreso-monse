import { useEffect, useState } from "react";

export default function RepasoSugerido({ userId, onStart, loading, refrescar }) {
 const [repaso,setRepaso]=useState(null),[oculto,setOculto]=useState(false),[fallo,setFallo]=useState(false);
 useEffect(()=>{
  const controller=new AbortController();setFallo(false);setRepaso(null);setOculto(false);
  fetch('/api/sesion/repasos?user_id='+encodeURIComponent(userId),{signal:controller.signal})
   .then(async r=>{if(!r.ok)throw new Error('repasos');const data=await r.json();if(!controller.signal.aborted)setRepaso(Array.isArray(data.repasos)?data.repasos[0] || null:null);})
   .catch(e=>{if(e.name!=='AbortError')setFallo(true);});
  return ()=>controller.abort();
 },[userId,refrescar]);
 if(oculto)return null;
 if(fallo)return <p style={{color:'#cbd5e1',fontSize:14}}>Los repasos no están disponibles ahora. Podés continuar con tu misión.</p>;
 if(!repaso)return null;
 return <section aria-label="Repaso sugerido" style={{border:'1px solid #38bdf8',borderRadius:14,padding:18,margin:'16px auto',maxWidth:640,background:'#132238',color:'#f8fafc'}}>
  <strong>Recordemos algo que ya aprendiste</strong>
  <p style={{margin:'8px 0',lineHeight:1.5}}>{repaso.titulo}. {repaso.necesita_explicacion?'Primero lo miramos juntos y después probás.':'Un reto breve para volver a usar esta idea.'}</p>
  <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
   <button type="button" disabled={loading} onClick={()=>onStart(repaso.objetivo_id)} style={{background:'#075985',color:'#f8fafc',padding:'12px 18px',border:'1px solid #38bdf8',borderRadius:10,minHeight:44}}>Repasar 1 reto</button>
   <button type="button" disabled={loading} onClick={()=>setOculto(true)} style={{background:'transparent',color:'#e2e8f0',padding:'12px 18px',border:'1px solid #64748b',borderRadius:10,minHeight:44}}>Ahora no</button>
  </div>
 </section>;
}
