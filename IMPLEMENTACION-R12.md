# R12 — Medidas, conversiones y problemas breves

Fecha: 13 de septiembre de 2026.

## Resultado y alcance
Se añadieron 12 micro-unidades originales y 72 actividades a los temas de longitud y masa/capacidad/tiempo. Antes había cuatro lecciones básicas entre ambos temas; ahora hay 16: siete de longitud y nueve de masa/capacidad/tiempo. El catálogo compartido suma 125 unidades y 750 actividades; Matemática tiene 110 unidades en 26 temas. El módulo independiente de H no se cuenta en estos totales.

La ampliación enseña las escalas de longitud, masa y capacidad; conversiones hacia unidades menores y mayores; medidas decimales; problemas de cinta cortada, masa restante y vasos de bebida; agrupación de minutos en horas; duración entre horarios del mismo día. Las escalas explican que cambia el número de partes y se conserva la cantidad medida. Masa y capacidad se distinguen expresamente y el tiempo usa 60, no 100.

Cada habilidad tiene explicación, ejemplo resuelto en dos pasos, actividad guiada y cinco variantes de práctica. Las resoluciones incluyen conversión, operación posterior y unidad; los vasos y las horas añaden comprobación. Las respuestas se calcularon con aritmética Decimal y se cotejaron con 72 claves independientes.

## Recorrido y antecedentes
Se mantienen los requisitos del motor: explicación completada y dos variantes diferentes correctas sin ayuda antes de consolidar cada habilidad. Las lecciones no acreditan independencia. Pedir ayuda conserva las recompensas y su registro pedagógico.

Los cierres voluntarios de ambos temas usan tres preguntas de habilidades ya practicadas, con dos aciertos necesarios. La revisión del cierre abarca toda la secuencia nueva. Un aprobado anterior se conserva en el historial, sin saltar habilidades nuevas ni bloquear el cierre actualizado. Una evaluación antigua ya abierta puede terminarse conservando su alcance histórico.

No se cambió la versión ni los IDs de las actividades anteriores; no se migró ni se modificó directamente el historial de Abril. Se preservaron los prerrequisitos del mapa.

## Teoría y fuentes
Se actualizaron bases-si_me_la_longitud.pdf (7 páginas) y bases-si_me_la_masa_capacidad_tiempo.pdf (9 páginas) desde las explicaciones públicas que también usa la pantalla, sin claves de práctica. Las 16 páginas se renderizaron e inspeccionaron.

Se consultó el archivo aportado material_estudio_ingreso_matematica.pdf, páginas impresas 79–84: problemas de medidas, escalas, conversiones y tiempo. Redacción, cantidades y actividades son originales de la aplicación. Esta entrega no pretende reproducir ni cubrir todos los problemas de varias etapas del material oficial.

## Verificación
- npm test: 1.676 comprobaciones correctas. Incluye 750 variantes del banco y 89 comprobaciones específicas de R12; controladores reales con datos sintéticos, sin llamadas reales a IA.
- Compilación de producción con Next.js/Turbopack: correcta.
- Cinco regeneraciones R9/R10/R11/R12 en copia temporal conservan exactamente las 125 unidades y sus actividades. La copia se eliminó.
- PDF: inspección de las 16 páginas completas, sin texto cortado.
- Edge local: 19 comprobaciones correctas con datos sintéticos y controladores reales; doce lecciones, pista/reintento, segundo error, ambos cierres, dos descargas y vista de 390 px. Sin errores JavaScript ni desbordamiento en las vistas comprobadas. Capturas inspeccionadas. Los cierres usan títulos comprensibles: Medidas de longitud; Masa, capacidad y tiempo.

Comandos: npm test; node tests/verify-r12-browser.cjs; node tests/verify-r12-browser-live.cjs. La prueba live usa una cuenta técnica propia temporal con API y Supabase reales; requiere credenciales locales y borra sus datos al finalizar. Las variables TEST_BASE_URL y TEST_OUTPUT_DIR permiten elegir servidor y evidencia. La prueba de navegador recorre las doce lecciones, pistas, segundo error, ambos cierres, ambas descargas y pantalla de 390 px.

## Pendientes
Quedan conversiones y operaciones con segundos y días, duraciones que cruzan medianoche, toneladas, estimación, recipientes con resto y problemas de varias etapas más cercanos al examen. Las escalas de esta entrega son explicaciones textuales; no se añadieron manipulativos nuevos. Sigue pendiente ampliar geometría con representaciones y construcciones guiadas, Lengua y simulacros progresivos. El siguiente bloque propuesto es ángulos y construcciones geométricas, con apoyo visual.
