export const EXPLORADORES_MATEMATICAS = {
  numeros_naturales_sistema_decimal: ['canjes', 'Diez sueltos forman un paquete'],
  tablas_multiplicar_2_5: ['grupos', 'Armar grupos iguales', 2, 5],
  tablas_multiplicar_6_8: ['grupos', 'Filas de seis, siete u ocho', 6, 8],
  tablas_multiplicar_9_10: ['grupos', 'Filas de nueve o diez', 9, 10],
  numeros_romanos: ['romanos', 'Construir un número romano'],
  division_1_digito: ['reparto', 'Repartir sin confundir con multiplicar'],
  divisibilidad_primos_mcm_mcd: ['divisibilidad', '¿Cuándo coinciden los saltos?'],
  fracciones_concepto: ['fraccion', 'El mismo litro, dividido en partes'],
  fracciones_operaciones: ['sumaFracciones', 'Juntar jugo en partes del mismo tamaño'],
  fracciones_del_resto: ['resto', 'Una parte de lo que queda'],
  decimales_conversion: ['decimal', 'La misma cantidad, dos escrituras'],
  potenciacion_y_raiz_cuadrada: ['cuadrado', 'Construir y desarmar un cuadrado'],
  jerarquia_operaciones: ['orden', 'Las cajas cambian qué hacemos primero'],
  si_me_la_longitud: ['longitud', 'Medir el mismo largo'],
  si_me_la_masa_capacidad_tiempo: ['medidas', 'Cambiar la unidad, conservar la cantidad'],
  geometria_angulos: ['angulo', 'Abrir un giro'],
  geometria_triangulos: ['triangulo', 'Tres ángulos que completan 180°'],
  geometria_cuadrilateros_circunferencia: ['circulo', 'Del centro al borde, y de borde a borde'],
  perimetros_simples: ['perimetro', 'Recorrer el borde de una huerta'],
  perimetros_compuestos: ['compuesto', 'Rodear una huerta con un rincón recortado'],
  graficos_estadisticos: ['grafico', 'Cada voto hace crecer una barra'],
  proporcionalidad_regla_3: ['proporcion', 'Una receta que crece sin cambiar el sabor'],
  secuencias_aritmeticas: ['secuencia', 'Repetir el mismo salto'],
  secuencias_geometricas_fibonacci: ['fibonacci', 'Dos maneras de hacer crecer una serie'],
  secuencias_alfanumericas_y_figuras: ['ciclo', 'Descubrir qué vuelve a empezar'],
  ecuaciones_con_imagenes_2_incognitas: ['equilibrio', 'Descubrir dos cantidades escondidas'],
};

export function mcd(a, b) { while (b) [a, b] = [b, a % b]; return a; }
export function modeloSuma(n1, d1, n2, d2) {
  const denominador = d1 * d2 / mcd(d1, d2);
  const primero = n1 * denominador / d1;
  const segundo = n2 * denominador / d2;
  return { denominador, primero, segundo, total: primero + segundo };
}
export function romano(n) {
  let result = '';
  for (const [valor, letras] of [[50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]) {
    while (n >= valor) { result += letras; n -= valor; }
  }
  return result;
}
export function datosReparto(total, grupos) {
  return { porGrupo: Math.floor(total / grupos), resto: total % grupos };
}
export function serieFibonacci(cantidad) {
  const serie = [1, 1];
  while (serie.length < cantidad) serie.push(serie.at(-1) + serie.at(-2));
  return serie.slice(0, cantidad);
}
