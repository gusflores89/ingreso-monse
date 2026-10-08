import { useId, useState } from 'react';
import { getExploradorLengua, explicarOrdenHistoria } from '../lib/exploradores-lengua';
import styles from './ExploradorModulo.module.css';

const fichaStyle={display:'inline-block',border:'2px solid #5270a0',borderRadius:12,padding:'10px 14px',margin:4,fontSize:'1.2rem',lineHeight:1.5,background:'#fff',color:'#182b49'};
const destacadoStyle={background:'#fff0b3',color:'#352b00',padding:'2px 5px',borderRadius:4};

function Boton({children,activo,onClick,...props}){
 return <button type="button" className={`${styles.button} ${activo?styles.selected:''}`} style={{minHeight:44}} aria-pressed={activo===undefined?undefined:activo} onClick={onClick} {...props}>{children}</button>;
}
function Palabra({children}){return <span style={fichaStyle}>{children}</span>;}
function Respuesta({children}){return <p className={styles.explanation} role="status" aria-live="polite" aria-atomic="true">{children}</p>;}

function Taller({tema}){
 const datos=getExploradorLengua(tema);
 const [indice,setIndice]=useState(0);
 const [opcion,setOpcion]=useState(0);
 const [unir,setUnir]=useState(true);
 const [orden,setOrden]=useState([]);
 const [revisar,setRevisar]=useState(false);
 const [conectado,setConectado]=useState(false);
 const [interactuo,setInteractuo]=useState(false);
 const uid=useId();
 if(!datos)return null;
 const elegir=(i)=>{setIndice(i);setInteractuo(true);};
 const opciones=(items,actual,cambiar,etiqueta)=> <div className={styles.controls} role="group" aria-label={etiqueta}>{items.map((texto,i)=><Boton key={texto} activo={actual===i} onClick={()=>cambiar(i)}>{texto}</Boton>)}</div>;
 let contenido;
 switch(datos.tipo){
  case 'pistas':
   contenido=<><p className={styles.step}>{datos.pregunta}</p><div className={styles.choices} role="group" aria-label="Oraciones de la historia: elegí una pista">{datos.frases.map((f,i)=><Boton key={f.texto} activo={interactuo&&indice===i} onClick={()=>elegir(i)}>{f.texto}</Boton>)}</div><Respuesta>{interactuo?datos.frases[indice].explicacion:'Tocá una oración para mirar qué información aporta. No hace falta adivinar.'}</Respuesta></>;
   break;
  case 'familia':{
   const v=datos.variantes[indice];
   contenido=<>{opciones(datos.variantes.map(v=>v.control),indice,elegir,'Qué significado querés construir')}<div className={styles.scene} aria-label={`Construcción: ${datos.raiz} más ${v.final} forma ${v.palabra}`}><Palabra>{datos.raiz}</Palabra><span aria-hidden="true"> + </span><Palabra>{v.final}</Palabra><span aria-hidden="true"> → </span><Palabra><strong>{v.palabra}</strong></Palabra></div><p>{v.frase}</p><Respuesta>{v.explicacion}</Respuesta></>;
   break;
  }
  case 'sonido_u':{
   const v=datos.variantes[indice];
   contenido=<>{opciones(datos.variantes.map(v=>v.control),indice,elegir,'Cómo funciona la U')}<div className={styles.scene}><p><strong>{v.grupo}</strong> → {v.palabra}</p>{v.partes.map((p,i)=><Palabra key={i}>{p}</Palabra>)}<p>{v.frase}</p></div><Respuesta>{v.explicacion}</Respuesta></>;
   break;
  }
  case 'plural_z':{
   const v=datos.variantes[indice];
   contenido=<>{opciones(datos.variantes.map(v=>v.singular),indice,elegir,'Palabra para transformar')}{opciones(['Uno','Dos'],opcion,setOpcion,'Cantidad que queremos nombrar')}<div className={styles.scene}><p>{opcion?'Dos':v.articulo[0].toUpperCase()+v.articulo.slice(1)} <strong>{opcion?v.plural:v.singular}</strong></p><div aria-label={`${opcion?2:1} ${opcion?v.plural:v.singular}`}>{Array.from({length:opcion+1},(_,i)=><Palabra key={i}>{v.objeto}</Palabra>)}</div><p><span>{v.base}</span><mark style={destacadoStyle}>{opcion?'ces':'z'}</mark></p></div><Respuesta>{opcion?`Para nombrar dos, ${v.singular} cambia a ${v.plural}: reemplazamos la Z final por C y agregamos ES.`:`${v.singular} nombra uno y termina en Z. Tocá Dos para ver cómo cambia al plural.`}</Respuesta></>;
   break;
  }
  case 'acento':{
   const v=datos.variantes[indice];
   contenido=<><p className={styles.step}>Tocá la sílaba que querés hacer más fuerte.</p>{opciones(datos.silabas.map(s=>s.toUpperCase()),indice,elegir,'Sílaba que pronunciamos más fuerte')}<div className={styles.scene}><Palabra><strong>{v.palabra}</strong></Palabra><p>{v.frase}</p><p className={styles.caption}>Sílaba fuerte: {datos.silabas[indice].toUpperCase()}</p></div><Respuesta>{v.explicacion}</Respuesta></>;
   break;
  }
  case 'vocales':{
   const v=datos.variantes[indice];
   const cambiar=i=>{elegir(i);setUnir(datos.variantes[i].juntas);};
   const coincide=unir===v.juntas;
   contenido=<>{opciones(datos.variantes.map(v=>v.palabra),indice,cambiar,'Palabra para separar')}<p>Modelo: <strong>{v.correcto.join(' · ')}</strong>. Miramos {v.vocales}.</p>{opciones(['Juntar esas vocales','Separar esas vocales'],unir?0:1,i=>setUnir(i===0),'Cómo agrupás las vocales')}<div className={styles.scene} aria-label={`Tu prueba de separación para ${v.palabra}`}><p className={styles.caption}>Tu prueba — cada tarjeta es una sílaba:</p>{(unir?v.pruebaJunta:v.pruebaSeparada).map((s,i)=><Palabra key={i}>{s}</Palabra>)}</div><Respuesta>{coincide?v.explicacion:`Probaste otra separación. Para esta palabra usamos el modelo ${v.correcto.join('-')}. ${v.explicacion} Podés cambiar los grupos y compararlos.`}</Respuesta></>;
   break;
  }
  case 'sentido':{
   const v=datos.variantes[indice];
   contenido=<>{opciones(datos.variantes.map(v=>v.control),indice,elegir,'Qué querés decir')}<div className={styles.scene}><Palabra>{v.palabra}</Palabra><p>{v.frase}</p></div><Respuesta>{v.explicacion}</Respuesta></>;
   break;
  }
  case 'nombres':{
   const v=datos.variantes[indice];
   contenido=<>{opciones(datos.variantes.map(v=>v.control),indice,elegir,'Qué vamos a nombrar')}{opciones(['Una clase: común','Uno en particular: propio'],opcion,setOpcion,'Forma de nombrar')}<div className={styles.scene}><Palabra>{opcion?v.propio:v.comun}</Palabra><p>{opcion?v.frasePropio:v.fraseComun}</p></div><Respuesta>{v.explicacion} {opcion?'El nombre propio empieza con mayúscula.':'El nombre común va en minúscula cuando no empieza una oración.'}</Respuesta></>;
   break;
  }
  case 'tiempo':{
   const v=datos.variantes[indice];
   contenido=<><div className={styles.scene}><div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}} aria-label="Línea del tiempo: ayer, hoy, mañana">{datos.variantes.map((v,i)=><span key={v.control} style={{display:'flex',gap:8,alignItems:'center'}}><Boton activo={indice===i} onClick={()=>elegir(i)}>{v.control}</Boton>{i<2&&<span aria-hidden="true">→</span>}</span>)}</div><p><Palabra>{v.verbo}</Palabra></p><p>{v.frase}</p></div><Respuesta>{v.explicacion}</Respuesta></>;
   break;
  }
  case 'oracion':{
   const s=datos.sujetos[indice],p=datos.predicados[opcion];
   contenido=<><p className={styles.step}>Elegí de quién hablamos.</p>{opciones(datos.sujetos.map(s=>s.texto),indice,elegir,'Sujeto')}<p className={styles.step}>Elegí qué hace.</p>{opciones(datos.predicados.map(p=>p.texto),opcion,setOpcion,'Predicado')}<div className={styles.scene}><Palabra><small>Sujeto</small><br/>{s.texto}</Palabra><Palabra><small>Predicado</small><br/>{p.texto}</Palabra></div><Respuesta>Armamos: {s.texto} {p.texto} Núcleo del sujeto: {s.nucleo}. Núcleo del predicado: {p.nucleo}. Cambiá una parte para construir otra oración.</Respuesta></>;
   break;
  }
  case 'concordancia':{
   const coincide=indice===opcion;
   contenido=<>{opciones(datos.sujetos,indice,elegir,'Una gata o varias gatas')}{opciones(datos.verbos,opcion,setOpcion,'Forma del verbo')}<div className={styles.scene}><p className={styles.caption}>Tu combinación:</p><Palabra>{datos.sujetos[indice]}</Palabra><Palabra>{datos.verbos[opcion]}</Palabra></div><Respuesta>{coincide?`${datos.sujetos[indice]} ${datos.verbos[opcion]}: ${indice?'varias gatas, verbo en plural':'una gata, verbo en singular'}. Las dos partes concuerdan.`:`${datos.sujetos[indice]} nombra ${indice?'varias':'una'}. Para acompañar esa cantidad usamos ${datos.verbos[indice]}. Probá cambiar el verbo.`}</Respuesta>{!coincide&&<Boton onClick={()=>setOpcion(indice)}>Acompañar con «{datos.verbos[indice]}»</Boton>}</>;
   break;
  }
  case 'conectores':{
   const v=datos.variantes[indice];
   contenido=<>{opciones(datos.variantes.map(v=>v.control),indice,i=>{elegir(i);setConectado(false);},'Relación que querés construir')}<div className={styles.scene}><Palabra>{v.antes}</Palabra>{conectado&&<Palabra><mark style={destacadoStyle}>{v.conector}</mark></Palabra>}<Palabra>{v.despues}</Palabra></div><Boton activo={conectado} onClick={()=>setConectado(!conectado)}>{conectado?'Separar las ideas':`Unir con «${v.conector}»`}</Boton><Respuesta>{conectado?v.explicacion:`Estas son las dos partes. Al unirlas con «${v.conector}», vamos a expresar ${v.control.toLowerCase()}.`}</Respuesta></>;
   break;
  }
  case 'historia':{
   const completa=orden.length===3;
   const modelo=orden.join(',')==='problema,accion,resultado';
   contenido=<><div className={styles.choices} role="group" aria-label="Tarjetas disponibles para construir la historia">{datos.tarjetas.map(t=><Boton key={t.id} activo={orden.includes(t.id)} aria-disabled={orden.includes(t.id)} onClick={()=>{if(!orden.includes(t.id))setOrden([...orden,t.id]);}}>{t.texto}{orden.includes(t.id)?' (agregada)':''}</Boton>)}</div><div className={styles.scene}><p className={styles.caption}>Tu historia, en el orden que elegiste:</p>{orden.length?<ol>{orden.map(id=><li key={id} style={{padding:'6px 0'}}>{id==='accion'&&revisar?datos.revisada:datos.tarjetas.find(t=>t.id===id).texto}</li>)}</ol>:<p>Todavía no agregaste tarjetas.</p>}</div><div className={styles.controls}>{orden.length>0&&<Boton onClick={()=>{setOrden(orden.slice(0,-1));setRevisar(false);}}>Deshacer el último paso</Boton>}{completa&&!modelo&&<Boton onClick={()=>setOrden(['problema','accion','resultado'])}>Comparar con el orden del modelo</Boton>}{completa&&<Boton activo={revisar} onClick={()=>setRevisar(!revisar)}>{revisar?'Volver al borrador':'Revisar: agregar color y textura'}</Boton>}</div><Respuesta>{explicarOrdenHistoria(orden)} {revisar?'Rojo ayuda a imaginar el color; suave, cómo se siente al tocarlo. Son detalles sensoriales. Conservamos lo que ocurre.':''}</Respuesta></>;
   break;
  }
  default:return null;
 }
 return <section className={styles.root} aria-labelledby={`${uid}-titulo`}><h3 id={`${uid}-titulo`} className={styles.title}>{datos.titulo}</h3><p className={styles.caption}>Explorá a tu ritmo. Podés probar y volver a empezar.</p><p className={styles.explanation}><strong>Primero miramos un modelo.</strong> {datos.modelo}</p>{contenido}{datos.limite&&<p className={styles.caption}>{datos.limite}</p>}</section>;
}

export default function ExploradorLengua({tema}){
 return <Taller key={tema} tema={tema}/>;
}
