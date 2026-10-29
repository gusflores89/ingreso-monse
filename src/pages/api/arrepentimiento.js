import { CONTACTO_LEGAL } from "@/lib/legal";
import { sendArrepentimientoEmail } from "@/lib/email";

const intentos = new Map();

function permitir(ip) {
  const ahora = Date.now();
  const registro = intentos.get(ip);
  if (!registro || ahora > registro.resetAt) {
    intentos.set(ip, { count: 1, resetAt: ahora + 3600000 });
    return true;
  }
  if (registro.count >= 5) return false;
  registro.count += 1;
  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido." });

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "local").split(",")[0].trim();
  if (!permitir(ip)) return res.status(429).json({ error: "Demasiados envíos. Probá de nuevo más tarde." });

  const nombreAdulto = String(req.body?.nombre_adulto || "").trim();
  const email = String(req.body?.email || "").trim();
  const fechaCompra = String(req.body?.fecha_compra || "").trim();
  const pagoId = String(req.body?.pago_id || "").trim().slice(0, 40);
  const mensaje = String(req.body?.mensaje || "").trim().slice(0, 2000);

  if (nombreAdulto.length < 2 || nombreAdulto.length > 80) {
    return res.status(400).json({ error: "Escribí el nombre de la persona adulta que contrató." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    return res.status(400).json({ error: "El email de contacto no es válido." });
  }
  if (fechaCompra && !/^\d{4}-\d{2}-\d{2}$/.test(fechaCompra)) {
    return res.status(400).json({ error: "La fecha de compra no es válida." });
  }

  const destino = process.env.CONTACTO_LEGAL_EMAIL;
  if (!destino || !process.env.RESEND_API_KEY) {
    return res.status(503).json({
      error: `El canal todavía no está configurado. Escribí a ${CONTACTO_LEGAL.email} con el asunto «Arrepentimiento».`,
      borrador: true,
    });
  }

  try {
    await sendArrepentimientoEmail({
      destino,
      nombreAdulto,
      email,
      fechaCompra,
      pagoId,
      mensaje,
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[arrepentimiento] No se pudo enviar la solicitud");
    return res.status(502).json({ error: "No pudimos enviar la solicitud. Intentá de nuevo en unos minutos." });
  }
}
