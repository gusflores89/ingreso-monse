# Primera implementación del plan — 11 de septiembre de 2026

## Alcance

Primer bloque de confiabilidad (R1). No cierra el plan completo ni toda la etapa 1. Se conservan el historial y las aprobaciones existentes. No hubo migraciones ni pruebas sobre la cuenta de Abril.

## Cambios comprobados

- Corrección: conserva signos, figuras, operadores y tildes significativas; acepta equivalencia exacta de fracciones y coma decimal. Las variantes de miles deben estar declaradas en la clave. B/V nuevo presenta un campo por hueco; las actividades antiguas conservan su contrato al corregirse.
- Una clave o examen ausente y una devolución inválida de IA producen un error recuperable, sin inventar aprobación ni registrar un error académico por la devolución inválida.
- Los dibujos automáticos se muestran solo para operaciones reconocidas sin valores de ejemplo. En los demás casos se omiten. Multiplicaciones sin recorte de filas; división con cantidades y grupos legibles; sin resultado impreso durante la práctica independiente.
- La corrección verifica la identidad firmada y la propiedad real de la sesión, no el usuario declarado en el cuerpo del pedido.
- Abrir teoría registra ayuda antes de mostrarla. Un acierto posterior conserva asistencia en el servidor, aunque el cliente envíe false. Un error previo también conserva asistencia. Esto no completa aún la separación de modos ni el tratamiento de todos los exámenes asistidos.
- Se retiran las claves estructuradas de las respuestas HTTP de inicio de examen. Revisar claves incrustadas en prosa y otros formatos forma parte del trabajo restante.
- Respaldo y Git local: base a86d814. No se incorporaron secretos ni bibliografía al commit o al despliegue.

## Evidencia y cómo repetir

`npm test`: 19 casos de R1 y 9 del recorrido de la H, aprobados. Ejecuta funciones y controladores reales; servicios de IA y base simulados. Incluye identidad firmada de prueba, rechazo de otra cuenta, respuesta inválida sin escrituras y ayuda seguida de acierto.

Compilación de producción local: correcta. Prueba de interfaz con Edge y API interceptada: seis casos aprobados (multiplicación, ayuda, 42 elementos sin recorte, división, B/V y ancho móvil). Capturas y scripts en la carpeta de evidencias de esta entrega.

Las pruebas no demuestran la calidad de nuevas generaciones reales de IA. Las tres llamadas externas planteadas en la auditoría siguen sin ejecutarse, pendientes de autorización específica.

## Seguimiento A01–A14

| Hallazgo | Estado tras este bloque | Pendiente |
|---|---|---|
| A01 Corrección | Contraejemplos corregidos | Extender tipado, unidades y rúbricas de producción abierta; casos legados |
| A02 Dibujos | Contraejemplos corregidos u omitidos | Datos compartidos con cada consigna, visuales de tiempo, impropias y otros temas |
| A03 Independencia | Parcial | Modos explícitos; todas las ayudas/exámenes y concurrencia atómica |
| A04 Propiedad | Corregido en respuesta y nueva ayuda | Mantener pruebas de identidad en ampliaciones |
| A05 Contenido | Pendiente | Recorrido revisado y 32 fichas restantes |
| A06 Dominio antiguo | Pendiente | Evidencias recientes y repaso espaciado |
| A07 Prerrequisitos | Pendiente | Función compartida y ruta basada en habilidades |
| A08 Persistencia | Pendiente | Cambio explícito de tema, almacenamiento fallido y cambio de día |
| A09 Progreso con ayuda | Pendiente | Distinguir éxito de autonomía en los porcentajes |
| A10 Duración | Pendiente | Actividades compatibles con sesiones breves |
| A11 Revisión familiar | Pendiente | Cola y cierre de producciones escritas |
| A12 Simulacro | Pendiente | Exámenes oficiales identificados y recorrido real |
| A13 Recompensas | Pendiente | Estrellas por misión y racha calculada |
| A14 Robustez | Parcial | Idempotencia atómica de envíos, límites por llamadas, validación de lecciones y CI |

## Siguiente bloque

Completar la seguridad de envíos repetidos y el registro de asistencia, corregir los requisitos de acceso y el dominio reciente; construir el recorrido de partes iguales → fracciones → equivalencias → múltiplos → MCM, con enseñanza antes de cada práctica. Después completar continuidad de misiones y material por lotes. No dar por cerrado un hallazgo pendiente por haber pasado la compilación.
