import { requireMethod } from "@/lib/http";
import { requireAccess, requireOwnership } from "@/lib/access";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { loadUser, loadUserByCode } from "@/lib/usuarios";
import { getPremiosConfig, calcularBalanceEstrellas, INSIGNIAS_ANIME } from "@/lib/premios";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");
  if (!requireMethod(req, res, ["GET", "POST"])) return;
  if (req.method === "POST" && !requireAccess(req, res, ["admin", "student"])) return;

  const userId = req.method === "GET" ? req.query?.user_id : req.body?.user_id;
  if (!userId) {
    return res.status(400).json({ error: "user_id es requerido." });
  }

  try {
    const supabase = getSupabaseAdmin();

    let usuario = null;
    const cleanUserId = String(userId).trim();
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
    if (req.method === "POST" && !requireOwnership(req, res, resolvedUserId)) return;

    // Obtener estrellas totales desde continuidad_misiones
    let estrellasTotales = 0;
    try {
      const { data: cont } = await supabase
        .from("continuidad_misiones")
        .select("estado")
        .eq("user_id", resolvedUserId)
        .maybeSingle();
      if (cont?.estado?.estrellas) {
        estrellasTotales = cont.estado.estrellas;
      }
    } catch {}

    const rasgos = usuario.rasgos_especiales || {};
    estrellasTotales = Math.max(estrellasTotales, rasgos.estrellas_totales || 0);

    if (req.method === "GET") {
      const premios = getPremiosConfig(usuario);
      const balance = calcularBalanceEstrellas(usuario, estrellasTotales);
      return res.status(200).json({
        ok: true,
        premios_config: premios,
        canjes: balance.canjes,
        canjes_pendientes: balance.canjesPendientes,
        canjes_entregados: balance.canjesEntregados,
        estrellas_totales: balance.estrellasTotales,
        estrellas_gastadas: balance.estrellasGastadas,
        estrellas_disponibles: balance.estrellasDisponibles,
        insignias: INSIGNIAS_ANIME
      });
    }

    // POST: Acciones de administración familiar
    const { action, canje_id, premios_config } = req.body || {};
    const canjesActuales = Array.isArray(rasgos.canjes) ? [...rasgos.canjes] : [];

    if (action === "marcar_entregado") {
      if (!canje_id) return res.status(400).json({ error: "canje_id requerido." });
      const idx = canjesActuales.findIndex((c) => c.id === canje_id);
      if (idx === -1) return res.status(404).json({ error: "Canje no encontrado." });

      canjesActuales[idx] = {
        ...canjesActuales[idx],
        estado: "entregado",
        fecha_entrega: new Date().toISOString()
      };

      const updatedRasgos = { ...rasgos, canjes: canjesActuales };
      assertSupabaseOk(
        await supabase
          .from("usuarios")
          .update({ rasgos_especiales: updatedRasgos, updated_at: new Date().toISOString() })
          .eq("id", resolvedUserId),
        "No se pudo actualizar el estado del canje"
      );

      return res.status(200).json({ ok: true, canjes: canjesActuales });
    }

    if (action === "cancelar_canje") {
      if (!canje_id) return res.status(400).json({ error: "canje_id requerido." });
      const filtrados = canjesActuales.filter((c) => c.id !== canje_id);
      const updatedRasgos = { ...rasgos, canjes: filtrados };
      assertSupabaseOk(
        await supabase
          .from("usuarios")
          .update({ rasgos_especiales: updatedRasgos, updated_at: new Date().toISOString() })
          .eq("id", resolvedUserId),
        "No se pudo cancelar el canje"
      );

      const balance = calcularBalanceEstrellas({ ...usuario, rasgos_especiales: updatedRasgos }, estrellasTotales);
      return res.status(200).json({ ok: true, canjes: filtrados, balance });
    }

    if (action === "guardar_premios") {
      if (!Array.isArray(premios_config)) {
        return res.status(400).json({ error: "premios_config debe ser una lista de premios." });
      }

      const updatedRasgos = { ...rasgos, premios_config };
      assertSupabaseOk(
        await supabase
          .from("usuarios")
          .update({ rasgos_especiales: updatedRasgos, updated_at: new Date().toISOString() })
          .eq("id", resolvedUserId),
        "No se pudo guardar la lista de premios familiares"
      );

      return res.status(200).json({ ok: true, premios_config });
    }

    return res.status(400).json({ error: "Acción no reconocida." });
  } catch (error) {
    console.error("[api/premios/admin] Error:", error);
    return res.status(500).json({ error: "Error interno al gestionar premios familiares." });
  }
}
