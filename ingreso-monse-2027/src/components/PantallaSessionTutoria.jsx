import { useEffect, useMemo, useRef, useState } from "react";
import Monse from "./Monse";

export default function PantallaSessionTutoria({ user_id, tema, capa, modo }) {
  const [pregunta, setPregunta] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [sesionId, setSesionId] = useState(null);
  const [evaluacion, setEvaluacion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pasoActual, setPasoActual] = useState(0);
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
        setPasoActual(0);
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
      setPasoActual(0);
      startTime.current = Date.now();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const theme = themeForTema(tema);
  const pasos = useMemo(() => {
    if (!pregunta || pregunta.tipo !== "leccion") return [];

    const lessonSteps = [
      {
        tipo: "intro",
        contenido: {
          saludo: pregunta.saludo,
          explicacion: pregunta.explicacion_simple || pregunta.explicacion,
          concepto: pregunta.concepto_clave_repetir,
        },
      },
    ];

    pregunta.ejemplos_resueltos?.forEach((ejemplo, index) => {
      lessonSteps.push({
        tipo: "ejemplo",
        numero: index + 1,
        contenido: ejemplo,
      });
    });

    lessonSteps.push({
      tipo: "ejercicio",
      contenido: pregunta.ejercicio_practica || {
        enunciado: pregunta.pregunta,
        pista: pregunta.indicaciones_visuales,
      },
    });

    return lessonSteps;
  }, [pregunta]);
  const pasoActualData = pasos[pasoActual];
  const totalPasos = pasos.length;

  return (
    <section className={`tutoria-panel theme-${theme}`} aria-live="polite">
      <header className="session-header student-session-header">
        <Monse />
      </header>

      {loading && <p className="status">Monse esta pensando...</p>}
      {error && <p className="error">{error}</p>}

      {!evaluacion && pregunta?.tipo === "leccion" && pasoActualData && (
        <div className="lesson-step-shell">
          <div className="lesson-progress" aria-label={`Paso ${pasoActual + 1} de ${totalPasos}`}>
            {pasos.map((step, index) => (
              <span
                key={`${step.tipo}-${index}`}
                className={index === pasoActual ? "current" : index < pasoActual ? "done" : ""}
              />
            ))}
          </div>

          <div className="lesson-step-card">
            {pasoActualData.tipo === "intro" && (
              <div className="lesson-step-content intro-step">
                <h2>{pasoActualData.contenido.saludo}</h2>
                <p>{pasoActualData.contenido.explicacion}</p>
                {pasoActualData.contenido.concepto && <div className="key-concept">{pasoActualData.contenido.concepto}</div>}
              </div>
            )}

            {pasoActualData.tipo === "ejemplo" && (
              <div className="lesson-step-content example-step">
                <div className="example-heading">
                  <span aria-hidden="true">{emojiForContext(pasoActualData.contenido.contexto)}</span>
                  <div>
                    <p className="eyebrow">Ejemplo {pasoActualData.numero}</p>
                    <h2>{pasoActualData.contenido.contexto || "Vamos paso a paso"}</h2>
                  </div>
                </div>

                <p className="example-question">{pasoActualData.contenido.enunciado}</p>

                <div className="lesson-steps">
                  {pasoActualData.contenido.pasos?.map((paso, index) => (
                    <p key={`${paso}-${index}`}>
                      <span aria-hidden="true">→</span>
                      {paso}
                    </p>
                  ))}
                </div>

                {pasoActualData.contenido.respuesta && (
                  <div className="lesson-answer">Respuesta: {pasoActualData.contenido.respuesta}</div>
                )}

                {pasoActualData.contenido.refuerzo && <p className="lesson-reinforcement">{pasoActualData.contenido.refuerzo}</p>}
              </div>
            )}

            {pasoActualData.tipo === "ejercicio" && (
              <div className="lesson-step-content exercise-step">
                <h2>Ahora proba vos</h2>
                <p className="question-text small">{pasoActualData.contenido.enunciado}</p>
                {pasoActualData.contenido.pista && <div className="hint">Pista: {pasoActualData.contenido.pista}</div>}
                <textarea
                  placeholder="Escribi tu respuesta aca..."
                  value={respuesta}
                  onChange={(event) => setRespuesta(event.target.value)}
                  rows={4}
                />
                <button className="primary" onClick={handleSubmit} disabled={!respuesta.trim() || loading}>
                  {loading ? "Enviando..." : "Enviar respuesta"}
                </button>
                {pregunta.cierre_motivacional && <p className="lesson-close">{pregunta.cierre_motivacional}</p>}
              </div>
            )}
          </div>

          <div className="lesson-navigation">
            <button type="button" onClick={() => setPasoActual(Math.max(0, pasoActual - 1))} disabled={pasoActual === 0}>
              ← Anterior
            </button>
            <span>
              Paso {pasoActual + 1} de {totalPasos}
            </span>
            {pasoActual < totalPasos - 1 ? (
              <button type="button" className="primary compact" onClick={() => setPasoActual(pasoActual + 1)}>
                Siguiente →
              </button>
            ) : (
              <span className="nav-spacer" aria-hidden="true" />
            )}
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
  if (tema.includes("fraccion") || tema.includes("porcentaje") || tema.includes("numero") || tema.includes("grafico")) return "math";
  if (tema.includes("concordancia") || tema.includes("lectora") || tema.includes("ortografia") || tema.includes("tilde")) return "language";
  if (tema.includes("biologia") || tema.includes("ciencias")) return "science";
  return "general";
}

function emojiForContext(contexto = "") {
  const text = contexto.toLowerCase();
  if (text.includes("pizza")) return "🍕";
  if (text.includes("caramelo")) return "🍬";
  if (text.includes("galleta")) return "🍪";
  if (text.includes("lapiz") || text.includes("lapices")) return "✏️";
  if (text.includes("sticker") || text.includes("figurita")) return "✨";
  if (text.includes("grafico")) return "📊";
  if (text.includes("ortografia")) return "📚";
  return "🟢";
}
