const assert=require('assert/strict');const {h}=require('./verify-r21.cjs');
const b=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','crearActividadBase','evaluarActividadBase','getCierreBase']);
const expected={puente_filas:[6,6,12,8,10,12],puente_doble:[6,4,8,10,12,14],puente_seis:[12,18,24,30,36,42],puente_ocho:[16,24,32,40,48,56],puente_siete:[14,21,28,35,42,49],puente_diez:[20,30,40,50,60,70],puente_nueve:[18,27,36,45,54,63],puente_saltos:[6,9,8,12,12,15],puente_agrupamientos:[1,0,1,0,1,2],puente_divisor:['Sí','No','Sí','No','Sí','No'],puente_encuentro:[6,4,12,6,12,10],puente_comunes:[2,3,4,2,5,3]};
(async()=>{let checks=0;const fresh=b.UNIDADES_BASES.filter(u=>u.id.startsWith('puente_'));assert.equal(fresh.length,12);
const curriculum=h.load('src/lib/curriculum.js',['CURRICULUM_MATEMATICA']);
const proof=u=>[0,1,2].map(n=>({id:u.id+n,user_id:h.user.id,tema:u.tema,tipo_pregunta:n?'multiple':'leccion',es_correcta:true,created_at:'2026-10-01',ia_parametros_usados:{objetivo_id:u.id,actividad_id:u.actividades[n].id,contenido_version:b.VERSION_BASES}}));
for(const u of fresh){assert(new Set(u.actividades.map(a=>a.opciones.indexOf(a.respuesta_correcta))).size>1);
 assert.deepEqual(Array.from(u.actividades,a=>a.respuesta_correcta),expected[u.id].map(String));assert(b.UNIDADES_BASES.indexOf(u)<b.UNIDADES_BASES.findIndex(x=>x.id===u.antes_de));checks++;
 const before=b.UNIDADES_BASES.filter(v=>v.tema!==u.tema || b.UNIDADES_BASES.indexOf(v)<b.UNIDADES_BASES.indexOf(u)).flatMap(proof);
 const prereqs=curriculum.CURRICULUM_MATEMATICA.filter(t=>t.tema!==u.tema).map((t,i)=>({id:'req'+i,user_id:h.user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true}));
 const db=h.db({sesiones:[...prereqs,...before]});const {output}=await h.start(db,{tema:u.tema,modo:'REPASO',forzar_practica:false});assert.equal(output.explicacion_simple,u.explicacion);assert(output.habilidad_concreta);assert.equal(output.ejercicio_practica.respuesta_correcta,undefined);checks++;
 for(const a of u.actividades){assert.equal(new Set(a.opciones).size,a.opciones.length);const session={ia_parametros_usados:{objetivo_id:u.id,actividad_id:a.id,contenido_version:b.VERSION_BASES}};for(const op of a.opciones)assert.equal(b.evaluarActividadBase(session,op).es_correcta,op===a.respuesta_correcta);assert(a.visual);
 if(a.visual.tipo==='arreglo'){
  const v=a.visual,expectedCount=v.filas*v.columnas-(v.quitar_ultima?v.columnas:0);
  if(v.sobrantes===undefined)assert.equal(Number(a.respuesta_correcta),expectedCount);
  else if(u.id==='puente_agrupamientos')assert.equal(Number(a.respuesta_correcta),v.sobrantes);
  else assert.equal(a.respuesta_correcta,v.sobrantes===0?'Sí':'No');
 }
 const wrong=a.opciones.find(op=>op!==a.respuesta_correcta),evaluation=b.evaluarActividadBase(session,wrong);assert(evaluation.pista_concreta);assert(evaluation.paso_resuelto);
 assert.equal(b.evaluarActividadBase(session,wrong,true).es_correcta,null);checks++;}
 const old=b.UNIDADES_BASES.filter(v=>v.tema===u.tema&&!v.id.startsWith('puente_')).flatMap(proof);assert.equal(h.objectives.esElegibleParaExamenFinal(u.tema,old),false);
 assert.equal(b.getCierreBase(u.tema).preguntas.length,3);assert(b.getCierreBase(u.tema).revision_cierre.includes(u.id));checks++;
}
assert(b.UNIDADES_BASES.findIndex(u=>u.id==='div_primos_5_mcd')<b.UNIDADES_BASES.findIndex(u=>u.id==='prof_fact_primos'));checks++;
const diagrams=h.load('src/lib/diagrama-geometria.js',['crearDiagramaGeometria']);
for(const u of fresh)for(const a of u.actividades)if(a.visual.tipo){const d=diagrams.crearDiagramaGeometria(a.visual);assert(d.trazos.length);for(const t of d.trazos)for(const [x,y] of t.puntos){assert(x>=0&&x<=480);assert(y>=0&&y<=310);}for(const t of d.textos){assert(t.x>=0&&t.x<=480);assert(t.y>=0&&t.y<=310);}checks++;}
console.log(JSON.stringify({passed:checks,newUnits:12,newActivities:72,realDatabase:false,realAI:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
