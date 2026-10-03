import json
from pathlib import Path
U=[]
def grid(rows,cols,split=0,removed=False,rest=None):
 return dict(tipo='arreglo',filas=rows,columnas=cols,separar=split,quitar_ultima=removed,**({'sobrantes':rest} if rest is not None else {}))
def activity(q,answer,solution,visual):
 return dict(enunciado=q,respuesta_correcta=str(answer),paso_resuelto=solution,visual=visual)
def unit(id,tema,before,title,explanation,hint,acts,steps,skill='grupos'):
 for i,a in enumerate(acts):
  ans=a['respuesta_correcta'];opts=[ans,'No' if ans=='Sí' else 'Sí'] if ans in ['Sí','No'] else [ans,str(int(ans)+1),str(int(ans)-1 if int(ans)>0 else 2)];k=i%len(opts);a['opciones']=opts[k:]+opts[:k];a['id']=id+'-v'+str(i+1)
 U.append(dict(id=id,tema=tema,antes_de=before,titulo=title,explicacion=explanation,ejemplo=acts[0]['paso_resuelto'],pasos=steps,pista=hint,visual=acts[0]['visual'],habilidad_concreta=skill,actividades=acts))
t25='tablas_multiplicar_2_5';t68='tablas_multiplicar_6_8';t910='tablas_multiplicar_9_10';td='divisibilidad_primos_mcm_mcd'
unit('puente_filas',t25,'mat_tab_dobles','Contar por filas','Cada fila tiene la misma cantidad de fichas. Sumamos una fila por vez. La multiplicación escribe esa suma de forma corta.','Señalá una fila. Contá sus fichas y sumá esa cantidad por cada fila.',[
 activity(f'Hay {r} filas de {c} fichas. ¿Cuántas fichas hay en total?',r*c,f'Sumamos '+ ' + '.join([str(c)]*r)+f' = {r*c}. Escribimos {r} × {c} = {r*c}.',grid(r,c)) for r,c in [(2,3),(3,2),(3,4),(4,2),(2,5),(4,3)]],['Contamos 3 fichas en cada fila.','Juntamos las dos filas: 3 + 3 = 6.'])
unit('puente_doble',t25,'mat_tab_dobles','Hacer el doble','El doble es tener dos veces la misma cantidad. Dibujamos una fila y otra igual. Después juntamos las dos.','El doble de una cantidad es esa cantidad más otra igual.',[
 activity(f'Una fila tiene {n} fichas y la otra también. ¿Cuánto es el doble de {n}?',2*n,f'{n} + {n} = {2*n}. Dos filas iguales tienen {2*n} fichas.',grid(2,n)) for n in [3,2,4,5,6,7]],['Una fila tiene 3 fichas. Hacemos otra igual.','Juntamos 3 y 3: el doble es 6.'])
for id,m,before,title,desc,split in [('puente_seis',6,'mat_tab_seis_ocho','Seis filas: tres y otras tres','Podemos separar seis filas en tres y otras tres. Contamos una mitad y sumamos otra igual.',3),('puente_ocho',8,'mat_tab_seis_ocho','Ocho filas: cuatro y otras cuatro','Podemos separar ocho filas en cuatro y otras cuatro. Las dos mitades tienen la misma cantidad de fichas.',4),('puente_siete',7,'mat_tab_siete','Siete filas: cinco y otras dos','Para contar siete filas, primero contamos cinco. Después contamos las otras dos y juntamos ambas cantidades.',5)]:
 acts=[activity(f'Hay {m} filas de {n} fichas. ¿Cuántas hay en total?',m*n,f'Las primeras {split} filas tienen {split*n}. Las otras {m-split} tienen {(m-split)*n}. Sumamos {split*n} + {(m-split)*n} = {m*n}.',grid(m,n,split)) for n in [2,3,4,5,6,7]]
 unit(id,t68,before,title,desc,'Contá las fichas de un lado de la línea. Después las del otro. Juntá las dos cantidades.',acts,[f'Primero contamos las {split} filas de arriba: {split*2} fichas.',f'Abajo hay {(m-split)*2}. Sumamos: {split*2} + {(m-split)*2} = {m*2}.'])
unit('puente_diez',t910,'mat_tab_diez','Paquetes de diez','Cada fila es un paquete con diez fichas. Un paquete tiene diez; dos tienen veinte. Cada paquete nuevo agrega diez.','Contá los paquetes avanzando de diez en diez.',[
 activity(f'Hay {n} paquetes de 10 fichas. ¿Cuántas fichas hay?',n*10,'Contamos '+', '.join(str(i*10) for i in range(1,n+1))+f'. Son {n*10} fichas.',grid(n,10)) for n in [2,3,4,5,6,7]],['Cada paquete tiene 10 fichas.','Dos paquetes: 10 + 10 = 20.'])
unit('puente_nueve',t910,'mat_tab_nueve','De diez filas a nueve','Armamos diez filas iguales. Tachamos una fila completa. Contamos las nueve que quedan: quitamos una fila, no una sola ficha.','La fila tachada ya no cuenta. Quitá todas sus fichas.',[
 activity(f'De 10 filas de {n} fichas tachamos una fila. ¿Cuántas fichas quedan?',9*n,f'Había {10*n} fichas. Quitamos una fila de {n}: {10*n} − {n} = {9*n}.',grid(10,n,0,True)) for n in [2,3,4,5,6,7]],['Diez filas de 2 tienen 20 fichas.','Quitamos una fila de 2: quedan 18.'],'quitar')
unit('puente_saltos',td,'bases_multiplos_saltos','Avanzar con saltos iguales','Empezamos en cero. Cada salto suma la misma cantidad. Podemos seguir contando para encontrar dónde termina el próximo salto.','Mirá cuánto suma cada salto. Sumá esa misma cantidad otra vez.',[
 activity(f'Saltamos de {n} en {n}. Estamos en {n*k}. ¿A qué número llegamos con otro salto?',n*(k+1),f'{n*k} + {n} = {n*(k+1)}. El salto conserva su tamaño.',dict(tipo='saltos',series=[dict(paso=n,cantidad=k+1)],ocultar_final=True)) for n,k in [(2,2),(3,2),(2,3),(4,2),(3,3),(5,2)]],['Empezamos en cero y saltamos 2: llegamos al 2.','Otro salto llega al 4; uno más, al 6.'],'juntar')
unit('puente_agrupamientos',td,'div_primos_1_multiplos_divisores','Armar grupos y mirar qué sobra','Separamos fichas en grupos del mismo tamaño. Una fila es un grupo completo. Las fichas que no alcanzan para otra fila quedan aparte.','Contá solo las fichas que quedaron aparte. Los grupos completos no son sobrantes.',[
 activity(f'Agrupamos {total} fichas de a {size}. ¿Cuántas fichas sobran?',total%size,f'Armamos {total//size} grupos de {size}. '+('No queda ninguna ficha aparte: sobran 0.' if total%size==0 else f'Quedan {total%size} aparte: no alcanzan para otro grupo de {size}.'),grid(total//size,size,rest=total%size)) for total,size in [(7,3),(6,3),(9,2),(8,2),(10,3),(11,3)]],['Con 7 fichas armamos dos filas de 3.','Una ficha queda aparte. Sobra 1.'],'repartir')
unit('puente_divisor',td,'div_primos_1_multiplos_divisores','Divisor: un tamaño que encaja','Si podemos armar grupos iguales sin que sobre ninguna ficha, el tamaño del grupo es un divisor del total. Si sobra alguna, ese tamaño no es divisor.','Mirá si quedaron fichas aparte. Para ser divisor no debe sobrar ninguna.',[
 activity(f'Agrupamos {total} fichas de a {size}. ¿{size} es divisor de {total}?','Sí' if total%size==0 else 'No',f'Armamos {total//size} grupos de {size}. '+(f'No sobra ninguna: {size} sí es divisor de {total}.' if total%size==0 else f'Sobran {total%size}: {size} no es divisor de {total}.'),grid(total//size,size,rest=total%size)) for total,size in [(6,2),(7,2),(9,3),(10,3),(12,3),(11,2)]],['Las 6 fichas forman tres grupos de 2.','No sobra ninguna: 2 es divisor de 6.'],'repartir')
from math import lcm,gcd
unit('puente_encuentro',td,'div_primos_4_mcm','Encontrar el primer encuentro','Dos recorridos pueden usar saltos distintos. Miramos qué llegada comparten primero después del cero. Ese primer encuentro positivo se llama MCM.','Buscá una llegada que aparezca en las dos filas. Elegí la menor después de cero.',[
 activity(f'Una fila salta de {a} en {a}; la otra, de {b} en {b}. ¿Cuál es su primera llegada compartida después del 0?',lcm(a,b),f'Las dos filas llegan a {lcm(a,b)}. Ninguna llegada positiva anterior está en las dos: su MCM es {lcm(a,b)}.',dict(tipo='saltos',series=[dict(paso=a,cantidad=lcm(a,b)//a+1),dict(paso=b,cantidad=lcm(a,b)//b+1)])) for a,b in [(2,3),(2,4),(3,4),(3,6),(4,6),(2,5)]],['La primera fila llega a 2, 4 y 6. La segunda, a 3 y 6.','El primer encuentro después de cero es 6. No necesitamos factores primos.'],'juntar')
unit('puente_comunes',td,'div_primos_5_mcd','El mayor grupo que sirve para ambos','Buscamos tamaños de grupo que no dejen sobrantes en ninguna de las dos cantidades. Después elegimos el mayor tamaño que sirve para ambas. Ese número se llama MCD.','Compará las dos listas. De los tamaños que aparecen en ambas, elegí el mayor.',[
 activity(f'Estos tamaños no dejan sobrantes. ¿Cuál es el mayor tamaño de grupo que sirve para {a} y para {b}?',gcd(a,b),f'Los tamaños compartidos son '+', '.join(str(i) for i in range(1,min(a,b)+1) if a%i==0 and b%i==0)+f'. El mayor es {gcd(a,b)}: ese es el MCD.',dict(tipo='datos',lineas=[f'{a} fichas: grupos de '+', '.join(str(i) for i in range(1,a+1) if a%i==0),f'{b} fichas: grupos de '+', '.join(str(i) for i in range(1,b+1) if b%i==0)])) for a,b in [(4,6),(6,9),(8,12),(6,8),(5,10),(9,12)]],['Para 4 fichas sirven grupos de 1, 2 o 4. Para 6, de 1, 2, 3 o 6.','Los tamaños compartidos son 1 y 2. El mayor es 2.'],'repartir')
root=Path(__file__).resolve().parents[1];p=root/'src/lib/contenido-bases.js';s=p.read_text(encoding='utf-8');start='// INICIO R23';end='// FIN R23'
if start in s:s=s[:s.index(start)]+s[s.index(end)+len(end):]
code=start+'\nconst PUENTES_R23 = '+json.dumps(U,ensure_ascii=False,indent=2)+''';
for (const unidad of PUENTES_R23) {
 const indice=UNIDADES_BASES.findIndex(u=>u.id===unidad.antes_de);
 if(indice<0)throw Error('Falta el paso posterior de '+unidad.id);
 UNIDADES_BASES.splice(indice,0,unidad);
}
// Los procedimientos con factores primos van después de comprender MCM y MCD con listas.
const factorizacionR23=['prof_fact_primos','prof_fact_mcm','prof_fact_mcd'].map(id=>{
 const index=UNIDADES_BASES.findIndex(u=>u.id===id);
 if(index<0)throw Error('Falta '+id);
 return UNIDADES_BASES.splice(index,1)[0];
});
UNIDADES_BASES.splice(UNIDADES_BASES.findIndex(u=>u.id==='div_primos_5_mcd')+1,0,...factorizacionR23);
'''+end+'\n\n'
i=s.index('export const TEMAS_BASES');s=s[:i]+code+s[i:];s=s.replace('habilidad_concreta:habilidades[id] || null','habilidad_concreta:u.habilidad_concreta || habilidades[id] || null').replace("u.id.startsWith('entrada_'));","u.id.startsWith('entrada_') || u.id.startsWith('puente_'));")
p.write_text(s,encoding='utf-8');print(len(U),'unidades;',len(U)*6,'actividades')
