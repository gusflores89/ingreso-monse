import { useState } from "react";
import BarrasFraccion from "./BarrasFraccion";
import { crearDiagramaGeometria } from "../lib/diagrama-geometria";

export default function ApoyoVisual({ datos, permitirExplorar = false }) {
 if(Array.isArray(datos))return <BarrasFraccion barras={datos} />;
 if(!datos || !["angulo","mediatriz","poligono","segmentos","circunferencia","tramo","datos"].includes(datos.tipo))return null;
 return <Geometria key={JSON.stringify(datos)} datos={datos} permitirExplorar={permitirExplorar} />;
}
function Geometria({ datos, permitirExplorar }) {
 const [angulo,setAngulo]=useState(datos.angulo||60);
 const explorar=permitirExplorar && datos.interactivo;
 const plano=crearDiagramaGeometria({...datos,angulo:explorar?angulo:datos.angulo});
 return <figure style={{width:'min(100%, 560px)',margin:'16px auto'}}>
  <svg role="img" aria-label={datos.tipo==='datos'?'Datos del problema: '+datos.lineas.join('. '):datos.tipo==='circunferencia'?'Circunferencia con centro O y diámetro'+(datos.radio?', radio de '+datos.radio+' centímetros': ' de '+datos.diametro+' centímetros'):datos.tipo==='tramo'?'Segmento de '+datos.total+' centímetros, dividido en '+datos.parte+' centímetros y un tramo desconocido':datos.tipo==='poligono'?'Polígono de '+datos.puntos.length+' lados'+(datos.cuadricula?', dividido en cuadrados de un centímetro cuadrado':''):datos.tipo==='segmentos'?'Tres segmentos de '+datos.longitudes.join(', ')+' centímetros':datos.tipo==='mediatriz'?'Segmento AB, punto medio M y mediatriz CD con arcos de construcción':'Ángulo con vértice '+(datos.letras?.[0]||'O')+(datos.transportador?' y transportador de doble escala':'')} viewBox="0 0 480 310" style={{display:'block',width:'100%',height:'auto',background:'#f8fafc',borderRadius:12}}>
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
