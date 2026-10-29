const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");
const assert = require("assert/strict");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

function load(rel, names, deps = {}) {
  if (rel === "src/lib/contenido-bases.js") {
    deps = {
      ...load("src/lib/ampliaciones-matematica-r27.js", ["UNIDADES_MATEMATICA_R27"]),
      ...load("src/lib/ampliaciones-lengua-r27.js", ["UNIDADES_LENGUA_R27"]),
      ...load("src/lib/visuales-r27.js", ["aplicarVisualesR27"]),
      ...load("src/lib/transferencias-r27.js", ["transferenciasParaTema"]),
      ...deps,
    };
  }
  if (rel === "src/lib/ampliaciones-lengua-r27.js") {
    deps = { ...load("src/lib/contenido-h.js", ["UNIDADES_H"]), ...deps };
  }
  const source = read(rel)
    .replace(/^import[\s\S]*?from\s+["'][^"']+["'];\s*/gm, "")
    .replace(/export default /g, "")
    .replace(/export /g, "");
  const context = vm.createContext({
    process: { env: { NODE_ENV: "test", ...process.env } },
    console,
    Buffer,
    ...deps,
  });
  vm.runInContext(`${source}\n;globalThis.exposed={${names.join(",")}};`, context, { filename: rel });
  return context.exposed;
}

const precio = load("src/lib/precio.js", ["PRECIO_ACCESO_COMPLETO_ARS", "precioAccesoCompletoArs", "formatearPesosARS"]);
assert.equal(precio.PRECIO_ACCESO_COMPLETO_ARS, 19900);
assert.equal(precio.precioAccesoCompletoArs({}), 19900);
assert.equal(precio.precioAccesoCompletoArs({ PLAN_FULL_PRICE: "24900" }), 24900);
assert.equal(precio.precioAccesoCompletoArs({ PLAN_FULL_PRICE: "no" }), 19900);
assert.equal(precio.formatearPesosARS(19900), "$19.900");

const insignias = load("src/lib/insignias.js", ["insigniaDesbloqueada"]);
assert.equal(insignias.insigniaDesbloqueada({ condicion: "explorador" }, {}), true);
assert.equal(insignias.insigniaDesbloqueada({ condicion: "estrellas_100" }, { estrellasTotales: 99 }), false);
assert.equal(insignias.insigniaDesbloqueada({ condicion: "estrellas_100" }, { estrellasTotales: 100 }), true);
assert.equal(insignias.insigniaDesbloqueada({ condicion: "misiones" }, { retosCompletados: 4 }), false);
assert.equal(insignias.insigniaDesbloqueada({ condicion: "ayuda_exitosa" }, { estrellasTotales: 999, retosCompletados: 99 }), false);

const analytics = load("src/lib/analytics.js", ["pixelIdValido", "clarityIdValido", "trackMeta"]);
assert.equal(analytics.pixelIdValido("1234567890"), true);
assert.equal(analytics.pixelIdValido("abc"), false);
assert.equal(analytics.pixelIdValido("<script>"), false);
assert.equal(analytics.clarityIdValido("abcd1234"), true);
assert.equal(analytics.clarityIdValido("bad id"), false);
analytics.trackMeta("PageView");

const curriculum = load("src/lib/curriculum.js", ["getCurriculumByMateria"]);
const nombresTemas = JSON.parse(read("src/lib/nombres-temas.json"));
const bases = load("src/lib/contenido-bases.js", ["UNIDADES_BASES"]);
const simulacro = load("src/lib/simulacro.js", [
  "recolectarBanco",
  "crearSimulacro",
  "corregirSimulacro",
  "PREGUNTAS_POR_SIMULACRO",
], {
  crypto,
  UNIDADES_BASES: bases.UNIDADES_BASES,
  getCurriculumByMateria: curriculum.getCurriculumByMateria,
  nombresTemas,
});

for (const materia of ["matematica", "lengua"]) {
  const banco = simulacro.recolectarBanco(materia);
  assert.ok(banco.length >= simulacro.PREGUNTAS_POR_SIMULACRO, `${materia} tiene ${banco.length} preguntas utilizables`);
  const armado = simulacro.crearSimulacro({ materia, banco, semilla: 42, ahora: 1_700_000_000_000, secreto: "test-secret" });
  assert.equal(armado.preguntas.length, simulacro.PREGUNTAS_POR_SIMULACRO);
  assert.equal(armado.duracion_segundos, 3600);
  const publico = JSON.stringify(armado.preguntas);
  assert.equal(publico.includes('"correcta"'), false);
  assert.equal(publico.includes("paso_resuelto"), false);
  for (const pregunta of armado.preguntas) {
    assert.equal(Object.hasOwn(pregunta, "correcta"), false);
  }
  assert.equal(armado.token.includes('"correcta"'), false);
  const respuestas = Object.fromEntries(armado.preguntas.map((pregunta, index) => {
    const original = banco.find((item) => item.id === pregunta.id);
    return [pregunta.id, index % 2 === 0 ? original.correcta : pregunta.opciones[0]];
  }));
  const corregido = simulacro.corregirSimulacro({
    token: armado.token,
    respuestas,
    ahora: armado.inicio + 1000,
    secreto: "test-secret",
  });
  assert.equal(corregido.total, armado.preguntas.length);
  assert.ok(corregido.correctas >= 1);
  assert.throws(() => simulacro.corregirSimulacro({ token: `${armado.token}x`, respuestas, secreto: "test-secret" }));
  assert.throws(() => simulacro.corregirSimulacro({
    token: armado.token,
    respuestas,
    ahora: armado.exp + 5 * 60 * 1000,
    secreto: "test-secret",
  }));
}

const ui = [
  "src/components/DashboardPapas.jsx",
  "src/components/PremiosSectionPapas.jsx",
  "src/components/RecorridoFamiliar.jsx",
  "src/components/ModalPremiosEstudiante.jsx",
  "src/pages/laboratorio.jsx",
  "src/pages/papas.jsx",
  "src/pages/admin-test.jsx",
  "src/lib/planes.js",
].map((rel) => read(rel)).join("\n");

assert.equal(ui.includes("29.900"), false);
assert.equal(ui.includes("Ahorrás"), false);
assert.equal(ui.includes("f8dbb32d"), false);
assert.equal(/Abril/.test(ui), false);
assert.equal(read("src/pages/admin-test.jsx").includes("notFound: true"), true);
assert.equal(read("src/pages/terminos.jsx").includes("BORRADOR"), false);
assert.equal(read("src/lib/legal.js").includes("BORRADOR"), true);
assert.equal(read("src/pages/privacidad.jsx").includes("25.326"), true);
assert.equal(read("src/pages/arrepentimiento.jsx").includes("424/2020"), true);
assert.equal(read("src/components/Footer.jsx").includes("/arrepentimiento"), true);
assert.equal(read("README.md").includes("NEXT_PUBLIC_META_PIXEL_ID"), true);
assert.equal(read("README.md").includes("NEXT_PUBLIC_CLARITY_ID"), true);

console.log("verify-lanzamiento: ok");
