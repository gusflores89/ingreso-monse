import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ingresomonserrat.online";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "IngresoMonse <onboarding@resend.dev>";

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
    { emoji: "&#128221;", name: "Tablas del 2 al 5" },
    { emoji: "&#128221;", name: "Ortografía B y V" },
    { emoji: "&#128221;", name: "Tablas del 6 al 8" },
    { emoji: "&#128221;", name: "Ortografía G y J" },
  ];

  const html = buildWelcomeHTML({ nombre, codigo_acceso, plan, trialTopics, siteUrl: SITE_URL });

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
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
        `<tr><td style="padding:8px 12px;font-size:15px;border-bottom:1px solid #f1f0fb;color:#e2dff5;">${t.emoji}&nbsp; ${t.name}</td></tr>`
    )
    .join("");

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
                      Acabamos de crear la cuenta de ${nombre} en <strong>IngresoMonse</strong>, un tutor personal con inteligencia artificial que prepara a tu hijo/a para el examen de ingreso al Colegio Nacional de Monserrat con sesiones adaptativas, explicaciones personalizadas y pr&aacute;ctica guiada.
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
                            ${nombre} usar&aacute; este c&oacute;digo para ingresar cada vez que quiera estudiar
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- QUÉ INCLUYE -->
                <tr>
                  <td style="padding:8px 36px 8px;">
                    <p style="margin:0 0 12px;font-size:16px;font-weight:700;color:#e2dff5;">
                      ${plan === "trial" ? "&#127873; Tu Plan de Prueba gratuito incluye:" : "&#128640; Tu Plan Completo incluye:"}
                    </p>
                  </td>
                </tr>
                ${
                  plan === "trial"
                    ? `<tr>
                  <td style="padding:0 36px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#15102e;border-radius:10px;border:1px solid #2d1b69;">
                      ${topicsHTML}
                    </table>
                    <p style="margin:12px 0 0;font-size:13px;color:#8b7fc7;line-height:1.5;">
                      Cada tema incluye lecciones adaptativas, pr&aacute;ctica guiada y un mini-examen. Si te gusta la experiencia, pod&eacute;s activar el plan completo con todos los temas del examen.
                    </p>
                  </td>
                </tr>`
                    : `<tr>
                  <td style="padding:0 36px 24px;">
                    <p style="font-size:15px;color:#b8b0d8;line-height:1.6;">
                      Acceso ilimitado a todos los temas del examen de ingreso: Matem&aacute;ticas, Lengua, Ciencias Sociales y Ciencias Naturales con pr&aacute;ctica adaptativa y ex&aacute;menes simulacro.
                    </p>
                  </td>
                </tr>`
                }

                <!-- CÓMO EMPEZAR -->
                <tr>
                  <td style="padding:8px 36px 8px;">
                    <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#e2dff5;">
                      &#128640; &iquest;C&oacute;mo empezar?
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 36px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:10px 0;font-size:15px;color:#b8b0d8;border-bottom:1px solid #1e1650;">
                          <strong style="color:#a78bfa;">1.</strong>&nbsp; Entr&aacute; a la plataforma desde el bot&oacute;n de abajo
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;font-size:15px;color:#b8b0d8;border-bottom:1px solid #1e1650;">
                          <strong style="color:#a78bfa;">2.</strong>&nbsp; ${nombre} elige su tutor favorito (Atenea, Nyx, Lux o B&uacute;ho)
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;font-size:15px;color:#b8b0d8;">
                          <strong style="color:#a78bfa;">3.</strong>&nbsp; Ingresa el c&oacute;digo <strong style="color:#ffffff;">${codigo_acceso}</strong> y &iexcl;a estudiar!
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CTA BUTTON -->
                <tr>
                  <td style="padding:8px 36px 36px;text-align:center;">
                    <a href="${siteUrl}" target="_blank" style="display:inline-block;padding:16px 48px;background:linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.5px;">
                      Empezar ahora &rarr;
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
                Este email fue enviado porque se registr&oacute; una cuenta en IngresoMonse.
              </p>
              <p style="margin:0;font-size:13px;color:#6b63a0;">
                &iquest;Dudas? Respond&eacute; este email o escribinos.
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
