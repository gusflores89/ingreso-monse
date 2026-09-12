const fs = require('fs');
const path = require('path');
const Module = require('module');
const assert = require('assert/strict');
// Reuse real-controller harness with synthetic data; no live account or model calls.
const file = path.join(__dirname,'verify-r2.cjs');
const harness = new Module(file, module);
harness.filename = file; harness.paths = module.paths;
harness._compile(fs.readFileSync(file,'utf8').split('(async()=>{')[0] + '\nmodule.exports={load,db,start,answer,user,objectives};',file);
const {load,db,start,answer,user,objectives} = harness.exports;
const {UNIDADES_BASES:units,VERSION_BASES:version,crearActividadBase,evaluarActividadBase} = load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','crearActividadBase','evaluarActividadBase']);
(async()=>{
 let checked = 0;
 const allIds = new Set();
 for(const u of units){
  const history=[];
  for(let i=0;i<5;i++){
   const activity=crearActividadBase(u.id,'practica',history);
   assert.equal(activity.actividad_id,u.actividades[i+1].id,'Use every independent variant before repeating');
   history.push({id:'p'+i,created_at:`2026-09-${10+i}`,tipo_pregunta:'multiple',ia_parametros_usados:{objetivo_id:u.id,contenido_version:version,actividad_id:activity.actividad_id}});
  }
  assert.equal(crearActividadBase(u.id,'practica',history).actividad_id,u.actividades[1].id,'Reuse oldest');
  // Deleting or duplicating records must not produce an already seen variant while unseen ones exist.
  assert.equal(crearActividadBase(u.id,'practica',[history[0],history[0],history[2]]).actividad_id,u.actividades[2].id);
  for(const a of u.actividades){
   assert(!allIds.has(a.id));allIds.add(a.id);
   assert(a.enunciado && a.paso_resuelto && u.explicacion && u.pista);
   assert.equal(a.opciones.filter(x=>x===a.respuesta_correcta).length,1);
   const record={id:'test',user_id:user.id,tema:u.tema,tipo_pregunta:'multiple',created_at:'2026-09-12',ia_parametros_usados:{objetivo_id:u.id,contenido_version:version,actividad_id:a.id}};
   for(const choice of a.opciones){
    assert.equal(evaluarActividadBase(record,choice).es_correcta,choice===a.respuesta_correcta);
   }
   // Independent arithmetic oracle catches bad keys and equivalent distractors.
   const rational = text => { const m=String(text).match(/^(\d+)(?:\/(\d+))?$/);return m?[Number(m[1]),Number(m[2]||1)]:null; };
   const value=rational(a.respuesta_correcta);
   if(value){
    const matches=a.opciones.filter(x=>{const v=rational(x);return v && v[1]!==0 && v[0]*value[1]===value[0]*v[1]});
    assert.equal(matches.length,1, a.id+' must have one mathematical answer');
   }
   const operation=a.enunciado.match(/(\d+)\/(\d+) ([+−×÷]) (\d+)\/(\d+)/);
   if(operation){
    const [,aa,bb,op,cc,dd]=operation;const [A,B,C,D]=[aa,bb,cc,dd].map(Number);
    const expected=op==='+'?[A*D+C*B,B*D]:op==='−'?[A*D-C*B,B*D]:op==='×'?[A*C,B*D]:[A*D,B*C];
    assert.equal(value[0]*expected[1],expected[0]*value[1],a.id+' arithmetic');
   }
   const amount=a.enunciado.match(/Hay (\d+) fichas.*son (\d+)\/(\d+)/);
   if(amount)assert.equal(value[0]*Number(amount[3]),Number(amount[1])*Number(amount[2])*value[1],a.id);
   const divisor=a.enunciado.match(/¿(\d+) es divisor de (\d+)/);
   const criterion=a.enunciado.match(/¿(\d+) es divisible por (\d+)/);
   if(divisor)assert.equal(a.respuesta_correcta==='Sí',Number(divisor[2])%Number(divisor[1])===0,a.id);
   if(criterion)assert.equal(a.respuesta_correcta==='Sí',Number(criterion[1])%Number(criterion[2])===0,a.id);
   const common=a.enunciado.match(/(?:MCD|MCM) de (\d+) y (\d+)/);
   if(common){
    const [A,B]=common.slice(1).map(Number);
    const candidates=Array.from({length:a.enunciado.includes('MCD')?Math.min(A,B):A*B},(_,i)=>i+1);
    const expected=a.enunciado.includes('MCD')?candidates.filter(n=>A%n===0&&B%n===0).pop():candidates.find(n=>n%A===0&&n%B===0);
    assert.equal(Number(a.respuesta_correcta),expected,a.id);
   }
   const wrong=a.opciones.find(x=>x!==a.respuesta_correcta);
   const database=db({sesiones:[record]});
   const hint=await answer(database,'test',{respuesta_usuario:wrong});
   assert.equal(hint.es_correcta,false);assert(hint.pista_concreta);assert(hint.paso_resuelto);
   const corrected=await answer(database,'test',{respuesta_usuario:a.respuesta_correcta});
   assert.equal(corrected.es_correcta,true);
   assert.equal(database.tables.sesiones[0].ia_parametros_usados.resuelto_con_ayuda,true,'Retry remains assisted');
   const scaffold=await answer(db({sesiones:[record]}),'test',{respuesta_usuario:'No lo vimos',no_visto:true});
   assert.equal(scaffold.es_correcta,null);assert(scaffold.pista_concreta);checked++;
  }
 }
 for(const u of units.slice(8))assert(new Set(u.actividades.map(a=>a.opciones.indexOf(a.respuesta_correcta))).size>1, 'Correct option position varies');
 // Criteria are four separate objectives; mastering one cannot skip the others.
 const criteria=objectives.getObjetivosParaTema('divisibilidad_primos_mcm_mcd').map(o=>o.id);
 for(const n of [2,3,5,10])assert(criteria.includes('bases_criterio_'+n));
 // Do not redirect Lengua or explicit review into the math route.
 const review=await start(db({sesiones:[]}),{tema:'divisibilidad_primos_mcm_mcd',modo:'REPASO'});
 assert.equal(review.output.tema,'divisibilidad_primos_mcm_mcd');assert.equal(review.output.tipo,'leccion');
 const language=await start(db({sesiones:[]}),{tema:'ortografia_h',modo:'REPASO'});
 assert.equal(language.output.tema,'ortografia_h');
 console.log(JSON.stringify({passed:checked+4,variants:checked,selection:'unseen then oldest',realAI:false,realDatabase:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
