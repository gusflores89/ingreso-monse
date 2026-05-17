import { useEffect, useState } from "react";

const EMPTY_REVISION = {
  resultado: "",
  cantidad_errores: "",
  comentario: "",
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

  const diasRestantes = data?.usuario?.fecha_examen ? daysUntil(data.usuario.fecha_examen) : null;

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Panel familiar</p>
          <h2>{data?.usuario?.nombre || "Abril"}</h2>
          <p>{diasRestantes === null ? "Fecha de examen pendiente" : `Faltan ${diasRestantes} dias`}</p>
        </div>
        <button type="button" onClick={load} disabled={loading}>
          {loading ? "Actualizando..." : "Recargar datos"}
        </button>
      </header>

      {loading && <p className="status">Analizando progreso...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <>
          <section className="dashboard-section">
            <h3>Progreso por tema</h3>
            <div className="topic-card-grid" aria-label="Progreso por tema">
              {data.progreso.length === 0 && <p className="empty-state">Todavia no hay temas con progreso.</p>}
              {data.progreso.map((item) => (
                <article className={`topic-card ${statusFor(item.tasa_acierto).className}`} key={item.id}>
                  <div>
                    <h4>{formatTema(item.tema)}</h4>
                    <span className={`status-pill ${statusFor(item.tasa_acierto).className}`}>{statusFor(item.tasa_acierto).label}</span>
                  </div>
                  <strong>{Number(item.tasa_acierto).toFixed(0)}%</strong>
                  <div className="progress-track" aria-label={`Tasa de acierto ${Number(item.tasa_acierto).toFixed(0)}%`}>
                    <i style={{ width: `${Math.min(100, Math.max(0, Number(item.tasa_acierto || 0)))}%` }} />
                  </div>
                  <p>{item.total_sesiones} sesiones · capa {item.capa_actual}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <h3>Ultimas sesiones</h3>
            <div className="progress-table dashboard-table" role="table" aria-label="Ultimas sesiones">
              <div className="table-row sessions-header" role="row">
                <span>Fecha</span>
                <span>Tema</span>
                <span>Resultado</span>
              </div>
              {data.sesiones_recientes.length === 0 && <p className="empty-state">Todavia no hay sesiones respondidas.</p>}
              {data.sesiones_recientes.slice(0, 8).map((sesion) => (
                <div className="table-row sessions-row" role="row" key={`${sesion.created_at}-${sesion.tema}`}>
                  <span>{formatDate(sesion.created_at)}</span>
                  <span>{formatTema(sesion.tema)}</span>
                  <span className={`status-pill ${sesion.es_correcta ? "good" : "review"}`}>
                    {sesion.es_correcta ? "Correcto" : "Incorrecto"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <h3>Alertas</h3>
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
          </section>

          <section className="dashboard-section handwriting-review-section">
            <h3>Tareas manuscritas pendientes ({tareasPendientes.length})</h3>
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

          {data.insight_markdown && (
            <section className="insight dashboard-section">
              <h3>Insight IA</h3>
              <pre>{data.insight_markdown}</pre>
            </section>
          )}
        </>
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

function statusFor(tasa) {
  const value = Number(tasa || 0);
  if (value >= 80) return { label: "Bien", className: "good" };
  if (value >= 50) return { label: "En curso", className: "progress" };
  return { label: "Refuerzo", className: "review" };
}

function alertIcon(tipo) {
  return /critico|debil|concepto|recurrente/i.test(tipo) ? "Critico" : "Aviso";
}

function alertClass(tipo) {
  return /critico|debil|concepto|recurrente/i.test(tipo) ? "critical" : "warning";
}

function formatTema(tema = "") {
  return tema.replaceAll("_", " ");
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
