const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'src/lib/ampliaciones-matematica-r27.js'), 'utf8');
const units = vm.runInNewContext(source.replace(/export const /g, 'const ') + ';UNIDADES_MATEMATICA_R27');
const base = fs.readFileSync(path.join(root, 'src/lib/contenido-bases.js'), 'utf8');
const oldIds = new Set([...base.matchAll(/"id": "([^"]+)"/g)].map(m => m[1]));
const curriculum = fs.readFileSync(path.join(root, 'src/lib/curriculum.js'), 'utf8');
const topics = new Set([...curriculum.matchAll(/tema: "([^"]+)"/g)].map(m => m[1]));
const unitMap = new Map(units.map(u => [u.id, u]));
const questionIds = new Set();
const normalize = text => text.normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' ');
const practicePrompts = new Set(units.flatMap(u => u.actividades.map(a => normalize(a.enunciado))));
let checks = 0;
function eq(actual, expected, message) { assert.equal(actual, expected, message); checks++; }
function num(id, index, expected) {
  const u = unitMap.get('prof_r27_' + id);
  const activity = [...u.actividades, ...u.transferencia][index];
  const actual = Number(activity.respuesta_correcta.match(/^\d+(?:,\d+)?/)[0].replace(',', '.'));
  assert.ok(Math.abs(actual - expected) < 1e-9, `${u.id} ${index}: ${actual} != ${expected}`);
  checks++;
}
function key(id, index, expected) {
  const u = unitMap.get('prof_r27_' + id);
  eq([...u.actividades, ...u.transferencia][index].respuesta_correcta, expected, `${id} ${index}`);
}

eq(units.length, 36, 'Unidades completas, no stubs');
for (const u of units) {
  assert.ok(topics.has(u.tema), u.tema);
  assert.ok(u.id.startsWith('prof_r27_'));
  eq(u.actividades.length, 6, u.id);
  eq(u.transferencia.length, 2, u.id);
  assert.ok(u.visual && u.explicacion && u.ejemplo && u.pasos.length >= 2 && u.pista, u.id);
  const anchor = u.antes_de || u.despues_de;
  assert.ok(oldIds.has(anchor) || unitMap.has(anchor), `${u.id}: ancla ${anchor}`);
  if (unitMap.has(anchor)) eq(unitMap.get(anchor).tema, u.tema, 'Ancla del mismo tema');
  for (const a of [...u.actividades, ...u.transferencia]) {
    assert.ok(!questionIds.has(a.id), `ID duplicado: ${a.id}`);
    questionIds.add(a.id);
    eq(a.opciones.length, 3, a.id);
    eq(new Set(a.opciones.map(normalize)).size, 3, a.id);
    eq(a.opciones.filter(o => o === a.respuesta_correcta).length, 1, a.id);
    assert.ok(a.paso_resuelto && a.pista_concreta, a.id);
    for (const v of [a.visual].filter(Boolean)) validateVisual(v);
  }
  for (const a of u.transferencia) assert.ok(!practicePrompts.has(normalize(a.enunciado)), `Transferencia reutiliza práctica: ${a.id}`);
  validateVisual(u.visual);
}
function validateVisual(v) {
  if (v.tipo === 'recta') {
    assert.ok(v.max > v.min && v.paso > 0);
    for (const m of v.marcas || []) assert.ok(m.valor >= v.min && m.valor <= v.max);
  }
  if (v.tipo === 'barras') {
    eq(v.etiquetas.length, v.valores.length);
    assert.ok(v.valores.length <= 6 && v.valores.every(n => n >= 0));
    assert.ok(v.paso > 0);
  }
  if (v.tipo === 'fracciones') {
    assert.ok(v.barras.length <= 3);
    assert.ok(v.barras.every(b => b.partes.length > 0 && b.partes.every(p => ['p', 'q', 's', 'v'].includes(p))));
  }
  if (v.tipo === 'mapa') {
    assert.ok(v.nodos.length >= 2 && v.nodos.length <= 3);
    assert.ok(v.nodos.every(n => n.texto.length <= 80));
  }
  if (v.tipo === 'angulo' && v.divisiones) {
    assert.ok(v.divisiones.every(n => n > 0 && n < v.angulo));
    eq(v.etiquetas_sectores.length, v.divisiones.length + 1);
  }
}

// Comprobación matemática independiente de las claves: reconstruir y volver a aplicar la fracción.
[[4, 2], [6, 2], [2, 3], [2, 4], [3, 5], [4, 3], [7, 2], [2, 4]].forEach(([part, pieces], i) => num('entero_desde_una_parte', i, part * pieces));
[[8, 2, 3], [5, 1, 2], [3, 1, 4], [9, 3, 4], [6, 2, 5], [20, 4, 5], [10, 2, 3]].forEach(([known, n, d], i) => num('entero_desde_parte', i, known * d / n));
num('entero_desde_parte', 7, (12 / 3) * (5 - 3));
[[8, 1, 3], [7, 1, 2], [4, 3, 4], [9, 1, 4], [12, 2, 5], [16, 1, 5]].forEach(([rest, used, denominator], i) => {
  const initial = rest * denominator / (denominator - used);
  num('resto_inverso', i, initial);
  assert.ok(Math.abs(initial * (1 - used / denominator) - rest) < 1e-9);
});
num('resto_inverso', 6, 18 / 3);
num('resto_inverso', 7, 5 * 3);
[[3, 1 / 2, 1 / 2], [5, 1 / 2, 1 / 2], [4, 1 / 3, 1 / 2], [2, 1 / 2, 2 / 3], [6, 1 / 4, 1 / 3], [2, 1 / 3, 3 / 4]].forEach(([rest, first, second], i) => num('dos_restos_inversos', i, rest / (1 - second) / (1 - first)));
num('dos_restos_inversos', 6, 7 * 2);
num('dos_restos_inversos', 7, 5 * 3);

num('decimal_posicion', 0, 3 / 10);
num('decimal_posicion', 5, 2 + 7 / 100);
num('decimal_posicion', 7, 0.1 + 0.1);
key('decimales_periodicos', 0, '3');
key('decimales_periodicos', 1, '27');
key('decimales_periodicos', 5, '6');
num('decimales_periodicos', 6, '142857'.length);
[3 ** 1, 7 ** 1, 5 ** 0, 10 ** 0, 2 ** 2, 4 ** 0].forEach((n, i) => num('exponentes_uno_cero', i, n));
key('exponentes_uno_cero', 6, 8 ** 0 > 2 ** 1 ? '8⁰' : '2¹');
num('exponentes_uno_cero', 7, 1000 / 10 / 10 / 10);
[[0, 2 ** 3], [2, 3 ** 3], [3, 1 ** 3], [4, 4 ** 3], [5, 5 ** 3], [6, 2 ** 3 - 4]].forEach(([i, n]) => num('cubo_capas', i, n));
[12 / 3 * 2, 18 / 3 * 2, 16 / 4 / 2, 10 - 3 + 2, 5 + 12 / 3 * 2, 2 ** 2 + 8 / 2, 24 / 4 * 2, 15 - 6 + 3].forEach((n, i) => num('jerarquia_igual', i, n));

// Cada opción con paréntesis se calcula: solo una alcanza la cantidad requerida.
const parentheses = unitMap.get('prof_r27_colocar_parentesis');
const targets = [20, 4, 18, 3, 2, 16, 18, 30];
for (const [i, activity] of [...parentheses.actividades, ...parentheses.transferencia].entries()) {
  const evaluated = activity.opciones.map(option => {
    const expression = option.replaceAll('×', '*').replaceAll('÷', '/');
    assert.match(expression, /^[\d\s()+*/−-]+$/);
    return vm.runInNewContext(expression.replaceAll('−', '-'));
  });
  eq(evaluated.filter(n => n === targets[i]).length, 1, activity.id);
  eq(evaluated[activity.opciones.indexOf(activity.respuesta_correcta)], targets[i], activity.id);
}

const kite = unitMap.get('prof_r27_romboide_diagonales').visual.puntos;
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
eq(dist(kite[0], kite[1]), dist(kite[0], kite[3]), 'Romboide: primer par consecutivo igual');
eq(dist(kite[2], kite[1]), dist(kite[2], kite[3]), 'Romboide: segundo par consecutivo igual');
num('romboide_diagonales', 7, 5 + 5 + 3 + 3);
[3.14 * 10 / 2, 3.14 * 10 / 2 + 10, 3.14 * 20 / 2, 12.56 + 8, 3.14 * (3 * 2) / 2, (15.7 + 10) * 2, 3.14 * 4 / 2, (31.4 + 20) * 3].forEach((n, i) => num('semicircunferencia', i, n));
[(18 - 5 * 2) / 2, 15 - 4 - 5, (24 - 8 * 2) / 2, 28 / 4, (30 - 9 * 2) / 2, (20 - 6) / 2, (28 - 10 * 2) / 2, 40 - 2 * 12].forEach((n, i) => num('lado_desde_perimetro', i, n));

// Las respuestas de los gráficos se contrastan con sus datos reales.
const graphs = unitMap.get('prof_r27_grafico_barras');
num('grafico_barras', 0, graphs.actividades[0].visual.valores[0]);
num('grafico_barras', 1, graphs.actividades[1].visual.valores[1]);
key('grafico_barras', 2, graphs.actividades[2].visual.etiquetas[graphs.actividades[2].visual.valores.indexOf(Math.max(...graphs.actividades[2].visual.valores))]);
num('grafico_barras', 3, graphs.actividades[3].visual.valores[1] - graphs.actividades[3].visual.valores[0]);
num('grafico_barras', 4, graphs.actividades[4].visual.valores.reduce((a, b) => a + b, 0));
eq(graphs.actividades[5].visual.valores[0], graphs.actividades[5].visual.valores[2]);
num('grafico_barras', 6, 3 * 4);
num('grafico_barras', 7, graphs.transferencia[1].visual.valores.reduce((a, b) => a + b, 0) * 2);
function gcd(a, b) { return b ? gcd(b, a % b) : a; }
function fraction(n, d) { const g = gcd(n, d); return `${n / g}/${d / g}`; }
[[4, 12], [6, 12], [2, 8], [6, 12], [8, 12], [5, 20], [8 / 2, 12], [6, 6 + 2 + 4]].forEach(([n, d], i) => key('grafico_fraccion', i, fraction(n, d)));
[[0, 8 / 4 * 2], [1, 18 / 6 * 2], [2, 6 / 3 * 5], [3, 12 / 8 * 4], [5, 3 / 2 * 6], [7, 10 / (6 / 3)]].forEach(([i, n]) => num('proporcion_reducir', i, n));
key('proporcion_reducir', 4, `${fraction(2, 4)} cucharada`);

[7 + 4, 12 + 3, 8 - 4, 11 + 5, 10 + 5, 10 + 5, 2 + 4 * 3].forEach((n, i) => num('sucesion_descubrir', i, n));
[2 * 3 - 2, 4 * 3 - 2, 10 * 3 - 2].forEach((n, i) => num('sucesion_dos_pasos', i, n));
num('sucesion_dos_pasos', 4, 5 * 2 + 3);
num('sucesion_dos_pasos', 5, (5 - 1) * 2);
num('sucesion_dos_pasos', 6, (3 * 2 + 1) * 2 + 1);
num('sucesion_dos_pasos', 7, (3 * 3 - 2) * 3 - 2);

function roman(n) {
  let answer = '';
  for (const [value, symbol] of [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]) {
    while (n >= value) { answer += symbol; n -= value; }
  }
  return answer;
}
[24, 4, 9, 14, 19, 40, 28 + 1, 49].forEach((n, i) => key('romanos_escribir', i, roman(n)));
key('sucesion_descubrir', 7, roman(7 + 4));

function lcm(a, b) { return a * b / gcd(a, b); }
num('elegir_mcm_mcd', 0, lcm(2, 3));
num('elegir_mcm_mcd', 1, gcd(8, 12));
key('elegir_mcm_mcd', 2, `A los ${lcm(4, 6)} minutos`);
num('elegir_mcm_mcd', 3, gcd(6, 9));
num('elegir_mcm_mcd', 6, gcd(12, 18));
num('elegir_mcm_mcd', 7, lcm(4, 10));

const plane = unitMap.get('prof_r27_plano_semiplano').visual;
const pointByName = new Map(plane.puntos.map(p => [p.label, p]));
assert.ok(pointByName.get('A').y > plane.recta_y && pointByName.get('B').y > plane.recta_y);
assert.ok(pointByName.get('C').y < plane.recta_y);
eq(pointByName.get('O').y, plane.recta_y);
[90 - 35, 20 + 30, 180 - 70, 120 - 45, 20 + 25 + 35, 100 - 30 - 20, 25 + 40, 90 - 60].forEach((n, i) => num('angulos_compuestos', i, n));
[[0, 24 / 6], [1, 18 / 6], [2, 30 / 6 * 2], [3, 36 / 6], [4, 42 / 6 * 2], [6, 30 / 6 * 2 * 2], [7, 24 / 6 * 3]].forEach(([i, n]) => num('perimetro_lado_doble', i, n));
key('perimetro_lado_doble', 5, `${48 / 6} cm y ${48 / 6 * 2} cm`);
[8 - 3, 6 - 2, 8 + 2 + 5 + 4 + 3 + 6, 10 - 4, 9 - 4, 10 + 3 + 6 + 4 + 4 + 7, 8 + 2 + 5 + 4 + 3 + 6 - 2, (10 + 3 + 6 + 4 + 4 + 7) * 2].forEach((n, i) => num('perimetro_varios_tramos', i, n));
const lshape = unitMap.get('prof_r27_perimetro_varios_tramos').visual.puntos;
eq(lshape.reduce((total, p, i) => total + dist(p, lshape[(i + 1) % lshape.length]), 0), 28);

const turnDiagram = unitMap.get('prof_r27_giros').visual;
const originalArrow = turnDiagram.puntos;
const rotatedArrow = turnDiagram.auxiliares[0].slice(0, -1);
for (let i = 0; i < originalArrow.length; i++) {
  const p = originalArrow[i], q = rotatedArrow[i];
  assert.ok(Math.abs(p[0] - (-q[1])) < 1e-9 && Math.abs(p[1] - q[0]) < 1e-9, 'Giro horario de 90 grados');
  assert.ok(Math.abs(Math.hypot(...p) - Math.hypot(...q)) < 1e-9, 'Conserva distancia al centro');
}
const orientations = ['Arriba', 'Derecha', 'Abajo', 'Izquierda'];
[[0, 1], [1, 1], [2, 2], [3, 1], [0, 3], [1, 4], [0, 2]].forEach(([start, turns], i) => key('giros', i, orientations[(start + turns) % 4]));
[[14, ['Círculo', 'Cuadrado', 'Triángulo']], [15, ['Círculo', 'Cuadrado', 'Triángulo']], [22, ['A', 'B', 'C']], [17, ['Rojo', 'Azul']], [20, ['1', '2', '3', '4']], [30, ['A', 'B', 'C', 'D']], [35, ['Limón', 'Naranja', 'Frutilla']], [25, ['Estrella', 'Luna', 'Sol', 'Nube']]].forEach(([position, cycle], i) => key('ciclo_lejano', i, cycle[(position - 1) % cycle.length]));
const construction = unitMap.get('prof_r27_plan_triangulo_tres_lados');
const [A, B, C] = construction.visual.puntos;
eq(dist(A, B), 4);
eq(dist(A, C), 3);
eq(dist(B, C), 5);
construction.visual.auxiliares[0].forEach(p => assert.ok(Math.abs(dist(A, p) - 3) < 1e-9));
construction.visual.auxiliares[1].forEach(p => assert.ok(Math.abs(dist(B, p) - 5) < 1e-9));
construction.visual.auxiliares.forEach(arc => assert.ok(dist(arc[12], C) < 1e-9, 'Ambos arcos pasan por C'));
assert.match(construction.alcance_evidencia, /no queda certificada por opción múltiple/);
assert.match(construction.actividad_en_papel, /regla y compás/);
num('plan_triangulo_tres_lados', 0, dist(A, C));
num('plan_triangulo_tres_lados', 1, dist(B, C));
key('plan_triangulo_tres_lados', 4, 2 + 3 > 6 ? 'Sí' : 'No');

['2','3','3/2','3/4','9/10','2','8/9','5/4'].forEach((v,i)=>key('porciones_no_unitarias',i,v));
[6,4,4,4,6,6,3,15].forEach((v,i)=>num('fraccion_desconocida',i,v));
[375,750,250,500,1000,750,250,750].forEach((v,i)=>num('receta_conversion_resto',i,v));
[24,18,24,22,26,30,30,36].forEach((v,i)=>num('perimetros_unidos',i,v));

console.log(`R27 Matemática: ${units.length} unidades, ${questionIds.size} actividades únicas, ${units.length * 2} transferencias reservadas. ${checks} comprobaciones de esquema, geometría y aritmética correctas.`);
