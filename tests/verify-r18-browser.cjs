const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/gusta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=process.env.TEST_OUTPUT_DIR||'C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r18';fs.mkdirSync(out,{recursive:true});
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3029',f=path.join(__dirname,'verify-r2.cjs'),m=new Module(f,module);m.filename=f;m.paths=module.paths;m._compile(fs.readFileSync(f,'utf8').split('\n(async()=>{')[0]+'\nmodule.exports={start,answer,db,user,load,curriculum};',f);const h=m.exports;
const {UNIDADES_BASES:units,VERSION_BASES:version,getCierreBase}=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','getCierreBase']);
const fresh=units.filter(u=>u.id.startsWith('leng_esc_')),errors=[],results=[];
const proof=u=>[0,1,2].map(n=>({id:u.id+n,user_id:h.user.id,tema:u.tema,es_correcta:true,tipo_pregunta:n?'multiple':'leccion',created_at:'2026-09-12T12:00:00Z',ia_parametros_usados:{objetivo_id:u.id,contenido_version:version,actividad_id:u.actividades[n].id}}));
const prereqs=tema=>h.curriculum.CURRICULUM_MATEMATICA.filter(t=>t.tema!==tema).map((t,i)=>({id:'approved'+i,user_id:h.user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true,created_at:'2026-09-01',ia_parametros_usados:{}}));
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:1366,height:900},locale:'es-AR'});let database=h.db({sesiones:[]}),modelMode='correct';
 await context.route('**/api/**',async route=>{const p=new URL(route.request().url()).pathname,b=route.request().postDataJSON()||{};let output={usuario:h.user,progreso:[],examenes_aprobados:[],repasos:[],proximos:[]};
  if(p==='/api/sesion/continuidad')output={disponible:false};
  if(p==='/api/sesion/init'){const r=await h.start(database,{forzar_practica:false,...b});assert.equal(r.calls.length,0);output=r.output;}
  if(p==='/api/sesion/respuesta'){
   const row=database.tables.sesiones.find(s=>s.id===b.sesion_id),u=units.find(u=>u.id===row.ia_parametros_usados.objetivo_id),a=u?.actividades.find(a=>a.id===row.ia_parametros_usados.actividad_id);
   const stub=a?.rubrica_escritura?{seguridad:'alta',criterios:a.rubrica_escritura.map((c,i)=>({id:c.id,estado:modelMode==='wrong'&&i===0?'revisar':'logrado',cita_respuesta:b.respuesta_usuario,orientacion:'Revisá quién hizo la acción y qué ocurrió.'})),fidelidad:{estado:'logrado',cita_respuesta:'',orientacion:''}}:{};
   output=await h.answer(database,b.sesion_id,b,modelMode==='pending'?{}:stub);
  }
  await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(output)});
 });
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 async function open(u){database=h.db({sesiones:units.filter(v=>v.tema!==u.tema||units.indexOf(v)<units.indexOf(u)).flatMap(proof)});if(page.url()!=='about:blank')await page.evaluate(()=>localStorage.clear());await page.goto(base+'/tutoria?user_id='+h.user.id+'&tema='+u.tema,{waitUntil:'networkidle'});await page.getByText(u.explicacion,{exact:true}).waitFor();await page.getByRole('button',{name:'Siguiente →',exact:true}).click();await page.getByRole('button',{name:'Siguiente →',exact:true}).click();await page.getByRole('textbox',{name:'Tu resumen',exact:true}).waitFor();}
 for(let i=0;i<fresh.length;i++){
  const u=fresh[i],a=u.actividades[0];await open(u);modelMode='correct';
  const box=page.getByRole('textbox',{name:'Tu resumen',exact:true});await box.fill(a.respuesta_correcta);
  await page.locator('.texto-lectura').getByText(a.visual.texto,{exact:true}).waitFor();assert.equal(await page.getByRole('group',{name:'Elegí una respuesta'}).count(),0);results.push('Explicación y escritura libre: '+u.id);
  if(i===0){
   await page.screenshot({animations:'disabled',path:path.join(out,'escritura-pc.jpg'),type:'jpeg',quality:80,fullPage:true});
   modelMode='wrong';await box.fill('Los libros ordenaron a los alumnos.');await page.getByRole('button',{name:'Enviar respuesta',exact:true}).click();
   await page.getByRole('region',{name:'Tu texto guardado'}).getByText('Los libros ordenaron a los alumnos.',{exact:true}).waitFor();
   await page.getByRole('button',{name:/Probar de nuevo con esta pista/}).click();assert.equal(await box.inputValue(),'Los libros ordenaron a los alumnos.');
   await box.fill('Los estudiantes acomodaron los libros.');modelMode='correct';await page.getByRole('button',{name:'Reenviar respuesta corregida',exact:true}).click();await page.getByText(/Tu texto conserva/).first().waitFor();assert.equal(database.tables.sesiones.at(-1).ia_parametros_usados.resuelto_con_ayuda,true);results.push('Pista conserva borrador y acierto con ayuda');
   await page.getByRole('button',{name:/Explicación y PDFs/}).click();await page.getByRole('button',{name:'📚 Apunte Teórico',exact:true}).click();const theory=await page.locator('.topic-modal-card').innerText();for(const step of fresh){assert(theory.includes(step.explicacion));assert(theory.includes(step.visual.texto));}
   await page.getByRole('button',{name:'📥 Descargar Ficha PDF',exact:true}).click();const waiting=page.waitForEvent('download');await page.getByRole('link',{name:/Descargar/}).click();const d=await waiting;await d.saveAs(path.join(out,'descarga-lectura.pdf'));await page.getByRole('button',{name:'×',exact:true}).click();results.push('Apunte y descarga de escritura');
  }
  if(i===1){
   modelMode='wrong';await page.getByRole('button',{name:'Enviar respuesta',exact:true}).click();await page.getByRole('button',{name:/Probar de nuevo con esta pista/}).click();assert.equal(await box.inputValue(),a.respuesta_correcta);await page.getByRole('button',{name:'Reenviar respuesta corregida',exact:true}).click();await page.getByText(a.paso_resuelto,{exact:true}).waitFor();await page.locator('.texto-lectura').getByText(a.visual.texto,{exact:true}).waitFor();await page.screenshot({animations:'disabled',path:path.join(out,'resolucion.jpg'),type:'jpeg',quality:80,fullPage:true});results.push('Segundo error muestra modelo posible y conserva el texto');
  }
  if(i===2){
   modelMode='pending';await page.getByRole('button',{name:'Enviar respuesta',exact:true}).click();await page.getByText(/no lo contaré como error/).waitFor();assert.equal(database.tables.sesiones.at(-1).es_correcta,null);assert.equal(await page.getByRole('button',{name:/Probar de nuevo con esta pista/}).count(),0);await page.getByRole('button',{name:'Siguiente reto →',exact:true}).waitFor();const saved=await page.evaluate(uid=>JSON.parse(localStorage.getItem('monse_mision_'+uid)),h.user.id);assert.equal(saved.desafios,1);assert.equal(saved.estrellas,2);await page.screenshot({animations:'disabled',path:path.join(out,'sin-calificar.jpg'),type:'jpeg',quality:80,fullPage:true});results.push('Devolución inválida no penaliza y suma esfuerzo sin dominio');
  }
 }
 await page.setViewportSize({width:390,height:844});const u=fresh[2];await open(u);const box=page.getByRole('textbox',{name:'Tu resumen',exact:true});await box.fill('Mi borrador de resumen');const count=database.tables.sesiones.length;await page.reload({waitUntil:'networkidle'});assert.equal(await box.inputValue(),'Mi borrador de resumen');assert.equal(database.tables.sesiones.length,count);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await page.screenshot({animations:'disabled',path:path.join(out,'movil.jpg'),type:'jpeg',quality:80,fullPage:true});results.push('390 px: escritura, párrafos y borrador tras recarga sin otra sesión');
 await page.getByRole('button',{name:/Esto todavía no lo vimos/}).click();await page.getByRole('button',{name:/Probar ahora con esta ayuda/}).click();assert.equal(await box.inputValue(),'Mi borrador de resumen');results.push('Pedir explicación conserva el borrador');
 assert.deepEqual(errors,[]);const report={base,checks:results.length,results,errors,realDatabase:false,realAI:false,metodo:'Interfaz compilada y controladores reales; evaluación semántica simulada explícitamente'};fs.writeFileSync(path.join(out,'navegador-r18.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
