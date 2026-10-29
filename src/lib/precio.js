/** Precio único del Acceso Completo, en pesos argentinos (no centavos). */
export const PRECIO_ACCESO_COMPLETO_ARS = 19900;

/**
 * Lo que cobra Mercado Pago y lo que muestra la interfaz.
 * `PLAN_FULL_PRICE` sigue pudiendo reemplazarlo en el servidor.
 * Si no está definido, o no es un entero positivo, se usa el valor de este archivo.
 */
export function precioAccesoCompletoArs(env = process.env) {
  const raw = env?.PLAN_FULL_PRICE;
  if (raw == null || String(raw).trim() === "") return PRECIO_ACCESO_COMPLETO_ARS;
  const value = Number.parseInt(String(raw).trim(), 10);
  if (!Number.isFinite(value) || value <= 0) return PRECIO_ACCESO_COMPLETO_ARS;
  return value;
}

export function formatearPesosARS(pesos) {
  const amount = Math.round(Number(pesos) || 0);
  const formatted = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(amount);
  return `$${formatted}`;
}
