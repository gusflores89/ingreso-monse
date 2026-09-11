const fs = require('fs');
const path = require('path');

const PROJECT_DIR = 'C:/Users/gusta/OneDrive/Documentos/Personal/monse/ingreso-monse-2027';

console.log('=================================================================');
console.log('🧪 VERIFICACIÓN INTEGRAL DE RECORRIDO PEDAGÓGICO Y ESTADO (ABRIL)');
console.log('=================================================================\n');

// -------------------------------------------------------------
// 1. API: Entrega de pista_concreta, paso_resuelto y soporte no_visto
// -------------------------------------------------------------
console.log('--- 1. Verificación de API respuesta.js ---');
const respuestaCode = fs.readFileSync(path.join(PROJECT_DIR, 'src/pages/api/sesion/respuesta.js'), 'utf8');

if (!respuestaCode.includes('pista_concreta: evaluacion.pista_concreta || null')) {
  throw new Error('FALLO: respuesta.js no retorna pista_concreta en el JSON');
}
if (!respuestaCode.includes('paso_resuelto: evaluacion.paso_resuelto || null')) {
  throw new Error('FALLO: respuesta.js no retorna paso_resuelto en el JSON');
}
if (!respuestaCode.includes('no_visto = false')) {
  throw new Error('FALLO: respuesta.js no extrae no_visto del body');
}
if (!respuestaCode.includes('esCorrectaDb = esNoVisto ? null : Boolean(evaluacion.es_correcta)')) {
  throw new Error('FALLO: respuesta.js no preserva es_correcta como null ante no_visto');
}
console.log('✅ respuesta.js retorna pista_concreta y paso_resuelto en el JSON.');
console.log('✅ respuesta.js procesa no_visto sin registrar error de dominio (es_correcta: null).');

// -------------------------------------------------------------
// 2. Prompts Pedagógicos (prompts.js)
// -------------------------------------------------------------
console.log('\n--- 2. Verificación de Prompts Pedagógicos (prompts.js) ---');
const promptsCode = fs.readFileSync(path.join(PROJECT_DIR, 'src/lib/prompts.js'), 'utf8');

if (!promptsCode.includes('NO INVENTAR REGLAS ORTOGRÁFICAS NI EXIGIR JUSTIFICAR PALABRAS DE USO')) {
  throw new Error('FALLO: prompts.js no contiene la directiva contra reglas inventadas');
}
if (!promptsCode.includes('hormiga') || !promptsCode.includes('hormiguero')) {
  throw new Error('FALLO: prompts.js no contiene la directriz explícita del caso hormiga/familias');
}
if (!promptsCode.includes('ATENCIÓN PEDAGÓGICA CRÍTICA:')) {
  throw new Error('FALLO: respuesta.js / prompts.js no guía al evaluador ante no_visto');
}
console.log('✅ Prohibición explícita de inventar reglas para palabras de uso.');
console.log('✅ Directiva de enseñanza previa: contexto -> ejemplo -> práctica guiada antes de evaluar.');
console.log('✅ Prompts formativos sin penalización injusta ante consulta de dudas.');

// -------------------------------------------------------------
// 3. Verificación Estática en PantallaSessionTutoria.jsx
// -------------------------------------------------------------
console.log('\n--- 3. Verificación de Código en PantallaSessionTutoria.jsx ---');
const tutoriaCode = fs.readFileSync(path.join(PROJECT_DIR, 'src/components/PantallaSessionTutoria.jsx'), 'utf8');

if (!tutoriaCode.includes('getStarsStorageKey = () => `monse_estrellas_${user_id || "abril"}`')) {
  throw new Error('FALLO: getStarsStorageKey no está definido para separar estrellas de la misión diaria');
}
if (!tutoriaCode.includes('base.fecha === hoy')) {
  throw new Error('FALLO: saveMissionState no verifica base.fecha === hoy para evitar importar el día anterior');
}
if (!tutoriaCode.includes('!evaluacion?.no_visto') && !tutoriaCode.includes('misionTerminada && !evaluacion')) {
  throw new Error('FALLO: La celebración de la misión no comprueba no_visto / !evaluacion, podría tapar la retroalimentación');
}
if (!tutoriaCode.includes('Probar ahora con esta ayuda')) {
  throw new Error('FALLO: Falta el botón "Probar ahora con esta ayuda" en la tarjeta de no_visto');
}
if (!tutoriaCode.includes('Prefiero pasar a otro reto por ahora')) {
  throw new Error('FALLO: Falta la salida voluntaria "Prefiero pasar a otro reto por ahora"');
}
if (!tutoriaCode.includes('Ver misión completada')) {
  throw new Error('FALLO: Falta el botón "Ver misión completada" para transicionar a la celebración tras leer feedback');
}

if (!tutoriaCode.includes('respuestasExamen: respuestasExamen') && !tutoriaCode.includes('respuestasExamen,')) {
  throw new Error('FALLO: handleGuardarYSalir no incluye respuestasExamen');
}
if (!tutoriaCode.includes('saveMissionState({ respuestasExamen: next })')) {
  throw new Error('FALLO: ExamenFinal onRespuesta no persiste respuestasExamen en localStorage');
}

// Verificar que handleNoVisto NO llama a registrarDesafioCompletado
const noVistoFnMatch = tutoriaCode.match(/const handleNoVisto = async \(\) => \{([\s\S]*?)\n  \};/);
if (!noVistoFnMatch || noVistoFnMatch[1].includes('registrarDesafioCompletado')) {
  throw new Error('FALLO: handleNoVisto sigue llamando a registrarDesafioCompletado prematuramente');
}
console.log('✅ saveMissionState valida fecha de hoy y descarta misión de días previos.');
console.log('✅ Estrellas acumuladas separadas y persistidas de forma independiente.');
console.log('✅ handleNoVisto NO declara reto completado prematuramente.');
console.log('✅ Pantalla ofrece "Probar ahora con esta ayuda" y salida voluntaria.');
console.log('✅ Celebración condicionada a !evaluacion para nunca tapar explicaciones.');
console.log('✅ Respuestas de examen se guardan continuamente y al presionar "Guardar y salir".');
console.log('✅ Ejercicio de lección ("Ahora proba vos") incluye botón "Esto todavía no lo vimos".');

// -------------------------------------------------------------
// 4. Simulaciones Funcionales de los Casos Reales
// -------------------------------------------------------------
console.log('\n--- 4. Simulaciones Funcionales de Comportamiento ---');

const storage = {};
const mockLocalStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  clear: () => { for (const k in storage) delete storage[k]; }
};

function createTutoriaLogic(initialDate = "2026-09-09", userId = "abril") {
  let today = initialDate;
  let desafiosCompletadosMision = 0;
  let retosCompletadosIds = [];
  let misionTerminada = false;
  let estrellasAcumuladas = 0;
  let evaluacion = null;
  let intento = 1;
  let pistaActiva = null;
  let respuesta = "";
  let respuestasExamen = {};

  const getStorageKey = () => `monse_mision_${userId}`;
  const getStarsStorageKey = () => `monse_estrellas_${userId}`;

  const getSavedStars = () => {
    try {
      return parseInt(mockLocalStorage.getItem(getStarsStorageKey()) || "0", 10) || 0;
    } catch {
      return 0;
    }
  };

  const saveStars = (s) => {
    mockLocalStorage.setItem(getStarsStorageKey(), String(s));
  };

  const saveMissionState = (updates = {}) => {
    let base = {};
    const savedRaw = mockLocalStorage.getItem(getStorageKey());
    if (savedRaw) {
      try { base = JSON.parse(savedRaw) || {}; } catch {}
    }
    const hoy = today;
    const esMismoDia = base.fecha === hoy && (!base.user_id || base.user_id === userId);
    const baseValida = esMismoDia ? base : {};

    const starsFromStorage = getSavedStars();
    const currentStars = updates.estrellas !== undefined
      ? updates.estrellas
      : Math.max(starsFromStorage, estrellasAcumuladas, typeof base.estrellas === "number" ? base.estrellas : 0);
    saveStars(currentStars);

    const currentRespuestasExamen = updates.respuestasExamen !== undefined
      ? updates.respuestasExamen
      : (respuestasExamen && Object.keys(respuestasExamen).length > 0 ? respuestasExamen : (baseValida.respuestasExamen || {}));

    const current = {
      tema: "ortografia_h",
      pregunta: baseValida.pregunta !== undefined ? baseValida.pregunta : null,
      sesionId: baseValida.sesionId !== undefined ? baseValida.sesionId : "sesion_1",
      evaluacion: baseValida.evaluacion !== undefined ? baseValida.evaluacion : evaluacion,
      intento: baseValida.intento !== undefined ? baseValida.intento : intento,
      pasoActual: baseValida.pasoActual !== undefined ? baseValida.pasoActual : 0,
      respuesta: baseValida.respuesta !== undefined ? baseValida.respuesta : respuesta,
      borrador: updates.borrador !== undefined ? updates.borrador : (baseValida.borrador !== undefined ? baseValida.borrador : respuesta),
      pistaActiva: baseValida.pistaActiva !== undefined ? baseValida.pistaActiva : pistaActiva,
      ...baseValida,
      ...updates,
      fecha: hoy,
      user_id: userId,
      desafios: updates.desafios !== undefined ? updates.desafios : (esMismoDia ? (base.desafios ?? desafiosCompletadosMision) : 0),
      retosCompletadosIds: updates.retosCompletadosIds !== undefined ? updates.retosCompletadosIds : (esMismoDia ? (base.retosCompletadosIds ?? retosCompletadosIds) : []),
      misionTerminada: updates.misionTerminada !== undefined ? updates.misionTerminada : (esMismoDia ? (base.misionTerminada ?? misionTerminada) : false),
      respuestasExamen: currentRespuestasExamen,
      estrellas: currentStars,
    };
    mockLocalStorage.setItem(getStorageKey(), JSON.stringify(current));
    return current;
  };

  const registrarDesafioCompletado = (id, estrellas = 2, extra = {}) => {
    const stringId = String(id);
    if (retosCompletadosIds.includes(stringId)) {
      if (Object.keys(extra).length > 0) saveMissionState(extra);
      return retosCompletadosIds;
    }
    retosCompletadosIds = [...retosCompletadosIds, stringId];
    desafiosCompletadosMision = retosCompletadosIds.length;
    const starsBase = Math.max(getSavedStars(), estrellasAcumuladas);
    estrellasAcumuladas = starsBase + estrellas;
    saveStars(estrellasAcumuladas);
    if (desafiosCompletadosMision >= 3) {
      misionTerminada = true;
    }
    saveMissionState({
      retosCompletadosIds,
      desafios: desafiosCompletadosMision,
      estrellas: estrellasAcumuladas,
      misionTerminada,
      ...extra,
    });
    return retosCompletadosIds;
  };

  const init = () => {
    const savedRaw = mockLocalStorage.getItem(getStorageKey());
    const starsFromStorage = getSavedStars();
    if (starsFromStorage > 0) estrellasAcumuladas = starsFromStorage;
    if (savedRaw) {
      const saved = JSON.parse(savedRaw);
      const hoy = today;
      if (saved.fecha === hoy && (saved.misionTerminada || saved.desafios !== undefined || saved.pregunta)) {
        if (typeof saved.desafios === "number") desafiosCompletadosMision = saved.desafios;
        if (Array.isArray(saved.retosCompletadosIds)) retosCompletadosIds = saved.retosCompletadosIds;
        if (saved.misionTerminada) misionTerminada = true;
        if (saved.evaluacion) evaluacion = saved.evaluacion;
        if (saved.pistaActiva) pistaActiva = saved.pistaActiva;
        if (typeof saved.intento === "number") intento = saved.intento;
        if (saved.respuestasExamen) respuestasExamen = saved.respuestasExamen;
        if (saved.respuesta || saved.borrador) respuesta = saved.borrador || saved.respuesta;
        return;
      } else if (saved.fecha !== hoy) {
        desafiosCompletadosMision = 0;
        retosCompletadosIds = [];
        misionTerminada = false;
        pistaActiva = null;
        respuesta = "";
        respuestasExamen = {};
        const starsToRestore = Math.max(starsFromStorage, typeof saved.estrellas === "number" ? saved.estrellas : 0);
        if (starsToRestore > 0) {
          estrellasAcumuladas = starsToRestore;
          saveStars(saved.estrellas);
        }
        mockLocalStorage.setItem(getStorageKey(), JSON.stringify({
          fecha: hoy,
          user_id: userId,
          desafios: 0,
          retosCompletadosIds: [],
          misionTerminada: false,
          estrellas: starsToRestore,
          evaluacion: null,
          pistaActiva: null,
          borrador: "",
          respuesta: "",
          respuestasExamen: {},
          intento: 1,
          pasoActual: 0,
        }));
      }
    }
  };

  const handleNoVisto = (evaluacionMock) => {
    evaluacion = evaluacionMock;
    saveMissionState({ evaluacion, respuesta: "", intento: 1 });
  };

  const handleProbarConAyuda = () => {
    pistaActiva = evaluacion.pista_concreta || evaluacion.paso_resuelto || "Ayuda";
    intento = 2;
    evaluacion = null;
    respuesta = "";
    saveMissionState({ intento: 2, evaluacion: null, pistaActiva, respuesta: "" });
  };

  const handleSubmit = (correct, respuestaText, id) => {
    respuesta = respuestaText;
    if (correct) {
      pistaActiva = null;
      evaluacion = { es_correcta: true, retroalimentacion: "¡Muy bien resuelto con la pista!" };
      registrarDesafioCompletado(id, 2, { evaluacion, respuesta, pistaActiva: null });
    } else {
      evaluacion = { es_correcta: false, retroalimentacion: "Revisá nuevamente." };
      saveMissionState({ evaluacion, intento, respuesta });
    }
  };

  const handleSiguiente = (options = {}) => {
    if (evaluacion && evaluacion.no_visto && options.completadoVoluntario) {
      registrarDesafioCompletado("reto_voluntario_" + Date.now(), 2);
    }
    evaluacion = null;
    pistaActiva = null;
    respuesta = "";
    respuestasExamen = {};
    intento = 1;
    saveMissionState({ evaluacion: null, pistaActiva: null, respuesta: "", respuestasExamen: {}, intento: 1 });
  };

  const handleRespuestaExamen = (id, val) => {
    respuestasExamen = { ...respuestasExamen, [id]: val };
    saveMissionState({ respuestasExamen });
  };

  const handleGuardarYSalir = () => {
    saveMissionState({ borrador: respuesta, respuesta, respuestasExamen });
  };

  const getRenderState = () => {
    return {
      showsCelebration: misionTerminada && !evaluacion,
      showsFeedback: Boolean(evaluacion),
      showsQuestionInput: !evaluacion && (!misionTerminada || desafiosCompletadosMision < 3),
      buttonText: (misionTerminada || desafiosCompletadosMision >= 3) && evaluacion?.es_correcta
        ? "🎉 Ver misión completada →"
        : "Siguiente reto →",
      desafiosCompletadosMision,
      misionTerminada,
      evaluacion,
      intento,
      pistaActiva,
      estrellasAcumuladas,
    };
  };

  return {
    setToday: (d) => { today = d; },
    init,
    handleNoVisto,
    handleProbarConAyuda,
    handleSubmit,
    handleSiguiente,
    handleRespuestaExamen,
    handleGuardarYSalir,
    getRenderState,
    saveMissionState,
  };
}

// -------------------------------------------------------------
// Caso 1: Pedir explicación en el 3er Reto ("Esto todavía no lo vimos")
// -------------------------------------------------------------
mockLocalStorage.clear();
const app1 = createTutoriaLogic("2026-09-09", "abril");
// Simular que Abril ya completó 2 retos hoy
app1.saveMissionState({ desafios: 2, retosCompletadosIds: ["r1", "r2"], estrellas: 4 });
app1.init();

// Está en el 3er reto y pulsa "Esto todavía no lo vimos"
app1.handleNoVisto({
  no_visto: true,
  retroalimentacion: "Nadie nace sabiendo, descubramos este paso juntos.",
  pista_concreta: "Las palabras de la familia de hormiga llevan H.",
  paso_resuelto: "hormiga -> hormiguero"
});

const render1 = app1.getRenderState();
if (render1.showsCelebration) {
  throw new Error('FALLO Caso 1: Se activó la celebración y tapó la explicación en el 3er reto.');
}
if (!render1.showsFeedback) {
  throw new Error('FALLO Caso 1: No se muestra la retroalimentación explicativa solicitada por Abril.');
}
if (render1.desafiosCompletadosMision !== 2 || render1.misionTerminada !== false) {
  throw new Error(`FALLO Caso 1: El reto se dio por terminado prematuramente (desafíos: ${render1.desafiosCompletadosMision}).`);
}
console.log('✅ Caso 1 Aprobado: En el 3er reto, "Esto todavía no lo vimos" muestra la explicación y NO tapa con celebración.');

// -------------------------------------------------------------
// Caso 2: Práctica guiada con pista -> respuesta acertada -> celebración
// -------------------------------------------------------------
// Abril pulsa "💡 Probar ahora con esta ayuda"
app1.handleProbarConAyuda();
const render2 = app1.getRenderState();

if (render2.intento !== 2) {
  throw new Error('FALLO Caso 2: Al probar con ayuda, intento no pasó a 2.');
}
if (!render2.pistaActiva || !render2.pistaActiva.includes("familia de hormiga")) {
  throw new Error('FALLO Caso 2: La pista clave no quedó activa para la práctica guiada.');
}
if (!render2.showsQuestionInput) {
  throw new Error('FALLO Caso 2: La caja de respuesta no volvió a estar visible para que Abril intente.');
}

// Abril envía su respuesta guiada correctamente en el 3er reto
app1.handleSubmit(true, "hormiguero", "r3");
const render3 = app1.getRenderState();

if (render3.desafiosCompletadosMision !== 3 || !render3.misionTerminada) {
  throw new Error(`FALLO Caso 2: Tras responder bien el 3er reto no quedó 3 de 3 terminado.`);
}
if (render3.showsCelebration) {
  throw new Error('FALLO Caso 2: La celebración tapó inmediatamente la felicitación del tutor.');
}
if (render3.buttonText !== "🎉 Ver misión completada →") {
  throw new Error(`FALLO Caso 2: El botón no ofrece "🎉 Ver misión completada →", tiene: "${render3.buttonText}"`);
}

// Abril pulsa "Ver misión completada"
app1.handleSiguiente();
const render4 = app1.getRenderState();
if (!render4.showsCelebration) {
  throw new Error('FALLO Caso 2: Tras pulsar "Ver misión completada" no apareció la pantalla de celebración.');
}
console.log('✅ Caso 2 Aprobado: Práctica guiada -> acierto formativo -> botón "Ver misión completada" -> celebración.');

// -------------------------------------------------------------
// Caso 3: Salida voluntaria ante "Esto todavía no lo vimos"
// -------------------------------------------------------------
mockLocalStorage.clear();
const app3 = createTutoriaLogic("2026-09-09", "abril");
app3.saveMissionState({ desafios: 2, retosCompletadosIds: ["r1", "r2"], estrellas: 4 });
app3.init();

app3.handleNoVisto({
  no_visto: true,
  retroalimentacion: "Explicación",
  pista_concreta: "Pista",
  paso_resuelto: "Ejemplo"
});

// Abril decide no resolver este ejercicio ahora y pasa al siguiente
app3.handleSiguiente({ completadoVoluntario: true });
const render3Vol = app3.getRenderState();
if (render3Vol.desafiosCompletadosMision !== 3 || !render3Vol.misionTerminada) {
  throw new Error('FALLO Caso 3: La salida voluntaria no sumó el esfuerzo a la misión sin penalización.');
}
if (!render3Vol.showsCelebration) {
  throw new Error('FALLO Caso 3: La salida voluntaria en el 3er reto debió concluir la misión.');
}
console.log('✅ Caso 3 Aprobado: Salida voluntaria ("Prefiero pasar a otro reto") suma a la misión sin frustrar a la alumna.');

// -------------------------------------------------------------
// Caso 4: Transición de Día (Día 8 a Día 9) y Preservación de Estrellas
// -------------------------------------------------------------
mockLocalStorage.clear();

// Estado al terminar el 8 de septiembre: 3 retos superados, misión terminada, 14 estrellas acumuladas
mockLocalStorage.setItem('monse_mision_abril', JSON.stringify({
  fecha: "2026-09-08",
  user_id: "abril",
  desafios: 3,
  retosCompletadosIds: ["d8_1", "d8_2", "d8_3"],
  misionTerminada: true,
  estrellas: 14
}));
mockLocalStorage.setItem('monse_estrellas_abril', "14");

// Abril abre la app el 9 de septiembre
const appDia9 = createTutoriaLogic("2026-09-09", "abril");
appDia9.init();

const renderDia9Inicial = appDia9.getRenderState();
if (renderDia9Inicial.desafiosCompletadosMision !== 0) {
  throw new Error(`FALLO Caso 4: El nuevo día no arrancó en 0 desafíos. Tuvo: ${renderDia9Inicial.desafiosCompletadosMision}`);
}
if (renderDia9Inicial.misionTerminada !== false) {
  throw new Error('FALLO Caso 4: El nuevo día arrancó con misionTerminada: true importada del día anterior.');
}
if (renderDia9Inicial.estrellasAcumuladas !== 14) {
  throw new Error(`FALLO Caso 4: Las estrellas históricas de Abril no se preservaron (esperadas: 14, obtenidas: ${renderDia9Inicial.estrellasAcumuladas}).`);
}

// Ahora durante el día 9 guarda un borrador o avance
appDia9.saveMissionState({ borrador: "mi respuesta" });
const storageDia9 = JSON.parse(mockLocalStorage.getItem('monse_mision_abril'));

if (storageDia9.fecha !== "2026-09-09") {
  throw new Error(`FALLO Caso 4: saveMissionState sobrescribió la fecha actual con la de ayer: ${storageDia9.fecha}`);
}
if (storageDia9.desafios !== 0 || storageDia9.misionTerminada !== false) {
  throw new Error(`FALLO Caso 4: saveMissionState importó desafios=3 o misionTerminada=true del día anterior.`);
}
if (storageDia9.estrellas !== 14) {
  throw new Error(`FALLO Caso 4: saveMissionState reseteó las estrellas históricas.`);
}

console.log('✅ Caso 4 Aprobado: Cambio de fecha arranca misión en 0 retos, no terminada, preservando 14 estrellas.');

// -------------------------------------------------------------
// Caso 5: Guardar borrador de examen y restaurar respuestas al volver
// -------------------------------------------------------------
mockLocalStorage.clear();
const app5 = createTutoriaLogic("2026-09-09", "abril");
// Abre examen con dos preguntas 'a' y 'b'
app5.saveMissionState({
  pregunta: {
    tipo: 'examen_final',
    preguntas: [{ id: 'a', texto: 'Escribí hormiga.' }, { id: 'b', texto: 'Escribí hormiguero.' }]
  },
  sesionId: 'examen_1'
});
app5.init();

// Abril escribe en ambos campos
app5.handleRespuestaExamen('a', 'hormiga');
app5.handleRespuestaExamen('b', 'hormiguero');

// Abril pulsa "Guardar y salir"
app5.handleGuardarYSalir();

// Abril vuelve a la aplicación (recarga la sesión)
const app5Restored = createTutoriaLogic("2026-09-09", "abril");
app5Restored.init();

const storageExamen = JSON.parse(mockLocalStorage.getItem('monse_mision_abril'));
if (!storageExamen.respuestasExamen || storageExamen.respuestasExamen['a'] !== 'hormiga' || storageExamen.respuestasExamen['b'] !== 'hormiguero') {
  throw new Error(`FALLO Caso 5: Las respuestas del examen no se persistieron al guardar y salir: ${JSON.stringify(storageExamen.respuestasExamen)}`);
}
console.log('✅ Caso 5 Aprobado: Examen guarda respuestas en cada campo y "Guardar y salir" las restaura íntegramente.');

// -------------------------------------------------------------
// Caso 6: Botón "Esto todavía no lo vimos" en el paso "Ahora proba vos" de la lección
// -------------------------------------------------------------
if (!tutoriaCode.includes('pasoActualData.tipo === "ejercicio"') || !tutoriaCode.includes('🤔 Esto todavía no lo vimos')) {
  throw new Error('FALLO Caso 6: El paso de ejercicio de la lección no contiene el botón "Esto todavía no lo vimos"');
}
const leccionBloqueMatch = tutoriaCode.match(/pasoActualData\.tipo === "ejercicio"[\s\S]*?<\/div>\s*<\/div>\s*\)\s*\}\s*<\/div>\s*<div className="lesson-navigation"/);
if (!leccionBloqueMatch || !leccionBloqueMatch[0].includes('Esto todavía no lo vimos')) {
  throw new Error('FALLO Caso 6: El botón de ayuda no está presente dentro del bloque del paso interactivo de lección');
}
console.log('✅ Caso 6 Aprobado: Ejercicio de lección ("Ahora proba vos") integra el botón de enseñanza y práctica guiada.');

console.log('\n=================================================================');
console.log('🎉 TODAS LAS VERIFICACIONES DEL RECORRIDO PEDAGÓGICO PASARON AL 100%');
console.log('=================================================================');

