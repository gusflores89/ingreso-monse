# R11 — Decimales con pasos intermedios

Fecha: 13 de septiembre de 2026.

## Resultado
El tema de decimales tenía cinco lecciones básicas, sin un recorrido suficiente para comparar, convertir y operar con distintas posiciones decimales. Se añadieron 12 micro-unidades y 72 actividades originales, intercaladas entre las cinco existentes. El tema tiene ahora 17 habilidades, con explicación, ejemplo resuelto, actividad guiada y cinco variantes de práctica por habilidad.

Secuencia nueva: milésimos; ceros finales y valor; comparación; decimal a fracción; fracción a decimal exacto; suma con distintas posiciones; resta con cambio de una unidad; multiplicación/división por 10, 100 y 1000; producto de dos decimales; división por natural con centésimos; división por decimal; problema de gasto y saldo en dos pasos.

El catálogo común alcanza 113 unidades y 678 actividades; Matemática tiene 98 unidades en 26 temas. El módulo independiente de H no se incluye en esos totales.

## Enseñar antes de evaluar
El motor existente exige explicación completada y dos variantes diferentes acertadas sin ayuda por habilidad. Un cierre anterior aprobado sigue en el historial, pero no acredita los objetivos nuevos. El cierre de decimales usa ahora la revisión de la secuencia completa y una muestra de tres preguntas, disponible voluntariamente tras consolidar las 17 habilidades. Dos aciertos de tres aprueban este cierre de aprendizaje; no certifica el programa oficial completo.

No se cambió la versión de las actividades anteriores ni se migró el historial de Abril. Los prerrequisitos para acceder a decimales se conservan. Las pruebas usan cuentas sintéticas.

Las resoluciones tras dos errores incluyen las cuentas intermedias. Para pasar de fracción a decimal, muestran enteros, restos y los pasos de décimos, centésimos y milésimos. Para el producto decimal, muestran la multiplicación sin comas y cómo se coloca después la coma. Las claves se calcularon con Decimal de Python y se contrastaron con una lista independiente de 72 resultados esperados.

## Teoría y mantenimiento
El PDF de decimales se amplió a 17 páginas desde las mismas explicaciones públicas de la interfaz. Fue renderizado e inspeccionado por completo. No incorpora claves de prácticas independientes.

Fuente curricular consultada: material_estudio_ingreso_matematica.pdf aportado por el usuario, páginas impresas 65–69 y actividades 72–74. Explicaciones y ejercicios son originales. Se trabajan decimales exactos; se advierte que no toda fracción produce un decimal finito, sin evaluar todavía períodos ni aproximaciones.

Los generadores R9 y R10 conservan su orden antes del bloque R11 al regenerar contenido. Las pruebas anteriores se ajustaron para seguir las secuencias ampliadas sin limitarse a los prefijos antiguos de IDs.

## Validación
- Suite completa: 1.503 comprobaciones correctas. Incluye todas las 678 variantes, recorridos reales de controladores con datos sintéticos y 81 comprobaciones específicas R11.
- La comprobación R11 se repitió tras ampliar las resoluciones guiadas: correcta.
- Compilación de producción: correcta.
- Inspección visual: las 17 páginas del PDF, sin texto cortado.
- La prueba de interfaz recorre cada habilidad, error/pista/acierto, resolución tras dos errores, descarga PDF, cierre breve y vista de 390 px. Las 17 comprobaciones locales pasaron, sin errores JavaScript ni desbordamiento en las vistas verificadas. Capturas inspeccionadas. La misma verificación pasó sobre el dominio publicado.

Pruebas reproducibles: npm test; node tests/verify-r11-browser.cjs; node tests/verify-r11-browser-live.cjs. El navegador de prueba usa Edge y el runtime Playwright disponible en esta instalación; TEST_BASE_URL y TEST_OUTPUT_DIR permiten cambiar el servidor y la carpeta de evidencia. La prueba live usa una cuenta propia temporal, API y Supabase reales, y elimina sus datos al terminar.

## Límites y siguiente bloque
Quedan por ampliar el cálculo con más cifras y milésimos en operaciones generales, decimales periódicos, aproximaciones y problemas combinados más largos. También siguen pendientes escalas de medidas, construcciones geométricas, recorridos adicionales de Lengua y simulaciones progresivas de exámenes anteriores. La siguiente prioridad propuesta es convertir medidas paso a paso y utilizarlas en problemas breves. Esta entrega no añade manipulativos visuales nuevos ni permite afirmar preparación completa para el ingreso.

## Publicación verificada

- Commit de implementación: `97360bc`.
- Despliegue: `dpl_8wdLrmat3SrK7H5QYFm4SDtcDXYZ`, READY, producción.
- Dominio: https://www.ingresomonserrat.online
- Versión: https://ingreso-monse-2027-ql64d0oar-gustavos-projects-b8e409fb.vercel.app
- Edge contra el dominio publicado: 17 comprobaciones correctas con controladores reales y datos simulados. El PDF descargado coincide por SHA-256 con el archivo revisado de 17 páginas. Captura de la resolución tras dos errores inspeccionada una vez terminada la animación de entrada.
- API y Supabase reales, sin interceptar solicitudes: cinco comprobaciones correctas con una cuenta técnica temporal. Se verificó el objetivo nuevo prof_dec_milesimos, recuperar ejercicio y opción entre dos navegadores, corregir con contenido revisado, persistir un reto y dos estrellas, evitar duplicaciones y guardar/salir.
- La cuenta temporal y sus sesiones, continuidad, lecciones y progreso fueron eliminados y se verificó la limpieza. No se utilizó ni alteró la cuenta de Abril.
- Cuatro regeneraciones de contenido R9/R10/R11, ejecutadas en una copia temporal, conservaron exactamente las 113 unidades y sus actividades. La copia temporal fue eliminada.
- El servidor local de verificación quedó cerrado.
- Evidencia: carpeta implementacion-r11 y subcarpeta produccion del espacio de visualizaciones de esta tarea; navegador-r11.json, continuidad-real.json, capturas del navegador y dos hojas de contacto de las 17 páginas PDF.
