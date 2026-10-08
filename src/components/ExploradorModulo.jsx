import {useState} from 'react';
import dynamic from 'next/dynamic';
import {getTopicMeta} from '@/lib/curriculum';
import styles from './ExploradorModulo.module.css';

const carga=()=> <p role="status">Preparando los objetos para explorar…</p>;
const Matematicas=dynamic(()=>import('./ExploradorMatematicas'),{loading:carga});
const Lengua=dynamic(()=>import('./ExploradorLengua'),{loading:carga});

// This is an ungraded sandbox, never an answer submission or mastery event.
export default function ExploradorModulo({tema,plegado=false}){
 const [reinicio,setReinicio]=useState(0);
 const [abierto,setAbierto]=useState(!plegado);
 const meta=getTopicMeta(tema);
 if(!meta)return null;
 const contenido=<section aria-label="Laboratorio para entender" data-explorador-tema={tema}>
  {meta.materia==='matematica'?<Matematicas key={tema+':'+reinicio} tema={tema}/>:<Lengua key={tema+':'+reinicio} tema={tema}/>}
  <div className={styles.root} style={{marginTop:0,padding:'0 18px 12px',border:0,background:'transparent'}}>
   <p className={styles.caption}>Podés probar y volver a empezar. Explorar no lleva nota ni cambia tu progreso.</p>
   <button type="button" className={styles.secondary} onClick={()=>setReinicio(n=>n+1)}>Volver al ejemplo inicial</button>
  </div>
 </section>;
 if(plegado)return <details className={styles.shell} onToggle={e=>setAbierto(e.currentTarget.open)}><summary>Explorar con ejemplos interactivos</summary>{abierto&&contenido}</details>;
 return contenido;
}
