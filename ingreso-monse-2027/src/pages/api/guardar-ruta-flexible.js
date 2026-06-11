import { requireMethod } from "@/lib/http";
import { requireAccess } from "@/lib/access";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const { user_id, ruta_flexible } = req.body || {};

  if (!user_id) {
    return res.status(400).json({ error: "user_id es requerido." });
  }

  try {
    const supabase = getSupabaseAdmin();

    // 1. Resolver el usuario (por ID o por Código de Acceso)
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
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const resolvedUserId = usuario.id;
    const rasgos = usuario.rasgos_especiales || {};
    const updatedRasgos = {
      ...rasgos,
      ruta_flexible: !!ruta_flexible
    };

    assertSupabaseOk(
      await supabase
        .from("usuarios")
        .update({
          rasgos_especiales: updatedRasgos,
          updated_at: new Date().toISOString(),
        })
        .eq("id", resolvedUserId),
      "No se pudo guardar la preferencia de ruta flexible"
    );

    res.status(200).json({ ok: true, ruta_flexible: updatedRasgos.ruta_flexible });
  } catch (error) {
    console.error("[guardar-ruta-flexible] Error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
