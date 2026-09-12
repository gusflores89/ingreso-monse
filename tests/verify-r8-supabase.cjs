// Ejecutar solo después de aplicar 008_continuidad_misiones.sql.
// Usa una cuenta sintética y limpia únicamente sus UUID al terminar.
const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict'),{randomUUID}=require('crypto');
require('@next/env').loadEnvConfig(path.resolve(__dirname,'..'),false,{info(){},error(){}});
const {createClient}=require('@supabase/supabase-js');
if(!process.env.SUPABASE_SERVICE_KEY)throw Error('Falta la clave de servidor.');
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
const file=path.join(__dirname,'verify-r8.cjs'),m=new Module(file,module);m.filename=file;m.paths=module.paths;m._compile(fs.readFileSync(file,'utf8').split('\n(async()=>{')[0]+'\nmodule.exports={request,user,envelope};',file);const r=m.exports;
const userId=randomUUID(),sessionId=randomUUID(),name='Verificación técnica R8 '+userId;r.user.id=userId;
const ok=result=>{if(result.error)throw Error(result.error.code+': '+result.error.message);return result.data;};
(async()=>{let created=false;const report={checks:[],cleanup:false};
try{
 ok(await db.from('continuidad_misiones').select('user_id').limit(0));
 ok(await db.from('usuarios').insert({id:userId,nombre:name,fecha_examen:'2027-01-01',codigo_acceso:'R8-'+userId}));created=true;
 ok(await db.from('sesiones').insert({id:sessionId,user_id:userId,tema:'fracciones_concepto',capa:1,tipo_pregunta:'multiple',pregunta_generada:'Actividad sintética R8',ia_parametros_usados:{test_r8:true}}));
 const bodies=['A','B'].map(borrador=>({revision:0,envio_id:randomUUID(),estado:{...r.envelope(),user_id:userId,sesionId:sessionId,borrador}}));
 const initial=await Promise.all(bodies.map(body=>r.request(db,'POST',body)));assert.equal(initial.filter(x=>x.status===200).length,1);assert.equal(initial.filter(x=>x.status===409).length,1);report.checks.push('La clave primaria permite una sola creación concurrente');
 const winner=bodies[initial.findIndex(x=>x.status===200)];assert.equal((await r.request(db,'POST',winner)).output.revision,1);report.checks.push('El reenvío conserva la confirmación y la versión');
 const updates=await Promise.all(['C','D'].map(borrador=>r.request(db,'POST',{revision:1,envio_id:randomUUID(),estado:{...winner.estado,borrador}})));assert.equal(updates.filter(x=>x.status===200).length,1);assert.equal(updates.filter(x=>x.status===409).length,1);report.checks.push('Solo una actualización concurrente avanza la revisión');
 const latest=await r.request(db);assert.equal(latest.output.revision,2);assert(['C','D'].includes(latest.output.estado.borrador));report.checks.push('La lectura recupera la última misión confirmada');
}finally{
 if(created){ok(await db.from('continuidad_misiones').delete().eq('user_id',userId));ok(await db.from('sesiones').delete().eq('id',sessionId).eq('user_id',userId));ok(await db.from('usuarios').delete().eq('id',userId).eq('nombre',name));assert.equal(ok(await db.from('usuarios').select('id').eq('id',userId)).length,0);report.cleanup=true;}
 console.log(JSON.stringify(report,null,2));
}
})().catch(e=>{console.error(e.message);process.exitCode=1});
