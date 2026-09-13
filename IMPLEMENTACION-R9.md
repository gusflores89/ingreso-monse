# R9 — Fundamentos revisados de Matemática

Estado: publicado y verificado en https://www.ingresomonserrat.online el 13/09/2026.

- Commit de implementación: `dd23273`.
- Despliegue Ready: `dpl_4AsiBbCefPUmgAVabJ877DGNuZVT`.
- Versión: https://ingreso-monse-2027-f25znh9al-gustavos-projects-b8e409fb.vercel.app
- Las 60 comprobaciones de interfaz también pasan en la publicación, usando controladores reales y datos sintéticos; las descargas provienen del servidor publicado.
- Cinco comprobaciones adicionales de extremo a extremo pasaron contra la API y Supabase reales: lección nueva de numeración, corrección determinista, recuperación entre dos navegadores y salida confirmada. Se utilizó una cuenta temporal propia, eliminada junto con sus datos. No se alteró el historial de Abril.

## Resultado y alcance

Se añadieron 54 unidades originales y 324 actividades a los 23 temas de Matemática que todavía dependían de generación de IA. Con las 18 unidades anteriores, hay 72 unidades matemáticas en los 26 temas del mapa; el banco total contiene 87 unidades y 522 actividades, contando Lengua. Esta cobertura corresponde a fundamentos, no a la preparación completa de todas las exigencias del ingreso.

Cada unidad presenta explicación breve, un ejemplo resuelto y una actividad guiada, seguidos de cinco variantes de práctica. El motor exige una explicación completada y dos variantes distintas acertadas sin ayuda antes de avanzar. Completar la actividad de la lección no acredita independencia. Pedir ayuda conserva la recompensa y el registro de asistencia; dos errores recientes reabren la enseñanza mediante el motor existente.

La ruta especial de fracciones y MCM conserva su orden y sus IDs. La ampliación del catálogo público no desbloquea automáticamente los temas avanzados: la política de prerrequisitos del mapa conserva las excepciones previas. Los objetivos nuevos usan IDs nuevos; los aciertos históricos de otros objetivos no se convierten en evidencias de estas habilidades. La versión de las actividades preexistentes se conserva para no invalidar su historial. No hay migración de datos.

## Enseñanza, apuntes y cierres

- Se añadieron 23 PDF con 54 páginas. Los 26 temas matemáticos tienen ahora ficha de primeros pasos, generada desde las mismas explicaciones públicas que la pantalla.
- Los campos públicos excluyen claves y soluciones de prácticas. Las respuestas correctas permanecen en el servidor; las claves tampoco se envían dentro de un cierre.
- Los cierres matemáticos ahora toman una pregunta por habilidad de su secuencia revisada. El umbral es dos tercios redondeados hacia arriba. Son cierres básicos voluntarios; pueden tener más de tres preguntas y su tiempo estimado refleja su longitud. No son simulacros oficiales.
- Las preguntas de fracciones conservan sus barras en la pantalla del cierre. Un cierre no presenta una consigna visual sin la figura que necesita.
- Se conservan los requisitos de preparación, el reintento, la idempotencia, la sincronización y el registro de asistencia de las tandas anteriores.

## Material consultado

Programa e índice del archivo aportado `material_estudio_ingreso_matematica.pdf` (118 páginas), páginas impresas 2–5. Se contrastaron las definiciones y procedimientos con los apartados de numeración, operaciones, divisibilidad, racionales, medidas y geometría del mismo cuadernillo. Las explicaciones, ejemplos y actividades añadidos son propios de la aplicación. La bibliografía de didáctica disponible es un PDF escaneado sin texto extraíble; no se le atribuyen citas ni una revisión integral que no se hizo.

## Verificación

- `npm test`: 1.131 comprobaciones pasan. Incluyen las 324 claves nuevas calculadas por separado, 54 recorridos de lección/práctica por los controladores y 23 cierres nuevos, sin llamadas a IA y con base sintética.
- Todos los objetivos efectivos de los 26 temas matemáticos tienen contenido determinista. Las pruebas comprueban que solicitar un examen no salta la explicación pendiente ni acredita como independiente una lección.
- `next build`: compilación de producción correcta.
- PDF: texto, cantidad de páginas e inspección visual de todas las 54 páginas nuevas, sin cortes de contenido.
- Edge: 60 comprobaciones pasan, incluidas las 54 lecciones nuevas, tres descargas PDF, error/pista/acierto con asistencia persistente, cierre de fracciones con barras y vista de 390 px. Sin errores JavaScript ni desbordamiento en las vistas comprobadas. Capturas inspeccionadas.
- Prueba de navegador reproducible: `node tests/verify-r9-browser.cjs`. Usa Edge, controladores reales con datos sintéticos y descarga los PDF del servidor. No debe confundirse con una prueba de extremo a extremo contra la cuenta de Abril.

Prueba de producción reproducible: `node tests/verify-r9-browser-live.cjs`. Requiere las variables locales del servidor y Playwright/Edge; no forma parte de la suite automática predeterminada. No imprime credenciales ni cookies. Verifica expresamente el objetivo nuevo `mat_num_decenas`. Evidencia de interfaz y PDF: carpeta `implementacion-r9` de las visualizaciones de esta tarea.

## Cobertura de fundamentos por tema

| Tema | Unidades | Primer paso |
|---|---:|---|
| fracciones concepto | 4 | Primero, partes del mismo tamaño |
| divisibilidad primos mcm mcd | 9 | Múltiplos: avanzar con saltos iguales |
| fracciones operaciones | 5 | Sumar partes del mismo tamaño |
| numeros naturales sistema decimal | 5 | Diez unidades forman una decena |
| tablas multiplicar 2 5 | 3 | Multiplicar cuenta grupos iguales |
| tablas multiplicar 6 8 | 2 | Construir las tablas del seis y del ocho |
| tablas multiplicar 9 10 | 2 | Multiplicar por diez cambia el valor |
| division 1 digito | 3 | Repartir la misma cantidad |
| numeros romanos | 2 | Leer símbolos romanos que suman |
| fracciones del resto | 2 | Primero averiguamos cuánto queda |
| decimales conversion | 5 | Décimos y centésimos |
| potenciacion y raiz cuadrada | 2 | Una potencia repite factores |
| jerarquia operaciones | 2 | Antes de sumar, resolvemos los productos |
| si me la longitud | 2 | El metro y el centímetro |
| si me la masa capacidad tiempo | 2 | Mil partes: gramos y mililitros |
| geometria angulos | 2 | Comparar una abertura con un ángulo recto |
| geometria triangulos | 2 | Clasificar triángulos por sus lados |
| geometria cuadrilateros circunferencia | 2 | Cuatro lados y líneas paralelas |
| perimetros simples | 2 | Recorrer todo el borde |
| perimetros compuestos | 2 | Los lados compartidos quedan adentro |
| graficos estadisticos | 2 | Leer qué cuenta cada dato |
| proporcionalidad regla 3 | 2 | Primero averiguamos cuánto vale uno |
| secuencias aritmeticas | 2 | Repetir siempre el mismo salto |
| secuencias geometricas fibonacci | 2 | Repetir una multiplicación |
| secuencias alfanumericas y figuras | 2 | Un bloque que se repite |
| ecuaciones con imagenes 2 incognitas | 2 | El mismo símbolo conserva su valor |

## Trabajo que continúa pendiente

- Profundizar hasta todas las exigencias del cuadernillo: propiedades y cálculos más complejos, clasificación/orden de fracciones y números mixtos, conversiones y operaciones decimales generales, escalas de medidas y problemas de varias etapas.
- Incorporar construcciones con regla, compás y transportador, mediatrices, bisectrices, relaciones de ángulos y figuras compuestas más variadas. Las unidades actuales no acreditan haber realizado esas construcciones.
- Añadir representaciones manipulables a las nuevas unidades; hoy predominan texto breve, ejemplos y opciones, mientras las fracciones conservan barras visuales.
- Implementar simulacros de exámenes anteriores, diferenciados de estos cierres básicos.
- Completar Lengua, rachas y logros, y ajustar dificultad observando sesiones reales de Abril.
