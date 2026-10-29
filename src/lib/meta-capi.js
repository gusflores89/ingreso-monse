import crypto from "crypto";
import { pixelIdValido } from "@/lib/analytics";

function sha256(value) {
  return crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
}

/**
 * Conversions API opcional. No envía nombre, email ni otros datos del estudiante:
 * los usuarios son menores. Solo un identificador seudónimo y, si existe, IP y
 * user-agent de la petición que originó el evento.
 */
export async function sendMetaEvent({
  eventName,
  eventId,
  userId,
  value,
  currency = "ARS",
  sourceUrl,
  req,
} = {}) {
  const pixelId = String(process.env.NEXT_PUBLIC_META_PIXEL_ID || "").trim();
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token || !pixelIdValido(pixelId) || !eventName) return { skipped: true };

  const userData = {};
  if (userId) userData.external_id = [sha256(userId)];
  const ip = String(req?.headers?.["x-forwarded-for"] || req?.socket?.remoteAddress || "")
    .split(",")[0]
    .trim();
  const userAgent = req?.headers?.["user-agent"];
  if (ip) userData.client_ip_address = ip;
  if (userAgent) userData.client_user_agent = String(userAgent).slice(0, 512);

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    user_data: userData,
  };
  if (eventId) event.event_id = String(eventId);
  if (sourceUrl) event.event_source_url = sourceUrl;
  if (value != null && Number.isFinite(Number(value))) {
    event.custom_data = { value: Number(value), currency: currency || "ARS" };
  }

  const body = { data: [event] };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const response = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4000),
    });
    return { ok: response.ok, skipped: false };
  } catch (error) {
    console.error("[meta-capi] No se pudo enviar", eventName);
    return { ok: false, skipped: false };
  }
}
