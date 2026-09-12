# R4 — Historial de intentos, ayuda y recuperación de envíos

## Resultado

Cada respuesta tiene un identificador persistente. El servidor registra el texto enviado, la fecha, el tipo de evento (respuesta, no visto o ayuda), el resultado y si hubo asistencia. Un reintento pedagógico conserva el error anterior; reenviar la misma solicitud por un corte de conexión recupera su recibo y no crea otro intento.

Los eventos quedan en `sesiones.ia_parametros_usados.eventos_pedagogicos`. Se mantiene el resultado resumido de la sesión para compatibilidad. El motor de objetivos lee los eventos evaluados cuando existen; las sesiones históricas sin eventos siguen usando su resultado anterior. No se pueden reconstruir intentos antiguos que ya habían sido sobrescritos.

Las ayudas abiertas mientras se corrige se conservan y marcan asistencia en la evidencia correspondiente. Consultar teoría después de una respuesta correcta ya terminada se registra como repaso, sin convertir retroactivamente el acierto en asistido.

## Guardado concurrente

`registro-envios.js` usa un UPDATE condicionado por un token de revisión dentro del JSONB existente. PostgreSQL decide atómicamente qué escritura gana; la otra relee y vuelve a fusionar. No se envía todo el JSON en el filtro y no se requiere una migración ni cambiar permisos.

Solo un proceso puede corregir una actividad al mismo tiempo. La reserva dura 90 segundos y tiene un token exclusivo: un proceso vencido no puede sobrescribir al que retomó su trabajo. La llamada de evaluación a IA tiene un límite de 60 segundos, sin reintentos automáticos del proveedor. Si ya se guardó una evaluación y falla un paso posterior, el mismo envío retoma esa evaluación sin otra llamada a IA.

Los recibos completados se devuelven antes de comprobar el límite diario de nuevas correcciones. Un ID reutilizado para otro texto se rechaza. Un reto ya completado no acepta otra respuesta que lo degrade. Las pestañas antiguas sin ID reciben un identificador compatible derivado del contenido; conviene recargar para usar el protocolo nuevo.

El historial no se recorta. Hay un límite de protección de 100 eventos nuevos por actividad; al alcanzarlo se informa que debe elegirse otro reto. La deduplicación y la recuperación de registros existentes siguen disponibles.

Esta garantía corresponde a los eventos y escrituras de una actividad. Los resúmenes de progreso y sugerencias en otras tablas se recalculan mediante operaciones separadas: no se implementó una transacción global entre todas las tablas ni una nueva cola de trabajos.

## PC y recuperación

La interfaz guarda el ID y el texto antes de enviarlos, bloquea inmediatamente doble clics y conserva un recibo local. Tras perder la respuesta HTTP, una recarga recupera el mismo envío. Si el almacenamiento local falla, no se envía una respuesta que no pueda recuperarse. Los errores tienen un mensaje legible que indica cómo continuar.

La cuenta de estrellas y retos conserva su deduplicación por actividad. Se reemplazó además una pista genérica sobre restos que aparecía en ejercicios sin división por la pista del contenido correspondiente.

## Verificación

- Suite de regresión: 173 casos (162 previos y 11 nuevos). Incluye concurrencia, duplicados, recuperación de reserva vencida, escritura parcial, asistencia persistente, errores por intento, pérdida de respuesta HTTP y fallo de almacenamiento local.
- Prueba sobre Supabase real: cuatro reservas simultáneas produjeron un único ganador; seis ayudas y una evaluación concurrentes conservaron siete eventos; un envío completado devolvió su recibo. Se crearon un usuario y una sesión sintéticos, eliminados por sus UUID al finalizar; se confirmó su ausencia. No se leyó ni modificó el historial de Abril.
- Edge: cuatro escenarios nuevos aprobados (doble clic; recarga tras corrección cuya respuesta HTTP se perdió; segundo intento con ayuda; consulta de teoría). Además, ocho regresiones de continuidad R2 aprobadas.
- No se hicieron llamadas nuevas a IA externa: los caminos de IA se ejercitaron con respuestas simuladas.
- Las pruebas de navegador usan interfaz real y controladores reales con datos sintéticos. La concurrencia de PostgreSQL se probó por separado contra Supabase real.

## Pendientes siguientes

Repaso espaciado por tiempo; ampliar contenido revisado de Lengua y del resto de Matemática; unificar requisitos del mapa y panel; mostrar el historial detallado en una vista familiar y completar la cola de revisión; simulacros y rachas. El historial de esta entrega ya queda almacenado, pero todavía no se añadió una pantalla familiar dedicada a consultarlo.

Referencia anterior: código R3 `9121016`, documentación `1b21625`, despliegue `dpl_D3BF1ZPdu8t19nobfQQfGSTQ1y6p`.

Evidencias: `C:\Users\gusta\.codex\visualizations\2026\09\09\01a086d6-a934-77a3-9a28-75f27a213064\implementacion-r4`.

## Estado de publicación

- Código implementado y probado: commit `0971511`.
- Compilación final local correcta; capturas revisadas tras mejorar el contraste del aviso de conexión.
- La revisión automática de permisos rechazó `vercel deploy --prod --yes`: exige autorización explícita para enviar el código privado a Vercel y modificar producción.
- Se solicitó esa autorización. R4 todavía no está publicado; no se intentó eludir el bloqueo.
- Última versión publicada conocida: R3, despliegue `dpl_D3BF1ZPdu8t19nobfQQfGSTQ1y6p`.
- Después de obtener autorización: publicar este commit, verificar el alias del dominio y repetir las cuatro pruebas de recuperación y las ocho de continuidad sobre la interfaz pública con API sintéticas.
