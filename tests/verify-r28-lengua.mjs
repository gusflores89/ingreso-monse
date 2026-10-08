import assert from 'node:assert/strict';
import {CURRICULUM_LENGUA} from '../src/lib/curriculum.js';
import {EXPLORADORES_LENGUA,TEMAS_EXPLORADORES_LENGUA,explicarOrdenHistoria} from '../src/lib/exploradores-lengua.js';
assert.deepEqual([...TEMAS_EXPLORADORES_LENGUA].sort(),CURRICULUM_LENGUA.map(t=>t.tema).sort());
for(const [tema,e] of Object.entries(EXPLORADORES_LENGUA)){
 assert(e.modelo&&e.titulo,tema);
 for(const v of e.variantes||[]){
  if(e.tipo==='familia')assert.equal(e.raiz+v.final,v.palabra);
  if(e.tipo==='plural_z'){assert.equal(v.base+'z',v.singular);assert.equal(v.base+'ces',v.plural);}
  if(e.tipo==='vocales'){for(const k of ['correcto','pruebaJunta','pruebaSeparada'])assert.equal(v[k].join(''),v.palabra);}
 }
}
const acento=EXPLORADORES_LENGUA.tildes_generales_agudas_graves_esdrujulas;
assert.deepEqual(acento.variantes.map(v=>v.palabra),['público','publico','publicó']);
assert.match(acento.variantes[0].explicacion,/esdrújula/);
assert.match(acento.variantes[1].explicacion,/grave/);
assert.match(acento.variantes[2].explicacion,/aguda/);
const verbos=EXPLORADORES_LENGUA.verbos_modo_indicativo_tiempos;
assert.deepEqual(verbos.variantes.map(v=>v.verbo),['dibujé','dibujo','dibujaré']);
assert.notEqual(explicarOrdenHistoria(['problema','accion','resultado']),explicarOrdenHistoria(['resultado','accion','problema']));
assert.notEqual(explicarOrdenHistoria([]),explicarOrdenHistoria(['problema']));
assert.match(EXPLORADORES_LENGUA.ortografia_h.modelo,/no inventamos una razón/);
console.log(JSON.stringify({temas:14,modelos:true,transformaciones:true,linguistica:true}));
