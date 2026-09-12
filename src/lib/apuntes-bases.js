import { VERSION_BASES } from "./metadatos-bases.js";
const UNIDADES = [
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
export function getFichaBase(tema) {
 const us=UNIDADES.filter(u=>u.tema===tema);if(!us.length)return null;
 return {titulo:'Primeros pasos: '+tema.replaceAll('_',' '),disponible:true,pdf_url:'/apuntes/bases-'+tema+'.pdf',contenido_version:VERSION_BASES,
 slides:us.map(u=>({titulo:u.titulo,contenido:u.explicacion+'\n\n'+u.ejemplo+'\n'+u.pasos.join('\n'),concepto_clave:u.pista})),
 apunte_completo:us.map(u=>'## '+u.titulo+'\n\n'+u.explicacion+'\n\n'+u.ejemplo+'\n\n'+u.pasos.join('\n')).join('\n\n')};
}
