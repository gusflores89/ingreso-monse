const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require('C:/Users/gusta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {h,call,fichas}=require('./verify-r25.cjs');
const {getUnidadesPublicas}=h.load('src/lib/apuntes-bases.js',['getUnidadesPublicas']);
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3036';
const out=process.env.TEST_OUTPUT_DIR||'C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r27';
fs.mkdirSync(out,{recursive:true});
function handler(db,own=true,access=true){return h.load('src/pages/api/biblioteca.js',['handler'],{
 ...h.load('src/lib/curriculum.js',['isCurriculumTopic','getTopicMeta']),determinarProximoObjetivo:h.objectives.determinarProximoObjetivo,
 requireAccess:(_,r)=>{if(!access)r.status(401).json({error:'Ingresá'});return access;},
 requireOwnership:(_,r)=>{if(!own)r.status(403).json({error:'Otra cuenta'});return own;},getSupabaseAdmin:()=>db}).handler;}
async function callBiblioteca(db,query,own=true,access=true){let status=200,body;await handler(db,own,access)({method:'GET',query},{setHeader(){},status(n){status=n;return this},json(v){body=v;return this;}});return{status,body};}
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true}),errors=[],db=h.db(),report={checks:[],errors,realDatabase:false};
 try{
  const query={user_id:h.user.id,tema:'fracciones_concepto'};
  assert.equal((await callBiblioteca(db,query,false)).status,403);assert.equal((await callBiblioteca(db,query,true,false)).status,401);
  assert.equal((await callBiblioteca(db,{...query,tema:'desconocido'})).status,400);
  assert.equal((await callBiblioteca(db,query)).body.unidades.length,getUnidadesPublicas(query.tema).length);
  const ctx=await browser.newContext({viewport:{width:1366,height:900}});
  await ctx.route('**/api/fichas?**',async route=>{const p=Object.fromEntries(new URL(route.request().url()).searchParams);const r=await call(db,p,'GET');await route.fulfill({status:r.status,contentType:'application/json',body:JSON.stringify(r.output)});});
  await ctx.route('**/api/biblioteca?**',async route=>{const p=Object.fromEntries(new URL(route.request().url()).searchParams);const r=await callBiblioteca(db,p);await route.fulfill({status:r.status,contentType:'application/json',body:JSON.stringify(r.body)});});
  const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/biblioteca?user_id='+h.user.id,{waitUntil:'networkidle'});
  await page.getByText('40 temas encontrados',{exact:true}).waitFor();assert.equal(await page.locator('article').count(),40);
  for(const text of ['radio','suma de fracciones','perímetro','sujeto','semiplano']){
   await page.getByRole('searchbox').fill(text);assert(await page.locator('article').count()>0,text);assert(await page.locator('details[open] li a').count()>0,text);
  }
  await page.screenshot({path:path.join(out,'biblioteca-busqueda.png'),fullPage:true});
  await page.getByRole('searchbox').fill('');await page.getByRole('button',{name:'Lengua',exact:true}).click();assert.equal(await page.locator('article').count(),14);
  await page.getByRole('button',{name:'Matemática',exact:true}).click();assert.equal(await page.locator('article').count(),26);
  report.checks.push('40 temas, filtros 26/14, búsqueda por subtemas y enlaces al material completo');
  const samples=['prof_frac_clasificar','mat_dec_fraccion','prof_dec_sumar_distintas','prof_dec_escalar','prof_r27_semicircunferencia','prof_r27_plano_semiplano','leng_prof_r27_tu_mi','ort_h_0_observar_palabras','mat_num_suma','mat_num_resta','mat_div_descomponer','prof_dec_restar_reagrupar','prof_r27_porciones_no_unitarias','prof_r27_fraccion_desconocida','prof_r27_receta_conversion_resto','prof_r27_perimetros_unidos','leng_prof_r27_puente_texto_3'];
  const selected=[...new Map([...fichas.map(f=>getUnidadesPublicas(f.tema)[0]),...fichas.flatMap(f=>getUnidadesPublicas(f.tema).filter(u=>samples.includes(u.id)))].map(u=>[u.id,u])).values()];
  for(const u of selected){
   await page.goto(base+`/biblioteca?user_id=${h.user.id}&tema=${u.tema}&unidad=${u.id}`,{waitUntil:'networkidle'});
   await page.getByRole('heading',{name:u.titulo,exact:true}).waitFor();
   if(u.visual.tipo==='lectura')assert(await page.getByText(u.visual.texto,{exact:true}).count()>0,u.id);else assert(await page.getByRole('img').count()>0,u.id);
   await page.getByText(/Consultar esta página no cuenta como práctica/).waitFor();
   assert((await page.locator('a').allTextContents()).some(t=>t.includes('PDF completo')));
   if(samples.includes(u.id))await page.screenshot({path:path.join(out,u.id+'-pc.png'),fullPage:true});
   await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,u.id);
   if(samples.includes(u.id))await page.screenshot({path:path.join(out,u.id+'-movil.png'),fullPage:true});
   await page.setViewportSize({width:1366,height:900});
  }
  assert.equal(db.writes.length,0);assert.deepEqual(errors,[]);
  report.checks.push(`${selected.length} explicaciones en PC/móvil, diagramas o pasajes presentes, sin desbordes ni errores JS, consulta sin escrituras`);
  // A failed progress request cannot invent an achievement or block reading.
  await ctx.unroute('**/api/biblioteca?**');await ctx.route('**/api/biblioteca?**',r=>r.fulfill({status:503,contentType:'application/json',body:'{}'}));
  const u=selected[0];await page.goto(base+`/biblioteca?user_id=${h.user.id}&tema=${u.tema}&unidad=${u.id}`,{waitUntil:'networkidle'});
  await page.getByText(/No pudimos cargar el avance/).waitFor();await page.getByRole('heading',{name:u.titulo,exact:true}).waitFor();
  report.checks.push('Fallo de consulta de progreso conserva la lectura y no presenta logros inventados');
  fs.writeFileSync(path.join(out,'browser-r27.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
