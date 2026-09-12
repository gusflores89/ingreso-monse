// Isolated live PostgREST check. Creates only a labelled synthetic user and session,
// then deletes those exact UUIDs. No reads or writes of any student's history.
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const {randomUUID,createHash}=require('crypto');
require('@next/env').loadEnvConfig(path.resolve(__dirname,'..'),false,{info(){},error(){}});
const {createClient}=require('@supabase/supabase-js');
if(!process.env.SUPABASE_SERVICE_KEY)throw Error('Se requiere una clave de servidor; no se usa la clave pública.');
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
const userId=randomUUID(),sessionId=randomUUID(),name='Verificación técnica R4 '+userId;
const context=vm.createContext({createHash,randomUUID});
const source=fs.readFileSync(path.join(__dirname,'../src/lib/registro-envios.js'),'utf8').replace(/^import[^;]+;\s*/gm,'').replace(/export /g,'');
vm.runInContext(source+';globalThis.r={iniciarEnvio,guardarPasoEnvio,completarEnvio,registrarAyuda};',context);const r=context.r;
const ok=result=>{if(result.error)throw Error(result.error.code+': '+result.error.message);return result.data};
(async()=>{let created=false;const report={project:new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,checks:[],cleanup:false};
try{
 ok(await db.from('usuarios').insert({id:userId,nombre:name,fecha_examen:'2027-01-01',codigo_acceso:'R4-'+userId}));created=true;
 ok(await db.from('sesiones').insert({id:sessionId,user_id:userId,tema:'fracciones_concepto',capa:1,tipo_pregunta:'multiple',pregunta_generada:'Actividad técnica sintética',ia_parametros_usados:{test_r4:true}}));
 const body={sesion_id:sessionId,envio_id:'live_attempt01',respuesta_usuario:'respuesta sintética'};
 const claims=await Promise.allSettled(Array.from({length:4},()=>r.iniciarEnvio(db,sessionId,body)));
 assert.equal(claims.filter(x=>x.status==='fulfilled').length,1);report.checks.push('Una reserva entre cuatro solicitudes concurrentes');
 const attempt=claims.find(x=>x.status==='fulfilled').value;attempt.evaluacion={es_correcta:true,retroalimentacion:'Prueba'};
 await Promise.all([r.guardarPasoEnvio(db,sessionId,attempt,{es_correcta:true,ia_parametros_usados:{resuelto_con_ayuda:false}}),...Array.from({length:6},(_,i)=>r.registrarAyuda(db,sessionId,{envio_id:'live_help000'+i}))]);
 const row=ok(await db.from('sesiones').select('ia_parametros_usados').eq('id',sessionId).single());
 assert.equal(row.ia_parametros_usados.eventos_pedagogicos.length,7);assert.equal(row.ia_parametros_usados.resuelto_con_ayuda,true);assert.equal(row.ia_parametros_usados.eventos_pedagogicos.find(e=>e.id===body.envio_id).con_ayuda,true);report.checks.push('Seis ayudas y la evaluación conservadas bajo concurrencia');
 await r.completarEnvio(db,sessionId,attempt,{es_correcta:true,retroalimentacion:'Prueba'});
 const repeat=await r.iniciarEnvio(db,sessionId,body);assert.equal(repeat.salida.es_correcta,true);report.checks.push('Recibo persistente reproducido sin otro evento');
}finally{
 if(created){
  ok(await db.from('sesiones').delete().eq('id',sessionId).eq('user_id',userId));
  ok(await db.from('usuarios').delete().eq('id',userId).eq('nombre',name));
  assert.equal(ok(await db.from('usuarios').select('id').eq('id',userId)).length,0);
  assert.equal(ok(await db.from('sesiones').select('id').eq('id',sessionId)).length,0);report.cleanup=true;
 }
 console.log(JSON.stringify(report,null,2));
}
})().catch(e=>{console.error(e.message);process.exitCode=1});
