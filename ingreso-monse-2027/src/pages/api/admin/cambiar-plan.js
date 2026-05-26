import { requireMethod } from "@/lib/http";
import { requireAccess } from "@/lib/access";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, "admin")) return;

  const { user_id, nuevo_plan } = req.body || {};

  if (!user_id || !nuevo_plan) {
    return res.status(400).json({ error: "user_id y nuevo_plan son obligatorios." });
  }

  if (nuevo_plan !== "trial" && nuevo_plan !== "full") {
    return res.status(400).json({ error: "El plan debe ser 'trial' o 'full'." });
  }

  try {
    const supabase = getSupabaseAdmin();

    const usuario = assertSupabaseOk(
      await supabase.from("usuarios").select("*").eq("id", user_id).single(),
      "No se pudo obtener el usuario"
    );

    const rasgos = usuario.rasgos_especiales || {};
    const updatedRasgos = { ...rasgos, plan: nuevo_plan };

    assertSupabaseOk(
      await supabase
        .from("usuarios")
        .update({
          rasgos_especiales: updatedRasgos,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user_id),
      "No se pudo actualizar el plan del usuario"
    );

    res.status(200).json({ ok: true, plan: nuevo_plan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
