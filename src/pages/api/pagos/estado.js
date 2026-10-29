import { requireMethod } from "@/lib/http";
import { requireAccess, requireOwnership } from "@/lib/access";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { resolverUsuario } from "@/lib/usuarios";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "GET")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const paymentId = String(req.query.payment_id || "").trim();
  const userId = String(req.query.user_id || "").trim();
  if (!/^\d{6,20}$/.test(paymentId) || !userId) {
    return res.status(400).json({ error: "Pago inválido." });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) return res.status(500).json({ error: "Configuración de pagos incompleta." });

  try {
    const usuario = await resolverUsuario(getSupabaseAdmin(), userId);
    if (!usuario) return res.status(404).json({ error: "No se encontró el estudiante." });
    if (!requireOwnership(req, res, usuario.id)) return;

    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!mpRes.ok) return res.status(200).json({ confirmed: false });

    const payment = await mpRes.json();
    const metaUser = String(payment.metadata?.user_id || "");
    if (metaUser !== String(usuario.id)) {
      return res.status(403).json({ error: "El pago no corresponde a esta cuenta." });
    }
    if (payment.status !== "approved") return res.status(200).json({ confirmed: false, status: payment.status });

    return res.status(200).json({
      confirmed: true,
      event_id: paymentId,
      value: payment.transaction_amount,
      currency: payment.currency_id || "ARS",
    });
  } catch (error) {
    console.error("[pagos/estado] No se pudo confirmar el pago");
    return res.status(500).json({ error: "No se pudo confirmar el pago." });
  }
}
