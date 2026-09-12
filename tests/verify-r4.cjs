const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict'),crypto=require('crypto');
const file=path.join(__dirname,'verify-r2.cjs'),h=new Module(file,module);h.filename=file;h.paths=module.paths;
h._compile(fs.readFileSync(file,'utf8').split('(async()=>{')[0]+'\nmodule.exports={load,db,user,answer,objectives,curriculum,exams,prompts,alumno,progress};',file);
const {load,db,user,answer,objectives}=h.exports;
const r=load('src/lib/registro-envios.js',['iniciarEnvio','guardarPasoEnvio','completarEnvio','liberarEnvio','registrarAyuda']);
const row=()=>({id:'activity',user_id:user.id,tema:'fracciones_concepto',capa:1,tipo_pregunta:'multiple',es_correcta:null,ia_parametros_usados:{objetivo_id:'frac_con_1_partes_iguales',contenido_version:'bases-2026-09-12-v1',actividad_id:'frac_con_1_partes_iguales-v2'}});
const body=(id,answer='B')=>({sesion_id:'activity',envio_id:id,respuesta_usuario:answer});
const results=[];async function check(name,fn){await fn();results.push(name);console.log(name);}
(async()=>{
 await check('Ocho ayudas simultáneas conservan ocho eventos y los metadatos',async()=>{
  const d=db({sesiones:[row()]});await Promise.all(Array.from({length:8},(_,i)=>r.registrarAyuda(d,'activity',body('help0000'+i))));
  assert.equal(d.tables.sesiones[0].ia_parametros_usados.eventos_pedagogicos.length,8);assert.equal(d.tables.sesiones[0].ia_parametros_usados.objetivo_id,row().ia_parametros_usados.objetivo_id);
 });
 await check('Un solo proceso reserva una respuesta simultánea',async()=>{
  const d=db({sesiones:[row()]});const results=await Promise.allSettled(Array.from({length:6},()=>r.iniciarEnvio(d,'activity',body('attempt01'))));
  assert.equal(results.filter(x=>x.status==='fulfilled').length,1);for(const x of results.filter(x=>x.status==='rejected'))assert.equal(x.reason.status,409);
 });
 await check('Ayuda concurrente no se pierde al escribir evaluación ni decisión',async()=>{
  const d=db({sesiones:[row()]});const e=await r.iniciarEnvio(d,'activity',body('attempt01'));e.evaluacion={es_correcta:true,retroalimentacion:'Bien'};
  await Promise.all([r.registrarAyuda(d,'activity',body('help0001')),r.guardarPasoEnvio(d,'activity',e,{es_correcta:true,ia_parametros_usados:{resuelto_con_ayuda:false}})]);
  await r.guardarPasoEnvio(d,'activity',e,{ia_parametros_usados:{...e.sesion.ia_parametros_usados,progression:{}}});
  assert.equal(d.tables.sesiones[0].ia_parametros_usados.ayuda_utilizada,true);assert.equal(d.tables.sesiones[0].ia_parametros_usados.eventos_pedagogicos.length,2);assert.equal(d.tables.sesiones[0].ia_parametros_usados.eventos_pedagogicos.find(e=>e.id==='attempt01').con_ayuda,true);
 });
 await check('Una reserva vencida se recupera y el proceso anterior no puede escribir',async()=>{
  const d=db({sesiones:[row()]});const old=await r.iniciarEnvio(d,'activity',body('attempt01'));
  d.tables.sesiones[0].ia_parametros_usados.envio_en_curso.hasta=0;
  const next=await r.iniciarEnvio(d,'activity',body('attempt01'));
  await assert.rejects(()=>r.guardarPasoEnvio(d,'activity',old,{es_correcta:false}),e=>e.status===409);
  await r.guardarPasoEnvio(d,'activity',next,{es_correcta:true});await r.completarEnvio(d,'activity',next,{es_correcta:true});
  assert.equal(d.tables.sesiones[0].es_correcta,true);
 });
 await check('API repite el recibo sin recalificar ni volver a escribir',async()=>{
  const d=db({sesiones:[row()]});const first=await answer(d,'activity',body('attempt01'));const writes=d.writes.length;
  const second=await answer(d,'activity',body('attempt01'));assert.deepEqual(JSON.parse(JSON.stringify(second)),JSON.parse(JSON.stringify(first)));assert.equal(d.writes.length,writes);
  assert.equal(d.tables.sesiones[0].ia_parametros_usados.eventos_pedagogicos.length,1);
  await assert.rejects(()=>r.iniciarEnvio(d,'activity',body('attempt01','A')),e=>e.status===409);
  await assert.rejects(()=>r.iniciarEnvio(d,'activity',body('attempt02','A')),e=>e.status===409);
 });
 await check('Error, aviso no visto y acierto con ayuda conservan los tres resultados',async()=>{
  const d=db({sesiones:[row()]});await answer(d,'activity',body('attempt01','A'));
  await answer(d,'activity',{...body('attempt02','No lo vimos'),no_visto:true});await answer(d,'activity',body('attempt03','B'));
  const events=d.tables.sesiones[0].ia_parametros_usados.eventos_pedagogicos;
  assert.deepEqual(Array.from(events,e=>e.es_correcta),[false,null,true]);assert.equal(events[2].con_ayuda,true);
 });
 await check('Fallo después de guardar evaluación se reanuda sin otra llamada a IA',async()=>{
  const entry=row();entry.ia_parametros_usados={};const d=db({sesiones:[entry]});let calls=0,fail=true;
  const deps={...h.exports.curriculum,...h.exports.exams,...objectives,...h.exports.prompts,...h.exports.alumno,...h.exports.progress,
   requireMethod:()=>true,requireAccess:()=>true,requireOwnership:()=>true,checkDailyRateLimit:async()=>({ok:true}),getSupabaseAdmin:()=>d,assertSupabaseOk:r=>{if(r.error)throw Error('db');return r.data},loadUser:async()=>({data:user}),
   callOpenRouter:async()=>{calls++;return JSON.stringify({es_correcta:true,retroalimentacion:'Lo resolviste'})},parseJsonFromModel:JSON.parse,MODEL_TUTOR:'fake',maybeCreateAlert:async()=>null,
   refreshTopicProgress:async()=>{if(fail){fail=false;throw Error('fallo de prueba después de evaluación')}return {}},console:{error(){}}};
  const handler=load('src/pages/api/sesion/respuesta.js',['handler'],deps).handler;
  async function run(){let status,out;await handler({body:body('attempt01')},{status(s){status=s;return this},json(v){out=v}});return {status,out};}
  assert.equal((await run()).status,502);assert.equal(d.tables.sesiones[0].es_correcta,true);
  assert.equal((await run()).status,200);assert.equal(calls,1);assert.equal(d.tables.sesiones[0].ia_parametros_usados.eventos_pedagogicos.length,1);
 });
 await check('Los dos errores de un mismo reto sobreviven al resumen y piden explicación',async()=>{
  const d=db({sesiones:[row()]});await answer(d,'activity',body('attempt01','A'));await answer(d,'activity',{...body('attempt02','A'),resuelto_con_ayuda:true});
  assert.equal(objectives.determinarProximoObjetivo('fracciones_concepto',d.tables.sesiones).necesitaRepaso,true);
 });
 await check('Una ayuda consultada después del acierto se registra como repaso',async()=>{
  const d=db({sesiones:[row()]});await answer(d,'activity',body('attempt01'));await r.registrarAyuda(d,'activity',body('help0001'));
  assert.equal(d.tables.sesiones[0].ia_parametros_usados.resuelto_con_ayuda,false);assert.equal(d.tables.sesiones[0].ia_parametros_usados.eventos_pedagogicos.at(-1).retrospectiva,true);
 });
 const c=load('src/lib/envios-cliente.js',['fetchRegistrado','leerEnvioPendiente'],{crypto:crypto.webcrypto});
 const storage=()=>{const map=new Map();return {getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)}};
 await check('Cliente recupera el mismo ID y texto tras perder la respuesta HTTP',async()=>{
  const s=storage(),ids=[];let first=true;
  const fetcher=async(_,opts)=>{ids.push(JSON.parse(opts.body).envio_id);if(first){first=false;throw Error('conexión interrumpida')}return new Response(JSON.stringify({es_correcta:true}),{status:200})};
  const opts={body:JSON.stringify(body(undefined)),method:'POST'};
  await assert.rejects(()=>c.fetchRegistrado('/api/sesion/respuesta',opts,user.id,s,fetcher));assert.equal(c.leerEnvioPendiente(s,user.id,'activity').respuesta_usuario,'B');
  await c.fetchRegistrado('/api/sesion/respuesta',opts,user.id,s,fetcher);assert.equal(ids[0],ids[1]);assert.equal(c.leerEnvioPendiente(s,user.id,'activity'),null);
 });
 await check('Sin almacenamiento local no se envía una respuesta que no pueda recuperarse',async()=>{
  let calls=0;await assert.rejects(()=>c.fetchRegistrado('/api/sesion/respuesta',{body:JSON.stringify(body(undefined))},user.id,{getItem:()=>null,setItem(){throw Error('cuota')}},async()=>{calls++}));assert.equal(calls,0);
 });
 console.log(JSON.stringify({passed:results.length,results,realAI:false,realDatabase:false},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
