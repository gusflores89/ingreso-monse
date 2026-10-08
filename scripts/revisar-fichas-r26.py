"""Revisión editorial R26: se ejecuta una vez; las fichas JSON son la fuente final."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'src/lib/fichas-modulos.json'
items=json.loads(p.read_text(encoding='utf8'))
by={f['tema']:f for f in items}
f=by['decimales_conversion']
f.update(title='La mitad de una jarra de jugo',proposito='Miramos el jugo antes de leer los números.',
 situacion='Esta jarra sirve para servir jugo. Tiene rayitas que muestran cuánto líquido hay. El jugo llega a la mitad: hay medio litro.',
 prerrequisito='Primero mirá el nivel del jugo; después, su rayita.')
f['relaciones']=[{'desde':'Jugo hasta arriba','enlace':'en esta jarra es','hasta':'1 litro: 1 L'},
 {'desde':'Jugo hasta la mitad','enlace':'se puede escribir','hasta':'medio litro: 0,5 L'}]
f['ejemplo']={'titulo':'Seguimos el nivel del jugo','pasos':['La marca 1 L indica un litro. L es la forma corta de escribir litro.',
 'Buscá dónde termina el jugo: llega a la rayita del medio. Hay medio litro.',
 'Medio litro se escribe 0,5 L. La coma ayuda a escribir una cantidad menor que un litro.']}
f['otroContexto']={'texto':'Dos vasos de medio litro llenan esta jarra de un litro.',
 'conexion':'Juntamos dos mitades: 0,5 L + 0,5 L = 1 L.'}
f['exploracion']={'tipo':'jarra','inicial':500}
f=by['fracciones_concepto']
f['situacion']='Repartimos todo el jugo de esta jarra en cuatro vasos iguales, con la misma cantidad en cada uno. Elegimos tres vasos: son tres de las cuatro partes del jugo inicial.'
f['exploracion']={'tipo':'jarra','inicial':750}
f['ejemplo']['pasos']=['Todo el jugo de la jarra es el total: lo repartimos sin dejar jugo dentro.',
 'Los cuatro vasos tienen la misma cantidad. Cada vaso tiene una de cuatro partes: un cuarto, 1/4.',
 'Los tres vasos marcados reúnen tres partes de las cuatro: tres cuartos, 3/4.']
f=by['si_me_la_masa_capacidad_tiempo']
f['situacion']='La balanza muestra cuánto pesa la harina: 500 gramos. En la jarra cabe hasta 1 litro, aunque ahora tenga medio litro. Con un reloj podemos medir cuánto dura una actividad.'
f['prerrequisito']='Mirá cada objeto y la cantidad que señala, uno por vez.'
f['ejemplo']['pasos']=['La harina está sobre una balanza: un aparato para medir su masa. La pantalla dice 500 g; g significa gramos.',
 'La capacidad es lo máximo que cabe. En esta jarra cabe 1 litro; el jugo de ahora ocupa solo la mitad.',
 'Para un recreo miramos cuánto tiempo pasa desde el inicio hasta el final. Podemos contarlo en minutos.']
f['otroContexto']={'texto':'Una botella vacía de un litro conserva su capacidad: puede contener hasta un litro, aunque ahora no tenga agua.',
 'conexion':'Lo que cabe y lo que hay ahora pueden ser cantidades distintas.'}
f['exploracion']={'tipo':'instrumentos'}
by['numeros_romanos']['situacion']='Un capítulo es una parte de un libro. Estos tres capítulos se llaman I, II y III: primero, segundo y tercero.'
by['ortografia_h']['ejemplo']['pasos'][1]='Hormiguero es el lugar donde vive un grupo de hormigas.'
by['geometria_triangulos']['situacion']='Juntamos tres palitos rectos por sus puntas. Queda una figura cerrada, sin aberturas: un triángulo.'
by['si_me_la_longitud']['situacion']='Ponemos el inicio de la cinta en el 0 de la regla. Entre 0 y 1 hay un centímetro, escrito 1 cm. El otro extremo llega al 6: la cinta mide 6 cm.'
f=by['si_me_la_longitud']
f['relaciones']=[{'desde':'Entre 0 y 1','enlace':'hay','hasta':'1 centímetro: 1 cm'},
 {'desde':'De 0 hasta 6','enlace':'contamos','hasta':'6 espacios de 1 cm'}]
f['ejemplo']={'titulo':'Miramos la cinta sobre la regla','pasos':['Ponemos un extremo de la cinta justo en el 0.',
 'Seguimos la cinta: entre dos números seguidos hay un espacio de 1 cm.',
 'El otro extremo llega al 6. Contamos seis espacios: la cinta mide 6 cm.']}
f['contraste']={'texto':'Si la cinta empieza en el 1, el número del final no indica por sí solo cuánto mide.',
 'explicacion':'Para esta primera medición, hacemos coincidir el inicio de la cinta con el 0.'}
f['comprobacion']={'pregunta':'¿Dónde ponemos el inicio de la cinta para leer directamente su largo?',
 'opciones':['En cualquier número','En el 1','En el 0'],'correcta':2,
 'pista':'Mirá el extremo izquierdo de la cinta en el dibujo.','explicacion':'Empezamos en el 0 y miramos hasta dónde llega el otro extremo.'}
alts={f['tema']:f['situacion'] for f in items}
alts.update({
 'decimales_conversion':'Jarra transparente con asa y pico. El jugo naranja llega a la mitad. Las rayitas señalan 0 L abajo, 0,5 L en el medio y 1 L arriba. Una flecha une el nivel del jugo con la marca del medio.',
 'fracciones_concepto':'Una jarra llena de jugo y una flecha hacia cuatro vasos iguales, todos con la misma cantidad. Tres vasos tienen un contorno rojo: son tres de cuatro partes del jugo inicial.',
 'fracciones_del_resto':'Ocho galletitas: cuatro tachadas ya usadas; las cuatro restantes están dentro de un recuadro. Dos de las restantes están señaladas: son la mitad de lo que quedó.',
 'division_1_digito':'Cuatro platos para Ana, Luz, Leo y Teo, con dos fichas en cada plato. Son ocho fichas en total: ocho repartidas entre cuatro dan dos por persona.',
 'si_me_la_longitud':'Cinta colocada desde el cero hasta el seis en una regla. Cada intervalo entre dos números seguidos mide un centímetro.',
 'geometria_angulos':'Una flecha pasa de apuntar hacia arriba a apuntar a la derecha. Un arco señala el giro de un cuarto de vuelta: un ángulo recto.',
 'perimetros_compuestos':'Dos cuadrados unidos comparten una línea interior discontinua. Las flechas recorren solo los seis centímetros del contorno exterior.'})
for f in items:f['visual']={'tipo':'escena','recurso':f['tema']+'.svg'}
p.write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(root/'src/lib/fichas-diagramas.json').write_text(json.dumps(alts,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('40 fichas con escena; revisión de vocabulario y cantidad/capacidad aplicada.')
