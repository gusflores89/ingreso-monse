# R24 — Equivalencias, operaciones y fracciones del resto

Ejecuta el bloque 2B del plan de prioridades. Los bloques 2C, 3 y 4 siguen pendientes.

## Qué cambia

Se añaden quince microlecciones y noventa actividades antes de procedimientos que daban saltos conceptuales:

- Concepto: mitad de una colección mediante reparto; volver a cortar y reagrupar sin cambiar la cantidad; formar enteros completos (incluye ocho cuartos como dos enteros).
- Operaciones: juntar y quitar partes del mismo tamaño; cambiar los cortes; sumar y restar con partes ya igualadas; tomar grupos de una colección; mitad de una parte; contar cuántas porciones caben antes de introducir la inversa.
- Resto: separar lo usado de lo disponible; identificar el nuevo total de referencia; repartir el resto y tomar una mitad.

El entero de referencia permanece visible en las barras. Las partes se marcan con rayas; las que se quitan se tachan. Las colecciones distinguen las fichas usadas de las restantes. En el paso de nueva referencia, no se duplica el total inicial en otro dibujo que pudiera sumarse por error a los grupos. Los grupos elegidos tienen flechas además de las descripciones accesibles.

Las representaciones se calculan en un único módulo para pantalla y PDF. Se actualizaron teoría, diapositivas y tres PDF. El generador de R23 conserva su posición anterior a R24 para no alterar la secuencia al regenerar contenido.

Se conservan preguntas, claves e IDs anteriores, así como el historial. Los cierres siguen siendo de tres preguntas. Los objetivos nuevos necesitan enseñanza y evidencias propias; los aprobados antiguos no se usan como sustituto de esos pasos. Estas actividades se generan y corrigen de manera determinista, sin llamadas al modelo.

## Límites

Los PDF también contienen las etapas posteriores: no son una lectura completa sugerida para una sola sesión. Las nuevas actividades son apoyos iniciales, no evidencia suficiente de transferencia a problemas abiertos. Sigue siendo necesario observar si Abril comprende la consigna, representa la cantidad y puede resolver una variante con el apoyo adecuado. Una actividad ya abierta se conserva hasta que se solicite otra; no se altera directamente su cuenta.

## Verificación

R24: 225 comprobaciones agrupadas con claves esperadas independientes, coherencia entre partes dibujadas y respuestas, invariancia en equivalencias, selección del controlador, ausencia de claves en la respuesta pública, pistas y resoluciones, opciones distintas con posición variable, requisitos y cierre breve. PDF: 39 páginas entre tres documentos (17, 17 y 5), renderizadas para revisión.

Evidencia: C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/implementacion-r24.

- Navegador local: quince recorridos de explicación, ejemplo, práctica y pista, más acceso al taller y regreso (16 comprobaciones). Sin errores JavaScript ni desbordamiento horizontal en PC y 390 px. Se inspeccionaron capturas de enseñanza y feedback.
- API/base reales: tres lecciones corregidas y persistidas, tres descargas PDF con SHA-256 idéntico al archivo revisado. Cuenta sintética eliminada y ausencia de registros residuales comprobada.
- Los tres PDF se renderizaron y revisaron visualmente; texto y límites de página correctos. El documento del resto se regeneró y revisó de nuevo tras simplificar la representación del nuevo total.
- Compilación de producción correcta. La suite general y publicación se documentan al terminar.

## Resultado final y publicación

- `npm test`: suite completa R1–R24 y sincronización de apuntes, código 0. Una ejecución previa coincidió con la regeneración del archivo de contenido y leyó el archivo durante la escritura; se repitió la suite completa con las fuentes finales estables. No se omitieron verificaciones.
- Implementación: commit `77a4c0a`.
- Vercel: `dpl_9VdeYyqtAKPxxSfZA52HJWHWBzat`, READY, producción.
- Dominio: https://www.ingresomonserrat.online
- Versión: https://ingreso-monse-2027-mssf03gir-gustavos-projects-b8e409fb.vercel.app
- Sobre el dominio publicado: 16 verificaciones del frontend con controladores locales/base simulada. Por separado, seis verificaciones con API/base reales: tres lecciones corregidas y guardadas y tres PDF idénticos a los revisados. Sin errores. La cuenta sintética y todos sus registros se eliminaron y la limpieza se verificó.
- Evidencia final: `implementacion-r24/produccion/browser-results.json` y `implementacion-r24/produccion/api-real-r24.json`.

Próximo bloque: 2C, décimos y centésimos, comparación y operaciones decimales con representaciones del entero.
