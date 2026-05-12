export const EJERCICIOS_MANUSCRITOS = {
  ortografia_b_v: {
    tipo: "dictado",
    instruccion:
      "Pedile a mama o papa que te dicte estas 10 oraciones. Escribilas en tu cuaderno prestando atencion a las palabras con B y V.",
    tiempo_estimado: 15,
    oraciones: [
      "El abuelo caminaba lentamente por el parque.",
      "La biblioteca municipal abre los sabados.",
      "Observabamos las estrellas desde la ventana.",
      "Mi hermano guardaba sus libros en el estante.",
      "Las abejas volaban sobre las flores silvestres.",
      "Bailabamos en la fiesta de cumpleanos.",
      "El lobo aullaba en la noche fria.",
      "Viajabamos en autobus todos los veranos.",
      "La maestra explicaba con voz suave.",
      "Cantabamos canciones durante el viaje.",
    ],
  },

  ortografia_g_j_gu_gu: {
    tipo: "dictado",
    instruccion:
      "Pedile a mama o papa que te dicte estas 10 oraciones. Presta atencion a las palabras con G, J, GU y GUE.",
    tiempo_estimado: 15,
    oraciones: [
      "El mago hizo aparecer un conejo.",
      "Mi hermana eligio el vestido rojo.",
      "Recogimos flores en el jardin.",
      "El reloj marcaba las tres en punto.",
      "Protegemos a los animales en peligro.",
      "La jirafa comia hojas del arbol.",
      "El viajero cruzo el paisaje montanoso.",
      "Dirigio la orquesta con elegancia.",
      "El mensaje llego tarde por la tormenta.",
      "Corregimos los errores del trabajo.",
    ],
  },

  ortografia_g_j: {
    tipo: "dictado",
    instruccion:
      "Pedile a mama o papa que te dicte estas 10 oraciones. Presta atencion a las palabras con G y J.",
    tiempo_estimado: 15,
    oraciones: [
      "El mago hizo aparecer un conejo.",
      "Mi hermana eligio el vestido rojo.",
      "Recogimos flores en el jardin.",
      "El reloj marcaba las tres en punto.",
      "Protegemos a los animales en peligro.",
      "La jirafa comia hojas del arbol.",
      "El viajero cruzo el paisaje montanoso.",
      "Dirigio la orquesta con elegancia.",
      "El mensaje llego tarde por la tormenta.",
      "Corregimos los errores del trabajo.",
    ],
  },

  ortografia_h: {
    tipo: "copia",
    instruccion: "Copia este texto en tu cuaderno. Presta especial atencion a las palabras con H.",
    tiempo_estimado: 12,
    texto:
      "Habia una vez un nino huerfano que vivia con su hermano en una pequena casa junto al rio. Cada dia hacian sus tareas con mucha dedicacion. El hermano mayor trabajaba honestamente para mantener el hogar. Un dia de invierno, hallaron un cachorro abandonado en el hueco de un arbol. Lo llevaron a casa y le dieron comida caliente. Desde entonces, el animal fue un companero fiel que habito con ellos durante muchos anos.",
  },

  produccion_escrita_narracion: {
    tipo: "narracion",
    instruccion:
      "Escribi una narracion de 15 renglones sobre el siguiente inicio de historia. Debe tener complicacion y resolucion.",
    tiempo_estimado: 25,
    inicio: "Abril encontro una llave misteriosa en el patio de su escuela...",
    requisitos: [
      "15 renglones minimo",
      "Inicio, complicacion y desenlace claros",
      "Usar al menos UNA comparacion (ej: brillaba como una estrella)",
      "Sin dialogos",
      "Usar punto y aparte al menos 2 veces",
    ],
  },

  concordancia_sujeto_verbo: {
    tipo: "completar",
    instruccion: "Completa estas 12 oraciones con el verbo correcto. Presta atencion a la concordancia.",
    tiempo_estimado: 10,
    oraciones: [
      "Los ninos _____ (jugar) en el parque.",
      "Mi hermana y yo _____ (estudiar) juntas.",
      "El perro y el gato _____ (dormir) en el sillon.",
      "Tu _____ (cantar) muy bien.",
      "Ellas _____ (bailar) en la fiesta.",
      "Nosotros _____ (comer) helado.",
      "La maestra _____ (explicar) la leccion.",
      "Los pajaros _____ (volar) alto.",
      "Vos _____ (correr) rapido.",
      "Ustedes _____ (escribir) con letra clara.",
      "El sol y la luna _____ (brillar) en el cielo.",
      "Ana y Sofia _____ (llegar) temprano.",
    ],
  },
};

export function getTareaManuscrita(tema) {
  return EJERCICIOS_MANUSCRITOS[tema] || null;
}
