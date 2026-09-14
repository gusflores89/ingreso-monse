const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict');
const f=path.join(__dirname,'verify-r2.cjs'),m=new Module(f,module);m.filename=f;m.paths=module.paths;m._compile(fs.readFileSync(f,'utf8').split('\n(async()=>{')[0]+'\nmodule.exports={load,db,start,answer,user,objectives,exams,curriculum};',f);const h=m.exports;
const {UNIDADES_BASES:units,VERSION_BASES:version,getCierreBase,esCierreActual}=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','getCierreBase','esCierreActual']);
const expected={"prof_fig_vertices": ["C", "R", "F", "N", "T", "Z"], "prof_fig_angulos": ["Acutángulo", "Rectángulo", "Obtusángulo", "Acutángulo", "Obtusángulo", "Rectángulo"], "prof_fig_existencia": ["Sí", "No", "No", "Sí", "Sí", "No"], "prof_fig_poligonos": ["Pentágono", "Triángulo", "Hexágono", "Cuadrilátero", "Octógono", "Heptágono"], "prof_fig_diagonales": ["2", "1", "3", "4", "5", "0"], "prof_fig_per_tri": ["12", "14", "15", "18", "24", "18"], "prof_fig_per_regular": ["15", "16", "12", "15", "24", "14"], "prof_fig_borde_l": ["20", "26", "26", "28", "28", "34"], "prof_fig_area_unidad": ["6", "12", "10", "9", "8", "15"], "prof_fig_area_rect": ["12", "12", "20", "16", "21", "30"], "prof_fig_area_tri": ["12", "6", "12", "15", "20", "24"], "prof_fig_area_l": ["18", "28", "26", "35", "36", "46"]};
const prereqs=h.curriculum.CURRICULUM_MATEMATICA.filter(t=>!["geometria_triangulos", "geometria_cuadrilateros_circunferencia", "perimetros_simples", "perimetros_compuestos"].includes(t.tema)).map((t,i)=>({id:'approved-'+i,user_id:h.user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true,created_at:'2026-09-01',ia_parametros_usados:{}}));
function proof(u){return [0,1,2].map(n=>({id:u.id+n,user_id:h.user.id,tema:u.tema,tipo_pregunta:n?'multiple':'leccion',es_correcta:true,created_at:'2026-09-11T12:00:00Z',ia_parametros_usados:{objetivo_id:u.id,contenido_version:version,actividad_id:u.actividades[n].id}}));}
function oldExam(tema,correct=true){return {id:'old-exam',user_id:h.user.id,tema,tipo_pregunta:'examen_final',es_correcta:correct,created_at:'2026-09-12T12:00:00Z',ia_parametros_usados:{contenido_version:version},contexto_json:{examen_final:{...getCierreBase(tema),revision_cierre:undefined,preguntas:[{id:'1',texto:'Cierre anterior',respuesta_correcta:'Sí',opciones:['Sí','No']}],min_correctas:1}}};}
(async()=>{let checks=0;assert.equal(units.filter(u=>u.id.startsWith('prof_fig_')).length,12);
 for(const u of units.filter(u=>Object.hasOwn(expected,u.id))){assert.deepEqual(Array.from(u.actividades,a=>a.respuesta_correcta),expected[u.id],u.id);checks+=6;}
 for(const tema of ["geometria_triangulos", "geometria_cuadrilateros_circunferencia", "perimetros_simples", "perimetros_compuestos"]){
 const prereqs=h.curriculum.CURRICULUM_MATEMATICA.filter(t=>t.tema!==tema).map((t,i)=>({id:'req'+i,user_id:h.user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true,ia_parametros_usados:{}}));
  const closure=getCierreBase(tema);assert.equal(closure.preguntas.length,3);assert.equal(closure.min_correctas,2);assert.equal(closure.tiempo_estimado,3);assert(esCierreActual(closure,tema));assert.equal(esCierreActual(oldExam(tema).contexto_json.examen_final,tema),false);checks++;
  // Un cierre anterior aprobado no salta las unidades nuevas; sus datos siguen intactos.
  const history=units.filter(u=>!u.id.startsWith('prof_fig_')).flatMap(proof),old=oldExam(tema),database=h.db({sesiones:[...prereqs,...history,old]});
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
 const u=units.find(u=>u.id==='prof_fig_vertices'),history=units.filter(x=>x.tema===u.tema&&!x.id.startsWith('prof_fig_')).flatMap(proof);
 const noLesson=[...history,...proof(u).slice(1)];assert.equal(h.objectives.determinarProximoObjetivo(u.tema,noLesson).requiereExplicacion,true);checks++;
 const {crearDiagramaGeometria:diagram}=h.load('src/lib/diagrama-geometria.js',['crearDiagramaGeometria']);
 for(const unit of units.filter(u=>u.id.startsWith('prof_fig_'))){
  for(const a of unit.actividades){
   assert(a.visual);const shape=diagram(a.visual);assert(shape.trazos.length>=1);
   for(const stroke of shape.trazos)for(const p of stroke.puntos){assert(p.every(Number.isFinite));assert(p[0]>=0&&p[0]<=480&&p[1]>=0&&p[1]<=310,unit.id);}
   checks++;
  }
 }
 // Las figuras de área conservan las medidas y su superficie geométrica real.
 for(const u of units.filter(u=>u.id.startsWith('prof_fig_area_')))for(const a of u.actividades){
  const p=a.visual.puntos,area=Math.abs(p.reduce((sum,v,i)=>sum+v[0]*p[(i+1)%p.length][1]-v[1]*p[(i+1)%p.length][0],0))/2;
  assert.equal(area,Number(a.respuesta_correcta),a.id);checks++;
 }
 // El contorno de la L coincide con la suma de las longitudes reales de sus seis lados.
 for(const a of units.find(u=>u.id==='prof_fig_borde_l').actividades){
  const p=a.visual.puntos,length=p.reduce((sum,v,i)=>sum+Math.hypot(v[0]-p[(i+1)%p.length][0],v[1]-p[(i+1)%p.length][1]),0);
  assert.equal(length,Number(a.respuesta_correcta));checks++;
 }
 for(const id of ['mat_tri_lados','mat_tri_angulos','mat_cuad_lados','mat_circ_radio','mat_per_rectangulo','mat_per_circunferencia','mat_per_union','mat_per_faltante']){
  assert(diagram(units.find(u=>u.id===id).visual)?.trazos.length>0,id);checks++;
 }
 console.log(JSON.stringify({passed:checks,newUnits:12,newActivities:72,closureQuestions:3,realAI:false,realDatabase:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
