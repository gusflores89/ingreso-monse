import { getTareaManuscrita } from "@/lib/ejercicios-manuscritos";
import { requireMethod } from "@/lib/http";
import { requireAccess } from "@/lib/access";
import { crearTareaManuscrita } from "@/lib/tareas-manuscritas";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const { user_id, tema } = req.body || {};

  if (!user_id || !tema) {
    return res.status(400).json({ error: "user_id y tema requeridos." });
  }

  try {
    const supabase = getSupabaseAdmin();
    const ejercicio = getTareaManuscrita(tema);

    if (!ejercicio) {
      return res.status(404).json({ error: "No hay ejercicio manuscrito para este tema." });
    }

    const tarea = await crearTareaManuscrita(supabase, user_id, tema, ejercicio);
    res.status(200).json({ tarea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
