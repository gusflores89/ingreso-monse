import { requireMethod } from "@/lib/http";
import { requireAccess, requireOwnership } from "@/lib/access";
import { getSupabaseAdmin, assertSupabaseOk } from "@/lib/supabaseAdmin";
import { resumirSesionFamiliar } from "@/lib/recorrido-familiar";

export default async function handler(req,res) {
  res.setHeader("Cache-Control","private, no-store");
  if (!requireMethod(req,res,"GET") || !requireAccess(req,res,["student","admin"])) return;
  const {user_id, pagina = "0", vista = "historial"} = req.query || {};
  if (typeof user_id !== "string" || !user_id || user_id.length > 100 || typeof pagina !== "string" || !/^\d{1,6}$/.test(pagina) || !["historial","pendientes"].includes(vista)) return res.status(400).json({error:"Consulta de recorrido inválida."});
  if (!requireOwnership(req,res,user_id)) return;
  try {
    let query = getSupabaseAdmin().from("sesiones").select("id, tema, tipo_pregunta, created_at, es_correcta, pregunta_generada, respuesta_usuario, ia_parametros_usados, contexto_json").eq("user_id",user_id);
    if (vista === "pendientes") query = query.eq("ia_parametros_usados->>revision_pendiente","true");
    const offset = Number(pagina)*20;
    const rows = assertSupabaseOk(await query.order("created_at",{ascending:false}).order("id",{ascending:false}).range(offset,offset+20),"No se pudo leer el recorrido");
    return res.status(200).json({sesiones:rows.slice(0,20).map(resumirSesionFamiliar),hay_mas:rows.length>20,pagina:Number(pagina)});
  } catch (error) { console.error("[recorrido familiar]",error.message); return res.status(500).json({error:"No pudimos cargar este recorrido. Podés volver a intentar."}); }
}
