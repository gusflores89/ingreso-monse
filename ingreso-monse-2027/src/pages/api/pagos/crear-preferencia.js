import { requireMethod } from "@/lib/http";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  // Validar método POST
  if (!requireMethod(req, res, "POST")) return;

  const { user_id } = req.body || {};
  if (!user_id) {
    return res.status(400).json({ error: "user_id es requerido." });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("[crear-preferencia] MERCADOPAGO_ACCESS_TOKEN no configurada en el servidor.");
    return res.status(500).json({ error: "Configuración de pagos incompleta en el servidor." });
  }

  try {
    const supabase = getSupabaseAdmin();

    // 1. Obtener los datos del alumno de Supabase
    let usuario = null;
    const cleanUserId = String(user_id).trim();
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanUserId);

    if (isUUID) {
      const { data, error } = await supabase.from("usuarios").select("*").eq("id", cleanUserId).single();
      if (!error && data) {
        usuario = data;
      }
    }

    if (!usuario) {
      const normalizedCode = cleanUserId.toUpperCase();
      const { data, error } = await supabase.from("usuarios").select("*").eq("codigo_acceso", normalizedCode).single();
      if (!error && data) {
        usuario = data;
      }
    }

    if (!usuario) {
      return res.status(404).json({ error: "No se encontró el alumno correspondiente." });
    }

    const price = process.env.PLAN_FULL_PRICE 
      ? parseInt(process.env.PLAN_FULL_PRICE, 10) 
      : 19900; // $19.900 ARS por defecto (pago único)

    let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ingresomonserrat.online";
    // Mercado Pago no permite localhost ni IPs locales para back_urls.
    // Forzamos el dominio de producción en local para que la API acepte la creación de la preferencia.
    if (siteUrl.includes("localhost") || siteUrl.includes("127.0.0.1")) {
      siteUrl = "https://www.ingresomonserrat.online";
    }

    // 2. Crear la preferencia de pago de Checkout Pro en Mercado Pago
    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            id: "ingresomonse_full_access",
            title: `💎 IngresoMonse - Acceso Completo para ${usuario.nombre}`,
            description: "Acceso completo e ilimitado a todos los temas de la currícula de ingreso, cuaderno físico y simulacros.",
            quantity: 1,
            currency_id: "ARS",
            unit_price: price,
          },
        ],
        payer: {
          name: usuario.nombre,
          email: usuario.email || "hola@ingresomonserrat.online",
        },
        metadata: {
          user_id: usuario.id,
        },
        back_urls: {
          success: `${siteUrl}/papas?user_id=${encodeURIComponent(usuario.id)}&pago=exitoso`,
          failure: `${siteUrl}/papas?user_id=${encodeURIComponent(usuario.id)}&pago=fallido`,
          pending: `${siteUrl}/papas?user_id=${encodeURIComponent(usuario.id)}&pago=pendiente`,
        },
        auto_return: "approved",
        // notification_url es la dirección que Mercado Pago llamará asincrónicamente para avisarnos del pago
        notification_url: `${siteUrl}/api/webhook/mercadopago`,
      }),
    });

    if (!mpRes.ok) {
      const errorText = await mpRes.text();
      console.error("[crear-preferencia] Error de Mercado Pago API:", errorText);
      throw new Error(`Error en la API de pagos: ${mpRes.status}`);
    }

    const preference = await mpRes.json();

    // 3. Devolver los links de pago (init_point de producción y sandbox_init_point de prueba)
    res.status(200).json({
      preference_id: preference.id,
      init_point: preference.init_point, // Enlace real
      sandbox_init_point: preference.sandbox_init_point, // Enlace de prueba
    });
  } catch (error) {
    console.error("[crear-preferencia] Error al crear preferencia de cobro:", error);
    res.status(500).json({ error: "No se pudo generar la orden de pago" });
  }
}
