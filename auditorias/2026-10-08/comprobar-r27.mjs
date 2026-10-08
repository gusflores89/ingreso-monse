import fs from 'node:fs';
import {UNIDADES_BASES,getCierreBase} from '../../src/lib/contenido-bases.js';
import {CURRICULUM_MATEMATICA,CURRICULUM_LENGUA} from '../../src/lib/curriculum.js';
import {UNIDADES_MATEMATICA_R27} from '../../src/lib/ampliaciones-matematica-r27.js';
import {UNIDADES_LENGUA_R27} from '../../src/lib/ampliaciones-lengua-r27.js';
const nuevas=new Set([...UNIDADES_MATEMATICA_R27,...UNIDADES_LENGUA_R27].map(u=>u.id));
const temas=[...CURRICULUM_MATEMATICA,...CURRICULUM_LENGUA].map(t=>{
 const us=UNIDADES_BASES.filter(u=>u.tema===t.tema);
 return {tema:t.tema,materia:t.materia,paginas:us.length,pdf:'/apuntes/bases-'+t.tema+'.pdf',
  unidades:us.map((u,i)=>({id:u.id,titulo:u.titulo,pagina:i+1,nuevaR27:nuevas.has(u.id),visual:Array.isArray(u.visual)?'barras':u.visual?.tipo,pasos:u.pasos.length,actividades:u.actividades.length})),
  cierre:getCierreBase(t.tema).preguntas.map(q=>({actividad_id:q.actividad_id,objetivo_id:q.objetivo_id}))};
});
fs.writeFileSync(new URL('./resultado-r27.json',import.meta.url),JSON.stringify({fecha:'2026-10-08',alcance:'Inventario efectivo; no certifica exhaustividad oficial ni aprendizaje',unidades:UNIDADES_BASES.length,nuevas:nuevas.size,temas},null,2)+'\n');
console.log(JSON.stringify({temas:temas.length,unidades:UNIDADES_BASES.length,nuevas:nuevas.size}));
