const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict');
const f=path.join(__dirname,'verify-r2.cjs'),m=new Module(f,module);m.filename=f;m.paths=module.paths;m._compile(fs.readFileSync(f,'utf8').split('\n(async()=>{')[0]+'\nmodule.exports={load,db,start,answer,user,objectives,exams,curriculum};',f);const h=m.exports;
const {UNIDADES_BASES:units,VERSION_BASES:version,getCierreBase,esCierreActual}=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','getCierreBase','esCierreActual']);
const expected={"leng_prof_precision": ["El viernes", "En un cajón", "Bruno", "En la estación del pueblo", "Retazos", "El domingo"], "leng_prof_orden": ["Llenó la maceta con tierra", "Revisó los frenos", "Marcó el camino", "Agregó yogur", "Lo dejó secar", "Preparar preguntas → visitar → escribir"], "leng_prof_referencias": ["Al cuaderno", "La biblioteca", "A Clara", "Las hojas secas", "En el salón", "La novela"], "leng_prof_contexto": ["Cuidadoso", "Angosto", "Que deja ver a través", "Sin personas", "Corta", "Fuerza"], "leng_prof_causa": ["Porque la cancha estaba llena de agua", "Para que no se volaran", "Porque las pilas estaban gastadas", "El cierre de una sala", "Que recibiera más luz", "Para que se pudiera leer desde la puerta"], "leng_prof_evidencia": ["Le temblaban las manos y respiraba rápido", "Movía la cola y daba pequeños saltos", "Tampoco había luz en la casa vecina", "La tierra estaba seca y sin humedad", "Cerraba los ojos y bostezaba", "Preguntó si alguien lo había visto"], "leng_prof_limites": ["El texto no permite saberlo", "El texto no permite saberlo", "El texto no permite saberlo", "Un río y varios árboles", "A las diez", "El texto no permite saberlo"]};
function proof(u){return [0,1,2].map(n=>({id:u.id+n,user_id:h.user.id,tema:u.tema,tipo_pregunta:n?'multiple':'leccion',es_correcta:true,created_at:'2026-09-11T12:00:00Z',ia_parametros_usados:{objetivo_id:u.id,contenido_version:version,actividad_id:u.actividades[n].id}}));}
function oldExam(tema,correct=true){return {id:'old-exam',user_id:h.user.id,tema,tipo_pregunta:'examen_final',es_correcta:correct,created_at:'2026-09-12T12:00:00Z',ia_parametros_usados:{contenido_version:version},contexto_json:{examen_final:{...getCierreBase(tema),revision_cierre:undefined,preguntas:[{id:'1',texto:'Cierre anterior',respuesta_correcta:'Sí',opciones:['Sí','No']}],min_correctas:1}}};}
(async()=>{let checks=0;assert.equal(units.filter(u=>u.id.startsWith('leng_prof_')).length,7);
 for(const u of units.filter(u=>Object.hasOwn(expected,u.id))){assert.deepEqual(Array.from(u.actividades,a=>a.respuesta_correcta),expected[u.id],u.id);checks+=6;}
 for(const tema of ["comprension_lectora_literal_inferida"]){
 const prereqs=h.curriculum.CURRICULUM_MATEMATICA.filter(t=>t.tema!==tema).map((t,i)=>({id:'req'+i,user_id:h.user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true,ia_parametros_usados:{}}));
  const closure=getCierreBase(tema);assert.equal(closure.preguntas.length,3);assert.equal(closure.min_correctas,2);assert.equal(closure.tiempo_estimado,3);assert(esCierreActual(closure,tema));assert.equal(esCierreActual(oldExam(tema).contexto_json.examen_final,tema),false);checks++;
  // Un cierre anterior aprobado no salta las unidades nuevas; sus datos siguen intactos.
  const history=units.filter(u=>!u.id.startsWith('leng_prof_')).flatMap(proof),old=oldExam(tema),database=h.db({sesiones:[...prereqs,...history,old]});
  const pending=await h.start(database,{tema,rendir_examen:true,forzar_practica:false});assert.equal(pending.output.tipo,'leccion');assert.equal(pending.calls.length,0);
  const row=database.tables.sesiones.at(-1);assert(row.ia_parametros_usados.objetivo_id.startsWith('leng_prof_'));assert.deepEqual(database.tables.sesiones.find(s=>s.id===old.id),old);checks++;
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
 const u=units.find(u=>u.id==='leng_prof_precision'),history=units.filter(x=>x.tema===u.tema&&!x.id.startsWith('leng_prof_')).flatMap(proof);
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
 console.log(JSON.stringify({passed:checks,newUnits:7,newActivities:42,readingUnits:10,closureQuestions:3,realAI:false,realDatabase:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
