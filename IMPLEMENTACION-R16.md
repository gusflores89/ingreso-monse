# R16 — Comprensión lectora con textos y evidencia

Fecha: 14 de septiembre de 2026.

## Resultado
Se suman siete micro-unidades y 42 actividades originales de Lengua. Comprensión lectora pasa de tres a diez habilidades (60 actividades). El catálogo compartido tiene 162 unidades y 972 actividades: 140 unidades de Matemática y 22 de Lengua; H se cuenta aparte.

Secuencia: localizar información literal; elegir datos entre otros parecidos; reconstruir el orden de los hechos; reconocer referencias como ella, lo y allí; deducir vocabulario por contexto; distinguir causas, finalidades y consecuencias; inferir; justificar una inferencia con evidencia; reconocer datos ausentes; encontrar la idea central.

Cada habilidad incluye explicación y ejemplo antes de practicar. Las seis variantes por habilidad cambian de texto; las respuestas revisadas incluyen una cita exacta y una explicación de por qué sirve. Las inferencias se presentan como conclusiones probables. Las preguntas de información ausente alternan con datos explícitos para evitar que baste elegir siempre «no se sabe».

## Interfaz y continuidad
Un panel de lectura permite releer el pasaje en enseñanza, práctica, pistas, resolución guiada y cierre. También se separó el texto de las preguntas de las tres unidades anteriores. No se modificaron sus IDs ni sus respuestas. El panel usa texto HTML seleccionable, con contraste y ancho de lectura limitado.

Se mantienen opciones tocables, tres retos por misión, ayuda sin pérdida de estrellas y dos variantes independientes sin asistencia para consolidar cada objetivo. Reconocer una opción sigue siendo el formato de práctica de este bloque; todavía no hay selección de frases ni producción escrita libre evaluada por una rúbrica.

El cierre de este tema conserva tres preguntas, dos aciertos para aprobar y elección voluntaria. Su revisión incluye todas las habilidades nuevas: aprobar un cierre anterior no permite omitirlas. Los registros anteriores se conservan y una actividad antigua abierta puede terminarse con su versión original. No se modificó directamente el historial de Abril ni VERSION_BASES.

## Apuntes
La ficha de comprensión lectora tiene diez páginas, una por habilidad. Cada página incluye el pasaje al que se refiere la explicación y el ejemplo. Diapositivas y apunte completo usan el mismo contenido público, sin claves de las prácticas. Se renderizaron e inspeccionaron las diez páginas y se verificó la descarga desde la interfaz.

Los textos son originales. Este bloque construye bases de lectura; no representa toda la complejidad ni extensión de los exámenes de ingreso.

## Verificación local
- npm test: 2.516 comprobaciones correctas, incluidas 100 específicas de R16 y el recorrido de las 22 habilidades de Lengua a través de controladores reales con datos sintéticos.
- Se cotejaron 42 respuestas esperadas, las citas dentro de sus textos, los requisitos de explicación y la transición entre cierres anteriores y actuales.
- Compilación de producción Next.js/Turbopack correcta.
- Edge: 17 comprobaciones correctas. Diez lecciones y prácticas; diapositivas y apunte; descarga; error/pista/acierto; segundo error y evidencia; cierre; vistas de 390 px. Sin errores JavaScript ni desbordamientos en las vistas verificadas. Capturas inspeccionadas.
- Nueve regeneraciones en copia temporal conservaron las 162 unidades y sus 972 actividades. Los generadores R9–R15 respetan el bloque nuevo.

Comandos: npm test; node tests/verify-r16-browser.cjs; node tests/verify-r16-browser-live.cjs. TEST_BASE_URL y TEST_OUTPUT_DIR seleccionan servidor y evidencia. La prueba live crea una cuenta propia, usa API y Supabase reales y elimina sus datos al finalizar.

## Pendientes
Respuestas con palabras propias y selección directa de evidencia; textos de varios párrafos con dificultad gradual; comparación de textos; distinción entre idea central y detalles en pasajes más largos; simulacros progresivos. Continúan los pendientes de Matemática documentados en R15.

Siguiente bloque propuesto: idea principal y resumen por etapas, para avanzar desde elegir un dato hacia comprender el texto completo sin aumentar de golpe su extensión.

## Publicación
- Commit de implementación: `c66f0e1`.
- Vercel: `dpl_2udfDy9BRGCEwDotUfUYr8PCn5KW`, READY, producción.
- Dominio: https://www.ingresomonserrat.online
- Versión: https://ingreso-monse-2027-81systg7l-gustavos-projects-b8e409fb.vercel.app
- Las 17 comprobaciones de navegador pasan contra la publicación, sin errores JavaScript en el recorrido verificado.
- El PDF descargado desde producción coincide por SHA-256 con el archivo revisado de diez páginas.
- Cinco comprobaciones adicionales con API y Supabase reales: enseñanza de leng_prof_precision, selección sincronizada, recuperación del mismo ejercicio y texto en otro navegador, corrección con contenido revisado, un reto y dos estrellas sin duplicación al recargar, y Guardar y salir.
- Cuenta temporal y sus sesiones, continuidad, lecciones y progreso eliminados; limpieza verificada. No se utilizó la cuenta de Abril.
- Evidencia: implementacion-r16 en el espacio de visualizaciones de esta tarea; hojas de contacto PDF, capturas, navegador-r16.json y produccion/continuidad-real.json.
