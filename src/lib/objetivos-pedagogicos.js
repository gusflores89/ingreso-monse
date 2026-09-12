import { getUnidadBase, VERSION_BASES } from "./contenido-bases.js";
/**
 * Motor pedagógico de micro-objetivos para el Ingreso al Monserrat 2027.
 * Desacopla la equivalencia "1 tema = 1 lección", registrando estados de aprendizaje:
 * - no_iniciada
 * - explicada
 * - practica_guiada
 * - practica_independiente
 * - consolidada
 *
 * Basado en los cuadernillos oficiales:
 * - Cuadernillo de Nivelación: Matemática (Colegio Nacional de Monserrat)
 * - Cuadernillo de Nivelación: Lengua Castellana (Colegio Nacional de Monserrat)
 */

export const ESTADOS_OBJETIVO = {
  NO_INICIADA: "no_iniciada",
  EXPLICADA: "explicada",
  PRACTICA_GUIADA: "practica_guiada",
  PRACTICA_INDEPENDIENTE: "practica_independiente",
  CONSOLIDADA: "consolidada",
};

export const OBJETIVOS_POR_TEMA = {
  // ═══════════════════════════════════════════════════════════════════
  // MATEMÁTICA (26 temas)
  // ═══════════════════════════════════════════════════════════════════

  // 1. Numeración y sistema decimal
  numeros_naturales_sistema_decimal: [
    {
      id: "num_1_agrupamiento_diez",
      titulo: "Agrupamiento de a diez y decenas",
      fuente: "Cuadernillo Monserrat Matemática, págs. 6-20",
      bases: "Conteo y noción de cantidad",
      secuencia: "Formar grupos de 10 unidades, registrar como decenas, comprender el canje posicional.",
      evidencia_propuesta: "Agrupar una cantidad de objetos en decenas y unidades sin contar uno por uno.",
      pista: "Recordá que cada grupo de 10 unidades forma exactamente una decena.",
      error_esperado: "Tratar el dígito de las decenas como unidades sueltas.",
    },
    {
      id: "num_2_valor_posicional",
      titulo: "Centenas y valor posicional",
      fuente: "Cuadernillo Monserrat Matemática, págs. 20-21",
      bases: "Decenas y unidades",
      secuencia: "Identificar centenas, decenas y unidades; descomposición aditiva según la posición.",
      evidencia_propuesta: "Descomponer 342 como 300 + 40 + 2 y reconocer el valor de cada cifra según su posición.",
      pista: "La posición de la cifra indica cuánto vale: 3 en las centenas vale 300.",
      error_esperado: "Escribir 342 como 3 + 4 + 2 sin multiplicar por la potencia de 10.",
    },
    {
      id: "num_3_cero_intermedio",
      titulo: "Ceros intermedios y columnas vacías",
      fuente: "Cuadernillo Monserrat Matemática, pág. 21",
      bases: "Valor posicional de 3 cifras",
      secuencia: "Armar y leer números con ceros en decenas o centenas (ej: 304, 5004).",
      evidencia_propuesta: "Representar 304 con centenas, decenas y unidades y explicar el valor de la columna del cero.",
      pista: "Si no hay decenas sueltas, colocamos un 0 para conservar el lugar de la posición.",
      error_esperado: "Omitir el cero y escribir '34' en vez de '304'.",
    },
    {
      id: "num_4_comparacion_recta",
      titulo: "Comparación, orden y recta numérica",
      fuente: "Cuadernillo Monserrat Matemática, pág. 24",
      bases: "Descomposición y lectura de números",
      secuencia: "Ubicar números en escala; ordenar de menor a mayor comparando desde la cifra de mayor valor.",
      evidencia_propuesta: "Ubicar 280 y 310 en una recta entre 200 y 400 y justificar su posición.",
      pista: "Mirá primero la cifra que está más a la izquierda (las centenas).",
      error_esperado: "Comparar solo las últimas cifras sin fijarse en las centenas.",
    },
  ],

  // 2. Multiplicación y tablas 2 a 5
  tablas_multiplicar_2_5: [
    {
      id: "tab_2_5_1_grupos_iguales",
      titulo: "Grupos iguales y suma repetida",
      fuente: "Cuadernillo Monserrat Matemática, pág. 34",
      bases: "Conteo y suma básica",
      secuencia: "Reconocer arreglos rectangulares y grupos iguales; escribir como suma y como producto.",
      evidencia_propuesta: "Representar 3 grupos de 4 y escribir 4 + 4 + 4 = 3 × 4 = 12 sin requerir velocidad.",
      pista: "Pensá en platos con alfajores: ¿cuántos platos hay y cuántos alfajores tiene cada uno?",
      error_esperado: "Sumar los dos números en vez de repetir la cantidad.",
    },
    {
      id: "tab_2_5_2_propiedad_conmutativa",
      titulo: "Propiedad conmutativa y dobles",
      fuente: "Cuadernillo Monserrat Matemática, pág. 34",
      bases: "Grupos iguales",
      secuencia: "Comprender que 3 × 4 = 4 × 3; relacionar la tabla del 4 con el doble de la del 2.",
      evidencia_propuesta: "Demostrar que 4 × 5 da el mismo total que 5 × 4 usando una grilla o bandeja.",
      pista: "Girar una bandeja no cambia la cantidad total: 4 filas de 5 es lo mismo que 5 filas de 4.",
      error_esperado: "Creer que cambiar el orden de los factores altera el resultado.",
    },
    {
      id: "tab_2_5_3_patrones_tabla_5",
      titulo: "Patrón de la tabla del 5 y del 2",
      fuente: "Cuadernillo Monserrat Matemática, pág. 35",
      bases: "Conmutatividad",
      secuencia: "Observar terminación en 0 o 5 para la tabla del 5; terminación par para la del 2.",
      evidencia_propuesta: "Identificar si un número puede ser resultado de la tabla del 5 observando su última cifra.",
      pista: "Todos los múltiplos de 5 terminan en 0 o en 5.",
      error_esperado: "Elegir un número impar terminado en 3 como múltiplo de 5.",
    },
  ],

  // 3. Tablas 6 a 8
  tablas_multiplicar_6_8: [
    {
      id: "tab_6_8_1_descomposicion_dobles",
      titulo: "Tablas del 6 y del 8 mediante dobles",
      fuente: "Cuadernillo Monserrat Matemática, pág. 35",
      bases: "Tablas del 2, 3 y 4",
      secuencia: "Calcular la tabla del 6 como el doble de la del 3, y la del 8 como el doble de la del 4.",
      evidencia_propuesta: "Obtener 8 × 6 calculando primero 4 × 6 = 24 y luego su doble 48.",
      pista: "Multiplicar por 8 es multiplicar por 4 y luego duplicar el resultado.",
      error_esperado: "Intentar memorizar de memoria sin apoyarse en tablas conocidas.",
    },
    {
      id: "tab_6_8_2_tabla_7_descomposicion",
      titulo: "Tabla del 7 por descomposición aditiva",
      fuente: "Cuadernillo Monserrat Matemática, pág. 35",
      bases: "Tablas del 5 y del 2",
      secuencia: "Descomponer el factor 7 en 5 + 2 para resolver productos: 7 × n = (5 × n) + (2 × n).",
      evidencia_propuesta: "Calcular 7 × 6 haciendo (5 × 6) + (2 × 6) = 30 + 12 = 42.",
      pista: "Pensá al 7 como 5 + 2: calculá la tabla del 5 y sumale la tabla del 2.",
      error_esperado: "Confundir 7 × 6 con 7 × 7.",
    },
  ],

  // 4. Tablas 9 y 10
  tablas_multiplicar_9_10: [
    {
      id: "tab_9_10_1_multiplicar_por_10",
      titulo: "Multiplicación por 10 y unidad seguida de ceros",
      fuente: "Cuadernillo Monserrat Matemática, págs. 31, 35",
      bases: "Valor posicional",
      secuencia: "Multiplicar por 10 agregando un cero a la derecha por desplazamiento de orden.",
      evidencia_propuesta: "Calcular 10 × 7 = 70 y explicar por qué cada unidad se convierte en decena.",
      pista: "Al multiplicar por 10, cada cifra se mueve una posición hacia la izquierda y se agrega un cero.",
      error_esperado: "Sumar 10 en vez de multiplicar.",
    },
    {
      id: "tab_9_10_2_estrategia_tabla_9",
      titulo: "Estrategia de la tabla del 9: diez veces menos una",
      fuente: "Cuadernillo Monserrat Matemática, pág. 35",
      bases: "Multiplicación por 10 y resta",
      secuencia: "Calcular 9 × n como (10 × n) − n; observar que las cifras del resultado suman 9.",
      evidencia_propuesta: "Calcular 9 × 6 haciendo (10 × 6) − 6 = 60 − 6 = 54 y verificar que 5 + 4 = 9.",
      pista: "Nueve veces algo es diez veces esa cantidad menos una vez esa cantidad.",
      error_esperado: "Restar 1 al producto en vez del factor (hacer 60 − 1 = 59).",
    },
  ],

  // 5. Números romanos
  numeros_romanos: [
    {
      id: "rom_1_simbolos_principales",
      titulo: "Símbolos fundamentales y regla de repetición",
      fuente: "Cuadernillo Monserrat Matemática, págs. 22-23",
      bases: "Conteo y comparación numérica",
      secuencia: "Reconocer I (1), V (5), X (10), L (50), C (100), D (500), M (1000). I, X, C, M se repiten hasta 3 veces.",
      evidencia_propuesta: "Escribir 3 (III), 30 (XXX) y explicar por qué V, L, D no se pueden repetir.",
      pista: "Los símbolos I, X, C y M se pueden repetir hasta tres veces seguidas. V, L y D nunca se repiten.",
      error_esperado: "Escribir 4 como IIII o 10 como VV.",
    },
    {
      id: "rom_2_reglas_aditiva_sustractiva",
      titulo: "Regla aditiva y sustractiva de formación",
      fuente: "Cuadernillo Monserrat Matemática, págs. 22-23",
      bases: "Símbolos fundamentales romanos",
      secuencia: "Letras menores a la derecha suman (VI = 6, XV = 15); letras menores a la izquierda restan (IV = 4, IX = 9, XL = 40).",
      evidencia_propuesta: "Comparar e interpretar correctamente XIV (14) y XVI (16) explicando la diferencia.",
      pista: "Si la letra menor está a la derecha, suma: V + I = 6. Si está a la izquierda, resta: V − I = 4.",
      error_esperado: "Sumar letras que están a la izquierda de una mayor (leer XIV como 16).",
    },
  ],

  // 6. División de 1 dígito
  division_1_digito: [
    {
      id: "div_1_reparto_equitativo",
      titulo: "Reparto equitativo y noción de cociente",
      fuente: "Cuadernillo Monserrat Matemática, pág. 36",
      bases: "Tablas de multiplicar 2 a 5",
      secuencia: "Distribuir elementos uno a uno en partes iguales; relacionar cociente con cuántas veces entra el divisor.",
      evidencia_propuesta: "Repartir 15 caramelos entre 3 amigos y explicar cuántos recibe cada uno usando 15 ÷ 3 = 5.",
      pista: "Preguntate: ¿qué número multiplicado por 3 da 15?",
      error_esperado: "Repartir en partes desiguales o confundir con una resta simple.",
    },
    {
      id: "div_2_resto_e_inexacta",
      titulo: "El resto y comprobación de la división",
      fuente: "Cuadernillo Monserrat Matemática, pág. 36",
      bases: "Reparto equitativo",
      secuencia: "Identificar dividendo, divisor, cociente y resto. Comprobar que Dividendo = divisor × cociente + resto.",
      evidencia_propuesta: "Resolver 17 ÷ 3 = cociente 5, resto 2, y verificar que 3 × 5 + 2 = 17.",
      pista: "El resto siempre debe ser estrictamente menor que el divisor.",
      error_esperado: "Dejar un resto igual o mayor que el divisor (ej. resto 4 al dividir por 3).",
    },
  ],

  // 7. Múltiplos, divisores, primos, MCM y MCD
  divisibilidad_primos_mcm_mcd: [
    {
      id: "div_primos_1_multiplos_divisores",
      titulo: "Significado de múltiplo y divisor",
      fuente: "Cuadernillo Monserrat Matemática, pág. 28",
      bases: "Multiplicación y división entera",
      secuencia: "Un múltiplo es el resultado de multiplicar por un natural. Un divisor divide exactamente con resto 0.",
      evidencia_propuesta: "Listar los primeros 5 múltiplos de 4 y todos los divisores de 12 justificando cada uno.",
      pista: "Los múltiplos crecen como saltos (4, 8, 12...). Los divisores parten al número exactamente sin que sobre nada.",
      error_esperado: "Confundir múltiplo con divisor (decir que 4 es múltiplo de 12 en vez de divisor).",
    },
    {
      id: "div_primos_2_criterios_divisibilidad",
      titulo: "Criterios de divisibilidad (2, 3, 5 y 10)",
      fuente: "Cuadernillo Monserrat Matemática, págs. 29-30",
      bases: "Múltiplos y divisores",
      secuencia: "Divisible por 2 si termina en par; por 5 si termina en 0 o 5; por 10 si termina en 0; por 3 si la suma de sus cifras es múltiplo de 3.",
      evidencia_propuesta: "Determinar si 135 es divisible por 3 y por 5 aplicando los criterios sin hacer la división larga.",
      pista: "Para el 3, sumá las cifras: 1 + 3 + 5 = 9. Como 9 está en la tabla del 3, 135 es divisible por 3.",
      error_esperado: "Mirar solo la última cifra para evaluar la divisibilidad por 3.",
    },
    {
      id: "div_primos_3_primos_compuestos",
      titulo: "Números primos y compuestos",
      fuente: "Cuadernillo Monserrat Matemática, pág. 30",
      bases: "Divisores de un número",
      secuencia: "Número primo: tiene exactamente dos divisores (el 1 y él mismo). Compuesto: tiene más de dos divisores. El 1 no es primo.",
      evidencia_propuesta: "Clasificar 7, 9 y 13 como primos o compuestos explicando cuántos divisores tiene cada uno.",
      pista: "Los primeros números primos son 2, 3, 5, 7, 11, 13, 17... ¡El 2 es el único número primo par!",
      error_esperado: "Creer que todos los números impares son primos (olvidar que 9 = 3 × 3).",
    },
    {
      id: "div_primos_4_mcm",
      titulo: "Mínimo Común Múltiplo (MCM) y problemas de coincidencia",
      fuente: "Cuadernillo Monserrat Matemática, págs. 31-32",
      bases: "Múltiplos de un número natural",
      secuencia: "El MCM es el menor múltiplo positivo común entre dos o más números. Se aplica para resolver problemas de eventos periódicos que vuelven a coincidir.",
      evidencia_propuesta: "Hallar el MCM(4, 6) = 12 listando múltiplos y resolver un problema de coincidencia de alarmas o colectivos.",
      pista: "Para el MCM, listá los múltiplos de cada número dando saltos hasta encontrar el primero que tienen en común.",
      error_esperado: "Elegir el 0 o un múltiplo común que no sea el menor (como 24 en lugar de 12).",
    },
    {
      id: "div_primos_5_mcd",
      titulo: "Máximo Común Divisor (MCD) y problemas de reparto máximo",
      fuente: "Cuadernillo Monserrat Matemática, págs. 32-33",
      bases: "Divisores de un número",
      secuencia: "El MCD es el mayor divisor común entre dos o más números. Se aplica para cortar, agrupar o repartir sin que sobre nada en porciones lo más grandes posible.",
      evidencia_propuesta: "Hallar el MCD(12, 18) = 6 listando todos los divisores de ambos y resolver un problema de reparto en partes iguales máximas.",
      pista: "Para el MCD, anotá todos los divisores de cada número y quedate con el más grande que se repita en ambas listas.",
      error_esperado: "Calcular el MCD multiplicando los números entre sí en vez de buscar el divisor compartido más grande.",
    },
  ],

  // 8. Concepto de fracción
  fracciones_concepto: [
    {
      id: "frac_con_1_partes_iguales",
      titulo: "El entero y las partes iguales",
      fuente: "Cuadernillo Monserrat Matemática, pág. 56",
      bases: "Reparto equitativo y noción de unidad",
      secuencia: "Partir una figura o conjunto en partes congruentes; reconocer cuándo son iguales.",
      evidencia_propuesta: "Identificar en dibujos cuáles figuras están divididas en partes iguales y cuáles no.",
      pista: "Para que sea una fracción válida, todas las partes deben tener exactamente el mismo tamaño.",
      error_esperado: "Contar partes de distinto tamaño como si fueran fracciones equivalentes.",
    },
    {
      id: "frac_con_2_num_den",
      titulo: "Numerador y denominador",
      fuente: "Cuadernillo Monserrat Matemática, pág. 57",
      bases: "Partes iguales",
      secuencia: "Significado del denominador (en cuántas partes se divide el entero) y del numerador (cuántas se toman).",
      evidencia_propuesta: "Representar 3/4 pintando 3 de 4 partes iguales y escribir la fracción correspondiente.",
      pista: "El de abajo (denominador) indica en cuánto se corta el entero; el de arriba (numerador) cuántas tomás.",
      error_esperado: "Invertir el numerador y el denominador (escribir 4/3 por 3/4).",
    },
    {
      id: "frac_con_3_unidad_referencia",
      titulo: "Unidad de referencia y conjunto discreto",
      fuente: "Cuadernillo Monserrat Matemática, pág. 57",
      bases: "Numerador y denominador",
      secuencia: "Fracción de una figura continua vs. fracción de una colección de objetos discretos.",
      evidencia_propuesta: "Calcular 1/2 de una pizza y 1/2 de una bolsa de 8 caramelos explicando la unidad en cada caso.",
      pista: "Preguntate cuál es el 'entero' total en cada problema antes de calcular la mitad.",
      error_esperado: "Creer que las fracciones solo se aplican a pizzas o círculos y no a cantidades de objetos.",
    },
    {
      id: "frac_con_4_equivalencias_visuales",
      titulo: "Fracciones equivalentes y comparación visual",
      fuente: "Cuadernillo Monserrat Matemática, págs. 58-61",
      bases: "Representación gráfica",
      secuencia: "Reconocer que 1/2 representa la misma porción de entero que 2/4 y 4/8 mediante amplificación o simplificación.",
      evidencia_propuesta: "Comprobar con un gráfico que 1/2 y 2/4 ocupan la misma superficie del entero.",
      pista: "Aunque esté cortado en más pedacitos, si tomás el doble de pedacitos la porción total es la misma.",
      error_esperado: "Pensar que 2/4 es mayor que 1/2 porque los números 2 y 4 son mayores.",
    },
  ],

  // 9. Operaciones con fracciones
  fracciones_operaciones: [
    {
      id: "frac_op_1_igual_denominador",
      titulo: "Suma y resta de igual denominador",
      fuente: "Cuadernillo Monserrat Matemática, pág. 62",
      bases: "Concepto de fracción y partes iguales",
      secuencia: "Sumar o restar únicamente los numeradores conservando el denominador común.",
      evidencia_propuesta: "Resolver 2/5 + 1/5 = 3/5 justificando con un gráfico de barras.",
      pista: "Como las porciones son del mismo tamaño (quintos), solo sumamos cuántas porciones tenemos.",
      error_esperado: "Sumar también los denominadores (escribir 2/5 + 1/5 = 3/10).",
    },
    {
      id: "frac_op_2_distinto_denominador",
      titulo: "Suma y resta con distinto denominador vía MCM",
      fuente: "Cuadernillo Monserrat Matemática, pág. 63",
      bases: "Fracciones equivalentes y MCM",
      secuencia: "Buscar un denominador común usando el MCM para igualar el tamaño de las porciones.",
      evidencia_propuesta: "Resolver 1/2 + 1/4 transformando 1/2 a 2/4 y obteniendo 3/4.",
      pista: "No podés sumar mitades con cuartos directamente: convertí la mitad a dos cuartos primero.",
      error_esperado: "Sumar numeradores y denominadores en línea recta: (1+1)/(2+4) = 2/6.",
    },
    {
      id: "frac_op_3_fraccion_cantidad",
      titulo: "Fracción de una cantidad entera",
      fuente: "Cuadernillo Monserrat Matemática, pág. 63",
      bases: "Multiplicación y división",
      secuencia: "Dividir la cantidad por el denominador y multiplicar por el numerador.",
      evidencia_propuesta: "Calcular 2/3 de 60 figuritas paso a paso: (60 ÷ 3) × 2 = 20 × 2 = 40.",
      pista: "Primero averiguá cuánto vale una parte (dividí por el de abajo) y luego multiplicalo por cuántas tomás.",
      error_esperado: "Multiplicar la cantidad por el denominador en vez de dividir.",
    },
    {
      id: "frac_op_4_multiplicacion",
      titulo: "Multiplicación de fracciones (producto directo)",
      fuente: "Cuadernillo Monserrat Matemática, pág. 64",
      bases: "Fracción de una cantidad y producto de naturales",
      secuencia: "Multiplicación en línea recta: el numerador por el numerador y el denominador por el denominador: (a/b) × (c/d) = (a×c)/(b×d). Simplificar el resultado si es posible.",
      evidencia_propuesta: "Resolver 2/3 × 3/4 = 6/12 = 1/2 simplificando el resultado.",
      pista: "Para multiplicar fracciones, vas derecho: multiplicás los numeradores entre sí y los denominadores entre sí.",
      error_esperado: "Buscar denominador común para multiplicar como si fuera una suma.",
    },
    {
      id: "frac_op_5_division",
      titulo: "División de fracciones (multiplicación por fracción inversa)",
      fuente: "Cuadernillo Monserrat Matemática, pág. 64",
      bases: "Multiplicación de fracciones",
      secuencia: "Dividir fracciones multiplicando por la fracción inversa: (a/b) ÷ (c/d) = (a/b) × (d/c) = (a×d)/(b×c).",
      evidencia_propuesta: "Resolver 3/4 ÷ 2/5 = (3 × 5) / (4 × 2) = 15/8.",
      pista: "Para dividir dos fracciones, dai vuelta la segunda fracción y multiplicalas derecho (o multiplicá cruzado: numerador del primero por denominador del segundo).",
      error_esperado: "Dividir directamente numeradores y denominadores entre sí o invertir la primera fracción en vez de la segunda.",
    },
  ],

  // 10. Fracciones del resto
  fracciones_del_resto: [
    {
      id: "frac_resto_1_identificar_sobrante",
      titulo: "Determinar la fracción sobrante del total",
      fuente: "Cuadernillo Monserrat Matemática, pág. 63",
      bases: "Resta de fracciones a la unidad",
      secuencia: "Si se gasta a/b del total, lo que queda es 1 − a/b = (b−a)/b.",
      evidencia_propuesta: "Si gasté 2/5 de mis ahorros, explicar con un esquema por qué me quedan 3/5.",
      pista: "El total completo siempre vale 1 entero (en este caso 5/5). Restale lo que ya gastaste.",
      error_esperado: "Creer que lo que queda se calcula sobre una cantidad fija en vez de la fracción complementaria.",
    },
    {
      id: "frac_resto_2_fraccion_del_resto",
      titulo: "Fracción tomada sobre el resto",
      fuente: "Cuadernillo Monserrat Matemática, pág. 63",
      bases: "Fracción de una cantidad y multiplicación",
      secuencia: "Calcular una fracción sobre la porción que quedó: f × (resto), distinguiéndola de la fracción del total.",
      evidencia_propuesta: "Distinguir entre gastar 1/2 del total y gastar 1/2 de lo que quedaba.",
      pista: "¡Leé con lupa! '1/2 del resto' no es la mitad de todo el dinero, sino la mitad de lo que te sobró.",
      error_esperado: "Sumar las fracciones directamente como si ambas fueran fracciones del total inicial.",
    },
  ],

  // 11. Decimales y conversiones
  decimales_conversion: [
    {
      id: "dec_conv_1_decimos_centesimos",
      titulo: "Décimos, centésimos y valor posicional decimal",
      fuente: "Cuadernillo Monserrat Matemática, págs. 65-66",
      bases: "Sistema decimal y fracciones decimales",
      secuencia: "La coma separa la parte entera de la decimal: décimos (1/10 = 0,1), centésimos (1/100 = 0,01).",
      evidencia_propuesta: "Escribir 3 enteros con 4 centésimos como 3,04 y explicar la función del cero.",
      pista: "El primer lugar después de la coma es para los décimos; el segundo lugar es para los centésimos.",
      error_esperado: "Escribir 3 enteros con 4 centésimos como 3,4 en vez de 3,04.",
    },
    {
      id: "dec_conv_2_conversion_fraccion_decimal",
      titulo: "Conversión entre fracción y número decimal",
      fuente: "Cuadernillo Monserrat Matemática, pág. 67",
      bases: "Décimos y centésimos",
      secuencia: "Convertir fracciones decimales a números decimales y viceversa; relacionar 1/2 = 0,5 y 1/4 = 0,25.",
      evidencia_propuesta: "Relacionar 0,25 con 25/100 y simplificar a 1/4.",
      pista: "Para pasar 25/100 a decimal, escribí 25 y corré la coma 2 lugares hacia la izquierda: 0,25.",
      error_esperado: "Creer que 1/4 equivale a 0,4.",
    },
    {
      id: "dec_conv_3_comparacion_decimales",
      titulo: "Comparación y orden de números decimales",
      fuente: "Cuadernillo Monserrat Matemática, pág. 67",
      bases: "Valor posicional decimal",
      secuencia: "Comparar primero partes enteras; luego décimos, centésimos. Igualar cifras con ceros para no engañarse.",
      evidencia_propuesta: "Comparar 0,3 con 0,25 demostrando que 0,30 es mayor que 0,25.",
      pista: "Agregá un cero para que los dos tengan la misma cantidad de números: 0,3 es lo mismo que 0,30.",
      error_esperado: "Pensar que 0,25 es mayor que 0,3 porque 25 es más grande que 3.",
    },
  ],

  // 12. Potencias y raíz cuadrada
  potenciacion_y_raiz_cuadrada: [
    {
      id: "pot_raiz_1_cuadrados_cubos",
      titulo: "Cuadrados y cubos de números naturales",
      fuente: "Cuadernillo Monserrat Matemática, pág. 37",
      bases: "Multiplicación de factores iguales",
      secuencia: "Potencia como producto repetido: base y exponente. Cuadrado (n² = n × n) y cubo (n³ = n × n × n).",
      evidencia_propuesta: "Distinguir 3² = 3 × 3 = 9 de 3 × 2 = 6 con una representación en grilla.",
      pista: "El número chiquito de arriba (exponente) te dice cuántas veces multiplicás la base por sí misma.",
      error_esperado: "Multiplicar la base por el exponente (hacer 5² = 10 en vez de 25).",
    },
    {
      id: "pot_raiz_2_raiz_cuadrada",
      titulo: "Raíz cuadrada exacta como operación inversa",
      fuente: "Cuadernillo Monserrat Matemática, pág. 38",
      bases: "Cuadrados de naturales",
      secuencia: "La raíz cuadrada busca qué número multiplicado por sí mismo da ese valor: raíz(a) = b si b² = a.",
      evidencia_propuesta: "Calcular raíz(49) = 7 justificando porque 7 × 7 = 49.",
      pista: "Preguntate: ¿qué número multiplicado por sí mismo da 49?",
      error_esperado: "Dividir por 2 (decir que la raíz de 16 es 8 en vez de 4).",
    },
  ],

  // 13. Operaciones combinadas (Jerarquía)
  jerarquia_operaciones: [
    {
      id: "jer_op_1_separar_en_terminos",
      titulo: "Separación en términos",
      fuente: "Cuadernillo Monserrat Matemática, pág. 40",
      bases: "Las cuatro operaciones básicas",
      secuencia: "Los signos + y − fuera de paréntesis separan los términos de la expresión.",
      evidencia_propuesta: "Marcar los arcos de separación en términos en 5 + 3 × 4 y resolver primero la multiplicación.",
      pista: "Los signos más (+) y menos (−) que están sueltos son como murallas que separan los términos.",
      error_esperado: "Resolver de izquierda a derecha sin respetar los términos (hacer 5 + 3 = 8 y 8 × 4 = 32).",
    },
    {
      id: "jer_op_2_prioridad_parentesis",
      titulo: "Prioridad con paréntesis y potencias",
      fuente: "Cuadernillo Monserrat Matemática, pág. 41",
      bases: "Separación en términos",
      secuencia: "Resolver primero lo que está entre paréntesis; luego potencias y raíces; luego multiplicaciones y divisiones; finalmente sumas y restas.",
      evidencia_propuesta: "Explicar la diferencia entre 2 + 3 × 4 = 14 y (2 + 3) × 4 = 20.",
      pista: "Los paréntesis tienen máxima prioridad: ¡se resuelven siempre primero!",
      error_esperado: "Ignorar los paréntesis y multiplicar solo el último número.",
    },
  ],

  // 14. Longitud (SI.ME.L.A.)
  si_me_la_longitud: [
    {
      id: "simela_long_1_metro_y_escalas",
      titulo: "El metro, múltiplos y submúltiplos",
      fuente: "Cuadernillo Monserrat Matemática, pág. 77",
      bases: "Sistema métrico y unidades de medida",
      secuencia: "Unidad principal: metro (m). Múltiplos: km, hm, dam. Submúltiplos: dm, cm, mm. Cada salto multiplica o divide por 10.",
      evidencia_propuesta: "Elegir la unidad adecuada (m, cm o km) para medir una puerta, una goma de borrar o una ruta.",
      pista: "Para pasar a una unidad más chica multiplicás por 10 en cada escalón. Para pasar a una más grande, dividís por 10.",
      error_esperado: "Usar factores distintos de 10 o confundir la dirección de la escala.",
    },
    {
      id: "simela_long_2_conversiones",
      titulo: "Conversiones de unidades de longitud",
      fuente: "Cuadernillo Monserrat Matemática, págs. 78-80",
      bases: "Multiplicación y división por potencias de 10",
      secuencia: "Pasar de m a cm (×100), de km a m (×1000), de mm a m (÷1000).",
      evidencia_propuesta: "Convertir 2,5 m a centímetros (250 cm) y 450 m a kilómetros (0,45 km) justificando el procedimiento.",
      pista: "De metros a centímetros hay 2 escalones hacia la derecha: multiplicás por 100.",
      error_esperado: "Olvidar ceros intermedios o correr la coma hacia el lado equivocado.",
    },
  ],

  // 15. Masa, capacidad y tiempo
  si_me_la_masa_capacidad_tiempo: [
    {
      id: "simela_mct_1_masa_capacidad",
      titulo: "Medidas de masa y capacidad decimales",
      fuente: "Cuadernillo Monserrat Matemática, págs. 81-82",
      bases: "SIMELA y prefijos kilo, mili",
      secuencia: "Gramo (g), kilogramo (1 kg = 1000 g); litro (l), mililitro (1 l = 1000 ml). Escalas en base 10.",
      evidencia_propuesta: "Resolver conversiones de masa (3,5 kg a gramos = 3500 g) y capacidad (750 ml a litros = 0,75 l).",
      pista: "El prefijo 'kilo' siempre significa 1000: 1 kilo son mil unidades.",
      error_esperado: "Usar 100 en vez de 1000 para el kilogramo o el litro.",
    },
    {
      id: "simela_mct_2_tiempo_sexagesimal",
      titulo: "Medidas de tiempo y sistema sexagesimal",
      fuente: "Cuadernillo Monserrat Matemática, págs. 83-85",
      bases: "Base 60 vs base 10",
      secuencia: "1 hora = 60 minutos; 1 minuto = 60 segundos; 1 día = 24 horas. ¡No es base decimal!",
      evidencia_propuesta: "Convertir 1 hora y media a minutos (90 min) y explicar por qué 1,5 horas no son 1 hora y 5 minutos.",
      pista: "¡Cuidado! El tiempo va de a 60, no de a 100. Media hora son 30 minutos.",
      error_esperado: "Tratar el tiempo como decimal (creer que 1 h 30 min son 1,3 h o que 100 minutos es 1 hora).",
    },
  ],

  // 16. Ángulos
  geometria_angulos: [
    {
      id: "geom_ang_1_clasificacion",
      titulo: "Clasificación de ángulos por su apertura",
      fuente: "Cuadernillo Monserrat Matemática, págs. 99-100",
      bases: "Punto, semirrecta y giro",
      secuencia: "Ángulo recto (= 90°), agudo (< 90°), obtuso (> 90° y < 180°), llano (= 180°).",
      evidencia_propuesta: "Identificar y clasificar ángulos en figuras o con transportador reconociendo la escuadra como referencia de 90°.",
      pista: "Usa la esquina de una hoja de papel: si es más cerrado es agudo; si es más abierto es obtuso.",
      error_esperado: "Confundir ángulo obtuso con agudo por mirar la orientación y no la apertura.",
    },
    {
      id: "geom_ang_2_complemento_suplemento",
      titulo: "Ángulos complementarios y suplementarios",
      fuente: "Cuadernillo Monserrat Matemática, págs. 101-102",
      bases: "Ángulo recto y llano",
      secuencia: "Complementarios: suman exactamente 90°. Suplementarios: suman exactamente 180°. Opuestos por el vértice: son iguales.",
      evidencia_propuesta: "Calcular el complemento de un ángulo de 35° (90° − 35° = 55°) y su suplemento (180° − 35° = 145°).",
      pista: "Complementarios forman una esquina recta (90°). Suplementarios forman una línea recta continua (180°).",
      error_esperado: "Invertir las definiciones: restar de 180° para buscar el complemento.",
    },
  ],

  // 17. Triángulos
  geometria_triangulos: [
    {
      id: "geom_tri_1_clasificacion_doble",
      titulo: "Clasificación de triángulos por lados y ángulos",
      fuente: "Cuadernillo Monserrat Matemática, pág. 103",
      bases: "Segmentos y tipos de ángulos",
      secuencia: "Por lados: equilátero (3 iguales), isósceles (2 iguales), escaleno (3 distintos). Por ángulos: acutángulo, rectángulo, obtusángulo.",
      evidencia_propuesta: "Clasificar un triángulo dado según ambos criterios (ej: triángulo rectángulo isósceles).",
      pista: "Un triángulo siempre tiene dos nombres: uno por cómo son sus lados y otro por cómo son sus ángulos.",
      error_esperado: "Pensar que un triángulo no puede ser a la vez isósceles y rectángulo.",
    },
    {
      id: "geom_tri_2_suma_angulos_interiores",
      titulo: "Suma de los ángulos interiores del triángulo",
      fuente: "Cuadernillo Monserrat Matemática, pág. 103",
      bases: "Ángulo llano y triángulos",
      secuencia: "En todo triángulo, la suma de sus tres ángulos interiores siempre es exactamente 180°.",
      evidencia_propuesta: "Hallar el ángulo desconocido de un triángulo si dos de ellos miden 50° y 60°: 180° − (50° + 60°) = 70°.",
      pista: "No importa la forma del triángulo: sus tres esquinas juntas siempre forman un ángulo llano de 180°.",
      error_esperado: "Restar de 360° o de 90° en vez de 180°.",
    },
  ],

  // 18. Cuadriláteros y circunferencia
  geometria_cuadrilateros_circunferencia: [
    {
      id: "geom_cuad_1_paralelogramos_trapecios",
      titulo: "Familias de cuadriláteros y propiedades",
      fuente: "Cuadernillo Monserrat Matemática, págs. 104-106",
      bases: "Lados paralelos y perpendiculares",
      secuencia: "Paralelogramos (2 pares de lados paralelos: cuadrado, rectángulo, rombo, romboide); trapecios (1 par paralelo); trapezoides (ninguno).",
      evidencia_propuesta: "Distinguir las propiedades de un rombo (4 lados iguales) de las de un rectángulo (4 ángulos rectos).",
      pista: "Mirá los lados opuestos: si son paralelos de a dos, es un paralelogramo.",
      error_esperado: "Creer que todo cuadrilátero es un cuadrado o un rectángulo.",
    },
    {
      id: "geom_cuad_2_circunferencia_circulo",
      titulo: "Elementos de la circunferencia: radio y diámetro",
      fuente: "Cuadernillo Monserrat Matemática, págs. 107-109",
      bases: "Segmentos y centro",
      secuencia: "Circunferencia es el borde exterior; círculo es la superficie interior. Radio: del centro al borde. Diámetro: cuerda que pasa por el centro (D = 2r).",
      evidencia_propuesta: "Calcular el diámetro si el radio es 6 cm (D = 12 cm) y explicar la relación entre ambos.",
      pista: "El diámetro cruza de lado a lado pasando por el medio: mide exactamente el doble que el radio.",
      error_esperado: "Confundir radio con diámetro dividiendo cuando había que multiplicar.",
    },
  ],

  // 19. Perímetros simples
  perimetros_simples: [
    {
      id: "per_simp_1_concepto_contorno",
      titulo: "Concepto de perímetro como longitud del contorno",
      fuente: "Cuadernillo Monserrat Matemática, págs. 103, 106",
      bases: "Medidas de longitud y polígonos",
      secuencia: "El perímetro es la suma de las longitudes de todos los lados que delimitan una figura.",
      evidencia_propuesta: "Calcular el perímetro de un triángulo de lados 5 cm, 7 cm y 9 cm sumando 5 + 7 + 9 = 21 cm.",
      pista: "Imaginá que caminás todo alrededor de la figura: la distancia total que recorriste es el perímetro.",
      error_esperado: "Confundir perímetro con área multiplicando base por altura.",
    },
    {
      id: "per_simp_2_formulas_abreviadas",
      titulo: "Fórmulas abreviadas de perímetro (cuadrado y rectángulo)",
      fuente: "Cuadernillo Monserrat Matemática, pág. 106",
      bases: "Perímetro simple y multiplicación",
      secuencia: "Cuadrado: P = 4 × l. Rectángulo: P = 2 × b + 2 × h.",
      evidencia_propuesta: "Calcular el perímetro de un rectángulo de base 8 cm y altura 3 cm usando 2 × (8 + 3) = 22 cm.",
      pista: "En un rectángulo tenés dos lados de base y dos lados de altura. ¡Asegurate de sumar los 4 lados!",
      error_esperado: "Sumar solo dos lados (8 + 3 = 11) olvidando los otros dos lados opuestos.",
    },
  ],

  // 20. Perímetros compuestos
  perimetros_compuestos: [
    {
      id: "per_comp_1_deduccion_lados_faltantes",
      titulo: "Deducción de lados no acotados en figuras en L o escalonadas",
      fuente: "Cuadernillo Monserrat Matemática, pág. 110",
      bases: "Propiedades de rectángulos y suma de segmentos",
      secuencia: "En figuras ortogonales, los segmentos horizontales parciales suman el ancho total; los verticales suman la altura total.",
      evidencia_propuesta: "Encontrar la longitud de un lado faltante restando las dimensiones parciales visibles.",
      pista: "Si el ancho total es 10 cm y un escalón mide 4 cm, el tramo restante mide 10 − 4 = 6 cm.",
      error_esperado: "Inventar medidas arbitrarias en lugar de deducirlas de los lados opuestos paralelos.",
    },
    {
      id: "per_comp_2_contorno_exterior_excluir_internos",
      titulo: "Perímetro exterior estricto sin líneas internas",
      fuente: "Cuadernillo Monserrat Matemática, págs. 111-114",
      bases: "Deducción de lados",
      secuencia: "Al unir dos o más figuras, las aristas que quedan dentro de la figura NO se suman al perímetro.",
      evidencia_propuesta: "Calcular el perímetro total de una figura compuesta por un cuadrado y un triángulo adosado, excluyendo el lado compartido.",
      pista: "¡El perímetro es solo la cerca de afuera! Las paredes interiores que quedan adentro no se suman.",
      error_esperado: "Sumar los perímetros de las figuras por separado sin restar las uniones internas.",
    },
  ],

  // 21. Lectura de gráficos estadísticos
  graficos_estadisticos: [
    {
      id: "graf_est_1_lectura_ejes_barras",
      titulo: "Lectura de ejes y frecuencias en gráficos de barras",
      fuente: "Cuadernillo Monserrat Matemática, pág. 27",
      bases: "Conteo y tablas de datos",
      secuencia: "Identificar categorías en el eje horizontal y escala de valores en el eje vertical.",
      evidencia_propuesta: "Leer la altura de una barra y decir cuántos elementos corresponden a esa categoría.",
      pista: "Fijate en la escala del eje vertical: mirá si va de 1 en 1, de 2 en 2 o de 10 en 10.",
      error_esperado: "No prestar atención a la escala del eje y contar cuadraditos como unidades de a uno.",
    },
    {
      id: "graf_est_2_comparacion_totales",
      titulo: "Comparación de categorías y cálculo del total",
      fuente: "Cuadernillo Monserrat Matemática, pág. 27",
      bases: "Lectura de frecuencias",
      secuencia: "Determinar cuál categoría tiene más o menos elementos; calcular la diferencia o la suma total de encuestados.",
      evidencia_propuesta: "Calcular la diferencia de votos entre dos categorías y sumar el total de participantes.",
      pista: "Para saber cuántos más eligieron la opción A que la B, restá las dos cantidades.",
      error_esperado: "Sumar las categorías cuando la consigna pide la diferencia.",
    },
  ],

  // 22. Proporcionalidad y regla de 3
  proporcionalidad_regla_3: [
    {
      id: "prop_1_tablas_valor_unitario",
      titulo: "Tablas de proporcionalidad directa y valor unitario",
      fuente: "Cuadernillo Monserrat Matemática, pág. 68",
      bases: "Multiplicación y división",
      secuencia: "Al doble le corresponde el doble; al triple, el triple. El valor unitario es el cociente constante entre ambas magnitudes.",
      evidencia_propuesta: "Si 3 cuadernos cuestan $600, averiguar cuánto cuesta 1 cuaderno ($200) y calcular el precio de 5 cuadernos ($1000).",
      pista: "Primero averiguá cuánto vale 1 solo elemento (dividí el precio por la cantidad).",
      error_esperado: "Sumar una cantidad fija a ambas variables en vez de multiplicar.",
    },
    {
      id: "prop_2_regla_tres_simple",
      titulo: "Planteo y resolución de regla de tres simple directa",
      fuente: "Cuadernillo Monserrat Matemática, págs. 69-70",
      bases: "Valor unitario y razones",
      secuencia: "Organizar los datos en columnas alineadas con la misma unidad: si a -> b, entonces c -> (c × b) / a.",
      evidencia_propuesta: "Resolver un problema de velocidad constante o recetas calculando la incógnita mediante proporciones.",
      pista: "Multiplicá cruzado y dividí por el número que quedó solo.",
      error_esperado: "Mezclar magnitudes distintas en la misma columna del planteo.",
    },
  ],

  // 23. Secuencias aritméticas
  secuencias_aritmeticas: [
    {
      id: "sec_arit_1_patron_aditivo",
      titulo: "Identificación de la constante aditiva de la serie",
      fuente: "Cuadernillo Monserrat Matemática, pág. 26",
      bases: "Suma, resta y comparación",
      secuencia: "Hallar la diferencia constante entre términos consecutivos. Reconocer series crecientes o decrecientes.",
      evidencia_propuesta: "Dada la serie 4, 11, 18, 25... identificar que la regla es sumar 7 en cada paso.",
      pista: "Restá dos números vecinos para descubrir de cuánto en cuánto va la serie.",
      error_esperado: "Mirar solo el primer par de números sin comprobar si la regla se cumple en toda la serie.",
    },
    {
      id: "sec_arit_2_termino_faltante",
      titulo: "Cálculo de términos siguientes o faltantes",
      fuente: "Cuadernillo Monserrat Matemática, pág. 26",
      bases: "Constante aditiva",
      secuencia: "Aplicar la regla aditiva para predecir el número que continúa o llenar un espacio en blanco intermedio.",
      evidencia_propuesta: "Completar los términos faltantes en la serie 42, 38, __, 30, __ aplicando la resta regular de 4.",
      pista: "Si la serie va bajando, restá la diferencia al número anterior para encontrar el que falta.",
      error_esperado: "Sumar cuando la serie va descendiendo.",
    },
  ],

  // 24. Secuencias geométricas y Fibonacci
  secuencias_geometricas_fibonacci: [
    {
      id: "sec_geom_1_patron_multiplicativo",
      titulo: "Secuencias geométricas con razón multiplicativa",
      fuente: "Cuadernillo Monserrat Matemática, pág. 26",
      bases: "Multiplicación básica",
      secuencia: "Cada término se obtiene multiplicando el anterior por una razón fija: ×2, ×3, etc.",
      evidencia_propuesta: "Identificar que la serie 3, 6, 12, 24, 48... multiplica por 2 en cada paso y calcular el término siguiente (96).",
      pista: "Fijate si los números crecen muy rápido: dividí un número por el anterior para ver si se multiplica siempre por lo mismo.",
      error_esperado: "Tratar de resolverla como una serie aritmética sumando una cantidad fija.",
    },
    {
      id: "sec_geom_2_serie_fibonacci",
      titulo: "Serie de Fibonacci: suma de los dos términos anteriores",
      fuente: "Cuadernillo Monserrat Matemática, pág. 26",
      bases: "Suma de términos",
      secuencia: "Cada término se obtiene sumando los dos términos inmediatamente anteriores: 1, 1, 2, 3, 5, 8, 13...",
      evidencia_propuesta: "Explicar por qué en 1, 2, 3, 5, 8 el siguiente número es 13 (5 + 8 = 13).",
      pista: "Cada nuevo número es la suma de sus dos amigos anteriores juntos.",
      error_esperado: "Buscar un patrón de multiplicación o una suma constante entre cada par.",
    },
  ],

  // 25. Secuencias con letras y figuras
  secuencias_alfanumericas_y_figuras: [
    {
      id: "sec_alfa_1_letras_numeros_intercalados",
      titulo: "Secuencias alfanuméricas con patrones intercalados",
      fuente: "Cuadernillo Monserrat Matemática, pág. 26",
      bases: "Abecedario y series numéricas",
      secuencia: "Separar la secuencia en dos vías independientes: la de las letras (avanzando según el abecedario) y la de los números.",
      evidencia_propuesta: "Completar A, 2, C, 4, E, 6, __, __ identificando la alternancia entre letras impares y números pares.",
      pista: "Mirá las letras por un lado (A, C, E...) y los números por el otro (2, 4, 6...).",
      error_esperado: "Intentar relacionar la letra directamente con el número que tiene al lado.",
    },
    {
      id: "sec_alfa_2_patrones_rotacion_figuras",
      titulo: "Patrones visuales y rotación de figuras geométricas",
      fuente: "Cuadernillo Monserrat Matemática, pág. 27",
      bases: "Orientación espacial y ángulos",
      secuencia: "Identificar giros de 90° o 180° en sentido horario o antihorario, cambios de color o cantidad de elementos.",
      evidencia_propuesta: "Predecir la orientación de una flecha o figura tras un giro de 90° en una secuencia visual.",
      pista: "Seguí la punta de la figura como si fuera la aguja de un reloj.",
      error_esperado: "Confundir giro a la derecha (horario) con giro a la izquierda (antihorario).",
    },
  ],

  // 26. Ecuaciones con imágenes
  ecuaciones_con_imagenes_2_incognitas: [
    {
      id: "ec_img_1_sustitucion_simple",
      titulo: "Valor de un elemento por suma de objetos iguales",
      fuente: "Cuadernillo Monserrat Matemática, pág. 40",
      bases: "División y multiplicación",
      secuencia: "Si 3 manzanas iguales suman 18, cada manzana vale 18 ÷ 3 = 6.",
      evidencia_propuesta: "Calcular el valor de un símbolo individual a partir de una igualdad con elementos repetidos.",
      pista: "Si todas las figuras son idénticas, dividí el resultado total por la cantidad de figuras que hay.",
      error_esperado: "Asignar valores distintos a figuras que son exactamente iguales.",
    },
    {
      id: "ec_img_2_dos_incognitas_sustitucion",
      titulo: "Reemplazo de una incógnita en la segunda igualdad",
      fuente: "Cuadernillo Monserrat Matemática, págs. 40, 71",
      bases: "Sustitución simple y despeje",
      secuencia: "Sustituir el valor conocido en la segunda igualdad para despejar la incógnita restante y comprobar en ambas relaciones.",
      evidencia_propuesta: "Si manzana = 6 y manzana + banana = 10, hallar que banana = 4 y comprobar la última cuenta.",
      pista: "Reemplazá el dibujo que ya conocés por su número y restá para descubrir el dibujo nuevo.",
      error_esperado: "Olvidar respetar la prioridad de operaciones si la última cuenta tiene una multiplicación.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // LENGUA (14 temas)
  // ═══════════════════════════════════════════════════════════════════

  // 1. Ortografía B y V
  ortografia_b_v: [
    {
      id: "ort_bv_1_mb_nv",
      titulo: "Regla fija: M antes de B y N antes de V",
      fuente: "Cuadernillo Monserrat Lengua, pág. 8",
      bases: "Segmentación de palabras y lectura",
      secuencia: "Siempre se escribe M antes de B (tambor, sombra, cambio); siempre se escribe N antes de V (invierno, enviar, conversar).",
      evidencia_propuesta: "Completar palabras con mb o nv justificando la elección fonética y ortográfica.",
      pista: "La M es amiga de la B (mb); la N es amiga de la V (nv). ¡Nunca se mezclan!",
      error_esperado: "Escribir 'inbierno' o 'tamvor'.",
    },
    {
      id: "ort_bv_2_prefijos_bu_bur_bus",
      titulo: "Comienzos bu-, bur- y bus-",
      fuente: "Cuadernillo Monserrat Lengua, pág. 8",
      bases: "Segmentación silábica y lectura",
      secuencia: "Identificar las sílabas iniciales bu-, bur-, bus- con B (bueno, burla, buscar, burbuja), excepto palabras de origen extranjero como vudú.",
      evidencia_propuesta: "Completar palabras como _ueno, _urla, _uscar aplicando la regla y reconociendo excepciones como vudú.",
      pista: "Las palabras que empiezan con bu-, bur- y bus- van con B (como bueno, burla o buscar), salvo excepciones como vudú.",
      error_esperado: "Escribir 'vuscar' o 'vurla'.",
    },
    {
      id: "ort_bv_3_pasado_aba",
      titulo: "Pretérito imperfecto en -aba y verbo ir (iba)",
      fuente: "Cuadernillo Monserrat Lengua, pág. 8",
      bases: "Tiempos verbales del indicativo y 1ª conjugación (-ar)",
      secuencia: "En el pretérito imperfecto del indicativo, los verbos terminados en -ar llevan terminaciones con b: -aba, -abas, -ábamos, -abais, -aban (cantaba, jugábamos). El verbo ir en imperfecto también se escribe con b (iba, ibas, íbamos, iban). Contrastar con el pretérito perfecto simple, que NO lleva b (canté, cantó, cantaron).",
      evidencia_propuesta: "Transformar 'yo juego' a pretérito imperfecto ('yo jugaba') y 'nosotros cantamos' a 'cantábamos' (con b y tilde), distinguiéndolo de 'canté' o 'cantaron'.",
      pista: "En pretérito imperfecto, los verbos en -ar terminan en -aba, -abas, -ábamos (cantaba, jugábamos) y el verbo ir hace iba. ¡Atención! El pretérito perfecto simple no lleva b: canté, cantaron.",
      error_esperado: "Escribir 'jugava' o 'cantavamos', o confundir con el pretérito perfecto simple creyendo que 'canté' lleva b.",
    },
    {
      id: "ort_bv_4_adjetivos_v",
      titulo: "Adjetivos en -ave, -eva, -ivo y pretérito perfecto simple de andar, tener, estar",
      fuente: "Cuadernillo Monserrat Lengua, pág. 9",
      bases: "Clases de palabras (adjetivos y verbos)",
      secuencia: "Escribir con v los adjetivos terminados en -ave, -avo, -eva, -eve, -evo, -ivo, -iva (suave, nuevo, reflexivo). Escribir con v las formas irregulares del pretérito perfecto simple de andar, tener y estar: anduve, tuve, estuve. Contrastar con el pretérito imperfecto, que no lleva v (tenía, estaba).",
      evidencia_propuesta: "Escribir suave, nuevo, creativo, y usar correctamente tuve, estuve, anduve, distinguiéndolos de tenía o estaba.",
      pista: "Llevan V las formas del pretérito perfecto simple: tuve, tuviste, tuvo, tuvimos, tuvieron / estuve, estuvo / anduve. ¡Ojo! El imperfecto no lleva v: tenía, estaba.",
      error_esperado: "Escribir 'tube' o 'estube' con b, o creer que 'tenía' o 'estaba' llevan v.",
    },
  ],

  // 2. Ortografía G, J, GU y GÜ
  ortografia_g_j_gu_gu: [
    {
      id: "ort_gj_1_ga_go_gu_gue_gui",
      titulo: "Sonidos suaves y uso de la U muda (gue, gui)",
      fuente: "Cuadernillo Monserrat Lengua, pág. 11",
      bases: "Vocales y sonido suave/fuerte de la G",
      secuencia: "La G suena suave delante de a, o, u (gato, gota, gusano). Delante de e, i necesita una u muda para sonar suave (guerra, guitarra).",
      evidencia_propuesta: "Distinguir entre ge/gi (sonido fuerte como j) y gue/gui (sonido suave con u muda) en palabras como gigante y guitarra.",
      pista: "Si querés que la G suene suave como en gato antes de la E o la I, tenés que ponerle una U en el medio: gue, gui.",
      error_esperado: "Escribir 'gerra' o 'gitarra' omitiendo la u intermedia.",
    },
    {
      id: "ort_gj_2_dieresis_gue_gui",
      titulo: "Uso de la diéresis en güe y güi",
      fuente: "Cuadernillo Monserrat Lengua, pág. 11",
      bases: "Uso de gue y gui",
      secuencia: "Cuando en las sílabas gue y gui queremos que la u sí se pronuncie, le colocamos dos puntitos arriba llamados diéresis: pingüino, cigüeña, paragüero.",
      evidencia_propuesta: "Colocar diéresis en palabras que la requieran distinguiéndolas de aquellas con u muda (pinguino vs águila).",
      pista: "Si la U suena al pronunciar la palabra, como en pingüino o cigüeña, ¡ponele los dos ojitos de la diéresis!",
      error_esperado: "Omitir la diéresis escribiendo 'pinguino' o poner diéresis donde no suena la u (como en 'áqüila').",
    },
    {
      id: "ort_gj_3_terminaciones_ger_gir_aje",
      titulo: "Verbos en -ger, -gir y palabras terminadas en -aje",
      fuente: "Cuadernillo Monserrat Lengua, págs. 12-13",
      bases: "Conjugación y sufijos",
      secuencia: "Los verbos terminados en -ger y -gir se escriben con G (proteger, fingir, elegir), excepto tejer y crujir. Las palabras terminadas en -aje se escriben con J (viaje, mensaje, paisaje).",
      evidencia_propuesta: "Completar oraciones con formas de proteger, fingir y sustantivos en -aje aplicando la regla y señalando excepciones.",
      pista: "Los verbos que terminan en -ger o -gir van con G, ¡menos tejer y crujir! Las palabras en -aje siempre van con J.",
      error_esperado: "Escribir 'protejer' con j o 'viage' con g.",
    },
  ],

  // 3. Ortografía H
  ortografia_h: [
    {
        "id": "ort_h_0_observar_palabras",
        "titulo": "La H que vemos aunque no suene",
        "fuente": "Cuadernillo Monserrat Lengua, pág. 11; ejemplos adaptados",
        "bases": "Reconocer letras en palabras conocidas",
        "secuencia": "En hormiga y cohete, la H se escribe aunque no suene. Algunas palabras se aprenden mirando su escritura: no hace falta inventar una regla para explicarlas.",
        "evidencia_propuesta": "Completá la palabra del ejemplo: co_ete. En prácticas independientes, variar la frase usando las palabras ya presentadas.",
        "pista": "Volvé a mirar cohete: entre la o y la e aparece una H.",
        "error_esperado": "Omitir o agregar una H sin contrastar con el modelo enseñado."
    },
    {
        "id": "ort_h_1_diptongos_iniciales_hie_hue",
        "titulo": "Hielo y huevo: comienzos que se parecen",
        "fuente": "Cuadernillo Monserrat Lengua, pág. 11; ejemplos adaptados",
        "bases": "Observar palabras con H",
        "secuencia": "Hielo empieza con hie- y huevo con hue-. Conservamos la H al escribir estas palabras. También la vemos en hierba, hueso y huella.",
        "evidencia_propuesta": "Completá: el agua congelada es _ielo. En prácticas independientes, variar la frase usando las palabras ya presentadas.",
        "pista": "Mirá el modelo hielo: empieza con hie-.",
        "error_esperado": "Omitir o agregar una H sin contrastar con el modelo enseñado."
    },
    {
        "id": "ort_h_2_verbos_haber_hacer_hablar",
        "titulo": "Palabras que van juntas: hacer e hizo",
        "fuente": "Cuadernillo Monserrat Lengua, pág. 11; ejemplos adaptados",
        "bases": "Reconocer acciones en frases",
        "secuencia": "Hago e hizo son formas de hacer y conservan la H. Hay viene de haber; hablo viene de hablar. Podemos mirar esas palabras como familias.",
        "evidencia_propuesta": "Completá: ayer mi amiga _izo un dibujo. En prácticas independientes, variar la frase usando las palabras ya presentadas.",
        "pista": "Relacioná hizo con hacer. Las dos se escriben con H.",
        "error_esperado": "Omitir o agregar una H sin contrastar con el modelo enseñado."
    },
    {
        "id": "ort_h_3_hum_seguido_vocal",
        "titulo": "Humo, humedad y humilde",
        "fuente": "Cuadernillo Monserrat Lengua, pág. 11; ejemplos adaptados",
        "bases": "Reconocer las vocales",
        "secuencia": "Las palabras que empiezan por hum- seguido de una vocal llevan H. Mirá humo, humedad y humilde: después de hum aparece o, e o i.",
        "evidencia_propuesta": "Completá la palabra que viste: _umedad. En prácticas independientes, variar la frase usando las palabras ya presentadas.",
        "pista": "El comienzo hum- seguido de vocal se escribe con H.",
        "error_esperado": "Omitir o agregar una H sin contrastar con el modelo enseñado."
    },
    {
        "id": "ort_h_4_comienzos_con_significado",
        "titulo": "Hidro-: un comienzo relacionado con agua",
        "fuente": "Cuadernillo Monserrat Lengua, pág. 11; ejemplos adaptados",
        "bases": "Identificar el comienzo de una palabra",
        "secuencia": "Algunos comienzos de palabras tienen significado. Hidro- se relaciona con agua y se escribe con H. Hiper- puede indicar algo grande o excesivo, como en hipermercado.",
        "evidencia_propuesta": "Completá: _idromasaje utiliza agua. En prácticas independientes, variar la frase usando las palabras ya presentadas.",
        "pista": "El comienzo hidro- se escribe con H y se relaciona con agua.",
        "error_esperado": "Omitir o agregar una H sin contrastar con el modelo enseñado."
    },
    {
        "id": "ort_h_5_familias_sin_generalizar",
        "titulo": "Mirar la palabra completa",
        "fuente": "Cuadernillo Monserrat Lengua, pág. 11; ejemplos adaptados",
        "bases": "Reconocer palabras relacionadas",
        "secuencia": "Muchas palabras de una familia conservan la H: hormiga y hormiguero. Pero no todas las familias funcionan igual: hueso lleva H y óseo no. Observamos cada modelo antes de escribir.",
        "evidencia_propuesta": "Completá usando el modelo: la hormiga entra al _ormiguero. En prácticas independientes, variar la frase usando las palabras ya presentadas.",
        "pista": "En esta familia, hormiga y hormiguero empiezan con H.",
        "error_esperado": "Omitir o agregar una H sin contrastar con el modelo enseñado."
    }
],

  // 4. Ortografía C, S y Z
  ortografia_c_s_z: [
    {
      id: "ort_csz_1_plurales_z_a_c",
      titulo: "Cambio de Z a C en plurales y diminutivos",
      fuente: "Cuadernillo Monserrat Lengua, pág. 10",
      bases: "Singular, plural y consonantes",
      secuencia: "Las palabras que terminan en Z en singular forman el plural con C ante la letra E (lápiz -> lápices, pez -> peces, nuez -> nueces).",
      evidencia_propuesta: "Transformar palabras terminadas en Z a su plural con C explicando la regla gráfica.",
      pista: "La Z no se lleva bien con la E ni con la I: cuando cambia a plural, se convierte en C.",
      error_esperado: "Escribir 'lápizes' o 'pezes' con z en el plural.",
    },
    {
      id: "ort_csz_2_diminutivos_cito_cita",
      titulo: "Diminutivos en -cito, -cita y terminaciones en -ito, -ita",
      fuente: "Cuadernillo Monserrat Lengua, pág. 10",
      bases: "Diminutivos y sufijos",
      secuencia: "Los diminutivos en -cito/-cita se escriben con C (ratón -> ratoncito, café -> cafecito, puente -> puentecito). Las palabras cuya última sílaba ya tiene S conservan la S con -ito/-ita (casa -> casita, oso -> osito). Si terminan en vocal átona sin S previa, forman el diminutivo común en -ito/-ita (perro -> perrito, mesa -> mesita).",
      evidencia_propuesta: "Escribir el diminutivo de avión (avioncito), perro (perrito) y de mesa (mesita) explicando por qué avión lleva C con -cito, mientras que perro lleva -ito y mesa conserva la S.",
      pista: "Si la palabra base tiene S en la última sílaba (casa), conserva su S con -ito (casita). Se usa -cito con C en palabras que terminan en consonante (avión -> avioncito) o vocal acentuada (café -> cafecito). ¡Ojo! Palabras como perro hacen perrito con -ito.",
      error_esperado: "Creer que todas las palabras sin S llevan -cito (escribir 'perrocito') o escribir 'avionzito' con z.",
    },
    {
      id: "ort_csz_3_terminaciones_anza_ez_oso",
      titulo: "Sustantivos en -anza, -ez, -eza (Z) y adjetivos en -oso, -osa (S)",
      fuente: "Cuadernillo Monserrat Lengua, pág. 11",
      bases: "Clases de palabras y sufijos",
      secuencia: "Sustantivos abstractos en -ez, -eza van con Z (vejez, belleza); sustantivos en -anza van con Z (esperanza). Adjetivos en -oso, -osa van con S (hermoso, cariñosa).",
      evidencia_propuesta: "Identificar y clasificar palabras según su sufijo justificando la Z o la S.",
      pista: "Los adjetivos que dicen cómo es algo y terminan en -oso o -osa van con S. Los sustantivos abstractos en -eza van con Z.",
      error_esperado: "Escribir 'bellesa' con s o 'hermozo' con z.",
    },
  ],

  // 5. Acentuación general: agudas, graves y esdrújulas
  tildes_generales_agudas_graves_esdrujulas: [
    {
      id: "tild_gen_1_silaba_tonica",
      titulo: "Identificación de la sílaba tónica",
      fuente: "Cuadernillo Monserrat Lengua, pág. 4",
      bases: "Separación silábica y pronunciación",
      secuencia: "La sílaba tónica es la que se pronuncia con mayor intensidad o fuerza en la palabra (car-TEL, AR-bol, I-má-ge-nes).",
      evidencia_propuesta: "Dividir palabras en sílabas e identificar cuál es la tónica sin depender de si lleva tilde escrita o no.",
      pista: "Llamá a la palabra como si la gritaras desde lejos: la sílaba que se estira con más fuerza es la tónica.",
      error_esperado: "Creer que solo las palabras con tilde marcada tienen sílaba tónica.",
    },
    {
      id: "tild_gen_2_agudas",
      titulo: "Palabras agudas: acento en la última sílaba",
      fuente: "Cuadernillo Monserrat Lengua, pág. 4",
      bases: "Sílaba tónica",
      secuencia: "Llevan la fuerza en la última sílaba. Llevan tilde escrita únicamente cuando terminan en N, S o Vocal (café, corazón, compás).",
      evidencia_propuesta: "Clasificar palabras agudas con y sin tilde (papel vs reloj vs acción) justificando la regla.",
      pista: "Fuerza en la última sílaba: solo le ponés tilde si la palabra termina en N, S o Vocal.",
      error_esperado: "Ponerle tilde a palabras agudas terminadas en otras consonantes (escribir 'papél' o 'reloj').",
    },
    {
      id: "tild_gen_3_graves",
      titulo: "Palabras graves: acento en la penúltima sílaba",
      fuente: "Cuadernillo Monserrat Lengua, pág. 4",
      bases: "Sílaba tónica",
      secuencia: "Llevan la fuerza en la penúltima sílaba. Llevan tilde escrita cuando NO terminan en N, S ni Vocal (árbol, lápiz, césped).",
      evidencia_propuesta: "Explicar por qué 'árbol' lleva tilde y 'mesa' no lleva tilde siendo ambas palabras graves.",
      pista: "Fuerza en la penúltima sílaba: llevan tilde al revés que las agudas, solo cuando NO terminan en N, S ni Vocal.",
      error_esperado: "Ponerle tilde a palabras graves terminadas en vocal (escribir 'cása').",
    },
    {
      id: "tild_gen_4_esdrujulas",
      titulo: "Palabras esdrújulas y sobreesdrújulas",
      fuente: "Cuadernillo Monserrat Lengua, pág. 4",
      bases: "Sílaba tónica y orden posicional",
      secuencia: "Esdrújulas: acento en la antepenúltima sílaba. Sobreesdrújulas: anterior a la antepenúltima. ¡Siempre llevan tilde!",
      evidencia_propuesta: "Identificar palabras esdrújulas (música, pájaro, teléfono) y explicar por qué no hace falta mirar en qué letra terminan.",
      pista: "Si la fuerza está en la antepenúltima sílaba, es esdrújula y lleva tilde SIEMPRE, sin excepción.",
      error_esperado: "Buscar en qué letra termina una palabra esdrújula para decidir si lleva tilde.",
    },
  ],

  // 6. Diptongo e hiato
  diptongo_hiato: [
    {
      id: "dip_hiat_1_clasificacion_vocales",
      titulo: "Vocales abiertas y cerradas",
      fuente: "Cuadernillo Monserrat Lengua, pág. 4",
      bases: "Sonidos vocálicos",
      secuencia: "Vocales abiertas: A, E, O. Vocales cerradas: I, U. Esta distinción es la base para saber si dos vocales van juntas o separadas.",
      evidencia_propuesta: "Clasificar las vocales de una palabra en abiertas y cerradas.",
      pista: "Abrí bien la boca para pronunciar A, E, O (abiertas). La boca queda casi cerrada con I, U (cerradas).",
      error_esperado: "Confundir la E con una vocal cerrada.",
    },
    {
      id: "dip_hiat_2_diptongo",
      titulo: "Diptongo: dos vocales en la misma sílaba",
      fuente: "Cuadernillo Monserrat Lengua, págs. 4-5",
      bases: "Vocales abiertas y cerradas",
      secuencia: "Secuencia de dos vocales que se pronuncian juntas en una misma sílaba: vocal abierta + cerrada átona (o viceversa) y dos cerradas distintas (iu, ui).",
      evidencia_propuesta: "Separar en sílabas palabras con diptongo: vien-to, ciu-dad, ai-re sin separar las vocales.",
      pista: "La vocal abierta abraza a la cerrada átona y no se separan: viajan en la misma sílaba.",
      error_esperado: "Separar las vocales de un diptongo (escribir vi-en-to).",
    },
    {
      id: "dip_hiat_3_hiato",
      titulo: "Hiato común e hiato acentual (vocal cerrada tónica)",
      fuente: "Cuadernillo Monserrat Lengua, pág. 5",
      bases: "Diptongos y acentuación",
      secuencia: "Hiato: dos vocales seguidas que pertenecen a sílabas distintas. Casos: dos abiertas (ca-er, te-a-tro) o vocal cerrada tónica con tilde obligatoria (Ma-rí-a, ba-úl, rí-o).",
      evidencia_propuesta: "Separar en sílabas pa-ís, rí-o y te-a-tro justificando la tilde del hiato acentual.",
      pista: "Cuando la vocal cerrada suena fuerte (I o U con fuerza), rompe el diptongo, se separa y lleva tilde SIEMPRE.",
      error_esperado: "Juntar en una sola sílaba palabras con hiato como 'teatro' o no ponerle tilde a 'María'.",
    },
  ],

  // 7. Tilde diacrítica en monosílabos
  tilde_diacritica_monosilabos: [
    {
      id: "tild_diac_1_regla_monosilabos",
      titulo: "Regla general: los monosílabos no llevan tilde",
      fuente: "Cuadernillo Monserrat Lengua, pág. 5",
      bases: "Monosílabos y acentuación",
      secuencia: "Las palabras de una sola sílaba no llevan tilde por regla general: fue, dio, vio, ti, fe, sol, pan, bien.",
      evidencia_propuesta: "Identificar monosílabos que nunca llevan tilde y explicar la regla.",
      pista: "Los monosílabos comunes nunca llevan tilde: fue, vio y dio van siempre sin tilde.",
      error_esperado: "Escribir 'fué' o 'tió' con tilde.",
    },
    {
      id: "tild_diac_2_pares_el_tu_mi",
      titulo: "Pares diacríticos frecuentes: él/el, tú/tu, mí/mi",
      fuente: "Cuadernillo Monserrat Lengua, pág. 6",
      bases: "Pronombres personales y artículos/posesivos",
      secuencia: "Llevan tilde diacrítica cuando son pronombres personales: él (persona) vs el (artículo); tú (persona) vs tu (posesivo); mí (persona) vs mi (posesivo/nota).",
      evidencia_propuesta: "Completar oraciones eligiendo entre 'el' y 'él', 'tu' y 'tú', justificando la función gramatical.",
      pista: "Si reemplaza a una persona (Él vino, Tú sabés, Para mí), lleva tilde. Si acompaña a un objeto (El auto, Tu mochila, Mi perro), no lleva.",
      error_esperado: "Ponerle tilde a 'el' cuando acompaña a un sustantivo.",
    },
    {
      id: "tild_diac_3_pares_si_te_se_mas_de",
      titulo: "Pares diacríticos especiales: sí/si, té/te, sé/se, más/mas, dé/de",
      fuente: "Cuadernillo Monserrat Lengua, págs. 6-7",
      bases: "Funciones gramaticales y monosílabos",
      secuencia: "sí (afirmación/pronombre) vs si (condición); té (bebida) vs te (pronombre); sé (verbo saber/ser) vs se (pronombre); más (cantidad) vs mas (pero); dé (verbo dar) vs de (preposición).",
      evidencia_propuesta: "Distinguir 'Sé amable' (verbo) de 'Se cayó' (pronombre), y 'Sí, quiero' de 'Si llueve'.",
      pista: "Sé lleva tilde cuando viene de saber ('yo sé') o de ser ('sé bueno'). Se no lleva tilde cuando es pronombre ('se durmió').",
      error_esperado: "Escribir 'se' con tilde en oraciones impersonales o reflexivas.",
    },
  ],

  // 8. Sustantivos, género y número
  sustantivos_genero_numero_tipo: [
    {
      id: "sust_1_clasificacion_semantica",
      titulo: "Clasificación semántica del sustantivo",
      fuente: "Cuadernillo Monserrat Lengua, pág. 25",
      bases: "Palabras que nombran",
      secuencia: "Sustantivos comunes vs propios; concretos vs abstractos; individuales vs colectivos (sustantivo singular que nombra un grupo: jauría, arboleda).",
      evidencia_propuesta: "Clasificar sustantivos en un texto identificando por qué 'bosque' es colectivo o 'libertad' es abstracto.",
      pista: "Un sustantivo colectivo está en singular pero nombra a un grupo de elementos de la misma especie.",
      error_esperado: "Creer que 'perros' en plural es un sustantivo colectivo en vez de individual en plural.",
    },
    {
      id: "sust_2_genero_numero_morfologia",
      titulo: "Género y número del sustantivo",
      fuente: "Cuadernillo Monserrat Lengua, págs. 26-27",
      bases: "Morfología de palabras",
      secuencia: "Género gramatical (masculino/femenino) determinado por el artículo el/la; número (singular/plural) según terminación en vocal (-s) o consonante (-es).",
      evidencia_propuesta: "Formar el femenino y el plural de sustantivos irregulares identificando su género gramatical.",
      pista: "Para saber el género, ponele 'el' o 'la' adelante: la mesa (femenino), el lápiz (masculino).",
      error_esperado: "Confundir género gramatical con sexo biológico (creer que los objetos no tienen género).",
    },
  ],

  // 9. Verbos del modo indicativo y tiempos
  verbos_modo_indicativo_tiempos: [
    {
      id: "verb_1_infinitivo_raiz_desinencia",
      titulo: "Infinitivo, raíz y desinencias de las tres conjugaciones",
      fuente: "Cuadernillo Monserrat Lengua, pág. 28",
      bases: "Noción de verbo y acción",
      secuencia: "Infinitivos: 1ª (-ar), 2ª (-er), 3ª (-ir). La raíz aporta el significado; la desinencia indica persona, número, tiempo y modo.",
      evidencia_propuesta: "Separar raíz y desinencia en verbos regulares (cant-ábamos, com-erán, part-ieron).",
      pista: "Para encontrar la raíz, sacale el -ar, -er o -ir al infinitivo del verbo: de cantar queda cant-.",
      error_esperado: "Cortar la raíz en lugares incorrectos que no conservan el significado base.",
    },
    {
      id: "verb_2_tiempos_simples_indicativo",
      titulo: "Tiempos simples del modo indicativo",
      fuente: "Cuadernillo Monserrat Lengua, págs. 29-30",
      bases: "Conjugación verbal y noción temporal",
      secuencia: "Presente (canto), pretérito perfecto simple (canté), pretérito imperfecto (cantaba), futuro imperfecto (cantaré), condicional simple (cantaría).",
      evidencia_propuesta: "Conjugar un verbo en presente, pretérito perfecto simple y pretérito imperfecto reconociendo el matiz de acción terminada vs acción habitual.",
      pista: "El pretérito perfecto simple es una acción puntual que terminó (ayer canté). El imperfecto es una acción continua o habitual en el pasado (antes cantaba).",
      error_esperado: "Confundir el pretérito imperfecto (jugaba) con el pretérito perfecto simple (jugó).",
    },
    {
      id: "verb_3_tiempos_compuestos",
      titulo: "Tiempos compuestos con el verbo auxiliar haber",
      fuente: "Cuadernillo Monserrat Lengua, págs. 31-32",
      bases: "Participio y tiempos simples",
      secuencia: "Los tiempos compuestos se forman con el verbo auxiliar 'haber' conjugado + el participio del verbo principal (-ado, -ido): he cantado, había comido, habré partido.",
      evidencia_propuesta: "Reconocer formas de pretérito perfecto compuesto (he comido) y pluscuamperfecto (había comido) en un texto narrativo.",
      pista: "En los tiempos compuestos siempre tenés dos palabras: una forma de haber más un participio terminado en -ado o -ido.",
      error_esperado: "Conjugar el participio variándolo en número o género cuando forma parte del verbo compuesto.",
    },
  ],

  // 10. Sujeto y predicado
  sujeto_predicado_nucleo: [
    {
      id: "sint_suj_pred_1_reconocimiento_verbo",
      titulo: "El verbo conjugado como núcleo del predicado",
      fuente: "Cuadernillo Monserrat Lengua, pág. 33",
      bases: "Verbo conjugado y oración",
      secuencia: "En toda oración bimembre, el primer paso es encontrar el verbo conjugado. Ese verbo es el núcleo del predicado (NP).",
      evidencia_propuesta: "Marcar el núcleo verbal en una oración y delimitar el predicado completo.",
      pista: "Buscá la palabra que expresa la acción o estado y que se puede conjugar con una persona: ese es tu verbo.",
      error_esperado: "Marcar sustantivos o adjetivos como núcleo del predicado.",
    },
    {
      id: "sint_suj_pred_2_sujeto_expreso_tacito",
      titulo: "Identificación del sujeto por concordancia: expreso y tácito",
      fuente: "Cuadernillo Monserrat Lengua, págs. 33-34",
      bases: "Núcleo del predicado y concordancia",
      secuencia: "El sujeto es el elemento que concuerda en persona y número con el verbo. Puede ser expreso (escrito) o tácito (omitido pero deducible por la desinencia del verbo).",
      evidencia_propuesta: "Identificar el sujeto en oraciones con sujeto tácito ('Llegaron tarde ayer' -> Sujeto Tácito: Ellos/Ellas) y con sujeto pospuesto ('En el bosque cantaban los pájaros' -> Sujeto: Los pájaros).",
      pista: "No le preguntes solo '¿quién?': cambiá el número del verbo (de singular a plural) y la parte que se vea obligada a cambiar es el verdadero sujeto.",
      error_esperado: "Creer que la primera palabra de la oración siempre es el sujeto.",
    },
  ],

  // 11. Concordancia sujeto-verbo
  concordancia_sujeto_verbo: [
    {
      id: "conc_sv_1_persona_numero",
      titulo: "Concordancia obligatoria en número y persona",
      fuente: "Cuadernillo Monserrat Lengua, pág. 34",
      bases: "Persona gramatical y número",
      secuencia: "El núcleo del sujeto y el núcleo del predicado deben concordar en número (singular/plural) y persona (1ª, 2ª, 3ª).",
      evidencia_propuesta: "Corregir oraciones con fallas de concordancia ('Los alumnos estudia mucho' -> 'Los alumnos estudian mucho').",
      pista: "Si el sujeto está en plural, el verbo tiene que estar en plural obligatoriamente.",
      error_esperado: "Dejar el verbo en singular cuando el sujeto tiene varios elementos o está en plural.",
    },
    {
      id: "conc_sv_2_sujetos_compuestos",
      titulo: "Concordancia con sujetos compuestos y núcleos coordinados",
      fuente: "Cuadernillo Monserrat Lengua, págs. 35-36",
      bases: "Sujeto compuesto y conectores",
      secuencia: "Cuando el sujeto tiene dos o más núcleos singulares unidos por 'y', el verbo concuerda en plural: 'Juan y María cantan'.",
      evidencia_propuesta: "Reescribir oraciones agregando un núcleo al sujeto y ajustando el verbo al plural correspondiente.",
      pista: "Dos núcleos en singular (el perro y el gato) forman juntos un sujeto plural: el verbo va en plural (juegan).",
      error_esperado: "Hacer concordar el verbo solo con el núcleo que le queda más cerca.",
    },
  ],

  // 12. Comprensión lectora
  comprension_lectora_literal_inferida: [
    {
      id: "comp_lec_1_literal",
      titulo: "Localización de información explícita",
      fuente: "Cuadernillo Monserrat Lengua, págs. 48-50",
      bases: "Lectura comprensiva y rastreo de datos",
      secuencia: "Localizar personajes, lugares, fechas y acciones que están formulados de manera directa y evidente en el texto.",
      evidencia_propuesta: "Responder una pregunta puntual sobre el texto citando el renglón o la frase exacta que contiene la respuesta.",
      pista: "Buscá la palabra clave de la pregunta dentro del texto y leé con atención la oración donde aparece.",
      error_esperado: "Responder de memoria sin verificar lo que dice el texto escrito.",
    },
    {
      id: "comp_lec_2_inferencia",
      titulo: "Conexión de pistas textuales e inferencias",
      fuente: "Cuadernillo Monserrat Lengua, págs. 51-54",
      bases: "Localización de datos literales",
      secuencia: "Deducir causas, sentimientos, intenciones o consecuencias a partir de pistas contextuales no explícitas.",
      evidencia_propuesta: "Explicar cómo se siente o qué planea un personaje a partir de sus acciones y expresiones corporales.",
      pista: "Como un detective: uní lo que el texto dice con lo que vos ya sabés del mundo para descubrir lo que no está dicho directamente.",
      error_esperado: "Decir que 'el texto no lo dice' cuando hay pistas evidentes para deducirlo.",
    },
    {
      id: "comp_lec_3_idea_principal_tema",
      titulo: "Identificación del tema central e idea principal",
      fuente: "Cuadernillo Monserrat Lengua, pág. 54",
      bases: "Comprensión global del texto",
      secuencia: "Distinguir de qué trata el texto (tema) y qué es lo más importante que dice el autor sobre ese tema (idea principal).",
      evidencia_propuesta: "Escribir en una sola oración el tema central del texto y resumir su mensaje principal sin incluir detalles secundarios.",
      pista: "Preguntate: ¿de qué habla todo el texto de principio a fin? Ese es el tema.",
      error_esperado: "Confundir un detalle curioso o una anécdota secundaria con la idea principal del texto.",
    },
  ],

  // 13. Conectores y sinónimos
  discurso_conectores_sinonimos: [
    {
      id: "disc_con_1_conectores_clasificacion",
      titulo: "Clasificación y uso de conectores textuales",
      fuente: "Cuadernillo Monserrat Lengua, págs. 47-49",
      bases: "Relación entre oraciones y párrafos",
      secuencia: "Conectores temporales (después, luego, más tarde); de causa (porque, ya que); de consecuencia (por lo tanto, en consecuencia); de oposición (pero, sin embargo).",
      evidencia_propuesta: "Elegir el conector adecuado para unir dos oraciones preservando el sentido lógico de causa o contraste.",
      pista: "Fijate qué relación tienen las dos ideas: si una explica la razón de la otra usá 'porque'; si se oponen usá 'sin embargo'.",
      error_esperado: "Usar conectores de causa donde corresponde oposición o viceversa.",
    },
    {
      id: "disc_con_2_sinonimos_antonimos",
      titulo: "Sinónimos y antónimos en contexto",
      fuente: "Cuadernillo Monserrat Lengua, págs. 55-56",
      bases: "Vocabulario y variedad léxica",
      secuencia: "Sustituir palabras reiteradas por sinónimos adecuados al registro; identificar antónimos que expresen la idea opuesta con precisión.",
      evidencia_propuesta: "Reescribir un fragmento reemplazando palabras repetidas por sinónimos adecuados sin alterar el significado.",
      pista: "Buscá una palabra que signifique lo mismo pero que quede natural en esa oración.",
      error_esperado: "Elegir un sinónimo que no concuerda con el contexto de la oración.",
    },
  ],

  // 14. Producción narrativa
  produccion_escrita_narracion: [
    {
      id: "prod_1_estructura_narrativa",
      titulo: "Estructura del relato: situación inicial, conflicto y desenlace",
      fuente: "Cuadernillo Monserrat Lengua, págs. 57-58",
      bases: "Oraciones completas y lectura de historias",
      secuencia: "Situación inicial (presentación de personajes, tiempo y espacio); complicación o conflicto (problema que altera la situación); resolución o desenlace.",
      evidencia_propuesta: "Escribir un relato breve delimitando claramente los tres momentos en párrafos separados.",
      pista: "Cada historia necesita un problema que cambie la situación de los personajes y una solución antes de terminar.",
      error_esperado: "Terminar la historia abruptamente sin resolver el problema planteado.",
    },
    {
      id: "prod_2_conectores_temporales",
      titulo: "Conectores temporales y coherencia cronológica",
      fuente: "Cuadernillo Monserrat Lengua, pág. 59",
      bases: "Estructura narrativa básica",
      secuencia: "Usar conectores para ordenar los hechos en el tiempo: 'al principio', 'de pronto', 'mientras tanto', 'finalmente'.",
      evidencia_propuesta: "Enlazar los párrafos de una narración usando conectores temporales variados.",
      pista: "Los conectores temporales ayudan al lector a saber qué pasó primero, qué pasó durante y qué pasó al final.",
      error_esperado: "Repetir continuamente 'y después... y después' para unir las acciones.",
    },
    {
      id: "prod_3_recursos_expresivos",
      titulo: "Recursos expresivos: descripción, comparaciones y diálogo",
      fuente: "Cuadernillo Monserrat Lengua, págs. 59-60",
      bases: "Narración y clases de palabras",
      secuencia: "Enriquecer el relato con imágenes sensoriales, comparaciones con 'como' y parlamentos breves de diálogo con raya de diálogo (—).",
      evidencia_propuesta: "Incorporar una comparación y una línea de diálogo bien puntuada dentro de una narración breve.",
      pista: "Mostrá cómo es el lugar con adjetivos y comparaciones: 'era veloz como el viento'. Usá raya de diálogo (—) cuando habla un personaje.",
      error_esperado: "Olvidar los signos de puntuación de diálogo o escribir solo acciones sin describir nada.",
    },
  ],
};

/**
 * Devuelve la lista de micro-objetivos para un tema dado.
 */
export function getObjetivosParaTema(tema = "") {
  const temaNormalizado = String(tema || "").toLowerCase().trim();
  if (OBJETIVOS_POR_TEMA[temaNormalizado]) {
    const lista = OBJETIVOS_POR_TEMA[temaNormalizado];
    if (temaNormalizado === "divisibilidad_primos_mcm_mcd") return [{...lista[0], id:"bases_multiplos_saltos", titulo:"Múltiplos por saltos iguales"}, lista[3], lista[0], ...[2,3,5,10].map(n => ({...lista[1], id:`bases_criterio_${n}`, titulo:`Divisible por ${n}`})), lista[2], lista[4]];
    return lista;
  }

  const tituloTema = temaNormalizado.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return [
    {
      id: `${temaNormalizado}_1_fundamentos`,
      titulo: `Fundamentos de ${tituloTema}`,
      fuente: "Cuadernillo Monserrat de Nivelación",
      bases: "Conceptos introductorios",
      secuencia: `Comprensión de los conceptos básicos de ${tituloTema}.`,
      evidencia_propuesta: `Resolver un ejercicio guiado demostrando el procedimiento paso a paso.`,
      pista: "Leé atentamente la consigna y anotá los datos principales antes de empezar.",
      error_esperado: "Apurar el cálculo sin verificar los pasos intermedios.",
    },
    {
      id: `${temaNormalizado}_2_aplicacion`,
      titulo: `Aplicación práctica de ${tituloTema}`,
      fuente: "Cuadernillo Monserrat de Nivelación",
      bases: `Fundamentos de ${tituloTema}`,
      secuencia: `Resolución autónoma de problemas de ${tituloTema}.`,
      evidencia_propuesta: `Resolver una situación problemática sin asistencia de pistas.`,
      pista: "Comprobá siempre tu respuesta antes de enviarla.",
      error_esperado: "Omitir la justificación del resultado obtenido.",
    },
  ];
}

/**
 * Determina el objetivo actual de un alumno a partir de su historial de sesiones.
 * Exige evidencia progresiva:
 * - Requiere al menos 2 prácticas independientes correctas (tipo_pregunta === "practica",
 *   !resuelto_con_ayuda && es_correcta === true && !no_visto) para considerar un objetivo superado y avanzar al siguiente.
 * - No adjudica sesiones históricas sin objetivo_id a ningún objetivo específico.
 * - Solo marca explicación vista si la sesión de lección fue completada/respondida, no si fue generada vacía.
 */
export function determinarProximoObjetivo(tema = "", sesiones = []) {
  const objetivos = getObjetivosParaTema(tema);
  if (!objetivos.length) {
    return {
      objetivoActual: null,
      indiceObjetivo: 0,
      totalObjetivos: 0,
      estado: ESTADOS_OBJETIVO.NO_INICIADA,
      requiereExplicacion: true,
      aciertosIndependientes: 0,
      temaCompletado: false,
    };
  }

  const statsPorObjetivo = {};
  for (const obj of objetivos) {
    const base = getUnidadBase(obj.id);
    const stats = {aciertosIndependientes:0,aciertosConAyuda:0,explicacionVista:false,necesitaRepaso:false};
    const evidencias = new Set(); let fallosSeguidos = 0;
    const historial = sesiones.filter(s => s.tema === tema && s.ia_parametros_usados?.objetivo_id === obj.id)
      .filter(s => !base || s.ia_parametros_usados?.contenido_version === VERSION_BASES)
      .sort((a,b) => String(a.created_at || '').localeCompare(String(b.created_at || '')));
    for (const s of historial) {
      const p = s.ia_parametros_usados || {};
      if (s.tipo_pregunta === 'leccion') {
        if (typeof s.es_correcta === 'boolean' || p.explicacion_vista === true || p.completada === true) {
          stats.explicacionVista = true; stats.necesitaRepaso = false; fallosSeguidos = 0;
        }
        continue;
      }
      if (!['practica','multiple','completar','produccion'].includes(s.tipo_pregunta) && p.modo_sesion !== 'practica') continue;
      if (s.es_correcta === false) {
        fallosSeguidos++;
        if (fallosSeguidos >= 2) { evidencias.clear();stats.explicacionVista=false;stats.necesitaRepaso=true; }
      } else if (s.es_correcta === true) {
        fallosSeguidos=0;
        if (p.resuelto_con_ayuda || p.ayuda_utilizada || p.no_visto) stats.aciertosConAyuda++;
        else evidencias.add(p.actividad_id || s.id || s);
      }
    }
    stats.aciertosIndependientes = evidencias.size;
    statsPorObjetivo[obj.id] = stats;
  }

  for (let i = 0; i < objetivos.length; i++) {
    const obj = objetivos[i];
    const stats = statsPorObjetivo[obj.id];

    if (stats.aciertosIndependientes < 2 || stats.necesitaRepaso || (getUnidadBase(obj.id) && !stats.explicacionVista)) {
      let estado = ESTADOS_OBJETIVO.NO_INICIADA;
      if (stats.aciertosIndependientes === 1) {
        estado = ESTADOS_OBJETIVO.PRACTICA_INDEPENDIENTE;
      } else if (stats.aciertosConAyuda > 0) {
        estado = ESTADOS_OBJETIVO.PRACTICA_GUIADA;
      } else if (stats.explicacionVista) {
        estado = ESTADOS_OBJETIVO.EXPLICADA;
      }

      return {
        objetivoActual: obj,
        indiceObjetivo: i,
        totalObjetivos: objetivos.length,
        estado,
        requiereExplicacion: !stats.explicacionVista,
        necesitaRepaso: stats.necesitaRepaso,
        aciertosIndependientes: stats.aciertosIndependientes,
        temaCompletado: false,
      };
    }
  }

  return {
    objetivoActual: objetivos[objetivos.length - 1],
    indiceObjetivo: objetivos.length - 1,
    totalObjetivos: objetivos.length,
    estado: ESTADOS_OBJETIVO.CONSOLIDADA,
    requiereExplicacion: false,
    aciertosIndependientes: 2,
    temaCompletado: true,
  };
}

/**
 * Regla compartida de elegibilidad para rendir el examen final de un tema.
 * Exige que todos los micro-objetivos obligatorios del tema estén consolidados.
 */
export function esElegibleParaExamenFinal(tema = "", sesiones = []) {
  const estado = determinarProximoObjetivo(tema, sesiones);
  return estado.temaCompletado === true;
}
