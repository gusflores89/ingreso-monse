# R23 — Tablas y agrupamientos antes de las reglas

Continúa la prioridad 2A de PLAN-PRIORIDADES-MATEMATICA.md. No declara terminada la adaptación de los 26 temas ni valida el nivel de Abril.

## Cambios

Doce microlecciones y 72 actividades con claves deterministas: contar por filas, doble, seis como tres y tres, ocho como cuatro y cuatro, siete como cinco y dos, paquetes de diez, nueve como diez menos una fila, saltos iguales, sobrantes, divisor sin sobrantes, primer encuentro positivo (MCM) y mayor tamaño compartido (MCD).

Se incorporan en el curso habitual antes de los procedimientos previos. Se conservan las actividades e identificadores históricos. Los factores primos se abordan después de comprender tanto MCM como MCD por listas. Las variantes nuevas recorren cantidades de menor a mayor; la variante de enseñanza queda separada de las evidencias independientes.

Los diagramas de filas y rectas con saltos son compartidos entre pantalla y PDF. Las filas tachadas se distinguen con una línea además del color. Los gráficos tienen una descripción accesible. Las pistas y resoluciones acompañan las nuevas actividades, que no dependen de generación ni corrección con IA. El acceso al taller elige grupos, quitar, juntar o reparto según la lección.

La prueba completa encontró una dependencia posicional en el recorrido de fracciones: se pasaba a operaciones después de dos unidades de múltiplos. Se reemplazó por el límite del objetivo MCM, de modo que los pasos insertados no permitan saltarse esa explicación. Los cierres de los temas ampliados siguen siendo de tres preguntas; los aprobados anteriores se conservan y no equivalen a completar los nuevos pasos.

## Alcance y límites

Los cuatro PDF afectados incluyen también material posterior; no se proponen como lectura completa de una vez. Las actividades nuevas son guiadas y de opción múltiple: acertarlas por sí solo no demuestra transferencia a problemas abiertos. El taller existente permite construcciones con objetos. Se necesita observar cómo Abril entiende y representa estas ideas.

Quedan pendientes prioridad 2B (equivalencias y operaciones con fracciones), 2C (decimales), 3 y 4. No se modifica directamente el historial ni los datos de Abril.

## Verificación

- R23: 181 comprobaciones sobre claves independientes, opciones sin duplicados y posición variable, selección del controlador, explicación previa, pistas, resoluciones, dibujos dentro de límites, requisitos y cierres de tres preguntas.
- Navegador local: doce recorridos completos y conexión al taller (13 comprobaciones); PC y ancho de 390 px, sin errores de JavaScript ni desbordamiento horizontal.
- API y base reales con cuenta sintética: cuatro lecciones corregidas y guardadas, cuatro PDF descargados con SHA-256 igual al archivo revisado. Limpieza de la cuenta y sus registros comprobada.
- PDF: cuatro documentos, 32 páginas renderizadas, texto y límites revisados; inspección visual de las páginas nuevas y las hojas de contacto. El documento de divisibilidad se volvió a renderizar después de reordenar MCD y factorización.
- Compilación de producción correcta.
- La suite general detectó y permitió corregir el salto prematuro al salir de múltiplos, una opción duplicada al responder cero y una posición predecible en las respuestas sí/no. Resultado final de la suite y publicación se registran a continuación. Evidencia en C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r23.

La suite completa `npm test` (R1–R23 y sincronización de apuntes) terminó con código 0.
