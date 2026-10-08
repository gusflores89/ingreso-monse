// R27: ampliaciones de enseñanza. No se agregan al banco desde este archivo.
// Las dos transferencias de cada unidad se reservan fuera de la práctica.
// Las opciones se rotan para que la respuesta no quede siempre en el mismo lugar.
const fraccion = (n, d, titulo = 'Una barra completa es el entero') => ({
  tipo: 'fracciones', titulo,
  barras: [{ label: `${n}/${d}`, partes: Array.from({ length: d }, (_, i) => i < n ? 'p' : 'v') }],
});
const recta = (min, max, paso, marcas = []) => ({ tipo: 'recta', min, max, paso, marcas });
const barras = (etiquetas, valores, paso = 1, titulo = 'Contamos por categoría') => ({ tipo: 'barras', etiquetas, valores, paso, titulo, unidad: 'cantidad' });
const poligono = (puntos, extra = {}) => ({ tipo: 'poligono', puntos, ...extra });
const rectangulo = (ancho, alto, extra = {}) => poligono([[0, 0], [ancho, 0], [ancho, alto], [0, alto]], extra);
const a = (enunciado, respuesta, otras, paso_resuelto, visual, pista_concreta) => ({
  enunciado, respuesta_correcta: String(respuesta), opciones: [String(respuesta), ...otras.map(String)],
  paso_resuelto, ...(visual ? { visual } : {}),
  ...(pista_concreta ? { pista_concreta } : {}),
});
const unidad = (id, tema, titulo, explicacion, ejemplo, pasos, pista, visual, actividades, ubicacion = {}) => {
  if (actividades.length !== 8) throw new Error(`${id}: hacen falta seis actividades y dos transferencias`);
  const preparar = (actividad, i) => ({
    ...actividad, id: `${id}-${i < 6 ? 'v' + (i + 1) : 't' + (i - 5)}`,
    opciones: actividad.opciones.slice(i % 3).concat(actividad.opciones.slice(0, i % 3)),
    pista_concreta: actividad.pista_concreta || pista,
  });
  return { id, tema, titulo, explicacion, ejemplo, pasos, pista, visual, ...ubicacion,
    actividades: actividades.slice(0, 6).map(preparar),
    transferencia: actividades.slice(6).map((actividad, i) => preparar(actividad, i + 6)),
  };
};

const naturalesRecta = unidad(
  'prof_r27_naturales_recta', 'numeros_naturales_sistema_decimal', 'Cada marca conserva la misma distancia',
  'En una regla, los números crecen al avanzar hacia la derecha. En una recta numérica, marcas igualmente separadas representan saltos iguales. Primero miramos de cuánto es cada salto.',
  'La recta muestra 0, 10, 20, 30 y 40. Entre 20 y 40 está 30.',
  ['De 0 a 10 aumentamos 10.', 'Cada intervalo vuelve a aumentar 10.', 'Después de 20 viene 30; después, 40.'],
  'Leé dos marcas seguidas para encontrar el tamaño del salto.',
  recta(0, 40, 10), [
    a('Las marcas son 0, 10, 20, ?, 40, igualmente separadas. ¿Qué número falta?', 30, [25, 35], 'Cada paso suma 10: 20 + 10 = 30.'),
    a('Las marcas son 0, 5, 10, ?, 20. ¿Qué número falta?', 15, [11, 25], 'Cada paso suma 5. Después de 10 está 15.'),
    a('Las marcas son 20, 30, ?, 50. ¿Qué número falta?', 40, [35, 60], 'De 20 a 30 hay 10; 30 + 10 = 40.'),
    a('En una recta, ¿cuál de estos números queda más a la derecha?', 73, [37, 70], 'Los números aumentan hacia la derecha. 73 es mayor que 70 y 37.'),
    a('Las marcas son 100, 200, ?, 400. ¿Qué número falta?', 300, [201, 350], 'Cada intervalo representa 100. Después de 200 está 300.'),
    a('Una recta tiene 0, 2, 4, 6. ¿Cuánto aumenta cada intervalo?', 2, [4, 6], 'De 0 a 2, de 2 a 4 y de 4 a 6 se agregan 2.'),
    a('Un camino marca 0 m, 25 m, 50 m y 75 m. Si sigue con la misma separación, ¿qué indica el cartel siguiente?', '100 m', ['80 m', '125 m'], 'Entre carteles hay 25 m. Después de 75 m: 75 + 25 = 100 m.'),
    a('Un ascensor dibujado está en el piso 6. Sube dos pisos y baja uno. ¿En qué piso termina?', 7, [9, 3], 'Desde 6 avanzamos a 8 y retrocedemos a 7.', recta(0, 10, 1, [{ valor: 6, label: 'Inicio' }])),
  ], { despues_de: 'mat_num_orden' });

const enteroDesdeUnaParte = unidad(
  'prof_r27_entero_desde_una_parte', 'fracciones_concepto', 'Si conozco una mitad, puedo armar las dos',
  'Una mitad es una de dos partes iguales. Si sabemos cuántos objetos hay en una mitad, repetimos esa cantidad para completar la otra. Con tercios necesitamos tres partes iguales; con cuartos, cuatro.',
  'La mitad de una caja son 4 fichas. La caja completa tiene dos mitades de 4: 8 fichas.',
  ['La parte conocida tiene cuatro fichas.', 'La otra mitad debe tener otras cuatro, porque las mitades son iguales.', 'Reunimos 4 + 4 = 8 fichas.'],
  'Repetí la misma cantidad tantas veces como partes iguales tenga el entero.',
  { tipo: 'colecciones', grupos: [{ label: 'Una mitad', cantidad: 4 }, { label: 'Otra mitad', cantidad: 4 }] }, [
    a('Una mitad de una caja tiene 4 fichas. La otra mitad tiene la misma cantidad. ¿Cuántas hay entre las dos?', 8, [4, 2], '4 + 4 = 8 fichas.'),
    a('Una mitad de una bolsa tiene 6 bolitas. ¿Cuántas tiene la bolsa completa?', 12, [3, 6], 'La otra mitad también tiene 6. 6 + 6 = 12.'),
    a('Un tercio de una caja tiene 2 lápices. ¿Cuántos tiene la caja completa?', 6, [4, 5], 'El entero tiene tres tercios de 2: 2 + 2 + 2 = 6.'),
    a('Un cuarto de un paquete tiene 2 tarjetas. ¿Cuántas tiene el paquete completo?', 8, [6, 4], 'El entero tiene cuatro cuartos de 2: 4 × 2 = 8.'),
    a('Un quinto de una colección tiene 3 figuritas. ¿Cuántas tiene la colección completa?', 15, [8, 5], 'Son cinco partes de 3: 5 × 3 = 15.'),
    a('Un tercio de una bolsa tiene 4 caramelos. ¿Cuántos tiene la bolsa completa?', 12, [7, 8], 'Tres tercios de 4 reúnen 3 × 4 = 12 caramelos.'),
    a('La mitad de una cinta mide 7 cm. ¿Cuánto mide la cinta completa?', '14 cm', ['7 cm', '21 cm'], 'Unimos dos mitades de 7 cm: 14 cm.'),
    a('Un juguete tiene cuatro ruedas iguales. Cada rueda pesa 2 gramos y representa un cuarto de la masa de las cuatro ruedas juntas. ¿Cuánto pesan juntas?', '8 gramos', ['4 gramos', '6 gramos'], 'Juntamos cuatro partes de 2 gramos: 4 × 2 = 8 gramos.'),
  ], { despues_de: 'fr24_mitad' });

const enteroDesdeParte = unidad(
  'prof_r27_entero_desde_parte', 'fracciones_concepto', 'Una parte permite reconstruir el entero',
  'Si conocemos una de varias partes iguales, podemos repetirla hasta completar el entero. Si conocemos varias partes juntas, primero averiguamos cuánto tiene una sola.',
  'Dos tercios de una bolsa son 8 fichas. La bolsa completa tenía 12 fichas.',
  ['Los 8 corresponden a dos partes iguales: 8 ÷ 2 = 4 en cada parte.', 'El entero tiene tres partes de 4.', '3 × 4 = 12. Revisamos: dos partes de 4 son 8.'],
  'Primero encontrá una parte; después reuní todas las partes del entero.',
  fraccion(2, 3, 'Dos partes juntas contienen 8 fichas'), [
    a('2/3 de una bolsa son 8 fichas. ¿Cuántas fichas tiene la bolsa completa?', 12, [4, 16], '8 ÷ 2 = 4 por tercio. 3 × 4 = 12 fichas.', fraccion(2, 3)),
    a('La mitad de una caja son 5 lápices. ¿Cuántos lápices tiene la caja completa?', 10, [5, 15], 'Una mitad tiene 5 y la otra también. 5 + 5 = 10.'),
    a('Un cuarto de una colección son 3 figuritas. ¿Cuántas tiene la colección completa?', 12, [7, 9], 'Hay 4 cuartos de 3: 4 × 3 = 12.'),
    a('3/4 de una bolsa son 9 bolitas. ¿Cuántas tiene la bolsa completa?', 12, [3, 27], '9 ÷ 3 = 3 por cuarto. 4 × 3 = 12.'),
    a('2/5 de una caja son 6 tizas. ¿Cuántas tiene la caja completa?', 15, [12, 30], '6 ÷ 2 = 3 por quinto. 5 × 3 = 15.'),
    a('4/5 de un paquete son 20 hojas. ¿Cuántas trae el paquete completo?', 25, [16, 100], '20 ÷ 4 = 5 por quinto. 5 × 5 = 25.'),
    a('Una cinta está dividida en tres tramos iguales. Dos tramos juntos miden 10 cm. ¿Cuánto mide toda la cinta?', '15 cm', ['20 cm', '30 cm'], 'Cada tramo mide 10 ÷ 2 = 5 cm. Los tres miden 15 cm.'),
    a('Una receta usa 3/5 de un paquete, que son 12 cucharadas. ¿Cuántas cucharadas quedan en el paquete?', 8, [20, 4], 'Cada quinto son 12 ÷ 3 = 4 cucharadas. Quedan 2 quintos: 2 × 4 = 8.'),
  ], { despues_de: 'prof_r27_entero_desde_una_parte' });

const fraccionRecta = unidad(
  'prof_r27_fracciones_recta', 'fracciones_concepto', 'Las fracciones también son números',
  'En la recta, el tramo de 0 a 1 representa un entero. Lo dividimos en partes iguales para ubicar fracciones. Podemos seguir después del 1: las fracciones no terminan en un entero.',
  'Cuatro saltos de un cuarto llevan de 0 a 1. Seis saltos llegan a 6/4, entre 1 y 2.',
  ['Partimos el tramo de 0 a 1 en cuatro intervalos iguales.', 'Cada intervalo vale 1/4; cuatro intervalos forman 4/4 = 1.', 'Dos intervalos más llegan a 6/4 = 1 y 2/4.'],
  'Contá intervalos iguales desde cero, no la cantidad de marcas.',
  recta(0, 2, 0.25, [{ valor: 0.25, label: '1/4' }, { valor: 1.5, label: '6/4' }]), [
    a('Desde 0 hacemos cuatro saltos de 1/4. ¿A qué número llegamos?', '1', ['1/4', '4'], 'Cuatro cuartos completan un entero: 4/4 = 1.'),
    a('Desde 0 hacemos tres saltos de 1/2. ¿A qué fracción llegamos?', '3/2', ['1/3', '2/3'], 'Cada salto agrega medio. Tres medios son 3/2.'),
    a('¿Dónde queda 1/2 en la recta de 0 a 1?', 'A mitad de camino', ['En el 1', 'Antes del 0'], 'El intervalo se divide en dos partes iguales. Una mitad llega al punto medio.'),
    a('¿Cuál de estos números está a la derecha del 1?', '5/4', ['3/4', '1/4'], '4/4 es 1; 5/4 tiene un cuarto más.'),
    a('El tramo de 0 a 1 se divide en tres intervalos iguales. ¿Qué fracción marca el segundo paso desde 0?', '2/3', ['3/2', '1/3'], 'Dos intervalos de un tercio suman dos tercios.'),
    a('¿Cuántos saltos de 1/4 se necesitan para ir de 0 a 2?', 8, [4, 2], 'Cada entero necesita cuatro saltos. Dos enteros necesitan ocho.'),
    a('Un recorrido mide 2 km. Desde la salida hay una marca cada 1/2 km. ¿Qué distancia indica la tercera marca después de la salida?', '1 y 1/2 km', ['3 km', '1/2 km'], 'Las marcas son 1/2, 1 y 1 y 1/2 km.'),
    a('Dos carritos salen de 0: uno llega a 3/4 m y otro a 1 m. ¿Cuál avanzó más?', 'El que llegó a 1 m', ['El que llegó a 3/4 m', 'Avanzaron lo mismo'], '1 m equivale a 4/4 m, un cuarto más que 3/4 m.'),
  ], { despues_de: 'fr24_enteros' });

const restoInverso = unidad(
  'prof_r27_resto_inverso', 'fracciones_del_resto', 'Lo que queda también es una parte del inicio',
  'Si se usa una parte, el resto completa lo que había al principio. Para volver al inicio, identificamos qué fracción quedó y reconstruimos las partes iguales.',
  'Se usó 1/3 de una bolsa y quedaron 8 fichas. Al principio había 12.',
  ['El entero tiene tres tercios; si usamos uno, quedan dos.', 'Los 8 son esos dos tercios: 8 ÷ 2 = 4 en cada tercio.', 'Tres tercios tienen 3 × 4 = 12 fichas.'],
  'Primero nombrá la fracción que queda; no confundas resto con cantidad inicial.',
  fraccion(2, 3, 'Quedaron dos tercios: 8 fichas'), [
    a('Se usó 1/3 de una bolsa y quedaron 8 fichas. ¿Cuántas había al principio?', 12, [24, 16], 'Quedan 2/3. Un tercio son 8 ÷ 2 = 4. El total es 12.'),
    a('Se regaló la mitad de un paquete y quedaron 7 hojas. ¿Cuántas había al principio?', 14, [7, 21], 'Quedó la otra mitad: 7 + 7 = 14.'),
    a('Se usaron 3/4 de una caja y quedaron 4 tizas. ¿Cuántas había al principio?', 16, [12, 8], 'Quedó 1/4, que son 4 tizas. Los cuatro cuartos suman 16.'),
    a('Se comió 1/4 de una bandeja y quedaron 9 galletitas. ¿Cuántas había al principio?', 12, [36, 27], 'Quedan 3/4. Cada cuarto tiene 9 ÷ 3 = 3. Había 12.'),
    a('Se usaron 2/5 de un paquete y quedaron 12 tarjetas. ¿Cuántas traía?', 20, [30, 24], 'Quedan 3/5. Un quinto vale 12 ÷ 3 = 4. Cinco quintos son 20.'),
    a('Se usó 1/5 de una caja y quedaron 16 bolitas. ¿Cuántas había?', 20, [80, 12], 'Quedan 4/5: 16 ÷ 4 = 4 por quinto. El total es 20.'),
    a('Un tanque perdió 1/4 de su agua y ahora tiene 18 litros. ¿Cuántos litros perdió?', '6 litros', ['24 litros', '12 litros'], 'Quedan 3/4: cada cuarto vale 18 ÷ 3 = 6 litros. Se perdió un cuarto.'),
    a('De una cinta se cortaron 2/3. El trozo que quedó mide 5 cm. ¿Cuánto medía la cinta antes de cortarla?', '15 cm', ['10 cm', '5 cm'], 'Quedó un tercio de 5 cm. Tres tercios miden 15 cm.'),
  ], { despues_de: 'mat_resto_nuevo_total' });

const dosRestos = unidad(
  'prof_r27_dos_restos_inversos', 'fracciones_del_resto', 'Volver hacia atrás, un consumo por vez',
  'Cuando se usa una parte y luego una parte de lo que quedó, cada paso tiene su propio entero. Para recuperar el inicio, deshacemos primero el último consumo y después el anterior.',
  'Se usó la mitad de unas fichas y luego la mitad del resto. Quedaron 3: al principio había 12.',
  ['El último 3 es la mitad del resto anterior: antes del segundo uso había 6.', 'Esas 6 eran la mitad del inicio: al principio había 12.', 'Revisamos hacia adelante: 12 → 6 → 3.'],
  'Empezá por el final y reconstruí el paso anterior antes de seguir.',
  { tipo: 'fracciones', titulo: 'Cada fila muestra el mismo total inicial', barras: [
    { label: 'Inicio', partes: ['p', 'p', 'p', 'p'] },
    { label: 'Primer resto', partes: ['p', 'p', 'v', 'v'] },
    { label: 'Final: 3', partes: ['p', 'v', 'v', 'v'] },
  ] }, [
    a('Se usó la mitad de una caja y después la mitad de lo que quedaba. Al final hay 3 fichas. ¿Cuántas había al principio?', 12, [6, 9], 'Antes del segundo uso había 3 × 2 = 6. Antes del primero, 6 × 2 = 12.'),
    a('Se regaló la mitad de unas hojas y luego la mitad del resto. Quedaron 5. ¿Cuántas había al principio?', 20, [10, 15], 'Volvemos: 5 × 2 = 10; 10 × 2 = 20.'),
    a('Se comió 1/3 de unas galletitas y luego la mitad del resto. Quedaron 4. ¿Cuántas había al principio?', 12, [8, 24], 'Antes del segundo consumo había 8. Esos 8 son 2/3 del inicio: 8 ÷ 2 × 3 = 12.'),
    a('Se usó la mitad de unas fichas y luego 2/3 del resto. Quedaron 2. ¿Cuántas había al principio?', 12, [6, 8], 'Quedó 1/3 del resto anterior: 2 × 3 = 6. Esas 6 eran la mitad del inicio: 12.'),
    a('Se usó 1/4 de unas tizas y luego 1/3 del resto. Quedaron 6. ¿Cuántas había al principio?', 12, [9, 24], '6 son 2/3 del resto: 6 ÷ 2 × 3 = 9. Esas 9 son 3/4 del inicio: 9 ÷ 3 × 4 = 12.'),
    a('Se usó 1/3 de unas tarjetas y luego 3/4 del resto. Quedaron 2. ¿Cuántas había al principio?', 12, [8, 24], 'Antes del último consumo había 2 × 4 = 8. Son 2/3 del inicio: 8 ÷ 2 × 3 = 12.'),
    a('Una cinta perdió la mitad de su largo. Después se cortó la mitad de lo que quedaba. El último trozo mide 7 cm. ¿Cuánto se cortó la primera vez?', '14 cm', ['7 cm', '28 cm'], 'Volvemos de 7 a 14 y de 14 a 28 cm. La primera vez se cortó la mitad de 28: 14 cm.'),
    a('De una bolsa se usó 1/3 y después 3/4 del resto. Al final quedaron 5 caramelos. ¿Cuántos se usaron en el segundo paso?', 15, [20, 30], 'Antes del segundo paso había 5 × 4 = 20. Se usaron tres cuartos de 20: 15. El primer consumo no cambia este cálculo.'),
  ], { despues_de: 'prof_r27_resto_inverso' });

const decimalesPosicion = unidad(
  'prof_r27_decimal_posicion', 'decimales_conversion', 'La coma ayuda a contar partes pequeñas',
  'Dividí un entero en diez partes iguales: cada una es un décimo. Si dividís cada décimo otra vez en diez, cada parte nueva es un centésimo. Diez centésimos ocupan lo mismo que un décimo.',
  '0,3 y 0,30 nombran la misma cantidad: tres décimos o treinta centésimos.',
  ['El tramo de 0 a 1 es nuestro entero.', 'Tres de sus diez intervalos llegan a 0,3.', 'Cada décimo contiene diez centésimos: tres décimos contienen treinta. Por eso 0,3 = 0,30.'],
  'Decí qué cuenta cada lugar: décimos primero, centésimos después.',
  recta(0, 1, 0.1, [{ valor: 0.3, label: '0,3 = 0,30' }]), [
    a('¿Qué cantidad es igual a 0,3?', '0,30', ['0,03', '3,0'], 'Tres décimos son treinta centésimos. Agregar ese cero final no cambia la cantidad.'),
    a('En 0,42, ¿qué representa el 4?', '4 décimos', ['4 centésimos', '4 enteros'], 'El primer lugar después de la coma cuenta décimos.'),
    a('En 0,42, ¿qué representa el 2?', '2 centésimos', ['2 décimos', '2 enteros'], 'El segundo lugar después de la coma cuenta centésimos.'),
    a('¿Cuántos centésimos forman 1 décimo?', 10, [1, 100], 'Dividimos un décimo en diez partes iguales. Cada parte es un centésimo.'),
    a('¿Cuál cantidad es mayor?', '0,5', ['0,05', '0,15'], '0,5 es medio entero: cincuenta centésimos. Es mayor que cinco o quince centésimos.'),
    a('¿Cómo escribimos 2 enteros y 7 centésimos?', '2,07', ['2,7', '0,27'], 'Hay 2 enteros, 0 décimos y 7 centésimos: 2,07.'),
    a('Dos cintas miden 0,4 m y 0,40 m. ¿Qué ocurre con sus largos?', 'Son iguales', ['La segunda es más larga', 'La primera es más larga'], 'Cuatro décimos de metro y cuarenta centésimos de metro son la misma longitud.'),
    a('Un marcador avanza desde 0 hasta 0,1 y luego otro intervalo igual. ¿A qué número llega?', '0,2', ['0,02', '1,1'], 'Cada intervalo es un décimo. Dos intervalos son dos décimos: 0,2.', recta(0, 1, 0.1)),
  ], { antes_de: 'prof_dec_milesimos' });

const periodicos = unidad(
  'prof_r27_decimales_periodicos', 'decimales_conversion', 'Cuando una división sigue repitiendo',
  'Algunas divisiones terminan; otras siguen sin terminar. Si una cifra o un grupo se repite siempre, el decimal es periódico. Los puntos suspensivos indican que continúa. El período es el bloque que se repite.',
  '1 ÷ 3 = 0,333… El 3 se repite y es el período.',
  ['Un entero no alcanza para dar uno entero a cada persona: escribimos 0 y la coma.', 'Con diez décimos damos 3 a cada una; sobra 1 décimo. Al cambiarlo por centésimos vuelve a pasar lo mismo.', 'Seguimos obteniendo 3: 0,333… No es exactamente 0,3; la división continúa.'],
  'Buscá el bloque que se repite y distinguí una escritura exacta de una aproximación.',
  recta(0, 1, 0.1, [{ valor: 1 / 3, label: '1/3 = 0,333…' }]), [
    a('En 0,333… el 3 sigue repitiéndose. ¿Cuál es el período?', '3', ['0', '33,3'], 'La cifra 3 forma el bloque que se repite sin terminar.'),
    a('En 0,272727… se repite 27. ¿Cuál es el período?', '27', ['2', '7'], 'Las cifras vuelven en parejas: 27, 27, 27.'),
    a('¿Cuál de estas escrituras indica un decimal que continúa repitiendo?', '0,666…', ['0,66', '0,6'], 'Los puntos señalan que los seis continúan sin terminar.'),
    a('Si 1 ÷ 3 = 0,333…, ¿0,3 es exactamente igual a 1/3?', 'No; le faltan las cifras que siguen', ['Sí; alcanza con el primer 3', 'Sí; todos los decimales terminan'], '0,3 es una aproximación por debajo. 0,333… tiene más cifras y no termina.'),
    a('La división 1 ÷ 4 da 0,25 y termina. ¿Cómo es este decimal?', 'Finito', ['Periódico', 'Un número entero'], 'Solo se necesitan dos cifras después de la coma; no sigue un bloque repetido.'),
    a('En 0,1666… primero aparece 1 y luego se repite 6. ¿Cuál es el período?', '6', ['16', '1'], 'El 1 aparece una sola vez; el 6 continúa repitiéndose.'),
    a('Una calculadora muestra 0,142857142857… y sabemos que 142857 se repite siempre. ¿Cuántas cifras tiene ese período?', 6, [3, 12], 'El bloque 142857 tiene seis cifras; se vuelve a escribir el mismo bloque.'),
    a('Tres personas reciben exactamente 1/3 de una cinta cada una. Si tomamos solo 0,3 de cinta para cada una, ¿se usa toda la cinta?', 'No; se usa 0,9', ['Sí; se usa 1', 'Se usa 3'], '0,3 + 0,3 + 0,3 = 0,9. Falta 0,1: 0,3 no es exactamente 1/3.'),
  ], { despues_de: 'prof_dec_desde_fraccion' });

const exponentes = unidad(
  'prof_r27_exponentes_uno_cero', 'potenciacion_y_raiz_cuadrada', 'Una potencia también puede tener exponente uno',
  'El exponente indica cuántos factores iguales usamos: 3² = 3 × 3. Con un solo factor queda 3¹ = 3. Al bajar otro paso en las potencias de una base distinta de cero, dividimos por esa base y llegamos a 3⁰ = 1. Aquí no trabajamos 0⁰.',
  'Con base 3: 3³ = 27, 3² = 9, 3¹ = 3 y 3⁰ = 1.',
  ['Tres factores: 3 × 3 × 3 = 27.', 'Al quitar un factor dividimos por 3: 27 → 9 → 3.', 'Un paso más: 3 ÷ 3 = 1. Por eso 3⁰ = 1.'],
  'No multipliques base por exponente. Para exponente cero, comprobá que la base no sea cero.',
  { tipo: 'colecciones', grupos: [{ label: '3⁰ = 1', cantidad: 1 }, { label: '3¹ = 3', cantidad: 3 }, { label: '3² = 9', cantidad: 9 }] }, [
    a('¿Cuánto vale 3¹?', 3, [1, 0], 'Un solo factor 3 vale 3.'),
    a('¿Cuánto vale 7¹?', 7, [1, 0], 'Con exponente uno queda la misma base: 7.'),
    a('¿Cuánto vale 5⁰?', 1, [0, 5], 'La base 5 no es cero. Toda base no nula elevada a cero vale 1.'),
    a('¿Cuánto vale 10⁰?', 1, [0, 10], '10¹ es 10; al dividir por 10 llegamos a 10⁰ = 1.'),
    a('¿Cuánto vale 2²?', 4, [2, 1], 'Son dos factores 2: 2 × 2 = 4.'),
    a('¿Qué resultado sigue: 4³ = 64, 4² = 16, 4¹ = 4, 4⁰ = ...?', 1, [0, 4], 'Cada paso divide por 4. El último es 4 ÷ 4 = 1.'),
    a('Una tarjeta dice 8⁰ y otra 2¹. ¿Cuál tiene el resultado mayor?', '2¹', ['8⁰', 'Son iguales'], '8⁰ = 1 y 2¹ = 2. Dos es mayor que uno.'),
    a('Un contador muestra 10³ = 1000. Cada paso divide por 10. ¿Qué muestra después de tres pasos?', 1, [10, 100], '1000 → 100 → 10 → 1; llegamos a 10⁰.'),
  ], { despues_de: 'mat_pot_repetir' });

const cubos = unidad(
  'prof_r27_cubo_capas', 'potenciacion_y_raiz_cuadrada', 'Un cubo tiene filas, columnas y capas',
  'Un cuadrado puede tener filas de casilleros. Para armar un cubo con cubitos, ponemos varias capas iguales una sobre otra. En un cubo de lado 2 hay dos filas de dos cubitos en cada una de sus dos capas.',
  'Cada capa tiene 2 × 2 = 4 cubitos. Dos capas tienen 2 × 2 × 2 = 8: se escribe 2³.',
  ['Contamos una capa: dos filas de dos, en total cuatro.', 'Armamos otra capa igual: otros cuatro.', 'Las dos capas reúnen ocho cubitos. El 3 indica tres factores, no multiplicar por tres.'],
  'Primero contá una capa; después multiplicá por la cantidad de capas.',
  { tipo: 'colecciones', grupos: [{ label: 'Capa 1', cantidad: 4 }, { label: 'Capa 2', cantidad: 4 }] }, [
    a('Un cubo tiene dos capas. Cada capa tiene 2 filas de 2 cubitos. ¿Cuántos cubitos hay?', 8, [6, 4], 'Una capa tiene 4. Dos capas tienen 4 × 2 = 8.'),
    a('¿Qué cuenta representa 3³?', '3 × 3 × 3', ['3 × 3', '3 + 3 + 3'], 'El exponente tres indica tres factores iguales a 3.'),
    a('Un cubo tiene 3 capas de 9 cubitos. ¿Cuántos cubitos hay?', 27, [12, 18], '3 × 9 = 27; cada capa es de 3 × 3.'),
    a('¿Cuánto vale 1³?', 1, [3, 0], '1 × 1 × 1 = 1.'),
    a('Un cubo tiene 4 capas de 16 cubitos. ¿Cuántos hay en total?', 64, [20, 48], '4 × 16 = 64, lo mismo que 4 × 4 × 4.'),
    a('Un cubo tiene 5 capas de 25 cubitos. ¿Cuántos tiene?', 125, [30, 100], '5 × 25 = 125; es 5³.'),
    a('Una caja cúbica se arma con dos capas de 4 cubitos. Se saca una capa completa. ¿Cuántos cubitos quedan?', 4, [8, 2], 'Había 8. Quitamos una capa de 4 y queda otra capa de 4.'),
    a('Una construcción tiene 3 capas de 4 cubitos: cada capa mide 2 por 2. ¿Tiene la misma forma que un cubo de lado 2?', 'No; tiene una capa de más', ['Sí; cualquier pila es un cubo', 'Sí; ambas tienen 8 cubitos'], 'El cubo de lado 2 tiene 2 capas de 4. Esta construcción tiene 3: es más alta y reúne 12.'),
  ], { despues_de: 'prof_r27_exponentes_uno_cero' });

const ordenIgual = unidad(
  'prof_r27_jerarquia_igual', 'jerarquia_operaciones', 'Multiplicar y dividir tienen el mismo turno',
  'Primero resolvemos los paréntesis y las potencias. Después multiplicaciones y divisiones, de izquierda a derecha. Por último sumas y restas, también de izquierda a derecha. Dividir no espera a que terminen todas las multiplicaciones.',
  '12 ÷ 3 × 2 = 8: primero 12 ÷ 3 = 4; después 4 × 2 = 8.',
  ['No hay paréntesis ni potencias.', 'La primera operación, leyendo desde la izquierda, es 12 ÷ 3.', 'Reemplazamos por 4 y seguimos con 4 × 2.'],
  'Entre operaciones del mismo turno, empezá por la que aparece a la izquierda.',
  { tipo: 'colecciones', grupos: [{ label: '12 ÷ 3', cantidad: 4 }, { label: '4 × 2', cantidad: 8 }] }, [
    a('Resolvé 12 ÷ 3 × 2.', 8, [2, 12], '12 ÷ 3 = 4. Luego 4 × 2 = 8.'),
    a('Resolvé 18 ÷ 3 × 2.', 12, [3, 9], '18 ÷ 3 = 6; 6 × 2 = 12.'),
    a('Resolvé 16 ÷ 4 ÷ 2.', 2, [8, 4], '16 ÷ 4 = 4; 4 ÷ 2 = 2.'),
    a('Resolvé 10 − 3 + 2.', 9, [5, 7], 'Suma y resta comparten turno. 10 − 3 = 7; 7 + 2 = 9.'),
    a('Resolvé 5 + 12 ÷ 3 × 2.', 13, [7, 17], 'Primero 12 ÷ 3 × 2 = 8. Después 5 + 8 = 13.'),
    a('Resolvé 2² + 8 ÷ 2.', 8, [6, 12], '2² = 4 y 8 ÷ 2 = 4. Sumamos 4 + 4 = 8.'),
    a('Se reparten 24 tarjetas en 4 paquetes iguales y se entregan 2 paquetes. ¿Cuántas tarjetas se entregan?', 12, [3, 48], 'Cada paquete tiene 24 ÷ 4 = 6. Dos paquetes tienen 6 × 2 = 12.'),
    a('Hay 15 fichas, se retiran 6 y se agregan 3. ¿Qué resultado corresponde a 15 − 6 + 3?', 12, [6, 9], 'Primero quedan 15 − 6 = 9. Luego agregamos 3 y llegamos a 12.'),
  ], { despues_de: 'mat_jer_parentesis' });

const colocarParentesis = unidad(
  'prof_r27_colocar_parentesis', 'jerarquia_operaciones', 'Los paréntesis pueden cambiar el resultado',
  'Un paréntesis señala qué resolver primero. Para colocarlo no alcanza con adivinar: calculamos qué ocurre al agrupar cada parte. Conservamos los números y operaciones en el mismo orden.',
  '2 + 3 × 4 da 14. Si queremos 20, escribimos (2 + 3) × 4.',
  ['Sin paréntesis, 3 × 4 = 12 y 2 + 12 = 14.', 'Si agrupamos 2 + 3, primero obtenemos 5.', 'Después 5 × 4 = 20. No cambiamos números ni operaciones.'],
  'Calculá primero lo que quedó dentro; comprobá después toda la expresión.',
  { tipo: 'arreglo', filas: 5, columnas: 4, separar: 2 }, [
    a('¿Cuál expresión usa 2 + 3 × 4 en ese orden y da 20?', '(2 + 3) × 4', ['2 + (3 × 4)', '(2 + 3 × 4)'], 'Primero 2 + 3 = 5; después 5 × 4 = 20.'),
    a('¿Dónde ponemos un par de paréntesis en 12 − 4 ÷ 2 para obtener 4?', '(12 − 4) ÷ 2', ['12 − (4 ÷ 2)', '(12 − 4 ÷ 2)'], '12 − 4 = 8; luego 8 ÷ 2 = 4.'),
    a('¿Cuál expresión da 18?', '(1 + 5) × 3', ['1 + (5 × 3)', '(1 + 5 × 3)'], '1 + 5 = 6; 6 × 3 = 18.'),
    a('¿Cuál expresión da 3?', '18 ÷ (3 × 2)', ['(18 ÷ 3) × 2', '(18 ÷ 3 × 2)'], 'Primero 3 × 2 = 6; después 18 ÷ 6 = 3.'),
    a('¿Cuál expresión da 2?', '10 − (5 + 3)', ['(10 − 5) + 3', '(10 − 5 + 3)'], 'Primero 5 + 3 = 8; después 10 − 8 = 2.'),
    a('¿Cuál expresión da 16?', '2 × (3 + 5)', ['(2 × 3) + 5', '(2 × 3 + 5)'], 'Primero 3 + 5 = 8; después 2 × 8 = 16.'),
    a('Hay 3 bolsas, cada una con 2 fichas rojas y 4 azules. ¿Qué cuenta representa el total?', '3 × (2 + 4)', ['3 × 2 + 4', '3 + (2 × 4)'], 'Cada bolsa reúne 2 + 4 = 6; son tres bolsas de 6, en total 18.'),
    a('Una entrada y un jugo cuestan 4 y 2 monedas. Se compran ambos para 5 personas. ¿Qué cuenta representa el gasto?', '(4 + 2) × 5', ['4 + (2 × 5)', '(4 × 2) + 5'], 'Cada persona necesita 4 + 2 = 6 monedas. Cinco personas necesitan 6 × 5 = 30.'),
  ], { despues_de: 'prof_r27_jerarquia_igual' });

const lineas = unidad(
  'prof_r27_recta_segmento', 'geometria_angulos', '¿Tiene principio o final?',
  'Un trazo entre dos puntos tiene dos extremos: es un segmento. Una semirrecta empieza en un punto y sigue sin terminar en un sentido. Una recta continúa en ambos sentidos. En el dibujo las flechas indican que continúa, aunque el papel se termine.',
  'El tramo entre A y B es un segmento: podemos medirlo porque tiene dos extremos.',
  ['Ubicamos A y B: son los extremos.', 'El trazo llega de A a B y termina en ellos.', 'Una flecha cambiaría el significado: indicaría que el trazo sigue.'],
  'Contá extremos y mirá las flechas, no solo cuánto ocupa el dibujo.',
  { tipo: 'rectas', clase: 'segmento' }, [
    a('Un trazo recto empieza en A y termina en B. ¿Qué representa?', 'Un segmento', ['Una recta', 'Una semirrecta'], 'Tiene dos extremos: A y B.', { tipo: 'rectas', clase: 'segmento' }),
    a('Un trazo recto tiene un origen y continúa sin terminar hacia un lado. ¿Qué representa?', 'Una semirrecta', ['Un segmento', 'Una recta'], 'Tiene un origen y continúa en un solo sentido.', { tipo: 'rectas', clase: 'semirrecta' }),
    a('Un trazo recto continúa sin terminar en ambos sentidos. ¿Qué representa?', 'Una recta', ['Un segmento', 'Una semirrecta'], 'No tiene extremos; las dos flechas muestran que continúa.', { tipo: 'rectas', clase: 'recta' }),
    a('¿Cuántos extremos tiene un segmento?', 2, [1, 0], 'Empieza en un punto y termina en otro.'),
    a('En el dibujo de una recta, ¿qué significa una flecha en cada punta?', 'Continúa en los dos sentidos', ['Tiene dos extremos', 'Mide dos centímetros'], 'Las flechas señalan continuidad, no una medida.'),
    a('¿Cuál de estas figuras tiene una longitud que podemos medir entre sus extremos?', 'Un segmento', ['Una recta completa', 'Una semirrecta completa'], 'El segmento está limitado por sus dos extremos.'),
    a('Para dibujar el lado de un rectángulo entre dos esquinas, ¿qué figura trazamos?', 'Un segmento', ['Una recta completa', 'Una semirrecta sin final'], 'El lado va desde una esquina a otra y tiene dos extremos.'),
    a('Una consigna pide marcar O y dibujar desde O un trazo recto que siga sin terminar hacia la derecha. ¿Dónde va la flecha?', 'Solo del lado derecho', ['En ambos lados', 'No lleva ninguna'], 'O es el origen. El otro lado continúa: representa una semirrecta.'),
  ], { antes_de: 'prof_geo_elementos' });

const paralelismo = unidad(
  'prof_r27_paralelas_secantes', 'geometria_angulos', 'Rectas que se cruzan y rectas que no',
  'En un mismo plano, dos rectas distintas son paralelas si no se cruzan, por más que las prolonguemos. Son secantes si se cruzan. Si forman cuatro ángulos rectos de 90°, además son perpendiculares.',
  'Los dos renglones rectos de un cuaderno son paralelos: mantienen la separación.',
  ['Imaginamos que los renglones siguen más allá de la hoja.', 'No se encuentran: son paralelos.', 'Dos rectas que se cruzan son secantes; solo si forman ángulos de 90° son perpendiculares.'],
  'Imaginá las rectas prolongadas; un dibujo corto puede ocultar el cruce.',
  { tipo: 'rectas', clase: 'paralelas' }, [
    a('Dos rectas distintas de un mismo plano nunca se cruzan. ¿Cómo se llaman?', 'Paralelas', ['Secantes', 'Perpendiculares'], 'No se encuentran aunque las prolonguemos.', { tipo: 'rectas', clase: 'paralelas' }),
    a('Dos rectas se cruzan en un punto. ¿Cómo se llaman?', 'Secantes', ['Paralelas', 'Segmentos iguales'], 'Tienen un punto común.', { tipo: 'rectas', clase: 'secantes' }),
    a('Dos rectas se cruzan formando cuatro ángulos de 90°. ¿Cómo se llaman?', 'Perpendiculares', ['Paralelas', 'Circunferencias'], 'Son secantes y todos los ángulos del cruce son rectos.'),
    a('¿Todas las rectas secantes son perpendiculares?', 'No; deben formar ángulos de 90°', ['Sí; cualquier cruce mide 90°', 'Sí; todas son paralelas'], 'Pueden cruzarse de forma oblicua. Perpendiculares exige ángulos rectos.'),
    a('Los dos lados largos opuestos de un rectángulo, al prolongarlos, ¿qué forman?', 'Rectas paralelas', ['Rectas perpendiculares', 'Una sola recta'], 'Son lados opuestos que conservan su separación.'),
    a('Un lado horizontal y otro vertical de un rectángulo se encuentran en una esquina. ¿Qué relación tienen?', 'Son perpendiculares', ['Son paralelos', 'No se encuentran'], 'En la esquina forman un ángulo recto de 90°.'),
    a('Dos caminos rectos dibujados parecen separados, pero sus prolongaciones se encuentran. ¿Qué representan sus líneas?', 'Rectas secantes', ['Rectas paralelas', 'No puede saberse aunque se vea el cruce'], 'El cruce de las prolongaciones basta: las rectas son secantes.'),
    a('Para dibujar dos vías rectas paralelas sobre una hoja, ¿qué debe conservarse?', 'La separación entre las rectas', ['Un punto donde se crucen', 'Cuatro ángulos de 90° entre ellas'], 'Las paralelas mantienen la separación y no se encuentran.'),
  ], { despues_de: 'prof_geo_perpendiculares' });

const cuadrilateros = unidad(
  'prof_r27_familias_cuadrilateros', 'geometria_cuadrilateros_circunferencia', 'Mirar pares de lados antes de nombrar',
  'Un cuadrilátero tiene cuatro lados. En el cuadernillo se agrupan por sus lados paralelos: dos pares, paralelogramo; un solo par, trapecio; ningún par, trapezoide. Un rectángulo tiene cuatro ángulos rectos; un rombo, cuatro lados iguales. El cuadrado cumple ambas condiciones. Empezamos por reconocer los pares paralelos.',
  'En un rectángulo, arriba y abajo son paralelos. También izquierda y derecha: hay dos pares.',
  ['Buscamos lados opuestos, que no comparten una esquina.', 'El primer par conserva la separación; el segundo también.', 'Tiene dos pares paralelos: pertenece a los paralelogramos.'],
  'Un par tiene dos lados. No cuentes cada lado como un par distinto.',
  rectangulo(6, 3, { vertices: ['A', 'B', 'C', 'D'] }), [
    a('Un cuadrilátero tiene dos pares de lados opuestos paralelos. ¿A qué grupo pertenece?', 'Paralelogramos', ['Trapecios', 'Trapezoides'], 'Dos pares de lados paralelos definen a los paralelogramos.'),
    a('Según la clasificación del cuadernillo, un cuadrilátero con un solo par de lados paralelos es...', 'Trapecio', ['Paralelogramo', 'Trapezoide'], 'El trapecio tiene exactamente un par de lados paralelos.'),
    a('Según la clasificación del cuadernillo, un cuadrilátero sin lados paralelos es...', 'Trapezoide', ['Trapecio', 'Paralelogramo'], 'No tiene ningún par de lados paralelos.'),
    a('¿Cuántos pares de lados paralelos tiene un rectángulo?', 2, [1, 4], 'Arriba y abajo forman un par; izquierda y derecha forman otro.'),
    a('Un cuadrado tiene cuatro ángulos rectos. ¿También es un rectángulo?', 'Sí', ['No; tener lados iguales lo impide', 'Solo si se estira'], 'Un rectángulo es un cuadrilátero con cuatro ángulos rectos. El cuadrado cumple esa condición.'),
    a('Un cuadrado tiene sus cuatro lados iguales. ¿También es un rombo?', 'Sí', ['No; un rombo nunca tiene ángulos rectos', 'Solo si se gira'], 'El rombo tiene cuatro lados iguales. El cuadrado cumple esa condición; girarlo no cambia la figura.'),
    a('Una ventana rectangular se gira un poco en un dibujo. ¿Deja de ser un paralelogramo?', 'No; conserva sus dos pares paralelos', ['Sí; ahora es un trapecio', 'Sí; depende de estar derecha'], 'La orientación no cambia las relaciones entre sus lados.'),
    a('Un cartel de cuatro lados tiene su borde superior paralelo al inferior; los otros dos lados se cruzarían al prolongarlos. ¿Cómo se clasifica según el cuadernillo?', 'Trapecio', ['Paralelogramo', 'Trapezoide'], 'Tiene un solo par paralelo: arriba y abajo.'),
  ], { despues_de: 'mat_cuad_lados' });

const romboideLocal = unidad(
  'prof_r27_romboide_diagonales', 'geometria_cuadrilateros_circunferencia', 'Unir esquinas que no son vecinas',
  'Una diagonal une vértices que no están uno al lado del otro. Un cuadrilátero tiene dos diagonales. El cuadernillo llama romboide a un trapezoide con dos pares de lados consecutivos iguales: una forma de cometa. Usamos aquí esa convención del colegio.',
  'En el romboide ABCD, AB = AD y BC = CD. AC y BD son sus diagonales.',
  ['AB y AD se encuentran en A; BC y CD se encuentran en C: son pares de lados consecutivos.', 'A y C no son vecinos: AC es una diagonal.', 'B y D tampoco son vecinos: BD es la otra. Un lado como AB no es diagonal.'],
  'Una diagonal va entre esquinas no vecinas. Consecutivos significa que comparten una esquina.',
  poligono([[0, 3], [-2, 0], [0, -1], [2, 0]], { vertices: ['A', 'B', 'C', 'D'], diagonales: [[0, 2], [1, 3]], nota: 'Romboide: convención del cuadernillo' }), [
    a('En el cuadrilátero ABCD, nombrado alrededor del borde, ¿cuál es una diagonal?', 'AC', ['AB', 'BC'], 'A y C no son vecinos; AB y BC son lados.'),
    a('En el cuadrilátero ABCD, nombrado alrededor del borde, ¿cuál es la otra diagonal además de AC?', 'BD', ['AD', 'CD'], 'B y D son las otras esquinas no vecinas.'),
    a('¿Cuántas diagonales tiene un cuadrilátero?', 2, [4, 1], 'Una une el primer y tercer vértice; otra el segundo y cuarto.'),
    a('En ABCD, ¿qué lados son consecutivos porque se encuentran en A?', 'AB y AD', ['AB y CD', 'AC y BD'], 'AB y AD comparten la esquina A.'),
    a('Según el cuadernillo, un trapezoide con dos pares de lados consecutivos iguales se llama...', 'Romboide', ['Rectángulo', 'Trapecio'], 'Es la convención usada en el material del colegio, representada con forma de cometa.'),
    a('Una línea cruza el interior de un cuadrilátero pero no une dos vértices. ¿Es una diagonal?', 'No', ['Sí; cualquier línea interior lo es', 'Sí; si es larga'], 'Para ser diagonal debe unir dos vértices no vecinos.'),
    a('Querés reforzar un marco rectangular con una varilla desde una esquina hasta la esquina opuesta. ¿Qué representa la varilla?', 'Una diagonal', ['Un lado', 'Una circunferencia'], 'Une esquinas no vecinas a través del interior.'),
    a('Un cometa de cuatro lados tiene AB = AD = 5 cm y BC = CD = 3 cm. ¿Cuál es su perímetro?', '16 cm', ['8 cm', '15 cm'], 'Sumamos los cuatro lados: 5 + 5 + 3 + 3 = 16 cm. Las diagonales no se suman al borde.'),
  ], { despues_de: 'prof_r27_familias_cuadrilateros' });

const semicircunferencia = unidad(
  'prof_r27_semicircunferencia', 'perimetros_simples', 'Medio arco y el camino de vuelta',
  'La circunferencia es el borde redondo completo. Su mitad es una semicircunferencia. Si vamos por ese medio arco y volvemos por el segmento que une sus extremos, también recorremos el diámetro. No son el mismo tramo.',
  'Un recorrido tiene un medio arco de diámetro 10 m y vuelve por ese diámetro. Usando π = 3,14, mide 25,7 m.',
  ['El borde redondo completo mediría 3,14 × 10 = 31,4 m.', 'El medio arco mide 31,4 ÷ 2 = 15,7 m.', 'La vuelta recta mide 10 m. Total: 15,7 + 10 = 25,7 m.'],
  'Marcá qué tramos se recorren: medio arco, diámetro o ambos.',
  { tipo: 'circunferencia', diametro: 10, semicirculo: true, incluir_diametro: true, unidad: 'm' }, [
    a('Con π = 3,14, ¿cuánto mide solo el medio arco de una circunferencia de diámetro 10 cm?', '15,7 cm', ['31,4 cm', '25,7 cm'], 'Circunferencia: 3,14 × 10 = 31,4 cm. La mitad es 15,7 cm.'),
    a('Con π = 3,14, un medio arco de diámetro 10 cm más su diámetro mide...', '25,7 cm', ['15,7 cm', '31,4 cm'], 'Medio arco: 15,7 cm. Sumamos la vuelta recta de 10 cm: 25,7 cm.'),
    a('Con π = 3,14, ¿cuánto mide solo el medio arco de diámetro 20 m?', '31,4 m', ['62,8 m', '51,4 m'], '3,14 × 20 ÷ 2 = 31,4 m.'),
    a('Un medio arco mide 12,56 cm y el diámetro mide 8 cm. ¿Cuánto mide el borde formado por ambos?', '20,56 cm', ['12,56 cm', '25,12 cm'], 'Se recorren dos tramos: 12,56 + 8 = 20,56 cm.'),
    a('Con π = 3,14, un medio arco tiene radio 3 cm. ¿Cuánto mide solo ese arco?', '9,42 cm', ['18,84 cm', '4,71 cm'], 'Diámetro: 2 × 3 = 6 cm. Medio arco: 3,14 × 6 ÷ 2 = 9,42 cm.'),
    a('Un recorrido cerrado consta de un medio arco de 15,7 m y un tramo recto de 10 m. ¿Cuánto se recorre en dos vueltas?', '51,4 m', ['25,7 m', '31,4 m'], 'Una vuelta: 15,7 + 10 = 25,7 m. Dos: 25,7 × 2 = 51,4 m.'),
    a('Se coloca cinta únicamente en el borde curvo de una ventana semicircular de diámetro 4 m. Con π = 3,14, ¿cuánta cinta se necesita?', '6,28 m', ['10,28 m', '12,56 m'], 'Solo se cubre medio arco: 3,14 × 4 ÷ 2 = 6,28 m. No se suma la base recta.'),
    a('Un sendero recorre un medio arco de 31,4 m y regresa por una recta de 20 m. Ana camina tres vueltas. ¿Cuántos metros recorre?', '154,2 m', ['94,2 m', '51,4 m'], 'Una vuelta mide 31,4 + 20 = 51,4 m. Tres vueltas: 51,4 × 3 = 154,2 m.'),
  ], { despues_de: 'mat_per_circunferencia' });

const ladoDesdePerimetro = unidad(
  'prof_r27_lado_desde_perimetro', 'perimetros_compuestos', 'El perímetro ayuda a encontrar un lado',
  'El perímetro suma todo el borde. Si falta un lado, podemos sumar los conocidos y quitar esa suma del total. En un rectángulo hay dos lados de cada medida: el lado faltante aparece dos veces.',
  'Un rectángulo tiene perímetro 18 cm y dos lados de 5 cm. Los otros dos miden 4 cm cada uno.',
  ['Los dos lados conocidos suman 5 + 5 = 10 cm.', 'Quedan 18 − 10 = 8 cm para los otros dos lados.', 'Como esos dos lados son iguales, cada uno mide 8 ÷ 2 = 4 cm.'],
  'Preguntate si lo que falta corresponde a un lado o a dos lados iguales.',
  rectangulo(5, 4, { lados: ['5 cm', '?', '5 cm', '?'], nota: 'Perímetro: 18 cm' }), [
    a('Un rectángulo tiene perímetro 18 cm y un lado de 5 cm. ¿Cuánto mide el lado vecino?', '4 cm', ['8 cm', '13 cm'], 'Los dos lados de 5 suman 10. Quedan 8 para dos lados iguales: 4 cada uno.'),
    a('Un triángulo tiene perímetro 15 cm. Dos lados miden 4 y 5 cm. ¿Cuánto mide el tercero?', '6 cm', ['9 cm', '10 cm'], 'Los conocidos suman 9. El tercero mide 15 − 9 = 6 cm.'),
    a('Un rectángulo tiene perímetro 24 cm y un lado de 8 cm. ¿Cuánto mide el lado vecino?', '4 cm', ['8 cm', '16 cm'], 'Dos lados de 8 suman 16. Quedan 8 para dos lados: 4 cada uno.'),
    a('Un cuadrado tiene perímetro 28 cm. ¿Cuánto mide cada lado?', '7 cm', ['14 cm', '4 cm'], 'Son cuatro lados iguales: 28 ÷ 4 = 7 cm.'),
    a('Un rectángulo tiene perímetro 30 cm y un lado de 9 cm. ¿Cuánto mide el lado vecino?', '6 cm', ['12 cm', '21 cm'], '30 − 2 × 9 = 12 cm entre los dos lados restantes. Cada uno mide 6 cm.'),
    a('Un triángulo isósceles tiene perímetro 20 cm y su base mide 6 cm. ¿Cuánto mide cada uno de los otros dos lados iguales?', '7 cm', ['14 cm', '10 cm'], 'Quitamos la base: 20 − 6 = 14. Los dos lados iguales miden 14 ÷ 2 = 7 cm.'),
    a('Una huerta rectangular tiene 28 m de cerco y dos lados de 10 m cada uno. Se quiere cruzar la huerta por el lado más corto. ¿Cuánto mide ese lado?', '4 m', ['8 m', '18 m'], 'Los lados largos usan 20 m. Quedan 8 m para los dos cortos: 4 m cada uno.'),
    a('Un marco rectangular tiene perímetro 40 cm. Sus dos lados largos miden 12 cm cada uno. ¿Cuánta cinta se necesita para cubrir juntos los otros dos lados?', '16 cm', ['8 cm', '28 cm'], 'Los dos lados largos suman 24 cm. Para los otros dos juntos quedan 40 − 24 = 16 cm. Piden ambos, no uno solo.'),
  ], { despues_de: 'mat_per_faltante' });

const graficosEscala = unidad(
  'prof_r27_grafico_barras', 'graficos_estadisticos', 'Leer barras con una escala',
  'En un gráfico de barras, cada barra corresponde a una categoría. Su altura muestra una cantidad. Antes de contar, miramos los números del eje vertical: un intervalo puede valer uno, dos o más.',
  'En el gráfico de préstamos, cada intervalo vale 2 libros. La barra de Luna llega a 6: son 6 libros, no 3.',
  ['Buscamos la categoría Luna debajo de su barra.', 'Seguimos su altura hasta el eje: llega a 6.', 'Los tres intervalos de 2 representan 3 × 2 = 6 libros.'],
  'Leé el valor del eje, no solo cuántos intervalos ocupa la barra.',
  barras(['Luna', 'Sol', 'Mar'], [6, 4, 8], 2, 'Libros prestados'), [
    a('El gráfico muestra libros prestados. ¿Cuántos tiene Luna?', 6, [3, 2], 'La barra de Luna llega a 6. Cada intervalo vale 2.', barras(['Luna', 'Sol', 'Mar'], [6, 4, 8], 2, 'Libros prestados')),
    a('Según el gráfico, ¿cuántos votos recibió pera?', 10, [2, 5], 'La barra de pera llega a 10: dos intervalos de 5.', barras(['Manzana', 'Pera', 'Uva'], [15, 10, 5], 5, 'Votos por fruta')),
    a('Según el gráfico, ¿qué equipo reunió más tapitas?', 'Azul', ['Rojo', 'Verde'], 'Azul llega a 12, más que Rojo 8 y Verde 4.', barras(['Rojo', 'Azul', 'Verde'], [8, 12, 4], 4, 'Tapitas reunidas')),
    a('Según el gráfico, ¿cuántos libros más se prestaron el martes que el lunes?', 4, [8, 12], 'Martes: 8; lunes: 4. Diferencia: 8 − 4 = 4.', barras(['Lunes', 'Martes', 'Miércoles'], [4, 8, 6], 2, 'Libros por día')),
    a('Según el gráfico, ¿cuántas mascotas se contaron en total?', 12, [6, 3], 'Sumamos las categorías: 6 + 4 + 2 = 12.', barras(['Perros', 'Gatos', 'Peces'], [6, 4, 2], 2, 'Mascotas')),
    a('Según el gráfico, ¿qué dos categorías tienen la misma cantidad?', 'A y C', ['A y B', 'B y C'], 'A y C llegan a 9; B llega a 6.', barras(['A', 'B', 'C'], [9, 6, 9], 3, 'Colecciones')),
    a('Un gráfico de botellas usa marcas 0, 4, 8 y 12. Una barra alcanza tres intervalos completos desde cero. ¿Cuántas botellas representa?', 12, [3, 8], 'Cada intervalo vale 4. Tres intervalos representan 3 × 4 = 12 botellas.'),
    a('El gráfico muestra 12 entradas vendidas el sábado y 8 el domingo. Cada entrada cuesta 2 monedas. ¿Cuántas monedas se reunieron en esos dos días?', 40, [20, 24], 'Primero reunimos las entradas: 12 + 8 = 20. Después 20 × 2 = 40 monedas.', barras(['Sábado', 'Domingo'], [12, 8], 4, 'Entradas vendidas')),
  ], { despues_de: 'mat_graf_escala' });

const graficosFraccion = unidad(
  'prof_r27_grafico_fraccion', 'graficos_estadisticos', 'Del gráfico a una parte del total',
  'Para expresar una categoría como fracción, primero contamos el total de todas las categorías. La cantidad elegida va arriba y el total abajo. Después podemos buscar una fracción equivalente más simple.',
  'Hay 4 perros y 8 gatos: 12 animales. Los perros son 4/12 del total, lo mismo que 1/3.',
  ['Leemos las dos barras: 4 y 8.', 'Total: 4 + 8 = 12. Perros: 4 de 12.', 'Dividimos arriba y abajo por 4: 4/12 = 1/3.'],
  'El denominador cuenta todo el grupo, no solamente la otra categoría.',
  barras(['Perros', 'Gatos'], [4, 8], 2, 'Animales contados'), [
    a('Hay 4 perros y 8 gatos. ¿Qué fracción del total son perros? Elegí la forma más simple.', '1/3', ['1/2', '2/3'], 'Total 12; perros 4/12 = 1/3.', barras(['Perros', 'Gatos'], [4, 8], 2, 'Animales')),
    a('Hay 6 votos por pera y 6 por uva. ¿Qué fracción del total votó pera?', '1/2', ['1/6', '1'], 'Total 12; pera 6/12 = 1/2.', barras(['Pera', 'Uva'], [6, 6], 2, 'Votos')),
    a('Hay 2 libros de poesía y 6 de cuentos. ¿Qué fracción del total es poesía?', '1/4', ['1/3', '3/4'], 'Total 8; poesía 2/8 = 1/4.', barras(['Poesía', 'Cuentos'], [2, 6], 2, 'Libros')),
    a('Hay 3 fichas rojas, 3 azules y 6 verdes. ¿Qué fracción del total son verdes?', '1/2', ['1/3', '1/6'], 'Total 12; verdes 6/12 = 1/2.', barras(['Rojas', 'Azules', 'Verdes'], [3, 3, 6], 3, 'Fichas')),
    a('Hay 8 alumnos que caminan y 4 que usan bicicleta. ¿Qué fracción del total camina?', '2/3', ['1/3', '1/2'], 'Total 12; caminan 8/12 = 2/3.', barras(['Caminan', 'Bicicleta'], [8, 4], 2, 'Cómo llegan')),
    a('Hay 5 flores blancas y 15 amarillas. ¿Qué fracción del total es blanca?', '1/4', ['1/3', '3/4'], 'Total 20; blancas 5/20 = 1/4.', barras(['Blancas', 'Amarillas'], [5, 15], 5, 'Flores')),
    a('El gráfico muestra 4 vasos chicos y 8 grandes. Se usa la mitad de los vasos grandes. ¿Qué fracción de todos los vasos se usó?', '1/3', ['1/2', '2/3'], 'La mitad de 8 son 4 vasos. El total es 12. Se usaron 4/12 = 1/3.', barras(['Chicos', 'Grandes'], [4, 8], 2, 'Vasos disponibles')),
    a('Hay 6 tarjetas con círculos y 2 con triángulos. Se agregan 4 tarjetas con triángulos. ¿Qué fracción del nuevo total tiene círculos?', '1/2', ['3/4', '1/3'], 'Ahora hay 6 + 2 + 4 = 12 tarjetas. Seis tienen círculos: 6/12 = 1/2.'),
  ], { despues_de: 'prof_r27_grafico_barras', prerrequisitos_temas: ['fracciones_concepto'] });

const recetas = unidad(
  'prof_r27_proporcion_reducir', 'proporcionalidad_regla_3', 'Una receta más pequeña conserva las proporciones',
  'Si cada porción lleva lo mismo, podemos aumentar o reducir una receta. Primero calculamos lo necesario para una porción y después para la cantidad que queremos. Cambiar solo un ingrediente no conserva la receta.',
  'Para 4 porciones hacen falta 8 cucharadas de harina. Para 2 porciones hacen falta 4 cucharadas.',
  ['Una porción usa 8 ÷ 4 = 2 cucharadas.', 'Dos porciones usan 2 × 2 = 4 cucharadas.', 'Es la mitad de porciones y también la mitad de harina.'],
  'Encontrá cuánto corresponde a una porción y mantené esa relación.',
  { tipo: 'colecciones', grupos: [{ label: 'Porción 1', cantidad: 2 }, { label: 'Porción 2', cantidad: 2 }, { label: 'Porción 3', cantidad: 2 }, { label: 'Porción 4', cantidad: 2 }] }, [
    a('Para 4 porciones se usan 8 cucharadas de harina. Manteniendo la receta, ¿cuántas hacen falta para 2 porciones?', 4, [2, 16], 'Por porción: 8 ÷ 4 = 2. Para dos: 2 × 2 = 4.'),
    a('Para 6 porciones se usan 18 cucharadas. ¿Cuántas hacen falta para 2 porciones?', 6, [9, 3], 'Una porción usa 18 ÷ 6 = 3. Dos usan 6.'),
    a('Para 3 porciones se usan 6 cucharadas. ¿Cuántas hacen falta para 5 porciones?', 10, [8, 15], 'Una porción usa 2. Cinco usan 2 × 5 = 10.'),
    a('Para 8 porciones se usan 12 cucharadas. ¿Cuántas se usan para 4 porciones?', 6, [4, 24], 'Son la mitad de porciones; usamos la mitad de 12: 6 cucharadas.'),
    a('Para 4 vasos de bebida se usan 2 cucharadas de jugo concentrado. ¿Cuántas se usan para 1 vaso?', '1/2 cucharada', ['2 cucharadas', '4 cucharadas'], '2 cucharadas repartidas en 4 vasos dan 2/4 = 1/2 por vaso.'),
    a('Para 2 porciones se usan 3 cucharadas. ¿Cuántas se usan para 6 porciones?', 9, [6, 18], 'Se triplican las porciones: 3 × 3 = 9 cucharadas.'),
    a('Para 4 porciones se necesitan 8 cucharadas de harina y 4 de agua. ¿Qué cantidades conservan la receta para 2 porciones?', '4 de harina y 2 de agua', ['4 de harina y 4 de agua', '8 de harina y 2 de agua'], 'La mitad de porciones requiere la mitad de cada ingrediente: 4 y 2.'),
    a('Cada 3 banderines necesitan 6 hojas, siempre la misma cantidad por banderín. Con 10 hojas, ¿cuántos banderines completos se pueden hacer?', 5, [3, 10], 'Cada banderín usa 6 ÷ 3 = 2 hojas. Con 10 hojas hacemos 10 ÷ 2 = 5.'),
  ], { despues_de: 'mat_prop_otro_total' });

const sucesiones = unidad(
  'prof_r27_sucesion_descubrir', 'secuencias_aritmeticas', 'Mirar qué cambia entre vecinos',
  'Para buscar una regla comparamos cada término con el siguiente. A veces sumamos siempre lo mismo; otras veces los saltos cambian siguiendo una regla. Una lista corta puede admitir muchas reglas: aquí comprobamos la regla indicada en todos los pasos.',
  'En 1, 2, 4, 7 los saltos son +1, +2 y +3. Si cada salto aumenta uno, sigue +4 y llegamos a 11.',
  ['2 − 1 = 1; 4 − 2 = 2; 7 − 4 = 3.', 'Los saltos aumentan de uno en uno: el próximo es 4.', 'Sumamos ese salto al último término: 7 + 4 = 11.'],
  'Separá la fila de números de la fila de saltos entre ellos.',
  recta(0, 11, 1, [{ valor: 1, label: '1' }, { valor: 2, label: '2' }, { valor: 4, label: '4' }, { valor: 7, label: '7' }, { valor: 11, label: '11' }]), [
    a('En 1, 2, 4, 7 los saltos aumentan de uno en uno: +1, +2, +3. ¿Qué término sigue?', 11, [10, 14], 'El salto siguiente es +4. 7 + 4 = 11.'),
    a('En 3, 6, 9, 12 se suma siempre la misma cantidad. ¿Qué término sigue?', 15, [14, 24], 'La diferencia constante es 3. 12 + 3 = 15.'),
    a('En 20, 16, 12, 8 se resta siempre la misma cantidad. ¿Qué término sigue?', 4, [0, 6], 'Cada paso resta 4. 8 − 4 = 4.'),
    a('En 2, 4, 7, 11 los saltos son +2, +3, +4 y siguen aumentando de uno en uno. ¿Qué término sigue?', 16, [15, 22], 'El próximo salto es +5. 11 + 5 = 16.'),
    a('Completá 5, 10, ?, 20 si se suma siempre 5.', 15, [12, 25], '10 + 5 = 15; luego 15 + 5 = 20.'),
    a('En 1, 3, 6, 10 los saltos son +2, +3, +4 y siguen aumentando de uno en uno. ¿Qué término sigue?', 15, [14, 20], 'El salto siguiente es +5. 10 + 5 = 15.'),
    a('Se apilan vasos: el primer escalón tiene 2, el segundo 5 y el tercero 8. Cada nuevo escalón agrega 3 vasos respecto del anterior. ¿Cuántos tendrá el quinto escalón?', 14, [11, 17], 'El cuarto tiene 11 y el quinto 14. Pedían el quinto, no el siguiente.'),
    a('La serie romana I, II, IV, VII sigue saltos +1, +2, +3; el próximo salto es +4. ¿Qué término viene después?', 'XI', ['X', 'VIII'], 'Son 1, 2, 4, 7. Sigue 7 + 4 = 11, que se escribe XI.'),
  ], { despues_de: 'mat_sec_restar' });

const sucesionCompuesta = unidad(
  'prof_r27_sucesion_dos_pasos', 'secuencias_geometricas_fibonacci', 'Una regla puede tener dos acciones',
  'Una sucesión puede repetir una combinación de acciones. Para pasar al término siguiente, hacemos las dos en el mismo orden. Comprobamos la regla en más de un par de términos.',
  'La regla es multiplicar por 3 y después quitar 2: desde 2 obtenemos 4; desde 4, 10.',
  ['Desde 2: 2 × 3 = 6; 6 − 2 = 4.', 'Desde 4: 4 × 3 = 12; 12 − 2 = 10.', 'Desde 10: 10 × 3 − 2 = 28. Restar antes daría otra regla.'],
  'Usá el último término y respetá el orden de las dos acciones.',
  { tipo: 'colecciones', grupos: [{ label: '3 × 2: hay 6', cantidad: 6 }, { label: 'Quitamos 2', cantidad: 2 }, { label: 'Quedan 4', cantidad: 4 }] }, [
    a('La regla es multiplicar por 3 y luego restar 2. Si el término es 2, ¿cuál sigue?', 4, [0, 6], '2 × 3 = 6; 6 − 2 = 4.'),
    a('La regla es multiplicar por 3 y luego restar 2. Si el término es 4, ¿cuál sigue?', 10, [6, 12], '4 × 3 = 12; 12 − 2 = 10.'),
    a('La regla es multiplicar por 3 y luego restar 2. Si el término es 10, ¿cuál sigue?', 28, [24, 30], '10 × 3 = 30; 30 − 2 = 28.'),
    a('¿Cuál regla funciona en ambos pasos de 2 → 5 → 11?', 'Multiplicar por 2 y sumar 1', ['Sumar 3', 'Multiplicar por 3 y restar 1'], '2 × 2 + 1 = 5 y 5 × 2 + 1 = 11. Las otras reglas fallan en al menos un paso.'),
    a('La regla es multiplicar por 2 y sumar 3. Si el término es 5, ¿cuál sigue?', 13, [16, 10], '5 × 2 = 10; 10 + 3 = 13.'),
    a('La regla es restar 1 y después multiplicar por 2. Si el término es 5, ¿cuál sigue?', 8, [9, 10], 'Primero 5 − 1 = 4. Después 4 × 2 = 8.'),
    a('Una máquina duplica las fichas que recibe y agrega una. Se colocan 3 fichas, se recoge el resultado y se vuelve a colocarlo en la misma máquina. ¿Cuántas salen la segunda vez?', 15, [7, 13], 'Primera vez: 3 × 2 + 1 = 7. Segunda: 7 × 2 + 1 = 15.'),
    a('Una planta de juguete triplica sus luces y luego apaga 2 en cada ronda. Empieza con 3 luces encendidas. ¿Cuántas quedan encendidas después de dos rondas?', 19, [7, 21], 'Primera ronda: 3 × 3 − 2 = 7. Segunda: 7 × 3 − 2 = 19.'),
  ], { despues_de: 'mat_sec_fibonacci' });

const escribirRomanos = unidad(
  'prof_r27_romanos_escribir', 'numeros_romanos', 'Armar el número romano por partes',
  'Para escribir un número romano, separamos decenas y unidades y usamos sus símbolos. I vale 1, V vale 5, X vale 10 y L vale 50. IV es 4, IX es 9 y XL es 40. No se inventa cualquier resta entre letras.',
  '24 = 20 + 4. Veinte se escribe XX y cuatro IV: reunimos XXIV.',
  ['Separamos 24 en 20 y 4.', '20 = XX; 4 = IV, porque I antes de V resta uno.', 'Juntamos las partes: XXIV. Al leerlo recuperamos 20 + 4 = 24.'],
  'Armá decenas y unidades por separado y volvé a leer para comprobar.',
  { tipo: 'colecciones', grupos: [{ label: 'X = 10', cantidad: 10 }, { label: 'X = 10', cantidad: 10 }, { label: 'IV = 4', cantidad: 4 }] }, [
    a('¿Cómo se escribe 24 en números romanos?', 'XXIV', ['XIV', 'XXVI'], '20 es XX y 4 es IV. Juntos: XXIV.'),
    a('¿Cómo se escribe 4 con la notación romana enseñada?', 'IV', ['VI', 'IX'], 'I antes de V representa 5 − 1 = 4.'),
    a('¿Cómo se escribe 9?', 'IX', ['XI', 'IV'], 'I antes de X representa 10 − 1 = 9.'),
    a('¿Cómo se escribe 14?', 'XIV', ['XVI', 'IXV'], '10 + 4 se escribe X + IV: XIV.'),
    a('¿Cómo se escribe 19?', 'XIX', ['XXI', 'IXX'], '10 + 9 se escribe X + IX: XIX.'),
    a('¿Cómo se escribe 40?', 'XL', ['LX', 'XXXX'], 'X antes de L indica 50 − 10 = 40. Usamos el par permitido XL.'),
    a('Un libro termina su capítulo XXVIII y empieza el siguiente. ¿Cómo se escribe el número del nuevo capítulo?', 'XXIX', ['XXVII', 'XXX'], 'XXVIII es 28. El siguiente es 29: 20 + 9 = XXIX.'),
    a('Un cartel debe mostrar 49 en romano. ¿Cuál escritura corresponde?', 'XLIX', ['IL', 'LIX'], '49 = 40 + 9: XL + IX = XLIX. IL no es un par de resta permitido.'),
  ], { despues_de: 'mat_rom_restar' });

const elegirMcmMcd = unidad(
  'prof_r27_elegir_mcm_mcd', 'divisibilidad_primos_mcm_mcd', '¿Buscamos coincidir o repartir sin sobrantes?',
  'Para saber cuándo dos repeticiones vuelven a coincidir por primera vez, buscamos el primer múltiplo común: MCM. Para armar la mayor cantidad de paquetes iguales usando todo, buscamos un número que divida ambas cantidades: MCD. Primero entendemos qué queremos encontrar.',
  'Dos luces se encienden cada 2 y cada 3 minutos: vuelven a coincidir a los 6. Con 8 fichas rojas y 12 azules podemos hacer como máximo 4 paquetes idénticos: cada uno con 2 rojas y 3 azules.',
  ['Luces: 2, 4, 6… y 3, 6… El primer encuentro después del inicio es 6: usamos MCM.', 'Paquetes: 4 divide tanto 8 como 12. Cada paquete recibe 2 rojas y 3 azules.', 'No se puede hacer una cantidad mayor de paquetes idénticos sin que sobren fichas: usamos MCD.'],
  'Coincidir otra vez: múltiplos. Repartir todo en paquetes idénticos: divisores.',
  { tipo: 'mapa', titulo: 'La pregunta decide la herramienta', nodos: [
    { titulo: 'Volver a coincidir', texto: 'Buscamos el primer múltiplo común después del inicio: MCM.' },
    { titulo: 'Más paquetes iguales', texto: 'Buscamos el mayor divisor común de las cantidades: MCD.' },
  ] }, [
    a('Dos luces se encienden juntas ahora; luego una cada 2 minutos y otra cada 3. ¿Dentro de cuántos minutos coinciden por primera vez?', 6, [1, 5], 'Múltiplos de 2: 2, 4, 6. De 3: 3, 6. Primer encuentro: 6 minutos.'),
    a('Con 8 fichas rojas y 12 azules se arman paquetes idénticos, usando todo y sin partir fichas. ¿Cuál es la mayor cantidad de paquetes?', 4, [20, 24], 'MCD de 8 y 12: 4. Cada paquete tiene 2 rojas y 3 azules.'),
    a('Dos alarmas suenan juntas ahora y después cada 4 y cada 6 minutos. ¿Cuándo coinciden por primera vez después de ahora?', 'A los 12 minutos', ['A los 2 minutos', 'A los 10 minutos'], 'MCM de 4 y 6: 12. Ambas repeticiones llegan a 12.'),
    a('Hay 6 lápices y 9 gomas. Se usan todos para formar la mayor cantidad de bolsitas idénticas. ¿Cuántas bolsitas se forman?', 3, [15, 18], 'MCD de 6 y 9: 3. Cada bolsa lleva 2 lápices y 3 gomas.'),
    a('Dos robots salen juntos de su base y vuelven cada 3 y cada 5 minutos. Para hallar su primer regreso juntos, ¿qué buscamos?', 'El MCM de 3 y 5', ['El MCD de 3 y 5', 'La suma 3 + 5'], 'Buscamos un tiempo que sea múltiplo de ambos, el menor después de cero: 15 minutos.'),
    a('Queremos la mayor cantidad de paquetes idénticos con 10 tarjetas verdes y 15 naranjas, usando todas. ¿Qué buscamos?', 'El MCD de 10 y 15', ['El MCM de 10 y 15', 'La suma 10 + 15'], 'La cantidad de paquetes debe dividir a 10 y a 15. Su mayor divisor común es 5.'),
    a('Una cinta roja mide 12 cm y otra azul 18 cm. Se cortan en trozos de igual longitud, la mayor posible y sin sobrantes. ¿Cuánto mide cada trozo?', '6 cm', ['36 cm', '30 cm'], 'La longitud debe dividir exactamente 12 y 18. Su MCD es 6 cm: salen 2 trozos rojos y 3 azules.'),
    a('Se marca una pista desde cero con una señal cada 4 m y otra clase de señal cada 10 m. ¿A qué distancia está la primera marca que reúne ambas clases después de la salida?', '20 m', ['2 m', '14 m'], 'La distancia debe ser múltiplo de 4 y 10. El menor positivo es 20 m.'),
  ], { despues_de: 'prof_fact_mcd' });

const planoSemiplano = unidad(
  'prof_r27_plano_semiplano', 'geometria_angulos', 'Una recta separa el plano en dos lados',
  'Imaginamos una superficie plana que continúa sin borde: un plano. La hoja solo muestra una parte. Una recta lo separa en dos semiplanos. Un punto puede quedar de un lado, del otro o sobre la recta; para decir de qué lado está miramos esa recta, no el borde de la hoja.',
  'A y B están del mismo lado de la recta r. C está del otro lado. O está sobre r.',
  ['Mirá la recta r, que continúa en ambos sentidos.', 'A y B quedan arriba; C queda abajo: hay dos lados distintos.', 'O está en la recta que separa esos lados.'],
  'Usá la recta como referencia; distinguí estar de un lado de estar sobre ella.',
  { tipo: 'semiplano', recta_y: 0, puntos: [{ x: -2, y: 1, label: 'A' }, { x: 1, y: 1.5, label: 'B' }, { x: 2, y: -1, label: 'C' }, { x: 0, y: 0, label: 'O' }] }, [
    a('Una recta divide un plano. ¿Cuántos lados o semiplanos quedan?', 2, [1, 4], 'La recta separa el plano en dos lados.'),
    a('A y B están arriba de la recta r. ¿Dónde quedan respecto de r?', 'Del mismo lado', ['En lados opuestos', 'Ambos sobre la recta'], 'Los dos puntos están en la misma región delimitada por r.'),
    a('A está arriba de r y C abajo de r. ¿Dónde quedan respecto de r?', 'En lados opuestos', ['Del mismo lado', 'Ambos sobre r'], 'La recta separa sus posiciones.'),
    a('Un punto O está dibujado exactamente en la recta r. ¿Qué afirmación lo describe?', 'Está sobre r', ['Está por encima de r', 'Está por debajo de r'], 'O está en la propia recta que separa los semiplanos.'),
    a('¿El borde de una hoja representa un borde real del plano geométrico?', 'No; el plano continúa', ['Sí; el plano termina ahí', 'Solo si la hoja es grande'], 'La hoja muestra una parte de una superficie que imaginamos sin borde.'),
    a('Para decidir si dos puntos están en el mismo semiplano, ¿qué referencia necesitamos?', 'La recta que lo delimita', ['El color de los puntos', 'El tamaño de la hoja'], 'Los semiplanos se definen respecto de una recta.'),
    a('En un mapa, una recta separa dos zonas. La escuela y la plaza están a la izquierda de esa recta; el club, a la derecha. ¿Qué dos lugares están en el mismo semiplano?', 'La escuela y la plaza', ['La escuela y el club', 'La plaza y el club'], 'Escuela y plaza comparten un lado de la recta.'),
    a('Una recta diagonal separa una hoja en dos regiones. ¿Deja de formar dos semiplanos por estar inclinada?', 'No; sigue separando el plano en dos lados', ['Sí; solo sirven las horizontales', 'Sí; ahora forma cuatro lados'], 'La orientación no cambia que una recta separe el plano en dos semiplanos.'),
  ], { despues_de: 'prof_r27_recta_segmento' });

const angulosCompuestos = unidad(
  'prof_r27_angulos_compuestos', 'geometria_angulos', 'Juntar aberturas sin superponerlas',
  'Dos ángulos que comparten vértice y un lado, sin superponerse, pueden formar una abertura mayor. Sus medidas se suman. Si conocemos el total y una parte, restamos para encontrar la otra. El dibujo orienta; las medidas escritas son las que usamos.',
  'Una abertura total de 90° está dividida en 35° y otra parte. La parte que falta mide 55°.',
  ['El ángulo completo mide 90°.', 'Una parte ocupa 35°; buscamos lo que falta para completar 90°.', '90 − 35 = 55. Comprobamos: 35 + 55 = 90°.'],
  'Identificá la abertura total antes de sumar o restar las partes.',
  { tipo: 'angulo', angulo: 90, divisiones: [35], etiquetas_sectores: ['35°', '?'], medida: true }, [
    a('Un ángulo de 90° se divide en 35° y otra parte. ¿Cuánto mide la parte faltante?', '55°', ['125°', '35°'], '90 − 35 = 55°. Las dos partes suman el total.'),
    a('Dos aberturas contiguas, sin superposición, miden 20° y 30°. ¿Cuánto mide la abertura que forman juntas?', '50°', ['10°', '60°'], 'Sumamos las partes: 20 + 30 = 50°.'),
    a('Un ángulo llano de 180° se divide en una parte de 70° y otra desconocida. ¿Cuánto mide esta última?', '110°', ['250°', '70°'], '180 − 70 = 110°.'),
    a('Una abertura de 120° tiene una parte de 45°. ¿Cuánto mide la otra parte?', '75°', ['165°', '85°'], '120 − 45 = 75°.'),
    a('Tres aberturas contiguas, sin superposición, miden 20°, 25° y 35°. ¿Cuánto miden juntas?', '80°', ['60°', '90°'], 'Sumamos las tres: 20 + 25 + 35 = 80°.'),
    a('Una abertura de 100° está dividida en tres partes: 30°, 20° y otra desconocida. ¿Cuánto mide la tercera?', '50°', ['80°', '150°'], 'Las conocidas suman 50°. Faltan 100 − 50 = 50°.'),
    a('Una puerta gira 25° y luego otros 40° en el mismo sentido. ¿Cuánto giró desde su posición inicial?', '65°', ['15°', '90°'], 'Los dos giros se acumulan: 25 + 40 = 65°.'),
    a('Una rueda debe dar un cuarto de vuelta de 90°. Ya giró 60°. ¿Cuántos grados faltan para completar ese cuarto de vuelta?', '30°', ['150°', '60°'], 'Buscamos el resto hasta 90°: 90 − 60 = 30°.'),
  ], { despues_de: 'prof_geo_opuestos' });

const perimetroRelaciones = unidad(
  'prof_r27_perimetro_lado_doble', 'perimetros_compuestos', 'Si un lado es el doble, contá partes iguales',
  'En un rectángulo con lado largo doble del corto, cada corto vale una parte y cada largo vale dos. El borde reúne seis partes iguales: una, dos, una y dos. Al dividir el perímetro por seis obtenemos el lado corto.',
  'Un rectángulo tiene perímetro 24 cm y cada lado largo mide el doble del corto. El corto mide 4 cm y el largo 8 cm.',
  ['Contamos partes alrededor del borde: 1 + 2 + 1 + 2 = 6.', 'Una parte mide 24 ÷ 6 = 4 cm: es el lado corto.', 'El largo tiene dos partes: 2 × 4 = 8 cm. Comprobamos 4 + 8 + 4 + 8 = 24.'],
  'Convertí la relación entre lados en partes iguales antes de dividir.',
  rectangulo(2, 1, { lados: ['2 partes', '1 parte', '2 partes', '1 parte'], nota: 'Todo el borde: 6 partes iguales' }), [
    a('Un rectángulo tiene perímetro 24 cm. El largo es el doble del corto. ¿Cuánto mide el corto?', '4 cm', ['8 cm', '6 cm'], 'El borde tiene 6 partes. 24 ÷ 6 = 4 cm.'),
    a('Un rectángulo tiene perímetro 18 cm. El largo es el doble del corto. ¿Cuánto mide el corto?', '3 cm', ['6 cm', '9 cm'], '18 ÷ 6 = 3 cm por parte.'),
    a('Un rectángulo tiene perímetro 30 cm. El largo es el doble del corto. ¿Cuánto mide el largo?', '10 cm', ['5 cm', '15 cm'], 'Corto: 30 ÷ 6 = 5 cm. Largo: 2 × 5 = 10 cm.'),
    a('Un rectángulo tiene perímetro 36 cm. El largo es el doble del corto. ¿Cuánto mide el corto?', '6 cm', ['12 cm', '9 cm'], '36 ÷ 6 = 6 cm por parte.'),
    a('Un rectángulo tiene perímetro 42 cm. El largo es el doble del corto. ¿Cuánto mide el largo?', '14 cm', ['7 cm', '21 cm'], 'Corto: 42 ÷ 6 = 7 cm. Largo: 2 × 7 = 14 cm.'),
    a('Un rectángulo tiene perímetro 48 cm. El largo es el doble del corto. ¿Qué pareja de medidas corresponde?', '8 cm y 16 cm', ['12 cm y 24 cm', '6 cm y 12 cm'], '48 ÷ 6 = 8. El doble es 16. El borde suma 8 + 16 + 8 + 16 = 48 cm.'),
    a('Un cantero rectangular tiene 30 m de borde y su largo es el doble del ancho. Se coloca cerco solamente en los dos lados largos. ¿Cuántos metros se necesitan?', '20 m', ['10 m', '30 m'], 'Ancho: 30 ÷ 6 = 5 m. Largo: 10 m. Los dos largos suman 20 m.'),
    a('Un marco rectangular tiene perímetro 24 cm y su largo es el doble del corto. Una varilla debe cubrir un lado largo y un lado corto. ¿Cuánto suman?', '12 cm', ['4 cm', '8 cm'], 'El corto mide 4 cm y el largo 8 cm. Juntos suman 12 cm.'),
  ], { despues_de: 'prof_r27_lado_desde_perimetro' });

const contornoL = (w, h, baseHeight, topWidth, extra = {}) => poligono([[0, 0], [w, 0], [w, baseHeight], [topWidth, baseHeight], [topWidth, h], [0, h]], extra);
const perimetroTramos = unidad(
  'prof_r27_perimetro_varios_tramos', 'perimetros_compuestos', 'Completar medidas antes de recorrer el borde',
  'En un borde con forma de L, los tramos horizontales se relacionan con el ancho total y los verticales con el alto total. Restamos para encontrar las medidas ocultas. Después recorremos todo el borde una sola vez. Si hay una abertura que no se cubre, la descontamos al final.',
  'Una L tiene ancho total 8 cm y alto 6 cm. Arriba mide 3 cm y el lado derecho bajo 2 cm. Los tramos interiores miden 5 cm y 4 cm; todo el borde, 28 cm.',
  ['Horizontal que falta: 8 − 3 = 5 cm. Vertical que falta: 6 − 2 = 4 cm.', 'Recorremos el borde: 8, 2, 5, 4, 3 y 6 cm.', 'Sumamos los seis tramos: 8 + 2 + 5 + 4 + 3 + 6 = 28 cm.'],
  'Buscá primero qué tramos completan el mismo ancho o alto; luego seguí el borde.',
  contornoL(8, 6, 2, 3, { lados: ['8 cm', '2 cm', '?', '?', '3 cm', '6 cm'] }), [
    a('Una L tiene ancho total 8 cm y su tramo horizontal superior mide 3 cm. ¿Cuánto mide el otro tramo horizontal, que completa ese ancho?', '5 cm', ['11 cm', '3 cm'], 'Los dos tramos completan 8 cm: 8 − 3 = 5.', contornoL(8, 6, 2, 3, { lados: ['8 cm', '2 cm', '?', '4 cm', '3 cm', '6 cm'] })),
    a('Una L tiene alto total 6 cm y el tramo vertical derecho inferior mide 2 cm. ¿Cuánto mide el tramo vertical interior que completa ese alto?', '4 cm', ['8 cm', '2 cm'], 'El alto se completa con 2 y otra medida: 6 − 2 = 4.', contornoL(8, 6, 2, 3, { lados: ['8 cm', '2 cm', '5 cm', '?', '3 cm', '6 cm'] })),
    a('Los seis tramos del borde de una L miden 8, 2, 5, 4, 3 y 6 cm. ¿Cuál es su perímetro?', '28 cm', ['14 cm', '48 cm'], 'Sumamos cada tramo una vez: 8 + 2 + 5 + 4 + 3 + 6 = 28.'),
    a('Una L tiene ancho total 10 cm y tramo superior de 4 cm. ¿Cuánto mide el tramo horizontal interior?', '6 cm', ['14 cm', '4 cm'], 'Los horizontales superiores deben completar los 10 cm de ancho: 10 − 4 = 6.', contornoL(10, 7, 3, 4, { lados: ['10 cm', '3 cm', '?', '4 cm', '4 cm', '7 cm'] })),
    a('Una L tiene alto total 9 cm y tramo vertical inferior de 4 cm. ¿Cuánto mide el tramo vertical interior?', '5 cm', ['13 cm', '4 cm'], '9 − 4 = 5 cm.', contornoL(8, 9, 4, 3, { lados: ['8 cm', '4 cm', '5 cm', '?', '3 cm', '9 cm'] })),
    a('Los seis tramos de una L miden 10, 3, 6, 4, 4 y 7 cm. ¿Cuál es el perímetro?', '34 cm', ['17 cm', '70 cm'], '10 + 3 + 6 + 4 + 4 + 7 = 34 cm.'),
    a('El borde de un jardín en L tiene tramos de 8, 2, 5, 4, 3 y 6 m. Se deja una entrada de 2 m sin cerco. ¿Cuántos metros de cerco se usan?', '26 m', ['28 m', '30 m'], 'Todo el borde suma 28 m. Descontamos la entrada: 28 − 2 = 26 m.'),
    a('Una tela en L tiene tramos de 10, 3, 6, 4, 4 y 7 cm. Se cosen dos vueltas completas de cinta por el borde. ¿Cuánta cinta se necesita?', '68 cm', ['34 cm', '140 cm'], 'Una vuelta suma 34 cm. Dos vueltas usan 34 × 2 = 68 cm.'),
  ], { despues_de: 'prof_fig_borde_l' });

const flechaArriba = [[-0.5, -2], [0.5, -2], [0.5, 0], [1.5, 0], [0, 2], [-1.5, 0], [-0.5, 0]];
const girar = (puntos, grados) => {
  const angulo = -grados * Math.PI / 180;
  return puntos.map(([x, y]) => [x * Math.cos(angulo) - y * Math.sin(angulo), x * Math.sin(angulo) + y * Math.cos(angulo)]);
};
const flechaDerecha = girar(flechaArriba, 90);
const giros = unidad(
  'prof_r27_giros', 'secuencias_alfanumericas_y_figuras', 'Girar conserva la figura y cambia hacia dónde apunta',
  'Girar es dar una vuelta alrededor de un punto, sin estirar la figura. En sentido horario seguimos las agujas del reloj: arriba, derecha, abajo, izquierda. Un cuarto de vuelta son 90°; media vuelta, 180°; tres cuartos, 270°; la vuelta completa, 360°.',
  'Una flecha que apunta arriba gira 90° en sentido horario y termina apuntando a la derecha.',
  ['Marcamos la orientación inicial: arriba.', 'Avanzamos un cuarto de vuelta siguiendo el reloj: llegamos a la derecha.', 'La flecha conserva su forma y tamaño; cambió su orientación.'],
  'Elegí primero el sentido del giro y contá cuartos de vuelta.',
  poligono(flechaArriba, { auxiliares: [[...flechaDerecha, flechaDerecha[0]]], nota: 'Azul: arriba. Punteada: después del giro.' }), [
    a('Una flecha apunta arriba y gira 90° en sentido horario. ¿Hacia dónde termina apuntando?', 'Derecha', ['Izquierda', 'Abajo'], 'Un cuarto de vuelta horario desde arriba lleva a la derecha.'),
    a('Una flecha apunta a la derecha y gira 90° en sentido horario. ¿Hacia dónde termina apuntando?', 'Abajo', ['Arriba', 'Izquierda'], 'El orden horario es arriba, derecha, abajo, izquierda.'),
    a('Una flecha apunta abajo y gira 180°. ¿Hacia dónde termina apuntando?', 'Arriba', ['Derecha', 'Abajo'], 'Media vuelta invierte la orientación: de abajo a arriba.'),
    a('Una flecha apunta a la izquierda y gira 90° en sentido horario. ¿Hacia dónde termina apuntando?', 'Arriba', ['Abajo', 'Derecha'], 'Un cuarto de vuelta desde izquierda, siguiendo el reloj, llega arriba.'),
    a('Una flecha apunta arriba y gira 270° en sentido horario. ¿Hacia dónde termina apuntando?', 'Izquierda', ['Derecha', 'Abajo'], 'Son tres cuartos: derecha, abajo, izquierda.'),
    a('Una flecha apunta a la derecha y gira 360°. ¿Hacia dónde termina apuntando?', 'Derecha', ['Izquierda', 'Arriba'], 'Una vuelta completa regresa a la orientación inicial.'),
    a('Un robot mira hacia arriba en el plano. Gira 90° en sentido horario dos veces. ¿Hacia dónde mira al final?', 'Abajo', ['Derecha', 'Arriba'], 'El primer giro lo lleva a derecha y el segundo a abajo. Sumó media vuelta.'),
    a('Un cartel con una flecha hacia arriba se gira media vuelta sin deformarlo. ¿Qué cambia?', 'La orientación de la flecha', ['El tamaño de la flecha', 'La cantidad de sus lados'], 'La flecha ahora apunta abajo. Un giro conserva tamaño y forma.'),
  ], { despues_de: 'mat_sec_dos_reglas', prerrequisitos_temas: ['geometria_angulos'] });

const cicloLejano = unidad(
  'prof_r27_ciclo_lejano', 'secuencias_alfanumericas_y_figuras', 'Saltar ciclos completos para llegar lejos',
  'Si un bloque se repite, no hace falta dibujar todas las posiciones. Contamos cuántos elementos tiene el bloque, dividimos la posición por esa cantidad y miramos el resto. Si sobra 1, es el primero; si sobra 2, el segundo. Si no sobra nada, corresponde al último del bloque.',
  'Se repite círculo, cuadrado, triángulo desde la posición 1. En la posición 14 hay cuadrado.',
  ['El bloque tiene 3 figuras. Cuatro bloques ocupan 12 posiciones.', 'Para llegar a 14 faltan 2 posiciones: círculo en 13, cuadrado en 14.', '14 ÷ 3 deja resto 2: elegimos el segundo elemento del bloque.'],
  'La numeración empieza en 1. Con resto cero elegí el último elemento, no el primero.',
  { tipo: 'mapa', titulo: 'Este bloque vuelve a empezar', nodos: [
    { titulo: 'Posición 1', texto: 'Círculo ○' }, { titulo: 'Posición 2', texto: 'Cuadrado □' }, { titulo: 'Posición 3', texto: 'Triángulo △' },
  ] }, [
    a('Desde la posición 1 se repite círculo, cuadrado, triángulo. ¿Qué figura ocupa la posición 14?', 'Cuadrado', ['Círculo', 'Triángulo'], '14 = 4 × 3 + 2. Queda el segundo elemento: cuadrado.'),
    a('Desde la posición 1 se repite círculo, cuadrado, triángulo. ¿Qué figura ocupa la posición 15?', 'Triángulo', ['Círculo', 'Cuadrado'], '15 = 5 × 3, sin resto. Es el último elemento del bloque: triángulo.'),
    a('Desde la posición 1 se repite A, B, C. ¿Qué letra ocupa la posición 22?', 'A', ['B', 'C'], '22 = 7 × 3 + 1. Corresponde a la primera letra: A.'),
    a('Desde la posición 1 se repite rojo, azul. ¿Qué color ocupa la posición 17?', 'Rojo', ['Azul', 'No se puede saber'], '17 = 8 × 2 + 1. Es el primer color: rojo.'),
    a('Desde la posición 1 se repite 1, 2, 3, 4. ¿Qué número ocupa la posición 20?', 4, [1, 2], '20 completa cinco bloques de cuatro. Sin resto corresponde al último: 4.'),
    a('Desde la posición 1 se repite A, B, C, D. ¿Qué letra ocupa la posición 30?', 'B', ['A', 'D'], '30 = 7 × 4 + 2. Corresponde a la segunda letra: B.'),
    a('Una máquina envasadora etiqueta frascos en este orden desde el primero: limón, naranja, frutilla. Repite siempre ese bloque. ¿Qué etiqueta lleva el frasco 35?', 'Naranja', ['Limón', 'Frutilla'], '35 = 11 × 3 + 2. Es la segunda etiqueta: naranja.'),
    a('Una guirnalda empieza en su primera posición con estrella, luna, sol, nube y repite. Ya están completas 24 posiciones. ¿Qué figura va en la siguiente?', 'Estrella', ['Nube', 'Luna'], '24 completa seis bloques. La posición siguiente, 25, inicia otro bloque con estrella.'),
  ], { despues_de: 'prof_r27_giros', prerrequisitos_temas: ['division_1_digito'] });

// Coordenadas exactas: AB=4, AC=3 y BC=5. El dibujo no sustituye la construcción.
const arcoConstruccion = (centro, radio, inicio, final) => Array.from({ length: 25 }, (_, i) => {
  const radianes = (inicio + (final - inicio) * i / 24) * Math.PI / 180;
  return [centro[0] + radio * Math.cos(radianes), centro[1] + radio * Math.sin(radianes)];
});
const direccionBC = Math.atan2(3, -4) * 180 / Math.PI;
const construirTriangulo = unidad(
  'prof_r27_plan_triangulo_tres_lados', 'geometria_triangulos', 'Planear un triángulo y comprobarlo en papel',
  'Para construir un triángulo con tres lados, usamos regla y compás. El compás conserva una distancia desde su centro. Dibujamos primero un lado; desde sus extremos trazamos arcos con las otras dos medidas. Su cruce da el tercer vértice. Después medimos para comprobar. Elegir una respuesta aquí solo revisa el plan.',
  'Queremos AB = 4 cm, AC = 3 cm y BC = 5 cm. Dibujamos AB; trazamos un arco de radio 3 desde A y otro de radio 5 desde B. Uno de sus cruces será C.',
  ['Antes de construir, comprobamos que cada lado es menor que la suma de los otros: con 3, 4 y 5 se cumple.', 'Trazamos AB de 4 cm. Abrimos el compás a 3 cm para el arco desde A; después lo abrimos a 5 cm para el arco desde B.', 'Elegimos un cruce C, unimos AC y BC y medimos los tres lados. En papel pueden aparecer dos cruces, uno a cada lado de AB: elegimos uno.'],
  'Cada arco conserva la distancia al extremo que le sirve de centro. Al terminar, medí los tres lados.',
  poligono([[0, 0], [4, 0], [0, 3]], { vertices: ['A', 'B', 'C'], lados: ['4 cm', '5 cm', '3 cm'],
    auxiliares: [arcoConstruccion([0, 0], 3, 65, 115), arcoConstruccion([4, 0], 5, direccionBC - 15, direccionBC + 15)],
    nota: 'Los arcos se cruzan en C. Verificá en papel.' }), [
    a('Queremos AB = 4 cm, AC = 3 cm y BC = 5 cm. Después de dibujar AB, ¿qué apertura usamos para el arco con centro en A?', '3 cm', ['4 cm', '5 cm'], 'El arco desde A debe ubicar C a distancia AC = 3 cm.'),
    a('Queremos AB = 4 cm, AC = 3 cm y BC = 5 cm. ¿Qué apertura usamos para el arco con centro en B?', '5 cm', ['3 cm', '4 cm'], 'El arco desde B debe ubicar C a distancia BC = 5 cm.'),
    a('En la construcción de un triángulo con tres lados dados, ¿dónde elegimos el tercer vértice?', 'En un cruce de los dos arcos', ['En cualquier lugar del papel', 'Siempre en el punto medio de la base'], 'El cruce cumple a la vez las dos distancias pedidas.'),
    a('¿Por qué un arco con centro en A ayuda a fijar la distancia AC?', 'Sus puntos están a la misma distancia de A', ['Sus puntos forman una recta', 'Todos quedan sobre la base'], 'La apertura del compás fija la distancia al centro.'),
    a('¿Se puede construir un triángulo con lados de 2, 3 y 6 cm?', 'No', ['Sí; cualquier terna sirve', 'Sí; si inclinamos el papel'], 'Los dos menores suman 5, menos que 6. No alcanzan a cerrar el triángulo.'),
    a('Después de construir un triángulo, ¿qué conviene comprobar con la regla?', 'Las tres longitudes de sus lados', ['Solo si el dibujo se ve bonito', 'Solo el color de los arcos'], 'Medir verifica si se respetaron las tres longitudes pedidas.'),
    a('Para un triángulo AB = 5 cm, AC = 4 cm y BC = 6 cm, alguien propone arcos de 4 cm desde A y 6 cm desde B. ¿Ese plan usa las medidas correctas?', 'Sí', ['No; los dos arcos deben tener 5 cm', 'No; todos los triángulos tienen lados iguales'], 'Cada radio corresponde a la distancia desde su centro hasta C: AC = 4 y BC = 6 cm.'),
    a('Al construir un triángulo de lados 3, 4 y 5 cm, medís tu dibujo y obtenés 3, 4 y 6 cm. ¿Qué conviene hacer?', 'Revisar el arco y el lado que debían medir 5 cm', ['Dar el dibujo por comprobado', 'Cambiar la consigna para que diga 6 cm'], 'La medida obtenida no coincide con la pedida. Repetir ese paso permite corregir el dibujo.'),
  ], { despues_de: 'prof_fig_existencia', alcance_evidencia: 'Estas actividades verifican la comprensión del plan y de la comprobación. La ejecución de una construcción requiere hacer y revisar el dibujo en papel; no queda certificada por opción múltiple.',
    actividad_en_papel: 'Con regla y compás, construí un triángulo de lados 3, 4 y 5 cm. Medí los tres lados al terminar y mostrale el dibujo a una persona que te acompañe. Podés rehacer los trazos.' });

export const UNIDADES_MATEMATICA_R27 = [
  naturalesRecta, enteroDesdeUnaParte, enteroDesdeParte, fraccionRecta, restoInverso, dosRestos,
  decimalesPosicion, periodicos, exponentes, cubos, ordenIgual, colocarParentesis,
  lineas, paralelismo, cuadrilateros, romboideLocal, semicircunferencia,
  ladoDesdePerimetro, graficosEscala, graficosFraccion, recetas, sucesiones,
  sucesionCompuesta, escribirRomanos, elegirMcmMcd, planoSemiplano,
  angulosCompuestos, perimetroRelaciones, perimetroTramos,
  giros, cicloLejano, construirTriangulo,
];
