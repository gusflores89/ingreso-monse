# R8 — Continuidad de misión entre navegadores

Estado: código preparado; la sincronización real requiere aplicar la migración 008 en Supabase. No está activada todavía.

## Problema y solución

La misión, el borrador y las estrellas estaban únicamente en localStorage. Esta implementación conserva esa copia y añade un estado por alumna en una tabla separada, `continuidad_misiones`. Al abrir la tutoría consulta primero el estado remoto y recupera la pregunta, el ID de sesión, el paso de la explicación, la respuesta elegida o escrita, la evaluación, los intentos, el contador y las estrellas.

## Comportamiento implementado

- Guarda tras una pausa breve en la interacción, con solicitudes serializadas. «Guardar y salir» espera la confirmación del guardado cuando la sincronización está disponible.
- Cada guardado lleva una revisión y un identificador. La base rechaza una revisión antigua; repetir la misma operación devuelve su confirmación. Se conserva la operación pendiente si se pierde la respuesta HTTP.
- Si hay cambios locales posteriores a esa operación pendiente, se guardan después de recuperarla; no se descarta el borrador más nuevo al recargar.
- Antes de corregir una respuesta, sincroniza también el ID del envío. Otro navegador puede reanudar ese mismo envío con el mecanismo de corrección idempotente existente.
- Una pestaña o navegador antiguo no sobrescribe silenciosamente otro avance. El aviso permite cargar el estado más reciente y conserva un respaldo local del estado descartado. No se combinan automáticamente dos borradores diferentes.
- Las estrellas anteriores se conservan tomando el máximo guardado, sin sumar dos veces acumulados de dispositivos. Se sincronizan como recompensa de interfaz; no se usan para acreditar conocimientos.
- La tabla no modifica calificaciones, perfil pedagógico ni reglas de dominio. La API comprueba cuenta autenticada y propiedad de la actividad referida. Limita el tamaño del estado y valida contadores, estrellas e identificadores.
- Si la tabla todavía no existe, el servidor informa que la función no está disponible y la interfaz sigue usando el guardado local con un rótulo explícito. Un fallo de consulta remota distinto de tabla ausente pide reintentar antes de iniciar otra actividad, para no pisar una misión desconocida.
- No se garantiza completar un guardado remoto al cerrar abruptamente el navegador. La copia local y la operación pendiente permiten reintentar desde esa computadora; para cambiar de dispositivo conviene esperar «Avance sincronizado» o usar «Guardar y salir».

## Activación pendiente

La consulta de estructura de Supabase devolvió `PGRST205` para `continuidad_misiones`, con cero registros leídos. El entorno dispone de la clave de servidor de la aplicación, pero no de conexión PostgreSQL administrativa ni token de administración de Supabase para ejecutar DDL.

1. En el SQL Editor del proyecto Supabase, ejecutar `supabase/migrations/008_continuidad_misiones.sql`. Crea únicamente la tabla de continuidad, activa RLS, revoca acceso directo a roles públicos y concede operaciones al rol de servidor. No altera las tablas ni los registros pedagógicos existentes.
2. Comprobar la estructura y ejecutar `node tests/verify-r8-supabase.cjs`. Esa prueba usa una cuenta sintética y elimina solo sus propios UUID. Verifica creación y actualización concurrentes reales con PostgREST. El script está preparado, pero no fue ejecutado porque falta la tabla.
3. Verificar una recuperación real entre dos navegadores antes de dar la activación por cerrada. La app detecta la tabla al volver a abrir la tutoría; no necesita otro cambio de código para reconocerla.

## Verificación realizada

- `npm test`: 378 casos pasan (353 anteriores y 25 nuevos de R8).
- R8 comprueba aislamiento de cuenta, pertenencia de actividad, versiones, idempotencia, conflictos, estrellas, migración de copia local, pérdida de confirmación, recuperación de borradores más recientes, cambio de pestaña durante una apertura lenta, errores de validación, tabla no disponible y recuperación del ID de envío.
- Compilación de producción correcta. Se regeneró únicamente `.next` después del bloqueo EPERM de OneDrive.
- Edge, PC de 1366 px y móvil de 390 px: siete comprobaciones de recorrido con dos perfiles de navegador aislados, base sintética compartida y controladores reales. Se verificaron respuesta elegida, paso, evaluación, contador, estrellas, salida confirmada, conflicto y fallo recuperable. No hubo errores de JavaScript ni desbordamiento horizontal en el caso móvil probado.
- Se inspeccionaron las capturas y se corrigió el contraste del aviso de conflicto y del estado de guardado.
- Evidencia: carpeta `implementacion-r8` de las visualizaciones de esta tarea.

Las pruebas funcionales utilizan datos sintéticos; no son una verificación completa contra Supabase de producción. La única consulta real fue la existencia de la tabla, sin leer datos de Abril. No se hicieron llamadas nuevas a IA ni se alteró su historial.

## Otros pendientes

- Ampliar contenido revisado al resto del programa; actualmente hay 33 unidades revisadas.
- Implementar simulacros completos con exámenes anteriores y requisitos de preparación.
- Completar rachas y logros, y observar sesiones reales de Abril para ajustar dificultad y duración.
- Añadir evaluación formal de producción escrita si se desea acreditar esos temas; la devolución familiar actual no asigna nota ni aprueba contenidos.
