import { registrarAyuda } from "@/lib/registro-envios";

import { requireAccess, requireOwnership } from "@/lib/access";
import { requireMethod } from "@/lib/http";
import { getSupabaseAdmin, assertSupabaseOk } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST") || !requireAccess(req, res, ["student", "admin"])) return;
  const id = req.body?.sesion_id;
  if (typeof id !== "string" || !id || id.length > 100) return res.status(400).json({ error: "Falta la actividad." });
  try {
    const db = getSupabaseAdmin();
    const sesion = assertSupabaseOk(await db.from("sesiones").select("user_id, ia_parametros_usados").eq("id", id).single(), "No se encontró la actividad");
    if (!requireOwnership(req, res, sesion.user_id)) return;
    const resultado = await registrarAyuda(db, id, req.body);
    return res.status(200).json(resultado);
  } catch (error) { if(error.status) return res.status(error.status).json({error:error.message}); return res.status(500).json({ error: "No se pudo abrir la ayuda. Probá de nuevo." }); }
}
