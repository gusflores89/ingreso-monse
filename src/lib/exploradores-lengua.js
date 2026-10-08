// Exploraciones propias y acotadas: enseñan relaciones, no certifican el tema.
// Todos los cambios son locales; ninguna acción suma errores, aciertos o dominio.
export const EXPLORADORES_LENGUA = {
 comprension_lectora_literal_inferida: {
  titulo: 'Encontrar una pista en una historia', tipo: 'pistas',
  modelo: 'Una pista es una parte del texto que ayuda a pensar una respuesta. Tocá una oración y mirá qué nos permite saber.',
  pregunta: '¿Por qué puede estar mojado el paraguas?',
  frases: [
   {texto:'Nina dejó el paraguas mojado junto a la puerta.',explicacion:'Sabemos que el paraguas está mojado. Esta oración sola no dice por qué.'},
   {texto:'Afuera estaba lloviendo.',explicacion:'Esta es una pista: la lluvia pudo mojar el paraguas. Es una explicación probable, aunque el texto no dice que Nina lo usó.'},
   {texto:'Después se sentó a dibujar.',explicacion:'Esto cuenta qué hizo después. No explica cómo se mojó el paraguas.'},
  ],
 },
 ortografia_b_v: {
  titulo:'Construir una familia con B',tipo:'familia',
  modelo:'Libro, librería y librito comparten libr-. Esa parte conserva B. Librería es un lugar donde se venden libros; librito es un libro pequeño.',
  raiz:'libr',variantes:[
   {control:'Un objeto',final:'o',palabra:'libro',frase:'Leo un libro.',explicacion:'Libr- + o forma libro. Mirá la B que se mantiene.'},
   {control:'Un lugar',final:'ería',palabra:'librería',frase:'Busco un libro en la librería.',explicacion:'Libr- + ería forma librería. Cambia el final y el significado; la B se conserva.'},
   {control:'Un objeto pequeño',final:'ito',palabra:'librito',frase:'El librito entra en el bolsillo.',explicacion:'Libr- + ito forma librito. La B pertenece a la parte que comparten estas palabras.'},
  ],limite:'Esta familia ayuda con estas palabras; no alcanza para decidir todas las B y V.',
 },
 ortografia_g_j_gu_gu:{
  titulo:'La U puede sonar o quedar silenciosa',tipo:'sonido_u',
  modelo:'En guitarra la U de GUI no suena. En pingüino, los dos puntos sobre la Ü indican que sí suena. Podemos mirar la diferencia sin usar audio.',
  variantes:[
   {control:'U que no suena',palabra:'guitarra',partes:['gui','ta','rra'],grupo:'GUI',explicacion:'En GUI la U conserva el sonido de G de gato, pero no se pronuncia. Leemos gui-ta-rra.',frase:'La guitarra tiene cuerdas.'},
   {control:'U que sí suena',palabra:'pingüino',partes:['pin','güi','no'],grupo:'GÜI',explicacion:'Los dos puntos se llaman diéresis. En GÜI la U sí se pronuncia: pin-güi-no.',frase:'El pingüino nada.'},
  ],limite:'Observamos GUI/GÜI. Las otras reglas de G y J tienen sus propias lecciones.',
 },
 ortografia_h:{
  titulo:'Conservar la H al construir una familia',tipo:'familia',
  modelo:'Hormiga se escribe con H. La vemos en hormiguero, lugar donde viven hormigas, y hormiguita, una hormiga pequeña. Aprendemos el modelo; no inventamos una razón para esa H.',
  raiz:'hormig',variantes:[
   {control:'El animal',final:'a',palabra:'hormiga',frase:'La hormiga lleva una hoja.',explicacion:'Hormig- + a forma hormiga. La H está al comienzo aunque no tenga sonido.'},
   {control:'Su vivienda',final:'uero',palabra:'hormiguero',frase:'Las hormigas entran al hormiguero.',explicacion:'La H se conserva. Agregamos uero: la U de GUE permite mantener el sonido de G ante E.'},
   {control:'Una pequeña',final:'uita',palabra:'hormiguita',frase:'Una hormiguita camina por la mesa.',explicacion:'La H se conserva. En hormiguita, GUI mantiene el sonido de G ante I; esa U no suena.'},
  ],limite:'No todas las palabras con H se explican por una regla. Primero miramos y aprendemos su escritura.',
 },
 ortografia_c_s_z:{
  titulo:'De uno a varios: Z cambia a C',tipo:'plural_z',
  modelo:'Un pez; dos peces. Al formar estos plurales, la Z del final cambia a C delante de ES. Podemos cambiar la cantidad y mirar las letras.',
  variantes:[{singular:'pez',plural:'peces',base:'pe',articulo:'un',objeto:'pez'},{singular:'luz',plural:'luces',base:'lu',articulo:'una',objeto:'luz'},{singular:'lápiz',plural:'lápices',base:'lápi',articulo:'un',objeto:'lápiz'}],
 },
 tildes_generales_agudas_graves_esdrujulas:{
  titulo:'Mover la sílaba que suena más fuerte',tipo:'acento',
  modelo:'Una sílaba es un grupo de sonidos que decimos junto. En PÚ-bli-co suena más fuerte PÚ. Al mover la fuerza, pueden cambiar la palabra, la tilde y su significado.',
  silabas:['pu','bli','co'],variantes:[
   {palabra:'público',frase:'El público aplaude.',explicacion:'PÚ-bli-co: la fuerza está en la antepenúltima sílaba. Es esdrújula y lleva tilde. Público nombra aquí a quienes miran el espectáculo.'},
   {palabra:'publico',frase:'Yo publico un cuento cada mes.',explicacion:'pu-BLI-co: la fuerza está en la penúltima sílaba. Es grave terminada en vocal y no lleva tilde. Publico cuenta lo que hago yo.'},
   {palabra:'publicó',frase:'Ayer Ana publicó un cuento.',explicacion:'pu-bli-CÓ: la fuerza está en la última sílaba. Es aguda terminada en vocal y lleva tilde. Publicó cuenta algo que Ana hizo.'},
  ],
 },
 diptongo_hiato:{
  titulo:'Vocales juntas o en sílabas distintas',tipo:'vocales',
  modelo:'En ai-re, A e I comparten una sílaba: diptongo. En pa-ís, A e Í van en sílabas distintas: hiato. Probá juntar o separar; podés volver al modelo en cualquier momento.',
  variantes:[
   {palabra:'aire',vocales:'A e I',juntas:true,correcto:['ai','re'],pruebaSeparada:['a','i','re'],pruebaJunta:['ai','re'],explicacion:'Decimos ai-re: A e I comparten la primera sílaba. Es un diptongo.'},
   {palabra:'país',vocales:'A e Í',juntas:false,correcto:['pa','ís'],pruebaSeparada:['pa','ís'],pruebaJunta:['país'],explicacion:'Decimos pa-ís: la Í fuerte forma una sílaba aparte. Es un hiato y la Í lleva tilde.'},
   {palabra:'teatro',vocales:'E y A',juntas:false,correcto:['te','a','tro'],pruebaSeparada:['te','a','tro'],pruebaJunta:['tea','tro'],explicacion:'Decimos te-a-tro: E y A son vocales abiertas y van en sílabas distintas. Es un hiato.'},
  ],
 },
 tilde_diacritica_monosilabos:{
  titulo:'La tilde ayuda a distinguir un uso',tipo:'sentido',
  modelo:'Tu acompaña algo que pertenece a alguien: tu mochila. Tú nombra a la persona a quien hablás: tú llevas la mochila. En Argentina también decimos vos llevás.',
  variantes:[
   {control:'Hablar de una pertenencia',palabra:'tu',frase:'Esta es tu mochila.',explicacion:'Tu acompaña a mochila y señala de quién es. En este uso no lleva tilde.'},
   {control:'Nombrar a quien escucha',palabra:'tú',frase:'Tú llevas la mochila.',explicacion:'Tú nombra a quien escucha y lleva tilde. Equivale aquí a vos; cambia también la forma del verbo: vos llevás.'},
  ],
 },
 sustantivos_genero_numero_tipo:{
  titulo:'Nombrar una clase o a alguien en particular',tipo:'nombres',
  modelo:'Gata puede nombrar a cualquier gata: es un nombre común. Luna puede ser el nombre particular de una gata: es propio y empieza con mayúscula. Elegí qué querés nombrar.',
  variantes:[
   {control:'Un animal',comun:'gata',propio:'Luna',fraseComun:'La gata duerme.',frasePropio:'Luna duerme.',explicacion:'Gata nombra una clase de animal; Luna distingue a esta gata.'},
   {control:'Un lugar',comun:'ciudad',propio:'Córdoba',fraseComun:'Visitamos una ciudad.',frasePropio:'Visitamos Córdoba.',explicacion:'Ciudad nombra una clase de lugar; Córdoba identifica una ciudad particular.'},
  ],limite:'Empezamos por nombres comunes y propios. Género, número y otras clases se amplían en las lecciones.',
 },
 verbos_modo_indicativo_tiempos:{
  titulo:'Mover una acción en el tiempo',tipo:'tiempo',
  modelo:'Una misma acción puede ubicarse antes, ahora o después. Ayer dibujé; hoy dibujo; mañana dibujaré. Tocá un momento y mirá qué cambia en el verbo.',
  variantes:[
   {control:'Ayer',verbo:'dibujé',frase:'Ayer dibujé una casa.',explicacion:'Dibujé presenta una acción del pasado como terminada. Se llama pretérito perfecto simple.'},
   {control:'Hoy',verbo:'dibujo',frase:'Hoy dibujo una casa.',explicacion:'Dibujo usa el presente. En esta frase contamos una acción de hoy.'},
   {control:'Mañana',verbo:'dibujaré',frase:'Mañana dibujaré una casa.',explicacion:'Dibujaré ubica la acción en el futuro, después del momento de hablar.'},
  ],limite:'Esta línea enseña tres usos. Los otros tiempos se exploran en sus lecciones, uno por vez.',
 },
 sujeto_predicado_nucleo:{
  titulo:'Armar quién hace algo y qué hace',tipo:'oracion',
  modelo:'En La gata duerme, la gata es el sujeto y duerme es el predicado. Dentro del sujeto, gata es la palabra principal o núcleo. El verbo duerme es el núcleo del predicado.',
  sujetos:[{texto:'La gata',nucleo:'gata'},{texto:'El perro',nucleo:'perro'}],
  predicados:[{texto:'duerme en la alfombra.',nucleo:'duerme'},{texto:'juega en el patio.',nucleo:'juega'}],
 },
 concordancia_sujeto_verbo:{
  titulo:'Cambiar la cantidad y acompañarla con el verbo',tipo:'concordancia',
  modelo:'La gata duerme; las gatas duermen. Cuando hablamos de una o de varias, también cambia el verbo. Podés probar una combinación y ajustarla sin perder nada.',
  sujetos:['La gata','Las gatas'],verbos:['duerme','duermen'],
 },
 discurso_conectores_sinonimos:{
  titulo:'Conectar una causa, un resultado o un contraste',tipo:'conectores',
  modelo:'Porque da una razón. Por eso presenta un resultado. Pero muestra un contraste. Elegí una relación y uní sus dos partes para ver qué cuenta.',
  variantes:[
   {control:'Una razón',antes:'Me abrigué',conector:'porque',despues:'hacía frío.',explicacion:'Hacía frío explica por qué me abrigué: es la causa.'},
   {control:'Un resultado',antes:'Hacía frío;',conector:'por eso',despues:'me abrigué.',explicacion:'Abrigarme aparece como resultado del frío: es la consecuencia.'},
   {control:'Un contraste',antes:'Hacía frío,',conector:'pero',despues:'no me abrigué.',explicacion:'No abrigarme contrasta con lo que podríamos esperar cuando hace frío.'},
  ],limite:'Exploramos conectores. Los sinónimos y antónimos se enseñan con sus propios contextos en las lecciones.',
 },
 produccion_escrita_narracion:{
  titulo:'Construir una historia y mejorar un detalle',tipo:'historia',
  modelo:'Una historia puede presentar un problema, una acción y un resultado. Modelo: perdí un lápiz → lo busqué → lo encontré. Armá otra historia tocando tarjetas; después podés revisar un detalle.',
  tarjetas:[
   {id:'resultado',texto:'Al final pudo salir a jugar.',orden:2},
   {id:'problema',texto:'Alma quería salir, pero no encontraba su gorro.',orden:0},
   {id:'accion',texto:'Buscó en el cajón y encontró el gorro.',orden:1},
  ],revisada:'Buscó en el cajón y encontró su gorro rojo y suave.',
 },
};

export const TEMAS_EXPLORADORES_LENGUA = Object.keys(EXPLORADORES_LENGUA);
export function getExploradorLengua(tema){return EXPLORADORES_LENGUA[tema] || null;}
export function explicarOrdenHistoria(ids){
 const paso=EXPLORADORES_LENGUA.produccion_escrita_narracion.tarjetas;
 if(!ids.length)return 'Elegí qué querés contar primero. Podés deshacer y probar otro orden.';
 const orden=ids.map(id=>paso.find(t=>t.id===id)?.orden);
 if(orden.some(n=>n===undefined))return 'Elegí una tarjeta de esta historia.';
 if(orden.every((n,i)=>n===i))return ids.length===3?'Se entiende el recorrido: problema → búsqueda → resultado. Ahora podés mejorar un detalle.':'El comienzo se entiende. Elegí qué sucede después.';
 return 'Este orden puede confundir: la búsqueda ayuda a resolver el problema y el resultado viene después. Probá problema → acción → resultado; también podés leer tu versión y compararla.';
}
