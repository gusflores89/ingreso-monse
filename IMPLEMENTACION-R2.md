# R2 — Primer recorrido básico de Matemática

## Qué cambia

Ocho unidades y 24 actividades propias: partes iguales, numerador/denominador, mitad de una colección, equivalencias, múltiplos por saltos, MCM por listas, suma/resta de igual denominador y primeros casos de distinto denominador.

Cada unidad abre explicación y ejemplo antes de la actividad guiada. Luego ofrece dos actividades diferentes para comprobar autonomía. Este bloque se genera y corrige en el servidor con contenido definido, sin llamadas a IA. La elección de opciones cambia de posición. Las claves de comprobación no se incluyen en la respuesta HTTP ni en los archivos públicos de interfaz.

El botón «Aprender fracciones» permite entrar desde la tutoría. En el plan completo, los tres temas básicos ya no requieren aprobar números romanos ni toda una fase. El servidor conduce primero por fracciones, luego múltiplos/MCM y después operaciones iniciales. REPASO permite volver a la explicación del objetivo actual. El modo de prueba mantiene sus límites de temas.

Las evidencias del bloque requieren su versión de contenido; no se atribuye dominio de estas actividades nuevas a sesiones antiguas. Dos fallos consecutivos registrados vuelven a abrir la explicación del objetivo afectado. Se exigen dos actividades distintas resueltas sin asistencia. Esta regla es una decisión inicial del producto, no una garantía de aprendizaje. El aprendizaje de múltiplos tiene su propio identificador y no acredita también divisores.

El porcentaje general de acierto incluye resoluciones correctas con ayuda; la elegibilidad para avanzar conserva el filtro de autonomía. Las estrellas siguen siendo iguales con o sin ayuda.

Una misión pendiente se conserva al cambiar el día. El enlace de entrada se conserva como contexto de restauración cuando el servidor redirige a un requisito anterior. Cambiar explícitamente de tema o pedir un repaso nuevo prevalece sobre la caché. Guardar y salir no navega al inicio si la escritura local falla.

## Material de estudio

Tres PDFs nuevos, ocho páginas en total, con las explicaciones de este bloque. No sustituyen todo el contenido de los tres temas. Diapositivas y apunte muestran el mismo primer bloque. Los PDFs antiguos se conservan en disco; los enlaces de estos temas usan los nuevos apuntes básicos.

- `public/apuntes/bases-fracciones_concepto.pdf`: 4 páginas.
- `public/apuntes/bases-divisibilidad_primos_mcm_mcd.pdf`: 2 páginas.
- `public/apuntes/bases-fracciones_operaciones.pdf`: 2 páginas.

Se separó el material público de las actividades y claves del servidor. El generador de PDFs está en `scripts/generar-apuntes-bases.py`.

## Verificación

- `npm test`: 40 casos aprobados (19 R1, 9 H, 12 R2). Los de R2 ejecutan 24 actividades a través de los controladores reales con base e IA simuladas; verifican el orden, explicaciones previas, actividades diferentes, respuestas, ayudas históricas, desbloqueos y continuidad.
- Compilación de producción local correcta.
- Edge: ocho casos aprobados. Enseñanza antes de pregunta, opciones tocables, recarga con enlace original, PDF descargable, cambio de día, cierre a los tres retos y restauración de celebración, ancho móvil y guardado fallido sin salir.
- Los ocho folios PDF tienen texto y se renderizaron; revisión visual de las fichas de fracción, MCM y denominadores distintos.
- Sin escrituras de prueba en la cuenta de Abril ni consultas nuevas a proveedores de IA.

## Límites y trabajo pendiente

Este es el primer bloque de R2, no el cierre completo del plan. Los demás objetivos de Matemática y Lengua todavía requieren ampliar el contenido revisado. Las dos actividades independientes por unidad son un banco inicial pequeño que necesita más variantes. La duración real y comprensión deben observarse durante el uso.

Quedan la idempotencia atómica de envíos, el historial de cada intento y ayuda, repaso espaciado por tiempo, unificación de todos los requisitos del mapa y del panel, ampliación a fracción de cantidad, multiplicación/división de fracciones, divisores/MCD y otras unidades, cola de revisión familiar, simulacros y rachas.

No hubo migraciones ni eliminación de historia. El bloque anterior está en el commit `ffa9749` y el despliegue `dpl_4ognoteARaqXZPPjhhcRBTUBiz2c`.
