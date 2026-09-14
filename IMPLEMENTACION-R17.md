# R17 — Idea principal y resumen por etapas

Fecha: 14 de septiembre de 2026.

## Resultado
Se agregan seis micro-unidades y 36 actividades originales. Comprensión lectora suma 16 habilidades y 96 actividades; el catálogo compartido, 168 unidades y 1.008 actividades. Matemática conserva 140 unidades; Lengua tiene 28, además del contenido separado de H.

Secuencia nueva: reconocer el tema; separar detalles prescindibles; elegir un título que abarque la lectura; reformular sin cambiar el sentido; unir las ideas de dos párrafos; revisar la fidelidad de un resumen. Tema y detalles se enseñan antes del objetivo anterior de idea central; las otras cuatro habilidades siguen después.

Los textos y opciones trabajan errores específicos: confundir propósito y resultado, cambiar algunos por todos, invertir la causa, intercambiar participantes, inventar hechos y omitir el desenlace. El último ejercicio de revisión presenta un resumen correcto para que la respuesta no sea siempre buscar un error. Un ejercicio de detalles conserva el color como dato importante y omite la forma de la mesa: no se enseña una regla automática de borrar colores.

Cada objetivo incluye explicación, ejemplo, pista y seis textos distintos. Las resoluciones citan una frase del texto y explican su relación con la respuesta. Para unir ideas se usan dos párrafos breves con problema y solución, sin pasar directamente a una lectura extensa.

## Alcance pedagógico
Se mantiene el panel de lectura para releer, las opciones tocables, ayuda sin pérdida de estrellas, tres retos por misión, explicación antes de evaluar y dos prácticas distintas sin ayuda para consolidar cada objetivo. Los cierres anteriores se conservan, pero no acreditan las habilidades nuevas; el cierre actual sigue siendo voluntario y de tres preguntas.

Este bloque enseña a reconocer y revisar resúmenes mediante opciones. No acredita todavía la capacidad de producir un resumen libre con palabras propias. Esa producción, la selección directa de evidencia, la comparación de textos y los simulacros progresivos siguen pendientes. Los pendientes de Matemática de R15 continúan vigentes. No se modificó directamente la cuenta de Abril ni VERSION_BASES.

## Apunte
La ficha de comprensión lectora pasa a 16 páginas, una por habilidad, con textos, explicaciones y ejemplos completos. La generación de PDF conserva ahora los saltos entre párrafos. Diapositivas y apunte completo usan el catálogo público sincronizado sin claves de las prácticas. Se renderizaron e inspeccionaron las 16 páginas y se verificó su descarga desde la app.

## Verificación local
- npm test: 2.652 comprobaciones correctas, incluidas 94 de R17. Recorre las 28 habilidades de Lengua con controladores reales y datos sintéticos.
- Claves independientes para las 36 actividades; citas presentes en sus textos; separación de los dos párrafos; enseñanza propia antes de resumir; cierres antiguos y actuales; ayuda y progreso.
- Compilación Next.js/Turbopack correcta.
- Edge: 13 comprobaciones correctas: seis lecciones, teoría, descarga, reintento, dos errores, cierre y vistas de 390 px con opciones largas. Sin errores JavaScript ni desbordamiento en las vistas verificadas. Capturas inspeccionadas.
- Diez regeneraciones R9–R17 en copia temporal conservaron las 168 unidades y 1.008 actividades.

Comandos: npm test; node tests/verify-r17-browser.cjs; node tests/verify-r17-browser-live.cjs. TEST_BASE_URL y TEST_OUTPUT_DIR seleccionan servidor y evidencia.

## Próximo bloque propuesto
Construcción guiada de un resumen con palabras propias y devolución sobre qué idea falta o qué afirmación cambia el texto. Comenzar con una frase apoyada en preguntas antes de pedir párrafos completos.

## Publicación
- Commit de implementación: `ed522ae`.
- Vercel: `dpl_Dg74qT4hsnG5AEDH9ApBkdTJL65M`, READY, producción.
- Dominio: https://www.ingresomonserrat.online
- Versión: https://ingreso-monse-2027-jj3fyvl5y-gustavos-projects-b8e409fb.vercel.app
- Las 13 comprobaciones de navegador pasan contra la publicación; sin errores JavaScript en el recorrido verificado.
- El PDF descargado de producción coincide por SHA-256 con el apunte revisado de 16 páginas.
- Cinco comprobaciones adicionales con API y Supabase reales: enseñanza de leng_res_tema, selección sincronizada, mismo ejercicio y texto en otro navegador, corrección con contenido revisado, un reto y dos estrellas sin duplicaciones al recargar, y Guardar y salir.
- Cuenta temporal y sus sesiones, continuidad, lecciones y progreso eliminados; limpieza verificada. No se utilizó la cuenta de Abril.
- Evidencia: implementacion-r17 en el espacio de visualizaciones de esta tarea; capturas, hojas de contacto PDF, navegador-r17.json y produccion/continuidad-real.json.
