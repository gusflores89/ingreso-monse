const assert=require('assert/strict');const {h}=require('./verify-r21.cjs');
const b=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','crearActividadBase','evaluarActividadBase','getCierreBase']);
const expected={fr24_mitad:[4,3,2,5,6,7],fr24_equivalencia:['2/4','2/6','4/6','2/8','6/8','4/10'],fr24_reagrupar:['1/2','1/3','2/3','1/4','3/4','2/5'],fr24_enteros:[2,2,2,3,3,3],fr24_sumar:['2/4','3/5','3/6','4/6','4/8','5/8'],fr24_restar:['2/4','3/5','2/6','3/6','3/8','5/8'],fr24_comunes:['2/4','2/6','3/6','6/8','8/12','3/12'],fr24_sumadistinta:['3/4','3/6','5/6','3/8','4/6','4/9'],fr24_restadistinta:['1/4','3/6','5/8','2/6','5/9','8/12'],fr24_cantidad:[4,3,6,6,6,9],fr24_partedeparte:['1/4','1/6','1/8','1/10','1/12','1/16'],fr24_caben:[3,2,4,3,5,6],fr24_resto:[6,4,4,8,9,8],fr24_referencia:[6,8,6,8,12,10],fr24_mitaddelresto:[3,4,3,4,6,5]};
(async()=>{let checks=0;const fresh=b.UNIDADES_BASES.filter(u=>u.id.startsWith('fr24_'));assert.equal(fresh.length,15);
const curriculum=h.load('src/lib/curriculum.js',['CURRICULUM_MATEMATICA']);
const proof=u=>[0,1,2].map(n=>({id:u.id+n,user_id:h.user.id,tema:u.tema,tipo_pregunta:n?'multiple':'leccion',es_correcta:true,created_at:'2026-10-01',ia_parametros_usados:{objetivo_id:u.id,actividad_id:u.actividades[n].id,contenido_version:b.VERSION_BASES}}));
for(const u of fresh){assert(new Set(u.actividades.map(a=>a.opciones.indexOf(a.respuesta_correcta))).size>1);
 assert.deepEqual(Array.from(u.actividades,a=>a.respuesta_correcta),expected[u.id].map(String));assert(b.UNIDADES_BASES.indexOf(u)<b.UNIDADES_BASES.findIndex(x=>x.id===u.antes_de));checks++;
 const before=b.UNIDADES_BASES.filter(v=>v.tema!==u.tema || b.UNIDADES_BASES.indexOf(v)<b.UNIDADES_BASES.indexOf(u)).flatMap(proof);
 const prereqs=curriculum.CURRICULUM_MATEMATICA.filter(t=>t.tema!==u.tema).map((t,i)=>({id:'req'+i,user_id:h.user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true}));
 const db=h.db({sesiones:[...prereqs,...before]});const {output}=await h.start(db,{tema:u.tema,modo:'REPASO',forzar_practica:false});assert.equal(output.explicacion_simple,u.explicacion);assert(output.habilidad_concreta);assert.equal(output.ejercicio_practica.respuesta_correcta,undefined);checks++;
 for(const a of u.actividades){assert.equal(new Set(a.opciones).size,a.opciones.length);const session={ia_parametros_usados:{objetivo_id:u.id,actividad_id:a.id,contenido_version:b.VERSION_BASES}};for(const op of a.opciones)assert.equal(b.evaluarActividadBase(session,op).es_correcta,op===a.respuesta_correcta);assert(a.visual);
 if(a.visual.tipo==='fracciones'){
  const rows=a.visual.barras,last=rows.at(-1),count=last.partes.filter(p=>p==='p'||p==='s').length;
  if(u.id==='fr24_enteros'){assert.equal(Number(a.respuesta_correcta),rows.length);assert(rows.every(r=>r.partes.every(p=>p==='p')));}
  else if(u.id==='fr24_caben')assert.equal(Number(a.respuesta_correcta),count);
  else {const [n,d]=a.respuesta_correcta.split('/').map(Number);assert.equal(n*last.partes.length,d*count);}
  if(['fr24_equivalencia','fr24_reagrupar','fr24_comunes'].includes(u.id)){const first=rows[0];assert.equal(first.partes.filter(p=>p==='p').length*last.partes.length,count*first.partes.length);}
  if(u.id==='fr24_partedeparte')assert.equal(rows[0].partes.length*2,last.partes.length);
 }
 if(a.visual.tipo==='arreglo')assert.equal(Number(a.respuesta_correcta),a.visual.seleccionadas*a.visual.columnas);
 if(a.visual.tipo==='colecciones')assert.equal(Number(a.respuesta_correcta),a.visual.grupos.at(-1).cantidad);
 const wrong=a.opciones.find(op=>op!==a.respuesta_correcta),evaluation=b.evaluarActividadBase(session,wrong);assert(evaluation.pista_concreta);assert(evaluation.paso_resuelto);
 assert.equal(b.evaluarActividadBase(session,wrong,true).es_correcta,null);checks++;}
 const old=b.UNIDADES_BASES.filter(v=>v.tema===u.tema&&!v.id.startsWith('fr24_')).flatMap(proof);assert.equal(h.objectives.esElegibleParaExamenFinal(u.tema,old),false);
 assert.equal(b.getCierreBase(u.tema).preguntas.length,3);assert(b.getCierreBase(u.tema).revision_cierre.includes(u.id));checks++;
}
const diagrams=h.load('src/lib/diagrama-geometria.js',['crearDiagramaGeometria']);
for(const u of fresh)for(const a of u.actividades)if(a.visual.tipo){const d=diagrams.crearDiagramaGeometria(a.visual);assert(d.trazos.length);for(const t of d.trazos)for(const [x,y] of t.puntos){assert(x>=0&&x<=480);assert(y>=0&&y<=310);}for(const t of d.textos){assert(t.x>=0&&t.x<=480);assert(t.y>=0&&t.y<=310);}checks++;}
console.log(JSON.stringify({passed:checks,newUnits:15,newActivities:90,realDatabase:false,realAI:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
