# R26: objetos visibles antes de sus nombres y símbolos

La entrada de R25 seguía siendo demasiado textual: solo seis fichas tenían diagramas y estos aparecían después de la explicación inicial. Describir una jarra graduada presuponía conocer el objeto. Esta revisión modifica las 40 fichas de entrada y su lector.

## Cambios

- Cada ficha empieza con una escena propia: objetos, repartos, cantidades, instrumentos, secuencias o anotaciones sobre palabras y textos. Los mapas de relaciones acompañan la escena. En la web son desplegables.
- La jarra tiene asa, pico, jugo y rayas alineadas con el nivel. En decimales y en el segundo paso de fracciones se puede agregar o sacar un cuarto de litro. Primero aparecen los nombres; las equivalencias en fracción, litros y mililitros se abren voluntariamente. La equivalencia con cc tiene otra explicación opcional.
- La capacidad máxima de un litro se distingue de la cantidad de jugo. En medidas, balanza, jarra y temporizador se exploran de a uno. El texto está identificado como ejemplo inicial para que no describa erróneamente un nivel cambiado por la alumna.
- Las fracciones muestran todo el jugo antes del reparto y después cuatro vasos iguales. Tres vasos seleccionados representan tres de esas cuatro partes. La regla muestra espacios de un centímetro desde cero; las secuencias distinguen fichas anteriores y agregadas; un capítulo se muestra dentro de un libro.
- Se regeneraron 40 PDF de dos páginas y 40 SVG. Son ilustraciones vectoriales originales, generadas con ReportLab desde `scripts/escenas_fichas.py`; no son exportaciones de Canva. La copia de Canva documentada en R25 conserva aquella versión.
- Se conserva la versión de progreso 1 para respetar las lecturas realizadas. La revisión visual 2 cambia las URL de los recursos para renovar la caché. No cambia el requisito de lectura, la calificación ni la maestría. Explorar la jarra no escribe aciertos ni errores.

## Verificación

- `tests/verify-r25.cjs`: 372 comprobaciones correctas.
- `tests/verify-r26-browser.cjs`: las 40 escenas cargan antes de la explicación; 40 pantallas sin desborde a 390 px; cantidades 0/250/500/750/1000 ml, teclado, límites y equivalencias; instrumentos de a uno; sin escrituras de evaluación ni errores de navegador. Esta prueba simula únicamente la API de lectura.
- `tests/verify-r25-live.cjs`: API y base reales con una cuenta sintética. Pausa, recarga, persistencia entre navegadores, ayudas, fallos de red, controles de acceso y bloqueo de prácticas antes de la lectura. Los 40 PDF coinciden byte a byte. Sin errores; limpieza de la cuenta comprobada. No se usó la cuenta de Abril ni se llamó a la IA.
- PDF: 80 páginas renderizadas e inspeccionadas; nueva inspección de las escenas modificadas tras la revisión pedagógica. Hashes, texto dentro de márgenes y etiquetas de las 40 escenas comprobados.
- Compilación de producción y comprobación del despliegue registradas al publicar.

Las capturas e informes se guardan fuera del repositorio, en `implementacion-r26` dentro de las visualizaciones de Codex. La revisión pedagógica del agente especialista corrigió conservación del total, duración, vocabulario, correspondencia entre texto y dibujo y posición de anotaciones. Esto valida la implementación; la comprensión y el interés de Abril requieren observar cómo la usa.
