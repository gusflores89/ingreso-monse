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

    const tareas = assertSupabaseOk(
      await supabase
        .from("tareas_manuscritas")
        .select("*")
        .eq("user_id", user_id)
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
