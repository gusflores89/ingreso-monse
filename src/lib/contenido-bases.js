export const VERSION_BASES = "bases-2026-09-12-v1";
export const UNIDADES_BASES = [
  {
    "id": "frac_con_1_partes_iguales",
    "tema": "fracciones_concepto",
    "titulo": "Primero, partes del mismo tamaño",
    "explicacion": "Una fracción puede describir una parte de un entero. Para contar sus partes con una fracción, primero las dividimos en tamaños iguales. Dos trozos de tamaños distintos no son dos mitades.",
    "ejemplo": "Una barra dividida en dos partes iguales tiene dos mitades.",
    "pasos": [
      "Mirá la barra completa: ese es nuestro entero.",
      "Las dos partes ocupan el mismo espacio. Cada una es una mitad."
    ],
    "pista": "Compará el tamaño de las partes, no solo cuántas hay.",
    "actividades": [
      {
        "enunciado": "¿Qué barra está dividida en partes iguales?",
        "respuesta_correcta": "A",
        "opciones": [
          "A",
          "B"
        ],
        "visual": [
          {
            "label": "A",
            "partes": [
              1,
              1
            ],
            "pintadas": 1
          },
          {
            "label": "B",
            "partes": [
              1,
              3
            ],
            "pintadas": 1
          }
        ],
        "id": "frac_con_1_partes_iguales-v1",
        "paso_resuelto": "En A las dos partes tienen el mismo ancho. En B una es más grande. Elegimos A."
      },
      {
        "enunciado": "¿En qué barra cada parte es una mitad?",
        "respuesta_correcta": "B",
        "opciones": [
          "A",
          "B"
        ],
        "visual": [
          {
            "label": "A",
            "partes": [
              3,
              1
            ],
            "pintadas": 1
          },
          {
            "label": "B",
            "partes": [
              1,
              1
            ],
            "pintadas": 1
          }
        ],
        "id": "frac_con_1_partes_iguales-v2",
        "paso_resuelto": "En B las dos partes ocupan la mitad del entero. En A tienen tamaños distintos. Elegimos B."
      },
      {
        "enunciado": "¿Qué barra tiene cuatro partes iguales?",
        "respuesta_correcta": "A",
        "opciones": [
          "A",
          "B"
        ],
        "visual": [
          {
            "label": "A",
            "partes": [
              1,
              1,
              1,
              1
            ],
            "pintadas": 1
          },
          {
            "label": "B",
            "partes": [
              1,
              1,
              1,
              3
            ],
            "pintadas": 1
          }
        ],
        "id": "frac_con_1_partes_iguales-v3",
        "paso_resuelto": "En A hay cuatro partes del mismo ancho. En B la última es mayor. Elegimos A."
      }
    ],
    "visual": [
      {
        "label": "Barra",
        "partes": [
          1,
          1
        ],
        "pintadas": 1
      }
    ]
  },
  {
    "id": "frac_con_2_num_den",
    "tema": "fracciones_concepto",
    "titulo": "Cómo se escribe una fracción",
    "explicacion": "En 1/4, el 4 de abajo cuenta las partes iguales del entero: es el denominador. El 1 de arriba cuenta las partes pintadas: es el numerador.",
    "ejemplo": "Si pintamos una de cuatro partes iguales, escribimos 1/4.",
    "pasos": [
      "Contamos todas las partes: hay 4. Escribimos 4 abajo.",
      "Contamos las pintadas: hay 1. Escribimos 1 arriba."
    ],
    "pista": "Primero contá todas las partes; después, las pintadas.",
    "actividades": [
      {
        "enunciado": "¿Qué fracción de la barra está pintada?",
        "respuesta_correcta": "2/4",
        "opciones": [
          "2/4",
          "4/2",
          "1/4"
        ],
        "visual": [
          {
            "label": "Barra",
            "partes": [
              1,
              1,
              1,
              1
            ],
            "pintadas": 2
          }
        ],
        "id": "frac_con_2_num_den-v1",
        "paso_resuelto": "Hay 4 partes iguales en total y 2 pintadas: 2/4."
      },
      {
        "enunciado": "¿Qué fracción está pintada?",
        "respuesta_correcta": "1/3",
        "opciones": [
          "3/1",
          "2/3",
          "1/3"
        ],
        "visual": [
          {
            "label": "Barra",
            "partes": [
              1,
              1,
              1
            ],
            "pintadas": 1
          }
        ],
        "id": "frac_con_2_num_den-v2",
        "paso_resuelto": "Hay 3 partes iguales y 1 pintada: 1/3."
      },
      {
        "enunciado": "Escribí la fracción pintada.",
        "respuesta_correcta": "3/5",
        "opciones": [
          "2/5",
          "3/5",
          "5/3"
        ],
        "visual": [
          {
            "label": "Barra",
            "partes": [
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 3
          }
        ],
        "id": "frac_con_2_num_den-v3",
        "paso_resuelto": "Hay 5 partes iguales y 3 pintadas: 3/5."
      }
    ],
    "visual": [
      {
        "label": "Barra",
        "partes": [
          1,
          1,
          1,
          1
        ],
        "pintadas": 1
      }
    ]
  },
  {
    "id": "frac_con_3_unidad_referencia",
    "tema": "fracciones_concepto",
    "titulo": "La mitad de una colección",
    "explicacion": "El entero también puede ser una colección completa. Si tenemos 8 fichas y las repartimos en dos grupos iguales, cada mitad tiene 4 fichas. Siempre preguntamos cuál es el total.",
    "ejemplo": "La mitad de 8 fichas es 4.",
    "pasos": [
      "El entero son las 8 fichas juntas.",
      "Formamos dos grupos iguales: 4 y 4. Un grupo es la mitad."
    ],
    "pista": "Repartí el total en dos grupos del mismo tamaño.",
    "actividades": [
      {
        "enunciado": "Tenés 6 fichas. ¿Cuántas hay en la mitad?",
        "respuesta_correcta": "3",
        "opciones": [
          "3",
          "2",
          "6"
        ],
        "visual": null,
        "id": "frac_con_3_unidad_referencia-v1",
        "paso_resuelto": "Repartimos 6 fichas: 3 para cada grupo. 3 + 3 = 6. La mitad es 3."
      },
      {
        "enunciado": "De 10 figuritas, regalás la mitad. ¿Cuántas regalás?",
        "respuesta_correcta": "5",
        "opciones": [
          "2",
          "10",
          "5"
        ],
        "visual": null,
        "id": "frac_con_3_unidad_referencia-v2",
        "paso_resuelto": "Dos grupos de 5 forman las 10 figuritas. La mitad es 5."
      },
      {
        "enunciado": "Hay 12 lápices. ¿Cuántos forman la mitad?",
        "respuesta_correcta": "6",
        "opciones": [
          "12",
          "6",
          "3"
        ],
        "visual": null,
        "id": "frac_con_3_unidad_referencia-v3",
        "paso_resuelto": "6 + 6 = 12. Cada mitad de los 12 lápices tiene 6."
      }
    ],
    "visual": [
      {
        "label": "Barra",
        "partes": [
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        "pintadas": 4
      }
    ]
  },
  {
    "id": "frac_con_4_equivalencias_visuales",
    "tema": "fracciones_concepto",
    "titulo": "La misma cantidad, otros cortes",
    "explicacion": "Dos fracciones son equivalentes cuando representan la misma cantidad del mismo entero. Si cortamos cada mitad otra vez, una mitad ocupa lo mismo que dos cuartos.",
    "ejemplo": "1/2 y 2/4 representan la misma cantidad.",
    "pasos": [
      "Compará barras del mismo largo.",
      "En ambas está pintada la mitad, aunque cambie el número de cortes."
    ],
    "pista": "Compará cuánto espacio está pintado en enteros del mismo tamaño.",
    "actividades": [
      {
        "enunciado": "¿1/2 y 2/4 representan la misma cantidad?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "visual": [
          {
            "label": "A",
            "partes": [
              1,
              1
            ],
            "pintadas": 1
          },
          {
            "label": "B",
            "partes": [
              1,
              1,
              1,
              1
            ],
            "pintadas": 2
          }
        ],
        "id": "frac_con_4_equivalencias_visuales-v1",
        "paso_resuelto": "Las dos barras tienen el mismo largo. La parte pintada llega al mismo lugar: 1/2 = 2/4. Sí."
      },
      {
        "enunciado": "¿2/3 y 4/6 representan la misma cantidad?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "No",
          "Sí"
        ],
        "visual": [
          {
            "label": "A",
            "partes": [
              1,
              1,
              1
            ],
            "pintadas": 2
          },
          {
            "label": "B",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 4
          }
        ],
        "id": "frac_con_4_equivalencias_visuales-v2",
        "paso_resuelto": "Cada tercio se divide en dos sextos. Dos tercios son cuatro sextos: 2/3 = 4/6. Sí."
      },
      {
        "enunciado": "¿1/2 y 3/4 representan la misma cantidad?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "visual": [
          {
            "label": "A",
            "partes": [
              1,
              1
            ],
            "pintadas": 1
          },
          {
            "label": "B",
            "partes": [
              1,
              1,
              1,
              1
            ],
            "pintadas": 3
          }
        ],
        "id": "frac_con_4_equivalencias_visuales-v3",
        "paso_resuelto": "Una mitad equivale a 2/4. Tres cuartos son más que dos cuartos. No son equivalentes."
      }
    ],
    "visual": [
      {
        "label": "A",
        "partes": [
          1,
          1
        ],
        "pintadas": 1
      },
      {
        "label": "B",
        "partes": [
          1,
          1,
          1,
          1
        ],
        "pintadas": 2
      }
    ]
  },
  {
    "id": "bases_multiplos_saltos",
    "tema": "divisibilidad_primos_mcm_mcd",
    "titulo": "Múltiplos: avanzar con saltos iguales",
    "explicacion": "Los múltiplos de 3 aparecen al sumar 3 cada vez: 0, 3, 6, 9, 12... También son resultados de multiplicar 3 por 0, 1, 2, 3... Un divisor permite repartir sin sobrante: 3 es divisor de 12 porque 12 se reparte en 3 grupos de 4.",
    "ejemplo": "Para listar múltiplos positivos de 4, avanzamos 4, 8, 12, 16.",
    "pasos": [
      "Empezamos en 4.",
      "Sumamos 4 otra vez: 8. Repetimos: 12, 16."
    ],
    "pista": "Sumá el tamaño del salto para encontrar el siguiente múltiplo.",
    "actividades": [
      {
        "enunciado": "Saltamos de 3 en 3: 3, 6, 9... ¿cuál sigue?",
        "respuesta_correcta": "12",
        "opciones": [
          "12",
          "10",
          "11"
        ],
        "visual": null,
        "id": "bases_multiplos_saltos-v1",
        "paso_resuelto": "Al 9 le sumamos otro salto de 3: 9 + 3 = 12."
      },
      {
        "enunciado": "Saltamos de 4 en 4: 4, 8, 12... ¿cuál sigue?",
        "respuesta_correcta": "16",
        "opciones": [
          "14",
          "15",
          "16"
        ],
        "visual": null,
        "id": "bases_multiplos_saltos-v2",
        "paso_resuelto": "Al 12 le sumamos otro salto de 4: 12 + 4 = 16."
      },
      {
        "enunciado": "Saltamos de 5 en 5: 5, 10, 15... ¿cuál sigue?",
        "respuesta_correcta": "20",
        "opciones": [
          "25",
          "20",
          "16"
        ],
        "visual": null,
        "id": "bases_multiplos_saltos-v3",
        "paso_resuelto": "Al 15 le sumamos otro salto de 5: 15 + 5 = 20."
      }
    ],
    "visual": null
  },
  {
    "id": "div_primos_4_mcm",
    "tema": "divisibilidad_primos_mcm_mcd",
    "titulo": "MCM: el primer encuentro",
    "explicacion": "El mínimo común múltiplo, o MCM, es el menor número positivo que aparece en las dos listas de múltiplos. No elegimos el 0. Podemos encontrarlo haciendo listas: no hace falta descomponer en primos para empezar.",
    "ejemplo": "MCM de 2 y 3: listas 2, 4, 6... y 3, 6... El primer encuentro positivo es 6.",
    "pasos": [
      "Anotá múltiplos positivos de cada número.",
      "Buscá el primero que comparten. Para 2 y 3 es 6."
    ],
    "pista": "Armá las dos listas y buscá la coincidencia positiva más pequeña.",
    "actividades": [
      {
        "enunciado": "Listas: 2, 4, 6, 8... y 4, 8, 12... ¿cuál es el MCM de 2 y 4?",
        "respuesta_correcta": "4",
        "opciones": [
          "4",
          "0",
          "8"
        ],
        "visual": null,
        "id": "div_primos_4_mcm-v1",
        "paso_resuelto": "Múltiplos de 2: 2, 4, 6... De 4: 4, 8... El primer común positivo es 4."
      },
      {
        "enunciado": "Listas: 3, 6, 9, 12... y 4, 8, 12... ¿cuál es el MCM de 3 y 4?",
        "respuesta_correcta": "12",
        "opciones": [
          "7",
          "24",
          "12"
        ],
        "visual": null,
        "id": "div_primos_4_mcm-v2",
        "paso_resuelto": "Múltiplos de 3: 3, 6, 9, 12... De 4: 4, 8, 12... El primero común es 12."
      },
      {
        "enunciado": "Listas: 4, 8, 12, 16... y 6, 12, 18... ¿cuál es el MCM de 4 y 6?",
        "respuesta_correcta": "12",
        "opciones": [
          "24",
          "12",
          "0"
        ],
        "visual": null,
        "id": "div_primos_4_mcm-v3",
        "paso_resuelto": "De 4: 4, 8, 12... De 6: 6, 12... El primer encuentro positivo es 12; 24 es común, pero no es el menor."
      }
    ],
    "visual": null
  },
  {
    "id": "frac_op_1_igual_denominador",
    "tema": "fracciones_operaciones",
    "titulo": "Sumar partes del mismo tamaño",
    "explicacion": "Si las fracciones tienen el mismo denominador, sus partes tienen el mismo tamaño. Sumamos o restamos cuántas partes tenemos y conservamos ese denominador.",
    "ejemplo": "1/5 + 2/5 = 3/5. Juntamos un quinto y dos quintos: tres quintos.",
    "pasos": [
      "Las partes son quintos en las dos fracciones.",
      "Sumamos 1 + 2 = 3 partes. El tamaño sigue siendo un quinto."
    ],
    "pista": "Sumá o restá los números de arriba. El de abajo indica el tamaño y se conserva.",
    "actividades": [
      {
        "enunciado": "Resolvé 1/6 + 2/6.",
        "respuesta_correcta": "3/6",
        "opciones": [
          "3/6",
          "3/12",
          "2/6"
        ],
        "visual": null,
        "id": "frac_op_1_igual_denominador-v1",
        "paso_resuelto": "Los denominadores son 6. Sumamos 1 + 2 = 3 y conservamos sextos: 3/6."
      },
      {
        "enunciado": "Resolvé 2/5 + 2/5.",
        "respuesta_correcta": "4/5",
        "opciones": [
          "4/10",
          "2/10",
          "4/5"
        ],
        "visual": null,
        "id": "frac_op_1_igual_denominador-v2",
        "paso_resuelto": "Sumamos 2 + 2 = 4 partes. Siguen siendo quintos: 4/5."
      },
      {
        "enunciado": "Resolvé 4/7 − 1/7.",
        "respuesta_correcta": "3/7",
        "opciones": [
          "5/7",
          "3/7",
          "3/0"
        ],
        "visual": null,
        "id": "frac_op_1_igual_denominador-v3",
        "paso_resuelto": "De 4 séptimos quitamos 1 séptimo. Quedan 3 séptimos: 3/7."
      }
    ],
    "visual": [
      {
        "label": "Barra",
        "partes": [
          1,
          1,
          1,
          1,
          1
        ],
        "pintadas": 3
      }
    ]
  },
  {
    "id": "frac_op_2_distinto_denominador",
    "tema": "fracciones_operaciones",
    "titulo": "Buscar partes del mismo tamaño",
    "explicacion": "Para sumar mitades y cuartos, primero los expresamos con el mismo tamaño de parte. El MCM ayuda a elegir un denominador común. Cambiamos la escritura de la fracción, sin cambiar su cantidad.",
    "ejemplo": "1/2 + 1/4 = 2/4 + 1/4 = 3/4.",
    "pasos": [
      "El MCM de 2 y 4 es 4. Trabajamos con cuartos.",
      "Una mitad equivale a 2/4. Ahora sumamos 2/4 + 1/4."
    ],
    "pista": "Buscá un denominador común y convertí las fracciones antes de sumar.",
    "actividades": [
      {
        "enunciado": "1/2 equivale a 2/4. ¿Cuánto es 1/2 + 1/4?",
        "respuesta_correcta": "3/4",
        "opciones": [
          "3/4",
          "2/6",
          "1/4"
        ],
        "visual": null,
        "id": "frac_op_2_distinto_denominador-v1",
        "paso_resuelto": "MCM(2,4) = 4. Una mitad son 2/4. Sumamos 2/4 + 1/4 = 3/4."
      },
      {
        "enunciado": "¿Cuánto es 1/3 + 1/6?",
        "respuesta_correcta": "3/6",
        "opciones": [
          "2/9",
          "1/6",
          "3/6"
        ],
        "visual": null,
        "id": "frac_op_2_distinto_denominador-v2",
        "paso_resuelto": "MCM(3,6) = 6. Un tercio son 2/6. Sumamos 2/6 + 1/6 = 3/6."
      },
      {
        "enunciado": "¿Cuánto es 3/4 − 1/2?",
        "respuesta_correcta": "1/4",
        "opciones": [
          "2/4",
          "1/4",
          "2/2"
        ],
        "visual": null,
        "id": "frac_op_2_distinto_denominador-v3",
        "paso_resuelto": "MCM(4,2) = 4. Una mitad son 2/4. Restamos 3/4 − 2/4 = 1/4."
      }
    ],
    "visual": [
      {
        "label": "Una mitad",
        "partes": [
          1,
          1
        ],
        "pintadas": 1
      },
      {
        "label": "Dos cuartos",
        "partes": [
          1,
          1,
          1,
          1
        ],
        "pintadas": 2
      }
    ]
  }
];

export const TEMAS_BASES = [...new Set(UNIDADES_BASES.map(u => u.tema))];
export function getUnidadBase(id) { return UNIDADES_BASES.find(u => u.id === id) || null; }
export function crearActividadBase(id, modo, sesiones = []) {
 const u = getUnidadBase(id); if (!u) return null;
 const previas = sesiones.filter(s => s.ia_parametros_usados?.objetivo_id === id && s.tipo_pregunta !== 'leccion');
 const actividad = modo === 'leccion' ? u.actividades[0] : u.actividades[1 + (previas.length % (u.actividades.length - 1))];
 const base = { contenido_version: VERSION_BASES, actividad_id: actividad.id, unidad_titulo: u.titulo, tiempo_estimado: 3 };
 if (modo === 'leccion') return {...base, tipo:'leccion', saludo:'Miremos una idea juntos', explicacion_simple:u.explicacion, concepto_clave_repetir:u.pista, visual_apoyo:u.visual,
 ejemplos_resueltos:[{numero:1,enunciado:u.ejemplo,pasos:u.pasos,respuesta:u.ejemplo,visual:u.visual}],
 ejercicio_practica:{...actividad,tipo:'multiple'}, opciones:actividad.opciones};
 return {...base,tipo:'practica',tipo_pregunta:'multiple',pregunta:actividad.enunciado,opciones:actividad.opciones,visual_apoyo:actividad.visual};
}
export function evaluarActividadBase(sesion, respuesta, noVisto=false) {
 const p=sesion.ia_parametros_usados || {};
 if(p.contenido_version !== VERSION_BASES) return null;
 const u=getUnidadBase(p.objetivo_id), a=u?.actividades.find(a=>a.id===p.actividad_id);
 if(!a) throw new Error('No se encuentra la actividad de esta versión.');
 const correcta=String(respuesta).normalize('NFC').trim().toLowerCase()===a.respuesta_correcta.toLowerCase();
 return {es_correcta:noVisto?null:correcta, retroalimentacion:noVisto?u.explicacion:correcta?'¡Lo resolviste! Podés seguir cuando quieras.':'Miremos una pista y probemos otra vez.',pista_concreta:u.pista,paso_resuelto:a.paso_resuelto,razon_error:(noVisto || correcta)?null:'Revisemos este paso.'};
}
export function getFichaBase(tema) {
 const unidades=UNIDADES_BASES.filter(u=>u.tema===tema);if(!unidades.length)return null;
 return {titulo:'Primeros pasos: '+tema.replaceAll('_',' '),disponible:true,pdf_url:'/apuntes/bases-'+tema+'.pdf',contenido_version:VERSION_BASES,
 slides:unidades.map(u=>({titulo:u.titulo,contenido:u.explicacion+'\n\n'+u.ejemplo+'\n'+u.pasos.join('\n'),concepto_clave:u.pista})),
 apunte_completo:unidades.map(u=>'## '+u.titulo+'\n\n'+u.explicacion+'\n\n'+u.ejemplo+'\n\n'+u.pasos.join('\n')+'\n\nPara probar: '+u.actividades[0].enunciado+'\nRespuesta para revisar: '+u.actividades[0].respuesta_correcta).join('\n\n')};
}
