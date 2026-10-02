const assert=require('assert/strict');const {h}=require('./verify-r21.cjs');
const b=h.load('src/lib/contenido-bases.js',['UNIDADES_BASES','VERSION_BASES','crearActividadBase','evaluarActividadBase','getCierreBase']);
const expected={entrada_contar:[3,4,6,2,5,7],entrada_conservar:[4,3,5,6,2,7],entrada_juntar:[5,4,5,3,6,7],entrada_quitar:[3,3,4,2,5,3],entrada_diez:[12,11,13,15,14,16],entrada_llevar:[2,1,3,5,4,6],entrada_desarmar:[7,8,7,9,8,8],entrada_grupos:[4,6,6,9,8,3],entrada_repartir:[3,2,4,3,2,4],entrada_denominador:[4,2,3,4,6,8],entrada_numerador:[2,1,3,2,3,4]};
(async()=>{let checks=0;const fresh=b.UNIDADES_BASES.filter(u=>u.id.startsWith('entrada_'));assert.equal(fresh.length,11);
const curriculum=h.load('src/lib/curriculum.js',['CURRICULUM_MATEMATICA']);
const proof=u=>[0,1,2].map(n=>({id:u.id+n,user_id:h.user.id,tema:u.tema,tipo_pregunta:n?'multiple':'leccion',es_correcta:true,created_at:'2026-10-01',ia_parametros_usados:{objetivo_id:u.id,actividad_id:u.actividades[n].id,contenido_version:b.VERSION_BASES}}));
for(const u of fresh){
 assert.deepEqual(Array.from(u.actividades,a=>a.respuesta_correcta),expected[u.id].map(String));assert(b.UNIDADES_BASES.indexOf(u)<b.UNIDADES_BASES.findIndex(x=>x.id===u.antes_de));checks++;
 const before=b.UNIDADES_BASES.filter(v=>v.tema!==u.tema || b.UNIDADES_BASES.indexOf(v)<b.UNIDADES_BASES.indexOf(u)).flatMap(proof);
 const prereqs=curriculum.CURRICULUM_MATEMATICA.filter(t=>t.tema!==u.tema).map((t,i)=>({id:'req'+i,user_id:h.user.id,tema:t.tema,tipo_pregunta:'examen_final',es_correcta:true}));
 const db=h.db({sesiones:[...prereqs,...before]});const {output}=await h.start(db,{tema:u.tema,modo:'REPASO',forzar_practica:false});assert.equal(output.explicacion_simple,u.explicacion);assert(output.habilidad_concreta);assert.equal(output.ejercicio_practica.respuesta_correcta,undefined);checks++;
 for(const a of u.actividades){const session={ia_parametros_usados:{objetivo_id:u.id,actividad_id:a.id,contenido_version:b.VERSION_BASES}};for(const op of a.opciones)assert.equal(b.evaluarActividadBase(session,op).es_correcta,op===a.respuesta_correcta);assert(a.visual);checks++;}
 const old=b.UNIDADES_BASES.filter(v=>v.tema===u.tema&&!v.id.startsWith('entrada_')).flatMap(proof);assert.equal(h.objectives.esElegibleParaExamenFinal(u.tema,old),false);
 assert.equal(b.getCierreBase(u.tema).preguntas.length,3);assert(b.getCierreBase(u.tema).revision_cierre.includes(u.id));checks++;
}
const c=h.load('src/lib/recorrido-concreto.js',['crearRetoConcreto','resumirEvidenciaConcreta']);
const past=[1,2].map(n=>({created_at:'2026-10-01',ia_parametros_usados:{concreto_version:1,habilidad:'repartir',variante:n,concreto_resultado:{correcta:true,completado:true,independiente:true}}}));
past.push({created_at:'2026-10-02',ia_parametros_usados:{concreto_version:1,habilidad:'repartir',variante:1,concreto_resultado:{correcta:false,completado:false}}});
assert.equal(c.crearRetoConcreto('division_1_digito',past,'repartir').ensenanza,true);assert.equal(c.resumirEvidenciaConcreta(past).find(x=>x.id==='repartir').independientes,0);checks++;
past.at(-1).ia_parametros_usados.concreto_resultado={correcta:true,completado:true,independiente:false};past.at(-1).ia_parametros_usados.eventos_pedagogicos=[{salida:{es_correcta:false}}];
assert.equal(c.resumirEvidenciaConcreta(past).find(x=>x.id==='repartir').independientes,0);assert.equal(c.crearRetoConcreto('division_1_digito',past,'repartir').variante,1);checks++;
const diagrams=h.load('src/lib/diagrama-geometria.js',['crearDiagramaGeometria']);
for(const u of fresh)for(const a of u.actividades)if(a.visual.tipo==='colecciones'){const d=diagrams.crearDiagramaGeometria(a.visual);assert(d.trazos.length);for(const t of d.trazos)for(const [x,y] of t.puntos){assert(x>=0&&x<=480);assert(y>=0&&y<=310);}checks++;}
console.log(JSON.stringify({passed:checks,newUnits:11,newActivities:66,realDatabase:false,realAI:false}));
})().catch(e=>{console.error(e);process.exitCode=1});
