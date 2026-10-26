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
      por_tipo: {
        division: 0,
        multiplicacion: 0,
        suma_resta: 0,
      },
      racha_actual: 0,
      insignias: [],
      historial: [],
      salvoconducto_ganado: false,
    };

    // Asegurar estructura de por_tipo por retrocompatibilidad
    const porTipoActual = {
      division: labData.por_tipo?.division || 0,
      multiplicacion: labData.por_tipo?.multiplicacion || 0,
      suma_resta: labData.por_tipo?.suma_resta || 0,
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
        laboratorio: {
          ...labData,
          por_tipo: porTipoActual,
        },
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

      // Incrementar por tipo de operación
      if (tipo_operacion === "division") {
        porTipoActual.division += 1;
        if (!con_pista) {
          insigniasActuales.add("insignia_division_maomao");
        }
      } else if (tipo_operacion === "multiplicacion") {
        porTipoActual.multiplicacion += 1;
      } else {
        porTipoActual.suma_resta += 1;
      }

      // Requisitos del Salvoconducto Imperial al Shopping:
      // Mínimo 15 divisiones, mínimo 15 multiplicaciones, hasta 10 sumas/restas válidas
      const puntosSalvoconducto =
        porTipoActual.division +
        porTipoActual.multiplicacion +
        Math.min(porTipoActual.suma_resta, 10);

      const cumpleRequisitos =
        porTipoActual.division >= 15 &&
        porTipoActual.multiplicacion >= 15 &&
        puntosSalvoconducto >= 40;

      if (cumpleRequisitos && !nuevoSalvoconducto) {
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
      por_tipo: porTipoActual,
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
