export function puedeRetomarMision(saved, { usuario, tema, modo, hoy }) {
 if (!saved || (saved.user_id && saved.user_id !== usuario)) return false;
 if (tema && tema !== saved.tema && tema !== saved.solicitud_tema) return false;
 if (modo === 'REPASO' && saved.solicitud_modo !== 'REPASO') return false;
 return Boolean((saved.pregunta && saved.sesionId && !saved.misionTerminada) || (saved.fecha === hoy && saved.misionTerminada));
}
