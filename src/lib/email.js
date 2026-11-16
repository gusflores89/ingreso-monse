import { Resend } from "resend";

let resendClient = null;

function getResendClient() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY no está configurada.");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ingresomonserrat.online";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "IngresoMonse <hola@ingresomonserrat.online>";

/**
 * Envia el email de bienvenida al registrar un nuevo alumno.
 * Disenado para ser llamado fire-and-forget (sin await bloqueante).
 */
export async function sendWelcomeEmail({ nombre, email, codigo_acceso, plan = "trial" }) {
  if (!email) {
    console.log("[email] No se envia bienvenida: usuario sin email.");
    return null;
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY no configurada. Email de bienvenida omitido.");
    return null;
  }

  const trialTopics = [
    { emoji: "&#128290;", name: "Números Naturales y Sistema Decimal" },
    { emoji: "&#10006;&#65039;", name: "Tablas de Multiplicar (2 al 5)" },
    { emoji: "&#9997;&#65039;", name: "Ortografía: Uso de B y V" },
    { emoji: "&#128214;", name: "Comprensión Lectora" },
  ];

  const html = buildWelcomeHTML({ nombre, codigo_acceso, plan, trialTopics, siteUrl: SITE_URL });

  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      replyTo: "gus.flores89@gmail.com",
      subject: `🎓 ¡Bienvenido/a a IngresoMonse, familia de ${nombre}!`,
      html,
    });

    if (error) {
      console.error("[email] Error de Resend:", error);
      return null;
    }

    console.log(`[email] Bienvenida enviada a ${email} (id: ${data?.id})`);
    return data;
  } catch (err) {
    console.error("[email] Fallo al enviar bienvenida:", err.message);
    return null;
  }
}

function buildWelcomeHTML({ nombre, codigo_acceso, plan, trialTopics, siteUrl }) {
  const topicsHTML = trialTopics
    .map(
      (t) =>
        `<tr><td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #2d1b69;color:#e2dff5;">${t.emoji}&nbsp; ${t.name}</td></tr>`
    )
    .join("");

  const parentUrl = `${siteUrl}/papas?user_id=${encodeURIComponent(codigo_acceso)}`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Bienvenido a IngresoMonse</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0b1e;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e2dff5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0b1e;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="padding:32px 36px 24px;background:linear-gradient(135deg,#1a1140 0%,#2d1b69 50%,#4c1d95 100%);border-radius:16px 16px 0 0;text-align:center;">
              <div style="font-size:48px;margin-bottom:12px;">&#127891;</div>
              <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
                &iexcl;Bienvenidos a IngresoMonse!
              </h1>
              <p style="margin:0;font-size:15px;color:#c4b5fd;line-height:1.5;">
                La plataforma de preparaci&oacute;n inteligente para el ingreso a Monserrat
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1242;border-left:1px solid #2d1b69;border-right:1px solid #2d1b69;">

                <!-- SALUDO -->
                <tr>
                  <td style="padding:32px 36px 16px;">
                    <p style="margin:0 0 16px;font-size:17px;line-height:1.6;color:#e2dff5;">
                      &iexcl;Hola, familia de <strong style="color:#a78bfa;">${nombre}</strong>! &#128075;
                    </p>
                    <p style="margin:0;font-size:15px;line-height:1.6;color:#b8b0d8;">
                      Acabamos de crear la cuenta de ${nombre} en <strong>IngresoMonse</strong>. Dise&ntilde;amos esta gu&iacute;a r&aacute;pida de onboarding en tres pasos sencillos para que le saquen el m&aacute;ximo provecho a la plataforma:
                    </p>
                  </td>
                </tr>

                <!-- CÓDIGO DE ACCESO -->
                <tr>
                  <td style="padding:16px 36px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#312e81 0%,#4c1d95 100%);border-radius:12px;border:1px solid #5b21b6;">
                      <tr>
                        <td style="padding:24px;text-align:center;">
                          <p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:1.5px;color:#a78bfa;font-weight:600;">
                            C&oacute;digo de acceso del alumno
                          </p>
                          <p style="margin:0;font-size:36px;font-weight:800;color:#ffffff;letter-spacing:4px;font-family:'Courier New',monospace;">
                            ${codigo_acceso}
                          </p>
                          <p style="margin:12px 0 0;font-size:13px;color:#8b7fc7;">
                            Guard&aacute; este c&oacute;digo. Tu hijo/a lo usar&aacute; cada vez que ingrese a estudiar.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- ONBOARDING DE PADRES -->
                <tr>
                  <td style="padding:8px 36px 24px;">
                    <h2 style="margin:0 0 16px;font-size:18px;font-weight:700;color:#ffffff;border-bottom:1px solid #2d1b69;padding-bottom:8px;">
                      🚀 Gu&iacute;a de Onboarding Familiar
                    </h2>

                    <!-- PASO 1 -->
                    <div style="margin-bottom:20px;">
                      <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#a78bfa;">
                        Paso 1: Tu hijo/a estudia en la web (Portal del alumno)
                      </p>
                      <p style="margin:0;font-size:14px;color:#b8b0d8;line-height:1.5;">
                        Tu hijo/a puede ingresar desde cualquier tablet o computadora entrando a <a href="${siteUrl}" target="_blank" style="color:#a78bfa;text-decoration:underline;">ingresomonserrat.online</a>. All&iacute; podr&aacute; elegir su tutor favorito (Atenea, Nyx, Lux o B&uacute;ho), escribir su c&oacute;digo <strong style="color:#ffffff;">${codigo_acceso}</strong> y la contrase&ntilde;a familiar para empezar a practicar.
                      </p>
                    </div>

                    <!-- PASO 2 -->
                    <div style="margin-bottom:20px;">
                      <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#a78bfa;">
                        Paso 2: Supervis&aacute; su progreso (Tu Panel de Padres)
                      </p>
                      <p style="margin:0;font-size:14px;color:#b8b0d8;line-height:1.5;">
                        Hemos creado un panel exclusivo para vos. Acced&eacute; directamente desde tu celular ingresando a:
                        <br />
                        <a href="${parentUrl}" target="_blank" style="color:#3b82f6;text-decoration:underline;word-break:break-all;font-size:13px;font-weight:600;">
                          ${parentUrl}
                        </a>
                        <br />
                        <span style="color:#8b7fc7;font-size:13px;">💡 <strong>Recomendaci&oacute;n:</strong> Abr&iacute; ese enlace en el navegador de tu celular y guardalo en marcadores o favoritos para abrirlo con un toque cuando quieras ver sus tasas de acierto y reportes cualitativos de IA.</span>
                      </p>
                    </div>

                    <!-- PASO 3 -->
                    <div style="margin-bottom:12px;">
                      <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#a78bfa;">
                        Paso 3: Tareas en su cuaderno real (Tu rol activo)
                      </p>
                      <p style="margin:0;font-size:14px;color:#b8b0d8;line-height:1.5;">
                        Para que no todo sea pantallas y practique caligraf&iacute;a, ortograf&iacute;a o dictados, el tutor de IA le pedir&aacute; ocasionalmente realizar **ejercicios escritos en su cuaderno real**. 
                        <br />
                        Cuando el estudiante marque la tarea en su pantalla, en tu **Panel de Padres** ver&aacute;s aparecer la consigna para calificarla con un clic: <strong style="color:#ffffff;">&quot;Correcta&quot;</strong> o <strong style="color:#ffffff;">&quot;Con errores&quot;</strong> (pudiendo escribirle notas). Esto retroalimenta a la IA del tutor para que vuelva a repasar esas dificultades espec&iacute;ficas en la pantalla digital.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- QUÉ INCLUYE EL PLAN -->
                <tr>
                  <td style="padding:16px 36px 24px;background-color:#15102e;border-top:1px solid #2d1b69;border-bottom:1px solid #2d1b69;">
                    <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#e2dff5;">
                      ${plan === "trial" ? "&#127873; Su Muestra Gratuita incluye:" : "&#128640; Su Plan Completo incluye:"}
                    </p>
                    ${
                      plan === "trial"
                        ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0b1e;border-radius:10px;border:1px solid #2d1b69;margin-bottom:12px;">
                          ${topicsHTML}
                        </table>
                        <p style="margin:0;font-size:13px;color:#8b7fc7;line-height:1.5;">
                          Cada uno de estos 4 temas de prueba incluye lecciones guiadas por la IA y un mini-examen final para comprobar el avance.
                        </p>`
                        : `<p style="margin:0;font-size:14px;color:#b8b0d8;line-height:1.6;">
                          Acceso ilimitado a los m&aacute;s de 37 temas del curr&iacute;culum completo de ingreso (Matem&aacute;ticas y Lengua) con pr&aacute;ctica digital adaptativa, cuaderno f&iacute;sico y ex&aacute;menes simulacro.
                        </p>`
                    }
                  </td>
                </tr>

                <!-- CTA BUTTON -->
                <tr>
                  <td style="padding:32px 36px 36px;text-align:center;">
                    <a href="${siteUrl}" target="_blank" style="display:inline-block;padding:16px 48px;background:linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.5px;">
                      Empezar a estudiar ahora &rarr;
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:24px 36px;background-color:#130e2b;border-radius:0 0 16px 16px;border-left:1px solid #2d1b69;border-right:1px solid #2d1b69;border-bottom:1px solid #2d1b69;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:#6b63a0;">
                Este email fue enviado porque se registr&oacute; una cuenta en ingresomonserrat.online.
              </p>
              <p style="margin:0;font-size:13px;color:#6b63a0;">
                &iquest;Dudas? Respond&eacute; directamente a este correo para comunicarte con nosotros.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendReactivationEmail({
  nombre,
  email,
  codigo_acceso,
  nombre_tutor = "Maomao",
  tema_actual = "numeros_naturales_sistema_decimal",
}) {
  if (!email) {
    throw new Error("El estudiante no tiene email cargado.");
  }
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY no está configurada en el entorno.");
  }

  const temaLegible = String(tema_actual || "numeros_naturales_sistema_decimal").replaceAll("_", " ");
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Novedades en IngresoMonse</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f1f5f9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;">
    <tr>
      <td align="center" style="padding:36px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1e293b;border-radius:16px;border:1px solid #334155;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px;background:linear-gradient(135deg,#064e3b 0%,#0f766e 100%);text-align:center;">
              <h1 style="margin:0 0 6px;font-size:24px;color:#ffffff;">&#127775; &iexcl;${nombre_tutor} espera a ${nombre}!</h1>
              <p style="margin:0;font-size:14px;color:#a7f3d0;">Nuevas mejoras para entrenar rumbo al ingreso al Monserrat</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#e2e8f0;">
                &iexcl;Hola, familia de <strong>${nombre}</strong>! Vimos que ya crearon su cuenta en <strong>IngresoMonse</strong> (tema actual: <em style="text-transform:capitalize;">${temaLegible}</em>) y queremos contarles las mejoras que acabamos de activar:
              </p>
              <ul style="margin:0 0 18px;padding-left:20px;color:#cbd5e1;font-size:14px;line-height:1.65;">
                <li><strong>&#129517; Ruta de Escalones visible:</strong> Ahora ${nombre} ve paso a paso en qu&eacute; habilidad est&aacute; y qu&eacute; destraba al avanzar.</li>
                <li><strong>&#9889; Bot&oacute;n de Salto de Nivelaci&oacute;n:</strong> Si los primeros ejercicios iniciales le resultan muy f&aacute;ciles, puede probar una evaluaci&oacute;n r&aacute;pida de 2 preguntas para saltar directo a su nivel real de 5to/6to grado.</li>
                <li><strong>&#127963; Mini-Simulacro Monserrat:</strong> Preguntas integradoras de Matem&aacute;tica y Lengua disponibles desde el mapa de temas.</li>
              </ul>
              <div style="background:#0f172a;border:1px solid #38bdf8;border-radius:12px;padding:16px;text-align:center;margin-bottom:22px;">
                <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:#38bdf8;font-weight:700;">C&oacute;digo de acceso</p>
                <p style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:4px;font-family:monospace;">${codigo_acceso}</p>
              </div>
              <div style="text-align:center;">
                <a href="${SITE_URL}" target="_blank" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;border-radius:10px;">
                  Ingresar ahora &rarr;
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px;background:#0f172a;border-top:1px solid #334155;text-align:center;font-size:12px;color:#94a3b8;">
              Pod&eacute;s responder este correo si necesit&aacute;s ayuda para ubicar el nivel ideal de ${nombre}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const resend = getResendClient();
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    replyTo: "gus.flores89@gmail.com",
    subject: `🌟 ¡${nombre_tutor} espera a ${nombre} con nuevas funciones en IngresoMonse!`,
    html,
  });

  if (error) {
    throw new Error(error.message || "Error de Resend al enviar recordatorio.");
  }
  return data;
}
