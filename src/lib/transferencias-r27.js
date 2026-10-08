// Banco reservado: estas preguntas nunca se seleccionan para la práctica.
// Se evalúan contenidos ya enseñados, con situaciones distintas.
const q=(objetivo_id,enunciado,respuesta,otras,paso_resuelto,visual)=>({objetivo_id,enunciado,respuesta_correcta:String(respuesta),opciones:[String(respuesta),...otras.map(String)],paso_resuelto,visual});
export const TRANSFERENCIAS_R27={
 numeros_naturales_sistema_decimal:[q('mat_num_posicion','En el número 684, ¿cuánto vale la cifra 8?',80,[8,800],'El 8 ocupa el lugar de las decenas: 8 × 10 = 80.')],
 numeros_romanos:[q('mat_rom_restar','Un reloj muestra IX. ¿Qué número indica?',9,[11,4],'I antes de X resta uno: 10 − 1 = 9.')],
 perimetros_simples:[q('mat_per_rectangulo','Una huerta rectangular mide 9 m de largo y 4 m de ancho. ¿Cuántos metros de cerca rodean todo su borde?',26,[13,36],'Sumamos los cuatro lados: 9 + 4 + 9 + 4 = 26 m.')],
 proporcionalidad_regla_3:[q('mat_prop_unidad','Cuatro entradas iguales cuestan 1200 pesos. ¿Cuánto cuesta una?',300,[4800,400],'1200 ÷ 4 = 300 pesos por entrada.')],
 secuencias_aritmeticas:[q('mat_sec_restar','Un juego descuenta 6 puntos en cada ronda. Empieza con 31 y sigue 25, 19. ¿Cuántos puntos habrá después de otra ronda?',13,[15,12],'Volvemos a restar seis: 19 − 6 = 13.')],
 secuencias_geometricas_fibonacci:[q('mat_sec_fibonacci','En una secuencia cada término suma los dos anteriores: 2, 3, 5, 8. ¿Cuál sigue?',13,[16,11],'Sumamos los dos últimos: 5 + 8 = 13.')],
 divisibilidad_primos_mcm_mcd:[
  q('div_primos_4_mcm','Dos señales se encienden cada 4 y cada 6 minutos. Coinciden ahora. ¿Dentro de cuántos minutos coincidirán de nuevo por primera vez?',12,[10,24],'Múltiplos: 4, 8, 12… y 6, 12… La primera coincidencia positiva es 12.'),
  q('div_primos_5_mcd','Se quieren dividir cintas de 18 cm y 24 cm en trozos del mismo largo, sin desperdiciar. ¿Cuál es el mayor largo posible?',6,[12,3],'6 divide a 18 y 24. Es su mayor divisor común.'),
  q('prof_fact_primos','¿Qué producto descompone 30 solo en factores primos?','2 × 3 × 5',['3 × 10','2 × 15'],'2, 3 y 5 son primos y su producto es 30.'),
 ],
 geometria_triangulos:[
  q('mat_tri_lados','Un triángulo tiene lados de 6 cm, 6 cm y 9 cm. ¿Cómo se clasifica por sus lados?','Isósceles',['Equilátero','Escaleno'],'Tiene exactamente dos lados iguales.'),
  q('prof_fig_angulos','Un triángulo tiene dos ángulos de 35° y 65°. ¿Cuánto mide el tercero?',80,[100,90],'Los tres suman 180°: 180 − 35 − 65 = 80°.'),
  q('prof_fig_existencia','¿Se puede cerrar un triángulo con segmentos de 2 cm, 4 cm y 9 cm?','No',['Sí'],'2 + 4 = 6 no alcanza el lado de 9 cm.'),
 ],
 fracciones_operaciones:[
  q('frac_op_2_distinto_denominador','Una botella tiene 1/2 L de agua. Agregamos 1/6 L. ¿Cuánta agua reúne?', '2/3 L',['1/8 L','1/3 L'],'1/2 = 3/6; 3/6 + 1/6 = 4/6 = 2/3 L.'),
  q('frac_op_3_fraccion_cantidad','De 30 tarjetas, 2/5 son verdes. ¿Cuántas son verdes?',12,[6,15],'30 ÷ 5 = 6; 2 × 6 = 12 tarjetas.'),
  q('prof_op_dividir_medida','Tenemos 2 L de jugo. Cada vaso contiene 1/4 L. ¿Cuántos vasos completos podemos servir?',8,[2,4],'Cada litro llena cuatro vasos de 1/4 L. Dos litros llenan ocho.'),
 ],
 tablas_multiplicar_2_5:[
  q('mat_tab_grupos','Hay 4 sobres con 3 tarjetas en cada uno. ¿Qué operación cuenta todas las tarjetas?','4 × 3',['4 + 3','4 ÷ 3'],'Son cuatro grupos de tres: 4 × 3.'),
  q('mat_tab_dobles','Se arman dos equipos con 4 integrantes cada uno. ¿Cuántas personas juegan?',8,[6,12],'4 + 4 = 8.'),
  q('mat_tab_cinco','En cada mano dibujada hay cinco dedos. ¿Cuántos dedos hay en tres manos?',15,[8,10],'3 grupos de 5: 15 dedos.'),
 ],
 tablas_multiplicar_6_8:[
  q('mat_tab_seis_ocho','Una bandeja tiene 6 filas de 8 galletitas. ¿Cuántas hay?',48,[14,42],'6 × 8 = 48.'),
  q('mat_tab_siete','Durante 4 semanas entrenamos 7 días por semana. ¿Cuántos días son?',28,[11,21],'4 × 7 = 28.'),
  q('puente_ocho','Una araña de juguete tiene 8 patas. ¿Cuántas patas tienen 3 arañas iguales?',24,[11,18],'3 grupos de 8 son 24.'),
 ],
 tablas_multiplicar_9_10:[
  q('mat_tab_diez','Cada bolsa tiene 10 cuentas. Se llenan 17 bolsas. ¿Cuántas cuentas se usan?',170,[27,107],'17 grupos de diez: 170.'),
  q('mat_tab_nueve','Hay 4 estantes con 9 libros en cada uno. ¿Cuántos libros hay?',36,[13,40],'4 × 9 = 4 × 10 − 4 = 36.'),
  q('puente_nueve','Se preparan 8 sobres con 9 fotos cada uno. ¿Cuántas fotos se guardan?',72,[17,80],'8 × 10 − 8 = 72.'),
 ],
 division_1_digito:[
  q('mat_div_repartir','Repartimos 28 cartas por igual entre 4 jugadores. ¿Cuántas recibe cada uno?',7,[24,112],'28 ÷ 4 = 7; cuatro grupos de siete reúnen 28.'),
  q('mat_div_resto','Se colocan 26 fichas en bolsas de 4. ¿Cuántas quedan fuera después de llenar todas las bolsas posibles?',2,[6,4],'6 bolsas usan 24 fichas. Sobran 2, menos de cuatro.'),
  q('mat_div_descomponer','Hay 96 lápices para repartir entre 3 aulas por igual. ¿Cuántos van a cada aula?',32,[93,36],'90 ÷ 3 = 30 y 6 ÷ 3 = 2. En cada aula, 32.'),
 ],
 si_me_la_longitud:[
  q('mat_long_metros','Una cuerda mide 4 m. ¿Cuántos centímetros mide?',400,[40,4000],'Cada metro tiene 100 cm: 4 × 100 = 400 cm.'),
  q('prof_med_long_problema','De una cinta de 3 m cortamos 45 cm. ¿Cuántos centímetros quedan?',255,[345,42],'3 m = 300 cm; 300 − 45 = 255 cm.'),
  q('prof_prob_cortes','Una tira mide 150 cm. Se divide en tramos de 30 cm. ¿Cuántos tramos se obtienen?',5,[4,6],'150 ÷ 30 = 5 tramos. No confundimos tramos con cortes.'),
 ],
 si_me_la_masa_capacidad_tiempo:[
  q('prof_med_masa_problema','Una bolsa tenía 2 kg de arroz. Se usaron 350 g. ¿Cuántos gramos quedan?',1650,[2350,650],'2 kg = 2000 g; 2000 − 350 = 1650 g.'),
  q('prof_med_cap_problema','Hay 2 L de agua. Cada botella admite 500 mL. ¿Cuántas botellas completas se llenan?',4,[2,5],'2000 mL ÷ 500 mL por botella = 4 botellas.'),
  q('prof_med_tiempo_duracion','Una salida empieza a las 16:50 y termina a las 17:20. ¿Cuántos minutos dura?',30,[70,20],'Hasta las 17:00 pasan 10 minutos y luego otros 20: 30.'),
 ],
 ecuaciones_con_imagenes_2_incognitas:[
  q('mat_igual_simbolo','Dos bolsas iguales tienen juntas 18 fichas. ¿Cuántas fichas tiene cada bolsa?',9,[16,36],'18 ÷ 2 = 9; 9 + 9 = 18.'),
  q('mat_igual_dos','Dos estrellas valen 14. Una estrella y una luna valen 12. ¿Cuánto vale la luna?',5,[7,2],'Estrella = 7. Entonces 7 + luna = 12: luna = 5.'),
  q('mat_igual_dos','Un sol vale 8 y sol + nube = 13. ¿Qué comprobación muestra el valor correcto de nube?','8 + 5 = 13',['8 + 13 = 21','8 + 8 = 16'],'La nube debe valer 5 para completar 13.'),
 ],
 comprension_lectora_literal_inferida:[
  q('leng_lect_1_literal','¿Qué llevó Malena al club?','un termo',['un paraguas','una pelota'],'El texto dice que llevó un termo.',{tipo:'lectura',titulo:'Un nuevo texto',texto:'Malena llevó un termo al club. Su hermano llevó las tazas. Prepararon una merienda después del ensayo.'}),
  q('leng_prof_causa','¿Por qué cambiaron la fecha de la muestra?','Porque se rompió una cañería',['Porque no hicieron dibujos','Porque olvidaron invitar'],'La cañería rota impidió usar la sala.',{tipo:'lectura',titulo:'Un nuevo texto',texto:'La clase había terminado sus dibujos y enviado las invitaciones. Una cañería se rompió y la sala quedó cerrada. Por eso pasaron la muestra al viernes siguiente.'}),
  q('leng_prof_limites','¿Qué podemos afirmar a partir del texto?','Intentarán cultivar tomates',['Cosecharon muchos tomates','El cultivo fracasó'],'El texto cuenta un plan que empieza; no su resultado.',{tipo:'lectura',titulo:'Un nuevo texto',texto:'En el club prepararon cajones con tierra. El sábado sembrarán tomates por primera vez. Dentro de unas semanas revisarán si las plantas crecen.'}),
 ],
 tildes_generales_agudas_graves_esdrujulas:[
  q('leng_til_1_tonica','En la palabra ven-TA-na, ¿qué sílaba recibe la fuerza?','TA',['ven','na'],'La sílaba marcada TA recibe la fuerza.'),
  q('leng_til_3_graves','Lápiz es grave y termina en Z. ¿Por qué lleva tilde?','Porque es grave y no termina en N, S ni vocal',['Porque todas las graves llevan tilde','Porque termina en vocal'],'Las graves llevan tilde cuando no terminan en N, S ni vocal.'),
  q('leng_til_4_esdrujulas','¿Cuál escritura respeta que la fuerza está en la antepenúltima sílaba de teléfono?','teléfono',['telefono','telefóno'],'Te-LÉ-fo-no es esdrújula: lleva tilde en LÉ.'),
 ],
};

export function transferenciasParaTema(tema,unidades){
 const fijas=TRANSFERENCIAS_R27[tema]||[];
 const nuevas=unidades.flatMap(u=>(u.transferencia||[]).map(a=>({...a,objetivo_id:u.id})));
 return [...fijas,...nuevas].map((a,i)=>{
  const opciones=a.opciones.filter(o=>o!==a.respuesta_correcta);
  opciones.splice(i%a.opciones.length,0,a.respuesta_correcta);
  return {...a,opciones,id:a.id||'transferencia-r27-'+tema+'-'+i};
 });
}
