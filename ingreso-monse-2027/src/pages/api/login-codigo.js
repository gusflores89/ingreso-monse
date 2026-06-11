import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { setAccessCookie, verifyAccessPassword, verifyFamilyPassword } from "@/lib/access";

const intentos = new Map(); // ip -> { count, resetAt }

function checkLoginRateLimit(ip) {
  const ahora = Date.now();
  const registro = intentos.get(ip);
  if (!registro || ahora > registro.resetAt) {
    intentos.set(ip, { count: 1, resetAt: ahora + 3600000 }); // 1 hora de reset
    return true;
  }
  if (registro.count >= 10) return false;
  registro.count++;
  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  if (!checkLoginRateLimit(ip)) {
    return res.status(429).json({ error: "Demasiados intentos de inicio de sesión. Probá de nuevo en una hora." });
  }

  const codigo = String(req.body?.codigo || "").trim().toUpperCase();
  const password = String(req.body?.password || "");

  if (!codigo) {
    return res.status(400).json({ error: "Codigo requerido" });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("id, nombre, codigo_acceso, rasgos_especiales")
      .eq("codigo_acceso", codigo)
      .single();

    if (error || !usuario) {
      return res.status(404).json({ error: "Codigo incorrecto. Pedile ayuda a mama/papa." });
    }

    const familyPasswordHash = usuario.rasgos_especiales?.access_password_hash;
    const passwordOk = familyPasswordHash
      ? verifyFamilyPassword(password, familyPasswordHash)
      : verifyAccessPassword("student", password);

    if (!passwordOk) {
      return res.status(401).json({ error: "Contrasena incorrecta. Pedile ayuda a mama/papa." });
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
