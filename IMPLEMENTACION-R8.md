# R8 — Continuidad de misión entre navegadores

Estado: sincronización activada y verificada en https://www.ingresomonserrat.online el 12/09/2026, después de que Gustavo aplicara la migración 008 en Supabase. Las pruebas reales de base de datos y del recorrido entre dos navegadores pasaron. No fue necesario otro despliegue.

- Commit de implementación: `0497999`.
- Despliegue: `dpl_BFw2AGxPgzHie6U9hjj7D6zQEaJT`, creado a las 17:19 ART, estado Ready.
- URL de versión: https://ingreso-monse-2027-r0sjwub2n-gustavos-projects-b8e409fb.vercel.app
- Los siete recorridos de navegador también pasan sobre los archivos de interfaz publicados, con controladores reales y datos sintéticos. No es una prueba contra la tabla de producción.
- La API real devuelve HTTP 401 sin sesión y `Cache-Control: private, no-store`.
- Los servidores locales de verificación quedaron detenidos.

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

## Activación verificada

La migración `supabase/migrations/008_continuidad_misiones.sql` ya está aplicada. Se verificó mediante operaciones reales sobre cuentas sintéticas; no se consultó ni modificó el historial de Abril.

- `node tests/verify-r8-supabase.cjs`: cuatro comprobaciones reales contra PostgREST. Una sola creación concurrente gana; repetir el mismo envío conserva la revisión; una sola actualización concurrente gana; la lectura devuelve el último estado confirmado. Limpieza de los datos propios confirmada.
- `node tests/verify-r8-browser-live.cjs`: cinco comprobaciones contra la web publicada, con inicio de sesión real, API real y Supabase real, sin interceptar solicitudes. Dos contextos independientes de Edge a 1366 px recuperan la misma pregunta, el paso y la opción elegida. La corrección sincroniza un reto y dos estrellas; volver al primer navegador recupera la evaluación sin una segunda corrección; «Guardar y salir» confirma y vuelve al inicio.
- No hubo errores de JavaScript ni respuestas HTTP de error de la API durante ese recorrido. La corrección registrada utilizó `contenido_revisado`, sin generación nueva de IA.
- Se cerraron ambos navegadores y se eliminó únicamente la cuenta temporal creada por la prueba. Se confirmó la eliminación de sus sesiones, misión, lecciones completadas y progreso.

Las pruebas de producción son explícitas y no forman parte de `npm test`. Requieren las variables de servidor locales y Playwright/Edge; el módulo de Playwright puede configurarse mediante `PLAYWRIGHT_MODULE`. No imprimen contraseñas ni cookies.

Para una tutoría que ya estaba abierta antes de aplicar la migración, recargar la página permite detectar la sincronización. Antes de cambiar de computadora, esperar «Avance sincronizado» o usar «Guardar y salir».

## Verificación realizada

- `npm test`: 378 casos pasan (353 anteriores y 25 nuevos de R8).
- R8 comprueba aislamiento de cuenta, pertenencia de actividad, versiones, idempotencia, conflictos, estrellas, migración de copia local, pérdida de confirmación, recuperación de borradores más recientes, cambio de pestaña durante una apertura lenta, errores de validación, tabla no disponible y recuperación del ID de envío.
- Compilación de producción correcta. Se regeneró únicamente `.next` después del bloqueo EPERM de OneDrive.
- Edge, PC de 1366 px y móvil de 390 px: siete comprobaciones de recorrido con dos perfiles de navegador aislados, base sintética compartida y controladores reales. Se verificaron respuesta elegida, paso, evaluación, contador, estrellas, salida confirmada, conflicto y fallo recuperable. No hubo errores de JavaScript ni desbordamiento horizontal en el caso móvil probado.
- Se inspeccionaron las capturas y se corrigió el contraste del aviso de conflicto y del estado de guardado.
- Evidencia: carpeta `implementacion-r8` de las visualizaciones de esta tarea.

La verificación inicial empleó controladores y base sintéticos. Después de aplicar la migración se añadieron las cuatro comprobaciones reales de Supabase y las cinco comprobaciones del navegador descritas arriba. Estas últimas sí recorren la publicación y su base de producción, siempre con una cuenta temporal propia. No se hicieron llamadas nuevas a IA ni se alteró el historial de Abril.

## Otros pendientes

- Ampliar contenido revisado al resto del programa; actualmente hay 33 unidades revisadas.
- Implementar simulacros completos con exámenes anteriores y requisitos de preparación.
- Completar rachas y logros, y observar sesiones reales de Abril para ajustar dificultad y duración.
- Añadir evaluación formal de producción escrita si se desea acreditar esos temas; la devolución familiar actual no asigna nota ni aprueba contenidos.
