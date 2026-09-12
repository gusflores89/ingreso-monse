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
 if(p==='src/lib/registro-envios.js')deps={createHash:crypto.createHash,randomUUID:crypto.randomUUID,...deps};
 if(['src/pages/api/sesion/respuesta.js','src/pages/api/sesion/ayuda.js'].includes(p))deps={...load('src/lib/registro-envios.js',['iniciarEnvio','guardarPasoEnvio','completarEnvio','liberarEnvio','registrarAyuda']),...deps};
 if (p==='src/lib/apuntes-bases.js')deps={...load('src/lib/metadatos-bases.js',['VERSION_BASES']),...deps};
 if (p==='src/lib/diapositivas.js')deps={...load('src/lib/apuntes-bases.js',['getFichaBase']),...deps};
 if (['src/lib/objetivos-pedagogicos.js','src/pages/api/sesion/init.js','src/pages/api/sesion/respuesta.js'].includes(p))deps={...load('src/lib/contenido-bases.js',['TEMAS_BASES','VERSION_BASES','getUnidadBase','crearActividadBase','evaluarActividadBase']),...deps};
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
  tables[table]??=[]; let filters=[],sort=null,n=Infinity,op=null,payload=null,conflict=null;
  const q={
   select(){return q},eq(k,v){filters.push(r=>(k.includes('->>') ? (r[k.split('->>')[0]]?.[k.split('->>')[1]] ?? null) : r[k])===v);return q},neq(k,v){filters.push(r=>r[k]!==v);return q},
   not(k,op,v){assert.equal(op,'is');filters.push(r=>r[k]!==v);return q},is(k,v){filters.push(r=>(k.includes('->>') ? (r[k.split('->>')[0]]?.[k.split('->>')[1]] ?? null) : r[k])===v);return q},
   in(k,vs){filters.push(r=>vs.includes(r[k]));return q},order(k,{ascending}){sort={k,ascending};return q},limit(v){n=v;return q},
   update(v){op='update';payload=v;return q},insert(v){op='insert';payload=v;return q},
   upsert(v,opts={}){op='upsert';payload=v;conflict=opts.onConflict;return q},
   single(){return execute(true)},maybeSingle(){return execute(true)},then(a,b){return execute(false).then(a,b)}
  };
  async function execute(single){
   let rows=tables[table].filter(r=>filters.every(f=>f(r)));
   if(sort)rows.sort((a,b)=>String(a[sort.k]).localeCompare(String(b[sort.k]))*(sort.ascending?1:-1));
   rows=rows.slice(0,n);
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
 const h=load('src/lib/contenido-h.js',['UNIDADES_H','getLeccionH']);
 const tema='ortografia_h';
 const oldLessons={user_id:user.id,tema,leccion_numero:1,completada:true};
 const approved=curriculum.CURRICULUM_LENGUA.filter(t=>t.fase===1&&t.tema!==tema).map((t,i)=>row(i+1,{id:'approved'+i,tema:t.tema,tipo_pregunta:'examen_final'}));
 const history=Array.from({length:19},(_,i)=>row(i+1,{id:'old-exam-'+i,tema,tipo_pregunta:'examen_final',es_correcta:null,ia_parametros_usados:{}}));
 const database=db({sesiones:[...approved,...history],lecciones_completadas:[oldLessons]});
 const first=await start(database,{tema,forzar_practica:false});
 assert.equal(first.output.tipo,'leccion');assert(first.output.explicacion_simple.includes('cohete'));assert.equal(first.calls.length,0);assert.equal(first.output.examen_pendiente,false);
 record('Historial con 19 exámenes antiguos abre enseñanza revisada de H',{tipo:first.output.tipo,explicacion:first.output.explicacion_simple,llamadasIA:first.calls.length,ofreceExamen:first.output.examen_pendiente});
 const currentId=first.output.sesion_id;
 await answer(database,currentId,{}, {es_correcta:true,retroalimentacion:'Bien'});
 const after=await start(database,{tema,modo:'NORMAL',forzar_practica:true});assert.equal(after.output.tipo,'practica');
 record('Después de completar la explicación abre práctica del mismo objetivo',{tipo:after.output.tipo});
 const repaso=await start(database,{tema,modo:'REPASO'});assert.equal(repaso.output.tipo,'leccion');assert(repaso.output.ejemplos_resueltos[0].pasos.length);
 record('REPASO conserva explicación y ejemplo resuelto',{tipo:repaso.output.tipo,pasos:repaso.output.ejemplos_resueltos[0].pasos.length});
 const firstId=h.UNIDADES_H[0].id;
 for(let i=0;i<2;i++)database.tables.sesiones.push(row(i+100,{tema,es_correcta:true,tipo_pregunta:'multiple',ia_parametros_usados:{objetivo_id:firstId,modo_sesion:'practica'}}));
 const second=await start(database,{tema});assert.equal(second.output.tipo,'leccion');assert(second.output.explicacion_simple.includes('Hielo'));
 record('Nueva habilidad de H recibe su propia explicación',{tipo:second.output.tipo,explicacion:second.output.explicacion_simple});
 const deck=slides.getDiapositivasParaTema(tema);assert.equal(deck.slides.length,h.UNIDADES_H.length);assert(deck.apunte_completo.includes('Soluciones'));assert(deck.apunte_completo.includes('cohete'));assert.equal(deck.pdf_url,'/apuntes/ortografia_h.pdf');
 for(const u of h.UNIDADES_H){assert(deck.apunte_completo.includes(u.explicacion));assert.equal(h.getLeccionH(u.id).explicacion_simple,u.explicacion)}
 record('Lecciones, diapositivas y ficha comparten contenido',{unidades:deck.slides.length,pdf:deck.pdf_url});
 const missing=slides.getDiapositivasParaTema('ortografia_g_j');assert.equal(missing.disponible,false);assert.equal(missing.pdf_url,null);assert.equal(missing.slides.length,0);
 record('Tema sin ficha no ofrece un PDF provisional',{disponible:missing.disponible,pdf:missing.pdf_url});
 for(const [key,value] of Object.entries(slides.DIAPOSITIVAS_CATALOG)){assert(fs.existsSync(path.join(root,'public',value.pdf_url)));assert(!value.pdf_url.includes('guia_completa'))}
 record('Todas las fichas del catálogo enlazan a un PDF existente',{fichas:Object.keys(slides.DIAPOSITIVAS_CATALOG).length});
 const t='fracciones_concepto',complete=objectives.getObjetivosParaTema(t).flatMap((o,i)=>[1,2].map(j=>row(i*2+j,{tema:t,tipo_pregunta:'multiple',ia_parametros_usados:{objetivo_id:o.id,modo_sesion:'practica',contenido_version:'bases-2026-09-12-v1',actividad_id:o.id+'-'+j}})));
 const lessonEvidence=objectives.getObjetivosParaTema(t).map((o,i)=>row(i+500,{tema:t,tipo_pregunta:"leccion",ia_parametros_usados:{objetivo_id:o.id,contenido_version:"bases-2026-09-12-v1"}}));
 const examDb=db({sesiones:[...lessonEvidence,...complete]});assert.equal(await init.maybeCrearExamenFinal(examDb,user.id,t,1,'NORMAL',{},{}),null);assert.equal(examDb.writes.length,0);
 const chosen=await init.maybeCrearExamenFinal(examDb,user.id,t,1,'NORMAL',{}, {rendir_examen:true});assert.equal(chosen.tipo,'examen_final');
 record('El examen se crea al elegirlo, no al abrir la sesión',{tipoElegido:chosen.tipo});
 const incomplete=db({sesiones:complete.slice(0,2)});assert.equal(await init.maybeCrearExamenFinal(incomplete,user.id,t,1,'NORMAL',{}, {rendir_examen:true}),null);
 record('Elegir examen no salta las habilidades pendientes',{examenBloqueado:true});
 fs.writeFileSync(path.join(require('os').tmpdir(),'ingreso-monse-pruebas-h.json'),JSON.stringify({metodo:'Controladores y módulos reales con base e IA simuladas; sin cambios a la cuenta',hashes,results},null,2));results.forEach(r=>console.log(r.name+': '+JSON.stringify(r.observed)));
})().catch(e=>{console.error(e);process.exitCode=1});

