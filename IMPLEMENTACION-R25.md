# R25 — Fichas visuales antes de la práctica

7 de octubre de 2026. Implementación de `PLAN-FICHAS-VISUALES.md`.

## Qué recibe Abril

- Biblioteca en `/biblioteca`: 40 fichas, 26 de Matemática y 14 de Lengua, con filtros y estado de lectura. Acceso desde tutoría y dashboard familiar.
- Un PDF de dos páginas por tema. Mapas de relaciones, ejemplos resueltos, transferencia a otra situación, contraste y comprobación acompañada. Seis esquemas concretos adicionales para división, fracciones, resto, ángulos, triángulos y perímetros compuestos.
- La app presenta el contenido en cuatro pasos breves. La lectura precede a lo interactivo, se puede pausar y se puede releer. Descargar un PDF no completa la lectura.
- Ante una respuesta equivocada se explica el caso y se permite continuar con ayuda. No registra errores, dominio, estrellas ni aprobados.

Son fichas de entrada: no pretenden explicar todo un módulo ni reemplazan las microlecciones existentes. Por ejemplo, la ficha de divisibilidad comienza con grupos exactos; no exige calcular MCM antes de enseñarlo. Recorrer una ficha no demuestra por sí solo comprensión; esa observación queda para la práctica posterior y el acompañamiento familiar.

## Contenido y mantenimiento

`src/lib/fichas-modulos.json` contiene los mismos textos para la web y los PDF. El especialista pedagógico revisó los 40 temas; se incorporaron sus correcciones sobre H inicial, prerrequisitos, diagramas y ayuda en el PDF autónomo. Bibliografía de enfoque: Cuadernos para el aula Matemática 4/5 y Lengua 4; Novak y Cañas; guía IES de fracciones. La redacción y los ejemplos son propios; no se publican los libros de bibliografía.

`scripts/generar-fichas-modulos.py` genera `public/fichas/*.pdf`, seis SVG compartidos por web/PDF y un manifiesto con SHA-256. Requiere Python con reportlab/pypdf y Arial instalada en Windows. Cambiar la versión de fichas exige regenerar los PDF y actualizar la constante de lectura; nunca cambiar el significado de una versión ya completada sin decidir explícitamente si se requiere otra lectura.

La ficha de fracciones también tiene una copia importada en Canva: https://www.canva.com/d/IIB2qrx48rvCrG4 . Los PDF publicados se generan desde la fuente compartida, no se exportaron de Canva. Cambios manuales en Canva no se sincronizan automáticamente con la app.

## Persistencia y protección

Se utiliza `lecciones_completadas`, con marcas monotónicas 250100–250103 para versión 1 y la unicidad existente por usuario/tema/número. Las lecciones curriculares siguen usando el número 1. No requiere una migración y no modifica los aprobados existentes.

`/api/fichas` verifica sesión, propiedad, tema, versión y orden. No entrega la respuesta inicial de la comprobación. El requisito se verifica en inicio, repaso espaciado, taller concreto y recepción de respuestas. Una sesión restaurada se conserva detrás de la lectura; errores de consulta no habilitan silenciosamente la práctica.

## Verificación

- Suite previa R1–R24: exit 0. Los controladores antiguos aíslan el requisito nuevo con dependencias explícitas; R25 y la prueba real verifican el requisito integrado.
- `node tests/verify-r25.cjs`: 372 comprobaciones sobre los 40 temas; cobertura, orden, versión, ayuda, idempotencia, permisos y persistencia.
- `npm run build`: exit 0; incluye `/biblioteca` y `/api/fichas`.
- 40 PDF, 80 páginas: renderizados e inspeccionados; sin caracteres fuera de los márgenes. SHA-256 verificado contra el manifiesto.
- `node tests/verify-r25-live.cjs`: navegador Edge a 1366×900 y 390×844, API y base reales, cuenta sintética y limpieza comprobada. Sin usar datos de Abril ni llamadas a IA. Recarga, persistencia entre navegadores, lectura asistida, fallo de red, biblioteca, conservación de sesión y coincidencia de los 40 PDF.

Las capturas y el informe de ejecución están en la carpeta externa `implementacion-r25` de visualizaciones de Codex. Los audios no se modificaron.

## Publicación

Pendiente de registrar la URL y la verificación del despliegue de producción.
