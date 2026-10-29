# Ingreso Monse

Práctica de Matemática y Lengua para el ingreso al Colegio Nacional de Monserrat. La app no está afiliada al colegio ni a la Universidad Nacional de Córdoba.

## Precio del Acceso Completo

Hay un solo precio, en pesos argentinos. El valor por defecto está en `src/lib/precio.js` (`19900`, es decir $19.900). La pantalla de pago y Mercado Pago usan la misma función.

Para cobrar otro importe, definí en Vercel:

```bash
PLAN_FULL_PRICE=24900
```

Ese número es el monto en pesos, no centavos. Si no está definido, se sigue cobrando $19.900. No hace falta cambiar el código para pasar a $24.900 o $29.900.

## Simulacros

Con Acceso Completo, cada estudiante puede empezar simulacros de 60 minutos de Matemática o de Lengua, armados con ejercicios de opción múltiple que ya están en la plataforma. Al terminar ve el puntaje. No son el examen oficial.

## Analítica opcional

Los scripts no se cargan si la variable no está definida.

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel: PageView, CompleteRegistration al crear la cuenta gratuita, InitiateCheckout y Purchase cuando Mercado Pago confirma el pago. |
| `META_CAPI_ACCESS_TOKEN` | Conversions API en el servidor. Si no está, el pixel del navegador igual puede funcionar. No se envían nombre ni email del estudiante. |
| `META_TEST_EVENT_CODE` | Código de eventos de prueba de Meta, opcional. |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity. |

En Vercel, las variables `NEXT_PUBLIC_*` tienen que existir en el momento del build.

## Textos legales

`/terminos`, `/privacidad` y `/arrepentimiento` son borradores. Hay que revisarlos con un abogado antes de usarlos como versión final. Los datos del responsable son marcadores: `[NOMBRE O RAZÓN SOCIAL]`, `[EMAIL DE CONTACTO]`, `[CUIT]`, `[DOMICILIO EN ARGENTINA]` y `[TELÉFONO]`, en `src/lib/legal.js`.

Para que el Botón de Arrepentimiento envíe el pedido por email:

```bash
CONTACTO_LEGAL_EMAIL=contacto@ejemplo.com
RESEND_API_KEY=...
RESEND_FROM_EMAIL=IngresoMonse <hola@ingresomonserrat.online>
```

Sin esas variables, la página explica que el canal todavía no está configurado y muestra el email marcador de posición.

La cuenta gratuita pide el consentimiento de una persona adulta responsable. La base de datos ante la AAIP figura como pendiente en el borrador de privacidad.

## Otras variables que ya usa el proyecto

`MERCADOPAGO_ACCESS_TOKEN`, `NEXT_PUBLIC_SITE_URL`, `MONSE_AUTH_SECRET`, `MONSE_ADMIN_PASSWORD` y las de Supabase no se modifican desde este repositorio. `/admin-test` responde 404 si no hay sesión de admin (hay que entrar antes por `/admin`).

## Desarrollo

```bash
npm install
npm test
npm run lint
npm run build
```
