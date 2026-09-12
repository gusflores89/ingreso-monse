# R5 — Lengua inicial y requisitos compartidos

Estado: publicado y verificado en https://www.ingresomonserrat.online el 12/09/2026 a las 13:58 ART.

- Commit de implementación: `2d6a982`.
- Despliegue: `dpl_Ey11sjXRPBBCoD1heT5wUUdkEPi7`, estado Ready.
- URL de versión: https://ingreso-monse-2027-kayfiauhj-gustavos-projects-b8e409fb.vercel.app
- Las 21 comprobaciones de navegador también pasaron contra los archivos de interfaz publicados. La API de esas pruebas usa controladores reales con datos sintéticos; no es una prueba de extremo a extremo sobre Supabase de producción.
- Los tres PDF devolvieron HTTP 200 y su SHA-256 coincide con los archivos locales revisados.
- Los servidores locales utilizados para la verificación quedaron detenidos.

## Problema y resultado

La enseñanza revisada cubría las bases matemáticas, pero los primeros pasos de Lengua aún dependían de generación libre. El mapa y el panel familiar usaban cuotas por fase diferentes de los requisitos del servidor. Un tema podía parecer disponible y abrir otro al seleccionarlo.

Esta tanda añade 15 unidades y 90 actividades de Lengua: lectura literal, inferencias con pistas e idea principal; seis pasos de B/V; separación silábica, sílaba tónica, agudas, graves, esdrújulas y sobresdrújulas. Cada unidad incluye explicación, ejemplo resuelto, una práctica guiada y cinco variantes de práctica. La corrección, las pistas y los procedimientos están definidos en el servidor; estas actividades no llaman a un modelo. Se requieren dos actividades diferentes correctas sin ayuda después de la explicación para avanzar. La ruta de Matemática permanece separada.

Los contenidos son introductorios. No abarcan todas las excepciones ortográficas ni equivalen al nivel completo de ingreso. El cuadernillo de Lengua aportado orienta los contenidos de ortografía y acentuación; la secuencia, los textos breves de lectura y los ejemplos son material propio de apoyo.

## Cambios del recorrido

- `acceso-temas.js` centraliza la misma regla para iniciar una sesión, mostrar el mapa y calcular el panel familiar. Las fases organizan contenidos; desaparecen las cuotas de exámenes de otras fases. Se conservan los requisitos directos del currículo, el acceso a las bases y los aprobados históricos. La muestra gratuita mantiene sus cuatro temas, incluso con ruta flexible.
- Los bloqueos indican el conocimiento previo concreto. Ya no se etiquetan como Premium cuando el problema es pedagógico.
- El panel familiar no anuncia aptitud para examen basándose solamente en tres sesiones y un promedio alto.
- Al terminar un examen o entregar una producción, la app conserva el tema hasta que la alumna decida cambiarlo. Se retiró la alternancia automática que todavía persistía en ese flujo.
- La cabecera incorpora «Leer y escribir». Los títulos de las fases usan lenguaje más cercano.
- La tarjeta de simulacros aclara que todavía no están disponibles; se retiró el botón que abría un tema corriente fingiendo una simulación.

## Cierres de Lengua

El cierre básico de cada uno de los tres temas usa las habilidades de la nueva secuencia y opciones tocables. Se ofrece como una decisión de la alumna; no se abre al entrar. Los exámenes antiguos se conservan como historial y no se reabren como cierre de esta secuencia si carecen de su versión de contenido. Se conservan los aprobados anteriores.

La prueba de navegador detectó que el cierre dependía todavía de una marca de lección antigua y que la ruta revisada ocultaba su botón. Se corrigieron ambos puntos. Si no corresponde abrir un cierre, el servidor continúa con contenido revisado, sin caer en una pregunta generada. La nueva prueba recorre la oferta y elección explícita del examen, sin inyectarlo en la respuesta de la API.

Los cierres básicos no son exámenes oficiales ni pruebas exhaustivas del tema. Sus preguntas se toman de variantes del banco de práctica; no se presentan como una evaluación externa inédita.

## Material descargable

Tres PDF nuevos, derivados de los mismos apuntes que la aplicación:

- Lectura: 3 páginas.
- B/V: 6 páginas.
- Sílabas y tildes: 6 páginas.

Se verificó la extracción de texto en las 15 páginas y se renderizaron para inspeccionar su legibilidad. Los apuntes públicos contienen enseñanza y ejemplos; las claves de prácticas quedan en el módulo del servidor.

## Verificación

- `npm test`: 300 casos pasan (19 R1, 9 H, 22 R2, 202 R3, 11 R4 y 37 R5).
- R5 comprueba todos los temas con 16 combinaciones de plan, ruta flexible y aprobados; los tres recorridos completos; ayudas; registros antiguos; cierres; y conservación de tildes al corregir.
- Compilación de producción correcta. Se regeneró la caché `.next` tras un bloqueo EPERM de OneDrive.
- Navegador Edge: 21 comprobaciones pasan a 1366 px y 390 px, sin errores de JavaScript. Incluyen las 15 lecciones, tres descargas reales, mapa, elección y corrección del cierre, y conservación del tema.
- Evidencia de navegador y PDF: carpeta `implementacion-r5` en las visualizaciones de esta tarea.
- Las pruebas de controladores y navegador usan datos sintéticos y no modifican la cuenta de Abril. No se realizaron nuevas llamadas de auditoría a la IA ni nuevas pruebas sobre la base de producción.

## Pendientes de la auditoría general

1. Extender las unidades revisadas al resto de Matemática y Lengua, incluidas más reglas y excepciones de B/V y acentuación. Las prácticas de H aún combinan enseñanza revisada con generación de IA.
2. Programar repasos espaciados según el tiempo transcurrido y las habilidades que necesiten refuerzo.
3. Sincronizar misión, borrador y recompensas entre dispositivos; parte de la continuidad sigue en almacenamiento local.
4. Mostrar el historial de ayudas e intentos y las entregas pendientes en el panel familiar.
5. Implementar simulacros completos a partir de los exámenes anteriores, con requisitos pedagógicos verificables.
6. Completar rachas/logros y observar sesiones cortas de Abril para ajustar la dificultad y la experiencia real.
