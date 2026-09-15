# R19 — Revisión familiar de escritos y mensajes recuperables

Fecha: 14 de septiembre de 2026.

## Resultado
El panel familiar permite comentar las actividades de escritura guiada de R18, tanto prácticas como lecciones, sin calificar o con una evaluación del tutor que la familia quiera conversar. La pestaña «Escritos y resúmenes» muestra el texto original, la consigna, el escrito guardado, los aspectos de comprensión y la devolución de cada intento. «Entregas para comentar» conserva el filtro de pendientes. Los exámenes escritos anteriores siguen funcionando.

Abril puede abrir «Mensajes de tu familia» desde la tutoría y recuperar las orientaciones, la consigna, el texto que leyó y la respuesta exacta sobre la que se comentó. El panel se abre por elección, se puede cerrar y no interrumpe la actividad ni suma retos o estrellas. Lee del servidor, por lo que los mensajes están disponibles tras recargar, otro día o desde otro navegador autenticado. La lista está paginada; no depende de las últimas 80 sesiones. Los mensajes antiguos que no conservaron el escrito se identifican explícitamente.

## Integridad y límites
La devolución guarda una copia del escrito y su contexto. Una huella SHA-256 identifica respuesta, resultado, actividad y eventos de envío. El cliente devuelve esa huella al comentar escritura; una versión obsoleta obtiene 409. No se comenta mientras haya una respuesta guardándose o una evaluación parcialmente pendiente. El CAS existente evita sobrescrituras simultáneas: dos orientaciones distintas sobre la misma versión no se pisan y un reintento idéntico no duplica datos. Si se comenta una respuesta posterior, se conserva también la orientación anterior con su escrito original.

La orientación no modifica es_correcta, las evidencias de dominio, los exámenes aprobados ni los eventos del tutor. Comentar una entrega sin calificar resuelve su pendiente familiar, pero no la convierte en acierto. Este bloque permite conversar correcciones discutibles; no introduce una herramienta para recalificarlas ni un nuevo intento automático. Se mantiene una orientación por versión; no se habilitó edición de un comentario ya confirmado.

GET y POST requieren autenticación y pertenencia de la cuenta, con Cache-Control private, no-store. La proyección pública selecciona texto y descripciones de criterios, sin claves de respuestas, pasos resueltos, credenciales ni metadatos internos del modelo. Se reutiliza el acceso familiar/alumna existente: ambos comparten la cuenta; no se incorporó un rol parental separado. No hay correos, notificaciones automáticas ni consumo de IA para leer o guardar mensajes. No se requiere migración de base de datos.

## Validación
- npm test completo: 2.764 comprobaciones correctas, incluidas 26 específicas de R19; se mantiene la verificación de sincronización de apuntes.
- R19 prueba producción y lección con true, false y null, notas intactas, idempotencia, doble envío, cambios de borrador, historial de dos versiones, bloqueo durante evaluación, acceso anónimo y ajeno, errores de lectura y paginación de más de 80 escritos/mensajes.
- npm run build correcto con Next.js/Turbopack; git diff --check sin problemas.
- Edge local: ocho comprobaciones con API y Supabase reales. Escrito sintético pendiente y otro incorrecto, comentario desde la interfaz, recuperación en otro navegador y tras recarga, misión intacta, rechazo HTTP de acceso ajeno y versión obsoleta, PC y 390 px. Sin errores JavaScript ni desbordamiento en las vistas inspeccionadas.
- Solo los estados de error y lista vacía del buzón se simulan en el navegador; el reintento recupera los mensajes reales. No se llama al tutor IA en esta prueba.
- Cuenta sintética y registros asociados eliminados; limpieza verificada. No se usó la cuenta de Abril.
- Capturas revisadas en implementacion-r19: familia-escrito.jpg, familia-movil.jpg, alumna-mensajes-pc.jpg y alumna-mensajes-movil.jpg. Informe navegador-real-r19.json.

Comandos: npm test; npm run build; node tests/verify-r19-browser-live.cjs. El último crea y elimina una cuenta de prueba propia; TEST_BASE_URL y TEST_OUTPUT_DIR seleccionan entorno y evidencia.

## Siguiente bloque
Selección de evidencia textual: enseñar a encontrar y señalar qué frase sostiene una respuesta, con explicación, ejemplo y práctica breve antes de comparar dos textos. Continúan después los párrafos más extensos y los simulacros progresivos; pendientes de Matemática en R15.
