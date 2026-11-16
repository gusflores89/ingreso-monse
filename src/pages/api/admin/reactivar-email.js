import { requireAccess } from "@/lib/access";
import { sendReactivationEmail } from "@/lib/email";
import { requireMethod } from "@/lib/http";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { loadUser } from "@/lib/usuarios";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, "admin")) return;

  const { user_id } = req.body || {};
  if (!user_id) {
    return res.status(400).json({ error: "user_id es obligatorio." });
  }

  try {
    const supabase = getSupabaseAdmin();
    const usuario = assertSupabaseOk(await loadUser(supabase, user_id), "Estudiante no encontrado");
    if (!usuario.email) {
      return res.status(400).json({ error: "Este usuario no tiene un email registrado." });
    }

    const { data: cont } = await supabase
      .from("continuidad_misiones")
      .select("estado")
      .eq("user_id", usuario.id)
      .maybeSingle();

    await sendReactivationEmail({
      nombre: usuario.nombre,
      email: usuario.email,
      codigo_acceso: usuario.codigo_acceso,
      nombre_tutor: usuario.rasgos_especiales?.nombre_tutor || usuario.nombre_tutor || "Maomao",
      tema_actual: cont?.estado?.tema || "numeros_naturales_sistema_decimal",
    });

    const fecha = new Date().toISOString();
    const rasgos = {
      ...(usuario.rasgos_especiales || {}),
      ultimo_email_reactivacion: fecha,
    };

    assertSupabaseOk(
      await supabase
        .from("usuarios")
        .update({ rasgos_especiales: rasgos, updated_at: fecha })
        .eq("id", usuario.id),
      "No se pudo registrar la fecha de envío"
    );

    return res.status(200).json({ ok: true, enviado_a: usuario.email, fecha });
  } catch (error) {
    console.error("[api/admin/reactivar-email] Error:", error);
    return res.status(500).json({ error: error.message || "No se pudo enviar el correo de reactivación." });
  }
}
