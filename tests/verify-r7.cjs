const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict');
const file=path.join(__dirname,'verify-r2.cjs'),m=new Module(file,module);m.filename=file;m.paths=module.paths;
m._compile(fs.readFileSync(file,'utf8').split('\n(async()=>{')[0]+'\nmodule.exports={load,db,user,curriculum,init};',file);
const {load,db,user,curriculum,init}=m.exports;
const summary=load('src/lib/recorrido-familiar.js',['resumirSesionFamiliar']);
const cas=load('src/lib/registro-envios.js',['cambiarSesion']);
const ok=r=>{if(r.error)throw Error(r.error.message);return r.data;};
const base={id:'session-test',user_id:user.id,tema:'produccion_escrita',tipo_pregunta:'examen_final',es_correcta:null,created_at:'2026-09-12T00:30:00Z',pregunta_generada:'Contá una historia.',respuesta_usuario:'Un día viajamos.',ia_parametros_usados:{revision_pendiente:true,objetivo_id:'original',eventos_pedagogicos:[]}};
async function request(database,endpoint,body={},query={},overrides={}) {
 const deps={...summary,...cas,...curriculum,requireMethod:(req,res,method)=>{if(req.method===method)return true;res.status(405).json({});return false;},requireAccess:()=>true,requireOwnership:(req,res,id)=>{if(id===user.id)return true;res.status(403).json({error:'Forbidden'});return false;},getSupabaseAdmin:()=>database,assertSupabaseOk:ok,precioAccesoCompletoArs:()=>19900,...overrides};
 const {handler}=load(endpoint,['handler'],deps);let status,output,headers={};
 await handler({method:endpoint.endsWith('/recorrido.js') || endpoint.endsWith('/progreso.js')?'GET':'POST',body,query:{user_id:user.id,...query}}, {setHeader(k,v){headers[k]=v;},status(v){status=v;return this;},json(v){output=v;}});
 return {status,output,headers};
}
const history='src/pages/api/familia/recorrido.js',review='src/pages/api/familia/devolucion.js',paper='src/pages/api/tarea-manuscrita/revisar.js';
(async()=>{
 let count=0;
 const one=summary.resumirSesionFamiliar({...base,contexto_json:{secret:'SECRET'},ia_parametros_usados:{...base.ia_parametros_usados,token:'SECRET',eventos_pedagogicos:[
  {id:'a',tipo:'respuesta',es_correcta:false,respuesta:'Intento 1',evaluado_el:'2026-09-12T00:30:00Z',evaluacion:{respuesta_correcta:'SECRET',retroalimentacion:'Veamos las pistas.'}},
  {id:'h',tipo:'ayuda',fecha:'2026-09-12T00:31:00Z'},
  {id:'n',tipo:'no_visto',es_correcta:null,fecha:'2026-09-12T00:32:00Z'},
  {id:'b',tipo:'respuesta',es_correcta:true,con_ayuda:true,respuesta:'Intento 2',fecha:'2026-09-12T00:33:00Z'},
  {id:'b',tipo:'respuesta',es_correcta:true},
 ]}});
 assert.equal(one.eventos.length,4);assert.equal(one.intentos,2);assert.equal(one.eventos[3].estado,'Resuelto con ayuda');count++;
 assert.equal(one.eventos[2].es_correcta,null);assert.equal(one.eventos[2].tipo,'no_visto');assert(!JSON.stringify(one).includes('SECRET'));count++;
 assert(summary.resumirSesionFamiliar({...base,es_correcta:true,ia_parametros_usados:{}}).estado.includes('sin detalle'));count++;
 assert(summary.resumirSesionFamiliar({...base,ia_parametros_usados:{eventos_pedagogicos:[{id:'h',tipo:'ayuda',retrospectiva:true}]}}).eventos[0].estado.includes('después'));count++;
 assert.equal(summary.resumirSesionFamiliar({...base,ia_parametros_usados:{eventos_pedagogicos:[{id:'f',estado:'fallido'}]}}).eventos[0].es_correcta,null);count++;
 const lesson=summary.resumirSesionFamiliar({...base,tipo_pregunta:'leccion',es_correcta:true,ia_parametros_usados:{eventos_pedagogicos:[{id:'a',es_correcta:true}]}});assert.equal(lesson.estado,'Lección y práctica guiada completadas');assert.equal(lesson.eventos[0].estado,'Práctica guiada completada');count++;
 const database=db({sesiones:Array.from({length:85},(_,i)=>({...base,id:'s'+String(i).padStart(3,'0'),created_at:'2026-09-12T00:30:00Z',ia_parametros_usados:{revision_pendiente:i===0 || i===84}}))});
 const get=await request(database,history);assert.equal(get.status,200);assert.equal(get.output.sesiones.length,20);assert(get.output.hay_mas);assert.equal(database.writes.length,0);assert.equal(get.headers['Cache-Control'],'private, no-store');count++;
 const pages=[];for(let i=0;i<5;i++){const page=await request(database,history,{}, {pagina:String(i)});pages.push(...page.output.sesiones.map(s=>s.id));}assert.equal(new Set(pages).size,85);count++;
 const pending=await request(database,history,{}, {vista:'pendientes'});assert.equal(pending.output.sesiones.length,2);assert(pending.output.sesiones.some(s=>s.id==='s000'));count++;
 for(const query of [{pagina:'-1'},{pagina:'NaN'},{pagina:['0']},{vista:'arbitrary'},{user_id:[] }])assert.equal((await request(database,history,{},query)).status,400);count++;
 assert.equal((await request(database,history,{}, {user_id:'another'},{getSupabaseAdmin:()=>{throw Error('Must not read');}})).status,403);count++;
 const d=db({sesiones:[base]});const first=await request(d,review,{sesion_id:base.id,comentario:'Lograste ordenar las ideas. Revisemos el cierre.'});assert.equal(first.status,200);assert.equal(d.tables.sesiones[0].es_correcta,null);assert.equal(d.tables.sesiones[0].ia_parametros_usados.objetivo_id,'original');assert(!first.output.sesion.revision_pendiente);count++;
 const reopened=await init.maybeCrearExamenFinal(d,user.id,base.tema,1,'NORMAL',{}, {retomar_examen:true});assert.equal(reopened.revision_pendiente,false);assert.equal(reopened.entregado,true);assert.equal(reopened.revision_familiar.comentario,first.output.sesion.revision.comentario);count++;
 const criteria=summary.resumirSesionFamiliar({...base,respuesta_usuario:JSON.stringify({texto:'Historia completa'}),contexto_json:{examen_final:{tipo_evaluacion:'produccion_manuscrita',instrucciones:'Escribí un título',criterios:{titulo:'Título adecuado'},respuesta_correcta:'SECRET'}}});assert.equal(criteria.respuesta,'Historia completa');assert.equal(criteria.criterios[0].detalle,'Título adecuado');assert(!JSON.stringify(criteria).includes('SECRET'));count++;
 const writes=d.writes.length;assert.equal((await request(d,review,{sesion_id:base.id,comentario:first.output.sesion.revision.comentario})).status,200);assert.equal(d.writes.length,writes);count++;
 assert.equal((await request(d,review,{sesion_id:base.id,comentario:'No sobrescribir'})).status,409);count++;
 assert.equal((await request(d,history,{}, {vista:'pendientes'})).output.sesiones.length,0);assert((await request(d,history)).output.sesiones[0].revision.comentario);count++;
 for(const comentario of ['', ' ', 'x'.repeat(2001),true])assert.equal((await request(d,review,{sesion_id:base.id,comentario})).status,400);count++;
 assert.equal((await request(db({sesiones:[{...base,user_id:'another'}]}),review,{sesion_id:base.id,comentario:'Texto'})).status,403);assert.equal((await request(db(),review,{sesion_id:'missing',comentario:'Texto'})).status,404);count++;
 const locked=db({sesiones:[{...base,ia_parametros_usados:{...base.ia_parametros_usados,envio_en_curso:{hasta:Date.now()+60000}}}]});assert.equal((await request(locked,review,{sesion_id:base.id,comentario:'Texto'})).status,409);assert.equal(locked.writes.length,0);count++;
 const simultaneous=db({sesiones:[base]});const concurrent=await Promise.all(['Comentario uno','Comentario dos'].map(comentario=>request(simultaneous,review,{sesion_id:base.id,comentario})));assert.equal(concurrent.filter(x=>x.status===200).length,1);assert.equal(concurrent.filter(x=>x.status===409).length,1);count++;
 assert.equal((await request(d,history,{}, {},{getSupabaseAdmin:()=>{throw Error('Offline');}})).status,500);count++;
 const pd=db({tareas_manuscritas:[{id:'paper-test',user_id:user.id,estado:'completada'}]});const pb={tarea_id:'paper-test',resultado:'correcta',cantidad_errores:0,comentario:'Buen trabajo'};
 assert.equal((await request(pd,paper,pb)).status,200);assert.equal(pd.tables.tareas_manuscritas[0].cantidad_errores,0);const pw=pd.writes.length;assert.equal((await request(pd,paper,pb)).status,200);assert.equal(pd.writes.length,pw);count++;
 assert.equal((await request(pd,paper,{...pb,resultado:'con_errores'})).status,409);count++;
 for(const cambio of [{resultado:'aprobado-inventado'},{cantidad_errores:-1},{cantidad_errores:1.2},{cantidad_errores:'NaN'},{comentario:'x'.repeat(2001)}])assert.equal((await request(pd,paper,{...pb,...cambio})).status,400);count++;
 assert.equal((await request(db({tareas_manuscritas:[{id:'paper-test',user_id:'another',estado:'completada'}]}),paper,pb)).status,403);count++;
 const dashboardDb=db({sesiones:[],progreso:[],alertas:[]});
 const dashboard=await request(dashboardDb,'src/pages/api/progreso.js',{}, {skip_insight:'true'}, {loadUser:async()=>({data:user}),loadUserByCode:async()=>({data:user}),buildAlumnoProfile:()=>({}),getUserPlan:()=> 'full',checkDailyRateLimit:()=>{throw Error('Read-only panel must not check AI quota');},callOpenRouter:()=>{throw Error('No AI call');}});
 assert.equal(dashboard.status,200);assert.equal(dashboard.output.insight_markdown,'');assert.equal(dashboard.output.precio_acceso_completo,19900);count++;
 console.log(JSON.stringify({passed:count,realAI:false,realDatabase:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
