export default function BarrasFraccion({ barras }) {
 if (!Array.isArray(barras)) return null;
 return <div style={{width:'min(100%, 560px)',margin:'20px auto',color:'var(--ink, #f8fafc)'}}>
  {barras.map((b,i) => <figure key={i} style={{margin:'16px 0'}}>
   <figcaption style={{marginBottom:8,fontWeight:700}}>{b.label}</figcaption>
   <div role="img" aria-label={`${b.label}: ${b.partes.length} partes, ${b.pintadas} pintadas. Tamaños relativos: ${b.partes.join(', ')}.`} style={{display:'flex',height:56,border:'2px solid #c4b5fd',borderRadius:8,overflow:'hidden'}}>
    {b.partes.map((peso,j)=><span key={j} style={{flex:peso,background:j<b.pintadas?'#38bdf8':'#1e293b',borderRight:j<b.partes.length-1?'2px solid #e2e8f0':0}} />)}
   </div>
  </figure>)}
 </div>;
}
