import { requireMethod } from '@/lib/http';
import { requireAccess, requireOwnership } from '@/lib/access';
import { assertSupabaseOk, getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { loadUser } from '@/lib/usuarios';
import { canAccessTopicByPlan } from '@/lib/planes';
import { CURRICULUM_MATEMATICA } from '@/lib/curriculum';
import { VERSION_BASES } from '@/lib/metadatos-bases';
import { crearRetoConcreto, evaluarConstruccion, VERSION_CONCRETA, resumirEvidenciaConcreta, HABILIDADES_CONCRETAS } from '@/lib/recorrido-concreto';
import { iniciarEnvio, guardarPasoEnvio, completarEnvio, liberarEnvio } from '@/lib/registro-envios';

export default async function handler(req,res) {
 if(!requireMethod(req,res,'POST') || !requireAccess(req,res,['student','admin']))return;
 const body=req.body || {};let db,envio;
 try {
  if(typeof body.user_id!=='string' || !body.user_id || body.user_id.length>100)throw Object.assign(Error('Falta identificar a la alumna.'),{status:400});
  if(!requireOwnership(req,res,body.user_id))return;
  db=getSupabaseAdmin();
  if(body.accion==='iniciar') {
   const usuario=assertSupabaseOk(await loadUser(db,body.user_id),'No se pudo leer la cuenta');
   if(!CURRICULUM_MATEMATICA.some(t=>t.tema===body.tema) || !canAccessTopicByPlan(usuario,body.tema))throw Object.assign(Error('Tema no disponible.'),{status:403});
   const historia=assertSupabaseOk(await db.from('sesiones').select('id,created_at,ia_parametros_usados').eq('user_id',body.user_id).eq('tipo_pregunta','exploracion').order('created_at',{ascending:true}),'No se pudo leer el recorrido');
   let seleccion=body.habilidad || null;
   if(body.continuar && seleccion) {
    const evidencia=resumirEvidenciaConcreta(historia).find(h=>h.id===seleccion);
    if(evidencia?.independientes>=2)seleccion=HABILIDADES_CONCRETAS[HABILIDADES_CONCRETAS.findIndex(h=>h.id===seleccion)+1]?.id || seleccion;
   }
   const reto=crearRetoConcreto(body.tema,historia,seleccion);
   const fila=assertSupabaseOk(await db.from('sesiones').insert({user_id:body.user_id,tema:body.tema,capa:1,tipo_pregunta:'exploracion',modo:'CONCRETO',pregunta_generada:reto.consigna,es_correcta:null,
    contexto_json:{reto_concreto:reto},ia_parametros_usados:{provider:'recorrido_concreto',concreto_version:VERSION_CONCRETA,habilidad:reto.habilidad,variante:reto.variante}}).select().single(),'No se pudo guardar la actividad');
   return res.status(200).json({...reto,sesion_id:fila.id,tema:body.tema,contenido_version:VERSION_BASES});
  }
  if(typeof body.sesion_id!=='string' || typeof body.respuesta_usuario!=='string' || body.respuesta_usuario.length>2000)throw Object.assign(Error('Respuesta inválida.'),{status:400});
  const sesion=assertSupabaseOk(await db.from('sesiones').select('*').eq('id',body.sesion_id).single(),'No se pudo leer la actividad');
  if(sesion.user_id!==body.user_id)throw Object.assign(Error('La actividad no pertenece a esta cuenta.'),{status:403});
  if(sesion.tipo_pregunta!=='exploracion' || sesion.ia_parametros_usados?.concreto_version!==VERSION_CONCRETA)throw Object.assign(Error('Esta actividad no pertenece al taller.'),{status:400});
  const reto=sesion.contexto_json.reto_concreto;
  const resultado=evaluarConstruccion(reto,body.respuesta_usuario);
  envio=await iniciarEnvio(db,sesion.id,body);if(envio.salida)return res.status(200).json(envio.salida);
  const previo=envio.sesion.ia_parametros_usados;
  const intentos=(previo.eventos_pedagogicos || []).filter(e=>e.estado==='completado' && e.salida?.es_correcta===false).length;
  const ayuda=Boolean(reto.ensenanza || previo.ayuda_utilizada || previo.resuelto_con_ayuda || resultado.modeloVisto || intentos || body.resuelto_con_ayuda);
  const completado=resultado.correcta;
  const salida={es_correcta:resultado.correcta,completado,con_ayuda:ayuda,retroalimentacion:resultado.correcta?resultado.cierre:resultado.pista,intentos:intentos+1,
    decision:{proximo_tema:sesion.tema,modo_recomendado:'CONCRETO'}};
  await guardarPasoEnvio(db,sesion.id,envio,{respuesta_usuario:body.respuesta_usuario,es_correcta:null,retroalimentacion_ia:salida.retroalimentacion,
   ia_parametros_usados:{resuelto_con_ayuda:ayuda,concreto_resultado:{...resultado,completado,independiente:completado && !ayuda,apoyo:ayuda?'matematico':resultado.lectura?'acceso_lector':'ninguno'}}});
  await completarEnvio(db,sesion.id,envio,salida);
  return res.status(200).json(salida);
 }catch(error){if(db && envio)await liberarEnvio(db,body.sesion_id,envio).catch(()=>{});return res.status(error.status || 500).json({error:error.status?error.message:'No pudimos guardar. Tu construcción se conserva; volvé a intentar.'});}
}
