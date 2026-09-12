import { requireAccess, requireOwnership } from "@/lib/access";
import { getSupabaseAdmin, assertSupabaseOk } from "@/lib/supabaseAdmin";
import { loadUser } from "@/lib/usuarios";
import { getUserPlan } from "@/lib/planes";
import { cargarHistorialRepasos, planificarRepasos, VERSION_REPASOS } from "@/lib/repasos-espaciados";
import { crearActividadBase, getUnidadBase, VERSION_BASES } from "@/lib/contenido-bases";
import { quitarClaves } from "@/lib/contrato-actividad";

export default async function handler(req,res) {
 res.setHeader('Cache-Control','private, no-store');
 if(!['GET','POST'].includes(req.method))return res.status(405).json({error:'Método no permitido.'});
 if(!requireAccess(req,res,['student','admin']))return;
 const userId=req.method==='GET'?req.query.user_id:req.body?.user_id;
 if(typeof userId!=='string' || !userId || userId.length>100)return res.status(400).json({error:'Falta identificar a la alumna.'});
 if(!requireOwnership(req,res,userId))return;
 try{
  const db=getSupabaseAdmin();
  const usuario=assertSupabaseOk(await loadUser(db,userId),'No se encontró la alumna');
  if(!usuario)return res.status(404).json({error:'No se encontró la alumna.'});
  const plan=getUserPlan(usuario),historial=await cargarHistorialRepasos(db,userId);
  const repasos=planificarRepasos(historial,{plan,rutaFlexible:Boolean(usuario.rasgos_especiales?.ruta_flexible)});
  if(req.method==='GET')return res.status(200).json({repasos:repasos.filter(r=>r.disponible).slice(0,3),proximos:repasos.filter(r=>!r.disponible).slice(0,3)});
  const objetivo=req.body?.objetivo_id;
  if(typeof objetivo!=='string' || !getUnidadBase(objetivo))return res.status(400).json({error:'Ese repaso no está disponible.'});
  const repaso=repasos.find(r=>r.objetivo_id===objetivo && r.disponible);
  if(!repaso)return res.status(409).json({error:'Este repaso ya está al día o todavía necesita enseñanza previa.'});
  // Una recarga o un reenvío retoma la misma actividad abierta.
  const abierta=historial.findLast(s=>s.es_correcta===null && s.ia_parametros_usados?.objetivo_id===objetivo && s.ia_parametros_usados?.repaso_espaciado && s.ia_parametros_usados?.contenido_version===VERSION_BASES);
  if(abierta){
   const fila=assertSupabaseOk(await db.from('sesiones').select('contexto_json').eq('id',abierta.id).eq('user_id',userId).single(),'No se pudo retomar');
   if(fila?.contexto_json?.repaso)return res.status(200).json(quitarClaves({...fila.contexto_json.repaso,sesion_id:abierta.id,plan}));
  }
  const modo=repaso.necesita_explicacion?'leccion':'practica';
  const actividad={...crearActividadBase(objetivo,modo,historial),tema:repaso.tema,capa:1,repaso_espaciado:true,objetivo_id:objetivo,
    tipo_pregunta:modo==='leccion'?'leccion':'multiple',examen_disponible:false,examen_pendiente:false};
  actividad.pregunta=modo==='leccion'?actividad.ejercicio_practica.enunciado:actividad.pregunta;
  const fila=assertSupabaseOk(await db.from('sesiones').insert({user_id:userId,tema:repaso.tema,capa:1,modo:'REPASO_ESPACIADO',tipo_pregunta:actividad.tipo_pregunta,
   pregunta_generada:actividad.pregunta,contexto_json:{repaso:actividad,leccion:modo==='leccion'?actividad:null},
   ia_parametros_usados:{objetivo_id:objetivo,actividad_id:actividad.actividad_id,contenido_version:VERSION_BASES,repaso_espaciado:true,version_repasos:VERSION_REPASOS,provider:'contenido_revisado',modo_sesion:modo}
  }).select().single(),'No se pudo guardar el repaso');
  return res.status(200).json(quitarClaves({...actividad,sesion_id:fila.id,plan}));
 }catch(error){console.error('[repasos]',error.message);return res.status(500).json({error:'No pudimos preparar el repaso. Tu misión sigue disponible.'});}
}
