import { useEffect, useState } from "react";

export default function DashboardPapas({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/progreso?user_id=${encodeURIComponent(userId)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "No se pudo cargar el dashboard.");
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [userId]);

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

function statusFor(tasa) {
  const value = Number(tasa || 0);
  if (value >= 80) return { label: "Bien", className: "good" };
  if (value >= 50) return { label: "En curso", className: "progress" };
  return { label: "Refuerzo", className: "review" };
}

function alertIcon(tipo) {
  return /critico|debil|concepto|recurrente/i.test(tipo) ? "🔴" : "⚠️";
}

function alertClass(tipo) {
  return /critico|debil|concepto|recurrente/i.test(tipo) ? "critical" : "warning";
}

function formatTema(tema) {
  return tema.replaceAll("_", " ");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function daysUntil(dateString) {
  const today = new Date();
  const exam = new Date(`${dateString}T12:00:00`);
  return Math.max(0, Math.ceil((exam.getTime() - today.getTime()) / 86400000));
}
