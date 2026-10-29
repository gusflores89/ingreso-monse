import crypto from "crypto";
import { UNIDADES_BASES } from "@/lib/contenido-bases";
import { getCurriculumByMateria } from "@/lib/curriculum";
import nombresTemas from "@/lib/nombres-temas.json";

export const DURACION_SIMULACRO_SEGUNDOS = 60 * 60;
export const PREGUNTAS_POR_SIMULACRO = 20;
export const MATERIAS_SIMULACRO = ["matematica", "lengua"];
const GRACIA_ENTREGA_MS = 2 * 60 * 1000;
const OPCION_DE_FIGURA = /^[A-D]$/i;

export function materiaValida(materia) {
  return MATERIAS_SIMULACRO.includes(materia);
}

export function nombreMateria(materia) {
  return materia === "lengua" ? "Lengua" : "Matemática";
}

export function nombreTema(tema) {
  return nombresTemas[tema] || String(tema || "").replaceAll("_", " ");
}

export function preguntaUtilizable(actividad) {
  if (!actividad || actividad.rubrica_escritura) return false;
  const enunciado = String(actividad.enunciado || "").trim();
  if (enunciado.length < 12 || enunciado.length > 700) return false;
  const opciones = (Array.isArray(actividad.opciones) ? actividad.opciones : [])
    .map((opcion) => String(opcion).trim())
    .filter(Boolean);
  if (opciones.length < 2 || opciones.length > 6) return false;
  if (new Set(opciones).size !== opciones.length) return false;
  if (opciones.every((opcion) => OPCION_DE_FIGURA.test(opcion))) return false;
  const correcta = String(actividad.respuesta_correcta ?? "").trim();
  return Boolean(correcta) && opciones.includes(correcta);
}

export function recolectarBanco(materia, unidades = UNIDADES_BASES) {
  const temas = new Set(getCurriculumByMateria(materia).map((item) => item.tema));
  const banco = [];
  const vistos = new Set();
  for (const unidad of unidades) {
    if (!temas.has(unidad.tema)) continue;
    for (const actividad of unidad.actividades || []) {
      if (!preguntaUtilizable(actividad) || vistos.has(actividad.id)) continue;
      vistos.add(actividad.id);
      banco.push({
        id: String(actividad.id),
        tema: unidad.tema,
        enunciado: String(actividad.enunciado).trim(),
        opciones: actividad.opciones.map((opcion) => String(opcion).trim()),
        correcta: String(actividad.respuesta_correcta).trim(),
        explicacion: String(actividad.paso_resuelto || "").trim().slice(0, 400),
      });
    }
  }
  return banco;
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return function rng() {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function barajar(lista, rng) {
  const copia = lista.slice();
  for (let index = copia.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rng() * (index + 1));
    [copia[index], copia[swap]] = [copia[swap], copia[index]];
  }
  return copia;
}

export function elegirPreguntas(banco, cantidad, rng) {
  const porTema = new Map();
  for (const pregunta of barajar(banco, rng)) {
    if (!porTema.has(pregunta.tema)) porTema.set(pregunta.tema, []);
    porTema.get(pregunta.tema).push(pregunta);
  }
  const temas = barajar([...porTema.keys()], rng);
  const elegidas = [];
  let ronda = 0;
  while (elegidas.length < cantidad) {
    let agrego = false;
    for (const tema of temas) {
      const lista = porTema.get(tema);
      if (ronda < lista.length) {
        elegidas.push(lista[ronda]);
        agrego = true;
        if (elegidas.length >= cantidad) break;
      }
    }
    if (!agrego) break;
    ronda += 1;
  }
  return elegidas;
}

function clave(secreto) {
  return crypto.createHash("sha256").update(`ingresomonse-simulacro:${secreto}`).digest();
}

export function sellarIntento(payload, secreto) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", clave(secreto), iv);
  const cifrado = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, cifrado]).toString("base64url");
}

export function abrirIntento(token, secreto) {
  const buffer = Buffer.from(String(token || ""), "base64url");
  if (buffer.length < 29) {
    const error = new Error("Simulacro inválido.");
    error.codigo = "token";
    throw error;
  }
  const iv = buffer.subarray(0, 12);
  const tag = buffer.subarray(12, 28);
  const cifrado = buffer.subarray(28);
  try {
    const decipher = crypto.createDecipheriv("aes-256-gcm", clave(secreto), iv);
    decipher.setAuthTag(tag);
    const json = Buffer.concat([decipher.update(cifrado), decipher.final()]).toString("utf8");
    return JSON.parse(json);
  } catch {
    const error = new Error("Simulacro inválido.");
    error.codigo = "token";
    throw error;
  }
}

export function crearSimulacro({
  materia,
  banco = null,
  semilla = null,
  ahora = Date.now(),
  secreto,
  cantidad = PREGUNTAS_POR_SIMULACRO,
  duracionSegundos = DURACION_SIMULACRO_SEGUNDOS,
} = {}) {
  if (!materiaValida(materia)) {
    const error = new Error("Elegí Matemática o Lengua.");
    error.codigo = "materia";
    throw error;
  }
  if (!secreto) {
    const error = new Error("Falta la clave para armar el simulacro.");
    error.codigo = "config";
    throw error;
  }
  const origen = banco || recolectarBanco(materia);
  const semillaNumero = Number.isInteger(semilla) ? semilla : crypto.randomInt(1, 0x7fffffff);
  const rng = mulberry32(semillaNumero);
  const elegidas = elegirPreguntas(origen, cantidad, rng);
  if (elegidas.length < 8) {
    const error = new Error("Todavía no hay suficientes ejercicios para armar este simulacro.");
    error.codigo = "banco";
    throw error;
  }
  const inicio = ahora;
  const exp = ahora + duracionSegundos * 1000;
  const privadas = elegidas.map((pregunta) => {
    const opciones = barajar(pregunta.opciones, rng);
    return {
      id: pregunta.id,
      tema: pregunta.tema,
      enunciado: pregunta.enunciado,
      opciones,
      correcta: pregunta.correcta,
      explicacion: pregunta.explicacion,
    };
  });
  const token = sellarIntento(
    {
      v: 1,
      materia,
      inicio,
      exp,
      preguntas: privadas.map((pregunta) => ({
        id: pregunta.id,
        correcta: pregunta.correcta,
        explicacion: pregunta.explicacion,
        enunciado: pregunta.enunciado,
        tema: pregunta.tema,
      })),
    },
    secreto
  );
  return {
    materia,
    materia_nombre: nombreMateria(materia),
    duracion_segundos: duracionSegundos,
    inicio,
    exp,
    token,
    preguntas: privadas.map((pregunta, index) => ({
      id: pregunta.id,
      numero: index + 1,
      enunciado: pregunta.enunciado,
      opciones: pregunta.opciones,
      tema: pregunta.tema,
      tema_nombre: nombreTema(pregunta.tema),
    })),
  };
}

export function corregirSimulacro({ token, respuestas = {}, ahora = Date.now(), secreto } = {}) {
  const intento = abrirIntento(token, secreto);
  if (intento?.v !== 1 || !Array.isArray(intento.preguntas)) {
    const error = new Error("Simulacro inválido.");
    error.codigo = "token";
    throw error;
  }
  if (ahora > intento.exp + GRACIA_ENTREGA_MS) {
    const error = new Error("El tiempo de este simulacro ya cerró. Podés empezar otro.");
    error.codigo = "expirado";
    throw error;
  }
  const detalle = intento.preguntas.map((pregunta) => {
    const elegida = String(respuestas?.[pregunta.id] ?? "").trim();
    return {
      id: pregunta.id,
      tema: pregunta.tema,
      tema_nombre: nombreTema(pregunta.tema),
      enunciado: pregunta.enunciado,
      elegida,
      correcta: pregunta.correcta,
      acierto: Boolean(elegida) && elegida === pregunta.correcta,
      explicacion: pregunta.explicacion || "",
    };
  });
  const correctas = detalle.filter((item) => item.acierto).length;
  const total = detalle.length;
  return {
    materia: intento.materia,
    materia_nombre: nombreMateria(intento.materia),
    correctas,
    total,
    porcentaje: total ? Math.round((correctas / total) * 100) : 0,
    fuera_de_tiempo: ahora > intento.exp,
    detalle,
  };
}
