// Prueba contra TEST_BASE_URL (local por defecto). Crea y elimina únicamente una cuenta sintética.
// No intercepta API, no usa la cuenta de Abril y corrige sin llamadas a IA.
const assert=require('assert/strict'),crypto=require('crypto'),path=require('path'),fs=require('fs');
require('@next/env').loadEnvConfig(path.resolve(__dirname,'..'),false,{info(){},error(){}});
const {createClient}=require('@supabase/supabase-js');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/gusta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3031';
const out=process.env.TEST_OUTPUT_DIR || 'C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r22';fs.mkdirSync(out,{recursive:true});
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
const userId=crypto.randomUUID(),name='Verificación técnica R22 navegador '+userId,codigo=('R22-'+userId).toUpperCase();
const password=crypto.randomBytes(24).toString('hex'),salt=crypto.randomBytes(16).toString('hex');
const hash='pbkdf2_sha256$120000$'+salt+'$'+crypto.pbkdf2Sync(password,salt,120000,32,'sha256').toString('hex');
const ok=r=>{if(r.error)throw Error(r.error.code+': '+r.error.message);return r.data;};
const report={base,realDatabase:true,realAPI:true,realAI:false,checks:[],errors:[],cleanup:false};
(async()=>{let browser,created=false;try{
 const {h}=require('./verify-r21.cjs');const {UNIDADES_BASES:units,VERSION_BASES:version}=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES']);
 const curriculum=h.load('src/lib/curriculum.js',['CURRICULUM_MATEMATICA']);
 ok(await db.from('usuarios').insert({id:userId,nombre:name,fecha_examen:'2027-01-01',codigo_acceso:codigo,rasgos_especiales:{plan:'full',modo_paciente:true,access_password_hash:hash}}));created=true;
 const prereqs=curriculum.CURRICULUM_MATEMATICA.map(t=>({id:crypto.randomUUID(),user_id:userId,tema:t.tema,capa:1,tipo_pregunta:'examen_final',pregunta_generada:'Prerrequisito técnico sintético',es_correcta:true,created_at:'2026-09-01',ia_parametros_usados:{}}));
 const prior=units.find(u=>u.id==='frac_con_1_partes_iguales');const history=[0,1,2].map(n=>({id:crypto.randomUUID(),user_id:userId,tema:prior.tema,capa:1,tipo_pregunta:n?'multiple':'leccion',pregunta_generada:n?prior.actividades[n].enunciado:prior.explicacion,es_correcta:true,created_at:'2026-09-01',ia_parametros_usados:{objetivo_id:prior.id,actividad_id:prior.actividades[n].id,contenido_version:version}}));ok(await db.from('sesiones').insert([...prereqs,...history]));
 browser=await chromium.launch({channel:'msedge',headless:true});const ctx=await browser.newContext();const login=await ctx.request.post(base+'/api/login-codigo',{data:{codigo,password}});assert.equal(login.status(),200);
 // next start sets Secure cookies. The test server is HTTP loopback only; keep production cookies untouched.
 if(/^http:\/\/(127\.0\.0\.1|localhost):/.test(base))await ctx.setExtraHTTPHeaders({Cookie:login.headersArray().filter(h=>h.name.toLowerCase()==='set-cookie').map(h=>h.value.split(';')[0]).join('; ')});
 for(const id of ['entrada_contar','entrada_grupos','entrada_repartir','entrada_denominador']){
  const u=units.find(x=>x.id===id);const response=await ctx.request.post(base+'/api/sesion/init',{data:{user_id:userId,tema:u.tema,modo:'REPASO',forzar_practica:false}});assert.equal(response.status(),200);const activity=await response.json();assert.equal(activity.explicacion_simple,u.explicacion);assert.equal(activity.ejercicio_practica.respuesta_correcta,undefined);assert(activity.habilidad_concreta);
  const answer=await ctx.request.post(base+'/api/sesion/respuesta',{data:{user_id:userId,sesion_id:activity.sesion_id,respuesta_usuario:u.actividades[0].respuesta_correcta,envio_id:crypto.randomUUID()}});assert.equal(answer.status(),200);assert.equal((await answer.json()).es_correcta,true);
  const row=ok(await db.from('sesiones').select('*').eq('id',activity.sesion_id).single());assert.equal(row.ia_parametros_usados.provider,'contenido_revisado');assert.equal(row.es_correcta,true);report.checks.push(id+': enseñanza y corrección real guardadas');
  const pdf=await ctx.request.get(base+'/apuntes/bases-'+u.tema+'.pdf');assert.equal(pdf.status(),200);const body=await pdf.body(),local=fs.readFileSync(path.join(__dirname,'../public/apuntes/bases-'+u.tema+'.pdf'));assert.equal(crypto.createHash('sha256').update(body).digest('hex'),crypto.createHash('sha256').update(local).digest('hex'));report.checks.push('PDF publicado coincide con el revisado: '+u.tema);
 }
}catch(e){report.errors.push(e.message);throw e;}finally{
 if(browser)await browser.close();
 if(created){ok(await db.from('usuarios').delete().eq('id',userId).eq('nombre',name));for(const table of ['usuarios','sesiones','continuidad_misiones','lecciones_completadas','progreso'])assert.equal(ok(await db.from(table).select('*').eq(table==='usuarios'?'id':'user_id',userId)).length,0);report.cleanup=true;}
 fs.writeFileSync(path.join(out,'api-real-r22.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
