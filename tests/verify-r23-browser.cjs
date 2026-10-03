const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require('C:/Users/gusta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {h,call,registry}=require('./verify-r21.cjs');
const {UNIDADES_BASES:units,VERSION_BASES:version}=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES']);
const curriculum=h.load('src/lib/curriculum.js',['CURRICULUM_MATEMATICA']);
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3031';const out=process.env.TEST_OUTPUT_DIR||'C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r23';fs.mkdirSync(out,{recursive:true});
const proof=u=>[0,1,2].map(n=>({id:u.id+n,user_id:h.user.id,tema:u.tema,tipo_pregunta:n?'multiple':'leccion',es_correcta:true,created_at:'2026-10-01',ia_parametros_usados:{objetivo_id:u.id,actividad_id:u.actividades[n].id,contenido_version:version}}));
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});const results=[],errors=[];try{
 const ctx=await browser.newContext({viewport:{width:1366,height:900}});let db;
 await ctx.route('**/api/**',async route=>{const p=new URL(route.request().url()).pathname,b=route.request().postDataJSON()||{};let output={usuario:h.user,progreso:[],examenes_aprobados:[],repasos:[],proximos:[]},status=200;
 if(p==='/api/sesion/continuidad')output={disponible:false};
 if(p==='/api/sesion/init'){const r=await h.start(db,{forzar_practica:false,...b});assert.equal(r.calls.length,0);output=r.output;}
 if(p==='/api/sesion/respuesta')output=await h.answer(db,b.sesion_id,b);
 if(p==='/api/sesion/concreta'){const r=await call(db,b);output=r.output;status=r.status;}
 if(p==='/api/sesion/ayuda')output=await registry.registrarAyuda(db,b.sesion_id,b);
 await route.fulfill({status,contentType:'application/json',body:JSON.stringify(output)});
 });
 const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
 for(const u of units.filter(u=>u.id.startsWith('puente_'))){
 const before=units.filter(v=>v.tema!==u.tema || units.indexOf(v)<units.indexOf(u)).flatMap(proof);
 const prereqs=curriculum.CURRICULUM_MATEMATICA.filter(t=>t.tema!==u.tema).map((t,i)=>({id:'req'+i,user_id:h.user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true}));db=h.db({sesiones:[...prereqs,...before]});
 await page.goto(base+'/tutoria?user_id='+h.user.id+'&tema='+u.tema+'&modo=REPASO',{waitUntil:'networkidle'});await page.evaluate(()=>localStorage.clear());await page.reload({waitUntil:'networkidle'});
 await page.getByText(u.explicacion,{exact:true}).waitFor();assert(await page.getByRole('img').count()>0);
 await page.getByRole('button',{name:'Siguiente →',exact:true}).click();await page.getByRole('button',{name:'Ver siguiente paso',exact:true}).click();await page.getByRole('button',{name:'Siguiente →',exact:true}).click();
 const choices=page.getByRole('group',{name:'Elegí una respuesta'});await choices.getByRole('button',{name:u.actividades[0].respuesta_correcta,exact:true}).waitFor();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 if(u.id==='puente_divisor'){
  await page.getByRole('button',{name:'Probemos con objetos',exact:true}).click();await page.getByRole('heading',{name:'Repartir por igual',exact:true}).waitFor();await page.getByRole('button',{name:'Volver a mi actividad anterior',exact:true}).click();await choices.waitFor();results.push('La lección de divisores abre el taller de reparto, y vuelve al ejercicio anterior');
 }
 await choices.getByRole('button',{name:u.actividades[0].opciones.find(x=>x!==u.actividades[0].respuesta_correcta),exact:true}).click();await page.getByRole('button',{name:'Enviar respuesta',exact:true}).click();await page.getByRole('button',{name:/Probar de nuevo con esta pista/}).waitFor();
 assert(await page.getByRole('img').count()>0);results.push(u.id+': explicación, ejemplo, práctica, error y dibujo visible');
 if(['puente_ocho','puente_divisor','puente_encuentro'].includes(u.id)){await page.screenshot({animations:'disabled',path:path.join(out,u.id+'.png'),fullPage:true});}
 if(u.id==='puente_encuentro'){await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await page.screenshot({animations:'disabled',path:path.join(out,'saltos-movil.png'),fullPage:true});await page.setViewportSize({width:1366,height:900});}
 }
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({results,errors},null,2));console.log(JSON.stringify({results,errors}));
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
