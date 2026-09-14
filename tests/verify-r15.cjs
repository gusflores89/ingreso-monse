const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict');
const f=path.join(__dirname,'verify-r2.cjs'),m=new Module(f,module);m.filename=f;m.paths=module.paths;m._compile(fs.readFileSync(f,'utf8').split('\n(async()=>{')[0]+'\nmodule.exports={load,db,start,answer,user,objectives,exams,curriculum};',f);const h=m.exports;
const {UNIDADES_BASES:units,VERSION_BASES:version,getCierreBase,esCierreActual}=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','getCierreBase','esCierreActual']);
const expected={"prof_prob_datos": ["2 m, 3 cortes y 25 cm", "1,5 m, 2 cortes y 30 cm", "3 m, 4 cortes y 40 cm", "2,5 m, 3 cortes y 50 cm", "1,2 m, 4 cortes y 20 cm", "4 m, 5 cortes y 60 cm"], "prof_prob_plan_cortes": ["Convertir → calcular todos los cortes → restar", "Convertir → calcular todos los cortes → restar", "Convertir → calcular todos los cortes → restar", "Convertir → calcular todos los cortes → restar", "Convertir → calcular todos los cortes → restar", "Convertir → calcular todos los cortes → restar"], "prof_prob_cortes": ["125", "90", "140", "100", "40", "100"], "prof_prob_vasos": ["5", "8", "7", "3", "6", "7"], "prof_prob_sobra": ["150", "100", "200", "200", "200", "50"], "prof_prob_porciones": ["1250", "700", "1000", "700", "750", "500"], "prof_prob_plan_per": ["Igualar unidades → sumar cuatro lados → multiplicar vueltas", "Igualar unidades → sumar cuatro lados → multiplicar vueltas", "Igualar unidades → sumar cuatro lados → multiplicar vueltas", "Igualar unidades → sumar cuatro lados → multiplicar vueltas", "Igualar unidades → sumar cuatro lados → multiplicar vueltas", "Igualar unidades → sumar cuatro lados → multiplicar vueltas"], "prof_prob_vueltas": ["15", "7,6", "15", "24", "9", "18"], "prof_prob_rollos": ["3", "4", "7", "3", "4", "6"], "prof_prob_costo": ["80", "70", "84", "120", "120", "108"]};
function proof(u){return [0,1,2].map(n=>({id:u.id+n,user_id:h.user.id,tema:u.tema,tipo_pregunta:n?'multiple':'leccion',es_correcta:true,created_at:'2026-09-11T12:00:00Z',ia_parametros_usados:{objetivo_id:u.id,contenido_version:version,actividad_id:u.actividades[n].id}}));}
function oldExam(tema,correct=true){return {id:'old-exam',user_id:h.user.id,tema,tipo_pregunta:'examen_final',es_correcta:correct,created_at:'2026-09-12T12:00:00Z',ia_parametros_usados:{contenido_version:version},contexto_json:{examen_final:{...getCierreBase(tema),revision_cierre:undefined,preguntas:[{id:'1',texto:'Cierre anterior',respuesta_correcta:'Sí',opciones:['Sí','No']}],min_correctas:1}}};}
(async()=>{let checks=0;assert.equal(units.filter(u=>u.id.startsWith('prof_prob_')).length,10);
 for(const u of units.filter(u=>Object.hasOwn(expected,u.id))){assert.deepEqual(Array.from(u.actividades,a=>a.respuesta_correcta),expected[u.id],u.id);checks+=6;}
 for(const tema of ["si_me_la_longitud", "si_me_la_masa_capacidad_tiempo", "perimetros_simples"]){
 const prereqs=h.curriculum.CURRICULUM_MATEMATICA.filter(t=>t.tema!==tema).map((t,i)=>({id:'req'+i,user_id:h.user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true,ia_parametros_usados:{}}));
  const closure=getCierreBase(tema);assert.equal(closure.preguntas.length,3);assert.equal(closure.min_correctas,2);assert.equal(closure.tiempo_estimado,3);assert(esCierreActual(closure,tema));assert.equal(esCierreActual(oldExam(tema).contexto_json.examen_final,tema),false);checks++;
  // Un cierre anterior aprobado no salta las unidades nuevas; sus datos siguen intactos.
  const history=units.filter(u=>!u.id.startsWith('prof_prob_')).flatMap(proof),old=oldExam(tema),database=h.db({sesiones:[...prereqs,...history,old]});
  const pending=await h.start(database,{tema,rendir_examen:true,forzar_practica:false});assert.equal(pending.output.tipo,'leccion');assert.equal(pending.calls.length,0);
  const row=database.tables.sesiones.at(-1);assert(row.ia_parametros_usados.objetivo_id.startsWith('prof_'));assert.deepEqual(database.tables.sesiones.find(s=>s.id===old.id),old);checks++;
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
 // Incluso dos aciertos nuevos sin explicación no permiten saltar la lección.
 const u=units.find(u=>u.id==='prof_prob_datos'),history=units.filter(x=>x.tema===u.tema&&!x.id.startsWith('prof_prob_')).flatMap(proof);
 const noLesson=[...history,...proof(u).slice(1)];assert.equal(h.objectives.determinarProximoObjetivo(u.tema,noLesson).requiereExplicacion,true);checks++;
 const {crearDiagramaGeometria:diagram}=h.load('src/lib/diagrama-geometria.js',['crearDiagramaGeometria']);
 for(const unit of units.filter(u=>u.id.startsWith('prof_prob_'))){
  for(const a of unit.actividades){
   assert(a.visual);const shape=diagram(a.visual);assert(shape.trazos.length>=1);
   for(const stroke of shape.trazos)for(const p of stroke.puntos){assert(p.every(Number.isFinite));assert(p[0]>=0&&p[0]<=480&&p[1]>=0&&p[1]<=310,unit.id);}
   checks++;
  }
 }
 // Elegir datos o un plan no acredita el problema completo posterior.
 const planning=units.filter(u=>u.id!=='prof_prob_cortes').flatMap(proof),d=h.db({sesiones:[...planning,{id:'plan-prereq',user_id:h.user.id,tema:'numeros_naturales_sistema_decimal',tipo_pregunta:'examen_final',es_correcta:true,ia_parametros_usados:{}}]});
 const intro=await h.start(d,{tema:'si_me_la_longitud',forzar_practica:false});assert.equal(intro.output.tipo,'leccion');assert.equal(d.tables.sesiones.at(-1).ia_parametros_usados.objetivo_id,'prof_prob_cortes');checks++;
 // Vasos: el resto es menor que un vaso; una unidad más ya no alcanza.
 const totals=[1400,1700,2300,1100,2600,1800],sizes=[250,200,300,300,400,250];
 for(let i=0;i<6;i++){
  const q=Number(expected.prof_prob_vasos[i]),r=Number(expected.prof_prob_sobra[i]);
  assert.equal(q*sizes[i]+r,totals[i]);assert(r>=0&&r<sizes[i]);assert((q+1)*sizes[i]>totals[i]);checks++;
 }
 // Compra mínima: alcanza lo comprado, pero un rollo menos no alcanza; incluye divisiones exactas.
 const needs=[14,16,20,10,20,22],rolls=[5,4,3,4,5,4];
 for(let i=0;i<6;i++){
  const q=Number(expected.prof_prob_rollos[i]);assert(q*rolls[i]>=needs[i]);assert((q-1)*rolls[i]<needs[i]);checks++;
 }
 console.log(JSON.stringify({passed:checks,newUnits:10,newActivities:60,closureQuestions:3,realAI:false,realDatabase:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
