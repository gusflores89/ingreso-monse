# R21 — Primer recorrido de Matemática con objetos

2 de octubre de 2026. Implementa las etapas 1 y 2 del plan pedagógico; la adaptación completa de los 26 temas continúa pendiente según la matriz de auditoría.

## Experiencia

En las actividades de Matemática aparece «Probemos con objetos». La actividad que estaba abierta queda dentro de la misión sincronizada y se puede recuperar con «Volver a mi actividad anterior». No se cambia directamente la cuenta de Abril ni se borra su historial.

Siete habilidades, con tres variantes cada una: cantidades pequeñas, juntar, quitar, grupos iguales, reparto, mitades y cuartos. La primera presentación muestra una acción por toque. Luego la alumna construye la respuesta; en operaciones también representa el resultado en una bandeja aparte. En reparto no basta llenar platos: debe mostrar cuántas fichas recibió cada uno. Las partes de fracción mantienen un entero de tamaño constante, incluyen reconstrucción de dos mitades y comparación visual de dos cuartos con una mitad del mismo tamaño.

El taller permite elegir una habilidad sin prerrequisitos de exámenes. Entrar desde fracciones propone mitades; desde otros temas propone cantidades pequeñas. Elegir otra habilidad es exploración, no una certificación. Dos variantes independientes permiten sugerir la siguiente habilidad; el estado de evidencia se describe como inicial y para volver a comprobar.

Tras dos construcciones incorrectas se vuelve a la demostración, una acción por vez. Al terminarla se puede confirmar la construcción acompañada, cerrar el reto y recibir las mismas dos estrellas. La misión sigue cerrando tras tres actividades.

La lectura en voz alta usa la síntesis del navegador, con controles para iniciar/detener y mensaje alternativo si no está disponible. No graba audio. Leer la consigna no equivale a pedir una pista matemática. También se añadió lectura en las explicaciones y prácticas ordinarias, y los ejemplos se presentan por pasos, con el paso persistido. Los apoyos visuales siguen presentes durante la corrección.

## Datos y límites

El servidor construye y verifica actividades mediante `recorrido-concreto.js` y `/api/sesion/concreta`. La sesión guarda habilidad, variante, construcción, lectura utilizada, ayuda matemática y resultado. Se reutilizan los recibos de respuesta y el control de concurrencia existente. La ruta ordinaria de corrección rechaza estas sesiones para evitar evaluarlas con IA.

Las sesiones del taller tienen tipo `exploracion`, `es_correcta: null` y resultado propio en metadatos. No alteran la maestría curricular, los aprobados ni la elegibilidad para exámenes. El panel familiar muestra construcciones y acompañamiento con nombres legibles, no JSON, y aclara que no acreditan un tema. No se cambió VERSION_BASES, los PDFs ni el catálogo avanzado; no hay migración de esquema.

La reanudación guarda la construcción y el ejercicio anterior dentro de la misma misión sincronizada. La ayuda solicitada se guarda en servidor y no puede borrarse reenviando una bandera falsa. El intento de construcción, no solamente una opción elegida, queda como evidencia; eso tampoco sustituye observación pedagógica real.

## Verificación local

- Suite preexistente completa: R1–R20 y sincronización de apuntes, correcta. Se ejecutó antes del último ajuste de presentación; se repitieron las verificaciones afectadas después.
- R21: 28 casos agrupados, con las 21 variantes, corrección en servidor, rechazo de construcciones inválidas, pertenencia de cuenta, reenvío idempotente, separación entre audio y ayuda, no habilitación de exámenes y presentación familiar.
- Siete recorridos de navegador con controladores reales/base simulada: recarga tras acierto, cierre de tres retos, otra misión, regreso al ejercicio anterior, reparto incompleto guardado, dos errores y resolución acompañada, paso del ejemplo persistido. PC 1366 px y pantalla 390 px sin desbordamiento; capturas inspeccionadas.
- Cinco comprobaciones contra API y Supabase reales desde la compilación local: construcción por teclado sincronizada, recuperación en otro navegador, pérdida de respuesta HTTP con recuperación de un único recibo/dos estrellas, regreso al ejercicio previo y Guardar y salir.
- La cuenta sintética y sus registros fueron eliminados y la limpieza verificada. No se usó la cuenta de Abril ni llamadas a IA.
- Compilación de producción Next.js/Turbopack correcta.

Comandos: `npm test`, `npm run build`, `node tests/verify-r21.cjs`, `node tests/verify-r21-browser.cjs`, `node tests/verify-r21-browser-live.cjs`. La prueba live admite TEST_BASE_URL y TEST_OUTPUT_DIR y crea/elimina su propia cuenta sintética.

Evidencia local: carpeta `implementacion-r21` dentro de `C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/`.

## Pendiente pedagógico

Observar con Abril qué consignas entiende y qué construye sin pistas. Ajustar cantidades y pasos según esa evidencia. No concluir eficacia por compilar o pasar pruebas. Queda la reescritura progresiva del material formal, las tareas físicas/transferencia y el repaso espaciado específico de estas habilidades. No se afirma que las 140 unidades existentes sean ahora adecuadas para su trabajo autónomo.
