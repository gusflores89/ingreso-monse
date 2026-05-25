import { requireMethod } from "@/lib/http";
import { requireAccess } from "@/lib/access";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, "admin")) return;

  const { user_id, tema } = req.body || {};

  if (!user_id || !tema) {
    return res.status(400).json({ error: "user_id y tema requeridos." });
  }

  try {
    const supabase = getSupabaseAdmin();

    assertSupabaseOk(
      await supabase.from("lecciones_completadas").upsert(
        {
          user_id,
          tema,
          leccion_numero: 1,
          completada: true,
          fecha_completada: new Date().toISOString(),
        },
        { onConflict: "user_id,tema,leccion_numero" }
      ),
      "No se pudo marcar la leccion como completada"
    );

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
