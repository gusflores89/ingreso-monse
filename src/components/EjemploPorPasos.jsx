import LeerConsigna from './LeerConsigna';
export default function EjemploPorPasos({pasos=[],indice=0,onIndice}) {
 const actual=Math.min(Math.max(indice,0),Math.max(pasos.length-1,0));
 if(!pasos.length)return null;
 return <section aria-label="Ejemplo paso a paso" className="lesson-steps">
  <p>Paso {actual+1} de {pasos.length}</p>
  <article className="lesson-step-row"><span aria-hidden="true">{actual+1}</span><p>{pasos[actual]}</p></article>
  <LeerConsigna texto={pasos[actual]} />
  <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
   <button type="button" disabled={!actual} onClick={()=>onIndice(actual-1)}>Paso anterior</button>
   <button type="button" disabled={actual===pasos.length-1} onClick={()=>onIndice(actual+1)}>Ver siguiente paso</button>
  </div>
 </section>;
}
