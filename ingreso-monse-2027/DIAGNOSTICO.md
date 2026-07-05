# Diagnóstico de la Aplicación IngresoMonserrat 2027

## 1. Funcionamiento General
La aplicación es una plataforma de tutoría basada en IA (usando Next.js, React, Supabase y OpenRouter) que ayuda a estudiantes a prepararse para el ingreso al Colegio Nacional de Monserrat. Cuenta con dos vistas principales:
*   **Tutoría:** El estudiante interactúa con un agente (Búho, Atenea, etc.) que le proporciona lecciones, ejercicios prácticos, tareas manuscritas y simulacros de examen.
*   **Dashboard para Padres:** Un panel donde los tutores pueden observar el progreso, revisar las métricas, verificar las alertas y realizar acciones pedagógicas (activar "ruta flexible" o "modo paciente").

## 2. Bugs Encontrados y Solucionados
1.  **Inconsistencia en los Temas del Plan Trial (`TRIAL_TOPICS`)**:
    *   **Problema:** En `src/lib/planes.js`, `TRIAL_TOPICS` estaba definido con `["fracciones_del_resto", "graficos_estadisticos", "comprension_lectora_literal_inferida", "ortografia_b_v"]`. Sin embargo, en `src/pages/api/sesion/init.js`, dentro de la función `getUnlockedTopics`, había una constante local que redefinía los temas del trial como `["tablas_multiplicar_2_5", "division_1_digito", "fracciones_concepto", "ortografia_b_v"]`.
    *   **Impacto:** Esto causaba que los usuarios en plan "trial" vieran una inconsistencia entre lo que el dashboard les marcaba como temas de prueba y los temas que realmente podían desbloquear o practicar en la API.
    *   **Solución:** Se eliminó la redefinición local en `init.js` para usar directamente la variable importada de `lib/planes.js`.
2.  **Duplicación de Lógica de Desbloqueo de Fases**:
    *   **Problema:** La lógica que determina si una "Fase" del currículum está desbloqueada (basado en la cantidad de exámenes finales aprobados) estaba duplicada y fuertemente acoplada en `src/pages/api/progreso.js` y `src/pages/api/sesion/init.js`.
    *   **Impacto:** Dificulta el mantenimiento; si cambian los requisitos para avanzar de fase, hay que modificar múltiples lugares corriendo riesgo de discrepancias.
    *   **Solución Recomendada/Implementada:** Extraer la función `isPhaseUnlocked` y su cálculo subyacente hacia un archivo compartido (como `lib/curriculum.js` o `lib/planes.js`).

## 3. Oportunidades de Mejora y Riesgos Potenciales
*   **Ausencia de validación profunda en la IA**: Al parsear el JSON desde OpenRouter, si bien se manejan errores, la aplicación confía bastante en que el modelo (Claude) seguirá la estructura JSON esperada. Si el LLM falla, el estudiante podría recibir un error genérico o bloquearse en la sesión. Implementar un fallback estático para cada tema sería ideal.
*   **Carga de progreso pesada**: En `api/admin/usuarios.js`, se cargan todos los usuarios y luego sus sesiones (`limit 500`). Con el tiempo y el uso intensivo, esto no escalará. Se debería implementar paginación en el panel de administrador.
*   **Gestión de Tareas Manuscritas**: Actualmente las imágenes (o resultados de tareas manuscritas) requieren de revisión manual diferida en el panel de padres. Podría integrarse un modelo multimodal (Visión) para pre-evaluar o asistir al padre en la corrección de caligrafía y resolución de dictados.
*   **Mejor Feedback Visual**: En el frontend, durante el tiempo que la IA genera la respuesta (`callOpenRouter`), puede tomar varios segundos. Refinar la UI con "skeletons" o mensajes tipo "El búho está pensando..." reducirá la ansiedad del estudiante.

## Conclusión
La base de código está bien estructurada utilizando Next.js y el modelo de API Routes funciona correctamente junto con Supabase para almacenamiento. Los arreglos propuestos sobre la unificación de constantes (`TRIAL_TOPICS`) y el secado (DRY) de la lógica de fases asegurarán mayor robustez.
