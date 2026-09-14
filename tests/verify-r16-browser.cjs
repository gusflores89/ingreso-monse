const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/gusta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=process.env.TEST_OUTPUT_DIR||'C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r16';fs.mkdirSync(out,{recursive:true});
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3029',f=path.join(__dirname,'verify-r2.cjs'),m=new Module(f,module);m.filename=f;m.paths=module.paths;m._compile(fs.readFileSync(f,'utf8').split('\n(async()=>{')[0]+'\nmodule.exports={start,answer,db,user,load,curriculum};',f);const h=m.exports;
const {UNIDADES_BASES:units,VERSION_BASES:version,getCierreBase}=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','getCierreBase']);
const fresh=units.filter(u=>u.tema==='comprension_lectora_literal_inferida'&&!u.actividades[0].rubrica_escritura),errors=[],results=[];
const proof=u=>[0,1,2].map(n=>({id:u.id+n,user_id:h.user.id,tema:u.tema,es_correcta:true,tipo_pregunta:n?'multiple':'leccion',created_at:'2026-09-12T12:00:00Z',ia_parametros_usados:{objetivo_id:u.id,contenido_version:version,actividad_id:u.actividades[n].id}}));
const prereqs=tema=>h.curriculum.CURRICULUM_MATEMATICA.filter(t=>t.tema!==tema).map((t,i)=>({id:'approved'+i,user_id:h.user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true,created_at:'2026-09-01',ia_parametros_usados:{}}));
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:1366,height:900},locale:'es-AR'});let database=h.db({sesiones:[]});
 await context.route('**/api/**',async route=>{const p=new URL(route.request().url()).pathname,b=route.request().postDataJSON()||{};let output={usuario:h.user,progreso:[],examenes_aprobados:[],repasos:[],proximos:[]};
  if(p==='/api/sesion/continuidad')output={disponible:false};
  if(p==='/api/sesion/init'){const res=await h.start(database,{forzar_practica:false,...b});assert.equal(res.calls.length,0);output=res.output;}
  if(p==='/api/sesion/respuesta')output=await h.answer(database,b.sesion_id,b);
  await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(output)});
 });
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 for(let i=0;i<fresh.length;i++){
  const u=fresh[i];database=h.db({sesiones:[...prereqs(u.tema),...units.filter(v=>v.tema!==u.tema || units.indexOf(v)<units.indexOf(u)).flatMap(proof)]});
  if(i)await page.evaluate(()=>localStorage.clear());
  await page.goto(base+'/tutoria?user_id='+h.user.id+'&tema='+u.tema,{waitUntil:'networkidle'});
  await page.getByText(u.explicacion,{exact:true}).waitFor();await page.locator('.texto-lectura').getByText(u.visual.texto,{exact:true}).waitFor();assert(await page.locator('.texto-lectura').count()>0);
  await page.getByRole('button',{name:'Siguiente →',exact:true}).click();await page.getByRole('button',{name:'Siguiente →',exact:true}).click();
  const choices=page.getByRole('group',{name:'Elegí una respuesta'});await choices.getByRole('button',{name:u.actividades[0].respuesta_correcta,exact:true}).waitFor();
  await page.locator('.texto-lectura').getByText(u.actividades[0].visual.texto,{exact:true}).waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  results.push('Explicación, ejemplo y opciones: '+u.id);
  if(['leng_prof_precision'].includes(u.id)){
   await page.screenshot({path:path.join(out,u.id+'.jpg'),type:'jpeg',quality:75,fullPage:true});
   await page.getByRole('button',{name:/Explicación y PDFs/}).click();await page.getByRole('button',{name:'🛝 Diapositivas',exact:true}).click();
   const modal=page.locator('.topic-modal-card');await modal.getByText(fresh[0].visual.texto,{exact:true}).waitFor();await modal.getByRole('button',{name:'Siguiente →',exact:true}).click();await modal.getByText(u.visual.texto,{exact:true}).waitFor();
   await page.getByRole('button',{name:'📚 Apunte Teórico',exact:true}).click();const theory=await modal.innerText();for(const lesson of fresh){assert(theory.includes(lesson.visual.texto));assert(theory.includes(lesson.explicacion));}results.push('Diapositivas y apunte conservan los textos de las diez habilidades');
   await page.getByRole('button',{name:'📥 Descargar Ficha PDF',exact:true}).click();
   const waiting=page.waitForEvent('download');await page.getByRole('link',{name:/Descargar/}).click();const download=await waiting;const target=path.join(out,'descarga-'+u.tema+'.pdf');await download.saveAs(target);assert(fs.readFileSync(target).subarray(0,5).equals(Buffer.from('%PDF-')));await page.getByRole('button',{name:'×',exact:true}).click();results.push('Descarga real: '+u.tema);
  }
  if(u.id==='leng_prof_evidencia'){
   const wrong=u.actividades[0].opciones.find(v=>v!==u.actividades[0].respuesta_correcta);
   await choices.getByRole('button',{name:wrong,exact:true}).click();await page.getByRole('button',{name:'Enviar respuesta',exact:true}).click();
   await page.locator('.texto-lectura').getByText(u.actividades[0].visual.texto,{exact:true}).waitFor();await page.getByRole('button',{name:/Probar de nuevo con esta pista/}).click();await choices.getByRole('button',{name:wrong,exact:true}).click();await page.getByRole('button',{name:'Reenviar respuesta corregida',exact:true}).click();
   await page.getByText(u.actividades[0].paso_resuelto,{exact:true}).waitFor();await page.locator('.texto-lectura').getByText(u.actividades[0].visual.texto,{exact:true}).waitFor();assert(await page.locator('.texto-lectura').count()>0);await page.waitForTimeout(450);await page.screenshot({path:path.join(out,'resolucion-con-ayuda.jpg'),type:'jpeg',quality:75,fullPage:true});results.push('Dos errores conservan el texto y justifican la inferencia con evidencia');
  }
  if(u.id==='leng_prof_precision'){
   const wrong=u.actividades[0].opciones.find(v=>v!==u.actividades[0].respuesta_correcta);
   await choices.getByRole('button',{name:wrong,exact:true}).click();await page.getByRole('button',{name:'Enviar respuesta',exact:true}).click();
   await page.locator('.texto-lectura').getByText(u.actividades[0].visual.texto,{exact:true}).waitFor();await page.getByRole('button',{name:/Probar de nuevo con esta pista/}).click();await choices.getByRole('button',{name:u.actividades[0].respuesta_correcta,exact:true}).click();await page.getByRole('button',{name:'Reenviar respuesta corregida',exact:true}).click();
   await page.getByText(/Lo resolviste/).first().waitFor();assert.equal(database.tables.sesiones.at(-1).ia_parametros_usados.resuelto_con_ayuda,true);results.push('Error, pista y acierto conservan ayuda en la corrección');
  }
 }
 // Un aprobado histórico no sustituye el cierre de la secuencia ampliada de lectura.
 for(const tema of ["comprension_lectora_literal_inferida"]){
 database=h.db({sesiones:[...prereqs(tema),...units.flatMap(proof),{id:'old-close',user_id:h.user.id,tema:tema,tipo_pregunta:'examen_final',es_correcta:true,created_at:'2026-09-01',contexto_json:{examen_final:{...getCierreBase(tema),revision_cierre:undefined}},ia_parametros_usados:{}}]});await page.evaluate(()=>localStorage.clear());await page.goto(base+'/tutoria?user_id='+h.user.id+'&tema='+tema,{waitUntil:'networkidle'});await page.getByRole('button',{name:'Elegir examen →',exact:true}).click();
 await page.getByText('Cierre de aprendizaje',{exact:true}).waitFor();assert.equal(await page.locator('.exam-answers .texto-lectura').count(),getCierreBase(tema).preguntas.filter(q=>q.visual).length);assert.equal(await page.locator('.exam-answers [role="group"]').count(),3);
 for(const q of getCierreBase(tema).preguntas)await page.getByRole('group',{name:'Pregunta '+q.id,exact:true}).getByRole('button',{name:q.respuesta_correcta,exact:true}).click();
 await page.screenshot({path:path.join(out,'cierre-'+tema+'.jpg'),type:'jpeg',quality:75,fullPage:true});await page.getByRole('button',{name:/Enviar examen final|Terminar cierre/,exact:true}).click();await page.getByText(/aprobado con 100%/).first().waitFor();results.push('Cierre de '+tema+' conserva tres preguntas revisadas y corrige sin IA');
 }
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>localStorage.clear());const u=fresh.find(x=>x.id==='leng_prof_contexto');database=h.db({sesiones:[...prereqs(u.tema),...units.filter(v=>v.tema!==u.tema || units.indexOf(v)<units.indexOf(u)).flatMap(proof)]});await page.goto(base+'/tutoria?user_id='+h.user.id+'&tema='+u.tema,{waitUntil:'networkidle'});await page.getByText(u.explicacion,{exact:true}).waitFor();await page.locator('.texto-lectura').getByText(u.visual.texto,{exact:true}).waitFor();assert(await page.locator('.texto-lectura').count()>0);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await page.screenshot({path:path.join(out,'movil.jpg'),type:'jpeg',quality:75,fullPage:true});results.push('390 px: explicación sin desbordamiento');await page.getByRole('button',{name:'Siguiente →',exact:true}).click();await page.getByRole('button',{name:'Siguiente →',exact:true}).click();await page.getByRole('group',{name:'Elegí una respuesta'}).getByRole('button',{name:u.actividades[0].respuesta_correcta,exact:true}).click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await page.screenshot({path:path.join(out,'movil-practica.jpg'),type:'jpeg',quality:75,fullPage:true});results.push('390 px: opciones de vocabulario en contexto se pueden seleccionar');
 assert.deepEqual(errors,[]);const report={base,checks:results.length,results,errors,realDatabase:false,realAI:false,metodo:'Interfaz compilada, controladores reales con datos sintéticos y PDFs del servidor'};fs.writeFileSync(path.join(out,'navegador-r16.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
