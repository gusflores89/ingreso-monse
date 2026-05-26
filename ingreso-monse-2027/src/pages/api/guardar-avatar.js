import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireMethod } from "@/lib/http";
import { requireAccess } from "@/lib/access";

const AVATARES_VALIDOS = new Set(["atenea", "nyx", "lux", "buho"]);

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const { user_id, avatar, nombre_tutor, color_tema } = req.body || {};

  if (!user_id) {
    return res.status(400).json({ error: "user_id requerido." });
  }

  try {
    const avatarSeguro = AVATARES_VALIDOS.has(avatar) ? avatar : "buho";
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("usuarios")
      .update({
        avatar: avatarSeguro,
        nombre_tutor: nombre_tutor || "Buho",
        color_tema: color_tema || "#D85A30",
      })
      .eq("id", user_id);

    if (error) throw error;

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
