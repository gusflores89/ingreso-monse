const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require('C:/Users/gusta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const nombres=require('../src/lib/nombres-temas.json');
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3038';
const out=process.env.TEST_OUTPUT_DIR||'C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r28';
fs.mkdirSync(out,{recursive:true});
const snapshot=loc=>loc.evaluate(el=>({text:el.innerText,svg:[...el.querySelectorAll('svg')].map(s=>s.innerHTML).join('|')}));
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const errors=[],writes=[],report={base,temas:[],errors,writes,realDatabase:false};
 try{
  const ctx=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:'reduce'}),page=await ctx.newPage();
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.url().includes('/api/')&&r.method()!=='GET')writes.push({url:r.url(),method:r.method()});});
  for(const tema of Object.keys(nombres)){
   await page.goto(base+`/biblioteca?user_id=verificacion-interaccion&tema=${tema}&explorar=1`,{waitUntil:'domcontentloaded'});
   const lab=page.locator(`[data-explorador-tema="${tema}"]`);
   await lab.getByRole('button',{name:'Volver al ejemplo inicial',exact:true}).waitFor();
   // Wait for the dynamically loaded subject component, not merely its wrapper.
   await page.waitForFunction(t=>{const el=document.querySelector(`[data-explorador-tema="${t}"]`);return el&&el.querySelectorAll('button,input,select').length>1&&!el.innerText.includes('Preparando los objetos');},tema);
   const initial=await snapshot(lab);assert(initial.text.length>160,tema+': explicación ausente');
   assert(!/NaN|Infinity|undefined/.test(initial.text),tema);
   let changed=false,action='';
   const selects=lab.locator('select');
   for(let i=0;i<await selects.count()&&!changed;i++){
    const control=selects.nth(i),current=await control.inputValue(),options=await control.locator('option').evaluateAll(os=>os.filter(o=>!o.disabled&&o.value).map(o=>o.value));
    const next=options.find(o=>o!==current);if(next===undefined)continue;
    await control.selectOption(next);const after=await snapshot(lab);changed=after.text!==initial.text||after.svg!==initial.svg;action='selector';
   }
   const sliders=lab.locator('input[type=range]');
   for(let i=0;i<await sliders.count()&&!changed;i++){
    const control=sliders.nth(i);await control.focus();await control.press((await control.inputValue())===(await control.getAttribute('max'))?'ArrowLeft':'ArrowRight');
    const after=await snapshot(lab);changed=after.text!==initial.text||after.svg!==initial.svg;action='control con teclado';
   }
   const buttons=lab.getByRole('button');
   for(let i=0;i<await buttons.count()&&!changed;i++){
    const button=buttons.nth(i);if(!await button.isVisible()||!await button.isEnabled()||(await button.innerText()).includes('Volver al ejemplo inicial'))continue;
    await button.focus();await button.press('Enter');const after=await snapshot(lab);changed=after.text!==initial.text||after.svg!==initial.svg;action='botón con teclado';
   }
   assert(changed,tema+': ningún control cambió explicación o representación');
   assert(!/NaN|Infinity|undefined/.test((await snapshot(lab)).text),tema+': estado inválido');
   await lab.getByRole('button',{name:'Volver al ejemplo inicial',exact:true}).click();
   assert.equal((await snapshot(lab)).text,initial.text,tema+': reinicio incompleto');
   for(const width of [1366,390]){
    await page.setViewportSize({width,height:900});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,tema+': desborde '+width);
    const small=await lab.locator('button,input,select').evaluateAll(es=>es.filter(e=>e.getBoundingClientRect().width>0).filter(e=>e.getBoundingClientRect().height<40).map(e=>({tag:e.tagName,text:e.textContent.slice(0,40),h:e.getBoundingClientRect().height})));
    assert.deepEqual(small,[],tema+': controles pequeños');
    if(['fracciones_operaciones','numeros_naturales_sistema_decimal','geometria_cuadrilateros_circunferencia','perimetros_simples','comprension_lectora_literal_inferida','verbos_modo_indicativo_tiempos','produccion_escrita_narracion','ortografia_h'].includes(tema))await page.screenshot({path:path.join(out,tema+'-'+width+'.png'),fullPage:true});
   }
   await page.setViewportSize({width:1366,height:900});report.temas.push({tema,action,reinicio:true,pc:true,movil:true});
  }
  const openLab=async tema=>{await page.goto(base+`/biblioteca?user_id=verificacion-interaccion&tema=${tema}&explorar=1`);return page.locator(`[data-explorador-tema="${tema}"]`);};
  let lab=await openLab('fracciones_operaciones');
  await lab.getByRole('button',{name:'1. Dividir en partes del mismo tamaño'}).click();
  assert.match(await lab.innerText(),/1\/2 = 3\/6/);
  await lab.getByRole('button',{name:'2. Reunir el jugo'}).click();
  await lab.getByRole('button',{name:'3. Ver cómo se escribe la cuenta'}).click();
  assert.match(await lab.innerText(),/1\/2 \+ 1\/3 = 3\/6 \+ 2\/6 = 5\/6/);
  const jarras=await lab.locator('svg').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().width));
  assert.equal(jarras.length,3);assert(Math.max(...jarras)-Math.min(...jarras)<1,'Las tres jarras de un litro deben conservar la misma escala visual');
  await page.screenshot({path:path.join(out,'suma-resuelta.png'),fullPage:true});
  await lab.getByLabel('Partes del primer litro').selectOption('4');
  assert.equal(await lab.getByRole('button',{name:'1. Dividir en partes del mismo tamaño'}).count(),1);
  assert.equal(await lab.getByRole('button',{name:'3. Ver cómo se escribe la cuenta'}).count(),0);
  lab=await openLab('division_1_digito');
  await lab.getByRole('button',{name:'Repartir en partes iguales'}).click();
  assert.match(await lab.innerText(),/8 ÷ 4: cada plato recibe 2/);
  lab=await openLab('geometria_cuadrilateros_circunferencia');
  await lab.getByRole('button',{name:'Agregar el otro radio'}).click();
  assert.match(await lab.innerText(),/diámetro: 3 \+ 3 = 6 m/);
  lab=await openLab('perimetros_compuestos');
  const recorrer=lab.getByRole('button',{name:'Recorrer el próximo lado'});
  for(let i=0;i<6;i++)await recorrer.click();
  assert.match(await lab.innerText(),/perímetro completo mide 20 m/);
  assert.equal(await recorrer.isDisabled(),true);
  report.oraculos=['1/2 + 1/3 = 5/6, equivalencias y reinicio al cambiar cantidad','8 ÷ 4 = 2','radio 3 m → diámetro 6 m','recorrido de seis lados → perímetro 20 m'];
  assert.equal(report.temas.length,40);assert.deepEqual(errors,[]);assert.deepEqual(writes,[]);
  fs.writeFileSync(path.join(out,'interacciones.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({temas:report.temas.length,errors,writes,acciones:report.temas.map(t=>t.action)}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
