# R7 — Recorrido familiar y devoluciones de escritura

Estado: implementación y verificación local completas; publicación pendiente.

## Problema y resultado

El panel familiar mostraba resultados finales sin el detalle de los intentos y las ayudas. Las producciones escritas con revisión diferida no tenían una bandeja para conversar sobre lo entregado. Ahora se puede consultar el recorrido guardado, ver las respuestas de cada intento y dejar una devolución familiar persistente.

## Cambios

- Nuevo bloque «Recorrido de aprendizaje»: «Entregas para comentar» y «Actividades e intentos». Las consultas están paginadas de a 20 actividades, sin el corte de 80 del resumen general. La bandeja de pendientes consulta directamente ese estado, por lo que incluye entregas antiguas.
- Cada actividad muestra la consigna, el texto entregado y los eventos guardados. Se distinguen aciertos con apoyo, respuestas sin ayuda registrada, solicitudes de enseñanza previa, explicaciones consultadas después de resolver, prácticas guiadas y envíos interrumpidos. Los avisos de contenido no visto no cuentan como errores ni como intentos evaluados.
- Los registros antiguos indican que no conservan el detalle de ayudas; no se inventan evidencias de independencia. Se deduplican eventos por ID.
- Las producciones escritas muestran las instrucciones y criterios conservados en el examen. El texto enviado como JSON se presenta como texto legible. La proyección pública excluye claves de respuesta, datos internos del evaluador y contexto no necesario.
- La familia puede guardar un comentario de hasta 2000 caracteres para conversar con Abril. Sale de la bandeja pendiente y permanece consultable en el historial. Esta devolución no cambia la nota, la maestría ni los aprobados; es acompañamiento cualitativo, no corrección formal con acreditación del tema.
- Al retomar una producción comentada, la alumna puede leer la devolución y ya no recibe un aviso falso de revisión familiar pendiente. Las misiones ya abiertas localmente no se refrescan de forma remota en esta tanda.
- La escritura usa la reserva por revisión de sesión existente para impedir que dos comentarios distintos se sobrescriban. Repetir el mismo envío devuelve el resultado previo sin duplicar la escritura. La pantalla impide el doble clic y conserva el texto si falla el guardado, mientras siga abierta.
- Las revisiones de tareas en papel validan resultado, cantidad de errores y longitud del comentario; preservan el cero. Solo actualizan tareas entregadas, respetan propiedad de cuenta y no sobrescriben una revisión diferente. El mismo envío se puede reintentar sin duplicarlo.
- Un fallo de la consulta de tareas en papel muestra su propio error y no bloquea el panel. Los datos del panel se piden sin generar automáticamente un informe de IA. Alcanzar el límite de llamadas de IA no impide consultar el progreso; ese límite se verifica solo cuando se solicita el informe.
- Las rutas nuevas comprueban sesión y pertenencia de cuenta, usan respuestas sin caché compartida y no requieren una migración de base de datos.

## Verificación

- `npm test`: 353 casos pasan (326 previos y 27 nuevos de R7).
- R7 prueba proyección segura, clasificación pedagógica, datos antiguos, 85 actividades paginadas, pendientes antiguos, autorización, errores, reenvíos, revisiones concurrentes, tareas en papel y consulta del panel sin consumir IA. También verifica que retomar una entrega comentada conserva su estado sin aprobarla.
- Compilación de producción correcta, incluidas las rutas `/api/familia/recorrido` y `/api/familia/devolucion`.
- Edge: 11 comprobaciones pasan en PC a 1366 px y móvil a 390 px. Incluyen guardado fallido y reintento, doble clic, historial, paginación, revisión de papel, devolución visible para la alumna y estados vacío/error. Sin errores de JavaScript; sin desbordamiento horizontal en la vista móvil probada.
- Se inspeccionaron las capturas de escritorio y móvil. La vista seleccionada tiene indicación visual y semántica; el formulario tiene etiqueta y los controles son botones.
- Evidencia y script de navegador en la carpeta `implementacion-r7` de las visualizaciones de esta tarea.

Las pruebas utilizan controladores reales con datos sintéticos. No equivalen a verificar extremo a extremo sobre la base de producción. No se alteró la cuenta de Abril ni se hicieron nuevas llamadas a la IA. La revisión familiar conserva el mecanismo de acceso existente; no incorpora cuentas independientes de docente ni una evaluación formal con rúbrica y nota.

## Pendientes que siguen abiertos

1. Ampliar las unidades y prácticas revisadas al resto del programa de Matemática y Lengua; los repasos programados siguen limitados a las 33 unidades revisadas.
2. Sincronizar misión, borrador y estrellas entre dispositivos. El comentario familiar guardado sí queda en el servidor, pero su borrador no sobrevive a cerrar o cambiar de pantalla.
3. Implementar simulacros completos con los exámenes anteriores y requisitos de preparación verificables.
4. Completar rachas/logros y observar sesiones reales de Abril para ajustar dificultad, duración e intervalos.
5. Si se desea acreditar la producción escrita dentro del mapa, añadir evaluación formal con criterios y resultado, separada de la devolución familiar implementada aquí. Los comentarios por sí solos no aprueban temas.
