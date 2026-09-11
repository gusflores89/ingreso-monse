import { setAccessCookie, verifyAccessPassword } from "@/lib/access";

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

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  if (!checkLoginRateLimit(ip)) {
    return res.status(429).json({ error: "Demasiados intentos de inicio de sesión. Probá de nuevo en una hora." });
  }

  const password = String(req.body?.password || "");

  if (!verifyAccessPassword("admin", password)) {
    return res.status(401).json({ error: "Contrasena admin incorrecta." });
  }

  setAccessCookie(res, "admin");
  res.status(200).json({ ok: true });
}
