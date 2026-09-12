# R3 — Continuidad y ampliación de las bases de Matemática

## Entrega

El bloque pasa de 8 unidades y 24 actividades a 18 unidades y 108 actividades: una guiada y cinco variantes independientes por unidad. Se incorporan fracción de cantidad, multiplicación y división de fracciones, divisores, cuatro criterios de divisibilidad separados (2, 3, 5 y 10), primos/compuestos y MCD.

Cada unidad ofrece explicación y ejemplo antes de practicar. Las nuevas actividades tienen consignas, opciones, pista y resolución definidas en el servidor. No requieren generación ni corrección de IA. Las operaciones se comprueban además con cálculos independientes en las pruebas. Las opciones evitan ofrecer dos respuestas matemáticamente equivalentes y la posición correcta varía.

Se conserva la versión y las claves de las 24 actividades anteriores para no romper sesiones guardadas. Las nuevas variantes se añaden con IDs estables. La selección prioriza actividades todavía no presentadas y, una vez agotadas, la menos reciente. No basta con contar filas: los registros duplicados o salteados no deben provocar repeticiones prematuras.

## Continuidad

El recorrido normal sigue: concepto de fracción → múltiplos/MCM → operaciones con fracciones → divisores, criterios, primos y MCD. Antes, una vez alcanzado el MCM, la redirección permanecía siempre en operaciones.

Los cuatro criterios tienen objetivos separados: acertar sobre divisibilidad por 2 no acredita los criterios de 3, 5 o 10. Cada uno exige explicación y dos actividades distintas correctas sin ayuda. REPASO conserva el tema elegido. No se cambiaron las restricciones del plan de prueba.

Este bloque enseña habilidades iniciales; no significa que dos respuestas correctas prueben comprensión duradera ni que se haya cubierto toda la exigencia del examen de ingreso. Simplificación sistemática, problemas combinados y transferencia a situaciones nuevas requieren ampliaciones posteriores.

## Apuntes

Los PDFs de las tres áreas ahora suman 18 páginas: concepto de fracción (4), divisibilidad (9), operaciones (5). Cada unidad contiene explicación, ejemplo, procedimiento y recordatorio.

`npm run apuntes:sync` genera el material público desde una lista explícita de campos del contenido revisado. No copia actividades ni claves. `npm test` comprueba que el material público coincide. El generador PDF resuelve la carpeta del proyecto desde su propia ubicación.

## Verificación local

- `npm test`: 162 casos informados (19 R1 + 9 H + 22 recorrido + 112 ampliación). Recorrido de 54 actividades en secuencia; 108 variantes comprobadas, incluidos error, pista, reintento y «no lo vimos». Base e IA simuladas con los controladores reales.
- Cálculos independientes para suma, resta, producto y división de fracciones, fracción de cantidad, divisores, criterios, MCM y MCD; detección de opciones equivalentes.
- Compilación de producción correcta. Las claves y los IDs de variantes independientes comprobados no aparecen en los archivos públicos de JavaScript.
- Edge: diez recorridos nuevos (explicación → ejemplo → guiada → práctica), sin errores de ejecución ni desbordamiento a 390 px. Ocho casos de continuidad R2 también aprobados.
- Los 18 folios PDF tienen texto, fueron renderizados y se revisaron visualmente las nuevas fichas de operaciones y MCD.
- No se usó ni modificó la cuenta real de Abril, ni se hicieron llamadas nuevas a IA externa.

## Pendientes que siguen abiertos

Historial durable de cada intento y ayuda; idempotencia atómica y concurrencia en envíos; repaso espaciado por tiempo; contenido revisado del resto de Matemática y Lengua; requisitos comunes para mapa y panel; cola familiar de revisión; simulacros y rachas. Esta entrega avanza el contenido y la continuidad; no cierra toda la auditoría.

No hay migraciones ni borrado de historia. Referencia anterior: código R2 `b1361e7`, documentación `372e073`, despliegue `dpl_6vQMzLQebdUgrMwuGV6ET2wuPHKc`.

Evidencias locales: `C:\Users\gusta\.codex\visualizations\2026\09\09\01a086d6-a934-77a3-9a28-75f27a213064\implementacion-r3`.
