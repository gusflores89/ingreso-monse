import { requireAccess } from "@/lib/access";
import { Resend } from "resend";

export default async function handler(req, res) {
  if (!requireAccess(req, res, ["admin"])) return;

  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: "RESEND_API_KEY no está configurada en Vercel" });
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: "IngresoMonse <onboarding@resend.dev>",
      to: ["gus.flores89@gmail.com"],
      subject: "🎓 Test de email - IngresoMonse",
      html: "<h1>¡Funciona!</h1><p>Si ves esto, el email está configurado correctamente.</p>",
    });

    if (error) {
      return res.status(400).json({ ok: false, resend_error: error });
    }

    return res.status(200).json({ ok: true, email_id: data?.id, message: "Email enviado a gus.flores89@gmail.com" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Error interno del servidor" });
  }
}
