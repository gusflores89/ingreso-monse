
export function quitarClaves(value) {
  if (Array.isArray(value)) return value.map(quitarClaves);
  if (!value || typeof value !== "object") return value;
  const result = {};
  for (const [key, v] of Object.entries(value)) {
    if (["respuesta_correcta", "respuestas_correctas", "alternativas_aceptables", "paso_resuelto"].includes(key)) continue;
    result[key] = quitarClaves(v);
  }
  return result;
}
