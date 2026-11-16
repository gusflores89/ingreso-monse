import { requireAccess } from "@/lib/access";
import { requireMethod } from "@/lib/http";
import { getUserPlan } from "@/lib/planes";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "GET")) return;
  if (!requireAccess(req, res, "admin")) return;

  try {
    const supabase = getSupabaseAdmin();

    const { data: usuarios, error: usuariosError } = await supabase
      .from("usuarios")
      .select("*")
      .order("created_at", { ascending: false });

    if (usuariosError) throw usuariosError;

    const userIds = (usuarios || []).map((usuario) => usuario.id);
    const { data: sesiones, error: sesionesError } = userIds.length
      ? await supabase
          .from("sesiones")
          .select("id, user_id, tema, tipo_pregunta, es_correcta, created_at")
          .in("user_id", userIds)
          .order("created_at", { ascending: false })
          .limit(2000)
      : { data: [], error: null };

    if (sesionesError) throw sesionesError;

    const { data: continuidades } = userIds.length
      ? await supabase
          .from("continuidad_misiones")
          .select("user_id, estado, updated_at")
          .in("user_id", userIds)
      : { data: [] };

    const contByUser = new Map((continuidades || []).map((c) => [c.user_id, c]));
    const metricsByUser = buildMetricsByUser(sesiones || []);
    const enrichedUsers = (usuarios || []).map((usuario) => {
      const metrics = metricsByUser[usuario.id] || emptyMetrics();
      const cont = contByUser.get(usuario.id);
      const estrellasReales = Math.max(
        Number(usuario.rasgos_especiales?.estrellas_totales || 0),
        Number(cont?.estado?.estrellas || 0)
      );
      const temaActual = cont?.estado?.tema || metrics.ultima_sesion?.tema || null;
      const tipoPantalla = cont?.estado?.pregunta?.tipo || null;
      const pasoLectura = cont?.estado?.pregunta?.lectura?.paso ?? null;
      const ultimoMovimiento =
        [metrics.ultima_sesion?.created_at, cont?.updated_at, usuario.created_at]
          .filter(Boolean)
          .sort((a, b) => new Date(b) - new Date(a))[0] || usuario.created_at;

      let etapa = `Alumno activo (${metrics.total_sesiones} sesiones)`;
      if (metrics.total_sesiones === 0 && tipoPantalla === "lectura_modulo") {
        etapa = `Frenado en lectura inicial (Paso ${(pasoLectura ?? 0) + 1} de 4)`;
      } else if (metrics.total_sesiones === 0) {
        etapa = "Registrado sin iniciar tutoría";
      } else if (metrics.total_sesiones <= 3) {
        etapa = `Exploración inicial (${metrics.total_sesiones} sesiones)`;
      }

      return {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        codigo_acceso: usuario.codigo_acceso,
        edad: usuario.edad,
        grado: usuario.grado,
        created_at: usuario.created_at,
        updated_at: usuario.updated_at,
        avatar: usuario.rasgos_especiales?.avatar || usuario.avatar || "buho",
        nombre_tutor: usuario.rasgos_especiales?.nombre_tutor || usuario.nombre_tutor || "Buho",
        color_tema: usuario.rasgos_especiales?.color_tema || usuario.color_tema || "#D85A30",
        plan: getUserPlan(usuario),
        subscription_status: usuario.subscription_status || usuario.rasgos_especiales?.subscription_status || "trial",
        estilo_aprendizaje: usuario.estilo_aprendizaje,
        estrellas_reales: estrellasReales,
        embudo: {
          ultimo_movimiento: ultimoMovimiento,
          tema_actual: temaActual,
          tipo_pantalla: tipoPantalla,
          paso_lectura: pasoLectura,
          etapa,
          alerta_abandono: Boolean(metrics.total_sesiones <= 3),
        },
        rasgos_especiales: (() => {
          const { access_password_hash, ...rasgosSeguros } = usuario.rasgos_especiales || {};
          return rasgosSeguros;
        })(),
        metricas: metrics,
      };
    });

    res.status(200).json({
      usuarios: enrichedUsers,
      resumen: buildSummary(enrichedUsers),
      sesiones_recientes: (sesiones || []).slice(0, 25),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

function buildMetricsByUser(sesiones) {
  return sesiones.reduce((acc, sesion) => {
    const metrics = acc[sesion.user_id] || emptyMetrics();
    metrics.total_sesiones += 1;
    if (sesion.es_correcta !== null) {
      metrics.sesiones_evaluadas += 1;
      if (sesion.es_correcta) metrics.correctas += 1;
    }
    metrics.temas.add(sesion.tema);
    if (!metrics.ultima_sesion || new Date(sesion.created_at) > new Date(metrics.ultima_sesion.created_at)) {
      metrics.ultima_sesion = {
        tema: sesion.tema,
        tipo_pregunta: sesion.tipo_pregunta,
        es_correcta: sesion.es_correcta,
        created_at: sesion.created_at,
      };
    }
    acc[sesion.user_id] = metrics;
    return acc;
  }, {});
}

function emptyMetrics() {
  return {
    total_sesiones: 0,
    sesiones_evaluadas: 0,
    correctas: 0,
    temas: new Set(),
    ultima_sesion: null,
    get tasa_acierto() {
      return this.sesiones_evaluadas ? Math.round((this.correctas / this.sesiones_evaluadas) * 100) : 0;
    },
    toJSON() {
      return {
        total_sesiones: this.total_sesiones,
        sesiones_evaluadas: this.sesiones_evaluadas,
        correctas: this.correctas,
        tasa_acierto: this.tasa_acierto,
        temas_trabajados: this.temas.size,
        ultima_sesion: this.ultima_sesion,
      };
    },
  };
}

function buildSummary(usuarios) {
  const total = usuarios.length;
  const trial = usuarios.filter((usuario) => usuario.plan === "trial").length;
  const full = usuarios.filter((usuario) => usuario.plan === "full").length;
  const activos7d = usuarios.filter((usuario) => {
    const last = usuario.metricas?.ultima_sesion?.created_at;
    if (!last) return false;
    return Date.now() - new Date(last).getTime() <= 7 * 24 * 60 * 60 * 1000;
  }).length;

  const sesionesTotales = usuarios.reduce((sum, usuario) => sum + (usuario.metricas?.total_sesiones || 0), 0);

  return { total, trial, full, activos7d, sesionesTotales };
}
