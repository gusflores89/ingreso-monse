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
      },
      {
        "id": "frac_con_1_partes_iguales-v4",
        "enunciado": "¿Qué barra tiene 3 partes del mismo tamaño?",
        "respuesta_correcta": "B",
        "opciones": [
          "A",
          "B"
        ],
        "paso_resuelto": "En B, las 3 partes tienen el mismo ancho. En la otra barra, la última parte es mayor.",
        "visual": [
          {
            "label": "A",
            "partes": [
              1,
              1,
              3
            ],
            "pintadas": 1
          },
          {
            "label": "B",
            "partes": [
              1,
              1,
              1
            ],
            "pintadas": 1
          }
        ]
      },
      {
        "id": "frac_con_1_partes_iguales-v5",
        "enunciado": "¿Qué barra tiene 5 partes del mismo tamaño?",
        "respuesta_correcta": "A",
        "opciones": [
          "B",
          "A"
        ],
        "paso_resuelto": "En A, las 5 partes tienen el mismo ancho. En la otra barra, la última parte es mayor.",
        "visual": [
          {
            "label": "A",
            "partes": [
              1,
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
              1,
              3
            ],
            "pintadas": 1
          }
        ]
      },
      {
        "id": "frac_con_1_partes_iguales-v6",
        "enunciado": "¿Qué barra tiene 6 partes del mismo tamaño?",
        "respuesta_correcta": "B",
        "opciones": [
          "B",
          "A"
        ],
        "paso_resuelto": "En B, las 6 partes tienen el mismo ancho. En la otra barra, la última parte es mayor.",
        "visual": [
          {
            "label": "A",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              3
            ],
            "pintadas": 1
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
            "pintadas": 1
          }
        ]
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
      },
      {
        "id": "frac_con_2_num_den-v4",
        "enunciado": "¿Qué fracción de esta barra está pintada?",
        "respuesta_correcta": "5/6",
        "opciones": [
          "1/6",
          "5/6",
          "6/5"
        ],
        "paso_resuelto": "Hay 6 partes iguales y 5 pintadas. Escribimos 5/6.",
        "visual": [
          {
            "label": "Barra",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 5
          }
        ]
      },
      {
        "id": "frac_con_2_num_den-v5",
        "enunciado": "¿Qué fracción de esta barra está pintada?",
        "respuesta_correcta": "3/8",
        "opciones": [
          "5/8",
          "3/8",
          "8/3"
        ],
        "paso_resuelto": "Hay 8 partes iguales y 3 pintadas. Escribimos 3/8.",
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
            "pintadas": 3
          }
        ]
      },
      {
        "id": "frac_con_2_num_den-v6",
        "enunciado": "¿Qué fracción de esta barra está pintada?",
        "respuesta_correcta": "1/5",
        "opciones": [
          "5/1",
          "4/5",
          "1/5"
        ],
        "paso_resuelto": "Hay 5 partes iguales y 1 pintadas. Escribimos 1/5.",
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
            "pintadas": 1
          }
        ]
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
      },
      {
        "id": "frac_con_3_unidad_referencia-v4",
        "enunciado": "La colección tiene 14 semillas. ¿Cuántas forman la mitad?",
        "respuesta_correcta": "7",
        "opciones": [
          "14",
          "8",
          "7"
        ],
        "paso_resuelto": "Repartimos en dos grupos iguales: 7 + 7 = 14. Cada mitad tiene 7.",
        "visual": null
      },
      {
        "id": "frac_con_3_unidad_referencia-v5",
        "enunciado": "La colección tiene 16 cuentas. ¿Cuántas forman la mitad?",
        "respuesta_correcta": "8",
        "opciones": [
          "8",
          "9",
          "16"
        ],
        "paso_resuelto": "Repartimos en dos grupos iguales: 8 + 8 = 16. Cada mitad tiene 8.",
        "visual": null
      },
      {
        "id": "frac_con_3_unidad_referencia-v6",
        "enunciado": "La colección tiene 18 cartas. ¿Cuántas forman la mitad?",
        "respuesta_correcta": "9",
        "opciones": [
          "10",
          "9",
          "18"
        ],
        "paso_resuelto": "Repartimos en dos grupos iguales: 9 + 9 = 18. Cada mitad tiene 9.",
        "visual": null
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
      },
      {
        "id": "frac_con_4_equivalencias_visuales-v4",
        "enunciado": "¿1/3 y 2/6 representan la misma cantidad del mismo entero?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "1/3 equivale a 2/6. Coincide con 2/6.",
        "visual": [
          {
            "label": "A",
            "partes": [
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
              1,
              1,
              1
            ],
            "pintadas": 2
          }
        ]
      },
      {
        "id": "frac_con_4_equivalencias_visuales-v5",
        "enunciado": "¿1/4 y 3/8 representan la misma cantidad del mismo entero?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "1/4 equivale a 2/8. No coincide con 3/8.",
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
        "id": "frac_con_4_equivalencias_visuales-v6",
        "enunciado": "¿3/4 y 6/8 representan la misma cantidad del mismo entero?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "3/4 equivale a 6/8. Coincide con 6/8.",
        "visual": [
          {
            "label": "A",
            "partes": [
              1,
              1,
              1,
              1
            ],
            "pintadas": 3
          },
          {
            "label": "B",
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
            "pintadas": 6
          }
        ]
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
    "explicacion": "Los múltiplos de 3 aparecen al sumar 3 cada vez: 0, 3, 6, 9, 12... También son resultados de multiplicar 3 por 0, 1, 2, 3... Cada salto tiene el mismo tamaño.",
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
      },
      {
        "id": "bases_multiplos_saltos-v4",
        "enunciado": "Saltamos de 2 en 2: 2, 4, 6... ¿cuál sigue?",
        "respuesta_correcta": "8",
        "opciones": [
          "10",
          "8",
          "7"
        ],
        "paso_resuelto": "Sumamos un salto más: 6 + 2 = 8.",
        "visual": null
      },
      {
        "id": "bases_multiplos_saltos-v5",
        "enunciado": "Saltamos de 6 en 6: 6, 12, 18... ¿cuál sigue?",
        "respuesta_correcta": "24",
        "opciones": [
          "24",
          "19",
          "30"
        ],
        "paso_resuelto": "Sumamos un salto más: 18 + 6 = 24.",
        "visual": null
      },
      {
        "id": "bases_multiplos_saltos-v6",
        "enunciado": "Saltamos de 7 en 7: 7, 14, 21... ¿cuál sigue?",
        "respuesta_correcta": "28",
        "opciones": [
          "35",
          "22",
          "28"
        ],
        "paso_resuelto": "Sumamos un salto más: 21 + 7 = 28.",
        "visual": null
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
      },
      {
        "id": "div_primos_4_mcm-v4",
        "enunciado": "Buscá el MCM de 2 y 5 haciendo listas de múltiplos positivos.",
        "respuesta_correcta": "10",
        "opciones": [
          "20",
          "10",
          "0"
        ],
        "paso_resuelto": "Múltiplos de 2: 2, 4, 6, 8, 10.\nMúltiplos de 5: 5, 10.\nEl primer encuentro positivo es 10.",
        "visual": null
      },
      {
        "id": "div_primos_4_mcm-v5",
        "enunciado": "Buscá el MCM de 3 y 6 haciendo listas de múltiplos positivos.",
        "respuesta_correcta": "6",
        "opciones": [
          "12",
          "6",
          "0"
        ],
        "paso_resuelto": "Múltiplos de 3: 3, 6.\nMúltiplos de 6: 6.\nEl primer encuentro positivo es 6.",
        "visual": null
      },
      {
        "id": "div_primos_4_mcm-v6",
        "enunciado": "Buscá el MCM de 4 y 5 haciendo listas de múltiplos positivos.",
        "respuesta_correcta": "20",
        "opciones": [
          "40",
          "0",
          "20"
        ],
        "paso_resuelto": "Múltiplos de 4: 4, 8, 12, 16, 20.\nMúltiplos de 5: 5, 10, 15, 20.\nEl primer encuentro positivo es 20.",
        "visual": null
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
      },
      {
        "id": "frac_op_1_igual_denominador-v4",
        "enunciado": "Resolvé 1/8 + 3/8.",
        "respuesta_correcta": "4/8",
        "opciones": [
          "4/8",
          "5/8",
          "4/16"
        ],
        "paso_resuelto": "1 + 3 = 4. Conservamos el tamaño de las partes: 4/8.",
        "visual": null
      },
      {
        "id": "frac_op_1_igual_denominador-v5",
        "enunciado": "Resolvé 5/6 − 2/6.",
        "respuesta_correcta": "3/6",
        "opciones": [
          "4/6",
          "3/12",
          "3/6"
        ],
        "paso_resuelto": "5 − 2 = 3. Conservamos el tamaño de las partes: 3/6.",
        "visual": null
      },
      {
        "id": "frac_op_1_igual_denominador-v6",
        "enunciado": "Resolvé 2/7 + 1/7.",
        "respuesta_correcta": "3/7",
        "opciones": [
          "3/7",
          "4/7",
          "3/14"
        ],
        "paso_resuelto": "2 + 1 = 3. Conservamos el tamaño de las partes: 3/7.",
        "visual": null
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
      },
      {
        "id": "frac_op_2_distinto_denominador-v4",
        "enunciado": "Resolvé 1/2 + 1/6.",
        "respuesta_correcta": "4/6",
        "opciones": [
          "3/6",
          "2/8",
          "4/6"
        ],
        "paso_resuelto": "El MCM de 2 y 6 es 6.\nConvertimos: 1/2 = 3/6 y 1/6 = 1/6.\n3/6 + 1/6 = 4/6.",
        "visual": null
      },
      {
        "id": "frac_op_2_distinto_denominador-v5",
        "enunciado": "Resolvé 1/4 + 1/8.",
        "respuesta_correcta": "3/8",
        "opciones": [
          "2/12",
          "3/8",
          "2/8"
        ],
        "paso_resuelto": "El MCM de 4 y 8 es 8.\nConvertimos: 1/4 = 2/8 y 1/8 = 1/8.\n2/8 + 1/8 = 3/8.",
        "visual": null
      },
      {
        "id": "frac_op_2_distinto_denominador-v6",
        "enunciado": "Resolvé 5/6 − 1/3.",
        "respuesta_correcta": "3/6",
        "opciones": [
          "3/6",
          "6/9",
          "4/6"
        ],
        "paso_resuelto": "El MCM de 6 y 3 es 6.\nConvertimos: 5/6 = 5/6 y 1/3 = 2/6.\n5/6 − 2/6 = 3/6.",
        "visual": null
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
  },
  {
    "id": "frac_op_3_fraccion_cantidad",
    "tema": "fracciones_operaciones",
    "titulo": "Una fracción de una colección",
    "explicacion": "Para hallar una fracción de una cantidad, repartimos el total en tantos grupos iguales como indica el denominador. Después tomamos los grupos que indica el numerador.",
    "ejemplo": "2/3 de 12 fichas son 8 fichas.",
    "pasos": [
      "Repartimos 12 en 3 grupos: 12 ÷ 3 = 4 en cada grupo.",
      "Tomamos 2 grupos: 4 × 2 = 8."
    ],
    "pista": "Primero encontrá cuánto vale un grupo; después elegí cuántos grupos tomar.",
    "visual": null,
    "actividades": [
      {
        "id": "frac_op_3_fraccion_cantidad-v1",
        "enunciado": "Hay 9 fichas. ¿Cuántas son 2/3 de la colección?",
        "respuesta_correcta": "6",
        "opciones": [
          "3",
          "9",
          "6"
        ],
        "paso_resuelto": "Repartimos 9 en 3 grupos: 9 ÷ 3 = 3.\nTomamos 2 grupos: 3 × 2 = 6 fichas.",
        "visual": null
      },
      {
        "id": "frac_op_3_fraccion_cantidad-v2",
        "enunciado": "Hay 12 fichas. ¿Cuántas son 3/4 de la colección?",
        "respuesta_correcta": "9",
        "opciones": [
          "12",
          "3",
          "9"
        ],
        "paso_resuelto": "Repartimos 12 en 4 grupos: 12 ÷ 4 = 3.\nTomamos 3 grupos: 3 × 3 = 9 fichas.",
        "visual": null
      },
      {
        "id": "frac_op_3_fraccion_cantidad-v3",
        "enunciado": "Hay 15 fichas. ¿Cuántas son 2/5 de la colección?",
        "respuesta_correcta": "6",
        "opciones": [
          "3",
          "15",
          "6"
        ],
        "paso_resuelto": "Repartimos 15 en 5 grupos: 15 ÷ 5 = 3.\nTomamos 2 grupos: 3 × 2 = 6 fichas.",
        "visual": null
      },
      {
        "id": "frac_op_3_fraccion_cantidad-v4",
        "enunciado": "Hay 20 fichas. ¿Cuántas son 3/5 de la colección?",
        "respuesta_correcta": "12",
        "opciones": [
          "20",
          "12",
          "4"
        ],
        "paso_resuelto": "Repartimos 20 en 5 grupos: 20 ÷ 5 = 4.\nTomamos 3 grupos: 4 × 3 = 12 fichas.",
        "visual": null
      },
      {
        "id": "frac_op_3_fraccion_cantidad-v5",
        "enunciado": "Hay 18 fichas. ¿Cuántas son 2/3 de la colección?",
        "respuesta_correcta": "12",
        "opciones": [
          "18",
          "6",
          "12"
        ],
        "paso_resuelto": "Repartimos 18 en 3 grupos: 18 ÷ 3 = 6.\nTomamos 2 grupos: 6 × 2 = 12 fichas.",
        "visual": null
      },
      {
        "id": "frac_op_3_fraccion_cantidad-v6",
        "enunciado": "Hay 20 fichas. ¿Cuántas son 3/4 de la colección?",
        "respuesta_correcta": "15",
        "opciones": [
          "5",
          "20",
          "15"
        ],
        "paso_resuelto": "Repartimos 20 en 4 grupos: 20 ÷ 4 = 5.\nTomamos 3 grupos: 5 × 3 = 15 fichas.",
        "visual": null
      }
    ]
  },
  {
    "id": "frac_op_4_multiplicacion",
    "tema": "fracciones_operaciones",
    "titulo": "Una parte de otra parte",
    "explicacion": "Multiplicar por una fracción puede significar tomar una parte de otra cantidad. La mitad de un tercio de una barra es un sexto. Para calcular, multiplicamos los numeradores entre sí y los denominadores entre sí.",
    "ejemplo": "1/2 × 1/3 = 1/6.",
    "pasos": [
      "Dividimos la barra en tercios y cada tercio en dos partes: quedan 6 partes iguales.",
      "Tomamos una: (1 × 1)/(2 × 3) = 1/6."
    ],
    "pista": "Para multiplicar: arriba por arriba, abajo por abajo. No hace falta buscar un denominador común.",
    "visual": [
      {
        "label": "La mitad de un tercio",
        "partes": [
          1,
          1,
          1,
          1,
          1,
          1
        ],
        "pintadas": 1
      }
    ],
    "actividades": [
      {
        "id": "frac_op_4_multiplicacion-v1",
        "enunciado": "Calculá 1/2 × 1/4. Elegí el producto; puede quedar sin simplificar.",
        "respuesta_correcta": "1/8",
        "opciones": [
          "1/8",
          "1/4",
          "2/6"
        ],
        "paso_resuelto": "Multiplicamos los numeradores: 1 × 1 = 1.\nMultiplicamos los denominadores: 2 × 4 = 8.\nEl producto es 1/8.",
        "visual": null
      },
      {
        "id": "frac_op_4_multiplicacion-v2",
        "enunciado": "Calculá 2/3 × 1/2. Elegí el producto; puede quedar sin simplificar.",
        "respuesta_correcta": "2/6",
        "opciones": [
          "2/6",
          "3/5",
          "2/3"
        ],
        "paso_resuelto": "Multiplicamos los numeradores: 2 × 1 = 2.\nMultiplicamos los denominadores: 3 × 2 = 6.\nEl producto es 2/6.",
        "visual": null
      },
      {
        "id": "frac_op_4_multiplicacion-v3",
        "enunciado": "Calculá 3/4 × 2/3. Elegí el producto; puede quedar sin simplificar.",
        "respuesta_correcta": "6/12",
        "opciones": [
          "5/7",
          "6/4",
          "6/12"
        ],
        "paso_resuelto": "Multiplicamos los numeradores: 3 × 2 = 6.\nMultiplicamos los denominadores: 4 × 3 = 12.\nEl producto es 6/12.",
        "visual": null
      },
      {
        "id": "frac_op_4_multiplicacion-v4",
        "enunciado": "Calculá 2/5 × 3/4. Elegí el producto; puede quedar sin simplificar.",
        "respuesta_correcta": "6/20",
        "opciones": [
          "6/20",
          "6/5",
          "5/9"
        ],
        "paso_resuelto": "Multiplicamos los numeradores: 2 × 3 = 6.\nMultiplicamos los denominadores: 5 × 4 = 20.\nEl producto es 6/20.",
        "visual": null
      },
      {
        "id": "frac_op_4_multiplicacion-v5",
        "enunciado": "Calculá 1/3 × 2/5. Elegí el producto; puede quedar sin simplificar.",
        "respuesta_correcta": "2/15",
        "opciones": [
          "2/5",
          "2/15",
          "3/8"
        ],
        "paso_resuelto": "Multiplicamos los numeradores: 1 × 2 = 2.\nMultiplicamos los denominadores: 3 × 5 = 15.\nEl producto es 2/15.",
        "visual": null
      },
      {
        "id": "frac_op_4_multiplicacion-v6",
        "enunciado": "Calculá 3/5 × 1/2. Elegí el producto; puede quedar sin simplificar.",
        "respuesta_correcta": "3/10",
        "opciones": [
          "3/10",
          "4/7",
          "3/5"
        ],
        "paso_resuelto": "Multiplicamos los numeradores: 3 × 1 = 3.\nMultiplicamos los denominadores: 5 × 2 = 10.\nEl producto es 3/10.",
        "visual": null
      }
    ]
  },
  {
    "id": "frac_op_5_division",
    "tema": "fracciones_operaciones",
    "titulo": "Cuántas porciones entran",
    "explicacion": "Dividir también permite averiguar cuántas porciones de un tamaño entran en una cantidad. Para dividir por una fracción distinta de cero, multiplicamos por su inversa: cambiamos de lugar su numerador y su denominador. La primera fracción queda igual.",
    "ejemplo": "3/4 ÷ 1/4 = 3: en tres cuartos entran tres porciones de un cuarto.",
    "pasos": [
      "La inversa de 1/4 es 4/1. Cambiamos solo la segunda fracción.",
      "3/4 × 4/1 = 12/4 = 3. Comprobamos: 3 × 1/4 = 3/4."
    ],
    "pista": "Conservá la primera fracción e invertí solo la segunda. Después multiplicá.",
    "visual": null,
    "actividades": [
      {
        "id": "frac_op_5_division-v1",
        "enunciado": "Resolvé 2/3 ÷ 1/3. El resultado puede quedar sin simplificar.",
        "respuesta_correcta": "6/3",
        "opciones": [
          "3/6",
          "6/3",
          "2/9"
        ],
        "paso_resuelto": "Invertimos la segunda: 1/3 pasa a 3/1.\nMultiplicamos: 2/3 × 3/1 = 6/3.",
        "visual": null
      },
      {
        "id": "frac_op_5_division-v2",
        "enunciado": "Resolvé 3/4 ÷ 1/2. El resultado puede quedar sin simplificar.",
        "respuesta_correcta": "6/4",
        "opciones": [
          "3/8",
          "4/6",
          "6/4"
        ],
        "paso_resuelto": "Invertimos la segunda: 1/2 pasa a 2/1.\nMultiplicamos: 3/4 × 2/1 = 6/4.",
        "visual": null
      },
      {
        "id": "frac_op_5_division-v3",
        "enunciado": "Resolvé 1/2 ÷ 2/3. El resultado puede quedar sin simplificar.",
        "respuesta_correcta": "3/4",
        "opciones": [
          "3/4",
          "4/3",
          "2/6"
        ],
        "paso_resuelto": "Invertimos la segunda: 2/3 pasa a 3/2.\nMultiplicamos: 1/2 × 3/2 = 3/4.",
        "visual": null
      },
      {
        "id": "frac_op_5_division-v4",
        "enunciado": "Resolvé 2/5 ÷ 1/4. El resultado puede quedar sin simplificar.",
        "respuesta_correcta": "8/5",
        "opciones": [
          "8/5",
          "5/8",
          "2/20"
        ],
        "paso_resuelto": "Invertimos la segunda: 1/4 pasa a 4/1.\nMultiplicamos: 2/5 × 4/1 = 8/5.",
        "visual": null
      },
      {
        "id": "frac_op_5_division-v5",
        "enunciado": "Resolvé 3/5 ÷ 2/3. El resultado puede quedar sin simplificar.",
        "respuesta_correcta": "9/10",
        "opciones": [
          "9/10",
          "10/9",
          "6/15"
        ],
        "paso_resuelto": "Invertimos la segunda: 2/3 pasa a 3/2.\nMultiplicamos: 3/5 × 3/2 = 9/10.",
        "visual": null
      },
      {
        "id": "frac_op_5_division-v6",
        "enunciado": "Resolvé 4/5 ÷ 2/5. El resultado puede quedar sin simplificar.",
        "respuesta_correcta": "20/10",
        "opciones": [
          "10/20",
          "20/10",
          "8/25"
        ],
        "paso_resuelto": "Invertimos la segunda: 2/5 pasa a 5/2.\nMultiplicamos: 4/5 × 5/2 = 20/10.",
        "visual": null
      }
    ]
  },
  {
    "id": "div_primos_1_multiplos_divisores",
    "tema": "divisibilidad_primos_mcm_mcd",
    "titulo": "Divisores: repartir sin que sobre",
    "explicacion": "Un número es divisor de otro si permite dividirlo exactamente, con resto cero. Buscamos parejas que al multiplicarse den el total. Múltiplo y divisor se relacionan: 12 es múltiplo de 3 y 3 es divisor de 12.",
    "ejemplo": "Los divisores de 6 son 1, 2, 3 y 6.",
    "pasos": [
      "Las parejas de factores son 1 × 6 y 2 × 3.",
      "Con 4 grupos sobran 2: 4 no es divisor de 6."
    ],
    "pista": "Probá la división o buscá una multiplicación que dé exactamente el total.",
    "visual": null,
    "actividades": [
      {
        "id": "div_primos_1_multiplos_divisores-v1",
        "enunciado": "¿3 es divisor de 12?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "12 = 3 × 4. No sobra nada: sí es divisor.",
        "visual": null
      },
      {
        "id": "div_primos_1_multiplos_divisores-v2",
        "enunciado": "¿4 es divisor de 15?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "15 = 4 × 3 + 3. Sobran 3: no es una división exacta.",
        "visual": null
      },
      {
        "id": "div_primos_1_multiplos_divisores-v3",
        "enunciado": "¿6 es divisor de 18?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "18 = 6 × 3. No sobra nada: sí es divisor.",
        "visual": null
      },
      {
        "id": "div_primos_1_multiplos_divisores-v4",
        "enunciado": "¿3 es divisor de 20?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "20 = 3 × 6 + 2. Sobran 2: no es una división exacta.",
        "visual": null
      },
      {
        "id": "div_primos_1_multiplos_divisores-v5",
        "enunciado": "¿7 es divisor de 14?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "14 = 7 × 2. No sobra nada: sí es divisor.",
        "visual": null
      },
      {
        "id": "div_primos_1_multiplos_divisores-v6",
        "enunciado": "¿5 es divisor de 16?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "16 = 5 × 3 + 1. Sobran 1: no es una división exacta.",
        "visual": null
      }
    ]
  },
  {
    "id": "bases_criterio_2",
    "tema": "divisibilidad_primos_mcm_mcd",
    "titulo": "Divisible por 2",
    "explicacion": "Un número es divisible por 2 si su última cifra es 0, 2, 4, 6 u 8. Podemos repartirlo en dos grupos iguales sin sobrante.",
    "ejemplo": "18 termina en 8: es divisible por 2.",
    "pasos": [
      "Mirá solo la última cifra.",
      "Comprobá con una multiplicación o una división exacta."
    ],
    "pista": "Mirá solo la última cifra.",
    "visual": null,
    "actividades": [
      {
        "id": "bases_criterio_2-v1",
        "enunciado": "¿14 es divisible por 2?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "La última cifra es 4. 2 × 7 = 14. Sí, no sobra nada.",
        "visual": null
      },
      {
        "id": "bases_criterio_2-v2",
        "enunciado": "¿23 es divisible por 2?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La última cifra es 3. 23 = 2 × 11 + 1. No, queda resto 1.",
        "visual": null
      },
      {
        "id": "bases_criterio_2-v3",
        "enunciado": "¿36 es divisible por 2?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "La última cifra es 6. 2 × 18 = 36. Sí, no sobra nada.",
        "visual": null
      },
      {
        "id": "bases_criterio_2-v4",
        "enunciado": "¿45 es divisible por 2?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La última cifra es 5. 45 = 2 × 22 + 1. No, queda resto 1.",
        "visual": null
      },
      {
        "id": "bases_criterio_2-v5",
        "enunciado": "¿50 es divisible por 2?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La última cifra es 0. 2 × 25 = 50. Sí, no sobra nada.",
        "visual": null
      },
      {
        "id": "bases_criterio_2-v6",
        "enunciado": "¿67 es divisible por 2?",
        "respuesta_correcta": "No",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "La última cifra es 7. 67 = 2 × 33 + 1. No, queda resto 1.",
        "visual": null
      }
    ]
  },
  {
    "id": "bases_criterio_3",
    "tema": "divisibilidad_primos_mcm_mcd",
    "titulo": "Divisible por 3",
    "explicacion": "Un número es divisible por 3 si la suma de sus cifras es múltiplo de 3. No alcanza con mirar su última cifra.",
    "ejemplo": "123: sumamos 1 + 2 + 3 = 6. Como 6 es múltiplo de 3, 123 también.",
    "pasos": [
      "Sumá todas las cifras y fijate si esa suma está en la tabla del 3.",
      "Comprobá con una multiplicación o una división exacta."
    ],
    "pista": "Sumá todas las cifras y fijate si esa suma está en la tabla del 3.",
    "visual": null,
    "actividades": [
      {
        "id": "bases_criterio_3-v1",
        "enunciado": "¿24 es divisible por 3?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "La suma de las cifras es 6. 3 × 8 = 24. Sí, no sobra nada.",
        "visual": null
      },
      {
        "id": "bases_criterio_3-v2",
        "enunciado": "¿35 es divisible por 3?",
        "respuesta_correcta": "No",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "La suma de las cifras es 8. 35 = 3 × 11 + 2. No, queda resto 2.",
        "visual": null
      },
      {
        "id": "bases_criterio_3-v3",
        "enunciado": "¿51 es divisible por 3?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La suma de las cifras es 6. 3 × 17 = 51. Sí, no sobra nada.",
        "visual": null
      },
      {
        "id": "bases_criterio_3-v4",
        "enunciado": "¿62 es divisible por 3?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La suma de las cifras es 8. 62 = 3 × 20 + 2. No, queda resto 2.",
        "visual": null
      },
      {
        "id": "bases_criterio_3-v5",
        "enunciado": "¿72 es divisible por 3?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La suma de las cifras es 9. 3 × 24 = 72. Sí, no sobra nada.",
        "visual": null
      },
      {
        "id": "bases_criterio_3-v6",
        "enunciado": "¿83 es divisible por 3?",
        "respuesta_correcta": "No",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "La suma de las cifras es 11. 83 = 3 × 27 + 2. No, queda resto 2.",
        "visual": null
      }
    ]
  },
  {
    "id": "bases_criterio_5",
    "tema": "divisibilidad_primos_mcm_mcd",
    "titulo": "Divisible por 5",
    "explicacion": "Un número es divisible por 5 si termina en 0 o en 5. Es una forma de reconocer repartos exactos en cinco grupos.",
    "ejemplo": "35 termina en 5: 35 ÷ 5 = 7, sin resto.",
    "pasos": [
      "Mirá si termina en 0 o en 5.",
      "Comprobá con una multiplicación o una división exacta."
    ],
    "pista": "Mirá si termina en 0 o en 5.",
    "visual": null,
    "actividades": [
      {
        "id": "bases_criterio_5-v1",
        "enunciado": "¿25 es divisible por 5?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "La última cifra es 5. 5 × 5 = 25. Sí, no sobra nada.",
        "visual": null
      },
      {
        "id": "bases_criterio_5-v2",
        "enunciado": "¿32 es divisible por 5?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La última cifra es 2. 32 = 5 × 6 + 2. No, queda resto 2.",
        "visual": null
      },
      {
        "id": "bases_criterio_5-v3",
        "enunciado": "¿40 es divisible por 5?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "La última cifra es 0. 5 × 8 = 40. Sí, no sobra nada.",
        "visual": null
      },
      {
        "id": "bases_criterio_5-v4",
        "enunciado": "¿48 es divisible por 5?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La última cifra es 8. 48 = 5 × 9 + 3. No, queda resto 3.",
        "visual": null
      },
      {
        "id": "bases_criterio_5-v5",
        "enunciado": "¿65 es divisible por 5?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "La última cifra es 5. 5 × 13 = 65. Sí, no sobra nada.",
        "visual": null
      },
      {
        "id": "bases_criterio_5-v6",
        "enunciado": "¿71 es divisible por 5?",
        "respuesta_correcta": "No",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "La última cifra es 1. 71 = 5 × 14 + 1. No, queda resto 1.",
        "visual": null
      }
    ]
  },
  {
    "id": "bases_criterio_10",
    "tema": "divisibilidad_primos_mcm_mcd",
    "titulo": "Divisible por 10",
    "explicacion": "Un número es divisible por 10 si termina en 0. Terminar en 5 sirve para dividir por 5, pero no por 10.",
    "ejemplo": "40 termina en 0: 40 ÷ 10 = 4, sin resto.",
    "pasos": [
      "Para dividir exactamente por 10, la última cifra debe ser 0.",
      "Comprobá con una multiplicación o una división exacta."
    ],
    "pista": "Para dividir exactamente por 10, la última cifra debe ser 0.",
    "visual": null,
    "actividades": [
      {
        "id": "bases_criterio_10-v1",
        "enunciado": "¿30 es divisible por 10?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "La última cifra es 0. 10 × 3 = 30. Sí, no sobra nada.",
        "visual": null
      },
      {
        "id": "bases_criterio_10-v2",
        "enunciado": "¿45 es divisible por 10?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La última cifra es 5. 45 = 10 × 4 + 5. No, queda resto 5.",
        "visual": null
      },
      {
        "id": "bases_criterio_10-v3",
        "enunciado": "¿60 es divisible por 10?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La última cifra es 0. 10 × 6 = 60. Sí, no sobra nada.",
        "visual": null
      },
      {
        "id": "bases_criterio_10-v4",
        "enunciado": "¿75 es divisible por 10?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La última cifra es 5. 75 = 10 × 7 + 5. No, queda resto 5.",
        "visual": null
      },
      {
        "id": "bases_criterio_10-v5",
        "enunciado": "¿90 es divisible por 10?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La última cifra es 0. 10 × 9 = 90. Sí, no sobra nada.",
        "visual": null
      },
      {
        "id": "bases_criterio_10-v6",
        "enunciado": "¿105 es divisible por 10?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "La última cifra es 5. 105 = 10 × 10 + 5. No, queda resto 5.",
        "visual": null
      }
    ]
  },
  {
    "id": "div_primos_3_primos_compuestos",
    "tema": "divisibilidad_primos_mcm_mcd",
    "titulo": "Primos y compuestos",
    "explicacion": "Un número natural mayor que 1 es primo si tiene exactamente dos divisores positivos: 1 y él mismo. Es compuesto si tiene más de dos. El 1 tiene un solo divisor: no es primo ni compuesto.",
    "ejemplo": "7 es primo: sus divisores son 1 y 7.",
    "pasos": [
      "9 tiene divisores 1, 3 y 9: es compuesto.",
      "El 1 solo tiene al 1 como divisor. Va en una categoría aparte."
    ],
    "pista": "Buscá los divisores. Dos: primo. Más de dos: compuesto. El 1 es un caso aparte.",
    "visual": null,
    "actividades": [
      {
        "id": "div_primos_3_primos_compuestos-v1",
        "enunciado": "¿Cómo clasificamos el número 5?",
        "respuesta_correcta": "Primo",
        "opciones": [
          "Ni primo ni compuesto",
          "Compuesto",
          "Primo"
        ],
        "paso_resuelto": "Sus divisores positivos son 1, 5. Tiene 2 divisores: primo.",
        "visual": null
      },
      {
        "id": "div_primos_3_primos_compuestos-v2",
        "enunciado": "¿Cómo clasificamos el número 9?",
        "respuesta_correcta": "Compuesto",
        "opciones": [
          "Primo",
          "Ni primo ni compuesto",
          "Compuesto"
        ],
        "paso_resuelto": "Sus divisores positivos son 1, 3, 9. Tiene 3 divisores: compuesto.",
        "visual": null
      },
      {
        "id": "div_primos_3_primos_compuestos-v3",
        "enunciado": "¿Cómo clasificamos el número 1?",
        "respuesta_correcta": "Ni primo ni compuesto",
        "opciones": [
          "Compuesto",
          "Primo",
          "Ni primo ni compuesto"
        ],
        "paso_resuelto": "Sus divisores positivos son 1. Tiene 1 divisor: ni primo ni compuesto.",
        "visual": null
      },
      {
        "id": "div_primos_3_primos_compuestos-v4",
        "enunciado": "¿Cómo clasificamos el número 11?",
        "respuesta_correcta": "Primo",
        "opciones": [
          "Ni primo ni compuesto",
          "Primo",
          "Compuesto"
        ],
        "paso_resuelto": "Sus divisores positivos son 1, 11. Tiene 2 divisores: primo.",
        "visual": null
      },
      {
        "id": "div_primos_3_primos_compuestos-v5",
        "enunciado": "¿Cómo clasificamos el número 15?",
        "respuesta_correcta": "Compuesto",
        "opciones": [
          "Compuesto",
          "Ni primo ni compuesto",
          "Primo"
        ],
        "paso_resuelto": "Sus divisores positivos son 1, 3, 5, 15. Tiene 4 divisores: compuesto.",
        "visual": null
      },
      {
        "id": "div_primos_3_primos_compuestos-v6",
        "enunciado": "¿Cómo clasificamos el número 2?",
        "respuesta_correcta": "Primo",
        "opciones": [
          "Ni primo ni compuesto",
          "Primo",
          "Compuesto"
        ],
        "paso_resuelto": "Sus divisores positivos son 1, 2. Tiene 2 divisores: primo.",
        "visual": null
      }
    ]
  },
  {
    "id": "div_primos_5_mcd",
    "tema": "divisibilidad_primos_mcm_mcd",
    "titulo": "MCD: el mayor divisor compartido",
    "explicacion": "El máximo común divisor, o MCD, es el mayor número que divide exactamente a los dos números. Lo buscamos en sus listas de divisores. Para repartir en grupos iguales, indica el mayor tamaño de grupo que sirve para ambos totales.",
    "ejemplo": "MCD de 8 y 12 = 4.",
    "pasos": [
      "Divisores de 8: 1, 2, 4, 8. De 12: 1, 2, 3, 4, 6, 12.",
      "Comparten 1, 2 y 4. Elegimos el mayor: 4."
    ],
    "pista": "Buscá divisores, no múltiplos. De los que comparten, elegí el mayor.",
    "visual": null,
    "actividades": [
      {
        "id": "div_primos_5_mcd-v1",
        "enunciado": "¿Cuál es el MCD de 6 y 9?",
        "respuesta_correcta": "3",
        "opciones": [
          "4",
          "18",
          "3"
        ],
        "paso_resuelto": "Divisores de 6: 1, 2, 3, 6.\nDivisores de 9: 1, 3, 9.\nEl mayor divisor compartido es 3.",
        "visual": null
      },
      {
        "id": "div_primos_5_mcd-v2",
        "enunciado": "¿Cuál es el MCD de 8 y 12?",
        "respuesta_correcta": "4",
        "opciones": [
          "4",
          "24",
          "5"
        ],
        "paso_resuelto": "Divisores de 8: 1, 2, 4, 8.\nDivisores de 12: 1, 2, 3, 4, 6, 12.\nEl mayor divisor compartido es 4.",
        "visual": null
      },
      {
        "id": "div_primos_5_mcd-v3",
        "enunciado": "¿Cuál es el MCD de 10 y 15?",
        "respuesta_correcta": "5",
        "opciones": [
          "5",
          "30",
          "6"
        ],
        "paso_resuelto": "Divisores de 10: 1, 2, 5, 10.\nDivisores de 15: 1, 3, 5, 15.\nEl mayor divisor compartido es 5.",
        "visual": null
      },
      {
        "id": "div_primos_5_mcd-v4",
        "enunciado": "¿Cuál es el MCD de 12 y 18?",
        "respuesta_correcta": "6",
        "opciones": [
          "7",
          "6",
          "36"
        ],
        "paso_resuelto": "Divisores de 12: 1, 2, 3, 4, 6, 12.\nDivisores de 18: 1, 2, 3, 6, 9, 18.\nEl mayor divisor compartido es 6.",
        "visual": null
      },
      {
        "id": "div_primos_5_mcd-v5",
        "enunciado": "¿Cuál es el MCD de 8 y 15?",
        "respuesta_correcta": "1",
        "opciones": [
          "2",
          "1",
          "120"
        ],
        "paso_resuelto": "Divisores de 8: 1, 2, 4, 8.\nDivisores de 15: 1, 3, 5, 15.\nEl mayor divisor compartido es 1.",
        "visual": null
      },
      {
        "id": "div_primos_5_mcd-v6",
        "enunciado": "¿Cuál es el MCD de 16 y 24?",
        "respuesta_correcta": "8",
        "opciones": [
          "48",
          "8",
          "9"
        ],
        "paso_resuelto": "Divisores de 16: 1, 2, 4, 8, 16.\nDivisores de 24: 1, 2, 3, 4, 6, 8, 12, 24.\nEl mayor divisor compartido es 8.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_lect_1_literal",
    "tema": "comprension_lectora_literal_inferida",
    "titulo": "Encontrar lo que el texto dice",
    "explicacion": "A veces la respuesta está escrita en el texto. Leé la pregunta, buscá esa información y volvé a mirar la frase antes de elegir. Podés releer todas las veces que necesites.",
    "ejemplo": "Lola dejó su mochila junto a la puerta. ¿Dónde quedó la mochila?",
    "pasos": [
      "Buscamos dónde dejó la mochila.",
      "La frase dice «junto a la puerta»: esa es la respuesta."
    ],
    "pista": "Buscá la frase que responde exactamente a la pregunta.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_lect_1_literal-v1",
        "enunciado": "Tomás puso las semillas en una maceta azul. Después buscó agua.\n¿De qué color era la maceta?",
        "respuesta_correcta": "Azul",
        "opciones": [
          "Azul",
          "Verde",
          "Roja"
        ],
        "paso_resuelto": "La primera frase dice «una maceta azul». El color es azul.",
        "visual": null
      },
      {
        "id": "leng_lect_1_literal-v2",
        "enunciado": "Mara guardó una linterna en el cajón. Su hermano llevó una manta al patio.\n¿Qué guardó Mara?",
        "respuesta_correcta": "Una linterna",
        "opciones": [
          "Una manta",
          "Una llave",
          "Una linterna"
        ],
        "paso_resuelto": "Buscamos a Mara. La primera frase dice que guardó una linterna.",
        "visual": null
      },
      {
        "id": "leng_lect_1_literal-v3",
        "enunciado": "El sábado, Nico llevó su bicicleta al taller. El domingo volvió a buscarla.\n¿Qué día la llevó al taller?",
        "respuesta_correcta": "El sábado",
        "opciones": [
          "El lunes",
          "El sábado",
          "El domingo"
        ],
        "paso_resuelto": "Hay dos días. La llevó el sábado; el domingo la buscó.",
        "visual": null
      },
      {
        "id": "leng_lect_1_literal-v4",
        "enunciado": "En la biblioteca, Ana eligió un cuento de animales. Leo prefirió un libro de planetas.\n¿Qué eligió Ana?",
        "respuesta_correcta": "Un cuento de animales",
        "opciones": [
          "Un cuento de animales",
          "Un libro de planetas",
          "Una revista de deportes"
        ],
        "paso_resuelto": "La primera oración nombra a Ana y dice qué eligió: un cuento de animales.",
        "visual": null
      },
      {
        "id": "leng_lect_1_literal-v5",
        "enunciado": "Rita plantó tres semillas en una maceta y dos en otra.\n¿Cuántas semillas plantó en la primera maceta?",
        "respuesta_correcta": "Tres",
        "opciones": [
          "Dos",
          "Cinco",
          "Tres"
        ],
        "paso_resuelto": "La pregunta pide solo la primera maceta: allí plantó tres semillas.",
        "visual": null
      },
      {
        "id": "leng_lect_1_literal-v6",
        "enunciado": "Al salir de la escuela, Juli dejó su campera en casa de su abuela.\n¿Dónde dejó la campera?",
        "respuesta_correcta": "En casa de su abuela",
        "opciones": [
          "En la plaza",
          "En casa de su abuela",
          "En la escuela"
        ],
        "paso_resuelto": "La frase cuenta que salió de la escuela, pero dejó la campera en casa de su abuela.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_lect_2_inferencia",
    "tema": "comprension_lectora_literal_inferida",
    "titulo": "Usar una pista del texto",
    "explicacion": "Inferir es unir pistas del texto con algo que conocemos. Elegimos la explicación que mejor encaja, sin inventar detalles. Una inferencia puede ser probable aunque el texto no la diga directamente.",
    "ejemplo": "El suelo estaba mojado y Lara cerró su paraguas al entrar. ¿Qué pudo pasar?",
    "pasos": [
      "Buscamos pistas: suelo mojado y paraguas.",
      "Es probable que haya llovido. El texto no permite saber durante cuánto tiempo."
    ],
    "pista": "Elegí lo que mejor explican las pistas; no agregues datos que el texto no da.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_lect_2_inferencia-v1",
        "enunciado": "Pedro salió con bufanda, gorro y guantes.\n¿Qué es más probable?",
        "respuesta_correcta": "Hacía frío",
        "opciones": [
          "Hacía frío",
          "Hacía mucho calor",
          "Iba a nadar"
        ],
        "paso_resuelto": "Bufanda, gorro y guantes abrigan. Las tres pistas hacen probable que hiciera frío.",
        "visual": null
      },
      {
        "id": "leng_lect_2_inferencia-v2",
        "enunciado": "La lámpara se apagó y el televisor también. La casa de al lado quedó a oscuras.\n¿Qué es más probable?",
        "respuesta_correcta": "Se cortó la electricidad",
        "opciones": [
          "Se rompió solo la lámpara",
          "Todos se fueron de viaje",
          "Se cortó la electricidad"
        ],
        "paso_resuelto": "Se apagaron varios aparatos y otra casa. Un corte de electricidad explica todas las pistas.",
        "visual": null
      },
      {
        "id": "leng_lect_2_inferencia-v3",
        "enunciado": "Mili puso harina, huevos y leche en un bol. Después encendió el horno.\n¿Qué es más probable?",
        "respuesta_correcta": "Estaba preparando algo para hornear",
        "opciones": [
          "Estaba arreglando una silla",
          "Estaba preparando algo para hornear",
          "Estaba lavando ropa"
        ],
        "paso_resuelto": "Los ingredientes, el bol y el horno apuntan a cocinar. No sabemos qué receta exacta preparaba.",
        "visual": null
      },
      {
        "id": "leng_lect_2_inferencia-v4",
        "enunciado": "Antes de cruzar, Fran miró a ambos lados y esperó a que pasara un auto.\n¿Qué es más probable?",
        "respuesta_correcta": "Estaba cruzando una calle",
        "opciones": [
          "Estaba cruzando una calle",
          "Estaba cruzando su habitación",
          "Estaba nadando en una pileta"
        ],
        "paso_resuelto": "Mirar a ambos lados y esperar un auto son pistas de que iba a cruzar una calle.",
        "visual": null
      },
      {
        "id": "leng_lect_2_inferencia-v5",
        "enunciado": "Lucía bostezaba, se frotaba los ojos y buscó su almohada.\n¿Qué es más probable?",
        "respuesta_correcta": "Tenía sueño",
        "opciones": [
          "Quería correr una carrera",
          "Quería lavar el auto",
          "Tenía sueño"
        ],
        "paso_resuelto": "Bostezar, frotarse los ojos y buscar una almohada son pistas de sueño.",
        "visual": null
      },
      {
        "id": "leng_lect_2_inferencia-v6",
        "enunciado": "Dani infló las ruedas, ajustó el casco y subió a su bicicleta.\n¿Qué es más probable?",
        "respuesta_correcta": "Se preparaba para andar en bicicleta",
        "opciones": [
          "Se preparaba para dibujar",
          "Se preparaba para andar en bicicleta",
          "Se preparaba para dormir"
        ],
        "paso_resuelto": "Ruedas, casco y subirse a la bicicleta indican que se preparaba para usarla.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_lect_3_idea_central",
    "tema": "comprension_lectora_literal_inferida",
    "titulo": "Contar la idea más importante",
    "explicacion": "La idea principal reúne lo más importante de un texto. Un detalle cuenta solo una parte. Para resumir, elegí una frase que abarque lo que ocurre sin agregar información.",
    "ejemplo": "El club juntó papel, separó cartón y lo llevó a reciclar.",
    "pasos": [
      "Las tres acciones tienen algo en común: reciclar.",
      "Idea principal: el club organizó una actividad de reciclaje."
    ],
    "pista": "Buscá la opción que reúne el texto entero y no solo un detalle.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_lect_3_idea_central-v1",
        "enunciado": "El grupo regó los plantines, sacó las hojas secas y agregó tierra a las macetas.\n¿Qué resume mejor el texto?",
        "respuesta_correcta": "El grupo cuidó las plantas",
        "opciones": [
          "El grupo cuidó las plantas",
          "El grupo sacó hojas secas",
          "El grupo vendió todas las plantas"
        ],
        "paso_resuelto": "Regar, sacar hojas y agregar tierra son distintas formas de cuidar las plantas. Venderlas no aparece.",
        "visual": null
      },
      {
        "id": "leng_lect_3_idea_central-v2",
        "enunciado": "En el refugio, Inés sirvió agua a los perros, limpió sus mantas y paseó a los más tranquilos.\n¿Qué resume mejor el texto?",
        "respuesta_correcta": "Inés ayudó a cuidar a los perros del refugio",
        "opciones": [
          "Inés sirvió agua",
          "Inés adoptó a todos los perros",
          "Inés ayudó a cuidar a los perros del refugio"
        ],
        "paso_resuelto": "Cuidar a los perros reúne las tres acciones. Servir agua es solo una; adoptar no aparece.",
        "visual": null
      },
      {
        "id": "leng_lect_3_idea_central-v3",
        "enunciado": "Para la salida, Mateo revisó su mochila, llenó la botella y guardó una gorra.\n¿Qué resume mejor el texto?",
        "respuesta_correcta": "Mateo preparó sus cosas para la salida",
        "opciones": [
          "Mateo canceló la salida",
          "Mateo preparó sus cosas para la salida",
          "Mateo llenó una botella"
        ],
        "paso_resuelto": "Las tres acciones son preparativos para salir. La botella es un detalle y no se habla de cancelar.",
        "visual": null
      },
      {
        "id": "leng_lect_3_idea_central-v4",
        "enunciado": "Los vecinos juntaron residuos de la plaza, separaron los reciclables y limpiaron los bancos.\n¿Qué resume mejor el texto?",
        "respuesta_correcta": "Los vecinos limpiaron la plaza",
        "opciones": [
          "Los vecinos limpiaron la plaza",
          "Los vecinos limpiaron bancos",
          "Los vecinos construyeron una plaza nueva"
        ],
        "paso_resuelto": "Limpiar la plaza incluye todas las acciones. Los bancos son un detalle; no construyeron una plaza.",
        "visual": null
      },
      {
        "id": "leng_lect_3_idea_central-v5",
        "enunciado": "La biblioteca sumó cuentos, acomodó los estantes y preparó un rincón con almohadones para leer.\n¿Qué resume mejor el texto?",
        "respuesta_correcta": "La biblioteca mejoró su espacio de lectura",
        "opciones": [
          "La biblioteca acomodó estantes",
          "La biblioteca cerró para siempre",
          "La biblioteca mejoró su espacio de lectura"
        ],
        "paso_resuelto": "Los nuevos cuentos, el orden y el rincón mejoran el espacio de lectura. El cierre no aparece.",
        "visual": null
      },
      {
        "id": "leng_lect_3_idea_central-v6",
        "enunciado": "La clase eligió una receta, repartió los ingredientes y acordó quién llevaría cada utensilio.\n¿Qué resume mejor el texto?",
        "respuesta_correcta": "La clase organizó una actividad de cocina",
        "opciones": [
          "La clase terminó de cocinar",
          "La clase organizó una actividad de cocina",
          "La clase eligió una receta"
        ],
        "paso_resuelto": "Elegir, repartir y acordar son pasos de organización. El texto todavía no cuenta que cocinaron.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_bv_1_mb_nv",
    "tema": "ortografia_b_v",
    "titulo": "Mirar la letra anterior: mb y nv",
    "explicacion": "B y V suelen sonar igual al hablar. El oído no alcanza para elegir. En palabras como tambor miramos M antes de B; en palabras como enviar, N antes de V. Practiquemos esos grupos.",
    "ejemplo": "tambor → mb; enviar → nv",
    "pasos": [
      "Miramos la letra que está justo antes del espacio.",
      "Después de M escribimos B; después de N, V en estos grupos."
    ],
    "pista": "Mirá el grupo de dos letras: MB o NV.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_bv_1_mb_nv-v1",
        "enunciado": "Leo toca el tam_or.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "tambor",
        "opciones": [
          "tambor",
          "tamvor"
        ],
        "paso_resuelto": "Observá tambor: el grupo es MB.",
        "visual": null
      },
      {
        "id": "leng_bv_1_mb_nv-v2",
        "enunciado": "Sentí el sonido del bom_o.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "bombo",
        "opciones": [
          "bomvo",
          "bombo"
        ],
        "paso_resuelto": "En bombo, después de la M va B: el grupo es MB.",
        "visual": null
      },
      {
        "id": "leng_bv_1_mb_nv-v3",
        "enunciado": "Voy a en_iar una carta.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "enviar",
        "opciones": [
          "enviar",
          "enbiar"
        ],
        "paso_resuelto": "Observá enviar: el grupo es NV.",
        "visual": null
      },
      {
        "id": "leng_bv_1_mb_nv-v4",
        "enunciado": "En in_ierno usamos abrigo.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "invierno",
        "opciones": [
          "inbierno",
          "invierno"
        ],
        "paso_resuelto": "Observá invierno: el grupo es NV.",
        "visual": null
      },
      {
        "id": "leng_bv_1_mb_nv-v5",
        "enunciado": "Necesito un cam_io de ropa.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "cambio",
        "opciones": [
          "cambio",
          "camvio"
        ],
        "paso_resuelto": "Observá cambio: el grupo es MB.",
        "visual": null
      },
      {
        "id": "leng_bv_1_mb_nv-v6",
        "enunciado": "Quiero in_itar a mis amigos.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "invitar",
        "opciones": [
          "inbitar",
          "invitar"
        ],
        "paso_resuelto": "Observá invitar: el grupo es NV.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_bv_2_bu_bur_bus",
    "tema": "ortografia_b_v",
    "titulo": "Reconocer comienzos: bu-, bur-, bus-",
    "explicacion": "Muchas palabras que empiezan con bu-, bur- o bus- se escriben con B. Hoy vamos a reconocer palabras frecuentes de esos grupos. No significa que toda palabra que suene parecido lleve B: vudú es una excepción.",
    "ejemplo": "burbuja empieza con bur- y buscar con bus-.",
    "pasos": [
      "Leemos la palabra completa.",
      "Reconocemos el comienzo y fijamos cómo se escribe."
    ],
    "pista": "Buscá el comienzo BU, BUR o BUS de las palabras que practicamos.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_bv_2_bu_bur_bus-v1",
        "enunciado": "Una _urbuja flotó en el agua.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "burbuja",
        "opciones": [
          "burbuja",
          "vurbuja"
        ],
        "paso_resuelto": "burbuja se escribe con B al comienzo. Reconocemos el grupo bur-.",
        "visual": null
      },
      {
        "id": "leng_bv_2_bu_bur_bus-v2",
        "enunciado": "Voy a _uscar mi cuaderno.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "buscar",
        "opciones": [
          "vuscar",
          "buscar"
        ],
        "paso_resuelto": "buscar se escribe con B al comienzo. Reconocemos el grupo bus-.",
        "visual": null
      },
      {
        "id": "leng_bv_2_bu_bur_bus-v3",
        "enunciado": "Me puse una _ufanda.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "bufanda",
        "opciones": [
          "bufanda",
          "vufanda"
        ],
        "paso_resuelto": "bufanda se escribe con B al comienzo. Reconocemos el grupo bu-.",
        "visual": null
      },
      {
        "id": "leng_bv_2_bu_bur_bus-v4",
        "enunciado": "Evitamos la _urla y nos ayudamos.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "burla",
        "opciones": [
          "vurla",
          "burla"
        ],
        "paso_resuelto": "burla se escribe con B al comienzo. Reconocemos el grupo bur-.",
        "visual": null
      },
      {
        "id": "leng_bv_2_bu_bur_bus-v5",
        "enunciado": "La carta está en el _uzón.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "buzón",
        "opciones": [
          "buzón",
          "vuzón"
        ],
        "paso_resuelto": "buzón se escribe con B al comienzo. Reconocemos el grupo bu-.",
        "visual": null
      },
      {
        "id": "leng_bv_2_bu_bur_bus-v6",
        "enunciado": "Vimos un _usto en el museo.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "busto",
        "opciones": [
          "vusto",
          "busto"
        ],
        "paso_resuelto": "busto se escribe con B al comienzo. Reconocemos el grupo bus-.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_bv_3_aba",
    "tema": "ortografia_b_v",
    "titulo": "Contar lo que hacíamos: -aba",
    "explicacion": "Para contar acciones que hacíamos antes, los verbos terminados en -ar pueden usar -aba: cantar → cantaba. Esa terminación va con B. Primero mirá la acción original; no cambiamos cualquier sonido parecido.",
    "ejemplo": "Antes, yo saltaba la soga: saltar → saltaba.",
    "pasos": [
      "La acción original es saltar, que termina en -ar.",
      "Al contar una costumbre pasada usamos saltaba, con B."
    ],
    "pista": "Buscá la acción terminada en -ar y la terminación -aba.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_bv_3_aba-v1",
        "enunciado": "Cantar: antes yo canta_a en el coro.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "cantaba",
        "opciones": [
          "cantaba",
          "cantava"
        ],
        "paso_resuelto": "La acción original termina en -ar. Para esta costumbre pasada, la terminación -aba se escribe con B: cantaba.",
        "visual": null
      },
      {
        "id": "leng_bv_3_aba-v2",
        "enunciado": "Jugar: antes yo juga_a en esta plaza.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "jugaba",
        "opciones": [
          "jugava",
          "jugaba"
        ],
        "paso_resuelto": "La acción original termina en -ar. Para esta costumbre pasada, la terminación -aba se escribe con B: jugaba.",
        "visual": null
      },
      {
        "id": "leng_bv_3_aba-v3",
        "enunciado": "Bailar: mi abuela baila_a los domingos.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "bailaba",
        "opciones": [
          "bailaba",
          "bailava"
        ],
        "paso_resuelto": "La acción original termina en -ar. Para esta costumbre pasada, la terminación -aba se escribe con B: bailaba.",
        "visual": null
      },
      {
        "id": "leng_bv_3_aba-v4",
        "enunciado": "Mirar: de pequeña mira_a dibujos.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "miraba",
        "opciones": [
          "mirava",
          "miraba"
        ],
        "paso_resuelto": "La acción original termina en -ar. Para esta costumbre pasada, la terminación -aba se escribe con B: miraba.",
        "visual": null
      },
      {
        "id": "leng_bv_3_aba-v5",
        "enunciado": "Saltar: mi hermano salta_a la soga.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "saltaba",
        "opciones": [
          "saltaba",
          "saltava"
        ],
        "paso_resuelto": "La acción original termina en -ar. Para esta costumbre pasada, la terminación -aba se escribe con B: saltaba.",
        "visual": null
      },
      {
        "id": "leng_bv_3_aba-v6",
        "enunciado": "Dibujar: antes yo dibuja_a animales.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "dibujaba",
        "opciones": [
          "dibujava",
          "dibujaba"
        ],
        "paso_resuelto": "La acción original termina en -ar. Para esta costumbre pasada, la terminación -aba se escribe con B: dibujaba.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_bv_4_iba",
    "tema": "ortografia_b_v",
    "titulo": "Recordar iba, ibas e íbamos",
    "explicacion": "Ir es una acción. Para contar que íbamos a un lugar antes, recordamos estas formas: yo iba, vos ibas, nosotros íbamos, ellos iban. Se escriben con B. Íbamos lleva además tilde; hoy nos concentramos en la B.",
    "ejemplo": "Antes, yo iba caminando a la escuela.",
    "pasos": [
      "Buscamos la forma de ir que nombra una costumbre pasada.",
      "Recordamos la familia de formas: iba, ibas, íbamos, iban."
    ],
    "pista": "Las formas IBA, IBAS, ÍBAMOS e IBAN se escriben con B.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_bv_4_iba-v1",
        "enunciado": "Antes yo i_a a esa plaza.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "iba",
        "opciones": [
          "iba",
          "iva"
        ],
        "paso_resuelto": "Es una forma de ir en pasado: iba. Estas formas se escriben con B.",
        "visual": null
      },
      {
        "id": "leng_bv_4_iba-v2",
        "enunciado": "Antes vos i_as a natación.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "ibas",
        "opciones": [
          "ivas",
          "ibas"
        ],
        "paso_resuelto": "Es una forma de ir en pasado: ibas. Estas formas se escriben con B.",
        "visual": null
      },
      {
        "id": "leng_bv_4_iba-v3",
        "enunciado": "Antes nosotros í_amos al club.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "íbamos",
        "opciones": [
          "íbamos",
          "ívamos"
        ],
        "paso_resuelto": "Es una forma de ir en pasado: íbamos. Estas formas se escriben con B.",
        "visual": null
      },
      {
        "id": "leng_bv_4_iba-v4",
        "enunciado": "Antes ellos i_an en colectivo.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "iban",
        "opciones": [
          "ivan",
          "iban"
        ],
        "paso_resuelto": "Es una forma de ir en pasado: iban. Estas formas se escriben con B.",
        "visual": null
      },
      {
        "id": "leng_bv_4_iba-v5",
        "enunciado": "Antes mi hermana i_a a ese taller.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "iba",
        "opciones": [
          "iba",
          "iva"
        ],
        "paso_resuelto": "Es una forma de ir en pasado: iba. Estas formas se escriben con B.",
        "visual": null
      },
      {
        "id": "leng_bv_4_iba-v6",
        "enunciado": "Mis amigos i_an juntos a la escuela.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "iban",
        "opciones": [
          "ivan",
          "iban"
        ],
        "paso_resuelto": "Es una forma de ir en pasado: iban. Estas formas se escriben con B.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_bv_5_adjetivos",
    "tema": "ortografia_b_v",
    "titulo": "Palabras que describen: -ivo e -iva",
    "explicacion": "Las palabras que describen cómo es algo se llaman adjetivos. Activo y activa describen a alguien con actividad. Los adjetivos con estas terminaciones -ivo e -iva se escriben con V. Practicamos este grupo; no es una regla para cualquier palabra que termine parecido.",
    "ejemplo": "Un grupo activo; una persona creativa.",
    "pasos": [
      "La palabra cuenta cómo es alguien o algo.",
      "Reconocemos -ivo o -iva y escribimos V."
    ],
    "pista": "¿La palabra describe cómo es algo y termina en -ivo o -iva? Mirá la V.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_bv_5_adjetivos-v1",
        "enunciado": "El grupo es acti_o.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "activo",
        "opciones": [
          "activo",
          "actibo"
        ],
        "paso_resuelto": "activo describe cómo es algo. Su terminación -ivo se escribe con V.",
        "visual": null
      },
      {
        "id": "leng_bv_5_adjetivos-v2",
        "enunciado": "Mi amiga tiene una idea creati_a.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "creativa",
        "opciones": [
          "creatiba",
          "creativa"
        ],
        "paso_resuelto": "creativa describe cómo es algo. Su terminación -iva se escribe con V.",
        "visual": null
      },
      {
        "id": "leng_bv_5_adjetivos-v3",
        "enunciado": "Me puse calzado deporti_o.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "deportivo",
        "opciones": [
          "deportivo",
          "deportibo"
        ],
        "paso_resuelto": "deportivo describe cómo es algo. Su terminación -ivo se escribe con V.",
        "visual": null
      },
      {
        "id": "leng_bv_5_adjetivos-v4",
        "enunciado": "Recibimos una respuesta negati_a.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "negativa",
        "opciones": [
          "negatiba",
          "negativa"
        ],
        "paso_resuelto": "negativa describe cómo es algo. Su terminación -iva se escribe con V.",
        "visual": null
      },
      {
        "id": "leng_bv_5_adjetivos-v5",
        "enunciado": "Elegimos un juego educati_o.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "educativo",
        "opciones": [
          "educativo",
          "educatibo"
        ],
        "paso_resuelto": "educativo describe cómo es algo. Su terminación -ivo se escribe con V.",
        "visual": null
      },
      {
        "id": "leng_bv_5_adjetivos-v6",
        "enunciado": "Su actitud es positi_a.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "positiva",
        "opciones": [
          "positiba",
          "positiva"
        ],
        "paso_resuelto": "positiva describe cómo es algo. Su terminación -iva se escribe con V.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_bv_6_tuve",
    "tema": "ortografia_b_v",
    "titulo": "Tres formas del pasado con V",
    "explicacion": "Tener, estar y andar cambian al contar una acción pasada: tuve, estuve, anduve. Estas formas se escriben con V. Podemos fijarlas juntas y recordarlas dentro de una oración.",
    "ejemplo": "Ayer tuve clase, estuve en el patio y anduve en bicicleta.",
    "pasos": [
      "Relacionamos tener → tuve, estar → estuve, andar → anduve.",
      "Volvemos a leer las tres formas y observamos la V."
    ],
    "pista": "Relacioná la acción con su forma: tener → tuve, estar → estuve, andar → anduve.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_bv_6_tuve-v1",
        "enunciado": "Ayer tu_e una idea.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "tuve",
        "opciones": [
          "tuve",
          "tube"
        ],
        "paso_resuelto": "La oración cuenta una acción pasada. La forma tuve pertenece a tener, estar o andar y se escribe con V.",
        "visual": null
      },
      {
        "id": "leng_bv_6_tuve-v2",
        "enunciado": "Ayer estu_e en casa.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "estuve",
        "opciones": [
          "estube",
          "estuve"
        ],
        "paso_resuelto": "La oración cuenta una acción pasada. La forma estuve pertenece a tener, estar o andar y se escribe con V.",
        "visual": null
      },
      {
        "id": "leng_bv_6_tuve-v3",
        "enunciado": "Ayer andu_e en bicicleta.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "anduve",
        "opciones": [
          "anduve",
          "andube"
        ],
        "paso_resuelto": "La oración cuenta una acción pasada. La forma anduve pertenece a tener, estar o andar y se escribe con V.",
        "visual": null
      },
      {
        "id": "leng_bv_6_tuve-v4",
        "enunciado": "Ayer Ana tu_o tiempo para leer.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "tuvo",
        "opciones": [
          "tubo",
          "tuvo"
        ],
        "paso_resuelto": "La oración cuenta una acción pasada. La forma tuvo pertenece a tener, estar o andar y se escribe con V.",
        "visual": null
      },
      {
        "id": "leng_bv_6_tuve-v5",
        "enunciado": "El gato estu_o en el patio.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "estuvo",
        "opciones": [
          "estuvo",
          "estubo"
        ],
        "paso_resuelto": "La oración cuenta una acción pasada. La forma estuvo pertenece a tener, estar o andar y se escribe con V.",
        "visual": null
      },
      {
        "id": "leng_bv_6_tuve-v6",
        "enunciado": "Mi hermano andu_o por la plaza.\n¿Qué forma completa esta oración?",
        "respuesta_correcta": "anduvo",
        "opciones": [
          "andubo",
          "anduvo"
        ],
        "paso_resuelto": "La oración cuenta una acción pasada. La forma anduvo pertenece a tener, estar o andar y se escribe con V.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_til_0_silabas",
    "tema": "tildes_generales_agudas_graves_esdrujulas",
    "titulo": "Separar una palabra en sílabas",
    "explicacion": "Una sílaba es un grupo de sonidos que pronunciamos en un golpe de voz. Decí casa despacio: ca-sa. Hoy practicamos palabras sin vocales juntas; más adelante veremos esos encuentros.",
    "ejemplo": "pelota → pe-lo-ta: tres golpes de voz.",
    "pasos": [
      "Pronunciamos la palabra despacio, sin separar cada letra.",
      "Damos una palmada por cada grupo: pe / lo / ta."
    ],
    "pista": "Decí la palabra en voz alta y marcá un golpe por sílaba.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_til_0_silabas-v1",
        "enunciado": "¿Cómo se separa casa en sílabas?",
        "respuesta_correcta": "ca-sa",
        "opciones": [
          "ca-sa",
          "cas-a",
          "c-a-sa"
        ],
        "paso_resuelto": "Decimos ca / sa. Cada grupo sale en un golpe de voz. La separación es ca-sa.",
        "visual": null
      },
      {
        "id": "leng_til_0_silabas-v2",
        "enunciado": "¿Cómo se separa pelota en sílabas?",
        "respuesta_correcta": "pe-lo-ta",
        "opciones": [
          "pel-o-ta",
          "pe-lot-a",
          "pe-lo-ta"
        ],
        "paso_resuelto": "Decimos pe / lo / ta. Cada grupo sale en un golpe de voz. La separación es pe-lo-ta.",
        "visual": null
      },
      {
        "id": "leng_til_0_silabas-v3",
        "enunciado": "¿Cómo se separa tomate en sílabas?",
        "respuesta_correcta": "to-ma-te",
        "opciones": [
          "to-mat-e",
          "to-ma-te",
          "tom-a-te"
        ],
        "paso_resuelto": "Decimos to / ma / te. Cada grupo sale en un golpe de voz. La separación es to-ma-te.",
        "visual": null
      },
      {
        "id": "leng_til_0_silabas-v4",
        "enunciado": "¿Cómo se separa camisa en sílabas?",
        "respuesta_correcta": "ca-mi-sa",
        "opciones": [
          "ca-mi-sa",
          "cam-is-a",
          "c-a-misa"
        ],
        "paso_resuelto": "Decimos ca / mi / sa. Cada grupo sale en un golpe de voz. La separación es ca-mi-sa.",
        "visual": null
      },
      {
        "id": "leng_til_0_silabas-v5",
        "enunciado": "¿Cómo se separa mariposa en sílabas?",
        "respuesta_correcta": "ma-ri-po-sa",
        "opciones": [
          "mar-i-po-sa",
          "ma-rip-o-sa",
          "ma-ri-po-sa"
        ],
        "paso_resuelto": "Decimos ma / ri / po / sa. Cada grupo sale en un golpe de voz. La separación es ma-ri-po-sa.",
        "visual": null
      },
      {
        "id": "leng_til_0_silabas-v6",
        "enunciado": "¿Cómo se separa zapato en sílabas?",
        "respuesta_correcta": "za-pa-to",
        "opciones": [
          "za-pat-o",
          "za-pa-to",
          "zap-a-to"
        ],
        "paso_resuelto": "Decimos za / pa / to. Cada grupo sale en un golpe de voz. La separación es za-pa-to.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_til_1_tonica",
    "tema": "tildes_generales_agudas_graves_esdrujulas",
    "titulo": "Escuchar la sílaba tónica",
    "explicacion": "La sílaba tónica es la que suena con más fuerza en una palabra. Todas las palabras que veremos tienen una, pero no todas llevan una tilde escrita. Primero escuchamos; después veremos cuándo escribir la rayita.",
    "ejemplo": "camisa → ca-MI-sa. MI es la sílaba tónica y no lleva tilde.",
    "pasos": [
      "Decimos camisa en voz alta.",
      "Escuchamos dónde apoyamos la voz: MI."
    ],
    "pista": "Decí la palabra completa; escuchá qué sílaba suena más fuerte.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_til_1_tonica-v1",
        "enunciado": "Decí «casa» en voz alta. ¿Qué sílaba suena con más fuerza?",
        "respuesta_correcta": "ca",
        "opciones": [
          "ca",
          "sa"
        ],
        "paso_resuelto": "Pronunciamos CA-sa: ca suena con más fuerza. Esa es la sílaba tónica.",
        "visual": null
      },
      {
        "id": "leng_til_1_tonica-v2",
        "enunciado": "Decí «pelota» en voz alta. ¿Qué sílaba suena con más fuerza?",
        "respuesta_correcta": "lo",
        "opciones": [
          "pe",
          "ta",
          "lo"
        ],
        "paso_resuelto": "Pronunciamos pe-LO-ta: lo suena con más fuerza. Esa es la sílaba tónica.",
        "visual": null
      },
      {
        "id": "leng_til_1_tonica-v3",
        "enunciado": "Decí «tomate» en voz alta. ¿Qué sílaba suena con más fuerza?",
        "respuesta_correcta": "ma",
        "opciones": [
          "te",
          "ma",
          "to"
        ],
        "paso_resuelto": "Pronunciamos to-MA-te: ma suena con más fuerza. Esa es la sílaba tónica.",
        "visual": null
      },
      {
        "id": "leng_til_1_tonica-v4",
        "enunciado": "Decí «camisa» en voz alta. ¿Qué sílaba suena con más fuerza?",
        "respuesta_correcta": "mi",
        "opciones": [
          "mi",
          "ca",
          "sa"
        ],
        "paso_resuelto": "Pronunciamos ca-MI-sa: mi suena con más fuerza. Esa es la sílaba tónica.",
        "visual": null
      },
      {
        "id": "leng_til_1_tonica-v5",
        "enunciado": "Decí «mariposa» en voz alta. ¿Qué sílaba suena con más fuerza?",
        "respuesta_correcta": "po",
        "opciones": [
          "ma",
          "ri",
          "po"
        ],
        "paso_resuelto": "Pronunciamos ma-ri-PO-sa: po suena con más fuerza. Esa es la sílaba tónica.",
        "visual": null
      },
      {
        "id": "leng_til_1_tonica-v6",
        "enunciado": "Decí «zapato» en voz alta. ¿Qué sílaba suena con más fuerza?",
        "respuesta_correcta": "pa",
        "opciones": [
          "to",
          "pa",
          "za"
        ],
        "paso_resuelto": "Pronunciamos za-PA-to: pa suena con más fuerza. Esa es la sílaba tónica.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_til_2_agudas",
    "tema": "tildes_generales_agudas_graves_esdrujulas",
    "titulo": "Agudas: fuerza en la última sílaba",
    "explicacion": "Si la sílaba más fuerte es la última, la palabra es aguda. En los casos que veremos, lleva tilde si termina en vocal, N o S. Si termina en otra consonante, no. Aquí no trabajamos terminaciones con varias consonantes ni con Y.",
    "ejemplo": "café → ca-FÉ: última sílaba y final en vocal, lleva tilde.",
    "pasos": [
      "Ubicamos la sílaba tónica al final.",
      "Miramos la última letra: vocal, N o S pide tilde en estos casos."
    ],
    "pista": "Primero ubicá la fuerza; después mirá la última letra.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_til_2_agudas-v1",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: ca-FE.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "café",
        "opciones": [
          "café",
          "cafe"
        ],
        "paso_resuelto": "Es aguda y termina en vocal: lleva tilde Por eso escribimos café.",
        "visual": null
      },
      {
        "id": "leng_til_2_agudas-v2",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: so-FA.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "sofá",
        "opciones": [
          "sofa",
          "sofá"
        ],
        "paso_resuelto": "Es aguda y termina en vocal: lleva tilde Por eso escribimos sofá.",
        "visual": null
      },
      {
        "id": "leng_til_2_agudas-v3",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: li-MON.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "limón",
        "opciones": [
          "limón",
          "limon"
        ],
        "paso_resuelto": "Es aguda y termina en N: lleva tilde Por eso escribimos limón.",
        "visual": null
      },
      {
        "id": "leng_til_2_agudas-v4",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: com-PAS.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "compás",
        "opciones": [
          "compas",
          "compás"
        ],
        "paso_resuelto": "Es aguda y termina en S: lleva tilde Por eso escribimos compás.",
        "visual": null
      },
      {
        "id": "leng_til_2_agudas-v5",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: re-LOJ.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "reloj",
        "opciones": [
          "reloj",
          "relój"
        ],
        "paso_resuelto": "Es aguda y termina en J: no lleva tilde Por eso escribimos reloj.",
        "visual": null
      },
      {
        "id": "leng_til_2_agudas-v6",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: pa-PEL.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "papel",
        "opciones": [
          "papél",
          "papel"
        ],
        "paso_resuelto": "Es aguda y termina en L: no lleva tilde Por eso escribimos papel.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_til_3_graves",
    "tema": "tildes_generales_agudas_graves_esdrujulas",
    "titulo": "Graves: fuerza en la penúltima sílaba",
    "explicacion": "La penúltima sílaba es la segunda contando desde el final. Si allí está la fuerza, la palabra es grave o llana. En estos casos lleva tilde si NO termina en vocal, N o S. No veremos todavía vocales juntas ni terminaciones con varias consonantes.",
    "ejemplo": "árbol → ÁR-bol: penúltima sílaba y final en L, lleva tilde.",
    "pasos": [
      "Contamos desde el final: bol es la última; ár es la penúltima.",
      "Termina en L, así que esta palabra grave lleva tilde."
    ],
    "pista": "¿La fuerza está en la penúltima? Si termina en vocal, N o S, estos ejemplos no llevan tilde.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_til_3_graves-v1",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: AR-bol.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "árbol",
        "opciones": [
          "árbol",
          "arbol"
        ],
        "paso_resuelto": "Es grave y termina en L: lleva tilde Por eso escribimos árbol.",
        "visual": null
      },
      {
        "id": "leng_til_3_graves-v2",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: LA-piz.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "lápiz",
        "opciones": [
          "lapiz",
          "lápiz"
        ],
        "paso_resuelto": "Es grave y termina en Z: lleva tilde Por eso escribimos lápiz.",
        "visual": null
      },
      {
        "id": "leng_til_3_graves-v3",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: FA-cil.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "fácil",
        "opciones": [
          "fácil",
          "facil"
        ],
        "paso_resuelto": "Es grave y termina en L: lleva tilde Por eso escribimos fácil.",
        "visual": null
      },
      {
        "id": "leng_til_3_graves-v4",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: CA-sa.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "casa",
        "opciones": [
          "cása",
          "casa"
        ],
        "paso_resuelto": "Es grave y termina en vocal: no lleva tilde Por eso escribimos casa.",
        "visual": null
      },
      {
        "id": "leng_til_3_graves-v5",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: JO-ven.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "joven",
        "opciones": [
          "joven",
          "jóven"
        ],
        "paso_resuelto": "Es grave y termina en N: no lleva tilde Por eso escribimos joven.",
        "visual": null
      },
      {
        "id": "leng_til_3_graves-v6",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: LU-nes.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "lunes",
        "opciones": [
          "lúnes",
          "lunes"
        ],
        "paso_resuelto": "Es grave y termina en S: no lleva tilde Por eso escribimos lunes.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_til_4_esdrujulas",
    "tema": "tildes_generales_agudas_graves_esdrujulas",
    "titulo": "Esdrújulas: fuerza en la antepenúltima",
    "explicacion": "La antepenúltima sílaba es la tercera contando desde el final. Las palabras que llevan allí la fuerza son esdrújulas y siempre llevan tilde. No necesitamos mirar la última letra.",
    "ejemplo": "música → MÚ-si-ca: ca, si, mú. La fuerza está en la tercera desde el final.",
    "pasos": [
      "Contamos las sílabas desde el final.",
      "Si la tónica es la antepenúltima, escribimos tilde en su vocal."
    ],
    "pista": "Contá desde el final: última, penúltima, antepenúltima.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_til_4_esdrujulas-v1",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: MU-si-ca.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "música",
        "opciones": [
          "música",
          "musica"
        ],
        "paso_resuelto": "MU es la antepenúltima: es esdrújula y lleva tilde Por eso escribimos música.",
        "visual": null
      },
      {
        "id": "leng_til_4_esdrujulas-v2",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: PA-ja-ro.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "pájaro",
        "opciones": [
          "pajaro",
          "pájaro"
        ],
        "paso_resuelto": "PA es la antepenúltima: es esdrújula y lleva tilde Por eso escribimos pájaro.",
        "visual": null
      },
      {
        "id": "leng_til_4_esdrujulas-v3",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: te-LE-fo-no.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "teléfono",
        "opciones": [
          "teléfono",
          "telefono"
        ],
        "paso_resuelto": "LE es la antepenúltima: es esdrújula y lleva tilde Por eso escribimos teléfono.",
        "visual": null
      },
      {
        "id": "leng_til_4_esdrujulas-v4",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: SA-ba-do.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "sábado",
        "opciones": [
          "sabado",
          "sábado"
        ],
        "paso_resuelto": "SA es la antepenúltima: es esdrújula y lleva tilde Por eso escribimos sábado.",
        "visual": null
      },
      {
        "id": "leng_til_4_esdrujulas-v5",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: NU-me-ro.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "número",
        "opciones": [
          "número",
          "numero"
        ],
        "paso_resuelto": "NU es la antepenúltima: es esdrújula y lleva tilde Por eso escribimos número.",
        "visual": null
      },
      {
        "id": "leng_til_4_esdrujulas-v6",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: se-MA-fo-ro.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "semáforo",
        "opciones": [
          "semaforo",
          "semáforo"
        ],
        "paso_resuelto": "MA es la antepenúltima: es esdrújula y lleva tilde Por eso escribimos semáforo.",
        "visual": null
      }
    ]
  },
  {
    "id": "leng_til_5_sobresdrujulas",
    "tema": "tildes_generales_agudas_graves_esdrujulas",
    "titulo": "Sobresdrújulas: fuerza antes de la antepenúltima",
    "explicacion": "Algunas palabras juntan una acción con pequeñas palabras al final: diga + se + lo → dígaselo. Si la fuerza queda antes de la antepenúltima, son sobresdrújulas y llevan tilde. Hoy practicamos solo estas formas; las palabras terminadas en -mente se estudian aparte.",
    "ejemplo": "dígaselo → DÍ-ga-se-lo: la fuerza está en la cuarta sílaba desde el final.",
    "pasos": [
      "Contamos desde el final: lo, se, ga, dí.",
      "La fuerza quedó antes de la antepenúltima: escribimos dígaselo."
    ],
    "pista": "Contá desde el final. Si la fuerza está antes de la tercera sílaba, estas formas llevan tilde.",
    "visual": null,
    "actividades": [
      {
        "id": "leng_til_5_sobresdrujulas-v1",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: DI-ga-se-lo.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "dígaselo",
        "opciones": [
          "dígaselo",
          "digaselo"
        ],
        "paso_resuelto": "DI está antes de la antepenúltima: lleva tilde Por eso escribimos dígaselo.",
        "visual": null
      },
      {
        "id": "leng_til_5_sobresdrujulas-v2",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: CUEN-ta-me-lo.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "cuéntamelo",
        "opciones": [
          "cuentamelo",
          "cuéntamelo"
        ],
        "paso_resuelto": "CUEN está antes de la antepenúltima: lleva tilde Por eso escribimos cuéntamelo.",
        "visual": null
      },
      {
        "id": "leng_til_5_sobresdrujulas-v3",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: ex-PLI-ca-me-lo.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "explícamelo",
        "opciones": [
          "explícamelo",
          "explicamelo"
        ],
        "paso_resuelto": "PLI está antes de la antepenúltima: lleva tilde Por eso escribimos explícamelo.",
        "visual": null
      },
      {
        "id": "leng_til_5_sobresdrujulas-v4",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: PRES-ta-me-lo.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "préstamelo",
        "opciones": [
          "prestamelo",
          "préstamelo"
        ],
        "paso_resuelto": "PRES está antes de la antepenúltima: lleva tilde Por eso escribimos préstamelo.",
        "visual": null
      },
      {
        "id": "leng_til_5_sobresdrujulas-v5",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: re-PI-te-me-lo.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "repítemelo",
        "opciones": [
          "repítemelo",
          "repitemelo"
        ],
        "paso_resuelto": "PI está antes de la antepenúltima: lleva tilde Por eso escribimos repítemelo.",
        "visual": null
      },
      {
        "id": "leng_til_5_sobresdrujulas-v6",
        "enunciado": "La sílaba en MAYÚSCULAS es la tónica: de-VUEL-ve-me-lo.\nElegí cómo se escribe la palabra.",
        "respuesta_correcta": "devuélvemelo",
        "opciones": [
          "devuelvemelo",
          "devuélvemelo"
        ],
        "paso_resuelto": "VUEL está antes de la antepenúltima: lleva tilde Por eso escribimos devuélvemelo.",
        "visual": null
      }
    ]
  }
];

// R9: fundamentos adicionales de Matemática.
UNIDADES_BASES.push(...[
  {
    "id": "mat_num_decenas",
    "tema": "numeros_naturales_sistema_decimal",
    "titulo": "Diez unidades forman una decena",
    "explicacion": "Podemos contar objetos formando paquetes de diez. Cada paquete es una decena. Los objetos que no completan un paquete quedan como unidades.",
    "ejemplo": "23 fichas son 2 decenas y 3 unidades.",
    "pasos": [
      "Formamos dos paquetes de diez: 20 fichas.",
      "Quedan 3 fichas sueltas: 20 + 3 = 23."
    ],
    "pista": "Separá los paquetes completos de las unidades sueltas.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Tenés 23 fichas. ¿Cuántas decenas completas podés formar?",
        "respuesta_correcta": "2",
        "opciones": [
          "2",
          "3",
          "23"
        ],
        "paso_resuelto": "Formamos 2 paquetes de 10; quedan 3 fichas sueltas.",
        "visual": null,
        "id": "mat_num_decenas-v1"
      },
      {
        "enunciado": "Tenés 34 fichas. ¿Cuántas decenas completas podés formar?",
        "respuesta_correcta": "3",
        "opciones": [
          "4",
          "34",
          "3"
        ],
        "paso_resuelto": "Formamos 3 paquetes de 10; quedan 4 fichas sueltas.",
        "visual": null,
        "id": "mat_num_decenas-v2"
      },
      {
        "enunciado": "Tenés 45 fichas. ¿Cuántas decenas completas podés formar?",
        "respuesta_correcta": "4",
        "opciones": [
          "45",
          "4",
          "5"
        ],
        "paso_resuelto": "Formamos 4 paquetes de 10; quedan 5 fichas sueltas.",
        "visual": null,
        "id": "mat_num_decenas-v3"
      },
      {
        "enunciado": "Tenés 56 fichas. ¿Cuántas decenas completas podés formar?",
        "respuesta_correcta": "5",
        "opciones": [
          "5",
          "6",
          "56"
        ],
        "paso_resuelto": "Formamos 5 paquetes de 10; quedan 6 fichas sueltas.",
        "visual": null,
        "id": "mat_num_decenas-v4"
      },
      {
        "enunciado": "Tenés 67 fichas. ¿Cuántas decenas completas podés formar?",
        "respuesta_correcta": "6",
        "opciones": [
          "7",
          "67",
          "6"
        ],
        "paso_resuelto": "Formamos 6 paquetes de 10; quedan 7 fichas sueltas.",
        "visual": null,
        "id": "mat_num_decenas-v5"
      },
      {
        "enunciado": "Tenés 78 fichas. ¿Cuántas decenas completas podés formar?",
        "respuesta_correcta": "7",
        "opciones": [
          "78",
          "7",
          "8"
        ],
        "paso_resuelto": "Formamos 7 paquetes de 10; quedan 8 fichas sueltas.",
        "visual": null,
        "id": "mat_num_decenas-v6"
      }
    ]
  },
  {
    "id": "mat_num_posicion",
    "tema": "numeros_naturales_sistema_decimal",
    "titulo": "El lugar de cada cifra",
    "explicacion": "De derecha a izquierda están unidades, decenas y centenas. Un cero conserva un lugar vacío. En 304 hay 3 centenas, ninguna decena y 4 unidades.",
    "ejemplo": "En 352, el 5 vale 50 porque ocupa las decenas.",
    "pasos": [
      "Leemos 3 centenas, 5 decenas y 2 unidades.",
      "Descomponemos: 300 + 50 + 2 = 352."
    ],
    "pista": "Contá las posiciones desde la derecha.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "En 352, ¿cuánto vale la cifra 5 de las decenas?",
        "respuesta_correcta": "50",
        "opciones": [
          "50",
          "5",
          "500",
          "100"
        ],
        "paso_resuelto": "Hay 5 decenas: 5 × 10 = 50.",
        "visual": null,
        "id": "mat_num_posicion-v1"
      },
      {
        "enunciado": "En 426, ¿cuánto vale la cifra 2 de las decenas?",
        "respuesta_correcta": "20",
        "opciones": [
          "2",
          "200",
          "100",
          "20"
        ],
        "paso_resuelto": "Hay 2 decenas: 2 × 10 = 20.",
        "visual": null,
        "id": "mat_num_posicion-v2"
      },
      {
        "enunciado": "En 571, ¿cuánto vale la cifra 7 de las decenas?",
        "respuesta_correcta": "70",
        "opciones": [
          "700",
          "100",
          "70",
          "7"
        ],
        "paso_resuelto": "Hay 7 decenas: 7 × 10 = 70.",
        "visual": null,
        "id": "mat_num_posicion-v3"
      },
      {
        "enunciado": "En 683, ¿cuánto vale la cifra 8 de las decenas?",
        "respuesta_correcta": "80",
        "opciones": [
          "100",
          "80",
          "8",
          "800"
        ],
        "paso_resuelto": "Hay 8 decenas: 8 × 10 = 80.",
        "visual": null,
        "id": "mat_num_posicion-v4"
      },
      {
        "enunciado": "En 794, ¿cuánto vale la cifra 9 de las decenas?",
        "respuesta_correcta": "90",
        "opciones": [
          "90",
          "9",
          "900",
          "100"
        ],
        "paso_resuelto": "Hay 9 decenas: 9 × 10 = 90.",
        "visual": null,
        "id": "mat_num_posicion-v5"
      },
      {
        "enunciado": "En 208, ¿cuánto vale la cifra 0 de las decenas?",
        "respuesta_correcta": "0",
        "opciones": [
          "100",
          "0"
        ],
        "paso_resuelto": "Hay 0 decenas: 0 × 10 = 0.",
        "visual": null,
        "id": "mat_num_posicion-v6"
      }
    ]
  },
  {
    "id": "mat_num_orden",
    "tema": "numeros_naturales_sistema_decimal",
    "titulo": "Comparar desde el lugar más grande",
    "explicacion": "Para comparar números naturales, miramos primero cuántas cifras tienen. Con igual cantidad de cifras, comparamos desde la izquierda. Si son iguales, seguimos a la siguiente posición.",
    "ejemplo": "418 es mayor que 391.",
    "pasos": [
      "Ambos tienen tres cifras.",
      "418 tiene 4 centenas y 391 tiene 3: elegimos 418."
    ],
    "pista": "Compará centenas antes que decenas y unidades.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Cuál es mayor: 418 o 391?",
        "respuesta_correcta": "418",
        "opciones": [
          "418",
          "391"
        ],
        "paso_resuelto": "Al comparar de izquierda a derecha, 418 es mayor que 391.",
        "visual": null,
        "id": "mat_num_orden-v1"
      },
      {
        "enunciado": "¿Cuál es mayor: 507 o 570?",
        "respuesta_correcta": "570",
        "opciones": [
          "507",
          "570"
        ],
        "paso_resuelto": "Al comparar de izquierda a derecha, 570 es mayor que 507.",
        "visual": null,
        "id": "mat_num_orden-v2"
      },
      {
        "enunciado": "¿Cuál es mayor: 632 o 623?",
        "respuesta_correcta": "632",
        "opciones": [
          "632",
          "623"
        ],
        "paso_resuelto": "Al comparar de izquierda a derecha, 632 es mayor que 623.",
        "visual": null,
        "id": "mat_num_orden-v3"
      },
      {
        "enunciado": "¿Cuál es mayor: 804 o 480?",
        "respuesta_correcta": "804",
        "opciones": [
          "480",
          "804"
        ],
        "paso_resuelto": "Al comparar de izquierda a derecha, 804 es mayor que 480.",
        "visual": null,
        "id": "mat_num_orden-v4"
      },
      {
        "enunciado": "¿Cuál es mayor: 109 o 190?",
        "respuesta_correcta": "190",
        "opciones": [
          "190",
          "109"
        ],
        "paso_resuelto": "Al comparar de izquierda a derecha, 190 es mayor que 109.",
        "visual": null,
        "id": "mat_num_orden-v5"
      },
      {
        "enunciado": "¿Cuál es mayor: 725 o 752?",
        "respuesta_correcta": "752",
        "opciones": [
          "725",
          "752"
        ],
        "paso_resuelto": "Al comparar de izquierda a derecha, 752 es mayor que 725.",
        "visual": null,
        "id": "mat_num_orden-v6"
      }
    ]
  },
  {
    "id": "mat_num_suma",
    "tema": "numeros_naturales_sistema_decimal",
    "titulo": "Sumar y reagrupar",
    "explicacion": "Sumar reúne cantidades. Alineamos unidades con unidades y decenas con decenas. Si juntamos diez unidades, las cambiamos por una decena.",
    "ejemplo": "27 + 15 = 42.",
    "pasos": [
      "7 + 5 = 12: una decena y 2 unidades.",
      "2 + 1 + 1 decenas = 4 decenas; quedan 42."
    ],
    "pista": "Si las unidades llegan a diez, llevá una decena.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Tenés 27 fichas y recibís 15. ¿Cuántas tenés ahora?",
        "respuesta_correcta": "42",
        "opciones": [
          "42",
          "43",
          "52"
        ],
        "paso_resuelto": "Unidades: 7 + 5 = 12.\nSumamos también las decenas: 27 + 15 = 42.",
        "visual": null,
        "id": "mat_num_suma-v1"
      },
      {
        "enunciado": "Tenés 36 fichas y recibís 18. ¿Cuántas tenés ahora?",
        "respuesta_correcta": "54",
        "opciones": [
          "55",
          "64",
          "54"
        ],
        "paso_resuelto": "Unidades: 6 + 8 = 14.\nSumamos también las decenas: 36 + 18 = 54.",
        "visual": null,
        "id": "mat_num_suma-v2"
      },
      {
        "enunciado": "Tenés 48 fichas y recibís 24. ¿Cuántas tenés ahora?",
        "respuesta_correcta": "72",
        "opciones": [
          "82",
          "72",
          "73"
        ],
        "paso_resuelto": "Unidades: 8 + 4 = 12.\nSumamos también las decenas: 48 + 24 = 72.",
        "visual": null,
        "id": "mat_num_suma-v3"
      },
      {
        "enunciado": "Tenés 56 fichas y recibís 27. ¿Cuántas tenés ahora?",
        "respuesta_correcta": "83",
        "opciones": [
          "83",
          "84",
          "93"
        ],
        "paso_resuelto": "Unidades: 6 + 7 = 13.\nSumamos también las decenas: 56 + 27 = 83.",
        "visual": null,
        "id": "mat_num_suma-v4"
      },
      {
        "enunciado": "Tenés 19 fichas y recibís 34. ¿Cuántas tenés ahora?",
        "respuesta_correcta": "53",
        "opciones": [
          "54",
          "63",
          "53"
        ],
        "paso_resuelto": "Unidades: 9 + 4 = 13.\nSumamos también las decenas: 19 + 34 = 53.",
        "visual": null,
        "id": "mat_num_suma-v5"
      },
      {
        "enunciado": "Tenés 65 fichas y recibís 28. ¿Cuántas tenés ahora?",
        "respuesta_correcta": "93",
        "opciones": [
          "103",
          "93",
          "94"
        ],
        "paso_resuelto": "Unidades: 5 + 8 = 13.\nSumamos también las decenas: 65 + 28 = 93.",
        "visual": null,
        "id": "mat_num_suma-v6"
      }
    ]
  },
  {
    "id": "mat_num_resta",
    "tema": "numeros_naturales_sistema_decimal",
    "titulo": "Restar y comprobar",
    "explicacion": "Restar permite saber cuánto queda. Si faltan unidades para quitar, cambiamos una decena por diez unidades. Podemos comprobar sumando lo que quitamos a lo que quedó.",
    "ejemplo": "42 − 17 = 25.",
    "pasos": [
      "42 son también 3 decenas y 12 unidades.",
      "12 − 7 = 5 y 3 − 1 = 2 decenas. Comprobamos: 25 + 17 = 42."
    ],
    "pista": "Podés cambiar una decena por diez unidades.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Había 42 fichas y usaste 17. ¿Cuántas quedan?",
        "respuesta_correcta": "25",
        "opciones": [
          "25",
          "26",
          "35"
        ],
        "paso_resuelto": "Cambiamos una decena: 3 decenas y 12 unidades.\n42 − 17 = 25. Comprobamos: 25 + 17 = 42.",
        "visual": null,
        "id": "mat_num_resta-v1"
      },
      {
        "enunciado": "Había 53 fichas y usaste 28. ¿Cuántas quedan?",
        "respuesta_correcta": "25",
        "opciones": [
          "26",
          "35",
          "25"
        ],
        "paso_resuelto": "Cambiamos una decena: 4 decenas y 13 unidades.\n53 − 28 = 25. Comprobamos: 25 + 28 = 53.",
        "visual": null,
        "id": "mat_num_resta-v2"
      },
      {
        "enunciado": "Había 61 fichas y usaste 36. ¿Cuántas quedan?",
        "respuesta_correcta": "25",
        "opciones": [
          "35",
          "25",
          "26"
        ],
        "paso_resuelto": "Cambiamos una decena: 5 decenas y 11 unidades.\n61 − 36 = 25. Comprobamos: 25 + 36 = 61.",
        "visual": null,
        "id": "mat_num_resta-v3"
      },
      {
        "enunciado": "Había 74 fichas y usaste 49. ¿Cuántas quedan?",
        "respuesta_correcta": "25",
        "opciones": [
          "25",
          "26",
          "35"
        ],
        "paso_resuelto": "Cambiamos una decena: 6 decenas y 14 unidades.\n74 − 49 = 25. Comprobamos: 25 + 49 = 74.",
        "visual": null,
        "id": "mat_num_resta-v4"
      },
      {
        "enunciado": "Había 82 fichas y usaste 57. ¿Cuántas quedan?",
        "respuesta_correcta": "25",
        "opciones": [
          "26",
          "35",
          "25"
        ],
        "paso_resuelto": "Cambiamos una decena: 7 decenas y 12 unidades.\n82 − 57 = 25. Comprobamos: 25 + 57 = 82.",
        "visual": null,
        "id": "mat_num_resta-v5"
      },
      {
        "enunciado": "Había 95 fichas y usaste 68. ¿Cuántas quedan?",
        "respuesta_correcta": "27",
        "opciones": [
          "37",
          "27",
          "28"
        ],
        "paso_resuelto": "Cambiamos una decena: 8 decenas y 15 unidades.\n95 − 68 = 27. Comprobamos: 27 + 68 = 95.",
        "visual": null,
        "id": "mat_num_resta-v6"
      }
    ]
  },
  {
    "id": "mat_tab_grupos",
    "tema": "tablas_multiplicar_2_5",
    "titulo": "Multiplicar cuenta grupos iguales",
    "explicacion": "Una multiplicación abrevia una suma repetida. En 3 × 4 tenemos tres grupos de cuatro. Los números que multiplicamos se llaman factores y el resultado es el producto.",
    "ejemplo": "3 platos con 4 galletitas suman 12.",
    "pasos": [
      "Sumamos 4 + 4 + 4.",
      "Escribimos 3 × 4 = 12."
    ],
    "pista": "Contá los grupos y cuánto hay en cada uno.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Hay 3 platos con 4 galletitas en cada uno. ¿Cuántas hay en total?",
        "respuesta_correcta": "12",
        "opciones": [
          "12",
          "7",
          "16"
        ],
        "paso_resuelto": "4 + 4 + 4 = 12. Son 3 × 4.",
        "visual": null,
        "id": "mat_tab_grupos-v1"
      },
      {
        "enunciado": "Hay 2 platos con 5 galletitas en cada uno. ¿Cuántas hay en total?",
        "respuesta_correcta": "10",
        "opciones": [
          "7",
          "15",
          "10"
        ],
        "paso_resuelto": "5 + 5 = 10. Son 2 × 5.",
        "visual": null,
        "id": "mat_tab_grupos-v2"
      },
      {
        "enunciado": "Hay 4 platos con 3 galletitas en cada uno. ¿Cuántas hay en total?",
        "respuesta_correcta": "12",
        "opciones": [
          "15",
          "12",
          "7"
        ],
        "paso_resuelto": "3 + 3 + 3 + 3 = 12. Son 4 × 3.",
        "visual": null,
        "id": "mat_tab_grupos-v3"
      },
      {
        "enunciado": "Hay 5 platos con 4 galletitas en cada uno. ¿Cuántas hay en total?",
        "respuesta_correcta": "20",
        "opciones": [
          "20",
          "9",
          "24"
        ],
        "paso_resuelto": "4 + 4 + 4 + 4 + 4 = 20. Son 5 × 4.",
        "visual": null,
        "id": "mat_tab_grupos-v4"
      },
      {
        "enunciado": "Hay 3 platos con 5 galletitas en cada uno. ¿Cuántas hay en total?",
        "respuesta_correcta": "15",
        "opciones": [
          "8",
          "20",
          "15"
        ],
        "paso_resuelto": "5 + 5 + 5 = 15. Son 3 × 5.",
        "visual": null,
        "id": "mat_tab_grupos-v5"
      },
      {
        "enunciado": "Hay 4 platos con 5 galletitas en cada uno. ¿Cuántas hay en total?",
        "respuesta_correcta": "20",
        "opciones": [
          "25",
          "20",
          "9"
        ],
        "paso_resuelto": "5 + 5 + 5 + 5 = 20. Son 4 × 5.",
        "visual": null,
        "id": "mat_tab_grupos-v6"
      }
    ]
  },
  {
    "id": "mat_tab_dobles",
    "tema": "tablas_multiplicar_2_5",
    "titulo": "Dobles y el orden de los factores",
    "explicacion": "El doble es dos veces una cantidad. Para multiplicar por cuatro podemos hacer el doble del doble. Cambiar el orden de los factores conserva el total: 3 × 4 = 4 × 3.",
    "ejemplo": "4 × 3 = 12.",
    "pasos": [
      "El doble de 3 es 6.",
      "El doble de 6 es 12: cuatro veces 3."
    ],
    "pista": "Calculá un doble y después otro doble.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Calculá 4 × 3 usando dobles.",
        "respuesta_correcta": "12",
        "opciones": [
          "12",
          "13",
          "22"
        ],
        "paso_resuelto": "El doble de 3 es 6.\nEl doble de 6 es 12.",
        "visual": null,
        "id": "mat_tab_dobles-v1"
      },
      {
        "enunciado": "Calculá 4 × 4 usando dobles.",
        "respuesta_correcta": "16",
        "opciones": [
          "17",
          "26",
          "16"
        ],
        "paso_resuelto": "El doble de 4 es 8.\nEl doble de 8 es 16.",
        "visual": null,
        "id": "mat_tab_dobles-v2"
      },
      {
        "enunciado": "Calculá 4 × 5 usando dobles.",
        "respuesta_correcta": "20",
        "opciones": [
          "30",
          "20",
          "21"
        ],
        "paso_resuelto": "El doble de 5 es 10.\nEl doble de 10 es 20.",
        "visual": null,
        "id": "mat_tab_dobles-v3"
      },
      {
        "enunciado": "Calculá 4 × 6 usando dobles.",
        "respuesta_correcta": "24",
        "opciones": [
          "24",
          "25",
          "34"
        ],
        "paso_resuelto": "El doble de 6 es 12.\nEl doble de 12 es 24.",
        "visual": null,
        "id": "mat_tab_dobles-v4"
      },
      {
        "enunciado": "Calculá 4 × 7 usando dobles.",
        "respuesta_correcta": "28",
        "opciones": [
          "29",
          "38",
          "28"
        ],
        "paso_resuelto": "El doble de 7 es 14.\nEl doble de 14 es 28.",
        "visual": null,
        "id": "mat_tab_dobles-v5"
      },
      {
        "enunciado": "Calculá 4 × 8 usando dobles.",
        "respuesta_correcta": "32",
        "opciones": [
          "42",
          "32",
          "33"
        ],
        "paso_resuelto": "El doble de 8 es 16.\nEl doble de 16 es 32.",
        "visual": null,
        "id": "mat_tab_dobles-v6"
      }
    ]
  },
  {
    "id": "mat_tab_cinco",
    "tema": "tablas_multiplicar_2_5",
    "titulo": "Contar de cinco en cinco",
    "explicacion": "Cada grupo nuevo de cinco suma cinco al total. Los resultados de la tabla del cinco terminan en 0 o 5. Este patrón ayuda a comprobar, pero para saber el total contamos los grupos.",
    "ejemplo": "5 × 4 = 20.",
    "pasos": [
      "Contamos cuatro saltos: 5, 10, 15, 20.",
      "Son cuatro grupos de cinco: 20."
    ],
    "pista": "Contá los saltos, además de mirar la última cifra.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Cuánto es 5 × 4?",
        "respuesta_correcta": "20",
        "opciones": [
          "20",
          "21",
          "30"
        ],
        "paso_resuelto": "5, 10, 15, 20: 4 grupos dan 20.",
        "visual": null,
        "id": "mat_tab_cinco-v1"
      },
      {
        "enunciado": "¿Cuánto es 5 × 3?",
        "respuesta_correcta": "15",
        "opciones": [
          "16",
          "25",
          "15"
        ],
        "paso_resuelto": "5, 10, 15: 3 grupos dan 15.",
        "visual": null,
        "id": "mat_tab_cinco-v2"
      },
      {
        "enunciado": "¿Cuánto es 5 × 6?",
        "respuesta_correcta": "30",
        "opciones": [
          "40",
          "30",
          "31"
        ],
        "paso_resuelto": "5, 10, 15, 20, 25, 30: 6 grupos dan 30.",
        "visual": null,
        "id": "mat_tab_cinco-v3"
      },
      {
        "enunciado": "¿Cuánto es 5 × 7?",
        "respuesta_correcta": "35",
        "opciones": [
          "35",
          "36",
          "45"
        ],
        "paso_resuelto": "5, 10, 15, 20, 25, 30, 35: 7 grupos dan 35.",
        "visual": null,
        "id": "mat_tab_cinco-v4"
      },
      {
        "enunciado": "¿Cuánto es 5 × 8?",
        "respuesta_correcta": "40",
        "opciones": [
          "41",
          "50",
          "40"
        ],
        "paso_resuelto": "5, 10, 15, 20, 25, 30, 35, 40: 8 grupos dan 40.",
        "visual": null,
        "id": "mat_tab_cinco-v5"
      },
      {
        "enunciado": "¿Cuánto es 5 × 9?",
        "respuesta_correcta": "45",
        "opciones": [
          "55",
          "45",
          "46"
        ],
        "paso_resuelto": "5, 10, 15, 20, 25, 30, 35, 40, 45: 9 grupos dan 45.",
        "visual": null,
        "id": "mat_tab_cinco-v6"
      }
    ]
  },
  {
    "id": "mat_tab_seis_ocho",
    "tema": "tablas_multiplicar_6_8",
    "titulo": "Construir las tablas del seis y del ocho",
    "explicacion": "Para multiplicar por seis duplicamos el resultado de multiplicar por tres. Para multiplicar por ocho duplicamos el resultado de multiplicar por cuatro. Podés escribir los pasos.",
    "ejemplo": "8 × 5 = 40.",
    "pasos": [
      "4 × 5 = 20.",
      "Duplicamos: 20 + 20 = 40."
    ],
    "pista": "Buscá primero la tabla de la mitad del factor.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Calculá 8 × 5 con un doble.",
        "respuesta_correcta": "40",
        "opciones": [
          "40",
          "41",
          "50"
        ],
        "paso_resuelto": "4 × 5 = 20.\nSu doble es 40.",
        "visual": null,
        "id": "mat_tab_seis_ocho-v1"
      },
      {
        "enunciado": "Calculá 6 × 4 con un doble.",
        "respuesta_correcta": "24",
        "opciones": [
          "25",
          "34",
          "24"
        ],
        "paso_resuelto": "3 × 4 = 12.\nSu doble es 24.",
        "visual": null,
        "id": "mat_tab_seis_ocho-v2"
      },
      {
        "enunciado": "Calculá 8 × 3 con un doble.",
        "respuesta_correcta": "24",
        "opciones": [
          "34",
          "24",
          "25"
        ],
        "paso_resuelto": "4 × 3 = 12.\nSu doble es 24.",
        "visual": null,
        "id": "mat_tab_seis_ocho-v3"
      },
      {
        "enunciado": "Calculá 6 × 7 con un doble.",
        "respuesta_correcta": "42",
        "opciones": [
          "42",
          "43",
          "52"
        ],
        "paso_resuelto": "3 × 7 = 21.\nSu doble es 42.",
        "visual": null,
        "id": "mat_tab_seis_ocho-v4"
      },
      {
        "enunciado": "Calculá 8 × 6 con un doble.",
        "respuesta_correcta": "48",
        "opciones": [
          "49",
          "58",
          "48"
        ],
        "paso_resuelto": "4 × 6 = 24.\nSu doble es 48.",
        "visual": null,
        "id": "mat_tab_seis_ocho-v5"
      },
      {
        "enunciado": "Calculá 6 × 8 con un doble.",
        "respuesta_correcta": "48",
        "opciones": [
          "58",
          "48",
          "49"
        ],
        "paso_resuelto": "3 × 8 = 24.\nSu doble es 48.",
        "visual": null,
        "id": "mat_tab_seis_ocho-v6"
      }
    ]
  },
  {
    "id": "mat_tab_siete",
    "tema": "tablas_multiplicar_6_8",
    "titulo": "Siete grupos: cinco más dos",
    "explicacion": "Podemos separar siete grupos en cinco grupos y dos grupos. Multiplicamos cada parte por la misma cantidad y sumamos los resultados.",
    "ejemplo": "7 × 6 = 42.",
    "pasos": [
      "5 × 6 = 30 y 2 × 6 = 12.",
      "Sumamos 30 + 12 = 42."
    ],
    "pista": "Separá 7 en 5 + 2 sin cambiar el otro factor.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Calculá 7 × 6.",
        "respuesta_correcta": "42",
        "opciones": [
          "42",
          "43",
          "52"
        ],
        "paso_resuelto": "5 × 6 = 30; 2 × 6 = 12.\n30 + 12 = 42.",
        "visual": null,
        "id": "mat_tab_siete-v1"
      },
      {
        "enunciado": "Calculá 7 × 3.",
        "respuesta_correcta": "21",
        "opciones": [
          "22",
          "31",
          "21"
        ],
        "paso_resuelto": "5 × 3 = 15; 2 × 3 = 6.\n15 + 6 = 21.",
        "visual": null,
        "id": "mat_tab_siete-v2"
      },
      {
        "enunciado": "Calculá 7 × 4.",
        "respuesta_correcta": "28",
        "opciones": [
          "38",
          "28",
          "29"
        ],
        "paso_resuelto": "5 × 4 = 20; 2 × 4 = 8.\n20 + 8 = 28.",
        "visual": null,
        "id": "mat_tab_siete-v3"
      },
      {
        "enunciado": "Calculá 7 × 5.",
        "respuesta_correcta": "35",
        "opciones": [
          "35",
          "36",
          "45"
        ],
        "paso_resuelto": "5 × 5 = 25; 2 × 5 = 10.\n25 + 10 = 35.",
        "visual": null,
        "id": "mat_tab_siete-v4"
      },
      {
        "enunciado": "Calculá 7 × 7.",
        "respuesta_correcta": "49",
        "opciones": [
          "50",
          "59",
          "49"
        ],
        "paso_resuelto": "5 × 7 = 35; 2 × 7 = 14.\n35 + 14 = 49.",
        "visual": null,
        "id": "mat_tab_siete-v5"
      },
      {
        "enunciado": "Calculá 7 × 8.",
        "respuesta_correcta": "56",
        "opciones": [
          "66",
          "56",
          "57"
        ],
        "paso_resuelto": "5 × 8 = 40; 2 × 8 = 16.\n40 + 16 = 56.",
        "visual": null,
        "id": "mat_tab_siete-v6"
      }
    ]
  },
  {
    "id": "mat_tab_diez",
    "tema": "tablas_multiplicar_9_10",
    "titulo": "Multiplicar por diez cambia el valor",
    "explicacion": "Al multiplicar un natural por diez, cada unidad pasa a valer una decena. Escribimos un cero a la derecha. Por cien, cada unidad pasa a valer una centena.",
    "ejemplo": "23 × 10 = 230.",
    "pasos": [
      "23 grupos de diez son 23 decenas.",
      "23 decenas equivalen a 230 unidades."
    ],
    "pista": "Pensá en decenas para × 10 y centenas para × 100.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Cuánto es 23 × 10?",
        "respuesta_correcta": "230",
        "opciones": [
          "230",
          "33",
          "23"
        ],
        "paso_resuelto": "23 grupos de 10 dan 230.",
        "visual": null,
        "id": "mat_tab_diez-v1"
      },
      {
        "enunciado": "¿Cuánto es 14 × 10?",
        "respuesta_correcta": "140",
        "opciones": [
          "24",
          "14",
          "140"
        ],
        "paso_resuelto": "14 grupos de 10 dan 140.",
        "visual": null,
        "id": "mat_tab_diez-v2"
      },
      {
        "enunciado": "¿Cuánto es 32 × 100?",
        "respuesta_correcta": "3200",
        "opciones": [
          "320",
          "3200",
          "132"
        ],
        "paso_resuelto": "32 grupos de 100 dan 3200.",
        "visual": null,
        "id": "mat_tab_diez-v3"
      },
      {
        "enunciado": "¿Cuánto es 7 × 100?",
        "respuesta_correcta": "700",
        "opciones": [
          "700",
          "107",
          "70"
        ],
        "paso_resuelto": "7 grupos de 100 dan 700.",
        "visual": null,
        "id": "mat_tab_diez-v4"
      },
      {
        "enunciado": "¿Cuánto es 45 × 10?",
        "respuesta_correcta": "450",
        "opciones": [
          "55",
          "45",
          "450"
        ],
        "paso_resuelto": "45 grupos de 10 dan 450.",
        "visual": null,
        "id": "mat_tab_diez-v5"
      },
      {
        "enunciado": "¿Cuánto es 16 × 100?",
        "respuesta_correcta": "1600",
        "opciones": [
          "160",
          "1600",
          "116"
        ],
        "paso_resuelto": "16 grupos de 100 dan 1600.",
        "visual": null,
        "id": "mat_tab_diez-v6"
      }
    ]
  },
  {
    "id": "mat_tab_nueve",
    "tema": "tablas_multiplicar_9_10",
    "titulo": "Nueve veces: diez veces menos una",
    "explicacion": "Nueve grupos son diez grupos menos un grupo. Para calcular 9 × 6 hacemos 10 × 6 y quitamos 6, porque quitamos un grupo completo.",
    "ejemplo": "9 × 6 = 54.",
    "pasos": [
      "10 × 6 = 60.",
      "Quitamos un grupo de 6: 60 − 6 = 54."
    ],
    "pista": "Restá el tamaño de un grupo, no el número uno.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Calculá 9 × 6.",
        "respuesta_correcta": "54",
        "opciones": [
          "54",
          "59",
          "60"
        ],
        "paso_resuelto": "10 × 6 = 60.\n60 − 6 = 54.",
        "visual": null,
        "id": "mat_tab_nueve-v1"
      },
      {
        "enunciado": "Calculá 9 × 3.",
        "respuesta_correcta": "27",
        "opciones": [
          "29",
          "30",
          "27"
        ],
        "paso_resuelto": "10 × 3 = 30.\n30 − 3 = 27.",
        "visual": null,
        "id": "mat_tab_nueve-v2"
      },
      {
        "enunciado": "Calculá 9 × 4.",
        "respuesta_correcta": "36",
        "opciones": [
          "40",
          "36",
          "39"
        ],
        "paso_resuelto": "10 × 4 = 40.\n40 − 4 = 36.",
        "visual": null,
        "id": "mat_tab_nueve-v3"
      },
      {
        "enunciado": "Calculá 9 × 5.",
        "respuesta_correcta": "45",
        "opciones": [
          "45",
          "49",
          "50"
        ],
        "paso_resuelto": "10 × 5 = 50.\n50 − 5 = 45.",
        "visual": null,
        "id": "mat_tab_nueve-v4"
      },
      {
        "enunciado": "Calculá 9 × 7.",
        "respuesta_correcta": "63",
        "opciones": [
          "69",
          "70",
          "63"
        ],
        "paso_resuelto": "10 × 7 = 70.\n70 − 7 = 63.",
        "visual": null,
        "id": "mat_tab_nueve-v5"
      },
      {
        "enunciado": "Calculá 9 × 8.",
        "respuesta_correcta": "72",
        "opciones": [
          "80",
          "72",
          "79"
        ],
        "paso_resuelto": "10 × 8 = 80.\n80 − 8 = 72.",
        "visual": null,
        "id": "mat_tab_nueve-v6"
      }
    ]
  },
  {
    "id": "mat_div_repartir",
    "tema": "division_1_digito",
    "titulo": "Repartir la misma cantidad",
    "explicacion": "Dividir reparte un total en grupos iguales. El dividendo es el total; el divisor, la cantidad de grupos; el cociente, lo que recibe cada grupo. Nunca dividimos por cero.",
    "ejemplo": "12 fichas entre 3 personas: 4 para cada una.",
    "pasos": [
      "Buscamos qué número multiplicado por 3 da 12.",
      "3 × 4 = 12; entonces 12 ÷ 3 = 4."
    ],
    "pista": "Buscá una multiplicación que reconstruya el total.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Repartí 12 fichas entre 3 personas por igual. ¿Cuántas recibe cada una?",
        "respuesta_correcta": "4",
        "opciones": [
          "4",
          "5",
          "14"
        ],
        "paso_resuelto": "3 × 4 = 12; cada persona recibe 4.",
        "visual": null,
        "id": "mat_div_repartir-v1"
      },
      {
        "enunciado": "Repartí 20 fichas entre 4 personas por igual. ¿Cuántas recibe cada una?",
        "respuesta_correcta": "5",
        "opciones": [
          "6",
          "15",
          "5"
        ],
        "paso_resuelto": "4 × 5 = 20; cada persona recibe 5.",
        "visual": null,
        "id": "mat_div_repartir-v2"
      },
      {
        "enunciado": "Repartí 18 fichas entre 3 personas por igual. ¿Cuántas recibe cada una?",
        "respuesta_correcta": "6",
        "opciones": [
          "16",
          "6",
          "7"
        ],
        "paso_resuelto": "3 × 6 = 18; cada persona recibe 6.",
        "visual": null,
        "id": "mat_div_repartir-v3"
      },
      {
        "enunciado": "Repartí 24 fichas entre 4 personas por igual. ¿Cuántas recibe cada una?",
        "respuesta_correcta": "6",
        "opciones": [
          "6",
          "7",
          "16"
        ],
        "paso_resuelto": "4 × 6 = 24; cada persona recibe 6.",
        "visual": null,
        "id": "mat_div_repartir-v4"
      },
      {
        "enunciado": "Repartí 35 fichas entre 5 personas por igual. ¿Cuántas recibe cada una?",
        "respuesta_correcta": "7",
        "opciones": [
          "8",
          "17",
          "7"
        ],
        "paso_resuelto": "5 × 7 = 35; cada persona recibe 7.",
        "visual": null,
        "id": "mat_div_repartir-v5"
      },
      {
        "enunciado": "Repartí 32 fichas entre 4 personas por igual. ¿Cuántas recibe cada una?",
        "respuesta_correcta": "8",
        "opciones": [
          "18",
          "8",
          "9"
        ],
        "paso_resuelto": "4 × 8 = 32; cada persona recibe 8.",
        "visual": null,
        "id": "mat_div_repartir-v6"
      }
    ]
  },
  {
    "id": "mat_div_resto",
    "tema": "division_1_digito",
    "titulo": "Lo que sobra es el resto",
    "explicacion": "Cuando no se puede repartir todo por igual, quedan elementos sin repartir: el resto. El resto debe ser menor que el divisor; de lo contrario todavía podríamos dar uno más a cada grupo.",
    "ejemplo": "17 fichas entre 3: 5 para cada una y sobran 2.",
    "pasos": [
      "3 × 5 = 15: repartimos 15.",
      "17 − 15 = 2. El resto 2 es menor que 3."
    ],
    "pista": "Buscá el mayor múltiplo del divisor que no supere el total.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Repartí 17 fichas entre 3 personas, todas reciben lo mismo. ¿Cuántas sobran?",
        "respuesta_correcta": "2",
        "opciones": [
          "2",
          "0",
          "3"
        ],
        "paso_resuelto": "3 × 5 = 15.\n17 − 15 = 2; ese es el resto.",
        "visual": null,
        "id": "mat_div_resto-v1"
      },
      {
        "enunciado": "Repartí 22 fichas entre 4 personas, todas reciben lo mismo. ¿Cuántas sobran?",
        "respuesta_correcta": "2",
        "opciones": [
          "0",
          "4",
          "2"
        ],
        "paso_resuelto": "4 × 5 = 20.\n22 − 20 = 2; ese es el resto.",
        "visual": null,
        "id": "mat_div_resto-v2"
      },
      {
        "enunciado": "Repartí 19 fichas entre 5 personas, todas reciben lo mismo. ¿Cuántas sobran?",
        "respuesta_correcta": "4",
        "opciones": [
          "5",
          "4",
          "0"
        ],
        "paso_resuelto": "5 × 3 = 15.\n19 − 15 = 4; ese es el resto.",
        "visual": null,
        "id": "mat_div_resto-v3"
      },
      {
        "enunciado": "Repartí 26 fichas entre 4 personas, todas reciben lo mismo. ¿Cuántas sobran?",
        "respuesta_correcta": "2",
        "opciones": [
          "2",
          "0",
          "4"
        ],
        "paso_resuelto": "4 × 6 = 24.\n26 − 24 = 2; ese es el resto.",
        "visual": null,
        "id": "mat_div_resto-v4"
      },
      {
        "enunciado": "Repartí 32 fichas entre 5 personas, todas reciben lo mismo. ¿Cuántas sobran?",
        "respuesta_correcta": "2",
        "opciones": [
          "0",
          "5",
          "2"
        ],
        "paso_resuelto": "5 × 6 = 30.\n32 − 30 = 2; ese es el resto.",
        "visual": null,
        "id": "mat_div_resto-v5"
      },
      {
        "enunciado": "Repartí 29 fichas entre 3 personas, todas reciben lo mismo. ¿Cuántas sobran?",
        "respuesta_correcta": "2",
        "opciones": [
          "3",
          "2",
          "0"
        ],
        "paso_resuelto": "3 × 9 = 27.\n29 − 27 = 2; ese es el resto.",
        "visual": null,
        "id": "mat_div_resto-v6"
      }
    ]
  },
  {
    "id": "mat_div_descomponer",
    "tema": "division_1_digito",
    "titulo": "Dividir en partes conocidas",
    "explicacion": "Podemos separar el total en dos cantidades que sepamos repartir. Dividimos ambas por el mismo divisor y sumamos sus cocientes.",
    "ejemplo": "84 ÷ 4 = 21.",
    "pasos": [
      "80 ÷ 4 = 20 y 4 ÷ 4 = 1.",
      "20 + 1 = 21; comprobamos 21 × 4 = 84."
    ],
    "pista": "Separá una parte grande que puedas dividir y repartí lo que queda.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Calculá 84 ÷ 4.",
        "respuesta_correcta": "21",
        "opciones": [
          "21",
          "22",
          "31"
        ],
        "paso_resuelto": "80 ÷ 4 = 20; 4 ÷ 4 = 1.\n20 + 1 = 21.",
        "visual": null,
        "id": "mat_div_descomponer-v1"
      },
      {
        "enunciado": "Calculá 69 ÷ 3.",
        "respuesta_correcta": "23",
        "opciones": [
          "24",
          "33",
          "23"
        ],
        "paso_resuelto": "60 ÷ 3 = 20; 9 ÷ 3 = 3.\n20 + 3 = 23.",
        "visual": null,
        "id": "mat_div_descomponer-v2"
      },
      {
        "enunciado": "Calculá 92 ÷ 4.",
        "respuesta_correcta": "23",
        "opciones": [
          "33",
          "23",
          "24"
        ],
        "paso_resuelto": "80 ÷ 4 = 20; 12 ÷ 4 = 3.\n20 + 3 = 23.",
        "visual": null,
        "id": "mat_div_descomponer-v3"
      },
      {
        "enunciado": "Calculá 115 ÷ 5.",
        "respuesta_correcta": "23",
        "opciones": [
          "23",
          "24",
          "33"
        ],
        "paso_resuelto": "100 ÷ 5 = 20; 15 ÷ 5 = 3.\n20 + 3 = 23.",
        "visual": null,
        "id": "mat_div_descomponer-v4"
      },
      {
        "enunciado": "Calculá 72 ÷ 3.",
        "respuesta_correcta": "24",
        "opciones": [
          "25",
          "34",
          "24"
        ],
        "paso_resuelto": "60 ÷ 3 = 20; 12 ÷ 3 = 4.\n20 + 4 = 24.",
        "visual": null,
        "id": "mat_div_descomponer-v5"
      },
      {
        "enunciado": "Calculá 56 ÷ 4.",
        "respuesta_correcta": "14",
        "opciones": [
          "24",
          "14",
          "15"
        ],
        "paso_resuelto": "40 ÷ 4 = 10; 16 ÷ 4 = 4.\n10 + 4 = 14.",
        "visual": null,
        "id": "mat_div_descomponer-v6"
      }
    ]
  },
  {
    "id": "mat_rom_sumar",
    "tema": "numeros_romanos",
    "titulo": "Leer símbolos romanos que suman",
    "explicacion": "I vale 1, V vale 5, X vale 10, L vale 50, C vale 100, D vale 500 y M vale 1000. Si los símbolos van de mayor a menor, sumamos. I, X, C y M pueden repetirse hasta tres veces seguidas.",
    "ejemplo": "XVI representa 16.",
    "pasos": [
      "X vale 10, V vale 5 e I vale 1.",
      "10 + 5 + 1 = 16."
    ],
    "pista": "Sumá cuando los símbolos van de mayor a menor.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Qué número representa XVI?",
        "respuesta_correcta": "16",
        "opciones": [
          "16",
          "17",
          "26"
        ],
        "paso_resuelto": "10 + 5 + 1 = 16.",
        "visual": null,
        "id": "mat_rom_sumar-v1"
      },
      {
        "enunciado": "¿Qué número representa VIII?",
        "respuesta_correcta": "8",
        "opciones": [
          "9",
          "18",
          "8"
        ],
        "paso_resuelto": "5 + 1 + 1 + 1 = 8.",
        "visual": null,
        "id": "mat_rom_sumar-v2"
      },
      {
        "enunciado": "¿Qué número representa XXI?",
        "respuesta_correcta": "21",
        "opciones": [
          "31",
          "21",
          "22"
        ],
        "paso_resuelto": "10 + 10 + 1 = 21.",
        "visual": null,
        "id": "mat_rom_sumar-v3"
      },
      {
        "enunciado": "¿Qué número representa LX?",
        "respuesta_correcta": "60",
        "opciones": [
          "60",
          "61",
          "70"
        ],
        "paso_resuelto": "50 + 10 = 60.",
        "visual": null,
        "id": "mat_rom_sumar-v4"
      },
      {
        "enunciado": "¿Qué número representa CXV?",
        "respuesta_correcta": "115",
        "opciones": [
          "116",
          "125",
          "115"
        ],
        "paso_resuelto": "100 + 10 + 5 = 115.",
        "visual": null,
        "id": "mat_rom_sumar-v5"
      },
      {
        "enunciado": "¿Qué número representa DII?",
        "respuesta_correcta": "502",
        "opciones": [
          "512",
          "502",
          "503"
        ],
        "paso_resuelto": "500 + 1 + 1 = 502.",
        "visual": null,
        "id": "mat_rom_sumar-v6"
      }
    ]
  },
  {
    "id": "mat_rom_restar",
    "tema": "numeros_romanos",
    "titulo": "Los seis pares que restan",
    "explicacion": "Solo usamos estos pares para restar: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400 y CM = 900. En cada par el símbolo pequeño se resta del grande. No podemos inventar cualquier pareja.",
    "ejemplo": "XIV representa 14.",
    "pasos": [
      "Separamos X y IV.",
      "X vale 10; IV vale 5 − 1 = 4. Total: 14."
    ],
    "pista": "Buscá primero uno de los seis pares permitidos.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Qué número representa XIV?",
        "respuesta_correcta": "14",
        "opciones": [
          "14",
          "15",
          "24"
        ],
        "paso_resuelto": "10 + (5 − 1) = 14.",
        "visual": null,
        "id": "mat_rom_restar-v1"
      },
      {
        "enunciado": "¿Qué número representa XIX?",
        "respuesta_correcta": "19",
        "opciones": [
          "20",
          "29",
          "19"
        ],
        "paso_resuelto": "10 + (10 − 1) = 19.",
        "visual": null,
        "id": "mat_rom_restar-v2"
      },
      {
        "enunciado": "¿Qué número representa XLII?",
        "respuesta_correcta": "42",
        "opciones": [
          "52",
          "42",
          "43"
        ],
        "paso_resuelto": "(50 − 10) + 2 = 42.",
        "visual": null,
        "id": "mat_rom_restar-v3"
      },
      {
        "enunciado": "¿Qué número representa XCIII?",
        "respuesta_correcta": "93",
        "opciones": [
          "93",
          "94",
          "103"
        ],
        "paso_resuelto": "(100 − 10) + 3 = 93.",
        "visual": null,
        "id": "mat_rom_restar-v4"
      },
      {
        "enunciado": "¿Qué número representa CDV?",
        "respuesta_correcta": "405",
        "opciones": [
          "406",
          "415",
          "405"
        ],
        "paso_resuelto": "(500 − 100) + 5 = 405.",
        "visual": null,
        "id": "mat_rom_restar-v5"
      },
      {
        "enunciado": "¿Qué número representa CMVI?",
        "respuesta_correcta": "906",
        "opciones": [
          "916",
          "906",
          "907"
        ],
        "paso_resuelto": "(1000 − 100) + 6 = 906.",
        "visual": null,
        "id": "mat_rom_restar-v6"
      }
    ]
  },
  {
    "id": "mat_resto_entero",
    "tema": "fracciones_del_resto",
    "titulo": "Primero averiguamos cuánto queda",
    "explicacion": "El resto es lo que queda después de usar una parte. Calculamos esa parte y la restamos del entero. El entero de referencia debe estar claro.",
    "ejemplo": "De 24 fichas usamos 1/3. Quedan 16.",
    "pasos": [
      "24 ÷ 3 = 8: usamos 8 fichas.",
      "24 − 8 = 16: ese es el resto."
    ],
    "pista": "Calculá lo usado antes de restarlo del total.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "De 24 fichas usás 1/3. ¿Cuántas quedan?",
        "respuesta_correcta": "16",
        "opciones": [
          "16",
          "17",
          "26"
        ],
        "paso_resuelto": "Usamos 24 ÷ 3 = 8.\nQuedan 24 − 8 = 16.",
        "visual": null,
        "id": "mat_resto_entero-v1"
      },
      {
        "enunciado": "De 20 fichas usás 1/4. ¿Cuántas quedan?",
        "respuesta_correcta": "15",
        "opciones": [
          "16",
          "25",
          "15"
        ],
        "paso_resuelto": "Usamos 20 ÷ 4 = 5.\nQuedan 20 − 5 = 15.",
        "visual": null,
        "id": "mat_resto_entero-v2"
      },
      {
        "enunciado": "De 30 fichas usás 1/5. ¿Cuántas quedan?",
        "respuesta_correcta": "24",
        "opciones": [
          "34",
          "24",
          "25"
        ],
        "paso_resuelto": "Usamos 30 ÷ 5 = 6.\nQuedan 30 − 6 = 24.",
        "visual": null,
        "id": "mat_resto_entero-v3"
      },
      {
        "enunciado": "De 18 fichas usás 1/3. ¿Cuántas quedan?",
        "respuesta_correcta": "12",
        "opciones": [
          "12",
          "13",
          "22"
        ],
        "paso_resuelto": "Usamos 18 ÷ 3 = 6.\nQuedan 18 − 6 = 12.",
        "visual": null,
        "id": "mat_resto_entero-v4"
      },
      {
        "enunciado": "De 32 fichas usás 1/4. ¿Cuántas quedan?",
        "respuesta_correcta": "24",
        "opciones": [
          "25",
          "34",
          "24"
        ],
        "paso_resuelto": "Usamos 32 ÷ 4 = 8.\nQuedan 32 − 8 = 24.",
        "visual": null,
        "id": "mat_resto_entero-v5"
      },
      {
        "enunciado": "De 40 fichas usás 1/5. ¿Cuántas quedan?",
        "respuesta_correcta": "32",
        "opciones": [
          "42",
          "32",
          "33"
        ],
        "paso_resuelto": "Usamos 40 ÷ 5 = 8.\nQuedan 40 − 8 = 32.",
        "visual": null,
        "id": "mat_resto_entero-v6"
      }
    ]
  },
  {
    "id": "mat_resto_nuevo_total",
    "tema": "fracciones_del_resto",
    "titulo": "Una fracción de lo que quedó",
    "explicacion": "Si una consigna dice «del resto», la segunda fracción se calcula sobre lo que quedó, no sobre el total inicial. Escribimos las cantidades de cada etapa.",
    "ejemplo": "De 24 fichas usamos 1/3; después, la mitad del resto. En la segunda etapa usamos 8.",
    "pasos": [
      "Primero usamos 8 y quedan 16.",
      "La mitad del resto es 16 ÷ 2 = 8."
    ],
    "pista": "Encerrá el resto: ese es el nuevo total para el segundo cálculo.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Tenés 24 fichas. Usás 1/3 del total y después la mitad del resto. ¿Cuántas usás en la segunda etapa?",
        "respuesta_correcta": "8",
        "opciones": [
          "8",
          "12",
          "24"
        ],
        "paso_resuelto": "Primero: 24 ÷ 3 = 8; quedan 16.\nSegunda etapa: 16 ÷ 2 = 8.",
        "visual": null,
        "id": "mat_resto_nuevo_total-v1"
      },
      {
        "enunciado": "Tenés 40 fichas. Usás 1/5 del total y después la mitad del resto. ¿Cuántas usás en la segunda etapa?",
        "respuesta_correcta": "16",
        "opciones": [
          "20",
          "8",
          "40",
          "16"
        ],
        "paso_resuelto": "Primero: 40 ÷ 5 = 8; quedan 32.\nSegunda etapa: 32 ÷ 2 = 16.",
        "visual": null,
        "id": "mat_resto_nuevo_total-v2"
      },
      {
        "enunciado": "Tenés 32 fichas. Usás 1/4 del total y después la mitad del resto. ¿Cuántas usás en la segunda etapa?",
        "respuesta_correcta": "12",
        "opciones": [
          "8",
          "32",
          "12",
          "16"
        ],
        "paso_resuelto": "Primero: 32 ÷ 4 = 8; quedan 24.\nSegunda etapa: 24 ÷ 2 = 12.",
        "visual": null,
        "id": "mat_resto_nuevo_total-v3"
      },
      {
        "enunciado": "Tenés 36 fichas. Usás 1/3 del total y después la mitad del resto. ¿Cuántas usás en la segunda etapa?",
        "respuesta_correcta": "12",
        "opciones": [
          "12",
          "18",
          "36"
        ],
        "paso_resuelto": "Primero: 36 ÷ 3 = 12; quedan 24.\nSegunda etapa: 24 ÷ 2 = 12.",
        "visual": null,
        "id": "mat_resto_nuevo_total-v4"
      },
      {
        "enunciado": "Tenés 48 fichas. Usás 1/4 del total y después la mitad del resto. ¿Cuántas usás en la segunda etapa?",
        "respuesta_correcta": "18",
        "opciones": [
          "18",
          "24",
          "12",
          "48"
        ],
        "paso_resuelto": "Primero: 48 ÷ 4 = 12; quedan 36.\nSegunda etapa: 36 ÷ 2 = 18.",
        "visual": null,
        "id": "mat_resto_nuevo_total-v5"
      },
      {
        "enunciado": "Tenés 60 fichas. Usás 1/5 del total y después la mitad del resto. ¿Cuántas usás en la segunda etapa?",
        "respuesta_correcta": "24",
        "opciones": [
          "30",
          "12",
          "60",
          "24"
        ],
        "paso_resuelto": "Primero: 60 ÷ 5 = 12; quedan 48.\nSegunda etapa: 48 ÷ 2 = 24.",
        "visual": null,
        "id": "mat_resto_nuevo_total-v6"
      }
    ]
  },
  {
    "id": "mat_dec_fraccion",
    "tema": "decimales_conversion",
    "titulo": "Décimos y centésimos",
    "explicacion": "A la derecha de la coma, la primera cifra cuenta décimos y la segunda centésimos. 0,3 son tres décimos; 0,03 son tres centésimos. El denominador indica las partes iguales de la unidad.",
    "ejemplo": "7/10 se escribe 0,7.",
    "pasos": [
      "El denominador 10 indica décimos.",
      "Ponemos 7 en el lugar de los décimos: 0,7."
    ],
    "pista": "Contá cuántas posiciones necesitás después de la coma.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Escribí 7/10 como decimal.",
        "respuesta_correcta": "0,7",
        "opciones": [
          "0,7",
          "7,0",
          "0,07"
        ],
        "paso_resuelto": "El denominador es 10; usamos una cifra después de la coma.",
        "visual": null,
        "id": "mat_dec_fraccion-v1"
      },
      {
        "enunciado": "Escribí 3/100 como decimal.",
        "respuesta_correcta": "0,03",
        "opciones": [
          "3,0",
          "3,00",
          "0,03"
        ],
        "paso_resuelto": "El denominador es 100; usamos dos cifras después de la coma.",
        "visual": null,
        "id": "mat_dec_fraccion-v2"
      },
      {
        "enunciado": "Escribí 5/10 como decimal.",
        "respuesta_correcta": "0,5",
        "opciones": [
          "0,05",
          "0,5",
          "5,0"
        ],
        "paso_resuelto": "El denominador es 10; usamos una cifra después de la coma.",
        "visual": null,
        "id": "mat_dec_fraccion-v3"
      },
      {
        "enunciado": "Escribí 25/100 como decimal.",
        "respuesta_correcta": "0,25",
        "opciones": [
          "0,25",
          "25,0",
          "25,00"
        ],
        "paso_resuelto": "El denominador es 100; usamos dos cifras después de la coma.",
        "visual": null,
        "id": "mat_dec_fraccion-v4"
      },
      {
        "enunciado": "Escribí 8/100 como decimal.",
        "respuesta_correcta": "0,08",
        "opciones": [
          "8,0",
          "8,00",
          "0,08"
        ],
        "paso_resuelto": "El denominador es 100; usamos dos cifras después de la coma.",
        "visual": null,
        "id": "mat_dec_fraccion-v5"
      },
      {
        "enunciado": "Escribí 42/100 como decimal.",
        "respuesta_correcta": "0,42",
        "opciones": [
          "42,00",
          "0,42",
          "42,0"
        ],
        "paso_resuelto": "El denominador es 100; usamos dos cifras después de la coma.",
        "visual": null,
        "id": "mat_dec_fraccion-v6"
      }
    ]
  },
  {
    "id": "mat_dec_sumar",
    "tema": "decimales_conversion",
    "titulo": "Sumar decimales alineando la coma",
    "explicacion": "Al sumar decimales juntamos unidades con unidades y décimos con décimos. Podemos escribir ceros al final de la parte decimal sin cambiar el valor.",
    "ejemplo": "1,2 + 0,5 = 1,7.",
    "pasos": [
      "Son 12 décimos más 5 décimos.",
      "17 décimos equivalen a 1,7."
    ],
    "pista": "Alineá las comas antes de sumar.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Calculá 1,2 + 0,5.",
        "respuesta_correcta": "1,7",
        "opciones": [
          "1,7",
          "2,7",
          "1,8"
        ],
        "paso_resuelto": "12 décimos + 5 décimos = 17 décimos: 1,7.",
        "visual": null,
        "id": "mat_dec_sumar-v1"
      },
      {
        "enunciado": "Calculá 2,4 + 1,3.",
        "respuesta_correcta": "3,7",
        "opciones": [
          "4,7",
          "3,8",
          "3,7"
        ],
        "paso_resuelto": "24 décimos + 13 décimos = 37 décimos: 3,7.",
        "visual": null,
        "id": "mat_dec_sumar-v2"
      },
      {
        "enunciado": "Calculá 3,6 + 1,8.",
        "respuesta_correcta": "5,4",
        "opciones": [
          "5,5",
          "5,4",
          "6,4"
        ],
        "paso_resuelto": "36 décimos + 18 décimos = 54 décimos: 5,4.",
        "visual": null,
        "id": "mat_dec_sumar-v3"
      },
      {
        "enunciado": "Calculá 4,7 + 2,5.",
        "respuesta_correcta": "7,2",
        "opciones": [
          "7,2",
          "8,2",
          "7,3"
        ],
        "paso_resuelto": "47 décimos + 25 décimos = 72 décimos: 7,2.",
        "visual": null,
        "id": "mat_dec_sumar-v4"
      },
      {
        "enunciado": "Calculá 5,9 + 1,2.",
        "respuesta_correcta": "7,1",
        "opciones": [
          "8,1",
          "7,2",
          "7,1"
        ],
        "paso_resuelto": "59 décimos + 12 décimos = 71 décimos: 7,1.",
        "visual": null,
        "id": "mat_dec_sumar-v5"
      },
      {
        "enunciado": "Calculá 6,3 + 2,9.",
        "respuesta_correcta": "9,2",
        "opciones": [
          "9,3",
          "9,2",
          "10,2"
        ],
        "paso_resuelto": "63 décimos + 29 décimos = 92 décimos: 9,2.",
        "visual": null,
        "id": "mat_dec_sumar-v6"
      }
    ]
  },
  {
    "id": "mat_dec_restar",
    "tema": "decimales_conversion",
    "titulo": "Restar decimales",
    "explicacion": "Restamos cantidades de la misma posición: décimos con décimos, unidades con unidades. Si lo necesitás, expresá todo en décimos antes de calcular.",
    "ejemplo": "2,4 − 0,7 = 1,7.",
    "pasos": [
      "24 décimos menos 7 décimos son 17 décimos.",
      "17 décimos equivalen a 1,7."
    ],
    "pista": "Alineá las comas y comprobá sumando.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Calculá 2,4 − 0,7.",
        "respuesta_correcta": "1,7",
        "opciones": [
          "1,7",
          "3,1",
          "1,8"
        ],
        "paso_resuelto": "24 − 7 = 17 décimos: 1,7.",
        "visual": null,
        "id": "mat_dec_restar-v1"
      },
      {
        "enunciado": "Calculá 3,5 − 0,8.",
        "respuesta_correcta": "2,7",
        "opciones": [
          "4,3",
          "2,8",
          "2,7"
        ],
        "paso_resuelto": "35 − 8 = 27 décimos: 2,7.",
        "visual": null,
        "id": "mat_dec_restar-v2"
      },
      {
        "enunciado": "Calculá 4,6 − 1,9.",
        "respuesta_correcta": "2,7",
        "opciones": [
          "2,8",
          "2,7",
          "6,5"
        ],
        "paso_resuelto": "46 − 19 = 27 décimos: 2,7.",
        "visual": null,
        "id": "mat_dec_restar-v3"
      },
      {
        "enunciado": "Calculá 5,7 − 2,8.",
        "respuesta_correcta": "2,9",
        "opciones": [
          "2,9",
          "8,5",
          "3,0"
        ],
        "paso_resuelto": "57 − 28 = 29 décimos: 2,9.",
        "visual": null,
        "id": "mat_dec_restar-v4"
      },
      {
        "enunciado": "Calculá 6,8 − 3,9.",
        "respuesta_correcta": "2,9",
        "opciones": [
          "10,7",
          "3,0",
          "2,9"
        ],
        "paso_resuelto": "68 − 39 = 29 décimos: 2,9.",
        "visual": null,
        "id": "mat_dec_restar-v5"
      },
      {
        "enunciado": "Calculá 7,9 − 4,5.",
        "respuesta_correcta": "3,4",
        "opciones": [
          "3,5",
          "3,4",
          "12,4"
        ],
        "paso_resuelto": "79 − 45 = 34 décimos: 3,4.",
        "visual": null,
        "id": "mat_dec_restar-v6"
      }
    ]
  },
  {
    "id": "mat_dec_producto",
    "tema": "decimales_conversion",
    "titulo": "Multiplicar decimales por un natural",
    "explicacion": "Multiplicar por un natural reúne grupos iguales, también con decimales. Si cada botella contiene 0,5 litros, tres botellas contienen tres veces esa cantidad.",
    "ejemplo": "3 × 0,5 = 1,5.",
    "pasos": [
      "0,5 + 0,5 + 0,5 suma 15 décimos.",
      "15 décimos son 1,5."
    ],
    "pista": "Contá los décimos de todos los grupos.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Hay 3 botellas de 0,5 litros cada una. ¿Cuántos litros hay?",
        "respuesta_correcta": "1,5",
        "opciones": [
          "1,5",
          "1,6",
          "15"
        ],
        "paso_resuelto": "3 × 5 décimos = 15 décimos: 1,5 litros.",
        "visual": null,
        "id": "mat_dec_producto-v1"
      },
      {
        "enunciado": "Hay 4 botellas de 0,2 litros cada una. ¿Cuántos litros hay?",
        "respuesta_correcta": "0,8",
        "opciones": [
          "0,9",
          "8",
          "0,8"
        ],
        "paso_resuelto": "4 × 2 décimos = 8 décimos: 0,8 litros.",
        "visual": null,
        "id": "mat_dec_producto-v2"
      },
      {
        "enunciado": "Hay 2 botellas de 0,7 litros cada una. ¿Cuántos litros hay?",
        "respuesta_correcta": "1,4",
        "opciones": [
          "14",
          "1,4",
          "1,5"
        ],
        "paso_resuelto": "2 × 7 décimos = 14 décimos: 1,4 litros.",
        "visual": null,
        "id": "mat_dec_producto-v3"
      },
      {
        "enunciado": "Hay 5 botellas de 0,3 litros cada una. ¿Cuántos litros hay?",
        "respuesta_correcta": "1,5",
        "opciones": [
          "1,5",
          "1,6",
          "15"
        ],
        "paso_resuelto": "5 × 3 décimos = 15 décimos: 1,5 litros.",
        "visual": null,
        "id": "mat_dec_producto-v4"
      },
      {
        "enunciado": "Hay 3 botellas de 0,8 litros cada una. ¿Cuántos litros hay?",
        "respuesta_correcta": "2,4",
        "opciones": [
          "2,5",
          "24",
          "2,4"
        ],
        "paso_resuelto": "3 × 8 décimos = 24 décimos: 2,4 litros.",
        "visual": null,
        "id": "mat_dec_producto-v5"
      },
      {
        "enunciado": "Hay 4 botellas de 0,6 litros cada una. ¿Cuántos litros hay?",
        "respuesta_correcta": "2,4",
        "opciones": [
          "24",
          "2,4",
          "2,5"
        ],
        "paso_resuelto": "4 × 6 décimos = 24 décimos: 2,4 litros.",
        "visual": null,
        "id": "mat_dec_producto-v6"
      }
    ]
  },
  {
    "id": "mat_dec_dividir",
    "tema": "decimales_conversion",
    "titulo": "Repartir una cantidad decimal",
    "explicacion": "Dividir una cantidad decimal entre un natural reparte partes iguales. Podemos convertir la cantidad a décimos, repartirlos y volver a escribir el decimal.",
    "ejemplo": "1,8 litros en 3 botellas: 0,6 litros en cada una.",
    "pasos": [
      "1,8 litros son 18 décimos.",
      "18 ÷ 3 = 6 décimos; cada botella recibe 0,6 litros."
    ],
    "pista": "Repartí los décimos y conservá la unidad.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Repartís 1,8 litros por igual en 3 botellas. ¿Cuántos litros van en cada botella?",
        "respuesta_correcta": "0,6",
        "opciones": [
          "0,6",
          "6",
          "0,7"
        ],
        "paso_resuelto": "18 décimos ÷ 3 = 6 décimos: 0,6 litros.",
        "visual": null,
        "id": "mat_dec_dividir-v1"
      },
      {
        "enunciado": "Repartís 2,4 litros por igual en 4 botellas. ¿Cuántos litros van en cada botella?",
        "respuesta_correcta": "0,6",
        "opciones": [
          "6",
          "0,7",
          "0,6"
        ],
        "paso_resuelto": "24 décimos ÷ 4 = 6 décimos: 0,6 litros.",
        "visual": null,
        "id": "mat_dec_dividir-v2"
      },
      {
        "enunciado": "Repartís 3,5 litros por igual en 5 botellas. ¿Cuántos litros van en cada botella?",
        "respuesta_correcta": "0,7",
        "opciones": [
          "0,8",
          "0,7",
          "7"
        ],
        "paso_resuelto": "35 décimos ÷ 5 = 7 décimos: 0,7 litros.",
        "visual": null,
        "id": "mat_dec_dividir-v3"
      },
      {
        "enunciado": "Repartís 2,8 litros por igual en 4 botellas. ¿Cuántos litros van en cada botella?",
        "respuesta_correcta": "0,7",
        "opciones": [
          "0,7",
          "7",
          "0,8"
        ],
        "paso_resuelto": "28 décimos ÷ 4 = 7 décimos: 0,7 litros.",
        "visual": null,
        "id": "mat_dec_dividir-v4"
      },
      {
        "enunciado": "Repartís 3,6 litros por igual en 3 botellas. ¿Cuántos litros van en cada botella?",
        "respuesta_correcta": "1,2",
        "opciones": [
          "12",
          "1,3",
          "1,2"
        ],
        "paso_resuelto": "36 décimos ÷ 3 = 12 décimos: 1,2 litros.",
        "visual": null,
        "id": "mat_dec_dividir-v5"
      },
      {
        "enunciado": "Repartís 4,5 litros por igual en 5 botellas. ¿Cuántos litros van en cada botella?",
        "respuesta_correcta": "0,9",
        "opciones": [
          "1,0",
          "0,9",
          "9"
        ],
        "paso_resuelto": "45 décimos ÷ 5 = 9 décimos: 0,9 litros.",
        "visual": null,
        "id": "mat_dec_dividir-v6"
      }
    ]
  },
  {
    "id": "mat_pot_repetir",
    "tema": "potenciacion_y_raiz_cuadrada",
    "titulo": "Una potencia repite factores",
    "explicacion": "En 3², el 3 es la base y el 2 es el exponente. El exponente dice cuántas veces aparece la base como factor. 3² es 3 × 3, no 3 × 2.",
    "ejemplo": "2³ = 2 × 2 × 2 = 8.",
    "pasos": [
      "Escribimos tres factores iguales a 2.",
      "2 × 2 = 4; 4 × 2 = 8."
    ],
    "pista": "El exponente cuenta factores.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Calculá 2 elevado a 3.",
        "respuesta_correcta": "8",
        "opciones": [
          "8",
          "6",
          "9"
        ],
        "paso_resuelto": "2 × 2 × 2 = 8.",
        "visual": null,
        "id": "mat_pot_repetir-v1"
      },
      {
        "enunciado": "Calculá 3 elevado a 2.",
        "respuesta_correcta": "9",
        "opciones": [
          "6",
          "10",
          "9"
        ],
        "paso_resuelto": "3 × 3 = 9.",
        "visual": null,
        "id": "mat_pot_repetir-v2"
      },
      {
        "enunciado": "Calculá 4 elevado a 2.",
        "respuesta_correcta": "16",
        "opciones": [
          "17",
          "16",
          "8"
        ],
        "paso_resuelto": "4 × 4 = 16.",
        "visual": null,
        "id": "mat_pot_repetir-v3"
      },
      {
        "enunciado": "Calculá 3 elevado a 3.",
        "respuesta_correcta": "27",
        "opciones": [
          "27",
          "9",
          "28"
        ],
        "paso_resuelto": "3 × 3 × 3 = 27.",
        "visual": null,
        "id": "mat_pot_repetir-v4"
      },
      {
        "enunciado": "Calculá 5 elevado a 2.",
        "respuesta_correcta": "25",
        "opciones": [
          "10",
          "26",
          "25"
        ],
        "paso_resuelto": "5 × 5 = 25.",
        "visual": null,
        "id": "mat_pot_repetir-v5"
      },
      {
        "enunciado": "Calculá 6 elevado a 2.",
        "respuesta_correcta": "36",
        "opciones": [
          "37",
          "36",
          "12"
        ],
        "paso_resuelto": "6 × 6 = 36.",
        "visual": null,
        "id": "mat_pot_repetir-v6"
      }
    ]
  },
  {
    "id": "mat_raiz_cuadrado",
    "tema": "potenciacion_y_raiz_cuadrada",
    "titulo": "La raíz busca el lado del cuadrado",
    "explicacion": "La raíz cuadrada busca el número no negativo que, multiplicado por sí mismo, da el total. Con fichas, podemos imaginar un cuadrado con igual cantidad de filas y columnas.",
    "ejemplo": "La raíz cuadrada de 25 es 5.",
    "pasos": [
      "5 filas de 5 fichas forman 25 fichas.",
      "Como 5 × 5 = 25, la raíz cuadrada de 25 es 5."
    ],
    "pista": "Buscá dos factores iguales cuyo producto sea el total.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Cuál es la raíz cuadrada de 25?",
        "respuesta_correcta": "5",
        "opciones": [
          "5",
          "6",
          "15"
        ],
        "paso_resuelto": "5 × 5 = 25. La raíz cuadrada es 5.",
        "visual": null,
        "id": "mat_raiz_cuadrado-v1"
      },
      {
        "enunciado": "¿Cuál es la raíz cuadrada de 9?",
        "respuesta_correcta": "3",
        "opciones": [
          "4",
          "13",
          "3"
        ],
        "paso_resuelto": "3 × 3 = 9. La raíz cuadrada es 3.",
        "visual": null,
        "id": "mat_raiz_cuadrado-v2"
      },
      {
        "enunciado": "¿Cuál es la raíz cuadrada de 16?",
        "respuesta_correcta": "4",
        "opciones": [
          "14",
          "4",
          "5"
        ],
        "paso_resuelto": "4 × 4 = 16. La raíz cuadrada es 4.",
        "visual": null,
        "id": "mat_raiz_cuadrado-v3"
      },
      {
        "enunciado": "¿Cuál es la raíz cuadrada de 36?",
        "respuesta_correcta": "6",
        "opciones": [
          "6",
          "7",
          "16"
        ],
        "paso_resuelto": "6 × 6 = 36. La raíz cuadrada es 6.",
        "visual": null,
        "id": "mat_raiz_cuadrado-v4"
      },
      {
        "enunciado": "¿Cuál es la raíz cuadrada de 49?",
        "respuesta_correcta": "7",
        "opciones": [
          "8",
          "17",
          "7"
        ],
        "paso_resuelto": "7 × 7 = 49. La raíz cuadrada es 7.",
        "visual": null,
        "id": "mat_raiz_cuadrado-v5"
      },
      {
        "enunciado": "¿Cuál es la raíz cuadrada de 64?",
        "respuesta_correcta": "8",
        "opciones": [
          "18",
          "8",
          "9"
        ],
        "paso_resuelto": "8 × 8 = 64. La raíz cuadrada es 8.",
        "visual": null,
        "id": "mat_raiz_cuadrado-v6"
      }
    ]
  },
  {
    "id": "mat_jer_producto",
    "tema": "jerarquia_operaciones",
    "titulo": "Antes de sumar, resolvemos los productos",
    "explicacion": "Primero resolvemos potencias y raíces; después multiplicaciones y divisiones; al final sumas y restas. Entre operaciones del mismo nivel avanzamos de izquierda a derecha.",
    "ejemplo": "2 + 3 × 4 = 14.",
    "pasos": [
      "Primero 3 × 4 = 12.",
      "Después 2 + 12 = 14."
    ],
    "pista": "Marcá el producto antes de sumar.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Calculá 2 + 3 × 4.",
        "respuesta_correcta": "14",
        "opciones": [
          "14",
          "20",
          "9"
        ],
        "paso_resuelto": "Primero 3 × 4 = 12.\nDespués 2 + 12 = 14.",
        "visual": null,
        "id": "mat_jer_producto-v1"
      },
      {
        "enunciado": "Calculá 3 + 4 × 5.",
        "respuesta_correcta": "23",
        "opciones": [
          "35",
          "12",
          "23"
        ],
        "paso_resuelto": "Primero 4 × 5 = 20.\nDespués 3 + 20 = 23.",
        "visual": null,
        "id": "mat_jer_producto-v2"
      },
      {
        "enunciado": "Calculá 4 + 2 × 6.",
        "respuesta_correcta": "16",
        "opciones": [
          "12",
          "16",
          "36"
        ],
        "paso_resuelto": "Primero 2 × 6 = 12.\nDespués 4 + 12 = 16.",
        "visual": null,
        "id": "mat_jer_producto-v3"
      },
      {
        "enunciado": "Calculá 5 + 3 × 7.",
        "respuesta_correcta": "26",
        "opciones": [
          "26",
          "56",
          "15"
        ],
        "paso_resuelto": "Primero 3 × 7 = 21.\nDespués 5 + 21 = 26.",
        "visual": null,
        "id": "mat_jer_producto-v4"
      },
      {
        "enunciado": "Calculá 6 + 4 × 3.",
        "respuesta_correcta": "18",
        "opciones": [
          "30",
          "13",
          "18"
        ],
        "paso_resuelto": "Primero 4 × 3 = 12.\nDespués 6 + 12 = 18.",
        "visual": null,
        "id": "mat_jer_producto-v5"
      },
      {
        "enunciado": "Calculá 7 + 2 × 8.",
        "respuesta_correcta": "23",
        "opciones": [
          "17",
          "23",
          "72"
        ],
        "paso_resuelto": "Primero 2 × 8 = 16.\nDespués 7 + 16 = 23.",
        "visual": null,
        "id": "mat_jer_producto-v6"
      }
    ]
  },
  {
    "id": "mat_jer_parentesis",
    "tema": "jerarquia_operaciones",
    "titulo": "Los paréntesis indican por dónde empezar",
    "explicacion": "Un paréntesis agrupa una cuenta que debemos resolver primero. Después seguimos el orden de operaciones. Copiar la cuenta reemplazando solo el paso resuelto ayuda a no perder números.",
    "ejemplo": "(2 + 3) × 4 = 20.",
    "pasos": [
      "Dentro del paréntesis: 2 + 3 = 5.",
      "Ahora 5 × 4 = 20."
    ],
    "pista": "Resolvé el grupo entre paréntesis antes de seguir.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Calculá (2 + 3) × 4.",
        "respuesta_correcta": "20",
        "opciones": [
          "20",
          "14",
          "9"
        ],
        "paso_resuelto": "Primero 2 + 3 = 5.\nDespués 5 × 4 = 20.",
        "visual": null,
        "id": "mat_jer_parentesis-v1"
      },
      {
        "enunciado": "Calculá (3 + 4) × 5.",
        "respuesta_correcta": "35",
        "opciones": [
          "23",
          "12",
          "35"
        ],
        "paso_resuelto": "Primero 3 + 4 = 7.\nDespués 7 × 5 = 35.",
        "visual": null,
        "id": "mat_jer_parentesis-v2"
      },
      {
        "enunciado": "Calculá (4 + 2) × 6.",
        "respuesta_correcta": "36",
        "opciones": [
          "12",
          "36",
          "16"
        ],
        "paso_resuelto": "Primero 4 + 2 = 6.\nDespués 6 × 6 = 36.",
        "visual": null,
        "id": "mat_jer_parentesis-v3"
      },
      {
        "enunciado": "Calculá (5 + 3) × 7.",
        "respuesta_correcta": "56",
        "opciones": [
          "56",
          "26",
          "15"
        ],
        "paso_resuelto": "Primero 5 + 3 = 8.\nDespués 8 × 7 = 56.",
        "visual": null,
        "id": "mat_jer_parentesis-v4"
      },
      {
        "enunciado": "Calculá (6 + 4) × 3.",
        "respuesta_correcta": "30",
        "opciones": [
          "18",
          "13",
          "30"
        ],
        "paso_resuelto": "Primero 6 + 4 = 10.\nDespués 10 × 3 = 30.",
        "visual": null,
        "id": "mat_jer_parentesis-v5"
      },
      {
        "enunciado": "Calculá (7 + 2) × 8.",
        "respuesta_correcta": "72",
        "opciones": [
          "17",
          "72",
          "23"
        ],
        "paso_resuelto": "Primero 7 + 2 = 9.\nDespués 9 × 8 = 72.",
        "visual": null,
        "id": "mat_jer_parentesis-v6"
      }
    ]
  },
  {
    "id": "mat_long_metros",
    "tema": "si_me_la_longitud",
    "titulo": "El metro y el centímetro",
    "explicacion": "Medir una longitud es compararla con una unidad. Un metro contiene 100 centímetros. Al pasar de metros a centímetros usamos más unidades pequeñas para expresar la misma longitud.",
    "ejemplo": "2 m = 200 cm.",
    "pasos": [
      "Cada metro contiene 100 centímetros.",
      "2 × 100 = 200 centímetros."
    ],
    "pista": "La longitud no cambia; cambia la unidad.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Cuántos centímetros son 2 metros?",
        "respuesta_correcta": "200",
        "opciones": [
          "200",
          "20",
          "102"
        ],
        "paso_resuelto": "2 × 100 = 200 cm.",
        "visual": null,
        "id": "mat_long_metros-v1"
      },
      {
        "enunciado": "¿Cuántos centímetros son 3 metros?",
        "respuesta_correcta": "300",
        "opciones": [
          "30",
          "103",
          "300"
        ],
        "paso_resuelto": "3 × 100 = 300 cm.",
        "visual": null,
        "id": "mat_long_metros-v2"
      },
      {
        "enunciado": "¿Cuántos centímetros son 4 metros?",
        "respuesta_correcta": "400",
        "opciones": [
          "104",
          "400",
          "40"
        ],
        "paso_resuelto": "4 × 100 = 400 cm.",
        "visual": null,
        "id": "mat_long_metros-v3"
      },
      {
        "enunciado": "¿Cuántos centímetros son 5 metros?",
        "respuesta_correcta": "500",
        "opciones": [
          "500",
          "50",
          "105"
        ],
        "paso_resuelto": "5 × 100 = 500 cm.",
        "visual": null,
        "id": "mat_long_metros-v4"
      },
      {
        "enunciado": "¿Cuántos centímetros son 6 metros?",
        "respuesta_correcta": "600",
        "opciones": [
          "60",
          "106",
          "600"
        ],
        "paso_resuelto": "6 × 100 = 600 cm.",
        "visual": null,
        "id": "mat_long_metros-v5"
      },
      {
        "enunciado": "¿Cuántos centímetros son 7 metros?",
        "respuesta_correcta": "700",
        "opciones": [
          "107",
          "700",
          "70"
        ],
        "paso_resuelto": "7 × 100 = 700 cm.",
        "visual": null,
        "id": "mat_long_metros-v6"
      }
    ]
  },
  {
    "id": "mat_long_combinar",
    "tema": "si_me_la_longitud",
    "titulo": "Sumar longitudes con la misma unidad",
    "explicacion": "Antes de sumar medidas, las expresamos en la misma unidad. 1 km = 1000 m; 1 m = 100 cm y 1 cm = 10 mm. No sumamos directamente números de unidades distintas.",
    "ejemplo": "1 m y 25 cm suman 125 cm.",
    "pasos": [
      "1 m = 100 cm.",
      "100 cm + 25 cm = 125 cm."
    ],
    "pista": "Convertí las medidas a la unidad que pide la pregunta.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Una cinta mide 1 m y 25 cm. ¿Cuántos centímetros mide en total?",
        "respuesta_correcta": "125",
        "opciones": [
          "125",
          "26",
          "35"
        ],
        "paso_resuelto": "1 m = 100 cm.\n100 + 25 = 125 cm.",
        "visual": null,
        "id": "mat_long_combinar-v1"
      },
      {
        "enunciado": "Una cinta mide 2 m y 30 cm. ¿Cuántos centímetros mide en total?",
        "respuesta_correcta": "230",
        "opciones": [
          "32",
          "50",
          "230"
        ],
        "paso_resuelto": "2 m = 200 cm.\n200 + 30 = 230 cm.",
        "visual": null,
        "id": "mat_long_combinar-v2"
      },
      {
        "enunciado": "Una cinta mide 3 m y 45 cm. ¿Cuántos centímetros mide en total?",
        "respuesta_correcta": "345",
        "opciones": [
          "75",
          "345",
          "48"
        ],
        "paso_resuelto": "3 m = 300 cm.\n300 + 45 = 345 cm.",
        "visual": null,
        "id": "mat_long_combinar-v3"
      },
      {
        "enunciado": "Una cinta mide 4 m y 50 cm. ¿Cuántos centímetros mide en total?",
        "respuesta_correcta": "450",
        "opciones": [
          "450",
          "54",
          "90"
        ],
        "paso_resuelto": "4 m = 400 cm.\n400 + 50 = 450 cm.",
        "visual": null,
        "id": "mat_long_combinar-v4"
      },
      {
        "enunciado": "Una cinta mide 5 m y 75 cm. ¿Cuántos centímetros mide en total?",
        "respuesta_correcta": "575",
        "opciones": [
          "80",
          "125",
          "575"
        ],
        "paso_resuelto": "5 m = 500 cm.\n500 + 75 = 575 cm.",
        "visual": null,
        "id": "mat_long_combinar-v5"
      },
      {
        "enunciado": "Una cinta mide 6 m y 20 cm. ¿Cuántos centímetros mide en total?",
        "respuesta_correcta": "620",
        "opciones": [
          "80",
          "620",
          "26"
        ],
        "paso_resuelto": "6 m = 600 cm.\n600 + 20 = 620 cm.",
        "visual": null,
        "id": "mat_long_combinar-v6"
      }
    ]
  },
  {
    "id": "mat_med_masa_capacidad",
    "tema": "si_me_la_masa_capacidad_tiempo",
    "titulo": "Mil partes: gramos y mililitros",
    "explicacion": "Un kilogramo contiene 1000 gramos. Un litro contiene 1000 mililitros. Son dos equivalencias distintas: la masa y la capacidad no se convierten entre sí usando esta regla.",
    "ejemplo": "2 kg = 2000 g; 3 L = 3000 mL.",
    "pasos": [
      "Elegimos la magnitud: masa o capacidad.",
      "Multiplicamos por 1000 para pasar a gramos o mililitros."
    ],
    "pista": "Conservá la magnitud y escribí la unidad pedida.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Cuántos g son 2 kg?",
        "respuesta_correcta": "2000",
        "opciones": [
          "2000",
          "200",
          "1002"
        ],
        "paso_resuelto": "Cada kg contiene 1000 g.\n2 × 1000 = 2000 g.",
        "visual": null,
        "id": "mat_med_masa_capacidad-v1"
      },
      {
        "enunciado": "¿Cuántos mL son 3 L?",
        "respuesta_correcta": "3000",
        "opciones": [
          "300",
          "1003",
          "3000"
        ],
        "paso_resuelto": "Cada L contiene 1000 mL.\n3 × 1000 = 3000 mL.",
        "visual": null,
        "id": "mat_med_masa_capacidad-v2"
      },
      {
        "enunciado": "¿Cuántos g son 4 kg?",
        "respuesta_correcta": "4000",
        "opciones": [
          "1004",
          "4000",
          "400"
        ],
        "paso_resuelto": "Cada kg contiene 1000 g.\n4 × 1000 = 4000 g.",
        "visual": null,
        "id": "mat_med_masa_capacidad-v3"
      },
      {
        "enunciado": "¿Cuántos mL son 5 L?",
        "respuesta_correcta": "5000",
        "opciones": [
          "5000",
          "500",
          "1005"
        ],
        "paso_resuelto": "Cada L contiene 1000 mL.\n5 × 1000 = 5000 mL.",
        "visual": null,
        "id": "mat_med_masa_capacidad-v4"
      },
      {
        "enunciado": "¿Cuántos g son 6 kg?",
        "respuesta_correcta": "6000",
        "opciones": [
          "600",
          "1006",
          "6000"
        ],
        "paso_resuelto": "Cada kg contiene 1000 g.\n6 × 1000 = 6000 g.",
        "visual": null,
        "id": "mat_med_masa_capacidad-v5"
      },
      {
        "enunciado": "¿Cuántos mL son 7 L?",
        "respuesta_correcta": "7000",
        "opciones": [
          "1007",
          "7000",
          "700"
        ],
        "paso_resuelto": "Cada L contiene 1000 mL.\n7 × 1000 = 7000 mL.",
        "visual": null,
        "id": "mat_med_masa_capacidad-v6"
      }
    ]
  },
  {
    "id": "mat_med_tiempo",
    "tema": "si_me_la_masa_capacidad_tiempo",
    "titulo": "Una hora tiene sesenta minutos",
    "explicacion": "El tiempo no sigue los saltos de diez de las medidas anteriores. Una hora tiene 60 minutos y un minuto tiene 60 segundos. Para sumar horas y minutos, primero los expresamos en minutos.",
    "ejemplo": "1 h y 20 min son 80 min.",
    "pasos": [
      "1 h = 60 min.",
      "60 + 20 = 80 min."
    ],
    "pista": "Para las horas usá 60, no 100.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Cuántos minutos son 1 h y 20 min?",
        "respuesta_correcta": "80",
        "opciones": [
          "80",
          "120",
          "21"
        ],
        "paso_resuelto": "1 × 60 = 60 min.\nSumamos 20: 80 min.",
        "visual": null,
        "id": "mat_med_tiempo-v1"
      },
      {
        "enunciado": "¿Cuántos minutos son 2 h y 15 min?",
        "respuesta_correcta": "135",
        "opciones": [
          "215",
          "17",
          "135"
        ],
        "paso_resuelto": "2 × 60 = 120 min.\nSumamos 15: 135 min.",
        "visual": null,
        "id": "mat_med_tiempo-v2"
      },
      {
        "enunciado": "¿Cuántos minutos son 1 h y 45 min?",
        "respuesta_correcta": "105",
        "opciones": [
          "46",
          "105",
          "145"
        ],
        "paso_resuelto": "1 × 60 = 60 min.\nSumamos 45: 105 min.",
        "visual": null,
        "id": "mat_med_tiempo-v3"
      },
      {
        "enunciado": "¿Cuántos minutos son 3 h y 10 min?",
        "respuesta_correcta": "190",
        "opciones": [
          "190",
          "310",
          "13"
        ],
        "paso_resuelto": "3 × 60 = 180 min.\nSumamos 10: 190 min.",
        "visual": null,
        "id": "mat_med_tiempo-v4"
      },
      {
        "enunciado": "¿Cuántos minutos son 2 h y 30 min?",
        "respuesta_correcta": "150",
        "opciones": [
          "230",
          "32",
          "150"
        ],
        "paso_resuelto": "2 × 60 = 120 min.\nSumamos 30: 150 min.",
        "visual": null,
        "id": "mat_med_tiempo-v5"
      },
      {
        "enunciado": "¿Cuántos minutos son 4 h y 5 min?",
        "respuesta_correcta": "245",
        "opciones": [
          "9",
          "245",
          "405"
        ],
        "paso_resuelto": "4 × 60 = 240 min.\nSumamos 5: 245 min.",
        "visual": null,
        "id": "mat_med_tiempo-v6"
      }
    ]
  },
  {
    "id": "mat_ang_clases",
    "tema": "geometria_angulos",
    "titulo": "Comparar una abertura con un ángulo recto",
    "explicacion": "Un ángulo es la abertura entre dos semirrectas que parten del mismo vértice. Se mide en grados. Recto: 90°. Agudo: más de 0° y menos de 90°. Obtuso: más de 90° y menos de 180°. Llano: 180°.",
    "ejemplo": "Un ángulo de 60° es agudo.",
    "pasos": [
      "Comparamos 60 con 90.",
      "Como 0 < 60 < 90, es agudo."
    ],
    "pista": "Compará la medida con 90° y 180°.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Cómo se clasifica un ángulo de 60°?",
        "respuesta_correcta": "agudo",
        "opciones": [
          "agudo",
          "recto",
          "obtuso",
          "llano"
        ],
        "paso_resuelto": "60° está entre 0° y 90°.",
        "visual": null,
        "id": "mat_ang_clases-v1"
      },
      {
        "enunciado": "¿Cómo se clasifica un ángulo de 90°?",
        "respuesta_correcta": "recto",
        "opciones": [
          "agudo",
          "obtuso",
          "llano",
          "recto"
        ],
        "paso_resuelto": "90° es exactamente 90°.",
        "visual": null,
        "id": "mat_ang_clases-v2"
      },
      {
        "enunciado": "¿Cómo se clasifica un ángulo de 120°?",
        "respuesta_correcta": "obtuso",
        "opciones": [
          "recto",
          "llano",
          "obtuso",
          "agudo"
        ],
        "paso_resuelto": "120° está entre 90° y 180°.",
        "visual": null,
        "id": "mat_ang_clases-v3"
      },
      {
        "enunciado": "¿Cómo se clasifica un ángulo de 180°?",
        "respuesta_correcta": "llano",
        "opciones": [
          "obtuso",
          "llano",
          "agudo",
          "recto"
        ],
        "paso_resuelto": "180° es exactamente 180°.",
        "visual": null,
        "id": "mat_ang_clases-v4"
      },
      {
        "enunciado": "¿Cómo se clasifica un ángulo de 35°?",
        "respuesta_correcta": "agudo",
        "opciones": [
          "agudo",
          "recto",
          "obtuso",
          "llano"
        ],
        "paso_resuelto": "35° está entre 0° y 90°.",
        "visual": null,
        "id": "mat_ang_clases-v5"
      },
      {
        "enunciado": "¿Cómo se clasifica un ángulo de 150°?",
        "respuesta_correcta": "obtuso",
        "opciones": [
          "agudo",
          "recto",
          "llano",
          "obtuso"
        ],
        "paso_resuelto": "150° está entre 90° y 180°.",
        "visual": null,
        "id": "mat_ang_clases-v6"
      }
    ]
  },
  {
    "id": "mat_ang_complemento",
    "tema": "geometria_angulos",
    "titulo": "Dos ángulos que completan una abertura",
    "explicacion": "Dos ángulos son complementarios si suman 90° y suplementarios si suman 180°. Para hallar el que falta restamos el conocido de la suma que deben completar.",
    "ejemplo": "Si dos ángulos suman 90° y uno mide 30°, el otro mide 60°.",
    "pasos": [
      "La suma buscada es 90°.",
      "90° − 30° = 60°."
    ],
    "pista": "Identificá si deben sumar 90° o 180°.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Dos ángulos suman 90°. Uno mide 30°. ¿Cuántos grados mide el otro?",
        "respuesta_correcta": "60",
        "opciones": [
          "60",
          "61",
          "70"
        ],
        "paso_resuelto": "90 − 30 = 60.\nComprobamos: 30 + 60 = 90.",
        "visual": null,
        "id": "mat_ang_complemento-v1"
      },
      {
        "enunciado": "Dos ángulos suman 180°. Uno mide 50°. ¿Cuántos grados mide el otro?",
        "respuesta_correcta": "130",
        "opciones": [
          "131",
          "140",
          "130"
        ],
        "paso_resuelto": "180 − 50 = 130.\nComprobamos: 50 + 130 = 180.",
        "visual": null,
        "id": "mat_ang_complemento-v2"
      },
      {
        "enunciado": "Dos ángulos suman 90°. Uno mide 25°. ¿Cuántos grados mide el otro?",
        "respuesta_correcta": "65",
        "opciones": [
          "75",
          "65",
          "66"
        ],
        "paso_resuelto": "90 − 25 = 65.\nComprobamos: 25 + 65 = 90.",
        "visual": null,
        "id": "mat_ang_complemento-v3"
      },
      {
        "enunciado": "Dos ángulos suman 180°. Uno mide 110°. ¿Cuántos grados mide el otro?",
        "respuesta_correcta": "70",
        "opciones": [
          "70",
          "71",
          "80"
        ],
        "paso_resuelto": "180 − 110 = 70.\nComprobamos: 110 + 70 = 180.",
        "visual": null,
        "id": "mat_ang_complemento-v4"
      },
      {
        "enunciado": "Dos ángulos suman 90°. Uno mide 40°. ¿Cuántos grados mide el otro?",
        "respuesta_correcta": "50",
        "opciones": [
          "51",
          "60",
          "50"
        ],
        "paso_resuelto": "90 − 40 = 50.\nComprobamos: 40 + 50 = 90.",
        "visual": null,
        "id": "mat_ang_complemento-v5"
      },
      {
        "enunciado": "Dos ángulos suman 180°. Uno mide 135°. ¿Cuántos grados mide el otro?",
        "respuesta_correcta": "45",
        "opciones": [
          "55",
          "45",
          "46"
        ],
        "paso_resuelto": "180 − 135 = 45.\nComprobamos: 135 + 45 = 180.",
        "visual": null,
        "id": "mat_ang_complemento-v6"
      }
    ]
  },
  {
    "id": "mat_tri_lados",
    "tema": "geometria_triangulos",
    "titulo": "Clasificar triángulos por sus lados",
    "explicacion": "Un triángulo tiene tres lados. Es equilátero si los tres son iguales, isósceles si tiene al menos dos lados iguales y escaleno si los tres son distintos. Para elegir una sola respuesta, usamos el nombre más específico.",
    "ejemplo": "Un triángulo de lados 4, 4 y 6 es isósceles.",
    "pasos": [
      "Comparamos las tres longitudes.",
      "Tiene dos iguales y uno distinto: isósceles."
    ],
    "pista": "Contá cuántos lados tienen la misma medida.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Un triángulo tiene lados 4, 4 y 6 cm. Elegí el nombre más específico.",
        "respuesta_correcta": "isósceles",
        "opciones": [
          "isósceles",
          "equilátero",
          "escaleno"
        ],
        "paso_resuelto": "Los lados 4, 4, 6 tienen dos iguales y uno distinto.",
        "visual": null,
        "id": "mat_tri_lados-v1"
      },
      {
        "enunciado": "Un triángulo tiene lados 3, 3 y 3 cm. Elegí el nombre más específico.",
        "respuesta_correcta": "equilátero",
        "opciones": [
          "isósceles",
          "escaleno",
          "equilátero"
        ],
        "paso_resuelto": "Los lados 3, 3, 3 tienen tres medidas iguales.",
        "visual": null,
        "id": "mat_tri_lados-v2"
      },
      {
        "enunciado": "Un triángulo tiene lados 3, 4 y 5 cm. Elegí el nombre más específico.",
        "respuesta_correcta": "escaleno",
        "opciones": [
          "isósceles",
          "escaleno",
          "equilátero"
        ],
        "paso_resuelto": "Los lados 3, 4, 5 tienen tres medidas distintas.",
        "visual": null,
        "id": "mat_tri_lados-v3"
      },
      {
        "enunciado": "Un triángulo tiene lados 5, 5 y 8 cm. Elegí el nombre más específico.",
        "respuesta_correcta": "isósceles",
        "opciones": [
          "isósceles",
          "equilátero",
          "escaleno"
        ],
        "paso_resuelto": "Los lados 5, 5, 8 tienen dos iguales y uno distinto.",
        "visual": null,
        "id": "mat_tri_lados-v4"
      },
      {
        "enunciado": "Un triángulo tiene lados 7, 7 y 7 cm. Elegí el nombre más específico.",
        "respuesta_correcta": "equilátero",
        "opciones": [
          "isósceles",
          "escaleno",
          "equilátero"
        ],
        "paso_resuelto": "Los lados 7, 7, 7 tienen tres medidas iguales.",
        "visual": null,
        "id": "mat_tri_lados-v5"
      },
      {
        "enunciado": "Un triángulo tiene lados 5, 6 y 8 cm. Elegí el nombre más específico.",
        "respuesta_correcta": "escaleno",
        "opciones": [
          "isósceles",
          "escaleno",
          "equilátero"
        ],
        "paso_resuelto": "Los lados 5, 6, 8 tienen tres medidas distintas.",
        "visual": null,
        "id": "mat_tri_lados-v6"
      }
    ]
  },
  {
    "id": "mat_tri_angulos",
    "tema": "geometria_triangulos",
    "titulo": "Los tres ángulos suman 180 grados",
    "explicacion": "Los ángulos interiores de todo triángulo suman 180°. Si conocemos dos, sumamos sus medidas y restamos esa suma de 180°.",
    "ejemplo": "Un triángulo tiene ángulos de 50° y 60°. El tercero mide 70°.",
    "pasos": [
      "50° + 60° = 110°.",
      "180° − 110° = 70°."
    ],
    "pista": "Restá de 180° la suma de los dos ángulos conocidos.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Dos ángulos de un triángulo miden 50° y 60°. ¿Cuántos grados mide el tercero?",
        "respuesta_correcta": "70",
        "opciones": [
          "70",
          "71",
          "80"
        ],
        "paso_resuelto": "50 + 60 = 110.\n180 − 110 = 70.",
        "visual": null,
        "id": "mat_tri_angulos-v1"
      },
      {
        "enunciado": "Dos ángulos de un triángulo miden 40° y 80°. ¿Cuántos grados mide el tercero?",
        "respuesta_correcta": "60",
        "opciones": [
          "61",
          "70",
          "60"
        ],
        "paso_resuelto": "40 + 80 = 120.\n180 − 120 = 60.",
        "visual": null,
        "id": "mat_tri_angulos-v2"
      },
      {
        "enunciado": "Dos ángulos de un triángulo miden 90° y 35°. ¿Cuántos grados mide el tercero?",
        "respuesta_correcta": "55",
        "opciones": [
          "65",
          "55",
          "56"
        ],
        "paso_resuelto": "90 + 35 = 125.\n180 − 125 = 55.",
        "visual": null,
        "id": "mat_tri_angulos-v3"
      },
      {
        "enunciado": "Dos ángulos de un triángulo miden 65° y 65°. ¿Cuántos grados mide el tercero?",
        "respuesta_correcta": "50",
        "opciones": [
          "50",
          "51",
          "60"
        ],
        "paso_resuelto": "65 + 65 = 130.\n180 − 130 = 50.",
        "visual": null,
        "id": "mat_tri_angulos-v4"
      },
      {
        "enunciado": "Dos ángulos de un triángulo miden 30° y 70°. ¿Cuántos grados mide el tercero?",
        "respuesta_correcta": "80",
        "opciones": [
          "81",
          "90",
          "80"
        ],
        "paso_resuelto": "30 + 70 = 100.\n180 − 100 = 80.",
        "visual": null,
        "id": "mat_tri_angulos-v5"
      },
      {
        "enunciado": "Dos ángulos de un triángulo miden 45° y 55°. ¿Cuántos grados mide el tercero?",
        "respuesta_correcta": "80",
        "opciones": [
          "90",
          "80",
          "81"
        ],
        "paso_resuelto": "45 + 55 = 100.\n180 − 100 = 80.",
        "visual": null,
        "id": "mat_tri_angulos-v6"
      }
    ]
  },
  {
    "id": "mat_cuad_lados",
    "tema": "geometria_cuadrilateros_circunferencia",
    "titulo": "Cuatro lados y líneas paralelas",
    "explicacion": "Un cuadrilátero tiene cuatro lados. Un paralelogramo tiene dos pares de lados opuestos paralelos. El cuadrado tiene cuatro lados iguales y cuatro ángulos rectos: también es rectángulo y rombo. En el cuadernillo, trapecio tiene un solo par de lados paralelos.",
    "ejemplo": "Todo cuadrado es también un rectángulo.",
    "pasos": [
      "Rectángulo significa cuatro ángulos rectos.",
      "El cuadrado cumple esa condición y además tiene lados iguales."
    ],
    "pista": "Una figura puede pertenecer a más de una familia.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Todo cuadrado tiene cuatro ángulos rectos?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "Es parte de la definición de cuadrado.",
        "visual": null,
        "id": "mat_cuad_lados-v1"
      },
      {
        "enunciado": "¿Todo rectángulo tiene los cuatro lados iguales?",
        "respuesta_correcta": "No",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "Eso ocurre en los cuadrados; otros rectángulos tienen largo y ancho diferentes.",
        "visual": null,
        "id": "mat_cuad_lados-v2"
      },
      {
        "enunciado": "¿Un cuadrado también es un rombo?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "Sus cuatro lados son iguales.",
        "visual": null,
        "id": "mat_cuad_lados-v3"
      },
      {
        "enunciado": "¿Un paralelogramo tiene dos pares de lados opuestos paralelos?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "Esa condición define al paralelogramo.",
        "visual": null,
        "id": "mat_cuad_lados-v4"
      },
      {
        "enunciado": "Según el cuadernillo, ¿un trapecio tiene dos pares de lados paralelos?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "El trapecio tiene un solo par.",
        "visual": null,
        "id": "mat_cuad_lados-v5"
      },
      {
        "enunciado": "¿Todo rombo tiene cuatro ángulos rectos?",
        "respuesta_correcta": "No",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "Tiene cuatro lados iguales, pero sus ángulos no necesariamente son rectos.",
        "visual": null,
        "id": "mat_cuad_lados-v6"
      }
    ]
  },
  {
    "id": "mat_circ_radio",
    "tema": "geometria_cuadrilateros_circunferencia",
    "titulo": "Radio y diámetro",
    "explicacion": "La circunferencia es la línea cuyos puntos están a la misma distancia del centro. El radio une el centro con esa línea. El diámetro une dos puntos de la circunferencia pasando por el centro y mide dos radios.",
    "ejemplo": "Si el radio es 3 cm, el diámetro mide 6 cm.",
    "pasos": [
      "Un diámetro reúne dos radios.",
      "3 + 3 = 6 cm."
    ],
    "pista": "El diámetro mide el doble del radio.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "El radio mide 3 cm. ¿Cuántos centímetros mide el diámetro?",
        "respuesta_correcta": "6",
        "opciones": [
          "6",
          "7",
          "16"
        ],
        "paso_resuelto": "El diámetro reúne dos radios: 3 + 3 = 6 cm.",
        "visual": null,
        "id": "mat_circ_radio-v1"
      },
      {
        "enunciado": "El radio mide 4 cm. ¿Cuántos centímetros mide el diámetro?",
        "respuesta_correcta": "8",
        "opciones": [
          "9",
          "18",
          "8"
        ],
        "paso_resuelto": "El diámetro reúne dos radios: 4 + 4 = 8 cm.",
        "visual": null,
        "id": "mat_circ_radio-v2"
      },
      {
        "enunciado": "El radio mide 5 cm. ¿Cuántos centímetros mide el diámetro?",
        "respuesta_correcta": "10",
        "opciones": [
          "20",
          "10",
          "11"
        ],
        "paso_resuelto": "El diámetro reúne dos radios: 5 + 5 = 10 cm.",
        "visual": null,
        "id": "mat_circ_radio-v3"
      },
      {
        "enunciado": "El radio mide 6 cm. ¿Cuántos centímetros mide el diámetro?",
        "respuesta_correcta": "12",
        "opciones": [
          "12",
          "13",
          "22"
        ],
        "paso_resuelto": "El diámetro reúne dos radios: 6 + 6 = 12 cm.",
        "visual": null,
        "id": "mat_circ_radio-v4"
      },
      {
        "enunciado": "El radio mide 7 cm. ¿Cuántos centímetros mide el diámetro?",
        "respuesta_correcta": "14",
        "opciones": [
          "15",
          "24",
          "14"
        ],
        "paso_resuelto": "El diámetro reúne dos radios: 7 + 7 = 14 cm.",
        "visual": null,
        "id": "mat_circ_radio-v5"
      },
      {
        "enunciado": "El radio mide 8 cm. ¿Cuántos centímetros mide el diámetro?",
        "respuesta_correcta": "16",
        "opciones": [
          "26",
          "16",
          "17"
        ],
        "paso_resuelto": "El diámetro reúne dos radios: 8 + 8 = 16 cm.",
        "visual": null,
        "id": "mat_circ_radio-v6"
      }
    ]
  },
  {
    "id": "mat_per_rectangulo",
    "tema": "perimetros_simples",
    "titulo": "Recorrer todo el borde",
    "explicacion": "El perímetro es la longitud del borde de una figura. En un rectángulo sumamos largo, ancho, largo y ancho. Se expresa en unidades de longitud, no de superficie.",
    "ejemplo": "Un rectángulo de 5 cm por 3 cm tiene perímetro 16 cm.",
    "pasos": [
      "Recorremos sus cuatro lados: 5, 3, 5, 3.",
      "5 + 3 + 5 + 3 = 16 cm."
    ],
    "pista": "Sumá cada lado del borde una sola vez.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Un rectángulo mide 5 cm de largo y 3 cm de ancho. ¿Cuál es su perímetro en cm?",
        "respuesta_correcta": "16",
        "opciones": [
          "16",
          "15",
          "8",
          "17"
        ],
        "paso_resuelto": "5 + 3 + 5 + 3 = 16 cm.",
        "visual": null,
        "id": "mat_per_rectangulo-v1"
      },
      {
        "enunciado": "Un rectángulo mide 6 cm de largo y 4 cm de ancho. ¿Cuál es su perímetro en cm?",
        "respuesta_correcta": "20",
        "opciones": [
          "24",
          "10",
          "21",
          "20"
        ],
        "paso_resuelto": "6 + 4 + 6 + 4 = 20 cm.",
        "visual": null,
        "id": "mat_per_rectangulo-v2"
      },
      {
        "enunciado": "Un rectángulo mide 7 cm de largo y 2 cm de ancho. ¿Cuál es su perímetro en cm?",
        "respuesta_correcta": "18",
        "opciones": [
          "9",
          "19",
          "18",
          "14"
        ],
        "paso_resuelto": "7 + 2 + 7 + 2 = 18 cm.",
        "visual": null,
        "id": "mat_per_rectangulo-v3"
      },
      {
        "enunciado": "Un rectángulo mide 8 cm de largo y 3 cm de ancho. ¿Cuál es su perímetro en cm?",
        "respuesta_correcta": "22",
        "opciones": [
          "23",
          "22",
          "24",
          "11"
        ],
        "paso_resuelto": "8 + 3 + 8 + 3 = 22 cm.",
        "visual": null,
        "id": "mat_per_rectangulo-v4"
      },
      {
        "enunciado": "Un rectángulo mide 9 cm de largo y 4 cm de ancho. ¿Cuál es su perímetro en cm?",
        "respuesta_correcta": "26",
        "opciones": [
          "26",
          "36",
          "13",
          "27"
        ],
        "paso_resuelto": "9 + 4 + 9 + 4 = 26 cm.",
        "visual": null,
        "id": "mat_per_rectangulo-v5"
      },
      {
        "enunciado": "Un rectángulo mide 10 cm de largo y 5 cm de ancho. ¿Cuál es su perímetro en cm?",
        "respuesta_correcta": "30",
        "opciones": [
          "50",
          "15",
          "31",
          "30"
        ],
        "paso_resuelto": "10 + 5 + 10 + 5 = 30 cm.",
        "visual": null,
        "id": "mat_per_rectangulo-v6"
      }
    ]
  },
  {
    "id": "mat_per_circunferencia",
    "tema": "perimetros_simples",
    "titulo": "Medir el borde de una circunferencia",
    "explicacion": "La longitud de una circunferencia se calcula multiplicando su diámetro por pi. Usaremos pi aproximado a 3,14. Si conocemos el radio, primero lo duplicamos.",
    "ejemplo": "Diámetro 10 cm: longitud aproximada 31,4 cm.",
    "pasos": [
      "Usamos L = pi × diámetro.",
      "3,14 × 10 = 31,4 cm."
    ],
    "pista": "Revisá si te dieron radio o diámetro.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Una circunferencia tiene diámetro 10 cm. Usá pi = 3,14. ¿Cuál es su longitud aproximada en cm?",
        "respuesta_correcta": "31,40",
        "opciones": [
          "31,40",
          "20",
          "30"
        ],
        "paso_resuelto": "3,14 × 10 = 31,40 cm.",
        "visual": null,
        "id": "mat_per_circunferencia-v1"
      },
      {
        "enunciado": "Una circunferencia tiene diámetro 2 cm. Usá pi = 3,14. ¿Cuál es su longitud aproximada en cm?",
        "respuesta_correcta": "6,28",
        "opciones": [
          "4",
          "6",
          "6,28"
        ],
        "paso_resuelto": "3,14 × 2 = 6,28 cm.",
        "visual": null,
        "id": "mat_per_circunferencia-v2"
      },
      {
        "enunciado": "Una circunferencia tiene diámetro 4 cm. Usá pi = 3,14. ¿Cuál es su longitud aproximada en cm?",
        "respuesta_correcta": "12,56",
        "opciones": [
          "12",
          "12,56",
          "8"
        ],
        "paso_resuelto": "3,14 × 4 = 12,56 cm.",
        "visual": null,
        "id": "mat_per_circunferencia-v3"
      },
      {
        "enunciado": "Una circunferencia tiene diámetro 6 cm. Usá pi = 3,14. ¿Cuál es su longitud aproximada en cm?",
        "respuesta_correcta": "18,84",
        "opciones": [
          "18,84",
          "12",
          "18"
        ],
        "paso_resuelto": "3,14 × 6 = 18,84 cm.",
        "visual": null,
        "id": "mat_per_circunferencia-v4"
      },
      {
        "enunciado": "Una circunferencia tiene diámetro 8 cm. Usá pi = 3,14. ¿Cuál es su longitud aproximada en cm?",
        "respuesta_correcta": "25,12",
        "opciones": [
          "16",
          "24",
          "25,12"
        ],
        "paso_resuelto": "3,14 × 8 = 25,12 cm.",
        "visual": null,
        "id": "mat_per_circunferencia-v5"
      },
      {
        "enunciado": "Una circunferencia tiene diámetro 20 cm. Usá pi = 3,14. ¿Cuál es su longitud aproximada en cm?",
        "respuesta_correcta": "62,80",
        "opciones": [
          "60",
          "62,80",
          "40"
        ],
        "paso_resuelto": "3,14 × 20 = 62,80 cm.",
        "visual": null,
        "id": "mat_per_circunferencia-v6"
      }
    ]
  },
  {
    "id": "mat_per_union",
    "tema": "perimetros_compuestos",
    "titulo": "Los lados compartidos quedan adentro",
    "explicacion": "Al unir figuras sin superponerlas, un lado pegado deja de formar parte del borde exterior. Si sumamos sus perímetros, ese lado se contó dos veces. Restamos dos veces la longitud compartida.",
    "ejemplo": "Dos cuadrados de lado 3 cm unidos por un lado tienen perímetro exterior 18 cm.",
    "pasos": [
      "Cada cuadrado tiene perímetro 12 cm: juntos suman 24.",
      "Quitamos dos veces el lado interno: 24 − 6 = 18 cm."
    ],
    "pista": "Recorré solo el borde exterior.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Dos cuadrados de lado 3 cm se unen por un lado completo. ¿Cuál es el perímetro exterior en cm?",
        "respuesta_correcta": "18",
        "opciones": [
          "18",
          "24",
          "12"
        ],
        "paso_resuelto": "Los perímetros suman 24.\nQuitamos el lado compartido dos veces: 24 − 6 = 18 cm.",
        "visual": null,
        "id": "mat_per_union-v1"
      },
      {
        "enunciado": "Dos cuadrados de lado 4 cm se unen por un lado completo. ¿Cuál es el perímetro exterior en cm?",
        "respuesta_correcta": "24",
        "opciones": [
          "32",
          "16",
          "24"
        ],
        "paso_resuelto": "Los perímetros suman 32.\nQuitamos el lado compartido dos veces: 32 − 8 = 24 cm.",
        "visual": null,
        "id": "mat_per_union-v2"
      },
      {
        "enunciado": "Dos cuadrados de lado 5 cm se unen por un lado completo. ¿Cuál es el perímetro exterior en cm?",
        "respuesta_correcta": "30",
        "opciones": [
          "20",
          "30",
          "40"
        ],
        "paso_resuelto": "Los perímetros suman 40.\nQuitamos el lado compartido dos veces: 40 − 10 = 30 cm.",
        "visual": null,
        "id": "mat_per_union-v3"
      },
      {
        "enunciado": "Dos cuadrados de lado 6 cm se unen por un lado completo. ¿Cuál es el perímetro exterior en cm?",
        "respuesta_correcta": "36",
        "opciones": [
          "36",
          "48",
          "24"
        ],
        "paso_resuelto": "Los perímetros suman 48.\nQuitamos el lado compartido dos veces: 48 − 12 = 36 cm.",
        "visual": null,
        "id": "mat_per_union-v4"
      },
      {
        "enunciado": "Dos cuadrados de lado 7 cm se unen por un lado completo. ¿Cuál es el perímetro exterior en cm?",
        "respuesta_correcta": "42",
        "opciones": [
          "56",
          "28",
          "42"
        ],
        "paso_resuelto": "Los perímetros suman 56.\nQuitamos el lado compartido dos veces: 56 − 14 = 42 cm.",
        "visual": null,
        "id": "mat_per_union-v5"
      },
      {
        "enunciado": "Dos cuadrados de lado 8 cm se unen por un lado completo. ¿Cuál es el perímetro exterior en cm?",
        "respuesta_correcta": "48",
        "opciones": [
          "32",
          "48",
          "64"
        ],
        "paso_resuelto": "Los perímetros suman 64.\nQuitamos el lado compartido dos veces: 64 − 16 = 48 cm.",
        "visual": null,
        "id": "mat_per_union-v6"
      }
    ]
  },
  {
    "id": "mat_per_faltante",
    "tema": "perimetros_compuestos",
    "titulo": "Encontrar un tramo que falta",
    "explicacion": "Si un lado total está dividido en dos tramos, el desconocido se encuentra restando el conocido al total. Antes de calcular un perímetro compuesto, identificamos todos los tramos exteriores.",
    "ejemplo": "Un lado de 10 cm tiene un tramo de 4 cm: faltan 6 cm.",
    "pasos": [
      "El total es la suma de ambos tramos.",
      "10 − 4 = 6 cm."
    ],
    "pista": "Los dos tramos deben sumar el lado completo.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Un lado recto de 10 cm se divide en un tramo de 4 cm y otro desconocido. ¿Cuántos cm mide el tramo que falta?",
        "respuesta_correcta": "6",
        "opciones": [
          "6",
          "7",
          "16"
        ],
        "paso_resuelto": "10 − 4 = 6.\n4 + 6 = 10 cm.",
        "visual": null,
        "id": "mat_per_faltante-v1"
      },
      {
        "enunciado": "Un lado recto de 12 cm se divide en un tramo de 5 cm y otro desconocido. ¿Cuántos cm mide el tramo que falta?",
        "respuesta_correcta": "7",
        "opciones": [
          "8",
          "17",
          "7"
        ],
        "paso_resuelto": "12 − 5 = 7.\n5 + 7 = 12 cm.",
        "visual": null,
        "id": "mat_per_faltante-v2"
      },
      {
        "enunciado": "Un lado recto de 15 cm se divide en un tramo de 6 cm y otro desconocido. ¿Cuántos cm mide el tramo que falta?",
        "respuesta_correcta": "9",
        "opciones": [
          "19",
          "9",
          "10"
        ],
        "paso_resuelto": "15 − 6 = 9.\n6 + 9 = 15 cm.",
        "visual": null,
        "id": "mat_per_faltante-v3"
      },
      {
        "enunciado": "Un lado recto de 18 cm se divide en un tramo de 7 cm y otro desconocido. ¿Cuántos cm mide el tramo que falta?",
        "respuesta_correcta": "11",
        "opciones": [
          "11",
          "12",
          "21"
        ],
        "paso_resuelto": "18 − 7 = 11.\n7 + 11 = 18 cm.",
        "visual": null,
        "id": "mat_per_faltante-v4"
      },
      {
        "enunciado": "Un lado recto de 20 cm se divide en un tramo de 8 cm y otro desconocido. ¿Cuántos cm mide el tramo que falta?",
        "respuesta_correcta": "12",
        "opciones": [
          "13",
          "22",
          "12"
        ],
        "paso_resuelto": "20 − 8 = 12.\n8 + 12 = 20 cm.",
        "visual": null,
        "id": "mat_per_faltante-v5"
      },
      {
        "enunciado": "Un lado recto de 24 cm se divide en un tramo de 9 cm y otro desconocido. ¿Cuántos cm mide el tramo que falta?",
        "respuesta_correcta": "15",
        "opciones": [
          "25",
          "15",
          "16"
        ],
        "paso_resuelto": "24 − 9 = 15.\n9 + 15 = 24 cm.",
        "visual": null,
        "id": "mat_per_faltante-v6"
      }
    ]
  },
  {
    "id": "mat_graf_leer",
    "tema": "graficos_estadisticos",
    "titulo": "Leer qué cuenta cada dato",
    "explicacion": "Un gráfico o una tabla relaciona categorías con cantidades. Primero leemos qué se está contando y en qué unidad. Para buscar el mayor valor comparamos las cantidades, no el largo del nombre.",
    "ejemplo": "Libros leídos: Ana 3, Bruno 5, Cami 2. Bruno leyó más.",
    "pasos": [
      "Buscamos 3, 5 y 2 libros.",
      "5 es la mayor cantidad; corresponde a Bruno."
    ],
    "pista": "Leé los nombres y sus cantidades antes de comparar.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Libros leídos: Ana 3, Bruno 5, Cami 2. ¿Quién leyó más?",
        "respuesta_correcta": "Bruno",
        "opciones": [
          "Bruno",
          "Ana",
          "Cami"
        ],
        "paso_resuelto": "Comparamos 3, 5 y 2. La mayor cantidad es 5.",
        "visual": null,
        "id": "mat_graf_leer-v1"
      },
      {
        "enunciado": "Libros leídos: Ana 6, Bruno 2, Cami 4. ¿Quién leyó más?",
        "respuesta_correcta": "Ana",
        "opciones": [
          "Bruno",
          "Cami",
          "Ana"
        ],
        "paso_resuelto": "Comparamos 6, 2 y 4. La mayor cantidad es 6.",
        "visual": null,
        "id": "mat_graf_leer-v2"
      },
      {
        "enunciado": "Libros leídos: Ana 4, Bruno 3, Cami 7. ¿Quién leyó más?",
        "respuesta_correcta": "Cami",
        "opciones": [
          "Bruno",
          "Cami",
          "Ana"
        ],
        "paso_resuelto": "Comparamos 4, 3 y 7. La mayor cantidad es 7.",
        "visual": null,
        "id": "mat_graf_leer-v3"
      },
      {
        "enunciado": "Libros leídos: Ana 8, Bruno 9, Cami 5. ¿Quién leyó más?",
        "respuesta_correcta": "Bruno",
        "opciones": [
          "Bruno",
          "Ana",
          "Cami"
        ],
        "paso_resuelto": "Comparamos 8, 9 y 5. La mayor cantidad es 9.",
        "visual": null,
        "id": "mat_graf_leer-v4"
      },
      {
        "enunciado": "Libros leídos: Ana 7, Bruno 4, Cami 3. ¿Quién leyó más?",
        "respuesta_correcta": "Ana",
        "opciones": [
          "Bruno",
          "Cami",
          "Ana"
        ],
        "paso_resuelto": "Comparamos 7, 4 y 3. La mayor cantidad es 7.",
        "visual": null,
        "id": "mat_graf_leer-v5"
      },
      {
        "enunciado": "Libros leídos: Ana 5, Bruno 6, Cami 8. ¿Quién leyó más?",
        "respuesta_correcta": "Cami",
        "opciones": [
          "Bruno",
          "Cami",
          "Ana"
        ],
        "paso_resuelto": "Comparamos 5, 6 y 8. La mayor cantidad es 8.",
        "visual": null,
        "id": "mat_graf_leer-v6"
      }
    ]
  },
  {
    "id": "mat_graf_escala",
    "tema": "graficos_estadisticos",
    "titulo": "Una marca puede valer más de uno",
    "explicacion": "En un pictograma cada símbolo puede representar varias unidades. Leemos la clave antes de contar. Si cada símbolo vale dos libros, cuatro símbolos representan ocho libros.",
    "ejemplo": "4 símbolos de 2 libros cada uno representan 8 libros.",
    "pasos": [
      "Contamos 4 símbolos.",
      "4 × 2 = 8 libros."
    ],
    "pista": "Buscá cuánto vale cada símbolo en la clave.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "En un pictograma, cada símbolo representa 2 libros. Hay 4 símbolos completos. ¿Cuántos libros representan?",
        "respuesta_correcta": "8",
        "opciones": [
          "8",
          "4",
          "6"
        ],
        "paso_resuelto": "4 símbolos × 2 libros = 8 libros.",
        "visual": null,
        "id": "mat_graf_escala-v1"
      },
      {
        "enunciado": "En un pictograma, cada símbolo representa 5 libros. Hay 3 símbolos completos. ¿Cuántos libros representan?",
        "respuesta_correcta": "15",
        "opciones": [
          "3",
          "8",
          "15"
        ],
        "paso_resuelto": "3 símbolos × 5 libros = 15 libros.",
        "visual": null,
        "id": "mat_graf_escala-v2"
      },
      {
        "enunciado": "En un pictograma, cada símbolo representa 2 libros. Hay 6 símbolos completos. ¿Cuántos libros representan?",
        "respuesta_correcta": "12",
        "opciones": [
          "8",
          "12",
          "6"
        ],
        "paso_resuelto": "6 símbolos × 2 libros = 12 libros.",
        "visual": null,
        "id": "mat_graf_escala-v3"
      },
      {
        "enunciado": "En un pictograma, cada símbolo representa 3 libros. Hay 5 símbolos completos. ¿Cuántos libros representan?",
        "respuesta_correcta": "15",
        "opciones": [
          "15",
          "5",
          "8"
        ],
        "paso_resuelto": "5 símbolos × 3 libros = 15 libros.",
        "visual": null,
        "id": "mat_graf_escala-v4"
      },
      {
        "enunciado": "En un pictograma, cada símbolo representa 4 libros. Hay 7 símbolos completos. ¿Cuántos libros representan?",
        "respuesta_correcta": "28",
        "opciones": [
          "7",
          "11",
          "28"
        ],
        "paso_resuelto": "7 símbolos × 4 libros = 28 libros.",
        "visual": null,
        "id": "mat_graf_escala-v5"
      },
      {
        "enunciado": "En un pictograma, cada símbolo representa 5 libros. Hay 8 símbolos completos. ¿Cuántos libros representan?",
        "respuesta_correcta": "40",
        "opciones": [
          "13",
          "40",
          "8"
        ],
        "paso_resuelto": "8 símbolos × 5 libros = 40 libros.",
        "visual": null,
        "id": "mat_graf_escala-v6"
      }
    ]
  },
  {
    "id": "mat_prop_unidad",
    "tema": "proporcionalidad_regla_3",
    "titulo": "Primero averiguamos cuánto vale uno",
    "explicacion": "En una relación directamente proporcional, cada unidad conserva el mismo valor. Si tres cuadernos cuestan 600 pesos, uno cuesta 600 ÷ 3. No hay descuentos ni cargos extra en estos ejercicios.",
    "ejemplo": "3 cuadernos cuestan $600: uno cuesta $200.",
    "pasos": [
      "Dividimos el precio total entre la cantidad.",
      "600 ÷ 3 = 200 pesos por cuaderno."
    ],
    "pista": "Buscá el valor de una unidad.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "3 cuadernos iguales cuestan $600, sin descuentos. ¿Cuántos pesos cuesta uno?",
        "respuesta_correcta": "200",
        "opciones": [
          "200",
          "600",
          "203"
        ],
        "paso_resuelto": "600 ÷ 3 = 200 pesos por cuaderno.",
        "visual": null,
        "id": "mat_prop_unidad-v1"
      },
      {
        "enunciado": "4 cuadernos iguales cuestan $600, sin descuentos. ¿Cuántos pesos cuesta uno?",
        "respuesta_correcta": "150",
        "opciones": [
          "600",
          "154",
          "150"
        ],
        "paso_resuelto": "600 ÷ 4 = 150 pesos por cuaderno.",
        "visual": null,
        "id": "mat_prop_unidad-v2"
      },
      {
        "enunciado": "5 cuadernos iguales cuestan $600, sin descuentos. ¿Cuántos pesos cuesta uno?",
        "respuesta_correcta": "120",
        "opciones": [
          "125",
          "120",
          "600"
        ],
        "paso_resuelto": "600 ÷ 5 = 120 pesos por cuaderno.",
        "visual": null,
        "id": "mat_prop_unidad-v3"
      },
      {
        "enunciado": "2 cuadernos iguales cuestan $500, sin descuentos. ¿Cuántos pesos cuesta uno?",
        "respuesta_correcta": "250",
        "opciones": [
          "250",
          "500",
          "252"
        ],
        "paso_resuelto": "500 ÷ 2 = 250 pesos por cuaderno.",
        "visual": null,
        "id": "mat_prop_unidad-v4"
      },
      {
        "enunciado": "6 cuadernos iguales cuestan $600, sin descuentos. ¿Cuántos pesos cuesta uno?",
        "respuesta_correcta": "100",
        "opciones": [
          "600",
          "106",
          "100"
        ],
        "paso_resuelto": "600 ÷ 6 = 100 pesos por cuaderno.",
        "visual": null,
        "id": "mat_prop_unidad-v5"
      },
      {
        "enunciado": "8 cuadernos iguales cuestan $400, sin descuentos. ¿Cuántos pesos cuesta uno?",
        "respuesta_correcta": "50",
        "opciones": [
          "58",
          "50",
          "400"
        ],
        "paso_resuelto": "400 ÷ 8 = 50 pesos por cuaderno.",
        "visual": null,
        "id": "mat_prop_unidad-v6"
      }
    ]
  },
  {
    "id": "mat_prop_otro_total",
    "tema": "proporcionalidad_regla_3",
    "titulo": "Del valor de uno a otra cantidad",
    "explicacion": "Después de hallar el valor de una unidad, lo multiplicamos por la nueva cantidad. Este método sirve cuando el valor por unidad es constante.",
    "ejemplo": "3 cuadernos cuestan $600. Cinco cuestan $1000.",
    "pasos": [
      "Uno cuesta 600 ÷ 3 = 200.",
      "Cinco cuestan 5 × 200 = 1000."
    ],
    "pista": "Primero dividí para llegar a uno; después multiplicá.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "3 cuadernos cuestan $600. Al mismo precio por unidad, ¿cuántos pesos cuestan 5?",
        "respuesta_correcta": "1000",
        "opciones": [
          "1000",
          "600",
          "1200"
        ],
        "paso_resuelto": "Uno cuesta 600 ÷ 3 = 200.\n5 cuestan 5 × 200 = 1000.",
        "visual": null,
        "id": "mat_prop_otro_total-v1"
      },
      {
        "enunciado": "4 cuadernos cuestan $600. Al mismo precio por unidad, ¿cuántos pesos cuestan 6?",
        "respuesta_correcta": "900",
        "opciones": [
          "600",
          "1050",
          "900"
        ],
        "paso_resuelto": "Uno cuesta 600 ÷ 4 = 150.\n6 cuestan 6 × 150 = 900.",
        "visual": null,
        "id": "mat_prop_otro_total-v2"
      },
      {
        "enunciado": "5 cuadernos cuestan $600. Al mismo precio por unidad, ¿cuántos pesos cuestan 3?",
        "respuesta_correcta": "360",
        "opciones": [
          "480",
          "360",
          "600"
        ],
        "paso_resuelto": "Uno cuesta 600 ÷ 5 = 120.\n3 cuestan 3 × 120 = 360.",
        "visual": null,
        "id": "mat_prop_otro_total-v3"
      },
      {
        "enunciado": "2 cuadernos cuestan $500. Al mismo precio por unidad, ¿cuántos pesos cuestan 4?",
        "respuesta_correcta": "1000",
        "opciones": [
          "1000",
          "500",
          "1250"
        ],
        "paso_resuelto": "Uno cuesta 500 ÷ 2 = 250.\n4 cuestan 4 × 250 = 1000.",
        "visual": null,
        "id": "mat_prop_otro_total-v4"
      },
      {
        "enunciado": "6 cuadernos cuestan $600. Al mismo precio por unidad, ¿cuántos pesos cuestan 9?",
        "respuesta_correcta": "900",
        "opciones": [
          "600",
          "1000",
          "900"
        ],
        "paso_resuelto": "Uno cuesta 600 ÷ 6 = 100.\n9 cuestan 9 × 100 = 900.",
        "visual": null,
        "id": "mat_prop_otro_total-v5"
      },
      {
        "enunciado": "8 cuadernos cuestan $400. Al mismo precio por unidad, ¿cuántos pesos cuestan 7?",
        "respuesta_correcta": "350",
        "opciones": [
          "400",
          "350"
        ],
        "paso_resuelto": "Uno cuesta 400 ÷ 8 = 50.\n7 cuestan 7 × 50 = 350.",
        "visual": null,
        "id": "mat_prop_otro_total-v6"
      }
    ]
  },
  {
    "id": "mat_sec_salto",
    "tema": "secuencias_aritmeticas",
    "titulo": "Repetir siempre el mismo salto",
    "explicacion": "Una secuencia aritmética cambia sumando o restando siempre la misma cantidad. Calculamos la diferencia entre términos vecinos y la comprobamos en los demás.",
    "ejemplo": "4, 7, 10, 13 continúa con 16.",
    "pasos": [
      "7 − 4 = 3 y 10 − 7 = 3.",
      "Sumamos el mismo salto: 13 + 3 = 16."
    ],
    "pista": "Comprobá que el salto se repite antes de continuar.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Seguí sumando siempre lo mismo: 4, 7, 10, 13. ¿Qué número sigue?",
        "respuesta_correcta": "16",
        "opciones": [
          "16",
          "17",
          "26"
        ],
        "paso_resuelto": "El salto es +3.\n13 + 3 = 16.",
        "visual": null,
        "id": "mat_sec_salto-v1"
      },
      {
        "enunciado": "Seguí sumando siempre lo mismo: 2, 6, 10, 14. ¿Qué número sigue?",
        "respuesta_correcta": "18",
        "opciones": [
          "19",
          "28",
          "18"
        ],
        "paso_resuelto": "El salto es +4.\n14 + 4 = 18.",
        "visual": null,
        "id": "mat_sec_salto-v2"
      },
      {
        "enunciado": "Seguí sumando siempre lo mismo: 5, 7, 9, 11. ¿Qué número sigue?",
        "respuesta_correcta": "13",
        "opciones": [
          "23",
          "13",
          "14"
        ],
        "paso_resuelto": "El salto es +2.\n11 + 2 = 13.",
        "visual": null,
        "id": "mat_sec_salto-v3"
      },
      {
        "enunciado": "Seguí sumando siempre lo mismo: 7, 12, 17, 22. ¿Qué número sigue?",
        "respuesta_correcta": "27",
        "opciones": [
          "27",
          "28",
          "37"
        ],
        "paso_resuelto": "El salto es +5.\n22 + 5 = 27.",
        "visual": null,
        "id": "mat_sec_salto-v4"
      },
      {
        "enunciado": "Seguí sumando siempre lo mismo: 3, 9, 15, 21. ¿Qué número sigue?",
        "respuesta_correcta": "27",
        "opciones": [
          "28",
          "37",
          "27"
        ],
        "paso_resuelto": "El salto es +6.\n21 + 6 = 27.",
        "visual": null,
        "id": "mat_sec_salto-v5"
      },
      {
        "enunciado": "Seguí sumando siempre lo mismo: 10, 17, 24, 31. ¿Qué número sigue?",
        "respuesta_correcta": "38",
        "opciones": [
          "48",
          "38",
          "39"
        ],
        "paso_resuelto": "El salto es +7.\n31 + 7 = 38.",
        "visual": null,
        "id": "mat_sec_salto-v6"
      }
    ]
  },
  {
    "id": "mat_sec_restar",
    "tema": "secuencias_aritmeticas",
    "titulo": "Secuencias que bajan",
    "explicacion": "Una secuencia también puede repetir una resta. Si los términos bajan de cuatro en cuatro, restamos cuatro al último término. No cambiamos a una suma porque veamos números más pequeños.",
    "ejemplo": "25, 21, 17, 13 continúa con 9.",
    "pasos": [
      "25 − 21 = 4 y 21 − 17 = 4.",
      "13 − 4 = 9."
    ],
    "pista": "Observá si la secuencia sube o baja.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Seguí restando siempre lo mismo: 25, 21, 17, 13. ¿Qué número sigue?",
        "respuesta_correcta": "9",
        "opciones": [
          "9",
          "10",
          "19"
        ],
        "paso_resuelto": "Cada paso resta 4.\n13 − 4 = 9.",
        "visual": null,
        "id": "mat_sec_restar-v1"
      },
      {
        "enunciado": "Seguí restando siempre lo mismo: 30, 25, 20, 15. ¿Qué número sigue?",
        "respuesta_correcta": "10",
        "opciones": [
          "11",
          "20",
          "10"
        ],
        "paso_resuelto": "Cada paso resta 5.\n15 − 5 = 10.",
        "visual": null,
        "id": "mat_sec_restar-v2"
      },
      {
        "enunciado": "Seguí restando siempre lo mismo: 40, 34, 28, 22. ¿Qué número sigue?",
        "respuesta_correcta": "16",
        "opciones": [
          "26",
          "16",
          "17"
        ],
        "paso_resuelto": "Cada paso resta 6.\n22 − 6 = 16.",
        "visual": null,
        "id": "mat_sec_restar-v3"
      },
      {
        "enunciado": "Seguí restando siempre lo mismo: 35, 32, 29, 26. ¿Qué número sigue?",
        "respuesta_correcta": "23",
        "opciones": [
          "23",
          "24",
          "33"
        ],
        "paso_resuelto": "Cada paso resta 3.\n26 − 3 = 23.",
        "visual": null,
        "id": "mat_sec_restar-v4"
      },
      {
        "enunciado": "Seguí restando siempre lo mismo: 50, 43, 36, 29. ¿Qué número sigue?",
        "respuesta_correcta": "22",
        "opciones": [
          "23",
          "32",
          "22"
        ],
        "paso_resuelto": "Cada paso resta 7.\n29 − 7 = 22.",
        "visual": null,
        "id": "mat_sec_restar-v5"
      },
      {
        "enunciado": "Seguí restando siempre lo mismo: 60, 52, 44, 36. ¿Qué número sigue?",
        "respuesta_correcta": "28",
        "opciones": [
          "38",
          "28",
          "29"
        ],
        "paso_resuelto": "Cada paso resta 8.\n36 − 8 = 28.",
        "visual": null,
        "id": "mat_sec_restar-v6"
      }
    ]
  },
  {
    "id": "mat_sec_factor",
    "tema": "secuencias_geometricas_fibonacci",
    "titulo": "Repetir una multiplicación",
    "explicacion": "En algunas secuencias cada término se obtiene multiplicando el anterior por el mismo número. La diferencia entre términos puede cambiar, pero el factor se conserva.",
    "ejemplo": "2, 4, 8, 16 continúa con 32.",
    "pasos": [
      "Cada término es el anterior multiplicado por 2.",
      "16 × 2 = 32."
    ],
    "pista": "Probá el mismo factor en todos los pasos.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Cada término se multiplica por 2: 2, 4, 8. ¿Qué número sigue?",
        "respuesta_correcta": "16",
        "opciones": [
          "16",
          "17",
          "26"
        ],
        "paso_resuelto": "8 × 2 = 16.",
        "visual": null,
        "id": "mat_sec_factor-v1"
      },
      {
        "enunciado": "Cada término se multiplica por 2: 3, 6, 12. ¿Qué número sigue?",
        "respuesta_correcta": "24",
        "opciones": [
          "25",
          "34",
          "24"
        ],
        "paso_resuelto": "12 × 2 = 24.",
        "visual": null,
        "id": "mat_sec_factor-v2"
      },
      {
        "enunciado": "Cada término se multiplica por 3: 1, 3, 9. ¿Qué número sigue?",
        "respuesta_correcta": "27",
        "opciones": [
          "37",
          "27",
          "28"
        ],
        "paso_resuelto": "9 × 3 = 27.",
        "visual": null,
        "id": "mat_sec_factor-v3"
      },
      {
        "enunciado": "Cada término se multiplica por 2: 4, 8, 16. ¿Qué número sigue?",
        "respuesta_correcta": "32",
        "opciones": [
          "32",
          "33",
          "42"
        ],
        "paso_resuelto": "16 × 2 = 32.",
        "visual": null,
        "id": "mat_sec_factor-v4"
      },
      {
        "enunciado": "Cada término se multiplica por 3: 2, 6, 18. ¿Qué número sigue?",
        "respuesta_correcta": "54",
        "opciones": [
          "55",
          "64",
          "54"
        ],
        "paso_resuelto": "18 × 3 = 54.",
        "visual": null,
        "id": "mat_sec_factor-v5"
      },
      {
        "enunciado": "Cada término se multiplica por 2: 5, 10, 20. ¿Qué número sigue?",
        "respuesta_correcta": "40",
        "opciones": [
          "50",
          "40",
          "41"
        ],
        "paso_resuelto": "20 × 2 = 40.",
        "visual": null,
        "id": "mat_sec_factor-v6"
      }
    ]
  },
  {
    "id": "mat_sec_fibonacci",
    "tema": "secuencias_geometricas_fibonacci",
    "titulo": "Sumar los dos anteriores",
    "explicacion": "Otra regla consiste en sumar los dos términos anteriores para obtener el siguiente. Necesitamos conservar ambos, no solo el último. La secuencia de Fibonacci usa esta regla comenzando con 1 y 1.",
    "ejemplo": "1, 1, 2, 3, 5 continúa con 8.",
    "pasos": [
      "2 + 3 = 5.",
      "Para seguir usamos 3 + 5 = 8."
    ],
    "pista": "Marcá los últimos dos términos y sumalos.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Cada término nuevo suma los dos anteriores: 1, 1, 2, 3. ¿Qué número sigue?",
        "respuesta_correcta": "5",
        "opciones": [
          "5",
          "6",
          "15"
        ],
        "paso_resuelto": "Los últimos son 2 y 3.\n2 + 3 = 5.",
        "visual": null,
        "id": "mat_sec_fibonacci-v1"
      },
      {
        "enunciado": "Cada término nuevo suma los dos anteriores: 1, 2, 3, 5. ¿Qué número sigue?",
        "respuesta_correcta": "8",
        "opciones": [
          "9",
          "18",
          "8"
        ],
        "paso_resuelto": "Los últimos son 3 y 5.\n3 + 5 = 8.",
        "visual": null,
        "id": "mat_sec_fibonacci-v2"
      },
      {
        "enunciado": "Cada término nuevo suma los dos anteriores: 2, 3, 5, 8. ¿Qué número sigue?",
        "respuesta_correcta": "13",
        "opciones": [
          "23",
          "13",
          "14"
        ],
        "paso_resuelto": "Los últimos son 5 y 8.\n5 + 8 = 13.",
        "visual": null,
        "id": "mat_sec_fibonacci-v3"
      },
      {
        "enunciado": "Cada término nuevo suma los dos anteriores: 3, 4, 7, 11. ¿Qué número sigue?",
        "respuesta_correcta": "18",
        "opciones": [
          "18",
          "19",
          "28"
        ],
        "paso_resuelto": "Los últimos son 7 y 11.\n7 + 11 = 18.",
        "visual": null,
        "id": "mat_sec_fibonacci-v4"
      },
      {
        "enunciado": "Cada término nuevo suma los dos anteriores: 2, 5, 7, 12. ¿Qué número sigue?",
        "respuesta_correcta": "19",
        "opciones": [
          "20",
          "29",
          "19"
        ],
        "paso_resuelto": "Los últimos son 7 y 12.\n7 + 12 = 19.",
        "visual": null,
        "id": "mat_sec_fibonacci-v5"
      },
      {
        "enunciado": "Cada término nuevo suma los dos anteriores: 4, 5, 9, 14. ¿Qué número sigue?",
        "respuesta_correcta": "23",
        "opciones": [
          "33",
          "23",
          "24"
        ],
        "paso_resuelto": "Los últimos son 9 y 14.\n9 + 14 = 23.",
        "visual": null,
        "id": "mat_sec_fibonacci-v6"
      }
    ]
  },
  {
    "id": "mat_sec_ciclo",
    "tema": "secuencias_alfanumericas_y_figuras",
    "titulo": "Un bloque que se repite",
    "explicacion": "En un patrón repetitivo se repite un bloque completo, como rojo, azul, verde. Para continuar buscamos dónde termina el bloque y volvemos a empezar.",
    "ejemplo": "Rojo, azul, verde, rojo, azul continúa con verde.",
    "pasos": [
      "El bloque es rojo, azul, verde.",
      "Después de azul viene verde."
    ],
    "pista": "Separá el patrón en bloques iguales.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Repetimos el bloque rojo, azul, verde. La fila termina en azul, posición 5. ¿Qué sigue?",
        "respuesta_correcta": "verde",
        "opciones": [
          "verde",
          "rojo",
          "azul"
        ],
        "paso_resuelto": "La posición siguiente en el bloque corresponde a verde.",
        "visual": null,
        "id": "mat_sec_ciclo-v1"
      },
      {
        "enunciado": "Repetimos el bloque círculo, cuadrado. La fila termina en círculo, posición 3. ¿Qué sigue?",
        "respuesta_correcta": "cuadrado",
        "opciones": [
          "círculo",
          "cuadrado"
        ],
        "paso_resuelto": "La posición siguiente en el bloque corresponde a cuadrado.",
        "visual": null,
        "id": "mat_sec_ciclo-v2"
      },
      {
        "enunciado": "Repetimos el bloque sol, luna, estrella. La fila termina en estrella, posición 6. ¿Qué sigue?",
        "respuesta_correcta": "sol",
        "opciones": [
          "estrella",
          "sol",
          "luna"
        ],
        "paso_resuelto": "La posición siguiente en el bloque corresponde a sol.",
        "visual": null,
        "id": "mat_sec_ciclo-v3"
      },
      {
        "enunciado": "Repetimos el bloque A, B, C. La fila termina en A, posición 4. ¿Qué sigue?",
        "respuesta_correcta": "B",
        "opciones": [
          "B",
          "A",
          "C"
        ],
        "paso_resuelto": "La posición siguiente en el bloque corresponde a B.",
        "visual": null,
        "id": "mat_sec_ciclo-v4"
      },
      {
        "enunciado": "Repetimos el bloque grande, pequeño. La fila termina en pequeño, posición 4. ¿Qué sigue?",
        "respuesta_correcta": "grande",
        "opciones": [
          "grande",
          "pequeño"
        ],
        "paso_resuelto": "La posición siguiente en el bloque corresponde a grande.",
        "visual": null,
        "id": "mat_sec_ciclo-v5"
      },
      {
        "enunciado": "Repetimos el bloque uno, dos, tres. La fila termina en uno, posición 7. ¿Qué sigue?",
        "respuesta_correcta": "dos",
        "opciones": [
          "tres",
          "dos",
          "uno"
        ],
        "paso_resuelto": "La posición siguiente en el bloque corresponde a dos.",
        "visual": null,
        "id": "mat_sec_ciclo-v6"
      }
    ]
  },
  {
    "id": "mat_sec_dos_reglas",
    "tema": "secuencias_alfanumericas_y_figuras",
    "titulo": "Separar letras y números",
    "explicacion": "Una secuencia puede combinar dos reglas. Leemos las letras por un lado y los números por otro. En A1, B3, C5, las letras avanzan una posición y los números aumentan dos.",
    "ejemplo": "A1, B3, C5 continúa con D7.",
    "pasos": [
      "A, B, C continúa con D.",
      "1, 3, 5 continúa con 7. Juntamos D7."
    ],
    "pista": "Seguí cada regla por separado y después unilas.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Las letras avanzan una posición; los números suman 2. A1, B3, C5. ¿Qué sigue?",
        "respuesta_correcta": "D7",
        "opciones": [
          "D7",
          "C7",
          "D5"
        ],
        "paso_resuelto": "Después de C viene D; 5 + 2 = 7.",
        "visual": null,
        "id": "mat_sec_dos_reglas-v1"
      },
      {
        "enunciado": "Las letras avanzan una posición; los números suman 3. A2, B5, C8. ¿Qué sigue?",
        "respuesta_correcta": "D11",
        "opciones": [
          "C11",
          "D8",
          "D11"
        ],
        "paso_resuelto": "Después de C viene D; 8 + 3 = 11.",
        "visual": null,
        "id": "mat_sec_dos_reglas-v2"
      },
      {
        "enunciado": "Las letras avanzan una posición; los números suman 4. A3, B7, C11. ¿Qué sigue?",
        "respuesta_correcta": "D15",
        "opciones": [
          "D11",
          "D15",
          "C15"
        ],
        "paso_resuelto": "Después de C viene D; 11 + 4 = 15.",
        "visual": null,
        "id": "mat_sec_dos_reglas-v3"
      },
      {
        "enunciado": "Las letras avanzan una posición; los números suman 5. A4, B9, C14. ¿Qué sigue?",
        "respuesta_correcta": "D19",
        "opciones": [
          "D19",
          "C19",
          "D14"
        ],
        "paso_resuelto": "Después de C viene D; 14 + 5 = 19.",
        "visual": null,
        "id": "mat_sec_dos_reglas-v4"
      },
      {
        "enunciado": "Las letras avanzan una posición; los números suman 2. A5, B7, C9. ¿Qué sigue?",
        "respuesta_correcta": "D11",
        "opciones": [
          "C11",
          "D9",
          "D11"
        ],
        "paso_resuelto": "Después de C viene D; 9 + 2 = 11.",
        "visual": null,
        "id": "mat_sec_dos_reglas-v5"
      },
      {
        "enunciado": "Las letras avanzan una posición; los números suman 3. A6, B9, C12. ¿Qué sigue?",
        "respuesta_correcta": "D15",
        "opciones": [
          "D12",
          "D15",
          "C15"
        ],
        "paso_resuelto": "Después de C viene D; 12 + 3 = 15.",
        "visual": null,
        "id": "mat_sec_dos_reglas-v6"
      }
    ]
  },
  {
    "id": "mat_igual_simbolo",
    "tema": "ecuaciones_con_imagenes_2_incognitas",
    "titulo": "El mismo símbolo conserva su valor",
    "explicacion": "En estos acertijos, el mismo símbolo representa siempre la misma cantidad. Dos soles que suman 12 valen 6 cada uno. La igualdad indica que ambos lados tienen el mismo valor.",
    "ejemplo": "sol + sol = 12: cada sol vale 6.",
    "pasos": [
      "Hay dos cantidades iguales que suman 12.",
      "12 ÷ 2 = 6; comprobamos 6 + 6 = 12."
    ],
    "pista": "Contá cuántas veces aparece el mismo símbolo.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "sol + sol = 12. ¿Cuánto vale un sol?",
        "respuesta_correcta": "6",
        "opciones": [
          "6",
          "7",
          "16"
        ],
        "paso_resuelto": "Dos soles suman 12; uno vale 12 ÷ 2 = 6.",
        "visual": null,
        "id": "mat_igual_simbolo-v1"
      },
      {
        "enunciado": "sol + sol = 8. ¿Cuánto vale un sol?",
        "respuesta_correcta": "4",
        "opciones": [
          "5",
          "14",
          "4"
        ],
        "paso_resuelto": "Dos soles suman 8; uno vale 8 ÷ 2 = 4.",
        "visual": null,
        "id": "mat_igual_simbolo-v2"
      },
      {
        "enunciado": "sol + sol = 10. ¿Cuánto vale un sol?",
        "respuesta_correcta": "5",
        "opciones": [
          "15",
          "5",
          "6"
        ],
        "paso_resuelto": "Dos soles suman 10; uno vale 10 ÷ 2 = 5.",
        "visual": null,
        "id": "mat_igual_simbolo-v3"
      },
      {
        "enunciado": "sol + sol = 14. ¿Cuánto vale un sol?",
        "respuesta_correcta": "7",
        "opciones": [
          "7",
          "8",
          "17"
        ],
        "paso_resuelto": "Dos soles suman 14; uno vale 14 ÷ 2 = 7.",
        "visual": null,
        "id": "mat_igual_simbolo-v4"
      },
      {
        "enunciado": "sol + sol = 16. ¿Cuánto vale un sol?",
        "respuesta_correcta": "8",
        "opciones": [
          "9",
          "18",
          "8"
        ],
        "paso_resuelto": "Dos soles suman 16; uno vale 16 ÷ 2 = 8.",
        "visual": null,
        "id": "mat_igual_simbolo-v5"
      },
      {
        "enunciado": "sol + sol = 18. ¿Cuánto vale un sol?",
        "respuesta_correcta": "9",
        "opciones": [
          "19",
          "9",
          "10"
        ],
        "paso_resuelto": "Dos soles suman 18; uno vale 18 ÷ 2 = 9.",
        "visual": null,
        "id": "mat_igual_simbolo-v6"
      }
    ]
  },
  {
    "id": "mat_igual_dos",
    "tema": "ecuaciones_con_imagenes_2_incognitas",
    "titulo": "Reemplazar lo conocido para hallar lo que falta",
    "explicacion": "Si encontramos el valor de un símbolo, podemos reemplazarlo en otra igualdad. Después buscamos cuánto falta para completar el total. Comprobamos los dos resultados.",
    "ejemplo": "sol + sol = 12 y sol + luna = 10: luna vale 4.",
    "pasos": [
      "Cada sol vale 12 ÷ 2 = 6.",
      "6 + luna = 10; entonces luna = 10 − 6 = 4."
    ],
    "pista": "Primero resolvé el símbolo repetido; después reemplazalo.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "sol + sol = 12; sol + luna = 10. ¿Cuánto vale luna?",
        "respuesta_correcta": "4",
        "opciones": [
          "4",
          "6",
          "10"
        ],
        "paso_resuelto": "Sol = 12 ÷ 2 = 6.\nLuna = 10 − 6 = 4.",
        "visual": null,
        "id": "mat_igual_dos-v1"
      },
      {
        "enunciado": "sol + sol = 8; sol + luna = 11. ¿Cuánto vale luna?",
        "respuesta_correcta": "7",
        "opciones": [
          "4",
          "11",
          "7"
        ],
        "paso_resuelto": "Sol = 8 ÷ 2 = 4.\nLuna = 11 − 4 = 7.",
        "visual": null,
        "id": "mat_igual_dos-v2"
      },
      {
        "enunciado": "sol + sol = 10; sol + luna = 8. ¿Cuánto vale luna?",
        "respuesta_correcta": "3",
        "opciones": [
          "8",
          "3",
          "5"
        ],
        "paso_resuelto": "Sol = 10 ÷ 2 = 5.\nLuna = 8 − 5 = 3.",
        "visual": null,
        "id": "mat_igual_dos-v3"
      },
      {
        "enunciado": "sol + sol = 14; sol + luna = 9. ¿Cuánto vale luna?",
        "respuesta_correcta": "2",
        "opciones": [
          "2",
          "7",
          "9"
        ],
        "paso_resuelto": "Sol = 14 ÷ 2 = 7.\nLuna = 9 − 7 = 2.",
        "visual": null,
        "id": "mat_igual_dos-v4"
      },
      {
        "enunciado": "sol + sol = 16; sol + luna = 13. ¿Cuánto vale luna?",
        "respuesta_correcta": "5",
        "opciones": [
          "8",
          "13",
          "5"
        ],
        "paso_resuelto": "Sol = 16 ÷ 2 = 8.\nLuna = 13 − 8 = 5.",
        "visual": null,
        "id": "mat_igual_dos-v5"
      },
      {
        "enunciado": "sol + sol = 18; sol + luna = 15. ¿Cuánto vale luna?",
        "respuesta_correcta": "6",
        "opciones": [
          "15",
          "6",
          "9"
        ],
        "paso_resuelto": "Sol = 18 ÷ 2 = 9.\nLuna = 15 − 9 = 6.",
        "visual": null,
        "id": "mat_igual_dos-v6"
      }
    ]
  }
]);

// FIN R9



// R10: pasos intermedios.
const PROFUNDIZACION = [
  {
    "id": "prof_frac_amplificar",
    "tema": "fracciones_concepto",
    "despues_de": "frac_con_4_equivalencias_visuales",
    "titulo": "Más cortes, la misma cantidad",
    "explicacion": "Amplificar es multiplicar el numerador y el denominador por el mismo natural distinto de cero. Cambian los cortes y las partes contadas, pero no la cantidad del entero que tomamos. No alcanza con multiplicar solo arriba.",
    "ejemplo": "2/3 = 4/6: multiplicamos arriba y abajo por 2.",
    "pasos": [
      "Cada tercio se divide en dos partes: ahora hay 6 sextos.",
      "Los 2 tercios ocupan 4 sextos: (2 × 2)/(3 × 2) = 4/6."
    ],
    "pista": "Usá el mismo factor arriba y abajo.",
    "visual": [
      {
        "label": "Antes: 2/3",
        "partes": [
          1,
          1,
          1
        ],
        "pintadas": 2
      },
      {
        "label": "Después: 4/6",
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
    "actividades": [
      {
        "enunciado": "Amplificá 2/3 multiplicando numerador y denominador por 2.",
        "respuesta_correcta": "4/6",
        "opciones": [
          "4/6",
          "4/3",
          "2/6"
        ],
        "paso_resuelto": "Arriba: 2 × 2 = 4.\nAbajo: 3 × 2 = 6. La fracción es 4/6.",
        "visual": null,
        "id": "prof_frac_amplificar-v1"
      },
      {
        "enunciado": "Amplificá 1/4 multiplicando numerador y denominador por 3.",
        "respuesta_correcta": "3/12",
        "opciones": [
          "3/4",
          "1/12",
          "3/12"
        ],
        "paso_resuelto": "Arriba: 1 × 3 = 3.\nAbajo: 4 × 3 = 12. La fracción es 3/12.",
        "visual": null,
        "id": "prof_frac_amplificar-v2"
      },
      {
        "enunciado": "Amplificá 3/5 multiplicando numerador y denominador por 2.",
        "respuesta_correcta": "6/10",
        "opciones": [
          "3/10",
          "6/10",
          "6/5"
        ],
        "paso_resuelto": "Arriba: 3 × 2 = 6.\nAbajo: 5 × 2 = 10. La fracción es 6/10.",
        "visual": null,
        "id": "prof_frac_amplificar-v3"
      },
      {
        "enunciado": "Amplificá 2/7 multiplicando numerador y denominador por 3.",
        "respuesta_correcta": "6/21",
        "opciones": [
          "6/21",
          "6/7",
          "2/21"
        ],
        "paso_resuelto": "Arriba: 2 × 3 = 6.\nAbajo: 7 × 3 = 21. La fracción es 6/21.",
        "visual": null,
        "id": "prof_frac_amplificar-v4"
      },
      {
        "enunciado": "Amplificá 3/4 multiplicando numerador y denominador por 4.",
        "respuesta_correcta": "12/16",
        "opciones": [
          "12/4",
          "3/16",
          "12/16"
        ],
        "paso_resuelto": "Arriba: 3 × 4 = 12.\nAbajo: 4 × 4 = 16. La fracción es 12/16.",
        "visual": null,
        "id": "prof_frac_amplificar-v5"
      },
      {
        "enunciado": "Amplificá 4/5 multiplicando numerador y denominador por 3.",
        "respuesta_correcta": "12/15",
        "opciones": [
          "4/15",
          "12/15",
          "12/5"
        ],
        "paso_resuelto": "Arriba: 4 × 3 = 12.\nAbajo: 5 × 3 = 15. La fracción es 12/15.",
        "visual": null,
        "id": "prof_frac_amplificar-v6"
      }
    ]
  },
  {
    "id": "prof_frac_simplificar",
    "tema": "fracciones_concepto",
    "despues_de": "prof_frac_amplificar",
    "titulo": "Menos cortes, la misma cantidad",
    "explicacion": "Simplificar es dividir numerador y denominador por un mismo divisor mayor que uno. La cantidad representada no cambia. Si ya no tienen divisores comunes mayores que uno, la fracción es irreducible.",
    "ejemplo": "6/8 = 3/4: dividimos arriba y abajo por 2.",
    "pasos": [
      "6 ÷ 2 = 3 y 8 ÷ 2 = 4.",
      "3 y 4 no comparten un divisor mayor que 1: terminamos."
    ],
    "pista": "Buscá un número que divida exactamente arriba y abajo.",
    "visual": [
      {
        "label": "6/8",
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
        "pintadas": 6
      },
      {
        "label": "3/4",
        "partes": [
          1,
          1,
          1,
          1
        ],
        "pintadas": 3
      }
    ],
    "actividades": [
      {
        "enunciado": "Simplificá 6/8 dividiendo numerador y denominador por 2.",
        "respuesta_correcta": "3/4",
        "opciones": [
          "3/4",
          "3/8",
          "6/4"
        ],
        "paso_resuelto": "6 ÷ 2 = 3; 8 ÷ 2 = 4.\nQueda 3/4, con el mismo valor.",
        "visual": null,
        "id": "prof_frac_simplificar-v1"
      },
      {
        "enunciado": "Simplificá 4/10 dividiendo numerador y denominador por 2.",
        "respuesta_correcta": "2/5",
        "opciones": [
          "2/10",
          "4/5",
          "2/5"
        ],
        "paso_resuelto": "4 ÷ 2 = 2; 10 ÷ 2 = 5.\nQueda 2/5, con el mismo valor.",
        "visual": null,
        "id": "prof_frac_simplificar-v2"
      },
      {
        "enunciado": "Simplificá 9/12 dividiendo numerador y denominador por 3.",
        "respuesta_correcta": "3/4",
        "opciones": [
          "9/4",
          "3/4",
          "3/12"
        ],
        "paso_resuelto": "9 ÷ 3 = 3; 12 ÷ 3 = 4.\nQueda 3/4, con el mismo valor.",
        "visual": null,
        "id": "prof_frac_simplificar-v3"
      },
      {
        "enunciado": "Simplificá 10/15 dividiendo numerador y denominador por 5.",
        "respuesta_correcta": "2/3",
        "opciones": [
          "2/3",
          "2/15",
          "10/3"
        ],
        "paso_resuelto": "10 ÷ 5 = 2; 15 ÷ 5 = 3.\nQueda 2/3, con el mismo valor.",
        "visual": null,
        "id": "prof_frac_simplificar-v4"
      },
      {
        "enunciado": "Simplificá 12/20 dividiendo numerador y denominador por 4.",
        "respuesta_correcta": "3/5",
        "opciones": [
          "3/20",
          "12/5",
          "3/5"
        ],
        "paso_resuelto": "12 ÷ 4 = 3; 20 ÷ 4 = 5.\nQueda 3/5, con el mismo valor.",
        "visual": null,
        "id": "prof_frac_simplificar-v5"
      },
      {
        "enunciado": "Simplificá 14/21 dividiendo numerador y denominador por 7.",
        "respuesta_correcta": "2/3",
        "opciones": [
          "14/3",
          "2/3",
          "2/21"
        ],
        "paso_resuelto": "14 ÷ 7 = 2; 21 ÷ 7 = 3.\nQueda 2/3, con el mismo valor.",
        "visual": null,
        "id": "prof_frac_simplificar-v6"
      }
    ]
  },
  {
    "id": "prof_frac_comparar_denominador",
    "tema": "fracciones_concepto",
    "despues_de": "prof_frac_simplificar",
    "titulo": "Comparar partes del mismo tamaño",
    "explicacion": "Si las fracciones tienen el mismo denominador y se refieren al mismo entero, sus partes tienen el mismo tamaño. Es mayor la que toma más partes: la de numerador mayor.",
    "ejemplo": "3/5 es mayor que 2/5.",
    "pasos": [
      "Ambas cuentan quintos del mismo entero.",
      "Tres quintos ocupan más que dos quintos."
    ],
    "pista": "Con el mismo denominador, compará los numeradores.",
    "visual": [
      {
        "label": "3/5",
        "partes": [
          1,
          1,
          1,
          1,
          1
        ],
        "pintadas": 3
      },
      {
        "label": "2/5",
        "partes": [
          1,
          1,
          1,
          1,
          1
        ],
        "pintadas": 2
      }
    ],
    "actividades": [
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 3/5 o 2/5?",
        "respuesta_correcta": "3/5",
        "opciones": [
          "3/5",
          "2/5",
          "Son iguales"
        ],
        "paso_resuelto": "Las partes son del mismo tamaño. 3 partes son más que 2.",
        "visual": [
          {
            "label": "3/5",
            "partes": [
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 3
          },
          {
            "label": "2/5",
            "partes": [
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 2
          }
        ],
        "id": "prof_frac_comparar_denominador-v1"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 1/4 o 3/4?",
        "respuesta_correcta": "3/4",
        "opciones": [
          "1/4",
          "Son iguales",
          "3/4"
        ],
        "paso_resuelto": "Las partes son del mismo tamaño. 3 partes son más que 1.",
        "visual": [
          {
            "label": "1/4",
            "partes": [
              1,
              1,
              1,
              1
            ],
            "pintadas": 1
          },
          {
            "label": "3/4",
            "partes": [
              1,
              1,
              1,
              1
            ],
            "pintadas": 3
          }
        ],
        "id": "prof_frac_comparar_denominador-v2"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 4/7 o 2/7?",
        "respuesta_correcta": "4/7",
        "opciones": [
          "Son iguales",
          "4/7",
          "2/7"
        ],
        "paso_resuelto": "Las partes son del mismo tamaño. 4 partes son más que 2.",
        "visual": [
          {
            "label": "4/7",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 4
          },
          {
            "label": "2/7",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 2
          }
        ],
        "id": "prof_frac_comparar_denominador-v3"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 2/6 o 5/6?",
        "respuesta_correcta": "5/6",
        "opciones": [
          "5/6",
          "2/6",
          "Son iguales"
        ],
        "paso_resuelto": "Las partes son del mismo tamaño. 5 partes son más que 2.",
        "visual": [
          {
            "label": "2/6",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 2
          },
          {
            "label": "5/6",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 5
          }
        ],
        "id": "prof_frac_comparar_denominador-v4"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 5/8 o 3/8?",
        "respuesta_correcta": "5/8",
        "opciones": [
          "3/8",
          "Son iguales",
          "5/8"
        ],
        "paso_resuelto": "Las partes son del mismo tamaño. 5 partes son más que 3.",
        "visual": [
          {
            "label": "5/8",
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
            "pintadas": 5
          },
          {
            "label": "3/8",
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
            "pintadas": 3
          }
        ],
        "id": "prof_frac_comparar_denominador-v5"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 3/10 o 7/10?",
        "respuesta_correcta": "7/10",
        "opciones": [
          "Son iguales",
          "7/10",
          "3/10"
        ],
        "paso_resuelto": "Las partes son del mismo tamaño. 7 partes son más que 3.",
        "visual": [
          {
            "label": "3/10",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 3
          },
          {
            "label": "7/10",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 7
          }
        ],
        "id": "prof_frac_comparar_denominador-v6"
      }
    ]
  },
  {
    "id": "prof_frac_comparar_numerador",
    "tema": "fracciones_concepto",
    "despues_de": "prof_frac_comparar_denominador",
    "titulo": "Igual cantidad de partes, distinto tamaño",
    "explicacion": "Cuando tomamos la misma cantidad de partes del mismo entero, importa el tamaño de cada parte. Si el entero se divide en más partes iguales, cada parte es más pequeña. Por eso 1/3 es mayor que 1/5.",
    "ejemplo": "2/3 es mayor que 2/5 del mismo entero.",
    "pasos": [
      "En ambos casos tomamos 2 partes.",
      "Cada tercio es más grande que cada quinto. Dos tercios ocupan más."
    ],
    "pista": "Con igual numerador positivo, el denominador menor indica partes más grandes.",
    "visual": [
      {
        "label": "2/3",
        "partes": [
          1,
          1,
          1
        ],
        "pintadas": 2
      },
      {
        "label": "2/5",
        "partes": [
          1,
          1,
          1,
          1,
          1
        ],
        "pintadas": 2
      }
    ],
    "actividades": [
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 2/3 o 2/5?",
        "respuesta_correcta": "2/3",
        "opciones": [
          "2/3",
          "2/5",
          "Son iguales"
        ],
        "paso_resuelto": "Tomamos 2 partes en ambos casos. Las partes en 3 son mayores que las partes en 5.",
        "visual": [
          {
            "label": "2/3",
            "partes": [
              1,
              1,
              1
            ],
            "pintadas": 2
          },
          {
            "label": "2/5",
            "partes": [
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 2
          }
        ],
        "id": "prof_frac_comparar_numerador-v1"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 1/6 o 1/4?",
        "respuesta_correcta": "1/4",
        "opciones": [
          "1/6",
          "Son iguales",
          "1/4"
        ],
        "paso_resuelto": "Tomamos 1 partes en ambos casos. Las partes en 4 son mayores que las partes en 6.",
        "visual": [
          {
            "label": "1/6",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 1
          },
          {
            "label": "1/4",
            "partes": [
              1,
              1,
              1,
              1
            ],
            "pintadas": 1
          }
        ],
        "id": "prof_frac_comparar_numerador-v2"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 3/4 o 3/7?",
        "respuesta_correcta": "3/4",
        "opciones": [
          "Son iguales",
          "3/4",
          "3/7"
        ],
        "paso_resuelto": "Tomamos 3 partes en ambos casos. Las partes en 4 son mayores que las partes en 7.",
        "visual": [
          {
            "label": "3/4",
            "partes": [
              1,
              1,
              1,
              1
            ],
            "pintadas": 3
          },
          {
            "label": "3/7",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 3
          }
        ],
        "id": "prof_frac_comparar_numerador-v3"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 2/8 o 2/5?",
        "respuesta_correcta": "2/5",
        "opciones": [
          "2/5",
          "2/8",
          "Son iguales"
        ],
        "paso_resuelto": "Tomamos 2 partes en ambos casos. Las partes en 5 son mayores que las partes en 8.",
        "visual": [
          {
            "label": "2/8",
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
            "pintadas": 2
          },
          {
            "label": "2/5",
            "partes": [
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 2
          }
        ],
        "id": "prof_frac_comparar_numerador-v4"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 4/5 o 4/9?",
        "respuesta_correcta": "4/5",
        "opciones": [
          "4/9",
          "Son iguales",
          "4/5"
        ],
        "paso_resuelto": "Tomamos 4 partes en ambos casos. Las partes en 5 son mayores que las partes en 9.",
        "visual": [
          {
            "label": "4/5",
            "partes": [
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 4
          },
          {
            "label": "4/9",
            "partes": [
              1,
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
        ],
        "id": "prof_frac_comparar_numerador-v5"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 3/10 o 3/8?",
        "respuesta_correcta": "3/8",
        "opciones": [
          "Son iguales",
          "3/8",
          "3/10"
        ],
        "paso_resuelto": "Tomamos 3 partes en ambos casos. Las partes en 8 son mayores que las partes en 10.",
        "visual": [
          {
            "label": "3/10",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 3
          },
          {
            "label": "3/8",
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
            "pintadas": 3
          }
        ],
        "id": "prof_frac_comparar_numerador-v6"
      }
    ]
  },
  {
    "id": "prof_frac_clasificar",
    "tema": "fracciones_concepto",
    "despues_de": "prof_frac_comparar_numerador",
    "titulo": "Fracciones menores, mayores o iguales a enteros",
    "explicacion": "En el cuadernillo, una fracción propia tiene numerador menor que el denominador. Es aparente si el numerador es múltiplo del denominador: representa un entero. Si el numerador es mayor y no es múltiplo, la llamamos impropia.",
    "ejemplo": "3/4 es propia; 5/4 es impropia; 8/4 es aparente.",
    "pasos": [
      "Primero comprobamos si representa un entero: 8 ÷ 4 = 2.",
      "Si no, comparamos arriba y abajo: 3 < 4 y 5 > 4."
    ],
    "pista": "Primero fijate si la división es exacta; después compará arriba y abajo.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Según la clasificación del cuadernillo, ¿qué tipo de fracción es 3/4?",
        "respuesta_correcta": "propia",
        "opciones": [
          "propia",
          "impropia",
          "aparente"
        ],
        "paso_resuelto": "3 < 4: representa menos de un entero.",
        "visual": null,
        "id": "prof_frac_clasificar-v1"
      },
      {
        "enunciado": "Según la clasificación del cuadernillo, ¿qué tipo de fracción es 7/5?",
        "respuesta_correcta": "impropia",
        "opciones": [
          "propia",
          "aparente",
          "impropia"
        ],
        "paso_resuelto": "7 > 5 y 7 no es múltiplo de 5.",
        "visual": null,
        "id": "prof_frac_clasificar-v2"
      },
      {
        "enunciado": "Según la clasificación del cuadernillo, ¿qué tipo de fracción es 12/4?",
        "respuesta_correcta": "aparente",
        "opciones": [
          "impropia",
          "aparente",
          "propia"
        ],
        "paso_resuelto": "12 ÷ 4 = 3: representa tres enteros.",
        "visual": null,
        "id": "prof_frac_clasificar-v3"
      },
      {
        "enunciado": "Según la clasificación del cuadernillo, ¿qué tipo de fracción es 5/8?",
        "respuesta_correcta": "propia",
        "opciones": [
          "propia",
          "impropia",
          "aparente"
        ],
        "paso_resuelto": "5 < 8: representa menos de un entero.",
        "visual": null,
        "id": "prof_frac_clasificar-v4"
      },
      {
        "enunciado": "Según la clasificación del cuadernillo, ¿qué tipo de fracción es 11/6?",
        "respuesta_correcta": "impropia",
        "opciones": [
          "propia",
          "aparente",
          "impropia"
        ],
        "paso_resuelto": "11 > 6 y 11 no es múltiplo de 6.",
        "visual": null,
        "id": "prof_frac_clasificar-v5"
      },
      {
        "enunciado": "Según la clasificación del cuadernillo, ¿qué tipo de fracción es 9/9?",
        "respuesta_correcta": "aparente",
        "opciones": [
          "impropia",
          "aparente",
          "propia"
        ],
        "paso_resuelto": "9 ÷ 9 = 1: representa un entero.",
        "visual": null,
        "id": "prof_frac_clasificar-v6"
      }
    ]
  },
  {
    "id": "prof_frac_a_mixto",
    "tema": "fracciones_concepto",
    "despues_de": "prof_frac_clasificar",
    "titulo": "Agrupar partes para formar enteros",
    "explicacion": "Un número mixto escribe por separado los enteros y la fracción que sobra. En 7/4, cada grupo de cuatro cuartos forma un entero. Podemos dividir 7 entre 4: cociente 1 y resto 3.",
    "ejemplo": "7/4 = 1 3/4, que significa 1 + 3/4.",
    "pasos": [
      "Agrupamos 4 de los 7 cuartos: forman 1 entero.",
      "Sobran 3 cuartos: escribimos 1 3/4."
    ],
    "pista": "Cada grupo del tamaño del denominador forma un entero.",
    "visual": [
      {
        "label": "Un entero: 4/4",
        "partes": [
          1,
          1,
          1,
          1
        ],
        "pintadas": 4
      },
      {
        "label": "Lo que sobra: 3/4",
        "partes": [
          1,
          1,
          1,
          1
        ],
        "pintadas": 3
      }
    ],
    "actividades": [
      {
        "enunciado": "Escribí 7/4 como número mixto.",
        "respuesta_correcta": "1 3/4",
        "opciones": [
          "1 3/4",
          "3 1/4",
          "1 3/7"
        ],
        "paso_resuelto": "7 ÷ 4: cociente 1, resto 3.\nSon 1 enteros y 3/4.",
        "visual": null,
        "id": "prof_frac_a_mixto-v1"
      },
      {
        "enunciado": "Escribí 8/3 como número mixto.",
        "respuesta_correcta": "2 2/3",
        "opciones": [
          "2 2/8",
          "2 2/3"
        ],
        "paso_resuelto": "8 ÷ 3: cociente 2, resto 2.\nSon 2 enteros y 2/3.",
        "visual": null,
        "id": "prof_frac_a_mixto-v2"
      },
      {
        "enunciado": "Escribí 11/4 como número mixto.",
        "respuesta_correcta": "2 3/4",
        "opciones": [
          "2 3/11",
          "2 3/4",
          "3 2/4"
        ],
        "paso_resuelto": "11 ÷ 4: cociente 2, resto 3.\nSon 2 enteros y 3/4.",
        "visual": null,
        "id": "prof_frac_a_mixto-v3"
      },
      {
        "enunciado": "Escribí 13/5 como número mixto.",
        "respuesta_correcta": "2 3/5",
        "opciones": [
          "2 3/5",
          "3 2/5",
          "2 3/13"
        ],
        "paso_resuelto": "13 ÷ 5: cociente 2, resto 3.\nSon 2 enteros y 3/5.",
        "visual": null,
        "id": "prof_frac_a_mixto-v4"
      },
      {
        "enunciado": "Escribí 17/6 como número mixto.",
        "respuesta_correcta": "2 5/6",
        "opciones": [
          "5 2/6",
          "2 5/17",
          "2 5/6"
        ],
        "paso_resuelto": "17 ÷ 6: cociente 2, resto 5.\nSon 2 enteros y 5/6.",
        "visual": null,
        "id": "prof_frac_a_mixto-v5"
      },
      {
        "enunciado": "Escribí 19/8 como número mixto.",
        "respuesta_correcta": "2 3/8",
        "opciones": [
          "2 3/19",
          "2 3/8",
          "3 2/8"
        ],
        "paso_resuelto": "19 ÷ 8: cociente 2, resto 3.\nSon 2 enteros y 3/8.",
        "visual": null,
        "id": "prof_frac_a_mixto-v6"
      }
    ]
  },
  {
    "id": "prof_frac_desde_mixto",
    "tema": "fracciones_concepto",
    "despues_de": "prof_frac_a_mixto",
    "titulo": "Contar todas las partes de un mixto",
    "explicacion": "Para convertir un mixto en una fracción, contamos las partes de sus enteros y sumamos las que sobran. Conservamos el denominador: las partes siguen teniendo el mismo tamaño.",
    "ejemplo": "2 1/3 = 7/3.",
    "pasos": [
      "Dos enteros contienen 2 × 3 = 6 tercios.",
      "Sumamos el tercio que sobra: 6 + 1 = 7 tercios."
    ],
    "pista": "Multiplicá los enteros por el denominador y sumá el numerador.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Convertí el número mixto 2 1/3 en una fracción.",
        "respuesta_correcta": "7/3",
        "opciones": [
          "7/3",
          "3/3",
          "6/4"
        ],
        "paso_resuelto": "2 enteros contienen 2 × 3 = 6 partes.\n6 + 1 = 7: queda 7/3.",
        "visual": null,
        "id": "prof_frac_desde_mixto-v1"
      },
      {
        "enunciado": "Convertí el número mixto 1 3/4 en una fracción.",
        "respuesta_correcta": "7/4",
        "opciones": [
          "4/4",
          "4/7",
          "7/4"
        ],
        "paso_resuelto": "1 enteros contienen 1 × 4 = 4 partes.\n4 + 3 = 7: queda 7/4.",
        "visual": null,
        "id": "prof_frac_desde_mixto-v2"
      },
      {
        "enunciado": "Convertí el número mixto 3 2/5 en una fracción.",
        "respuesta_correcta": "17/5",
        "opciones": [
          "15/7",
          "17/5",
          "5/5"
        ],
        "paso_resuelto": "3 enteros contienen 3 × 5 = 15 partes.\n15 + 2 = 17: queda 17/5.",
        "visual": null,
        "id": "prof_frac_desde_mixto-v3"
      },
      {
        "enunciado": "Convertí el número mixto 2 3/7 en una fracción.",
        "respuesta_correcta": "17/7",
        "opciones": [
          "17/7",
          "5/7",
          "14/10"
        ],
        "paso_resuelto": "2 enteros contienen 2 × 7 = 14 partes.\n14 + 3 = 17: queda 17/7.",
        "visual": null,
        "id": "prof_frac_desde_mixto-v4"
      },
      {
        "enunciado": "Convertí el número mixto 4 1/6 en una fracción.",
        "respuesta_correcta": "25/6",
        "opciones": [
          "5/6",
          "24/7",
          "25/6"
        ],
        "paso_resuelto": "4 enteros contienen 4 × 6 = 24 partes.\n24 + 1 = 25: queda 25/6.",
        "visual": null,
        "id": "prof_frac_desde_mixto-v5"
      },
      {
        "enunciado": "Convertí el número mixto 3 5/8 en una fracción.",
        "respuesta_correcta": "29/8",
        "opciones": [
          "24/13",
          "29/8",
          "8/8"
        ],
        "paso_resuelto": "3 enteros contienen 3 × 8 = 24 partes.\n24 + 5 = 29: queda 29/8.",
        "visual": null,
        "id": "prof_frac_desde_mixto-v6"
      }
    ]
  },
  {
    "id": "prof_fact_primos",
    "tema": "divisibilidad_primos_mcm_mcd",
    "despues_de": "div_primos_3_primos_compuestos",
    "titulo": "Desarmar un número en factores primos",
    "explicacion": "Factorizar en primos es escribir un número mayor que uno como una multiplicación de números primos. Podemos dividirlo por primos hasta llegar a 1. Comprobamos multiplicando todos los factores.",
    "ejemplo": "12 = 2 × 2 × 3.",
    "pasos": [
      "12 ÷ 2 = 6; 6 ÷ 2 = 3; 3 ÷ 3 = 1.",
      "Los divisores usados son 2, 2 y 3. Su producto vuelve a dar 12."
    ],
    "pista": "Todos los factores deben ser primos y su producto debe dar el número original.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Cuál es la descomposición de 12 en factores primos?",
        "respuesta_correcta": "2 × 2 × 3",
        "opciones": [
          "2 × 2 × 3",
          "12 × 1",
          "6 × 2",
          "2 × 2 × 3 × 2"
        ],
        "paso_resuelto": "Dividimos sucesivamente por primos: 2 × 2 × 3.\nSu producto es 12; cada factor es primo.",
        "visual": null,
        "id": "prof_fact_primos-v1"
      },
      {
        "enunciado": "¿Cuál es la descomposición de 18 en factores primos?",
        "respuesta_correcta": "2 × 3 × 3",
        "opciones": [
          "18 × 1",
          "9 × 2",
          "2 × 3 × 3 × 2",
          "2 × 3 × 3"
        ],
        "paso_resuelto": "Dividimos sucesivamente por primos: 2 × 3 × 3.\nSu producto es 18; cada factor es primo.",
        "visual": null,
        "id": "prof_fact_primos-v2"
      },
      {
        "enunciado": "¿Cuál es la descomposición de 20 en factores primos?",
        "respuesta_correcta": "2 × 2 × 5",
        "opciones": [
          "10 × 2",
          "2 × 2 × 5 × 2",
          "2 × 2 × 5",
          "20 × 1"
        ],
        "paso_resuelto": "Dividimos sucesivamente por primos: 2 × 2 × 5.\nSu producto es 20; cada factor es primo.",
        "visual": null,
        "id": "prof_fact_primos-v3"
      },
      {
        "enunciado": "¿Cuál es la descomposición de 28 en factores primos?",
        "respuesta_correcta": "2 × 2 × 7",
        "opciones": [
          "2 × 2 × 7 × 2",
          "2 × 2 × 7",
          "28 × 1",
          "14 × 2"
        ],
        "paso_resuelto": "Dividimos sucesivamente por primos: 2 × 2 × 7.\nSu producto es 28; cada factor es primo.",
        "visual": null,
        "id": "prof_fact_primos-v4"
      },
      {
        "enunciado": "¿Cuál es la descomposición de 30 en factores primos?",
        "respuesta_correcta": "2 × 3 × 5",
        "opciones": [
          "2 × 3 × 5",
          "30 × 1",
          "15 × 2",
          "2 × 3 × 5 × 2"
        ],
        "paso_resuelto": "Dividimos sucesivamente por primos: 2 × 3 × 5.\nSu producto es 30; cada factor es primo.",
        "visual": null,
        "id": "prof_fact_primos-v5"
      },
      {
        "enunciado": "¿Cuál es la descomposición de 45 en factores primos?",
        "respuesta_correcta": "3 × 3 × 5",
        "opciones": [
          "45 × 1",
          "22 × 2",
          "3 × 3 × 5 × 2",
          "3 × 3 × 5"
        ],
        "paso_resuelto": "Dividimos sucesivamente por primos: 3 × 3 × 5.\nSu producto es 45; cada factor es primo.",
        "visual": null,
        "id": "prof_fact_primos-v6"
      }
    ]
  },
  {
    "id": "prof_fact_mcm",
    "tema": "divisibilidad_primos_mcm_mcd",
    "despues_de": "prof_fact_primos",
    "titulo": "MCM: reunir los factores necesarios",
    "explicacion": "El MCM positivo puede construirse con factores primos. Tomamos cada primo que aparezca en cualquiera de los números, repetido la mayor cantidad de veces que aparezca en uno de ellos. Así el resultado contiene los factores necesarios para ambos.",
    "ejemplo": "12 = 2 × 2 × 3 y 18 = 2 × 3 × 3. Su MCM es 36.",
    "pasos": [
      "Necesitamos dos factores 2 y dos factores 3.",
      "2 × 2 × 3 × 3 = 36. Tanto 12 como 18 dividen exactamente a 36."
    ],
    "pista": "Para el MCM conservá cada primo con la mayor cantidad de repeticiones.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "12 = 2 × 2 × 3; 18 = 2 × 3 × 3. ¿Cuál es el MCM de 12 y 18?",
        "respuesta_correcta": "36",
        "opciones": [
          "36",
          "6",
          "216",
          "30"
        ],
        "paso_resuelto": "Reunimos cada primo con la mayor cantidad de repeticiones: 2 × 2 × 3 × 3.\nSu producto es 36.",
        "visual": null,
        "id": "prof_fact_mcm-v1"
      },
      {
        "enunciado": "8 = 2 × 2 × 2; 12 = 2 × 2 × 3. ¿Cuál es el MCM de 8 y 12?",
        "respuesta_correcta": "24",
        "opciones": [
          "4",
          "96",
          "20",
          "24"
        ],
        "paso_resuelto": "Reunimos cada primo con la mayor cantidad de repeticiones: 2 × 2 × 2 × 3.\nSu producto es 24.",
        "visual": null,
        "id": "prof_fact_mcm-v2"
      },
      {
        "enunciado": "10 = 2 × 5; 15 = 3 × 5. ¿Cuál es el MCM de 10 y 15?",
        "respuesta_correcta": "30",
        "opciones": [
          "150",
          "25",
          "30",
          "5"
        ],
        "paso_resuelto": "Reunimos cada primo con la mayor cantidad de repeticiones: 2 × 3 × 5.\nSu producto es 30.",
        "visual": null,
        "id": "prof_fact_mcm-v3"
      },
      {
        "enunciado": "18 = 2 × 3 × 3; 24 = 2 × 2 × 2 × 3. ¿Cuál es el MCM de 18 y 24?",
        "respuesta_correcta": "72",
        "opciones": [
          "42",
          "72",
          "6",
          "432"
        ],
        "paso_resuelto": "Reunimos cada primo con la mayor cantidad de repeticiones: 2 × 2 × 2 × 3 × 3.\nSu producto es 72.",
        "visual": null,
        "id": "prof_fact_mcm-v4"
      },
      {
        "enunciado": "20 = 2 × 2 × 5; 30 = 2 × 3 × 5. ¿Cuál es el MCM de 20 y 30?",
        "respuesta_correcta": "60",
        "opciones": [
          "60",
          "10",
          "600",
          "50"
        ],
        "paso_resuelto": "Reunimos cada primo con la mayor cantidad de repeticiones: 2 × 2 × 3 × 5.\nSu producto es 60.",
        "visual": null,
        "id": "prof_fact_mcm-v5"
      },
      {
        "enunciado": "14 = 2 × 7; 21 = 3 × 7. ¿Cuál es el MCM de 14 y 21?",
        "respuesta_correcta": "42",
        "opciones": [
          "7",
          "294",
          "35",
          "42"
        ],
        "paso_resuelto": "Reunimos cada primo con la mayor cantidad de repeticiones: 2 × 3 × 7.\nSu producto es 42.",
        "visual": null,
        "id": "prof_fact_mcm-v6"
      }
    ]
  },
  {
    "id": "prof_fact_mcd",
    "tema": "divisibilidad_primos_mcm_mcd",
    "despues_de": "div_primos_5_mcd",
    "titulo": "MCD: conservar solo lo que comparten",
    "explicacion": "Para construir el MCD con factores primos, tomamos solamente los primos que aparecen en ambos números. Conservamos la menor cantidad de repeticiones compartida. Si no comparten ningún primo, su MCD es 1.",
    "ejemplo": "12 = 2 × 2 × 3 y 18 = 2 × 3 × 3. Su MCD es 6.",
    "pasos": [
      "Ambos tienen al menos un factor 2 y un factor 3.",
      "Conservamos uno de cada: 2 × 3 = 6."
    ],
    "pista": "Para el MCD buscá lo común, con la menor cantidad de repeticiones.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "12 = 2 × 2 × 3; 18 = 2 × 3 × 3. ¿Cuál es el MCD de 12 y 18?",
        "respuesta_correcta": "6",
        "opciones": [
          "6",
          "36",
          "30",
          "12"
        ],
        "paso_resuelto": "Comparten 2 × 3.\nEl producto es 6.",
        "visual": null,
        "id": "prof_fact_mcd-v1"
      },
      {
        "enunciado": "16 = 2 × 2 × 2 × 2; 24 = 2 × 2 × 2 × 3. ¿Cuál es el MCD de 16 y 24?",
        "respuesta_correcta": "8",
        "opciones": [
          "48",
          "40",
          "16",
          "8"
        ],
        "paso_resuelto": "Comparten 2 × 2 × 2.\nEl producto es 8.",
        "visual": null,
        "id": "prof_fact_mcd-v2"
      },
      {
        "enunciado": "18 = 2 × 3 × 3; 30 = 2 × 3 × 5. ¿Cuál es el MCD de 18 y 30?",
        "respuesta_correcta": "6",
        "opciones": [
          "48",
          "18",
          "6",
          "90"
        ],
        "paso_resuelto": "Comparten 2 × 3.\nEl producto es 6.",
        "visual": null,
        "id": "prof_fact_mcd-v3"
      },
      {
        "enunciado": "20 = 2 × 2 × 5; 28 = 2 × 2 × 7. ¿Cuál es el MCD de 20 y 28?",
        "respuesta_correcta": "4",
        "opciones": [
          "20",
          "4",
          "140",
          "48"
        ],
        "paso_resuelto": "Comparten 2 × 2.\nEl producto es 4.",
        "visual": null,
        "id": "prof_fact_mcd-v4"
      },
      {
        "enunciado": "14 = 2 × 7; 25 = 5 × 5. ¿Cuál es el MCD de 14 y 25?",
        "respuesta_correcta": "1",
        "opciones": [
          "1",
          "350",
          "39",
          "14"
        ],
        "paso_resuelto": "No comparten factores primos. Su único divisor común es 1.",
        "visual": null,
        "id": "prof_fact_mcd-v5"
      },
      {
        "enunciado": "27 = 3 × 3 × 3; 36 = 2 × 2 × 3 × 3. ¿Cuál es el MCD de 27 y 36?",
        "respuesta_correcta": "9",
        "opciones": [
          "108",
          "63",
          "27",
          "9"
        ],
        "paso_resuelto": "Comparten 3 × 3.\nEl producto es 9.",
        "visual": null,
        "id": "prof_fact_mcd-v6"
      }
    ]
  },
  {
    "id": "prof_op_preparar",
    "tema": "fracciones_operaciones",
    "despues_de": "frac_op_1_igual_denominador",
    "titulo": "Preparar partes del mismo tamaño",
    "explicacion": "Antes de sumar fracciones con denominadores distintos, las expresamos en partes iguales. El MCM de los denominadores nos sirve como denominador común. Para cambiar una fracción, multiplicamos arriba y abajo por el mismo factor.",
    "ejemplo": "Para tercios y cuartos usamos doceavos: 2/3 = 8/12.",
    "pasos": [
      "El MCM de 3 y 4 es 12. Para pasar de 3 a 12 multiplicamos por 4.",
      "Multiplicamos también arriba: 2 × 4 = 8. Queda 8/12."
    ],
    "pista": "Dividí el denominador nuevo por el anterior para encontrar el factor.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Vamos a usar denominador 12. ¿Cómo queda 2/3 al amplificarla hasta ese denominador?",
        "respuesta_correcta": "8/12",
        "opciones": [
          "8/12",
          "2/12",
          "6/12"
        ],
        "paso_resuelto": "12 ÷ 3 = 4: ese es el factor.\n2 × 4 = 8; queda 8/12.",
        "visual": null,
        "id": "prof_op_preparar-v1"
      },
      {
        "enunciado": "Vamos a usar denominador 12. ¿Cómo queda 3/4 al amplificarla hasta ese denominador?",
        "respuesta_correcta": "9/12",
        "opciones": [
          "3/12",
          "6/12",
          "9/12"
        ],
        "paso_resuelto": "12 ÷ 4 = 3: ese es el factor.\n3 × 3 = 9; queda 9/12.",
        "visual": null,
        "id": "prof_op_preparar-v2"
      },
      {
        "enunciado": "Vamos a usar denominador 18. ¿Cómo queda 1/6 al amplificarla hasta ese denominador?",
        "respuesta_correcta": "3/18",
        "opciones": [
          "4/18",
          "3/18",
          "1/18"
        ],
        "paso_resuelto": "18 ÷ 6 = 3: ese es el factor.\n1 × 3 = 3; queda 3/18.",
        "visual": null,
        "id": "prof_op_preparar-v3"
      },
      {
        "enunciado": "Vamos a usar denominador 20. ¿Cómo queda 4/5 al amplificarla hasta ese denominador?",
        "respuesta_correcta": "16/20",
        "opciones": [
          "16/20",
          "4/20",
          "8/20"
        ],
        "paso_resuelto": "20 ÷ 5 = 4: ese es el factor.\n4 × 4 = 16; queda 16/20.",
        "visual": null,
        "id": "prof_op_preparar-v4"
      },
      {
        "enunciado": "Vamos a usar denominador 24. ¿Cómo queda 5/6 al amplificarla hasta ese denominador?",
        "respuesta_correcta": "20/24",
        "opciones": [
          "5/24",
          "9/24",
          "20/24"
        ],
        "paso_resuelto": "24 ÷ 6 = 4: ese es el factor.\n5 × 4 = 20; queda 20/24.",
        "visual": null,
        "id": "prof_op_preparar-v5"
      },
      {
        "enunciado": "Vamos a usar denominador 21. ¿Cómo queda 2/7 al amplificarla hasta ese denominador?",
        "respuesta_correcta": "6/21",
        "opciones": [
          "5/21",
          "6/21",
          "2/21"
        ],
        "paso_resuelto": "21 ÷ 7 = 3: ese es el factor.\n2 × 3 = 6; queda 6/21.",
        "visual": null,
        "id": "prof_op_preparar-v6"
      }
    ]
  },
  {
    "id": "prof_op_comparar",
    "tema": "fracciones_operaciones",
    "despues_de": "prof_op_preparar",
    "titulo": "Comparar con un denominador común",
    "explicacion": "Para comparar dos fracciones, primero las expresamos con el mismo denominador. Después comparamos cuántas partes tomamos. Deben referirse al mismo entero.",
    "ejemplo": "2/3 es menor que 3/4.",
    "pasos": [
      "El denominador común es 12: 2/3 = 8/12 y 3/4 = 9/12.",
      "8 < 9: dos tercios es menor que tres cuartos."
    ],
    "pista": "Convertí las dos fracciones antes de comparar sus numeradores.",
    "visual": [
      {
        "label": "2/3",
        "partes": [
          1,
          1,
          1
        ],
        "pintadas": 2
      },
      {
        "label": "3/4",
        "partes": [
          1,
          1,
          1,
          1
        ],
        "pintadas": 3
      }
    ],
    "actividades": [
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 2/3 o 3/4?",
        "respuesta_correcta": "3/4",
        "opciones": [
          "3/4",
          "2/3",
          "Son iguales"
        ],
        "paso_resuelto": "Usamos denominador 12: 8/12 y 9/12.\nLa que tiene numerador mayor representa más.",
        "visual": [
          {
            "label": "2/3",
            "partes": [
              1,
              1,
              1
            ],
            "pintadas": 2
          },
          {
            "label": "3/4",
            "partes": [
              1,
              1,
              1,
              1
            ],
            "pintadas": 3
          }
        ],
        "id": "prof_op_comparar-v1"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 3/5 o 1/2?",
        "respuesta_correcta": "3/5",
        "opciones": [
          "1/2",
          "Son iguales",
          "3/5"
        ],
        "paso_resuelto": "Usamos denominador 10: 6/10 y 5/10.\nLa que tiene numerador mayor representa más.",
        "visual": [
          {
            "label": "3/5",
            "partes": [
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 3
          },
          {
            "label": "1/2",
            "partes": [
              1,
              1
            ],
            "pintadas": 1
          }
        ],
        "id": "prof_op_comparar-v2"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 5/6 o 4/5?",
        "respuesta_correcta": "5/6",
        "opciones": [
          "Son iguales",
          "5/6",
          "4/5"
        ],
        "paso_resuelto": "Usamos denominador 30: 25/30 y 24/30.\nLa que tiene numerador mayor representa más.",
        "visual": [
          {
            "label": "5/6",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 5
          },
          {
            "label": "4/5",
            "partes": [
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 4
          }
        ],
        "id": "prof_op_comparar-v3"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 2/7 o 1/3?",
        "respuesta_correcta": "1/3",
        "opciones": [
          "1/3",
          "2/7",
          "Son iguales"
        ],
        "paso_resuelto": "Usamos denominador 21: 6/21 y 7/21.\nLa que tiene numerador mayor representa más.",
        "visual": [
          {
            "label": "2/7",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 2
          },
          {
            "label": "1/3",
            "partes": [
              1,
              1,
              1
            ],
            "pintadas": 1
          }
        ],
        "id": "prof_op_comparar-v4"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 3/8 o 2/5?",
        "respuesta_correcta": "2/5",
        "opciones": [
          "3/8",
          "Son iguales",
          "2/5"
        ],
        "paso_resuelto": "Usamos denominador 40: 15/40 y 16/40.\nLa que tiene numerador mayor representa más.",
        "visual": [
          {
            "label": "3/8",
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
            "pintadas": 3
          },
          {
            "label": "2/5",
            "partes": [
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 2
          }
        ],
        "id": "prof_op_comparar-v5"
      },
      {
        "enunciado": "Del mismo entero, ¿cuál es mayor: 4/9 o 5/12?",
        "respuesta_correcta": "4/9",
        "opciones": [
          "Son iguales",
          "4/9",
          "5/12"
        ],
        "paso_resuelto": "Usamos denominador 36: 16/36 y 15/36.\nLa que tiene numerador mayor representa más.",
        "visual": [
          {
            "label": "4/9",
            "partes": [
              1,
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
          },
          {
            "label": "5/12",
            "partes": [
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "pintadas": 5
          }
        ],
        "id": "prof_op_comparar-v6"
      }
    ]
  },
  {
    "id": "prof_op_restar",
    "tema": "fracciones_operaciones",
    "despues_de": "frac_op_2_distinto_denominador",
    "titulo": "Restar fracciones de distinto denominador",
    "explicacion": "Para restar fracciones, necesitamos partes del mismo tamaño. Las convertimos al denominador común, restamos los numeradores y conservamos ese denominador. Después simplificamos si podemos.",
    "ejemplo": "5/6 − 1/4 = 7/12.",
    "pasos": [
      "MCM de 6 y 4: 12. Convertimos 5/6 = 10/12 y 1/4 = 3/12.",
      "Restamos: (10 − 3)/12 = 7/12."
    ],
    "pista": "No restes los denominadores: primero igualá el tamaño de las partes.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Resolvé 5/6 − 1/4.",
        "respuesta_correcta": "7/12",
        "opciones": [
          "7/12",
          "13/12",
          "6/10"
        ],
        "paso_resuelto": "Con denominador 12, queda 10/12 − 3/12.\nRestamos numeradores y simplificamos: 7/12.",
        "visual": null,
        "id": "prof_op_restar-v1"
      },
      {
        "enunciado": "Resolvé 3/4 − 1/3.",
        "respuesta_correcta": "5/12",
        "opciones": [
          "13/12",
          "4/7",
          "5/12"
        ],
        "paso_resuelto": "Con denominador 12, queda 9/12 − 4/12.\nRestamos numeradores y simplificamos: 5/12.",
        "visual": null,
        "id": "prof_op_restar-v2"
      },
      {
        "enunciado": "Resolvé 4/5 − 1/2.",
        "respuesta_correcta": "3/10",
        "opciones": [
          "5/7",
          "3/10",
          "13/10"
        ],
        "paso_resuelto": "Con denominador 10, queda 8/10 − 5/10.\nRestamos numeradores y simplificamos: 3/10.",
        "visual": null,
        "id": "prof_op_restar-v3"
      },
      {
        "enunciado": "Resolvé 7/8 − 1/4.",
        "respuesta_correcta": "5/8",
        "opciones": [
          "5/8",
          "9/8",
          "8/12"
        ],
        "paso_resuelto": "Con denominador 8, queda 7/8 − 2/8.\nRestamos numeradores y simplificamos: 5/8.",
        "visual": null,
        "id": "prof_op_restar-v4"
      },
      {
        "enunciado": "Resolvé 5/6 − 1/3.",
        "respuesta_correcta": "1/2",
        "opciones": [
          "7/6",
          "6/9",
          "1/2"
        ],
        "paso_resuelto": "Con denominador 6, queda 5/6 − 2/6.\nRestamos numeradores y simplificamos: 1/2.",
        "visual": null,
        "id": "prof_op_restar-v5"
      },
      {
        "enunciado": "Resolvé 8/9 − 1/6.",
        "respuesta_correcta": "13/18",
        "opciones": [
          "9/15",
          "13/18",
          "19/18"
        ],
        "paso_resuelto": "Con denominador 18, queda 16/18 − 3/18.\nRestamos numeradores y simplificamos: 13/18.",
        "visual": null,
        "id": "prof_op_restar-v6"
      }
    ]
  },
  {
    "id": "prof_op_dividir_medida",
    "tema": "fracciones_operaciones",
    "despues_de": "frac_op_4_multiplicacion",
    "titulo": "Dividir también pregunta cuántas partes caben",
    "explicacion": "Dividir una cantidad por una fracción puede preguntar cuántas porciones de ese tamaño caben. Si un litro llena cuatro vasos de 1/4 de litro, dos litros llenan ocho. Dividir no siempre da un número menor.",
    "ejemplo": "2 litros ÷ 1/4 de litro por vaso = 8 vasos.",
    "pasos": [
      "En cada litro caben 4 vasos de un cuarto.",
      "En 2 litros caben 2 × 4 = 8 vasos."
    ],
    "pista": "Contá cuántas porciones caben en un entero y después en todos los enteros.",
    "visual": [
      {
        "label": "Un litro",
        "partes": [
          1,
          1,
          1,
          1
        ],
        "pintadas": 4
      },
      {
        "label": "Otro litro",
        "partes": [
          1,
          1,
          1,
          1
        ],
        "pintadas": 4
      }
    ],
    "actividades": [
      {
        "enunciado": "Tenés 2 litros. Cada vaso contiene 1/4 de litro. ¿Cuántos vasos completos podés llenar?",
        "respuesta_correcta": "8",
        "opciones": [
          "8",
          "6",
          "2"
        ],
        "paso_resuelto": "Cada litro llena 4 vasos.\n2 litros llenan 2 × 4 = 8 vasos.",
        "visual": null,
        "id": "prof_op_dividir_medida-v1"
      },
      {
        "enunciado": "Tenés 3 litros. Cada vaso contiene 1/2 de litro. ¿Cuántos vasos completos podés llenar?",
        "respuesta_correcta": "6",
        "opciones": [
          "5",
          "3",
          "6"
        ],
        "paso_resuelto": "Cada litro llena 2 vasos.\n3 litros llenan 3 × 2 = 6 vasos.",
        "visual": null,
        "id": "prof_op_dividir_medida-v2"
      },
      {
        "enunciado": "Tenés 2 litros. Cada vaso contiene 1/3 de litro. ¿Cuántos vasos completos podés llenar?",
        "respuesta_correcta": "6",
        "opciones": [
          "2",
          "6",
          "5"
        ],
        "paso_resuelto": "Cada litro llena 3 vasos.\n2 litros llenan 2 × 3 = 6 vasos.",
        "visual": null,
        "id": "prof_op_dividir_medida-v3"
      },
      {
        "enunciado": "Tenés 4 litros. Cada vaso contiene 1/5 de litro. ¿Cuántos vasos completos podés llenar?",
        "respuesta_correcta": "20",
        "opciones": [
          "20",
          "9",
          "4"
        ],
        "paso_resuelto": "Cada litro llena 5 vasos.\n4 litros llenan 4 × 5 = 20 vasos.",
        "visual": null,
        "id": "prof_op_dividir_medida-v4"
      },
      {
        "enunciado": "Tenés 3 litros. Cada vaso contiene 1/4 de litro. ¿Cuántos vasos completos podés llenar?",
        "respuesta_correcta": "12",
        "opciones": [
          "7",
          "3",
          "12"
        ],
        "paso_resuelto": "Cada litro llena 4 vasos.\n3 litros llenan 3 × 4 = 12 vasos.",
        "visual": null,
        "id": "prof_op_dividir_medida-v5"
      },
      {
        "enunciado": "Tenés 5 litros. Cada vaso contiene 1/2 de litro. ¿Cuántos vasos completos podés llenar?",
        "respuesta_correcta": "10",
        "opciones": [
          "5",
          "10",
          "7"
        ],
        "paso_resuelto": "Cada litro llena 2 vasos.\n5 litros llenan 5 × 2 = 10 vasos.",
        "visual": null,
        "id": "prof_op_dividir_medida-v6"
      }
    ]
  }
];
for (const unidad of PROFUNDIZACION) {
 const indice = UNIDADES_BASES.findIndex(u => u.id === unidad.despues_de);
 if (indice < 0) throw new Error('Falta el paso anterior de ' + unidad.id);
 UNIDADES_BASES.splice(indice + 1, 0, unidad);
}
// FIN R10



// R11: decimales paso a paso.
const DECIMALES_R11 = [
  {
    "id": "prof_dec_milesimos",
    "tema": "decimales_conversion",
    "despues_de": "mat_dec_fraccion",
    "titulo": "Un lugar para cada parte",
    "explicacion": "Después de la coma vienen décimos, centésimos y milésimos, en ese orden. Un milésimo es una de mil partes iguales de la unidad. Un cero guarda un lugar: 0,006 tiene seis milésimos, no seis décimos.",
    "ejemplo": "0,375 = 3 décimos + 7 centésimos + 5 milésimos.",
    "pasos": [
      "Contamos desde la coma: primer, segundo y tercer lugar.",
      "La tercera cifra es 5; cuenta milésimos."
    ],
    "pista": "Contá los lugares desde la coma, también cuando aparece un cero.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "En 0,375, ¿qué cifra ocupa el lugar de los milésimos?",
        "respuesta_correcta": "5",
        "opciones": [
          "5",
          "3",
          "7",
          "9"
        ],
        "paso_resuelto": "Después de la coma leemos 3, 7 y 5. El tercer lugar es el de los milésimos.",
        "visual": null,
        "id": "prof_dec_milesimos-v1"
      },
      {
        "enunciado": "En 2,406, ¿qué cifra ocupa el lugar de los milésimos?",
        "respuesta_correcta": "6",
        "opciones": [
          "4",
          "0",
          "9",
          "6"
        ],
        "paso_resuelto": "Después de la coma leemos 4, 0 y 6. El tercer lugar es el de los milésimos.",
        "visual": null,
        "id": "prof_dec_milesimos-v2"
      },
      {
        "enunciado": "En 1,052, ¿qué cifra ocupa el lugar de los milésimos?",
        "respuesta_correcta": "2",
        "opciones": [
          "5",
          "9",
          "2",
          "0"
        ],
        "paso_resuelto": "Después de la coma leemos 0, 5 y 2. El tercer lugar es el de los milésimos.",
        "visual": null,
        "id": "prof_dec_milesimos-v3"
      },
      {
        "enunciado": "En 3,108, ¿qué cifra ocupa el lugar de los milésimos?",
        "respuesta_correcta": "8",
        "opciones": [
          "9",
          "8",
          "1",
          "0"
        ],
        "paso_resuelto": "Después de la coma leemos 1, 0 y 8. El tercer lugar es el de los milésimos.",
        "visual": null,
        "id": "prof_dec_milesimos-v4"
      },
      {
        "enunciado": "En 0,924, ¿qué cifra ocupa el lugar de los milésimos?",
        "respuesta_correcta": "4",
        "opciones": [
          "9",
          "2",
          "4"
        ],
        "paso_resuelto": "Después de la coma leemos 9, 2 y 4. El tercer lugar es el de los milésimos.",
        "visual": null,
        "id": "prof_dec_milesimos-v5"
      },
      {
        "enunciado": "En 4,630, ¿qué cifra ocupa el lugar de los milésimos?",
        "respuesta_correcta": "0",
        "opciones": [
          "6",
          "3",
          "9",
          "0"
        ],
        "paso_resuelto": "Después de la coma leemos 6, 3 y 0. El tercer lugar es el de los milésimos.",
        "visual": null,
        "id": "prof_dec_milesimos-v6"
      }
    ]
  },
  {
    "id": "prof_dec_ceros",
    "tema": "decimales_conversion",
    "despues_de": "prof_dec_milesimos",
    "titulo": "Ceros que conservan el valor",
    "explicacion": "Podemos agregar o quitar ceros al final de la parte decimal sin cambiar la cantidad: tres décimos equivalen a treinta centésimos. Un cero entre la coma y otra cifra sí cambia su posición: 0,03 no es 0,3.",
    "ejemplo": "0,3 = 0,30 = 0,300.",
    "pasos": [
      "Tres décimos ocupan lo mismo que treinta centésimos.",
      "Quitamos solo ceros finales: 0,300 vuelve a ser 0,3."
    ],
    "pista": "Quitá solo ceros al final de la parte decimal.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Cuál de estas escrituras representa la misma cantidad que 0,30?",
        "respuesta_correcta": "0,3",
        "opciones": [
          "0,3",
          "0,03",
          "3"
        ],
        "paso_resuelto": "Los ceros finales no cambian el valor: 0,30 = 0,3.",
        "visual": null,
        "id": "prof_dec_ceros-v1"
      },
      {
        "enunciado": "¿Cuál de estas escrituras representa la misma cantidad que 2,500?",
        "respuesta_correcta": "2,5",
        "opciones": [
          "2,05",
          "25",
          "2,5"
        ],
        "paso_resuelto": "Los ceros finales no cambian el valor: 2,500 = 2,5.",
        "visual": null,
        "id": "prof_dec_ceros-v2"
      },
      {
        "enunciado": "¿Cuál de estas escrituras representa la misma cantidad que 0,070?",
        "respuesta_correcta": "0,07",
        "opciones": [
          "7",
          "0,07",
          "0,7"
        ],
        "paso_resuelto": "Los ceros finales no cambian el valor: 0,070 = 0,07.",
        "visual": null,
        "id": "prof_dec_ceros-v3"
      },
      {
        "enunciado": "¿Cuál de estas escrituras representa la misma cantidad que 4,200?",
        "respuesta_correcta": "4,2",
        "opciones": [
          "4,2",
          "4,02",
          "42"
        ],
        "paso_resuelto": "Los ceros finales no cambian el valor: 4,200 = 4,2.",
        "visual": null,
        "id": "prof_dec_ceros-v4"
      },
      {
        "enunciado": "¿Cuál de estas escrituras representa la misma cantidad que 1,040?",
        "respuesta_correcta": "1,04",
        "opciones": [
          "1,4",
          "14",
          "1,04"
        ],
        "paso_resuelto": "Los ceros finales no cambian el valor: 1,040 = 1,04.",
        "visual": null,
        "id": "prof_dec_ceros-v5"
      },
      {
        "enunciado": "¿Cuál de estas escrituras representa la misma cantidad que 0,600?",
        "respuesta_correcta": "0,6",
        "opciones": [
          "6",
          "0,6",
          "0,06"
        ],
        "paso_resuelto": "Los ceros finales no cambian el valor: 0,600 = 0,6.",
        "visual": null,
        "id": "prof_dec_ceros-v6"
      }
    ]
  },
  {
    "id": "prof_dec_comparar",
    "tema": "decimales_conversion",
    "despues_de": "prof_dec_ceros",
    "titulo": "Comparar decimales lugar por lugar",
    "explicacion": "Primero comparamos las partes enteras. Si son iguales, comparamos décimos, luego centésimos y después milésimos. Podemos completar con ceros al final. Tener más cifras no significa valer más.",
    "ejemplo": "0,8 es mayor que 0,75: 0,80 tiene 80 centésimos y 0,75 tiene 75.",
    "pasos": [
      "Escribimos 0,8 como 0,80 para comparar las mismas partes.",
      "80 centésimos son más que 75 centésimos."
    ],
    "pista": "Igualá las posiciones con ceros finales y compará desde la izquierda.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "¿Qué número es mayor: 0,8 o 0,75?",
        "respuesta_correcta": "0,8",
        "opciones": [
          "0,8",
          "0,75",
          "Son iguales"
        ],
        "paso_resuelto": "Comparamos posiciones: 0,800 y 0,750, El mayor es 0,8,",
        "visual": null,
        "id": "prof_dec_comparar-v1"
      },
      {
        "enunciado": "¿Qué número es mayor: 2,09 o 2,1?",
        "respuesta_correcta": "2,1",
        "opciones": [
          "2,09",
          "Son iguales",
          "2,1"
        ],
        "paso_resuelto": "Comparamos posiciones: 2,090 y 2,100, El mayor es 2,1,",
        "visual": null,
        "id": "prof_dec_comparar-v2"
      },
      {
        "enunciado": "¿Qué número es mayor: 3,4 o 3,045?",
        "respuesta_correcta": "3,4",
        "opciones": [
          "Son iguales",
          "3,4",
          "3,045"
        ],
        "paso_resuelto": "Comparamos posiciones: 3,400 y 3,045, El mayor es 3,4,",
        "visual": null,
        "id": "prof_dec_comparar-v3"
      },
      {
        "enunciado": "¿Qué número es mayor: 0,125 o 0,12?",
        "respuesta_correcta": "0,125",
        "opciones": [
          "0,125",
          "0,12",
          "Son iguales"
        ],
        "paso_resuelto": "Comparamos posiciones: 0,125 y 0,120, El mayor es 0,125,",
        "visual": null,
        "id": "prof_dec_comparar-v4"
      },
      {
        "enunciado": "¿Qué número es mayor: 5,06 o 5,006?",
        "respuesta_correcta": "5,06",
        "opciones": [
          "5,006",
          "Son iguales",
          "5,06"
        ],
        "paso_resuelto": "Comparamos posiciones: 5,060 y 5,006, El mayor es 5,06,",
        "visual": null,
        "id": "prof_dec_comparar-v5"
      },
      {
        "enunciado": "¿Qué número es mayor: 1,009 o 1,01?",
        "respuesta_correcta": "1,01",
        "opciones": [
          "Son iguales",
          "1,01",
          "1,009"
        ],
        "paso_resuelto": "Comparamos posiciones: 1,009 y 1,010, El mayor es 1,01,",
        "visual": null,
        "id": "prof_dec_comparar-v6"
      }
    ]
  },
  {
    "id": "prof_dec_a_fraccion",
    "tema": "decimales_conversion",
    "despues_de": "prof_dec_comparar",
    "titulo": "Escribir el decimal como fracción",
    "explicacion": "Contamos las cifras después de la coma. Una cifra indica décimos y denominador 10; dos indican centésimos y denominador 100; tres indican milésimos y denominador 1000. El numerador es el número escrito sin coma.",
    "ejemplo": "1,25 = 125/100.",
    "pasos": [
      "Hay dos cifras decimales: usamos denominador 100.",
      "Sin la coma queda 125; escribimos 125/100."
    ],
    "pista": "El denominador tiene tantos ceros como cifras decimales.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Escribí 1,25 como fracción con denominador 100, sin simplificar.",
        "respuesta_correcta": "125/100",
        "opciones": [
          "125/100",
          "125/1000",
          "126/100"
        ],
        "paso_resuelto": "Hay 2 cifras decimales. El numerador es 125 y el denominador es 100.",
        "visual": null,
        "id": "prof_dec_a_fraccion-v1"
      },
      {
        "enunciado": "Escribí 0,6 como fracción con denominador 10, sin simplificar.",
        "respuesta_correcta": "6/10",
        "opciones": [
          "6/100",
          "7/10",
          "6/10"
        ],
        "paso_resuelto": "Hay 1 cifras decimales. El numerador es 6 y el denominador es 10.",
        "visual": null,
        "id": "prof_dec_a_fraccion-v2"
      },
      {
        "enunciado": "Escribí 0,075 como fracción con denominador 1000, sin simplificar.",
        "respuesta_correcta": "75/1000",
        "opciones": [
          "76/1000",
          "75/1000",
          "75/10000"
        ],
        "paso_resuelto": "Hay 3 cifras decimales. El numerador es 75 y el denominador es 1000.",
        "visual": null,
        "id": "prof_dec_a_fraccion-v3"
      },
      {
        "enunciado": "Escribí 2,04 como fracción con denominador 100, sin simplificar.",
        "respuesta_correcta": "204/100",
        "opciones": [
          "204/100",
          "204/1000",
          "205/100"
        ],
        "paso_resuelto": "Hay 2 cifras decimales. El numerador es 204 y el denominador es 100.",
        "visual": null,
        "id": "prof_dec_a_fraccion-v4"
      },
      {
        "enunciado": "Escribí 3,125 como fracción con denominador 1000, sin simplificar.",
        "respuesta_correcta": "3125/1000",
        "opciones": [
          "3125/10000",
          "3126/1000",
          "3125/1000"
        ],
        "paso_resuelto": "Hay 3 cifras decimales. El numerador es 3125 y el denominador es 1000.",
        "visual": null,
        "id": "prof_dec_a_fraccion-v5"
      },
      {
        "enunciado": "Escribí 0,08 como fracción con denominador 100, sin simplificar.",
        "respuesta_correcta": "8/100",
        "opciones": [
          "9/100",
          "8/100",
          "8/1000"
        ],
        "paso_resuelto": "Hay 2 cifras decimales. El numerador es 8 y el denominador es 100.",
        "visual": null,
        "id": "prof_dec_a_fraccion-v6"
      }
    ]
  },
  {
    "id": "prof_dec_desde_fraccion",
    "tema": "decimales_conversion",
    "despues_de": "prof_dec_a_fraccion",
    "titulo": "Dividir para pasar a decimal",
    "explicacion": "Una fracción también indica una división: numerador dividido por denominador. Si queda resto, podemos continuar con décimos y centésimos. Si el resto llega a cero, el decimal es exacto. Hay otras fracciones cuyo decimal no termina.",
    "ejemplo": "3/4 = 3 ÷ 4 = 0,75.",
    "pasos": [
      "3 es menor que 4: anotamos 0 enteros y la coma. 30 décimos entre 4 dan 7 décimos y sobran 2.",
      "Esos 2 décimos son 20 centésimos: entre 4 dan 5 centésimos. Queda 0,75 y resto cero."
    ],
    "pista": "Dividí el numerador por el denominador; si hay resto, seguí con partes diez veces menores.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Convertí 3/4 en un decimal exacto.",
        "respuesta_correcta": "0,75",
        "opciones": [
          "0,75",
          "7,5",
          "0,075"
        ],
        "paso_resuelto": "3 ÷ 4: 0 entero(s), resto 3.\n30 décimos entre 4: 7 décimos, resto 2 décimos.\n20 centésimos entre 4: 5 centésimos, resto 0 centésimos.\nJuntamos los lugares: 0,75.",
        "visual": null,
        "id": "prof_dec_desde_fraccion-v1"
      },
      {
        "enunciado": "Convertí 1/2 en un decimal exacto.",
        "respuesta_correcta": "0,5",
        "opciones": [
          "5",
          "0,05",
          "0,5"
        ],
        "paso_resuelto": "1 ÷ 2: 0 entero(s), resto 1.\n10 décimos entre 2: 5 décimos, resto 0 décimos.\nJuntamos los lugares: 0,5.",
        "visual": null,
        "id": "prof_dec_desde_fraccion-v2"
      },
      {
        "enunciado": "Convertí 7/4 en un decimal exacto.",
        "respuesta_correcta": "1,75",
        "opciones": [
          "0,175",
          "1,75",
          "17,5"
        ],
        "paso_resuelto": "7 ÷ 4: 1 entero(s), resto 3.\n30 décimos entre 4: 7 décimos, resto 2 décimos.\n20 centésimos entre 4: 5 centésimos, resto 0 centésimos.\nJuntamos los lugares: 1,75.",
        "visual": null,
        "id": "prof_dec_desde_fraccion-v3"
      },
      {
        "enunciado": "Convertí 3/8 en un decimal exacto.",
        "respuesta_correcta": "0,375",
        "opciones": [
          "0,375",
          "3,75",
          "0,0375"
        ],
        "paso_resuelto": "3 ÷ 8: 0 entero(s), resto 3.\n30 décimos entre 8: 3 décimos, resto 6 décimos.\n60 centésimos entre 8: 7 centésimos, resto 4 centésimos.\n40 milésimos entre 8: 5 milésimos, resto 0 milésimos.\nJuntamos los lugares: 0,375.",
        "visual": null,
        "id": "prof_dec_desde_fraccion-v4"
      },
      {
        "enunciado": "Convertí 9/5 en un decimal exacto.",
        "respuesta_correcta": "1,8",
        "opciones": [
          "18",
          "0,18",
          "1,8"
        ],
        "paso_resuelto": "9 ÷ 5: 1 entero(s), resto 4.\n40 décimos entre 5: 8 décimos, resto 0 décimos.\nJuntamos los lugares: 1,8.",
        "visual": null,
        "id": "prof_dec_desde_fraccion-v5"
      },
      {
        "enunciado": "Convertí 7/20 en un decimal exacto.",
        "respuesta_correcta": "0,35",
        "opciones": [
          "0,035",
          "0,35",
          "3,5"
        ],
        "paso_resuelto": "7 ÷ 20: 0 entero(s), resto 7.\n70 décimos entre 20: 3 décimos, resto 10 décimos.\n100 centésimos entre 20: 5 centésimos, resto 0 centésimos.\nJuntamos los lugares: 0,35.",
        "visual": null,
        "id": "prof_dec_desde_fraccion-v6"
      }
    ]
  },
  {
    "id": "prof_dec_sumar_distintas",
    "tema": "decimales_conversion",
    "despues_de": "mat_dec_sumar",
    "titulo": "Sumar décimos y centésimos",
    "explicacion": "Para sumar números con distinta cantidad de cifras decimales, alineamos las comas y completamos con ceros finales. Después sumamos partes del mismo tamaño. Cada cien centésimos forman una unidad.",
    "ejemplo": "2,35 + 0,8 = 2,35 + 0,80 = 3,15.",
    "pasos": [
      "Son 235 centésimos más 80 centésimos: 315 centésimos.",
      "300 centésimos forman 3 unidades y quedan 15 centésimos: 3,15."
    ],
    "pista": "Sumá partes del mismo tamaño; diez centésimos forman un décimo.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Resolvé 2,35 + 0,8.",
        "respuesta_correcta": "3,15",
        "opciones": [
          "3,15",
          "3,25",
          "0,315"
        ],
        "paso_resuelto": "En centésimos: 235 + 80 = 315. Volvemos a escribir el resultado: 3,15.",
        "visual": null,
        "id": "prof_dec_sumar_distintas-v1"
      },
      {
        "enunciado": "Resolvé 1,08 + 0,7.",
        "respuesta_correcta": "1,78",
        "opciones": [
          "1,88",
          "0,178",
          "1,78"
        ],
        "paso_resuelto": "En centésimos: 108 + 70 = 178. Volvemos a escribir el resultado: 1,78.",
        "visual": null,
        "id": "prof_dec_sumar_distintas-v2"
      },
      {
        "enunciado": "Resolvé 4,6 + 0,75.",
        "respuesta_correcta": "5,35",
        "opciones": [
          "0,535",
          "5,35",
          "5,45"
        ],
        "paso_resuelto": "En centésimos: 460 + 75 = 535. Volvemos a escribir el resultado: 5,35.",
        "visual": null,
        "id": "prof_dec_sumar_distintas-v3"
      },
      {
        "enunciado": "Resolvé 3,09 + 1,2.",
        "respuesta_correcta": "4,29",
        "opciones": [
          "4,29",
          "4,39",
          "0,429"
        ],
        "paso_resuelto": "En centésimos: 309 + 120 = 429. Volvemos a escribir el resultado: 4,29.",
        "visual": null,
        "id": "prof_dec_sumar_distintas-v4"
      },
      {
        "enunciado": "Resolvé 0,85 + 0,4.",
        "respuesta_correcta": "1,25",
        "opciones": [
          "1,35",
          "0,125",
          "1,25"
        ],
        "paso_resuelto": "En centésimos: 85 + 40 = 125. Volvemos a escribir el resultado: 1,25.",
        "visual": null,
        "id": "prof_dec_sumar_distintas-v5"
      },
      {
        "enunciado": "Resolvé 5,07 + 2,9.",
        "respuesta_correcta": "7,97",
        "opciones": [
          "0,797",
          "7,97",
          "8,07"
        ],
        "paso_resuelto": "En centésimos: 507 + 290 = 797. Volvemos a escribir el resultado: 7,97.",
        "visual": null,
        "id": "prof_dec_sumar_distintas-v6"
      }
    ]
  },
  {
    "id": "prof_dec_restar_reagrupar",
    "tema": "decimales_conversion",
    "despues_de": "mat_dec_restar",
    "titulo": "Restar cuando necesitamos cambiar una unidad",
    "explicacion": "Al restar, alineamos las comas y completamos con ceros finales. Podemos cambiar una unidad por cien centésimos sin cambiar el total. Así tenemos partes pequeñas para quitar.",
    "ejemplo": "5 − 1,75 = 5,00 − 1,75 = 3,25.",
    "pasos": [
      "Reescribimos 5 unidades como 4 unidades y 100 centésimos.",
      "Quitamos 1 unidad y 75 centésimos: quedan 3 unidades y 25 centésimos."
    ],
    "pista": "Podés cambiar una unidad por cien centésimos y conservar el total.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Resolvé 5 − 1,75.",
        "respuesta_correcta": "3,25",
        "opciones": [
          "3,25",
          "3,35",
          "6,75"
        ],
        "paso_resuelto": "En centésimos: 500 − 175 = 325. Quedan 3,25.",
        "visual": null,
        "id": "prof_dec_restar_reagrupar-v1"
      },
      {
        "enunciado": "Resolvé 4,2 − 0,85.",
        "respuesta_correcta": "3,35",
        "opciones": [
          "3,45",
          "5,05",
          "3,35"
        ],
        "paso_resuelto": "En centésimos: 420 − 85 = 335. Quedan 3,35.",
        "visual": null,
        "id": "prof_dec_restar_reagrupar-v2"
      },
      {
        "enunciado": "Resolvé 6 − 2,08.",
        "respuesta_correcta": "3,92",
        "opciones": [
          "8,08",
          "3,92",
          "4,02"
        ],
        "paso_resuelto": "En centésimos: 600 − 208 = 392. Quedan 3,92.",
        "visual": null,
        "id": "prof_dec_restar_reagrupar-v3"
      },
      {
        "enunciado": "Resolvé 3,5 − 1,76.",
        "respuesta_correcta": "1,74",
        "opciones": [
          "1,74",
          "1,84",
          "5,26"
        ],
        "paso_resuelto": "En centésimos: 350 − 176 = 174. Quedan 1,74.",
        "visual": null,
        "id": "prof_dec_restar_reagrupar-v4"
      },
      {
        "enunciado": "Resolvé 7,1 − 3,25.",
        "respuesta_correcta": "3,85",
        "opciones": [
          "3,95",
          "10,35",
          "3,85"
        ],
        "paso_resuelto": "En centésimos: 710 − 325 = 385. Quedan 3,85.",
        "visual": null,
        "id": "prof_dec_restar_reagrupar-v5"
      },
      {
        "enunciado": "Resolvé 2 − 0,65.",
        "respuesta_correcta": "1,35",
        "opciones": [
          "2,65",
          "1,35",
          "1,45"
        ],
        "paso_resuelto": "En centésimos: 200 − 65 = 135. Quedan 1,35.",
        "visual": null,
        "id": "prof_dec_restar_reagrupar-v6"
      }
    ]
  },
  {
    "id": "prof_dec_escalar",
    "tema": "decimales_conversion",
    "despues_de": "prof_dec_restar_reagrupar",
    "titulo": "Diez veces más, diez veces menos",
    "explicacion": "Multiplicar por 10 hace que cada cifra valga diez veces más; dividir por 10 hace que valga diez veces menos. Con 100 son dos cambios de posición y con 1000 son tres. Agregar ceros al final del decimal no multiplica su valor.",
    "ejemplo": "0,45 × 10 = 4,5; 4,5 ÷ 10 = 0,45.",
    "pasos": [
      "Al multiplicar por 10, 45 centésimos se convierten en 45 décimos.",
      "Al dividir por 10 hacemos el cambio inverso: 45 décimos pasan a ser 45 centésimos."
    ],
    "pista": "Pensá primero si el resultado debe ser mayor o menor; después contá los cambios de posición.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Resolvé 0,45 × 10.",
        "respuesta_correcta": "4,5",
        "opciones": [
          "4,5",
          "0,045",
          "0,45"
        ],
        "paso_resuelto": "Cada cifra cambia 1 lugar(es) hacia un valor mayor. Resultado: 4,5.",
        "visual": null,
        "id": "prof_dec_escalar-v1"
      },
      {
        "enunciado": "Resolvé 2,07 × 100.",
        "respuesta_correcta": "207",
        "opciones": [
          "0,0207",
          "2,07",
          "207"
        ],
        "paso_resuelto": "Cada cifra cambia 2 lugar(es) hacia un valor mayor. Resultado: 207.",
        "visual": null,
        "id": "prof_dec_escalar-v2"
      },
      {
        "enunciado": "Resolvé 0,006 × 1000.",
        "respuesta_correcta": "6",
        "opciones": [
          "0,006",
          "6",
          "0,000006"
        ],
        "paso_resuelto": "Cada cifra cambia 3 lugar(es) hacia un valor mayor. Resultado: 6.",
        "visual": null,
        "id": "prof_dec_escalar-v3"
      },
      {
        "enunciado": "Resolvé 4,5 ÷ 10.",
        "respuesta_correcta": "0,45",
        "opciones": [
          "0,45",
          "45",
          "4,5"
        ],
        "paso_resuelto": "Cada cifra cambia 1 lugar(es) hacia un valor menor. Resultado: 0,45.",
        "visual": null,
        "id": "prof_dec_escalar-v4"
      },
      {
        "enunciado": "Resolvé 7 ÷ 100.",
        "respuesta_correcta": "0,07",
        "opciones": [
          "700",
          "7",
          "0,07"
        ],
        "paso_resuelto": "Cada cifra cambia 2 lugar(es) hacia un valor menor. Resultado: 0,07.",
        "visual": null,
        "id": "prof_dec_escalar-v5"
      },
      {
        "enunciado": "Resolvé 65 ÷ 1000.",
        "respuesta_correcta": "0,065",
        "opciones": [
          "65",
          "0,065",
          "65000"
        ],
        "paso_resuelto": "Cada cifra cambia 3 lugar(es) hacia un valor menor. Resultado: 0,065.",
        "visual": null,
        "id": "prof_dec_escalar-v6"
      }
    ]
  },
  {
    "id": "prof_dec_producto",
    "tema": "decimales_conversion",
    "despues_de": "mat_dec_producto",
    "titulo": "Multiplicar dos cantidades decimales",
    "explicacion": "Para multiplicar decimales, multiplicamos como si no hubiera comas y luego contamos las cifras decimales de ambos factores. El producto lleva esa cantidad total de posiciones decimales; si faltan cifras, completamos con ceros a la izquierda. Multiplicar por una cantidad entre 0 y 1 toma solo una parte.",
    "ejemplo": "1,2 × 0,3 = 0,36.",
    "pasos": [
      "12 × 3 = 36. Cada factor tiene una cifra decimal: son dos en total.",
      "36 centésimos se escriben 0,36. Tomar tres décimos de 1,2 da menos que 1,2."
    ],
    "pista": "Sumá las posiciones decimales de los dos factores.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Resolvé 1,2 × 0,3.",
        "respuesta_correcta": "0,36",
        "opciones": [
          "0,36",
          "3,6",
          "1,5"
        ],
        "paso_resuelto": "Sin comas: 12 × 3 = 36.\nLos factores tienen 1 y 1 cifra(s) decimal(es): 2 en total.\nColocamos la coma contando 2 lugares desde la derecha: 0,36.",
        "visual": null,
        "id": "prof_dec_producto-v1"
      },
      {
        "enunciado": "Resolvé 0,4 × 0,2.",
        "respuesta_correcta": "0,08",
        "opciones": [
          "0,8",
          "0,6",
          "0,08"
        ],
        "paso_resuelto": "Sin comas: 4 × 2 = 8.\nLos factores tienen 1 y 1 cifra(s) decimal(es): 2 en total.\nColocamos la coma contando 2 lugares desde la derecha: 0,08.",
        "visual": null,
        "id": "prof_dec_producto-v2"
      },
      {
        "enunciado": "Resolvé 2,5 × 1,2.",
        "respuesta_correcta": "3",
        "opciones": [
          "3,7",
          "3",
          "30"
        ],
        "paso_resuelto": "Sin comas: 25 × 12 = 300.\nLos factores tienen 1 y 1 cifra(s) decimal(es): 2 en total.\nColocamos la coma contando 2 lugares desde la derecha: 3.",
        "visual": null,
        "id": "prof_dec_producto-v3"
      },
      {
        "enunciado": "Resolvé 0,06 × 0,5.",
        "respuesta_correcta": "0,03",
        "opciones": [
          "0,03",
          "0,3",
          "0,56"
        ],
        "paso_resuelto": "Sin comas: 6 × 5 = 30.\nLos factores tienen 2 y 1 cifra(s) decimal(es): 3 en total.\nColocamos la coma contando 3 lugares desde la derecha: 0,03.",
        "visual": null,
        "id": "prof_dec_producto-v4"
      },
      {
        "enunciado": "Resolvé 1,25 × 0,4.",
        "respuesta_correcta": "0,5",
        "opciones": [
          "5",
          "1,65",
          "0,5"
        ],
        "paso_resuelto": "Sin comas: 125 × 4 = 500.\nLos factores tienen 2 y 1 cifra(s) decimal(es): 3 en total.\nColocamos la coma contando 3 lugares desde la derecha: 0,5.",
        "visual": null,
        "id": "prof_dec_producto-v5"
      },
      {
        "enunciado": "Resolvé 3,2 × 0,25.",
        "respuesta_correcta": "0,8",
        "opciones": [
          "3,45",
          "0,8",
          "8"
        ],
        "paso_resuelto": "Sin comas: 32 × 25 = 800.\nLos factores tienen 1 y 2 cifra(s) decimal(es): 3 en total.\nColocamos la coma contando 3 lugares desde la derecha: 0,8.",
        "visual": null,
        "id": "prof_dec_producto-v6"
      }
    ]
  },
  {
    "id": "prof_dec_dividir_natural",
    "tema": "decimales_conversion",
    "despues_de": "mat_dec_dividir",
    "titulo": "Repartir también los centésimos",
    "explicacion": "Podemos repartir una cantidad decimal convirtiéndola a centésimos. Dividimos esos centésimos entre la cantidad de grupos y escribimos de nuevo el decimal. Si quedan partes por repartir, seguimos con una unidad más pequeña.",
    "ejemplo": "4,5 litros entre 6 botellas: 0,75 litros en cada una.",
    "pasos": [
      "4,5 litros equivalen a 450 centésimos de litro.",
      "450 ÷ 6 = 75 centésimos por botella: 0,75 litros."
    ],
    "pista": "Convertí a partes pequeñas del mismo tamaño antes de repartir.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Resolvé 4,5 ÷ 6.",
        "respuesta_correcta": "0,75",
        "opciones": [
          "0,75",
          "7,5",
          "0,075"
        ],
        "paso_resuelto": "4,5 equivale a 450 centésimos. 450 ÷ 6 = 75 centésimos: 0,75.",
        "visual": null,
        "id": "prof_dec_dividir_natural-v1"
      },
      {
        "enunciado": "Resolvé 3,6 ÷ 8.",
        "respuesta_correcta": "0,45",
        "opciones": [
          "4,5",
          "0,045",
          "0,45"
        ],
        "paso_resuelto": "3,6 equivale a 360 centésimos. 360 ÷ 8 = 45 centésimos: 0,45.",
        "visual": null,
        "id": "prof_dec_dividir_natural-v2"
      },
      {
        "enunciado": "Resolvé 7,2 ÷ 5.",
        "respuesta_correcta": "1,44",
        "opciones": [
          "0,144",
          "1,44",
          "14,4"
        ],
        "paso_resuelto": "7,2 equivale a 720 centésimos. 720 ÷ 5 = 144 centésimos: 1,44.",
        "visual": null,
        "id": "prof_dec_dividir_natural-v3"
      },
      {
        "enunciado": "Resolvé 1,8 ÷ 4.",
        "respuesta_correcta": "0,45",
        "opciones": [
          "0,45",
          "4,5",
          "0,045"
        ],
        "paso_resuelto": "1,8 equivale a 180 centésimos. 180 ÷ 4 = 45 centésimos: 0,45.",
        "visual": null,
        "id": "prof_dec_dividir_natural-v4"
      },
      {
        "enunciado": "Resolvé 6,3 ÷ 9.",
        "respuesta_correcta": "0,7",
        "opciones": [
          "7",
          "0,07",
          "0,7"
        ],
        "paso_resuelto": "6,3 equivale a 630 centésimos. 630 ÷ 9 = 70 centésimos: 0,7.",
        "visual": null,
        "id": "prof_dec_dividir_natural-v5"
      },
      {
        "enunciado": "Resolvé 2,5 ÷ 2.",
        "respuesta_correcta": "1,25",
        "opciones": [
          "0,125",
          "1,25",
          "12,5"
        ],
        "paso_resuelto": "2,5 equivale a 250 centésimos. 250 ÷ 2 = 125 centésimos: 1,25.",
        "visual": null,
        "id": "prof_dec_dividir_natural-v6"
      }
    ]
  },
  {
    "id": "prof_dec_dividir_decimal",
    "tema": "decimales_conversion",
    "despues_de": "prof_dec_dividir_natural",
    "titulo": "Dividir por una cantidad decimal",
    "explicacion": "Una división conserva su resultado si multiplicamos dividendo y divisor por el mismo número distinto de cero. Podemos multiplicar ambos por 10 o por 100 para quitar la coma del divisor. Nunca cambiamos solo uno.",
    "ejemplo": "1,5 ÷ 0,3 = 15 ÷ 3 = 5.",
    "pasos": [
      "Multiplicamos ambos números por 10: 1,5 pasa a 15 y 0,3 pasa a 3.",
      "15 ÷ 3 = 5. Comprobamos: 5 × 0,3 = 1,5."
    ],
    "pista": "Multiplicá los dos números por el mismo factor hasta que el divisor sea entero.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Resolvé 1,5 ÷ 0,3.",
        "respuesta_correcta": "5",
        "opciones": [
          "5",
          "0,5",
          "0,45"
        ],
        "paso_resuelto": "Multiplicamos ambos por 10: 15 ÷ 3. Resultado: 5.",
        "visual": null,
        "id": "prof_dec_dividir_decimal-v1"
      },
      {
        "enunciado": "Resolvé 2,4 ÷ 0,6.",
        "respuesta_correcta": "4",
        "opciones": [
          "0,4",
          "1,44",
          "4"
        ],
        "paso_resuelto": "Multiplicamos ambos por 10: 24 ÷ 6. Resultado: 4.",
        "visual": null,
        "id": "prof_dec_dividir_decimal-v2"
      },
      {
        "enunciado": "Resolvé 1,8 ÷ 0,12.",
        "respuesta_correcta": "15",
        "opciones": [
          "0,216",
          "15",
          "1,5"
        ],
        "paso_resuelto": "Multiplicamos ambos por 100: 180 ÷ 12. Resultado: 15.",
        "visual": null,
        "id": "prof_dec_dividir_decimal-v3"
      },
      {
        "enunciado": "Resolvé 0,75 ÷ 0,25.",
        "respuesta_correcta": "3",
        "opciones": [
          "3",
          "0,3",
          "0,1875"
        ],
        "paso_resuelto": "Multiplicamos ambos por 100: 75 ÷ 25. Resultado: 3.",
        "visual": null,
        "id": "prof_dec_dividir_decimal-v4"
      },
      {
        "enunciado": "Resolvé 3,6 ÷ 1,2.",
        "respuesta_correcta": "3",
        "opciones": [
          "0,3",
          "4,32",
          "3"
        ],
        "paso_resuelto": "Multiplicamos ambos por 10: 36 ÷ 12. Resultado: 3.",
        "visual": null,
        "id": "prof_dec_dividir_decimal-v5"
      },
      {
        "enunciado": "Resolvé 2,5 ÷ 0,5.",
        "respuesta_correcta": "5",
        "opciones": [
          "1,25",
          "5",
          "0,5"
        ],
        "paso_resuelto": "Multiplicamos ambos por 10: 25 ÷ 5. Resultado: 5.",
        "visual": null,
        "id": "prof_dec_dividir_decimal-v6"
      }
    ]
  },
  {
    "id": "prof_dec_dos_pasos",
    "tema": "decimales_conversion",
    "despues_de": "prof_dec_dividir_decimal",
    "titulo": "Un problema, dos cuentas pequeñas",
    "explicacion": "En un problema podemos encontrar un resultado intermedio antes de responder. Primero anotamos qué necesitamos averiguar y después usamos ese resultado en la siguiente cuenta. Al final comprobamos si tiene sentido.",
    "ejemplo": "Tenés 10 pesos de juego. Comprás dos fichas de 2,35 pesos cada una. Te quedan 5,30 pesos.",
    "pasos": [
      "Las dos fichas cuestan 2 × 2,35 = 4,70 pesos.",
      "Restamos el gasto al dinero inicial: 10 − 4,70 = 5,30 pesos."
    ],
    "pista": "Primero calculá el gasto total; después restalo del dinero inicial.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "En una tienda de juego tenés 10 pesos. Comprás 2 fichas de 2,35 pesos cada una. ¿Cuántos pesos te quedan?",
        "respuesta_correcta": "5,3",
        "opciones": [
          "5,3",
          "7,65",
          "4,7"
        ],
        "paso_resuelto": "Gasto: 2 × 2,35 = 4,7. Después: 10 − 4,7 = 5,3 pesos.",
        "visual": null,
        "id": "prof_dec_dos_pasos-v1"
      },
      {
        "enunciado": "En una tienda de juego tenés 8 pesos. Comprás 3 fichas de 1,2 pesos cada una. ¿Cuántos pesos te quedan?",
        "respuesta_correcta": "4,4",
        "opciones": [
          "6,8",
          "3,6",
          "4,4"
        ],
        "paso_resuelto": "Gasto: 3 × 1,2 = 3,6. Después: 8 − 3,6 = 4,4 pesos.",
        "visual": null,
        "id": "prof_dec_dos_pasos-v2"
      },
      {
        "enunciado": "En una tienda de juego tenés 12 pesos. Comprás 4 fichas de 2,15 pesos cada una. ¿Cuántos pesos te quedan?",
        "respuesta_correcta": "3,4",
        "opciones": [
          "8,6",
          "3,4",
          "9,85"
        ],
        "paso_resuelto": "Gasto: 4 × 2,15 = 8,6. Después: 12 − 8,6 = 3,4 pesos.",
        "visual": null,
        "id": "prof_dec_dos_pasos-v3"
      },
      {
        "enunciado": "En una tienda de juego tenés 5 pesos. Comprás 2 fichas de 1,75 pesos cada una. ¿Cuántos pesos te quedan?",
        "respuesta_correcta": "1,5",
        "opciones": [
          "1,5",
          "3,25",
          "3,5"
        ],
        "paso_resuelto": "Gasto: 2 × 1,75 = 3,5. Después: 5 − 3,5 = 1,5 pesos.",
        "visual": null,
        "id": "prof_dec_dos_pasos-v4"
      },
      {
        "enunciado": "En una tienda de juego tenés 15 pesos. Comprás 3 fichas de 2,4 pesos cada una. ¿Cuántos pesos te quedan?",
        "respuesta_correcta": "7,8",
        "opciones": [
          "12,6",
          "7,2",
          "7,8"
        ],
        "paso_resuelto": "Gasto: 3 × 2,4 = 7,2. Después: 15 − 7,2 = 7,8 pesos.",
        "visual": null,
        "id": "prof_dec_dos_pasos-v5"
      },
      {
        "enunciado": "En una tienda de juego tenés 20 pesos. Comprás 4 fichas de 3,25 pesos cada una. ¿Cuántos pesos te quedan?",
        "respuesta_correcta": "7",
        "opciones": [
          "13",
          "7",
          "16,75"
        ],
        "paso_resuelto": "Gasto: 4 × 3,25 = 13. Después: 20 − 13 = 7 pesos.",
        "visual": null,
        "id": "prof_dec_dos_pasos-v6"
      }
    ]
  }
];
for (const unidad of DECIMALES_R11) {
 const indice = UNIDADES_BASES.findIndex(u => u.id === unidad.despues_de);
 if (indice < 0) throw new Error('Falta el paso anterior de ' + unidad.id);
 UNIDADES_BASES.splice(indice + 1, 0, unidad);
}
// FIN R11

// R12: medidas paso a paso.
const MEDIDAS_R12 = [
  {
    "id": "prof_med_long_escala",
    "tema": "si_me_la_longitud",
    "despues_de": "mat_long_metros",
    "titulo": "Una escala para medir longitudes",
    "explicacion": "Ordenamos las unidades de mayor a menor: km → hm → dam → m → dm → cm → mm. Se llaman kilómetro, hectómetro, decámetro, metro, decímetro, centímetro y milímetro. Cada unidad contiene diez de la siguiente: al usar una unidad menor necesitamos más partes para la misma longitud.",
    "ejemplo": "3 m = 30 dm: de m a dm hay un paso hacia una unidad menor.",
    "pasos": [
      "Un metro contiene diez decímetros.",
      "Tres metros contienen 3 × 10 = 30 decímetros."
    ],
    "pista": "La medida no cambia: cambia cuántas partes de esa unidad contamos.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Convertí 3 m a dm. ¿Qué número va delante de dm?",
        "respuesta_correcta": "30",
        "opciones": [
          "30",
          "0,3",
          "31"
        ],
        "paso_resuelto": "1 m = 10 dm.\n3 × 10 = 30. Son 30 dm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_escala-v1"
      },
      {
        "enunciado": "Convertí 2 km a hm. ¿Qué número va delante de hm?",
        "respuesta_correcta": "20",
        "opciones": [
          "0,2",
          "21",
          "20"
        ],
        "paso_resuelto": "1 km = 10 hm.\n2 × 10 = 20. Son 20 hm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_escala-v2"
      },
      {
        "enunciado": "Convertí 4 hm a dam. ¿Qué número va delante de dam?",
        "respuesta_correcta": "40",
        "opciones": [
          "41",
          "40",
          "0,4"
        ],
        "paso_resuelto": "1 hm = 10 dam.\n4 × 10 = 40. Son 40 dam; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_escala-v3"
      },
      {
        "enunciado": "Convertí 5 dam a m. ¿Qué número va delante de m?",
        "respuesta_correcta": "50",
        "opciones": [
          "50",
          "0,5",
          "51"
        ],
        "paso_resuelto": "1 dam = 10 m.\n5 × 10 = 50. Son 50 m; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_escala-v4"
      },
      {
        "enunciado": "Convertí 6 dm a cm. ¿Qué número va delante de cm?",
        "respuesta_correcta": "60",
        "opciones": [
          "0,6",
          "61",
          "60"
        ],
        "paso_resuelto": "1 dm = 10 cm.\n6 × 10 = 60. Son 60 cm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_escala-v5"
      },
      {
        "enunciado": "Convertí 7 cm a mm. ¿Qué número va delante de mm?",
        "respuesta_correcta": "70",
        "opciones": [
          "71",
          "70",
          "0,7"
        ],
        "paso_resuelto": "1 cm = 10 mm.\n7 × 10 = 70. Son 70 mm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_escala-v6"
      }
    ]
  },
  {
    "id": "prof_med_long_menor",
    "tema": "si_me_la_longitud",
    "despues_de": "prof_med_long_escala",
    "titulo": "Contar varios pasos hacia unidades menores",
    "explicacion": "Cada paso hacia una unidad menor multiplica el número por diez. Dos pasos multiplican por 100 y tres por 1000. Contamos los saltos entre unidades, no la cantidad de nombres escritos.",
    "ejemplo": "2 m = 2000 mm.",
    "pasos": [
      "De m a mm recorremos m → dm → cm → mm: tres saltos.",
      "2 × 10 × 10 × 10 = 2000 mm."
    ],
    "pista": "Marcá la unidad inicial y la final; contá los saltos.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Convertí 2 m a mm. ¿Qué número va delante de mm?",
        "respuesta_correcta": "2000",
        "opciones": [
          "2000",
          "0,002",
          "2001"
        ],
        "paso_resuelto": "1 m = 1000 mm.\n2 × 1000 = 2000. Son 2000 mm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_menor-v1"
      },
      {
        "enunciado": "Convertí 3 km a m. ¿Qué número va delante de m?",
        "respuesta_correcta": "3000",
        "opciones": [
          "0,003",
          "3001",
          "3000"
        ],
        "paso_resuelto": "1 km = 1000 m.\n3 × 1000 = 3000. Son 3000 m; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_menor-v2"
      },
      {
        "enunciado": "Convertí 4 hm a m. ¿Qué número va delante de m?",
        "respuesta_correcta": "400",
        "opciones": [
          "401",
          "400",
          "0,04"
        ],
        "paso_resuelto": "1 hm = 100 m.\n4 × 100 = 400. Son 400 m; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_menor-v3"
      },
      {
        "enunciado": "Convertí 5 dam a cm. ¿Qué número va delante de cm?",
        "respuesta_correcta": "5000",
        "opciones": [
          "5000",
          "0,005",
          "5001"
        ],
        "paso_resuelto": "1 dam = 1000 cm.\n5 × 1000 = 5000. Son 5000 cm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_menor-v4"
      },
      {
        "enunciado": "Convertí 6 dm a mm. ¿Qué número va delante de mm?",
        "respuesta_correcta": "600",
        "opciones": [
          "0,06",
          "601",
          "600"
        ],
        "paso_resuelto": "1 dm = 100 mm.\n6 × 100 = 600. Son 600 mm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_menor-v5"
      },
      {
        "enunciado": "Convertí 7 m a cm. ¿Qué número va delante de cm?",
        "respuesta_correcta": "700",
        "opciones": [
          "701",
          "700",
          "0,07"
        ],
        "paso_resuelto": "1 m = 100 cm.\n7 × 100 = 700. Son 700 cm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_menor-v6"
      }
    ]
  },
  {
    "id": "prof_med_long_mayor",
    "tema": "si_me_la_longitud",
    "despues_de": "prof_med_long_menor",
    "titulo": "Agrupar en unidades mayores",
    "explicacion": "Para pasar a una unidad mayor agrupamos partes pequeñas. De centímetros a metros agrupamos de cien: dividimos por 100. Cada salto hacia una unidad mayor divide por diez. La cantidad escrita disminuye y la longitud se conserva.",
    "ejemplo": "300 cm = 3 m.",
    "pasos": [
      "Cada metro reúne 100 centímetros.",
      "300 ÷ 100 = 3 grupos: son 3 metros."
    ],
    "pista": "Hacia una unidad mayor, dividí por diez en cada salto.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Convertí 300 cm a m. ¿Qué número va delante de m?",
        "respuesta_correcta": "3",
        "opciones": [
          "3",
          "30000",
          "4"
        ],
        "paso_resuelto": "1 m = 100 cm.\n300 ÷ 100 = 3. Son 3 m; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_mayor-v1"
      },
      {
        "enunciado": "Convertí 4000 m a km. ¿Qué número va delante de km?",
        "respuesta_correcta": "4",
        "opciones": [
          "4000000",
          "5",
          "4"
        ],
        "paso_resuelto": "1 km = 1000 m.\n4000 ÷ 1000 = 4. Son 4 km; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_mayor-v2"
      },
      {
        "enunciado": "Convertí 50 mm a cm. ¿Qué número va delante de cm?",
        "respuesta_correcta": "5",
        "opciones": [
          "6",
          "5",
          "500"
        ],
        "paso_resuelto": "1 cm = 10 mm.\n50 ÷ 10 = 5. Son 5 cm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_mayor-v3"
      },
      {
        "enunciado": "Convertí 600 dm a dam. ¿Qué número va delante de dam?",
        "respuesta_correcta": "6",
        "opciones": [
          "6",
          "60000",
          "7"
        ],
        "paso_resuelto": "1 dam = 100 dm.\n600 ÷ 100 = 6. Son 6 dam; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_mayor-v4"
      },
      {
        "enunciado": "Convertí 7000 mm a m. ¿Qué número va delante de m?",
        "respuesta_correcta": "7",
        "opciones": [
          "7000000",
          "8",
          "7"
        ],
        "paso_resuelto": "1 m = 1000 mm.\n7000 ÷ 1000 = 7. Son 7 m; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_mayor-v5"
      },
      {
        "enunciado": "Convertí 800 m a hm. ¿Qué número va delante de hm?",
        "respuesta_correcta": "8",
        "opciones": [
          "9",
          "8",
          "80000"
        ],
        "paso_resuelto": "1 hm = 100 m.\n800 ÷ 100 = 8. Son 8 hm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_mayor-v6"
      }
    ]
  },
  {
    "id": "prof_med_long_decimal",
    "tema": "si_me_la_longitud",
    "despues_de": "prof_med_long_mayor",
    "titulo": "Cuando la medida incluye parte de una unidad",
    "explicacion": "Un decimal puede expresar una parte de una medida. En 1,25 m hay un metro y 25 centésimos de metro. Como un metro tiene 100 centímetros, esos 25 centésimos son 25 cm. Para convertir usamos la misma equivalencia aunque el número tenga coma.",
    "ejemplo": "1,25 m = 125 cm; 75 cm = 0,75 m.",
    "pasos": [
      "1 m aporta 100 cm y 0,25 m aporta 25 cm: 100 + 25 = 125 cm.",
      "75 cm son 75 de las 100 partes de un metro: 75 ÷ 100 = 0,75 m."
    ],
    "pista": "Pensá cuánto vale un entero en la unidad de destino.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Convertí 1,25 m a cm. ¿Qué número va delante de cm?",
        "respuesta_correcta": "125",
        "opciones": [
          "125",
          "0,0125",
          "126"
        ],
        "paso_resuelto": "1 m = 100 cm.\n1,25 × 100 = 125. Son 125 cm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_decimal-v1"
      },
      {
        "enunciado": "Convertí 2,5 km a m. ¿Qué número va delante de m?",
        "respuesta_correcta": "2500",
        "opciones": [
          "0,0025",
          "2501",
          "2500"
        ],
        "paso_resuelto": "1 km = 1000 m.\n2,5 × 1000 = 2500. Son 2500 m; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_decimal-v2"
      },
      {
        "enunciado": "Convertí 0,4 m a mm. ¿Qué número va delante de mm?",
        "respuesta_correcta": "400",
        "opciones": [
          "401",
          "400",
          "0,0004"
        ],
        "paso_resuelto": "1 m = 1000 mm.\n0,4 × 1000 = 400. Son 400 mm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_decimal-v3"
      },
      {
        "enunciado": "Convertí 75 cm a m. ¿Qué número va delante de m?",
        "respuesta_correcta": "0,75",
        "opciones": [
          "0,75",
          "7500",
          "1,75"
        ],
        "paso_resuelto": "1 m = 100 cm.\n75 ÷ 100 = 0,75. Son 0,75 m; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_decimal-v4"
      },
      {
        "enunciado": "Convertí 1500 m a km. ¿Qué número va delante de km?",
        "respuesta_correcta": "1,5",
        "opciones": [
          "1500000",
          "2,5",
          "1,5"
        ],
        "paso_resuelto": "1 km = 1000 m.\n1500 ÷ 1000 = 1,5. Son 1,5 km; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_decimal-v5"
      },
      {
        "enunciado": "Convertí 35 mm a cm. ¿Qué número va delante de cm?",
        "respuesta_correcta": "3,5",
        "opciones": [
          "4,5",
          "3,5",
          "350"
        ],
        "paso_resuelto": "1 cm = 10 mm.\n35 ÷ 10 = 3,5. Son 3,5 cm; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_long_decimal-v6"
      }
    ]
  },
  {
    "id": "prof_med_long_problema",
    "tema": "si_me_la_longitud",
    "despues_de": "mat_long_combinar",
    "titulo": "Convertir primero, cortar después",
    "explicacion": "Para saber cuánto queda de una cinta, expresamos la cinta y el corte en la misma unidad antes de restar. Elegimos una unidad que permita hacer la cuenta y escribimos la unidad del resultado.",
    "ejemplo": "Una cinta de 2 m pierde un trozo de 35 cm. Quedan 165 cm.",
    "pasos": [
      "Pasamos la cinta a centímetros: 2 × 100 = 200 cm.",
      "Restamos el corte: 200 − 35 = 165 cm."
    ],
    "pista": "Primero igualá las unidades; después restá el corte.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Una cinta mide 2 m. Cortás 35 cm. ¿Cuántos centímetros quedan?",
        "respuesta_correcta": "165",
        "opciones": [
          "165",
          "235",
          "200"
        ],
        "paso_resuelto": "2 m = 200 cm.\n200 − 35 = 165 cm.",
        "visual": null,
        "id": "prof_med_long_problema-v1"
      },
      {
        "enunciado": "Una cinta mide 1,5 m. Cortás 40 cm. ¿Cuántos centímetros quedan?",
        "respuesta_correcta": "110",
        "opciones": [
          "190",
          "150",
          "110"
        ],
        "paso_resuelto": "1,5 m = 150 cm.\n150 − 40 = 110 cm.",
        "visual": null,
        "id": "prof_med_long_problema-v2"
      },
      {
        "enunciado": "Una cinta mide 3 m. Cortás 75 cm. ¿Cuántos centímetros quedan?",
        "respuesta_correcta": "225",
        "opciones": [
          "300",
          "225",
          "375"
        ],
        "paso_resuelto": "3 m = 300 cm.\n300 − 75 = 225 cm.",
        "visual": null,
        "id": "prof_med_long_problema-v3"
      },
      {
        "enunciado": "Una cinta mide 2,25 m. Cortás 50 cm. ¿Cuántos centímetros quedan?",
        "respuesta_correcta": "175",
        "opciones": [
          "175",
          "275",
          "225"
        ],
        "paso_resuelto": "2,25 m = 225 cm.\n225 − 50 = 175 cm.",
        "visual": null,
        "id": "prof_med_long_problema-v4"
      },
      {
        "enunciado": "Una cinta mide 1,2 m. Cortás 35 cm. ¿Cuántos centímetros quedan?",
        "respuesta_correcta": "85",
        "opciones": [
          "155",
          "120",
          "85"
        ],
        "paso_resuelto": "1,2 m = 120 cm.\n120 − 35 = 85 cm.",
        "visual": null,
        "id": "prof_med_long_problema-v5"
      },
      {
        "enunciado": "Una cinta mide 4 m. Cortás 125 cm. ¿Cuántos centímetros quedan?",
        "respuesta_correcta": "275",
        "opciones": [
          "400",
          "275",
          "525"
        ],
        "paso_resuelto": "4 m = 400 cm.\n400 − 125 = 275 cm.",
        "visual": null,
        "id": "prof_med_long_problema-v6"
      }
    ]
  },
  {
    "id": "prof_med_masa_escala",
    "tema": "si_me_la_masa_capacidad_tiempo",
    "despues_de": "mat_med_masa_capacidad",
    "titulo": "La escala de la masa",
    "explicacion": "Las unidades de masa forman esta escala: kg → hg → dag → g → dg → cg → mg. Son kilogramo, hectogramo, decagramo, gramo, decigramo, centigramo y miligramo. Cada paso hacia una unidad menor multiplica por diez; hacia una mayor divide por diez.",
    "ejemplo": "2 kg = 200 dag.",
    "pasos": [
      "De kg a dag hay dos pasos: kg → hg → dag.",
      "2 × 100 = 200 dag; seguimos midiendo la misma masa."
    ],
    "pista": "Usá solo unidades de masa y contá los saltos de su escala.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Convertí 2 kg a dag. ¿Qué número va delante de dag?",
        "respuesta_correcta": "200",
        "opciones": [
          "200",
          "0,02",
          "201"
        ],
        "paso_resuelto": "1 kg = 100 dag.\n2 × 100 = 200. Son 200 dag; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_masa_escala-v1"
      },
      {
        "enunciado": "Convertí 3 hg a g. ¿Qué número va delante de g?",
        "respuesta_correcta": "300",
        "opciones": [
          "0,03",
          "301",
          "300"
        ],
        "paso_resuelto": "1 hg = 100 g.\n3 × 100 = 300. Son 300 g; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_masa_escala-v2"
      },
      {
        "enunciado": "Convertí 4 g a mg. ¿Qué número va delante de mg?",
        "respuesta_correcta": "4000",
        "opciones": [
          "4001",
          "4000",
          "0,004"
        ],
        "paso_resuelto": "1 g = 1000 mg.\n4 × 1000 = 4000. Son 4000 mg; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_masa_escala-v3"
      },
      {
        "enunciado": "Convertí 5000 mg a g. ¿Qué número va delante de g?",
        "respuesta_correcta": "5",
        "opciones": [
          "5",
          "5000000",
          "6"
        ],
        "paso_resuelto": "1 g = 1000 mg.\n5000 ÷ 1000 = 5. Son 5 g; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_masa_escala-v4"
      },
      {
        "enunciado": "Convertí 600 cg a g. ¿Qué número va delante de g?",
        "respuesta_correcta": "6",
        "opciones": [
          "60000",
          "7",
          "6"
        ],
        "paso_resuelto": "1 g = 100 cg.\n600 ÷ 100 = 6. Son 6 g; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_masa_escala-v5"
      },
      {
        "enunciado": "Convertí 700 dag a kg. ¿Qué número va delante de kg?",
        "respuesta_correcta": "7",
        "opciones": [
          "8",
          "7",
          "70000"
        ],
        "paso_resuelto": "1 kg = 100 dag.\n700 ÷ 100 = 7. Son 7 kg; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_masa_escala-v6"
      }
    ]
  },
  {
    "id": "prof_med_cap_escala",
    "tema": "si_me_la_masa_capacidad_tiempo",
    "despues_de": "prof_med_masa_escala",
    "titulo": "La escala de la capacidad",
    "explicacion": "Para medir capacidad usamos kL → hL → daL → L → dL → cL → mL: kilolitro, hectolitro, decalitro, litro, decilitro, centilitro y mililitro. Cada salto cambia el número por un factor diez. Los litros miden capacidad; los gramos miden masa. No los intercambiamos.",
    "ejemplo": "3 L = 300 cL.",
    "pasos": [
      "De L a cL hay dos pasos: L → dL → cL.",
      "3 × 100 = 300 cL. Es la misma capacidad."
    ],
    "pista": "Conservá la magnitud: una capacidad se convierte a otra unidad de capacidad.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Convertí 3 L a cL. ¿Qué número va delante de cL?",
        "respuesta_correcta": "300",
        "opciones": [
          "300",
          "0,03",
          "301"
        ],
        "paso_resuelto": "1 L = 100 cL.\n3 × 100 = 300. Son 300 cL; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_cap_escala-v1"
      },
      {
        "enunciado": "Convertí 2 kL a L. ¿Qué número va delante de L?",
        "respuesta_correcta": "2000",
        "opciones": [
          "0,002",
          "2001",
          "2000"
        ],
        "paso_resuelto": "1 kL = 1000 L.\n2 × 1000 = 2000. Son 2000 L; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_cap_escala-v2"
      },
      {
        "enunciado": "Convertí 4 hL a L. ¿Qué número va delante de L?",
        "respuesta_correcta": "400",
        "opciones": [
          "401",
          "400",
          "0,04"
        ],
        "paso_resuelto": "1 hL = 100 L.\n4 × 100 = 400. Son 400 L; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_cap_escala-v3"
      },
      {
        "enunciado": "Convertí 5000 mL a L. ¿Qué número va delante de L?",
        "respuesta_correcta": "5",
        "opciones": [
          "5",
          "5000000",
          "6"
        ],
        "paso_resuelto": "1 L = 1000 mL.\n5000 ÷ 1000 = 5. Son 5 L; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_cap_escala-v4"
      },
      {
        "enunciado": "Convertí 600 cL a L. ¿Qué número va delante de L?",
        "respuesta_correcta": "6",
        "opciones": [
          "60000",
          "7",
          "6"
        ],
        "paso_resuelto": "1 L = 100 cL.\n600 ÷ 100 = 6. Son 6 L; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_cap_escala-v5"
      },
      {
        "enunciado": "Convertí 700 dL a daL. ¿Qué número va delante de daL?",
        "respuesta_correcta": "7",
        "opciones": [
          "8",
          "7",
          "70000"
        ],
        "paso_resuelto": "1 daL = 100 dL.\n700 ÷ 100 = 7. Son 7 daL; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_cap_escala-v6"
      }
    ]
  },
  {
    "id": "prof_med_masa_decimal",
    "tema": "si_me_la_masa_capacidad_tiempo",
    "despues_de": "prof_med_cap_escala",
    "titulo": "Partes de un kilogramo",
    "explicacion": "Un kilogramo tiene 1000 gramos. Medio kilogramo, escrito 0,5 kg, contiene 500 g. Para pasar de kg a g multiplicamos por 1000; para volver dividimos por 1000. La coma puede indicar una parte de kilogramo, no una masa diferente.",
    "ejemplo": "1,25 kg = 1250 g; 750 g = 0,75 kg.",
    "pasos": [
      "1 kg aporta 1000 g y un cuarto de kg, 0,25 kg, aporta 250 g: suman 1250 g.",
      "750 g son 750 de las 1000 partes de un kg: 750 ÷ 1000 = 0,75 kg."
    ],
    "pista": "Un kilogramo contiene mil gramos; usá esa equivalencia en ambos sentidos.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Convertí 1,25 kg a g. ¿Qué número va delante de g?",
        "respuesta_correcta": "1250",
        "opciones": [
          "1250",
          "0,00125",
          "1251"
        ],
        "paso_resuelto": "1 kg = 1000 g.\n1,25 × 1000 = 1250. Son 1250 g; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_masa_decimal-v1"
      },
      {
        "enunciado": "Convertí 0,5 kg a g. ¿Qué número va delante de g?",
        "respuesta_correcta": "500",
        "opciones": [
          "0,0005",
          "501",
          "500"
        ],
        "paso_resuelto": "1 kg = 1000 g.\n0,5 × 1000 = 500. Son 500 g; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_masa_decimal-v2"
      },
      {
        "enunciado": "Convertí 2,4 kg a g. ¿Qué número va delante de g?",
        "respuesta_correcta": "2400",
        "opciones": [
          "2401",
          "2400",
          "0,0024"
        ],
        "paso_resuelto": "1 kg = 1000 g.\n2,4 × 1000 = 2400. Son 2400 g; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_masa_decimal-v3"
      },
      {
        "enunciado": "Convertí 750 g a kg. ¿Qué número va delante de kg?",
        "respuesta_correcta": "0,75",
        "opciones": [
          "0,75",
          "750000",
          "1,75"
        ],
        "paso_resuelto": "1 kg = 1000 g.\n750 ÷ 1000 = 0,75. Son 0,75 kg; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_masa_decimal-v4"
      },
      {
        "enunciado": "Convertí 1500 g a kg. ¿Qué número va delante de kg?",
        "respuesta_correcta": "1,5",
        "opciones": [
          "1500000",
          "2,5",
          "1,5"
        ],
        "paso_resuelto": "1 kg = 1000 g.\n1500 ÷ 1000 = 1,5. Son 1,5 kg; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_masa_decimal-v5"
      },
      {
        "enunciado": "Convertí 250 g a kg. ¿Qué número va delante de kg?",
        "respuesta_correcta": "0,25",
        "opciones": [
          "1,25",
          "0,25",
          "250000"
        ],
        "paso_resuelto": "1 kg = 1000 g.\n250 ÷ 1000 = 0,25. Son 0,25 kg; la cantidad medida es la misma.",
        "visual": null,
        "id": "prof_med_masa_decimal-v6"
      }
    ]
  },
  {
    "id": "prof_med_masa_problema",
    "tema": "si_me_la_masa_capacidad_tiempo",
    "despues_de": "prof_med_masa_decimal",
    "titulo": "Cuánto queda en la bolsa",
    "explicacion": "Para calcular cuánto queda de un material, pasamos todas las masas a gramos y luego restamos. El número del paquete puede estar en kilogramos y el de una porción en gramos: primero los hacemos comparables.",
    "ejemplo": "Una bolsa tiene 1,5 kg de harina. Si usamos 250 g, quedan 1250 g.",
    "pasos": [
      "1,5 × 1000 = 1500 g.",
      "1500 − 250 = 1250 g."
    ],
    "pista": "Convertí la masa inicial a gramos antes de quitar lo usado.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Una bolsa contiene 1,5 kg de harina. Usás 250 g. ¿Cuántos gramos quedan?",
        "respuesta_correcta": "1250",
        "opciones": [
          "1250",
          "1750",
          "1500"
        ],
        "paso_resuelto": "1,5 × 1000 = 1500 g.\n1500 − 250 = 1250 g.",
        "visual": null,
        "id": "prof_med_masa_problema-v1"
      },
      {
        "enunciado": "Una bolsa contiene 2 kg de harina. Usás 750 g. ¿Cuántos gramos quedan?",
        "respuesta_correcta": "1250",
        "opciones": [
          "2750",
          "2000",
          "1250"
        ],
        "paso_resuelto": "2 × 1000 = 2000 g.\n2000 − 750 = 1250 g.",
        "visual": null,
        "id": "prof_med_masa_problema-v2"
      },
      {
        "enunciado": "Una bolsa contiene 0,75 kg de harina. Usás 200 g. ¿Cuántos gramos quedan?",
        "respuesta_correcta": "550",
        "opciones": [
          "750",
          "550",
          "950"
        ],
        "paso_resuelto": "0,75 × 1000 = 750 g.\n750 − 200 = 550 g.",
        "visual": null,
        "id": "prof_med_masa_problema-v3"
      },
      {
        "enunciado": "Una bolsa contiene 1,25 kg de harina. Usás 450 g. ¿Cuántos gramos quedan?",
        "respuesta_correcta": "800",
        "opciones": [
          "800",
          "1700",
          "1250"
        ],
        "paso_resuelto": "1,25 × 1000 = 1250 g.\n1250 − 450 = 800 g.",
        "visual": null,
        "id": "prof_med_masa_problema-v4"
      },
      {
        "enunciado": "Una bolsa contiene 3 kg de harina. Usás 1250 g. ¿Cuántos gramos quedan?",
        "respuesta_correcta": "1750",
        "opciones": [
          "4250",
          "3000",
          "1750"
        ],
        "paso_resuelto": "3 × 1000 = 3000 g.\n3000 − 1250 = 1750 g.",
        "visual": null,
        "id": "prof_med_masa_problema-v5"
      },
      {
        "enunciado": "Una bolsa contiene 2,5 kg de harina. Usás 800 g. ¿Cuántos gramos quedan?",
        "respuesta_correcta": "1700",
        "opciones": [
          "2500",
          "1700",
          "3300"
        ],
        "paso_resuelto": "2,5 × 1000 = 2500 g.\n2500 − 800 = 1700 g.",
        "visual": null,
        "id": "prof_med_masa_problema-v6"
      }
    ]
  },
  {
    "id": "prof_med_cap_problema",
    "tema": "si_me_la_masa_capacidad_tiempo",
    "despues_de": "prof_med_masa_problema",
    "titulo": "Repartir una bebida en vasos",
    "explicacion": "Un litro contiene 1000 mL y medio litro, 0,5 L, contiene 500 mL. Para saber cuántos vasos podemos llenar, convertimos la bebida a mililitros y dividimos entre la capacidad de un vaso. Contamos vasos completos; en estos ejemplos no sobra bebida.",
    "ejemplo": "1,5 L de jugo llenan 6 vasos de 250 mL.",
    "pasos": [
      "1,5 L = 1000 mL + 500 mL = 1500 mL.",
      "1500 ÷ 250 = 6. Comprobamos: 6 × 250 = 1500 mL."
    ],
    "pista": "Primero pasá todo a mL; después buscá cuántas veces entra un vaso.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Tenés 1,5 L de jugo y vasos de 250 mL. ¿Cuántos vasos completos llenás sin que sobre?",
        "respuesta_correcta": "6",
        "opciones": [
          "6",
          "7",
          "5"
        ],
        "paso_resuelto": "1,5 L = 1500 mL.\n1500 ÷ 250 = 6 vasos. Comprobación: 6 × 250 = 1500 mL.",
        "visual": null,
        "id": "prof_med_cap_problema-v1"
      },
      {
        "enunciado": "Tenés 2 L de jugo y vasos de 200 mL. ¿Cuántos vasos completos llenás sin que sobre?",
        "respuesta_correcta": "10",
        "opciones": [
          "11",
          "9",
          "10"
        ],
        "paso_resuelto": "2 L = 2000 mL.\n2000 ÷ 200 = 10 vasos. Comprobación: 10 × 200 = 2000 mL.",
        "visual": null,
        "id": "prof_med_cap_problema-v2"
      },
      {
        "enunciado": "Tenés 0,75 L de jugo y vasos de 250 mL. ¿Cuántos vasos completos llenás sin que sobre?",
        "respuesta_correcta": "3",
        "opciones": [
          "2",
          "3",
          "4"
        ],
        "paso_resuelto": "0,75 L = 750 mL.\n750 ÷ 250 = 3 vasos. Comprobación: 3 × 250 = 750 mL.",
        "visual": null,
        "id": "prof_med_cap_problema-v3"
      },
      {
        "enunciado": "Tenés 1,2 L de jugo y vasos de 200 mL. ¿Cuántos vasos completos llenás sin que sobre?",
        "respuesta_correcta": "6",
        "opciones": [
          "6",
          "7",
          "5"
        ],
        "paso_resuelto": "1,2 L = 1200 mL.\n1200 ÷ 200 = 6 vasos. Comprobación: 6 × 200 = 1200 mL.",
        "visual": null,
        "id": "prof_med_cap_problema-v4"
      },
      {
        "enunciado": "Tenés 2,5 L de jugo y vasos de 500 mL. ¿Cuántos vasos completos llenás sin que sobre?",
        "respuesta_correcta": "5",
        "opciones": [
          "6",
          "4",
          "5"
        ],
        "paso_resuelto": "2,5 L = 2500 mL.\n2500 ÷ 500 = 5 vasos. Comprobación: 5 × 500 = 2500 mL.",
        "visual": null,
        "id": "prof_med_cap_problema-v5"
      },
      {
        "enunciado": "Tenés 3 L de jugo y vasos de 250 mL. ¿Cuántos vasos completos llenás sin que sobre?",
        "respuesta_correcta": "12",
        "opciones": [
          "11",
          "12",
          "13"
        ],
        "paso_resuelto": "3 L = 3000 mL.\n3000 ÷ 250 = 12 vasos. Comprobación: 12 × 250 = 3000 mL.",
        "visual": null,
        "id": "prof_med_cap_problema-v6"
      }
    ]
  },
  {
    "id": "prof_med_tiempo_resto",
    "tema": "si_me_la_masa_capacidad_tiempo",
    "despues_de": "mat_med_tiempo",
    "titulo": "Agrupar minutos en horas",
    "explicacion": "Para escribir minutos como horas y minutos, agrupamos de sesenta. El cociente indica las horas completas y el resto, los minutos que todavía no forman otra hora. No escribimos 90 minutos como 0,90 horas.",
    "ejemplo": "95 minutos son 1 h y 35 min.",
    "pasos": [
      "95 ÷ 60 da 1 hora completa y sobran 35 minutos.",
      "Comprobamos: 1 × 60 + 35 = 95 minutos."
    ],
    "pista": "Cada hora completa reúne 60 minutos; conservá lo que sobra.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Expresá 95 minutos como horas y minutos.",
        "respuesta_correcta": "1 h 35 min",
        "opciones": [
          "1 h 35 min",
          "0 h 95 min",
          "1 h 36 min"
        ],
        "paso_resuelto": "95 ÷ 60: 1 hora(s) y resto 35 minutos.\n1 × 60 + 35 = 95.",
        "visual": null,
        "id": "prof_med_tiempo_resto-v1"
      },
      {
        "enunciado": "Expresá 130 minutos como horas y minutos.",
        "respuesta_correcta": "2 h 10 min",
        "opciones": [
          "1 h 30 min",
          "2 h 11 min",
          "2 h 10 min"
        ],
        "paso_resuelto": "130 ÷ 60: 2 hora(s) y resto 10 minutos.\n2 × 60 + 10 = 130.",
        "visual": null,
        "id": "prof_med_tiempo_resto-v2"
      },
      {
        "enunciado": "Expresá 75 minutos como horas y minutos.",
        "respuesta_correcta": "1 h 15 min",
        "opciones": [
          "1 h 16 min",
          "1 h 15 min",
          "0 h 75 min"
        ],
        "paso_resuelto": "75 ÷ 60: 1 hora(s) y resto 15 minutos.\n1 × 60 + 15 = 75.",
        "visual": null,
        "id": "prof_med_tiempo_resto-v3"
      },
      {
        "enunciado": "Expresá 145 minutos como horas y minutos.",
        "respuesta_correcta": "2 h 25 min",
        "opciones": [
          "2 h 25 min",
          "1 h 45 min",
          "2 h 26 min"
        ],
        "paso_resuelto": "145 ÷ 60: 2 hora(s) y resto 25 minutos.\n2 × 60 + 25 = 145.",
        "visual": null,
        "id": "prof_med_tiempo_resto-v4"
      },
      {
        "enunciado": "Expresá 185 minutos como horas y minutos.",
        "respuesta_correcta": "3 h 5 min",
        "opciones": [
          "1 h 85 min",
          "3 h 6 min",
          "3 h 5 min"
        ],
        "paso_resuelto": "185 ÷ 60: 3 hora(s) y resto 5 minutos.\n3 × 60 + 5 = 185.",
        "visual": null,
        "id": "prof_med_tiempo_resto-v5"
      },
      {
        "enunciado": "Expresá 250 minutos como horas y minutos.",
        "respuesta_correcta": "4 h 10 min",
        "opciones": [
          "4 h 11 min",
          "4 h 10 min",
          "2 h 50 min"
        ],
        "paso_resuelto": "250 ÷ 60: 4 hora(s) y resto 10 minutos.\n4 × 60 + 10 = 250.",
        "visual": null,
        "id": "prof_med_tiempo_resto-v6"
      }
    ]
  },
  {
    "id": "prof_med_tiempo_duracion",
    "tema": "si_me_la_masa_capacidad_tiempo",
    "despues_de": "prof_med_tiempo_resto",
    "titulo": "Cuánto dura una actividad",
    "explicacion": "Para hallar una duración dentro del mismo día, podemos avanzar desde la hora de inicio hasta la siguiente hora y después hasta el final. Sumamos los dos tramos en minutos. Esta cuenta usa 60 minutos por hora.",
    "ejemplo": "Una actividad de 14:40 a 15:15 dura 35 minutos.",
    "pasos": [
      "De 14:40 a 15:00 pasan 60 − 40 = 20 minutos.",
      "De 15:00 a 15:15 pasan 15 minutos: 20 + 15 = 35 minutos."
    ],
    "pista": "Partí el recorrido en la hora en punto y sumá los minutos.",
    "visual": null,
    "actividades": [
      {
        "enunciado": "Una actividad empieza a las 14:40 y termina a las 15:15 del mismo día. ¿Cuántos minutos dura?",
        "respuesta_correcta": "35",
        "opciones": [
          "35",
          "75",
          "45"
        ],
        "paso_resuelto": "Hasta las 15:00: 60 − 40 = 20 minutos.\nDespués pasan 15 minutos más: 20 + 15 = 35 minutos.",
        "visual": null,
        "id": "prof_med_tiempo_duracion-v1"
      },
      {
        "enunciado": "Una actividad empieza a las 09:50 y termina a las 10:20 del mismo día. ¿Cuántos minutos dura?",
        "respuesta_correcta": "30",
        "opciones": [
          "70",
          "40",
          "30"
        ],
        "paso_resuelto": "Hasta las 10:00: 60 − 50 = 10 minutos.\nDespués pasan 20 minutos más: 10 + 20 = 30 minutos.",
        "visual": null,
        "id": "prof_med_tiempo_duracion-v2"
      },
      {
        "enunciado": "Una actividad empieza a las 16:35 y termina a las 17:10 del mismo día. ¿Cuántos minutos dura?",
        "respuesta_correcta": "35",
        "opciones": [
          "45",
          "35",
          "75"
        ],
        "paso_resuelto": "Hasta las 17:00: 60 − 35 = 25 minutos.\nDespués pasan 10 minutos más: 25 + 10 = 35 minutos.",
        "visual": null,
        "id": "prof_med_tiempo_duracion-v3"
      },
      {
        "enunciado": "Una actividad empieza a las 11:45 y termina a las 12:05 del mismo día. ¿Cuántos minutos dura?",
        "respuesta_correcta": "20",
        "opciones": [
          "20",
          "60",
          "30"
        ],
        "paso_resuelto": "Hasta las 12:00: 60 − 45 = 15 minutos.\nDespués pasan 5 minutos más: 15 + 5 = 20 minutos.",
        "visual": null,
        "id": "prof_med_tiempo_duracion-v4"
      },
      {
        "enunciado": "Una actividad empieza a las 18:20 y termina a las 19:25 del mismo día. ¿Cuántos minutos dura?",
        "respuesta_correcta": "65",
        "opciones": [
          "105",
          "75",
          "65"
        ],
        "paso_resuelto": "Hasta las 19:00: 60 − 20 = 40 minutos.\nDespués pasan 25 minutos más: 40 + 25 = 65 minutos.",
        "visual": null,
        "id": "prof_med_tiempo_duracion-v5"
      },
      {
        "enunciado": "Una actividad empieza a las 08:55 y termina a las 09:15 del mismo día. ¿Cuántos minutos dura?",
        "respuesta_correcta": "20",
        "opciones": [
          "30",
          "20",
          "60"
        ],
        "paso_resuelto": "Hasta las 09:00: 60 − 55 = 5 minutos.\nDespués pasan 15 minutos más: 5 + 15 = 20 minutos.",
        "visual": null,
        "id": "prof_med_tiempo_duracion-v6"
      }
    ]
  }
];
for (const unidad of MEDIDAS_R12) {
 const indice = UNIDADES_BASES.findIndex(u => u.id === unidad.despues_de);
 if (indice < 0) throw new Error('Falta el paso anterior de ' + unidad.id);
 UNIDADES_BASES.splice(indice + 1, 0, unidad);
}
// FIN R12



// R13: geometria con diagramas.
const GEOMETRIA_R13 = [
  {
    "id": "prof_geo_elementos",
    "tema": "geometria_angulos",
    "antes_de": "mat_ang_clases",
    "titulo": "Dos lados que nacen del mismo punto",
    "explicacion": "Un ángulo tiene dos lados que son semirrectas y nacen en un punto común, el vértice. Medimos la abertura entre los lados, no su longitud. Al escribir AOB, la letra del medio, O, nombra el vértice.",
    "ejemplo": "En el dibujo, OA y OB son los lados y O es el vértice.",
    "pasos": [
      "Buscamos dónde se encuentran los dos lados.",
      "Ese punto común es O: es el vértice."
    ],
    "pista": "Buscá el punto del que salen ambos lados.",
    "actividades": [
      {
        "enunciado": "Mirá el dibujo. ¿Qué letra nombra el vértice?",
        "respuesta_correcta": "O",
        "opciones": [
          "O",
          "A",
          "B"
        ],
        "paso_resuelto": "Los dos lados salen de O. Ese punto común es el vértice.",
        "visual": {
          "tipo": "angulo",
          "angulo": 60,
          "letras": [
            "O",
            "A",
            "B"
          ]
        },
        "id": "prof_geo_elementos-v1"
      },
      {
        "enunciado": "Mirá el dibujo. ¿Qué letra nombra el vértice?",
        "respuesta_correcta": "P",
        "opciones": [
          "C",
          "D",
          "P"
        ],
        "paso_resuelto": "Los dos lados salen de P. Ese punto común es el vértice.",
        "visual": {
          "tipo": "angulo",
          "angulo": 80,
          "letras": [
            "P",
            "C",
            "D"
          ]
        },
        "id": "prof_geo_elementos-v2"
      },
      {
        "enunciado": "Mirá el dibujo. ¿Qué letra nombra el vértice?",
        "respuesta_correcta": "Q",
        "opciones": [
          "F",
          "Q",
          "E"
        ],
        "paso_resuelto": "Los dos lados salen de Q. Ese punto común es el vértice.",
        "visual": {
          "tipo": "angulo",
          "angulo": 40,
          "letras": [
            "Q",
            "E",
            "F"
          ]
        },
        "id": "prof_geo_elementos-v3"
      },
      {
        "enunciado": "Mirá el dibujo. ¿Qué letra nombra el vértice?",
        "respuesta_correcta": "R",
        "opciones": [
          "R",
          "G",
          "H"
        ],
        "paso_resuelto": "Los dos lados salen de R. Ese punto común es el vértice.",
        "visual": {
          "tipo": "angulo",
          "angulo": 120,
          "letras": [
            "R",
            "G",
            "H"
          ]
        },
        "id": "prof_geo_elementos-v4"
      },
      {
        "enunciado": "Mirá el dibujo. ¿Qué letra nombra el vértice?",
        "respuesta_correcta": "S",
        "opciones": [
          "J",
          "K",
          "S"
        ],
        "paso_resuelto": "Los dos lados salen de S. Ese punto común es el vértice.",
        "visual": {
          "tipo": "angulo",
          "angulo": 100,
          "letras": [
            "S",
            "J",
            "K"
          ]
        },
        "id": "prof_geo_elementos-v5"
      },
      {
        "enunciado": "Mirá el dibujo. ¿Qué letra nombra el vértice?",
        "respuesta_correcta": "T",
        "opciones": [
          "M",
          "T",
          "L"
        ],
        "paso_resuelto": "Los dos lados salen de T. Ese punto común es el vértice.",
        "visual": {
          "tipo": "angulo",
          "angulo": 30,
          "letras": [
            "T",
            "L",
            "M"
          ]
        },
        "id": "prof_geo_elementos-v6"
      }
    ],
    "visual": {
      "tipo": "angulo",
      "angulo": 60,
      "letras": [
        "O",
        "A",
        "B"
      ]
    }
  },
  {
    "id": "prof_geo_transportador",
    "tema": "geometria_angulos",
    "despues_de": "mat_ang_clases",
    "titulo": "Empezar por el cero correcto",
    "explicacion": "Ponemos el centro del transportador en el vértice y alineamos un lado con el cero. Leemos la escala que comienza en ese cero hasta el otro lado. Si el lado inicial apunta a la izquierda, usamos el cero de la izquierda.",
    "ejemplo": "El lado naranja llega a 60° si empezamos en el cero derecho.",
    "pasos": [
      "El centro coincide con O y el lado azul pasa por el cero derecho.",
      "Seguimos esa escala hasta el lado naranja: 60°."
    ],
    "pista": "Elegí primero el cero sobre el lado azul.",
    "actividades": [
      {
        "enunciado": "Medí la abertura marcada. ¿Cuántos grados hay desde el lado azul hasta el naranja?",
        "respuesta_correcta": "60",
        "opciones": [
          "60",
          "120",
          "70"
        ],
        "paso_resuelto": "Empezamos en el cero de la derecha.\nSeguimos esa escala hasta el lado naranja: 60°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 60,
          "transportador": true,
          "izquierda": false
        },
        "id": "prof_geo_transportador-v1"
      },
      {
        "enunciado": "Medí la abertura marcada. ¿Cuántos grados hay desde el lado azul hasta el naranja?",
        "respuesta_correcta": "40",
        "opciones": [
          "140",
          "50",
          "40"
        ],
        "paso_resuelto": "Empezamos en el cero de la izquierda.\nSeguimos esa escala hasta el lado naranja: 40°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 40,
          "transportador": true,
          "izquierda": true
        },
        "id": "prof_geo_transportador-v2"
      },
      {
        "enunciado": "Medí la abertura marcada. ¿Cuántos grados hay desde el lado azul hasta el naranja?",
        "respuesta_correcta": "120",
        "opciones": [
          "130",
          "120",
          "60"
        ],
        "paso_resuelto": "Empezamos en el cero de la derecha.\nSeguimos esa escala hasta el lado naranja: 120°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 120,
          "transportador": true,
          "izquierda": false
        },
        "id": "prof_geo_transportador-v3"
      },
      {
        "enunciado": "Medí la abertura marcada. ¿Cuántos grados hay desde el lado azul hasta el naranja?",
        "respuesta_correcta": "70",
        "opciones": [
          "70",
          "110",
          "80"
        ],
        "paso_resuelto": "Empezamos en el cero de la izquierda.\nSeguimos esa escala hasta el lado naranja: 70°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 70,
          "transportador": true,
          "izquierda": true
        },
        "id": "prof_geo_transportador-v4"
      },
      {
        "enunciado": "Medí la abertura marcada. ¿Cuántos grados hay desde el lado azul hasta el naranja?",
        "respuesta_correcta": "130",
        "opciones": [
          "50",
          "140",
          "130"
        ],
        "paso_resuelto": "Empezamos en el cero de la izquierda.\nSeguimos esa escala hasta el lado naranja: 130°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 130,
          "transportador": true,
          "izquierda": true
        },
        "id": "prof_geo_transportador-v5"
      },
      {
        "enunciado": "Medí la abertura marcada. ¿Cuántos grados hay desde el lado azul hasta el naranja?",
        "respuesta_correcta": "30",
        "opciones": [
          "40",
          "30",
          "150"
        ],
        "paso_resuelto": "Empezamos en el cero de la derecha.\nSeguimos esa escala hasta el lado naranja: 30°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 30,
          "transportador": true,
          "izquierda": false
        },
        "id": "prof_geo_transportador-v6"
      }
    ],
    "visual": {
      "tipo": "angulo",
      "angulo": 60,
      "transportador": true
    }
  },
  {
    "id": "prof_geo_trazado",
    "tema": "geometria_angulos",
    "despues_de": "prof_geo_transportador",
    "titulo": "Construir un ángulo con transportador",
    "explicacion": "Para dibujar un ángulo, trazamos un lado y marcamos el vértice. Apoyamos allí el centro del transportador, alineamos el cero con el lado y marcamos la medida pedida. Al unir el vértice con esa marca obtenemos el segundo lado.",
    "ejemplo": "Para dibujar 60°, marcamos 60 en la escala que empieza en el lado azul.",
    "pasos": [
      "En la app, explorá la abertura con el control. En papel, dibujá el primer lado y ubicá el centro y el cero.",
      "Marcá 60° y trazá desde el vértice una semirrecta que pase por la marca."
    ],
    "pista": "La marca indica por dónde debe pasar el segundo lado.",
    "actividades": [
      {
        "enunciado": "Queremos construir un ángulo de 60°. ¿En qué número de la escala que empieza en el lado azul marcamos el punto?",
        "respuesta_correcta": "60",
        "opciones": [
          "60",
          "120",
          "70"
        ],
        "paso_resuelto": "El centro va en el vértice. Usamos el cero del lado azul y marcamos 60°.\nUnimos el vértice con esa marca para trazar el segundo lado.",
        "visual": {
          "tipo": "angulo",
          "angulo": 60,
          "transportador": true
        },
        "id": "prof_geo_trazado-v1"
      },
      {
        "enunciado": "Queremos construir un ángulo de 40°. ¿En qué número de la escala que empieza en el lado azul marcamos el punto?",
        "respuesta_correcta": "40",
        "opciones": [
          "140",
          "50",
          "40"
        ],
        "paso_resuelto": "El centro va en el vértice. Usamos el cero del lado azul y marcamos 40°.\nUnimos el vértice con esa marca para trazar el segundo lado.",
        "visual": {
          "tipo": "angulo",
          "angulo": 40,
          "transportador": true
        },
        "id": "prof_geo_trazado-v2"
      },
      {
        "enunciado": "Queremos construir un ángulo de 120°. ¿En qué número de la escala que empieza en el lado azul marcamos el punto?",
        "respuesta_correcta": "120",
        "opciones": [
          "130",
          "120",
          "60"
        ],
        "paso_resuelto": "El centro va en el vértice. Usamos el cero del lado azul y marcamos 120°.\nUnimos el vértice con esa marca para trazar el segundo lado.",
        "visual": {
          "tipo": "angulo",
          "angulo": 120,
          "transportador": true
        },
        "id": "prof_geo_trazado-v3"
      },
      {
        "enunciado": "Queremos construir un ángulo de 70°. ¿En qué número de la escala que empieza en el lado azul marcamos el punto?",
        "respuesta_correcta": "70",
        "opciones": [
          "70",
          "110",
          "80"
        ],
        "paso_resuelto": "El centro va en el vértice. Usamos el cero del lado azul y marcamos 70°.\nUnimos el vértice con esa marca para trazar el segundo lado.",
        "visual": {
          "tipo": "angulo",
          "angulo": 70,
          "transportador": true
        },
        "id": "prof_geo_trazado-v4"
      },
      {
        "enunciado": "Queremos construir un ángulo de 130°. ¿En qué número de la escala que empieza en el lado azul marcamos el punto?",
        "respuesta_correcta": "130",
        "opciones": [
          "50",
          "140",
          "130"
        ],
        "paso_resuelto": "El centro va en el vértice. Usamos el cero del lado azul y marcamos 130°.\nUnimos el vértice con esa marca para trazar el segundo lado.",
        "visual": {
          "tipo": "angulo",
          "angulo": 130,
          "transportador": true
        },
        "id": "prof_geo_trazado-v5"
      },
      {
        "enunciado": "Queremos construir un ángulo de 30°. ¿En qué número de la escala que empieza en el lado azul marcamos el punto?",
        "respuesta_correcta": "30",
        "opciones": [
          "40",
          "30",
          "150"
        ],
        "paso_resuelto": "El centro va en el vértice. Usamos el cero del lado azul y marcamos 30°.\nUnimos el vértice con esa marca para trazar el segundo lado.",
        "visual": {
          "tipo": "angulo",
          "angulo": 30,
          "transportador": true
        },
        "id": "prof_geo_trazado-v6"
      }
    ],
    "visual": {
      "tipo": "angulo",
      "angulo": 60,
      "transportador": true,
      "interactivo": true
    }
  },
  {
    "id": "prof_geo_perpendiculares",
    "tema": "geometria_angulos",
    "despues_de": "prof_geo_trazado",
    "titulo": "Rectas que forman cuatro ángulos rectos",
    "explicacion": "Dos rectas perpendiculares se cortan formando cuatro ángulos de 90°. Una escuadra permite comprobar el ángulo recto. Que dos rectas se crucen no alcanza para que sean perpendiculares.",
    "ejemplo": "Las rectas del dibujo forman cuatro ángulos de 90°.",
    "pasos": [
      "Apoyamos los dos lados del ángulo recto de la escuadra sobre las rectas.",
      "Si coinciden, las rectas son perpendiculares. Cada abertura mide 90°."
    ],
    "pista": "Buscá ángulos rectos, no solo un cruce.",
    "actividades": [
      {
        "enunciado": "Dos rectas se cortan y uno de sus ángulos mide 90°. ¿Son perpendiculares?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "90° es un ángulo recto: las rectas son perpendiculares.",
        "visual": {
          "tipo": "angulo",
          "angulo": 90,
          "rectas": true,
          "medida": true
        },
        "id": "prof_geo_perpendiculares-v1"
      },
      {
        "enunciado": "Dos rectas se cortan y uno de sus ángulos mide 60°. ¿Son perpendiculares?",
        "respuesta_correcta": "No",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "60° no es 90°: estas rectas no son perpendiculares.",
        "visual": {
          "tipo": "angulo",
          "angulo": 60,
          "rectas": true,
          "medida": true
        },
        "id": "prof_geo_perpendiculares-v2"
      },
      {
        "enunciado": "Dos rectas se cortan y uno de sus ángulos mide 120°. ¿Son perpendiculares?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "120° no es 90°: estas rectas no son perpendiculares.",
        "visual": {
          "tipo": "angulo",
          "angulo": 120,
          "rectas": true,
          "medida": true
        },
        "id": "prof_geo_perpendiculares-v3"
      },
      {
        "enunciado": "Dos rectas se cortan y uno de sus ángulos mide 90°. ¿Son perpendiculares?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "90° es un ángulo recto: las rectas son perpendiculares.",
        "visual": {
          "tipo": "angulo",
          "angulo": 90,
          "rectas": true,
          "medida": true
        },
        "id": "prof_geo_perpendiculares-v4"
      },
      {
        "enunciado": "Dos rectas se cortan y uno de sus ángulos mide 40°. ¿Son perpendiculares?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "40° no es 90°: estas rectas no son perpendiculares.",
        "visual": {
          "tipo": "angulo",
          "angulo": 40,
          "rectas": true,
          "medida": true
        },
        "id": "prof_geo_perpendiculares-v5"
      },
      {
        "enunciado": "Dos rectas se cortan y uno de sus ángulos mide 90°. ¿Son perpendiculares?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "90° es un ángulo recto: las rectas son perpendiculares.",
        "visual": {
          "tipo": "angulo",
          "angulo": 90,
          "rectas": true,
          "medida": true
        },
        "id": "prof_geo_perpendiculares-v6"
      }
    ],
    "visual": {
      "tipo": "angulo",
      "angulo": 90,
      "rectas": true,
      "medida": true
    }
  },
  {
    "id": "prof_geo_opuestos",
    "tema": "geometria_angulos",
    "despues_de": "mat_ang_complemento",
    "titulo": "Ángulos enfrentados en un cruce",
    "explicacion": "Cuando dos rectas se cruzan, los ángulos opuestos por el vértice están enfrentados y miden lo mismo. Los que quedan uno al lado del otro sobre una recta suman 180°. Miramos qué ángulo pide la pregunta antes de calcular.",
    "ejemplo": "Si el ángulo naranja mide 60°, el que está enfrente también mide 60°.",
    "pasos": [
      "Ubicamos el ángulo enfrentado: sus lados prolongan los del ángulo naranja.",
      "Los opuestos por el vértice son iguales: el ángulo pedido mide 60°."
    ],
    "pista": "El opuesto está enfrente; el adyacente queda al lado.",
    "actividades": [
      {
        "enunciado": "El ángulo naranja mide 60°. ¿Cuánto mide el ángulo verde enfrentado?",
        "respuesta_correcta": "60",
        "opciones": [
          "60",
          "120",
          "70"
        ],
        "paso_resuelto": "Son opuestos por el vértice, por eso tienen la misma medida.\nEl verde mide 60°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 60,
          "rectas": true,
          "opuesto": true,
          "medida": true
        },
        "id": "prof_geo_opuestos-v1"
      },
      {
        "enunciado": "El ángulo naranja mide 40°. ¿Cuánto mide el ángulo verde enfrentado?",
        "respuesta_correcta": "40",
        "opciones": [
          "140",
          "50",
          "40"
        ],
        "paso_resuelto": "Son opuestos por el vértice, por eso tienen la misma medida.\nEl verde mide 40°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 40,
          "rectas": true,
          "opuesto": true,
          "medida": true
        },
        "id": "prof_geo_opuestos-v2"
      },
      {
        "enunciado": "El ángulo naranja mide 120°. ¿Cuánto mide el ángulo verde enfrentado?",
        "respuesta_correcta": "120",
        "opciones": [
          "130",
          "120",
          "60"
        ],
        "paso_resuelto": "Son opuestos por el vértice, por eso tienen la misma medida.\nEl verde mide 120°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 120,
          "rectas": true,
          "opuesto": true,
          "medida": true
        },
        "id": "prof_geo_opuestos-v3"
      },
      {
        "enunciado": "El ángulo naranja mide 70°. ¿Cuánto mide el ángulo verde enfrentado?",
        "respuesta_correcta": "70",
        "opciones": [
          "70",
          "110",
          "80"
        ],
        "paso_resuelto": "Son opuestos por el vértice, por eso tienen la misma medida.\nEl verde mide 70°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 70,
          "rectas": true,
          "opuesto": true,
          "medida": true
        },
        "id": "prof_geo_opuestos-v4"
      },
      {
        "enunciado": "El ángulo naranja mide 130°. ¿Cuánto mide el ángulo verde enfrentado?",
        "respuesta_correcta": "130",
        "opciones": [
          "50",
          "140",
          "130"
        ],
        "paso_resuelto": "Son opuestos por el vértice, por eso tienen la misma medida.\nEl verde mide 130°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 130,
          "rectas": true,
          "opuesto": true,
          "medida": true
        },
        "id": "prof_geo_opuestos-v5"
      },
      {
        "enunciado": "El ángulo naranja mide 30°. ¿Cuánto mide el ángulo verde enfrentado?",
        "respuesta_correcta": "30",
        "opciones": [
          "40",
          "30",
          "150"
        ],
        "paso_resuelto": "Son opuestos por el vértice, por eso tienen la misma medida.\nEl verde mide 30°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 30,
          "rectas": true,
          "opuesto": true,
          "medida": true
        },
        "id": "prof_geo_opuestos-v6"
      }
    ],
    "visual": {
      "tipo": "angulo",
      "angulo": 60,
      "rectas": true,
      "opuesto": true,
      "medida": true
    }
  },
  {
    "id": "prof_geo_bisectriz",
    "tema": "geometria_angulos",
    "despues_de": "prof_geo_opuestos",
    "titulo": "Partir una abertura en dos iguales",
    "explicacion": "La bisectriz es una semirrecta que sale del vértice y divide el ángulo en dos ángulos iguales. Cada parte mide la mitad del ángulo original. No alcanza con dibujar una línea cualquiera dentro del ángulo.",
    "ejemplo": "La bisectriz de un ángulo de 80° forma dos ángulos de 40°.",
    "pasos": [
      "Dividimos la medida total por dos: 80 ÷ 2 = 40°.",
      "Comprobamos: 40° + 40° = 80°."
    ],
    "pista": "La bisectriz reparte la medida en dos partes iguales.",
    "actividades": [
      {
        "enunciado": "La línea verde es la bisectriz de un ángulo de 80°. ¿Cuántos grados mide cada mitad?",
        "respuesta_correcta": "40",
        "opciones": [
          "40",
          "80",
          "100"
        ],
        "paso_resuelto": "80 ÷ 2 = 40°.\nComprobamos: 40° + 40° = 80°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 80,
          "bisectriz": true,
          "medida": true
        },
        "id": "prof_geo_bisectriz-v1"
      },
      {
        "enunciado": "La línea verde es la bisectriz de un ángulo de 60°. ¿Cuántos grados mide cada mitad?",
        "respuesta_correcta": "30",
        "opciones": [
          "60",
          "120",
          "30"
        ],
        "paso_resuelto": "60 ÷ 2 = 30°.\nComprobamos: 30° + 30° = 60°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 60,
          "bisectriz": true,
          "medida": true
        },
        "id": "prof_geo_bisectriz-v2"
      },
      {
        "enunciado": "La línea verde es la bisectriz de un ángulo de 100°. ¿Cuántos grados mide cada mitad?",
        "respuesta_correcta": "50",
        "opciones": [
          "80",
          "50",
          "100"
        ],
        "paso_resuelto": "100 ÷ 2 = 50°.\nComprobamos: 50° + 50° = 100°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 100,
          "bisectriz": true,
          "medida": true
        },
        "id": "prof_geo_bisectriz-v3"
      },
      {
        "enunciado": "La línea verde es la bisectriz de un ángulo de 120°. ¿Cuántos grados mide cada mitad?",
        "respuesta_correcta": "60",
        "opciones": [
          "120",
          "60"
        ],
        "paso_resuelto": "120 ÷ 2 = 60°.\nComprobamos: 60° + 60° = 120°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 120,
          "bisectriz": true,
          "medida": true
        },
        "id": "prof_geo_bisectriz-v4"
      },
      {
        "enunciado": "La línea verde es la bisectriz de un ángulo de 140°. ¿Cuántos grados mide cada mitad?",
        "respuesta_correcta": "70",
        "opciones": [
          "140",
          "40",
          "70"
        ],
        "paso_resuelto": "140 ÷ 2 = 70°.\nComprobamos: 70° + 70° = 140°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 140,
          "bisectriz": true,
          "medida": true
        },
        "id": "prof_geo_bisectriz-v5"
      },
      {
        "enunciado": "La línea verde es la bisectriz de un ángulo de 40°. ¿Cuántos grados mide cada mitad?",
        "respuesta_correcta": "20",
        "opciones": [
          "140",
          "20",
          "40"
        ],
        "paso_resuelto": "40 ÷ 2 = 20°.\nComprobamos: 20° + 20° = 40°.",
        "visual": {
          "tipo": "angulo",
          "angulo": 40,
          "bisectriz": true,
          "medida": true
        },
        "id": "prof_geo_bisectriz-v6"
      }
    ],
    "visual": {
      "tipo": "angulo",
      "angulo": 80,
      "bisectriz": true,
      "medida": true
    }
  },
  {
    "id": "prof_geo_compas",
    "tema": "geometria_angulos",
    "despues_de": "prof_geo_bisectriz",
    "titulo": "Trazar la bisectriz con regla y compás",
    "explicacion": "Con centro en O trazamos un arco que corte los lados en A y B. Desde A y B hacemos dos arcos con la misma apertura, suficientemente grande para que se crucen dentro del ángulo en P. La semirrecta OP es la bisectriz.",
    "ejemplo": "Los arcos con centro en A y B usan la misma apertura del compás.",
    "pasos": [
      "En papel, trazá el arco desde O. Desde A y B, sin cambiar la apertura entre esos dos arcos, marcá el cruce interior P.",
      "Con regla, trazá la semirrecta que sale de O y pasa por P. Comprobá las dos mitades con el transportador."
    ],
    "pista": "Conservá la misma apertura para los arcos con centro en A y B.",
    "actividades": [
      {
        "enunciado": "¿Qué debe mantenerse igual al trazar los arcos desde A y B?",
        "respuesta_correcta": "La apertura del compás",
        "opciones": [
          "La apertura del compás",
          "La longitud de la regla",
          "El nombre del vértice"
        ],
        "paso_resuelto": "Los arcos desde A y B tienen el mismo radio.",
        "visual": {
          "tipo": "angulo",
          "angulo": 60,
          "compas": true,
          "bisectriz": true
        },
        "id": "prof_geo_compas-v1"
      },
      {
        "enunciado": "¿Dónde apoyamos primero la punta del compás para marcar A y B?",
        "respuesta_correcta": "En O",
        "opciones": [
          "En P",
          "Fuera del ángulo",
          "En O"
        ],
        "paso_resuelto": "El primer arco se traza con centro en el vértice O.",
        "visual": {
          "tipo": "angulo",
          "angulo": 60,
          "compas": true,
          "bisectriz": true
        },
        "id": "prof_geo_compas-v2"
      },
      {
        "enunciado": "Ya marcamos el cruce interior P. ¿Qué semirrecta trazamos?",
        "respuesta_correcta": "OP",
        "opciones": [
          "AP",
          "OP",
          "AB"
        ],
        "paso_resuelto": "Unimos el vértice O con el cruce P y prolongamos desde O.",
        "visual": {
          "tipo": "angulo",
          "angulo": 60,
          "compas": true,
          "bisectriz": true
        },
        "id": "prof_geo_compas-v3"
      },
      {
        "enunciado": "Si los arcos desde A y B no se cruzan, ¿cómo seguimos?",
        "respuesta_correcta": "Aumentamos la apertura por igual en ambos",
        "opciones": [
          "Aumentamos la apertura por igual en ambos",
          "Cambiamos solo el arco de A",
          "Elegimos cualquier punto"
        ],
        "paso_resuelto": "Rehacemos ambos arcos con un mismo radio mayor hasta que se crucen.",
        "visual": {
          "tipo": "angulo",
          "angulo": 60,
          "compas": true,
          "bisectriz": true
        },
        "id": "prof_geo_compas-v4"
      },
      {
        "enunciado": "¿Para qué marcamos A y B con el mismo arco desde O?",
        "respuesta_correcta": "Para que OA y OB midan lo mismo",
        "opciones": [
          "Para que el ángulo mida 90°",
          "Para alargar un solo lado",
          "Para que OA y OB midan lo mismo"
        ],
        "paso_resuelto": "A y B están sobre un mismo arco con centro en O: OA y OB son radios iguales.",
        "visual": {
          "tipo": "angulo",
          "angulo": 60,
          "compas": true,
          "bisectriz": true
        },
        "id": "prof_geo_compas-v5"
      },
      {
        "enunciado": "Al comprobar el trazado, ¿cómo deben ser las dos mitades?",
        "respuesta_correcta": "De igual medida",
        "opciones": [
          "Siempre de 90°",
          "De igual medida",
          "Una mayor que la otra"
        ],
        "paso_resuelto": "La bisectriz divide el ángulo en dos ángulos iguales.",
        "visual": {
          "tipo": "angulo",
          "angulo": 60,
          "compas": true,
          "bisectriz": true
        },
        "id": "prof_geo_compas-v6"
      }
    ],
    "visual": {
      "tipo": "angulo",
      "angulo": 60,
      "compas": true,
      "bisectriz": true
    }
  },
  {
    "id": "prof_geo_mediatriz",
    "tema": "geometria_angulos",
    "despues_de": "prof_geo_compas",
    "titulo": "Encontrar la mitad y trazar una perpendicular",
    "explicacion": "La mediatriz es la recta perpendicular a un segmento que pasa por su punto medio. Para construirla, trazamos arcos desde A y B con el mismo radio, mayor que la mitad del segmento. Unimos sus dos cruces C y D: la recta resultante corta AB en su mitad M.",
    "ejemplo": "Si AB mide 8 cm, M deja 4 cm a cada lado y la mediatriz forma 90° con AB.",
    "pasos": [
      "En papel, dibujá AB. Sin cambiar la apertura entre A y B, trazá arcos que se crucen arriba y abajo.",
      "Uní C con D usando la regla. Comprobá que AM = MB y que el cruce forma un ángulo recto."
    ],
    "pista": "La mediatriz cumple dos condiciones: punto medio y perpendicularidad.",
    "actividades": [
      {
        "enunciado": "AB mide 8 cm y la recta verde es su mediatriz. ¿Cuántos centímetros mide AM?",
        "respuesta_correcta": "4",
        "opciones": [
          "4",
          "8",
          "5"
        ],
        "paso_resuelto": "M es el punto medio: 8 ÷ 2 = 4 cm.\nAM = MB = 4 cm y la recta CD es perpendicular a AB.",
        "visual": {
          "tipo": "mediatriz",
          "longitud": 8
        },
        "id": "prof_geo_mediatriz-v1"
      },
      {
        "enunciado": "AB mide 6 cm y la recta verde es su mediatriz. ¿Cuántos centímetros mide AM?",
        "respuesta_correcta": "3",
        "opciones": [
          "6",
          "4",
          "3"
        ],
        "paso_resuelto": "M es el punto medio: 6 ÷ 2 = 3 cm.\nAM = MB = 3 cm y la recta CD es perpendicular a AB.",
        "visual": {
          "tipo": "mediatriz",
          "longitud": 6
        },
        "id": "prof_geo_mediatriz-v2"
      },
      {
        "enunciado": "AB mide 10 cm y la recta verde es su mediatriz. ¿Cuántos centímetros mide AM?",
        "respuesta_correcta": "5",
        "opciones": [
          "6",
          "5",
          "10"
        ],
        "paso_resuelto": "M es el punto medio: 10 ÷ 2 = 5 cm.\nAM = MB = 5 cm y la recta CD es perpendicular a AB.",
        "visual": {
          "tipo": "mediatriz",
          "longitud": 10
        },
        "id": "prof_geo_mediatriz-v3"
      },
      {
        "enunciado": "AB mide 12 cm y la recta verde es su mediatriz. ¿Cuántos centímetros mide AM?",
        "respuesta_correcta": "6",
        "opciones": [
          "6",
          "12",
          "7"
        ],
        "paso_resuelto": "M es el punto medio: 12 ÷ 2 = 6 cm.\nAM = MB = 6 cm y la recta CD es perpendicular a AB.",
        "visual": {
          "tipo": "mediatriz",
          "longitud": 12
        },
        "id": "prof_geo_mediatriz-v4"
      },
      {
        "enunciado": "AB mide 14 cm y la recta verde es su mediatriz. ¿Cuántos centímetros mide AM?",
        "respuesta_correcta": "7",
        "opciones": [
          "14",
          "8",
          "7"
        ],
        "paso_resuelto": "M es el punto medio: 14 ÷ 2 = 7 cm.\nAM = MB = 7 cm y la recta CD es perpendicular a AB.",
        "visual": {
          "tipo": "mediatriz",
          "longitud": 14
        },
        "id": "prof_geo_mediatriz-v5"
      },
      {
        "enunciado": "AB mide 16 cm y la recta verde es su mediatriz. ¿Cuántos centímetros mide AM?",
        "respuesta_correcta": "8",
        "opciones": [
          "9",
          "8",
          "16"
        ],
        "paso_resuelto": "M es el punto medio: 16 ÷ 2 = 8 cm.\nAM = MB = 8 cm y la recta CD es perpendicular a AB.",
        "visual": {
          "tipo": "mediatriz",
          "longitud": 16
        },
        "id": "prof_geo_mediatriz-v6"
      }
    ],
    "visual": {
      "tipo": "mediatriz",
      "longitud": 8
    }
  }
];
for (const unidad of GEOMETRIA_R13) {
 const indice = UNIDADES_BASES.findIndex(u => u.id === (unidad.antes_de || unidad.despues_de));
 if (indice < 0) throw new Error('Falta el paso de referencia de ' + unidad.id);
 UNIDADES_BASES.splice(indice + (unidad.antes_de ? 0 : 1), 0, unidad);
}
// FIN R13



// R14: figuras y superficies.
const FIGURAS_R14 = [
  {
    "id": "prof_fig_vertices",
    "tema": "geometria_triangulos",
    "antes_de": "mat_tri_lados",
    "titulo": "Reconocer lados y vértices de un triángulo",
    "explicacion": "Un triángulo es una figura cerrada con tres lados rectos y tres vértices. Un lado une dos vértices. El vértice que queda enfrente de ese lado se llama opuesto: no es ninguno de sus extremos.",
    "ejemplo": "En el triángulo ABC, el lado AB une A con B y su vértice opuesto es C.",
    "pasos": [
      "Seguimos el lado AB desde A hasta B.",
      "El vértice que no está en ese lado es C."
    ],
    "pista": "Buscá la letra que no es un extremo del lado nombrado.",
    "actividades": [
      {
        "enunciado": "En el dibujo, ¿qué vértice queda opuesto al lado AB?",
        "respuesta_correcta": "C",
        "opciones": [
          "C",
          "A",
          "B"
        ],
        "paso_resuelto": "El lado AB une A con B. El otro vértice es C.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              5,
              0
            ],
            [
              1.8,
              2.4
            ]
          ],
          "vertices": [
            "A",
            "B",
            "C"
          ]
        },
        "id": "prof_fig_vertices-v1"
      },
      {
        "enunciado": "En el dibujo, ¿qué vértice queda opuesto al lado PQ?",
        "respuesta_correcta": "R",
        "opciones": [
          "P",
          "Q",
          "R"
        ],
        "paso_resuelto": "El lado PQ une P con Q. El otro vértice es R.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              5,
              0
            ],
            [
              1.8,
              2.4
            ]
          ],
          "vertices": [
            "P",
            "Q",
            "R"
          ]
        },
        "id": "prof_fig_vertices-v2"
      },
      {
        "enunciado": "En el dibujo, ¿qué vértice queda opuesto al lado DE?",
        "respuesta_correcta": "F",
        "opciones": [
          "E",
          "F",
          "D"
        ],
        "paso_resuelto": "El lado DE une D con E. El otro vértice es F.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              5,
              0
            ],
            [
              1.8,
              2.4
            ]
          ],
          "vertices": [
            "D",
            "E",
            "F"
          ]
        },
        "id": "prof_fig_vertices-v3"
      },
      {
        "enunciado": "En el dibujo, ¿qué vértice queda opuesto al lado LM?",
        "respuesta_correcta": "N",
        "opciones": [
          "N",
          "L",
          "M"
        ],
        "paso_resuelto": "El lado LM une L con M. El otro vértice es N.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              5,
              0
            ],
            [
              1.8,
              2.4
            ]
          ],
          "vertices": [
            "L",
            "M",
            "N"
          ]
        },
        "id": "prof_fig_vertices-v4"
      },
      {
        "enunciado": "En el dibujo, ¿qué vértice queda opuesto al lado RS?",
        "respuesta_correcta": "T",
        "opciones": [
          "R",
          "S",
          "T"
        ],
        "paso_resuelto": "El lado RS une R con S. El otro vértice es T.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              5,
              0
            ],
            [
              1.8,
              2.4
            ]
          ],
          "vertices": [
            "R",
            "S",
            "T"
          ]
        },
        "id": "prof_fig_vertices-v5"
      },
      {
        "enunciado": "En el dibujo, ¿qué vértice queda opuesto al lado XY?",
        "respuesta_correcta": "Z",
        "opciones": [
          "Y",
          "Z",
          "X"
        ],
        "paso_resuelto": "El lado XY une X con Y. El otro vértice es Z.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              5,
              0
            ],
            [
              1.8,
              2.4
            ]
          ],
          "vertices": [
            "X",
            "Y",
            "Z"
          ]
        },
        "id": "prof_fig_vertices-v6"
      }
    ],
    "visual": {
      "tipo": "poligono",
      "puntos": [
        [
          0,
          0
        ],
        [
          5,
          0
        ],
        [
          1.8,
          2.4
        ]
      ],
      "vertices": [
        "A",
        "B",
        "C"
      ]
    }
  },
  {
    "id": "prof_fig_angulos",
    "tema": "geometria_triangulos",
    "despues_de": "mat_tri_angulos",
    "titulo": "Clasificar mirando los tres ángulos",
    "explicacion": "Un triángulo es acutángulo si sus tres ángulos son menores que 90°. Es rectángulo si tiene un ángulo de 90°, y obtusángulo si tiene uno mayor que 90°. Miramos las tres medidas, no solamente la forma del dibujo.",
    "ejemplo": "Con 60°, 60° y 60°, los tres ángulos son agudos: es acutángulo.",
    "pasos": [
      "Comparamos cada medida con 90°.",
      "Las tres son menores: elegimos acutángulo."
    ],
    "pista": "Buscá primero si hay un ángulo de 90° o uno mayor.",
    "actividades": [
      {
        "enunciado": "Los ángulos miden 60°, 60° y 60°. ¿Cómo se clasifica el triángulo por sus ángulos?",
        "respuesta_correcta": "Acutángulo",
        "opciones": [
          "Acutángulo",
          "Rectángulo",
          "Obtusángulo"
        ],
        "paso_resuelto": "La mayor medida es 60°. Todos son menores que 90°.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              0.5000000000000001,
              0.8660254037844386
            ]
          ],
          "angulos": [
            "60°",
            "60°",
            "60°"
          ]
        },
        "id": "prof_fig_angulos-v1"
      },
      {
        "enunciado": "Los ángulos miden 90°, 60° y 30°. ¿Cómo se clasifica el triángulo por sus ángulos?",
        "respuesta_correcta": "Rectángulo",
        "opciones": [
          "Acutángulo",
          "Obtusángulo",
          "Rectángulo"
        ],
        "paso_resuelto": "La mayor medida es 90°. Tiene un ángulo de 90°.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              1.0605752387249069e-16,
              1.7320508075688774
            ]
          ],
          "angulos": [
            "90°",
            "60°",
            "30°"
          ]
        },
        "id": "prof_fig_angulos-v2"
      },
      {
        "enunciado": "Los ángulos miden 110°, 40° y 30°. ¿Cómo se clasifica el triángulo por sus ángulos?",
        "respuesta_correcta": "Obtusángulo",
        "opciones": [
          "Rectángulo",
          "Obtusángulo",
          "Acutángulo"
        ],
        "paso_resuelto": "La mayor medida es 110°. Tiene un ángulo mayor que 90°.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              -0.4396926207859084,
              1.2080455471101075
            ]
          ],
          "angulos": [
            "110°",
            "40°",
            "30°"
          ]
        },
        "id": "prof_fig_angulos-v3"
      },
      {
        "enunciado": "Los ángulos miden 80°, 60° y 40°. ¿Cómo se clasifica el triángulo por sus ángulos?",
        "respuesta_correcta": "Acutángulo",
        "opciones": [
          "Acutángulo",
          "Rectángulo",
          "Obtusángulo"
        ],
        "paso_resuelto": "La mayor medida es 80°. Todos son menores que 90°.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              0.23395555688102207,
              1.3268278963378768
            ]
          ],
          "angulos": [
            "80°",
            "60°",
            "40°"
          ]
        },
        "id": "prof_fig_angulos-v4"
      },
      {
        "enunciado": "Los ángulos miden 100°, 40° y 40°. ¿Cómo se clasifica el triángulo por sus ángulos?",
        "respuesta_correcta": "Obtusángulo",
        "opciones": [
          "Acutángulo",
          "Rectángulo",
          "Obtusángulo"
        ],
        "paso_resuelto": "La mayor medida es 100°. Tiene un ángulo mayor que 90°.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              -0.1736481776669303,
              0.984807753012208
            ]
          ],
          "angulos": [
            "100°",
            "40°",
            "40°"
          ]
        },
        "id": "prof_fig_angulos-v5"
      },
      {
        "enunciado": "Los ángulos miden 90°, 45° y 45°. ¿Cómo se clasifica el triángulo por sus ángulos?",
        "respuesta_correcta": "Rectángulo",
        "opciones": [
          "Obtusángulo",
          "Rectángulo",
          "Acutángulo"
        ],
        "paso_resuelto": "La mayor medida es 90°. Tiene un ángulo de 90°.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              6.123233995736766e-17,
              1.0
            ]
          ],
          "angulos": [
            "90°",
            "45°",
            "45°"
          ]
        },
        "id": "prof_fig_angulos-v6"
      }
    ],
    "visual": {
      "tipo": "poligono",
      "puntos": [
        [
          0,
          0
        ],
        [
          1,
          0
        ],
        [
          0.5000000000000001,
          0.8660254037844386
        ]
      ],
      "angulos": [
        "60°",
        "60°",
        "60°"
      ]
    }
  },
  {
    "id": "prof_fig_existencia",
    "tema": "geometria_triangulos",
    "despues_de": "prof_fig_angulos",
    "titulo": "Comprobar si tres lados pueden cerrar",
    "explicacion": "Para formar un triángulo, los dos lados más cortos juntos deben medir más que el más largo. Si suman lo mismo, quedan estirados en una recta; si suman menos, no alcanzan a cerrar.",
    "ejemplo": "Con tiras de 3, 4 y 5 cm, podemos cerrar porque 3 + 4 es mayor que 5.",
    "pasos": [
      "Ordenamos las medidas: 3, 4 y 5.",
      "Sumamos las dos menores: 3 + 4 = 7. Como 7 > 5, sí se puede."
    ],
    "pista": "La suma de los dos menores debe superar al mayor.",
    "actividades": [
      {
        "enunciado": "Tenemos tiras de 3, 4 y 5 cm. ¿Pueden ser los lados de un triángulo?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "3 + 4 = 7. Supera a 5: pueden cerrar.",
        "visual": {
          "tipo": "segmentos",
          "longitudes": [
            3,
            4,
            5
          ]
        },
        "id": "prof_fig_existencia-v1"
      },
      {
        "enunciado": "Tenemos tiras de 2, 3 y 5 cm. ¿Pueden ser los lados de un triángulo?",
        "respuesta_correcta": "No",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "2 + 3 = 5. No supera a 5: no forman un triángulo.",
        "visual": {
          "tipo": "segmentos",
          "longitudes": [
            2,
            3,
            5
          ]
        },
        "id": "prof_fig_existencia-v2"
      },
      {
        "enunciado": "Tenemos tiras de 2, 3 y 6 cm. ¿Pueden ser los lados de un triángulo?",
        "respuesta_correcta": "No",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "2 + 3 = 5. No supera a 6: no forman un triángulo.",
        "visual": {
          "tipo": "segmentos",
          "longitudes": [
            2,
            3,
            6
          ]
        },
        "id": "prof_fig_existencia-v3"
      },
      {
        "enunciado": "Tenemos tiras de 4, 4 y 6 cm. ¿Pueden ser los lados de un triángulo?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "No",
          "Sí"
        ],
        "paso_resuelto": "4 + 4 = 8. Supera a 6: pueden cerrar.",
        "visual": {
          "tipo": "segmentos",
          "longitudes": [
            4,
            4,
            6
          ]
        },
        "id": "prof_fig_existencia-v4"
      },
      {
        "enunciado": "Tenemos tiras de 2, 2 y 3 cm. ¿Pueden ser los lados de un triángulo?",
        "respuesta_correcta": "Sí",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "2 + 2 = 4. Supera a 3: pueden cerrar.",
        "visual": {
          "tipo": "segmentos",
          "longitudes": [
            2,
            2,
            3
          ]
        },
        "id": "prof_fig_existencia-v5"
      },
      {
        "enunciado": "Tenemos tiras de 1, 2 y 4 cm. ¿Pueden ser los lados de un triángulo?",
        "respuesta_correcta": "No",
        "opciones": [
          "Sí",
          "No"
        ],
        "paso_resuelto": "1 + 2 = 3. No supera a 4: no forman un triángulo.",
        "visual": {
          "tipo": "segmentos",
          "longitudes": [
            1,
            2,
            4
          ]
        },
        "id": "prof_fig_existencia-v6"
      }
    ],
    "visual": {
      "tipo": "segmentos",
      "longitudes": [
        3,
        4,
        5
      ]
    }
  },
  {
    "id": "prof_fig_poligonos",
    "tema": "geometria_cuadrilateros_circunferencia",
    "antes_de": "mat_cuad_lados",
    "titulo": "Contar el borde de un polígono",
    "explicacion": "Un polígono es una figura cerrada formada por segmentos que no se cruzan. Tiene tantos lados como vértices. Con 3 lados es triángulo; con 4, cuadrilátero; con 5, pentágono; con 6, hexágono; con 7, heptágono; con 8, octógono.",
    "ejemplo": "El dibujo tiene cinco lados y cinco vértices: es un pentágono.",
    "pasos": [
      "Elegimos un vértice para empezar y recorremos el borde una sola vez.",
      "Contamos cinco lados: buscamos el nombre pentágono."
    ],
    "pista": "Contá cada tramo recto del contorno una sola vez.",
    "actividades": [
      {
        "enunciado": "Recorré el borde. ¿Cómo se llama este polígono según su cantidad de lados?",
        "respuesta_correcta": "Pentágono",
        "opciones": [
          "Pentágono",
          "Hexágono",
          "Circunferencia"
        ],
        "paso_resuelto": "Tiene 5 lados y 5 vértices: es un pentágono.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.95105652,
              0.30901699
            ],
            [
              -0.58778525,
              -0.80901699
            ],
            [
              0.58778525,
              -0.80901699
            ],
            [
              0.95105652,
              0.30901699
            ]
          ]
        },
        "id": "prof_fig_poligonos-v1"
      },
      {
        "enunciado": "Recorré el borde. ¿Cómo se llama este polígono según su cantidad de lados?",
        "respuesta_correcta": "Triángulo",
        "opciones": [
          "Cuadrilátero",
          "Circunferencia",
          "Triángulo"
        ],
        "paso_resuelto": "Tiene 3 lados y 3 vértices: es un triángulo.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.8660254,
              -0.5
            ],
            [
              0.8660254,
              -0.5
            ]
          ]
        },
        "id": "prof_fig_poligonos-v2"
      },
      {
        "enunciado": "Recorré el borde. ¿Cómo se llama este polígono según su cantidad de lados?",
        "respuesta_correcta": "Hexágono",
        "opciones": [
          "Circunferencia",
          "Hexágono",
          "Pentágono"
        ],
        "paso_resuelto": "Tiene 6 lados y 6 vértices: es un hexágono.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.8660254,
              0.5
            ],
            [
              -0.8660254,
              -0.5
            ],
            [
              -0.0,
              -1.0
            ],
            [
              0.8660254,
              -0.5
            ],
            [
              0.8660254,
              0.5
            ]
          ]
        },
        "id": "prof_fig_poligonos-v3"
      },
      {
        "enunciado": "Recorré el borde. ¿Cómo se llama este polígono según su cantidad de lados?",
        "respuesta_correcta": "Cuadrilátero",
        "opciones": [
          "Cuadrilátero",
          "Triángulo",
          "Circunferencia"
        ],
        "paso_resuelto": "Tiene 4 lados y 4 vértices: es un cuadrilátero.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -1.0,
              0.0
            ],
            [
              -0.0,
              -1.0
            ],
            [
              1.0,
              -0.0
            ]
          ]
        },
        "id": "prof_fig_poligonos-v4"
      },
      {
        "enunciado": "Recorré el borde. ¿Cómo se llama este polígono según su cantidad de lados?",
        "respuesta_correcta": "Octógono",
        "opciones": [
          "Heptágono",
          "Circunferencia",
          "Octógono"
        ],
        "paso_resuelto": "Tiene 8 lados y 8 vértices: es un octógono.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.70710678,
              0.70710678
            ],
            [
              -1.0,
              0.0
            ],
            [
              -0.70710678,
              -0.70710678
            ],
            [
              -0.0,
              -1.0
            ],
            [
              0.70710678,
              -0.70710678
            ],
            [
              1.0,
              -0.0
            ],
            [
              0.70710678,
              0.70710678
            ]
          ]
        },
        "id": "prof_fig_poligonos-v5"
      },
      {
        "enunciado": "Recorré el borde. ¿Cómo se llama este polígono según su cantidad de lados?",
        "respuesta_correcta": "Heptágono",
        "opciones": [
          "Circunferencia",
          "Heptágono",
          "Octógono"
        ],
        "paso_resuelto": "Tiene 7 lados y 7 vértices: es un heptágono.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.78183148,
              0.6234898
            ],
            [
              -0.97492791,
              -0.22252093
            ],
            [
              -0.43388374,
              -0.90096887
            ],
            [
              0.43388374,
              -0.90096887
            ],
            [
              0.97492791,
              -0.22252093
            ],
            [
              0.78183148,
              0.6234898
            ]
          ]
        },
        "id": "prof_fig_poligonos-v6"
      }
    ],
    "visual": {
      "tipo": "poligono",
      "puntos": [
        [
          0.0,
          1.0
        ],
        [
          -0.95105652,
          0.30901699
        ],
        [
          -0.58778525,
          -0.80901699
        ],
        [
          0.58778525,
          -0.80901699
        ],
        [
          0.95105652,
          0.30901699
        ]
      ]
    }
  },
  {
    "id": "prof_fig_diagonales",
    "tema": "geometria_cuadrilateros_circunferencia",
    "despues_de": "prof_fig_poligonos",
    "titulo": "Unir vértices que no son vecinos",
    "explicacion": "Una diagonal une dos vértices no consecutivos de un polígono. Desde un vértice no trazamos una diagonal hacia él mismo ni hacia sus dos vecinos. En estos polígonos convexos, las diagonales quedan dentro de la figura.",
    "ejemplo": "Desde A en un pentágono podemos trazar dos diagonales.",
    "pasos": [
      "Ubicamos A y dejamos fuera a sus dos vecinos.",
      "Unimos A con los otros dos vértices: son dos diagonales."
    ],
    "pista": "Las uniones con los vecinos ya son lados, no diagonales.",
    "actividades": [
      {
        "enunciado": "Las líneas verdes salen de A. ¿Cuántas diagonales se trazaron desde ese vértice?",
        "respuesta_correcta": "2",
        "opciones": [
          "2",
          "3",
          "5"
        ],
        "paso_resuelto": "Hay 5 vértices. Excluimos A y sus dos vecinos: 5 − 3 = 2.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.95105652,
              0.30901699
            ],
            [
              -0.58778525,
              -0.80901699
            ],
            [
              0.58778525,
              -0.80901699
            ],
            [
              0.95105652,
              0.30901699
            ]
          ],
          "vertices": [
            "A",
            "",
            "",
            "",
            ""
          ],
          "diagonales": [
            [
              0,
              2
            ],
            [
              0,
              3
            ]
          ]
        },
        "id": "prof_fig_diagonales-v1"
      },
      {
        "enunciado": "Las líneas verdes salen de A. ¿Cuántas diagonales se trazaron desde ese vértice?",
        "respuesta_correcta": "1",
        "opciones": [
          "2",
          "4",
          "1"
        ],
        "paso_resuelto": "Hay 4 vértices. Excluimos A y sus dos vecinos: 4 − 3 = 1.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -1.0,
              0.0
            ],
            [
              -0.0,
              -1.0
            ],
            [
              1.0,
              -0.0
            ]
          ],
          "vertices": [
            "A",
            "",
            "",
            ""
          ],
          "diagonales": [
            [
              0,
              2
            ]
          ]
        },
        "id": "prof_fig_diagonales-v2"
      },
      {
        "enunciado": "Las líneas verdes salen de A. ¿Cuántas diagonales se trazaron desde ese vértice?",
        "respuesta_correcta": "3",
        "opciones": [
          "6",
          "3",
          "4"
        ],
        "paso_resuelto": "Hay 6 vértices. Excluimos A y sus dos vecinos: 6 − 3 = 3.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.8660254,
              0.5
            ],
            [
              -0.8660254,
              -0.5
            ],
            [
              -0.0,
              -1.0
            ],
            [
              0.8660254,
              -0.5
            ],
            [
              0.8660254,
              0.5
            ]
          ],
          "vertices": [
            "A",
            "",
            "",
            "",
            "",
            ""
          ],
          "diagonales": [
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              0,
              4
            ]
          ]
        },
        "id": "prof_fig_diagonales-v3"
      },
      {
        "enunciado": "Las líneas verdes salen de A. ¿Cuántas diagonales se trazaron desde ese vértice?",
        "respuesta_correcta": "4",
        "opciones": [
          "4",
          "5",
          "7"
        ],
        "paso_resuelto": "Hay 7 vértices. Excluimos A y sus dos vecinos: 7 − 3 = 4.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.78183148,
              0.6234898
            ],
            [
              -0.97492791,
              -0.22252093
            ],
            [
              -0.43388374,
              -0.90096887
            ],
            [
              0.43388374,
              -0.90096887
            ],
            [
              0.97492791,
              -0.22252093
            ],
            [
              0.78183148,
              0.6234898
            ]
          ],
          "vertices": [
            "A",
            "",
            "",
            "",
            "",
            "",
            ""
          ],
          "diagonales": [
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              0,
              4
            ],
            [
              0,
              5
            ]
          ]
        },
        "id": "prof_fig_diagonales-v4"
      },
      {
        "enunciado": "Las líneas verdes salen de A. ¿Cuántas diagonales se trazaron desde ese vértice?",
        "respuesta_correcta": "5",
        "opciones": [
          "6",
          "8",
          "5"
        ],
        "paso_resuelto": "Hay 8 vértices. Excluimos A y sus dos vecinos: 8 − 3 = 5.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.70710678,
              0.70710678
            ],
            [
              -1.0,
              0.0
            ],
            [
              -0.70710678,
              -0.70710678
            ],
            [
              -0.0,
              -1.0
            ],
            [
              0.70710678,
              -0.70710678
            ],
            [
              1.0,
              -0.0
            ],
            [
              0.70710678,
              0.70710678
            ]
          ],
          "vertices": [
            "A",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          ],
          "diagonales": [
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              0,
              4
            ],
            [
              0,
              5
            ],
            [
              0,
              6
            ]
          ]
        },
        "id": "prof_fig_diagonales-v5"
      },
      {
        "enunciado": "Las líneas verdes salen de A. ¿Cuántas diagonales se trazaron desde ese vértice?",
        "respuesta_correcta": "0",
        "opciones": [
          "3",
          "0",
          "1"
        ],
        "paso_resuelto": "Hay 3 vértices. Excluimos A y sus dos vecinos: 3 − 3 = 0.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.8660254,
              -0.5
            ],
            [
              0.8660254,
              -0.5
            ]
          ],
          "vertices": [
            "A",
            "",
            ""
          ],
          "diagonales": []
        },
        "id": "prof_fig_diagonales-v6"
      }
    ],
    "visual": {
      "tipo": "poligono",
      "puntos": [
        [
          0.0,
          1.0
        ],
        [
          -0.95105652,
          0.30901699
        ],
        [
          -0.58778525,
          -0.80901699
        ],
        [
          0.58778525,
          -0.80901699
        ],
        [
          0.95105652,
          0.30901699
        ]
      ],
      "vertices": [
        "A",
        "",
        "",
        "",
        ""
      ],
      "diagonales": [
        [
          0,
          2
        ],
        [
          0,
          3
        ]
      ]
    }
  },
  {
    "id": "prof_fig_per_tri",
    "tema": "perimetros_simples",
    "despues_de": "mat_per_rectangulo",
    "titulo": "Rodear un triángulo con cinta",
    "explicacion": "El perímetro mide todo el borde. Para rodear un triángulo con cinta sumamos sus tres lados una sola vez. Todas las medidas deben estar en la misma unidad.",
    "ejemplo": "Un triángulo de lados 3, 4 y 5 cm necesita 12 cm de cinta para una vuelta.",
    "pasos": [
      "Seguimos el borde: 3 + 4 + 5.",
      "La suma es 12: escribimos 12 cm de perímetro."
    ],
    "pista": "Sumá los tres lados; no multipliques dos medidas.",
    "actividades": [
      {
        "enunciado": "Para una vuelta de cinta alrededor de este triángulo de lados 3, 4 y 5 cm, ¿cuántos centímetros necesitamos?",
        "respuesta_correcta": "12",
        "opciones": [
          "12",
          "7"
        ],
        "paso_resuelto": "3 + 4 + 5 = 12 cm de borde.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              3,
              0
            ],
            [
              3.0,
              4.0
            ]
          ],
          "lados": [
            "3 cm",
            "4 cm",
            "5 cm"
          ]
        },
        "id": "prof_fig_per_tri-v1"
      },
      {
        "enunciado": "Para una vuelta de cinta alrededor de este triángulo de lados 4, 4 y 6 cm, ¿cuántos centímetros necesitamos?",
        "respuesta_correcta": "14",
        "opciones": [
          "8",
          "16",
          "14"
        ],
        "paso_resuelto": "4 + 4 + 6 = 14 cm de borde.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              4,
              0
            ],
            [
              4.5,
              3.968626966596886
            ]
          ],
          "lados": [
            "4 cm",
            "4 cm",
            "6 cm"
          ]
        },
        "id": "prof_fig_per_tri-v2"
      },
      {
        "enunciado": "Para una vuelta de cinta alrededor de este triángulo de lados 5, 5 y 5 cm, ¿cuántos centímetros necesitamos?",
        "respuesta_correcta": "15",
        "opciones": [
          "25",
          "15",
          "10"
        ],
        "paso_resuelto": "5 + 5 + 5 = 15 cm de borde.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              5,
              0
            ],
            [
              2.5,
              4.330127018922194
            ]
          ],
          "lados": [
            "5 cm",
            "5 cm",
            "5 cm"
          ]
        },
        "id": "prof_fig_per_tri-v3"
      },
      {
        "enunciado": "Para una vuelta de cinta alrededor de este triángulo de lados 5, 6 y 7 cm, ¿cuántos centímetros necesitamos?",
        "respuesta_correcta": "18",
        "opciones": [
          "18",
          "11",
          "30"
        ],
        "paso_resuelto": "5 + 6 + 7 = 18 cm de borde.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              5,
              0
            ],
            [
              3.8,
              5.878775382679628
            ]
          ],
          "lados": [
            "5 cm",
            "6 cm",
            "7 cm"
          ]
        },
        "id": "prof_fig_per_tri-v4"
      },
      {
        "enunciado": "Para una vuelta de cinta alrededor de este triángulo de lados 6, 8 y 10 cm, ¿cuántos centímetros necesitamos?",
        "respuesta_correcta": "24",
        "opciones": [
          "14",
          "48",
          "24"
        ],
        "paso_resuelto": "6 + 8 + 10 = 24 cm de borde.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              6,
              0
            ],
            [
              6.0,
              8.0
            ]
          ],
          "lados": [
            "6 cm",
            "8 cm",
            "10 cm"
          ]
        },
        "id": "prof_fig_per_tri-v5"
      },
      {
        "enunciado": "Para una vuelta de cinta alrededor de este triángulo de lados 7, 7 y 4 cm, ¿cuántos centímetros necesitamos?",
        "respuesta_correcta": "18",
        "opciones": [
          "49",
          "18",
          "14"
        ],
        "paso_resuelto": "7 + 7 + 4 = 18 cm de borde.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              7,
              0
            ],
            [
              1.1428571428571428,
              3.8332593899996397
            ]
          ],
          "lados": [
            "7 cm",
            "7 cm",
            "4 cm"
          ]
        },
        "id": "prof_fig_per_tri-v6"
      }
    ],
    "visual": {
      "tipo": "poligono",
      "puntos": [
        [
          0,
          0
        ],
        [
          3,
          0
        ],
        [
          3.0,
          4.0
        ]
      ],
      "lados": [
        "3 cm",
        "4 cm",
        "5 cm"
      ]
    }
  },
  {
    "id": "prof_fig_per_regular",
    "tema": "perimetros_simples",
    "despues_de": "prof_fig_per_tri",
    "titulo": "Sumar lados iguales sin perder ninguno",
    "explicacion": "Un polígono regular tiene todos los lados y todos los ángulos iguales. Su perímetro se obtiene multiplicando la cantidad de lados por la medida de un lado. La cuenta resume la suma de todos los lados.",
    "ejemplo": "Un pentágono regular con lado de 3 cm tiene perímetro 5 × 3 = 15 cm.",
    "pasos": [
      "Contamos cinco lados iguales.",
      "Sumamos cinco veces 3: 5 × 3 = 15 cm."
    ],
    "pista": "Cantidad de lados por longitud de un lado.",
    "actividades": [
      {
        "enunciado": "El polígono es regular, tiene 5 lados y cada lado mide 3 cm. ¿Cuántos centímetros mide su perímetro?",
        "respuesta_correcta": "15",
        "opciones": [
          "15",
          "8",
          "12"
        ],
        "paso_resuelto": "Sumamos 3 cm 5 veces: 5 × 3 = 15 cm.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.95105652,
              0.30901699
            ],
            [
              -0.58778525,
              -0.80901699
            ],
            [
              0.58778525,
              -0.80901699
            ],
            [
              0.95105652,
              0.30901699
            ]
          ],
          "lados": [
            "3 cm",
            "3 cm",
            "3 cm",
            "3 cm",
            "3 cm"
          ]
        },
        "id": "prof_fig_per_regular-v1"
      },
      {
        "enunciado": "El polígono es regular, tiene 4 lados y cada lado mide 4 cm. ¿Cuántos centímetros mide su perímetro?",
        "respuesta_correcta": "16",
        "opciones": [
          "8",
          "12",
          "16"
        ],
        "paso_resuelto": "Sumamos 4 cm 4 veces: 4 × 4 = 16 cm.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -1.0,
              0.0
            ],
            [
              -0.0,
              -1.0
            ],
            [
              1.0,
              -0.0
            ]
          ],
          "lados": [
            "4 cm",
            "4 cm",
            "4 cm",
            "4 cm"
          ]
        },
        "id": "prof_fig_per_regular-v2"
      },
      {
        "enunciado": "El polígono es regular, tiene 6 lados y cada lado mide 2 cm. ¿Cuántos centímetros mide su perímetro?",
        "respuesta_correcta": "12",
        "opciones": [
          "10",
          "12",
          "8"
        ],
        "paso_resuelto": "Sumamos 2 cm 6 veces: 6 × 2 = 12 cm.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.8660254,
              0.5
            ],
            [
              -0.8660254,
              -0.5
            ],
            [
              -0.0,
              -1.0
            ],
            [
              0.8660254,
              -0.5
            ],
            [
              0.8660254,
              0.5
            ]
          ],
          "lados": [
            "2 cm",
            "2 cm",
            "2 cm",
            "2 cm",
            "2 cm",
            "2 cm"
          ]
        },
        "id": "prof_fig_per_regular-v3"
      },
      {
        "enunciado": "El polígono es regular, tiene 3 lados y cada lado mide 5 cm. ¿Cuántos centímetros mide su perímetro?",
        "respuesta_correcta": "15",
        "opciones": [
          "15",
          "8",
          "10"
        ],
        "paso_resuelto": "Sumamos 5 cm 3 veces: 3 × 5 = 15 cm.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.8660254,
              -0.5
            ],
            [
              0.8660254,
              -0.5
            ]
          ],
          "lados": [
            "5 cm",
            "5 cm",
            "5 cm"
          ]
        },
        "id": "prof_fig_per_regular-v4"
      },
      {
        "enunciado": "El polígono es regular, tiene 8 lados y cada lado mide 3 cm. ¿Cuántos centímetros mide su perímetro?",
        "respuesta_correcta": "24",
        "opciones": [
          "11",
          "21",
          "24"
        ],
        "paso_resuelto": "Sumamos 3 cm 8 veces: 8 × 3 = 24 cm.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.70710678,
              0.70710678
            ],
            [
              -1.0,
              0.0
            ],
            [
              -0.70710678,
              -0.70710678
            ],
            [
              -0.0,
              -1.0
            ],
            [
              0.70710678,
              -0.70710678
            ],
            [
              1.0,
              -0.0
            ],
            [
              0.70710678,
              0.70710678
            ]
          ],
          "lados": [
            "3 cm",
            "3 cm",
            "3 cm",
            "3 cm",
            "3 cm",
            "3 cm",
            "3 cm",
            "3 cm"
          ]
        },
        "id": "prof_fig_per_regular-v5"
      },
      {
        "enunciado": "El polígono es regular, tiene 7 lados y cada lado mide 2 cm. ¿Cuántos centímetros mide su perímetro?",
        "respuesta_correcta": "14",
        "opciones": [
          "12",
          "14",
          "9"
        ],
        "paso_resuelto": "Sumamos 2 cm 7 veces: 7 × 2 = 14 cm.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0.0,
              1.0
            ],
            [
              -0.78183148,
              0.6234898
            ],
            [
              -0.97492791,
              -0.22252093
            ],
            [
              -0.43388374,
              -0.90096887
            ],
            [
              0.43388374,
              -0.90096887
            ],
            [
              0.97492791,
              -0.22252093
            ],
            [
              0.78183148,
              0.6234898
            ]
          ],
          "lados": [
            "2 cm",
            "2 cm",
            "2 cm",
            "2 cm",
            "2 cm",
            "2 cm",
            "2 cm"
          ]
        },
        "id": "prof_fig_per_regular-v6"
      }
    ],
    "visual": {
      "tipo": "poligono",
      "puntos": [
        [
          0.0,
          1.0
        ],
        [
          -0.95105652,
          0.30901699
        ],
        [
          -0.58778525,
          -0.80901699
        ],
        [
          0.58778525,
          -0.80901699
        ],
        [
          0.95105652,
          0.30901699
        ]
      ],
      "lados": [
        "3 cm",
        "3 cm",
        "3 cm",
        "3 cm",
        "3 cm"
      ]
    }
  },
  {
    "id": "prof_fig_borde_l",
    "tema": "perimetros_compuestos",
    "despues_de": "mat_per_faltante",
    "titulo": "Recorrer un contorno con entrante",
    "explicacion": "En una figura con forma de L recorremos todos los tramos del borde exterior, incluido el entrante. Las divisiones que dibujamos dentro no forman parte del perímetro. Sumamos cada tramo una sola vez.",
    "ejemplo": "En la figura, el borde mide 6 + 2 + 3 + 2 + 3 + 4 = 20 cm.",
    "pasos": [
      "Empezamos abajo y seguimos el borde hasta volver al mismo punto.",
      "Anotamos y sumamos los seis tramos: 20 cm."
    ],
    "pista": "Seguí el contorno sin saltarte el entrante.",
    "actividades": [
      {
        "enunciado": "Cada tramo del borde está medido en cm. ¿Cuántos centímetros mide el perímetro de esta figura?",
        "respuesta_correcta": "20",
        "opciones": [
          "20",
          "10",
          "18"
        ],
        "paso_resuelto": "6 + 2 + 3 + 2 + 3 + 4 = 20 cm.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              6,
              0
            ],
            [
              6,
              2
            ],
            [
              3,
              2
            ],
            [
              3,
              4
            ],
            [
              0,
              4
            ]
          ],
          "lados": [
            "6 cm",
            "2 cm",
            "3 cm",
            "2 cm",
            "3 cm",
            "4 cm"
          ]
        },
        "id": "prof_fig_borde_l-v1"
      },
      {
        "enunciado": "Cada tramo del borde está medido en cm. ¿Cuántos centímetros mide el perímetro de esta figura?",
        "respuesta_correcta": "26",
        "opciones": [
          "13",
          "23",
          "26"
        ],
        "paso_resuelto": "8 + 2 + 4 + 3 + 4 + 5 = 26 cm.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              8,
              0
            ],
            [
              8,
              2
            ],
            [
              4,
              2
            ],
            [
              4,
              5
            ],
            [
              0,
              5
            ]
          ],
          "lados": [
            "8 cm",
            "2 cm",
            "4 cm",
            "3 cm",
            "4 cm",
            "5 cm"
          ]
        },
        "id": "prof_fig_borde_l-v2"
      },
      {
        "enunciado": "Cada tramo del borde está medido en cm. ¿Cuántos centímetros mide el perímetro de esta figura?",
        "respuesta_correcta": "26",
        "opciones": [
          "22",
          "26",
          "13"
        ],
        "paso_resuelto": "7 + 2 + 4 + 4 + 3 + 6 = 26 cm.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              7,
              0
            ],
            [
              7,
              2
            ],
            [
              3,
              2
            ],
            [
              3,
              6
            ],
            [
              0,
              6
            ]
          ],
          "lados": [
            "7 cm",
            "2 cm",
            "4 cm",
            "4 cm",
            "3 cm",
            "6 cm"
          ]
        },
        "id": "prof_fig_borde_l-v3"
      },
      {
        "enunciado": "Cada tramo del borde está medido en cm. ¿Cuántos centímetros mide el perímetro de esta figura?",
        "respuesta_correcta": "28",
        "opciones": [
          "28",
          "14",
          "26"
        ],
        "paso_resuelto": "9 + 3 + 5 + 2 + 4 + 5 = 28 cm.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              9,
              0
            ],
            [
              9,
              3
            ],
            [
              4,
              3
            ],
            [
              4,
              5
            ],
            [
              0,
              5
            ]
          ],
          "lados": [
            "9 cm",
            "3 cm",
            "5 cm",
            "2 cm",
            "4 cm",
            "5 cm"
          ]
        },
        "id": "prof_fig_borde_l-v4"
      },
      {
        "enunciado": "Cada tramo del borde está medido en cm. ¿Cuántos centímetros mide el perímetro de esta figura?",
        "respuesta_correcta": "28",
        "opciones": [
          "14",
          "24",
          "28"
        ],
        "paso_resuelto": "8 + 2 + 3 + 4 + 5 + 6 = 28 cm.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              8,
              0
            ],
            [
              8,
              2
            ],
            [
              5,
              2
            ],
            [
              5,
              6
            ],
            [
              0,
              6
            ]
          ],
          "lados": [
            "8 cm",
            "2 cm",
            "3 cm",
            "4 cm",
            "5 cm",
            "6 cm"
          ]
        },
        "id": "prof_fig_borde_l-v5"
      },
      {
        "enunciado": "Cada tramo del borde está medido en cm. ¿Cuántos centímetros mide el perímetro de esta figura?",
        "respuesta_correcta": "34",
        "opciones": [
          "30",
          "34",
          "17"
        ],
        "paso_resuelto": "10 + 3 + 6 + 4 + 4 + 7 = 34 cm.",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              10,
              0
            ],
            [
              10,
              3
            ],
            [
              4,
              3
            ],
            [
              4,
              7
            ],
            [
              0,
              7
            ]
          ],
          "lados": [
            "10 cm",
            "3 cm",
            "6 cm",
            "4 cm",
            "4 cm",
            "7 cm"
          ]
        },
        "id": "prof_fig_borde_l-v6"
      }
    ],
    "visual": {
      "tipo": "poligono",
      "puntos": [
        [
          0,
          0
        ],
        [
          6,
          0
        ],
        [
          6,
          2
        ],
        [
          3,
          2
        ],
        [
          3,
          4
        ],
        [
          0,
          4
        ]
      ],
      "lados": [
        "6 cm",
        "2 cm",
        "3 cm",
        "2 cm",
        "3 cm",
        "4 cm"
      ]
    }
  },
  {
    "id": "prof_fig_area_unidad",
    "tema": "perimetros_compuestos",
    "despues_de": "prof_fig_borde_l",
    "titulo": "Cubrir con cuadrados de un centímetro",
    "explicacion": "El perímetro mide el borde; el área mide la superficie que cubrimos. Un cuadradito de 1 cm de lado ocupa 1 cm². Para medir el área contamos los cuadrados que cubren la figura sin huecos ni superposiciones.",
    "ejemplo": "La figura tiene dos filas de tres cuadrados de 1 cm²: ocupa 6 cm².",
    "pasos": [
      "Contamos tres cuadrados en cada fila.",
      "Hay dos filas: 3 + 3 = 6 cuadrados. El área es 6 cm²."
    ],
    "pista": "Contá las casillas interiores, no las líneas del borde.",
    "actividades": [
      {
        "enunciado": "Cada casilla mide 1 cm². ¿Cuántos centímetros cuadrados ocupa la figura?",
        "respuesta_correcta": "6",
        "opciones": [
          "6",
          "10",
          "5"
        ],
        "paso_resuelto": "Hay 2 filas de 3 casillas: 3 + 3 = 6 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              3,
              0
            ],
            [
              3,
              2
            ],
            [
              0,
              2
            ]
          ],
          "cuadricula": true,
          "nota": "Cada casilla: 1 cm²"
        },
        "id": "prof_fig_area_unidad-v1"
      },
      {
        "enunciado": "Cada casilla mide 1 cm². ¿Cuántos centímetros cuadrados ocupa la figura?",
        "respuesta_correcta": "12",
        "opciones": [
          "14",
          "7",
          "12"
        ],
        "paso_resuelto": "Hay 3 filas de 4 casillas: 4 + 4 + 4 = 12 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              4,
              0
            ],
            [
              4,
              3
            ],
            [
              0,
              3
            ]
          ],
          "cuadricula": true,
          "nota": "Cada casilla: 1 cm²"
        },
        "id": "prof_fig_area_unidad-v2"
      },
      {
        "enunciado": "Cada casilla mide 1 cm². ¿Cuántos centímetros cuadrados ocupa la figura?",
        "respuesta_correcta": "10",
        "opciones": [
          "7",
          "10",
          "14"
        ],
        "paso_resuelto": "Hay 2 filas de 5 casillas: 5 + 5 = 10 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              5,
              0
            ],
            [
              5,
              2
            ],
            [
              0,
              2
            ]
          ],
          "cuadricula": true,
          "nota": "Cada casilla: 1 cm²"
        },
        "id": "prof_fig_area_unidad-v3"
      },
      {
        "enunciado": "Cada casilla mide 1 cm². ¿Cuántos centímetros cuadrados ocupa la figura?",
        "respuesta_correcta": "9",
        "opciones": [
          "9",
          "12",
          "6"
        ],
        "paso_resuelto": "Hay 3 filas de 3 casillas: 3 + 3 + 3 = 9 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              3,
              0
            ],
            [
              3,
              3
            ],
            [
              0,
              3
            ]
          ],
          "cuadricula": true,
          "nota": "Cada casilla: 1 cm²"
        },
        "id": "prof_fig_area_unidad-v4"
      },
      {
        "enunciado": "Cada casilla mide 1 cm². ¿Cuántos centímetros cuadrados ocupa la figura?",
        "respuesta_correcta": "8",
        "opciones": [
          "12",
          "6",
          "8"
        ],
        "paso_resuelto": "Hay 2 filas de 4 casillas: 4 + 4 = 8 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              4,
              0
            ],
            [
              4,
              2
            ],
            [
              0,
              2
            ]
          ],
          "cuadricula": true,
          "nota": "Cada casilla: 1 cm²"
        },
        "id": "prof_fig_area_unidad-v5"
      },
      {
        "enunciado": "Cada casilla mide 1 cm². ¿Cuántos centímetros cuadrados ocupa la figura?",
        "respuesta_correcta": "15",
        "opciones": [
          "8",
          "15",
          "16"
        ],
        "paso_resuelto": "Hay 3 filas de 5 casillas: 5 + 5 + 5 = 15 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              5,
              0
            ],
            [
              5,
              3
            ],
            [
              0,
              3
            ]
          ],
          "cuadricula": true,
          "nota": "Cada casilla: 1 cm²"
        },
        "id": "prof_fig_area_unidad-v6"
      }
    ],
    "visual": {
      "tipo": "poligono",
      "puntos": [
        [
          0,
          0
        ],
        [
          3,
          0
        ],
        [
          3,
          2
        ],
        [
          0,
          2
        ]
      ],
      "cuadricula": true,
      "nota": "Cada casilla: 1 cm²"
    }
  },
  {
    "id": "prof_fig_area_rect",
    "tema": "perimetros_compuestos",
    "despues_de": "prof_fig_area_unidad",
    "titulo": "Pasar de filas a una multiplicación",
    "explicacion": "En un rectángulo, cada fila tiene tantos cuadrados de 1 cm² como centímetros mide la base. Hay tantas filas como centímetros mide la altura. Por eso el área es base por altura. En un cuadrado multiplicamos el lado por sí mismo.",
    "ejemplo": "Un rectángulo de base 4 cm y altura 3 cm ocupa 4 × 3 = 12 cm².",
    "pasos": [
      "La base permite poner cuatro cuadrados por fila y la altura permite tres filas.",
      "Multiplicamos 4 × 3 = 12 y escribimos cm²."
    ],
    "pista": "Para cubrir multiplicamos base por altura; para rodear sumamos lados.",
    "actividades": [
      {
        "enunciado": "La base mide 4 cm y la altura 3 cm. ¿Cuál es el área en cm²?",
        "respuesta_correcta": "12",
        "opciones": [
          "12",
          "14",
          "7"
        ],
        "paso_resuelto": "Área = base × altura = 4 × 3 = 12 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              4,
              0
            ],
            [
              4,
              3
            ],
            [
              0,
              3
            ]
          ],
          "cuadricula": true,
          "lados": [
            "4 cm",
            "3 cm",
            "",
            ""
          ]
        },
        "id": "prof_fig_area_rect-v1"
      },
      {
        "enunciado": "La base mide 6 cm y la altura 2 cm. ¿Cuál es el área en cm²?",
        "respuesta_correcta": "12",
        "opciones": [
          "16",
          "8",
          "12"
        ],
        "paso_resuelto": "Área = base × altura = 6 × 2 = 12 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              6,
              0
            ],
            [
              6,
              2
            ],
            [
              0,
              2
            ]
          ],
          "cuadricula": true,
          "lados": [
            "6 cm",
            "2 cm",
            "",
            ""
          ]
        },
        "id": "prof_fig_area_rect-v2"
      },
      {
        "enunciado": "La base mide 5 cm y la altura 4 cm. ¿Cuál es el área en cm²?",
        "respuesta_correcta": "20",
        "opciones": [
          "9",
          "20",
          "18"
        ],
        "paso_resuelto": "Área = base × altura = 5 × 4 = 20 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              5,
              0
            ],
            [
              5,
              4
            ],
            [
              0,
              4
            ]
          ],
          "cuadricula": true,
          "lados": [
            "5 cm",
            "4 cm",
            "",
            ""
          ]
        },
        "id": "prof_fig_area_rect-v3"
      },
      {
        "enunciado": "La base mide 4 cm y la altura 4 cm. ¿Cuál es el área en cm²?",
        "respuesta_correcta": "16",
        "opciones": [
          "8",
          "16"
        ],
        "paso_resuelto": "Área = base × altura = 4 × 4 = 16 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              4,
              0
            ],
            [
              4,
              4
            ],
            [
              0,
              4
            ]
          ],
          "cuadricula": true,
          "lados": [
            "4 cm",
            "4 cm",
            "",
            ""
          ]
        },
        "id": "prof_fig_area_rect-v4"
      },
      {
        "enunciado": "La base mide 7 cm y la altura 3 cm. ¿Cuál es el área en cm²?",
        "respuesta_correcta": "21",
        "opciones": [
          "20",
          "10",
          "21"
        ],
        "paso_resuelto": "Área = base × altura = 7 × 3 = 21 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              7,
              0
            ],
            [
              7,
              3
            ],
            [
              0,
              3
            ]
          ],
          "cuadricula": true,
          "lados": [
            "7 cm",
            "3 cm",
            "",
            ""
          ]
        },
        "id": "prof_fig_area_rect-v5"
      },
      {
        "enunciado": "La base mide 6 cm y la altura 5 cm. ¿Cuál es el área en cm²?",
        "respuesta_correcta": "30",
        "opciones": [
          "11",
          "30",
          "22"
        ],
        "paso_resuelto": "Área = base × altura = 6 × 5 = 30 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              6,
              0
            ],
            [
              6,
              5
            ],
            [
              0,
              5
            ]
          ],
          "cuadricula": true,
          "lados": [
            "6 cm",
            "5 cm",
            "",
            ""
          ]
        },
        "id": "prof_fig_area_rect-v6"
      }
    ],
    "visual": {
      "tipo": "poligono",
      "puntos": [
        [
          0,
          0
        ],
        [
          4,
          0
        ],
        [
          4,
          3
        ],
        [
          0,
          3
        ]
      ],
      "cuadricula": true,
      "lados": [
        "4 cm",
        "3 cm",
        "",
        ""
      ]
    }
  },
  {
    "id": "prof_fig_area_tri",
    "tema": "perimetros_compuestos",
    "despues_de": "prof_fig_area_rect",
    "titulo": "Un triángulo que ocupa medio rectángulo",
    "explicacion": "Una diagonal divide un rectángulo en dos triángulos iguales. Cada uno ocupa la mitad del área del rectángulo. En este triángulo rectángulo, la base y la altura son los dos lados que forman el ángulo de 90°. Su área es base por altura, dividido por dos.",
    "ejemplo": "Un triángulo rectángulo de base 6 cm y altura 4 cm ocupa la mitad de 24 cm²: 12 cm².",
    "pasos": [
      "Completamos el rectángulo: 6 × 4 = 24 cm².",
      "Tomamos la mitad: 24 ÷ 2 = 12 cm²."
    ],
    "pista": "Calculá el rectángulo completo y dividí su área por dos.",
    "actividades": [
      {
        "enunciado": "El triángulo rectángulo tiene base 6 cm y altura 4 cm. ¿Cuál es su área en cm²?",
        "respuesta_correcta": "12",
        "opciones": [
          "12",
          "24",
          "10"
        ],
        "paso_resuelto": "El rectángulo completo ocupa 6 × 4 = 24 cm².\nEl triángulo ocupa la mitad: 24 ÷ 2 = 12 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              6,
              0
            ],
            [
              0,
              4
            ]
          ],
          "lados": [
            "6 cm",
            "",
            "4 cm"
          ],
          "auxiliares": [
            [
              [
                6,
                0
              ],
              [
                6,
                4
              ],
              [
                0,
                4
              ]
            ]
          ],
          "nota": "Línea punteada: completamos el rectángulo"
        },
        "id": "prof_fig_area_tri-v1"
      },
      {
        "enunciado": "El triángulo rectángulo tiene base 4 cm y altura 3 cm. ¿Cuál es su área en cm²?",
        "respuesta_correcta": "6",
        "opciones": [
          "12",
          "7",
          "6"
        ],
        "paso_resuelto": "El rectángulo completo ocupa 4 × 3 = 12 cm².\nEl triángulo ocupa la mitad: 12 ÷ 2 = 6 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              4,
              0
            ],
            [
              0,
              3
            ]
          ],
          "lados": [
            "4 cm",
            "",
            "3 cm"
          ],
          "auxiliares": [
            [
              [
                4,
                0
              ],
              [
                4,
                3
              ],
              [
                0,
                3
              ]
            ]
          ],
          "nota": "Línea punteada: completamos el rectángulo"
        },
        "id": "prof_fig_area_tri-v2"
      },
      {
        "enunciado": "El triángulo rectángulo tiene base 8 cm y altura 3 cm. ¿Cuál es su área en cm²?",
        "respuesta_correcta": "12",
        "opciones": [
          "11",
          "12",
          "24"
        ],
        "paso_resuelto": "El rectángulo completo ocupa 8 × 3 = 24 cm².\nEl triángulo ocupa la mitad: 24 ÷ 2 = 12 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              8,
              0
            ],
            [
              0,
              3
            ]
          ],
          "lados": [
            "8 cm",
            "",
            "3 cm"
          ],
          "auxiliares": [
            [
              [
                8,
                0
              ],
              [
                8,
                3
              ],
              [
                0,
                3
              ]
            ]
          ],
          "nota": "Línea punteada: completamos el rectángulo"
        },
        "id": "prof_fig_area_tri-v3"
      },
      {
        "enunciado": "El triángulo rectángulo tiene base 6 cm y altura 5 cm. ¿Cuál es su área en cm²?",
        "respuesta_correcta": "15",
        "opciones": [
          "15",
          "30",
          "11"
        ],
        "paso_resuelto": "El rectángulo completo ocupa 6 × 5 = 30 cm².\nEl triángulo ocupa la mitad: 30 ÷ 2 = 15 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              6,
              0
            ],
            [
              0,
              5
            ]
          ],
          "lados": [
            "6 cm",
            "",
            "5 cm"
          ],
          "auxiliares": [
            [
              [
                6,
                0
              ],
              [
                6,
                5
              ],
              [
                0,
                5
              ]
            ]
          ],
          "nota": "Línea punteada: completamos el rectángulo"
        },
        "id": "prof_fig_area_tri-v4"
      },
      {
        "enunciado": "El triángulo rectángulo tiene base 10 cm y altura 4 cm. ¿Cuál es su área en cm²?",
        "respuesta_correcta": "20",
        "opciones": [
          "40",
          "14",
          "20"
        ],
        "paso_resuelto": "El rectángulo completo ocupa 10 × 4 = 40 cm².\nEl triángulo ocupa la mitad: 40 ÷ 2 = 20 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              10,
              0
            ],
            [
              0,
              4
            ]
          ],
          "lados": [
            "10 cm",
            "",
            "4 cm"
          ],
          "auxiliares": [
            [
              [
                10,
                0
              ],
              [
                10,
                4
              ],
              [
                0,
                4
              ]
            ]
          ],
          "nota": "Línea punteada: completamos el rectángulo"
        },
        "id": "prof_fig_area_tri-v5"
      },
      {
        "enunciado": "El triángulo rectángulo tiene base 8 cm y altura 6 cm. ¿Cuál es su área en cm²?",
        "respuesta_correcta": "24",
        "opciones": [
          "14",
          "24",
          "48"
        ],
        "paso_resuelto": "El rectángulo completo ocupa 8 × 6 = 48 cm².\nEl triángulo ocupa la mitad: 48 ÷ 2 = 24 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              8,
              0
            ],
            [
              0,
              6
            ]
          ],
          "lados": [
            "8 cm",
            "",
            "6 cm"
          ],
          "auxiliares": [
            [
              [
                8,
                0
              ],
              [
                8,
                6
              ],
              [
                0,
                6
              ]
            ]
          ],
          "nota": "Línea punteada: completamos el rectángulo"
        },
        "id": "prof_fig_area_tri-v6"
      }
    ],
    "visual": {
      "tipo": "poligono",
      "puntos": [
        [
          0,
          0
        ],
        [
          6,
          0
        ],
        [
          0,
          4
        ]
      ],
      "lados": [
        "6 cm",
        "",
        "4 cm"
      ],
      "auxiliares": [
        [
          [
            6,
            0
          ],
          [
            6,
            4
          ],
          [
            0,
            4
          ]
        ]
      ],
      "nota": "Línea punteada: completamos el rectángulo"
    }
  },
  {
    "id": "prof_fig_area_l",
    "tema": "perimetros_compuestos",
    "despues_de": "prof_fig_area_tri",
    "titulo": "Cubrir una figura por partes",
    "explicacion": "Para hallar el área de una figura en L podemos dividirla en dos rectángulos que no se superpongan. Calculamos el área de cada parte y después las sumamos. La línea interior ayuda a separar las partes: no añade superficie.",
    "ejemplo": "Separamos una franja inferior de 6 × 2 y un rectángulo superior de 3 × 2: 12 + 6 = 18 cm².",
    "pasos": [
      "Contamos 12 casillas en la franja inferior y 6 en la parte superior.",
      "Sumamos las dos superficies: 12 + 6 = 18 cm²."
    ],
    "pista": "Separá en dos rectángulos y contá cada casilla una sola vez.",
    "actividades": [
      {
        "enunciado": "Cada casilla mide 1 cm². ¿Cuál es el área total de la figura en L, en cm²?",
        "respuesta_correcta": "18",
        "opciones": [
          "18",
          "24",
          "20"
        ],
        "paso_resuelto": "Franja inferior: 6 × 2 = 12 cm².\nParte superior: 3 × 2 = 6 cm².\nÁrea total: 12 + 6 = 18 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              6,
              0
            ],
            [
              6,
              2
            ],
            [
              3,
              2
            ],
            [
              3,
              4
            ],
            [
              0,
              4
            ]
          ],
          "cuadricula": true,
          "division": 2,
          "nota": "Cada casilla: 1 cm²"
        },
        "id": "prof_fig_area_l-v1"
      },
      {
        "enunciado": "Cada casilla mide 1 cm². ¿Cuál es el área total de la figura en L, en cm²?",
        "respuesta_correcta": "28",
        "opciones": [
          "40",
          "26",
          "28"
        ],
        "paso_resuelto": "Franja inferior: 8 × 2 = 16 cm².\nParte superior: 4 × 3 = 12 cm².\nÁrea total: 16 + 12 = 28 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              8,
              0
            ],
            [
              8,
              2
            ],
            [
              4,
              2
            ],
            [
              4,
              5
            ],
            [
              0,
              5
            ]
          ],
          "cuadricula": true,
          "division": 2,
          "nota": "Cada casilla: 1 cm²"
        },
        "id": "prof_fig_area_l-v2"
      },
      {
        "enunciado": "Cada casilla mide 1 cm². ¿Cuál es el área total de la figura en L, en cm²?",
        "respuesta_correcta": "26",
        "opciones": [
          "26",
          "42"
        ],
        "paso_resuelto": "Franja inferior: 7 × 2 = 14 cm².\nParte superior: 3 × 4 = 12 cm².\nÁrea total: 14 + 12 = 26 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              7,
              0
            ],
            [
              7,
              2
            ],
            [
              3,
              2
            ],
            [
              3,
              6
            ],
            [
              0,
              6
            ]
          ],
          "cuadricula": true,
          "division": 2,
          "nota": "Cada casilla: 1 cm²"
        },
        "id": "prof_fig_area_l-v3"
      },
      {
        "enunciado": "Cada casilla mide 1 cm². ¿Cuál es el área total de la figura en L, en cm²?",
        "respuesta_correcta": "35",
        "opciones": [
          "35",
          "45",
          "28"
        ],
        "paso_resuelto": "Franja inferior: 9 × 3 = 27 cm².\nParte superior: 4 × 2 = 8 cm².\nÁrea total: 27 + 8 = 35 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              9,
              0
            ],
            [
              9,
              3
            ],
            [
              4,
              3
            ],
            [
              4,
              5
            ],
            [
              0,
              5
            ]
          ],
          "cuadricula": true,
          "division": 3,
          "nota": "Cada casilla: 1 cm²"
        },
        "id": "prof_fig_area_l-v4"
      },
      {
        "enunciado": "Cada casilla mide 1 cm². ¿Cuál es el área total de la figura en L, en cm²?",
        "respuesta_correcta": "36",
        "opciones": [
          "48",
          "28",
          "36"
        ],
        "paso_resuelto": "Franja inferior: 8 × 2 = 16 cm².\nParte superior: 5 × 4 = 20 cm².\nÁrea total: 16 + 20 = 36 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              8,
              0
            ],
            [
              8,
              2
            ],
            [
              5,
              2
            ],
            [
              5,
              6
            ],
            [
              0,
              6
            ]
          ],
          "cuadricula": true,
          "division": 2,
          "nota": "Cada casilla: 1 cm²"
        },
        "id": "prof_fig_area_l-v5"
      },
      {
        "enunciado": "Cada casilla mide 1 cm². ¿Cuál es el área total de la figura en L, en cm²?",
        "respuesta_correcta": "46",
        "opciones": [
          "34",
          "46",
          "70"
        ],
        "paso_resuelto": "Franja inferior: 10 × 3 = 30 cm².\nParte superior: 4 × 4 = 16 cm².\nÁrea total: 30 + 16 = 46 cm².",
        "visual": {
          "tipo": "poligono",
          "puntos": [
            [
              0,
              0
            ],
            [
              10,
              0
            ],
            [
              10,
              3
            ],
            [
              4,
              3
            ],
            [
              4,
              7
            ],
            [
              0,
              7
            ]
          ],
          "cuadricula": true,
          "division": 3,
          "nota": "Cada casilla: 1 cm²"
        },
        "id": "prof_fig_area_l-v6"
      }
    ],
    "visual": {
      "tipo": "poligono",
      "puntos": [
        [
          0,
          0
        ],
        [
          6,
          0
        ],
        [
          6,
          2
        ],
        [
          3,
          2
        ],
        [
          3,
          4
        ],
        [
          0,
          4
        ]
      ],
      "cuadricula": true,
      "division": 2,
      "nota": "Cada casilla: 1 cm²"
    }
  }
];
for (const unidad of FIGURAS_R14) {
 const indice = UNIDADES_BASES.findIndex(u => u.id === (unidad.antes_de || unidad.despues_de));
 if (indice < 0) throw new Error('Falta el paso de referencia de ' + unidad.id);
 UNIDADES_BASES.splice(indice + (unidad.antes_de ? 0 : 1), 0, unidad);
}
const APOYOS_R14 = {"mat_tri_lados": {"tipo": "poligono", "puntos": [[0, 0], [4, 0], [4.5, 3.968626966596886]], "lados": ["4 cm", "4 cm", "6 cm"]}, "mat_tri_angulos": {"tipo": "poligono", "puntos": [[0, 0], [1, 0], [0.5923962654520477, 0.7059903775918711]], "angulos": ["50°", "60°", "70°"]}, "mat_cuad_lados": {"tipo": "poligono", "puntos": [[0, 0], [3, 0], [3, 3], [0, 3]], "angulos": ["90°", "90°", "90°", "90°"], "lados": ["3 cm", "3 cm", "3 cm", "3 cm"]}, "mat_circ_radio": {"tipo": "circunferencia", "radio": 3}, "mat_per_rectangulo": {"tipo": "poligono", "puntos": [[0, 0], [5, 0], [5, 3], [0, 3]], "lados": ["5 cm", "3 cm", "5 cm", "3 cm"]}, "mat_per_circunferencia": {"tipo": "circunferencia", "diametro": 10}, "mat_per_union": {"tipo": "poligono", "puntos": [[0, 0], [6, 0], [6, 3], [0, 3]], "lados": ["6 cm", "3 cm", "6 cm", "3 cm"], "auxiliares": [[[3, 0], [3, 3]]], "nota": "Línea interior: lado compartido de 3 cm"}, "mat_per_faltante": {"tipo": "tramo", "total": 10, "parte": 4}};
for (const [id, visual] of Object.entries(APOYOS_R14)) { UNIDADES_BASES.find(u => u.id === id).visual = visual; }
// FIN R14

export const TEMAS_BASES = [...new Set(UNIDADES_BASES.map(u => u.tema))];
export function getUnidadBase(id) { return UNIDADES_BASES.find(u => u.id === id) || null; }
export function crearActividadBase(id, modo, sesiones = []) {
 const u = getUnidadBase(id); if (!u) return null;
 // Prefer unseen variants; once exhausted, reuse the least recently presented.
 const previas = sesiones.filter(s => s.ia_parametros_usados?.objetivo_id === id && s.ia_parametros_usados?.contenido_version === VERSION_BASES && s.tipo_pregunta !== 'leccion')
   .sort((a,b) => String(a.created_at || '').localeCompare(String(b.created_at || '')));
 const ultimaAparicion = new Map(previas.map((s,i) => [s.ia_parametros_usados.actividad_id, i]));
 const variantes = u.actividades.slice(1);
 const siguiente = variantes.find(a => !ultimaAparicion.has(a.id)) || variantes.reduce((a,b) => ultimaAparicion.get(a.id) <= ultimaAparicion.get(b.id) ? a : b);
 const actividad = modo === 'leccion' ? u.actividades[0] : siguiente;
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
 slides:unidades.map(u=>({titulo:u.titulo,contenido:u.explicacion+'\n\n'+u.ejemplo+'\n'+u.pasos.join('\n'),concepto_clave:u.pista,visual_apoyo:u.visual})),
 apunte_completo:unidades.map(u=>'## '+u.titulo+'\n\n'+u.explicacion+'\n\n'+u.ejemplo+'\n\n'+u.pasos.join('\n')+'\n\nPara probar: '+u.actividades[0].enunciado+'\nRespuesta para revisar: '+u.actividades[0].respuesta_correcta).join('\n\n')};
}

// Cierre básico alineado con las habilidades enseñadas; no es una simulación del ingreso.
export function getCierreBase(tema) {
 const unidades=UNIDADES_BASES.filter(u=>u.tema===tema);
 if(!unidades.length)return null;
 const ampliado=unidades.some(u=>u.id.startsWith('prof_'));
 // La preparación cubre toda la secuencia; el cierre breve toma una muestra de tres ideas.
 const seleccion=ampliado ? [unidades[0],unidades[Math.floor(unidades.length/2)],unidades.at(-1)] : unidades;
 const preguntas=seleccion.map((u,i)=>{const a=u.actividades[5];return {id:String(i+1),objetivo_id:u.id,texto:a.enunciado,visual:a.visual,opciones:a.opciones,respuesta_correcta:a.respuesta_correcta};});
 const min_correctas=Math.ceil(preguntas.length*2/3);
 return {tipo:'examen_final',dificultad:'basico',contenido_version:VERSION_BASES,
 ...(ampliado ? {revision_cierre:'secuencia:'+unidades.map(u=>u.id).join('|')} : {}),
 tiempo_estimado:Math.max(3,preguntas.length),min_correctas,
 instrucciones:`Cierre de primeros pasos. Necesitás ${min_correctas} de ${preguntas.length} respuestas correctas. Podés releer los textos.`,
 enunciado:ampliado ? 'Este cierre breve repasa tres ideas de la secuencia que ya practicaste. No es un examen oficial de ingreso.' : 'Revisamos las ideas que ya practicaste. Este cierre trabaja las bases; no es un examen oficial de ingreso.',preguntas};
}

export function esCierreActual(examen, tema) {
 const actual=getCierreBase(tema);
 if(!actual)return true;
 if(actual.revision_cierre)return examen?.revision_cierre===actual.revision_cierre;
 return examen?.contenido_version===VERSION_BASES;
}

// Alias para consumidores anteriores de los cierres de Lengua.
export function getCierreLengua(tema) { return getCierreBase(tema); }
