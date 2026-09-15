const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const hashes = {};
function source(p) { const s=read(p); hashes[p]=crypto.createHash('sha256').update(s).digest('hex'); return s; }
function load(p, names, deps={}) {
 if(p==='src/lib/recorrido-familiar.js')deps={createHash:crypto.createHash,...load('src/lib/contenido-bases.js',['getEscrituraBase']),...deps};
 if(p==='src/pages/api/familia/recorrido.js')deps={...load('src/lib/contenido-bases.js',['UNIDADES_BASES']),...deps};
 if(p==='src/pages/api/sesion/respuesta.js')deps={...load('src/lib/evaluacion-escritura.js',['evaluarEscritura']),...deps};
 if(p==='src/lib/acceso-temas.js')deps={...load('src/lib/curriculum.js',['CURRICULUM_MATEMATICA','CURRICULUM_LENGUA','PRERREQUISITOS']),...load('src/lib/metadatos-bases.js',['TEMAS_BASES']),...load('src/lib/planes.js',['TRIAL_TOPICS']),...deps};
 if(['src/pages/api/sesion/init.js','src/pages/api/progreso.js'].includes(p))deps={...load('src/lib/acceso-temas.js',['accesoTema','temasHabilitados']),...load('src/lib/metadatos-bases.js',['TEMAS_BASES_MATEMATICA']),...deps};

 if(p==='src/lib/registro-envios.js')deps={createHash:crypto.createHash,randomUUID:crypto.randomUUID,...deps};
 if(['src/pages/api/sesion/respuesta.js','src/pages/api/sesion/ayuda.js'].includes(p))deps={...load('src/lib/registro-envios.js',['iniciarEnvio','guardarPasoEnvio','completarEnvio','liberarEnvio','registrarAyuda']),...deps};
 if (p==='src/lib/apuntes-bases.js')deps={...load('src/lib/metadatos-bases.js',['VERSION_BASES']),...deps};
 if (p==='src/lib/diapositivas.js')deps={...load('src/lib/apuntes-bases.js',['getFichaBase']),...deps};
 if (['src/lib/objetivos-pedagogicos.js','src/pages/api/sesion/init.js','src/pages/api/sesion/respuesta.js'].includes(p))deps={...load('src/lib/contenido-bases.js',['UNIDADES_BASES','TEMAS_BASES','VERSION_BASES','getUnidadBase','crearActividadBase','evaluarActividadBase','getEscrituraBase','getCierreLengua','getCierreBase','esCierreActual']),...deps};
 if(p==='src/pages/api/sesion/init.js')deps={...load('src/lib/contrato-actividad.js',['quitarClaves']),...deps};
 if(p==='src/pages/api/sesion/respuesta.js')deps={...load('src/lib/validacion-pedagogica.js',['validarEvaluacion','huboAyuda']),requireOwnership:()=>true,...deps};
 if(p==='src/lib/diapositivas.js')deps={...load('src/lib/contenido-h.js',['FICHA_H']),...deps};
 if(p==='src/pages/api/sesion/init.js')deps={...load('src/lib/contenido-h.js',['getLeccionH']),...deps};
  const s=source(p).replace(/^import[\s\S]*?from\s+["'][^"']+["'];\s*/gm,'').replace(/export default /g,'').replace(/export /g,'');
  const ctx=vm.createContext({process:{env:{NODE_ENV:'production'}},console, ...deps});
  vm.runInContext(s+'\n;globalThis.exposed={'+names.join(',')+'};',ctx,{filename:p});
  return ctx.exposed;
}
function db(initial={}) {
 const tables=structuredClone(initial); const writes=[];
 return {tables,writes,from(table){
  tables[table]??=[]; let filters=[],sort=null,offset=0,n=Infinity,op=null,payload=null,conflict=null;
  const q={
   select(){return q},eq(k,v){filters.push(r=>(k.includes('->>') ? (r[k.split('->>')[0]]?.[k.split('->>')[1]] == null ? null : String(r[k.split('->>')[0]][k.split('->>')[1]])) : r[k])===v);return q},neq(k,v){filters.push(r=>r[k]!==v);return q},
   not(k,op,v){assert.equal(op,'is');filters.push(r=>(k.includes('->') ? r[k.split('->')[0]]?.[k.split('->')[1]] ?? null : r[k])!==v);return q},is(k,v){filters.push(r=>(k.includes('->>') ? (r[k.split('->>')[0]]?.[k.split('->>')[1]] == null ? null : String(r[k.split('->>')[0]][k.split('->>')[1]])) : r[k])===v);return q},
   in(k,vs){filters.push(r=>vs.includes(k.includes('->>') ? String(r[k.split('->>')[0]]?.[k.split('->>')[1]]) : r[k]));return q},order(k,{ascending}){sort={k,ascending};return q},limit(v){n=v;return q},range(a,b){offset=a;n=b-a+1;return q},
   update(v){op='update';payload=v;return q},insert(v){op='insert';payload=v;return q},
   upsert(v,opts={}){op='upsert';payload=v;conflict=opts.onConflict;return q},
   single(){return execute(true)},maybeSingle(){return execute(true)},then(a,b){return execute(false).then(a,b)}
  };
  async function execute(single){
   let rows=tables[table].filter(r=>filters.every(f=>f(r)));
   if(sort)rows.sort((a,b)=>String(a[sort.k]).localeCompare(String(b[sort.k]))*(sort.ascending?1:-1));
   rows=rows.slice(offset,offset+n);
   if(op==='update'){for(const row of rows)Object.assign(row,structuredClone(payload));}
   if(op==='insert'){const row={id:'new-'+(tables[table].length+1),es_correcta:null,created_at:'2026-09-10T15:00:00Z',...structuredClone(payload)};tables[table].push(row);rows=[row];}
   if(op==='upsert'){
    const keys=(conflict||'id').split(','); let row=tables[table].find(r=>keys.every(k=>r[k]===payload[k]));
    if(row)Object.assign(row,structuredClone(payload));else {row=structuredClone(payload);tables[table].push(row)}rows=[row];
   }
   if(op)writes.push({table,op,payload:structuredClone(payload)});
   return {data:structuredClone(single?(rows[0]||null):rows),error:null};
  }return q;
 }};
}
const results=[];
function record(name,observed){results.push({name,observed});}
const curriculum=load('src/lib/curriculum.js',['CURRICULUM_MATEMATICA','CURRICULUM_LENGUA','PRERREQUISITOS','getTopicMeta','getProximoTemaAlternando','getProximoTemaNoCompletado']);
const all=[...curriculum.CURRICULUM_MATEMATICA,...curriculum.CURRICULUM_LENGUA];
const exams=load('src/lib/examenes-monserrat.js',['EXAMENES_FINALES','getExamenFinal','evaluarExamenFinal']);
const slides=load('src/lib/diapositivas.js',['DIAPOSITIVAS_CATALOG','getDiapositivasParaTema']);
const cases=load('src/lib/casos-resueltos.js',['CASOS_RESUELTOS','getCasoResuelto']);
const tasks=load('src/lib/ejercicios-manuscritos.js',['EJERCICIOS_MANUSCRITOS']);
const prompts=load('src/lib/prompts.js',['buildPromptMonse','buildPromptPractice','buildPromptTeacher']);
const alumno=load('src/lib/alumno.js',['buildAlumnoProfile']);
const ok=r=>{if(r.error)throw Error(r.error.message);return r.data};
const objectives=load('src/lib/objetivos-pedagogicos.js',['OBJETIVOS_POR_TEMA','getObjetivosParaTema','determinarProximoObjetivo','esElegibleParaExamenFinal']);
const progress=load('src/lib/progress.js',['refreshTopicProgress'],{assertSupabaseOk:ok});
const init=load('src/pages/api/sesion/init.js',['getUnlockedTopics','calcularCapaInicial','maybeCrearExamenFinal'],{...curriculum,...exams,...objectives,assertSupabaseOk:ok,TRIAL_TOPICS:['numeros_naturales_sistema_decimal','tablas_multiplicar_2_5','ortografia_b_v','comprension_lectora_literal_inferida']});
const ui=source('src/components/PantallaSessionTutoria.jsx');
const visual=vm.createContext({});
vm.runInContext(ui.slice(ui.indexOf('function visualizacionParaTema('),ui.indexOf('function ExamenFinal(')),visual);
const user={id:'audit-synthetic',nombre:'Alumna de prueba',edad:11,grado:'6to',nivel_inicial:'recien_empieza',rasgos_especiales:{modo_paciente:true}};
const row=(i,extra={})=>({id:'s'+i,user_id:user.id,tema:'fracciones_concepto',capa:2,tipo_pregunta:'practica',pregunta_generada:'Identifica un medio',created_at:`2026-09-0${i}T12:00:00Z`,es_correcta:true,ia_parametros_usados:{},...extra});
async function answer(database,sessionId,extra={},evaluation={es_correcta:false,retroalimentacion:'Probemos con una representación.',pista_concreta:'Contá partes iguales.',paso_resuelto:'El entero tiene dos partes iguales.'}){
 const mod=load('src/pages/api/sesion/respuesta.js',['handler'],{
  ...curriculum,...exams,...objectives,...prompts,...alumno,...progress,
  requireMethod:()=>true,requireAccess:()=>true,hasAccess:()=>true,checkDailyRateLimit:async()=>({ok:true}),
  getSupabaseAdmin:()=>database,assertSupabaseOk:ok,loadUser:async()=>({data:user,error:null}),
  callOpenRouter:async()=>JSON.stringify(evaluation),parseJsonFromModel:JSON.parse,MODEL_TUTOR:'mock',maybeCreateAlert:async()=>null
 });
 let output,status;
 await mod.handler({body:{sesion_id:sessionId,user_id:user.id,respuesta_usuario:'respuesta sintética',...extra}}, {status(c){status=c;return this},json(v){output=v}});
 assert.equal(status,200);return output;
}
const extraCurr=load('src/lib/curriculum.js',['isCurriculumTopic','DEFAULT_TOPIC']);
async function start(database,body={},aiType="practica") {
 const calls=[];
 const full=load('src/pages/api/sesion/init.js',['handler'],{
  ...curriculum,...extraCurr,...exams,...prompts,...alumno,...objectives,
  requireMethod:()=>true,requireAccess:()=>true,requireOwnership:()=>true,
  getSupabaseAdmin:()=>database,assertSupabaseOk:ok,loadUser:async()=>({data:user,error:null}),
  checkDailyRateLimit:async()=>({ok:true}),daysUntilExam:()=>100,getUserPlan:()=> 'full',getDefaultTopicForPlan:(_,t)=>t,
  getTareaManuscrita:()=>null,getCasoResuelto:()=>null,MODEL_TUTOR:'mock',parseJsonFromModel:JSON.parse,
  callOpenRouter:async(model,system,instruction)=>{calls.push(instruction);return JSON.stringify({pregunta:'Pregunta sintética',tipo:"practica",tipo_pregunta:aiType,ejercicio_practica:{enunciado:'Ejercicio guiado sintético'},explicacion:'Explicación sintética'});}
 });
 let status,output;
 await full.handler({body:{user_id:user.id,tema:'fracciones_concepto',capa:1,omitir_caso_resuelto:true,forzar_practica:true,...body}}, {status(v){status=v;return this},json(v){output=v}});
 assert.equal(status,200,JSON.stringify(output));return {output,calls};
}

(async()=>{
 const bases=load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES']);
 const database=db({sesiones:[],lecciones_completadas:[]});let count=0;
 for(const unidad of bases.UNIDADES_BASES.filter(u=>['fracciones_concepto','divisibilidad_primos_mcm_mcd','fracciones_operaciones'].includes(u.tema))){
  const lesson=await start(database,{tema:'fracciones_concepto'});
  assert.equal(lesson.output.tipo,'leccion',unidad.id);
  const rowLesson=database.tables.sesiones.find(s=>s.id===lesson.output.sesion_id);
  assert.equal(rowLesson.ia_parametros_usados.objetivo_id,unidad.id);
  assert.equal(lesson.calls.length,0);assert(lesson.output.explicacion_simple);
  assert.equal(lesson.output.ejercicio_practica.respuesta_correcta,undefined);
  assert.equal(lesson.output.ejercicio_practica.paso_resuelto,undefined);
  await answer(database,rowLesson.id,{respuesta_usuario:unidad.actividades[0].respuesta_correcta});
  const ids=new Set();
  for(let i=0;i<2;i++){
   const practice=await start(database,{tema:'fracciones_concepto'});
   assert.equal(practice.output.tipo,'practica',unidad.id);assert.equal(practice.calls.length,0);
   const rowPractice=database.tables.sesiones.find(s=>s.id===practice.output.sesion_id);
   const actividad=unidad.actividades.find(a=>a.id===rowPractice.ia_parametros_usados.actividad_id);ids.add(actividad.id);
   const out=await answer(database,rowPractice.id,{respuesta_usuario:actividad.respuesta_correcta});assert.equal(out.es_correcta,true);
  }
  assert.equal(ids.size,2);count++;console.log('Recorrido completo:',unidad.id);
 }
 const first=bases.UNIDADES_BASES[0];
 const history=structuredClone(database.tables.sesiones);
 for(let i=0;i<5;i++)history.push({id:'error-'+i,tema:first.tema,tipo_pregunta:'multiple',es_correcta:false,created_at:'2099-01-01T10:00:00Z',ia_parametros_usados:{objetivo_id:first.id,contenido_version:bases.VERSION_BASES}});
 const state=objectives.determinarProximoObjetivo(first.tema,history);assert.equal(state.objetivoActual.id,first.id);assert.equal(state.requiereExplicacion,true);
 console.log('Dificultades recientes reabren la primera explicación');count++;
 const a=load('src/lib/continuidad-mision.js',['puedeRetomarMision']).puedeRetomarMision;
 const saved={user_id:'p',fecha:'2026-01-01',tema:'fracciones_concepto',pregunta:{},sesionId:'s',desafios:2};
 assert(a(saved,{usuario:'p',tema:'fracciones_concepto',hoy:'2026-01-02'}));
 assert(a({...saved,solicitud_tema:'fracciones_operaciones'},{usuario:'p',tema:'fracciones_operaciones',hoy:'2026-01-02'}));
 assert.equal(a(saved,{usuario:'p',tema:'ortografia_h',hoy:'2026-01-02'}),false);
 assert.equal(a(saved,{usuario:'p',modo:'REPASO',hoy:'2026-01-02'}),false);
 assert.equal(a(saved,{usuario:'otro',hoy:'2026-01-02'}),false);count++;
 console.log('Continuidad: día siguiente, cambio de tema, repaso y propiedad');
 const unlocked=await init.getUnlockedTopics(db({sesiones:[]}),user.id,'full',user);assert(unlocked.has('fracciones_concepto'));count++;
 const assisted=db({sesiones:[row(1,{ia_parametros_usados:{resuelto_con_ayuda:true}}),row(2,{ia_parametros_usados:{resuelto_con_ayuda:true}}),row(3,{ia_parametros_usados:{resuelto_con_ayuda:true}})]});
 const p=await progress.refreshTopicProgress(assisted,user.id,'fracciones_concepto',1);assert.equal(p.tasa_acierto,100);count++;
 console.log(JSON.stringify({passed:count,activities:count*3-12,realAI:false,realDatabase:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
