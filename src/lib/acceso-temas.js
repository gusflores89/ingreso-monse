import { CURRICULUM_MATEMATICA, CURRICULUM_LENGUA, PRERREQUISITOS } from "./curriculum.js";
import { TEMAS_BASES } from "./metadatos-bases.js";
import { TRIAL_TOPICS } from "./planes.js";

// Única política para iniciar sesiones, dibujar el mapa y mostrar el panel familiar.
// Las fases agrupan temas; los conocimientos previos, no cuotas de otras fases, habilitan el avance.
export function accesoTema(tema, { plan = "full", aprobados = [], rutaFlexible = false } = {}) {
  const conocido = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].some(t => t.tema === tema);
  if (!conocido) return { habilitado: false, pendientes: [], motivo: "Tema no disponible." };
  if (plan === "trial") return { habilitado: TRIAL_TOPICS.includes(tema), pendientes: [],
    motivo: TRIAL_TOPICS.includes(tema) ? "Disponible en la muestra." : "Este tema requiere acceso completo." };
  const completados = new Set(aprobados);
  if (rutaFlexible || completados.has(tema) || TEMAS_BASES.includes(tema)) {
    return { habilitado: true, pendientes: [], motivo: "Disponible para aprender o repasar." };
  }
  const pendientes = (PRERREQUISITOS[tema] || []).filter(t => !completados.has(t));
  return { habilitado: pendientes.length === 0, pendientes,
    motivo: pendientes.length ? "Primero consolidá: " + pendientes.map(t => t.replaceAll("_", " ")).join(", ") + "." : "Disponible para comenzar." };
}
export function temasHabilitados(opciones) {
  return new Set([...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => accesoTema(t.tema, opciones).habilitado).map(t => t.tema));
}
