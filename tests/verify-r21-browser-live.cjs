// Prueba contra TEST_BASE_URL (local por defecto). Crea y elimina únicamente una cuenta sintética.
// No intercepta API, no usa la cuenta de Abril y corrige sin llamadas a IA.
const assert=require('assert/strict'),crypto=require('crypto'),path=require('path'),fs=require('fs');
require('@next/env').loadEnvConfig(path.resolve(__dirname,'..'),false,{info(){},error(){}});
const {createClient}=require('@supabase/supabase-js');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/gusta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3031';
const out=process.env.TEST_OUTPUT_DIR || 'C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r21';fs.mkdirSync(out,{recursive:true});
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
const userId=crypto.randomUUID(),name='Verificación técnica R21 navegador '+userId,codigo=('R21-'+userId).toUpperCase();
const password=crypto.randomBytes(24).toString('hex'),salt=crypto.randomBytes(16).toString('hex');
const hash='pbkdf2_sha256$120000$'+salt+'$'+crypto.pbkdf2Sync(password,salt,120000,32,'sha256').toString('hex');
const ok=r=>{if(r.error)throw Error(r.error.code+': '+r.error.message);return r.data;};
const report={base,realDatabase:true,realAPI:true,realAI:false,checks:[],errors:[],cleanup:false};
async function state(){return ok(await db.from('continuidad_misiones').select('revision,estado').eq('user_id',userId).single());}
async function until(check){let last;for(let i=0;i<40;i++){try{return await check();}catch(e){last=e;await new Promise(r=>setTimeout(r,500));}}throw last;}
(async()=>{let browser,created=false;try{
 ok(await db.from('usuarios').insert({id:userId,nombre:name,fecha_examen:'2027-01-01',codigo_acceso:codigo,rasgos_especiales:{plan:'full',modo_paciente:true,access_password_hash:hash}}));created=true;
 browser=await chromium.launch({channel:'msedge',headless:true});
 async function open(){
  const ctx=await browser.newContext({viewport:{width:1366,height:900},locale:'es-AR'});
  const login=await ctx.request.post(base+'/api/login-codigo',{data:{codigo,password}});assert.equal(login.status(),200);
  const page=await ctx.newPage();page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto(base+'/tutoria?user_id='+userId+'&tema=fracciones_concepto',{waitUntil:'networkidle'});return page;
 }
 const a=await open();await a.getByRole('button',{name:'Probemos con objetos',exact:true}).click();
 await a.getByRole('button',{name:'Mostrar un paso más',exact:true}).click();await a.getByRole('button',{name:'Ahora lo hago yo',exact:true}).click();
 await a.getByRole('button',{name:'Parte 2',exact:true}).focus();await a.keyboard.press('Space');
 const initial=await until(async()=>{const s=await state();assert.equal(s.estado.pregunta.tipo,'concreta');assert.deepEqual(JSON.parse(s.estado.respuesta).seleccion,[1]);assert(s.estado.actividadAnterior.sesionId);return s;});
 report.checks.push('Construcción con teclado sincronizada con actividad previa conservada');
 const b=await open();assert.equal(await b.getByRole('button',{name:'Parte 2',exact:true}).getAttribute('aria-pressed'),'true');assert.equal((await state()).estado.sesionId,initial.estado.sesionId);report.checks.push('Otro navegador recupera la construcción y el mismo ID');
 // Lose the HTTP response after the real server commits it. Retrying must recover the receipt.
 await b.route('**/api/sesion/concreta',async route=>{if(route.request().postDataJSON()?.accion==='responder'){await route.fetch();await route.abort('failed');await b.unroute('**/api/sesion/concreta');}else await route.continue();});
 await b.getByRole('button',{name:'Comprobar mi construcción',exact:true}).click();await b.getByRole('alert').filter({hasText:/cortó la conexión/}).waitFor();
 await b.reload({waitUntil:'networkidle'});await b.getByRole('button',{name:'Comprobar mi construcción',exact:true}).click();await b.getByRole('button',{name:'Siguiente reto',exact:true}).waitFor();
 const saved=await until(async()=>{const s=await state();assert.equal(s.estado.desafios,1);assert.equal(s.estado.estrellas,2);return s;});
 const graded=ok(await db.from('sesiones').select('*').eq('id',saved.estado.sesionId).single());assert.equal(graded.es_correcta,null);assert.equal(graded.ia_parametros_usados.concreto_resultado.completado,true);assert.equal(graded.ia_parametros_usados.concreto_resultado.independiente,false);
 assert.equal(graded.ia_parametros_usados.eventos_pedagogicos.filter(e=>e.tipo==='respuesta' && e.estado==='completado').length,1);report.checks.push('Respuesta HTTP perdida: recarga y reenvío recuperan un único resultado y dos estrellas');
 await b.getByRole('button',{name:'Volver a mi actividad anterior',exact:true}).click();await b.getByRole('button',{name:'Probemos con objetos',exact:true}).waitFor();
 const returned=await until(async()=>{const s=await state();assert.equal(s.estado.sesionId,initial.estado.actividadAnterior.sesionId);assert.equal(s.estado.estrellas,2);return s;});
 assert.equal(returned.estado.pregunta.tipo,'leccion');report.checks.push('Volver restaura la actividad previa sin borrar el reto ni las estrellas');
 await b.getByRole('button',{name:/Guardar y salir/}).click();await b.waitForURL(base+'/');report.checks.push('Guardar y salir confirma sincronización');
 assert.deepEqual(report.errors,[]);
}finally{
 if(browser)await browser.close();
 if(created){ok(await db.from('usuarios').delete().eq('id',userId).eq('nombre',name));
  for(const table of ['usuarios','sesiones','continuidad_misiones','lecciones_completadas','progreso'])assert.equal(ok(await db.from(table).select('*').eq(table==='usuarios'?'id':'user_id',userId)).length,0,'Limpieza '+table);report.cleanup=true;}
 fs.writeFileSync(path.join(out,'continuidad-real-r21.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
