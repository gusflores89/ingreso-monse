const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { pathToFileURL } = require("url");

const PROJECT_DIR = "C:/Users/gusta/OneDrive/Documentos/Personal/monse/ingreso-monse-2027";

console.log("===================================================================");
console.log("🧪 VERIFICACIÓN END-TO-END DEL RECORRIDO REAL Y CONTROL DE EXÁMENES V2");
console.log("===================================================================\n");

// -------------------------------------------------------------------------
// MÓDULO 1: CONTROL DE EXAMEN AUTOMÁTICO (maybeCrearExamenFinal) EN FUNCIÓN REAL
// -------------------------------------------------------------------------
console.log("--- 1. Ejecución de maybeCrearExamenFinal con base simulada ---");
const initCode = fs.readFileSync(path.join(PROJECT_DIR, "src/pages/api/sesion/init.js"), "utf8");
const start = initCode.indexOf("async function maybeCrearExamenFinal(");
const end = initCode.indexOf("async function getPracticasIniciadas(", start);
assert.ok(start >= 0 && end > start, "maybeCrearExamenFinal debe estar definida en init.js");

function createMockDatabase(initialRows) {
  const rows = structuredClone(initialRows);
  let serial = 100;
  return {
    rows,
    from() {
      let filtered = rows.slice();
      let inserted = null;
      const q = {
        select() { return q; },
        eq(k, v) { filtered = filtered.filter(r => r[k] === v); return q; },
        neq(k, v) { filtered = filtered.filter(r => r[k] !== v); return q; },
        not(k, op, v) {
          assert.equal(op, "is");
          filtered = filtered.filter(r => r[k] !== v);
          return q;
        },
        order(k, { ascending }) {
          filtered.sort((a, b) => String(a[k]).localeCompare(String(b[k])) * (ascending ? 1 : -1));
          return q;
        },
        limit(n) { filtered = filtered.slice(0, n); return q; },
        insert(r) {
          inserted = { ...r, id: ++serial, created_at: "2026-09-10T14:00:00Z", es_correcta: null };
          rows.push(inserted);
          return q;
        },
        single() { return Promise.resolve({ data: inserted, error: null }); },
        then(resolve, reject) { return Promise.resolve({ data: filtered, error: null }).then(resolve, reject); },
      };
      return q;
    },
  };
}

const mockRow = (day, type = "practica", correct = true, help = false) => ({
  id: day,
  user_id: "test",
  tema: "ortografia_h",
  tipo_pregunta: type,
  es_correcta: correct,
  created_at: `2026-08-${String(day).padStart(2, "0")}T12:00:00Z`,
  ia_parametros_usados: { resuelto_con_ayuda: help },
});

(async () => {
  const ctx = vm.createContext({ esElegibleParaExamenFinal: () => true, // Aislar reintentos; verify-h-teoria.cjs prueba la elegibilidad real.
    getExamenFinal: () => ({ enunciado: "Examen sintético", preguntas: [] }),
    assertSupabaseOk: (r) => { assert(!r.error); return r.data; },
  });
  vm.runInContext(initCode.slice(start, end), ctx);

  const base = [mockRow(1), mockRow(2), mockRow(3)];
  const failed = mockRow(4, "examen_final", false);
  const pending = mockRow(4, "examen_final", null);

  // CASO 1: Reprobado sin práctica posterior -> false
  const db1 = createMockDatabase([...base, failed]);
  const res1 = await ctx.maybeCrearExamenFinal(db1, "test", "ortografia_h", 1, "NORMAL", {}, { rendir_examen: true });
  assert.strictEqual(res1?.tipo === "examen_final", false, "Reprobado sin práctica no debe generar examen");
  console.log("✅ Caso 1: Examen reprobado bloquea reincidencia automática -> Ofrece Práctica");

  // CASO 2: Reprobado con 1 práctica posterior -> false
  const db2 = createMockDatabase([...base, failed, mockRow(5)]);
  const res2 = await ctx.maybeCrearExamenFinal(db2, "test", "ortografia_h", 1, "NORMAL", {}, { rendir_examen: true });
  assert.strictEqual(res2?.tipo === "examen_final", false, "Reprobado con 1 práctica no debe generar examen");
  console.log("✅ Caso 2: Con 1 práctica tras reprobar -> Sigue en Práctica (requiere 2)");

  // CASO 3: Reprobado con 2 prácticas posteriores -> true
  const db3 = createMockDatabase([...base, failed, mockRow(5), mockRow(6)]);
  const res3 = await ctx.maybeCrearExamenFinal(db3, "test", "ortografia_h", 1, "NORMAL", {}, { rendir_examen: true });
  assert.strictEqual(res3?.tipo === "examen_final", true, "Reprobado con 2 prácticas consolidadas habilita examen");
  console.log("✅ Caso 3: Con 2 prácticas exitosas consolidadas -> Habilita Examen");

  // CASO 4: Elección de forzar práctica -> false
  const db4 = createMockDatabase([...base]);
  const res4 = await ctx.maybeCrearExamenFinal(db4, "test", "ortografia_h", 1, "NORMAL", {}, { forzar_practica: true });
  assert.strictEqual(res4?.tipo === "examen_final", false, "forzar_practica anula examen incondicionalmente");
  console.log("✅ Caso 4: forzar_practica: true anula el examen incondicionalmente -> Ofrece Práctica");

  // CASO 5: Examen pendiente con prácticas nuevas sin retomar_examen -> false (conserva inicio en práctica)
  const db5 = createMockDatabase([...base, pending, ...Array.from({ length: 10 }, (_, i) => mockRow(i + 5))]);
  const res5 = await ctx.maybeCrearExamenFinal(db5, "test", "ortografia_h", 1, "NORMAL", {}, { rendir_examen: true });
  assert.strictEqual(res5?.tipo === "examen_final", false, "Examen pendiente sin retomar conserva práctica");
  console.log("✅ Caso 5: Examen pendiente conserva inicio en práctica de forma no intrusiva");

  // CASO 6: Examen pendiente con retomar_examen: true -> Recupera examen pendiente SIN crear duplicados
  const db6 = createMockDatabase([...base, pending]);
  const initialRowsCount = db6.rows.length;
  const res6 = await ctx.maybeCrearExamenFinal(db6, "test", "ortografia_h", 1, "NORMAL", {}, { retomar_examen: true });
  assert.strictEqual(res6?.tipo === "examen_final", true, "retomar_examen: true debe devolver el examen pendiente");
  assert.strictEqual(res6?.sesion_id, pending.id, "Debe devolver el mismo sesion_id del examen pendiente");
  assert.strictEqual(db6.rows.length, initialRowsCount, "No debe insertar filas duplicadas en la base de datos");
  console.log("✅ Caso 6: retomar_examen: true recupera el examen pendiente existente con createdRows: 0 (sin duplicados)");

  // CASO 7: Sin exámenes previos, elegible -> true
  const db7 = createMockDatabase([...base]);
  const res7 = await ctx.maybeCrearExamenFinal(db7, "test", "ortografia_h", 1, "NORMAL", {}, { rendir_examen: true });
  assert.strictEqual(res7?.tipo === "examen_final", true, "Elegible sin examen previo genera examen");
  console.log("✅ Caso 7: Alumna elegible habilita examen final");

  // CASO 8: Prácticas asistidas no habilitan examen
  const db8 = createMockDatabase([mockRow(1, "practica", true, true), mockRow(2, "practica", true, true), mockRow(3, "practica", true, true)]);
  const res8 = await ctx.maybeCrearExamenFinal(db8, "test", "ortografia_h", 1, "NORMAL", {}, { rendir_examen: true });
  assert.strictEqual(res8?.tipo === "examen_final", false, "Prácticas con ayuda no cuentan para maestría");
  console.log("✅ Caso 8: Prácticas asistidas se filtran y no habilitan examen");

  // CASO 9: Retomar pendiente tras bajar tasa al 60% (3 aciertos, pendiente, 2 fallos) -> Mismo sesion_id y createdRows: 0
  const history60 = [...base, pending, mockRow(5, "practica", false), mockRow(6, "practica", false)];
  const db9 = createMockDatabase(history60);
  const res9 = await ctx.maybeCrearExamenFinal(db9, "test", "ortografia_h", 1, "NORMAL", {}, { retomar_examen: true });
  assert.strictEqual(res9?.tipo === "examen_final", true, "retomar_examen debe recuperar examen pendiente incluso con tasa del 60%");
  assert.strictEqual(res9?.sesion_id, pending.id, "Debe conservar exactamente el sesion_id original");
  assert.strictEqual(db9.rows.length, history60.length, "No debe insertar filas nuevas en la base");
  console.log("✅ Caso 9: Retomar pendiente tras bajar a 60% -> Recupera examen pendiente con createdRows: 0");

  // -------------------------------------------------------------------------
  // MÓDULO 2: VERIFICACIÓN DE INTERFAZ EN PantallaSessionTutoria.jsx
  // -------------------------------------------------------------------------
  console.log("\n--- 2. Verificación de UI en PantallaSessionTutoria.jsx ---");
  const tutoriaCode = fs.readFileSync(path.join(PROJECT_DIR, "src/components/PantallaSessionTutoria.jsx"), "utf8");

  // Verificación de botón 'Practicar para mejorar' en el primer examen reprobado
  assert.ok(tutoriaCode.includes("pregunta?.tipo !== \"examen_final\""), "Circuito de reintentos con pista no debe aplicarse a examen final");
  assert.ok(tutoriaCode.includes("pregunta?.tipo === \"examen_final\" && !evaluacion.es_correcta"), "Debe tener bloque dedicado para examen final desaprobado");
  assert.ok(tutoriaCode.includes("Practicar para mejorar"), "Debe mostrar el botón 'Practicar para mejorar'");
  assert.ok(tutoriaCode.includes("handleRetomarExamen"), "Debe incluir handleRetomarExamen para recuperar examen pendiente");
  assert.ok(tutoriaCode.includes("Retomar examen"), "Debe ofrecer el botón de retomar examen pendiente en la interfaz");
  console.log("✅ PantallaSessionTutoria muestra 'Practicar para mejorar' en intento 1 de examen reprobado.");
  console.log("✅ PantallaSessionTutoria ofrece 'Retomar examen' para recuperar examen.");

  // -------------------------------------------------------------------------
  // MÓDULO 3: VERIFICACIÓN DE PROMPTS Y CONTEXTO
  // -------------------------------------------------------------------------
  console.log("\n--- 3. Verificación de prompts.js y verify-live-ai-rigorous.js ---");
  const { buildPromptTeacher } = await import(pathToFileURL(path.join(PROJECT_DIR, "src/lib/prompts.js")).href);

  const promptTeacher = buildPromptTeacher({ nombre: "Prueba" }, { tema: "ortografia_h", capa: 1 });
  assert.ok(promptTeacher.includes("- Tema: ortografia_h"), "buildPromptTeacher debe incluir Tema");
  assert.ok(promptTeacher.includes("- Capa: 1"), "buildPromptTeacher debe incluir Capa");

  // Verificar que el contexto en el script riguroso de IA incluya tema y capa
  const liveTestCode = fs.readFileSync(path.join(PROJECT_DIR, "tests/verify-live-ai-rigorous.js"), "utf8");
  assert.ok(liveTestCode.includes('tema: "ortografia_h"'), "verify-live-ai-rigorous.js debe incluir tema ortografia_h en contextoLeccion");
  assert.ok(liveTestCode.includes("capa: 1"), "verify-live-ai-rigorous.js debe incluir capa 1 en contextoLeccion");
  assert.ok(liveTestCode.includes("wordCount <= 30"), "verify-live-ai-rigorous.js debe verificar el límite estricto de 30 palabras");
  console.log("✅ Prompts y suite de pruebas de IA contienen Tema y Capa explícitos y límite estricto de 30 palabras.");

  console.log("\n===================================================================");
  console.log("🎉 TODAS LAS VERIFICACIONES E2E Y CASOS DE CONTROL PASARON AL 100%");
  console.log("===================================================================");
})().catch((err) => {
  console.error("❌ ERROR EN TEST E2E:", err);
  process.exit(1);
});

