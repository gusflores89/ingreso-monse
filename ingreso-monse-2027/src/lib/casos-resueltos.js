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
      titulo: "Caso resuelto: Comparar fracciones",
      problema: `Juan comio 2/3 de su pizza.
Maria comio 3/4 de su pizza.
Las pizzas son del mismo tamano. Quien comio mas?`,
      resolucion: [
        { paso: "🔍 Que me piden", contenido: "Comparar 2/3 con 3/4." },
        { paso: "📋 Que datos tengo", contenido: "Juan: 2/3\nMaria: 3/4" },
        { paso: "🧮 Busco denominador comun", contenido: "2/3 = 8/12\n3/4 = 9/12" },
        { paso: "🧮 Comparo", contenido: "9/12 es mayor que 8/12. Maria comio mas." },
        { paso: "✅ Tiene sentido", contenido: "3/4 es casi toda la pizza. 2/3 es un poco menos." },
        { paso: "📝 Respuesta", contenido: "Maria comio mas." },
      ],
      tip: "Para comparar fracciones distintas, llevalas a un mismo denominador.",
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

  secuencias_numericas: {
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

  secuencias_aritmeticas: null,
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
