# Auditoría pedagógica de Matemática para Abril

Fecha: 2 de octubre de 2026. Proyecto: ingreso-monse-2027.

## Decisión principal

**Es necesario cambiar la entrada y la forma de enseñar, no seguir ampliando contenido al mismo nivel.** El recorrido actual ofrece contenido organizado y apoyos útiles, pero da por adquiridas habilidades que todavía no comprobamos en Abril. Mejorar recompensas o hacer más breves las explicaciones no resuelve por sí solo esa diferencia.

La observación familiar sobre `8/4` y la lectura de “denominador” justifica revisar los apoyos. No permite concluir que Abril no sabe matemática, asignarle un nivel global ni diagnosticar una dificultad. Todavía no sabemos cuánto puede resolver con objetos, una consigna leída en voz alta o una representación conocida. Tampoco sabemos qué parte del episodio correspondió a comprensión, notación, cálculo, lectura o tensión del momento.

## Alcance y evidencia

Se creó y consultó al subagente `tutor_matematicas`, orientado a la enseñanza matemática. Se revisaron los **26 temas, 140 unidades y 840 actividades** del catálogo de Matemática, incluyendo explicación, ejemplo, pasos, pistas, opciones y visuales. Se contrastó la secuencia con el motor de objetivos, acceso a temas y ruta de sesiones. La matriz cubre cada tema; no equivale a observar a Abril realizando las 840 actividades.

Se evaluó el catálogo resuelto al ejecutar el módulo: el archivo incorpora bloques que agregan unidades y visuales después de sus definiciones iniciales. Mirar solamente el primer bloque puede producir conclusiones equivocadas.

Las 840 actividades del catálogo revisado son de opciones. Hay **52 unidades con visual explícito de lección** y **216 actividades con visual explícito propio**. Son campos diferentes; no deben sumarse ni convertirse en una tasa de pantallas sin imágenes. La interfaz también genera algunos gráficos automáticamente. Estos recuentos no describen todos los exámenes, tareas manuscritas o recursos de la aplicación.

Esta revisión es del código y catálogo locales. No se realizó una sesión con Abril, ni se volvió a evaluar toda la bibliografía o cada PDF oficial, ni se comprobó en navegador la versión publicada durante esta auditoría. No se modificaron su cuenta, resultados ni historial. Las pruebas de API usaron datos simulados, sin base de datos real ni llamadas a modelos.

## Hallazgos que atraviesan el recorrido

1. **La primera entrada ya presupone bases.** `mat_num_decenas` comienza con 23 fichas. La primera suma de esa secuencia es 27 + 15 con reagrupación y la resta es 42 − 17. Falta una entrada que observe pequeñas cantidades, juntar, quitar y repartir antes de decidir dónde empezar. No se propone obligarla a repetir lo que ya sabe.
2. **El modo paciente no adapta este catálogo.** En `src/pages/api/sesion/init.js`, `responderBase` llama a `crearActividadBase` y devuelve contenido revisado antes de los prompts de IA. Ese generador no recibe un perfil lector o nivel de apoyo de Abril. Las pruebas sintéticas con modo paciente activado/desactivado devolvieron las mismas explicaciones iniciales de números naturales y fracciones, sin llamadas de IA. La petición de división de una cuenta nueva se redirigió a números naturales: no se debe contar esa prueba como una tercera explicación diferente.
3. **Repasar no ofrece necesariamente otra manera de aprender.** En esa ruta, REPASO vuelve a la lección del mismo objetivo. Es útil para recuperar el contenido, pero no selecciona automáticamente un ejemplo más concreto ni trabaja un prerrequisito que esté fallando.
4. **Elegir una respuesta no demuestra por sí solo comprensión.** El motor exige explicación registrada y dos actividades distintas correctas sin ayuda para superar un microobjetivo. Excluye ayudas y reabre explicación tras errores, lo cual es favorable. Aun así, no observa cómo construyó la respuesta ni exige transferencia a una situación nueva. “Explicación vista” es un estado de interacción, no una medida de comprensión. Esto no significa que dos respuestas habiliten por sí solas un examen final: existen más condiciones y objetivos.
5. **Los visuales necesitan convertirse en acciones.** Hay barras de fracción y diagramas geométricos aprovechables. El ejemplo de división sí puede generar grupos automáticamente; corrijo la afirmación anterior demasiado amplia de que no tenía apoyo visual. El límite es que muestra una representación ya resuelta, sin enseñar y observar el reparto objeto por objeto. En la UI, además, el apoyo de barras de fracciones no se conserva en el mismo lugar durante la evaluación como sí ocurre con algunos visuales tipados. Conviene comprobar y corregir esa continuidad al implementar.
6. **Leer la consigna compite con aprender matemática.** No se encontró lectura en voz alta integrada en el componente principal de tutoría. El vocabulario técnico a veces llega junto con el concepto y el procedimiento. Necesitamos distinguir ayuda de acceso —escuchar una consigna sin alterarla— de una pista que revela la estrategia matemática.
7. **Abrir un tema no significa tener una entrada adecuada.** `acceso-temas.js` permite acceder a concepto de fracción, operaciones con fracciones y MCM/MCD sin aprobaciones previas. La ruta especial de bases solo reorganiza esos tres temas; no calibra toda Matemática. Mantener exploración abierta puede ser positivo: el cambio necesario es recomendar una actividad adecuada, no cerrar todas las fracciones hasta dominar MCM.
8. **Un tema incluye dificultades muy distintas.** “Concepto de fracción” contiene partes iguales y también simplificación, impropias y mixtos. Estar preparada para mitades no implica estar preparada para todo el bloque. La ruta y el informe familiar deben mostrar habilidades concretas, no solo un tema aprobado o pendiente.

## Revisión de los 26 temas

**Cómo leer la decisión:** “Explorar con apoyo” propone una entrada concreta y acompañada; no certifica que la lección actual sea apta para trabajo autónomo. “Posponer bloque formal” se refiere al formato y las exigencias actuales, no a una prohibición de explorar ideas ni a un límite permanente de Abril. “Rehacer entrada” es la prioridad inmediata. Las decisiones deben ajustarse cuando veamos lo que realmente puede hacer.

| Tema | Unidades | Decisión provisional | Problema o requisito actual | Cambio de enseñanza |
|---|---:|---|---|---|
| Números naturales y sistema decimal | 5 | Rehacer entrada | Empieza con 23 objetos y decenas; suma 27 + 15 y resta 42 − 17 ya requieren reagrupación. | Comprobar pequeñas cantidades; juntar, quitar y completar con objetos. Después paquetes de diez y notación. |
| Multiplicación: 2 a 5 | 3 | Explorar con apoyo | Hay grupos y suma repetida, pero introduce vocabulario y presupone contar/sumar. | Construir 2–3 grupos pequeños, contar todos y unir con la suma; presentar × después. No empezar memorizando tablas. |
| Multiplicación: 6 a 8 | 2 | Posponer bloque formal | Dobles y descomposición dependen de productos y sumas previas. | Arreglos de filas que se separan en grupos conocidos; comprobar las bases antes de pedir resultados. |
| Multiplicación: 9 y 10 | 2 | Posponer bloque formal | Valor posicional y restas sostienen los atajos. | Construir paquetes de diez; mostrar qué cambia al quitar un grupo. Evitar enseñar solamente agregar un cero. |
| Números romanos | 2 | Explorar con apoyo; baja prioridad | Combina convenciones nuevas y reglas aditivas/sustractivas. | Reconocer I, V y X en un contexto real y con modelo. Dejar números grandes y excepciones para después. |
| División por una cifra | 3 | Rehacer entrada; prioridad alta | Introduce dividendo, divisor y cociente; justifica 12 ÷ 3 con 3 × 4. El ejemplo sí puede tener dibujo automático. | Repartir 6 objetos entre 2 recipientes, uno por uno. Luego formar grupos de tamaño fijo. Distinguir qué cuenta el resultado; escribir ÷ al final. |
| Divisibilidad, primos, MCM y MCD | 12 | Posponer bloque formal | Doce unidades enlazan múltiplos, criterios y procedimientos sobre operaciones todavía no comprobadas. | Repartos con/sin sobrantes y saltos iguales. Más adelante coincidencias de múltiplos y divisores; factorización después. |
| Concepto de fracción | 11 | Explorar inicio con apoyo; separar niveles | Once unidades mezclan partes iguales con equivalencias, simplificación, impropias y mixtos. Hay barras en 9 unidades. | Un mismo entero, partir en dos partes iguales, reconocer una mitad y reconstruir el entero. Cuartos después; introducir un término por vez. Separar colección de objetos y barra. |
| Operaciones con fracciones | 9 | Posponer bloque formal | Nueve unidades; cinco tienen visual de lección, pero operar exige interpretar y relacionar las piezas. | Juntar/quitar piezas del mismo tamaño; cambiar una mitad por dos cuartos. Formalizar denominadores comunes cuando la representación tenga sentido. |
| Fracciones del resto | 2 | Posponer bloque formal | Exige distinguir cantidad inicial y cantidad que queda, además de operar. | Dos escenas persistentes: lo que había, lo que se usó y lo que queda. Cambiar el referente explícitamente. |
| Decimales y conversión | 17 | Posponer bloque formal | Diecisiete unidades concentran notación posicional, conversiones y procedimientos. | Relacionar cantidades con una tira o cuadrícula dividida; introducir décimos antes de algoritmos y conversiones. Dinero solo si ya lo comprende. |
| Potenciación y raíz cuadrada | 2 | Posponer bloque formal | Presupone multiplicación y reversibilidad; agrega notación. | Construir cuadrados de fichas y contar filas; separar potencia de raíz. Símbolos después del significado. |
| Jerarquía de operaciones | 2 | Posponer bloque formal | Pide seleccionar un orden cuando el significado de operaciones básicas está por comprobarse. | Historias de acciones y agrupaciones sencillas; paréntesis con significado. Reglas formales después. |
| Longitud | 10 | Explorar con apoyo; separar conversiones | Diez unidades; parte del recorrido exige equivalencias y cálculos. | Medir objetos reales repitiendo una unidad; alinear regla en cero. Después centímetros/metros y conversiones. |
| Masa, capacidad y tiempo | 12 | Explorar con apoyo; separar magnitudes | Doce unidades mezclan instrumentos, unidades y cambios de escala, incluido tiempo. | Una magnitud por actividad: comparar recipientes, balanza o reloj. No enseñar simultáneamente 1000 y la base 60 del tiempo. |
| Ángulos | 10 | Explorar con apoyo; simplificar lenguaje | Comienza en prof_geo_elementos con semirrectas, vértice y AOB; 8 de 10 unidades tienen visual. | Abrir una bisagra o dos tiras unidas, comparar aperturas y señalar el punto de unión. Nombres, grados y transportador después. |
| Triángulos | 5 | Explorar con apoyo | Las 5 unidades tienen visual; empieza por vértices, antes de clasificación y cálculos. | Armar figuras con tres palitos, señalar lados/esquinas y comparar. Posponer cálculos de ángulos y vocabulario simultáneo. |
| Cuadriláteros y circunferencia | 4 | Explorar con apoyo | Las 4 unidades tienen visual; las relaciones formales pueden adelantarse a la exploración. | Reconocer propiedades de una en una y trazar centro/borde. Construir radio/diámetro antes de usar su relación numérica. |
| Perímetros simples | 8 | Explorar con apoyo; separar fórmulas | Las 8 unidades tienen visual; el recorrido también incluye circunferencia y problemas de varios pasos. | Recorrer el borde con dedo o hilo y contar unidades; luego sumar lados. Fórmulas, π y costos en etapas posteriores. |
| Perímetros compuestos | 7 | Posponer cálculo formal | Las 7 unidades tienen visual; restar dos veces el lado compartido requiere entender el contorno externo. | Unir piezas y marcar solo el borde exterior; mostrar por qué la unión interna no cuenta. Recién después calcular. |
| Gráficos estadísticos | 2 | Explorar con apoyo | Puede exigir leer datos/etiquetas antes de comprender su representación. | Un dibujo por objeto, cantidades pequeñas, señalar dónde hay más/menos. Escalas de varios objetos por símbolo después. |
| Proporcionalidad y regla de tres | 2 | Posponer bloque formal | Presupone división, multiplicación y relación entre magnitudes. | Duplicar grupos pequeños y mantener la relación; construir una tabla con objetos. No comenzar con regla de tres ni cálculos como 600 ÷ 3. |
| Secuencias aritméticas | 2 | Explorar con apoyo | La diferencia constante necesita comprender cambios en cantidades. | Saltos visibles de +1 o +2 en recta; completar haciendo la acción. Cambios negativos y regla verbal después. |
| Secuencias geométricas y Fibonacci | 2 | Posponer bloque formal | Duplicar o sumar dos términos anteriores exige operaciones y memoria de pasos. | Colecciones que se duplican; conservar visibles los dos términos anteriores. Separar ambos tipos de secuencia. |
| Secuencias alfanuméricas y figuras | 2 | Explorar patrones simples con apoyo | Alternar reglas de letras y números suma carga a la lectura y al cálculo. | Repetir y completar patrones de objetos/formas, sin depender solo del color. Reglas alfanuméricas dobles después. |
| Ecuaciones con imágenes y dos incógnitas | 2 | Posponer bloque formal | Las etiquetas de imágenes y las cuentas no garantizan comprensión de igualdad o incógnita. | Comparar cantidades equilibradas y bolsas iguales con una incógnita; luego sustituir. Dos incógnitas al final. |

## Recorrido recomendado para comenzar

### 1. Encontrar el punto de partida sin examen

Hacer una observación breve, sin nota ni cronómetro, con 5–8 fichas y recipientes. Proponer una acción por vez, leyendo la consigna si hace falta:

- “Poné cinco fichas acá.” Reordenarlas y observar si reconoce que sigue habiendo cinco.
- Juntar tres y dos; retirar dos de seis. Observar qué hace, sin exigir un nombre técnico ni una cuenta escrita.
- Repartir seis entre dos recipientes; después probar otra cantidad, si está cómoda.

Registrar por separado: lo hizo sola, después de una demostración, con una pista, o todavía no lo observamos. Si una acción cuesta, enseñar ahí; no encadenar preguntas para medir cuánto falla. Si resulta sencilla, avanzar sin repetir innecesariamente. Una respuesta aislada no define su nivel.

### 2. Dos caminos que pueden convivir

**Cantidades y operaciones:** contar con significado → juntar/quitar/completar → construir grupos iguales → repartir y formar grupos → relacionar con símbolos → procedimientos y fluidez.

**Primeras fracciones:** reconocer un entero → separar en dos partes iguales → señalar una mitad → reconstruir el entero → explorar cuartos → comprobar que dos cuartos cubren una mitad del mismo entero. La notación y los nombres llegan asociados a lo que hizo. No requieren comenzar con MCM.

Se pueden intercalar figuras, mediciones reales y patrones sencillos. La prioridad de operaciones no debe convertir toda la experiencia en una larga recuperación repetitiva.

### 3. Ejemplo de una microlección de reparto

Objetivo: comprender que al repartir por igual todos reciben la misma cantidad.

1. **Mirá:** seis fichas y dos recipientes. Mostrar una ficha en el primero, una en el segundo, y continuar. Una frase: “Les damos la misma cantidad”.
2. **Hagámoslo:** volver a seis fichas. Abril decide dónde colocar la siguiente; el sistema muestra la acción, sin llenar todo automáticamente.
3. **Tu turno:** repartir cuatro entre dos, con la consigna leída si lo necesita. La interfaz registra acciones, no solo una opción final.
4. **Comprobemos:** señalar cuántas quedaron en cada recipiente y si recibieron lo mismo. Introducir `4 ÷ 2 = 2` solo si puede relacionarlo con la acción.

Si responde con números al azar, volver a mostrar y hacer; no ofrecer una cadena de “no” hasta llegar al resultado. Cerrar tras el trabajo realizado, incluso si necesita seguir acompañada otro día. Tres a cinco minutos es una referencia flexible, no un límite que apure.

`8/4` no debería ser el primer punto de entrada: puede introducirse como división una vez comprendido el reparto, y como ocho cuartos formando dos enteros cuando comprenda la unidad fraccionaria. No mezclar esas interpretaciones al iniciar.

## Plan de cambios priorizado

### P0 — Un comienzo realmente accesible

- Crear una entrada de observación y enseñanza para cantidades pequeñas, juntar/quitar, grupos y reparto. Números, cantidad de pasos y apoyo deben poder variar; no basta cambiar el tono del prompt.
- Dividir el inicio de fracciones en acciones sobre el mismo entero: partes iguales, mitad, reconstrucción, cuartos. Mostrar un concepto y una instrucción por pantalla.
- Incorporar “Mostrámelo”, “Hagámoslo juntos” y lectura de consigna. Mantener visibles los objetos durante pista y resolución.
- Guardar un perfil de evidencia por habilidad con “todavía no observado”, sin borrar estrellas, exámenes ni trabajo previo. Evitar que una misión guardada restaure automáticamente una actividad incompatible con la nueva entrada; ofrecer continuidad o una actividad de base conservando el historial.
- En repaso, disponer de otra representación o un paso anterior; no repetir invariablemente el mismo párrafo.

**Primer bloque de implementación recomendado:** reparto concreto y primeras mitades, con entrada por observación, ayuda de lectura y registro del procedimiento. Validarlo antes de extender el patrón a 140 unidades. El formato debe ser respetuoso de su edad, sin apariencia de material para bebés.

### P1 — Medir comprensión sin castigar la ayuda

- Conservar opciones cuando resulten útiles, pero sumar acciones: construir, señalar, repartir, ordenar o detectar una representación incorrecta.
- Separar acceso lector, demostración, pista matemática y respuesta independiente. Escuchar una consigna sin pistas no debe clasificarse automáticamente como ayuda matemática.
- Proponer una variante con otra cantidad o contexto y volver a la habilidad otro día. No resolver la debilidad cambiando “dos aciertos” por “cinco aciertos” del mismo formato.
- Mantener iguales recompensas por trabajo y separar comprensión, procedimiento, fluidez y preparación de examen en el registro pedagógico.
- Permitir explicar oralmente, señalar o dibujar; no exigir párrafos escritos para demostrar matemática. Una eventual grabación de voz requeriría una decisión específica de producto y privacidad; no es necesaria para este primer bloque.

### P2 — Aplicar el patrón al resto del currículo

- Reescribir cada tema conforme a la matriz: acción concreta → representación → vocabulario/símbolo → práctica guiada → aplicación independiente.
- Separar exploración de geometría, medidas y patrones de sus cálculos formales.
- Reservar algoritmos, MCM, operaciones con fracciones y problemas de varios pasos para cuando existan evidencias de sus requisitos relevantes.
- Mantener contenido y exámenes de ingreso como destino curricular, con un recorrido intermedio explícito. El material oficial orienta qué aprender; no determina por sí solo cómo enseñárselo ahora a Abril.

## Validación necesaria

La implementación se podrá verificar técnicamente: una consigna por paso, conservar ayudas visuales, guardar acciones, distinguir tipos de ayuda, reanudar sin perder trabajo y no promover por una respuesta con pista. Eso no demuestra eficacia pedagógica.

La validación con Abril deberá observar si entiende qué se le pide con menos intervención adulta, puede realizar la acción y resolver una variante, puede pedir ayuda sin quedar atrapada y termina con menos frustración. No hace falta que pronuncie “denominador” para demostrar una mitad. Sus observaciones y las de su docente deberían ajustar el recorrido. No fijar hoy un plazo para alcanzar todo el programa a partir de un solo episodio.

## Trazabilidad técnica

Archivos principales revisados:

- `src/lib/contenido-bases.js`: unidades, actividades y enriquecimientos posteriores.
- `src/lib/curriculum.js`: temas y prerrequisitos declarados.
- `src/lib/objetivos-pedagogicos.js`: catálogo activo y reglas de evidencia.
- `src/lib/acceso-temas.js` y `src/lib/metadatos-bases.js`: acceso y alcance de la ruta de bases.
- `src/pages/api/sesion/init.js` y `src/pages/api/sesion/respuesta.js`: selección, contenido revisado y evaluación.
- `src/components/PantallaSessionTutoria.jsx`, `ApoyoVisual.jsx`, `VisualizacionMatematica.jsx` y `src/lib/visualizaciones-seguras.js`: presentación y apoyos.

Inventario por identificador, en el orden del currículo:

| ID de tema | Primera unidad en ejecución | Actividades |
|---|---|---:|
| `numeros_naturales_sistema_decimal` | `mat_num_decenas` | 30 |
| `tablas_multiplicar_2_5` | `mat_tab_grupos` | 18 |
| `tablas_multiplicar_6_8` | `mat_tab_seis_ocho` | 12 |
| `tablas_multiplicar_9_10` | `mat_tab_diez` | 12 |
| `numeros_romanos` | `mat_rom_sumar` | 12 |
| `division_1_digito` | `mat_div_repartir` | 18 |
| `divisibilidad_primos_mcm_mcd` | `bases_multiplos_saltos` | 72 |
| `fracciones_concepto` | `frac_con_1_partes_iguales` | 66 |
| `fracciones_operaciones` | `frac_op_1_igual_denominador` | 54 |
| `fracciones_del_resto` | `mat_resto_entero` | 12 |
| `decimales_conversion` | `mat_dec_fraccion` | 102 |
| `potenciacion_y_raiz_cuadrada` | `mat_pot_repetir` | 12 |
| `jerarquia_operaciones` | `mat_jer_producto` | 12 |
| `si_me_la_longitud` | `mat_long_metros` | 60 |
| `si_me_la_masa_capacidad_tiempo` | `mat_med_masa_capacidad` | 72 |
| `geometria_angulos` | `prof_geo_elementos` | 60 |
| `geometria_triangulos` | `prof_fig_vertices` | 30 |
| `geometria_cuadrilateros_circunferencia` | `prof_fig_poligonos` | 24 |
| `perimetros_simples` | `mat_per_rectangulo` | 48 |
| `perimetros_compuestos` | `mat_per_union` | 42 |
| `graficos_estadisticos` | `mat_graf_leer` | 12 |
| `proporcionalidad_regla_3` | `mat_prop_unidad` | 12 |
| `secuencias_aritmeticas` | `mat_sec_salto` | 12 |
| `secuencias_geometricas_fibonacci` | `mat_sec_factor` | 12 |
| `secuencias_alfanumericas_y_figuras` | `mat_sec_ciclo` | 12 |
| `ecuaciones_con_imagenes_2_incognitas` | `mat_igual_simbolo` | 12 |

Las comprobaciones sintéticas confirmaron los recuentos, la igualdad de las explicaciones iniciales con/sin modo paciente, el gráfico automático del ejemplo de división y el acceso a los tres temas de bases sin aprobaciones. Son pruebas del comportamiento del programa, no pruebas del aprendizaje de Abril. El inventario y resultados están guardados en `C:/Users/gusta/.codex/visualizations/2026/09/09/01a086d6-a934-77a3-9a28-75f27a213064/auditoria-matematica-octubre/`.

## Fundamento y límites

La guía del [IES/What Works Clearinghouse sobre intervención matemática en primaria](https://ies.ed.gov/ncee/wwc/practiceguide/26) recomienda enseñanza sistemática, lenguaje matemático claro, representaciones concretas y semiconcretas, recta numérica e instrucción deliberada en problemas. Estas orientaciones apoyan la propuesta de conectar acciones, dibujos y símbolos. La decisión de comenzar sin presión de tiempo responde al caso relatado; no es una afirmación de que la guía prohíba actividades de fluidez cronometradas.

La guía de la [Education Endowment Foundation para Matemática en Key Stages 2 y 3](https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/maths-ks-2-3) destaca que conocer el contenido no basta: también importa comprender cómo aprende el alumnado y evaluar sus necesidades. Ninguna de estas guías evalúa a Abril ni garantiza que una modificación concreta vaya a funcionar sin observarla.

**Estado de entrega:** auditoría y perfil reutilizable del tutor completados. No se implementaron estos cambios en la app ni se realizó un despliegue durante esta revisión.
