"""R20: elegir evidencia pertinente, con textos originales y corrección revisada."""
import json
from pathlib import Path
U=[]
def unit(id,after,title,exp,hint,rows):
 activities=[]
 for i,(sentences,claim,answer_index,why) in enumerate(rows):
  assert len(sentences)==len(set(sentences))==3
  answer=sentences[answer_index];story=' '.join(sentences)
  # Rotar la posición correcta: no premiar elegir siempre la misma tarjeta.
  others=[s for j,s in enumerate(sentences) if j!=answer_index]
  options=others[:];options.insert(i%3,answer)
  question='La respuesta dice: «'+claim+'». Elegí la frase del texto que la sostiene.'
  activities.append(dict(id=id+'-v'+str(i+1),enunciado=question,respuesta_correcta=answer,opciones=options,
   paso_resuelto='La frase es: «'+answer+'». '+why,visual=dict(tipo='lectura',titulo='Texto para releer',texto=story)))
 first=activities[0]
 U.append(dict(id=id,tema='comprension_lectora_literal_inferida',despues_de=after,titulo=title,explicacion=exp,
  ejemplo='Para sostener «'+rows[0][1]+'», elegimos «'+first['respuesta_correcta']+'».',
  pasos=[rows[0][3],'Las otras frases también están en el texto, pero no sostienen esta respuesta.'],
  pista=hint,visual=first['visual'],actividades=activities))
unit('leng_evi_dato','leng_esc_resumen','Encontrar la frase que responde','Una evidencia es una parte del texto que sirve para sostener una respuesta. Primero vemos qué dato necesitamos: quién, dónde o cuándo. Después releemos y elegimos la frase que aporta ese dato. Que una frase aparezca en el texto no significa que responda nuestra pregunta.','Releé la respuesta: ¿necesitás saber quién, dónde o cuándo? Buscá la frase que da ese dato.',[
(['La feria reunió a varias familias del barrio.','Los puestos se instalaron en el patio del club.','Al final compartieron una merienda.'],'La feria se hizo en el patio del club',1,'La frase nombra el lugar de los puestos. Las familias y la merienda no dicen dónde fue.'),
(['Lucía y Mateo prepararon el afiche.','Mateo escribió los horarios de la muestra.','Lucía dibujó los animales del afiche.'],'Lucía hizo los dibujos de animales',2,'La frase une a Lucía con la acción de dibujar. Escribir horarios fue tarea de Mateo.'),
(['El préstamo de juegos comienza los jueves.','La biblioteca guarda los juegos en un armario.','Cada familia puede llevar un juego.'],'Los préstamos de juegos empiezan los jueves',0,'Comienza los jueves indica cuándo se inicia el préstamo. El armario responde dónde se guardan.'),
(['La clase visitó el vivero por la mañana.','La encargada entregó semillas de lechuga al grupo.','Los chicos llevaron las semillas a la escuela.'],'El grupo recibió semillas de lechuga',1,'La frase identifica qué semillas recibieron. El viaje de regreso no aporta ese dato.'),
(['El taller funcionará en la sala del fondo.','Las familias pueden anotarse en la entrada.','La primera reunión será el sábado.'],'La primera reunión será el sábado',2,'La frase indica el día de la primera reunión. Las otras hablan de lugares.'),
(['Sara guardó las tijeras en el cajón azul.','Después dejó los papeles sobre la mesa.','Al terminar apagó la luz del salón.'],'Las tijeras quedaron en el cajón azul',0,'La frase conecta las tijeras con el cajón. La mesa es el lugar de los papeles.')])
unit('leng_evi_causa','leng_evi_dato','Buscar la frase que explica por qué','Para sostener una respuesta sobre una causa, buscamos qué produjo el cambio o impidió algo. Primero ubicamos lo que pasó; luego releemos qué lo explica. Una frase que cuenta algo ocurrido antes no siempre expresa la causa. Podemos encontrar pistas como porque o por falta de.','Buscá qué provocó el cambio. Un horario, un objeto o algo que pasó antes puede ser solo un detalle.',[
(['El grupo tenía una visita al museo.','La visita se suspendió porque el museo debía reparar el techo.','Los chicos habían preparado preguntas.'],'La reparación del techo causó la suspensión de la visita',1,'Porque conecta la suspensión con la reparación. Preparar preguntas no fue la causa.'),
(['Los vecinos regaron las plantas por la mañana.','Las macetas estaban junto a una pared.','Tras varios días sin lluvia, la tierra estaba seca.'],'Regaron porque la tierra necesitaba agua',2,'La tierra seca tras días sin lluvia explica la necesidad de regar. La pared no explica esa necesidad.'),
(['Por falta de luz en la sala, la lectura se trasladó al patio.','Los libros estaban sobre una mesa.','La actividad comenzó a las diez.'],'La falta de luz hizo que cambiaran de lugar',0,'La frase conecta explícitamente la falta de luz con el traslado. La hora no explica el cambio.'),
(['El equipo llegó al club con sus pelotas.','Como la cancha estaba inundada, entrenaron en el gimnasio.','Al terminar guardaron el material.'],'Entrenaron adentro porque la cancha estaba inundada',1,'Como presenta la causa del cambio de lugar. Llegar y guardar el material son otros momentos.'),
(['Los lectores esperaban frente a la biblioteca.','Había un cartel junto a la puerta.','La apertura se demoró porque no encontraban la llave.'],'No encontrar la llave retrasó la apertura',2,'La frase dice por qué se demoró la apertura. No sabemos qué decía el cartel.'),
(['La caja se rompió por el peso de los libros.','Tenía una etiqueta verde en un costado.','Los libros pertenecían a la escuela.'],'El peso de los libros rompió la caja',0,'Por el peso identifica la causa. El color y la pertenencia de los libros no explican la rotura.')])
unit('leng_evi_inferencia','leng_evi_causa','Elegir una pista para una conclusión','A veces la respuesta no está escrita con las mismas palabras: la inferimos a partir de una pista. Elegimos una frase que permita explicar cómo llegamos a esa idea. Por ejemplo, un piso mojado puede resbalar. Una pista sostiene una conclusión razonable; no permite inventar detalles que el texto no cuenta.','Preguntate: ¿cómo me ayuda esta frase a llegar a la conclusión? No alcanza con que nombre el mismo objeto.',[
(['La entrada del salón tenía dos puertas.','El agua de la limpieza todavía cubría el piso.','En una pared colgaba un calendario.'],'Había que caminar con cuidado para no resbalar',1,'El agua en el piso permite pensar que podía estar resbaladizo. El número de puertas no indica ese riesgo.'),
(['El grupo se reunió en el salón del club.','Habían conversado sobre varios juegos.','Cada integrante tomó su mochila y se acercó a la salida.'],'El grupo parecía prepararse para irse',2,'Tomar las mochilas y acercarse a la salida sugiere una partida. No nos dice a dónde irían.'),
(['El libro tenía el lomo gastado y varias páginas dobladas.','Su tapa mostraba un bosque.','Estaba junto a un diccionario.'],'El libro mostraba señales de mucho uso',0,'El desgaste y los dobleces son señales de uso. La imagen de la tapa no permite saber cuánto se leyó.'),
(['En la cocina había una mesa grande.','Al destapar la olla salió vapor y Julia retiró la mano enseguida.','La olla tenía dos asas.'],'Era prudente dejar enfriar la olla antes de tocarla',1,'El vapor y el gesto de retirar la mano sugieren calor. No sabemos la temperatura exacta ni si Julia se quemó.'),
(['La biblioteca recibió un sillón nuevo.','La sala tenía una ventana hacia la plaza.','Apenas quedó libre el sillón, tres lectores se acercaron a ocuparlo.'],'Varios lectores querían usar el sillón',2,'Acercarse para ocuparlo muestra interés por usarlo. No permite afirmar que todos los lectores lo preferían.'),
(['Al oír el trueno, el perro se escondió bajo la cama y tembló.','Su manta estaba junto a la puerta.','Afuera había empezado a llover.'],'El perro parecía asustado por el trueno',0,'Esconderse y temblar al oírlo son pistas de miedo. La lluvia sola no cuenta cómo reaccionó el perro.')])
root=Path(__file__).resolve().parents[1];p=root/'src/lib/contenido-bases.js';s=p.read_text(encoding='utf-8');start='// R20: evidencia textual.';end='// FIN R20'
if start in s:s=s[:s.index(start)]+s[s.index(end)+len(end):]
code=start+'\nconst EVIDENCIA_R20 = '+json.dumps(U,ensure_ascii=False,indent=2)+""";
for (const unidad of EVIDENCIA_R20) {
 const indice=UNIDADES_BASES.findIndex(u=>u.id===unidad.despues_de);
 if(indice<0)throw new Error('Falta el paso anterior de '+unidad.id);
 UNIDADES_BASES.splice(indice+1,0,unidad);
}
"""+end+'\n\n';i=min(s.index(m) for m in ['// INICIO R22','export const TEMAS_BASES'] if m in s);p.write_text(s[:i]+code+s[i:],encoding='utf-8');print(len(U),'unidades;',len(U)*6,'actividades')
