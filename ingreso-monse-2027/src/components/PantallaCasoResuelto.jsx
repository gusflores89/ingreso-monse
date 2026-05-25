import { useState } from "react";

export default function PantallaCasoResuelto({ caso, metodo, loading, onContinuar }) {
  const [pasoActual, setPasoActual] = useState(0);
  const [mostrandoMetodo, setMostrandoMetodo] = useState(true);

  if (!caso) return null;

  if (mostrandoMetodo) {
    return (
      <div className="solved-case-shell">
        <section className="method-card">
          <p className="eyebrow">Antes de practicar</p>
          <h2>🧩 {metodo?.titulo || "Metodo para resolver problemas"}</h2>
          <p>Antes de resolver, siempre segui estos 5 pasos.</p>

          <div className="method-step-list">
            {metodo?.pasos?.map((paso, index) => (
              <article className="method-step" key={`${paso.nombre}-${index}`}>
                <span aria-hidden="true">{paso.emoji}</span>
                <div>
                  <h3>
                    Paso {index + 1}: {paso.nombre}
                  </h3>
                  <p>{paso.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <button type="button" className="primary solved-next-button" onClick={() => setMostrandoMetodo(false)}>
          Ahora veamos un ejemplo resuelto
        </button>
      </div>
    );
  }

  const totalPasos = caso.resolucion?.length || 0;
  const pasosVisibles = caso.resolucion?.slice(0, pasoActual + 1) || [];

  return (
    <div className="solved-case-shell">
      <section className="solved-case-title">
        <p className="eyebrow">Caso resuelto</p>
        <h2>🧩 {caso.titulo}</h2>
      </section>

      <section className="solved-problem-card">
        <h3>📄 Problema</h3>
        <p>{caso.problema}</p>
      </section>

      <div className="solved-resolution-list">
        {pasosVisibles.map((paso, index) => (
          <article className={`solved-step-card ${index === pasoActual ? "current" : ""}`} key={`${paso.paso}-${index}`}>
            <h4>{paso.paso}</h4>
            <p>{paso.contenido}</p>
          </article>
        ))}
      </div>

      <div className="solved-progress" aria-label={`Paso ${pasoActual + 1} de ${totalPasos}`}>
        {caso.resolucion?.map((_, index) => (
          <span key={index} className={index <= pasoActual ? "done" : ""} />
        ))}
      </div>

      <div className="solved-navigation">
        {pasoActual > 0 ? (
          <button type="button" onClick={() => setPasoActual((prev) => Math.max(0, prev - 1))}>
            Anterior
          </button>
        ) : (
          <span className="nav-spacer" aria-hidden="true" />
        )}

        {pasoActual < totalPasos - 1 ? (
          <button type="button" className="primary compact" onClick={() => setPasoActual((prev) => prev + 1)}>
            Siguiente paso
          </button>
        ) : (
          <div className="solved-finish">
            {caso.tip && (
              <div className="solved-tip">
                <strong>Tip:</strong> {caso.tip}
              </div>
            )}
            <button type="button" className="primary solved-practice-button" onClick={onContinuar} disabled={loading}>
              {loading ? "Preparando practica..." : "Entendido, quiero practicar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
