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
 if(p==='src/lib/acceso-temas.js')deps={...load('src/lib/curriculum.js',['CURRICULUM_MATEMATICA','CURRICULUM_LENGUA','PRERREQUISITOS']),...load('src/lib/metadatos-bases.js',['TEMAS_BASES']),...load('src/lib/planes.js',['TRIAL_TOPICS']),...deps};
 if(['src/pages/api/sesion/init.js','src/pages/api/progreso.js'].includes(p))deps={...load('src/lib/acceso-temas.js',['accesoTema','temasHabilitados']),...load('src/lib/metadatos-bases.js',['TEMAS_BASES_MATEMATICA']),...deps};

 if(p==='src/lib/registro-envios.js')deps={createHash:crypto.createHash,randomUUID:crypto.randomUUID,...deps};
 if(['src/pages/api/sesion/respuesta.js','src/pages/api/sesion/ayuda.js'].includes(p))deps={...load('src/lib/registro-envios.js',['iniciarEnvio','guardarPasoEnvio','completarEnvio','liberarEnvio','registrarAyuda']),...deps};
 if (p==='src/lib/apuntes-bases.js')deps={...load('src/lib/metadatos-bases.js',['VERSION_BASES']),...deps};
 if (p==='src/lib/diapositivas.js')deps={...load('src/lib/apuntes-bases.js',['getFichaBase']),...deps};
 if (['src/lib/objetivos-pedagogicos.js','src/pages/api/sesion/init.js','src/pages/api/sesion/respuesta.js'].includes(p))deps={...load('src/lib/contenido-bases.js',['UNIDADES_BASES','TEMAS_BASES','VERSION_BASES','getUnidadBase','crearActividadBase','evaluarActividadBase','getCierreLengua']),...deps};
 if(p==='src/lib/diapositivas.js')deps={...load('src/lib/contenido-h.js',['FICHA_H']),...deps};
 if(p==='src/pages/api/sesion/init.js')deps={...load('src/lib/contenido-h.js',['getLeccionH']),...deps};
  const s=source(p).replace(/^import[\s\S]*?from\s+["'][^"']+["'];\s*/gm,'').replace(/export default /g,'').replace(/export /g,'');
  const ctx=vm.createContext({process:{env:{NODE_ENV:'production'}},console, Buffer, ...deps});
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
async function check(name,fn){try{await fn();results.push({name,ok:true})}catch(e){results.push({name,ok:false,error:e.message})}}
(async()=>{
 const exams=load('src/lib/examenes-monserrat.js',['getExamenFinal','evaluarExamenFinal','esRespuestaAceptable','EXAMENES_FINALES']);
 const accepted=(value,expected,extra={})=>exams.esRespuestaAceptable(value,{respuesta_correcta:expected,...extra});
 await check('Figuras distintas no coinciden',()=>assert.equal(accepted('▲','cuadrado',{alternativas_aceptables:['■']}),false));
 await check('Operadores no se borran',()=>assert.equal(accepted('43622','4 + 3 × (6 − 2) : 2'),false));
 await check('Operadores equivalentes conservan estructura',()=>assert.equal(accepted('4+3*(6-2)/2','4 + 3 × (6 − 2) : 2'),true));
 await check('Tildes significativas se preservan',()=>assert.equal(accepted('el','él'),false));
 await check('Coma y punto decimal',()=>assert.equal(accepted('0,5','0.5'),true));
 await check('Equivalencia exacta de fracciones',()=>{assert(accepted('4/6','2/3'));assert(accepted('0,5','1/2'));assert.equal(accepted('10001/10000','1/1'),false)});
 await check('Cero, negativos y división por cero',()=>{assert(accepted(0,0));assert.equal(accepted('-4','4'),false);assert.equal(accepted('1/0','1'),false)});
 await check('Miles explícitos sin aceptar sesenta por sesenta mil',()=>{assert(accepted('60.000','60000',{alternativas_aceptables:['60.000']}));assert.equal(accepted('60','60000',{alternativas_aceptables:['60.000']}),false)});
 await check('Ninguna aprobación sin examen',()=>assert.throws(()=>exams.evaluarExamenFinal(null,'x')));
 await check('B/V tiene respuestas individuales y admite letra',()=>{const e=exams.getExamenFinal('ortografia_b_v',1);assert.equal(e.preguntas.length,8);const respuestas=Object.fromEntries(e.preguntas.map(p=>[p.id,p.alternativas_aceptables[0]]));assert.equal(exams.evaluarExamenFinal(e,respuestas).es_correcta,true)});
 await check('B/V no acepta palabras concatenadas en legado',()=>{const e=exams.EXAMENES_FINALES.ortografia_b_v.capa_1_2;assert.equal(exams.evaluarExamenFinal(e,e.respuestas_correctas.join('')).es_correcta,false)});
 await check('Todas las claves de exámenes locales son aceptadas',()=>{for(const tema of Object.keys(exams.EXAMENES_FINALES))for(const capa of [1,3,5]){const e=exams.getExamenFinal(tema,capa);for(const p of e.preguntas||[])assert(exams.esRespuestaAceptable(p.respuesta_correcta,p),tema+':'+p.id)}});
 await check('Visualizaciones fieles o ausentes',()=>{const v=load('src/lib/visualizaciones-seguras.js',['visualizacionSegura']).visualizacionSegura;assert.equal(v('tablas_multiplicar_6_8','7 × 6').datos.numero,7);assert.equal(v('division_1_digito','Repartí 56 caramelos entre 8 amigos.').datos.grupos,8);assert.equal(v('si_me_la_masa_capacidad_tiempo','Dos horas'),null);assert.equal(v('fracciones_concepto','Una de tres partes'),null)});
 await check('Datos inválidos de IA no aprueban',()=>{const v=load('src/lib/validacion-pedagogica.js',['validarEvaluacion']).validarEvaluacion;assert.throws(()=>v({es_correcta:'false',retroalimentacion:'x'}));assert.throws(()=>v({es_correcta:false,retroalimentacion:'x'}));assert.equal(v({es_correcta:true,retroalimentacion:'Bien'}).es_correcta,true)});
 await check('Ayuda persistente aunque el cliente envíe false',()=>{const v=load('src/lib/validacion-pedagogica.js',['huboAyuda']).huboAyuda;assert(v({ia_parametros_usados:{ayuda_utilizada:true}},false));assert(v({es_correcta:false},false));assert.equal(v({es_correcta:null,ia_parametros_usados:{}},false),false)});
 await check('Clave de examen no se envía al navegador',()=>{const v=load('src/lib/contrato-actividad.js',['quitarClaves']).quitarClaves;const e=v({preguntas:[{id:'a',texto:'Pregunta',respuesta_correcta:'secreto',alternativas_aceptables:['otra']}],respuestas_correctas:['secret']});assert.equal(JSON.stringify(e).includes('secret'),false);assert.equal(e.preguntas[0].texto,'Pregunta')});
 await check('Identidad real firmada rechaza otra cuenta antes de IA o escritura',async()=>{
 const access=load('src/lib/access.js',['requireAccess','requireOwnership','hasAccess','setAccessCookie'],{crypto,process:{env:{MONSE_AUTH_SECRET:'test-secret-only',MONSE_LOGIN_PASSWORD:'test-only',NODE_ENV:'production'}}});
 let cookies;access.setAccessCookie({setHeader(_,v){cookies=v}},'student','student-a');
 const database=db({sesiones:[{id:'foreign-session',user_id:'student-b'}]});let ia=0,status;
 const h=load('src/pages/api/sesion/respuesta.js',['handler'],{...access,requireMethod:()=>true,getSupabaseAdmin:()=>database,assertSupabaseOk:r=>r.data,checkDailyRateLimit:async()=>({ok:true}),callOpenRouter:async()=>{ia++;return '{}'}});
 await h.handler({headers:{cookie:cookies.map(c=>c.split(';')[0]).join('; ')},body:{sesion_id:'foreign-session',user_id:'student-b',respuesta_usuario:'x'}},{status(v){status=v;return this},json(){}});
 assert.equal(status,403);assert.equal(database.writes.length,0);assert.equal(ia,0);
 });

 await check('API: devolución inválida no escribe calificaciones',async()=>{
  const database=db({sesiones:[{id:'local',user_id:'student-a',tema:'fracciones_concepto',es_correcta:null,tipo_pregunta:'multiple'}]});
  const validation=load('src/lib/validacion-pedagogica.js',['validarEvaluacion','huboAyuda']);let status;
  const h=load('src/pages/api/sesion/respuesta.js',['handler'],{...validation,requireMethod:()=>true,requireAccess:()=>true,requireOwnership:()=>true,getSupabaseAdmin:()=>database,assertSupabaseOk:r=>r.data,checkDailyRateLimit:async()=>({ok:true}),loadUser:async()=>({data:{nombre:'Prueba'}}),buildAlumnoProfile:u=>u,buildPromptMonse:()=>'',MODEL_TUTOR:'mock',callOpenRouter:async()=>JSON.stringify({es_correcta:'false',retroalimentacion:'x'}),parseJsonFromModel:JSON.parse,console:{error(){}}});
  await h.handler({body:{sesion_id:'local',respuesta_usuario:'mi texto'}},{status(v){status=v;return this},json(){}});
  assert.equal(status,502);assert(database.writes.every(w=>!Object.hasOwn(w.payload,'es_correcta')));assert.equal(database.tables.sesiones[0].es_correcta,null);
 });
 await check('API: abrir ayuda y luego acertar conserva asistencia en servidor',async()=>{
  const database=db({sesiones:[{id:'local',user_id:'student-a',tema:'fracciones_concepto',capa:1,es_correcta:null,tipo_pregunta:'multiple',ia_parametros_usados:{objetivo_id:'partes'}}]});
  const common={requireMethod:()=>true,requireAccess:()=>true,requireOwnership:()=>true,getSupabaseAdmin:()=>database,assertSupabaseOk:r=>r.data};let status,output;
  const response={status(v){status=v;return this},json(v){output=v}};
  const help=load('src/pages/api/sesion/ayuda.js',['handler'],common);
  await help.handler({body:{sesion_id:'local'}},response);assert.equal(status,200);assert.equal(database.tables.sesiones[0].ia_parametros_usados.objetivo_id,'partes');
  const validation=load('src/lib/validacion-pedagogica.js',['validarEvaluacion','huboAyuda']);
  const h=load('src/pages/api/sesion/respuesta.js',['handler'],{...common,...validation,checkDailyRateLimit:async()=>({ok:true}),loadUser:async()=>({data:{nombre:'Prueba'}}),buildAlumnoProfile:u=>u,buildPromptMonse:()=>'',MODEL_TUTOR:'mock',callOpenRouter:async()=>JSON.stringify({es_correcta:true,retroalimentacion:'Lo resolviste'}),parseJsonFromModel:JSON.parse,refreshTopicProgress:async()=>({}),esElegibleParaExamenFinal:()=>true,maybeCreateAlert:async()=>null});
  await h.handler({body:{sesion_id:'local',respuesta_usuario:'1/2',resuelto_con_ayuda:false}},response);
  assert.equal(status,200);assert.equal(output.es_correcta,true);assert.equal(output.dominio.practicas_correctas,0);assert.equal(database.tables.sesiones[0].ia_parametros_usados.resuelto_con_ayuda,true);
 });
 console.log(JSON.stringify({passed:results.filter(r=>r.ok).length,total:results.length,results},null,2));
 if(results.some(r=>!r.ok))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
