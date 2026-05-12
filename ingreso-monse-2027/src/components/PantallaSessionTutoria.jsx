import { useEffect, useRef, useState } from "react";
import Monse from "./Monse";

export default function PantallaSessionTutoria({ user_id, tema, capa, modo }) {
  const [pregunta, setPregunta] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [sesionId, setSesionId] = useState(null);
  const [evaluacion, setEvaluacion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const startTime = useRef(Date.now());

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setError("");
      setEvaluacion(null);
      setRespuesta("");
      startTime.current = Date.now();

      try {
        const res = await fetch("/api/sesion/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id, tema, capa, modo }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "No se pudo iniciar la sesion.");
        setPregunta(data);
        setSesionId(data.sesion_id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [user_id, tema, capa, modo]);

  const handleSubmit = async () => {
    if (!respuesta.trim() || !sesionId) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/sesion/respuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sesion_id: sesionId,
          respuesta_usuario: respuesta,
          tiempo_segundos: Math.round((Date.now() - startTime.current) / 1000),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo evaluar la respuesta.");
      setEvaluacion(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSiguiente = async () => {
    const decision = evaluacion?.decision || {};
    const proximoTema = decision.proximo_tema || tema;
    const proximaCapa = decision.proxima_capa || capa;
    const proximoModo = decision.modo_recomendado || modo || "NORMAL";

    setLoading(true);
    setError("");
    setRespuesta("");

    try {
      const res = await fetch("/api/sesion/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          tema: proximoTema,
          capa: proximaCapa,
          modo: proximoModo,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo cargar la siguiente pregunta.");
      setPregunta(data);
      setSesionId(data.sesion_id);
      setEvaluacion(null);
      startTime.current = Date.now();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const theme = themeForTema(tema);

  return (
    <section className={`tutoria-panel theme-${theme}`} aria-live="polite">
      <header className="session-header student-session-header">
        <Monse />
      </header>

      {loading && <p className="status">Monse esta pensando...</p>}
      {error && <p className="error">{error}</p>}

      {!evaluacion && pregunta?.tipo === "leccion" && (
        <div className="lesson-area">
          {pregunta.saludo && <p className="lesson-greeting">{pregunta.saludo}</p>}
          {pregunta.explicacion && <div className="lesson-explanation">{pregunta.explicacion}</div>}

          {pregunta.ejemplos_resueltos?.length > 0 && (
            <div className="lesson-examples">
              <h3>Ejemplos</h3>
              {pregunta.ejemplos_resueltos.map((ejemplo, index) => (
                <article className="lesson-example" key={`${ejemplo.enunciado}-${index}`}>
                  <strong>{ejemplo.enunciado}</strong>
                  <div className="lesson-steps">
                    {ejemplo.pasos?.map((paso, pasoIndex) => (
                      <p key={`${paso}-${pasoIndex}`}>{paso}</p>
                    ))}
                  </div>
                  {ejemplo.respuesta && <p className="lesson-answer">Respuesta: {ejemplo.respuesta}</p>}
                </article>
              ))}
            </div>
          )}

          <div className="practice-card">
            <h3>Ahora proba vos</h3>
            <p className="question-text small">
              {pregunta.ejercicio_practica?.enunciado || pregunta.pregunta}
            </p>
            {pregunta.ejercicio_practica?.pista && <p className="hint">Pista: {pregunta.ejercicio_practica.pista}</p>}
            <textarea
              placeholder="Escribi tu respuesta aca..."
              value={respuesta}
              onChange={(event) => setRespuesta(event.target.value)}
              rows={5}
            />
            <button className="primary" onClick={handleSubmit} disabled={!respuesta.trim() || loading}>
              Enviar
            </button>
          </div>
        </div>
      )}

      {!evaluacion && pregunta?.tipo !== "leccion" && pregunta && (
        <div className="question-area">
          <p className="question-text">{pregunta.pregunta}</p>

          {pregunta.opciones?.length > 0 && (
            <div className="answer-options" aria-label="Opciones de respuesta">
              {pregunta.opciones.map((opcion) => (
                <span key={opcion}>{opcion}</span>
              ))}
            </div>
          )}

          <textarea
            placeholder="Escribi tu respuesta aca..."
            value={respuesta}
            onChange={(event) => setRespuesta(event.target.value)}
            rows={5}
          />

          <button className="primary" onClick={handleSubmit} disabled={!respuesta.trim() || loading}>
            Enviar
          </button>
        </div>
      )}

      {evaluacion && (
        <div className={`feedback ${evaluacion.es_correcta ? "correct" : "review"}`}>
          <Monse mensaje={evaluacion.retroalimentacion} />
          <button type="button" className="primary" onClick={handleSiguiente} disabled={loading}>
            Siguiente pregunta
          </button>
        </div>
      )}
    </section>
  );
}

function themeForTema(tema) {
  if (tema.includes("fraccion") || tema.includes("porcentaje")) return "math";
  if (tema.includes("concordancia") || tema.includes("lectora")) return "language";
  if (tema.includes("biologia") || tema.includes("ciencias")) return "science";
  return "general";
}
