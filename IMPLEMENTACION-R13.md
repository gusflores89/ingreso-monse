# R13 — Ángulos y construcciones con apoyo visual

Fecha: 13 de septiembre de 2026.

## Resultado
Ocho micro-unidades y 48 actividades originales: vértice y lados, transportador desde ambos ceros, trazado de ángulos, perpendicularidad, opuestos por el vértice, bisectriz, construcción con compás y mediatriz. Geometría pasa de dos a diez unidades. El catálogo común tiene 133 unidades y 798 actividades; Matemática, 118 unidades en 26 temas. H sigue siendo un módulo independiente.

Cada habilidad presenta explicación, ejemplo resuelto, práctica guiada y variantes independientes. Se conservan los requisitos de enseñanza y dos evidencias diferentes sin ayuda; los aprobados históricos no sustituyen las habilidades nuevas. La revisión del cierre abarca la secuencia completa. No se modificó directamente la cuenta de Abril ni se cambiaron las versiones o identificadores anteriores.

## Figuras y teoría
Un generador de primitivas geométricas comparte los cálculos entre SVG de la pantalla y PDF. Las preguntas nuevas incluyen figuras, conservadas durante las pistas y la resolución guiada. También aparecen en las diapositivas consultables y en las preguntas del cierre que las requieren.

El transportador explorable se mueve con teclado o control táctil durante la enseñanza; no califica ni acredita destreza de construcción. Las prácticas mantienen la figura fija. Las instrucciones de regla y compás se realizan en papel. La app evalúa las decisiones y los conceptos, pero todavía no comprueba el trazado físico.

El PDF bases-geometria_angulos.pdf tiene diez páginas, renderizadas e inspeccionadas. Se revisó el material_estudio_ingreso_matematica.pdf aportado, páginas 98–102, para delimitar ángulos y construcciones. Los textos y ejercicios son originales y no reproducen errores del material. El generador PDF requiere Python y Node en PATH (o NODE_BINARY) para compartir la geometría.

## Verificación local
- Suite general: 1.840 comprobaciones correctas; 108 específicas de R13, incluidas las 48 claves, figuras, lectura desde ambos ceros y requisitos del cierre.
- Compilación Next.js/Turbopack correcta.
- Seis regeneraciones combinadas R9–R13 en una copia temporal conservan exactamente las 133 unidades y sus actividades.
- Navegador Edge: 15 comprobaciones correctas; recorrido de las ocho lecciones, control con teclado, pista y reintento, resolución tras dos errores, descarga PDF, cierre y pantalla de 390 px. Sin errores JavaScript ni desbordamiento en las vistas comprobadas. Capturas inspeccionadas.
- Los controladores se ejecutan con datos sintéticos en la prueba de navegador local; esta prueba no llama a IA ni a Supabase reales.

Comandos: npm test; node tests/verify-r13-browser.cjs; node tests/verify-r13-browser-live.cjs. TEST_BASE_URL y TEST_OUTPUT_DIR seleccionan servidor y evidencia. La prueba live usa cuenta técnica temporal y elimina únicamente sus propios datos.

## Pendientes
Ampliar triángulos, polígonos, perímetros y áreas con representaciones y problemas graduados. Comprobar trazados reales en papel requiere otro recorrido. También continúan pendientes las extensiones de medidas detalladas en R12, Lengua y simulacros progresivos. Esta entrega no completa todo el programa de ingreso.

## Publicación
- Commit de implementación: `797817e`.
- Vercel: `dpl_WAr3DhRZqReg9Ni19b61pBqRDXpy`, READY, producción.
- Dominio: https://www.ingresomonserrat.online
- Versión: https://ingreso-monse-2027-qvss2tal8-gustavos-projects-b8e409fb.vercel.app
- Las 15 comprobaciones de navegador pasan contra la publicación: incluye figuras en explicación consultable, reintento, resolución, cierre, descarga y vista de 390 px. Sin errores JavaScript.
- PDF publicado idéntico al inspeccionado por SHA-256: E6076A9E9C02660CBF548FFF20B81853642F17B4C2CF4B10A62BA617DFF2A531.
- Cinco comprobaciones adicionales con API y Supabase reales pasan: enseñanza de prof_geo_elementos, guardado de la opción O, recuperación en otro navegador de la misma sesión, corrección con contenido revisado, un reto y dos estrellas sin duplicación al recargar y Guardar y salir.
- Se eliminó y verificó la eliminación de la cuenta técnica temporal y sus sesiones, continuidad, lecciones y progreso. No se utilizó la cuenta de Abril.
- Servidor local de verificación cerrado.
- Evidencia en implementacion-r13 del espacio de visualizaciones de esta tarea: PDF renderizado, capturas, navegador-r13.json y subcarpeta produccion con continuidad-real.json.

