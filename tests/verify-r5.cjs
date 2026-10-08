const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict');
const file=path.join(__dirname,'verify-r2.cjs'),h=new Module(file,module);h.filename=file;h.paths=module.paths;
h._compile(fs.readFileSync(file,'utf8').split('(async()=>{')[0]+'\nmodule.exports={load,db,start,answer,user,objectives,init,curriculum};',file);
const {load,db,start,answer,user,objectives,init,curriculum}=h.exports;
const {UNIDADES_BASES,VERSION_BASES,getCierreLengua}=load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','getCierreLengua']);
const language=UNIDADES_BASES.filter(u=>curriculum.CURRICULUM_LENGUA.some(t=>t.tema===u.tema));
const access=load('src/lib/acceso-temas.js',['accesoTema','temasHabilitados']);
const dashboard=load('src/pages/api/progreso.js',['buildDashboardMetrics'],curriculum);
// Stub semántico explícito: verifica el flujo; las pruebas live evalúan el modelo.
async function respond(database,id,body){
 const row=database.tables.sesiones.find(s=>s.id===id),u=UNIDADES_BASES.find(u=>u.id===row.ia_parametros_usados?.objetivo_id),a=u?.actividades.find(a=>a.id===row.ia_parametros_usados?.actividad_id);
 const stub=a?.rubrica_escritura?{seguridad:'alta',criterios:a.rubrica_escritura.map(c=>({id:c.id,estado:'logrado',cita_respuesta:body.respuesta_usuario,orientacion:''})),fidelidad:{estado:'logrado',cita_respuesta:'',orientacion:''}}:undefined;
 return answer(database,id,body,stub);
}

(async()=>{
 let checked=0;const all=[...curriculum.CURRICULUM_MATEMATICA,...curriculum.CURRICULUM_LENGUA];
 // API and family panel agree for every topic, including flexible and trial accounts.
 for(const plan of ['full','trial'])for(const flexible of [false,true])for(const approved of [[],['numeros_naturales_sistema_decimal'],['comprension_lectora_literal_inferida','verbos_modo_indicativo_tiempos'],all.map(t=>t.tema)]){
  const database=db({sesiones:approved.map(tema=>({user_id:user.id,tema,tipo_pregunta:'examen_final',es_correcta:true}))});
  const unlocked=await init.getUnlockedTopics(database,user.id,plan,{rasgos_especiales:{ruta_flexible:flexible}});
  const metrics=dashboard.buildDashboardMetrics({progreso:[],sesiones:[],alertas:[],plan,examenesAprobados:approved,rutaFlexible:flexible});
  for(const topic of all){const expected=access.accesoTema(topic.tema,{plan,aprobados:approved,rutaFlexible:flexible});assert.equal(unlocked.has(topic.tema),expected.habilitado);assert.equal(metrics.progreso_temas.find(t=>t.tema===topic.tema).unlocked,expected.habilitado);}
  checked++;
 }
 assert.equal(access.accesoTema('division_1_digito').habilitado,false);
 assert.equal(access.accesoTema('division_1_digito',{aprobados:['tablas_multiplicar_2_5']}).habilitado,true);
 assert.equal(access.accesoTema('sujeto_predicado_nucleo',{aprobados:['verbos_modo_indicativo_tiempos']}).habilitado,true);
 assert.equal(access.accesoTema('tildes_generales_agudas_graves_esdrujulas',{plan:'trial',rutaFlexible:true}).habilitado,false);
 assert.equal(access.accesoTema('inexistente',{rutaFlexible:true}).habilitado,false);checked++;
 // Complete each language route through the real controllers: explanation, two distinct unassisted practices.
 for(const tema of new Set(language.map(u=>u.tema))){
  const prerequisites=curriculum.CURRICULUM_LENGUA.filter(t=>t.tema!==tema).map(t=>({id:'prereq-'+t.tema,user_id:user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true}));
  const database=db({sesiones:prerequisites,lecciones_completadas:[]});
  const oldExam={id:'legacy',user_id:user.id,tema,tipo_pregunta:'examen_final',es_correcta:null,created_at:'2020-01-01',contexto_json:{examen_final:{enunciado:'Pregunta antigua sin enseñanza'}}};database.tables.sesiones.push(oldExam);
  for(const u of language.filter(u=>u.tema===tema)){
   const lesson=await start(database,{tema});assert.equal(lesson.output.tema,tema);assert.equal(lesson.output.tipo,'leccion');assert.equal(lesson.calls.length,0);assert.equal(lesson.output.unidad_titulo,u.titulo);
   assert.equal(lesson.output.ejercicio_practica.respuesta_correcta,undefined);assert.equal(lesson.output.ejercicio_practica.paso_resuelto,undefined);
   await respond(database,lesson.output.sesion_id,{respuesta_usuario:u.actividades[0].respuesta_correcta});
   const ids=new Set();for(let i=0;i<2;i++){
    const practice=await start(database,{tema});assert.equal(practice.output.tipo,'practica');assert.equal(practice.output.tema,tema);assert.equal(practice.calls.length,0);
    const row=database.tables.sesiones.find(s=>s.id===practice.output.sesion_id);const a=u.actividades.find(a=>a.id===row.ia_parametros_usados.actividad_id);ids.add(a.id);
    assert.equal((await respond(database,row.id,{respuesta_usuario:a.respuesta_correcta})).es_correcta,true);
   }assert.equal(ids.size,2);checked++;
  }
  assert(objectives.esElegibleParaExamenFinal(tema,database.tables.sesiones));
  const revision=await start(database,{tema,modo:'REPASO'});assert.equal(revision.output.tipo,'leccion');assert.equal(revision.calls.length,0);
  database.tables.lecciones_completadas=[]; // No depender de la marca de la lección antigua.
  const offered=await start(database,{tema,forzar_practica:false});assert.equal(offered.output.tipo,'practica');assert.equal(offered.output.examen_disponible,true);
  const chosen=await start(database,{tema,capa:5,forzar_practica:false,rendir_examen:true});assert.equal(chosen.output.tipo,'examen_final');assert.equal(chosen.calls.length,0);
  assert.equal(chosen.output.contenido_version,VERSION_BASES);assert.equal(chosen.output.dificultad,'basico');assert.notEqual(chosen.output.sesion_id,'legacy');
  const closure=getCierreLengua(tema);assert.equal(chosen.output.preguntas.length,closure.preguntas.length);assert(chosen.output.preguntas.every(q=>q.respuesta_correcta===undefined && q.opciones.length));
  const response=Object.fromEntries(closure.preguntas.map(q=>[q.id,q.respuesta_correcta]));const result=await respond(database,chosen.output.sesion_id,{respuesta_usuario:JSON.stringify(response)});assert.equal(result.es_correcta,true);assert.equal(result.decision.proximo_tema,tema);checked++;
 }
 // Old, unversioned success cannot skip reviewed teaching; help does not count as independent mastery.
 const first=language[0];const old=[1,2,3].map(i=>({id:'old'+i,tema:first.tema,tipo_pregunta:'multiple',es_correcta:true,ia_parametros_usados:{objetivo_id:first.id}}));
 assert.equal(objectives.determinarProximoObjetivo(first.tema,old).requiereExplicacion,true);
 const helpDb=db({sesiones:[]});const lesson=await start(helpDb,{tema:first.tema});await respond(helpDb,lesson.output.sesion_id,{respuesta_usuario:first.actividades[0].respuesta_correcta});
 const practice=await start(helpDb,{tema:first.tema});const scaffold=await respond(helpDb,practice.output.sesion_id,{respuesta_usuario:'Esto no lo vimos',no_visto:true});assert.equal(scaffold.es_correcta,null);
 await respond(helpDb,practice.output.sesion_id,{respuesta_usuario:first.actividades[1].respuesta_correcta});assert.equal(objectives.determinarProximoObjetivo(first.tema,helpDb.tables.sesiones).aciertosIndependientes,0);checked++;
 // Accent marks remain significant in the final closure (not just in practice).
 const {evaluarExamenFinal}=load('src/lib/examenes-monserrat.js',['evaluarExamenFinal']);const close=getCierreLengua('tildes_generales_agudas_graves_esdrujulas');const q=close.preguntas.find(q=>/[áéíóú]/.test(q.respuesta_correcta));assert(q);assert.equal(evaluarExamenFinal({...close,preguntas:[q],min_correctas:1},{[q.id]:q.respuesta_correcta.normalize('NFD').replace(/[\u0300-\u036f]/g,'')}).es_correcta,false);checked++;
 console.log(JSON.stringify({passed:checked,newUnits:language.length,newActivities:language.reduce((n,u)=>n+u.actividades.length,0),realAI:false,realDatabase:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
