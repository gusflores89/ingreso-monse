import assert from 'node:assert/strict';
import fs from 'node:fs';
import {UNIDADES_BASES as units,VERSION_BASES,crearActividadBase,evaluarActividadBase,getCierreBase} from '../src/lib/contenido-bases.js';
import {getUnidadesPublicas,getFichaBase} from '../src/lib/apuntes-bases.js';
import {CURRICULUM_MATEMATICA,CURRICULUM_LENGUA,PRERREQUISITOS} from '../src/lib/curriculum.js';
import {crearDiagramaGeometria} from '../src/lib/diagrama-geometria.js';
import {transferenciasParaTema} from '../src/lib/transferencias-r27.js';
import {determinarProximoObjetivo} from '../src/lib/objetivos-pedagogicos.js';
let checks=0;
const temas=[...CURRICULUM_MATEMATICA,...CURRICULUM_LENGUA].map(t=>t.tema);
assert.equal(new Set(units.map(u=>u.id)).size,units.length);
const firma=a=>a.enunciado+'|'+JSON.stringify(a.visual||null)+'|'+JSON.stringify([...(a.opciones||[])].sort());
for(const tema of temas){
 const us=units.filter(u=>u.tema===tema),publicas=getUnidadesPublicas(tema),cierre=getCierreBase(tema);
 assert(us.length>0,tema);assert.equal(publicas.length,us.length);assert.equal(cierre.preguntas.length,3);assert.equal(cierre.min_correctas,2);
 assert(fs.existsSync(new URL('../public'+getFichaBase(tema).pdf_url,import.meta.url)));
 assert(!/respuesta_correcta|rubrica_escritura|transferencia|"actividades"/.test(JSON.stringify(publicas)));
 const practica=new Set(us.flatMap(u=>u.actividades.map(firma)));
 const reservadas=transferenciasParaTema(tema,us);
 for(const a of reservadas){assert(!practica.has(firma(a)),'Se repite la práctica: '+a.id);assert(us.some(u=>u.id===a.objetivo_id),a.objetivo_id);assert.equal(a.opciones.filter(x=>x===a.respuesta_correcta).length,1);}
 for(const q of cierre.preguntas)assert(reservadas.some(a=>a.id===q.actividad_id));
 const fakeRead=[{tema,tipo_pregunta:'leccion',es_correcta:true,ia_parametros_usados:{objetivo_id:us[0].id,contenido_version:VERSION_BASES}}];
 assert.equal(determinarProximoObjetivo(tema,fakeRead).temaCompletado,false);
 checks+=8;
}
for(const u of units){
 assert(u.visual,u.id);assert.equal(u.actividades.length,6,u.id);
 for(const pre of u.prerrequisitos_temas||[])assert(PRERREQUISITOS[u.tema]?.includes(pre),u.id+' prerequisite '+pre);
 const pub=getUnidadesPublicas(u.tema).find(x=>x.id===u.id);assert.deepEqual(pub.visual,JSON.parse(JSON.stringify(u.visual)),u.id);
 for(const a of u.actividades){
  if(a.rubrica_escritura)continue;
  assert.equal(new Set(a.opciones).size,a.opciones.length,a.id);
  const s={ia_parametros_usados:{contenido_version:VERSION_BASES,objetivo_id:u.id,actividad_id:a.id}};
  for(const opt of a.opciones)assert.equal(evaluarActividadBase(s,opt).es_correcta,opt===a.respuesta_correcta,a.id);
  assert.equal(evaluarActividadBase(s,'',true).es_correcta,null);checks++;
 }
 const practiceIds=new Set(Array.from({length:5},(_,i)=>u.actividades[i+1].id));
 assert(!u.transferencia?.some(a=>practiceIds.has(a.id)));
 for(const v of [u.visual,...u.actividades.map(a=>a.visual),...(u.transferencia||[]).map(a=>a.visual)].filter(v=>v&&v.tipo&&v.tipo!=='lectura')){
  const d=crearDiagramaGeometria(v);assert(d&&d.trazos.length,u.id+': '+v.tipo);
  for(const t of d.trazos)for(const [x,y] of t.puntos){assert(Number.isFinite(x)&&Number.isFinite(y),u.id);assert(x>=-1&&x<=481&&y>=-1&&y<=311,`${u.id} ${v.tipo}: ${x},${y}`);}
  for(const t of d.textos)assert(Number.isFinite(t.x)&&Number.isFinite(t.y),u.id);
  if(v.tipo==='liquidos')for(const r of v.recipientes)assert(r.ml>=0&&r.ml<=r.capacidad,u.id);
  if(v.tipo==='mapa')for(const n of v.nodos)assert(n.texto.length<=90,'Texto recortable: '+u.id+' '+n.texto);
  checks++;
 }
}
// Aids remain tied to the actual word, not a different example from the same unit.
const h=units.find(u=>u.id==='ort_h_0_observar_palabras');
const hormiga=h.actividades.find(a=>a.respuesta_correcta==='hormiga');
const hint=evaluarActividadBase({ia_parametros_usados:{objetivo_id:h.id,actividad_id:hormiga.id,contenido_version:VERSION_BASES}},'ormiga');
assert(hint.pista_concreta.includes('hormiga'));assert(!hint.pista_concreta.includes('cohete'));
// Fractions and equivalent decimals use the same reference container.
const zero=units.find(u=>u.id==='prof_dec_ceros').visual.recipientes;
assert(zero.every(r=>r.ml===300&&r.capacidad===1000));
assert.deepEqual(units.find(u=>u.id==='mat_dec_dividir').visual.recipientes.map(r=>r.ml),[600,600,600]);
assert.equal(units.find(u=>u.id==='prof_dec_dividir_natural').visual.recipientes.reduce((s,r)=>s+r.ml,0),4500);
assert.equal(units.find(u=>u.id==='prof_dec_desde_fraccion').visual.recipientes[0].ml,750);
console.log(JSON.stringify({checks,topics:temas.length,units:units.length,closures:temas.length,realDatabase:false,realAI:false}));
