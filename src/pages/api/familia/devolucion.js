import { requireMethod } from "@/lib/http";
import { requireAccess, requireOwnership } from "@/lib/access";
import { getSupabaseAdmin, assertSupabaseOk } from "@/lib/supabaseAdmin";
import { cambiarSesion } from "@/lib/registro-envios";
import { resumirSesionFamiliar } from "@/lib/recorrido-familiar";

export default async function handler(req,res) {
  res.setHeader("Cache-Control","private, no-store");
  if (!requireMethod(req,res,"POST") || !requireAccess(req,res,["student","admin"])) return;
  const {sesion_id,comentario} = req.body || {};
  if (typeof sesion_id !== "string" || !sesion_id || sesion_id.length>100 || typeof comentario !== "string" || !comentario.trim() || comentario.length>2000) return res.status(400).json({error:"Escribí una devolución de hasta 2000 caracteres."});
  try {
    const db = getSupabaseAdmin();
    const s = assertSupabaseOk(await db.from("sesiones").select("user_id").eq("id",sesion_id).maybeSingle(),"No se pudo consultar la entrega");
    if (!s) return res.status(404).json({error:"Entrega no encontrada."});
    if (!requireOwnership(req,res,s.user_id)) return;
    const updated = await cambiarSesion(db,sesion_id,actual => {
      const p = actual.ia_parametros_usados || {};
      if (p.revision_familiar?.comentario === comentario.trim() && !p.revision_pendiente) return null;
      if (!p.revision_pendiente || actual.tipo_pregunta !== "examen_final" || p.envio_en_curso?.hasta > Date.now()) throw Object.assign(new Error("La entrega cambió o todavía se está guardando. Actualizá el recorrido."),{status:409});
      // La devolución no modifica la nota, la maestría ni los aprobados del currículo.
      return {ia_parametros_usados:{...p,revision_pendiente:false,revision_familiar:{comentario:comentario.trim(),fecha:new Date().toISOString()}}};
    });
    return res.status(200).json({sesion:resumirSesionFamiliar(updated)});
  } catch(error) {console.error("[devolución familiar]",error.message);return res.status(error.status || 500).json({error:error.status ? error.message : "No pudimos guardar la devolución. El texto sigue disponible para reintentar."});}
}
