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
- Navegador Edge: recorrido de las ocho lecciones, control con teclado, pista y reintento, resolución tras dos errores, descarga PDF, cierre y pantalla de 390 px. Sin errores JavaScript ni desbordamiento en las vistas comprobadas. Capturas inspeccionadas.
- Los controladores se ejecutan con datos sintéticos en la prueba de navegador local; esta prueba no llama a IA ni a Supabase reales.

Comandos: npm test; node tests/verify-r13-browser.cjs; node tests/verify-r13-browser-live.cjs. TEST_BASE_URL y TEST_OUTPUT_DIR seleccionan servidor y evidencia. La prueba live usa cuenta técnica temporal y elimina únicamente sus propios datos.

## Pendientes
Ampliar triángulos, polígonos, perímetros y áreas con representaciones y problemas graduados. Comprobar trazados reales en papel requiere otro recorrido. También continúan pendientes las extensiones de medidas detalladas en R12, Lengua y simulacros progresivos. Esta entrega no completa todo el programa de ingreso.

## Publicación
Pendiente de despliegue y verificación de continuidad contra API y base reales.
