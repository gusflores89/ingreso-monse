import { UNIDADES_H } from './contenido-h.js';
// Material propio: primero el significado, después el nombre gramatical.
// Los últimos dos casos se reservan para transferencia y no se sirven como práctica.
export const UNIDADES_LENGUA_R27=[];
function agregar(id,tema,titulo,explicacion,ejemplo,pasos,consigna,opciones,casos,nodos){
 const uid='leng_prof_r27_'+id;
 const actividades=casos.map(([texto,correcta,razon,alternativas],i)=>({
  id:uid+'-'+(i<6?'p':'t')+i,enunciado:consigna,
  visual:{tipo:'lectura',titulo:'Leé esta situación',texto},respuesta_correcta:correcta,
  opciones:(()=>{const todas=alternativas||opciones,otras=todas.filter(x=>x!==correcta);otras.splice(i%todas.length,0,correcta);return otras;})(),
  paso_resuelto:razon,
 }));
 if(casos.length!==8)throw Error('Se requieren seis prácticas y dos transferencias: '+uid);
 UNIDADES_LENGUA_R27.push({id:uid,tema,titulo,explicacion,ejemplo,pasos,pista:pasos[0],
  visual:{tipo:'mapa',titulo:'Del ejemplo a la idea',nodos},actividades:actividades.slice(0,6),transferencia:actividades.slice(6)});
}
const mapa=(a,b,c)=>[{titulo:'Observá',texto:a},{titulo:'Relacioná',texto:b},{titulo:'Recordá',texto:c}];
const G='ortografia_g_j_gu_gu',C='ortografia_c_s_z',S='sustantivos_genero_numero_tipo',V='verbos_modo_indicativo_tiempos',D='discurso_conectores_sinonimos',N='produccion_escrita_narracion';

agregar('gue',G,'GUE y GUI: una U que no suena','En gato o gorro, la G tiene un sonido suave. Delante de E o I escribimos GU para conservarlo: guerra, guitarra. Esa U no se pronuncia.','En guitarra leemos gui, sin hacer sonar la U.',['Mirá la vocal que viene después de G.','Delante de E o I, GU conserva el sonido de gato.'],'¿Qué grupo completa la palabra?',['gue','gui','ge'],[
 ['Toco la ___tarra.','gui','Guitarra se escribe con gui; la U no suena.'],['La ___rra terminó.','gue','Guerra empieza con gue.'],['El ___so está caliente.','gui','Guiso empieza con gui.'],['Llegó el ___rrero.','gue','Guerrero empieza con gue.'],['El á___la vuela.','gui','Águila contiene gui.'],['La man___ra riega.','gue','Manguera contiene gue.'],['Mi ami___ta canta.','gui','Amiguita conserva el sonido de amiga con gui.'],['El ju___te es nuevo.','gue','Juguete tiene gue; la U no suena.']
],mapa('gato → sonido suave','guerra · guitarra','GUE / GUI: la U no suena'));
agregar('dieresis',G,'GÜE y GÜI: los puntitos hacen sonar la U','En pingüino y cigüeña sí pronunciamos la U. Los dos puntos sobre ella se llaman diéresis. Sirven para distinguir güi/güe de gui/gue.','guitarra: U silenciosa; pingüino: U que suena.',['Buscá si la U tiene dos puntos.','En güe y güi la U se pronuncia.'],'¿Se pronuncia la U marcada en la palabra?',['Sí','No'],[
 ['pingüino','Sí','La diéresis indica que la U suena.'],['guitarra','No','En gui sin diéresis no suena la U.'],['cigüeña','Sí','La U de güe tiene diéresis.'],['guerra','No','En gue sin diéresis la U no suena.'],['vergüenza','Sí','Güe lleva diéresis: pronunciamos la U.'],['guiso','No','Gui no lleva diéresis.'],['bilingüe: habla dos lenguas','Sí','La palabra termina en güe; la U suena.'],['manguera','No','La U de gue no lleva diéresis.']
],mapa('guitarra → gui','pingüino → güi','Los dos puntos se llaman diéresis'));
agregar('ger_gir',G,'Recoger y dirigir; tejer y crujir','Los verbos terminados en -ger y -gir se escriben generalmente con G. Tejer y crujir son excepciones: se escriben con J. Aprendemos estas dos palabras junto a la regla.','recoger → G; tejer → J.',['Mirá la terminación del verbo.','Recordá las excepciones tejer y crujir.'],'¿Qué letra falta?',['g','j'],[
 ['reco_er','g','Recoger termina en -ger.'],['te_er','j','Tejer es una excepción con J.'],['diri_ir','g','Dirigir termina en -gir.'],['cru_ir','j','Crujir es una excepción con J.'],['prote_er','g','Proteger termina en -ger.'],['ele_ir','g','Elegir termina en -gir.'],['reco_er hojas','g','La regla de -ger se mantiene en este contexto.'],['cru_ir una rama','j','Crujir se escribe con J también en esta frase.']
],mapa('-ger / -gir → generalmente G','recoger · dirigir','Excepciones: tejer · crujir'));
agregar('aje',G,'Terminaciones -aje y -jería','Viaje, traje y paisaje terminan en -aje y llevan J. También llevan J palabras terminadas en -jería, como relojería. Miramos el final, no cualquier sonido parecido.','El paisaje se ve desde la relojería.',['Buscá el final -aje o -jería.','Escribí J en estas terminaciones.'],'¿Qué letra completa la terminación?',['j','g'],[
 ['via_e','j','Viaje termina en -aje.'],['tra_e','j','Traje termina en -aje.'],['paisa_e','j','Paisaje termina en -aje.'],['relo_ería','j','Relojería termina en -jería.'],['mensa_e','j','Mensaje termina en -aje.'],['cerra_ería','j','Cerrajería termina en -jería.'],['equipa_e','j','Equipaje termina en -aje.'],['pasa_e','j','Pasaje termina en -aje.']
],mapa('viaje · paisaje','relojería · cerrajería','Miramos la terminación'));

agregar('plural_z',C,'De una Z a muchas C: pez y peces','Al pasar una palabra terminada en Z al plural, cambiamos Z por C y agregamos -es. No cambiamos todas las zetas de cualquier palabra.','pez → peces; luz → luces.',['Buscá la Z al final del singular.','Cambiá esa Z por C y agregá -es.'],'Elegí el plural correcto.',[],[
 ['Un pez; varios…','peces','Pez termina en Z: peces.', ['peces','pezes']],['Una luz; varias…','luces','Luz pasa a luces.', ['luzes','luces']],['Un lápiz; varios…','lápices','Lápiz pasa a lápices.', ['lápices','lápizes']],['Una nuez; varias…','nueces','Nuez pasa a nueces.', ['nuezes','nueces']],['Una voz; varias…','voces','Voz pasa a voces.', ['voces','vozes']],['Una cruz; varias…','cruces','Cruz pasa a cruces.', ['cruzes','cruces']],['Una raíz; varias…','raíces','La Z final cambia por C.', ['raíces','raízes']],['Un disfraz; varios…','disfraces','Disfraz cambia su Z final por C.', ['disfrazes','disfraces']]
],mapa('pez → final Z','pec + es','peces → plural con C'));
agregar('oso_eza',C,'Nombrar una cualidad y describirla','Hermoso describe cómo es algo; hermosura nombra su cualidad. Las terminaciones -oso/-osa llevan S. Las palabras como belleza, tristeza y limpieza terminan en -eza, con Z.','Una habitación limpia tiene limpieza.',['Decidí si la terminación es -oso/-osa o -eza.','-oso/-osa lleva S; -eza lleva Z.'],'¿Qué letra falta?',['s','z'],[
 ['hermo_o','s','Hermoso termina en -oso.'],['belle_a','z','Belleza termina en -eza.'],['famo_a','s','Famosa termina en -osa.'],['triste_a','z','Tristeza termina en -eza.'],['limpie_a','z','Limpieza termina en -eza.'],['ruido_o','s','Ruidoso termina en -oso.'],['curio_a','s','Curiosa termina en -osa.'],['rique_a','z','Riqueza termina en -eza.']
],mapa('ruido → ruidoso','bello → belleza','-oso: S / -eza: Z'));
agregar('rr',C,'R y RR: escuchar y mirar la posición','Rana lleva una R al principio y tiene sonido fuerte. Entre vocales, el sonido fuerte se escribe RR: perro. Una R entre vocales suena suave: pero.','caro no es carro: cambian el sonido y el significado.',['Buscá si la letra está entre dos vocales.','Entre vocales, el sonido fuerte necesita RR. Al inicio basta R.'],'Elegí la escritura que corresponde a la frase.',[],[
 ['Mi mascota ladra: es un…','perro','Entre E y O, RR representa el sonido fuerte.', ['pero','perro']],['El vehículo con ruedas es un…','carro','Carro lleva RR entre vocales.', ['caro','carro']],['El precio es alto: es…','caro','Caro tiene sonido suave entre vocales.', ['caro','carro']],['La ___ana salta.','rana','Al comienzo escribimos una sola R.', ['rana','rrana']],['Quiero ir, ___ estoy enferma.','pero','Pero une ideas opuestas y lleva una R suave.', ['perro','pero']],['El ___ío lleva agua.','río','La R inicial suena fuerte sin duplicarse.', ['rrío','río']],['El ___eloj marca la hora.','reloj','Al inicio, el sonido fuerte se escribe con una R.', ['rreloj','reloj']],['El ___atón busca queso.','ratón','Ratón comienza con una sola R.', ['ratón','rratón']]
],mapa('rana → R inicial','pero → R suave','perro → RR entre vocales'));

agregar('vocales','diptongo_hiato','Vocales que comparten o separan sílaba','Primero separamos al decir la palabra. A, E y O son vocales abiertas. I y U son cerradas. En ai-re, A e I van juntas; en te-a-tro, E y A se separan.','ai-re: juntas; te-a-tro: separadas.',['Leé la separación que muestra la tarjeta.','Dos vocales en una sílaba: diptongo. En sílabas distintas: hiato.'],'¿Las dos vocales señaladas van juntas o separadas?',['Juntas: diptongo','Separadas: hiato'],[
 ['ai-re: AI','Juntas: diptongo','AI está en la misma sílaba.'],['te-a-tro: EA','Separadas: hiato','E y A aparecen a ambos lados del guion.'],['cui-da-do: UI','Juntas: diptongo','UI comparte sílaba.'],['po-e-ta: OE','Separadas: hiato','O y E pertenecen a sílabas distintas.'],['puer-ta: UE','Juntas: diptongo','UE está dentro de puer.'],['ca-er: AE','Separadas: hiato','A y E están separadas.'],['cau-sa: AU','Juntas: diptongo','AU está dentro de cau.'],['le-er: EE','Separadas: hiato','Las dos E forman sílabas distintas.']
],mapa('A · E · O: abiertas','ai-re: juntas','te-a-tro: separadas'));
agregar('hiato_tilde','diptongo_hiato','La I o U fuerte puede separar las vocales','En país, la fuerza cae en la I. Escribimos pa-ís y la I lleva tilde. Una I o U tónica junto a una vocal abierta forma hiato y lleva tilde: ba-úl, rí-o. Una H intercalada no lo impide: bú-ho.','río: rí-o; ruido: rui-do.',['Decí la palabra y mirá dónde está la fuerza.','La I o U fuerte junto a A, E u O lleva tilde y se separa.'],'Elegí la separación correcta.',[],[
 ['país','pa-ís','La I tónica se separa de A.', ['pa-ís','país']],['baúl','ba-úl','La U tónica se separa de A.', ['baúl','ba-úl']],['río','rí-o','La I tónica se separa de O.', ['rí-o','río']],['día','dí-a','La I tónica se separa de A.', ['día','dí-a']],['maíz','ma-íz','La I tónica se separa de A.', ['ma-íz','maíz']],['frío','frí-o','La I tónica se separa de O.', ['frío','frí-o']],['raíz','ra-íz','La I tónica se separa de A.', ['ra-íz','raíz']],['búho','bú-ho','La H no impide el hiato entre Ú y O.', ['búho','bú-ho']]
],mapa('país → fuerza en Í','pa-ís → dos sílabas','Í / Ú fuerte: hiato con vocal abierta'));

agregar('tu_mi','tilde_diacritica_monosilabos','Tu mochila y tú: cambia lo que queremos decir','Tu acompaña algo que te pertenece: tu mochila. Tú nombra a la persona: tú vienes. Mi acompaña algo mío; mí aparece, por ejemplo, en para mí. Primero miramos el sentido de la frase.','Tu libro es para mí. Tú puedes leer mi cuaderno.',['Buscá si la palabra acompaña una cosa o nombra a una persona.','tu/mi acompañan; tú/mí nombran a la persona.'],'Elegí la palabra que completa la frase.',[],[
 ['___ mochila está abierta.','Tu','Tu acompaña mochila.', ['Tú','Tu']],['___ llegaste temprano.','Tú','Tú nombra a la persona que llegó.', ['Tu','Tú']],['Ese regalo es para ___.','mí','Para mí se refiere a la persona.', ['mi','mí']],['___ perro duerme.','Mi','Mi acompaña perro.', ['Mi','Mí']],['___ ventana está abierta.','Tu','Tu acompaña ventana.', ['Tú','Tu']],['___ eliges el juego.','Tú','Tú nombra a quien elige.', ['Tu','Tú']],['Guardá eso para ___.','mí','Después de para, mí nombra a la persona.', ['mí','mi']],['___ lápiz es verde.','Mi','Mi acompaña lápiz.', ['Mí','Mi']]
],mapa('tu mochila → acompaña','tú vienes → persona','mi libro / para mí'));
agregar('el_te','tilde_diacritica_monosilabos','El libro, él y el té','El acompaña un nombre: el libro. Él reemplaza a una persona: él lee. Te nombra a quien recibe algo: te llamo. Té es la bebida. La tilde ayuda a distinguir usos.','Él te ofrece el té.',['Probá qué significa la palabra dentro de la oración.','Persona: él. Bebida: té. Acompañante: el. Destinatario: te.'],'Elegí la palabra que completa la frase.',[],[
 ['___ libro es nuevo.','El','El acompaña libro.', ['Él','El']],['___ llegó en bici.','Él','Él nombra a la persona.', ['El','Él']],['Quiero una taza de ___.','té','Té es una bebida.', ['te','té']],['Yo ___ llamo mañana.','te','Te indica a quién llamo.', ['té','te']],['___ gato duerme.','El','El acompaña gato.', ['El','Él']],['___ prepara la merienda.','Él','Él se refiere a una persona.', ['Él','El']],['¿___ gusta leer?','te','Te nombra a quien le gusta leer.', ['té','te']],['Sirvieron ___ con leche.','té','Se habla de la bebida.', ['té','te']]
],mapa('el libro / él lee','te llamo / té para beber','El significado decide la tilde'));

agregar('nombres',S,'Palabras para nombrar: comunes y propios','Gata nombra una clase de animal; Luna puede ser el nombre de una gata. Los nombres comunes se escriben con minúscula salvo al empezar oración. Los nombres propios distinguen a alguien o un lugar y llevan mayúscula.','La gata Luna vive en Córdoba.',['Preguntate si nombra una clase o un nombre particular.','Gata es común; Luna es propio.'],'¿La palabra indicada es un nombre común o propio?',['Común','Propio'],[
 ['La gata Luna duerme. → gata','Común','Gata nombra cualquier animal de esa clase.'],['La gata Luna duerme. → Luna','Propio','Es el nombre particular de la gata.'],['Visitamos Córdoba. → Córdoba','Propio','Es el nombre de una ciudad.'],['Mi hermano cocina. → hermano','Común','Nombra una relación, no el nombre de la persona.'],['Abril lee. → Abril','Propio','Aquí Abril es nombre de persona.'],['El río creció. → río','Común','No indica el nombre particular del río.'],['El perro Tito corre. → Tito','Propio','Tito distingue a ese perro.'],['Compré una mochila. → mochila','Común','Mochila nombra un tipo de objeto.']
],mapa('gata → una clase','Luna → una en particular','común / propio'));
agregar('numero',S,'Una y varias: singular y plural','Gato nombra uno; gatos nombra varios. Llamamos singular al primero y plural al segundo. Muchos nombres agregan -s o -es; pez cambia a peces.','Un árbol → dos árboles.',['Mirá si se habla de uno o de varios.','Singular: uno. Plural: varios.'],'¿La palabra está en singular o plural?',['Singular','Plural'],[
 ['árbol','Singular','Nombra uno.'],['árboles','Plural','Nombra varios.'],['lápices','Plural','Nombra varios lápices.'],['flor','Singular','Nombra una.'],['flores','Plural','Nombra varias.'],['pez','Singular','Nombra uno.'],['peces','Plural','Es el plural de pez.'],['cuaderno','Singular','Nombra uno.']
],mapa('un árbol → singular','dos árboles → plural','Miramos la cantidad nombrada'));
agregar('colectivos',S,'Una abeja y un enjambre','Abeja es un nombre individual. Enjambre nombra un conjunto de abejas aunque esté en singular: es un nombre colectivo. No confundimos colectivo con plural.','Una oveja; un rebaño de ovejas.',['Preguntate si la palabra en singular nombra un conjunto.','Enjambre y rebaño son colectivos; abejas es plural de un individual.'],'¿La palabra indicada es individual o colectiva?',['Individual','Colectiva'],[
 ['Una abeja vuela. → abeja','Individual','Nombra un animal.'],['Un enjambre se mueve. → enjambre','Colectiva','Nombra un conjunto de abejas.'],['Una oveja pasta. → oveja','Individual','Nombra un animal.'],['Un rebaño descansa. → rebaño','Colectiva','Nombra un conjunto de ovejas.'],['Un árbol crece. → árbol','Individual','Nombra uno.'],['Una arboleda da sombra. → arboleda','Colectiva','Nombra un conjunto de árboles.'],['Las abejas vuelan. → abejas','Individual','Es plural del nombre individual abeja.'],['Dos rebaños pasan. → rebaños','Colectiva','Es plural de un nombre que ya indica conjunto.']
],mapa('abeja → individual','enjambre → colectivo','Colectivo no es lo mismo que plural'));
agregar('abstractos',S,'Objetos y sentimientos: concreto y abstracto','Una mesa es un objeto que podemos percibir; alegría nombra un sentimiento. Llamamos concretos a nombres como mesa y perfume; abstractos a nombres como alegría o paciencia. No significa que los sentimientos no existan.','El regalo produjo alegría.',['Decidí si nombra un objeto perceptible o una cualidad/sentimiento.','Perfume es concreto aunque lo percibamos por el olor.'],'¿El nombre es concreto o abstracto?',['Concreto','Abstracto'],[
 ['mesa','Concreto','Nombra un objeto.'],['alegría','Abstracto','Nombra un sentimiento.'],['perfume','Concreto','Nombra algo que percibimos por el olor.'],['paciencia','Abstracto','Nombra una cualidad.'],['pelota','Concreto','Nombra un objeto.'],['tristeza','Abstracto','Nombra un sentimiento.'],['amistad','Abstracto','Nombra una relación entre personas.'],['campana','Concreto','Nombra un objeto perceptible.']
],mapa('mesa · perfume → concretos','alegría · paciencia → abstractos','Abstracto no significa inexistente'));
agregar('articulos',S,'Palabras que acompañan: el, la, un, una','El, la, los y las acompañan nombres y presentan algo identificado. Un, una, unos y unas pueden presentar algo sin identificarlo. Se llaman artículos. Cambian para acompañar al nombre.','La gata mira unas flores.',['Buscá la palabra corta que acompaña al nombre.','El artículo y el nombre deben concordar.'],'Elegí el artículo que concuerda.',[],[
 ['___ gata','la','Gata es femenino singular.', ['la','los']],['___ perros','los','Perros es masculino plural.', ['el','los']],['___ flores','unas','Flores es femenino plural.', ['un','unas']],['___ lápiz','un','Lápiz es masculino singular.', ['unas','un']],['___ ventanas','las','Ventanas es femenino plural.', ['la','las']],['___ árbol','el','Árbol es masculino singular.', ['el','los']],['___ casa','una','Casa es femenino singular.', ['unos','una']],['___ cuadernos','unos','Cuadernos es masculino plural.', ['una','unos']]
],mapa('la + gata','unas + flores','Artículo y nombre se acompañan'));
agregar('adjetivos',S,'Describir con adjetivos','En gata negra, negra cuenta cómo es la gata. Es un adjetivo. Puede cambiar para acompañar al nombre: gato negro, gatas negras. El nombre dice qué; el adjetivo agrega cómo es.','Las flores rojas perfuman el patio.',['Buscá el nombre de la cosa o persona.','Después buscá la palabra que cuenta cómo es.'],'¿Qué palabra describe al nombre?',[],[
 ['La gata negra duerme.','negra','Negra describe a gata.', ['gata','negra']],['El perro pequeño corre.','pequeño','Pequeño describe a perro.', ['pequeño','corre']],['Las flores rojas crecen.','rojas','Rojas describe a flores.', ['flores','rojas']],['La mochila pesada cayó.','pesada','Pesada describe a mochila.', ['cayó','pesada']],['El árbol alto da sombra.','alto','Alto describe a árbol.', ['alto','árbol']],['La sopa caliente humea.','caliente','Caliente describe a sopa.', ['sopa','caliente']],['Los zapatos nuevos brillan.','nuevos','Nuevos describe a zapatos.', ['brillan','nuevos']],['Una niña curiosa pregunta.','curiosa','Curiosa describe a niña.', ['curiosa','pregunta']]
],mapa('gata → qué animal','negra → cómo es','gata negra / gatas negras'));

agregar('infinitivo',V,'El nombre de una acción: infinitivo','Canto, cantás y cantamos cambian con la persona. Para nombrar la acción sin elegir persona decimos cantar: es el infinitivo. Termina en -ar, -er o -ir.','comemos → comer; vivimos → vivir.',['Buscá la acción y su nombre sin persona.','Los infinitivos terminan en -ar, -er o -ir.'],'¿Cuál es el infinitivo?',[],[
 ['Yo canto.','cantar','Cantar nombra la acción.', ['cantar','canto']],['Nosotros comemos.','comer','Comer nombra la acción.', ['comemos','comer']],['Ella vive.','vivir','Vivir nombra la acción.', ['vivir','vive']],['Vos saltás.','saltar','Saltar termina en -ar.', ['saltás','saltar']],['Yo leo.','leer','Leer termina en -er.', ['leer','leo']],['Ellas escriben.','escribir','Escribir termina en -ir.', ['escriben','escribir']],['Nosotros bebemos.','beber','Beber nombra la acción.', ['beber','bebemos']],['Ustedes abren.','abrir','Abrir nombra la acción.', ['abren','abrir']]
],mapa('canto · cantás · cantamos','cantar → nombre de la acción','Infinitivo: -ar / -er / -ir'));
agregar('personas',V,'Quién habla: yo, vos, ella, nosotros','Yo es quien habla: primera persona. Vos/tú es a quien se habla: segunda. Ella/él es de quien se habla: tercera. Nosotros es primera plural; ellos, tercera plural. Usted y ustedes nombran a quienes escuchan: son segunda persona del trato, aunque usan formas verbales de tercera persona.','Yo canto; nosotros cantamos.',['Buscá quién realiza la acción.','Yo/nosotros: primera; vos/tú: segunda; él/ella/ellos: tercera.'],'¿Qué persona indica el sujeto?',['Primera','Segunda','Tercera'],[
 ['Yo leo.','Primera','Yo es quien habla.'],['Vos leés.','Segunda','Vos es a quien se habla.'],['Ella lee.','Tercera','Se habla de ella.'],['Nosotros leemos.','Primera','Nosotros incluye a quien habla.'],['Ellos leen.','Tercera','Se habla de ellos.'],['Tú lees.','Segunda','Tú nombra a quien se habla.'],['Él canta.','Tercera','Se habla de él.'],['Nosotras cantamos.','Primera','Nosotras incluye a quien habla.']
],mapa('yo / nosotros → primera','vos / tú → segunda','él / ella / ellos → tercera'));
const tiempos=[
 ['presente','Ahora o habitualmente: presente','El presente puede contar lo que pasa ahora o algo habitual. No necesitamos que ocurra solo en este segundo.','Hoy leo; todos los días camino.','Presente',[
 ['Ahora dibujo.','Presente'],['Ayer dibujé.','Pasado'],['Todos los días corro.','Presente'],['El año pasado corría.','Pasado'],['Hoy cocino.','Presente'],['Ayer cociné.','Pasado'],['Cada mañana desayuno.','Presente'],['Ayer desayuné.','Pasado']],['Presente','Pasado']],
 ['pasados','Dos formas de mirar el pasado: canté y cantaba','Canté presenta un hecho como terminado. Cantaba puede mostrar una costumbre del pasado o lo que estaba ocurriendo. Se llaman pretérito perfecto simple e imperfecto.','Ayer canté una canción. Cuando era chica, cantaba cada tarde.','Pasado',[
 ['Ayer canté una canción.','Hecho terminado'],['Antes cantaba cada tarde.','Costumbre pasada'],['Ayer caminé hasta la plaza.','Hecho terminado'],['De pequeña caminaba a diario.','Costumbre pasada'],['El lunes jugué un partido.','Hecho terminado'],['Antes jugaba cada lunes.','Costumbre pasada'],['Ayer compré un cuaderno.','Hecho terminado'],['Antes compraba pan cada mañana.','Costumbre pasada']],['Hecho terminado','Costumbre pasada']],
 ['futuro','Lo que vendrá: futuro simple','Leeré, viajaré y comeré sitúan acciones después del momento de hablar. Son formas del futuro simple. Primero ubicamos cuándo sucede la acción.','Mañana visitaré a mi abuela.','Futuro',[
 ['Mañana viajaré.','Futuro'],['Ahora dibujo.','Presente'],['Después leeré.','Futuro'],['Hoy camino.','Presente'],['Mañana cocinaré.','Futuro'],['Ahora canto.','Presente'],['La semana próxima visitaré el museo.','Futuro'],['Cada día escribo.','Presente']],['Futuro','Presente']],
 ['condicional','Lo que haría: condicional simple','Leería y viajaría pueden expresar algo que haríamos si se cumpliera una condición. La terminación -ría ayuda a reconocer el condicional simple.','Si tuviera tiempo, leería ese libro.','Condicional',[
 ['Si pudiera, viajaría.','Condicional'],['Mañana viajaré.','Futuro'],['Con una bici, llegaría antes.','Condicional'],['Mañana llegaré temprano.','Futuro'],['Con ayuda, cocinaría una torta.','Condicional'],['Mañana cocinaré.','Futuro'],['Si tuviera el libro, lo leería.','Condicional'],['Mañana leeré ese libro.','Futuro']],['Condicional','Futuro']],
];
for(const [id,titulo,explicacion,ejemplo,label,casos,opciones] of tiempos)agregar(id,V,titulo,explicacion,ejemplo,['Ubicá cuándo o en qué condición pasa la acción.','Compará con el ejemplo antes de nombrar el tiempo.'],'Elegí la descripción de la acción.',opciones,casos.map(([t,a])=>[t,a,'La frase «'+t+'» presenta '+a.toLowerCase()+'.']),mapa(ejemplo,label,'Primero el sentido, después el nombre'));
agregar('participio',V,'Dos piezas para un tiempo compuesto','He cantado combina haber y cantado. Cantado es un participio: muchos terminan en -ado o -ido. Algunos cambian: hacer → hecho, ver → visto. Las dos piezas forman el tiempo compuesto.','He comido: he + comido.',['Buscá una forma de haber junto a un participio.','He comido tiene dos piezas; comí tiene una.'],'¿La expresión tiene un tiempo simple o compuesto?',['Simple','Compuesto'],[
 ['He cantado.','Compuesto','He + cantado son las dos piezas.'],['Canté.','Simple','Canté es una forma simple.'],['Había comido.','Compuesto','Había + comido son dos piezas.'],['Comía.','Simple','Comía es una forma simple.'],['Habré terminado.','Compuesto','Habré + terminado son dos piezas.'],['Terminaré.','Simple','Terminaré es una forma simple.'],['Habría viajado.','Compuesto','Habría + viajado son dos piezas.'],['Viajaba.','Simple','Viajaba es una forma simple.']
],mapa('haber: he / había / habré','participio: cantado / comido','he + comido → tiempo compuesto'));
agregar('pluscuamperfecto',V,'Antes de otro momento pasado: había salido','Había salido cuenta algo anterior a otro momento pasado. Se llama pretérito pluscuamperfecto. Dibujamos el orden: primero salió; después llegué yo.','Cuando llegué, Ana ya había salido.',['Buscá los dos momentos del pasado.','Había + participio indica lo que ya había ocurrido.'],'¿Qué ocurrió primero?',[],[
 ['Cuando llegué, Ana ya había salido.','Ana salió','Había salido es anterior a llegué.', ['Yo llegué','Ana salió']],['Cuando cenamos, ya había terminado la tarea.','Terminé la tarea','Había terminado es anterior a cenamos.', ['Cenamos','Terminé la tarea']],['Cuando abrió la tienda, ya habíamos llegado.','Llegamos','Habíamos llegado es anterior a abrió.', ['Llegamos','Abrió la tienda']],['Al empezar la película, ya había comprado las entradas.','Compré las entradas','Había comprado es anterior a empezar.', ['Empezó la película','Compré las entradas']],['Cuando llovió, ya habíamos guardado la ropa.','Guardamos la ropa','Habíamos guardado es anterior a llovió.', ['Guardamos la ropa','Llovió']],['Cuando sonó el timbre, ya había preparado la mochila.','Preparé la mochila','Había preparado es anterior a sonó.', ['Sonó el timbre','Preparé la mochila']],['Cuando llegó Luis, Eva ya había cocinado.','Eva cocinó','Había cocinado es anterior a llegó.', ['Llegó Luis','Eva cocinó']],['Al comenzar la clase, ya había leído el texto.','Leí el texto','Había leído es anterior a comenzar.', ['Leí el texto','Comenzó la clase']]
],mapa('1. Ana salió','2. Yo llegué','Ya había salido cuando llegué'));

agregar('sujeto','sujeto_predicado_nucleo','De quién hablamos y qué contamos','En la gata duerme hablamos de la gata: es el sujeto. Duerme es lo que contamos: es el predicado. El verbo cambia si decimos las gatas duermen; eso ayuda a localizar el sujeto.','La gata duerme → Las gatas duermen.',['Buscá el verbo y probá cambiar uno por varios.','La parte que concuerda con el verbo es el sujeto.'],'Elegí el sujeto de la oración.',[],[
 ['La gata duerme.','La gata','La gata concuerda con duerme.', ['La gata','duerme']],['Los perros corren.','Los perros','Los perros concuerda con corren.', ['corren','Los perros']],['Mi hermana canta.','Mi hermana','Mi hermana concuerda con canta.', ['Mi hermana','canta']],['Las flores crecen.','Las flores','Las flores concuerda con crecen.', ['crecen','Las flores']],['El tren llegó.','El tren','El tren concuerda con llegó.', ['El tren','llegó']],['Los chicos leen.','Los chicos','Los chicos concuerda con leen.', ['leen','Los chicos']],['En el patio juegan las nenas.','las nenas','Las nenas concuerda con juegan aunque esté al final.', ['En el patio','las nenas']],['Ayer llegó mi primo.','mi primo','Mi primo concuerda con llegó.', ['Ayer','mi primo']]
],mapa('La gata → de quién hablamos','duerme → qué contamos','sujeto / predicado'));
agregar('nucleos','sujeto_predicado_nucleo','Uno o dos núcleos del sujeto','El núcleo es la palabra central del sujeto. En la gata negra, es gata. En Ana y Luis cantan hay dos núcleos: Ana y Luis. Un núcleo: sujeto simple; dos o más: compuesto.','La gata negra duerme: núcleo gata.',['Buscá los nombres centrales, no los adjetivos ni artículos.','Contá los núcleos: uno es simple; varios, compuesto.'],'¿El sujeto es simple o compuesto?',['Simple','Compuesto'],[
 ['La gata negra duerme.','Simple','El único núcleo es gata.'],['Ana y Luis cantan.','Compuesto','Ana y Luis son dos núcleos.'],['Las flores rojas crecen.','Simple','Flores es un solo núcleo aunque sea plural.'],['El gato y el perro comen.','Compuesto','Gato y perro son dos núcleos.'],['Los chicos del club juegan.','Simple','Chicos es el núcleo del sujeto.'],['Mamá y papá llegaron.','Compuesto','Mamá y papá son dos núcleos.'],['La maestra y los alumnos leen.','Compuesto','Maestra y alumnos son los núcleos.'],['Las dos hermanas cantan.','Simple','Hermanas es el único núcleo.']
],mapa('la gata negra → gata','Ana y Luis → dos núcleos','Simple no significa singular'));
agregar('predicado','sujeto_predicado_nucleo','Uno o dos verbos: predicado simple y compuesto','En Ana canta, el predicado tiene un verbo: canta. En Ana canta y baila, tiene dos: canta y baila. Es predicado verbal compuesto aunque el sujeto tenga un solo nombre.','Ana canta y baila: dos verbos para el mismo sujeto.',['Buscá las acciones conjugadas del predicado.','Un verbo: simple. Dos o más: compuesto.'],'¿El predicado verbal es simple o compuesto?',['Simple','Compuesto'],[
 ['Ana canta.','Simple','El único verbo es canta.'],['Ana canta y baila.','Compuesto','Tiene canta y baila.'],['Los chicos juegan.','Simple','El único verbo es juegan.'],['Luis come y bebe.','Compuesto','Tiene come y bebe.'],['El gato duerme.','Simple','El único verbo es duerme.'],['Eva lee y escribe.','Compuesto','Tiene lee y escribe.'],['Las nenas saltan y corren.','Compuesto','Tiene saltan y corren.'],['Ana y Luis estudian.','Simple','Estudian es un único verbo, aunque el sujeto sea compuesto.']
],mapa('Ana canta → un verbo','Ana canta y baila → dos','Contamos verbos, no personas'));
agregar('tacito','sujeto_predicado_nucleo','Cuando el sujeto no está escrito','En nosotros leemos, el sujeto está escrito: es expreso. En leemos, la forma del verbo permite recuperar nosotros: es tácito. No agregamos un sujeto a expresiones impersonales como llueve.','Guardamos los libros → nosotros/nosotras.',['Mirá la terminación del verbo y el contexto.','Un sujeto tácito se puede recuperar aunque no esté escrito.'],'¿Qué sujeto permite recuperar el verbo?',[],[
 ['Leemos cada tarde.','Nosotros/nosotras','Leemos es primera persona plural.', ['Nosotros/nosotras','Yo']],['Canto cada tarde.','Yo','Canto es primera persona singular.', ['Él','Yo']],['Caminamos al club.','Nosotros/nosotras','Caminamos es primera persona plural.', ['Nosotros/nosotras','Ella']],['Escribo una carta.','Yo','Escribo es primera persona singular.', ['Yo','Ellos']],['Cantás en el coro.','Vos','Cantás es una forma de segunda persona singular.', ['Nosotros/nosotras','Vos']],['Comemos temprano.','Nosotros/nosotras','Comemos es primera persona plural.', ['Yo','Nosotros/nosotras']],['Guardo mis libros.','Yo','Guardo es primera persona singular.', ['Yo','Vos']],['Leés un cuento.','Vos','Leés es una forma de segunda persona singular.', ['Ellas','Vos']]
],mapa('nosotros leemos → escrito','leemos → se recupera','expreso / tácito'));
agregar('concordancia','concordancia_sujeto_verbo','El verbo acompaña al núcleo del sujeto','El grupo de chicos llega: el núcleo es grupo, en singular. Los chicos llegan: chicos está en plural. La palabra más cercana al verbo no siempre es el núcleo.','El grupo de chicos llega al club.',['Buscá el núcleo del sujeto, aunque haya otras palabras en medio.','Hacé concordar el verbo con ese núcleo.'],'Elegí la forma que concuerda.',[],[
 ['El grupo de chicos ___ temprano.','llega','El núcleo grupo es singular.', ['llegan','llega']],['Los chicos ___ temprano.','llegan','Chicos es plural.', ['llegan','llega']],['La caja de lápices ___ abierta.','está','El núcleo caja es singular.', ['están','está']],['Las cajas ___ abiertas.','están','Cajas es plural.', ['está','están']],['Ana y Luis ___ en el patio.','juegan','El sujeto compuesto necesita plural.', ['juega','juegan']],['En el patio ___ una niña.','juega','Una niña es singular aunque esté al final.', ['juega','juegan']],['El ramo de flores ___ sobre la mesa.','está','El núcleo ramo es singular.', ['están','está']],['Ayer ___ mis primas.','llegaron','Mis primas es plural aunque vaya después del verbo.', ['llegó','llegaron']]
],mapa('el grupo [de chicos]','núcleo: grupo → singular','el grupo llega / los chicos llegan'));
agregar('concordancia_nombre','concordancia_sujeto_verbo','Nombre, artículo y adjetivo se acompañan','La gata negra pasa a las gatas negras. Artículo y adjetivo acompañan al nombre en género y número. Esta concordancia es distinta de elegir la persona del verbo.','El perro pequeño → los perros pequeños.',['Buscá el nombre y mirá si es uno o varios.','Ajustá las palabras que lo acompañan.'],'Elegí el grupo que concuerda.',[],[
 ['Hablamos de varias gatas.','las gatas negras','Las tres palabras están en femenino plural.', ['las gatas negra','las gatas negras']],['Hablamos de un perro.','el perro pequeño','Las tres palabras están en masculino singular.', ['el perro pequeño','los perro pequeños']],['Hablamos de varias flores.','las flores rojas','Flores necesita plural en sus acompañantes.', ['las flores rojas','la flores roja']],['Hablamos de una casa.','una casa nueva','Las tres palabras están en femenino singular.', ['unos casa nuevos','una casa nueva']],['Hablamos de varios libros.','los libros nuevos','Las tres palabras están en masculino plural.', ['los libros nuevos','el libros nueva']],['Hablamos de una ventana.','la ventana abierta','Las tres palabras están en femenino singular.', ['las ventana abierto','la ventana abierta']],['Hablamos de varios árboles.','unos árboles altos','Las tres palabras están en masculino plural.', ['unos árboles altos','una árboles alta']],['Hablamos de una mochila.','una mochila pesada','Las tres palabras están en femenino singular.', ['unos mochila pesado','una mochila pesada']]
],mapa('la gata negra','las gatas negras','Cambiamos juntas las palabras'));

agregar('conectores',D,'Porque, por eso y pero conectan ideas distintas','Porque introduce la causa. Por eso presenta la consecuencia. Pero muestra un contraste. Miramos la relación entre las ideas antes de elegir.','Llovió; por eso se mojó el patio.',['Buscá si la segunda idea da una razón, un resultado o un contraste.','Causa: porque. Resultado: por eso. Contraste: pero.'],'Elegí el conector que expresa la relación pedida.',[],[
 ['El patio se mojó ___ llovió. Buscamos la causa.','porque','Llovió explica por qué se mojó.', ['porque','pero']],['Llovió; ___ se mojó el patio. Buscamos la consecuencia.','por eso','Mojarse es el resultado.', ['porque','por eso']],['Quería salir, ___ se quedó. Buscamos el contraste.','pero','Quedarse contrasta con querer salir.', ['por eso','pero']],['Encendí la luz ___ estaba oscuro. Buscamos la causa.','porque','La oscuridad explica la acción.', ['pero','porque']],['Olvidé la llave; ___ no pude entrar. Buscamos la consecuencia.','por eso','No entrar es el resultado.', ['por eso','porque']],['Estudió, ___ todavía tiene dudas. Buscamos contraste.','pero','Las dudas contrastan con lo esperado.', ['porque','pero']],['Llevó abrigo ___ hacía frío. Buscamos causa.','porque','El frío es la causa.', ['porque','por eso']],['Perdió el tren; ___ llegó tarde. Buscamos consecuencia.','por eso','Llegar tarde es el resultado.', ['pero','por eso']]
],mapa('Se mojó porque llovió','Llovió; por eso se mojó','Quería salir, pero se quedó'));
agregar('sinonimos',D,'La palabra adecuada depende de la frase','Grande puede significar enorme al hablar de una casa. Pero una gran amiga puede ser una excelente amiga, no una amiga enorme. Para cambiar una palabra, conservamos el sentido de la frase.','Una gran amiga → una excelente amiga.',['Leé la frase completa, no solo la palabra.','Elegí un reemplazo que conserve su sentido.'],'¿Qué reemplazo conserva el sentido?',[],[
 ['Una gran amiga. Cambiamos gran.','excelente','Gran valora la amistad, no el tamaño.', ['enorme','excelente']],['Una casa grande. Cambiamos grande.','enorme','Se habla de tamaño.', ['enorme','excelente']],['Un día frío. Cambiamos frío.','helado','Se habla de temperatura.', ['helado','distante']],['Una respuesta fría. Cambiamos fría.','distante','Se habla del trato.', ['congelada','distante']],['Un trabajo difícil. Cambiamos difícil.','complicado','Ambas expresan dificultad.', ['complicado','rápido']],['Una persona veloz. Cambiamos veloz.','rápida','Se habla de velocidad.', ['lenta','rápida']],['Una charla breve. Cambiamos breve.','corta','Se habla de duración.', ['corta','pequeña de estatura']],['Una voz suave. Cambiamos suave.','delicada','Se habla de cómo suena.', ['áspera','delicada']]
],mapa('gran amiga → excelente','casa grande → enorme','La frase decide el significado'));
agregar('funciones',D,'Para qué se dice: informar, pedir o expresar','La biblioteca abre a las nueve informa un dato. Cerrá la puerta busca que alguien actúe. Estoy contenta expresa una emoción. Son distintas intenciones del lenguaje.','Llueve informa; traé paraguas pide; ¡qué alegría! expresa.',['Preguntate qué busca quien habla.','Información, pedido y emoción son intenciones diferentes.'],'¿Cuál es la intención principal?',['Informar','Pedir una acción','Expresar una emoción'],[
 ['El museo abre a las diez.','Informar','Comunica un horario.'],['Cerrá la puerta, por favor.','Pedir una acción','Busca que otra persona cierre.'],['¡Estoy muy contenta!','Expresar una emoción','Cuenta cómo se siente.'],['La ballena es un mamífero.','Informar','Comunica un dato.'],['Pasame el cuaderno.','Pedir una acción','Pide que alguien actúe.'],['¡Qué tristeza me da!','Expresar una emoción','Expresa un sentimiento.'],['El tren llega a las ocho.','Informar','Comunica un horario.'],['Guardá los lápices, por favor.','Pedir una acción','Busca una acción del destinatario.']
],mapa('Un dato → informar','Un pedido → actuar','Un sentimiento → expresar'));
agregar('cohesion',D,'Que el texto siga un hilo: coherencia y cohesión','Un texto coherente mantiene un sentido que podemos seguir. Para unir sus partes usamos conectores y palabras que recuperan otras: Ana encontró una llave. La guardó. La se refiere a la llave.','Ana encontró una llave. La guardó en su bolso.',['Buscá qué palabra anterior recupera la expresión señalada.','Estas relaciones unen las frases: eso ayuda a la cohesión.'],'¿A qué se refiere la palabra marcada?',[],[
 ['Ana encontró una llave. La guardó. → La','la llave','Es lo que Ana guardó.', ['Ana','la llave']],['Luis vio un perro. Lo acarició. → Lo','el perro','Es lo que Luis acarició.', ['el perro','Luis']],['Eva compró flores. Las puso en agua. → Las','las flores','Son las que puso en agua.', ['Eva','las flores']],['Tomás trajo libros. Los ordenó. → Los','los libros','Son los que ordenó.', ['los libros','Tomás']],['La torta estaba lista. Ana la cortó. → la','la torta','Es lo que cortó Ana.', ['Ana','la torta']],['Llegaron mis primas. Ellas trajeron pan. → Ellas','mis primas','Ellas recupera a las primas.', ['mis primas','pan']],['Encontré una moneda. La puse en la alcancía. → La','la moneda','Es lo que puse en la alcancía.', ['la alcancía','la moneda']],['Vi dos pájaros. Ellos volaron. → Ellos','los pájaros','Ellos recupera a los pájaros.', ['los pájaros','yo']]
],mapa('Ana encontró una llave','La guardó → la llave','Conectar frases: cohesión'));

agregar('momentos',N,'Una historia en tres momentos','Primero conocemos a alguien y su situación. Después aparece un problema. Al final vemos cómo se resuelve o qué cambia. No hace falta escribir mucho de entrada: empezamos con tres oraciones.','Lila llevaba una torta. Se rompió la caja. La sostuvo con una bandeja y llegó a tiempo.',['Buscá qué cambia la situación inicial.','Después comprobá que el final responde al problema.'],'¿Qué parte de la historia muestra la oración señalada?',['Inicio','Problema','Resolución'],[
 ['Lila llevaba una torta a la fiesta.','Inicio','Presenta personaje y situación.'],['Se rompió la caja y la torta casi cayó.','Problema','Aparece una dificultad.'],['Lila usó una bandeja y llegó con la torta entera.','Resolución','La bandeja resuelve la dificultad.'],['Nico salió a pasear en bicicleta.','Inicio','Presenta la situación inicial.'],['La rueda perdió aire lejos de casa.','Problema','La pérdida de aire cambia la situación.'],['Una vecina le prestó un inflador y pudo regresar.','Resolución','La ayuda permite resolver el problema.'],['Eva preparaba una maqueta para la escuela.','Inicio','Presenta personaje y situación.'],['La encontró mojada después de la lluvia.','Problema','La lluvia genera una dificultad.']
],mapa('Inicio → alguien en un lugar','Problema → algo cambia','Resolución → qué hizo y qué pasó'));
agregar('narrador',N,'Quién cuenta la historia: el narrador','Encontré una llave cuenta desde un yo que participa. Ana encontró una llave cuenta desde fuera, en tercera persona. El narrador es la voz que cuenta; no siempre coincide con quien escribió el cuento.','Yo abrí la puerta / Ana abrió la puerta.',['Mirá si la voz dice yo o habla de él/ella.','Separá la voz del relato de la persona que lo escribió.'],'¿En qué persona está narrado?',['Primera persona','Tercera persona'],[
 ['Encontré una llave en el patio.','Primera persona','El yo está en encontré.'],['Ana encontró una llave.','Tercera persona','Cuenta lo que hizo Ana.'],['Ayer abrí la puerta con cuidado.','Primera persona','El yo está en abrí.'],['Luis abrió la puerta.','Tercera persona','Cuenta lo que hizo Luis.'],['Nos escondimos detrás del árbol.','Primera persona','Nosotros participa en lo contado.'],['Los chicos se escondieron.','Tercera persona','Cuenta desde fuera del grupo.'],['Escuché un ruido y me detuve.','Primera persona','La voz participa en escuché y me.'],['Eva escuchó un ruido y se detuvo.','Tercera persona','Cuenta lo que hizo Eva.']
],mapa('yo encontré → participo','Ana encontró → cuento de ella','Narrador: la voz del relato'));
agregar('recursos',N,'Comparar, dar vida y escribir sonidos','Brilla como el sol compara dos cosas. El viento susurró da una acción humana al viento: personificación. ¡Toc, toc! imita un sonido: onomatopeya. Probamos un recurso por vez.','La puerta hizo ¡crac!; el viento la saludó.',['Buscá si compara, atribuye una acción humana o imita un sonido.','Usá el recurso para ayudar a imaginar la escena.'],'¿Qué recurso aparece?',['Comparación','Personificación','Onomatopeya'],[
 ['Corre como el viento.','Comparación','Como relaciona dos elementos.'],['El sol me sonrió.','Personificación','El sol recibe una acción humana.'],['¡Toc, toc! sonó en la puerta.','Onomatopeya','Toc imita el sonido.'],['Sus ojos brillan como estrellas.','Comparación','Relaciona ojos y estrellas con como.'],['La luna cuidaba el bosque.','Personificación','Cuidar se atribuye a la luna.'],['¡Miau! hizo el gato.','Onomatopeya','Miau imita el sonido.'],['La noche abrazó la ciudad.','Personificación','Abrazar se atribuye a la noche.'],['El hielo crujió: ¡crac!','Onomatopeya','Crac imita un sonido.']
],mapa('como el sol → compara','el viento susurra → da vida','¡toc, toc! → imita un sonido'));
agregar('puntuacion',N,'Puntos y comas ayudan a leer','El punto cierra una oración. La coma puede separar elementos de una lista. No ponemos coma entre el sujeto y el verbo solo porque el sujeto sea largo. Leemos por unidades de sentido.','Traje pan, queso y fruta. Después preparé la mesa.',['Buscá dónde termina una idea completa.','En una lista separá elementos con comas; antes de la última y normalmente no hace falta.'],'¿Qué escritura organiza mejor estas ideas?',[],[
 ['Una lista de tres alimentos.','pan, queso y fruta','Las comas separan elementos de la lista.', ['pan queso y, fruta','pan, queso y fruta']],['Dos oraciones completas.','Ana llegó. Luis salió.','El punto separa dos oraciones.', ['Ana llegó Luis salió.','Ana llegó. Luis salió.']],['Un sujeto y su verbo.','La gata negra duerme.','No se separa sujeto y verbo con coma.', ['La gata negra, duerme.','La gata negra duerme.']],['Una lista de útiles.','lápiz, goma y regla','La coma separa los primeros elementos.', ['lápiz, goma y regla','lápiz goma y, regla']],['Dos oraciones completas.','Llovió. El patio se mojó.','El punto separa dos ideas completas.', ['Llovió El patio se mojó.','Llovió. El patio se mojó.']],['Un sujeto largo y su verbo.','Los chicos del club cantan.','El sujeto largo tampoco se separa del verbo con coma.', ['Los chicos del club, cantan.','Los chicos del club cantan.']],['Una lista de colores.','rojo, azul y verde','Se separan elementos con coma.', ['rojo azul y, verde','rojo, azul y verde']],['Dos oraciones completas.','Sonó el timbre. Abrí la puerta.','Cada oración empieza con mayúscula y termina con punto.', ['Sonó el timbre Abrí la puerta.','Sonó el timbre. Abrí la puerta.']]
],mapa('Una idea completa → punto','pan, queso y fruta → lista','Sujeto + verbo: sin coma entre ellos'));
// La H conserva sus seis objetivos. La práctica usa únicamente los modelos enseñados.
const hCasos=[
 [['Dibujé un co_ete.','cohete'],['Vi una _ormiga.','hormiga'],['El co_ete de juguete cayó.','cohete'],['La _ormiga camina.','hormiga'],['Pinté otro co_ete.','cohete'],['La _ormiga lleva una hoja.','hormiga'],['En la tapa aparece un co_ete.','cohete'],['Seguí el camino de la _ormiga.','hormiga']],
 [['Guardé un _uevo.','huevo'],['El _ielo se derrite.','hielo'],['El perro busca un _ueso.','hueso'],['Vi una _uella.','huella'],['La _ierba crece.','hierba'],['El vaso tiene _ielo.','hielo'],['En la arena quedó una _uella.','huella'],['La gallina puso un _uevo.','huevo']],
 [['Hoy _ago un dibujo.','hago'],['Ayer Ana _izo una torta.','hizo'],['En casa _ay agua.','hay'],['Yo _ablo despacio.','hablo'],['Quiero _acer un avión.','hacer'],['Podemos _ablar después.','hablar'],['Mi vecino _izo una mesa.','hizo'],['En la caja _ay lápices.','hay']],
 [['Sale _umo.','humo'],['Hay _umedad.','humedad'],['Es una persona _umilde.','humilde'],['El _umo se ve de lejos.','humo'],['La pared tiene _umedad.','humedad'],['Su trato es _umilde.','humilde'],['La cocina se llenó de _umo.','humo'],['La lluvia dejó _umedad.','humedad']],
 [['El _idromasaje usa agua.','hidromasaje'],['Compramos en un _ipermercado.','hipermercado'],['El _idromasaje está lleno.','hidromasaje'],['Abrieron otro _ipermercado.','hipermercado'],['Apagaron el _idromasaje.','hidromasaje'],['El _ipermercado es grande.','hipermercado'],['Limpiaron el _idromasaje.','hidromasaje'],['Cerró el _ipermercado del barrio.','hipermercado']],
 [['La _ormiga sale.','hormiga'],['El _ormiguero tiene entradas.','hormiguero'],['El _ueso está sano.','hueso'],['Tejido ___ (modelo: óseo).','óseo'],['La _ormiga vuelve.','hormiga'],['El _ormiguero está cerca.','hormiguero'],['Encontraron otro _ueso.','hueso'],['Sistema ___ (modelo: óseo).','óseo']],
];
UNIDADES_H.forEach((u,j)=>{
 const actividades=hCasos[j].map(([texto,palabra],i)=>{
  const incorrecta=palabra==='óseo'?'hóseo':palabra.replace('h','');
  return {id:u.id+'-r27-'+i,enunciado:'Elegí la escritura que completa la frase.',visual:{tipo:'lectura',titulo:'Una frase para completar',texto},respuesta_correcta:palabra,opciones:i%2?[incorrecta,palabra]:[palabra,incorrecta],pista_concreta:'Mirá la palabra que aprendimos: '+palabra+'. Buscá la H o comprobá si este modelo no la lleva.',paso_resuelto:'Escribimos '+palabra+'. '+(palabra==='óseo'?'Óseo no lleva H, aunque se relacione con hueso.':'Conservamos la H del modelo aprendido.')};
 });
 UNIDADES_LENGUA_R27.push({...u,tema:'ortografia_h',visual:{tipo:'mapa',titulo:'Palabras para mirar',nodos:mapa(u.solucion,j===0?'cohete tiene H en el medio':u.respuesta,'Miramos la palabra; no inventamos reglas')},actividades:actividades.slice(0,6),transferencia:actividades.slice(6)});
});

agregar('br_bl','ortografia_b_v','B delante de R y L','Brazo y blanco empiezan con B. Escribimos B delante de R y L en estos grupos: br y bl. Miramos las letras vecinas.','brazo → br; blanco → bl.',['Buscá la R o L que sigue al hueco.','Antes de R o L, escribimos B.'],'¿Qué letra falta?',['b','v'],[
 ['_razo','b','Brazo empieza por br.'],['_lanco','b','Blanco empieza por bl.'],['_risa','b','Brisa empieza por br.'],['ta_la','b','Tabla contiene bl.'],['pue_lo','b','Pueblo contiene bl.'],['ca_ra (el animal)','b','Cabra contiene br.'],['a_rigo','b','Abrigo contiene br.'],['ha_lar','b','Hablar contiene bl.']
],mapa('brazo → BR','blanco → BL','B delante de R y L'));
agregar('bir_buir','ortografia_b_v','Escribir y contribuir; vivir, servir y hervir','Los verbos terminados en -bir y -buir llevan B, con las excepciones vivir, servir y hervir. Aprendemos la regla junto a esas tres excepciones.','escribir → B; vivir → V.',['Mirá el final -bir o -buir.','Revisá si es vivir, servir o hervir: llevan V.'],'¿Qué letra falta?',['b','v'],[
 ['escri_ir','b','Escribir termina en -bir.'],['vi_ir','v','Vivir es una excepción.'],['contri_uir','b','Contribuir termina en -buir.'],['ser_ir','v','Servir es una excepción.'],['reci_ir','b','Recibir termina en -bir.'],['her_ir (agua caliente)','v','Hervir es una excepción.'],['distri_uir','b','Distribuir termina en -buir.'],['su_ir','b','Subir termina en -bir.']
],mapa('-bir / -buir → B','escribir · contribuir','Excepciones: vivir, servir, hervir'));
agregar('mente','tildes_generales_agudas_graves_esdrujulas','Al agregar -mente, miramos la palabra inicial','Rápida tiene tilde; rápidamente la conserva. Lenta no tiene tilde; lentamente tampoco. No aplicamos a estas palabras la regla general mirando solo el final.','fácil → fácilmente; suave → suavemente.',['Separá la terminación -mente y mirá el adjetivo de origen.','Si ese adjetivo tiene tilde, la conserva.'],'Elegí la escritura correcta.',[],[
 ['rápida + mente','rápidamente','Rápida lleva tilde y la conserva.', ['rápidamente','rapidamente']],['lenta + mente','lentamente','Lenta no lleva tilde.', ['léntamente','lentamente']],['fácil + mente','fácilmente','Fácil conserva su tilde.', ['facilmente','fácilmente']],['suave + mente','suavemente','Suave no tiene tilde.', ['suavemente','suávemente']],['útil + mente','útilmente','Útil conserva su tilde.', ['utilmente','útilmente']],['clara + mente','claramente','Clara no lleva tilde.', ['cláramente','claramente']],['hábil + mente','hábilmente','Hábil conserva su tilde.', ['hábilmente','habilmente']],['feliz + mente','felizmente','Feliz no lleva tilde.', ['felízmente','felizmente']]
],mapa('rápida → rápidamente','lenta → lentamente','Se conserva la tilde del adjetivo'));
agregar('preguntas','tilde_diacritica_monosilabos','Qué y cómo al preguntar, aun sin signos','Qué, quién, cómo y cuándo llevan tilde cuando preguntan o exclaman. Una pregunta puede estar dentro de otra frase: no sé cuándo llega. En te aviso cuando llegue, cuando no pregunta.','¿Qué pasó? / No sé qué pasó.',['Buscá si la palabra introduce algo que se pregunta.','Una pregunta indirecta también puede llevar tilde.'],'Elegí la escritura que completa la oración.',[],[
 ['¿___ pasó?','Qué','Introduce una pregunta.', ['Que','Qué']],['No sé ___ pasó.','qué','Es una pregunta indirecta.', ['qué','que']],['Creo ___ vendrá.','que','Une la afirmación; no pregunta.', ['qué','que']],['¿___ venís?','Cuándo','Pregunta por el momento.', ['Cuando','Cuándo']],['Te aviso ___ llegue.','cuando','No pregunta; indica un momento.', ['cuando','cuándo']],['No sé ___ hacerlo.','cómo','Expresa una pregunta indirecta.', ['como','cómo']],['¿___ llamó?','Quién','Pregunta por una persona.', ['Quien','Quién']],['¡___ calor!','Qué','Introduce una exclamación.', ['Qué','Que']]
],mapa('¿Qué pasó? → pregunta','No sé qué pasó → pregunta indirecta','Me dijo que vino → no pregunta'));
agregar('aun','tilde_diacritica_monosilabos','Aún es todavía; aun puede ser incluso','Aún lleva tilde cuando significa todavía. Aun no lleva tilde cuando significa incluso. Probamos reemplazar la palabra sin cambiar la frase.','Aún no llegó = todavía no llegó. Aun Ana vino = incluso Ana vino.',['Reemplazá mentalmente por todavía o por incluso.','Todavía: aún. Incluso: aun.'],'Elegí la palabra que conserva el significado indicado.',[],[
 ['Todavía no llegó: ___ no llegó.','aún','Equivale a todavía.', ['aun','aún']],['Incluso Ana vino: ___ Ana vino.','aun','Equivale a incluso.', ['aun','aún']],['Todavía llueve: ___ llueve.','aún','Equivale a todavía.', ['aún','aun']],['Incluso cansado ayudó: ___ cansado ayudó.','aun','Equivale a incluso.', ['aún','aun']],['Todavía tengo hambre: ___ tengo hambre.','aún','Equivale a todavía.', ['aun','aún']],['Incluso el pequeño lo vio: ___ el pequeño lo vio.','aun','Equivale a incluso.', ['aun','aún']],['Todavía falta una página: ___ falta una página.','aún','Equivale a todavía.', ['aun','aún']],['Incluso sin premio participó: ___ sin premio participó.','aun','Equivale a incluso.', ['aún','aun']]
],mapa('todavía → aún','incluso → aun','El reemplazo ayuda a decidir'));

// Taller de escritura: el ejemplo enseña una posibilidad; no es una respuesta para copiar.
const semillas=[
 ['Lila llevaba una torta. La caja se rompió.','Sostuvo la torta con una bandeja y llegó a la fiesta.'],
 ['Nico iba en bicicleta. La rueda perdió aire.','Pidió un inflador y pudo volver.'],
 ['Eva buscaba su cuaderno. No estaba en la mochila.','Revisó el escritorio y lo encontró debajo de un libro.'],
 ['Luis preparaba una merienda. Se cortó la luz.','Abrió la ventana y preparó frutas sin usar la cocina.'],
 ['Ana llevaba una planta. La maceta se quebró.','Usó otro recipiente y protegió las raíces.'],
 ['Tomi armaba un barrilete. Faltaba una varilla.','Buscó una rama liviana y terminó la estructura.'],
];
for(const [indice,titulo,consigna,criterios] of [
 [1,'Planificar: pensar una solución antes de escribir','Escribí una posible solución para el problema. Puede ser una sola oración.',[{id:'solucion',descripcion:'Propone una acción posible que responde al problema presentado.'}]],
 [2,'Del plan al borrador: una historia breve','Escribí con tus palabras una historia breve con inicio, problema y solución. No hace falta usar diálogos ni copiar el ejemplo.',[{id:'inicio',descripcion:'Presenta al personaje y la situación inicial.'},{id:'problema',descripcion:'Incluye el problema de la tarjeta.'},{id:'resolucion',descripcion:'Agrega una acción que responde al problema y un resultado.'}]],
 [3,'Revisar y reescribir un final','Escribí un final donde se entienda qué hace el personaje y cómo cambia la situación. Agregá un detalle que ayude a imaginarlo.',[{id:'accion',descripcion:'Incluye una acción que responde al problema.'},{id:'resultado',descripcion:'Explica cómo cambia o se resuelve la situación.'},{id:'detalle',descripcion:'Agrega un detalle descriptivo comprensible.'}]],
]){
 const id='leng_prof_r27_taller_'+indice;
 UNIDADES_LENGUA_R27.push({id,tema:N,titulo,explicacion:'Podés escribir poco y volver sobre tu borrador. Primero decidimos qué sucede; después revisamos si otra persona puede entenderlo. Un ejemplo muestra una posibilidad, pero podés imaginar otra.',ejemplo:semillas[0].join(' '),pasos:['Leé el problema del personaje.','Elegí qué puede hacer para resolverlo.','Releé: ¿se entiende qué pasó al final?'],pista:'Contá una acción del personaje que responda al problema.',visual:{tipo:'mapa',titulo:'Escribir en pasos cortos',nodos:mapa('Pensar una solución','Escribir un borrador','Releer y mejorar una parte')},actividades:semillas.map(([texto,final],i)=>({id:id+'-p'+i,enunciado:consigna,visual:{tipo:'lectura',titulo:'Punto de partida',texto},respuesta_correcta:final,paso_resuelto:'Una posibilidad es: '+final+' Podés proponer otra solución que se entienda.',creacion_libre:true,rubrica_escritura:criterios}))});
}

// Puentes R27: se insertan en su secuencia al terminar de construir el catálogo.
// Material de referencia: cuadernillo de Lengua, pp. 23–28. Los ejemplos son propios.
agregar('genero',S,'El mapa y la mano: el género no depende solo del final',
 'Los sustantivos tienen género masculino o femenino. Decimos el libro y la mesa: el y la nos ayudan a reconocerlo. No alcanza con mirar la última letra: mapa tiene género masculino y mano, femenino. Una mesa no tiene sexo; género es una característica de la palabra.',
 'Mapa es un sustantivo masculino, aunque termine en A. Mano es un sustantivo femenino, aunque termine en O.',
 ['Mirá cómo acompañamos la palabra: en estos ejemplos, el indica masculino y la, femenino.','No decidas solo por la última letra ni por si nombra una persona.'],
 '¿Qué género tiene el sustantivo de la tarjeta?', ['Masculino','Femenino'],[
  ['el libro','Masculino','En el libro, el acompaña a un sustantivo masculino.'],
  ['la mesa','Femenino','Mesa es femenino: decimos la mesa. No se trata del sexo de un objeto.'],
  ['el mapa','Masculino','Decimos el mapa. Terminar en A no lo vuelve femenino.'],
  ['la mano','Femenino','Decimos la mano. Terminar en O no lo vuelve masculino.'],
  ['la flor','Femenino','Flor es femenino aunque no termine en A.'],
  ['el árbol','Masculino','Árbol es masculino aunque no termine en O.'],
  ['En el aviso dice: «el problema está resuelto». Miramos problema.','Masculino','Problema aparece con el. Es masculino aunque termine en A.'],
  ['En el cuento aparece «la artista del barrio». Miramos artista en esta frase.','Femenino','La artista tiene género femenino en esta frase. Con el artista, la misma forma puede ser masculina.'],
 ],mapa('el libro / la mesa','el mapa / la mano','La última letra no decide por sí sola'));

agregar('raiz_desinencia',V,'Una parte se conserva y otra cambia',
 'En cantar, canto y cantamos reconocemos cant-. Esa parte expresa la acción y se llama raíz. Lo que agregamos al final se llama desinencia o terminación. En verbos regulares, obtenemos la raíz quitando -ar, -er o -ir al infinitivo. La terminación cambia según quién actúa y cuándo.',
 'cant-ar → cant-o → cant-amos. La raíz cant- se mantiene; las terminaciones cambian.',
 ['Buscá el infinitivo y quitá su final -ar, -er o -ir.','Compará las formas: la raíz conserva el significado y la terminación aporta información.'],
 'Leé qué parte se pide y elegí la respuesta.', [],[
  ['En cant-ar, ¿cuál es la raíz?', 'cant-', 'Quitamos -ar al infinitivo cantar: queda cant-.', ['cant-','-ar']],
  ['En cant-amos, ¿cuál es la terminación?', '-amos', 'Cant- es la raíz; -amos es la parte final que agregamos.', ['cant-','-amos']],
  ['Comer es un verbo regular. Si quitamos -er, ¿qué raíz queda?', 'com-', 'Com-er se separa en raíz com- y terminación -er.', ['com-','-er']],
  ['En viv-imos, ¿cuál es la terminación?', '-imos', 'Viv- conserva el significado; -imos es la terminación.', ['viv-','-imos']],
  ['Mirar es regular. En mir-ar y mir-o, ¿qué parte se conserva?', 'mir-', 'Al quitar -ar queda mir-. Esa raíz también aparece en mir-o.', ['mir-','-ar']],
  ['En salt-amos, ¿qué parte informa que la acción corresponde a nosotros o nosotras?', '-amos', 'La terminación -amos aporta esa información; salt- expresa la acción.', ['salt-','-amos']],
  ['Para escribir una invitación usamos pintar y pintamos. ¿Qué raíz comparten?', 'pint-', 'Pint-ar y pint-amos conservan pint-, la parte que expresa la acción.', ['pint-','-amos']],
  ['Un cartel dice «Vendemos pan». Vender es regular. ¿Qué terminación se agregó a la raíz vend-?', '-emos', 'Vend-emos contiene la raíz vend- y la terminación -emos.', ['-emos','-er']],
 ],mapa('cantar → quitamos -ar','cant-: raíz que se conserva','canto / cantamos: cambia el final'));

agregar('perfecto_compuesto',V,'He terminado: mirar desde ahora algo ya ocurrido',
 'He terminado cuenta algo que ya ocurrió y lo relaciona con el presente. Se llama pretérito perfecto compuesto. Se forma con haber en presente y un participio: he, has, ha, hemos o han + terminado. El participio no cambia con la persona: he cantado, hemos cantado. En distintas regiones también se usa terminé en estas situaciones.',
 'Ya he preparado la mochila: la preparé antes de hablar y ahora está lista.',
 ['Ubicá el momento de hablar: preparar la mochila ya ocurrió.','Buscá las dos piezas: he + preparado. El participio no cambia.','Podés consultar este modelo: yo he; tú/vos has; él/ella ha; nosotros/nosotras hemos; ellos/ellas/ustedes han.'],
 'Leé la situación y elegí la respuesta.', [],[
  ['«Ya he preparado la mochila». ¿Prepararla ocurrió antes o después del momento de hablar?', 'Antes', 'He preparado presenta la acción como ya realizada al hablar.', ['Antes','Después']],
  ['Queremos usar haber + participio con yo: «Yo ___ terminado el dibujo».', 'he', 'La forma es yo he terminado: he + terminado.', ['he','hemos']],
  ['Queremos usar haber + participio con nosotros: «Nosotros ___ ordenado el aula».', 'hemos', 'Con nosotros usamos hemos. El participio sigue siendo ordenado.', ['hemos','he']],
  ['Queremos usar haber + participio con ella: «Ella ___ guardado sus útiles».', 'ha', 'Con ella usamos ha: ha guardado.', ['ha','han']],
  ['Queremos usar haber + participio con ellos: «Ellos ___ llegado».', 'han', 'Ellos es plural: han llegado. Llegado no se convierte en llegados.', ['han','ha']],
  ['¿Qué forma conserva el participio al cambiar de yo a nosotros?', 'Nosotros hemos cantado', 'Cambia he por hemos. El participio cantado queda igual.', ['Nosotros hemos cantado','Nosotros hemos cantados']],
  ['Un mensaje dice: «He perdido la llave y ahora no puedo entrar». ¿Qué hecho anterior explica el problema actual?', 'Perdió la llave', 'He perdido señala la pérdida anterior, que se conecta con no poder entrar ahora.', ['Perdió la llave','Recuperará la llave']],
  ['Dos compañeras escriben juntas un mensaje usando este tiempo compuesto. ¿Qué forma corresponde a nosotras?', 'Hemos preparado la exposición', 'Nosotras requiere hemos y el participio preparado no cambia.', ['Hemos preparado la exposición','He preparado la exposición']],
 ],mapa('Antes: preparé la mochila','Ahora: está lista','He + preparado: perfecto compuesto'));

agregar('futuro_perfecto',V,'Para ese momento ya habré terminado',
 'Habré terminado presenta algo que estará completado antes de un momento futuro. Se llama futuro perfecto. Se forma con haber en futuro y un participio: habré, habrás, habrá, habremos o habrán + terminado. Primero buscamos el momento futuro con el que se compara.',
 'Para mañana a las seis, ya habré terminado la maqueta. Terminarla quedará antes de ese momento.',
 ['Ubicá el momento futuro: mañana a las seis.','La acción se presenta como completada antes de ese momento: habré + terminado.','Podés consultar: yo habré; tú/vos habrás; él/ella habrá; nosotros/nosotras habremos; ellos/ellas/ustedes habrán.'],
 'Leé el momento de referencia y elegí la respuesta.', [],[
  ['«Para mañana a las seis, ya habré terminado la maqueta». ¿Cuándo se presenta terminada respecto de mañana a las seis?', 'Antes de ese momento', 'El futuro perfecto presenta la finalización anterior al momento futuro señalado.', ['Antes de ese momento','Después de ese momento']],
  ['Usamos este tiempo con yo: «Para el viernes, yo ya ___ terminado el libro».', 'habré', 'Yo requiere habré: habré terminado.', ['habré','habremos']],
  ['Usamos este tiempo con nosotros: «Para las ocho, nosotros ya ___ llegado».', 'habremos', 'Nosotros requiere habremos: habremos llegado.', ['habremos','habré']],
  ['Usamos este tiempo con ella: «Para mañana, ella ya ___ preparado su bolso».', 'habrá', 'Ella requiere habrá: habrá preparado.', ['habrá','habrán']],
  ['Usamos este tiempo con ellos: «Para el lunes, ellos ya ___ pintado el cartel».', 'habrán', 'Ellos requiere habrán: habrán pintado.', ['habrán','habrá']],
  ['«Cuando empiece la fiesta de mañana, ya habremos decorado el salón». ¿Qué se presenta primero?', 'Terminar la decoración', 'La decoración estará terminada antes de que empiece la fiesta.', ['Terminar la decoración','Empezar la fiesta']],
  ['El equipo anuncia: «Cuando abran la muestra el sábado, ya habremos instalado las luces». ¿En qué estado se presentan las luces al abrir la muestra?', 'Ya instaladas', 'Habremos instalado anticipa que la instalación estará completa al llegar ese momento.', ['Ya instaladas','Todavía sin instalar']],
  ['Eva habla de ella misma: «Para cuando lleguen ustedes mañana, yo ya ___ cocinado». ¿Qué forma de haber corresponde?', 'habré', 'El sujeto es yo: habré cocinado. Lleguen ustedes pertenece a otra parte de la frase.', ['habré','habrán']],
 ],mapa('Ahora: lo anunciamos','Antes de la fiesta: terminamos','Habré + terminado: futuro perfecto'));

agregar('condicional_compuesto',V,'Habría participado: imaginar otro pasado',
 'Habría participado puede contar algo que no ocurrió en el pasado, pero habría sido posible con otra condición. Se llama condicional compuesto. Se forma con haber en condicional y un participio: habría, habrías, habríamos o habrían + participado. Aquí trabajamos ese uso, sin suponer que es el único.',
 'No tuve la entrada, así que no fui. Con una entrada, habría asistido a la función.',
 ['Separá lo que pasó de lo que imaginamos: no fui; imaginamos otra posibilidad.','Buscá habría + asistido. La condición que faltó era tener una entrada.','Podés consultar: yo/él/ella habría; tú/vos habrías; nosotros/nosotras habríamos; ellos/ellas/ustedes habrían.'],
 'Distinguí el hecho de la posibilidad imaginada y elegí.', [],[
  ['«No tuve entrada y no fui. Con entrada, habría asistido». ¿Asistió realmente?', 'No', 'El texto dice que no fue; habría asistido expresa la alternativa imaginada.', ['No','Sí']],
  ['«No llevé paraguas y me mojé. Con paraguas, habría llegado seca». ¿Qué condición faltó?', 'Llevar paraguas', 'El texto compara lo sucedido con la posibilidad de haber llevado paraguas.', ['Llevar paraguas','Mojarse']],
  ['Usamos este tiempo con yo: «Con más tiempo, yo ___ terminado el trabajo».', 'habría', 'Yo requiere habría: habría terminado.', ['habría','habríamos']],
  ['Usamos este tiempo con nosotros: «Con una pista, nosotros ___ resuelto el acertijo».', 'habríamos', 'Nosotros requiere habríamos: habríamos resuelto.', ['habríamos','habría']],
  ['Usamos este tiempo con ellas: «Con una invitación, ellas ___ participado».', 'habrían', 'Ellas requiere habrían. Participado permanece igual.', ['habrían','habría']],
  ['«El museo estaba cerrado y no entramos. Si hubiera estado abierto, habríamos entrado». ¿Entraron realmente?', 'No', 'El texto afirma que no entraron. Habríamos entrado expresa otro resultado posible.', ['No','Sí']],
  ['Una corredora cuenta: «Olvidé las zapatillas y no pude competir. Si las hubiera llevado, habría competido». ¿Qué parte expresa el resultado imaginado?', 'Habría competido', 'Es lo que podría haber ocurrido con otra condición; el hecho fue que no compitió.', ['Habría competido','Olvidé las zapatillas']],
  ['Dos amigas hablan de ellas mismas: «No llegamos a tiempo. Con un colectivo anterior, nosotras ___ llegado temprano». ¿Qué forma corresponde?', 'habríamos', 'Hablan como nosotras: habríamos llegado.', ['habríamos','habrían']],
 ],mapa('Lo que pasó: no tuve entrada','Otra condición: tener entrada','Habría + asistido: otra posibilidad'));

agregar('preterito_anterior',V,'Apenas hubo terminado, salió: dos hechos pasados',
 'En algunos relatos aparece hubo terminado para señalar una acción acabada inmediatamente antes de otra acción pasada. Se llama pretérito anterior. Se forma con haber en pretérito perfecto simple y un participio: hube, hubiste, hubo, hubimos o hubieron + terminado. Hoy es poco habitual al conversar; aprendemos a reconocerlo en textos.',
 'Apenas Ana hubo terminado la carta, salió. Primero terminó la carta; enseguida salió.',
 ['Buscá las dos acciones pasadas y la expresión apenas o en cuanto.','Hubo + terminado presenta la acción que acabó inmediatamente antes.','Podés consultar: yo hube; tú/vos hubiste; él/ella hubo; nosotros/nosotras hubimos; ellos/ellas/ustedes hubieron.'],
 'Leé el orden de los hechos y elegí la respuesta.', [],[
  ['«Apenas Ana hubo terminado la carta, salió». ¿Qué ocurrió primero?', 'Terminó la carta', 'Hubo terminado sitúa la finalización antes de salió.', ['Terminó la carta','Salió']],
  ['«En cuanto hubo cerrado la puerta, bajó la escalera». ¿Qué ocurrió inmediatamente antes de bajar?', 'Cerró la puerta', 'Hubo cerrado presenta el primer hecho; después bajó.', ['Cerró la puerta','Bajó la escalera']],
  ['Usamos esta forma con yo: «Apenas yo ___ terminado, guardé la hoja».', 'hube', 'Con yo, el auxiliar es hube: hube terminado.', ['hube','hubimos']],
  ['Usamos esta forma con ella: «Apenas ella ___ leído la nota, respondió».', 'hubo', 'Con ella usamos hubo: hubo leído.', ['hubo','hubieron']],
  ['Usamos esta forma con nosotros: «En cuanto nosotros ___ comido, salimos».', 'hubimos', 'Con nosotros usamos hubimos: hubimos comido.', ['hubimos','hube']],
  ['Usamos esta forma con ellos: «Apenas ellos ___ llegado, empezó la reunión».', 'hubieron', 'Con ellos usamos hubieron como auxiliar de llegado. No expresa existencia.', ['hubieron','hubo']],
  ['En un cuento leés: «No bien hubo encontrado la llave, abrió el baúl». No bien significa aquí apenas. ¿Qué hecho antecede a abrir el baúl?', 'Encontró la llave', 'Hubo encontrado indica que primero encontró la llave y enseguida abrió el baúl.', ['Encontró la llave','Abrió el baúl']],
  ['En un relato, varias personas dicen: «Apenas hubimos armado la carpa, entramos». ¿Quiénes habían armado la carpa?', 'Nosotros o nosotras', 'Hubimos corresponde a la primera persona plural, coherente con entramos.', ['Nosotros o nosotras','Él o ella']],
 ],mapa('Primero: terminó la carta','Enseguida: salió','Hubo + terminado: pretérito anterior'));

agregar('si_se','tilde_diacritica_monosilabos','Sí acepta; si pone una condición. Sé no es se',
 'Sí con tilde puede afirmar: sí, voy. Si sin tilde puede poner una condición: si llueve, llevo paraguas. Sé con tilde es una forma de saber, como yo sé, o de ser, como sé amable. Se sin tilde acompaña al verbo: Ana se peina. En esta entrada miramos esos usos, no todos los posibles.',
 'Sí, sé nadar. Si Ana viene, se cambia antes de entrar al agua.',
 ['Para sí/si, mirá si afirma o si pone una condición.','Para sé/se, probá el sentido: saber o ser llevan sé; en se peina escribimos se.'],
 'Elegí la palabra según el sentido de la frase.', [],[
  ['Respondo afirmativamente: «___, voy a la plaza».', 'Sí', 'La respuesta afirma: sí lleva tilde.', ['Sí','Si']],
  ['Pongo una condición: «___ llueve, llevo paraguas».', 'Si', 'La condición se introduce con si, sin tilde.', ['Sí','Si']],
  ['Conozco la respuesta: «Yo ___ la respuesta».', 'sé', 'Es una forma de saber: yo sé.', ['sé','se']],
  ['Ana ___ peina frente al espejo.', 'se', 'Se acompaña al verbo peina; no significa saber ni es una forma de ser.', ['sé','se']],
  ['Le pido a alguien que sea amable: «___ amable, por favor».', 'Sé', 'Aquí sé es una forma del verbo ser y lleva tilde.', ['Sé','Se']],
  ['Una condición para salir: «___ terminamos, salimos».', 'Si', 'Si presenta la condición: terminar.', ['Sí','Si']],
  ['En una nota alguien confirma que acepta: «___, acepto la invitación».', 'Sí', 'Es una afirmación, no una condición: sí lleva tilde.', ['Si','Sí']],
  ['Leo necesita que le expliquen algo: «No ___ cómo armarlo».', 'sé', 'Habla de no saber cómo hacerlo: no sé.', ['se','sé']],
 ],mapa('sí: afirmo / si: condición','sé: saber o ser','Ana se peina: se acompaña al verbo'));

agregar('de_mas','tilde_diacritica_monosilabos','Dé viene de dar; más agrega cantidad',
 'Dé con tilde es una forma de dar: pedile que te dé agua. De sin tilde une palabras: vaso de agua. Más con tilde indica cantidad: más agua. Mas sin tilde significa pero: quería ir, mas no pudo. Este último uso aparece más en textos que en la conversación.',
 'Pedile que te dé un vaso de agua. Quería más, mas no quedaba: quería más, pero no quedaba.',
 ['Para dé/de, preguntate si es una forma de dar o si une palabras.','Para más/mas, probá si habla de cantidad o si se puede reemplazar por pero.'],
 'Elegí la palabra según el significado indicado.', [],[
  ['Pedile que te ___ la pelota. Es una forma de dar.', 'dé', 'La forma del verbo dar lleva tilde: dé.', ['dé','de']],
  ['La mochila ___ Ana está cerrada.', 'de', 'De une mochila con Ana; no es una forma de dar.', ['dé','de']],
  ['Quiero una cantidad mayor: «Quiero ___ agua».', 'más', 'Más expresa cantidad y lleva tilde.', ['más','mas']],
  ['Queremos decir pero: «Quise ir, ___ no pude».', 'mas', 'Mas puede reemplazarse por pero y no lleva tilde.', ['más','mas']],
  ['Espero que la maestra me ___ una hoja. Hablamos de dar.', 'dé', 'Se trata de una forma de dar: dé.', ['de','dé']],
  ['La caja ___ lápices está abierta.', 'de', 'De relaciona caja y lápices: no lleva tilde.', ['de','dé']],
  ['El cartel anuncia una cantidad mayor: «Hoy hay ___ actividades».', 'más', 'Se anuncia mayor cantidad de actividades: más.', ['mas','más']],
  ['En el cuento, mas equivale a pero: «Buscó la llave, ___ no la encontró».', 'mas', 'Las dos ideas contrastan: buscó, pero no encontró. Mas va sin tilde.', ['más','mas']],
 ],mapa('dé: dar / vaso de agua','más: cantidad','mas equivale a pero'));

agregar('diminutivos',C,'Nubecita y casita: miramos de dónde viene cada una',
 'Un diminutivo puede nombrar algo pequeño o mostrar cariño. En nubecita y solcito agregamos -cita o -cito, con C. Pero no todos los diminutivos llevan C: casa forma casita y mesa forma mesita, conservando su S. También miramos estos modelos: pan → panecillo y oso → osito.',
 'nube → nubecita; casa → casita. No elegimos por el sonido solamente: miramos la palabra de origen.',
 ['Buscá de qué palabra viene el diminutivo.','En estos modelos, -cito/-cita/-cillo se escriben con C; casa, mesa y oso conservan su S.'],
 'Completá la palabra pequeña usando su origen y los modelos.', ['c','s'],[
  ['nube → nube_ita', 'c', 'Nubecita agrega -cita, con C.'],
  ['casa → ca_ita', 's', 'Casita conserva la S de casa.'],
  ['mesa → me_ita', 's', 'Mesita conserva la S de mesa.'],
  ['sol → sol_ito', 'c', 'Solcito usa -cito, con C.'],
  ['pan → pane_illo', 'c', 'Panecillo usa -cillo, con C.'],
  ['oso → o_ito', 's', 'Osito conserva la S de oso.'],
  ['El dibujo muestra una nube pequeña: una nube_ita.', 'c', 'Partimos de nube y usamos el modelo nubecita, con C.'],
  ['El cuento llama con cariño ca_ita a una casa.', 's', 'El diminutivo mantiene la S de casa: casita.'],
 ],mapa('nube → nubecita','casa → casita','La palabra de origen ayuda a decidir'));

agregar('anza_ez',C,'Confianza y rapidez: palabras que nombran una idea',
 'Confiar se relaciona con confianza; rápido, con rapidez. Estas palabras nombran ideas o cualidades. Las terminaciones -anza y -ez de estos modelos se escriben con Z. Leemos antes las palabras: esperanza es esperar algo bueno; tardanza es llegar tarde; vejez se relaciona con viejo; pequeñez, con pequeño.',
 'confiar → confianza; rápido → rapidez. Miramos el final de la palabra que se forma.',
 ['Relacioná cada palabra con su origen o su significado.','En estos modelos, escribimos Z en -anza y -ez.'],
 '¿Qué letra completa el modelo explicado?', ['z','s'],[
  ['confiar → confian_a', 'z', 'Confianza termina en -anza, con Z.'],
  ['rápido → rapide_', 'z', 'Rapidez nombra la cualidad y termina en -ez, con Z.'],
  ['Esperar algo bueno: esperan_a.', 'z', 'Esperanza es uno de los modelos terminados en -anza.'],
  ['Llegar tarde produce tardan_a.', 'z', 'Tardanza se relaciona con tardar y lleva Z.'],
  ['viejo → veje_', 'z', 'Vejez termina en -ez, con Z.'],
  ['pequeño → pequeñe_', 'z', 'Pequeñez termina en -ez, con Z.'],
  ['El equipo demuestra rapide_ al correr.', 'z', 'Rapidez conserva su terminación -ez también en esta frase.'],
  ['Ana cuenta con la confian_a de su amiga.', 'z', 'Confianza se relaciona con confiar y se escribe con -anza.'],
 ],mapa('confiar → confianza','rápido → rapidez','En estos modelos: -anza / -ez con Z'));

agregar('verbos_con_b','ortografia_b_v','Seis familias que miramos con B',
 'Estos infinitivos se escriben con B: haber, deber, beber, caber, saber y sorber. Antes de practicar miramos formas de esas familias: había, debo, bebo, cabe, sabe y sorbo. Sorber significa tomar un líquido aspirándolo, por ejemplo al dar un sorbo. No adivinamos una palabra nueva sin observar su modelo.',
 'haber → había; deber → debo; beber → bebo; caber → cabe; saber → sabe; sorber → sorbo.',
 ['Relacioná la palabra de la frase con uno de los seis modelos.','Cuando aparezca el lugar de esa B, conservá la escritura del modelo. No todas las formas muestran la B: he también pertenece a haber.'],
 'Completá usando la familia y el modelo que leíste.', ['b','v'],[
  ['haber → Ha_ía agua en la jarra.', 'b', 'Había pertenece a haber y se escribe con B.'],
  ['deber → De_o devolver el libro.', 'b', 'Debo pertenece a deber y conserva B.'],
  ['beber → Be_o un poco de agua.', 'b', 'Bebo pertenece a beber y se escribe con B.'],
  ['caber → La caja ca_e en el estante.', 'b', 'Cabe pertenece a caber: usamos B.'],
  ['saber → Ella sa_e la respuesta.', 'b', 'Sabe pertenece a saber: se escribe con B.'],
  ['sorber → Sor_o la sopa despacio.', 'b', 'Sorbo es el modelo de sorber: aspirar un líquido al tomarlo.'],
  ['Ayer ha_ía dos pelotas en el patio. Modelo: haber → había.', 'b', 'Había sigue perteneciendo a haber en este nuevo contexto.'],
  ['La mochila ca_e debajo de la silla. Modelo: caber → cabe.', 'b', 'Cabe se relaciona con caber y mantiene la B.'],
 ],mapa('haber → había / deber → debo','beber → bebo / caber → cabe','saber → sabe / sorber → sorbo'));

agregar('bi_bis_biz_bio','ortografia_b_v','Bicicleta y biografía: comienzos con significado',
 'Bi- se relaciona con dos: bicicleta tiene dos ruedas; bicolor, dos colores. Bio se relaciona con vida: una biografía cuenta la vida de alguien y un microbio es un ser muy pequeño. Estos elementos se escriben con B. También observamos los modelos bisnieto, hijo de un nieto, y bizcocho, un alimento horneado, para los comienzos bis- y biz-.',
 'bi-: bicicleta, bicolor; bio: biografía, microbio; modelos con bis- y biz-: bisnieto y bizcocho.',
 ['Relacioná bi- con dos y bio con vida.','Para bisnieto y bizcocho, mirá los modelos escritos antes de elegir la letra. No deduzcas toda la palabra por cómo suena.'],
 'Completá el elemento o comienzo que observaste.', ['b','v'],[
  ['Una _icicleta tiene dos ruedas.', 'b', 'Bicicleta es el modelo de bi-, relacionado con dos.'],
  ['Una bandera _icolor tiene dos colores.', 'b', 'Bicolor contiene bi-, que se escribe con B.'],
  ['Una _iografía cuenta la vida de alguien.', 'b', 'Biografía contiene bio, relacionado con vida.'],
  ['Un micro_io es un ser muy pequeño.', 'b', 'Microbio contiene el elemento bio, con B.'],
  ['El hijo de un nieto es un _isnieto.', 'b', 'Bisnieto es el modelo que observamos para bis-.'],
  ['En la bandeja hay un _izcocho, un alimento horneado.', 'b', 'Bizcocho es el modelo que observamos para biz-.'],
  ['Una tapa con dos colores puede describirse como _icolor.', 'b', 'Bi- conserva su significado de dos y su B en este contexto.'],
  ['El libro cuenta la vida de una científica: es su _iografía.', 'b', 'Bio se relaciona con vida: escribimos biografía con B.'],
 ],mapa('bi-: dos / bio: vida','bicicleta · bicolor · biografía','Modelos: bisnieto / bizcocho'));

agregar('compuestas_tilde','tildes_generales_agudas_graves_esdrujulas','Unidas o con guion: no se acentúan igual',
 'Cuando dos palabras se unen sin guion, miramos cómo se pronuncia y acentúa la palabra completa. No conservamos automáticamente todas las tildes originales: décimo + séptimo forma decimoséptimo. Si dos adjetivos se unen con guion, cada parte conserva su acentuación: teórico-práctico. Las terminaciones -mente tienen su regla propia, ya estudiada.',
 'decimoséptimo lleva una sola tilde; teórico-práctico conserva la tilde de teórico y la de práctico.',
 ['Mirá si el compuesto aparece unido o separado por guion.','Unido: aplicamos las reglas a toda la palabra. Con guion entre adjetivos: cada parte conserva su tilde.'],
 'Elegí la escritura que sigue el modelo y la pronunciación indicados.', [],[
  ['Unimos décimo + séptimo sin guion: de-ci-mo-SÉP-ti-mo.', 'decimoséptimo', 'La palabra completa es esdrújula y lleva tilde en sép. No conserva la tilde inicial de décimo.', ['decimoséptimo','décimoséptimo']],
  ['Unimos teórico y práctico con guion.', 'teórico-práctico', 'Cada adjetivo conserva su tilde al unirse con guion.', ['teórico-práctico','teorico-practico']],
  ['Unimos décimo + sexto sin guion: de-ci-mo-SEX-to.', 'decimosexto', 'Es grave terminada en vocal: no lleva tilde. No conservamos la tilde de décimo.', ['decimosexto','décimosexto']],
  ['Unimos físico y químico con guion.', 'físico-químico', 'Las dos partes conservan su tilde porque están unidas con guion.', ['físico-químico','fisico-químico']],
  ['Para el puesto 17 usamos una sola palabra: de-ci-mo-SÉP-ti-mo.', 'decimoséptimo', 'La fuerza cae en la antepenúltima sílaba de la palabra completa: es esdrújula.', ['decimoséptimo','decimoseptimo']],
  ['Un trabajo combina teoría y práctica. Escribimos los adjetivos teórico y práctico con guion.', 'teórico-práctico', 'Ambas partes conservan la tilde que ya tenían.', ['teórico-práctico','teórico-practico']],
  ['Unimos balón + cesto sin guion. Se pronuncia ba-lon-CES-to.', 'baloncesto', 'La palabra completa es grave terminada en vocal. La tilde de balón no se conserva.', ['baloncesto','balóncesto']],
  ['Unimos histórico y artístico con guion para describir un recorrido.', 'histórico-artístico', 'Cada adjetivo conserva su propia tilde al aparecer con guion.', ['histórico-artístico','historico-artístico']],
 ],mapa('décimo + séptimo → decimoséptimo','teórico + práctico → teórico-práctico','El guion cambia qué palabra acentuamos'));

agregar('antonimos_contexto',D,'Buscar un contrario que sirva en esa frase',
 'Los antónimos expresan significados opuestos, pero elegimos según la frase. Ropa clara se opone a ropa oscura. Una explicación clara, que se entiende, se opone a una explicación confusa. No siempre sirve el mismo contrario para todos los usos de una palabra.',
 'ropa clara → ropa oscura; explicación clara → explicación confusa.',
 ['Leé la frase completa y buscá qué significa la palabra allí.','Elegí el contrario que mantiene ese tema: color, comprensión, peso u otra cualidad.'],
 '¿Qué palabra expresa el sentido contrario en esta frase?', [],[
  ['La ropa es clara, de color poco oscuro. Buscamos lo contrario de clara.', 'oscura', 'Se habla del color de la ropa: claro y oscuro se oponen.', ['oscura','confusa']],
  ['La explicación es clara: se entiende bien. Buscamos lo contrario de clara.', 'confusa', 'Se habla de comprender, no de color. El contrario adecuado es confusa.', ['confusa','negra']],
  ['La caja es liviana: pesa poco. Buscamos lo contrario de liviana.', 'pesada', 'El peso opuesto a liviano es pesado.', ['pesada','oscura']],
  ['El camino es corto: recorremos poca distancia. Buscamos lo contrario de corto.', 'largo', 'Se habla de distancia: corto y largo se oponen.', ['largo','confuso']],
  ['El vaso está lleno. Buscamos lo contrario de lleno.', 'vacío', 'Lleno y vacío describen estados opuestos del contenido del vaso.', ['vacío','pequeño']],
  ['La puerta está abierta. Buscamos lo contrario de abierta.', 'cerrada', 'Abierta y cerrada describen estados opuestos de la puerta.', ['cerrada','lejana']],
  ['El sonido está alto de volumen. Queremos el volumen contrario.', 'bajo', 'Se compara el volumen: alto se opone a bajo.', ['bajo','corto']],
  ['El cartel da una instrucción confusa, difícil de entender. Queremos una instrucción con el sentido contrario.', 'clara', 'Aquí clara significa que se entiende, no que tiene un color pálido.', ['clara','blanca']],
 ],mapa('ropa clara → oscura','explicación clara → confusa','El contexto decide el contrario'));

agregar('conectores_temporales',D,'Antes, después y mientras ordenan lo que pasa',
 'Antes y después nos ayudan a ordenar acciones. Mientras puede indicar que dos acciones ocurren al mismo tiempo. Finalmente señala el último paso. No alcanza con elegir una palabra porque suena bien: comprobamos el orden que cuenta la historia.',
 'Primero preparo la mochila; después salgo. Mientras camino, converso: caminar y conversar ocurren al mismo tiempo.',
 ['Buscá si las acciones van una después de otra o suceden al mismo tiempo.','Antes/después ordenan; mientras relaciona acciones simultáneas; finalmente cierra una serie.'],
 'Leé las acciones y elegí la relación temporal indicada.', [],[
  ['«Antes de salir, preparé la mochila». ¿Qué ocurrió primero?', 'Preparar la mochila', 'Antes de salir indica que preparar la mochila fue el primer paso.', ['Preparar la mochila','Salir']],
  ['«Después de guardar los libros, fui al patio». ¿Qué ocurrió primero?', 'Guardar los libros', 'Ir al patio sucede después de guardar los libros.', ['Guardar los libros','Ir al patio']],
  ['«Yo dibujo mientras Ana lee». ¿Cómo se relacionan las acciones?', 'Suceden al mismo tiempo', 'Mientras presenta dibujo y lectura como simultáneos.', ['Suceden al mismo tiempo','Ana solo lee después de que termino']],
  ['«Primero mezclo, después horneo y finalmente sirvo». ¿Cuál es el último paso?', 'Servir', 'Finalmente anuncia el cierre de la secuencia: servir.', ['Servir','Mezclar']],
  ['Ana terminó de ordenar. Diez minutos más tarde empezó a leer. Completá: «Terminó de ordenar; ___, empezó a leer».', 'después', 'Pasaron diez minutos: el texto presenta acciones sucesivas, no simultáneas.', ['después','al mismo tiempo']],
  ['Cantamos y caminamos al mismo tiempo. Completá: «Cantamos ___ caminamos».', 'mientras', 'Mientras expresa que las dos acciones coinciden en el tiempo.', ['mientras','cuando ya no']],
  ['La receta dice: «Antes de decorar, dejá enfriar la torta». ¿Qué paso va primero?', 'Dejar enfriar', 'Antes de decorar sitúa enfriar en el primer lugar.', ['Dejar enfriar','Decorar']],
  ['En una obra, el público aplaude mientras los actores saludan. ¿Qué cuenta mientras?', 'Aplausos y saludos ocurren al mismo tiempo', 'Mientras relaciona dos acciones simultáneas; no indica que una tenga que terminar antes.', ['Aplausos y saludos ocurren al mismo tiempo','Los actores saludan solo después del aplauso']],
 ],mapa('antes → después: orden','mientras: al mismo tiempo','finalmente: último paso'));

function ubicarUnidadR27(id, ancla, posicion){
 const desde=UNIDADES_LENGUA_R27.findIndex(u=>u.id==='leng_prof_r27_'+id);
 if(desde<0)throw Error('No existe la unidad de Lengua R27: '+id);
 const [unidad]=UNIDADES_LENGUA_R27.splice(desde,1);
 const destino=UNIDADES_LENGUA_R27.findIndex(u=>u.id==='leng_prof_r27_'+ancla);
 if(destino<0)throw Error('No existe el paso previo/posterior de Lengua R27: '+ancla);
 UNIDADES_LENGUA_R27.splice(destino+(posicion==='despues'?1:0),0,unidad);
}
ubicarUnidadR27('genero','articulos','antes');
ubicarUnidadR27('raiz_desinencia','presente','antes');
ubicarUnidadR27('perfecto_compuesto','participio','despues');
ubicarUnidadR27('futuro_perfecto','pluscuamperfecto','despues');
ubicarUnidadR27('condicional_compuesto','futuro_perfecto','despues');
ubicarUnidadR27('preterito_anterior','condicional_compuesto','despues');
ubicarUnidadR27('si_se','el_te','despues');
ubicarUnidadR27('de_mas','si_se','despues');
ubicarUnidadR27('diminutivos','plural_z','despues');
ubicarUnidadR27('anza_ez','oso_eza','despues');
ubicarUnidadR27('verbos_con_b','bir_buir','despues');
ubicarUnidadR27('bi_bis_biz_bio','verbos_con_b','despues');
ubicarUnidadR27('compuestas_tilde','mente','despues');
ubicarUnidadR27('antonimos_contexto','sinonimos','despues');
ubicarUnidadR27('conectores_temporales','conectores','despues');
