const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const h = fs.readFileSync(path.join(root, 'src/lib/contenido-h.js'), 'utf8').replace(/export /g, '');
const source = fs.readFileSync(path.join(root, 'src/lib/ampliaciones-lengua-r27.js'), 'utf8').replace(/^import[^;]+;/gm, '').replace(/export /g, '');
const units = vm.runInNewContext(h + '\n' + source + ';UNIDADES_LENGUA_R27');
const get = id => units.find(u => u.id === 'leng_prof_r27_' + id);
const position = id => units.indexOf(get(id));
const ids = ['genero', 'raiz_desinencia', 'perfecto_compuesto', 'futuro_perfecto', 'condicional_compuesto', 'preterito_anterior', 'si_se', 'de_mas', 'diminutivos', 'anza_ez', 'verbos_con_b', 'bi_bis_biz_bio', 'compuestas_tilde', 'antonimos_contexto', 'conectores_temporales'];
const prior = (a, b) => assert.ok(position(a) >= 0 && position(a) < position(b), `${a} debe enseñarse antes de ${b}`);
prior('genero', 'articulos');
prior('infinitivo', 'raiz_desinencia');
prior('personas', 'raiz_desinencia');
prior('raiz_desinencia', 'presente');
prior('participio', 'perfecto_compuesto');
prior('perfecto_compuesto', 'pluscuamperfecto');
prior('pluscuamperfecto', 'futuro_perfecto');
prior('futuro', 'futuro_perfecto');
prior('condicional', 'condicional_compuesto');
prior('futuro_perfecto', 'condicional_compuesto');
prior('condicional_compuesto', 'preterito_anterior');
prior('el_te', 'si_se');
prior('si_se', 'de_mas');
prior('plural_z', 'diminutivos');
prior('oso_eza', 'anza_ez');
prior('bir_buir', 'verbos_con_b');
prior('verbos_con_b', 'bi_bis_biz_bio');
prior('mente', 'compuestas_tilde');
prior('sinonimos', 'antonimos_contexto');
prior('conectores', 'conectores_temporales');

const allIds = units.map(u => u.id);
assert.equal(new Set(allIds).size, allIds.length, 'IDs de unidades únicos');
const practiceTexts = new Set(units.flatMap(u => u.actividades.map(a => a.visual?.texto)).filter(Boolean));
const activityIds = new Set();
for (const id of ids) {
  const u = get(id);
  assert.ok(u && u.visual && u.ejemplo && u.explicacion);
  assert.equal(u.actividades.length, 6);
  assert.equal(u.transferencia.length, 2);
  assert.ok(u.visual.nodos.every(n => n.texto.length <= 80));
  for (const a of [...u.actividades, ...u.transferencia]) {
    assert.ok(!activityIds.has(a.id));
    activityIds.add(a.id);
    assert.equal(new Set(a.opciones).size, a.opciones.length);
    assert.equal(a.opciones.filter(o => o === a.respuesta_correcta).length, 1);
    assert.ok(a.visual.texto && a.paso_resuelto);
  }
  for (const t of u.transferencia) assert.ok(!practiceTexts.has(t.visual.texto), `Transferencia reutilizada: ${t.id}`);
}

// Las formas solicitadas deben estar enseñadas y corresponder al sujeto explícito.
const forms = {
  perfecto_compuesto: { yo: 'he', nosotros: 'hemos', ella: 'ha', ellos: 'han' },
  futuro_perfecto: { yo: 'habré', nosotros: 'habremos', ella: 'habrá', ellos: 'habrán' },
  condicional_compuesto: { yo: 'habría', nosotros: 'habríamos', ellas: 'habrían', nosotras: 'habríamos' },
  preterito_anterior: { yo: 'hube', ella: 'hubo', nosotros: 'hubimos', ellos: 'hubieron' },
};
const clozes = {
  perfecto_compuesto: [[1, 'yo'], [2, 'nosotros'], [3, 'ella'], [4, 'ellos']],
  futuro_perfecto: [[1, 'yo'], [2, 'nosotros'], [3, 'ella'], [4, 'ellos'], [7, 'yo']],
  condicional_compuesto: [[2, 'yo'], [3, 'nosotros'], [4, 'ellas'], [7, 'nosotras']],
  preterito_anterior: [[2, 'yo'], [3, 'ella'], [4, 'nosotros'], [5, 'ellos']],
};
for (const [id, cases] of Object.entries(clozes)) {
  const u = get(id), tasks = [...u.actividades, ...u.transferencia];
  const teaching = [u.explicacion, u.ejemplo, ...u.pasos].join(' ');
  for (const [index, subject] of cases) {
    assert.match(tasks[index].visual.texto.toLowerCase(), new RegExp(`\\b${subject}\\b`));
    assert.equal(tasks[index].respuesta_correcta, forms[id][subject], `${id}: sujeto ${subject}`);
    assert.ok(teaching.includes(forms[id][subject]), 'La forma aparece en el modelo consultable');
  }
}

// Casos de contraste lingüístico que no deben convertirse en correcciones injustas.
const gender = get('genero').actividades;
assert.equal(gender[2].visual.texto, 'el mapa');
assert.equal(gender[2].respuesta_correcta, 'Masculino');
assert.equal(gender[3].visual.texto, 'la mano');
assert.equal(gender[3].respuesta_correcta, 'Femenino');
assert.match(get('genero').explicacion, /no tiene sexo/);
assert.equal(get('perfecto_compuesto').actividades[5].respuesta_correcta, 'Nosotros hemos cantado');
assert.equal(get('perfecto_compuesto').actividades[0].respuesta_correcta, 'Antes');
assert.equal(get('futuro_perfecto').actividades[0].respuesta_correcta, 'Antes de ese momento');
for (const index of [0, 5]) {
  assert.match(get('condicional_compuesto').actividades[index].visual.texto, /no (?:fui|entramos)/);
  assert.equal(get('condicional_compuesto').actividades[index].respuesta_correcta, 'No');
}
assert.equal(get('preterito_anterior').actividades[0].respuesta_correcta, 'Terminó la carta');
assert.equal(get('preterito_anterior').actividades[1].respuesta_correcta, 'Cerró la puerta');
assert.match(get('preterito_anterior').explicacion, /poco habitual/);
// Claves contrastadas por significado; no se acepta marcar por simple presencia de tildes.
for (const [id, expected] of Object.entries({
  si_se: ['Sí', 'Si', 'sé', 'se', 'Sé', 'Si', 'Sí', 'sé'],
  de_mas: ['dé', 'de', 'más', 'mas', 'dé', 'de', 'más', 'mas'],
  diminutivos: ['c', 's', 's', 'c', 'c', 's', 'c', 's'],
  compuestas_tilde: ['decimoséptimo', 'teórico-práctico', 'decimosexto', 'físico-químico', 'decimoséptimo', 'teórico-práctico', 'baloncesto', 'histórico-artístico'],
  antonimos_contexto: ['oscura', 'confusa', 'pesada', 'largo', 'vacío', 'cerrada', 'bajo', 'clara'],
  conectores_temporales: ['Preparar la mochila', 'Guardar los libros', 'Suceden al mismo tiempo', 'Servir', 'después', 'mientras', 'Dejar enfriar', 'Aplausos y saludos ocurren al mismo tiempo'],
})) {
  const u = get(id);
  [...u.actividades, ...u.transferencia].forEach((a, i) => assert.equal(a.respuesta_correcta, expected[i], a.id));
}
const models = {
  diminutivos: ['nubecita', 'casita', 'mesita', 'solcito', 'panecillo', 'osito'],
  verbos_con_b: ['había', 'debo', 'bebo', 'cabe', 'sabe', 'sorbo'],
  bi_bis_biz_bio: ['bicicleta', 'bicolor', 'biografía', 'microbio', 'bisnieto', 'bizcocho'],
};
for (const [id, expected] of Object.entries(models)) {
  const u = get(id), teaching = [u.explicacion, u.ejemplo, ...u.pasos].join(' ').toLowerCase();
  for (const word of expected) assert.ok(teaching.includes(word), `Modelo no enseñado: ${word}`);
  u.actividades.forEach((a, i) => {
    const completed = a.visual.texto.replace('_', a.respuesta_correcta).toLowerCase();
    assert.ok(completed.includes(expected[i]), `La sustitución no forma ${expected[i]}: ${completed}`);
  });
}
assert.match(get('verbos_con_b').pasos.join(' '), /No todas las formas muestran la B/);
assert.match(get('diminutivos').explicacion, /no todos los diminutivos llevan C/);
assert.equal(activityIds.size, 120);
console.log(`Lengua R27: ${ids.length} puentes, 120 actividades, 30 transferencias reservadas; secuencia, modelos de haber, escritura por familias y contrastes lingüísticos verificados. Catálogo: ${units.length} unidades.`);
