const CAMPOS = ['fecha','user_id','tema','solicitud_tema','solicitud_modo','pregunta','sesionId','evaluacion','intento','pasoActual','respuesta','borrador','pistaActiva','desafios','retosCompletadosIds','misionTerminada','respuestasExamen','estrellas','forzar_practica','envioPendiente','actividadAnterior','pasoEjemplo'];
export function validarEstadoMision(input,usuario) {
  const fail=()=>{throw Object.assign(new Error('El estado de la misión no es válido.'),{status:400});};
  if(!input || typeof input !== 'object' || Array.isArray(input) || JSON.stringify(input).length>120000)fail();
  if(input.user_id && input.user_id!==usuario)fail();
  const estado=Object.fromEntries(CAMPOS.filter(k=>Object.hasOwn(input,k)).map(k=>[k,input[k]]));estado.user_id=usuario;
  if(estado.sesionId!=null && (typeof estado.sesionId!=='string' || !estado.sesionId || estado.sesionId.length>100))fail();
  if(!Number.isInteger(estado.estrellas) || estado.estrellas<0 || estado.estrellas>1000000)fail();
  if(!Array.isArray(estado.retosCompletadosIds) || estado.retosCompletadosIds.length>3 || estado.retosCompletadosIds.some(id=>typeof id!=='string' || id.length>100))fail();
  if(new Set(estado.retosCompletadosIds).size!==estado.retosCompletadosIds.length || estado.desafios!==estado.retosCompletadosIds.length)fail();
  for(const key of ['respuesta','borrador'])if(estado[key]!=null && (typeof estado[key]!=='string' || estado[key].length>2000))fail();
  if(estado.pregunta!=null && (typeof estado.pregunta!=='object' || Array.isArray(estado.pregunta)))fail();
  if(estado.evaluacion!=null && (typeof estado.evaluacion!=='object' || Array.isArray(estado.evaluacion)))fail();
  if(estado.envioPendiente){const p=estado.envioPendiente;if(p.sesion_id!==estado.sesionId || typeof p.envio_id!=='string' || !/^[a-zA-Z0-9_-]{8,100}$/.test(p.envio_id) || typeof p.respuesta_usuario!=='string' || p.respuesta_usuario.length>2000)fail();}
  return estado;
}
