# R27 · Biblioteca, enseñanza revisada y continuidad visual

Implementación: 7–8 de octubre de 2026. Proyecto `ingreso-monse-2027`.

## Resultado concreto

La biblioteca permite encontrar lo que antes quedaba oculto: radio, perímetro, operaciones con fracciones y las demás microlecciones. Cada módulo ofrece su ficha breve de entrada, un índice de explicaciones y el PDF completo. La lectura obligatoria mantiene cuatro pasos breves por módulo; no exige leer el apunte entero antes de practicar.

| Comprobación | Antes de R27 | R27 |
|---|---:|---:|
| Módulos del catálogo | 40 | 40 |
| Unidades matemáticas revisadas | 178 | 214 |
| Unidades del banco base de Lengua | 34 | 112 |
| Unidades matemáticas sin apoyo visual propio | 87 | 0 |
| Módulos de Lengua sin apunte completo fijo | 10 | 0 |
| Apuntes completos del banco base | 29 | 40 |
| Preguntas seleccionadas para los cierres | 84, reutilizadas de la práctica | 120, reservadas fuera de la práctica |

La explicación independiente anterior de H no formaba parte del banco base ni del conteo inicial de 34 unidades; sus seis objetivos se conservan y ahora tienen práctica fija. Se mantienen también los PDF anteriores que pudieran estar enlazados desde sesiones guardadas.

## Relación con los hallazgos de auditoría

- **H1, biblioteca fragmentada:** índice común, nombres curriculares, búsqueda sin distinción de tildes, lector por microlección y enlace a su página en el PDF. La consulta no registra logros.
- **H2, discontinuidad visual:** se agregaron apoyos propios a las explicaciones sin ellos. Decimales muestra recipientes con cantidades proporcionales, comparaciones con la misma unidad, suma/resta y reparto, además de valor posicional. Suma, resta y reparto muestran barras de diez y fichas; el canje decimal abre un entero en centésimos. Estos apoyos acompañan también sus 24 actividades. Otros módulos usan rectas, arreglos, mapas de operaciones y diagramas geométricos. Algunos apoyos siguen siendo mapas de relaciones, no escenas manipulables.
- **H3, falta de repaso de Lengua:** los 14 módulos tienen ahora explicación, ejemplos, pasos, práctica fija y apunte consultable. Incluye gramática descompuesta, modelos ortográficos, tiempos simples/compuestos, conectores y taller de narración.
- **H4, currículo declarado versus efectivo:** se agregaron 36 microlecciones matemáticas y 78 de Lengua. Todas se incorporan a los objetivos efectivos, no solo a un catálogo auxiliar. Esto amplía cobertura; no certifica exhaustividad del cuadernillo ni transferencia a todos los exámenes.
- **H5, cierres memorizables:** banco reservado con otros datos/contextos; revisión del cierre vinculada a la secuencia actual. Los aprobados históricos se conservan. El cierre de tres preguntas sigue siendo una muestra breve, no una medición completa de dominio.
- **H6, preguntas generadas fuera de lo enseñado:** los 40 módulos curriculares disponen de secuencias fijas y prácticas revisadas; no necesitan generar la pregunta inicial del objetivo. No se afirma que toda interacción posible con IA tenga una validación semántica automática. La evaluación abierta de escritura sigue usando IA y admite revisión pendiente.
- **H7, escritura:** planificación, borrador y revisión con rúbricas propias. El taller creativo admite detalles y finales originales compatibles con la situación, sin exigir copiar un modelo. La tarea manuscrita de formato examen usa 12–15 renglones, conforme a las muestras aportadas.
- **H8, leer no equivale a entender:** estado por habilidad basado en explicación y evidencias independientes; consultar material no concede dominio. Se mantienen pistas, ayuda sin castigo, micromisiones y restauración. No se midió el tiempo real de Abril ni su comprensión en esta entrega.

## Validación reproducible

- `npm test`: regresión R1–R25 y pruebas R27 aprobadas. R27 comprueba 40 módulos, 326 unidades, opciones/corrección, apoyos y preguntas reservadas. Las pruebas verifican comportamiento y contratos; no sustituyen la revisión pedagógica.
- `node tests/verify-matematica-r27.cjs`: 1.192 comprobaciones de las 36 ampliaciones, aritmética y geometría.
- `node tests/verify-lengua-r27-puentes.cjs`: orden, modelos y respuestas de las 15 ampliaciones de Lengua y 10 unidades adicionales de ortografía, lectura y escritura.
- `node tests/verify-r27-browser.cjs`: 54 explicaciones en PC y móvil, búsqueda, enlaces, ausencia de desbordes y manejo de fallo al consultar progreso. API simulada con los manejadores reales.
- `node tests/verify-r25-live.cjs`: recorrido con API y Supabase reales, cuenta sintética eliminada al terminar. Lectura obligatoria, pausa, recarga, ayuda sin nota, control de acceso y comparación SHA-256 de las 40 introducciones y los 40 apuntes completos. Sin llamadas a IA y sin usar la cuenta de Abril.
- `python scripts/verificar-pdf-r27.py`: 40 documentos y 326 páginas renderizadas; página por unidad, títulos y texto presentes, caracteres dentro de límites. Inspección visual adicional de muestras de decimales, geometría, gramática y lector móvil. No se afirma inspección humana detallada de las 326 páginas.
- `npm run build`: compilación de producción aprobada. La última ejecución local usó `NEXT_BUILD_DIR=.next-r27` para evitar una caché de OneDrive bloqueada; la salida normal de Vercel sigue siendo `.next`.

Evidencia local: `C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r27`. El manifiesto público `public/apuntes/manifest-r27.json` enumera páginas y huellas de los 40 PDF completos.

## Publicación

Pendiente de registrar el despliegue validado y las comprobaciones del dominio público.

## Alcance pedagógico pendiente de demostrar

No basta con completar 326 microlecciones para afirmar preparación para el ingreso. Continúan siendo necesarios la retirada gradual de ayudas, problemas que combinen habilidades, lectura de textos más extensos, procedimientos escritos y construcciones reales con regla/compás. Elegir un plan correcto no demuestra haber dibujado la figura. La biblioteca incluye esa distinción en la construcción del triángulo.

La adecuación a Abril se comprobará observando si puede explicar o resolver un caso nuevo sin adivinar, comenzando por cantidades, reparto y fracciones concretas. Se incorporaron modelos de uno, dos y tres párrafos, imágenes sensoriales y punto y coma, además de división por fracciones no unitarias, igualdades con una fracción desconocida, receta con conversión y sobrante, y perímetro de patios unidos. Son puentes enseñados, no una certificación de transferencia a cualquier problema oficial. Esta entrega no diagnostica dificultades de aprendizaje ni supone que más material, por sí solo, aumentará su interés.

Los audios se conservaron, según la instrucción del usuario.
