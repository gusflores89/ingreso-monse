export const METODO_PASO_A_PASO = {
  titulo: "Metodo para resolver problemas",
  pasos: [
    {
      emoji: "🔍",
      nombre: "Que me piden",
      descripcion: "Leo el problema y subrayo la pregunta. Que tengo que averiguar.",
    },
    {
      emoji: "📋",
      nombre: "Que datos tengo",
      descripcion: "Anoto todos los numeros y datos importantes del problema.",
    },
    {
      emoji: "🧮",
      nombre: "Calculo paso a paso",
      descripcion: "Hago un calculo a la vez. Escribo cada resultado parcial.",
    },
    {
      emoji: "✅",
      nombre: "Tiene sentido",
      descripcion: "Verifico si los numeros cierran y si la respuesta es logica.",
    },
    {
      emoji: "📝",
      nombre: "Respuesta final",
      descripcion: "Escribo la respuesta completa con las unidades: kg, cm, pesos, personas.",
    },
  ],
};

export const CASOS_RESUELTOS = {
  tablas_multiplicar_2_5: {
    capa_1_2: {
      titulo: "Caso resuelto: Tablas de multiplicar",
      problema: `En una jugueteria hay 3 estantes.
En cada estante hay 5 munecos.
Cuantos munecos hay en total?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Cuantos munecos hay en total en la jugueteria." },
        { paso: "📋 Que datos tengo", contenido: "3 estantes\n5 munecos en cada estante" },
        { paso: "🧮 Calculo", contenido: "3 estantes x 5 munecos = 15 munecos" },
        { paso: "✅ Tiene sentido", contenido: "Si cuento 5 + 5 + 5 = 15. Si, cierra." },
        { paso: "📝 Respuesta", contenido: "Hay 15 munecos en total." },
      ],
      tip: "Multiplicar es sumar varias veces lo mismo. 3 x 5 es lo mismo que 5 + 5 + 5.",
    },
    capa_3: {
      titulo: "Caso resuelto: Multiplicacion en varios pasos",
      problema: `Un cine tiene 4 salas. Cada sala tiene 8 filas.
Cada fila tiene 5 butacas.
Cuantas butacas hay en todo el cine?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "El total de butacas en todo el cine." },
        { paso: "📋 Que datos tengo", contenido: "4 salas\n8 filas por sala\n5 butacas por fila" },
        { paso: "🧮 Paso 1: butacas por sala", contenido: "8 filas x 5 butacas = 40 butacas por sala" },
        { paso: "🧮 Paso 2: total del cine", contenido: "4 salas x 40 butacas = 160 butacas" },
        { paso: "✅ Tiene sentido", contenido: "Un cine con 4 salas y 160 butacas es razonable." },
        { paso: "📝 Respuesta", contenido: "Hay 160 butacas en todo el cine." },
      ],
      tip: "Cuando hay muchos datos, resolve de adentro hacia afuera: fila, sala, total.",
    },
    capa_4_5: {
      titulo: "Caso resuelto: Multiplicacion nivel examen",
      problema: `Un estadio tiene 3 niveles. Cada nivel tiene 12 sectores.
Cada sector tiene 8 filas con 25 asientos cada una.
Cuantos asientos tiene el estadio en total?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Total de asientos en todo el estadio." },
        { paso: "📋 Que datos tengo", contenido: "3 niveles\n12 sectores por nivel\n8 filas por sector\n25 asientos por fila" },
        { paso: "🧮 Paso 1: asientos por sector", contenido: "8 filas x 25 asientos = 200 asientos por sector" },
        { paso: "🧮 Paso 2: asientos por nivel", contenido: "12 sectores x 200 asientos = 2400 asientos por nivel" },
        { paso: "🧮 Paso 3: total", contenido: "3 niveles x 2400 asientos = 7200 asientos" },
        { paso: "✅ Tiene sentido", contenido: "Un estadio con 7200 asientos es razonable." },
        { paso: "📝 Respuesta", contenido: "El estadio tiene 7200 asientos en total." },
      ],
      tip: "No intentes calcular todo junto. Un paso por renglon.",
    },
  },

  division_1_digito: {
    capa_1_2: {
      titulo: "Caso resuelto: Division",
      problema: `Tenes 15 figuritas y queres repartirlas entre 3 amigos por igual.
Cuantas figuritas le tocan a cada uno?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Cuantas figuritas le tocan a cada amigo." },
        { paso: "📋 Que datos tengo", contenido: "15 figuritas en total\n3 amigos" },
        { paso: "🧮 Calculo", contenido: "15 dividido 3 = 5 figuritas para cada uno" },
        { paso: "✅ Tiene sentido", contenido: "Verifico: 5 x 3 = 15." },
        { paso: "📝 Respuesta", contenido: "A cada amigo le tocan 5 figuritas." },
      ],
      tip: "Para verificar una division, multiplica el resultado por el divisor.",
    },
    capa_3: {
      titulo: "Caso resuelto: Division con resto",
      problema: `Tenes 23 galletitas y queres armar bolsitas de 4 galletitas cada una.
Cuantas bolsitas completas podes armar?
Cuantas galletitas sobran?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Cuantas bolsitas completas y cuantas sobran." },
        { paso: "📋 Que datos tengo", contenido: "23 galletitas\n4 galletitas por bolsita" },
        { paso: "🧮 Calculo", contenido: "23 dividido 4 = 5 bolsitas completas y sobran 3\nporque 5 x 4 = 20 y 23 - 20 = 3" },
        { paso: "✅ Tiene sentido", contenido: "20 galletitas en bolsitas + 3 sobrantes = 23." },
        { paso: "📝 Respuesta", contenido: "Puedo armar 5 bolsitas completas y sobran 3 galletitas." },
      ],
      tip: "En division con resto: cociente x divisor + resto = total.",
    },
  },

  fracciones_concepto: {
    capa_1_2: {
      titulo: "Caso resuelto: Concepto de fracciones",
      problema: `Una pizza esta cortada en 4 partes iguales.
Comes 1 pedazo.
Que fraccion comiste? Que fraccion queda?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "La fraccion que comi y la fraccion que queda." },
        { paso: "📋 Que datos tengo", contenido: "La pizza tiene 4 partes iguales\nComi 1 parte" },
        { paso: "🧮 Fraccion que comi", contenido: "Comi 1 de 4 partes: 1/4" },
        { paso: "🧮 Fraccion que queda", contenido: "Quedan 3 de 4 partes: 3/4" },
        { paso: "✅ Tiene sentido", contenido: "1/4 + 3/4 = 4/4, una pizza completa." },
        { paso: "📝 Respuesta", contenido: "Comi 1/4 de la pizza. Quedan 3/4." },
      ],
      tip: "El numero de abajo dice en cuantas partes se divide. El de arriba dice cuantas partes agarro.",
    },
    capa_3: {
      titulo: "Caso resuelto: Comparar fracciones por equivalencia",
      problema: `Juan comio 2/3 de su pizza.
Maria comio 4/6 de su pizza.
Las pizzas son del mismo tamano. Quien comio mas?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Comparar 2/3 con 4/6." },
        { paso: "📋 Que datos tengo", contenido: "Juan: 2/3\nMaria: 4/6" },
        { paso: "🧮 Busco fraccion equivalente", contenido: "Si multiplico arriba y abajo a 2/3 por 2: 2x2=4 y 3x2=6. Obtenemos 4/6." },
        { paso: "🧮 Comparo", contenido: "2/3 es equivalente a 4/6. Comieron la misma cantidad." },
        { paso: "✅ Tiene sentido", contenido: "Si dividis una pizza en 3 partes y comes 2, comes lo mismo que si la dividis en 6 partes y comes 4." },
        { paso: "📝 Respuesta", contenido: "Comieron la misma cantidad." },
      ],
      tip: "Podes amplificar una fraccion multiplicando arriba y abajo por el mismo numero para ver si son equivalentes.",
    },
  },

  fracciones_del_resto: {
    capa_1_2: {
      titulo: "Caso resuelto: Fracciones del resto",
      problema: `Tenes 12 galletitas.
Comes 4.
De las que quedan, le das la mitad a tu hermana.
Cuantas te quedan para vos?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Cuantas galletitas me quedan al final." },
        { paso: "📋 Que datos tengo", contenido: "Empiezo con 12\nComo 4\nDe lo que queda, doy la mitad" },
        { paso: "🧮 Paso 1: resto", contenido: "12 - 4 = 8 galletitas quedan" },
        { paso: "🧮 Paso 2: mitad del resto", contenido: "La mitad de 8 es 4" },
        { paso: "🧮 Paso 3: final", contenido: "8 - 4 = 4 galletitas para mi" },
        { paso: "✅ Tiene sentido", contenido: "Comi 4 + di 4 + me quedan 4 = 12." },
        { paso: "📝 Respuesta", contenido: "Me quedan 4 galletitas." },
      ],
      tip: "Ojo con la palabra RESTO. Primero calcula cuanto queda, despues trabaja con eso.",
    },
    capa_3: {
      titulo: "Caso resuelto: Fracciones del resto",
      problema: `Una heladeria tiene 180 helados.
Vende 1/3 del total a la manana.
De los que quedan, vende 1/4 a la tarde.
Cuantos vendio y cuantos quedan?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Vendidos a la manana, vendidos a la tarde y los que quedan." },
        { paso: "📋 Que datos tengo", contenido: "Total: 180\nManana: 1/3 del total\nTarde: 1/4 del resto" },
        { paso: "🧮 Paso 1: manana", contenido: "1/3 de 180 = 180 dividido 3 = 60" },
        { paso: "🧮 Paso 2: resto", contenido: "180 - 60 = 120 helados quedan" },
        { paso: "🧮 Paso 3: tarde", contenido: "1/4 de 120 = 30 helados" },
        { paso: "🧮 Paso 4: final", contenido: "120 - 30 = 90 helados quedan" },
        { paso: "✅ Tiene sentido", contenido: "60 + 30 + 90 = 180." },
        { paso: "📝 Respuestas", contenido: "Vendio 60 a la manana, 30 a la tarde y quedan 90." },
      ],
      tip: "Cuando dice del resto, nunca uses el total original. Usa lo que quedo.",
    },
    capa_4_5: {
      titulo: "Caso resuelto: Fracciones del resto nivel Monserrat",
      problema: `De un camion con 9000 kg de alimento se utiliza 1/3 para vacas.
Con 1/4 del resto se alimenta a ovejas.
a) Que fraccion del total se usa para vacas?
b) Que fraccion del total se usa para ovejas?
c) Cuantos kg quedan?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Fraccion para vacas, fraccion del total para ovejas, y kilos que quedan." },
        { paso: "📋 Que datos tengo", contenido: "Total: 9000 kg\nVacas: 1/3 del total\nOvejas: 1/4 del resto" },
        { paso: "🧮 Paso 1: vacas", contenido: "1/3 de 9000 = 3000 kg\nFraccion: 1/3" },
        { paso: "🧮 Paso 2: resto", contenido: "9000 - 3000 = 6000 kg\nEso es 2/3 del total" },
        { paso: "🧮 Paso 3: ovejas", contenido: "1/4 del resto = 1/4 de 6000 = 1500 kg\nComo fraccion del total: 1500/9000 = 1/6" },
        { paso: "🧮 Paso 4: quedan", contenido: "9000 - 3000 - 1500 = 4500 kg" },
        { paso: "✅ Tiene sentido", contenido: "3000 + 1500 + 4500 = 9000." },
        { paso: "📝 Respuestas", contenido: "a) 1/3\nb) 1/6\nc) Quedan 4500 kg" },
      ],
      tip: "Si te piden fraccion del total pero el dato es del resto, converti despues al total.",
    },
  },

  numeros_romanos: {
    capa_1_2: {
      titulo: "Caso resuelto: Numeros romanos",
      problema: `Escribi en romanos:
a) 7
b) 14
c) 23`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Pasar numeros normales a romanos." },
        { paso: "📋 Valores", contenido: "I = 1\nV = 5\nX = 10\nL = 50" },
        { paso: "🧮 7", contenido: "7 = 5 + 2 = V + II = VII" },
        { paso: "🧮 14", contenido: "14 = 10 + 4 = X + IV = XIV" },
        { paso: "🧮 23", contenido: "23 = 20 + 3 = XX + III = XXIII" },
        { paso: "📝 Respuestas", contenido: "a) VII\nb) XIV\nc) XXIII" },
      ],
      tip: "Si una letra menor va antes de una mayor, se resta: IV = 4.",
    },
  },

  secuencias_aritmeticas: {
    capa_1_2: {
      titulo: "Caso resuelto: Secuencias",
      problema: `Que numero sigue?
2, 5, 8, 11, 14, ...`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "El proximo numero." },
        { paso: "📋 Busco el patron", contenido: "2 a 5 suma 3\n5 a 8 suma 3\n8 a 11 suma 3\nSiempre suma 3" },
        { paso: "🧮 Calculo", contenido: "14 + 3 = 17" },
        { paso: "✅ Tiene sentido", contenido: "La secuencia sigue subiendo de a 3." },
        { paso: "📝 Respuesta", contenido: "Sigue el 17." },
      ],
      tip: "Resta cada numero con el anterior para descubrir el patron.",
    },
    capa_3: {
      titulo: "Caso resuelto: Secuencia con patron variable",
      problema: `Que numero sigue?
1, 4, 10, 22, 46, ...`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "El proximo numero." },
        { paso: "📋 Busco diferencias", contenido: "1 a 4: +3\n4 a 10: +6\n10 a 22: +12\n22 a 46: +24\nLas diferencias se duplican." },
        { paso: "🧮 Calculo", contenido: "La proxima diferencia es 48\n46 + 48 = 94" },
        { paso: "✅ Tiene sentido", contenido: "3, 6, 12, 24, 48. Si, se duplican." },
        { paso: "📝 Respuesta", contenido: "Sigue el 94." },
      ],
      tip: "Si las diferencias no son iguales, busca patron en las diferencias.",
    },
  },

  secuencias_geometricas_fibonacci: null,

  geometria_angulos: {
    capa_1_2: {
      titulo: "Caso resuelto: Angulos",
      problema: `Un angulo recto mide 90 grados.
Si lo divido en dos partes iguales, cuanto mide cada parte?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "La medida de cada mitad del angulo." },
        { paso: "📋 Que datos tengo", contenido: "Angulo recto = 90 grados\nDos partes iguales" },
        { paso: "🧮 Calculo", contenido: "90 dividido 2 = 45 grados" },
        { paso: "✅ Tiene sentido", contenido: "45 + 45 = 90." },
        { paso: "📝 Respuesta", contenido: "Cada parte mide 45 grados." },
      ],
      tip: "Una linea que divide un angulo en dos partes iguales se llama bisectriz.",
    },
    capa_3: {
      titulo: "Caso resuelto: Complemento de un angulo",
      problema: `La tercera parte del complemento de un angulo de 30 grados es igual a cuanto?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "La tercera parte del complemento de 30 grados." },
        { paso: "📋 Que datos tengo", contenido: "Complemento significa completar 90 grados." },
        { paso: "🧮 Paso 1: complemento", contenido: "90 - 30 = 60 grados" },
        { paso: "🧮 Paso 2: tercera parte", contenido: "60 dividido 3 = 20 grados" },
        { paso: "✅ Tiene sentido", contenido: "20 x 3 = 60 y 60 + 30 = 90." },
        { paso: "📝 Respuesta", contenido: "La tercera parte es 20 grados." },
      ],
      tip: "Complementarios suman 90. Suplementarios suman 180.",
    },
  },

  perimetros_simples: {
    capa_1_2: {
      titulo: "Caso resuelto: Perimetro",
      problema: `Un jardin rectangular mide 6 metros de largo y 4 metros de ancho.
Cuantos metros de alambrado se necesitan para rodearlo?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Los metros de alambrado. Eso es el perimetro." },
        { paso: "📋 Que datos tengo", contenido: "Largo: 6 m\nAncho: 4 m\nEs un rectangulo" },
        { paso: "🧮 Calculo", contenido: "6 + 4 + 6 + 4 = 20 m" },
        { paso: "✅ Tiene sentido", contenido: "Sumo todos los lados del borde." },
        { paso: "📝 Respuesta", contenido: "Se necesitan 20 metros de alambrado." },
      ],
      tip: "Perimetro es caminar alrededor de la figura y sumar todos los lados.",
    },
  },

  si_me_la_longitud: {
    capa_1_2: {
      titulo: "Caso resuelto: Medidas de longitud",
      problema: `Una cinta mide 2 metros.
Cuantos centimetros mide?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Pasar metros a centimetros." },
        { paso: "📋 Que datos tengo", contenido: "1 metro = 100 centimetros\nTengo 2 metros" },
        { paso: "🧮 Calculo", contenido: "2 x 100 = 200 centimetros" },
        { paso: "✅ Tiene sentido", contenido: "2 metros es mas que 100 cm, entonces 200 cm tiene sentido." },
        { paso: "📝 Respuesta", contenido: "La cinta mide 200 centimetros." },
      ],
      tip: "Antes de calcular, converti todo a la misma unidad.",
    },
  },

  si_me_la_masa_capacidad_tiempo: {
    capa_1_2: {
      titulo: "Caso resuelto: Medidas",
      problema: `Un frasco tiene 150 ml de jarabe.
Cada cucharada tiene 8 ml.
Cuantas cucharadas completas se pueden llenar y cuanto sobra?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Cucharadas completas y ml que sobran." },
        { paso: "📋 Que datos tengo", contenido: "Frasco: 150 ml\nCucharada: 8 ml" },
        { paso: "🧮 Calculo", contenido: "150 dividido 8 = 18 cucharadas y sobran 6 ml\nporque 18 x 8 = 144 y 150 - 144 = 6" },
        { paso: "✅ Tiene sentido", contenido: "144 + 6 = 150." },
        { paso: "📝 Respuesta", contenido: "18 cucharadas completas y sobran 6 ml." },
      ],
      tip: "1 litro = 1000 ml. Si hay unidades distintas, converti primero.",
    },
  },

  ortografia_b_v: {
    capa_1_2: {
      titulo: "Caso resuelto: Ortografia B/V",
      problema: `Completa con b o v:
"Ha_ia decidido _iajar a _uenos Aires."`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Completar con B o V." },
        { paso: "📋 Reglas que ayudan", contenido: "Las palabras de la familia mantienen la letra.\nViaje y viajar van con V.\nBuenos va con B." },
        { paso: "🧮 Resuelvo", contenido: "HaBia\nViajar\nBuenos" },
        { paso: "✅ Leo completo", contenido: "Habia decidido viajar a Buenos Aires." },
        { paso: "📝 Respuesta", contenido: "Habia decidido viajar a Buenos Aires." },
      ],
      tip: "Si dudas, pensa en una palabra de la misma familia.",
    },
  },

  ortografia_g_j_gu_gu: {
    capa_1_2: {
      titulo: "Caso resuelto: Ortografia G/J",
      problema: `Completa con g, j, gu o gu:
"_illermo via_o a la a_encia."`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Completar con G, J o GU." },
        { paso: "📋 Reglas", contenido: "GUE y GUI suenan con G suave.\nJ suena fuerte en ja, je, ji, jo, ju." },
        { paso: "🧮 Resuelvo", contenido: "Guillermo\nviajo\nagencia" },
        { paso: "📝 Respuesta", contenido: "Guillermo viajo a la agencia." },
      ],
      tip: "Preguntate si el sonido es suave o fuerte.",
    },
  },

  tildes_generales_agudas_graves_esdrujulas: {
    capa_1_2: {
      titulo: "Caso resuelto: Tildes",
      problema: `Decidi si estas palabras llevan tilde:
cafe, arbol, telefono`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Poner tildes donde corresponda." },
        { paso: "📋 Regla simple", contenido: "Agudas: ultima silaba.\nGraves: penultima silaba.\nEsdrujulas: siempre llevan tilde." },
        { paso: "🧮 Cafe", contenido: "ca-FE es aguda y termina en vocal. Lleva tilde: cafe -> café" },
        { paso: "🧮 Arbol", contenido: "AR-bol es grave y no termina en vocal, n o s. Lleva tilde: árbol" },
        { paso: "🧮 Telefono", contenido: "te-LE-fo-no es esdrujula. Siempre lleva tilde: teléfono" },
        { paso: "📝 Respuesta", contenido: "café, árbol, teléfono" },
      ],
      tip: "Las esdrujulas siempre llevan tilde.",
    },
  },

  produccion_escrita_narracion: {
    capa_1_2: {
      titulo: "Caso resuelto: Escribir una narracion",
      problema: `Continua esta historia:
"Era mi cumpleanos y mis papas me regalaron un perrito. Lo llame Tofi. El primer dia, Tofi se escapo al jardin y empezo a cavar un pozo. De repente..."`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Continuar la historia y poner un titulo." },
        { paso: "📋 Planifico", contenido: "Problema: Tofi encuentra algo.\nSolucion: era un juguete viejo.\nTitulo: El tesoro de Tofi." },
        {
          paso: "✍️ Escribo",
          contenido: `El tesoro de Tofi

De repente, Tofi empezo a ladrar muy fuerte. Yo me acerque y vi una caja enterrada. La abri con cuidado. Adentro habia un osito viejo.

Mi mama me conto que era de mi hermana cuando era chiquita. Lo lavamos y quedo hermoso.

Desde ese dia, Tofi duerme abrazado a su osito.`,
        },
        { paso: "✅ Verifico", contenido: "Tiene problema, solucion y titulo." },
      ],
      tip: "Antes de escribir, pensa: que problema aparece y como se soluciona.",
    },
    capa_3: {
      titulo: "Caso resuelto: Narracion con comparacion",
      problema: `Continua la historia e inclui una comparacion:
"Lucia encontro en el desvan de su abuela una caja vieja llena de cartas..."`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Continuar la historia e incluir una comparacion." },
        { paso: "📋 Que es una comparacion", contenido: "Decir que algo es como otra cosa: brillaba como una estrella." },
        { paso: "📋 Planifico", contenido: "Problema: encuentra un mapa.\nSolucion: halla una brujula familiar.\nComparacion: brillaba como una estrella." },
        {
          paso: "✍️ Escribo",
          contenido: `El mapa del capitan

Lucia siguio el mapa hasta el limonero. Cavo con cuidado y encontro un cofre. Adentro habia una brujula que brillaba como una estrella.

La abuela le conto que era de su bisabuelo. Lucia la guardo como un tesoro familiar.`,
        },
        { paso: "✅ Verifico", contenido: "Tiene problema, solucion, titulo y comparacion." },
      ],
      tip: "Comparacion usa palabras como: como, parecia, igual que.",
    },
  },

  comprension_lectora_literal_inferida: {
    capa_1_2: {
      titulo: "Caso resuelto: Comprension lectora",
      problema: `Lee:
"Los delfines son mamiferos que viven en el mar. Respiran aire, por eso salen a la superficie. Viven en grupos llamados manadas."

a) Que son los delfines?
b) Por que salen a la superficie?
c) Como se llaman sus grupos?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Responder 3 preguntas sobre el texto." },
        { paso: "📋 Busco en el texto", contenido: "Delfines son mamiferos.\nSalen porque respiran aire.\nLos grupos se llaman manadas." },
        { paso: "📝 Respuestas", contenido: "a) Mamiferos.\nb) Porque respiran aire.\nc) Manadas." },
      ],
      tip: "Lee primero las preguntas. Despues lee el texto buscando esas respuestas.",
    },
  },

  discurso_conectores_sinonimos: {
    capa_1_2: {
      titulo: "Caso resuelto: Conectores",
      problema: `Completa con PERO, PORQUE o ENTONCES:
"Queria ir al parque, ___ estaba lloviendo.
Espere un rato, ___ salio el sol.
Sali a jugar ___ me encanta la plaza."`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Elegir el conector correcto." },
        { paso: "📋 Que significa cada uno", contenido: "PERO: obstaculo.\nPORQUE: razon.\nENTONCES: consecuencia." },
        { paso: "🧮 Resuelvo", contenido: "Queria ir al parque, PERO llovia.\nEspere, ENTONCES salio el sol.\nSali PORQUE me encanta." },
        { paso: "📝 Respuesta", contenido: "PERO - ENTONCES - PORQUE" },
      ],
      tip: "PERO marca obstaculo. PORQUE explica razon. ENTONCES muestra que paso despues.",
    },
  },

  // ═══════════════════════════════════════════════════════════
  // POTENCIACIÓN Y RAÍZ CUADRADA [NUEVO]
  // ═══════════════════════════════════════════════════════════
 
  "potenciacion_y_raiz_cuadrada": {
    capa_1_2: {
      titulo: "Caso resuelto: Potencias (el cuadrado de un número)",
      problema: `Lucas armó un cuadrado con fichas: 3 filas con 3 fichas cada una.
¿Cuántas fichas usó en total?`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "Cuántas fichas hay en un cuadrado de 3 × 3."
        },
        {
          paso: "📋 ¿Qué datos tengo?",
          contenido: "• 3 filas\n• 3 fichas en cada fila"
        },
        {
          paso: "🧮 Calculo",
          contenido: "3 × 3 = 9 fichas\n\nEsto se puede escribir más corto: 3² (se lee \"tres al cuadrado\")\n3² = 3 × 3 = 9"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Si dibujo el cuadrado de fichas:\n● ● ●\n● ● ●\n● ● ●\nCuento: 9 fichas ✅\n\n¡Por eso se llama \"al CUADRADO\"! Porque forma un cuadrado de fichas."
        },
        {
          paso: "📝 Respuesta",
          contenido: "Usó 9 fichas. En símbolos: 3² = 9"
        }
      ],
      tip: "El numerito chiquito de arriba (el 2 en 3²) dice CUÁNTAS VECES se multiplica el número por sí mismo. 3² = 3 × 3. 5² = 5 × 5 = 25."
    },
    capa_3: {
      titulo: "Caso resuelto: Cuadrados, cubos y raíz cuadrada",
      problema: `a) ¿Cuánto es 4³?
b) ¿Cuánto es √36? (raíz cuadrada de 36)`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "Dos cosas: un cubo (potencia 3) y una raíz cuadrada."
        },
        {
          paso: "📋 ¿Qué significa cada símbolo?",
          contenido: "• 4³ = \"cuatro al cubo\" = multiplicar 4 tres veces: 4 × 4 × 4\n• √36 = \"raíz de 36\" = ¿qué número al cuadrado da 36?\n\n⚠️ La raíz es la operación CONTRARIA a la potencia."
        },
        {
          paso: "🧮 Paso 1: El cubo",
          contenido: "4³ = 4 × 4 × 4\nPrimero: 4 × 4 = 16\nDespués: 16 × 4 = 64\n\n4³ = 64"
        },
        {
          paso: "🧮 Paso 2: La raíz",
          contenido: "√36 = ¿qué número multiplicado por sí mismo da 36?\nPruebo: 5 × 5 = 25 (no)\nPruebo: 6 × 6 = 36 (¡sí!)\n\n√36 = 6"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Verifico la raíz al revés: 6² = 36 ✅\nLa potencia y la raíz se \"deshacen\" entre sí."
        },
        {
          paso: "📝 Respuestas",
          contenido: "a) 4³ = 64\nb) √36 = 6"
        }
      ],
      tip: "Conviene saber de memoria los cuadrados del 1 al 12: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144. Con eso las raíces salen solas."
    },
    capa_4_5: {
      titulo: "Caso resuelto: Potencias dentro de cálculos — Nivel Monserrat",
      problema: `Resolvé: 16 : 2³ + 4² =`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "Resolver un cálculo que mezcla división, potencias y suma."
        },
        {
          paso: "📋 Regla de oro",
          contenido: "Las POTENCIAS se resuelven PRIMERO, antes que la división y la suma.\n\n⚠️ TRAMPA común: hacer 16 : 2 = 8 primero. ¡MAL! El 2 está elevado al cubo, primero hay que resolver 2³."
        },
        {
          paso: "🧮 Paso 1: Resuelvo las potencias",
          contenido: "2³ = 2 × 2 × 2 = 8\n4² = 4 × 4 = 16\n\nEl cálculo queda: 16 : 8 + 16"
        },
        {
          paso: "🧮 Paso 2: Resuelvo la división",
          contenido: "16 : 8 = 2\n\nEl cálculo queda: 2 + 16"
        },
        {
          paso: "🧮 Paso 3: Resuelvo la suma",
          contenido: "2 + 16 = 18"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Si hubiera hecho 16 : 2 primero (el error típico), me daba 8³ + 16 = un número enorme y equivocado. El orden importa. ✅"
        },
        {
          paso: "📝 Respuesta",
          contenido: "16 : 2³ + 4² = 18"
        }
      ],
      tip: "En el examen, los combinados SIEMPRE tienen una potencia escondida tipo 16:2³. Resolvé TODAS las potencias primero, marcalas con un círculo antes de empezar."
    }
  },
 
  // ═══════════════════════════════════════════════════════════
  // JERARQUÍA DE OPERACIONES [NUEVO]
  // ═══════════════════════════════════════════════════════════
 
  "jerarquia_operaciones": {
    capa_1_2: {
      titulo: "Caso resuelto: ¿Qué se hace primero?",
      problema: `Resolvé: 2 + 3 × 4 =`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "Resolver un cálculo con suma Y multiplicación juntas."
        },
        {
          paso: "📋 Regla de oro",
          contenido: "La MULTIPLICACIÓN se hace ANTES que la suma.\nAunque la suma esté primera al leer, la multiplicación gana.\n\n⚠️ Si leés de corrido (2+3=5, 5×4=20) te da MAL."
        },
        {
          paso: "🧮 Paso 1: Primero la multiplicación",
          contenido: "3 × 4 = 12\n\nEl cálculo queda: 2 + 12"
        },
        {
          paso: "🧮 Paso 2: Después la suma",
          contenido: "2 + 12 = 14"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Pensalo así: \"2 caramelos MÁS 3 bolsitas de 4 caramelos\".\nLas bolsitas son 12 caramelos. 2 + 12 = 14. ✅"
        },
        {
          paso: "📝 Respuesta",
          contenido: "2 + 3 × 4 = 14 (no 20)"
        }
      ],
      tip: "Orden de las operaciones: 1° multiplicación y división, 2° suma y resta. Como en un juego: la multiplicación tiene el turno primero."
    },
    capa_3: {
      titulo: "Caso resuelto: Jerarquía con paréntesis",
      problema: `Resolvé: (2 + 3) × 4 − 10 : 2 =`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "Resolver un cálculo con paréntesis, multiplicación, resta y división."
        },
        {
          paso: "📋 El orden completo",
          contenido: "1° PARÉNTESIS (siempre ganan)\n2° Multiplicación y división (de izquierda a derecha)\n3° Suma y resta (de izquierda a derecha)"
        },
        {
          paso: "🧮 Paso 1: El paréntesis",
          contenido: "(2 + 3) = 5\n\nQueda: 5 × 4 − 10 : 2"
        },
        {
          paso: "🧮 Paso 2: Multiplicación y división (a la vez, de izq. a der.)",
          contenido: "5 × 4 = 20\n10 : 2 = 5\n\nQueda: 20 − 5"
        },
        {
          paso: "🧮 Paso 3: La resta",
          contenido: "20 − 5 = 15"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Comparo: SIN paréntesis sería 2 + 3 × 4 − 10 : 2 = 2 + 12 − 5 = 9.\nEl paréntesis CAMBIA el resultado (15 ≠ 9). Por eso importa. ✅"
        },
        {
          paso: "📝 Respuesta",
          contenido: "(2 + 3) × 4 − 10 : 2 = 15"
        }
      ],
      tip: "Truco para no perderte: resolvé POR TÉRMINOS. Los términos se separan por los + y − que están FUERA de paréntesis. Resolvé cada término por separado y al final sumá/restá."
    },
    capa_4_5: {
      titulo: "Caso resuelto: Combinado completo — Nivel Monserrat",
      problema: `Resolvé ordenado y por términos:
3³ + 4² − 2³ × 5 =`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "Un ejercicio combinado con potencias, multiplicación, suma y resta. El examen pide resolverlo \"ordenado y por términos\"."
        },
        {
          paso: "📋 Separo en términos",
          contenido: "Los términos se cortan en los + y − :\n\nTérmino 1: 3³\nTérmino 2: 4²\nTérmino 3: 2³ × 5\n\n⚠️ El × NO corta términos. 2³ × 5 es UN solo término."
        },
        {
          paso: "🧮 Paso 1: Resuelvo cada término",
          contenido: "Término 1: 3³ = 3 × 3 × 3 = 27\nTérmino 2: 4² = 4 × 4 = 16\nTérmino 3: 2³ × 5 = 8 × 5 = 40\n(primero la potencia 2³ = 8, después × 5)"
        },
        {
          paso: "🧮 Paso 2: Junto los resultados",
          contenido: "27 + 16 − 40"
        },
        {
          paso: "🧮 Paso 3: Sumo y resto de izquierda a derecha",
          contenido: "27 + 16 = 43\n43 − 40 = 3"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Reviso el término 3: si hubiera hecho 2 × 5 = 10 primero y después al cubo, daba 1000. El orden potencia-primero evita ese desastre. ✅"
        },
        {
          paso: "📝 Respuesta",
          contenido: "3³ + 4² − 2³ × 5 = 3"
        }
      ],
      tip: "En el examen real escriben en las RECOMENDACIONES: \"Los ejercicios combinados deben resolverse ordenados y por términos\". Si no mostrás los pasos, te descuentan puntos aunque el resultado esté bien."
    }
  },
 
  // ═══════════════════════════════════════════════════════════
  // SECUENCIAS ALFANUMÉRICAS Y DE FIGURAS [NUEVO]
  // ═══════════════════════════════════════════════════════════
 
  "secuencias_alfanumericas_y_figuras": {
    capa_1_2: {
      titulo: "Caso resuelto: Patrones que se repiten",
      problema: `Mirá este patrón de figuras:
● ■ ▲ ● ■ ▲ ● ■ ...
 
¿Qué figura sigue?`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "Descubrir qué figura viene después de la última."
        },
        {
          paso: "📋 Busco el patrón que se repite",
          contenido: "Miro el principio: ● ■ ▲ | ● ■ ▲ | ● ■ ...\n\n¡El grupo que se repite es ● ■ ▲! (3 figuras)"
        },
        {
          paso: "🧮 Sigo el patrón",
          contenido: "El último grupo quedó incompleto: ● ■ ...\nDespués de ● viene ■, y después de ■ viene ▲"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Si completo: ● ■ ▲ | ● ■ ▲ | ● ■ ▲\nTres grupos completos iguales ✅"
        },
        {
          paso: "📝 Respuesta",
          contenido: "Sigue el triángulo ▲"
        }
      ],
      tip: "El grupo que se repite se llama PERÍODO. Primero encontrá el período, después todo es más fácil."
    },
    capa_3: {
      titulo: "Caso resuelto: Secuencias con letras y números",
      problema: `Completá la secuencia:
A2 — C4 — E6 — G8 — ?`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "El próximo elemento, que tiene una LETRA y un NÚMERO."
        },
        {
          paso: "📋 Analizo cada parte POR SEPARADO",
          contenido: "⚠️ TRUCO: las secuencias alfanuméricas tienen DOS reglas, una para letras y otra para números. Hay que descubrir las dos.\n\nLetras: A, C, E, G...\nNúmeros: 2, 4, 6, 8..."
        },
        {
          paso: "🧮 Paso 1: Regla de las letras",
          contenido: "A → C: salteo la B\nC → E: salteo la D\nE → G: salteo la F\n\nRegla: avanzo saltando UNA letra.\nDespués de G salteo la H → sigue la I"
        },
        {
          paso: "🧮 Paso 2: Regla de los números",
          contenido: "2 → 4 → 6 → 8: voy sumando 2\n\nDespués del 8: 8 + 2 = 10"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Letra I (saltando una) + número 10 (sumando 2). Las dos reglas se cumplen. ✅"
        },
        {
          paso: "📝 Respuesta",
          contenido: "Sigue I10"
        }
      ],
      tip: "Para las letras, escribí el abecedario arriba de la hoja: A B C D E F G H I J K... Así contás los saltos sin equivocarte."
    },
    capa_4_5: {
      titulo: "Caso resuelto: Figuras con período y división — Nivel Monserrat",
      problema: `Una secuencia de figuras tiene PERÍODO 4. El patrón es:
● ■ ▲ ★ ● ■ ▲ ★ ...
 
¿Qué figura corresponde a la posición 35? Justificá con una división.`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "La figura de la posición 35, SIN dibujar las 35 figuras (eso tarda y es fácil equivocarse). El examen pide justificar con división."
        },
        {
          paso: "📋 ¿Qué datos tengo?",
          contenido: "• Período 4: el grupo ● ■ ▲ ★ se repite cada 4 posiciones\n• Posición 1 = ●, posición 2 = ■, posición 3 = ▲, posición 4 = ★\n• Posición 5 vuelve a ● (arranca de nuevo)"
        },
        {
          paso: "🧮 Paso 1: Divido la posición por el período",
          contenido: "35 ÷ 4 = 8, resto 3\n(porque 8 × 4 = 32, y 35 − 32 = 3)"
        },
        {
          paso: "🧮 Paso 2: El RESTO me dice la figura",
          contenido: "El resto 3 significa: pasaron 8 grupos completos y estoy en la posición 3 del grupo siguiente.\n\nPosición 3 del grupo = ▲\n\n⚠️ REGLA: resto 1 → 1ª figura, resto 2 → 2ª, resto 3 → 3ª, resto 0 → ¡la ÚLTIMA figura del grupo! (★)"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Verifico con un número chico: posición 7 → 7 ÷ 4 = 1 resto 3 → debería ser ▲.\nCuento a mano: ● ■ ▲ ★ ● ■ ▲ → la 7ª es ▲ ✅ La regla funciona."
        },
        {
          paso: "📝 Respuesta",
          contenido: "La posición 35 es ▲ (triángulo), porque 35 ÷ 4 = 8 con resto 3, y la 3ª figura del período es el triángulo."
        }
      ],
      tip: "⚠️ El caso TRAMPA es resto 0. Si la división da justa (ej: posición 100 ÷ 4 = 25 resto 0), la figura es la ÚLTIMA del período, no la primera. Posición 100 → ★."
    }
  },
 
  // ═══════════════════════════════════════════════════════════
  // FRACCIONES — OPERACIONES [caso resuelto faltante crítico]
  // ═══════════════════════════════════════════════════════════
 
  "fracciones_operaciones": {
    capa_1_2: {
      titulo: "Caso resuelto: Sumar fracciones con el mismo denominador",
      problema: `Comiste 1/4 de pizza al mediodía y 2/4 a la noche.
¿Qué fracción de la pizza comiste en total?`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "Sumar dos fracciones: 1/4 + 2/4"
        },
        {
          paso: "📋 Miro los denominadores",
          contenido: "Las dos fracciones tienen el MISMO número abajo (4).\nEso significa que las porciones son del MISMO tamaño.\n\n⚠️ REGLA: si el denominador es igual, sumo SOLO los de arriba. El de abajo NO se toca."
        },
        {
          paso: "🧮 Calculo",
          contenido: "1/4 + 2/4 = (1+2)/4 = 3/4\n\nEl 4 de abajo queda igual."
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "1 porción + 2 porciones = 3 porciones de las 4 que tiene la pizza. ✅\n\n❌ ERROR común: sumar también los de abajo (3/8). ¡Eso sería decir que la pizza cambió de tamaño!"
        },
        {
          paso: "📝 Respuesta",
          contenido: "Comiste 3/4 de la pizza."
        }
      ],
      tip: "Los denominadores iguales son como porciones del mismo tamaño: las podés contar directamente. NUNCA sumes los denominadores."
    },
    capa_3: {
      titulo: "Caso resuelto: Sumar fracciones con DISTINTO denominador",
      problema: `Resolvé: 1/3 + 1/6 =`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "Sumar dos fracciones que tienen denominadores DISTINTOS (3 y 6)."
        },
        {
          paso: "📋 ¿Por qué no puedo sumar directo?",
          contenido: "Un tercio y un sexto son porciones de DISTINTO tamaño. No puedo contar \"1 + 1 = 2\" porque ¿2 qué? ¿tercios? ¿sextos?\n\nNecesito que las dos porciones sean del MISMO tamaño. Para eso uso el mínimo común múltiplo (MCM) que ya aprendiste."
        },
        {
          paso: "🧮 Paso 1: Busco el MCM de los denominadores",
          contenido: "Múltiplos de 3: 3, 6, 9, 12...\nMúltiplos de 6: 6, 12, 18...\n\nMCM(3, 6) = 6 ← el primero que coincide"
        },
        {
          paso: "🧮 Paso 2: Convierto las fracciones a sextos",
          contenido: "1/3 = ?/6 → multiplico arriba y abajo × 2 → 2/6\n1/6 ya está en sextos → queda 1/6"
        },
        {
          paso: "🧮 Paso 3: Ahora sí sumo (mismo denominador)",
          contenido: "2/6 + 1/6 = 3/6"
        },
        {
          paso: "🧮 Paso 4: Simplifico",
          contenido: "3/6 = 1/2 (divido arriba y abajo por 3)\n\nEl examen SIEMPRE pide el resultado como fracción irreducible."
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Un tercio es un poco más que un cuarto, más un sexto chiquito... debería dar cerca de la mitad. ¡Dio exactamente 1/2! ✅"
        },
        {
          paso: "📝 Respuesta",
          contenido: "1/3 + 1/6 = 3/6 = 1/2"
        }
      ],
      tip: "Los 4 pasos de siempre: 1) MCM de los denominadores, 2) convertir cada fracción, 3) sumar los numeradores, 4) SIMPLIFICAR. El paso 4 es el que más se olvida y el examen lo descuenta."
    },
    capa_4_5: {
      titulo: "Caso resuelto: Multiplicar y dividir fracciones — Nivel Monserrat",
      problema: `Resolvé y expresá simplificado:
a) 2/3 × 9/4 =
b) 5/6 : 10/3 =`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "Una multiplicación y una división de fracciones, con resultado simplificado."
        },
        {
          paso: "📋 Las reglas (¡más fáciles que la suma!)",
          contenido: "MULTIPLICAR: derecho. Arriba × arriba, abajo × abajo.\nDIVIDIR: doy vuelta la SEGUNDA fracción y multiplico.\n\n⚠️ Para multiplicar y dividir NO se necesita MCM. Ese es solo para sumar y restar."
        },
        {
          paso: "🧮 Parte a) Multiplicación",
          contenido: "2/3 × 9/4 = (2×9)/(3×4) = 18/12\n\nSimplifico: 18/12 → divido por 6 → 3/2"
        },
        {
          paso: "🧮 Parte b) División",
          contenido: "5/6 : 10/3 → doy vuelta la segunda → 5/6 × 3/10\n\n= (5×3)/(6×10) = 15/60\n\nSimplifico: 15/60 → divido por 15 → 1/4"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Parte a: 2/3 es casi 1, y 9/4 es un poco más de 2. Casi 1 × poco más de 2 ≈ un poco más de 1,5. Dio 3/2 = 1,5 ✅\nParte b: 5/6 es chico y lo divido por algo grande (10/3 ≈ 3,3), debería dar chiquito. Dio 1/4 ✅"
        },
        {
          paso: "📝 Respuestas",
          contenido: "a) 2/3 × 9/4 = 3/2\nb) 5/6 : 10/3 = 1/4"
        }
      ],
      tip: "TRUCO PRO: antes de multiplicar, simplificá EN CRUZ. En 2/3 × 9/4: el 9 y el 3 se simplifican (quedan 3 y 1), el 2 y el 4 también (quedan 1 y 2). Queda 3/2 directo, sin números grandes."
    }
  },
 
  // ═══════════════════════════════════════════════════════════
  // PERÍMETROS COMPUESTOS [caso resuelto faltante crítico]
  // ═══════════════════════════════════════════════════════════
 
  "perimetros_compuestos": {
    capa_1_2: {
      titulo: "Caso resuelto: Perímetro de una figura en L",
      problema: `Un patio tiene forma de L. Sus lados miden:
6 m, 4 m, 2 m, 2 m, 4 m y 2 m.
¿Cuántos metros de reja se necesitan para cercarlo todo?`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "El perímetro: cuánto mide TODO el borde de la figura."
        },
        {
          paso: "📋 ¿Qué datos tengo?",
          contenido: "Los 6 lados de la L: 6, 4, 2, 2, 4 y 2 metros.\n\n⚠️ Una figura en L tiene 6 lados, no 4. No te olvides de ninguno."
        },
        {
          paso: "🧮 Sumo TODOS los lados",
          contenido: "6 + 4 + 2 + 2 + 4 + 2 = 20 metros"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Imagino que camino por el borde del patio tocando la pared: paso por los 6 lados y vuelvo al inicio. Caminé 20 metros. ✅"
        },
        {
          paso: "📝 Respuesta",
          contenido: "Se necesitan 20 metros de reja."
        }
      ],
      tip: "El perímetro es SIEMPRE caminar por el borde completo. Marcá cada lado con un tilde ✓ a medida que lo sumás, así no te salteás ninguno."
    },
    capa_3: {
      titulo: "Caso resuelto: Figuras pegadas (cuadrado + triángulo)",
      problema: `Un cartel está formado por un cuadrado de 5 cm de lado con un triángulo equilátero pegado arriba (el lado del triángulo es igual al lado del cuadrado).
¿Cuál es el perímetro EXTERIOR del cartel?`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "El perímetro EXTERIOR: solo el borde de afuera de la figura completa."
        },
        {
          paso: "📋 ¿Qué datos tengo?",
          contenido: "• Cuadrado: 4 lados de 5 cm\n• Triángulo equilátero: 3 lados de 5 cm (equilátero = todos iguales)\n• Están PEGADOS por un lado\n\n⚠️ CLAVE: el lado donde se pegan queda ADENTRO. ¡No se cuenta!"
        },
        {
          paso: "🧮 Paso 1: Cuento los lados que SÍ están en el borde",
          contenido: "Del cuadrado: 3 lados (el de arriba quedó tapado por el triángulo)\nDel triángulo: 2 lados (el de abajo quedó pegado al cuadrado)\n\nTotal: 3 + 2 = 5 lados exteriores"
        },
        {
          paso: "🧮 Paso 2: Calculo",
          contenido: "5 lados × 5 cm = 25 cm"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "Si contara TODOS los lados de las dos figuras sería 4 + 3 = 7 lados = 35 cm. Pero 2 lados quedaron adentro (el pegado se cuenta 2 veces, una por figura). 35 − 10 = 25 ✅"
        },
        {
          paso: "📝 Respuesta",
          contenido: "El perímetro exterior es 25 cm."
        }
      ],
      tip: "En figuras pegadas, el lado compartido DESAPARECE del perímetro. Dibujá la figura y repasá el borde exterior con color: solo sumá lo que pintaste."
    },
    capa_3_extra: null, // Just placeholder if needed, not needed
    capa_4_5: {
      titulo: "Caso resuelto: Cuadrados y rectángulos fusionados — Nivel Monserrat",
      problema: `ABEF es un cuadrado y BCDE es un rectángulo pegado a su derecha (comparten el lado BE). El lado AB del cuadrado es el triple del lado BC del rectángulo: AB = 3 × BC.
Si el perímetro del cuadrado ABEF es 96 cm, calculá el perímetro del rectángulo BCDE.`,
      resolucion: [
        {
          paso: "🔍 ¿Qué me piden?",
          contenido: "El perímetro del rectángulo BCDE. Pero no me dan sus medidas directas: las tengo que DEDUCIR del cuadrado."
        },
        {
          paso: "📋 ¿Qué datos tengo?",
          contenido: "• Perímetro del cuadrado = 96 cm\n• AB = 3 × BC (el lado del cuadrado es el triple del ancho del rectángulo)\n• Comparten el lado BE\n\nEstrategia: 1° saco el lado del cuadrado, 2° saco BC, 3° armo el rectángulo."
        },
        {
          paso: "🧮 Paso 1: Lado del cuadrado",
          contenido: "El cuadrado tiene 4 lados iguales:\nAB = 96 ÷ 4 = 24 cm"
        },
        {
          paso: "🧮 Paso 2: Ancho del rectángulo (BC)",
          contenido: "AB = 3 × BC → 24 = 3 × BC → BC = 24 ÷ 3 = 8 cm"
        },
        {
          paso: "🧮 Paso 3: Alto del rectángulo (BE)",
          contenido: "BE es el lado compartido con el cuadrado.\nComo BE es lado del cuadrado: BE = 24 cm\n\nEl rectángulo BCDE mide 24 cm de alto × 8 cm de ancho."
        },
        {
          paso: "🧮 Paso 4: Perímetro del rectángulo",
          contenido: "P = 2 × (alto + ancho) = 2 × (24 + 8) = 2 × 32 = 64 cm"
        },
        {
          paso: "✅ ¿Tiene sentido?",
          contenido: "El rectángulo es más flaco que el cuadrado (8 vs 24), así que su perímetro debe ser menor que 96. Dio 64 < 96 ✅"
        },
        {
          paso: "📝 Respuesta",
          contenido: "El perímetro de BCDE es 64 cm."
        }
      ],
      tip: "En el examen, estos problemas NUNCA dan las medidas directas: dan el perímetro de UNA figura y una relación (\"el triple\", \"la mitad\"). El camino siempre es: perímetro → lado → relación → la otra figura."
    }
  },
};

export function getCasoResuelto(tema, capa) {
  const caso = CASOS_RESUELTOS[tema];
  if (!caso) return null;

  if (capa <= 2 && caso.capa_1_2) return caso.capa_1_2;
  if (capa === 3 && caso.capa_3) return caso.capa_3;
  if (capa >= 4 && caso.capa_4_5) return caso.capa_4_5;

  return caso.capa_1_2 || caso.capa_3 || caso.capa_4_5 || null;
}

export function getMetodoPasoAPaso() {
  return METODO_PASO_A_PASO;
}
