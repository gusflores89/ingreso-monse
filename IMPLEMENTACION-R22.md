# R22 — Bases dentro del recorrido habitual

2 de octubre de 2026. Continúa R21 y ejecuta la prioridad 1 del plan `PLAN-PRIORIDADES-MATEMATICA.md`. Las prioridades 2–4 permanecen pendientes; la adaptación del currículo completo no se declara terminada.

## Cambios

Once microlecciones y 66 actividades antes de los saltos detectados: contar, conservar cantidad, juntar, quitar, formar diez, cambiar diez sueltas por un paquete, abrir un paquete para quitar, grupos iguales, reparto uno por uno, contar todas las partes del entero y contar solo las pintadas. El concepto de denominador y el de numerador se presentan por separado antes de escribir una fracción completa.

Se conservan los IDs, preguntas y claves anteriores. La explicación de `mat_div_repartir` ahora modela el reparto y no requiere recordar una multiplicación. Las lecciones nuevas se integran en los objetivos normales, con explicación previa, ayuda y práctica. El botón «Probemos con objetos» abre la habilidad relacionada con esa lección, preservando el ejercicio para volver.

Las colecciones de fichas usan un mismo generador de diagramas para pantalla y PDF. Se actualizaron los apuntes web, diapositivas y cuatro PDF: naturales (12 páginas), tablas 2–5 (4), división (4) y concepto de fracción (13). El resto del contenido avanzado permanece en esos apuntes como material posterior; no todo el PDF se presenta como lectura adecuada para Abril de una sola vez.

Los cierres de los temas ampliados tienen tres preguntas y una revisión de secuencia. Los aprobados históricos quedan guardados y las nuevas actividades pendientes no se confunden con esos aprobados. En el taller, un error reciente elimina la vigencia de las evidencias previas para sugerir avance; el historial no se borra. Una respuesta acompañada posterior tampoco restaura por sí sola los aciertos independientes antiguos.

Se corrigió el contraste del acceso al taller y se ajustó la altura de los dibujos al número de colecciones, evitando grandes zonas vacías en pantalla.

## Comprobaciones

- Suite completa R1–R22 y sincronización de apuntes correctas. Tras el ajuste final del registro de apoyo se repitieron R21 y R22.
- R22: 155 comprobaciones agrupadas sobre claves calculadas aparte, orden de las lecciones, selección real del controlador, respuesta pública sin claves, dibujos dentro de sus límites, prerequisitos nuevos, cierres breves y revisión del taller tras un error.
- Navegador: once recorridos completos de explicación, ejemplo, práctica y error con dibujo visible; conexión desde reparto al taller y regreso; ancho de 390 px y PC. API/controladores reales con base simulada.
- Cuatro PDF regenerados: 33 páginas renderizadas; texto y límites verificados; hojas de contacto inspeccionadas.
- Compilación de producción verificada. No se alteró directamente la cuenta de Abril ni se usó IA para generar o corregir estas actividades.

Evidencia: `C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r22`.

## Qué sigue

Prioridad 2A: tablas mediante arreglos y dobles; múltiplos por saltos; divisores mediante agrupamientos. En paralelo, observar cómo Abril usa estos pasos iniciales para ajustar cantidades, apoyos y carga de lectura. Las pruebas técnicas no certifican comprensión ni ausencia de frustración.

## Publicación y verificación final

- Implementación: commit `04a77b3`.
- Vercel: `dpl_996TRsGWCpWutJi5nPmXKHSuBbv2`, estado READY, producción.
- Dominio: https://www.ingresomonserrat.online
- Versión: https://ingreso-monse-2027-5nkkga2tj-gustavos-projects-b8e409fb.vercel.app
- Sobre el dominio publicado: doce verificaciones del frontend (controladores locales y base simulada) sin errores de JavaScript; por separado, ocho comprobaciones de API/base reales y PDF: cuatro lecciones con corrección persistida y cuatro descargas con SHA-256 igual al archivo revisado.
- La cuenta sintética y sus sesiones, continuidad, lecciones y progreso se eliminaron; limpieza comprobada. La cuenta de Abril no se modificó directamente.
- Evidencia final en `implementacion-r22/produccion/browser-results.json` y `implementacion-r22/produccion/api-real-r22.json`.

Durante la preparación de la prueba real se corrigieron dos problemas del propio script: faltaba un campo obligatorio en los datos sintéticos y la cookie Secure de `next start` no viajaba por HTTP local. La adaptación de cookies se limita al servidor loopback; la prueba de producción usa las cookies originales sobre HTTPS.
