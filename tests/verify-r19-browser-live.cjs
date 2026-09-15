// API y base de datos reales; escritos sintéticos precargados, sin llamar al tutor IA.
const assert=require('assert/strict'),crypto=require('crypto'),path=require('path'),fs=require('fs'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const content=vm.runInNewContext(fs.readFileSync(path.join(root,'src/lib/contenido-bases.js'),'utf8').replace(/^export /gm,'')+'; ({UNIDADES_BASES,VERSION_BASES})');
const u=content.UNIDADES_BASES.find(u=>u.id==='leng_esc_frase'),a=u.actividades[0];
require('@next/env').loadEnvConfig(root,false,{info(){},error(){}});
const {createClient}=require('@supabase/supabase-js');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/gusta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3029',out=process.env.TEST_OUTPUT_DIR || 'C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r19';fs.mkdirSync(out,{recursive:true});
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
const userId=crypto.randomUUID(),name='Verificación R19 '+userId,codigo=('R19-'+userId).toUpperCase(),ids=[crypto.randomUUID(),crypto.randomUUID()];
const password=crypto.randomBytes(24).toString('hex'),salt=crypto.randomBytes(16).toString('hex');
const hash='pbkdf2_sha256$120000$'+salt+'$'+crypto.pbkdf2Sync(password,salt,120000,32,'sha256').toString('hex');
const ok=r=>{if(r.error)throw Error(r.error.code+': '+r.error.message);return r.data;};
const report={base,realAPI:true,realDatabase:true,realAI:false,checks:[],errors:[],cleanup:false};
const message='Reconociste quién actuó y qué hizo. Me gustó cómo lo contaste con tus palabras. Sigamos leyendo juntos.';
(async()=>{let browser,created=false;try{
 ok(await db.from('usuarios').insert({id:userId,nombre:name,fecha_examen:'2027-01-01',codigo_acceso:codigo,rasgos_especiales:{plan:'full',modo_paciente:true,access_password_hash:hash}}));created=true;
 const rows=ids.map((id,i)=>({id,user_id:userId,tema:u.tema,capa:1,tipo_pregunta:i?'leccion':'produccion',pregunta_generada:a.enunciado,respuesta_usuario:'Los estudiantes acomodaron los libros.',es_correcta:i?false:null,created_at:'2026-09-14T12:00:00Z',ia_parametros_usados:{objetivo_id:u.id,actividad_id:a.id,contenido_version:content.VERSION_BASES,revision_pendiente:!i,criterios_escritura:[],eventos_pedagogicos:[{id:'synthetic-'+i,tipo:'respuesta',estado:'completado',es_correcta:i?false:null,respuesta:'Los estudiantes acomodaron los libros.',salida:{retroalimentacion:i?'Volvamos a mirar quién hizo la acción.':'Guardé tu texto sin calificar.',revision_pendiente:!i}}]}}));
 ok(await db.from('sesiones').insert(rows));browser=await chromium.launch({channel:'msedge',headless:true});
 async function context(){const ctx=await browser.newContext({viewport:{width:1366,height:900},locale:'es-AR'});const login=await ctx.request.post(base+'/api/login-codigo',{data:{codigo,password}});assert.equal(login.status(),200);return ctx;}
 async function pageFor(ctx,url){const page=await ctx.newPage();page.on('pageerror',e=>report.errors.push(e.message));await page.goto(base+url,{waitUntil:'networkidle'});return page;}
 const family=await context(),page=await pageFor(family,'/papas?user_id='+userId);
 const panel=page.getByRole('region',{name:'Recorrido de aprendizaje'});await panel.getByRole('button',{name:'Escritos y resúmenes',exact:true}).waitFor();
 await panel.locator('summary').first().click();await panel.getByRole('region',{name:'Texto original'}).getByText(a.visual.texto,{exact:true}).waitFor();
 await panel.getByText('Guardé tu texto sin calificar.',{exact:false}).waitFor();
 const fields=panel.getByRole('textbox',{name:'Devolución para conversar con Abril'});await fields.fill(message);
 await panel.screenshot({animations:'disabled',path:path.join(out,'familia-escrito.jpg'),type:'jpeg',quality:82});
 await panel.getByRole('button',{name:'Guardar devolución',exact:true}).click();await panel.getByRole('status').getByText(/Abril puede leerla/).waitFor();
 const saved=ok(await db.from('sesiones').select('*').eq('id',ids[0]).single());assert.equal(saved.es_correcta,null);assert.equal(saved.ia_parametros_usados.revision_pendiente,false);assert.equal(saved.ia_parametros_usados.revision_familiar.comentario,message);assert.equal(saved.ia_parametros_usados.revision_familiar.respuesta,rows[0].respuesta_usuario);
 report.checks.push('Panel familiar: texto original, escrito y devolución del tutor; comentario guardado en Supabase sin asignar nota');
 await panel.getByRole('button',{name:'Escritos y resúmenes',exact:true}).click();await panel.locator('summary').filter({hasText:'Para seguir aprendiendo'}).click();
 await panel.getByRole('textbox',{name:'Devolución para conversar con Abril'}).fill('Revisé tu idea y entendí lo que quisiste contar.');await panel.getByRole('button',{name:'Guardar devolución',exact:true}).click();await panel.getByRole('status').getByText(/Abril puede leerla/).waitFor();assert.equal(ok(await db.from('sesiones').select('es_correcta').eq('id',ids[1]).single()).es_correcta,false);
 report.checks.push('Escrito con corrección discutible también admite orientación familiar y conserva su evaluación');
 const learner=await context(),student=await pageFor(learner,'/tutoria?user_id='+userId+'&tema=numeros_naturales_sistema_decimal');
 await student.getByRole('button',{name:'Mensajes de tu familia',exact:true}).waitFor();await student.getByText('☁️ Avance sincronizado',{exact:true}).waitFor();
 const before=ok(await db.from('continuidad_misiones').select('estado').eq('user_id',userId).single()).estado;
 await student.getByRole('button',{name:'Mensajes de tu familia',exact:true}).click();const inbox=student.getByRole('region',{name:'Mensajes de tu familia'});await inbox.getByText(message,{exact:true}).waitFor();
 const card=inbox.getByRole('region',{name:'Mensaje familiar'}).filter({hasText:message});await card.locator('summary').click();await card.getByText(rows[0].respuesta_usuario,{exact:true}).waitFor();await card.getByText(a.visual.texto,{exact:true}).waitFor();
 await inbox.screenshot({animations:'disabled',path:path.join(out,'alumna-mensajes-pc.jpg'),type:'jpeg',quality:82});
 const after=ok(await db.from('continuidad_misiones').select('estado').eq('user_id',userId).single()).estado;assert.deepEqual(after,before);
 report.checks.push('Otro navegador recupera mensaje, texto leído y copia del escrito; leer no modifica misión, estrellas ni retos');
 await student.setViewportSize({width:390,height:844});await inbox.screenshot({animations:'disabled',path:path.join(out,'alumna-mensajes-movil.jpg'),type:'jpeg',quality:82});assert.equal(await student.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 report.checks.push('Mensajes y lectura a 390 px sin desbordamiento');
 await student.reload({waitUntil:'networkidle'});await student.getByRole('button',{name:'Mensajes de tu familia',exact:true}).click();await student.getByRole('region',{name:'Mensajes de tu familia'}).getByText(message,{exact:true}).waitFor();
 assert.equal(await student.getByRole('button',{name:'Mensajes de tu familia',exact:true}).getAttribute('aria-expanded'),'true');await student.getByRole('button',{name:'Mensajes de tu familia',exact:true}).click();assert.equal(await student.getByText(message,{exact:true}).count(),0);
 report.checks.push('Los mensajes se recuperan tras recargar y se pueden cerrar para continuar el reto');
 // HTTP real: autorización y versión desactualizada no producen escrituras.
 const anonymous=await browser.newContext();assert.equal((await anonymous.request.get(base+'/api/familia/recorrido?user_id='+userId+'&vista=devoluciones')).status(),401);
 assert.equal(await student.evaluate(async id=>(await fetch('/api/familia/recorrido?user_id='+id+'&vista=escritos')).status,crypto.randomUUID()),403);
 const stale=await page.evaluate(async id=>(await fetch('/api/familia/devolucion',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sesion_id:id,comentario:'No debe guardarse',version_respuesta:'stale'})})).status,ids[0]);assert.equal(stale,409);assert.equal(ok(await db.from('sesiones').select('ia_parametros_usados').eq('id',ids[0]).single()).ia_parametros_usados.revision_familiar.comentario,message);
 report.checks.push('HTTP real rechaza acceso anónimo, otra cuenta y comentario sobre una versión obsoleta');
 // Estados vacíos y de error: solo estas dos respuestas se simulan explícitamente.
 await student.route('**/api/familia/recorrido?**',route=>route.fulfill({status:503,contentType:'application/json',body:'{}'}));await student.getByRole('button',{name:'Mensajes de tu familia',exact:true}).click();await student.getByRole('alert').filter({hasText:'No pudimos abrir tus mensajes'}).waitFor();await student.unroute('**/api/familia/recorrido?**');await student.getByRole('button',{name:'Actualizar mensajes',exact:true}).click();await student.getByText(message,{exact:true}).waitFor();
 await student.route('**/api/familia/recorrido?**',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({sesiones:[],hay_mas:false})}));await student.getByRole('button',{name:'Actualizar mensajes',exact:true}).click();await student.getByText('Todavía no hay mensajes en esta página.',{exact:false}).waitFor();await student.unroute('**/api/familia/recorrido?**');
 report.checks.push('Estados de error y vacío simulados; reintentar recupera los mensajes reales');
 await page.setViewportSize({width:390,height:844});await panel.screenshot({animations:'disabled',path:path.join(out,'familia-movil.jpg'),type:'jpeg',quality:82});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 report.checks.push('Panel familiar y formulario a 390 px sin desbordamiento');
 assert.deepEqual(report.errors,[]);
}finally{
 if(browser)await browser.close();
 if(created){ok(await db.from('usuarios').delete().eq('id',userId).eq('nombre',name));for(const table of ['usuarios','sesiones','continuidad_misiones','lecciones_completadas','progreso'])assert.equal(ok(await db.from(table).select('*').eq(table==='usuarios'?'id':'user_id',userId)).length,0,'Limpieza '+table);report.cleanup=true;}
 fs.writeFileSync(path.join(out,'navegador-real-r19.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}
})().catch(e=>{console.error(e.stack);process.exitCode=1});
