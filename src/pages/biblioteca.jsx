import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LecturaModulo from '@/components/LecturaModulo';
import ApoyoVisual from '@/components/ApoyoVisual';
import { getFichaBase, getUnidadesPublicas } from '@/lib/apuntes-bases';
import nombres from '@/lib/nombres-temas.json';
import { coincideBusqueda } from '@/lib/busqueda-biblioteca';
import styles from '@/components/LecturaModulo.module.css';
const normalizar=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export default function Biblioteca(){
 const router=useRouter();
 const userId=typeof router.query.user_id==='string'?router.query.user_id:'';
 const tema=typeof router.query.tema==='string'?router.query.tema:'';
 const unidadId=typeof router.query.unidad==='string'?router.query.unidad:'';
 const [catalogo,setCatalogo]=useState(null),[error,setError]=useState(''),[materia,setMateria]=useState('Todas'),[busqueda,setBusqueda]=useState(''),[retry,setRetry]=useState(0),[avance,setAvance]=useState(null);
 useEffect(()=>{if(!userId||tema)return;let activo=true;setError('');setCatalogo(null);
  fetch(`/api/fichas?user_id=${encodeURIComponent(userId)}`).then(async r=>{const d=await r.json();if(!r.ok)throw Error(d.error);return d;}).then(d=>{if(activo)setCatalogo(d.catalogo);}).catch(e=>{if(activo)setError(e.message);});return()=>{activo=false;};
 },[userId,tema,retry]);
 useEffect(()=>{setAvance(null);if(!userId||!tema||!unidadId)return;let activo=true;
  fetch(`/api/biblioteca?user_id=${encodeURIComponent(userId)}&tema=${encodeURIComponent(tema)}`).then(async r=>{if(!r.ok)throw Error();return r.json();}).then(d=>{if(activo)setAvance(d);}).catch(()=>{if(activo)setAvance({error:true});});return()=>{activo=false;};
 },[userId,tema,unidadId]);
 if(!router.isReady)return <main className={styles.reader}>Cargando…</main>;
 if(!userId)return <main className={styles.reader}><h1>Mi biblioteca</h1><a href="/">Ingresá con tu cuenta para ver el avance.</a></main>;
 const base=`/biblioteca?user_id=${encodeURIComponent(userId)}`,volver=`/tutoria?user_id=${encodeURIComponent(userId)}`;
 const enlace=(t,u)=>`${base}&tema=${encodeURIComponent(t)}${u?`&unidad=${encodeURIComponent(u)}`:''}`;
 if(tema&&unidadId){
  const unidades=getUnidadesPublicas(tema),u=unidades.find(x=>x.id===unidadId);
  if(!u)return <main className={styles.reader}><h1>Esta explicación no está disponible</h1><a href={base}>Volver a la biblioteca</a></main>;
  const i=unidades.indexOf(u),estado=avance?.unidades?.find(x=>x.id===u.id);
  return <main className={styles.reader}>
   <a href={base}>Todos los temas</a><p className={styles.eyebrow}>{nombres[tema]} · idea {i+1} de {unidades.length}</p>
   <h1>{u.titulo}</h1><p>{u.explicacion}</p><ApoyoVisual datos={u.visual} permitirExplorar />
   <section className={styles.scene}><h2>Miremos un ejemplo</h2><p>{u.ejemplo}</p><ol>{u.pasos.map((p,j)=><li key={j}>{p}</li>)}</ol></section>
   <p className={styles.guidance}>{u.pista}</p>
   {u.actividad_en_papel&&<section className={styles.contrast}><h2>Probalo en papel</h2><p>{u.actividad_en_papel}</p><p className={styles.note}>{u.alcance_evidencia}</p></section>}
   <p className={styles.note}>{estado?estado.etiqueta:avance?.error?'No pudimos cargar el avance.':'Cargando el avance…'} Consultar esta página no cuenta como práctica.</p>
   <div className={styles.actions}>{i>0&&<a href={enlace(tema,unidades[i-1].id)}>Idea anterior</a>}{i<unidades.length-1&&<a href={enlace(tema,unidades[i+1].id)}>Siguiente idea</a>}</div>
   <p><a href={`${getFichaBase(tema).pdf_url}?r=27#page=${i+1}`} target="_blank" rel="noopener noreferrer">Esta explicación en el PDF completo</a></p>
   <p><a href={`${volver}&tema=${encodeURIComponent(tema)}&modo=REPASO`}>Volver a mi recorrido con ayuda</a></p><p className={styles.note}>La tutoría retoma la habilidad que necesitás practicar; leer otras ideas no salta ese paso.</p>
  </main>;
 }
 if(tema)return <main><p className={styles.reader}><a href={base}>Todos los temas y explicaciones</a></p><LecturaModulo key={`${userId}:${tema}`} userId={userId} tema={tema} releer onContinuar={()=>router.push(`${volver}&tema=${encodeURIComponent(tema)}&modo=REPASO`)} /></main>;
 const query=normalizar(busqueda),visibles=catalogo?.filter(f=>(materia==='Todas'||f.materia===materia)&&coincideBusqueda([nombres[f.tema],f.titulo,...getUnidadesPublicas(f.tema).map(u=>u.titulo+' '+u.ejemplo+' '+u.explicacion)].join(' '),query));
 return <main className={styles.reader}>
  <a href={volver}>Volver a mi misión</a><h1>Mi biblioteca para entender</h1><p>Elegí una idea por vez. La ficha te presenta el tema; el apunte completo reúne todas sus explicaciones.</p>
  <label className={styles.search}>Buscar un tema o una idea<input type="search" value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Radio, sumar fracciones, verbos…" /></label>
  <div className={styles.filter} aria-label="Filtrar fichas">{['Todas','Matemática','Lengua'].map(m=><button key={m} aria-pressed={materia===m} onClick={()=>setMateria(m)}>{m}</button>)}</div>
  {error&&<div role="alert"><p>{error}</p><button onClick={()=>setRetry(n=>n+1)}>Volver a intentar</button></div>}
  {!catalogo&&!error&&<p role="status">Cargando tus lecturas…</p>}{catalogo&&<p role="status">{visibles.length} temas encontrados</p>}
  <div className={styles.catalog}>{visibles?.map(f=>{const us=getUnidadesPublicas(f.tema),apunte=getFichaBase(f.tema);return <article key={f.tema} className={styles.card}>
   <small>{f.materia}</small><h2>{nombres[f.tema]}</h2><p>{f.titulo}</p><p className={styles.note}>{f.completada?'Ficha inicial recorrida':f.paso?`Ficha inicial · paso ${f.paso+1} de 4`:'Ficha inicial por descubrir'}. Leer y dominar una habilidad son pasos diferentes.</p>
   <a href={enlace(f.tema)}>{f.completada?'Releer la ficha inicial':'Empezar por la ficha'}</a><a href={f.pdf_url} target="_blank" rel="noopener noreferrer">PDF de introducción · 2 páginas</a>
   {apunte&&<a href={`${apunte.pdf_url}?r=27`} target="_blank" rel="noopener noreferrer">Apunte completo · {us.length} ideas</a>}
   <details open={Boolean(query)}><summary>Explorar {us.length} explicaciones</summary><ol className={styles.unitList}>{us.map(u=><li key={u.id}><a href={enlace(f.tema,u.id)}>{u.titulo}</a></li>)}</ol></details>
  </article>;})}</div>
 </main>;
}
