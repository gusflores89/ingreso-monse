const liquidos=(titulo,recipientes)=>({tipo:'liquidos',titulo,recipientes:recipientes.map(([ml,label,capacidad=1000,detalle])=>({ml,label,capacidad,detalle}))});
const recta=(min,max,paso,marcas=[],titulo)=>({tipo:'recta',min,max,paso,marcas:marcas.map(([valor,label])=>({valor,label})),titulo});
const mapa=(titulo,...textos)=>({tipo:'mapa',titulo,nodos:textos.map((texto,i)=>({titulo:['Miramos','Relacionamos','Comprobamos'][i],texto}))});
const fraccion=(n,d,label)=>({label,partes:Array.from({length:d},(_,i)=>i<n?'p':'v')});

// Cada dibujo tiene los mismos números y la misma referencia que su ejemplo.
export const VISUALES_R27={
 mat_dec_fraccion:liquidos('Un litro repartido en diez partes',[[700,'7 de 10 partes']]),
 prof_dec_milesimos:liquidos('375 mL de un litro',[[375,'375 mL']]),
 prof_dec_ceros:liquidos('Tres formas de nombrar la misma cantidad',[[300,'0,3 L'],[300,'0,30 L'],[300,'0,300 L']]),
 prof_dec_comparar:liquidos('Comparamos con el mismo recipiente',[[800,'0,80 L'],[750,'0,75 L']]),
 prof_dec_a_fraccion:liquidos('Un litro y un cuarto de otro',[[1000,'100/100 L'],[250,'25/100 L']]),
 prof_dec_desde_fraccion:liquidos('Tres cuartos de un litro',[[750,'3/4 de 1 L']]),
 mat_dec_sumar:liquidos('Juntamos cantidades de jugo',[[1200,'1,2 L',2000],[500,'0,5 L',2000],[1700,'1,7 L',2000]]),
 prof_dec_sumar_distintas:liquidos('La misma unidad para sumar',[[2350,'2,35 L',4000],[800,'0,80 L',4000],[3150,'3,15 L',4000]]),
 mat_dec_restar:liquidos('Servimos una parte del jugo',[[2400,'Había 2,4 L',3000],[700,'Servimos 0,7 L',3000],[1700,'Quedan 1,7 L',3000]]),
 prof_dec_restar_reagrupar:liquidos('Cinco litros menos lo que usamos',[[5000,'Había 5 L',5000],[1750,'Usamos 1,75 L',5000],[3250,'Quedan 3,25 L',5000]]),
 prof_dec_escalar:{tipo:'posicional',titulo:'De 0,45 a 4,5: multiplicamos por diez',columnas:[{nombre:'Unidades',cantidad:0,valor:1},{nombre:'Décimos',cantidad:4,valor:'0,1'},{nombre:'Centésimos',cantidad:5,valor:'0,01'}],despues:[{cantidad:4,valor:1},{cantidad:5,valor:'0,1'},{cantidad:0,valor:'0,01'}],operacion:'× 10 hacia abajo · ÷ 10 para volver arriba'},
 mat_dec_producto:liquidos('Tres porciones de medio litro',[[500,'Porción 1'],[500,'Porción 2'],[500,'Porción 3']]),
 prof_dec_producto:liquidos('Tomamos tres décimos de 1,2 litros',[[1200,'Cantidad inicial',2000],[360,'3/10 del total',2000]]),
 mat_dec_dividir:liquidos('Repartimos 1,8 L en tres botellas iguales',[[600,'Botella 1'],[600,'Botella 2'],[600,'Botella 3']]),
 prof_dec_dividir_natural:liquidos('Repartimos 4,5 L en seis botellas',Array.from({length:6},(_,i)=>[750,'Botella '+(i+1)])),
 prof_dec_dividir_decimal:liquidos('¿Cuántas porciones de 0,3 L entran en 1,5 L?',Array.from({length:5},(_,i)=>[300,'Porción '+(i+1)])),
 prof_dec_dos_pasos:mapa('Dinero de juego: comprar y calcular el vuelto','10,00 pesos al empezar','2 × 2,35 = 4,70 pesos gastados','10,00 − 4,70 = 5,30 pesos de vuelto'),
 prof_frac_clasificar:{tipo:'fracciones_grupos',casos:[{label:'3/4 · propia',partes:4,pintadas:3},{label:'5/4 · impropia',partes:4,pintadas:5},{label:'8/4 · aparente',partes:4,pintadas:8}]},
 prof_frac_desde_mixto:{tipo:'fracciones',titulo:'Dos enteros y un tercio: siete tercios',barras:[fraccion(3,3,'Entero 1'),fraccion(3,3,'Entero 2'),fraccion(1,3,'1/3 más')]},
 bases_multiplos_saltos:{tipo:'saltos',series:[{paso:4,cantidad:4}]},
 div_primos_4_mcm:{tipo:'saltos',series:[{paso:2,cantidad:3},{paso:3,cantidad:2}]},
 prof_op_preparar:{tipo:'fracciones',titulo:'El mismo entero, ahora en doceavos',barras:[fraccion(2,3,'2/3'),fraccion(8,12,'8/12')]},
 prof_op_restar:{tipo:'fracciones',titulo:'Restamos partes del mismo tamaño',barras:[fraccion(10,12,'5/6 = 10/12'),{label:'Quitamos 3/12',partes:['q','q','q',...Array(7).fill('p'),'v','v']},fraccion(7,12,'Quedan 7/12')]},
 frac_op_3_fraccion_cantidad:{tipo:'arreglo',filas:3,columnas:4,seleccionadas:2},
 frac_op_5_division:{tipo:'fracciones',titulo:'En 3/4 caben tres porciones de 1/4',barras:[fraccion(3,4,'Tenemos 3/4'),fraccion(1,4,'Cada porción')]},
 div_primos_1_multiplos_divisores:{tipo:'arreglo',filas:2,columnas:3},
 bases_criterio_2:{tipo:'arreglo',filas:2,columnas:9},
 bases_criterio_3:mapa('Miramos las cifras de 123','1 + 2 + 3 = 6','6 = 3 × 2','123 = 3 × 41'),
 bases_criterio_5:{tipo:'arreglo',filas:7,columnas:5},
 bases_criterio_10:mapa('Agrupamos cuarenta en decenas','10 + 10 + 10 + 10','40 ÷ 10 = 4 grupos','El último dígito es 0'),
 div_primos_3_primos_compuestos:{tipo:'arreglo',filas:1,columnas:7},
 div_primos_5_mcd:mapa('Paquetes iguales sin sobrar','8 = 4 + 4','12 = 4 + 4 + 4','El mayor tamaño común es 4'),
 prof_fact_primos:mapa('Desarmamos doce en factores primos','12 = 2 × 6','6 = 2 × 3','12 = 2 × 2 × 3'),
 prof_fact_mcm:mapa('Tomamos los factores necesarios','12 = 2 × 2 × 3','18 = 2 × 3 × 3','MCM: 2 × 2 × 3 × 3 = 36'),
 prof_fact_mcd:mapa('Tomamos solamente los factores comunes','12 = 2 × 2 × 3','18 = 2 × 3 × 3','MCD: 2 × 3 = 6'),
 mat_num_decenas:{tipo:'colecciones',grupos:[{label:'Decena 1',cantidad:10},{label:'Decena 2',cantidad:10},{label:'Unidades',cantidad:3}]},
 mat_num_posicion:{tipo:'posicional',titulo:'352: cada cifra ocupa su lugar',columnas:[{nombre:'Centenas',cantidad:3,valor:100},{nombre:'Decenas',cantidad:5,valor:10},{nombre:'Unidades',cantidad:2,valor:1}]},
 mat_num_orden:recta(380,430,10,[[391,'391'],[418,'418']]),
 mat_num_suma:mapa('Juntamos 27 y 15','20 + 10 = 30','7 + 5 = 12 = 10 + 2','30 + 10 + 2 = 42'),
 mat_num_resta:mapa('Cambiamos una decena por diez unidades','42 = 30 + 12','Quitamos 10 y 7','20 + 5 = 25'),
 mat_tab_grupos:{tipo:'colecciones',grupos:[{label:'Plato 1',cantidad:4},{label:'Plato 2',cantidad:4},{label:'Plato 3',cantidad:4}]},
 mat_tab_dobles:{tipo:'arreglo',filas:4,columnas:3},mat_tab_cinco:{tipo:'arreglo',filas:5,columnas:4},
 mat_tab_seis_ocho:{tipo:'arreglo',filas:8,columnas:5},mat_tab_siete:{tipo:'arreglo',filas:7,columnas:6},
 mat_tab_diez:mapa('Diez veces cada parte de 23','20 × 10 = 200','3 × 10 = 30','200 + 30 = 230'),
 mat_tab_nueve:{tipo:'arreglo',filas:10,columnas:6,quitar_ultima:true},
 mat_div_resto:{tipo:'arreglo',filas:3,columnas:5,sobrantes:2},
 mat_div_descomponer:mapa('Repartimos 84 en cuatro partes iguales','80 ÷ 4 = 20 para cada parte','4 ÷ 4 = 1 para cada parte','20 + 1 = 21 en cada una'),
 mat_rom_sumar:mapa('Leemos XVI','X = 10; V = 5; I = 1','Van de mayor a menor: sumamos','10 + 5 + 1 = 16'),
 mat_rom_restar:mapa('Leemos XIV','X = 10; IV = 5 − 1','IV es cuatro','10 + 4 = 14'),
 mat_resto_entero:{tipo:'arreglo',filas:3,columnas:8,quitar_ultima:true},
 mat_resto_nuevo_total:{tipo:'colecciones',grupos:[{label:'Primero usamos',cantidad:8},{label:'Mitad del resto',cantidad:8},{label:'Quedan',cantidad:8}]},
 mat_pot_repetir:mapa('Multiplicamos tres factores iguales','2³ tiene tres factores 2','2 × 2 = 4','4 × 2 = 8'),
 mat_raiz_cuadrado:{tipo:'arreglo',filas:5,columnas:5},
 mat_jer_producto:{tipo:'colecciones',grupos:[{label:'Primero: 3 × 4',cantidad:12},{label:'Luego agrego',cantidad:2}]},
 mat_jer_parentesis:{tipo:'arreglo',filas:5,columnas:4},
 mat_long_metros:recta(0,200,50,[[100,'1 m'],[200,'2 m']],'Una cinta medida en centímetros'),
 prof_med_long_escala:recta(0,30,5,[[10,'1 m'],[30,'3 m']],'La misma longitud en decímetros'),
 prof_med_long_menor:recta(0,2000,500,[[1000,'1 m'],[2000,'2 m']],'La misma cinta, marcas en milímetros'),
 prof_med_long_mayor:recta(0,300,100,[[300,'3 m']],'Marcas cada cien centímetros'),
 prof_med_long_decimal:recta(0,150,25,[[75,'0,75 m'],[125,'1,25 m']],'Cinta con marcas en centímetros'),
 mat_long_combinar:recta(0,150,25,[[100,'1 m'],[125,'1 m y 25 cm']],'Medimos la cinta en centímetros'),
 prof_med_long_problema:{tipo:'tramo',total:200,parte:35},
 mat_med_masa_capacidad:mapa('Cada unidad conserva su cantidad','1 kg = 1000 g; 2 kg = 2000 g','1 L = 1000 mL; 3 L = 3000 mL','Masa y capacidad son medidas distintas'),
 prof_med_masa_escala:mapa('Dos kilos de arroz','2 kg = 2000 g','1 dag = 10 g','2000 ÷ 10 = 200 dag'),
 prof_med_cap_escala:liquidos('Tres litros de agua',[[1000,'100 cL'],[1000,'100 cL'],[1000,'100 cL']]),
 prof_med_masa_decimal:mapa('Comparamos partes de un kilogramo','1 kg + 250 g = 1250 g','1250 g = 1,25 kg','750 g = 0,75 kg'),
 prof_med_masa_problema:mapa('Harina: usar y conservar el resto','1,5 kg = 1500 g','Quitamos 250 g','1500 − 250 = 1250 g'),
 prof_med_cap_problema:liquidos('Seis vasos reúnen un litro y medio',Array.from({length:6},(_,i)=>[250,'Vaso '+(i+1),250])),
 mat_med_tiempo:recta(0,80,20,[[60,'1 hora'],[80,'1 h y 20 min']],'Contamos minutos desde el comienzo'),
 prof_med_tiempo_resto:recta(0,100,20,[[60,'1 hora'],[95,'95 min']],'Después de la hora, quedan 35 minutos'),
 prof_med_tiempo_duracion:recta(0,40,10,[[0,'14:40'],[20,'15:00'],[35,'15:15']],'Minutos transcurridos desde las 14:40'),
 mat_ang_clases:{tipo:'angulo',angulo:60,transportador:true},
 mat_ang_complemento:{tipo:'angulo',angulo:90,divisiones:[30],etiquetas_sectores:['30°','60°'],medida:true},
 mat_graf_leer:{tipo:'barras',titulo:'Libros leídos',etiquetas:['Ana','Bruno','Cami'],valores:[3,5,2],paso:1,unidad:'libros'},
 mat_graf_escala:{tipo:'arreglo',filas:4,columnas:2},
 mat_prop_unidad:{tipo:'barras',titulo:'Cuadernos del mismo precio',etiquetas:['1 cuaderno','3 cuadernos'],valores:[200,600],paso:200,unidad:'pesos'},
 mat_prop_otro_total:{tipo:'barras',titulo:'Cuadernos del mismo precio',etiquetas:['1','3','5'],valores:[200,600,1000],paso:200,unidad:'pesos según cantidad de cuadernos'},
 mat_sec_salto:recta(4,16,3),mat_sec_restar:recta(9,25,4,[[25,'Inicio'],[9,'Llegada']]),
 mat_sec_factor:{tipo:'barras',titulo:'Duplicamos cada cantidad',etiquetas:['1ª','2ª','3ª','4ª','5ª'],valores:[2,4,8,16,32],paso:8,unidad:'cantidad'},
 mat_sec_fibonacci:{tipo:'colecciones',grupos:[{label:'Anterior',cantidad:3},{label:'Última',cantidad:5},{label:'Las reunimos',cantidad:8}]},
 mat_sec_ciclo:mapa('Reconocemos un bloque que se repite','rojo · azul · verde','rojo · azul · ¿qué falta?','Completamos con verde'),
 mat_sec_dos_reglas:mapa('Dos recorridos a la vez','A → B → C → D','1 → 3 → 5 → 7','Juntamos: D7'),
 mat_igual_simbolo:{tipo:'colecciones',grupos:[{label:'Un sol',cantidad:6},{label:'Otro sol',cantidad:6}]},
 mat_igual_dos:{tipo:'colecciones',grupos:[{label:'Sol',cantidad:6},{label:'Luna',cantidad:4},{label:'Juntos',cantidad:10}]},
};

export function aplicarVisualesR27(unidades){
 VISUALES_R27.mat_num_suma={tipo:'canjes',a:27,b:15,operacion:'suma',resolver:true,titulo:'27 + 15: juntamos fichas y cerramos una barra'};
 VISUALES_R27.mat_num_resta={tipo:'canjes',a:42,b:17,operacion:'resta',resolver:true,titulo:'42 − 17: abrimos una decena para poder quitar'};
 VISUALES_R27.mat_div_descomponer={tipo:'reparto_decenas',total:84,grupos:4,resolver:true};
 VISUALES_R27.prof_dec_restar_reagrupar={tipo:'canjes',a:500,b:175,base:100,operacion:'resta',resolver:true,titulo:'5 − 1,75: abrimos un entero en centésimos'};
 for(const id of ['mat_dec_sumar','prof_dec_sumar_distintas'])VISUALES_R27[id].operadores=['+','='];
 for(const id of ['mat_dec_restar','prof_dec_restar_reagrupar'])VISUALES_R27[id].operadores=['−','='];
 for(const u of unidades){
  if(VISUALES_R27[u.id])u.visual=VISUALES_R27[u.id];
  if(['mat_num_suma','mat_num_resta','mat_div_descomponer','prof_dec_restar_reagrupar'].includes(u.id))for(const a of u.actividades){
   const ns=a.enunciado.match(/\d+(?:,\d+)?/g).map(n=>Number(n.replace(',','.')));
   if(u.id==='mat_div_descomponer')a.visual={tipo:'reparto_decenas',total:ns[0],grupos:ns[1],resolver:false};
   else {const decimal=u.id==='prof_dec_restar_reagrupar';a.visual={tipo:'canjes',a:Math.round(ns[0]*(decimal?100:1)),b:Math.round(ns[1]*(decimal?100:1)),base:decimal?100:10,operacion:u.id==='mat_num_suma'?'suma':'resta',resolver:false,titulo:decimal?'Abrimos un entero en partes más pequeñas':'Conservamos la cantidad al cambiar piezas'};}
  }
  if(!u.visual && u.id.startsWith('leng_')){
   // Se conserva el ejemplo completo en el cuerpo; el mapa resalta relaciones cortas.
   const ejemplos={leng_bv_1_mb_nv:['tambor → M + B','enviar → N + V'],leng_bv_2_bu_bur_bus:['burbuja → BUR','buscar → BUS'],leng_bv_3_aba:['saltar → saltaba','-aba se escribe con B'],leng_bv_4_iba:['ir → iba','La familia de iba lleva B'],leng_bv_5_adjetivos:['activo → -ivo','creativa → -iva'],leng_bv_6_tuve:['tener → tuve','estar → estuve; andar → anduve'],leng_til_0_silabas:['pe · lo · ta','Tres sílabas'],leng_til_1_tonica:['ca · MI · sa','MI lleva la fuerza; no tiene tilde'],leng_til_2_agudas:['ca · FÉ','Última sílaba; termina en vocal'],leng_til_3_graves:['ÁR · bol','Penúltima; termina en L'],leng_til_4_esdrujulas:['MÚ · si · ca','Antepenúltima; siempre lleva tilde'],leng_til_5_sobresdrujulas:['DÍ · ga · se · lo','Antes de la antepenúltima']};
   if(ejemplos[u.id])u.visual=mapa('Mirá la parte que cambia',...ejemplos[u.id]);
  }
 }
}
