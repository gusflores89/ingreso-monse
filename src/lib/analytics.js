export function pixelIdValido(value) {
  return /^\d{5,20}$/.test(String(value || "").trim());
}

export function clarityIdValido(value) {
  return /^[a-z0-9]{6,32}$/i.test(String(value || "").trim());
}

const pixelConfigurado = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const clarityConfigurado = process.env.NEXT_PUBLIC_CLARITY_ID;

export const META_PIXEL_ID = pixelIdValido(pixelConfigurado) ? String(pixelConfigurado).trim() : "";
export const CLARITY_ID = clarityIdValido(clarityConfigurado) ? String(clarityConfigurado).trim() : "";

export function trackMeta(eventName, params = {}, eventId) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  const options = eventId ? { eventID: String(eventId) } : undefined;
  window.fbq("track", eventName, params || {}, options);
}

export function trackPageView() {
  trackMeta("PageView");
}
