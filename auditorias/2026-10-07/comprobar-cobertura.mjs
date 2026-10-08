// Auditoría de lectura local: no usa red, IA, cuentas ni base de datos.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CURRICULUM_MATEMATICA, CURRICULUM_LENGUA } from '../../src/lib/curriculum.js';
import { UNIDADES_BASES, crearActividadBase, getCierreBase } from '../../src/lib/contenido-bases.js';
import { getObjetivosParaTema } from '../../src/lib/objetivos-pedagogicos.js';
import { getDiapositivasParaTema } from '../../src/lib/diapositivas.js';

const carpeta = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(carpeta, '../..');
const fichas = JSON.parse(fs.readFileSync(path.join(raiz, 'src/lib/fichas-modulos.json'), 'utf8'));
const diferencias = [];
const temas = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].map(t => {
  const unidades = UNIDADES_BASES.filter(u => u.tema === t.tema);
  const teoria = getDiapositivasParaTema(t.tema);
  const ficha = fichas.find(f => f.tema === t.tema);
  for (const [i, u] of unidades.entries()) {
    const leccion = crearActividadBase(u.id, 'leccion');
    if (!leccion.explicacion_simple || !leccion.ejercicio_practica) diferencias.push(`Lección incompleta: ${u.id}`);
    if (teoria.slides[i]?.titulo !== u.titulo || JSON.stringify(teoria.slides[i]?.visual_apoyo) !== JSON.stringify(u.visual)) diferencias.push(`Repaso desactualizado: ${u.id}`);
  }
  const cierre = getCierreBase(t.tema);
  const url = teoria.pdf_url;
  return {
    ...t,
    fichaInicial: ficha?.title || null,
    objetivosEfectivos: getObjetivosParaTema(t.tema).map(o => ({ id: o.id, titulo: o.titulo })),
    unidadesRevisadas: unidades.length,
    explicacionesSinVisual: unidades.filter(u => !u.visual).length,
    visualesQueSonTablas: unidades.filter(u => u.visual?.tipo === 'datos').length,
    visualesQueSonLecturas: unidades.filter(u => u.visual?.tipo === 'lectura').length,
    pdfRepaso: url || null,
    pdfRepasoExiste: Boolean(url && fs.existsSync(path.join(raiz, 'public', url))),
    diapositivas: teoria.slides.length,
    preguntasCierre: cierre?.preguntas.length || 0,
    preguntasCierreReutilizadas: cierre?.preguntas.filter(p => unidades.some(u => u.id === p.objetivo_id && u.actividades.slice(1).some(a => a.enunciado === p.texto))).length || 0,
  };
});
const resumen = {
  fecha: '2026-10-07',
  alcance: 'Inventario del currículo efectivo y del material fijo. Los conteos no certifican cobertura del programa oficial ni aprendizaje de la alumna.',
  temas: temas.length,
  matematica: temas.filter(t => t.materia === 'matematica').length,
  lengua: temas.filter(t => t.materia === 'lengua').length,
  fichasIniciales: temas.filter(t => t.fichaInicial).length,
  microleccionesFijas: temas.reduce((n, t) => n + t.unidadesRevisadas, 0),
  objetivosEfectivos: temas.reduce((n, t) => n + t.objetivosEfectivos.length, 0),
  sinRepasoFijo: temas.filter(t => !t.diapositivas).map(t => t.tema),
  matematicaSinVisual: temas.filter(t => t.materia === 'matematica').reduce((n, t) => n + t.explicacionesSinVisual, 0),
  matematicaUnidades: temas.filter(t => t.materia === 'matematica').reduce((n, t) => n + t.unidadesRevisadas, 0),
  cierresFijos: temas.filter(t => t.preguntasCierre).length,
  preguntasCierre: temas.reduce((n, t) => n + t.preguntasCierre, 0),
  preguntasCierreReutilizadas: temas.reduce((n, t) => n + t.preguntasCierreReutilizadas, 0),
  diferencias,
};
fs.writeFileSync(path.join(carpeta, 'inventario-cobertura.json'), JSON.stringify({ resumen, temas }, null, 2) + '\n');
console.log(JSON.stringify(resumen, null, 2));
if (diferencias.length) process.exitCode = 1;
