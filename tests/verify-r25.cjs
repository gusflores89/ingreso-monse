const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {h}=require('./verify-r21.cjs');
const fichas=JSON.parse(fs.readFileSync(path.join(__dirname,'../src/lib/fichas-modulos.json'),'utf8'));
const helpers=h.load('src/lib/fichas-lectura.js',['VERSION_FICHAS','BASE_LECTURA','getFichaModulo','fichaPublica','estadoLectura','cargarLectura','exigirLectura','verificarLecturaRespuesta']);
function handler(db,owned=true,access=true){return h.load('src/pages/api/fichas.js',['handler'],{...helpers,
 ...h.load('src/lib/curriculum.js',['CURRICULUM_MATEMATICA','CURRICULUM_LENGUA']),getSupabaseAdmin:()=>db,
 requireAccess:(_,r)=>{if(!access)r.status(401).json({error:'Ingresá primero'});return access;},
 requireOwnership:(_,r)=>{if(!owned)r.status(403).json({error:'Otra cuenta'});return owned;}}).handler;}
async function call(db,body={},method='POST',owned=true,access=true){let status=200,output;await handler(db,owned,access)({method,body:{user_id:h.user.id,...body},query:{user_id:h.user.id,...body}},
 {setHeader(){},status(n){status=n;return this;},json(v){output=v;return this;}});return{status,output};}
module.exports={h,helpers,call,fichas};
if(require.main===module)(async()=>{
 const curr=h.load('src/lib/curriculum.js',['CURRICULUM_MATEMATICA','CURRICULUM_LENGUA']);
 assert.deepEqual(fichas.map(f=>f.tema),[...curr.CURRICULUM_MATEMATICA,...curr.CURRICULUM_LENGUA].map(t=>t.tema));
 let checks=0;
 for(const f of fichas){
  assert(f.relaciones.length>0 && f.relaciones.length<=3);assert.equal(f.ejemplo.pasos.length,3);
  assert.equal(new Set(f.comprobacion.opciones).size,3);assert(Number.isInteger(f.comprobacion.correcta));assert(f.comprobacion.opciones[f.comprobacion.correcta]);
  assert(fs.existsSync(path.join(__dirname,'../public/fichas',f.tema+'.pdf')));
  const db=h.db({sesiones:[],lecciones_completadas:[]});
  const get=await call(db,{tema:f.tema},'GET');assert.equal(get.status,200);assert.equal(get.output.lectura.completada,false);
  assert.equal(get.output.ficha.comprobacion.correcta,undefined);assert.equal(get.output.ficha.comprobacion.explicacion,undefined);
  assert.equal((await call(db,{tema:f.tema,version:1,paso:3,respuesta:f.comprobacion.correcta})).status,409);
  for(let paso=0;paso<3;paso++){
   assert.equal((await call(db,{tema:f.tema,version:1,paso})).status,200);
   const reload=await call(db,{tema:f.tema},'GET');assert.equal(reload.output.lectura.paso,paso+1);
  }
  const bad=await call(db,{tema:f.tema,version:1,paso:3,respuesta:(f.comprobacion.correcta+1)%3});
  assert.equal(bad.output.revisar,true);assert(bad.output.explicacion);assert.equal(bad.output.lectura.completada,false);
  const body={tema:f.tema,version:1,paso:3,respuesta:bad.output.respuesta_guiada};
  assert.equal((await call(db,body)).output.lectura.completada,true);
  assert.equal((await call(db,body)).output.lectura.completada,true);
  assert.equal(db.tables.lecciones_completadas.length,4);assert.equal(db.tables.sesiones.length,0);
  assert(!db.writes.some(w=>w.table==='progreso'));checks+=9;
 }
 const db=h.db({sesiones:[],lecciones_completadas:[{user_id:'otra',tema:'fracciones_concepto',leccion_numero:helpers.BASE_LECTURA,completada:true}]});
 assert.equal((await call(db,{},'GET',false)).status,403);assert.equal((await call(db,{},'GET',true,false)).status,401);
 assert.equal((await call(db,{tema:'desconocido'},'GET')).status,400);
 assert.equal((await call(db,{tema:'fracciones_concepto',version:0,paso:0})).status,409);
 assert.equal((await call(db,{tema:'fracciones_concepto',version:1,paso:-1})).status,400);
 const before=await h.start(db,{tema:'fracciones_concepto',modo:'REPASO'},'practica',helpers);
 assert.equal(before.output.tipo,'lectura_modulo');assert.equal(before.calls.length,0);assert.equal(db.tables.sesiones.length,0);
 let denied;assert.equal(await helpers.verificarLecturaRespuesta(db,h.user.id,'fracciones_concepto',{status(n){denied=n;return this},json(){}}),false);assert.equal(denied,409);
 const f=fichas.find(f=>f.tema==='fracciones_concepto');
 for(let paso=0;paso<4;paso++)await call(db,{tema:f.tema,version:1,paso,respuesta:f.comprobacion.correcta});
 const after=await h.start(db,{tema:f.tema,modo:'REPASO'},'practica',helpers);assert.equal(after.output.tipo,'leccion');assert.equal(db.tables.sesiones.length,1);
 assert.equal((await call(db,{},'GET')).output.catalogo.length,40);
 // Fallar la lectura del servidor nunca habilita la práctica silenciosamente.
 const failing={from(){const q={select:()=>q,eq:()=>q,in:async()=>({error:{message:'offline'}})};return q;}};
 assert.equal((await call(failing,{tema:f.tema},'GET')).status,503);
 assert.equal(helpers.estadoLectura([{leccion_numero:helpers.BASE_LECTURA+3,completada:true}]).completada,false);
 checks+=12;console.log(JSON.stringify({passed:checks,topics:40,realDatabase:false,realAI:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
