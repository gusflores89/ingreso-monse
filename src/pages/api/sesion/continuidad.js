import { requireAccess, requireOwnership } from "@/lib/access";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { validarEstadoMision } from "@/lib/estado-mision";

export const config = {api:{bodyParser:{sizeLimit:'160kb'}}};
const ausente = error => ['PGRST205','42P01'].includes(error?.code);
export default async function handler(req,res) {
  res.setHeader('Cache-Control','private, no-store');
  if(!['GET','POST'].includes(req.method)){res.setHeader('Allow','GET, POST');return res.status(405).json({error:'Método no permitido.'});}
  if(!requireAccess(req,res,['student','admin']))return;
  const userId=req.method==='GET'?req.query?.user_id:req.body?.user_id;
  if(typeof userId!=='string' || !userId || userId.length>100)return res.status(400).json({error:'Falta identificar a la alumna.'});
  if(!requireOwnership(req,res,userId))return;
  try {
    const db=getSupabaseAdmin();
    const read=await db.from('continuidad_misiones').select('revision, envio_id, estado, updated_at').eq('user_id',userId).maybeSingle();
    if(ausente(read.error))return res.status(req.method==='GET'?200:503).json({disponible:false,error:'La sincronización todavía no está activada.'});
    if(read.error)throw Error('No se pudo leer la misión guardada.');
    const actual=read.data;
    if(req.method==='GET')return res.status(200).json({disponible:true,revision:actual?.revision || 0,estado:actual?.estado || null});
    const {revision,envio_id}=req.body;
    if(!Number.isSafeInteger(revision) || revision<0 || typeof envio_id!=='string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(envio_id))return res.status(400).json({error:'Versión de guardado inválida.'});
    const estado=validarEstadoMision(req.body.estado,userId);
    // Un reintento de la misma operación devuelve su confirmación sin incrementar versión.
    if(actual?.envio_id===envio_id)return res.status(200).json({revision:actual.revision,envio_id,estado:actual.estado});
    if(revision!==(actual?.revision || 0))return res.status(409).json({error:'Hay una misión más reciente en otro navegador.'});
    if(estado.sesionId){const s=await db.from('sesiones').select('user_id').eq('id',estado.sesionId).maybeSingle();if(s.error)throw Error('No se pudo verificar la actividad.');if(!s.data || s.data.user_id!==userId)return res.status(403).json({error:'La actividad no pertenece a esta cuenta.'});}
    estado.estrellas=Math.max(estado.estrellas,actual?.estado?.estrellas || 0);
    const values={user_id:userId,revision:revision+1,envio_id,estado,updated_at:new Date().toISOString()};
    const result=actual ? await db.from('continuidad_misiones').update(values).eq('user_id',userId).eq('revision',revision).select('revision, envio_id, estado').maybeSingle()
      : await db.from('continuidad_misiones').insert(values).select('revision, envio_id, estado').single();
    if(result.error?.code==='23505' || (!result.error && !result.data))return res.status(409).json({error:'Hay una misión más reciente en otro navegador.'});
    if(result.error)throw Error('No se pudo guardar la misión.');
    return res.status(200).json(result.data);
  } catch(error){console.error('[continuidad]',error.message);return res.status(error.status || 500).json({error:error.status?error.message:'No pudimos sincronizar. El avance local se conserva para reintentar.'});}
}
