import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  // Solo procesar peticiones POST (los webhooks de Mercado Pago son POST)
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }

  // 1. Extraer el Payment ID del webhook de Mercado Pago
  // Mercado Pago envía notificaciones en varios formatos. Soportamos todos:
  const paymentId = req.body?.data?.id || req.body?.id || req.query?.id;
  const action = req.body?.action || req.body?.type;

  console.log(`[webhook-mp] Recibida notificación. Action: ${action}, Payment ID: ${paymentId}`);

  if (!paymentId) {
    // Retornamos 200 para que Mercado Pago no intente re-enviar indefinidamente si es una notificación vacía
    return res.status(200).json({ status: "ignored", reason: "Falta payment ID" });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("[webhook-mp] MERCADOPAGO_ACCESS_TOKEN no configurada en el servidor.");
    return res.status(500).json({ error: "Configuración del servidor incompleta." });
  }

  try {
    // 2. Consultar el estado real del pago directamente en Mercado Pago para evitar fraudes/suplantación
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!mpRes.ok) {
      const errorText = await mpRes.text();
      console.error(`[webhook-mp] Error al consultar pago en MP (status ${mpRes.status}):`, errorText);
      return res.status(200).json({ status: "failed_to_query", reason: "Error al consultar pago en MP" });
    }

    const payment = await mpRes.json();
    console.log(`[webhook-mp] Pago consultado. Status: ${payment.status}, Metadata:`, payment.metadata);

    // 3. Si el pago NO está aprobado, ignoramos la activación pero respondemos 200 OK a MP
    if (payment.status !== "approved") {
      return res.status(200).json({ status: "ignored", reason: `Pago en estado: ${payment.status}` });
    }

    // 4. Extraer el user_id de los metadatos que inyectamos al crear el link de pago
    const userId = payment.metadata?.user_id || payment.metadata?.user_id_alumn;
    if (!userId) {
      console.warn("[webhook-mp] Pago aprobado pero sin user_id en metadatos.");
      return res.status(200).json({ status: "ignored", reason: "Pago aprobado sin user_id en metadata" });
    }

    // 5. Conectar con Supabase y actualizar el plan de "trial" a "full"
    const supabase = getSupabaseAdmin();
    const { data: usuario, error: userError } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError || !usuario) {
      console.error(`[webhook-mp] No se encontró el usuario en Supabase (user_id: ${userId}):`, userError);
      return res.status(200).json({ status: "user_not_found" });
    }

    // Combinar los rasgos especiales previos con el nuevo plan
    const nuevosRasgos = {
      ...(usuario.rasgos_especiales || {}),
      plan: "full",
    };

    // Actualizar rasgos_especiales en la base de datos
    assertSupabaseOk(
      await supabase
        .from("usuarios")
        .update({
          rasgos_especiales: nuevosRasgos,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId),
      "No se pudo actualizar el plan del usuario a Full"
    );

    console.log(`[webhook-mp] ¡ÉXITO! El plan del usuario ${usuario.nombre} (id: ${userId}) fue activado a FULL automáticamente.`);

    // 6. Retornar éxito a Mercado Pago
    return res.status(200).json({ status: "success", plan: "full", user_id: userId });
  } catch (error) {
    console.error("[webhook-mp] Error inesperado en el webhook:", error);
    // Retornamos 500 para indicar un fallo temporal de nuestro servidor y que MP vuelva a intentar más tarde si es necesario
    return res.status(500).json({ error: "Error interno en el webhook" });
  }
}
