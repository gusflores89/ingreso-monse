# R20 — Selección de evidencia textual

Fecha: 15 de septiembre de 2026.

## Recorrido
Tres habilidades y 18 actividades originales: encontrar una frase que aporta el dato pedido (leng_evi_dato); reconocer qué frase sostiene una causa (leng_evi_causa); elegir una pista que permite una conclusión razonable (leng_evi_inferencia). Se integran después de leng_esc_resumen, con IDs anteriores conservados y sin cambiar VERSION_BASES.

Cada habilidad enseña la estrategia, presenta un ejemplo resuelto y después propone una práctica guiada. El texto permanece visible. Las tres tarjetas de respuesta son citas exactas de ese texto: se distingue cuál es pertinente para la respuesta propuesta. No se pide escribir una explicación larga ni seleccionar palabras con precisión de mouse. Se alterna la posición de la opción correcta y se usan seis contextos por habilidad.

La explicación distingue encontrar algo escrito de justificar una respuesta. En causas evita confundir sucesión temporal con causalidad; en inferencias aclara que una pista no autoriza detalles inventados. Las resoluciones explican la relación entre la cita y la respuesta, y por qué otro detalle no alcanza. Los textos son originales de la app, no consignas oficiales ni fragmentos de los libros de la biblioteca.

## Enseñanza, ayudas y cierre
Se reutiliza la corrección determinista de contenido revisado: no hay llamadas a IA para crear o corregir estas actividades. Antes de cada habilidad se requiere su enseñanza y después dos evidencias de práctica independientes, sin ayuda. Pedir explicación no cuenta como error; reintentar con apoyo conserva la asistencia y la misma recompensa de esfuerzo. No se alteró directamente la cuenta de Abril.

El cierre sigue siendo breve (tres preguntas, dos aciertos para aprobar), y ahora toma también una muestra de evidencia textual. La revisión de secuencia cambia con los nuevos IDs: un cierre histórico no salta la enseñanza nueva y sus resultados se conservan. Los cierres antiguos ya abiertos conservan el alcance con el que se iniciaron. Los mensajes familiares de R19 siguen disponibles.

## Teoría y mantenimiento
Comprensión lectora pasa a 22 habilidades y 132 actividades. El catálogo completo contiene 174 unidades y 1.044 actividades: 1.026 cerradas y 18 de escritura; Matemática mantiene 140 unidades y Lengua tiene 34 (H conserva su módulo separado).

El apunte web y las diapositivas se regeneran con el catálogo común. El PDF de lectura tiene 22 páginas e incluye las explicaciones, textos, ejemplos y pistas de las tres nuevas habilidades. Se verificó el texto extraído y se renderizaron e inspeccionaron las 22 páginas, sin cortes ni superposiciones.

El generador de R18 reconoce ahora el límite de R20 para mantener el orden de inserción. Una regeneración R18 + R20 en una carpeta temporal conservó exactamente todas las unidades y actividades.

## Verificación
- npm test completo: 2863 comprobaciones correctas; sincronización de apuntes verificada.
- 78 comprobaciones específicas de R20: claves esperadas independientes, todas las opciones presentes en el texto, distractores rechazados, posiciones distribuidas, explicación previa, contrato público sin claves, ayuda, reintento, cierre actual e histórico.
- Compilación local Next.js/Turbopack correcta.
- Diez comprobaciones de interfaz local con controladores reales y base simulada: las tres lecciones, texto visible, opciones, error y pista, resolución tras dos errores, cierre, apunte, descarga real y vista de 390 px. Sin errores JavaScript ni desbordamiento en las vistas verificadas.
- Cinco comprobaciones con API y Supabase reales: selección guardada, recuperación en otro navegador, corrección determinista, un reto y dos estrellas sin duplicación, Guardar y salir. Cuenta temporal y registros eliminados; limpieza verificada. Sin usar la cuenta de Abril ni IA.
- Capturas de lección, práctica y resolución inspeccionadas; hojas de contacto del PDF en implementacion-r20.

Comandos: npm test; npm run build; node tests/verify-r20-browser.cjs; node tests/verify-r20-browser-live.cjs. El último crea y elimina una cuenta sintética propia; TEST_BASE_URL elige entorno y TEST_OUTPUT_DIR la carpeta de evidencia.

## Siguiente bloque
Comparar dos textos breves: identificar qué información comparten, en qué se diferencian y qué texto sostiene cada afirmación, siempre con explicación, ejemplo y práctica gradual. Después continúan los párrafos más extensos y simulacros progresivos; pendientes de Matemática documentados en R15.

PDF SHA-256: 5a632e2cb391a469d65857066ad2df9108ebc40d9553dbf3998a92af564241d1
