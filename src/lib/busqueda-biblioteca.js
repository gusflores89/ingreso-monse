const normalizar=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function coincideBusqueda(texto,consulta){
 const contenido=normalizar(texto);
 const palabras=normalizar(consulta).split(/\s+/).filter(p=>p&&!['de','del','la','las','el','los','con','y'].includes(p));
 return palabras.every(p=>contenido.includes(p.length>4&&p.endsWith('s')?p.slice(0,-1):p));
}
