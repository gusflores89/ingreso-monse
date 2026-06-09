import { useEffect, useState } from "react";
import { TRIAL_TOPICS } from "@/lib/planes";

const EMPTY_REVISION = {
  resultado: "",
  cantidad_errores: "",
  comentario: "",
};

const MATERIA_LABELS = {
  matematica: "Matematica",
  lengua: "Lengua",
};

export default function DashboardPapas({ userId }) {
  const [data, setData] = useState(null);
  const [tareasPendientes, setTareasPendientes] = useState([]);
  const [revisandoTarea, setRevisandoTarea] = useState(null);
  const [formRevision, setFormRevision] = useState(EMPTY_REVISION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [suggestedTopic, setSuggestedTopic] = useState(null);
  const [sugerirLoading, setSugerirLoading] = useState(null);
  const [rutaFlexibleActive, setRutaFlexibleActive] = useState(false);
  const [rutaFlexibleLoading, setRutaFlexibleLoading] = useState(false);
  const [modoPacienteActive, setModoPacienteActive] = useState(false);
  const [estiloAprendizajeValue, setEstiloAprendizajeValue] = useState("visual_ejemplos");
  const [configPedagogicaLoading, setConfigPedagogicaLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const [progresoRes, tareasRes] = await Promise.all([
        fetch(`/api/progreso?user_id=${encodeURIComponent(userId)}`),
        fetch(`/api/tarea-manuscrita/pendientes?user_id=${encodeURIComponent(userId)}`),
      ]);

      const progresoJson = await progresoRes.json();
      const tareasJson = await tareasRes.json();

      if (!progresoRes.ok) throw new Error(progresoJson.error || "No se pudo cargar el dashboard.");
      if (!tareasRes.ok) throw new Error(tareasJson.error || "No se pudieron cargar las tareas manuscritas.");

      setData(progresoJson);
      setTareasPendientes(tareasJson.tareas || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [userId]);

  useEffect(() => {
    if (data?.usuario?.rasgos_especiales?.tema_sugerido) {
      setSuggestedTopic(data.usuario.rasgos_especiales.tema_sugerido);
    } else {
      setSuggestedTopic(null);
    }
    setRutaFlexibleActive(!!data?.usuario?.rasgos_especiales?.ruta_flexible);
    setModoPacienteActive(!!data?.usuario?.rasgos_especiales?.modo_paciente);
    setEstiloAprendizajeValue(data?.usuario?.estilo_aprendizaje || "visual_ejemplos");
  }, [data]);

  const handleToggleRutaFlexible = async () => {
    setRutaFlexibleLoading(true);
    setError("");
    const newValue = !rutaFlexibleActive;
    try {
      const res = await fetch("/api/guardar-ruta-flexible", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          ruta_flexible: newValue
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "No se pudo cambiar la configuración.");
      setRutaFlexibleActive(json.ruta_flexible);
    } catch (err) {
      setError(err.message);
    } finally {
      setRutaFlexibleLoading(false);
    }
  };

  const handleToggleModoPaciente = async () => {
    setConfigPedagogicaLoading(true);
    setError("");
    const newValue = !modoPacienteActive;
    try {
      const res = await fetch("/api/guardar-config-pedagogica", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          modo_paciente: newValue
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "No se pudo cambiar la configuración.");
      setModoPacienteActive(json.modo_paciente);
    } catch (err) {
      setError(err.message);
    } finally {
      setConfigPedagogicaLoading(false);
    }
  };

  const handleChangeEstiloAprendizaje = async (newStyle) => {
    setConfigPedagogicaLoading(true);
    setError("");
    try {
      const res = await fetch("/api/guardar-config-pedagogica", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          estilo_aprendizaje: newStyle
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "No se pudo guardar el estilo.");
      setEstiloAprendizajeValue(json.estilo_aprendizaje);
    } catch (err) {
      setError(err.message);
    } finally {
      setConfigPedagogicaLoading(false);
    }
  };

  const handleToggleSugerencia = async (temaName, materiaName) => {
    const remover = suggestedTopic?.tema === temaName && !suggestedTopic?.completado;
    setSugerirLoading(temaName);
    setError("");
    try {
      const res = await fetch("/api/sugerir-tema", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          tema: temaName,
          materia: materiaName,
          remover
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "No se pudo cambiar la sugerencia.");
      setSuggestedTopic(json.tema_sugerido);
    } catch (err) {
      setError(err.message);
    } finally {
      setSugerirLoading(null);
    }
  };

  const handleRevisar = async (tareaId) => {
    try {
      const res = await fetch("/api/tarea-manuscrita/revisar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tarea_id: tareaId,
          ...formRevision,
        }),
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "No se pudo guardar la revision.");

      setTareasPendientes((prev) => prev.filter((tarea) => tarea.id !== tareaId));
      setRevisandoTarea(null);
      setFormRevision(EMPTY_REVISION);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpgrade = async () => {
    setPaymentLoading(true);
    setError("");
    try {
      const res = await fetch("/api/pagos/crear-preferencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "No se pudo generar el cobro.");

      const targetUrl = json.init_point || json.sandbox_init_point;
      if (targetUrl) {
        window.location.href = targetUrl;
      } else {
        throw new Error("No se obtuvo URL de redirección.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  const metricas = data?.metricas || {};
  const resumen = metricas.resumen || {};
  const diasRestantes = data?.usuario?.fecha_examen ? daysUntil(data.usuario.fecha_examen) : null;
  const progresoTemas = metricas.progreso_temas || data?.progreso || [];
  const timeline = metricas.timeline || data?.sesiones_recientes || [];
  const balance = metricas.balance_materias || [];
  const oportunidades = metricas.oportunidades || [];

  const esTrial = data?.usuario?.plan === "trial";
  const sesionesParaTrial = data?.sesiones_recientes || timeline;
  const examenesAprobados = new Set(
    sesionesParaTrial
      .filter((sesion) => sesion.tipo_pregunta === "examen_final" && sesion.es_correcta)
      .map((sesion) => sesion.tema)
  );
  const trialCompletados = TRIAL_TOPICS.filter((t) => examenesAprobados.has(t)).length;

  return (
    <section className="dashboard parent-dashboard">
      <header className="dashboard-hero">
        <div>
          <p className="eyebrow">Panel familiar</p>
          <h2 style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {data?.usuario?.nombre || "Alumno/a"}
            {esTrial && (
              <span className="plan-tag trial" style={{ fontSize: "0.8rem", padding: "4px 10px", borderRadius: "20px", backgroundColor: "#fee2e2", color: "#ef4444", border: "1px solid #fca5a5", fontWeight: "600" }}>
                Plan de Prueba
              </span>
            )}
          </h2>
          <p>
            {diasRestantes === null ? "Fecha de examen pendiente" : `Faltan ${diasRestantes} dias para el examen`}
            {esTrial && ` · Temas de prueba: ${trialCompletados} de 4 completados`}
          </p>
          {data?.usuario && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
              <span style={{ fontSize: "0.85rem", color: "#9590a6", fontWeight: "500" }}>Ruta Flexible (Modo Libre):</span>
              <button
                type="button"
                onClick={handleToggleRutaFlexible}
                disabled={rutaFlexibleLoading}
                style={{
                  padding: "4px 12px",
                  borderRadius: "15px",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 200ms ease",
                  border: "1px solid",
                  borderColor: rutaFlexibleActive ? "var(--success, #22c55e)" : "var(--muted, #9590a6)",
                  backgroundColor: rutaFlexibleActive ? "rgba(34, 197, 94, 0.15)" : "transparent",
                  color: rutaFlexibleActive ? "#22c55e" : "#9590a6",
                  minHeight: "auto",
                  display: "inline-flex",
                  alignItems: "center"
                }}
              >
                {rutaFlexibleActive ? "🟢 Activado" : "⚪ Desactivado"}
              </button>
            </div>
          )}
        </div>
        <button type="button" onClick={load} disabled={loading}>
          {loading ? "Actualizando..." : "Recargar datos"}
        </button>
      </header>

      {loading && <p className="status">Analizando progreso...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <>
          <section className="dashboard-kpi-grid" aria-label="Resumen ejecutivo">
            <KpiCard label="Sesiones esta semana" value={resumen.sesiones_semana ?? 0} hint="Actividad reciente" tone="blue" />
            <KpiCard label="Acierto semanal" value={`${resumen.tasa_semana ?? 0}%`} hint="Respuestas correctas" tone="green" />
            <KpiCard label="Tema fuerte" value={formatTema(resumen.tema_fuerte || "Sin datos")} hint="Mejor desempeno" tone="purple" />
            <KpiCard label="Foco de refuerzo" value={formatTema(resumen.tema_refuerzo || "Sin datos")} hint="Oportunidad principal" tone="orange" />
          </section>

          {/* Panel de Configuración Pedagógica */}
          <section className="dashboard-panel" style={{ margin: "24px 0", animation: "fadeInUp 0.4s ease both" }}>
            <PanelHeader title="⚙️ Configuración del Tutor & Pedagogía" subtitle="Personalizá el ritmo y estilo de enseñanza para adaptarlo a tu hijo/a" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "15px" }}>
              
              {/* Modo Tutor Extra Paciente */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--line)", padding: "18px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px" }}>
                <div>
                  <strong style={{ color: "#ffffff", fontSize: "0.95rem", display: "block", marginBottom: "6px" }}>
                    Tutor Extra Paciente (Modo Principiante)
                  </strong>
                  <p style={{ color: "var(--muted)", fontSize: "0.82rem", margin: 0, lineHeight: "1.4" }}>
                    Recomendado si a tu hijo/a le cuestan temas como las fracciones. El tutor usará explicaciones ultra-sencillas con chocolates y pizzas, un ritmo más lento, bajará la dificultad a nivel inicial y habilitará apuntes teóricos.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
                  <button
                    type="button"
                    onClick={handleToggleModoPaciente}
                    disabled={configPedagogicaLoading}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 200ms ease",
                      border: "1px solid",
                      borderColor: modoPacienteActive ? "var(--success, #22c55e)" : "var(--muted, #9590a6)",
                      backgroundColor: modoPacienteActive ? "rgba(34, 197, 94, 0.15)" : "transparent",
                      color: modoPacienteActive ? "#22c55e" : "#9590a6",
                      minHeight: "auto"
                    }}
                  >
                    {configPedagogicaLoading ? "..." : modoPacienteActive ? "🟢 Activado" : "⚪ Desactivado"}
                  </button>
                </div>
              </div>

              {/* Estilo de Explicación */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--line)", padding: "18px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px" }}>
                <div>
                  <strong style={{ color: "#ffffff", fontSize: "0.95rem", display: "block", marginBottom: "6px" }}>
                    Estilo de Explicación del Tutor
                  </strong>
                  <p style={{ color: "var(--muted)", fontSize: "0.82rem", margin: 0, lineHeight: "1.4" }}>
                    Define cómo prefieres que el tutor desarrolle los conceptos y explicaciones teóricas en sus respuestas de IA para tu hijo/a.
                  </p>
                </div>
                <div>
                  <select
                    value={estiloAprendizajeValue}
                    onChange={(e) => handleChangeEstiloAprendizaje(e.target.value)}
                    disabled={configPedagogicaLoading}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      background: "#110d24",
                      border: "1px solid var(--line)",
                      color: "#ffffff",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      outline: "none"
                    }}
                  >
                    <option value="visual_ejemplos">Visual y con ejemplos cotidianos</option>
                    <option value="paso_a_paso">Paso a paso ultra detallado</option>
                    <option value="practica_directa">Práctica directa (explicación muy corta)</option>
                  </select>
                </div>
              </div>

            </div>
          </section>

          <section className="dashboard-layout-two">
            <article className="dashboard-panel">
              <PanelHeader title="Balance por materia" subtitle="Distribucion y acierto de los ultimos registros" />
              <div className="subject-balance-grid">
                {balance.map((item) => (
                  <SubjectBalance key={item.materia} item={item} total={balance.reduce((sum, materia) => sum + materia.sesiones, 0)} />
                ))}
              </div>
            </article>

            <article className="dashboard-panel opportunities-panel">
              <PanelHeader title="Oportunidades de mejora" subtitle="Donde conviene mirar esta semana" />
              {oportunidades.length === 0 ? (
                <p className="empty-state standalone success-empty">No hay oportunidades urgentes. Mantener ritmo y alternancia.</p>
              ) : (
                <div className="opportunity-list">
                  {oportunidades.map((item, index) => (
                    <article className={`opportunity-card ${item.severidad || "media"}`} key={`${item.tipo}-${index}`}>
                      <div>
                        <strong>{item.titulo}</strong>
                        <span>{item.severidad === "alta" ? "Prioridad alta" : "Prioridad media"}</span>
                      </div>
                      <p>{item.detalle}</p>
                      <small>{item.accion}</small>
                    </article>
                  ))}
                </div>
              )}
            </article>
          </section>

          <section className="dashboard-panel dashboard-section">
            <PanelHeader title="Progreso por tema" subtitle="Estado de dominio y proxima accion sugerida" />
            <div className="topic-card-grid rich-topic-grid" aria-label="Progreso por tema">
              {progresoTemas.length === 0 && <p className="empty-state">Todavia no hay temas con progreso.</p>}
              {progresoTemas.map((item) => (
                <TopicProgressRow
                  item={item}
                  key={item.id || item.tema}
                  suggestedTopic={suggestedTopic}
                  sugerirLoading={sugerirLoading}
                  onToggleSuggested={handleToggleSugerencia}
                />
              ))}
            </div>
          </section>

          <section className="dashboard-layout-two">
            <article className="dashboard-panel">
              <PanelHeader title="Linea de tiempo" subtitle="Ultimas respuestas registradas" />
              <div className="session-timeline">
                {timeline.length === 0 && <p className="empty-state standalone">Todavia no hay sesiones respondidas.</p>}
                {timeline.slice(0, 10).map((sesion, index) => (
                  <TimelineItem sesion={sesion} key={`${sesion.created_at}-${sesion.tema}-${index}`} />
                ))}
              </div>
            </article>

            <article className="dashboard-panel">
              <PanelHeader title="Alertas" subtitle="Eventos que requieren atencion" />
              {data.alertas.length === 0 ? (
                <p className="empty-state standalone">No hay alertas abiertas.</p>
              ) : (
                <div className="alert-list">
                  {data.alertas.map((alerta) => (
                    <article key={alerta.id} className={`alert-item ${alertClass(alerta.tipo)}`}>
                      <div className="alert-title">
                        <span aria-hidden="true">{alertIcon(alerta.tipo)}</span>
                        <strong>{formatTema(alerta.tipo)}</strong>
                      </div>
                      <p>{alerta.mensaje}</p>
                      {alerta.accion_recomendada && <small>{alerta.accion_recomendada}</small>}
                    </article>
                  ))}
                </div>
              )}
            </article>
          </section>

          <HandwritingSection
            tareasPendientes={tareasPendientes}
            revisandoTarea={revisandoTarea}
            setRevisandoTarea={setRevisandoTarea}
            formRevision={formRevision}
            setFormRevision={setFormRevision}
            handleRevisar={handleRevisar}
          />

          {esTrial && (
            <section className="dashboard-panel" style={{
              margin: "32px 0",
              background: "linear-gradient(135deg, rgba(26, 23, 37, 0.8) 0%, rgba(17, 13, 36, 0.9) 100%)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(139, 92, 246, 0.1)",
              animation: "fadeInUp 0.4s ease both"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Cabecera de la oferta */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ flex: "1", minWidth: "280px" }}>
                    <span style={{
                      backgroundColor: "rgba(139, 92, 246, 0.15)",
                      color: "#a78bfa",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      display: "inline-block",
                      marginBottom: "12px"
                    }}>
                      ⚡ PROMO LANZAMIENTO CICLO 2027 (PAGO ÚNICO)
                    </span>
                    <h3 style={{ fontSize: "1.45rem", fontWeight: "700", color: "#e8e4f0", margin: "0 0 8px 0" }}>
                      {trialCompletados === 4 ? "🎉 ¡Muestra de Prueba Completada!" : "💎 Desbloqueá el Acceso Completo a IngresoMonse"}
                    </h3>
                    <p style={{ color: "#9590a6", margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
                      {trialCompletados === 4 
                        ? "Tu hijo/a completó con éxito los 4 temas de la muestra gratuita. Activá el acceso completo para habilitar el currículum completo."
                        : "Estás explorando la plataforma con una muestra de 4 temas. Puedes habilitar los 37 temas del currículum de ingreso en cualquier momento."}
                    </p>
                  </div>

                  <div style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    padding: "16px 24px",
                    textAlign: "right",
                    minWidth: "200px"
                  }}>
                    <span style={{ fontSize: "0.85rem", color: "#9590a6", textDecoration: "line-through", display: "block", marginBottom: "2px" }}>
                      $29.900 ARS
                    </span>
                    <strong style={{ fontSize: "1.6rem", color: "#10b981", fontWeight: "700", display: "block", lineHeight: "1.2" }}>
                      $19.900 ARS
                    </strong>
                    <span style={{ fontSize: "0.78rem", color: "#34d399", fontWeight: "600" }}>
                      ¡Ahorrás un 33% hoy!
                    </span>
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.05)" }} />

                {/* Beneficios y Botón de compra */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <p style={{ fontWeight: "600", fontSize: "0.9rem", color: "#a78bfa", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      ¿Qué incluye el Acceso Completo?
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                      {[
                        { emoji: "🚀", text: "Las 5 fases y los 37 temas completos" },
                        { emoji: "📝", text: "Ejercicios de dictado y escritura a mano" },
                        { emoji: "⏱️", text: "Simulacros de examen cronometrados ilimitados" },
                        { emoji: "📊", text: "Informes cualitativos IA para padres" }
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "#e8e4f0" }}>
                          <span>{item.emoji}</span>
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <button
                      type="button"
                      onClick={handleUpgrade}
                      disabled={paymentLoading}
                      style={{
                        width: "100%",
                        padding: "14px 28px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                        color: "#ffffff",
                        fontSize: "0.95rem",
                        fontWeight: "700",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 4px 15px rgba(139, 92, 246, 0.35)",
                        transition: "all 0.2s ease-out",
                        outline: "none"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.45)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "0 4px 15px rgba(139, 92, 246, 0.35)";
                      }}
                    >
                      {paymentLoading ? "Preparando Pasarela..." : "💎 Activar Acceso Completo con Mercado Pago"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {data.insight_markdown && (
            <section className="insight dashboard-panel dashboard-section">
              <PanelHeader title="Insight IA" subtitle="Lectura cualitativa para acompañar mejor" />
              <MarkdownRenderer content={data.insight_markdown} />
            </section>
          )}
        </>
      )}
    </section>
  );
}

function KpiCard({ label, value, hint, tone }) {
  return (
    <article className={`kpi-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{hint}</p>
    </article>
  );
}

function PanelHeader({ title, subtitle }) {
  return (
    <header className="panel-header">
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}

function SubjectBalance({ item, total }) {
  const share = total ? Math.round((item.sesiones / total) * 100) : 0;
  const materia = MATERIA_LABELS[item.materia] || formatTema(item.materia);

  return (
    <div className={`subject-balance ${item.materia}`}>
      <div>
        <strong>{materia}</strong>
        <span>{item.sesiones} sesiones</span>
      </div>
      <div className="balance-bars">
        <ProgressLine label="Participacion" value={share} />
        <ProgressLine label="Acierto" value={item.tasa_acierto || 0} />
      </div>
    </div>
  );
}

function ProgressLine({ label, value }) {
  const safeValue = clamp(Number(value || 0));
  return (
    <div className="metric-line">
      <div>
        <span>{label}</span>
        <strong>{safeValue}%</strong>
      </div>
      <div className="progress-track" aria-label={`${label}: ${safeValue}%`}>
        <i style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}

function TopicProgressRow({ item, suggestedTopic, sugerirLoading, onToggleSuggested }) {
  const status = statusFor(item);
  const tasa = clamp(Number(item.tasa_acierto || 0));

  return (
    <article className={`topic-progress-row ${status.className}`} style={{ opacity: item.unlocked ? 1 : 0.6 }}>
      <div className="row-main-info">
        <span className="topic-materia">
          {MATERIA_LABELS[item.materia] || formatTema(item.materia || "general")} · Fase {item.fase || 1}
        </span>
        <strong className="topic-name">{formatTema(item.tema)}</strong>
      </div>

      <div className="row-progress-section">
        <div className="row-percentage-wrapper">
          <span className="row-percentage">{tasa}%</span>
          <span className={`status-pill ${status.className}`}>{status.label}</span>
        </div>
        <div className="progress-track" aria-label={`Tasa de acierto ${tasa}%`}>
          <i style={{ width: `${tasa}%` }} />
        </div>
      </div>

      <div className="row-meta-section">
        <div className="topic-meta-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
          <span>{item.total_sesiones} {item.total_sesiones === 1 ? "sesión" : "sesiones"}</span>
          <span>Capa {item.capa_actual}</span>
          <span>{item.total_correctas} correctas</span>
          
          {!item.unlocked ? (
            <span
              style={{
                padding: "5px 12px",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: "600",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                color: "#64748b",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                marginLeft: "auto"
              }}
              title="Aprobá los exámenes de la fase anterior para desbloquear"
            >
              🔒 Bloqueado
            </span>
          ) : (
            <button
              type="button"
              disabled={sugerirLoading !== null}
              onClick={() => onToggleSuggested(item.tema, item.materia)}
              style={{
                padding: "5px 12px",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                border: suggestedTopic?.tema === item.tema && !suggestedTopic?.completado
                  ? "none"
                  : "1px solid rgba(139, 92, 246, 0.25)",
                backgroundColor: suggestedTopic?.tema === item.tema && !suggestedTopic?.completado
                  ? "var(--primary, #8b5cf6)"
                  : "rgba(139, 92, 246, 0.08)",
                color: suggestedTopic?.tema === item.tema && !suggestedTopic?.completado
                  ? "#ffffff"
                  : "var(--primary, #8b5cf6)",
                boxShadow: suggestedTopic?.tema === item.tema && !suggestedTopic?.completado
                  ? "0 2px 8px rgba(139, 92, 246, 0.25)"
                  : "none",
                minHeight: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                marginLeft: "auto"
              }}
            >
              {sugerirLoading === item.tema ? (
                "..."
              ) : suggestedTopic?.tema === item.tema && !suggestedTopic?.completado ? (
                <>🎯 Asignado</>
              ) : (
                <>🎯 Priorizar</>
              )}
            </button>
          )}
        </div>
        <p className="row-oportunidad">{item.oportunidad || "Seguir practicando con sesiones cortas."}</p>
      </div>
    </article>
  );
}

function TimelineItem({ sesion }) {
  const correct = Boolean(sesion.es_correcta);

  return (
    <article className={`timeline-item ${correct ? "correct" : "incorrect"}`}>
      <div className="timeline-dot" aria-hidden="true" />
      <div>
        <span>{formatDate(sesion.created_at)}</span>
        <strong>{formatTema(sesion.tema)}</strong>
        <p>
          {MATERIA_LABELS[sesion.materia] || MATERIA_LABELS[getMateriaFromTema(sesion.tema)] || "Materia"} ·{" "}
          {formatTema(sesion.tipo_pregunta || "practica")}
        </p>
      </div>
      <span className={`status-pill ${correct ? "good" : "review"}`}>{correct ? "Correcto" : "Incorrecto"}</span>
    </article>
  );
}

function HandwritingSection({ tareasPendientes, revisandoTarea, setRevisandoTarea, formRevision, setFormRevision, handleRevisar }) {
  return (
    <section className="dashboard-panel dashboard-section handwriting-review-section">
      <PanelHeader title={`Tareas manuscritas pendientes (${tareasPendientes.length})`} subtitle="Revision diferida para escritura a mano" />
      {tareasPendientes.length === 0 ? (
        <p className="empty-state standalone success-empty">No hay tareas manuscritas pendientes de revision.</p>
      ) : (
        <div className="handwriting-review-list">
          {tareasPendientes.map((tarea) => (
            <article className="handwriting-review-card" key={tarea.id}>
              <div className="handwriting-review-head">
                <div>
                  <h4>{formatTema(tarea.tema)}</h4>
                  <p>
                    Tipo: {formatTema(tarea.tipo_tarea)} · Completada: {formatDate(tarea.fecha_completada)}
                  </p>
                </div>
                <span>Pendiente</span>
              </div>

              <div className="handwriting-review-prompt">
                <strong>Instruccion:</strong>
                <p>{tarea.instruccion}</p>
                {tarea.tipo_tarea === "dictado" && tarea.contenido?.oraciones && (
                  <details>
                    <summary>Ver oraciones dictadas</summary>
                    <ol>
                      {tarea.contenido.oraciones.map((oracion, index) => (
                        <li key={`${oracion}-${index}`}>{oracion}</li>
                      ))}
                    </ol>
                  </details>
                )}
              </div>

              {revisandoTarea === tarea.id ? (
                <RevisionForm
                  form={formRevision}
                  setForm={setFormRevision}
                  onCancel={() => {
                    setRevisandoTarea(null);
                    setFormRevision(EMPTY_REVISION);
                  }}
                  onSubmit={() => handleRevisar(tarea.id)}
                />
              ) : (
                <button type="button" className="review-open-button" onClick={() => setRevisandoTarea(tarea.id)}>
                  Revisar tarea
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function RevisionForm({ form, setForm, onCancel, onSubmit }) {
  return (
    <div className="review-form">
      <div>
        <label>Resultado</label>
        <div className="review-choice-grid">
          {[
            ["correcta", "Correcta"],
            ["con_errores", "Con errores"],
            ["mejorar_caligrafia", "Mejorar caligrafia"],
          ].map(([value, label]) => (
            <button
              type="button"
              key={value}
              className={form.resultado === value ? "selected" : ""}
              onClick={() => setForm((prev) => ({ ...prev, resultado: value }))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {form.resultado === "con_errores" && (
        <label>
          Cuantos errores
          <input
            type="number"
            min="1"
            value={form.cantidad_errores}
            onChange={(event) => setForm((prev) => ({ ...prev, cantidad_errores: event.target.value }))}
            placeholder="Ej: 3"
          />
        </label>
      )}

      <label>
        Comentario opcional
        <textarea
          rows={3}
          value={form.comentario}
          onChange={(event) => setForm((prev) => ({ ...prev, comentario: event.target.value }))}
          placeholder="Ej: Confunde las terminaciones -aba"
        />
      </label>

      <div className="review-actions">
        <button type="button" className="save-review" onClick={onSubmit} disabled={!form.resultado}>
          Guardar revision
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

function statusFor(item) {
  const state = item.estado || fallbackState(item.tasa_acierto);
  if (state === "bloqueado") return { label: "Bloqueado", className: "review" };
  if (state === "listo_examen") return { label: "Listo examen", className: "good" };
  if (state === "bien") return { label: "Bien", className: "good" };
  if (state === "en_practica") return { label: "En practica", className: "progress" };
  if (state === "nuevo") return { label: "Nuevo", className: "progress" };
  return { label: "Refuerzo", className: "review" };
}

function fallbackState(tasa) {
  const value = Number(tasa || 0);
  if (value >= 80) return "bien";
  if (value >= 50) return "en_practica";
  return "refuerzo";
}

function alertIcon(tipo) {
  return /critico|debil|concepto|recurrente/i.test(tipo) ? "Critico" : "Aviso";
}

function alertClass(tipo) {
  return /critico|debil|concepto|recurrente/i.test(tipo) ? "critical" : "warning";
}

function getMateriaFromTema(tema = "") {
  return /ortografia|tilde|diptongo|sustantivo|verbo|sujeto|concordancia|comprension|discurso|produccion/i.test(tema)
    ? "lengua"
    : "matematica";
}

function formatTema(tema = "") {
  return String(tema).replaceAll("_", " ");
}

function formatDate(value) {
  if (!value) return "Sin fecha";

  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parseSupabaseDate(value));
}

function parseSupabaseDate(value) {
  const text = String(value);
  const hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(text);
  return new Date(hasTimezone ? text : `${text}Z`);
}

function daysUntil(dateString) {
  const today = new Date();
  const exam = new Date(`${dateString}T12:00:00`);
  return Math.max(0, Math.ceil((exam.getTime() - today.getTime()) / 86400000));
}

function clamp(value) {
  return Math.min(100, Math.max(0, Math.round(value || 0)));
}

function cleanMathExpressions(mathContent) {
  let clean = mathContent;
  // Replace \times with × and \div with ÷
  clean = clean.replace(/\\times/g, " × ");
  clean = clean.replace(/\\div/g, " ÷ ");
  // Replace \frac{a}{b} with a/b, wrapping in parentheses if it has operations
  clean = clean.replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, (m, p1, p2) => {
    const num = p1.includes("+") || p1.includes("-") || p1.includes(" ") ? `(${p1.trim()})` : p1.trim();
    const den = p2.includes("+") || p2.includes("-") || p2.includes(" ") ? `(${p2.trim()})` : p2.trim();
    return `${num}/${den}`;
  });
  // Replace \text{something} with something
  clean = clean.replace(/\\text\s*\{([^{}]+)\}/g, "$1");
  // Replace \quad with spaces
  clean = clean.replace(/\\quad/g, "  ");
  return clean;
}

function cleanMathText(text) {
  if (text === null || text === undefined) return "";
  let s = String(text);
  
  // Parse block math $$...$$
  s = s.replace(/\$\$(.*?)\$\$/g, (match, mathContent) => {
    return cleanMathExpressions(mathContent);
  });
  
  // Parse inline math $...$
  s = s.replace(/\$(.*?)\$/g, (match, mathContent) => {
    return cleanMathExpressions(mathContent);
  });
  
  return s;
}

function MarkdownRenderer({ content }) {
  if (!content) return null;

  const lines = content.split("\n");
  const parsedElements = [];
  let currentList = [];
  let tableRows = [];
  let inTable = false;

  const renderList = (key) => {
    if (currentList.length > 0) {
      parsedElements.push(
        <ul key={`list-${key}`} style={{ marginLeft: "20px", marginBottom: "16px", listStyleType: "disc" }}>
          {currentList.map((item, index) => (
            <li key={index} style={{ marginBottom: "6px", lineHeight: "1.5", color: "#475569" }}>
              {renderInlineStyles(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const renderTable = (key) => {
    if (tableRows.length > 0) {
      const headers = tableRows[0].split("|").map(s => s.trim()).filter(Boolean);
      const rows = tableRows.slice(2).map(row => row.split("|").map(s => s.trim()).filter(Boolean)).filter(r => r.length > 0);

      parsedElements.push(
        <div key={`table-wrapper-${key}`} className="table-responsive" style={{ overflowX: "auto", margin: "16px 0", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                {headers.map((h, i) => (
                  <th key={i} style={{ padding: "10px 14px", fontWeight: "600", color: "#1e293b" }}>{renderInlineStyles(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} style={{ borderBottom: "1px solid #edf2f7" }}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ padding: "10px 14px", color: "#475569" }}>{renderInlineStyles(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  const renderInlineStyles = (text) => {
    const cleaned = cleanMathText(text);
    const parts = cleaned.split(/\*\*([\s\S]*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} style={{ color: "#0f172a", fontWeight: "600" }}>{part}</strong>;
      }
      return part;
    });
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line) {
      if (currentList.length > 0) renderList(index);
      if (inTable) renderTable(index);
      continue;
    }

    if (line.startsWith("|")) {
      if (currentList.length > 0) renderList(index);
      inTable = true;
      tableRows.push(line);
      continue;
    } else if (inTable) {
      renderTable(index);
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      currentList.push(line.slice(2));
      continue;
    } else if (currentList.length > 0) {
      renderList(index);
    }

    if (line.startsWith("$$")) {
      let formula = line;
      if (line.endsWith("$$") && line.length > 4) {
        formula = line.slice(2, -2);
      } else {
        formula = line.replace(/^\$\$/, "").replace(/\$\$/, "");
      }
      parsedElements.push(
        <div key={index} style={{
          textAlign: "center",
          margin: "16px 0",
          padding: "12px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontFamily: "monospace",
          fontSize: "1.05rem",
          color: "#0f172a",
          fontWeight: "600",
          letterSpacing: "0.5px"
        }}>
          {cleanMathText(formula)}
        </div>
      );
    } else if (line.startsWith("### ")) {
      parsedElements.push(
        <h3 key={index} style={{ color: "#0f172a", fontSize: "1.4rem", fontWeight: "600", marginTop: "24px", marginBottom: "12px", borderBottom: "1px solid #f1f5f9", paddingBottom: "6px" }}>
          {renderInlineStyles(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith("#### ")) {
      parsedElements.push(
        <h4 key={index} style={{ color: "#1e293b", fontSize: "1.15rem", fontWeight: "600", marginTop: "18px", marginBottom: "8px" }}>
          {renderInlineStyles(line.slice(5))}
        </h4>
      );
    } else if (line.startsWith("## ")) {
      parsedElements.push(
        <h2 key={index} style={{ color: "#0f172a", fontSize: "1.6rem", fontWeight: "700", marginTop: "28px", marginBottom: "14px" }}>
          {renderInlineStyles(line.slice(3))}
        </h2>
      );
    } else {
      parsedElements.push(
        <p key={index} style={{ color: "#475569", fontSize: "1.02rem", lineHeight: "1.6", marginBottom: "14px" }}>
          {renderInlineStyles(line)}
        </p>
      );
    }
  }

  if (currentList.length > 0) renderList(lines.length);
  if (inTable) renderTable(lines.length);

  return <div className="markdown-body" style={{ padding: "8px 0" }}>{parsedElements}</div>;
}
