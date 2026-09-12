const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict');
const file=path.join(__dirname,'verify-r2.cjs'),h=new Module(file,module);h.filename=file;h.paths=module.paths;
h._compile(fs.readFileSync(file,'utf8').split('(async()=>{')[0]+'\nmodule.exports={load,db,answer,user};',file);
const {load,db,answer,user}=h.exports;
const content=load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','crearActividadBase','getUnidadBase']);
const access=load('src/lib/acceso-temas.js',['accesoTema']);
const review=load('src/lib/repasos-espaciados.js',['planificarRepasos','cargarHistorialRepasos','VERSION_REPASOS','INTERVALOS_REPASO'],{...content,...access,...load('src/lib/date.js',['isoDateOnly'])});
const u=content.UNIDADES_BASES[0],language=content.UNIDADES_BASES.find(u=>u.id==='leng_lect_1_literal');
function row(i,date,extra={},unit=u){return {id:'s'+i+'-'+date,user_id:user.id,tema:unit.tema,tipo_pregunta:i===0?'leccion':'multiple',created_at:date,es_correcta:true,
 ia_parametros_usados:{objetivo_id:unit.id,contenido_version:content.VERSION_BASES,actividad_id:unit.actividades[Math.min(i,5)].id},...extra};}
function learned(unit=u){return [0,1,2].map(i=>row(i,'2026-09-01T15:00:00Z',{},unit));}
const state=(rows,date='2026-09-12T15:00:00Z',options={})=>review.planificarRepasos(rows,{ahora:new Date(date),...options})[0];
function endpoint(database,overrides={}){return load('src/pages/api/sesion/repasos.js',['handler'],{
 ...review,...content,...load('src/lib/contrato-actividad.js',['quitarClaves']),
 requireAccess:()=>true,requireOwnership:()=>true,getSupabaseAdmin:()=>database,
 assertSupabaseOk:r=>{if(r.error)throw Error('database');return r.data;},loadUser:async()=>({data:user,error:null}),getUserPlan:()=> 'full',...overrides}).handler;}
async function request(database,method='GET',body={},overrides={}){let status,output;const headers={};await endpoint(database,overrides)({method,query:{user_id:user.id},body:{user_id:user.id,...body}},{setHeader(k,v){headers[k]=v;},status(n){status=n;return this;},json(v){output=v;}});return {status,output,headers};}
(async()=>{let cases=0;
 assert.equal(state([]),undefined);assert.equal(state(learned().slice(0,2)),undefined);cases++;
 assert.equal(state(learned().map(s=>({...s,ia_parametros_usados:{...s.ia_parametros_usados,contenido_version:'vieja'}}))),undefined);cases++;
 assert.equal(state(learned().map(s=>({...s,ia_parametros_usados:{...s.ia_parametros_usados,resuelto_con_ayuda:true}}))),undefined);cases++;
 assert.equal(state([learned()[0],learned()[1],learned()[1]]),undefined);cases++;
 const generated=learned();generated[0].es_correcta=null;assert.equal(state(generated),undefined);cases++;
 assert.equal(state(learned()).proximo_dia,'2026-09-03');assert.equal(state(learned(),'2026-09-02T23:00:00Z').disponible,false);cases++;
 assert.equal(state(learned(),'2026-09-03T00:30:00Z').disponible,false);assert.equal(state(learned(),'2026-09-03T03:00:00Z').disponible,true);cases++;
 let history=[...learned(),row(3,'2026-09-03T15:00:00Z')];assert.equal(state(history).proximo_dia,'2026-09-10');cases++;
 history.push(row(4,'2026-09-03T16:00:00Z'),row(5,'2026-09-04T15:00:00Z'));assert.equal(state(history).proximo_dia,'2026-09-10');cases++;
 history.push(row(4,'2026-09-10T15:00:00Z'));assert.equal(state(history).proximo_dia,'2026-09-24');cases++;
 history.push(row(5,'2026-09-24T15:00:00Z'));assert.equal(state(history,'2026-10-01T15:00:00Z').proximo_dia,'2026-10-24');assert.equal(state(history,'2027-01-01T15:00:00Z').intervalo_dias,30);cases++;
 let support=[...learned(),row(3,'2026-09-03T15:00:00Z',{es_correcta:false})];assert.equal(state(support).necesita_explicacion,true);assert.equal(state(support).proximo_dia,'2026-09-04');cases++;
 support.push(row(0,'2026-09-04T15:00:00Z'));assert.equal(state(support).necesita_explicacion,false);assert.equal(state(support).proximo_dia,'2026-09-06');cases++;
 const events=row(3,'2026-09-02T15:00:00Z');events.ia_parametros_usados.eventos_pedagogicos=[{id:'e1',evaluado_el:'2026-09-03T15:00:00Z',es_correcta:false},{id:'e2',evaluado_el:'2026-09-03T15:01:00Z',es_correcta:true,con_ayuda:true}];assert.equal(state([...learned(),events]).necesita_explicacion,true);assert.equal(state([...learned(),events]).proximo_dia,'2026-09-04');cases++;
 const noV=row(3,'2026-09-03T15:00:00Z',{es_correcta:null});noV.ia_parametros_usados.no_visto=true;assert.equal(state([...learned(),noV]).necesita_explicacion,true);cases++;
 assert.equal(state(learned(),'2026-09-12T15:00:00Z',{plan:'trial',rutaFlexible:true}),undefined);assert(state(learned(language),'2026-09-12T15:00:00Z',{plan:'trial'}));cases++;
 assert.equal(state([...learned(),row(4,'2099-01-01T15:00:00Z')]).proximo_dia,'2026-09-03');cases++;
 const many=db({sesiones:Array.from({length:1105},(_,i)=>({...row(1,'2026-09-01'),id:String(i).padStart(5,'0')}))});assert.equal((await review.cargarHistorialRepasos(many,user.id)).length,1105);cases++;
 const database=db({sesiones:learned()});let get=await request(database);assert.equal(get.status,200);assert.equal(get.output.repasos[0].objetivo_id,u.id);assert.equal(get.headers['Cache-Control'],'private, no-store');assert.equal(database.writes.length,0);cases++;
 const post=await request(database,'POST',{objetivo_id:u.id});assert.equal(post.status,200);assert.equal(post.output.repaso_espaciado,true);assert.equal(post.output.tipo,'practica');assert(!JSON.stringify(post.output).includes('respuesta_correcta'));cases++;
 const repeat=await request(database,'POST',{objetivo_id:u.id});assert.equal(repeat.output.sesion_id,post.output.sesion_id);assert.equal(database.tables.sesiones.length,4);cases++;
 const record=database.tables.sesiones.find(s=>s.id===post.output.sesion_id),activity=u.actividades.find(a=>a.id===record.ia_parametros_usados.actividad_id);
 await answer(database,record.id,{respuesta_usuario:activity.respuesta_correcta});get=await request(database);assert.equal(get.output.repasos.length,0);assert.equal(get.output.proximos.length,1);cases++;
 assert.equal((await request(database,'POST',{objetivo_id:u.id})).status,409);assert.equal((await request(database,'POST',{objetivo_id:'inventado'})).status,400);cases++;
 const assisted=db({sesiones:support.slice(0,4)});const scaffold=await request(assisted,'POST',{objetivo_id:u.id});assert.equal(scaffold.output.tipo,'leccion');assert(scaffold.output.explicacion_simple);assert(scaffold.output.ejercicio_practica);assert(!JSON.stringify(scaffold.output).includes('respuesta_correcta'));cases++;
 const denied=await request(database,'GET',{}, {requireOwnership:(req,res)=>{res.status(403).json({error:'prohibido'});return false;},getSupabaseAdmin:()=>{throw Error('Must not read another user');}});assert.equal(denied.status,403);cases++;
 const failed=await request(database,'GET',{}, {getSupabaseAdmin:()=>({from(){throw Error('Offline');}})});assert.equal(failed.status,500);cases++;
 console.log(JSON.stringify({passed:cases,intervalos:review.INTERVALOS_REPASO,realAI:false,realDatabase:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
