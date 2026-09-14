const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict');
const f=path.join(__dirname,'verify-r2.cjs'),m=new Module(f,module);m.filename=f;m.paths=module.paths;m._compile(fs.readFileSync(f,'utf8').split('\n(async()=>{')[0]+'\nmodule.exports={load,db,start,answer,user,objectives,exams,curriculum};',f);const h=m.exports;
const {UNIDADES_BASES:units,VERSION_BASES:version,getCierreBase,esCierreActual}=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','getCierreBase','esCierreActual']);
const expected={"leng_res_tema": ["La biblioteca del club", "El cuidado de la huerta escolar", "Reutilizar papel", "La preparación de la radio escolar", "Preparar una muestra de juguetes", "La reparación de bicicletas"], "leng_res_detalles": ["La cinta violeta de la caja", "El color de la gorra", "El color de la caja", "La pegatina de la guitarra", "La forma de la maceta", "La forma de la mesa"], "leng_res_titulo": ["Un intercambio de plantas en la plaza", "Cuentos compartidos entre cursos", "Una sala para reunirse en el club", "Menos papel desperdiciado en la clase", "La historia del barrio contada por sus vecinos", "Libros que llegan a los hogares"], "leng_res_reformular": ["Juntaron dinero para arreglar el techo", "Una parte de los alumnos elige leer en el patio", "El cierre del puente impidió realizar el paseo", "Los libros se pueden llevar prestados durante siete días", "Quisieron llegar a la cima, pero volvieron antes", "Con la rampa se puede ingresar sin usar escalones"], "leng_res_unir": ["Los libros eran difíciles de encontrar; los ordenaron y etiquetaron para ubicarlos", "Un toldo dio sombra a los bancos y permitió volver a usarlos", "Para no perder avisos, el grupo los guarda y revisa en una carpeta común", "Renovaron las señales del sendero para orientar a los visitantes", "El club reunió juegos donados y organizó encuentros para usarlos", "La clase revisó sus cuentos para que se entendieran antes de compartirlos"], "leng_res_revisar": ["Plantó seis; diez era la cantidad que quería", "La causa fue la falla de una luz", "Se intercambiaron quienes donaron y quienes recibieron", "Que preparó los juguetes y organizó una tarde de juegos", "Todavía falta consultar y decidir si lo mantienen", "Sí, conserva las acciones principales"]};
function proof(u){return [0,1,2].map(n=>({id:u.id+n,user_id:h.user.id,tema:u.tema,tipo_pregunta:n?'multiple':'leccion',es_correcta:true,created_at:'2026-09-11T12:00:00Z',ia_parametros_usados:{objetivo_id:u.id,contenido_version:version,actividad_id:u.actividades[n].id}}));}
function oldExam(tema,correct=true){return {id:'old-exam',user_id:h.user.id,tema,tipo_pregunta:'examen_final',es_correcta:correct,created_at:'2026-09-12T12:00:00Z',ia_parametros_usados:{contenido_version:version},contexto_json:{examen_final:{...getCierreBase(tema),revision_cierre:undefined,preguntas:[{id:'1',texto:'Cierre anterior',respuesta_correcta:'Sí',opciones:['Sí','No']}],min_correctas:1}}};}
(async()=>{let checks=0;assert.equal(units.filter(u=>u.id.startsWith('leng_res_')).length,6);
 for(const u of units.filter(u=>Object.hasOwn(expected,u.id))){assert.deepEqual(Array.from(u.actividades,a=>a.respuesta_correcta),expected[u.id],u.id);checks+=6;}
 for(const tema of ["comprension_lectora_literal_inferida"]){
 const prereqs=h.curriculum.CURRICULUM_MATEMATICA.filter(t=>t.tema!==tema).map((t,i)=>({id:'req'+i,user_id:h.user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true,ia_parametros_usados:{}}));
  const closure=getCierreBase(tema);assert.equal(closure.preguntas.length,3);assert.equal(closure.min_correctas,2);assert.equal(closure.tiempo_estimado,3);assert(esCierreActual(closure,tema));assert.equal(esCierreActual(oldExam(tema).contexto_json.examen_final,tema),false);checks++;
  // Un cierre anterior aprobado no salta las unidades nuevas; sus datos siguen intactos.
  const history=units.filter(u=>!u.id.startsWith('leng_res_')).flatMap(proof),old=oldExam(tema),database=h.db({sesiones:[...prereqs,...history,old]});
  const pending=await h.start(database,{tema,rendir_examen:true,forzar_practica:false});assert.equal(pending.output.tipo,'leccion');assert.equal(pending.calls.length,0);
  const row=database.tables.sesiones.at(-1);assert(row.ia_parametros_usados.objetivo_id.startsWith('leng_res_'));assert.deepEqual(database.tables.sesiones.find(s=>s.id===old.id),old);checks++;
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
 const u=units.find(u=>u.id==='leng_res_tema'),history=units.filter(x=>x.tema===u.tema&&!x.id.startsWith('leng_res_')).flatMap(proof);
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
 // Resumir dos párrafos conserva su separación y todavía exige enseñanza propia.
 const joined=units.find(u=>u.id==='leng_res_unir');
 for(const a of joined.actividades){assert.equal(a.visual.texto.split('\n\n').length,2);checks++;}
 const beforeJoin=units.filter(u=>u.id!=='leng_res_unir'&&u.id!=='leng_res_revisar').flatMap(proof);
 const joinDb=h.db({sesiones:beforeJoin});const joinLesson=await h.start(joinDb,{tema:joined.tema,forzar_practica:false});assert.equal(joinLesson.output.tipo,'leccion');assert.equal(joinDb.tables.sesiones.at(-1).ia_parametros_usados.objetivo_id,joined.id);checks++;
 console.log(JSON.stringify({passed:checks,newUnits:6,newActivities:36,readingUnits:units.filter(u=>u.tema==='comprension_lectora_literal_inferida').length,closureQuestions:3,realAI:false,realDatabase:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
