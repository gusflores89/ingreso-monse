import { requireMethod } from "@/lib/http";
import { requireAccess, hasAccess, getAuthenticatedUserId } from "@/lib/access";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const { tarea_id } = req.body || {};

  if (!tarea_id) {
    return res.status(400).json({ error: "tarea_id requerido." });
  }

  try {
    const supabase = getSupabaseAdmin();

    const isAdmin = hasAccess(req, "admin");
    const userIdAutenticado = getAuthenticatedUserId(req);

    // Fetch the task first to verify ownership
    const { data: tareaExistente, error: fetchError } = await supabase
      .from("tareas_manuscritas")
      .select("user_id")
      .eq("id", tarea_id)
      .single();

    if (fetchError || !tareaExistente) {
      return res.status(404).json({ error: "Tarea no encontrada o inválida." });
    }

    if (!isAdmin && tareaExistente.user_id !== userIdAutenticado) {
      return res.status(403).json({ error: "No autorizado. La tarea no pertenece a este usuario." });
    }

    const tarea = assertSupabaseOk(
      await supabase
        .from("tareas_manuscritas")
        .update({
          estado: "completada",
          fecha_completada: new Date().toISOString(),
        })
        .eq("id", tarea_id)
        .select()
        .single(),
      "No se pudo completar tarea"
    );

    res.status(200).json({ tarea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
