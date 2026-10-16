import { requireMethod } from "@/lib/http";
import { requireAccess, requireOwnership } from "@/lib/access";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { loadUser, loadUserByCode } from "@/lib/usuarios";
import { getPremiosConfig, calcularBalanceEstrellas } from "@/lib/premios";
import crypto from "crypto";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const { user_id, premio_id, estrellas_totales_cliente } = req.body || {};
  if (!user_id || !premio_id) {
    return res.status(400).json({ error: "user_id y premio_id son requeridos." });
  }

  try {
    const supabase = getSupabaseAdmin();

    let usuario = null;
    const cleanUserId = String(user_id).trim();
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanUserId);

    if (isUUID) {
      const { data, error } = await loadUser(supabase, cleanUserId);
      if (!error && data) usuario = data;
    }
    if (!usuario) {
      const { data, error } = await loadUserByCode(supabase, cleanUserId.toUpperCase());
      if (!error && data) usuario = data;
    }

    if (!usuario) {
      return res.status(404).json({ error: "Estudiante no encontrado." });
    }

    const resolvedUserId = usuario.id;
    if (!requireOwnership(req, res, resolvedUserId)) return;

    // Obtener estrellas totales: desde continuidad_misiones o cliente
    let estrellasTotales = Number(estrellas_totales_cliente) || 0;
    try {
      const { data: cont } = await supabase
        .from("continuidad_misiones")
        .select("estado")
        .eq("user_id", resolvedUserId)
        .maybeSingle();
      if (cont?.estado?.estrellas && cont.estado.estrellas > estrellasTotales) {
        estrellasTotales = cont.estado.estrellas;
      }
    } catch {}

    const premios = getPremiosConfig(usuario);
    const premioElegido = premios.find((p) => p.id === premio_id);
    if (!premioElegido) {
      return res.status(404).json({ error: "El premio seleccionado no existe en el cofre familiar." });
    }

    const balance = calcularBalanceEstrellas(usuario, estrellasTotales);
    if (balance.estrellasDisponibles < premioElegido.estrellas) {
      return res.status(400).json({
        error: `Necesitás ${premioElegido.estrellas} estrellas pero tenés ${balance.estrellasDisponibles} disponibles para canjear. ¡Seguí practicando para alcanzarlo!`,
        balance
      });
    }

    const nuevoCanje = {
      id: crypto.randomUUID(),
      premio_id: premioElegido.id,
      titulo: premioElegido.titulo,
      icono: premioElegido.icono || "🎁",
      estrellas: premioElegido.estrellas,
      fecha_solicitud: new Date().toISOString(),
      estado: "pendiente",
      fecha_entrega: null
    };

    const rasgos = usuario.rasgos_especiales || {};
    const canjesActuales = Array.isArray(rasgos.canjes) ? rasgos.canjes : [];
    const updatedCanjes = [nuevoCanje, ...canjesActuales];

    const updatedRasgos = {
      ...rasgos,
      estrellas_totales: Math.max(estrellasTotales, rasgos.estrellas_totales || 0),
      canjes: updatedCanjes
    };

    assertSupabaseOk(
      await supabase
        .from("usuarios")
        .update({
          rasgos_especiales: updatedRasgos,
          updated_at: new Date().toISOString()
        })
        .eq("id", resolvedUserId),
      "No se pudo registrar el canje en la cuenta"
    );

    const balanceActualizado = calcularBalanceEstrellas({ ...usuario, rasgos_especiales: updatedRasgos }, estrellasTotales);

    return res.status(200).json({
      ok: true,
      canje: nuevoCanje,
      balance: balanceActualizado,
      mensaje: `¡Felicitaciones! Canjeaste "${premioElegido.titulo}". Quedó registrado para que mamá y papá te lo entreguen.`
    });
  } catch (error) {
    console.error("[api/premios/canjear] Error:", error);
    return res.status(500).json({ error: "Error interno al procesar el canje." });
  }
}
