import { UNIDADES_BASES, VERSION_BASES } from "./contenido-bases.js";
import { isoDateOnly } from "./date.js";
import { accesoTema } from "./acceso-temas.js";

// Calendario inicial del producto, ajustable con observación; no son intervalos clínicos ni óptimos universales.
export const INTERVALOS_REPASO = [2, 7, 14, 30];
export const VERSION_REPASOS = "repasos-2026-09-v1";
const dia = fecha => { const d = new Date(fecha); return Number.isFinite(d.getTime()) ? isoDateOnly(d) : null; };
const sumarDias = (fecha, n) => new Date(Date.parse(fecha + "T12:00:00Z") + n * 86400000).toISOString().slice(0,10);

function observaciones(sesiones, unidad, ahora) {
 const salida = [], vistos = new Set();
 for (const s of sesiones) {
  const p = s.ia_parametros_usados || {};
  if(s.tema !== unidad.tema || p.objetivo_id !== unidad.id || p.contenido_version !== VERSION_BASES) continue;
  if(!['leccion','practica','multiple','completar','produccion'].includes(s.tipo_pregunta)) continue;
  const intentos = (p.eventos_pedagogicos || []).filter(e => e.evaluado_el && Object.hasOwn(e,'es_correcta'));
  const eventos = intentos.length ? intentos.map(e=>({id:e.id,fecha:e.evaluado_el,correcta:e.es_correcta,ayuda:Boolean(e.con_ayuda),noVisto:e.tipo==='no_visto'}))
   : [{id:'legacy',fecha:s.created_at,correcta:s.es_correcta,ayuda:Boolean(p.resuelto_con_ayuda || p.ayuda_utilizada),noVisto:Boolean(p.no_visto)}];
  for(const e of eventos){
   const key = String(s.id)+':'+e.id;
   if(vistos.has(key) || !dia(e.fecha) || new Date(e.fecha)>ahora) continue;
   vistos.add(key);
   if(typeof e.correcta !== 'boolean' && !e.noVisto) continue;
   salida.push({...e,leccion:s.tipo_pregunta==='leccion',actividad:p.actividad_id || s.id});
  }
 }
 return salida.sort((a,b)=>new Date(a.fecha)-new Date(b.fecha));
}

export function planificarRepasos(sesiones = [], { ahora = new Date(), plan = 'full', rutaFlexible = false } = {}) {
 const hoy = dia(ahora); if(!hoy)return [];
 const aprobados = sesiones.filter(s=>s.tipo_pregunta==='examen_final' && s.es_correcta===true).map(s=>s.tema);
 const resultados=[];
 for(const u of UNIDADES_BASES){
  if(!accesoTema(u.tema,{plan,aprobados,rutaFlexible}).habilitado)continue;
  let explicada=false, fallos=0, consolidado=null, proximo=null, etapa=0, necesitaExplicacion=false, ultimaPromocion=null;
  const pruebas=new Set();
  for(const e of observaciones(sesiones,u,ahora)){
   const fecha=dia(e.fecha);
   if(!consolidado){
    if(e.leccion){if(typeof e.correcta==='boolean'){explicada=true;fallos=0;}continue;}
    if(e.correcta===false){fallos++;if(fallos>=2){pruebas.clear();explicada=false;}}
    if(e.correcta===true){fallos=0;if(!e.ayuda && !e.noVisto)pruebas.add(e.actividad);}
    if(explicada && pruebas.size>=2){consolidado=fecha;proximo=sumarDias(fecha,INTERVALOS_REPASO[0]);}
    continue;
   }
   if(e.leccion && e.correcta===true){
    // Volver a explicar y resolver con guía prepara un nuevo intento; no equivale a recordar sin ayuda.
    etapa=0;necesitaExplicacion=false;proximo=sumarDias(fecha,INTERVALOS_REPASO[0]);continue;
   }
   if(e.correcta===false || e.ayuda || e.noVisto){etapa=0;necesitaExplicacion=true;proximo=sumarDias(fecha,1);continue;}
   if(e.correcta===true && !e.leccion){
    if(necesitaExplicacion){necesitaExplicacion=false;proximo=sumarDias(fecha,INTERVALOS_REPASO[0]);}
    else if(fecha>=proximo && ultimaPromocion!==fecha){etapa=Math.min(etapa+1,INTERVALOS_REPASO.length-1);proximo=sumarDias(fecha,INTERVALOS_REPASO[etapa]);ultimaPromocion=fecha;}
   }
  }
  if(consolidado)resultados.push({objetivo_id:u.id,tema:u.tema,titulo:u.titulo,proximo_dia:proximo,disponible:proximo<=hoy,necesita_explicacion:necesitaExplicacion,intervalo_dias:necesitaExplicacion?1:INTERVALOS_REPASO[etapa]});
 }
 return resultados.sort((a,b)=>Number(b.disponible)-Number(a.disponible) || Number(b.necesita_explicacion)-Number(a.necesita_explicacion) || a.proximo_dia.localeCompare(b.proximo_dia) || a.objetivo_id.localeCompare(b.objetivo_id));
}

export async function cargarHistorialRepasos(db, userId) {
 const todas=[];
 for(let pagina=0;pagina<200;pagina++){
  const {data,error}=await db.from('sesiones').select('id, user_id, tema, tipo_pregunta, es_correcta, created_at, ia_parametros_usados')
   .eq('user_id',userId).order('created_at',{ascending:true}).order('id',{ascending:true}).range(pagina*500,pagina*500+499);
  if(error)throw new Error('No se pudo consultar el historial de repaso.');
  todas.push(...(data || []));if((data || []).length<500)return todas;
 }
 throw new Error('El historial requiere una consulta más amplia.');
}
