import { HABILIDADES_CONCRETAS, estadoInicialConcreto, distribucionEsperada, cantidadEsperada } from '@/lib/recorrido-concreto';
import LeerConsigna from './LeerConsigna';
import styles from './TallerConcreto.module.css';

function Fichas({cantidad}) {return <span className={styles.fichas} aria-label={`${cantidad} fichas`}>{Array.from({length:cantidad},(_,i)=><span key={i} aria-hidden="true" className={styles.ficha}>●</span>)}</span>;}
export default function TallerConcreto({reto,respuesta,onChange,onEnviar,onAyuda,evaluacion,loading,onSiguiente,onVolver,onElegir}) {
 let s;try{s=JSON.parse(respuesta);}catch{}s=s && Array.isArray(s.tablero)?s:estadoInicialConcreto(reto);
 const cambiar=updates=>onChange(JSON.stringify({...s,...updates}));
 const fraccion=reto.tipo_tablero==='fraccion',modelo=s.fase==='modelo';
 const esperada=distribucionEsperada(reto),base=estadoInicialConcreto(reto);
 const pasosModelo=fraccion?reto.b:esperada.reduce((a,b)=>a+b,0)-(reto.tipo_tablero==='juntar'?reto.a:0);
 const modelTab=base.tablero.slice();
 for(let n=0;n<s.modelo;n++) {const lugar=reto.tipo_tablero==='repartir'?n%modelTab.length:reto.tipo_tablero==='grupos'?Math.floor(n/reto.b):0; if(lugar<modelTab.length)modelTab[lugar]++;}
 const tablero=modelo?modelTab:s.tablero;
 const seleccion=modelo?Array.from({length:Math.min(s.modelo,reto.b || 0)},(_,i)=>i):s.seleccion;
 const enviados=tablero.reduce((a,b)=>a+b,0);
 const totalDisponible=reto.tipo_tablero==='grupos'?reto.a*reto.b:reto.tipo_tablero==='repartir'?reto.a:null;
 const necesitaCantidad=!fraccion && reto.tipo_tablero!=='cantidad';
 const preguntaCantidad=reto.tipo_tablero==='quitar'?'Mostrá cuántas fichas quedaron afuera.':reto.tipo_tablero==='repartir'?'Mostrá cuántas recibió cada plato.':'Mostrá cuántas fichas hay en total.';
 const consigna=modelo?reto.idea:s.fase==='cantidad'?preguntaCantidad:reto.consigna;
 const correcto=evaluacion?.completado;
 const accionTablero=(i,delta)=>{const next=s.tablero.slice();next[i]+=delta;cambiar({tablero:next});};
 const ayuda=async()=>{if(await onAyuda())cambiar({fase:'modelo',modelo:0,modeloVisto:true});};
 return <section className={styles.taller} aria-label="Taller con objetos">
  <p className={styles.etiqueta}>Probemos con objetos · Sin apuro</p><h2>{reto.titulo}</h2>
  <p className={styles.consigna} aria-live="polite">{consigna}</p>
  <LeerConsigna texto={consigna} disabled={loading} onLectura={()=>cambiar({lectura:true})} />
  {modelo && <p>{s.modelo===0?'Mirá cómo empezamos.':fraccion?'Pintamos una parte por vez.':'Una ficha por vez. Podemos contarlas.'}</p>}
  <div className={styles.escena}>
   {fraccion ? <>
    <p>Un entero, dividido en {reto.a} partes iguales.</p>
    <div className={styles.entero} style={{gridTemplateColumns:`repeat(${reto.habilidad==='mitades' && reto.variante===2?1:reto.a},1fr)`}} role="group" aria-label="Partes del mismo entero">
     {Array.from({length:reto.a},(_,i)=><button key={i} type="button" aria-label={`Parte ${i+1}`} aria-pressed={seleccion.includes(i)} disabled={loading || modelo || correcto} onClick={()=>cambiar({seleccion:s.seleccion.includes(i)?s.seleccion.filter(x=>x!==i):[...s.seleccion,i]})}>{seleccion.includes(i)?'●':'○'}</button>)}
    </div>
    {reto.habilidad==='cuartos' && reto.b===2 && <><p>Esta mitad pertenece a un entero del mismo tamaño.</p><div className={styles.referencia} aria-label="Mitad del mismo entero"><span /><span /></div></>}
   </> : <>
    {totalDisponible!==null && <div><p>Quedan en la mesa: {totalDisponible-enviados}</p><Fichas cantidad={Math.max(0,totalDisponible-enviados)} /></div>}
    {reto.tipo_tablero==='quitar' && <div><p>Afuera</p><Fichas cantidad={Math.max(0,reto.a-tablero[0])} /></div>}
    <div className={styles.platos}>
     {tablero.map((n,i)=><div key={i} className={styles.plato}><p>{reto.tipo_tablero==='quitar'?'Caja':tablero.length>1?`Plato ${i+1}`:'Bandeja'}</p><Fichas cantidad={n} /><span className={styles.controles}>
      <button type="button" aria-label={`Quitar ficha ${i+1}`} disabled={loading||modelo||correcto||s.fase==='cantidad'||n<=(reto.tipo_tablero==='juntar'?reto.a:0)} onClick={()=>accionTablero(i,-1)}>−</button>
      <button type="button" aria-label={`Agregar ficha ${i+1}`} disabled={loading||modelo||correcto||s.fase==='cantidad'||n>=12||(totalDisponible!==null && enviados>=totalDisponible)||(reto.tipo_tablero==='quitar' && n>=reto.a)} onClick={()=>accionTablero(i,1)}>+</button>
     </span></div>)}
    </div>
    {s.fase==='cantidad' && <div className={styles.resultado}><p>Mi cantidad</p><Fichas cantidad={s.cantidad} /><div className={styles.controles}>
     <button type="button" aria-label="Quitar de mi cantidad" disabled={loading||correcto||s.cantidad<=0} onClick={()=>cambiar({cantidad:s.cantidad-1})}>−</button>
     <button type="button" aria-label="Agregar a mi cantidad" disabled={loading||correcto||s.cantidad>=12} onClick={()=>cambiar({cantidad:s.cantidad+1})}>+</button>
    </div></div>}
   </>}
  </div>
  {evaluacion && <p role="status" className={styles.feedback}>{evaluacion.retroalimentacion}</p>}
  <div className={styles.acciones}>
   {correcto?<button type="button" className="primary" disabled={loading} onClick={onSiguiente}>Siguiente reto</button>:modelo?<button type="button" className="primary" disabled={loading} onClick={()=>{
    if(s.modelo<pasosModelo)cambiar({modelo:s.modelo+1});
    else if((evaluacion?.intentos || 0)>=2)cambiar({fase:necesitaCantidad?'cantidad':'hacer',modeloVisto:true,tablero:esperada.length?esperada:base.tablero,seleccion:fraccion?Array.from({length:reto.b},(_,i)=>i):[],cantidad:cantidadEsperada(reto)||0});
    else cambiar({...estadoInicialConcreto(reto),fase:'hacer',modeloVisto:true,lectura:s.lectura});
   }}>{s.modelo<pasosModelo?'Mostrar un paso más':(evaluacion?.intentos || 0)>=2?'Ya lo hicimos juntos':'Ahora lo hago yo'}</button>:<>
    {necesitaCantidad && s.fase!=='cantidad'?<button type="button" className="primary" disabled={loading} onClick={()=>cambiar({fase:'cantidad'})}>Ahora cuento el resultado</button>:<button type="button" className="primary" disabled={loading} onClick={()=>onEnviar(JSON.stringify(s))}>{loading?'Guardando…':'Comprobar mi construcción'}</button>}
    {s.fase==='cantidad' && <button type="button" disabled={loading} onClick={()=>cambiar({fase:'hacer'})}>Volver a mover fichas</button>}
    <button type="button" disabled={loading} onClick={ayuda}>Mostrámelo paso a paso</button>
   </>}
  </div>
  <details className={styles.explorar}><summary>Elegir otra idea para explorar</summary><div className={styles.acciones}>{HABILIDADES_CONCRETAS.map(h=><button key={h.id} type="button" disabled={loading} onClick={()=>onElegir(h.id)}>{h.titulo}</button>)}</div></details>
  <button type="button" disabled={loading} onClick={onVolver}>Volver a mi actividad anterior</button>
 </section>;
}
