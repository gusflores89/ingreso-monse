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
                <TopicProgressCard item={item} key={item.id || item.tema} />
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

          {esTrial && trialCompletados === 4 && (
            <section className="dashboard-panel alert-item critical" style={{ margin: "24px 0", borderLeft: "4px solid #ef4444", backgroundColor: "#fef2f2" }}>
              <div className="alert-title">
                <span aria-hidden="true" style={{ fontSize: "1.2rem" }}>🎉</span>
                <strong style={{ color: "#b91c1c", fontSize: "1.1rem" }}>¡Muestra Gratuita Completada!</strong>
              </div>
              <p style={{ color: "#7f1d1d", margin: "8px 0", lineHeight: "1.5" }}>
                El estudiante completó con éxito los 4 temas del plan de prueba. Para habilitar los más de 30 temas del currículum completo de ingreso (incluyendo perímetros compuestos, divisibilidad, verbos en modo indicativo y más), activa el Acceso Completo.
              </p>
              <div style={{ marginTop: "12px" }}>
                <span style={{ fontSize: "0.9rem", color: "#991b1b", fontWeight: "600" }}>
                  💡 Para activar, comunicate con el administrador y solicita el pase a Plan Full.
                </span>
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

function TopicProgressCard({ item }) {
  const status = statusFor(item);
  const tasa = clamp(Number(item.tasa_acierto || 0));

  return (
    <article className={`topic-card rich-topic-card ${status.className}`}>
      <div className="topic-card-top">
        <div>
          <span className="topic-materia">{MATERIA_LABELS[item.materia] || formatTema(item.materia || "general")}</span>
          <h4>{formatTema(item.tema)}</h4>
        </div>
        <span className={`status-pill ${status.className}`}>{status.label}</span>
      </div>

      <strong>{tasa}%</strong>
      <div className="progress-track" aria-label={`Tasa de acierto ${tasa}%`}>
        <i style={{ width: `${tasa}%` }} />
      </div>

      <div className="topic-meta-row">
        <span>{item.total_sesiones} sesiones</span>
        <span>Capa {item.capa_actual}</span>
        <span>{item.total_correctas} correctas</span>
      </div>
      <p>{item.oportunidad || "Seguir practicando con sesiones cortas."}</p>
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
    const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
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

    if (line.startsWith("### ")) {
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
