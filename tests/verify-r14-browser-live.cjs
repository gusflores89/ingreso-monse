// Prueba explícita contra producción. Crea y elimina únicamente una cuenta sintética.
// No intercepta API, no usa la cuenta de Abril ni requiere llamadas a IA.
const assert=require('assert/strict'),crypto=require('crypto'),path=require('path'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync(path.join(__dirname,'../src/lib/contenido-bases.js'),'utf8').replace(/^export /gm,'');
const content=vm.runInNewContext(source+'; ({UNIDADES_BASES,VERSION_BASES})');
const target=content.UNIDADES_BASES.find(u=>u.id==='prof_fig_vertices');
require('@next/env').loadEnvConfig(path.resolve(__dirname,'..'),false,{info(){},error(){}});
const {createClient}=require('@supabase/supabase-js');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/gusta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.TEST_BASE_URL || 'https://www.ingresomonserrat.online';
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
const userId=crypto.randomUUID(),name='Verificación técnica R14 navegador '+userId,codigo=('R14-'+userId).toUpperCase();
const password=crypto.randomBytes(24).toString('hex'),salt=crypto.randomBytes(16).toString('hex');
const hash='pbkdf2_sha256$120000$'+salt+'$'+crypto.pbkdf2Sync(password,salt,120000,32,'sha256').toString('hex');
const ok=r=>{if(r.error)throw Error(r.error.code+': '+r.error.message);return r.data;};
const report={base,realDatabase:true,realAPI:true,checks:[],errors:[],cleanup:false};
async function state(){return ok(await db.from('continuidad_misiones').select('revision,estado').eq('user_id',userId).single());}
async function until(check){let last;for(let i=0;i<40;i++){try{return await check();}catch(e){last=e;await new Promise(r=>setTimeout(r,500));}}throw last;}
(async()=>{let browser,created=false;try{
 ok(await db.from('usuarios').insert({id:userId,nombre:name,fecha_examen:'2027-01-01',codigo_acceso:codigo,rasgos_especiales:{plan:'full',modo_paciente:true,access_password_hash:hash}}));created=true;
 const earlier=content.UNIDADES_BASES.filter(u=>u.tema==='geometria_triangulos' && content.UNIDADES_BASES.indexOf(u)<content.UNIDADES_BASES.indexOf(target));
 const seeded=earlier.flatMap(u=>[0,1,2].map(n=>({id:crypto.randomUUID(),user_id:userId,tema:u.tema,capa:1,tipo_pregunta:n?'multiple':'leccion',pregunta_generada:n?u.actividades[n].enunciado:u.explicacion,es_correcta:true,created_at:'2026-09-12T12:00:00Z',ia_parametros_usados:{objetivo_id:u.id,contenido_version:content.VERSION_BASES,actividad_id:u.actividades[n].id}})));
 seeded.push({id:crypto.randomUUID(),user_id:userId,tema:'geometria_angulos',capa:1,tipo_pregunta:'examen_final',pregunta_generada:'Prerrequisito técnico sintético',es_correcta:true,created_at:'2026-09-01T12:00:00Z',ia_parametros_usados:{}});
 if(seeded.length)ok(await db.from('sesiones').insert(seeded));

 browser=await chromium.launch({channel:'msedge',headless:true});
 async function open(){
  const ctx=await browser.newContext({viewport:{width:1366,height:900},locale:'es-AR'});
  const login=await ctx.request.post(base+'/api/login-codigo',{data:{codigo,password}});assert.equal(login.status(),200,'Login real');
  const page=await ctx.newPage();page.on('pageerror',e=>report.errors.push(e.message));
  page.on('response',r=>{if(new URL(r.url()).pathname.startsWith('/api/')&&r.status()>=400)report.errors.push(r.status()+' '+new URL(r.url()).pathname);});
  await page.goto(base+'/tutoria?user_id='+userId+'&tema=geometria_triangulos',{waitUntil:'networkidle'});
  return page;
 }
 const a=await open();
 await a.getByText(target.explicacion,{exact:true}).waitFor();
 await a.getByRole('button',{name:'Siguiente →',exact:true}).click();
 await a.getByRole('button',{name:'Siguiente →',exact:true}).click();
 await a.getByRole('group',{name:'Elegí una respuesta'}).getByRole('button',{name:'C',exact:true}).click();
 const initial=await until(async()=>{const s=await state();assert.equal(s.estado.pasoActual,2);assert.equal(s.estado.borrador,'C');return s;});
 await a.getByText('☁️ Avance sincronizado',{exact:true}).waitFor();
 report.checks.push('La web guarda en Supabase el ejercicio, el paso de enseñanza y la opción elegida');
 const b=await open();await b.getByRole('button',{name:'Enviar respuesta',exact:true}).waitFor();
 assert.equal(await b.getByRole('group',{name:'Elegí una respuesta'}).getByRole('button',{name:'C',exact:true}).getAttribute('aria-pressed'),'true');
 assert.equal((await state()).estado.sesionId,initial.estado.sesionId);
 assert.equal(ok(await db.from('sesiones').select('id').eq('user_id',userId)).length,seeded.length+1);
 report.checks.push('Un navegador independiente recupera el mismo ejercicio sin crear otra sesión');
 await b.getByRole('button',{name:'Enviar respuesta',exact:true}).click();
 await b.getByText('¡Lo resolviste!',{exact:false}).first().waitFor();
 await until(async()=>{const s=await state();assert.equal(s.estado.desafios,1);assert.equal(s.estado.estrellas,2);assert.equal(s.estado.evaluacion.es_correcta,true);});
 await b.getByText('☁️ Avance sincronizado',{exact:true}).waitFor();
 const graded=ok(await db.from('sesiones').select('*').eq('id',initial.estado.sesionId).eq('user_id',userId).single());
 assert.equal(graded.ia_parametros_usados.evaluacion.provider,'contenido_revisado');
 assert.equal(graded.ia_parametros_usados.objetivo_id,'prof_fig_vertices');
 report.checks.push('La corrección real usa contenido revisado y sincroniza un reto y dos estrellas');
 await a.reload({waitUntil:'networkidle'});await a.getByText('¡Lo resolviste!',{exact:false}).first().waitFor();
 const restored=await a.evaluate(uid=>JSON.parse(localStorage.getItem('monse_mision_'+uid)),userId);
 assert.equal(restored.estrellas,2);assert.equal(restored.desafios,1);assert.equal(restored.sesionId,initial.estado.sesionId);
 assert.deepEqual(ok(await db.from('sesiones').select('*').eq('id',initial.estado.sesionId).eq('user_id',userId).single()),graded);
 assert.equal(ok(await db.from('sesiones').select('id').eq('user_id',userId)).length,seeded.length+1);
 report.checks.push('Al volver al primer navegador reaparece la evaluación sin otra corrección ni estrellas duplicadas');
 await a.getByRole('button',{name:/Guardar y salir/}).click();await a.waitForURL(base+'/');
 report.checks.push('Guardar y salir confirma el avance y vuelve al inicio');
 assert.deepEqual(report.errors,[]);
}finally{
 if(browser)await browser.close();
 if(created){
  ok(await db.from('usuarios').delete().eq('id',userId).eq('nombre',name));
  for(const table of ['usuarios','sesiones','continuidad_misiones','lecciones_completadas','progreso'])assert.equal(ok(await db.from(table).select('*').eq(table==='usuarios'?'id':'user_id',userId)).length,0,'Limpieza '+table);
  report.cleanup=true;
 }
 console.log(JSON.stringify(report,null,2));
}
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
