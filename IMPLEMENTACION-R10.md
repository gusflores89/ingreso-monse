# R10 — Pasos intermedios de fracciones y MCM

Fecha: 13 de septiembre de 2026.

## Problema y resultado
El recorrido revisado tenía bases y operaciones, pero aún saltaba entre equivalencias visuales y procedimientos. Ahora intercala 14 micro-unidades y 84 actividades originales: cada habilidad empieza con explicación, ejemplo resuelto en dos pasos y práctica guiada; luego requiere dos evidencias independientes para consolidarse. Las actividades y sus claves están revisadas localmente y no requieren generación de IA.

- Fracciones: amplificar, simplificar, comparar con igual denominador o numerador, distinguir propias/impropias/aparentes y convertir entre fracción y número mixto.
- Operaciones: preparar un denominador común, comparar fracciones distintas, restar y entender la división como cantidad de porciones.
- Divisibilidad: descomponer en primos y construir MCM/MCD con sus factores, después de aprender primos y compuestos.

La secuencia mantiene primero el MCM por listas para operar con fracciones sencillas. La factorización aparece más adelante. El catálogo común alcanza 101 unidades y 606 actividades; Matemática tiene 86 unidades en 26 temas. El módulo separado de H no se cuenta en esos totales.

## Cierres y antecedentes
En estos tres temas ampliados, el cierre voluntario contiene tres preguntas tomadas de habilidades ya practicadas y aprueba con dos respuestas correctas. Es una muestra breve después de consolidar todos los micro-objetivos, no una certificación del programa completo ni un examen oficial. La interfaz lo presenta como “Cierre de aprendizaje” y permite repasar cuando cuesta.

Los aprobados anteriores siguen en el historial y en el mapa. Al retomar estos temas, no acreditan las nuevas habilidades ni impiden ofrecer el cierre de la secuencia ampliada. La revisión del cierre identifica los IDs de toda la secuencia. Un cierre anterior que ya estuviera abierto puede terminarse y conserva su alcance histórico, con feedback explícito. Se mantiene la versión de las actividades existentes para no perder sus evidencias.

## Teoría descargable y mantenimiento
Se actualizaron tres PDF completos: concepto de fracción (11 páginas), divisibilidad/MCM/MCD (12) y operaciones (9). Lecciones, ayudas y PDF comparten la misma fuente pública sin claves de respuesta. Las comparaciones incluyen barras del mismo tamaño.

Referencia curricular consultada: material_estudio_ingreso_matematica.pdf aportado por el usuario, secciones de factorización, MCM/MCD y fracciones (páginas impresas 31–32 y 58–64). La redacción y los ejercicios son propios de la aplicación. No se atribuye contenido a bibliografía escaneada que no se haya podido leer.

La generación de R9 quedó delimitada para no borrar la ampliación R10 al ejecutarse otra vez. El generador de apuntes acepta --temas para regenerar únicamente los temas modificados.

## Verificación
- Suite completa: 1.338 comprobaciones, incluyendo 109 de R10 y 606 variantes del catálogo; datos sintéticos, sin llamadas reales a IA.
- Compilación de producción con Next.js/Turbopack.
- Edge local: 20 comprobaciones con interfaz compilada, controladores reales y base simulada. Se recorrieron las 14 unidades; pista y reintento; tres descargas reales; cierre de tres preguntas con un aprobado anterior; pantalla de 390 px; sin errores JavaScript.
- Las 32 páginas PDF se renderizaron y revisaron visualmente. Capturas de comparación, números mixtos, MCM, cierre y móvil inspeccionadas.

Comandos reproducibles:

```powershell
npm test
node node_modules/next/dist/bin/next build
node tests/verify-r10-browser.cjs
node tests/verify-r10-browser-live.cjs
```

La última prueba usa una cuenta sintética y API/Supabase reales; requiere credenciales de servicio locales y elimina únicamente sus propios datos al terminar. El resultado de producción se documentará después de publicarlo.

## Alcance pendiente
Esta entrega profundiza tres temas; no completa toda la preparación de ingreso. Queda ampliar el resto de Matemática más allá de sus fundamentos (problemas de varios pasos, operaciones más complejas y construcciones geométricas), extender los recorridos revisados de Lengua y preparar simulaciones progresivas con exámenes anteriores. Las barras son apoyos visuales, no manipulativos interactivos nuevos. No se modificó directamente la cuenta de Abril.
