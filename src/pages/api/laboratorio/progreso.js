import { requireMethod } from "@/lib/http";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { loadUser, loadUserByCode } from "@/lib/usuarios";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");
  if (!requireMethod(req, res, ["GET", "POST"])) return;

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
    const rasgos = usuario.rasgos_especiales || {};
    const labData = rasgos.laboratorio || {
      formulas_completadas: 0,
      racha_actual: 0,
      insignias: [],
      historial: [],
      salvoconducto_ganado: false,
    };

    // Estrellas actuales
    let estrellasTotales = rasgos.estrellas_totales || 0;
    try {
      const { data: cont } = await supabase
        .from("continuidad_misiones")
        .select("estado")
        .eq("user_id", resolvedUserId)
        .maybeSingle();
      if (cont?.estado?.estrellas) {
        estrellasTotales = Math.max(estrellasTotales, cont.estado.estrellas);
      }
    } catch {}

    if (req.method === "GET") {
      return res.status(200).json({
        ok: true,
        user_id: resolvedUserId,
        nombre: usuario.nombre,
        laboratorio: labData,
        estrellas_totales: estrellasTotales,
      });
    }

    // POST: Registrar fórmula resuelta
    const { acierto, con_pista, tipo_operacion, detalle } = req.body || {};

    let nuevasCompletadas = labData.formulas_completadas || 0;
    let nuevaRacha = labData.racha_actual || 0;
    let estrellasSumadas = 0;
    const insigniasActuales = new Set(labData.insignias || []);
    let nuevoSalvoconducto = labData.salvoconducto_ganado || false;

    if (acierto) {
      nuevasCompletadas += 1;
      nuevaRacha += 1;
      estrellasSumadas = 2; // +2 estrellas por fórmula
      estrellasTotales += estrellasSumadas;

      // Desbloqueo de insignias
      if (tipo_operacion === "division" && !con_pista) {
        insigniasActuales.add("insignia_division_maomao");
      }
      if (nuevasCompletadas >= 40 && !nuevoSalvoconducto) {
        nuevoSalvoconducto = true;
        insigniasActuales.add("insignia_salvoconducto");
      }
    } else {
      nuevaRacha = 0;
    }

    const nuevoHistorial = [
      {
        fecha: new Date().toISOString(),
        acierto: Boolean(acierto),
        tipo_operacion: tipo_operacion || "mixto",
        detalle: detalle || "",
        con_pista: Boolean(con_pista),
      },
      ...(labData.historial || []).slice(0, 19),
    ];

    const nuevoLabData = {
      formulas_completadas: nuevasCompletadas,
      racha_actual: nuevaRacha,
      insignias: Array.from(insigniasActuales),
      historial: nuevoHistorial,
      salvoconducto_ganado: nuevoSalvoconducto,
      ultima_actividad: new Date().toISOString(),
    };

    const nuevosRasgos = {
      ...rasgos,
      estrellas_totales: estrellasTotales,
      laboratorio: nuevoLabData,
    };

    // Actualizar en Supabase usuarios
    assertSupabaseOk(
      await supabase
        .from("usuarios")
        .update({ rasgos_especiales: nuevosRasgos, updated_at: new Date().toISOString() })
        .eq("id", resolvedUserId),
      "Error al actualizar progreso del laboratorio"
    );

    // Actualizar también continuidad_misiones para sincronía total
    try {
      const { data: cont } = await supabase
        .from("continuidad_misiones")
        .select("estado, revision")
        .eq("user_id", resolvedUserId)
        .maybeSingle();

      if (cont?.estado) {
        const nuevoEstado = { ...cont.estado, estrellas: estrellasTotales };
        await supabase
          .from("continuidad_misiones")
          .update({ estado: nuevoEstado, updated_at: new Date().toISOString() })
          .eq("user_id", resolvedUserId);
      }
    } catch (e) {
      console.warn("No se pudo actualizar continuidad_misiones desde laboratorio:", e.message);
    }

    return res.status(200).json({
      ok: true,
      laboratorio: nuevoLabData,
      estrellas_totales: estrellasTotales,
      estrellas_sumadas: estrellasSumadas,
      nuevo_salvoconducto: nuevoSalvoconducto && !labData.salvoconducto_ganado,
    });
  } catch (error) {
    console.error("[api/laboratorio/progreso] Error:", error);
    return res.status(500).json({ error: "Error interno al guardar progreso del laboratorio." });
  }
}
