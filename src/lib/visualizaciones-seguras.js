
// Sin cantidades por defecto: representar solamente operaciones inequívocas.
export function visualizacionSegura(tema = "", texto = "") {
  const text = String(texto);
  if (tema.startsWith("tablas_multiplicar")) {
    const matches = [...text.matchAll(/\b(\d+)\s*(?:[x×*]|por|veces)\s*(\d+)\b/gi)];
    if (matches.length !== 1) return null;
    const numero = Number(matches[0][1]), factor = Number(matches[0][2]);
    return numero >= 1 && numero <= 12 && factor >= 1 && factor <= 12 ? { tipo: "tabla_multiplicar", datos: { numero, factor } } : null;
  }
  if (tema === "division_1_digito") {
    const match = text.match(/\b(\d+)\s*(?:[÷/:]|entre|dividido por)\s*(\d+)\b/i) || text.match(/\b(\d+)\s+[^\d.!?]*?\bentre\s+(\d+)\b/i);
    if (!match) return null;
    const total = Number(match[1]), grupos = Number(match[2]);
    return total >= 1 && total <= 120 && grupos >= 1 && grupos <= 12 ? { tipo: "division_repartir", datos: { total, grupos } } : null;
  }
  if (tema === "fracciones_concepto") {
    const matches = [...text.matchAll(/\b(\d+)\s*\/\s*(\d+)\b/g)];
    if (matches.length !== 1) return null;
    const numerador = Number(matches[0][1]), denominador = Number(matches[0][2]);
    return denominador >= 1 && denominador <= 12 && numerador >= 0 && numerador <= denominador ? { tipo: "fraccion_pizza", datos: { numerador, denominador } } : null;
  }
  return null;
}
