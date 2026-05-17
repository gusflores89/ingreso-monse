export const EXAMENES_FINALES = {
  fracciones_concepto: {
    capa_1_2: {
      tipo: "examen_final",
      dificultad: "basico",
      instrucciones: "Responde estas preguntas sobre fracciones. Necesitas 2 de 3 correctas para aprobar.",
      enunciado: `Mira esta pizza:

[La visualizacion se mostrara automaticamente: pizza dividida en 4 partes, 1 coloreada]

Responde:
a) En cuantas partes esta dividida la pizza?
b) Cuantas partes estan pintadas de rojo?
c) Que fraccion de la pizza esta pintada?`,
      preguntas: [
        { id: "a", texto: "En cuantas partes esta dividida la pizza?", respuesta_correcta: "4", alternativas_aceptables: ["cuatro"] },
        { id: "b", texto: "Cuantas partes estan pintadas de rojo?", respuesta_correcta: "1", alternativas_aceptables: ["una"] },
        { id: "c", texto: "Que fraccion de la pizza esta pintada?", respuesta_correcta: "1/4", alternativas_aceptables: ["un cuarto", "1 cuarto", "1 de 4"] },
      ],
      visualizacion: { tipo: "fraccion_pizza", datos: { total: 4, pintadas: 1 } },
    },
    capa_3: {
      tipo: "examen_final",
      dificultad: "intermedio",
      instrucciones: "Examen de fracciones. Necesitas 70% o mas para aprobar.",
      enunciado: `Observa las siguientes pizzas:

[Se mostraran automaticamente: Pizza A dividida en 3 partes con 2 pintadas, Pizza B dividida en 6 partes con 4 pintadas]

Responde:
a) Que fraccion representa la Pizza A?
b) Que fraccion representa la Pizza B?
c) Cual pizza tiene MAS porcion pintada?
d) Por que?`,
      preguntas: [
        { id: "a", texto: "Que fraccion representa la Pizza A?", respuesta_correcta: "2/3", alternativas_aceptables: ["dos tercios", "2 tercios"] },
        { id: "b", texto: "Que fraccion representa la Pizza B?", respuesta_correcta: "4/6", alternativas_aceptables: ["cuatro sextos", "4 sextos"] },
        { id: "c", texto: "Cual pizza tiene MAS porcion pintada?", respuesta_correcta: "pizza b", alternativas_aceptables: ["b", "la b", "la pizza b", "pizza 2", "la segunda"] },
        { id: "d", texto: "Por que?", respuesta_correcta: "4/6 es mayor que 2/3", alternativas_aceptables: ["porque 4/6 es mas", "4/6 > 2/3", "tiene mas partes pintadas"] },
      ],
      visualizacion: {
        tipo: "fraccion_pizza",
        datos: [
          { label: "Pizza A", total: 3, pintadas: 2 },
          { label: "Pizza B", total: 6, pintadas: 4 },
        ],
      },
    },
    capa_4_5: {
      tipo: "examen_final",
      dificultad: "monserrat",
      instrucciones: "Examen final nivel Monserrat. Necesitas 70% o mas para aprobar.",
      enunciado: `Se mezclaron las tarjetas con los numeros que escribieron cuatro companeros. Segui las pistas para descubrir cual le corresponde a cada uno.

La tarjeta de Andrea es la que tiene el numero mayor de todos, y la de Lucia es la del numero menor de todos.
La tarjeta que escribio Iris tiene un numero mayor al que escribio Jose.

Tarjetas: 59/60 | 13/12 | 7/6 | 31/30

a) Que nombre va en la tarjeta 59/60?
b) Que nombre va en la tarjeta 13/12?
c) Que nombre va en la tarjeta 7/6?
d) Que nombre va en la tarjeta 31/30?`,
      preguntas: [
        { id: "a", texto: "Que nombre va en la tarjeta 59/60?", respuesta_correcta: "lucia", alternativas_aceptables: ["lucia", "lucía"] },
        { id: "b", texto: "Que nombre va en la tarjeta 13/12?", respuesta_correcta: "andrea" },
        { id: "c", texto: "Que nombre va en la tarjeta 7/6?", respuesta_correcta: "jose", alternativas_aceptables: ["jose", "josé"] },
        { id: "d", texto: "Que nombre va en la tarjeta 31/30?", respuesta_correcta: "iris" },
      ],
    },
  },

  fracciones_del_resto: {
    capa_1_2: {
      tipo: "examen_final",
      dificultad: "basico",
      instrucciones: "Problema de fracciones paso a paso. Necesitas 2 de 3 correctas.",
      enunciado: `Tenes 12 caramelos. Comes 4 caramelos.
De los caramelos que QUEDAN, le das la mitad a tu hermana.

a) Cuantos caramelos te quedan despues de comer 4?
b) Cuantos caramelos le das a tu hermana?
c) Cuantos caramelos te quedan para vos al final?`,
      preguntas: [
        { id: "a", texto: "Cuantos caramelos te quedan despues de comer 4?", respuesta_correcta: "8", alternativas_aceptables: ["ocho"] },
        { id: "b", texto: "Cuantos caramelos le das a tu hermana?", respuesta_correcta: "4", alternativas_aceptables: ["cuatro"] },
        { id: "c", texto: "Cuantos caramelos te quedan para vos al final?", respuesta_correcta: "4", alternativas_aceptables: ["cuatro"] },
      ],
      visualizacion: { tipo: "division_repartir", datos: { total: 12, grupos: 3 } },
    },
    capa_3: {
      tipo: "examen_final",
      dificultad: "intermedio",
      instrucciones: "Problema de fracciones del resto. Necesitas 70% o mas para aprobar.",
      enunciado: `Tenes 120 figuritas para tu coleccion.
Regalas 1/3 del total a tu primo.
De las figuritas que te QUEDAN, pegas 1/4 en tu album.

a) Cuantas figuritas regalaste a tu primo?
b) Cuantas figuritas pegaste en tu album?
c) Cuantas figuritas te quedan sin pegar?`,
      preguntas: [
        { id: "a", texto: "Cuantas figuritas regalaste?", respuesta_correcta: "40", alternativas_aceptables: ["cuarenta"] },
        { id: "b", texto: "Cuantas figuritas pegaste en tu album?", respuesta_correcta: "20", alternativas_aceptables: ["veinte"] },
        { id: "c", texto: "Cuantas figuritas te quedan sin pegar?", respuesta_correcta: "60", alternativas_aceptables: ["sesenta"] },
      ],
    },
    capa_4_5: {
      tipo: "examen_final",
      dificultad: "monserrat",
      instrucciones: "Examen final nivel Monserrat. Mostra todos los calculos. Necesitas 70% o mas para aprobar.",
      enunciado: `De un camion cargado con 9000 kg de alimento balanceado se utiliza 1/3 del total para alimentar a las vacas. Con 1/4 del resto se alimenta a las ovejas.

Responde:
a) Que fraccion del total de alimento balanceado se utiliza para alimentar a las vacas?
b) Que fraccion del total se utiliza para alimentar a las ovejas?
c) Cuantos kilogramos de balanceado quedan en el camion despues de alimentar a las vacas y a las ovejas?`,
      preguntas: [
        { id: "a", texto: "Que fraccion del total se utiliza para las vacas?", respuesta_correcta: "1/3", alternativas_aceptables: ["un tercio", "1 tercio"] },
        { id: "b", texto: "Que fraccion del total se utiliza para las ovejas?", respuesta_correcta: "1/6", alternativas_aceptables: ["un sexto", "1 sexto"] },
        { id: "c", texto: "Cuantos kilogramos quedan?", respuesta_correcta: "4500", alternativas_aceptables: ["4500 kg", "4500kg", "cuatro mil quinientos"] },
      ],
    },
  },

  geometria_angulos: {
    capa_1_2: {
      tipo: "examen_final",
      dificultad: "basico",
      instrucciones: "Completa las medidas de los angulos. Necesitas 2 de 3 correctas.",
      enunciado: `Mira el dibujo:

[Se mostrara un angulo de 90 grados y otro de 45 grados]

a) Cuanto mide el angulo recto?
b) Cuanto mide el angulo mas pequeno?
c) Si sumamos los dos angulos, cuanto da?`,
      preguntas: [
        { id: "a", texto: "Cuanto mide el angulo recto?", respuesta_correcta: "90", alternativas_aceptables: ["90 grados", "90°", "noventa"] },
        { id: "b", texto: "Cuanto mide el angulo pequeno?", respuesta_correcta: "45", alternativas_aceptables: ["45 grados", "45°", "cuarenta y cinco"] },
        { id: "c", texto: "Si los sumamos, cuanto da?", respuesta_correcta: "135", alternativas_aceptables: ["135 grados", "135°", "ciento treinta y cinco"] },
      ],
      visualizacion: { tipo: "angulo", datos: [{ medida: 90, label: "A" }, { medida: 45, label: "B" }] },
    },
    capa_3: {
      tipo: "examen_final",
      dificultad: "intermedio",
      instrucciones: "Examen de angulos. Necesitas 70% o mas para aprobar.",
      enunciado: `Observa el triangulo:

Sabiendo que un angulo mide 60 grados y otro mide 80 grados:

a) Cuanto mide el tercer angulo?
b) Que tipo de triangulo es segun sus angulos?`,
      preguntas: [
        { id: "a", texto: "Cuanto mide el tercer angulo?", respuesta_correcta: "40", alternativas_aceptables: ["40 grados", "40°", "cuarenta"] },
        { id: "b", texto: "Que tipo de triangulo es?", respuesta_correcta: "acutangulo", alternativas_aceptables: ["acutangulo", "acutángulo", "triangulo acutangulo", "triángulo acutángulo"] },
      ],
      visualizacion: { tipo: "triangulo", datos: { tipo: "acutangulo", angulo1: 60, angulo2: 80 } },
    },
    capa_4_5: {
      tipo: "examen_final",
      dificultad: "monserrat",
      instrucciones: "Examen final nivel Monserrat. Completa las medidas solicitadas.",
      enunciado: `Mirando el grafico del paralelogramo ABCD y sabiendo que DS es bisectriz del angulo ADC, completa las medidas solicitadas.

a) Cuanto mide el angulo DAB?
b) Cuanto mide el angulo beta formado por la bisectriz?`,
      preguntas: [
        { id: "a", texto: "Cuanto mide el angulo DAB?", respuesta_correcta: "110", alternativas_aceptables: ["110 grados", "110°", "ciento diez"] },
        { id: "b", texto: "Cuanto mide el angulo beta?", respuesta_correcta: "55", alternativas_aceptables: ["55 grados", "55°", "cincuenta y cinco"] },
      ],
      visualizacion: { tipo: "angulo", datos: { tipo: "paralelogramo_bisectriz", angulo_dado: 70, grados: 55, nombre: "beta" } },
    },
  },

  graficos_estadisticos: {
    capa_1_2: {
      tipo: "examen_final",
      dificultad: "basico",
      instrucciones: "Mira el grafico y responde. Necesitas 2 de 3 correctas.",
      enunciado: `Este grafico muestra cuantos helados se vendieron durante 4 dias:

Lunes: 10 helados
Martes: 15 helados
Miercoles: 20 helados
Jueves: 5 helados

a) Que dia se vendieron MAS helados?
b) Cuantos helados se vendieron el martes?
c) Cuantos helados se vendieron en total?`,
      preguntas: [
        { id: "a", texto: "Que dia se vendieron MAS helados?", respuesta_correcta: "miercoles", alternativas_aceptables: ["miércoles", "el miercoles", "el miércoles"] },
        { id: "b", texto: "Cuantos helados se vendieron el martes?", respuesta_correcta: "15", alternativas_aceptables: ["quince"] },
        { id: "c", texto: "Cuantos helados se vendieron en total?", respuesta_correcta: "50", alternativas_aceptables: ["cincuenta"] },
      ],
      visualizacion: { tipo: "grafico_barras", datos: { categorias: ["Lunes", "Martes", "Miercoles", "Jueves"], valores: [10, 15, 20, 5] } },
    },
    capa_3: {
      tipo: "examen_final",
      dificultad: "intermedio",
      instrucciones: "Analiza el grafico y responde. Necesitas 70% o mas para aprobar.",
      enunciado: `El grafico muestra la cantidad de libros leidos por alumnos:

Aventura: 40 libros
Misterio: 25 libros
Fantasia: 35 libros
Ciencia: 15 libros
Historia: 20 libros

a) Que tipo de libro fue el MAS leido?
b) Cuantos libros de Misterio se leyeron?
c) Cuantos libros se leyeron en total?
d) Que fraccion del total representan los libros de Aventura?`,
      preguntas: [
        { id: "a", texto: "Que tipo de libro fue el MAS leido?", respuesta_correcta: "aventura", alternativas_aceptables: ["de aventura", "aventuras"] },
        { id: "b", texto: "Cuantos libros de Misterio se leyeron?", respuesta_correcta: "25", alternativas_aceptables: ["veinticinco"] },
        { id: "c", texto: "Cuantos libros se leyeron en total?", respuesta_correcta: "135", alternativas_aceptables: ["ciento treinta y cinco"] },
        { id: "d", texto: "Que fraccion del total son los de Aventura?", respuesta_correcta: "8/27", alternativas_aceptables: ["ocho veintisieteavos"] },
      ],
      visualizacion: { tipo: "grafico_barras", datos: { categorias: ["Aventura", "Misterio", "Fantasia", "Ciencia", "Historia"], valores: [40, 25, 35, 15, 20] } },
    },
    capa_4_5: {
      tipo: "examen_final",
      dificultad: "monserrat",
      instrucciones: "Examen final nivel Monserrat. Analiza el grafico con atencion.",
      enunciado: `Para conocer la popularidad de una obra teatral se recolecto informacion, semana a semana, sobre el numero de asistentes.

Responde:
a) En cual semana se registro el mayor numero de espectadores?
b) Cual fue el numero de espectadores de la semana 9?
c) Cual fue el numero total de espectadores?
d) Que parte del total representa la decima semana?`,
      preguntas: [
        { id: "a", texto: "En cual semana hubo mas espectadores?", respuesta_correcta: "6", alternativas_aceptables: ["6a", "sexta", "semana 6"] },
        { id: "b", texto: "Cuantos espectadores hubo en la semana 9?", respuesta_correcta: "5500", alternativas_aceptables: ["cinco mil quinientos"] },
        { id: "c", texto: "Cual fue el total de espectadores?", respuesta_correcta: "60000", alternativas_aceptables: ["sesenta mil", "60.000"] },
        { id: "d", texto: "Que fraccion del total es la decima semana?", respuesta_correcta: "1/12", alternativas_aceptables: ["un doceavo", "1 doceavo"] },
      ],
      visualizacion: { tipo: "grafico_barras", datos: { categorias: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], valores: [3000, 2000, 4000, 3500, 8000, 7000, 4000, 3000, 5500, 5000, 4000, 4500] } },
    },
  },

  ortografia_b_v: {
    capa_1_2: {
      tipo: "examen_final",
      dificultad: "basico",
      instrucciones: "Completa con b o v. Necesitas 80% correcto para aprobar.",
      enunciado: `Completa las palabras:

1. ca__allo
2. __urro
3. nue__e
4. __aca
5. ar__ol
6. __erde
7. a__uela
8. her__ir`,
      respuestas_correctas: ["caballo", "burro", "nueve", "vaca", "arbol", "verde", "abuela", "hervir"],
      tipo_evaluacion: "completar_palabras",
    },
    capa_3: {
      tipo: "examen_final",
      dificultad: "intermedio",
      instrucciones: "Completa el texto con b o v. Necesitas 80% correcto.",
      enunciado: `Completa con b o v:

Mi a__uela vi__e en una casa hermosa. Tiene un jardin con varias flores y un ar__ol enorme. Cada __ez que la __isito, ella me sir__e un __aso de jugo y galletitas. Le gusta contar historias so__re cuando era jo__en y viajaba por el mundo.`,
      respuestas_correctas: ["abuela", "vive", "arbol", "vez", "visito", "sirve", "vaso", "sobre", "joven", "viajaba"],
      tipo_evaluacion: "completar_texto",
    },
    capa_4_5: {
      tipo: "examen_final",
      dificultad: "monserrat",
      instrucciones: "Examen final nivel Monserrat. Completa el texto sin errores.",
      enunciado: `Completa con b o v:

Habia decidido contri__uir de nue__o con aquel e__ento de __eneficencia __uscando ropa de abrigo que ya no utiliza__a y lle__andola algun dia que andu__iera cerca y que consiguiera mo__ilidad, siempre que no llo__iera.`,
      respuestas_correctas: ["contribuir", "nuevo", "evento", "beneficencia", "buscando", "utilizaba", "llevandola", "anduviera", "movilidad", "lloviera"],
      tipo_evaluacion: "completar_texto",
    },
  },

  comprension_lectora_literal_inferida: {
    capa_1_2: {
      tipo: "examen_final",
      dificultad: "basico",
      instrucciones: "Lee el texto y responde. Necesitas 2 de 3 correctas.",
      enunciado: `LAS ABEJAS

Las abejas son insectos muy trabajadores. Viven en colmenas con muchas otras abejas. La abeja reina pone los huevos.

Las abejas obreras salen a buscar nectar de las flores. Con el nectar hacen miel.

Las abejas son importantes porque llevan polen de una flor a otra.

a) Donde viven las abejas?
b) Que hacen con el nectar?
c) Por que son importantes para las plantas?`,
      preguntas: [
        { id: "a", texto: "Donde viven las abejas?", respuesta_correcta: "colmenas", alternativas_aceptables: ["en colmenas", "colmena"] },
        { id: "b", texto: "Que hacen con el nectar?", respuesta_correcta: "miel", alternativas_aceptables: ["hacen miel", "fabrican miel"] },
        { id: "c", texto: "Por que son importantes?", respuesta_correcta: "llevan polen", alternativas_aceptables: ["porque llevan polen", "polinizan", "ayudan a crecer"] },
      ],
    },
    capa_3: {
      tipo: "examen_final",
      dificultad: "intermedio",
      instrucciones: "Lee el texto y responde. Necesitas 70% o mas.",
      enunciado: `LA BIBLIOTECA DE ALEJANDRIA

Hace mas de dos mil anos, en Egipto, se construyo la biblioteca mas grande del mundo antiguo. Se llamaba Biblioteca de Alejandria.

Los reyes querian reunir todo el conocimiento. Mandaban personas a comprar libros. Los libros eran rollos de papiro escritos a mano.

La biblioteca tenia salas de estudio, jardines, un zoologico y un observatorio.

a) Donde estaba la biblioteca?
b) Como eran los libros?
c) Por que crees que tenia un zoologico?
d) Que significa que se salvaron algunos escritos?`,
      preguntas: [
        { id: "a", texto: "Donde estaba la biblioteca?", respuesta_correcta: "egipto", alternativas_aceptables: ["en egipto", "alejandria"] },
        { id: "b", texto: "Como eran los libros?", respuesta_correcta: "rollos de papiro", alternativas_aceptables: ["rollos", "papiro", "escritos a mano"] },
        { id: "c", texto: "Por que tenia un zoologico?", respuesta_correcta: "para estudiar", alternativas_aceptables: ["para aprender", "para investigar", "para conocer animales"] },
        { id: "d", texto: "Que significa que se salvaron algunos escritos?", respuesta_correcta: "que quedaron pocos", alternativas_aceptables: ["que sobrevivieron pocos", "algunos no se destruyeron"] },
      ],
    },
    capa_4_5: {
      tipo: "examen_final",
      dificultad: "monserrat",
      instrucciones: "Examen final nivel Monserrat. Responde V o F.",
      enunciado: `LA BIBLIOTECA DE ALEJANDRIA

La maravilla mayor de Alejandria, ciudad fundada por Alejandro Magno en Egipto, era su biblioteca y su museo. De esta biblioteca legendaria solo sobrevive hoy un sotano humedo y olvidado; unos pocos estantes enmohecidos pueden ser sus unicos restos fisicos. Sin embargo, este lugar fue en su epoca el primer autentico instituto de investigacion de la historia del mundo.

Los reyes griegos de Egipto que sucedieron a Alejandro apoyaron durante siglos la investigacion y mantuvieron la biblioteca. La biblioteca constaba de diez grandes salas de investigacion; habia jardines botanicos, un zoo, salas de diseccion, un observatorio y una gran sala comedor.

El nucleo de la biblioteca era su coleccion de libros; cada uno era un rollo de papiro escrito a mano. Los organizadores buscaban en todas las culturas del mundo y enviaban funcionarios para comprarlos.

a) La mayor maravilla era la ciudad de Alejandria.
b) Se conservan las diez salas de investigacion.
c) En la biblioteca solamente se leia.
d) Solo sobreviven unos pocos estantes enmohecidos.
e) No estaba permitido comerciar rollos de papiro.`,
      preguntas: [
        { id: "a", texto: "La mayor maravilla era la ciudad de Alejandria", respuesta_correcta: "f", alternativas_aceptables: ["falso"] },
        { id: "b", texto: "Se conservan las diez salas", respuesta_correcta: "f", alternativas_aceptables: ["falso"] },
        { id: "c", texto: "Solamente se leia", respuesta_correcta: "f", alternativas_aceptables: ["falso"] },
        { id: "d", texto: "Solo sobreviven unos estantes", respuesta_correcta: "v", alternativas_aceptables: ["verdadero"] },
        { id: "e", texto: "No se permitia comerciar papiros", respuesta_correcta: "f", alternativas_aceptables: ["falso"] },
      ],
    },
  },

  produccion_escrita_narracion: {
    capa_1_2: {
      tipo: "examen_final",
      dificultad: "basico",
      instrucciones: "Continua la historia. Escribi al menos 8 renglones, un final y un titulo.",
      enunciado: `Era mi cumpleanos y mis papas me regalaron un perrito. Era pequeno, marron y muy jugueton. Lo llame Tofi.

El primer dia, Tofi se escapo al jardin y empezo a cavar un pozo. De repente...`,
      tipo_evaluacion: "produccion_manuscrita",
      criterios: { coherencia: "La historia tiene sentido", extension: "8 a 10 renglones", final: "Tiene desenlace claro", titulo: "Titulo adecuado" },
    },
    capa_3: {
      tipo: "examen_final",
      dificultad: "intermedio",
      instrucciones: "Continua la historia en 10 a 12 renglones. Inclui una comparacion y un titulo.",
      enunciado: `Lucia encontro en el desvan de su abuela una caja vieja llena de cartas amarillentas. Al abrirlas, descubrio que eran de su bisabuelo, quien habia sido capitan de barco.

En una de las cartas habia un mapa dibujado. Lucia noto que marcaba un lugar en el jardin de la casa. Sin pensarlo dos veces...`,
      tipo_evaluacion: "produccion_manuscrita",
      criterios: { coherencia: "Continuidad logica", estructura: "Nudo y desenlace", recursos: "Una comparacion", extension: "10 a 12 renglones", titulo: "Titulo adecuado" },
    },
    capa_4_5: {
      tipo: "examen_final",
      dificultad: "monserrat",
      instrucciones: "Examen final nivel Monserrat. Escribi 12 a 15 renglones con nudo, desenlace, onomatopeya, comparacion, personificacion y titulo.",
      enunciado: `En la esquina de mi casa habia un viejo galpon. Tenia las chapas del techo oxidadas, manchadas con humedad, y las paredes decoloradas. Hacia anos que estaba abandonado y nadie lo ocupaba. La gente del barrio contaba historias extranas de ese lugar. Se decia que, en las noches de luna llena, se oian gritos y llantos. Yo no creia nada de todo eso. Sin embargo, una manana mi perro se escapo de casa y, cuando sali a buscarlo, vi que entraba al galpon y comenzaba a ladrar.`,
      tipo_evaluacion: "produccion_manuscrita",
      criterios: { coherencia: "Continuidad logica", estructura: "Nudo y desenlace", recursos: "Onomatopeya, comparacion y personificacion", extension: "12 a 15 renglones", titulo: "Titulo adecuado" },
    },
  },
};

export function getExamenFinal(tema, capa = 1) {
  const examen = EXAMENES_FINALES[tema];

  if (!examen) {
    console.log(`No hay examen final definido para el tema: ${tema}`);
    return null;
  }

  if (Number(capa) <= 2) return examen.capa_1_2;
  if (Number(capa) === 3) return examen.capa_3;
  return examen.capa_4_5;
}

export function getAllTemasConExamen() {
  return Object.keys(EXAMENES_FINALES);
}

export function evaluarExamenFinal(examen, respuestaUsuario) {
  if (!examen) return { es_correcta: true, puntaje: 100, detalle: [] };

  const respuestas = parseRespuestasExamen(respuestaUsuario);

  if (examen.preguntas?.length) {
    const detalle = examen.preguntas.map((pregunta) => {
      const respuesta = respuestas[pregunta.id] || "";
      const correcta = esRespuestaAceptable(respuesta, pregunta);
      return { id: pregunta.id, correcta, respuesta };
    });
    const correctas = detalle.filter((item) => item.correcta).length;
    const puntaje = Math.round((correctas / examen.preguntas.length) * 100);
    return { es_correcta: puntaje >= 70, puntaje, detalle };
  }

  if (examen.tipo_evaluacion === "completar_texto" || examen.tipo_evaluacion === "completar_palabras") {
    const texto = normalizar(String(respuestas.texto || respuestaUsuario || ""));
    const correctas = examen.respuestas_correctas.filter((palabra) => texto.includes(normalizar(palabra))).length;
    const puntaje = Math.round((correctas / examen.respuestas_correctas.length) * 100);
    return { es_correcta: puntaje >= 80, puntaje, detalle: [{ id: "texto", correcta: puntaje >= 80, respuesta: texto }] };
  }

  if (examen.tipo_evaluacion === "produccion_manuscrita") {
    return { es_correcta: true, puntaje: 100, detalle: [{ id: "manuscrita", correcta: true, respuesta: "revision_diferida" }] };
  }

  return { es_correcta: false, puntaje: 0, detalle: [] };
}

function parseRespuestasExamen(respuestaUsuario) {
  if (typeof respuestaUsuario !== "string") return respuestaUsuario || {};
  try {
    return JSON.parse(respuestaUsuario);
  } catch {
    return { texto: respuestaUsuario };
  }
}

function esRespuestaAceptable(respuesta, pregunta) {
  const normalizada = normalizar(respuesta);
  const aceptadas = [pregunta.respuesta_correcta, ...(pregunta.alternativas_aceptables || [])].map(normalizar);
  return aceptadas.some((aceptada) => normalizada === aceptada || normalizada.includes(aceptada));
}

function normalizar(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9/.,]/g, "");
}
