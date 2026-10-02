const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict'),crypto=require('crypto');
const f=path.join(__dirname,'verify-r2.cjs'),m=new Module(f,module);m.filename=f;m.paths=module.paths;m._compile(fs.readFileSync(f,'utf8').split('\n(async()=>{')[0]+'\nmodule.exports={load,db,user,objectives,answer,start};',f);const h=m.exports;
const concrete=h.load('src/lib/recorrido-concreto.js',['VERSION_CONCRETA','HABILIDADES_CONCRETAS','crearRetoConcreto','evaluarConstruccion','distribucionEsperada','cantidadEsperada','resumirEvidenciaConcreta']);
const registry=h.load('src/lib/registro-envios.js',['iniciarEnvio','guardarPasoEnvio','completarEnvio','liberarEnvio','registrarAyuda']);
function handler(database,owned=true){return h.load('src/pages/api/sesion/concreta.js',['handler'],{...concrete,...registry,...h.load('src/lib/curriculum.js',['CURRICULUM_MATEMATICA']),...h.load('src/lib/metadatos-bases.js',['VERSION_BASES']),requireMethod:()=>true,requireAccess:()=>true,requireOwnership:(_,res)=>{if(!owned)res.status(403).json({error:'Acceso denegado'});return owned;},getSupabaseAdmin:()=>database,loadUser:async()=>({data:h.user}),canAccessTopicByPlan:()=>true,assertSupabaseOk:r=>{if(r.error)throw Error(r.error.message);return r.data;}}).handler;}
async function call(database,body,owned=true){let status,output;await handler(database,owned)({method:'POST',body:{user_id:h.user.id,...body}},{status(n){status=n;return this;},json(v){output=v;return this;}});return {status,output};}
function solved(r,extra={}){return JSON.stringify({fase:'hacer',tablero:concrete.distribucionEsperada(r).length?concrete.distribucionEsperada(r):[0],cantidad:concrete.cantidadEsperada(r)||0,seleccion:r.tipo_tablero==='fraccion'?Array.from({length:r.b},(_,i)=>i):[],modeloVisto:false,lectura:false,...extra});}
module.exports={h,concrete,registry,call,solved};
if(require.main===module)(async()=>{let checks=0;const db=h.db({sesiones:[]});
for(const habilidad of concrete.HABILIDADES_CONCRETAS){
 for(let n=0;n<3;n++){
  const start=await call(db,{accion:'iniciar',tema:'numeros_naturales_sistema_decimal',habilidad:habilidad.id});assert.equal(start.status,200);const r=start.output;assert.equal(r.ensenanza,n===0);assert.equal(r.variante,n);
  const answer={accion:'responder',sesion_id:r.sesion_id,respuesta_usuario:solved(r,{lectura:n>0}),envio_id:crypto.randomUUID()};
  const out=await call(db,answer);assert.equal(out.status,200);assert.equal(out.output.completado,true);assert.equal(out.output.con_ayuda,n===0);
  const replay=await call(db,answer);assert.equal(JSON.stringify(replay),JSON.stringify(out));assert.equal(db.tables.sesiones.at(-1).es_correcta,null);
  const p=db.tables.sesiones.at(-1).ia_parametros_usados;assert.equal(p.concreto_resultado.independiente,n>0);assert.equal(p.concreto_resultado.apoyo,n===0?'matematico':'acceso_lector');checks++;
 }
}
assert.equal(db.tables.sesiones.length,21);assert(concrete.resumirEvidenciaConcreta(db.tables.sesiones).every(e=>e.independientes===2));
assert.equal(h.objectives.esElegibleParaExamenFinal('numeros_naturales_sistema_decimal',db.tables.sesiones),false);checks++;
const start=await call(db,{accion:'iniciar',tema:'division_1_digito',habilidad:'repartir'});const r=start.output;
// Reparto equilibrado sin comprobar cuántas recibió cada plato no demuestra la acción completa.
const wrong=await call(db,{accion:'responder',sesion_id:r.sesion_id,respuesta_usuario:solved(r,{cantidad:0}),envio_id:crypto.randomUUID()});assert.equal(wrong.output.es_correcta,false);assert.equal(wrong.output.completado,false);
await registry.registrarAyuda(db,r.sesion_id,{envio_id:crypto.randomUUID()});
const helped=await call(db,{accion:'responder',sesion_id:r.sesion_id,respuesta_usuario:solved(r),envio_id:crypto.randomUUID()});assert.equal(helped.output.con_ayuda,true);assert.equal(db.tables.sesiones.at(-1).ia_parametros_usados.concreto_resultado.independiente,false);checks++;
const foreign=await call(db,{accion:'responder',sesion_id:r.sesion_id,respuesta_usuario:solved(r),user_id:'otra-cuenta',envio_id:crypto.randomUUID()});assert.equal(foreign.status,403);
const denied=await call(db,{accion:'iniciar',tema:'division_1_digito'},false);assert.equal(denied.status,403);
const invalid=await call(db,{accion:'iniciar',tema:'ortografia_h'});assert.equal(invalid.status,403);checks++;
const fraction=concrete.crearRetoConcreto('fracciones_concepto');assert.equal(fraction.habilidad,'mitades');assert.throws(()=>concrete.evaluarConstruccion(fraction,'{}'));
assert.equal(concrete.evaluarConstruccion(fraction,solved(fraction,{seleccion:[0,0]})).correcta,false);checks++;
const progression=await call(db,{accion:'iniciar',tema:'numeros_naturales_sistema_decimal',habilidad:'cantidad',continuar:true});assert.equal(progression.output.habilidad,'juntar');checks++;
const {validarEstadoMision}=h.load('src/lib/estado-mision.js',['validarEstadoMision']);
const state={user_id:h.user.id,estrellas:14,desafios:1,retosCompletadosIds:['previa'],pregunta:r,sesionId:r.sesion_id,respuesta:solved(r),actividadAnterior:{sesionId:'original',pregunta:{tipo:'leccion'},respuesta:'borrador'},pasoEjemplo:1};
const saved=validarEstadoMision(state,h.user.id);assert.equal(saved.actividadAnterior.respuesta,'borrador');assert.equal(saved.estrellas,14);assert.equal(saved.pasoEjemplo,1);checks++;
const {resumirSesionFamiliar}=h.load('src/lib/recorrido-familiar.js',['resumirSesionFamiliar']);
const family=resumirSesionFamiliar(db.tables.sesiones.find(s=>s.id===r.sesion_id));assert(family.estado.includes('acompañamiento'));assert(family.respuesta.includes('Fichas por recipiente'));assert.equal(family.exploracion_concreta,true);assert(!family.respuesta.includes('modeloVisto'));checks++;
console.log(JSON.stringify({passed:checks,skills:7,variants:21,realDatabase:false,realAI:false}));
})().catch(e=>{console.error(e);process.exitCode=1});

