const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('assert/strict');
const f=path.join(__dirname,'verify-r2.cjs'),m=new Module(f,module);m.filename=f;m.paths=module.paths;m._compile(fs.readFileSync(f,'utf8').split('\n(async()=>{')[0]+'\nmodule.exports={load,db,start,answer,user,objectives};',f);const h=m.exports;
const {UNIDADES_BASES:units,VERSION_BASES:version,getCierreBase}=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','getCierreBase']);
const {validarEscritura,evaluarEscritura}=h.load('src/lib/evaluacion-escritura.js',['validarEscritura','evaluarEscritura']);
const fresh=units.filter(u=>u.id.startsWith('leng_esc_'));
const positive=(a,text)=>({seguridad:'alta',criterios:a.rubrica_escritura.map(c=>({id:c.id,estado:'logrado',cita_respuesta:text,orientacion:''})),fidelidad:{estado:'logrado',cita_respuesta:'',orientacion:''}});
const record=(u,a)=>({id:a.id,user_id:h.user.id,tema:u.tema,tipo_pregunta:'produccion',ia_parametros_usados:{objetivo_id:u.id,contenido_version:version,actividad_id:a.id,modo_sesion:'practica'}});
(async()=>{let checked=0;assert.equal(fresh.length,3);
 for(const u of fresh)for(const a of u.actividades){
  assert.equal(a.opciones,undefined);assert(a.visual.texto);assert(a.rubrica_escritura.length>=1);
  const d=h.db({sesiones:[record(u,a)]}),body={respuesta_usuario:a.respuesta_correcta,envio_id:'accepted_01'};
  const accepted=await h.answer(d,a.id,body,positive(a,body.respuesta_usuario));assert.equal(accepted.es_correcta,true);assert.equal(d.tables.sesiones[0].ia_parametros_usados.evaluacion.provider,'escritura_semantica');checked++;
  const snapshot=JSON.stringify(d.tables);assert.equal(JSON.stringify(await h.answer(d,a.id,body,{})),JSON.stringify(accepted));assert.equal(JSON.stringify(d.tables),snapshot);checked++;
  const invalid=h.db({sesiones:[record(u,a)]});const pending=await h.answer(invalid,a.id,body,{});assert.equal(pending.es_correcta,null);assert.equal(pending.revision_pendiente,true);assert.equal(invalid.tables.sesiones[0].es_correcta,null);assert.equal(h.objectives.determinarProximoObjetivo(u.tema,invalid.tables.sesiones).aciertosIndependientes,0);checked++;
  const help=h.db({sesiones:[record(u,a)]});const bad=positive(a,'Borrador incompleto');bad.criterios[0]={id:'idea1',estado:'revisar',cita_respuesta:'',orientacion:'Volvé al texto y agregá quién hizo la acción.'};
  const feedback=await h.answer(help,a.id,{respuesta_usuario:'Borrador incompleto'},bad);assert.equal(feedback.es_correcta,false);assert.equal(feedback.pista_concreta,bad.criterios[0].orientacion);
  const retry=await h.answer(help,a.id,body,positive(a,body.respuesta_usuario));assert.equal(retry.es_correcta,true);assert.equal(help.tables.sesiones[0].ia_parametros_usados.resuelto_con_ayuda,true);checked++;
 }
 const u=fresh[0],a=u.actividades[0],text='Los estudiantes acomodaron los libros.';
 const ok=positive(a,text);assert.equal(validarEscritura(ok,u,a,text).es_correcta,true);checked++;
 for(const bad of [{...ok,seguridad:'baja'},{...ok,criterios:[]},{...ok,criterios:[{...ok.criterios[0],cita_respuesta:'Palabras que nunca escribió'}]},{...ok,criterios:[{...ok.criterios[0],id:'otro'}]},{...ok,fidelidad:{estado:'revisar',cita_respuesta:'',orientacion:'Revisá quién actuó.'}}]){assert.equal(validarEscritura(bad,u,a,text).es_correcta,null);checked++;}
 assert.equal((await evaluarEscritura(u,a,text,async()=>{throw Error('offline')},JSON.parse)).es_correcta,null);checked++;
 assert.equal((await evaluarEscritura(u,a,text,async()=>'{',JSON.parse)).es_correcta,null);checked++;
 const allBefore=units.filter(x=>!x.id.startsWith('leng_esc_')).flatMap(x=>[0,1,2].map(n=>({id:x.id+n,user_id:h.user.id,tema:x.tema,tipo_pregunta:n?'multiple':'leccion',es_correcta:true,ia_parametros_usados:{objetivo_id:x.id,contenido_version:version,actividad_id:x.actividades[n].id}})));
 const d=h.db({sesiones:allBefore}),lesson=await h.start(d,{tema:u.tema,forzar_practica:false});assert.equal(lesson.output.tipo,'leccion');assert.equal(lesson.output.escritura_guiada,true);assert.equal(lesson.output.ejercicio_practica.rubrica_escritura,undefined);assert.equal(lesson.output.ejercicio_practica.respuesta_correcta,undefined);assert.equal(lesson.output.ejercicio_practica.opciones,undefined);checked++;
 const noVisto=await h.answer(d,lesson.output.sesion_id,{respuesta_usuario:'Mi borrador',no_visto:true},{});assert.equal(noVisto.es_correcta,null);assert(noVisto.pista_concreta);checked++;
 const closure=getCierreBase(u.tema);assert.equal(closure.preguntas.length,3);assert(closure.preguntas.every(q=>q.opciones?.length));assert(closure.revision_cierre.includes(fresh.at(-1).id));assert.equal(h.objectives.esElegibleParaExamenFinal(u.tema,allBefore),false);checked++;
 console.log(JSON.stringify({passed:checked,writingUnits:3,writingActivities:18,realAI:false,realDatabase:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
