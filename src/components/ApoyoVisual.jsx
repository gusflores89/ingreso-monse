import { useState } from "react";
import BarrasFraccion from "./BarrasFraccion";
import { crearDiagramaGeometria } from "../lib/diagrama-geometria";

export default function ApoyoVisual({ datos, permitirExplorar = false }) {
 if(datos?.tipo === 'lectura')return <section className="texto-lectura" aria-label="Texto para releer" style={{width:'min(100%, 660px)',boxSizing:'border-box',margin:'16px auto',padding:'20px 24px',borderRadius:12,background:'#f8fafc',color:'#172554'}}>
  <h3 style={{margin:'0 0 12px',fontSize:'1rem'}}>{datos.titulo || 'Texto para releer'}</h3>
  <p style={{margin:0,fontSize:'1.1rem',lineHeight:1.65,whiteSpace:'pre-line'}}>{datos.texto}</p>
 </section>;
 if(Array.isArray(datos))return <BarrasFraccion barras={datos} />;
 if(!datos || !["fracciones","arreglo","saltos","colecciones","angulo","mediatriz","poligono","segmentos","circunferencia","tramo","datos","mapa","recta","barras","rectas","liquidos","posicional","semiplano","fracciones_grupos"].includes(datos.tipo))return null;
 return <Geometria key={JSON.stringify(datos)} datos={datos} permitirExplorar={permitirExplorar} />;
}
function Geometria({ datos, permitirExplorar }) {
 const [angulo,setAngulo]=useState(datos.angulo||60);
 const explorar=permitirExplorar && datos.interactivo;
 const plano=crearDiagramaGeometria({...datos,angulo:explorar?angulo:datos.angulo});
 return <figure style={{width:'min(100%, 560px)',margin:'16px auto'}}>
  <svg role="img" aria-label={['mapa','recta','barras','rectas','liquidos','posicional','semiplano','fracciones_grupos'].includes(datos.tipo)?(datos.descripcion || datos.titulo || 'Diagrama de apoyo'):datos.tipo==='fracciones'?(datos.titulo || 'El mismo entero')+'. '+datos.barras.map(b=>b.label+': '+b.partes.length+' partes iguales, '+b.partes.filter(p=>p==='p'||p==='s').length+' rayadas sin tachar, '+b.partes.filter(p=>p==='q').length+' tachadas').join('. '):datos.tipo==='arreglo'?`${datos.filas} filas de ${datos.columnas} fichas${datos.seleccionadas!==undefined?', primeras '+datos.seleccionadas+' filas marcadas con flecha':''}${datos.quitar_ultima?', última fila tachada':''}${datos.sobrantes!==undefined?', fichas aparte: '+datos.sobrantes:''}`:datos.tipo==='saltos'?'Recorridos desde cero: '+datos.series.map(s=>'saltos de '+s.paso).join('; ')+(datos.ocultar_final?'; última llegada por encontrar':''):datos.tipo==='colecciones'?'Fichas para contar: '+datos.grupos.map(g=>g.label+': '+g.cantidad).join('. '):datos.tipo==='datos'?'Datos del problema: '+datos.lineas.join('. '):datos.tipo==='circunferencia'?'Circunferencia con centro O y diámetro'+(datos.radio?', radio de '+datos.radio+' centímetros': ' de '+datos.diametro+' centímetros'):datos.tipo==='tramo'?'Segmento de '+datos.total+' centímetros, dividido en '+datos.parte+' centímetros y un tramo desconocido':datos.tipo==='poligono'?'Polígono de '+datos.puntos.length+' lados'+(datos.cuadricula?', dividido en cuadrados de un centímetro cuadrado':''):datos.tipo==='segmentos'?'Tres segmentos de '+datos.longitudes.join(', ')+' centímetros':datos.tipo==='mediatriz'?'Segmento AB, punto medio M y mediatriz CD con arcos de construcción':'Ángulo con vértice '+(datos.letras?.[0]||'O')+(datos.transportador?' y transportador de doble escala':'')} viewBox={datos.tipo==='colecciones' ? `0 0 480 ${Math.max(110,datos.grupos.length*70+30)}` : "0 0 480 310"} style={{display:'block',width:'100%',height:'auto',background:'#f8fafc',borderRadius:12}}>
   {plano.trazos.map((t,i)=><polyline key={'l'+i} points={t.puntos.map(p=>p.join(',')).join(' ')} fill="none" stroke={t.color} strokeWidth={t.width} strokeDasharray={t.dash?'5 4':undefined} />)}
   {plano.textos.map((t,i)=><text key={'t'+i} x={t.x} y={t.y} fill={t.color} fontSize={t.size} textAnchor="middle" fontFamily="Arial, sans-serif">{t.texto}</text>)}
  </svg>
  {explorar && <figcaption style={{padding:'12px',background:'#1e293b',borderRadius:8,color:'#f8fafc'}}>
   <label style={{display:'grid',gap:8}}>Explorá la abertura: {angulo}°
    <input aria-label="Abertura del ángulo" type="range" min="10" max="170" step="10" value={angulo} onChange={e=>setAngulo(Number(e.target.value))} style={{width:'100%',minHeight:36,accentColor:'#38bdf8'}} />
   </label>
   <span>Mové el control y mirá qué cambia. Después probá el trazado en papel.</span>
  </figcaption>}
 </figure>;
}
