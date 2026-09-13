const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict');
const f=path.join(__dirname,'verify-r2.cjs'),m=new Module(f,module);m.filename=f;m.paths=module.paths;
m._compile(fs.readFileSync(f,'utf8').split('\n(async()=>{')[0]+'\nmodule.exports={load,db,start,answer,user,objectives,curriculum,exams};',f);
const {load,db,start,answer,user,objectives,curriculum,exams}=m.exports;
const {UNIDADES_BASES:units,VERSION_BASES:version,getCierreBase}=load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','getCierreBase']);
// Claves calculadas aparte y revisadas, sin importar fórmulas del generador.
const expected={
mat_num_decenas:[2,3,4,5,6,7],mat_num_posicion:[50,20,70,80,90,0],mat_num_orden:[418,570,632,804,190,752],mat_num_suma:[42,54,72,83,53,93],mat_num_resta:[25,25,25,25,25,27],
mat_tab_grupos:[12,10,12,20,15,20],mat_tab_dobles:[12,16,20,24,28,32],mat_tab_cinco:[20,15,30,35,40,45],mat_tab_seis_ocho:[40,24,24,42,48,48],mat_tab_siete:[42,21,28,35,49,56],mat_tab_diez:[230,140,3200,700,450,1600],mat_tab_nueve:[54,27,36,45,63,72],
mat_div_repartir:[4,5,6,6,7,8],mat_div_resto:[2,2,4,2,2,2],mat_div_descomponer:[21,23,23,23,24,14],mat_rom_sumar:[16,8,21,60,115,502],mat_rom_restar:[14,19,42,93,405,906],
mat_resto_entero:[16,15,24,12,24,32],mat_resto_nuevo_total:[8,16,12,12,18,24],mat_dec_fraccion:['0,7','0,03','0,5','0,25','0,08','0,42'],mat_dec_sumar:['1,7','3,7','5,4','7,2','7,1','9,2'],mat_dec_restar:['1,7','2,7','2,7','2,9','2,9','3,4'],mat_dec_producto:['1,5','0,8','1,4','1,5','2,4','2,4'],mat_dec_dividir:['0,6','0,6','0,7','0,7','1,2','0,9'],
mat_pot_repetir:[8,9,16,27,25,36],mat_raiz_cuadrado:[5,3,4,6,7,8],mat_jer_producto:[14,23,16,26,18,23],mat_jer_parentesis:[20,35,36,56,30,72],mat_long_metros:[200,300,400,500,600,700],mat_long_combinar:[125,230,345,450,575,620],mat_med_masa_capacidad:[2000,3000,4000,5000,6000,7000],mat_med_tiempo:[80,135,105,190,150,245],
mat_ang_clases:['agudo','recto','obtuso','llano','agudo','obtuso'],mat_ang_complemento:[60,130,65,70,50,45],mat_tri_lados:['isósceles','equilátero','escaleno','isósceles','equilátero','escaleno'],mat_tri_angulos:[70,60,55,50,80,80],mat_cuad_lados:['Sí','No','Sí','Sí','No','No'],mat_circ_radio:[6,8,10,12,14,16],mat_per_rectangulo:[16,20,18,22,26,30],mat_per_circunferencia:['31,40','6,28','12,56','18,84','25,12','62,80'],mat_per_union:[18,24,30,36,42,48],mat_per_faltante:[6,7,9,11,12,15],
mat_graf_leer:['Bruno','Ana','Cami','Bruno','Ana','Cami'],mat_graf_escala:[8,15,12,15,28,40],mat_prop_unidad:[200,150,120,250,100,50],mat_prop_otro_total:[1000,900,360,1000,900,350],mat_sec_salto:[16,18,13,27,27,38],mat_sec_restar:[9,10,16,23,22,28],mat_sec_factor:[16,24,27,32,54,40],mat_sec_fibonacci:[5,8,13,18,19,23],mat_sec_ciclo:['verde','cuadrado','sol','B','grande','dos'],mat_sec_dos_reglas:['D7','D11','D15','D19','D11','D15'],mat_igual_simbolo:[6,4,5,7,8,9],mat_igual_dos:[4,7,3,2,5,6]
};
(async()=>{let checks=0;
 const fresh=units.filter(u=>u.id.startsWith('mat_'));assert.equal(fresh.length,54);assert.equal(Object.keys(expected).length,fresh.length);
 for(const u of fresh){assert.deepEqual(Array.from(u.actividades,a=>a.respuesta_correcta),expected[u.id].map(String),u.id);checks+=6;}
 for(const t of curriculum.CURRICULUM_MATEMATICA){
  const sequence=objectives.getObjetivosParaTema(t.tema);assert(sequence.every(o=>units.some(u=>u.id===o.id)),t.tema+' has no AI gap');
  const closure=getCierreBase(t.tema);assert(closure);assert(closure.preguntas.every(q=>sequence.some(o=>o.id===q.objetivo_id)));
  assert.equal(closure.min_correctas,Math.ceil(closure.preguntas.length*2/3));
  const answers=Object.fromEntries(closure.preguntas.map(q=>[q.id,q.respuesta_correcta]));assert.equal(exams.evaluarExamenFinal(closure,answers).es_correcta,true);
  checks++;
 }
 for(const tema of new Set(fresh.map(u=>u.tema))){
  // Prerrequisitos sintéticos aprobados; no es una migración de la alumna.
  const seed=curriculum.CURRICULUM_MATEMATICA.filter(t=>t.tema!==tema).map((t,i)=>({id:'approved'+i,user_id:user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true,created_at:'2026-09-01',ia_parametros_usados:{}}));
  const d=db({sesiones:seed,lecciones_completadas:[]});
  for(const u of fresh.filter(u=>u.tema===tema)){
   const first=await start(d,{tema,rendir_examen:true,forzar_practica:false});assert.equal(first.output.tipo,'leccion');assert.equal(first.calls.length,0);assert.equal(first.output.ejercicio_practica.enunciado,u.actividades[0].enunciado);
   assert.equal(first.output.ejercicio_practica.respuesta_correcta,undefined);
   await answer(d,first.output.sesion_id,{respuesta_usuario:u.actividades[0].respuesta_correcta});
   assert.equal(objectives.determinarProximoObjetivo(tema,d.tables.sesiones).aciertosIndependientes,0,'Lesson is assisted');
   for(let i=1;i<=2;i++){
    const practice=await start(d,{tema});assert.equal(practice.calls.length,0);assert.equal(practice.output.pregunta,u.actividades[i].enunciado);
    const row=d.tables.sesiones.find(r=>r.id===practice.output.sesion_id);assert.equal(row.ia_parametros_usados.objetivo_id,u.id);
    await answer(d,practice.output.sesion_id,{respuesta_usuario:u.actividades[i].respuesta_correcta});
   }
   checks++;
  }
  assert.equal(objectives.determinarProximoObjetivo(tema,d.tables.sesiones).temaCompletado,true);
  const closure=await start(d,{tema,rendir_examen:true,forzar_practica:false});assert.equal(closure.output.tipo,'examen_final',tema);assert.equal(closure.calls.length,0);
  assert(closure.output.preguntas.every(q=>q.respuesta_correcta===undefined));checks++;
 }
 // Clases nuevas no acreditan automáticamente conocimientos antiguos ni habilitan todo el mapa.
 const access=load('src/lib/acceso-temas.js',['accesoTema']);assert.equal(access.accesoTema('perimetros_compuestos').habilitado,false);checks++;
 const old=[{tema:'division_1_digito',tipo_pregunta:'practica',es_correcta:true,ia_parametros_usados:{objetivo_id:'div_1_reparto_equitativo'}}];assert.equal(objectives.determinarProximoObjetivo('division_1_digito',old).requiereExplicacion,true);checks++;
 console.log(JSON.stringify({passed:checks,newUnits:fresh.length,newActivities:324,mathTopics:26,realAI:false,realDatabase:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
