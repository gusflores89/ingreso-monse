import assert from 'node:assert/strict';
import { CURRICULUM_MATEMATICA } from '../src/lib/curriculum.js';
import { EXPLORADORES_MATEMATICAS, modeloSuma, romano, datosReparto, serieFibonacci } from '../src/lib/exploradores-matematicas.js';
assert.deepEqual(Object.keys(EXPLORADORES_MATEMATICAS).sort(), CURRICULUM_MATEMATICA.map(t=>t.tema).sort());
let casos=0;
for(const d1 of [2,3,4,6,8])for(const d2 of [2,3,4,6,8])for(let n1=0;n1<=d1;n1++)for(let n2=0;n2<=d2;n2++){
 const m=modeloSuma(n1,d1,n2,d2);
 assert.equal(m.primero*d1,n1*m.denominador);
 assert.equal(m.segundo*d2,n2*m.denominador);
 assert.equal(m.total*d1*d2,(n1*d2+n2*d1)*m.denominador);
 assert(m.total>=0&&m.total<=2*m.denominador);
 assert(m.denominador<=24);
 casos++;
}
assert.deepEqual(modeloSuma(1,2,1,3),{denominador:6,primero:3,segundo:2,total:5});
assert.deepEqual(modeloSuma(1,4,1,2),{denominador:4,primero:1,segundo:2,total:3});
for(let total=1;total<=24;total++)for(let grupos=2;grupos<=6;grupos++){
 const r=datosReparto(total,grupos);assert.equal(r.porGrupo*grupos+r.resto,total);assert(r.resto>=0&&r.resto<grupos);casos++;
}
assert.deepEqual(datosReparto(8,4),{porGrupo:2,resto:0});
for(const [n,r] of [[4,'IV'],[9,'IX'],[14,'XIV'],[19,'XIX'],[40,'XL'],[49,'XLIX'],[50,'L']])assert.equal(romano(n),r);
assert.deepEqual(serieFibonacci(7),[1,1,2,3,5,8,13]);
console.log(JSON.stringify({temas:26,casos,fracciones:true,repartos:true}));
