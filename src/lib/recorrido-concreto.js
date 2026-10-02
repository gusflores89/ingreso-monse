// Evidencia inicial de acciones; nunca sustituye objetivos o exámenes del currículo.
export const VERSION_CONCRETA = 1;
export const HABILIDADES_CONCRETAS = [
 {id:'cantidad',titulo:'Armar cantidades',tipo:'cantidad',variantes:[[3],[4],[6]],idea:'Una ficha por cada toque. Podemos contarlas señalando una por una.'},
 {id:'juntar',titulo:'Juntar fichas',tipo:'juntar',variantes:[[3,2],[2,2],[4,1]],idea:'Las fichas que estaban se quedan. Las nuevas van junto a ellas.'},
 {id:'quitar',titulo:'Quitar fichas',tipo:'quitar',variantes:[[5,2],[4,1],[6,2]],idea:'Las que guardamos van a la caja. Las demás quedan afuera.'},
 {id:'grupos',titulo:'Formar grupos iguales',tipo:'grupos',variantes:[[3,2],[2,2],[2,3]],idea:'Cada plato recibe la misma cantidad. Después contamos todas las fichas.'},
 {id:'repartir',titulo:'Repartir por igual',tipo:'repartir',variantes:[[6,2],[4,2],[8,4]],idea:'Damos una ficha a cada plato y seguimos hasta repartirlas todas.'},
 {id:'mitades',titulo:'Explorar mitades',tipo:'fraccion',variantes:[[2,1],[2,2],[2,1]],idea:'Este rectángulo es un entero. Una mitad es una de sus dos partes iguales.'},
 {id:'cuartos',titulo:'Explorar cuartos',tipo:'fraccion',variantes:[[4,1],[4,2],[4,3]],idea:'Conservamos el mismo entero. Cada cuarto es una de sus cuatro partes iguales.'},
];
export function habilidadConcreta(id) { return HABILIDADES_CONCRETAS.find(h=>h.id===id); }
export function resumirEvidenciaConcreta(historia=[]) {
 return HABILIDADES_CONCRETAS.map(h=>{
  const sesiones=historia.filter(s=>s.ia_parametros_usados?.concreto_version===VERSION_CONCRETA && s.ia_parametros_usados?.habilidad===h.id);
  const terminadas=sesiones.filter(s=>s.ia_parametros_usados?.concreto_resultado?.completado);
  const independientes=new Set(terminadas.filter(s=>s.ia_parametros_usados.concreto_resultado.independiente).map(s=>s.ia_parametros_usados.variante));
  return {id:h.id,titulo:h.titulo,observada:terminadas.length>0,independientes:independientes.size,estado:independientes.size>=2?'Para volver a comprobar':terminadas.length?'En práctica':'Todavía no observado'};
 });
}
export function crearRetoConcreto(tema,historia=[],seleccion=null) {
 const resumen=resumirEvidenciaConcreta(historia);
 const familia=/fracci/.test(tema)?['mitades','cuartos']:['cantidad','juntar','quitar','grupos','repartir'];
 const id=seleccion || familia.find(k=>resumen.find(r=>r.id===k).independientes<2) || familia[0];
 const h=habilidadConcreta(id); if(!h)throw Object.assign(Error('Elegí una actividad disponible.'),{status:400});
 const previas=historia.filter(s=>s.ia_parametros_usados?.concreto_version===VERSION_CONCRETA && s.ia_parametros_usados?.habilidad===id);
 const completas=previas.filter(s=>s.ia_parametros_usados?.concreto_resultado?.completado);
 const independientes=new Set(completas.filter(s=>s.ia_parametros_usados.concreto_resultado.independiente).map(s=>s.ia_parametros_usados.variante));
 const variante=!completas.length?0:([1,2].find(n=>!independientes.has(n)) ?? (completas.length%2+1));
 const ultima=completas.at(-1)?.ia_parametros_usados.concreto_resultado;
 const ensenanza=!completas.length || ultima?.correcta===false;
 const [a,b]=h.variantes[variante];
 const consigna=h.tipo==='cantidad'?`Poné ${a} fichas en la bandeja.`:h.tipo==='juntar'?`Hay ${a} fichas. Agregá ${b}.`:h.tipo==='quitar'?`Hay ${a} fichas. Guardá ${b} en la caja.`:h.tipo==='grupos'?`Poné ${b} fichas en cada uno de los ${a} platos.`:h.tipo==='repartir'?`Repartí estas ${a} fichas entre los ${b} platos. Que tengan la misma cantidad.`:`Pintá ${b===1?'una parte':b+' partes'} de este entero dividido en ${a} partes iguales.`;
 return {tipo:'concreta',concreto_version:VERSION_CONCRETA,habilidad:id,titulo:h.titulo,tipo_tablero:h.tipo,variante,a,b,ensenanza,idea:h.idea,consigna,resumen,
  pregunta:consigna,tiempo_estimado:3};
}
export function distribucionEsperada(r) {
 if(r.tipo_tablero==='cantidad')return [r.a];
 if(r.tipo_tablero==='juntar')return [r.a+r.b];
 if(r.tipo_tablero==='quitar')return [r.b];
 if(r.tipo_tablero==='grupos')return Array(r.a).fill(r.b);
 if(r.tipo_tablero==='repartir')return Array(r.b).fill(r.a/r.b);
 return [];
}
export function cantidadEsperada(r) { return r.tipo_tablero==='quitar'?r.a-r.b:r.tipo_tablero==='grupos'?r.a*r.b:r.tipo_tablero==='repartir'?r.a/r.b:distribucionEsperada(r)[0]; }
export function estadoInicialConcreto(r) {return {fase:r.ensenanza?'modelo':'hacer',modelo:0,modeloVisto:false,tablero:r.tipo_tablero==='juntar'?[r.a]:Array(r.tipo_tablero==='grupos'?r.a:r.tipo_tablero==='repartir'?r.b:1).fill(0),cantidad:0,seleccion:[],lectura:false};}
export function evaluarConstruccion(r,raw) {
 let s;try{s=JSON.parse(raw);}catch{throw Object.assign(Error('No pudimos leer la construcción.'),{status:400});}
 if(!s || !Array.isArray(s.tablero) || s.tablero.length>4 || s.tablero.some(n=>!Number.isInteger(n)||n<0||n>12) || !Array.isArray(s.seleccion) || s.seleccion.length>4 || s.seleccion.some(n=>!Number.isInteger(n)||n<0||n>=r.a) || !Number.isInteger(s.cantidad)||s.cantidad<0||s.cantidad>12)throw Object.assign(Error('Construcción inválida.'),{status:400});
 const esperada=distribucionEsperada(r),fraccion=r.tipo_tablero==='fraccion';
 const accion=fraccion?new Set(s.seleccion).size===s.seleccion.length && s.seleccion.length===r.b:JSON.stringify(s.tablero)===JSON.stringify(esperada);
 const total=fraccion || r.tipo_tablero==='cantidad' || s.cantidad===cantidadEsperada(r);
 const correcta=accion && total;
 const pista=!accion?(r.tipo_tablero==='repartir'?`Los platos tienen ${s.tablero.join(' y ')}. Probemos una ficha en cada plato y volvamos a contar.`:r.tipo_tablero==='fraccion'?'Cada parte tiene el mismo tamaño. Tocá las partes que pide la consigna.':r.idea):'La acción está hecha. Contá ahora las fichas que pide la última consigna.';
 return {correcta,pista,lectura:s.lectura===true,modeloVisto:s.modeloVisto===true,construccion:{tablero:s.tablero,cantidad:s.cantidad,seleccion:s.seleccion},
  cierre:r.tipo_tablero==='repartir'?`${r.a} fichas en ${r.b} platos: cada uno recibe ${cantidadEsperada(r)}. ${r.a} ÷ ${r.b} = ${cantidadEsperada(r)}.`:r.tipo_tablero==='juntar'?`${r.a} y ${r.b} juntas forman ${r.a+r.b}. ${r.a} + ${r.b} = ${r.a+r.b}.`:r.tipo_tablero==='quitar'?`Había ${r.a}, guardamos ${r.b} y quedaron ${r.a-r.b}.`:fraccion?`Pintaste ${r.b} de las ${r.a} partes iguales del mismo entero.`:`Construiste la cantidad y la comprobaste con fichas.`};
}
