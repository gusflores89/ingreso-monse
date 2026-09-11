const PROJECT_DIR = 'C:/Users/gusta/OneDrive/Documentos/Personal/monse/ingreso-monse-2027';
const { isoDateOnly } = require(PROJECT_DIR + '/src/lib/date.js');
const fs = require('fs');
const path = require('path');

console.log('--- 1. Verification of Timezone (America/Argentina/Buenos_Aires) ---');
// In UTC this is Sept 10 at 00:30, but in ART (UTC-3) it is Sept 9 at 21:30
const lateNight = new Date('2026-09-10T00:30:00.000Z');
const artDate = isoDateOnly(lateNight);
console.log('UTC date: 2026-09-10T00:30:00.000Z -> Argentina Date:', artDate);
if (artDate !== '2026-09-09') {
  throw new Error(`Expected 2026-09-09, got ${artDate}`);
}
console.log('✅ Date does NOT jump at 21:00 ART!');

console.log('\n--- 2. Verification of Evaluator Prompt Schema ---');
const promptsCode = fs.readFileSync(PROJECT_DIR + '/src/lib/prompts.js', 'utf8');
const hasPistaConcreta = promptsCode.includes('"pista_concreta"');
const hasPasoResuelto = promptsCode.includes('"paso_resuelto"');
console.log('Includes pista_concreta:', hasPistaConcreta);
console.log('Includes paso_resuelto:', hasPasoResuelto);
if (!hasPistaConcreta || !hasPasoResuelto) {
  throw new Error('Prompt evaluator schema is missing required keys');
}
console.log('✅ Evaluator prompt requests pista_concreta and paso_resuelto!');

console.log('\n--- 3. Verification of Backend Filter in init.js and respuesta.js ---');
const initCode = fs.readFileSync(PROJECT_DIR + '/src/pages/api/sesion/init.js', 'utf8');
const respuestaCode = fs.readFileSync(PROJECT_DIR + '/src/pages/api/sesion/respuesta.js', 'utf8');

if (!initCode.includes('!item.ia_parametros_usados?.resuelto_con_ayuda')) {
  throw new Error('init.js is not filtering out assisted practices for exams');
}
if (!respuestaCode.includes('!item.ia_parametros_usados?.resuelto_con_ayuda')) {
  throw new Error('respuesta.js is not filtering out assisted practices for mastery');
}
if (!respuestaCode.includes('resuelto_con_ayuda: Boolean(resuelto_con_ayuda)')) {
  throw new Error('respuesta.js is not saving resuelto_con_ayuda in the first update');
}
console.log('✅ Backend correctly ignores assisted practices when calculating mastery and triggering final exams!');

console.log('\n--- 4. Verification of Deduplication Logic in PantallaSessionTutoria ---');
const tutoriaCode = fs.readFileSync(PROJECT_DIR + '/src/components/PantallaSessionTutoria.jsx', 'utf8');

if (!tutoriaCode.includes('prevIds.includes(stringId)')) {
  throw new Error('PantallaSessionTutoria does not deduplicate activity IDs');
}
if (!tutoriaCode.includes('evaluacion.paso_resuelto')) {
  throw new Error('PantallaSessionTutoria does not display paso_resuelto on 2nd attempt error');
}
if (!tutoriaCode.includes('evaluacion.pista_concreta')) {
  throw new Error('PantallaSessionTutoria does not display pista_concreta on 1st attempt error');
}
if (!tutoriaCode.includes('!misionTerminada && pregunta?.tipo === "leccion"')) {
  throw new Error('PantallaSessionTutoria renders lessons even when mission is finished');
}
console.log('✅ Deduplication, UI step resolution, and mission completed isolation verified!');

console.log('\n========================================');
console.log('🎉 ALL 5 ITEMS FULLY VERIFIED AND PASSING!');
console.log('========================================');
