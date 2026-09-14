# R18 — Escritura guiada con devolución semántica

Fecha: 14 de septiembre de 2026.

## Resultado
Tres habilidades nuevas y 18 textos originales: escribir quién hizo qué en una frase; unir problema y solución; redactar un resumen breve de dos párrafos. Se integran después del bloque R17. Comprensión lectora tiene 19 habilidades y 114 actividades; el catálogo compartido, 171 unidades y 1.026 actividades (1.008 de opciones y 18 abiertas). Matemática conserva 140 unidades; Lengua tiene 31, con H contabilizada aparte.

El texto queda disponible para releer. Cada habilidad incluye explicación, ejemplo presentado como una posibilidad y práctica escrita. La alumna redacta en un campo de texto, conserva su borrador al pedir explicación o reintentar y puede ver lo que escribió junto a la devolución. La interfaz limita el borrador a los 2.000 caracteres admitidos por guardado y API.

## Corrección
Las actividades abiertas dejan de pasar por la igualdad de cadenas. El servidor obtiene el texto y los criterios de la actividad revisada, llama al tutor con temperatura cero y valida su respuesta estructurada. No se envían datos del perfil infantil al modelo en esta evaluación: solo texto de lectura, consigna, criterios y respuesta.

Los criterios revisan las ideas requeridas y la fidelidad al texto. Se instruye a aceptar sinónimos, sujetos implícitos comprensibles y errores ortográficos que no cambien el sentido. Una negación, una causa invertida o confundir intención con resultado sí puede requerir revisión. La devolución presenta un próximo paso concreto; después del segundo error se muestra un modelo posible y su explicación.

Para acreditar una idea se exige una cita presente en la respuesta. Los IDs de los criterios deben coincidir exactamente, sin omisiones ni duplicados. Una contradicción declarada también requiere cita; una omisión puede no tenerla. Se conservan criterios y fidelidad en los metadatos de evaluación.

Si el modelo declara incertidumbre, entrega datos inválidos, cita algo inexistente o falla la llamada, la actividad queda sin calificar (es_correcta: null). Se guarda el texto y se reconoce el reto trabajado con dos estrellas; no cuenta como error ni como evidencia de dominio. Se permite avanzar sin mostrar los controles de respuesta incorrecta. No se añadió una revisión automática posterior de esas entregas.

La validación estructural reduce fallos, pero la decisión semántica sigue dependiendo de IA y puede equivocarse. Las pruebas reales documentadas son una muestra, no una garantía para toda respuesta posible.

## Progreso y compatibilidad
Se mantiene explicación previa y dos prácticas distintas sin ayuda por objetivo. Un reintento correcto conserva asistencia. Los recibos de envío se reutilizan sin otra corrección. Pedir explicación conserva ahora también el borrador de escritura.

El cierre breve mantiene tres preguntas de reconocimiento tomadas de las habilidades cerradas; no aplica un comparador textual a los resúmenes libres. Su revisión incluye la secuencia completa y su habilitación exige además las evidencias de escritura. No se cambiaron los IDs anteriores ni VERSION_BASES y no se alteró directamente la cuenta de Abril.

## Apunte
La ficha de lectura tiene 19 páginas, con las tres nuevas explicaciones y ejemplos. Se renderizó e inspeccionó completa y se verificó la descarga desde la interfaz. Los criterios privados no se incluyen en el contrato de actividad del navegador ni en el catálogo público de apuntes.

## Pruebas
- npm test: 2.738 comprobaciones correctas. Las actividades cerradas siguen verificándose con sus claves; las 18 abiertas tienen una batería específica de 83 comprobaciones. El recorrido general de las 31 habilidades de Lengua usa un evaluador simulado explícito para las nuevas actividades.
- R18 verifica guardado de criterios, respuestas válidas, datos inválidos sin calificación, reintento con ayuda, recibos idempotentes, citas inexistentes, incertidumbre, fallo de red/JSON, explicación y cierre.
- Después de acotar el estado sin calificar a escritura, se repitieron R1 (19) y R18 (83), ambos correctos.
- Modelo real: 12/12 casos esperados con textos sintéticos. Incluye paráfrasis, falta de escritura, negación, participantes invertidos, instrucciones ajenas a la tarea, omisiones y resumen de dos párrafos. No se utilizó la cuenta de Abril.
- Compilación local Next.js/Turbopack correcta.
- Edge local: nueve comprobaciones correctas, con controladores reales y respuestas semánticas simuladas. Incluye tres lecciones, borrador, pistas, segundo error, incertidumbre, PDF, recarga sin otra sesión y 390 px. Sin errores JavaScript ni desbordamiento en las vistas verificadas. Capturas finales inspeccionadas.
- Once regeneraciones R9–R18 en copia temporal conservaron las 171 unidades y 1.026 actividades.

Comandos: npm test; node tests/verify-r18-browser.cjs; node tests/verify-r18-model-live.cjs; node tests/verify-r18-browser-live.cjs. Los dos últimos usan IA real. La prueba de navegador live crea y elimina una cuenta sintética propia.

## Pendientes y siguiente bloque
Revisión y seguimiento familiar de escritos sin calificar o discutibles, con devolución recuperable por la alumna. También quedan selección directa de evidencia, comparación de textos, escritura de párrafos más extensos y simulacros progresivos. Continúan los pendientes de Matemática documentados en R15.

## Publicación
Pendiente de verificación en producción.
