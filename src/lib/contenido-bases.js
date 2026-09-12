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
 slides:unidades.map(u=>({titulo:u.titulo,contenido:u.explicacion+'\n\n'+u.ejemplo+'\n'+u.pasos.join('\n'),concepto_clave:u.pista})),
 apunte_completo:unidades.map(u=>'## '+u.titulo+'\n\n'+u.explicacion+'\n\n'+u.ejemplo+'\n\n'+u.pasos.join('\n')+'\n\nPara probar: '+u.actividades[0].enunciado+'\nRespuesta para revisar: '+u.actividades[0].respuesta_correcta).join('\n\n')};
}

// Cierre básico alineado con las habilidades enseñadas; no es una simulación del ingreso.
export function getCierreLengua(tema) {
 const unidades=UNIDADES_BASES.filter(u=>u.tema===tema && u.id.startsWith('leng_'));
 if(!unidades.length)return null;
 const preguntas=unidades.map((u,i)=>{const a=u.actividades[5];return {id:String(i+1),objetivo_id:u.id,texto:a.enunciado,opciones:a.opciones,respuesta_correcta:a.respuesta_correcta};});
 const min_correctas=Math.ceil(preguntas.length*2/3);
 return {tipo:'examen_final',dificultad:'basico',contenido_version:VERSION_BASES,tiempo_estimado:5,min_correctas,
 instrucciones:`Cierre de primeros pasos. Necesitás ${min_correctas} de ${preguntas.length} respuestas correctas. Podés releer los textos.`,
 enunciado:'Revisamos las ideas que ya practicaste. Este cierre trabaja las bases; no es un examen oficial de ingreso.',preguntas};
}
