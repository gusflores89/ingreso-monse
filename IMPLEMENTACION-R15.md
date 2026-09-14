# R15 — Problemas de medidas y perímetros por etapas

Fecha: 14 de septiembre de 2026.

## Resultado y alcance
Diez micro-unidades originales y 60 actividades nuevas. El catálogo compartido suma 155 unidades y 930 actividades; Matemática, 140 unidades en 26 temas. H se cuenta aparte.

Longitud: elegir datos pertinentes y descartar el precio cuando se pide una longitud; ordenar conversiones, cortes y resta; resolver varios cortes y comprobar la conservación de la cinta. Masa/capacidad: varias porciones, vasos completos cuando la división tiene resto y mililitros sobrantes. Perímetros: plan con unidades mixtas, varias vueltas, compra mínima de rollos enteros y costo según metros de cinta.

Los problemas de vasos distinguen cociente entero y resto; los de compra distinguen división exacta de necesidad de un rollo adicional. Se explicita que el alambre de los rollos se puede unir. Los problemas de costo usan precios ficticios sencillos, no referencias de mercado. Rectángulos y etiquetas representan las mismas medidas que la consigna.

## Recorrido pedagógico
Cada habilidad tiene explicación y ejemplo resuelto antes de la práctica. La selección de datos y de un plan se trabaja en objetivos propios; acertarlos no acredita el objetivo posterior de resolución completa. Se mantiene enseñanza completada y dos variantes diferentes sin ayuda para consolidar cada habilidad. No se sustituyó este requisito por acertar solo el plan.

Se conservan las misiones de tres actividades, recompensas con ayuda y resolución guiada tras el segundo error. El nuevo apoyo visual de datos organiza las cantidades sin añadir claves de respuesta. Los diagramas siguen visibles durante las pistas y la resolución. Las prácticas de planificación usan opciones tocables; todavía no hay un editor libre de planes ni corrección individual de cada cuenta escrita por la alumna.

Los tres cierres afectados siguen siendo voluntarios, breves y con dos de tres aciertos. La revisión del cierre incluye los nuevos objetivos; un aprobado histórico conserva su registro y no salta las nuevas habilidades. No se modificaron directamente la cuenta de Abril, los identificadores anteriores ni VERSION_BASES.

## Teoría
Se actualizaron las fichas de longitud (10 páginas), masa/capacidad/tiempo (12) y perímetros simples (8). Se renderizaron e inspeccionaron sus treinta páginas; las etiquetas finales de rollos y costos se revisaron nuevamente después de igualarlas a las unidades de la consigna. SVG y PDF comparten las primitivas de dibujo.

Las situaciones son originales, siguiendo el tipo de razonamiento de medidas y perímetros del material aportado, ya revisado en R12/R14: conversiones, varias vueltas y compra de rollos. No se afirma que este bloque cubra toda la dificultad del examen oficial.

## Verificación
- npm test: 2.367 comprobaciones correctas, incluidas 158 de R15. Se cotejan 60 claves independientes, cierres anteriores/actuales, requisitos de enseñanza, figuras, cociente/resto y compra mínima de rollos con divisiones exactas y no exactas.
- Tras ajustar etiquetas de dos familias de dibujos se repitió R15: 158 correctas; compilación final Next.js/Turbopack correcta.
- Ocho regeneraciones R9–R15 en copia temporal conservan las 155 unidades y sus actividades. Los bloques anteriores no borran los posteriores.
- Edge local: 20 comprobaciones correctas. Incluye las diez lecciones, tres descargas, pista/reintento, segundo error con resolución, tres cierres y vistas de 390 px con selección de opciones largas. Sin errores JavaScript ni desbordamiento en las vistas verificadas. Capturas inspeccionadas.
- Estas pruebas de controladores y navegador usan datos sintéticos. La verificación live separada usa API y Supabase reales con cuenta temporal propia, que se elimina al finalizar.

Comandos: npm test; node tests/verify-r15.cjs; node tests/verify-r15-browser.cjs; node tests/verify-r15-browser-live.cjs. TEST_BASE_URL y TEST_OUTPUT_DIR eligen servidor y evidencia.

## Pendientes
Falta resolver planes libres con devolución por cada paso, situaciones con otras magnitudes y contextos, duraciones que cruzan medianoche, descuentos, precios decimales, arcos y figuras compuestas más variadas. También siguen pendientes las ampliaciones de geometría y superficie de R14. No se considera completado el programa de ingreso.

Próximo bloque propuesto: comprensión lectora gradual en Lengua, con textos breves, localización de información, inferencias y justificación usando el texto; complementar la lectura que necesitan los problemas matemáticos. Los simulacros progresivos continúan pendientes.

## Publicación
Pendiente de despliegue y verificación real.
