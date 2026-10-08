const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/gusta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {h,call,fichas}=require('./verify-r25.cjs');
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3035';
const out=process.env.TEST_OUTPUT_DIR || 'C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r26';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});const errors=[],db=h.db(),report={checks:[],errors,realDatabase:false};try{
 const ctx=await browser.newContext({viewport:{width:1366,height:900}});
 await ctx.route('**/api/fichas?**',async route=>{const params=Object.fromEntries(new URL(route.request().url()).searchParams);const r=await call(db,params,'GET');await route.fulfill({status:r.status,contentType:'application/json',body:JSON.stringify(r.output)});});
 const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
 const open=async tema=>{await page.goto(base+`/biblioteca?user_id=${h.user.id}&tema=${tema}`,{waitUntil:'networkidle'});await page.getByRole('heading',{name:'¿Para qué nos sirve?',exact:true}).waitFor();};
 for(const f of fichas){
  await open(f.tema);assert(await page.getByRole('img').count()>=1,`Falta escena antes de leer: ${f.tema}`);
  assert.equal(await page.locator('table').count(),0);
  await page.locator('figure img').evaluateAll(async imgs=>{for(const im of imgs){await im.decode();if(!im.naturalWidth)throw Error('Imagen vacía');}});
  if(['decimales_conversion','fracciones_concepto','division_1_digito','ortografia_h'].includes(f.tema))await page.screenshot({path:path.join(out,f.tema+'-pc.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,f.tema);
  await page.setViewportSize({width:1366,height:900});
 }
 report.checks.push('40 escenas presentes en el primer paso, sin tablas como sustituto del dibujo; 40 pantallas sin desborde en móvil');
 await open('decimales_conversion');await page.getByRole('img',{name:'Jarra con medio litro. Capacidad máxima: un litro.'}).waitFor();
 await page.getByRole('button',{name:'Ver cómo se escribe esta cantidad',exact:true}).click();await page.getByText('1/2 de litro = 0,5 L = 500 ml',{exact:true}).waitFor();
 const add=page.getByRole('button',{name:'Agregar un poco',exact:true});await add.focus();await page.keyboard.press('Space');
 await page.getByText('3/4 de litro = 0,75 L = 750 ml',{exact:true}).waitFor();
 await page.getByText('Si una botella dice «cc»',{exact:true}).click();await page.getByText(/750 cc y 750 ml indican/).waitFor();
 await page.screenshot({path:path.join(out,'jarra-750-pc.png'),fullPage:true});
 await add.click();await page.getByText('1 litro = 1 L = 1000 ml',{exact:true}).waitFor();assert(await add.isDisabled());
 const remove=page.getByRole('button',{name:'Sacar un poco',exact:true});for(let i=0;i<4;i++)await remove.click();assert(await remove.isDisabled());await page.getByRole('img',{name:'Jarra sin jugo. Capacidad máxima: un litro.'}).waitFor();
 await add.click();await page.getByText('1/4 de litro = 0,25 L = 250 ml',{exact:true}).waitFor();
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,'jarra-movil.png'),fullPage:true});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 assert.equal(db.writes.length,0);report.checks.push('Exploración por teclado y toque: 0/250/500/750/1000 ml, límites, nombres antes de símbolos, cc opcional, sin guardar aciertos ni errores');
 await open('si_me_la_masa_capacidad_tiempo');await page.getByRole('button',{name:'Jugo en la jarra',exact:true}).click();await page.getByText('En esta jarra cabe hasta un litro. Cambiá lo que hay dentro.',{exact:true}).waitFor();
 await page.getByRole('button',{name:'Tiempo de un juego',exact:true}).click();await page.getByRole('img',{name:/Pasaron cinco minutos/i}).waitFor();
 report.checks.push('Instrumentos de a uno; capacidad constante frente a cantidad variable y duración desde cero hasta cinco minutos');
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
