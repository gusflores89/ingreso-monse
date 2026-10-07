// Cuenta sintética con limpieza verificada. API y base reales; sin llamadas a IA.
const assert=require('assert/strict'),crypto=require('crypto'),path=require('path'),fs=require('fs');
require('@next/env').loadEnvConfig(path.resolve(__dirname,'..'),false,{info(){},error(){}});
const {createClient}=require('@supabase/supabase-js');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/gusta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {fichas,helpers}=require('./verify-r25.cjs');
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3035';
const out=process.env.TEST_OUTPUT_DIR || 'C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r25';fs.mkdirSync(out,{recursive:true});
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
const userId=crypto.randomUUID(),name='Verificación técnica R25 '+userId,codigo=('R25-'+userId).toUpperCase();
const password=crypto.randomBytes(24).toString('hex'),salt=crypto.randomBytes(16).toString('hex');
const hash='pbkdf2_sha256$120000$'+salt+'$'+crypto.pbkdf2Sync(password,salt,120000,32,'sha256').toString('hex');
const ok=r=>{if(r.error)throw Error(r.error.code+': '+r.error.message);return r.data;};
const report={base,realDatabase:true,realAPI:true,realAI:false,checks:[],errors:[],cleanup:false};
(async()=>{let browser,created=false;try{
 ok(await db.from('usuarios').insert({id:userId,nombre:name,fecha_examen:'2027-01-01',codigo_acceso:codigo,rasgos_especiales:{plan:'full',modo_paciente:true,ruta_flexible:true,access_password_hash:hash}}));created=true;
 browser=await chromium.launch({channel:'msedge',headless:true});const ctx=await browser.newContext({viewport:{width:1366,height:900}});
 const login=await ctx.request.post(base+'/api/login-codigo',{data:{codigo,password}});assert.equal(login.status(),200);
 const cookie=login.headersArray().filter(h=>h.name.toLowerCase()==='set-cookie').map(h=>h.value.split(';')[0]).join('; ');
 if(/^http:\/\/(127\.0\.0\.1|localhost):/.test(base))await ctx.setExtraHTTPHeaders({Cookie:cookie});
 const topic='fracciones_concepto',f=fichas.find(f=>f.tema===topic);
 const post=(url,data)=>ctx.request.post(base+url,{data:{user_id:userId,...data}});
 const read=async()=>{const r=await ctx.request.get(base+`/api/fichas?user_id=${userId}&tema=${topic}`);assert.equal(r.status(),200);return r.json();};
 assert.equal((await post('/api/fichas',{tema:topic,version:1,paso:3,respuesta:f.comprobacion.correcta})).status(),409);
 assert.equal((await (await post('/api/sesion/init',{tema:topic,modo:'REPASO'})).json()).tipo,'lectura_modulo');
 assert.equal((await (await post('/api/sesion/concreta',{accion:'iniciar',tema:topic})).json()).tipo,'lectura_modulo');
 assert.equal(ok(await db.from('sesiones').select('id').eq('user_id',userId)).length,0);
 report.checks.push('API real: no permite saltar pasos ni crear práctica/taller antes de la lectura');
 const page=await ctx.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 const url=base+`/tutoria?user_id=${userId}&tema=${topic}&modo=REPASO`;
 await page.goto(url,{waitUntil:'networkidle'});await page.getByRole('heading',{name:'¿Para qué nos sirve?',exact:true}).waitFor();
 assert.equal(await page.getByRole('button',{name:'Enviar respuesta',exact:true}).count(),0);
 await page.screenshot({path:path.join(out,'lectura-pc.png'),fullPage:true});
 // Un fallo transitorio no completa un paso ni pierde el contenido.
 await page.route('**/api/fichas',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'No pudimos guardar este paso. Volvé a intentar.'})}),{times:1});
 await page.getByRole('button',{name:'Leí este paso; seguir',exact:true}).click();await page.getByRole('region',{name:'Lectura previa del módulo'}).getByRole('alert').waitFor();assert.equal((await read()).lectura.paso,0);
 await page.getByRole('button',{name:'Leí este paso; seguir',exact:true}).click();await page.getByRole('heading',{name:f.ejemplo.titulo,exact:true}).waitFor();
 await page.reload({waitUntil:'networkidle'});await page.getByRole('heading',{name:f.ejemplo.titulo,exact:true}).waitFor();
 assert.equal((await read()).lectura.paso,1);await page.getByRole('img',{name:/jarra/}).waitFor();
 await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 await page.screenshot({path:path.join(out,'lectura-movil.png'),fullPage:true});await page.setViewportSize({width:1366,height:900});
 await page.getByRole('button',{name:'Leí este paso; seguir',exact:true}).click();await page.getByRole('heading',{name:'La misma idea en otro lugar',exact:true}).waitFor();
 await page.getByRole('button',{name:'Leí este paso; seguir',exact:true}).click();await page.getByRole('heading',{name:'Miremos un caso',exact:true}).waitFor();
 await page.getByRole('button',{name:f.comprobacion.opciones[(f.comprobacion.correcta+1)%3],exact:true}).click();await page.getByRole('button',{name:'Conversar sobre mi respuesta',exact:true}).click();
 await page.getByRole('heading',{name:'Lo vemos juntas',exact:true}).waitFor();assert.equal((await read()).lectura.completada,false);
 await page.screenshot({path:path.join(out,'ayuda-sin-nota.png'),fullPage:true});
 await page.getByRole('button',{name:'Revisé la explicación; continuar con ayuda',exact:true}).click();await page.getByRole('heading',{name:'Ficha recorrida',exact:true}).waitFor();
 assert.equal(ok(await db.from('sesiones').select('id').eq('user_id',userId)).length,0);assert.equal(ok(await db.from('progreso').select('*').eq('user_id',userId)).length,0);
 await page.getByRole('button',{name:'Comenzar lo interactivo',exact:true}).click();await page.getByRole('button',{name:'Siguiente →',exact:true}).waitFor();
 const sessions=ok(await db.from('sesiones').select('*').eq('user_id',userId));assert.equal(sessions.length,1);assert.equal(sessions[0].ia_parametros_usados.provider,'contenido_revisado');
 report.checks.push('PC/móvil: lectura, pausa, recarga, error de red, ejemplo visual, ayuda sin nota y apertura de microlección');
 // Sesión anterior conservada, aunque falte la lectura de la versión actual.
 await page.waitForTimeout(1000);
 ok(await db.from('lecciones_completadas').delete().eq('user_id',userId).eq('tema',topic).gte('leccion_numero',helpers.BASE_LECTURA));
 await page.reload({waitUntil:'networkidle'});await page.getByRole('heading',{name:'¿Para qué nos sirve?',exact:true}).waitFor();assert.equal(await page.getByRole('button',{name:'Siguiente →',exact:true}).count(),0);
 const blocked=await post('/api/sesion/respuesta',{sesion_id:sessions[0].id,respuesta_usuario:'2',envio_id:crypto.randomUUID()});assert.equal(blocked.status(),409);
 for(let paso=0;paso<4;paso++){const r=await post('/api/fichas',{tema:topic,version:1,paso,respuesta:f.comprobacion.correcta});assert.equal(r.status(),200);}
 await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'Siguiente →',exact:true}).waitFor();
 assert.equal(ok(await db.from('sesiones').select('id').eq('user_id',userId)).length,1);
 report.checks.push('Sesión restaurada protegida y conservada; respuesta directa bloqueada con 409');
 // Nuevo navegador: no depende de localStorage.
 const ctx2=await browser.newContext({storageState:await ctx.storageState()});if(/^http:/.test(base))await ctx2.setExtraHTTPHeaders({Cookie:cookie});
 const remote=await ctx2.request.get(base+`/api/fichas?user_id=${userId}&tema=${topic}`);assert.equal((await remote.json()).lectura.completada,true);await ctx2.close();
 await page.goto(base+`/biblioteca?user_id=${userId}`,{waitUntil:'networkidle'});assert.equal(await page.locator('article').count(),40);
 await page.getByRole('button',{name:'Matemática',exact:true}).click();assert.equal(await page.locator('article').count(),26);
 await page.getByRole('button',{name:'Lengua',exact:true}).click();assert.equal(await page.locator('article').count(),14);
 await page.screenshot({path:path.join(out,'biblioteca-pc.png'),fullPage:true});
 await page.goto(base+`/biblioteca?user_id=${userId}&tema=${topic}`,{waitUntil:'networkidle'});await page.getByRole('heading',{name:'¿Para qué nos sirve?',exact:true}).waitFor();
 report.checks.push('Biblioteca: 40 fichas, filtros 26/14, relectura; avance persistente en otro navegador');
 await page.route('**/api/fichas?**',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'No pudimos consultar la lectura guardada.'})}),{times:1});
 await page.goto(base+`/biblioteca?user_id=${userId}&tema=ortografia_h`,{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Volver a intentar',exact:true}).click();await page.getByRole('heading',{name:'¿Para qué nos sirve?',exact:true}).waitFor();
 await page.goto(base+`/papas?user_id=${userId}`,{waitUntil:'networkidle'});
 const libraryLink=page.getByRole('link',{name:'Ver las fichas y los PDF',exact:true});await libraryLink.waitFor();assert((await libraryLink.getAttribute('href')).endsWith(userId));
 await libraryLink.click();await page.getByRole('heading',{name:'Mis fichas para entender',exact:true}).waitFor();
 report.checks.push('Dashboard familiar enlaza la biblioteca; lectura inaccesible muestra error y permite reintentar');
 const foreign=await ctx.request.get(base+`/api/fichas?user_id=${crypto.randomUUID()}`);assert.equal(foreign.status(),403);
 const anonymous=await browser.newContext();assert.equal((await anonymous.request.get(base+`/api/fichas?user_id=${userId}`)).status(),401);await anonymous.close();
 // Taller y repaso espaciado: tampoco permiten eludir la lectura de su tema.
 const topic2='division_1_digito',f2=fichas.find(f=>f.tema===topic2);
 for(let paso=0;paso<4;paso++)assert.equal((await post('/api/fichas',{tema:topic2,version:1,paso,respuesta:f2.comprobacion.correcta})).status(),200);
 const concrete=await (await post('/api/sesion/concreta',{accion:'iniciar',tema:topic2})).json();assert(concrete.sesion_id);
 ok(await db.from('lecciones_completadas').delete().eq('user_id',userId).eq('tema',topic2).gte('leccion_numero',helpers.BASE_LECTURA));
 assert.equal((await post('/api/sesion/concreta',{accion:'responder',sesion_id:concrete.sesion_id,respuesta_usuario:'{}',envio_id:crypto.randomUUID()})).status(),409);
 const {h}=require('./verify-r21.cjs');const {UNIDADES_BASES:units,VERSION_BASES:version}=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES']);
 const u=units.find(u=>u.tema==='numeros_naturales_sistema_decimal');
 ok(await db.from('sesiones').insert([0,1,2].map(n=>({id:crypto.randomUUID(),user_id:userId,tema:u.tema,capa:1,tipo_pregunta:n?'multiple':'leccion',pregunta_generada:'Evidencia sintética R25',es_correcta:true,created_at:`2026-09-01T1${n}:00:00Z`,ia_parametros_usados:{objetivo_id:u.id,actividad_id:u.actividades[n].id,contenido_version:version}}))));
 const review=await post('/api/sesion/repasos',{objetivo_id:u.id});assert.equal(review.status(),200);assert.equal((await review.json()).tipo,'lectura_modulo');
 report.checks.push('Cuenta ajena 403, sin sesión 401; respuesta de taller 409 y repaso espaciado protegido');
 // Publicación íntegra: cada PDF coincide byte a byte con el renderizado local.
 for(const item of fichas){const r=await ctx.request.get(base+`/fichas/${item.tema}.pdf`);assert.equal(r.status(),200);assert(r.headers()['content-type'].includes('application/pdf'));assert.equal(crypto.createHash('sha256').update(await r.body()).digest('hex'),crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../public/fichas',item.tema+'.pdf'))).digest('hex'));}
 report.checks.push('Los 40 PDF publicados coinciden con los archivos revisados');
 assert.deepEqual(report.errors,[]);
}catch(e){report.errors.push(e.message);throw e;}finally{
 if(browser)await browser.close();
 if(created){ok(await db.from('usuarios').delete().eq('id',userId).eq('nombre',name));for(const table of ['usuarios','sesiones','continuidad_misiones','lecciones_completadas','progreso'])assert.equal(ok(await db.from(table).select('*').eq(table==='usuarios'?'id':'user_id',userId)).length,0);report.cleanup=true;}
 fs.writeFileSync(path.join(out,'api-real-r25.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
