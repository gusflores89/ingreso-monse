import { requireMethod } from "@/lib/http";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "GET")) return;

  const { user_id } = req.query || {};

  if (!user_id) {
    return res.status(400).json({ error: "user_id requerido." });
  }

  try {
    const supabase = getSupabaseAdmin();

    let usuario = null;
    const cleanUserId = String(user_id).trim();
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanUserId);

    if (isUUID) {
      const { data, error } = await supabase.from("usuarios").select("*").eq("id", cleanUserId).single();
      if (!error && data) {
        usuario = data;
      }
    }

    if (!usuario) {
      const normalizedCode = cleanUserId.toUpperCase();
      const { data, error } = await supabase.from("usuarios").select("*").eq("codigo_acceso", normalizedCode).single();
      if (!error && data) {
        usuario = data;
      }
    }

    if (!usuario) {
      return res.status(404).json({ error: "Código de acceso o ID de estudiante incorrecto." });
    }

    const resolvedUserId = usuario.id;

    const tareas = assertSupabaseOk(
      await supabase
        .from("tareas_manuscritas")
        .select("*")
        .eq("user_id", resolvedUserId)
        .eq("estado", "completada")
        .order("fecha_completada", { ascending: false }),
      "No se pudieron obtener tareas manuscritas pendientes"
    );

    res.status(200).json({ tareas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
