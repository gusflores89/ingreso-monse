// Contenido propio de apoyo. Reglas contrastadas con Lengua Castellana, p. 11.
// La introducción visual y las actividades son adaptaciones, no exámenes oficiales.
export const VERSION_CONTENIDO_H = "h-2026-09-11-v1";
export const UNIDADES_H = [
  {
    "id": "ort_h_0_observar_palabras",
    "titulo": "La H que vemos aunque no suene",
    "explicacion": "En hormiga y cohete, la H se escribe aunque no suene. Algunas palabras se aprenden mirando su escritura: no hace falta inventar una regla para explicarlas.",
    "ejemplo": "Una hormiga mira un cohete de juguete.",
    "pasos": [
      "Mirá la H al principio de hormiga: h + ormiga.",
      "Mirá la H dentro de cohete: co + h + ete."
    ],
    "respuesta": "hormiga y cohete",
    "consigna": "Completá la palabra del ejemplo: co_ete.",
    "solucion": "cohete",
    "pista": "Volvé a mirar cohete: entre la o y la e aparece una H.",
    "base": "Reconocer letras en palabras conocidas"
  },
  {
    "id": "ort_h_1_diptongos_iniciales_hie_hue",
    "titulo": "Hielo y huevo: comienzos que se parecen",
    "explicacion": "Hielo empieza con hie- y huevo con hue-. Conservamos la H al escribir estas palabras. También la vemos en hierba, hueso y huella.",
    "ejemplo": "Guardé un huevo junto a la cubetera de hielo.",
    "pasos": [
      "Buscá el comienzo hue- en huevo.",
      "Buscá el comienzo hie- en hielo."
    ],
    "respuesta": "huevo y hielo",
    "consigna": "Completá: el agua congelada es _ielo.",
    "solucion": "hielo",
    "pista": "Mirá el modelo hielo: empieza con hie-.",
    "base": "Observar palabras con H"
  },
  {
    "id": "ort_h_2_verbos_haber_hacer_hablar",
    "titulo": "Palabras que van juntas: hacer e hizo",
    "explicacion": "Hago e hizo son formas de hacer y conservan la H. Hay viene de haber; hablo viene de hablar. Podemos mirar esas palabras como familias.",
    "ejemplo": "Hoy hago un dibujo. Ayer mi amiga hizo uno.",
    "pasos": [
      "Hago e hizo se relacionan con hacer.",
      "Escribimos H en las tres: hacer, hago, hizo."
    ],
    "respuesta": "hacer, hago, hizo",
    "consigna": "Completá: ayer mi amiga _izo un dibujo.",
    "solucion": "hizo",
    "pista": "Relacioná hizo con hacer. Las dos se escriben con H.",
    "base": "Reconocer acciones en frases"
  },
  {
    "id": "ort_h_3_hum_seguido_vocal",
    "titulo": "Humo, humedad y humilde",
    "explicacion": "Las palabras que empiezan por hum- seguido de una vocal llevan H. Mirá humo, humedad y humilde: después de hum aparece o, e o i.",
    "ejemplo": "Después de la lluvia hay humedad.",
    "pasos": [
      "Separá el comienzo: hum + edad.",
      "Después de hum está la vocal e: escribimos humedad con H."
    ],
    "respuesta": "humedad",
    "consigna": "Completá la palabra que viste: _umedad.",
    "solucion": "humedad",
    "pista": "El comienzo hum- seguido de vocal se escribe con H.",
    "base": "Reconocer las vocales"
  },
  {
    "id": "ort_h_4_comienzos_con_significado",
    "titulo": "Hidro-: un comienzo relacionado con agua",
    "explicacion": "Algunos comienzos de palabras tienen significado. Hidro- se relaciona con agua y se escribe con H. Hiper- puede indicar algo grande o excesivo, como en hipermercado.",
    "ejemplo": "Un hidromasaje utiliza agua.",
    "pasos": [
      "Buscá hidro- al principio de hidromasaje.",
      "Relacioná ese comienzo con agua para recordar la H."
    ],
    "respuesta": "hidromasaje",
    "consigna": "Completá: _idromasaje utiliza agua.",
    "solucion": "hidromasaje",
    "pista": "El comienzo hidro- se escribe con H y se relaciona con agua.",
    "base": "Identificar el comienzo de una palabra"
  },
  {
    "id": "ort_h_5_familias_sin_generalizar",
    "titulo": "Mirar la palabra completa",
    "explicacion": "Muchas palabras de una familia conservan la H: hormiga y hormiguero. Pero no todas las familias funcionan igual: hueso lleva H y óseo no. Observamos cada modelo antes de escribir.",
    "ejemplo": "La hormiga entra al hormiguero.",
    "pasos": [
      "Encontrá la H al principio de hormiga y hormiguero.",
      "Compará otro caso: hueso tiene H; óseo, que se relaciona con los huesos, no."
    ],
    "respuesta": "hormiga, hormiguero; hueso, óseo",
    "consigna": "Completá usando el modelo: la hormiga entra al _ormiguero.",
    "solucion": "hormiguero",
    "pista": "En esta familia, hormiga y hormiguero empiezan con H.",
    "base": "Reconocer palabras relacionadas"
  }
];

export function getLeccionH(objetivoId, nombre = "") {
  const u = UNIDADES_H.find(item => item.id === objetivoId) || UNIDADES_H[0];
  return {
    tipo: "leccion", contenido_version: VERSION_CONTENIDO_H,
    saludo: `${nombre ? `${nombre}, m` : "M"}iremos un ejemplo juntos`,
    explicacion_simple: u.explicacion, concepto_clave_repetir: u.pista,
    ejemplos_resueltos: [{ numero: 1, contexto: u.titulo, enunciado: u.ejemplo,
      pasos: u.pasos, respuesta: u.respuesta, refuerzo: "Podés volver a mirar el modelo cuando lo necesites." }],
    ejercicio_practica: { enunciado: u.consigna, pista: u.pista, tipo: "completar" },
    tiempo_estimado: 3,
  };
}

export const FICHA_H = {
  titulo: "La H, paso a paso", disponible: true,
  pdf_url: "/apuntes/ortografia_h.pdf", contenido_version: VERSION_CONTENIDO_H,
  slides: UNIDADES_H.map(u => ({ titulo: u.titulo,
    contenido: `${u.explicacion}\n\nEjemplo: ${u.ejemplo}\n${u.pasos.join("\n")}\n\nProbá con ayuda: ${u.consigna}`,
    concepto_clave: u.pista, visualizacion: null })),
  apunte_completo: `# La H, paso a paso

Podés hacer una sola parte por vez. Mirá el ejemplo, probá y consultá la solución al final.

${UNIDADES_H.map((u, i) => `## ${i + 1}. ${u.titulo}\n\n${u.explicacion}\n\nEjemplo resuelto: ${u.ejemplo}\n\n${u.pasos.join("\n\n")}\n\nPara probar: ${u.consigna}`).join("\n\n")}

## Soluciones para revisar con calma

${UNIDADES_H.map((u, i) => `${i + 1}. ${u.solucion}. ${u.pista}`).join("\n\n")}

## Fuente y alcance

Material de apoyo creado para la aplicación. Reglas contrastadas con el Cuadernillo de Nivelación de Lengua Castellana del Colegio Nacional de Monserrat, página 11, apartado Usos de h. Ejemplos y actividades adaptados. Esta ficha permite empezar y repasar; no sustituye el cuadernillo completo ni es un documento oficial del colegio.
`
};
