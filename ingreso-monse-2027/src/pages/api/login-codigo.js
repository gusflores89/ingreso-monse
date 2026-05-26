import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { setAccessCookie, verifyAccessPassword } from "@/lib/access";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const codigo = String(req.body?.codigo || "").trim().toUpperCase();
  const password = String(req.body?.password || "");

  if (!codigo) {
    return res.status(400).json({ error: "Codigo requerido" });
  }

  if (!verifyAccessPassword("student", password)) {
    return res.status(401).json({ error: "Contrasena incorrecta. Pedile ayuda a mama/papa." });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("id, nombre, codigo_acceso")
      .eq("codigo_acceso", codigo)
      .single();

    if (error || !usuario) {
      return res.status(404).json({ error: "Codigo incorrecto. Pedile ayuda a mama/papa." });
    }

    // Persistir preferencias del tutor/avatar de forma atómica para evitar race conditions
    const { avatar, nombre_tutor, color_tema } = req.body || {};
    if (avatar || nombre_tutor || color_tema) {
      const AVATARES_VALIDOS = new Set(["atenea", "nyx", "lux", "buho"]);
      const avatarSeguro = AVATARES_VALIDOS.has(avatar) ? avatar : "buho";
      await supabase
        .from("usuarios")
        .update({
          avatar: avatarSeguro,
          nombre_tutor: nombre_tutor || "Buho",
          color_tema: color_tema || "#D85A30",
        })
        .eq("id", usuario.id);
    }

    setAccessCookie(res, "student");

    res.status(200).json({
      userId: usuario.id,
      nombre: usuario.nombre,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
