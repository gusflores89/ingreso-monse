
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
    assertSupabaseOk(await db.from("sesiones").update({ ia_parametros_usados: { ...sesion.ia_parametros_usados, ayuda_utilizada: true, resuelto_con_ayuda: true } }).eq("id", id), "No se pudo registrar la ayuda");
    return res.status(200).json({ ok: true });
  } catch { return res.status(500).json({ error: "No se pudo abrir la ayuda. Probá de nuevo." }); }
}
