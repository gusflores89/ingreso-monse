import { requireMethod } from "@/lib/http";
import { getTopicMeta } from "@/lib/curriculum";
import { callOpenRouter } from "@/lib/openrouter";
import { MODEL_DASHBOARD, buildPromptDashboard } from "@/lib/prompts";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { buildAlumnoProfile } from "@/lib/alumno";
import { getUserPlan } from "@/lib/planes";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "GET")) return;

  const userId = req.query.user_id;
  if (!userId) return res.status(400).json({ error: "user_id es obligatorio." });

  try {
    const supabase = getSupabaseAdmin();

    let usuario = null;
    const cleanUserId = String(userId).trim();
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
      return res.status(404).json({ error: "Código de acceso o ID de estudiante incorrecto." });
    }

    const resolvedUserId = usuario.id;
    const alumno = buildAlumnoProfile(usuario);

    const progreso = assertSupabaseOk(
      await supabase.from("progreso").select("*").eq("user_id", resolvedUserId).order("updated_at", { ascending: false }),
      "No se pudo obtener progreso"
    );

    const alertas = assertSupabaseOk(
      await supabase
        .from("alertas")
        .select("*")
        .eq("user_id", resolvedUserId)
        .eq("resuelta", false)
        .order("created_at", { ascending: false }),
      "No se pudieron obtener alertas"
    );

    const sesiones = assertSupabaseOk(
      await supabase
        .from("sesiones")
        .select("tema, capa, tipo_pregunta, es_correcta, razon_evaluacion, created_at")
        .eq("user_id", resolvedUserId)
        .not("es_correcta", "is", null)
        .order("created_at", { ascending: false })
        .limit(80),
      "No se pudieron obtener sesiones recientes"
    );

    const metricas = buildDashboardMetrics({ progreso, sesiones, alertas });
    const evaluadas = sesiones.length;
    const correctas = sesiones.filter((sesion) => sesion.es_correcta).length;
    const insightInput = {
      semana: "ultimos registros",
      sesiones_completadas: evaluadas,
      temas_trabajados: [...new Set(sesiones.map((sesion) => sesion.tema))],
      tasa_promedio: evaluadas ? Math.round((correctas / evaluadas) * 100) : 0,
      balance_materias: metricas.balance_materias,
      oportunidades: metricas.oportunidades,
      resumen: metricas.resumen,
      distribucion_errores: sesiones
        .filter((sesion) => sesion.razon_evaluacion)
        .reduce((acc, sesion) => {
          acc[sesion.tema] = acc[sesion.tema] || [];
          acc[sesion.tema].push(sesion.razon_evaluacion);
          return acc;
        }, {}),
      racha_maxima: 0,
      alertas_generadas: alertas,
    };

    let insightMarkdown = "";
    let insightError = null;

    try {
      insightMarkdown = await callOpenRouter(
        MODEL_DASHBOARD,
        buildPromptDashboard(alumno, {}),
        JSON.stringify(insightInput),
        900
      );
    } catch (error) {
      console.error(error);
      insightError = "No se pudo generar el insight en este momento.";
    }

    res.status(200).json({
      usuario: { ...usuario, plan: getUserPlan(usuario) },
      progreso,
      alertas,
      sesiones_recientes: sesiones,
      metricas,
      insight_markdown: insightMarkdown,
      insight_error: insightError,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

function buildDashboardMetrics({ progreso, sesiones, alertas }) {
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const sesionesSemana = sesiones.filter((sesion) => parseSupabaseDate(sesion.created_at).getTime() >= weekAgo);
  const correctasSemana = sesionesSemana.filter((sesion) => sesion.es_correcta).length;
  const tasaSemana = sesionesSemana.length ? Math.round((correctasSemana / sesionesSemana.length) * 100) : 0;
  const balanceMaterias = buildBalanceMaterias(sesionesSemana.length ? sesionesSemana : sesiones);
  const progresoEnriquecido = progreso.map((item) => enrichTopic(item));
  const oportunidades = buildOportunidades({ progreso: progresoEnriquecido, balanceMaterias, alertas, sesiones });
  const temaFuerte = [...progresoEnriquecido].sort((a, b) => b.tasa_acierto - a.tasa_acierto)[0] || null;
  const temaRefuerzo =
    [...progresoEnriquecido].filter((item) => item.tasa_acierto < 80).sort((a, b) => a.tasa_acierto - b.tasa_acierto)[0] ||
    null;

  return {
    resumen: {
      sesiones_semana: sesionesSemana.length,
      tasa_semana: tasaSemana,
      temas_activos: progreso.length,
      alertas_abiertas: alertas.length,
      tema_fuerte: temaFuerte?.tema || null,
      tema_refuerzo: temaRefuerzo?.tema || null,
      ultima_actividad: sesiones[0]?.created_at || null,
    },
    balance_materias: balanceMaterias,
    progreso_temas: progresoEnriquecido,
    oportunidades,
    timeline: sesiones.slice(0, 12).map((sesion) => ({
      ...sesion,
      materia: getMateria(sesion.tema),
      estado: sesion.es_correcta ? "correcta" : "incorrecta",
    })),
  };
}

function buildBalanceMaterias(sesiones) {
  const base = {
    matematica: { materia: "matematica", sesiones: 0, correctas: 0, tasa_acierto: 0 },
    lengua: { materia: "lengua", sesiones: 0, correctas: 0, tasa_acierto: 0 },
  };

  sesiones.forEach((sesion) => {
    const materia = getMateria(sesion.tema);
    if (!base[materia]) return;
    base[materia].sesiones += 1;
    if (sesion.es_correcta) base[materia].correctas += 1;
  });

  return Object.values(base).map((item) => ({
    ...item,
    tasa_acierto: item.sesiones ? Math.round((item.correctas / item.sesiones) * 100) : 0,
  }));
}

function enrichTopic(item) {
  const tasa = Number(item.tasa_acierto || 0);
  const total = Number(item.total_sesiones || 0);
  const materia = getMateria(item.tema);

  return {
    ...item,
    materia,
    estado: getTopicState({ tasa, total }),
    oportunidad: getTopicOpportunity({ tasa, total, tema: item.tema }),
  };
}

function getTopicState({ tasa, total }) {
  if (total === 0) return "nuevo";
  if (tasa >= 80 && total >= 3) return "listo_examen";
  if (tasa >= 80) return "bien";
  if (tasa >= 50) return "en_practica";
  return "refuerzo";
}

function getTopicOpportunity({ tasa, total, tema }) {
  if (total >= 3 && tasa < 50) return `Reforzar ${formatTema(tema)} con ejercicios mas guiados.`;
  if (total >= 5 && tasa < 80) return `Todavia no esta firme: conviene practicar ${formatTema(tema)} en sesiones cortas.`;
  if (tasa >= 80 && total >= 3) return `Listo para consolidar con examen final o repaso breve.`;
  return `Seguir juntando evidencia: todavia hay pocas practicas.`;
}

function buildOportunidades({ progreso, balanceMaterias, alertas, sesiones }) {
  const oportunidades = [];
  const totalBalance = balanceMaterias.reduce((sum, item) => sum + item.sesiones, 0);

  if (totalBalance > 0) {
    const matematica = balanceMaterias.find((item) => item.materia === "matematica")?.sesiones || 0;
    const lengua = balanceMaterias.find((item) => item.materia === "lengua")?.sesiones || 0;
    const menor = matematica <= lengua ? "matematica" : "lengua";
    const mayor = menor === "matematica" ? lengua : matematica;
    const menorCantidad = Math.min(matematica, lengua);

    if (mayor - menorCantidad >= 2) {
      oportunidades.push({
        tipo: "balance",
        titulo: "Balance de materias",
        detalle: `Hubo menos practica de ${formatMateria(menor)} en los ultimos registros.`,
        accion: `Priorizar una sesion corta de ${formatMateria(menor)}.`,
        severidad: "media",
      });
    }
  }

  const debil = [...progreso].filter((item) => Number(item.total_sesiones || 0) >= 2).sort((a, b) => a.tasa_acierto - b.tasa_acierto)[0];
  if (debil && debil.tasa_acierto < 70) {
    oportunidades.push({
      tipo: "tema_debil",
      titulo: "Tema para reforzar",
      detalle: `${formatTema(debil.tema)} esta en ${Number(debil.tasa_acierto).toFixed(0)}% de acierto.`,
      accion: "Acompanarlo con ejemplos concretos y una practica breve.",
      severidad: debil.tasa_acierto < 50 ? "alta" : "media",
    });
  }

  const ultimasIncorrectas = sesiones.slice(0, 6).filter((sesion) => !sesion.es_correcta);
  if (ultimasIncorrectas.length >= 2) {
    oportunidades.push({
      tipo: "racha_error",
      titulo: "Atencion a errores recientes",
      detalle: `${ultimasIncorrectas.length} de las ultimas 6 respuestas fueron incorrectas.`,
      accion: "Conviene bajar un poco la velocidad y pedir que explique el razonamiento.",
      severidad: "media",
    });
  }

  alertas.slice(0, 2).forEach((alerta) => {
    oportunidades.push({
      tipo: alerta.tipo,
      titulo: formatTema(alerta.tipo),
      detalle: alerta.mensaje,
      accion: alerta.accion_recomendada || "Revisar este punto en la proxima sesion.",
      severidad: /critico|debil|lento/i.test(alerta.tipo) ? "alta" : "media",
    });
  });

  return oportunidades.slice(0, 4);
}

function getMateria(tema) {
  return getTopicMeta(tema)?.materia || "matematica";
}

function formatMateria(materia) {
  return materia === "lengua" ? "Lengua" : "Matematica";
}

function formatTema(tema = "") {
  return tema.replaceAll("_", " ");
}

function parseSupabaseDate(value) {
  const text = String(value);
  const hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(text);
  return new Date(hasTimezone ? text : `${text}Z`);
}
