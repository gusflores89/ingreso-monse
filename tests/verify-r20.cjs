const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict');
const f=path.join(__dirname,'verify-r2.cjs'),m=new Module(f,module);m.filename=f;m.paths=module.paths;m._compile(fs.readFileSync(f,'utf8').split('\n(async()=>{')[0]+'\nmodule.exports={load,db,start,answer,user,objectives,exams,curriculum};',f);const h=m.exports;
const {UNIDADES_BASES:units,VERSION_BASES:version,getCierreBase,esCierreActual}=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','getCierreBase','esCierreActual']);
const expected={"leng_evi_dato": ["Los puestos se instalaron en el patio del club.", "Lucía dibujó los animales del afiche.", "El préstamo de juegos comienza los jueves.", "La encargada entregó semillas de lechuga al grupo.", "La primera reunión será el sábado.", "Sara guardó las tijeras en el cajón azul."], "leng_evi_causa": ["La visita se suspendió porque el museo debía reparar el techo.", "Tras varios días sin lluvia, la tierra estaba seca.", "Por falta de luz en la sala, la lectura se trasladó al patio.", "Como la cancha estaba inundada, entrenaron en el gimnasio.", "La apertura se demoró porque no encontraban la llave.", "La caja se rompió por el peso de los libros."], "leng_evi_inferencia": ["El agua de la limpieza todavía cubría el piso.", "Cada integrante tomó su mochila y se acercó a la salida.", "El libro tenía el lomo gastado y varias páginas dobladas.", "Al destapar la olla salió vapor y Julia retiró la mano enseguida.", "Apenas quedó libre el sillón, tres lectores se acercaron a ocuparlo.", "Al oír el trueno, el perro se escondió bajo la cama y tembló."]};
function proof(u){return [0,1,2].map(n=>({id:u.id+n,user_id:h.user.id,tema:u.tema,tipo_pregunta:n?'multiple':'leccion',es_correcta:true,created_at:'2026-09-11T12:00:00Z',ia_parametros_usados:{objetivo_id:u.id,contenido_version:version,actividad_id:u.actividades[n].id}}));}
function oldExam(tema,correct=true){return {id:'old-exam',user_id:h.user.id,tema,tipo_pregunta:'examen_final',es_correcta:correct,created_at:'2026-09-12T12:00:00Z',ia_parametros_usados:{contenido_version:version},contexto_json:{examen_final:{...getCierreBase(tema),revision_cierre:undefined,preguntas:[{id:'1',texto:'Cierre anterior',respuesta_correcta:'Sí',opciones:['Sí','No']}],min_correctas:1}}};}
(async()=>{let checks=0;assert.equal(units.filter(u=>u.id.startsWith('leng_evi_')).length,3);
 for(const u of units.filter(u=>Object.hasOwn(expected,u.id))){assert.deepEqual(Array.from(u.actividades,a=>a.respuesta_correcta),expected[u.id],u.id);checks+=6;}
 for(const tema of ["comprension_lectora_literal_inferida"]){
 const prereqs=h.curriculum.CURRICULUM_MATEMATICA.filter(t=>t.tema!==tema).map((t,i)=>({id:'req'+i,user_id:h.user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true,ia_parametros_usados:{}}));
  const closure=getCierreBase(tema);assert.equal(closure.preguntas.length,3);assert.equal(closure.min_correctas,2);assert.equal(closure.tiempo_estimado,3);assert(esCierreActual(closure,tema));assert.equal(esCierreActual(oldExam(tema).contexto_json.examen_final,tema),false);checks++;
  // Un cierre anterior aprobado no salta las unidades nuevas; sus datos siguen intactos.
  const history=units.filter(u=>!u.id.startsWith('leng_evi_')).flatMap(proof),old=oldExam(tema),database=h.db({sesiones:[...prereqs,...history,old]});
  const pending=await h.start(database,{tema,rendir_examen:true,forzar_practica:false});assert.equal(pending.output.tipo,'leccion');assert.equal(pending.calls.length,0);
  const row=database.tables.sesiones.at(-1);assert(row.ia_parametros_usados.objetivo_id.startsWith('leng_evi_'));assert.deepEqual(database.tables.sesiones.find(s=>s.id===old.id),old);checks++;
  // Después de toda la enseñanza, el cierre actual está disponible a pesar del aprobado anterior.
  const complete=units.flatMap(proof),ready=h.db({sesiones:[...prereqs,...complete,old]});
  const offer=await h.start(ready,{tema,forzar_practica:false});assert.equal(offer.output.examen_disponible,true);checks++;
  const chosen=await h.start(ready,{tema,rendir_examen:true,forzar_practica:false});assert.equal(chosen.output.tipo,'examen_final');assert.equal(chosen.calls.length,0);assert.equal(chosen.output.revision_cierre,closure.revision_cierre);assert(chosen.output.preguntas.every(q=>q.respuesta_correcta===undefined));checks++;
  const answer=Object.fromEntries(closure.preguntas.map((q,i)=>[q.id,i<2?q.respuesta_correcta:q.opciones.find(x=>x!==q.respuesta_correcta)]));
  assert.equal(h.exams.evaluarExamenFinal(closure,answer).es_correcta,true);checks++;
  // Retomar no recupera el cierre obsoleto; un cierre actual sí conserva su ID.
  const outdated=oldExam(tema,null),resume=h.db({sesiones:[...prereqs,...complete,outdated]});
  const fresh=await h.start(resume,{tema,retomar_examen:true,forzar_practica:false});assert.notEqual(fresh.output.sesion_id,outdated.id);assert.equal(fresh.output.revision_cierre,closure.revision_cierre);checks++;
  const again=await h.start(resume,{tema,retomar_examen:true,forzar_practica:false});assert.equal(again.output.sesion_id,fresh.output.sesion_id);checks++;
  // Terminar una actividad abierta antes del despliegue conserva su alcance anterior.
  const oldOpen=oldExam(tema,null),oldDb=h.db({sesiones:[...prereqs,...history,oldOpen]});
  const result=await h.answer(oldDb,oldOpen.id,{respuesta_usuario:JSON.stringify({'1':'Sí'})});assert.equal(result.es_correcta,true);assert(result.retroalimentacion.includes('cierre anterior'));assert.equal(h.objectives.esElegibleParaExamenFinal(tema,oldDb.tables.sesiones),false);checks++;
 }
 // Dos respuestas sin explicación no permiten saltar la enseñanza.
 const u=units.find(u=>u.id==='leng_evi_dato'),history=units.filter(x=>x.tema===u.tema&&!x.id.startsWith('leng_evi_')).flatMap(proof);
 assert.equal(h.objectives.determinarProximoObjetivo(u.tema,[...history,...proof(u).slice(1)]).requiereExplicacion,true);checks++;
 const publicContent=h.load('src/lib/apuntes-bases.js',['getFichaBase']);
 const ficha=publicContent.getFichaBase(u.tema);
 for(const unit of units.filter(u=>Object.hasOwn(expected,u.id))){
  assert(ficha.apunte_completo.includes(unit.visual.texto));assert(ficha.apunte_completo.includes(unit.explicacion));checks++;
  for(const a of unit.actividades){
   assert.equal(a.visual.tipo,'lectura');assert(a.visual.texto.length>40);assert.equal(new Set(a.opciones).size,3);
   const quote=a.paso_resuelto.match(/«([^»]+)»/)[1];assert(a.visual.texto.includes(quote),a.id);assert(!a.enunciado.includes(a.visual.texto));checks++;
  }
 }
 for(const unit of units.filter(u=>u.tema==='comprension_lectora_literal_inferida'))for(const a of unit.actividades){assert.equal(a.visual.tipo,'lectura');assert(a.visual.texto.trim());}
 // Cada opción es una cita real; su pertinencia depende de la respuesta que sostiene.
 for(const unit of units.filter(u=>Object.hasOwn(expected,u.id))){
  const positions=[];
  for(const a of unit.actividades){
   for(const option of a.opciones)assert(a.visual.texto.includes(option),a.id);
   assert.equal(a.visual.texto.split('. ').length,3);positions.push(a.opciones.indexOf(a.respuesta_correcta));
   const session={tipo_pregunta:'multiple',ia_parametros_usados:{contenido_version:version,objetivo_id:unit.id,actividad_id:a.id}};
   const {evaluarActividadBase}=h.load('src/lib/contenido-bases.js',['evaluarActividadBase']);
   for(const option of a.opciones)assert.equal(evaluarActividadBase(session,option).es_correcta,option===a.respuesta_correcta);
   assert.equal(evaluarActividadBase(session,'inventada').es_correcta,false);checks++;
  }
  assert.deepEqual(positions,[0,1,2,0,1,2]);checks++;
  const before=units.filter(v=>v.tema!==unit.tema || units.indexOf(v)<units.indexOf(unit)).flatMap(proof);
  const lessonDb=h.db({sesiones:before});const lesson=await h.start(lessonDb,{tema:unit.tema,forzar_practica:false});
  assert.equal(lesson.output.tipo,'leccion');assert.equal(lesson.output.explicacion_simple,unit.explicacion);assert.equal(lesson.calls.length,0);
  assert.equal(lesson.output.ejercicio_practica.respuesta_correcta,undefined);assert.equal(lesson.output.ejercicio_practica.paso_resuelto,undefined);
  const id=lesson.output.sesion_id;
  const help=await h.answer(lessonDb,id,{respuesta_usuario:'Esto todavía no lo vimos',no_visto:true,envio_id:'r20-help-'+unit.id});assert.equal(help.es_correcta,null);checks++;
  const wrong=unit.actividades[0].opciones.find(v=>v!==unit.actividades[0].respuesta_correcta);
  const error=await h.answer(lessonDb,id,{respuesta_usuario:wrong,envio_id:'r20-wrong-'+unit.id});assert.equal(error.es_correcta,false);assert.equal(error.pista_concreta,unit.pista);assert.equal(error.paso_resuelto,unit.actividades[0].paso_resuelto);checks++;
  const right=await h.answer(lessonDb,id,{respuesta_usuario:unit.actividades[0].respuesta_correcta,resuelto_con_ayuda:true,envio_id:'r20-right-'+unit.id});assert.equal(right.es_correcta,true);assert.equal(lessonDb.tables.sesiones.at(-1).ia_parametros_usados.resuelto_con_ayuda,true);checks++;
 }
 console.log(JSON.stringify({passed:checks,newUnits:3,newActivities:18,readingUnits:units.filter(u=>u.tema==='comprension_lectora_literal_inferida').length,closureQuestions:3,realAI:false,realDatabase:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
