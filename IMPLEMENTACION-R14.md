# R14 — Triángulos, polígonos, perímetros y primeras áreas

Fecha: 14 de septiembre de 2026.

## Resultado
Doce micro-unidades originales y 72 actividades nuevas. El catálogo común tiene 145 unidades y 870 actividades; Matemática, 130 unidades en 26 temas. El módulo de H se mantiene separado.

Se incorporan lados y vértices opuestos; clasificación de triángulos por ángulos; condición para cerrar tres lados; nombres de polígonos; diagonales desde un vértice; perímetro triangular y regular; contorno en L; unidad cuadrada; área de rectángulos y cuadrados; mitad de un rectángulo; descomposición de superficies en L.

Las áreas se presentan como apoyo adicional dentro de perimetros_compuestos, cuyo título visible de cierre es «Figuras compuestas y primeras áreas». No se creó un nuevo requisito del mapa ni se cambió la versión de contenido anterior. Las áreas comienzan contando cuadrados, luego multiplicando filas, después tomando mitades y sumando partes.

## Enseñar antes de evaluar
Cada habilidad conserva explicación, ejemplo resuelto, práctica guiada y variantes independientes. El motor exige explicación completada y dos evidencias diferentes sin ayuda. Los cierres voluntarios tienen tres preguntas y requieren dos aciertos; los aprobados históricos no sustituyen las habilidades nuevas. Las respuestas correctas no se envían en la consigna del cierre. No se modificó directamente el historial de Abril.

## Apoyo visual y material
Las veinte explicaciones de los cuatro temas tienen figuras. Se añadieron dibujos a las ocho lecciones anteriores sin cambiar sus respuestas o identificadores. Las 72 actividades nuevas llevan su figura específica; las actividades anteriores conservan sus consignas textuales. El generador geométrico usa dimensiones reales para triángulos, retículas, rectángulos y contornos. SVG y PDF comparten primitivas. Las figuras nuevas permanecen visibles durante pistas y resolución.

Cuatro fichas revisadas: geometria_triangulos (5 páginas), geometria_cuadrilateros_circunferencia (4), perimetros_simples (4), perimetros_compuestos (7). Las veinte páginas se renderizaron e inspeccionaron después de los últimos cambios.

Fuente de alcance: material_estudio_ingreso_matematica.pdf aportado, páginas PDF 104–117 (numeración impresa 103–116), para figuras y perímetros. El texto y los ejemplos de la app son originales. El cuadernillo consultado prioriza perímetros; las primeras áreas son una ampliación pedagógica solicitada, no una afirmación de temario oficial.

## Verificación
- Suite general: 2.131 comprobaciones correctas; al añadir las figuras de las ocho lecciones anteriores se repitieron las pruebas específicas R14, ahora 215 correctas (ocho adicionales). Incluyen 72 claves independientes, revisión de cuatro cierres, continuidad de cierres anteriores, coordenadas finitas, área por fórmula de vértices y perímetro por distancia entre puntos.
- Compilación final Next.js/Turbopack correcta.
- Siete regeneraciones R9–R14 en copia temporal conservan exactamente las 145 unidades, actividades y dibujos, incluso al regenerar bloques anteriores después de R14.
- Edge local: 31 comprobaciones correctas. Recorre las veinte explicaciones y prácticas, cuatro diapositivas/descargas, pista y reintento, segundo error con figura, cuatro cierres y pantalla de 390 px. Sin errores JavaScript ni desbordamiento en las vistas comprobadas. Capturas inspeccionadas.
- Los controladores de estas pruebas usan datos sintéticos. La verificación live separada usa API y Supabase reales con cuenta temporal propia y limpieza posterior.

Comandos: npm test; node tests/verify-r14.cjs; node tests/verify-r14-browser.cjs; node tests/verify-r14-browser-live.cjs. TEST_BASE_URL y TEST_OUTPUT_DIR seleccionan servidor y evidencia. PDF: scripts/generar-apuntes-bases.py requiere Python y Node en PATH.

## Pendientes
La clasificación completa de cuadriláteros y sus construcciones requiere más práctica visual. Faltan problemas con arcos/semicircunferencias, conversiones de superficie, alturas externas y áreas de triángulos no rectángulos, figuras compuestas más variadas y situaciones de varias etapas. Estos contenidos no se presentan como ya cubiertos por las 72 actividades. Continúan pendientes las extensiones de medidas documentadas en R12, Lengua y simulacros progresivos. Próximo bloque propuesto: problemas de medidas y perímetros con varias etapas, graduando lectura, selección de datos, conversión y operación.

## Publicación
Pendiente de despliegue y verificación real.
