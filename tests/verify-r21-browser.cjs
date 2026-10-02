const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require('C:/Users/gusta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {h,call,registry}=require('./verify-r21.cjs');
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3031';
const out=process.env.TEST_OUTPUT_DIR || 'C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r21';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});const errors=[],results=[];try{
 const context=await browser.newContext({viewport:{width:1366,height:900},locale:'es-AR'}),database=h.db({sesiones:[]});let remote=null,revision=0;
 await context.route('**/api/**',async route=>{const p=new URL(route.request().url()).pathname,b=route.request().postDataJSON()||{};let output={usuario:h.user,progreso:[],examenes_aprobados:[],repasos:[],proximos:[]},status=200;
  try{
   if(p==='/api/sesion/continuidad'){if(route.request().method()==='POST'){remote=b.estado;revision++;}output={disponible:true,estado:remote,revision};}
   if(p==='/api/sesion/init')output=(await h.start(database,{forzar_practica:false,...b})).output;
   if(p==='/api/sesion/concreta'){const r=await call(database,b);output=r.output;status=r.status;}
   if(p==='/api/sesion/ayuda')output=await registry.registrarAyuda(database,b.sesion_id,b);
  }catch(e){status=500;output={error:e.message};errors.push(e.stack);}
  await route.fulfill({status,contentType:'application/json',body:JSON.stringify(output)});
 });
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/tutoria?user_id='+h.user.id+'&tema=fracciones_concepto',{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Probemos con objetos',exact:true}).click();
 const workshop=page.getByRole('region',{name:'Taller con objetos'});
 await page.getByRole('heading',{name:'Explorar mitades',exact:true}).waitFor();
 await page.getByRole('button',{name:'Mostrar un paso más',exact:true}).click();await page.getByRole('button',{name:'Ahora lo hago yo',exact:true}).click();
 await page.getByRole('button',{name:'Parte 2',exact:true}).click();await page.getByRole('button',{name:'Comprobar mi construcción',exact:true}).click();await page.getByRole('button',{name:'Siguiente reto',exact:true}).waitFor();
 await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'Siguiente reto',exact:true}).waitFor();results.push('Recarga conserva primer reto, evaluación y recompensa');
 await page.getByRole('button',{name:'Siguiente reto',exact:true}).click();
 await page.getByRole('button',{name:'Parte 1',exact:true}).click();await page.getByRole('button',{name:'Parte 2',exact:true}).click();await page.getByRole('button',{name:'Comprobar mi construcción',exact:true}).click();
 await page.getByRole('button',{name:'Siguiente reto',exact:true}).click();await page.getByRole('button',{name:'Parte 1',exact:true}).click();await page.getByRole('button',{name:'Comprobar mi construcción',exact:true}).click();
 await page.getByRole('button',{name:/Hacer otra misión/}).waitFor();
 const complete=await page.evaluate(()=>JSON.parse(localStorage.getItem('monse_mision_audit-synthetic')));assert.equal(complete.desafios,3);assert.equal(complete.estrellas,6);assert.equal(complete.misionTerminada,true);
 await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:/Hacer otra misión/}).click();await page.getByRole('heading',{name:'Explorar cuartos',exact:true}).waitFor();results.push('Tres construcciones cierran misión; otra misión sugiere cuartos');
 await page.getByRole('button',{name:'Volver a mi actividad anterior',exact:true}).click();await page.getByRole('button',{name:'Probemos con objetos',exact:true}).waitFor();
 const returned=await page.evaluate(()=>JSON.parse(localStorage.getItem('monse_mision_audit-synthetic')));assert.equal(returned.pregunta.tipo,'leccion');assert.equal(returned.estrellas,6);results.push('Volver restaura lección anterior y conserva estrellas');
 await page.getByRole('button',{name:'Probemos con objetos',exact:true}).click();await page.getByText('Elegir otra idea para explorar',{exact:true}).click();await page.getByRole('button',{name:'Repartir por igual',exact:true}).click();
 for(let i=0;i<6;i++)await page.getByRole('button',{name:'Mostrar un paso más',exact:true}).click();await page.getByRole('button',{name:'Ahora lo hago yo',exact:true}).click();
 await page.getByRole('button',{name:'Agregar ficha 1',exact:true}).click();await page.getByRole('button',{name:'Agregar ficha 1',exact:true}).click();
 await page.reload({waitUntil:'networkidle'});const partial=await page.evaluate(()=>JSON.parse(JSON.parse(localStorage.getItem('monse_mision_audit-synthetic')).respuesta));assert.deepEqual(partial.tablero,[2,0]);results.push('Recarga a mitad del reparto conserva [2,0]');
 await page.getByRole('button',{name:'Ahora cuento el resultado',exact:true}).click();await page.getByRole('button',{name:'Comprobar mi construcción',exact:true}).click();
 await page.getByRole('button',{name:'Agregar a mi cantidad',exact:true}).click();await page.getByRole('button',{name:'Comprobar mi construcción',exact:true}).click();
 await page.getByRole('button',{name:'Mostrar un paso más',exact:true}).waitFor();
 for(let i=0;i<6;i++)await page.getByRole('button',{name:'Mostrar un paso más',exact:true}).click();await page.getByRole('button',{name:'Ya lo hicimos juntos',exact:true}).click();await page.getByRole('button',{name:'Comprobar mi construcción',exact:true}).click();
 await page.getByRole('button',{name:'Siguiente reto',exact:true}).waitFor();const row=database.tables.sesiones.at(-1);assert.equal(row.ia_parametros_usados.concreto_resultado.independiente,false);assert.equal(row.es_correcta,null);results.push('Dos errores muestran reparto guiado; terminar conserva evidencia asistida, sin calificación curricular');
 await page.screenshot({path:path.join(out,'reparto-pc.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await page.screenshot({path:path.join(out,'reparto-movil.png'),fullPage:true});results.push('PC 1366 y pantalla 390 sin desbordamiento');
 await page.getByRole('button',{name:'Volver a mi actividad anterior',exact:true}).click();await page.getByRole('button',{name:'Siguiente →',exact:true}).click();await page.getByRole('region',{name:'Ejemplo paso a paso'}).waitFor();await page.getByRole('button',{name:'Ver siguiente paso',exact:true}).click();
 await page.reload({waitUntil:'networkidle'});await page.getByRole('region',{name:'Ejemplo paso a paso'}).getByText('Paso 2 de 2',{exact:true}).waitFor();results.push('Ejemplo guiado conserva el paso en recarga');
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({results,errors,realDatabase:false},null,2));console.log(JSON.stringify({results,errors}));
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
