import { requireAccess, requireOwnership } from '@/lib/access';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { isCurriculumTopic } from '@/lib/curriculum';
import { determinarProximoObjetivo } from '@/lib/objetivos-pedagogicos';

// Read-only: browsing an explanation never creates mastery evidence.
export default async function handler(req,res) {
 res.setHeader('Cache-Control','private, no-store');
 if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({error:'Método no permitido.'});}
 if(!requireAccess(req,res,['student','admin']))return;
 const {user_id,tema}=req.query||{};
 if(typeof user_id!=='string'||!user_id||user_id.length>100||typeof tema!=='string'||!isCurriculumTopic(tema))return res.status(400).json({error:'Tema o cuenta inválidos.'});
 if(!requireOwnership(req,res,user_id))return;
 try{
  const db=getSupabaseAdmin(),sesiones=[];
  for(let offset=0;;offset+=500){
   const {data,error}=await db.from('sesiones').select('id,tema,tipo_pregunta,es_correcta,created_at,ia_parametros_usados').eq('user_id',user_id).eq('tema',tema).order('created_at',{ascending:true}).order('id',{ascending:true}).range(offset,offset+499);
   if(error)throw Error('No se pudo leer el avance.');sesiones.push(...(data||[]));if(!data||data.length<500)break;
  }
  const estado=determinarProximoObjetivo(tema,sesiones);
  const unidades=Object.entries(estado.estadosObjetivos||{}).map(([id,s])=>({id,
   etiqueta:s.necesitaRepaso?'Retomar con ayuda':s.explicacionVista&&s.aciertosIndependientes>=2?'Practicada en dos actividades sin ayuda':s.explicacionVista?'Explicada · seguimos practicando':'Por descubrir en la tutoría'}));
  return res.status(200).json({unidades,alcance:'Estas evidencias corresponden al recorrido de aprendizaje; no certifican preparación para el ingreso.'});
 }catch{return res.status(503).json({error:'No pudimos cargar el avance. Podés volver a intentar.'});}
}
