import fichas from './fichas-modulos.json';
import diagramas from './fichas-diagramas.json';

export const VERSION_FICHAS = 1;
// Cambió la representación, no el requisito curricular. Conservamos lecturas ya hechas.
const REVISION_VISUAL = 2;
// Espacio reservado: 250100..250103. La enseñanza curricular utiliza la lección 1.
export const BASE_LECTURA = 250000 + VERSION_FICHAS * 100;
export function getFichaModulo(tema) { return fichas.find(f => f.tema === tema) || null; }
export function fichaPublica(tema) {
  const ficha = getFichaModulo(tema);
  if (!ficha) return null;
  const { comprobacion, ...contenido } = ficha;
  return { ...contenido, version: VERSION_FICHAS, pdf_url: `/fichas/${tema}.pdf?v=${VERSION_FICHAS}&visual=${REVISION_VISUAL}`,
    diagrama: diagramas[tema] ? {url:`/fichas/diagramas/${tema}.svg?v=${VERSION_FICHAS}&visual=${REVISION_VISUAL}`,alt:diagramas[tema]} : null,
    comprobacion: { pregunta: comprobacion.pregunta, opciones: comprobacion.opciones } };
}
export function estadoLectura(filas = []) {
  const hechos = new Set(filas.filter(f => f.completada).map(f => f.leccion_numero));
  let paso = 0;
  while (paso < 4 && hechos.has(BASE_LECTURA + paso)) paso++;
  return { paso: Math.min(paso, 3), completada: paso === 4, version: VERSION_FICHAS };
}
export async function cargarLectura(db, usuario, tema) {
  const r = await db.from('lecciones_completadas').select('leccion_numero,completada')
    .eq('user_id', usuario).eq('tema', tema).in('leccion_numero', [0,1,2,3].map(n => BASE_LECTURA + n));
  if (r.error) throw Error('No pudimos consultar la lectura guardada. Volvé a intentar.');
  return estadoLectura(r.data || []);
}
export async function exigirLectura(db, usuario, tema, res, payload = {}) {
  const ficha = fichaPublica(tema);
  if (!ficha) throw Error('No encontramos la ficha de este tema.');
  const lectura = await cargarLectura(db, usuario, tema);
  if (lectura.completada) return false;
  res.status(200).json({ ...payload, tipo: 'lectura_modulo', tipo_pregunta: 'lectura_modulo',
    tema, sesion_id: null, ficha, lectura });
  return true;
}
export async function verificarLecturaRespuesta(db, usuario, tema, res) {
  const lectura = await cargarLectura(db, usuario, tema);
  if (lectura.completada) return true;
  res.status(409).json({ error: 'Primero recorramos la ficha del tema. Tu actividad queda guardada.',
    lectura_requerida: true, tema });
  return false;
}
