# R6 — Repasos breves según el historial

Estado: implementación y verificación local completas; publicación pendiente.

## Problema y resultado

La aplicación no proponía volver a recordar una habilidad después de aprenderla. Ahora ofrece un repaso opcional de un solo reto, a partir del historial guardado de las 33 unidades revisadas de Matemática y Lengua. La propuesta aparece al comenzar una misión sin respuestas o al terminarla. «Ahora no» permite continuar sin perder progreso ni estrellas.

El calendario comienza cuando hay una lección registrada y dos actividades diferentes resueltas sin ayuda, con la versión vigente del contenido. Utiliza fechas de Argentina y consulta el historial paginado, sin el límite de 80 sesiones. Los intentos registrados tienen su fecha de evaluación; un acierto obtenido con apoyo no equivale a recordar de forma independiente.

## Comportamiento

- Primera propuesta a los dos días. Recordar sin ayuda cuando corresponde el repaso amplía el intervalo a 7, 14 y luego 30 días. Repetir varias veces el mismo día no adelanta varias etapas; practicar antes de tiempo no posterga el repaso.
- Un error, el uso de ayuda o «Esto todavía no lo vimos» vuelve a proponer enseñanza al día siguiente. Una lección con práctica guiada prepara un nuevo repaso a los dos días.
- Dejar pasar días mantiene la propuesta disponible, sin descuento de recompensas.
- El repaso toma una variante del banco revisado y usa el corrector existente. Si necesita apoyo, empieza por explicación y ejemplo antes de la práctica.
- Un reto terminado cierra el repaso y entrega dos estrellas tanto con acierto independiente como después de trabajar la resolución guiada. El cierre muestra las estrellas ganadas en ese bloque, no todo el acumulado.
- Recargar conserva actividad, respuesta, intentos y cierre mediante la continuidad local existente. Un reenvío de inicio puede retomar la actividad abierta; el doble clic de la pantalla no crea dos solicitudes.
- Si la consulta de repasos falla, la misión principal sigue disponible. El servidor verifica acceso, pertenencia de la cuenta y plan, y no devuelve las claves de respuestas.

Los intervalos son una configuración inicial del producto, ajustable al observar el uso; no se presentan como una fórmula óptima para todas las alumnas. La recomendación general de distribuir el aprendizaje en el tiempo está recogida en [IES: Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/practiceguide/1).

## Verificación

- `npm test`: 326 casos pasan (los 300 anteriores y 26 nuevos de R6).
- R6 comprueba fechas argentinas, evidencias independientes, ayudas, errores, intervalos, datos antiguos, acceso por plan, propiedad de cuenta, paginación de 1105 registros, respuesta segura, reanudación y fallos de consulta.
- Compilación de producción correcta, con la nueva ruta `/api/sesion/repasos`.
- Edge: diez comprobaciones del recorrido pasan a 1366 px y 390 px, sin errores JavaScript. Incluyen posponer, doble clic, recarga con respuesta y al terminar, nuevo bloque normal, dos errores con resolución, enseñanza previa y estados vacío/error.
- Se inspeccionaron capturas de práctica, cierre y explicación móvil. No hay desbordamiento horizontal en el caso móvil probado.
- Una selección seguía marcada al reintentar: se ajustó el selector de la prueba de navegador para reconocer el símbolo de selección en el nombre accesible del botón. No era una desaparición de opciones en la aplicación.
- Evidencias y script de navegador: carpeta `implementacion-r6` en las visualizaciones de esta tarea.

Las pruebas de navegador utilizan la interfaz compilada y los controladores reales conectados a datos sintéticos. No equivalen a una prueba completa sobre Supabase de producción. No se alteró el historial de Abril ni se realizaron llamadas nuevas a la IA. La implementación no requiere migraciones.

## Alcance y pendientes

El calendario se deriva de las sesiones del servidor, pero la misión, el borrador y las estrellas todavía no se sincronizan entre dispositivos. El cierre de un repaso es de un reto; la misión habitual sigue siendo de tres. La propuesta no aparece en mitad de una actividad con respuesta o pasos ya iniciados.

1. Ampliar enseñanza y prácticas revisadas al resto de Matemática y Lengua. El repaso programado se limita por ahora a las 33 unidades revisadas; no cubre todo el programa de ingreso.
2. Sincronizar misión, borrador y recompensas entre dispositivos.
3. Mostrar intentos, ayudas y entregas pendientes en el panel familiar.
4. Implementar simulacros completos con los exámenes anteriores y requisitos de preparación.
5. Completar rachas/logros y observar sesiones reales de Abril para ajustar contenidos, dificultad e intervalos.
