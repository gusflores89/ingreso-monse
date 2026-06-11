import { requireMethod } from "@/lib/http";
import { requireAccess } from "@/lib/access";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const { tarea_id, resultado, cantidad_errores, comentario } = req.body || {};

  if (!tarea_id || !resultado) {
    return res.status(400).json({ error: "tarea_id y resultado requeridos." });
  }

  try {
    const supabase = getSupabaseAdmin();

    const tarea = assertSupabaseOk(
      await supabase
        .from("tareas_manuscritas")
        .update({
          estado: "revisada",
          resultado,
          cantidad_errores: cantidad_errores ? Number(cantidad_errores) : null,
          comentario_revisor: comentario || null,
          fecha_revisada: new Date().toISOString(),
        })
        .eq("id", tarea_id)
        .select()
        .single(),
      "No se pudo revisar tarea"
    );

    res.status(200).json({ tarea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
