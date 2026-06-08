import { useEffect, useMemo, useRef, useState } from "react";
import PantallaCasoResuelto from "./PantallaCasoResuelto";
import VisualizacionMatematica from "./VisualizacionMatematica";
import { CURRICULUM_MATEMATICA, CURRICULUM_LENGUA } from "@/lib/curriculum";
import { TRIAL_TOPICS } from "@/lib/planes";
import { getDiapositivasParaTema } from "@/lib/diapositivas";

export default function PantallaSessionTutoria({ user_id, tema, capa, modo, tutor_preference }) {
  const [pregunta, setPregunta] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [sesionId, setSesionId] = useState(null);
  const [evaluacion, setEvaluacion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [error, setError] = useState("");
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestasExamen, setRespuestasExamen] = useState({});
  const startTime = useRef(Date.now());

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setError("");
      setEvaluacion(null);
      setRespuesta("");
      setRespuestasExamen({});
      startTime.current = Date.now();

      try {
        const res = await fetch("/api/sesion/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id, tema, capa, modo, tutor_preference }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "No se pudo iniciar la sesion.");
        setPregunta(data);
        setSesionId(data.sesion_id);
        setPasoActual(0);
        if (data && data.tipo === "leccion") {
          setHelpTab("slides");
          setCurrentSlideIndex(0);
          setShowHelpModal(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [user_id, tema, capa, modo]);

  const [userProgress, setUserProgress] = useState([]);
  const [completedExams, setCompletedExams] = useState(new Set());
  const [modalLoading, setModalLoading] = useState(false);
  const [bypassLocks, setBypassLocks] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpTab, setHelpTab] = useState("slides");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (showTopicModal && user_id) {
      setModalLoading(true);
      fetch(`/api/progreso?user_id=${encodeURIComponent(user_id)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setUserProgress(data.progreso || []);
            const approved = new Set(
              (data.sesiones_recientes || [])
                .filter((s) => s.tipo_pregunta === "examen_final" && s.es_correcta)
                .map((s) => s.tema)
            );
            setCompletedExams(approved);
            const isTest = data.usuario?.codigo_acceso?.toUpperCase()?.includes("TEST") ||
                           data.usuario?.nombre?.toUpperCase()?.includes("TEST") ||
                           !!data.usuario?.rasgos_especiales?.ruta_flexible;
            setBypassLocks(!!isTest);
          }
        })
        .catch((err) => console.error("Error fetching progress for modal:", err))
        .finally(() => setModalLoading(false));
    }
  }, [showTopicModal, user_id]);

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

  const handleEnviarExamen = async () => {
    const tienePreguntas = pregunta?.preguntas?.length > 0;
    const respuestaPayload = tienePreguntas ? respuestasExamen : { texto: respuesta };
    const hayRespuesta = tienePreguntas
      ? pregunta.preguntas.every((item) => String(respuestaPayload[item.id] || "").trim())
      : respuesta.trim();

    if (!hayRespuesta || !sesionId) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/sesion/respuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sesion_id: sesionId,
          respuesta_usuario: JSON.stringify(respuestaPayload),
          tiempo_segundos: Math.round((Date.now() - startTime.current) / 1000),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo evaluar el examen.");
      setEvaluacion(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSiguiente = async () => {
    const decision = evaluacion?.decision || {};
    const proximoTema = decision.proximo_tema || pregunta?.tema || tema;
    const proximaCapa = decision.proxima_capa || capa;
    const proximoModo = decision.modo_recomendado || modo || "NORMAL";

    setLoading(true);
    setError("");
    setRespuesta("");
    setRespuestasExamen({});

    try {
      const res = await fetch("/api/sesion/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          tema: proximoTema,
          capa: proximaCapa,
          modo: proximoModo,
          tutor_preference,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo cargar la siguiente pregunta.");
      setPregunta(data);
      setSesionId(data.sesion_id);
      setEvaluacion(null);
      setPasoActual(0);
      if (data && data.tipo === "leccion") {
        setHelpTab("slides");
        setCurrentSlideIndex(0);
        setShowHelpModal(true);
      }
      setRespuestasExamen({});
      startTime.current = Date.now();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContinuarCasoResuelto = async () => {
    setLoading(true);
    setError("");
    setRespuesta("");
    setRespuestasExamen({});

    try {
      const res = await fetch("/api/sesion/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          tema: pregunta?.tema || tema,
          capa: pregunta?.capa || capa,
          modo: modo || "NORMAL",
          omitir_caso_resuelto: true,
          tutor_preference,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo cargar la practica.");
      setPregunta(data);
      setSesionId(data.sesion_id);
      setEvaluacion(null);
      setPasoActual(0);
      setRespuestasExamen({});
      startTime.current = Date.now();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTareaCompletada = async () => {
    if (!pregunta?.tarea_id) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/tarea-manuscrita/completar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tarea_id: pregunta.tarea_id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo completar la tarea.");

      setPregunta((prev) => ({ ...prev, estado: data.tarea.estado }));
      setEvaluacion({
        es_correcta: true,
        retroalimentacion:
          "Listo, quedo registrada tu tarea a mano. Priscila la revisa con tu cuaderno el fin de semana.",
        decision: {
          proximo_tema: pregunta?.tema || tema,
          proxima_capa: capa,
          modo_recomendado: modo || "NORMAL",
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTema = async (nuevoTema) => {
    setLoading(true);
    setError("");
    setRespuesta("");
    setRespuestasExamen({});

    try {
      const res = await fetch("/api/sesion/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          tema: nuevoTema,
          modo: modo || "NORMAL",
          omitir_caso_resuelto: false,
          tutor_preference,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo iniciar la practica.");
      setPregunta(data);
      setSesionId(data.sesion_id);
      setEvaluacion(null);
      setPasoActual(0);
      if (data && data.tipo === "leccion") {
        setHelpTab("slides");
        setCurrentSlideIndex(0);
        setShowHelpModal(true);
      }
      setRespuestasExamen({});
      startTime.current = Date.now();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const activeTema = pregunta?.tema || tema || "";
  const theme = themeForTema(activeTema);
  const tutorAvatar = pregunta?.avatar || tutor_preference?.avatar || "buho";
  const tutor = {
    nombre: pregunta?.nombre_tutor || tutor_preference?.nombre_tutor || "Profe",
    color: pregunta?.color_tema || tutor_preference?.color_tema || "#D85A30",
    avatar: tutorAvatar,
    imagen:
      pregunta?.avatar_imagen ||
      `/avatars/${tutorAvatar}.png`,
  };
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

  const visualParaEjercicio = useMemo(() => {
    if (!pregunta) return null;
    const textoParaVisual = pregunta.pregunta || "";
    return visualizacionParaTema(activeTema, textoParaVisual);
  }, [activeTema, pregunta]);

  const deckTeoria = useMemo(() => getDiapositivasParaTema(activeTema), [activeTema]);

  return (
    <section
      className={`tutoria-panel background-decorative theme-${theme}`}
      aria-live="polite"
      style={{
        "--primary": tutor.color,
        "--primary-strong": shadeColor(tutor.color, -18),
        "--secondary": tutor.color,
        "--soft-purple": tintColor(tutor.color, 92),
        "--soft-purple-2": tintColor(tutor.color, 86),
        "--decorative-a": tintColor(tutor.color, 88),
        "--decorative-b": tintColor(tutor.color, 94),
      }}
    >
      <header className="session-header student-session-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TutorHeader tutor={tutor} />
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {pregunta?.tema_sugerido && !pregunta.tema_sugerido.completado && pregunta.tema === pregunta.tema_sugerido.tema && (
            <span className="plan-badge-tutoria" style={{ fontSize: "0.82rem", padding: "4px 12px", borderRadius: "20px", backgroundColor: "rgba(139, 92, 246, 0.2)", color: "#c084fc", border: "1px solid rgba(139, 92, 246, 0.4)", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px", boxShadow: "0 0 10px rgba(139, 92, 246, 0.15)" }}>
              🎯 Misión Familiar Activa
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              setHelpTab("slides");
              setCurrentSlideIndex(0);
              setShowHelpModal(true);
            }}
            style={{
              background: "rgba(139, 92, 246, 0.2)",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              color: "#c084fc",
              padding: "6px 14px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 200ms ease",
              boxShadow: "0 0 10px rgba(139, 92, 246, 0.15)",
              marginRight: "8px"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
          >
            💡 Explicación y PDFs
          </button>
          <button
            type="button"
            onClick={() => setShowTopicModal(true)}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              padding: "6px 14px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 200ms ease"
            }}
          >
            📖 Elegir Tema
          </button>
          {pregunta?.plan === "trial" && (
            <span className="plan-badge-tutoria" style={{ fontSize: "0.85rem", padding: "4px 10px", borderRadius: "20px", backgroundColor: "rgba(254, 226, 226, 0.8)", color: "#ef4444", border: "1px solid #fca5a5", fontWeight: "600" }}>
              Prueba Gratuita
            </span>
          )}
        </div>
      </header>

      {pregunta?.tema_sugerido && !pregunta.tema_sugerido.completado && pregunta.tema !== pregunta.tema_sugerido.tema && (
        <div style={{
          margin: "16px 0 24px 0",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)",
          border: "1px solid rgba(139, 92, 246, 0.4)",
          borderRadius: "12px",
          padding: "16px 20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          boxShadow: "0 4px 15px rgba(139, 92, 246, 0.15), 0 0 10px rgba(139, 92, 246, 0.1)",
          animation: "fadeInUp 0.4s ease both"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "1.8rem" }}>🎯</span>
            <div style={{ textAlign: "left" }}>
              <strong style={{ color: "#ffffff", fontSize: "0.95rem", display: "block", marginBottom: "2px" }}>
                Misión especial de tu familia
              </strong>
              <p style={{ color: "#a59ec9", fontSize: "0.85rem", margin: 0 }}>
                Hoy te sugieren practicar: <strong style={{ color: "#c084fc", textTransform: "capitalize" }}>{pregunta.tema_sugerido.tema.replaceAll("_", " ")}</strong> ({pregunta.tema_sugerido.materia === "lengua" ? "Lengua" : "Matemática"}).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleSelectTema(pregunta.tema_sugerido.tema)}
            disabled={loading}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              color: "#ffffff",
              fontSize: "0.82rem",
              fontWeight: "700",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(139, 92, 246, 0.3)",
              transition: "all 0.2s ease-out",
              minHeight: "auto"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
          >
            Comenzar Misión →
          </button>
        </div>
      )}

      {loading && <p className="status">{tutor.nombre} esta pensando...</p>}
      {error && <p className="error">{error}</p>}

      {!evaluacion && pregunta?.tipo === "trial_completado" && (
        <PantallaTrialCompletado tutor={tutor} />
      )}

      {!evaluacion && pregunta?.tipo === "manuscrita" && (
        <TareaManuscrita pregunta={pregunta} loading={loading} onComplete={handleTareaCompletada} />
      )}

      {!evaluacion && pregunta?.tipo === "caso_resuelto" && (
        <PantallaCasoResuelto
          caso={pregunta.caso}
          metodo={pregunta.metodo}
          loading={loading}
          onContinuar={handleContinuarCasoResuelto}
        />
      )}

      {!evaluacion && pregunta?.tipo === "examen_final" && (
        <ExamenFinal
          pregunta={pregunta}
          tema={activeTema}
          respuestas={respuestasExamen}
          respuestaTexto={respuesta}
          loading={loading}
          onRespuesta={(id, value) => setRespuestasExamen((prev) => ({ ...prev, [id]: value }))}
          onRespuestaTexto={setRespuesta}
          onSubmit={handleEnviarExamen}
          visualParaEjercicio={visualParaEjercicio}
        />
      )}

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
                <h2>{parseInlineMarkdown(pasoActualData.contenido.saludo)}</h2>
                <p>{parseInlineMarkdown(pasoActualData.contenido.explicacion)}</p>
                {pasoActualData.contenido.concepto && <div className="key-concept">{parseInlineMarkdown(pasoActualData.contenido.concepto)}</div>}
              </div>
            )}

            {pasoActualData.tipo === "ejemplo" && (
              <div className="lesson-step-content example-step">
                <div className="example-heading">
                  <span aria-hidden="true">{emojiForContext(pasoActualData.contenido.contexto)}</span>
                  <div>
                    <p className="eyebrow">Ejemplo {pasoActualData.numero}</p>
                    <h2>{parseInlineMarkdown(pasoActualData.contenido.contexto || "Vamos paso a paso")}</h2>
                  </div>
                </div>

                <p className="example-question">{parseInlineMarkdown(pasoActualData.contenido.enunciado)}</p>
                <MathExampleVisual tema={activeTema} ejemplo={pasoActualData.contenido} />

                <div className="lesson-steps">
                  {pasoActualData.contenido.pasos?.map((paso, index) => (
                    <article className="lesson-step-row" key={`${paso}-${index}`}>
                      <span aria-hidden="true">{index + 1}</span>
                      <p>{parseInlineMarkdown(paso)}</p>
                    </article>
                  ))}
                </div>

                {pasoActualData.contenido.respuesta && (
                  <div 
                    className="lesson-answer"
                    style={{
                      border: "1px solid rgba(34, 197, 94, 0.3)",
                      background: "#0f2418",
                      color: "#22c55e",
                      padding: "14px 16px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginTop: "16px"
                    }}
                  >
                    <span aria-hidden="true" style={{ fontSize: "1.2rem", fontWeight: "700" }}>✓</span>
                    <div>
                      <small style={{ display: "block", fontSize: "0.75rem", color: "#86efac", fontWeight: "600", textTransform: "uppercase" }}>Respuesta</small>
                      <strong style={{ color: "#ffffff", fontSize: "0.95rem" }}>{parseInlineMarkdown(pasoActualData.contenido.respuesta)}</strong>
                    </div>
                  </div>
                )}

                {pasoActualData.contenido.refuerzo && (
                  <p 
                    className="lesson-reinforcement"
                    style={{
                      background: "#1f1a0f",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      borderLeft: "6px solid #f59e0b",
                      color: "#e8e4f0",
                      padding: "14px 16px",
                      borderRadius: "8px",
                      marginTop: "12px",
                      fontSize: "0.92rem",
                      lineHeight: "1.5"
                    }}
                  >
                    <span style={{ color: "#f59e0b", fontWeight: "700", marginRight: "6px" }}>Tip:</span> {parseInlineMarkdown(pasoActualData.contenido.refuerzo)}
                  </p>
                )}
              </div>
            )}

            {pasoActualData.tipo === "ejercicio" && (
              <div className="lesson-step-content exercise-step">
                <h2>Ahora proba vos</h2>
                <p className="question-text small">{parseInlineMarkdown(pasoActualData.contenido.enunciado)}</p>
                {visualParaEjercicio && (
                  <div style={{ marginBottom: "20px" }}>
                    <VisualizacionMatematica tipo={visualParaEjercicio.tipo} datos={visualParaEjercicio.datos} />
                  </div>
                )}
                <textarea
                  placeholder="Escribi tu respuesta aca..."
                  value={respuesta}
                  onChange={(event) => setRespuesta(event.target.value)}
                  rows={4}
                />
                <button className="primary" onClick={handleSubmit} disabled={!respuesta.trim() || loading}>
                  {loading ? "Enviando..." : "Enviar respuesta"}
                </button>
                <div 
                  className="exercise-tip"
                  style={{
                    background: "#1f1a0f",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    color: "#f59e0b",
                    padding: "14px 16px",
                    borderRadius: "8px",
                    marginTop: "12px",
                    textAlign: "center",
                    fontSize: "0.92rem",
                    lineHeight: "1.5",
                    fontWeight: "600"
                  }}
                >
                  Tip: {parseInlineMarkdown(pasoActualData.contenido.pista || "Recorda: primero mira que queda, despues resolve con ese resto.")}
                </div>
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

      {!evaluacion &&
        pregunta?.tipo !== "leccion" &&
        pregunta?.tipo !== "manuscrita" &&
        pregunta?.tipo !== "examen_final" &&
        pregunta?.tipo !== "caso_resuelto" &&
        pregunta && (
        <div className="question-area">
          <p className="question-text">{parseInlineMarkdown(pregunta.pregunta)}</p>

          {visualParaEjercicio && (
            <div style={{ marginBottom: "20px" }}>
              <VisualizacionMatematica tipo={visualParaEjercicio.tipo} datos={visualParaEjercicio.datos} />
            </div>
          )}

          {pregunta.opciones?.length > 0 && (
            <div className="answer-options" aria-label="Opciones de respuesta">
              {pregunta.opciones.map((opcion) => (
                <span key={opcion}>{parseInlineMarkdown(opcion)}</span>
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
          <TutorMessage tutor={tutor} mensaje={evaluacion.retroalimentacion} />
          <button type="button" className="primary" onClick={handleSiguiente} disabled={loading}>
            Siguiente pregunta
          </button>
          {!evaluacion.es_correcta && (
            <button
              type="button"
              onClick={() => {
                setHelpTab("theory");
                setShowHelpModal(true);
              }}
              style={{
                marginTop: "10px",
                background: "rgba(245, 158, 11, 0.1)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                color: "#f59e0b",
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "all 200ms ease",
                width: "100%",
                textAlign: "center"
              }}
            >
              📖 No entendí, ver explicación detallada o descargar PDF
            </button>
          )}
        </div>
      )}

      {showTopicModal && (
        <div className="topic-modal-overlay" onClick={() => setShowTopicModal(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(11, 8, 26, 0.85)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(6px)" }}>
          <div className="topic-modal-card" onClick={(e) => e.stopPropagation()} style={{ background: "#110d24", border: "1px solid #2a204d", borderRadius: "16px", width: "min(780px, 95%)", maxHeight: "88vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(99, 102, 241, 0.15)" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: "1px solid #2a204d" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#ffffff", letterSpacing: "-0.3px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span>🎓</span> El Camino del Aspirante
                </h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "0.82rem", color: "#a59ec9" }}>Consolida cada fase para habilitar los desafíos avanzados del Monserrat</p>
              </div>
              <button type="button" onClick={() => setShowTopicModal(false)} style={{ background: "transparent", border: "none", color: "#9590a6", fontSize: "1.8rem", cursor: "pointer", transition: "color 150ms", padding: "0 4px" }}>&times;</button>
            </div>

            {/* Scrollable Phases Container */}
            <div style={{ padding: "24px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "28px" }}>
              {modalLoading && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "40px", color: "#a855f7" }}>
                  <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>Cargando tu progreso escolar...</span>
                </div>
              )}

              {!modalLoading && (() => {
                const topicsFase1 = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => t.fase === 1);
                const topicsFase2 = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => t.fase === 2);
                const topicsFase3 = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => t.fase === 3);
                const topicsFase4 = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => t.fase === 4);

                const approvedFase1 = topicsFase1.filter(t => completedExams.has(t.tema)).length;
                const approvedFase2 = topicsFase2.filter(t => completedExams.has(t.tema)).length;
                const approvedFase3 = topicsFase3.filter(t => completedExams.has(t.tema)).length;
                const approvedFase4 = topicsFase4.filter(t => completedExams.has(t.tema)).length;

                const unlockedFase1 = true;
                const unlockedFase2 = bypassLocks || approvedFase1 >= 6;
                const unlockedFase3 = bypassLocks || (unlockedFase2 && approvedFase2 >= 4);
                const unlockedFase4 = bypassLocks || (unlockedFase3 && approvedFase3 >= 4);
                const unlockedFase5 = bypassLocks || (unlockedFase4 && approvedFase4 >= 10);

                return (
                  <>
                    {/* FASE 1 */}
                    <PhaseSection
                      number={1}
                      title="Cimientos y Numeración Básica"
                      subtitle="Asegura las bases operativas, ortografía básica y sistemas de conteo."
                      unlocked={unlockedFase1}
                      approvedCount={approvedFase1}
                      totalCount={topicsFase1.length}
                      topics={topicsFase1}
                      completedExams={completedExams}
                      activeTema={activeTema}
                      pregunta={pregunta}
                      handleSelectTema={handleSelectTema}
                      setShowTopicModal={setShowTopicModal}
                      userProgress={userProgress}
                      bypassLocks={bypassLocks}
                    />

                    {/* FASE 2 */}
                    <PhaseSection
                      number={2}
                      title="Fraccionamiento Aritmético"
                      subtitle="Conceptos elementales de partición, múltiplos y morfología verbal básica."
                      unlocked={unlockedFase2}
                      requiredText="Aprobar al menos 6 temas de la Fase 1 para desbloquear."
                      approvedCount={approvedFase2}
                      totalCount={topicsFase2.length}
                      topics={topicsFase2}
                      completedExams={completedExams}
                      activeTema={activeTema}
                      pregunta={pregunta}
                      handleSelectTema={handleSelectTema}
                      setShowTopicModal={setShowTopicModal}
                      userProgress={userProgress}
                      bypassLocks={bypassLocks}
                    />

                    {/* FASE 3 */}
                    <PhaseSection
                      number={3}
                      title="Operaciones Complejas e Inferencia"
                      subtitle="La fracción del resto, decimales y análisis inferencial discursivo."
                      unlocked={unlockedFase3}
                      requiredText="Aprobar al menos 4 temas de la Fase 2 para desbloquear."
                      approvedCount={approvedFase3}
                      totalCount={topicsFase3.length}
                      topics={topicsFase3}
                      completedExams={completedExams}
                      activeTema={activeTema}
                      pregunta={pregunta}
                      handleSelectTema={handleSelectTema}
                      setShowTopicModal={setShowTopicModal}
                      userProgress={userProgress}
                      bypassLocks={bypassLocks}
                    />

                    {/* FASE 4 */}
                    <PhaseSection
                      number={4}
                      title="Geometría Compuesta y Producción Textual"
                      subtitle="Perímetros irregulares, ángulos consecutivos y redacción bajo consignas restrictivas."
                      unlocked={unlockedFase4}
                      requiredText="Aprobar al menos 4 temas de la Fase 3 para desbloquear."
                      approvedCount={approvedFase4}
                      totalCount={topicsFase4.length}
                      topics={topicsFase4}
                      completedExams={completedExams}
                      activeTema={activeTema}
                      pregunta={pregunta}
                      handleSelectTema={handleSelectTema}
                      setShowTopicModal={setShowTopicModal}
                      userProgress={userProgress}
                      bypassLocks={bypassLocks}
                    />

                    {/* FASE 5 */}
                    <div style={{
                      padding: "20px",
                      borderRadius: "12px",
                      background: unlockedFase5 
                        ? "linear-gradient(135deg, #1e152a 0%, #301740 50%, #4c1d63 100%)" 
                        : "rgba(255,255,255,0.01)",
                      border: unlockedFase5 
                        ? "1px solid #d97706" 
                        : "1px solid rgba(255,255,255,0.03)",
                      boxShadow: unlockedFase5 ? "0 4px 20px rgba(217, 119, 6, 0.15)" : "none",
                      opacity: unlockedFase5 ? 1 : 0.6,
                      transition: "all 300ms ease",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: unlockedFase5 ? "#fbbf24" : "#94a3b8" }}>
                            Fase 5: Simulación Extrema (Examen Real)
                          </h4>
                          <p style={{ margin: "4px 0 0 0", fontSize: "0.82rem", color: unlockedFase5 ? "#e9d5ff" : "#64748b" }}>
                            Exámenes históricos completos simulados bajo condiciones estrictas del Colegio Monserrat.
                          </p>
                        </div>
                        <span style={{ fontSize: "1.5rem" }}>{unlockedFase5 ? "🏆" : "🔒"}</span>
                      </div>

                      {!unlockedFase5 && (
                        <div style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px", background: "rgba(0,0,0,0.2)", padding: "8px 12px", borderRadius: "6px", border: "1px dashed rgba(255,255,255,0.05)" }}>
                          <span>🔒</span> Requiere completar y aprobar al menos 10 temas de la Fase 4 para habilitar el Aula Magna.
                        </div>
                      )}

                      {unlockedFase5 && (
                        <button
                          type="button"
                          onClick={() => {
                            handleSelectTema(topicsFase4[0]?.tema || "graficos_estadisticos");
                            setShowTopicModal(false);
                          }}
                          style={{
                            padding: "10px 16px",
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                            color: "#110d24",
                            fontWeight: "700",
                            border: "none",
                            cursor: "pointer",
                            textAlign: "center",
                            fontSize: "0.88rem",
                            boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
                            alignSelf: "start"
                          }}
                        >
                          Ingresar al Aula Magna (Simulación Oficial) →
                        </button>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Trial Banner Footer */}
            {pregunta?.plan === "trial" && (
              <div style={{ padding: "12px 20px", background: "rgba(239, 68, 68, 0.05)", borderTop: "1px solid #2a204d", borderRadius: "0 0 16px 16px", fontSize: "0.8rem", color: "#fca5a5", textAlign: "center" }}>
                💡 En la muestra gratuita tienes 4 temas disponibles. Activa el Acceso Completo para desbloquear el camino de 5 fases.
              </div>
            )}
          </div>
        </div>
      )}
      {showHelpModal && (
        <div className="topic-modal-overlay" onClick={() => setShowHelpModal(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(11, 8, 26, 0.85)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(6px)" }}>
          <div className="topic-modal-card" onClick={(e) => e.stopPropagation()} style={{ background: "#110d24", border: "1px solid #2a204d", borderRadius: "16px", width: "min(840px, 95%)", maxHeight: "88vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(99, 102, 241, 0.15)" }}>
            
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: "1px solid #2a204d" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#ffffff", letterSpacing: "-0.3px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span>📖</span> {deckTeoria.titulo}
                </h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "0.82rem", color: "#a59ec9" }}>Material de apoyo teórico y descargas oficiales</p>
              </div>
              <button type="button" onClick={() => setShowHelpModal(false)} style={{ background: "transparent", border: "none", color: "#9590a6", fontSize: "1.8rem", cursor: "pointer", transition: "color 150ms", padding: "0 4px" }}>&times;</button>
            </div>

            {/* Tabs selector */}
            <div style={{ display: "flex", borderBottom: "1px solid #2a204d", padding: "0 24px", background: "rgba(0,0,0,0.15)" }}>
              {[
                { id: "slides", label: "🛝 Diapositivas" },
                ...(activeTema === "fracciones_concepto" ? [{ id: "interactive", label: "🍕 Explorador de Fracciones" }] : []),
                ...(activeTema === "fracciones_operaciones" || activeTema === "fracciones_del_resto" ? [{ id: "interactive_ops", label: "🧮 Simulador de Operaciones" }] : []),
                { id: "theory", label: "📚 Apunte Teórico" },
                { id: "pdf", label: "📥 Descargar Ficha PDF" }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setHelpTab(tab.id)}
                  style={{
                    padding: "14px 20px",
                    background: "transparent",
                    border: "none",
                    borderBottom: helpTab === tab.id ? "3px solid #8b5cf6" : "3px solid transparent",
                    color: helpTab === tab.id ? "#ffffff" : "#9590a6",
                    fontWeight: "600",
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "all 150ms ease"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div style={{ padding: "24px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column" }}>
              
              {helpTab === "slides" && (() => {
                const currentSlide = deckTeoria.slides[currentSlideIndex];
                if (!currentSlide) return <p>No hay diapositivas disponibles.</p>;
                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
                    <div style={{ display: "grid", gridTemplateColumns: currentSlide.visualizacion ? "1fr 1fr" : "1fr", gap: "24px", alignItems: "center" }}>
                      
                      {/* Texto */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h4 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: "700", margin: 0 }}>
                          {currentSlideIndex + 1}. {currentSlide.titulo}
                        </h4>
                        <p style={{ color: "#e8e4f0", fontSize: "0.92rem", lineHeight: "1.6", margin: 0, whiteSpace: "pre-line" }}>
                          {parseInlineMarkdown(currentSlide.contenido)}
                        </p>
                        {currentSlide.concepto_clave && (
                          <div style={{ background: "rgba(139, 92, 246, 0.1)", borderLeft: "4px solid #8b5cf6", padding: "10px 14px", borderRadius: "0 8px 8px 0", color: "#c084fc", fontSize: "0.85rem", fontWeight: "600", whiteSpace: "pre-line" }}>
                            💡 {parseInlineMarkdown(currentSlide.concepto_clave)}
                          </div>
                        )}
                      </div>

                      {/* Visualización Interactiva */}
                      {currentSlide.visualizacion && (
                        <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid #2a204d", borderRadius: "12px", padding: "16px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "220px" }}>
                          <VisualizacionMatematica tipo={currentSlide.visualizacion.tipo} datos={currentSlide.visualizacion.datos} />
                        </div>
                      )}

                    </div>

                    {/* Controles de Slide */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "20px", borderTop: "1px solid #2a204d" }}>
                      <button
                        type="button"
                        onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentSlideIndex === 0}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: currentSlideIndex === 0 ? "#64748b" : "#ffffff",
                          fontWeight: "600",
                          fontSize: "0.82rem",
                          cursor: currentSlideIndex === 0 ? "not-allowed" : "pointer"
                        }}
                      >
                        ← Anterior
                      </button>

                      {/* Puntos de Paginación */}
                      <div style={{ display: "flex", gap: "6px" }}>
                        {deckTeoria.slides.map((_, idx) => (
                          <span
                            key={idx}
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: idx === currentSlideIndex ? "#8b5cf6" : "rgba(255,255,255,0.15)",
                              transition: "all 200ms ease"
                            }}
                          />
                        ))}
                      </div>

                      {currentSlideIndex < deckTeoria.slides.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentSlideIndex(prev => prev + 1)}
                          style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                            color: "#ffffff",
                            fontWeight: "600",
                            fontSize: "0.82rem",
                            border: "none",
                            cursor: "pointer"
                          }}
                        >
                          Siguiente →
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowHelpModal(false)}
                          style={{
                            padding: "8px 20px",
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            color: "#ffffff",
                            fontWeight: "700",
                            fontSize: "0.82rem",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)"
                          }}
                        >
                          ¡Entendido! Comenzar clase
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}

              {helpTab === "interactive" && (
                <div style={{ padding: "10px 0" }}>
                  <VisualizacionMatematica tipo="fraccion_interactiva" datos={{ numerador: 3, denominador: 4 }} />
                </div>
              )}

              {helpTab === "interactive_ops" && (
                <div style={{ padding: "10px 0" }}>
                  <VisualizacionMatematica tipo="fraccion_operaciones_interactiva" datos={{}} />
                </div>
              )}

              {helpTab === "theory" && (
                <div style={{ color: "#e8e4f0", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid #2a204d", borderRadius: "12px", padding: "20px" }}>
                    <MarkdownRenderer content={deckTeoria.apunte_completo} />
                  </div>
                </div>
              )}

              {helpTab === "pdf" && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", padding: "40px 20px", textAlign: "center" }}>
                  <span style={{ fontSize: "3.5rem" }}>📄</span>
                  <div>
                    <h4 style={{ color: "#ffffff", fontSize: "1.2rem", fontWeight: "700", margin: "0 0 8px 0" }}>Ficha Imprimible de Estudio</h4>
                    <p style={{ color: "#a59ec9", fontSize: "0.88rem", margin: 0, maxWidth: "450px" }}>
                      Descarga este apunte completo en formato PDF listo para imprimir. Ideal para estudiar en papel, realizar anotaciones y resolver ejercicios prácticos a mano.
                    </p>
                  </div>
                  <a
                    href={deckTeoria.pdf_url}
                    download
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "0.9rem",
                      borderRadius: "8px",
                      textDecoration: "none",
                      boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
                      transition: "transform 200ms ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
                  >
                    📥 Descargar Archivo PDF
                  </a>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function cleanMathExpressions(mathContent) {
  let clean = mathContent;
  // Replace \pm with ±
  clean = clean.replace(/\\pm/g, " ± ");
  // Replace \times with × and \div with ÷
  clean = clean.replace(/\\times/g, " × ");
  clean = clean.replace(/\\div/g, " ÷ ");
  // Replace \rightarrow with →
  clean = clean.replace(/\\rightarrow/g, " → ");
  // Replace \frac{a}{b} with a/b, wrapping in parentheses if it has operations
  clean = clean.replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, (m, p1, p2) => {
    const numCleaned = cleanMathExpressions(p1.trim());
    const denCleaned = cleanMathExpressions(p2.trim());
    const num = numCleaned.includes("+") || numCleaned.includes("-") || numCleaned.includes(" ") || numCleaned.includes("×") || numCleaned.includes("÷") || numCleaned.includes("±") || numCleaned.includes("→") ? `(${numCleaned})` : numCleaned;
    const den = denCleaned.includes("+") || denCleaned.includes("-") || denCleaned.includes(" ") || denCleaned.includes("×") || denCleaned.includes("÷") || denCleaned.includes("±") || denCleaned.includes("→") ? `(${denCleaned})` : denCleaned;
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

function parseInlineMarkdown(text) {
  if (text === null || text === undefined) return "";
  const cleaned = cleanMathText(String(text));
  if (!cleaned.includes("**")) return cleaned;
  
  const parts = cleaned.split(/\*\*([\s\S]*?)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index} style={{ fontWeight: "700" }}>{part}</strong>;
    }
    return part;
  });
}

function MarkdownRenderer({ content }) {
  if (!content) return null;

  const lines = content.split("\n");
  const parsedElements = [];
  let currentList = [];

  const renderList = (key) => {
    if (currentList.length > 0) {
      parsedElements.push(
        <ul key={`list-${key}`} style={{ marginLeft: "20px", marginBottom: "16px", listStyleType: "disc" }}>
          {currentList.map((item, index) => (
            <li key={index} style={{ marginBottom: "6px", lineHeight: "1.5", color: "#e8e4f0" }}>
              {renderInlineStyles(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const renderInlineStyles = (text) => {
    const cleaned = cleanMathText(text);
    const parts = cleaned.split(/\*\*([\s\S]*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} style={{ color: "#ffffff", fontWeight: "700" }}>{part}</strong>;
      }
      return part;
    });
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line) {
      if (currentList.length > 0) renderList(index);
      continue;
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
          backgroundColor: "var(--soft-purple, #1e1a2e)",
          borderRadius: "8px",
          border: "1px solid var(--line, #2a2636)",
          fontFamily: "monospace",
          fontSize: "1.1rem",
          color: "var(--primary, #8b5cf6)",
          fontWeight: "600",
          letterSpacing: "0.5px"
        }}>
          {cleanMathExpressions(formula)}
        </div>
      );
    } else if (line.startsWith("### ")) {
      parsedElements.push(
        <h3 key={index} style={{ color: "#ffffff", fontSize: "1.2rem", fontWeight: "700", marginTop: "20px", marginBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "6px" }}>
          {renderInlineStyles(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith("#### ")) {
      parsedElements.push(
        <h4 key={index} style={{ color: "#e8e4f0", fontSize: "1.05rem", fontWeight: "600", marginTop: "16px", marginBottom: "6px" }}>
          {renderInlineStyles(line.slice(5))}
        </h4>
      );
    } else if (line.startsWith("## ")) {
      parsedElements.push(
        <h2 key={index} style={{ color: "#ffffff", fontSize: "1.4rem", fontWeight: "700", marginTop: "24px", marginBottom: "12px" }}>
          {renderInlineStyles(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      parsedElements.push(
        <h1 key={index} style={{ color: "#ffffff", fontSize: "1.6rem", fontWeight: "700", marginTop: "24px", marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px" }}>
          {renderInlineStyles(line.slice(2))}
        </h1>
      );
    } else {
      parsedElements.push(
        <p key={index} style={{ color: "#e8e4f0", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "12px" }}>
          {renderInlineStyles(line)}
        </p>
      );
    }
  }

  if (currentList.length > 0) renderList(lines.length);

  return <div className="markdown-body" style={{ padding: "8px 0" }}>{parsedElements}</div>;
}

function TutorHeader({ tutor }) {
  return (
    <div className="tutor-chip">
      <img
        src={tutor.imagen}
        alt={tutor.nombre}
        width="40"
        height="40"
        onError={(e) => {
          if (e.target.src.endsWith(".png")) {
            e.target.src = e.target.src.replace(".png", ".svg");
          }
        }}
      />
      <div>
        <strong style={{ color: tutor.color }}>{tutor.nombre}</strong>
        <span>Tu tutor/a</span>
      </div>
    </div>
  );
}

function TutorMessage({ tutor, mensaje }) {
  return (
    <div className="tutor-message">
      <img
        src={tutor.imagen}
        alt={tutor.nombre}
        width="40"
        height="40"
        onError={(e) => {
          if (e.target.src.endsWith(".png")) {
            e.target.src = e.target.src.replace(".png", ".svg");
          }
        }}
      />
      <div>
        <strong style={{ color: tutor.color }}>{tutor.nombre}</strong>
        <p>{parseInlineMarkdown(mensaje)}</p>
      </div>
    </div>
  );
}

function shadeColor(hex, percent) {
  const color = parseHexColor(hex);
  if (!color) return hex;
  const amount = Math.round(2.55 * percent);
  return toHexColor({
    r: Math.max(0, Math.min(255, color.r + amount)),
    g: Math.max(0, Math.min(255, color.g + amount)),
    b: Math.max(0, Math.min(255, color.b + amount)),
  });
}

function tintColor(hex, percent) {
  const color = parseHexColor(hex);
  if (!color) return "#FAF5FF";
  const ratio = percent / 100;
  return toHexColor({
    r: Math.round(color.r + (255 - color.r) * ratio),
    g: Math.round(color.g + (255 - color.g) * ratio),
    b: Math.round(color.b + (255 - color.b) * ratio),
  });
}

function parseHexColor(hex = "") {
  const match = String(hex).match(/^#?([0-9a-f]{6})$/i);
  if (!match) return null;
  const value = match[1];
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function toHexColor({ r, g, b }) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function MathExampleVisual({ tema, ejemplo }) {
  const textoVisual = [ejemplo?.enunciado, ...(ejemplo?.pasos || []), ejemplo?.respuesta].filter(Boolean).join(" ");
  const visual = visualizacionParaTema(tema, textoVisual);
  if (!visual) return null;
  return <VisualizacionMatematica tipo={visual.tipo} datos={visual.datos} />;
}

function visualizacionParaTema(tema = "", texto = "") {
  const temaNormalizado = tema.toLowerCase();

  if (temaNormalizado.includes("tablas_multiplicar")) {
    const numeros = extraerMultiplicacion(texto) || fallbackTabla(temaNormalizado);
    return { tipo: "tabla_multiplicar", datos: numeros };
  }

  if (temaNormalizado.includes("division") || temaNormalizado.includes("divisibilidad")) {
    return { tipo: "division_repartir", datos: extraerDivision(texto) || { total: 12, grupos: 3 } };
  }

  if (temaNormalizado.includes("fracciones_operaciones")) {
    const fracciones = extraerFracciones(texto);
    const op = texto.includes("-") || texto.includes("restar") || texto.includes("resta") 
      ? "-" 
      : (texto.includes("x") || texto.includes("×") || texto.includes("multiplicar") || texto.includes("multiplicación") 
          ? "×" 
          : (texto.includes("÷") || texto.includes("/") || texto.includes("dividir") || texto.includes("división") 
              ? "÷" 
              : "+"));

    return {
      tipo: "fraccion_operaciones_interactiva",
      datos: fracciones.length >= 2 ? {
        numA: fracciones[0].numerador,
        denA: fracciones[0].denominador,
        numB: fracciones[1].numerador,
        denB: fracciones[1].denominador,
        initialOp: op
      } : {
        numA: 1,
        denA: 2,
        numB: 1,
        denB: 4,
        initialOp: "+"
      }
    };
  }

  if (temaNormalizado.includes("fracciones_del_resto")) {
    return { tipo: "fraccion_del_resto", datos: extraerFraccionResto(texto) };
  }

  if (temaNormalizado.includes("fracciones_concepto") || temaNormalizado.includes("decimales_conversion")) {
    return { tipo: "fraccion_pizza", datos: extraerFracciones(texto)[0] || { numerador: 1, denominador: 2, titulo: "Una parte del total" } };
  }

  if (temaNormalizado.includes("circunferencia") || temaNormalizado.includes("circulo") || temaNormalizado.includes("pi")) {
    return { tipo: "circulo_geometria", datos: {} };
  }

  if (temaNormalizado.includes("geometria_angulos")) {
    return { tipo: "angulo", datos: extraerAngulo(texto) };
  }

  if (temaNormalizado.includes("geometria_triangulos")) {
    return { tipo: "triangulo", datos: { tipo: extraerTipoTriangulo(texto) } };
  }

  if (temaNormalizado.includes("geometria_cuadrilateros") || temaNormalizado.includes("perimetros")) {
    return { tipo: "perimetro", datos: { lados: extraerLados(texto) } };
  }

  if (temaNormalizado.includes("graficos_estadisticos")) {
    return { tipo: "grafico_barras", datos: extraerGrafico(texto) };
  }

  if (temaNormalizado.includes("numeros_romanos")) {
    return { tipo: "numeros_romanos", datos: extraerRomano(texto) };
  }

  if (temaNormalizado.includes("secuencias")) {
    return { tipo: "secuencia", datos: extraerSecuencia(texto, temaNormalizado) };
  }

  if (temaNormalizado.includes("si_me_la")) {
    return { tipo: "secuencia", datos: { numeros: [1, 10, 100, 1000], patron: "Cada paso cambia por 10" } };
  }

  if (temaNormalizado.includes("proporcionalidad")) {
    return {
      tipo: "grafico_barras",
      datos: {
        titulo: "Si una cantidad crece, la otra tambien",
        datos: [
          { label: "1", valor: 2 },
          { label: "2", valor: 4 },
          { label: "3", valor: 6 },
        ],
      },
    };
  }

  if (temaNormalizado.includes("ecuaciones_con_imagenes")) {
    return { tipo: "secuencia", datos: { numeros: [2, 4, 6, "?"], patron: "Buscar el valor que falta" } };
  }

  if (temaNormalizado.includes("numeros_naturales")) {
    return { tipo: "secuencia", datos: { numeros: extraerTodosLosNumeros(texto).slice(0, 5), patron: "Orden y valor de cada numero" } };
  }

  return null;
}

function extraerMultiplicacion(texto) {
  const match = texto.match(/(\d+)\s*(?:x|por|veces)\s*(\d+)/i);
  if (!match) return null;
  return { numero: Number(match[1]), factor: Number(match[2]) };
}

function fallbackTabla(tema) {
  const match = tema.match(/tablas_multiplicar_(\d+)/);
  return { numero: match ? Number(match[1]) : 2, factor: 4 };
}

function extraerDivision(texto) {
  const match = texto.match(/(\d+)\s*(?:entre|dividido|\/)\s*(\d+)/i);
  if (match) return { total: Number(match[1]), grupos: Number(match[2]) };

  const numeros = extraerTodosLosNumeros(texto);
  if (numeros.length >= 2) return { total: numeros[0], grupos: Math.max(1, Math.min(numeros[1], 6)) };
  return null;
}

function extraerFracciones(texto) {
  return Array.from(texto.matchAll(/(\d+)\s*\/\s*(\d+)/g)).map((match) => ({
    numerador: Number(match[1]),
    denominador: Number(match[2]),
  }));
}

function extraerFraccionResto(texto) {
  const numeros = extraerTodosLosNumeros(texto);
  const total = numeros[0] || 12;
  const usado = numeros.find((numero, index) => index > 0 && numero < total) || Math.max(1, Math.floor(total / 3));
  const resto = Math.max(0, total - usado);
  const final = Math.max(1, Math.floor(resto / 2));
  return { total, primera_fraccion: usado, resto, segunda_fraccion: "una parte", final };
}

function extraerAngulo(texto) {
  const match = texto.match(/(\d+)\s*(?:grados|grado|°)/i);
  const grados = match ? Number(match[1]) : texto.toLowerCase().includes("recto") ? 90 : 60;
  const nombre = grados < 90 ? "agudo" : grados === 90 ? "recto" : "obtuso";
  return { grados, nombre };
}

function extraerTipoTriangulo(texto) {
  const lower = texto.toLowerCase();
  if (lower.includes("rectangulo") || lower.includes("recto")) return "rectangulo";
  if (lower.includes("equilatero")) return "equilatero";
  if (lower.includes("isosceles")) return "isosceles";
  if (lower.includes("escaleno")) return "escaleno";
  return "triangulo";
}

function extraerLados(texto) {
  const numeros = extraerTodosLosNumeros(texto);
  const arriba = numeros[0] || 8;
  const derecha = numeros[1] || 5;
  const abajo = numeros[2] || arriba;
  const izquierda = numeros[3] || derecha;
  return { arriba, derecha, abajo, izquierda };
}

function extraerGrafico(texto) {
  const numeros = extraerTodosLosNumeros(texto).slice(0, 4);
  const valores = numeros.length ? numeros : [3, 5, 2, 6];
  return {
    titulo: "Comparamos cantidades",
    datos: valores.map((valor, index) => ({ label: `Dato ${index + 1}`, valor })),
  };
}

function extraerRomano(texto) {
  const romanos = texto.match(/\b[IVXLCDM]{1,8}\b/);
  const arabigo = extraerTodosLosNumeros(texto)[0] || 12;
  return { arabigo, romano: romanos?.[0] || "XII" };
}

function extraerSecuencia(texto, tema) {
  const numeros = extraerTodosLosNumeros(texto).slice(0, 8);
  if (numeros.length >= 3) return { numeros, patron: "Mira que cambia de un numero al siguiente" };
  if (tema.includes("fibonacci")) return { numeros: [1, 1, 2, 3, 5, 8], patron: "Cada numero sale de sumar los dos anteriores" };
  return { numeros: [2, 4, 6, 8, 10], patron: "Suma 2 cada vez" };
}

function extraerTodosLosNumeros(texto) {
  return Array.from(texto.matchAll(/\d+/g)).map((match) => Number(match[0])).filter((numero) => Number.isFinite(numero));
}

function ExamenFinal({ pregunta, tema, respuestas, respuestaTexto, loading, onRespuesta, onRespuestaTexto, onSubmit, visualParaEjercicio }) {
  const tienePreguntas = pregunta.preguntas?.length > 0;
  const puedeEnviar = tienePreguntas
    ? pregunta.preguntas.every((item) => String(respuestas[item.id] || "").trim())
    : String(respuestaTexto || "").trim();

  return (
    <div className="exam-final-shell">
      <section className="exam-banner">
        <p className="eyebrow">Examen Final</p>
        <h2>{tema.replace(/_/g, " ")}</h2>
        <p>{parseInlineMarkdown(pregunta.instrucciones)}</p>
      </section>

      <section className="exam-card">
        <p className="exam-statement">{parseInlineMarkdown(pregunta.enunciado)}</p>
        {pregunta.visualizacion ? (
          <VisualizacionMatematica tipo={pregunta.visualizacion.tipo} datos={pregunta.visualizacion.datos} />
        ) : (
          visualParaEjercicio && <VisualizacionMatematica tipo={visualParaEjercicio.tipo} datos={visualParaEjercicio.datos} />
        )}
      </section>

      <section className="exam-card exam-answers">
        {tienePreguntas ? (
          pregunta.preguntas.map((item) => (
            <label key={item.id} className="exam-question">
              <span>
                {item.id}) {parseInlineMarkdown(item.texto)}
              </span>
              <input
                type="text"
                value={respuestas[item.id] || ""}
                onChange={(event) => onRespuesta(item.id, event.target.value)}
                placeholder="Tu respuesta..."
              />
            </label>
          ))
        ) : (
          <label className="exam-question">
            <span>Escribi tu respuesta completa</span>
            <textarea
              value={respuestaTexto}
              onChange={(event) => onRespuestaTexto(event.target.value)}
              placeholder="Escribi tu respuesta aca..."
              rows={7}
            />
          </label>
        )}

        <button type="button" className="primary exam-submit" onClick={onSubmit} disabled={!puedeEnviar || loading}>
          {loading ? "Enviando examen..." : "Enviar examen final"}
        </button>
      </section>
    </div>
  );
}

function PantallaTrialCompletado({ tutor }) {
  return (
    <div className="handwriting-shell trial-completed-shell">
      <section className="handwriting-hero" style={{ backgroundColor: "var(--soft-purple)", border: `2px dashed var(--primary)` }}>
        <img src={`/avatars/${tutor.avatar || "buho"}.png`} alt={tutor.nombre} style={{ width: "96px", height: "96px", marginBottom: "16px", borderRadius: "50%" }} />
        <h2 style={{ color: "var(--primary)", fontSize: "2rem", fontWeight: "bold" }}>¡Excelente trabajo!</h2>
        <p style={{ fontSize: "1.15rem", color: "var(--muted)", maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
          ¡Completaste con éxito todos los temas de la muestra gratuita!
        </p>
      </section>

      <section className="handwriting-card">
        <h3>¿Qué sigue ahora?</h3>
        <p style={{ color: "var(--ink)", lineHeight: "1.6" }}>
          Para poder seguir aprendiendo con <strong>{tutor.nombre}</strong> y acceder a los más de 30 temas de Matemática y Lengua con sus explicaciones paso a paso, ejercicios prácticos y exámenes finales, es necesario activar el acceso completo.
        </p>
        <div className="handwriting-panel family" style={{ marginTop: "20px", borderLeft: `4px solid var(--primary)` }}>
          <h4 style={{ color: "var(--primary)" }}>📢 Mensaje para mamá o papá</h4>
          <p style={{ color: "var(--ink)", fontWeight: "500" }}>
            ¡Ya exploré y completé los 4 temas gratuitos! Para habilitar el resto del currículum de ingreso, pueden ingresar a su panel familiar y activar el Acceso Completo.
          </p>
        </div>
      </section>

      <section className="handwriting-card done" style={{ display: "flex", justifyContent: "center" }}>
        <a href="/" className="primary link-button" style={{ backgroundColor: tutor.color, color: "#fff", textDecoration: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "bold" }}>
          Volver al inicio
        </a>
      </section>
    </div>
  );
}

function TareaManuscrita({ pregunta, loading, onComplete }) {
  const estaCompletada = pregunta.estado === "completada" || pregunta.estado === "revisada";

  return (
    <div className="handwriting-shell">
      <section className="handwriting-hero">
        <span aria-hidden="true">📝</span>
        <h2>Ejercicio a mano</h2>
        <p>Este ejercicio lo haces en tu cuaderno, no en la app.</p>
      </section>

      <section className="handwriting-card">
        <h3>Instrucciones</h3>
        <p className="handwriting-instruction">{pregunta.instruccion}</p>

        {pregunta.tipo_tarea === "dictado" && (
          <div className="handwriting-panel family">
            <h4>Para mama o papa</h4>
            <p>Por favor dictale estas oraciones al alumno/a:</p>
            <ol>
              {pregunta.contenido?.oraciones?.map((oracion, index) => (
                <li key={`${oracion}-${index}`}>{oracion}</li>
              ))}
            </ol>
          </div>
        )}

        {pregunta.tipo_tarea === "copia" && (
          <div className="handwriting-panel copy">
            <h4>Texto para copiar</h4>
            <p>{pregunta.contenido?.texto}</p>
          </div>
        )}

        {pregunta.tipo_tarea === "narracion" && (
          <div className="handwriting-stack">
            <div className="handwriting-panel story">
              <h4>Inicio de la historia</h4>
              <p>{pregunta.contenido?.inicio}</p>
            </div>
            <div className="handwriting-panel checklist">
              <h4>Requisitos</h4>
              <ul>
                {pregunta.contenido?.requisitos?.map((requisito, index) => (
                  <li key={`${requisito}-${index}`}>✓ {requisito}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {pregunta.tipo_tarea === "completar" && (
          <div className="handwriting-panel complete">
            <h4>Oraciones para completar</h4>
            <ol>
              {pregunta.contenido?.oraciones?.map((oracion, index) => (
                <li key={`${oracion}-${index}`}>{oracion}</li>
              ))}
            </ol>
          </div>
        )}

        <div className="handwriting-materials">
          <span>📓 Cuaderno</span>
          <span>✏️ Lapicera</span>
          {pregunta.tiempo_estimado && <span>⏱️ {pregunta.tiempo_estimado} min</span>}
        </div>
      </section>

      <section className="handwriting-card done">
        {estaCompletada ? (
          <>
            <h3>Tarea entregada</h3>
            <p>Mama la revisa con Priscila el fin de semana.</p>
          </>
        ) : (
          <>
            <p>Cuando termines de escribir en tu cuaderno:</p>
            <button type="button" className="primary" onClick={onComplete} disabled={loading}>
              {loading ? "Guardando..." : "Ya termine"}
            </button>
            <small>Mama va a revisar tu cuaderno este fin de semana.</small>
          </>
        )}
      </section>
    </div>
  );
}

function themeForTema(tema) {
  const safeTema = String(tema || "");
  if (safeTema.includes("fraccion") || safeTema.includes("porcentaje") || safeTema.includes("numero") || safeTema.includes("grafico")) return "math";
  if (safeTema.includes("concordancia") || safeTema.includes("lectora") || safeTema.includes("ortografia") || safeTema.includes("tilde")) return "language";
  if (safeTema.includes("biologia") || safeTema.includes("ciencias")) return "science";
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

function PhaseSection({
  number,
  title,
  subtitle,
  unlocked,
  requiredText,
  approvedCount,
  totalCount,
  topics,
  completedExams,
  activeTema,
  pregunta,
  handleSelectTema,
  setShowTopicModal,
  userProgress,
  bypassLocks
}) {
  const progressPercent = totalCount ? Math.round((approvedCount / totalCount) * 100) : 0;
  const isCompleted = approvedCount === totalCount && totalCount > 0;

  return (
    <div style={{
      padding: "20px",
      borderRadius: "12px",
      background: unlocked ? "rgba(30, 26, 50, 0.4)" : "rgba(255,255,255,0.01)",
      border: unlocked 
        ? isCompleted 
          ? "1px solid #10b981" 
          : activeTema && topics.some(t => t.tema === activeTema) 
            ? "1px solid #6366f1" 
            : "1px solid #2a204d" 
        : "1px solid rgba(255,255,255,0.03)",
      opacity: unlocked ? 1 : 0.55,
      transition: "all 200ms ease",
      boxShadow: unlocked && isCompleted ? "0 0 15px rgba(16, 185, 129, 0.08)" : "none",
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    }}>
      {/* Cabecera */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              fontSize: "0.72rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: unlocked 
                ? isCompleted 
                  ? "#10b981" 
                  : "#a855f7" 
                : "#64748b",
              background: unlocked 
                ? isCompleted 
                  ? "rgba(16, 185, 129, 0.1)" 
                  : "rgba(168, 85, 247, 0.1)" 
                : "rgba(255,255,255,0.03)",
              padding: "2px 8px",
              borderRadius: "12px",
              border: unlocked 
                ? isCompleted 
                  ? "1px solid rgba(16, 185, 129, 0.2)" 
                  : "1px solid rgba(168, 85, 247, 0.2)" 
                : "1px solid rgba(255,255,255,0.05)"
            }}>
              Fase {number}
            </span>
            {isCompleted && <span style={{ fontSize: "0.8rem", color: "#fbbf24", fontWeight: "600" }}>🏆 Completada</span>}
          </div>
          <h4 style={{ margin: "6px 0 0 0", fontSize: "1.1rem", fontWeight: "700", color: unlocked ? "#ffffff" : "#64748b" }}>{title}</h4>
          <p style={{ margin: "2px 0 0 0", fontSize: "0.78rem", color: unlocked ? "#a59ec9" : "#64748b" }}>{subtitle}</p>
        </div>

        {unlocked && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ fontSize: "0.8rem", color: "#a59ec9", textAlign: "right" }}>
              <strong>{approvedCount} de {totalCount}</strong> temas
            </div>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#110d24", border: "2px solid #2a204d", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.75rem", fontWeight: "700", color: isCompleted ? "#10b981" : "#a855f7" }}>
              {progressPercent}%
            </div>
          </div>
        )}
      </div>

      {/* Candado / Bloqueo */}
      {!unlocked && (
        <div style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,0.15)", padding: "10px 14px", borderRadius: "8px", border: "1px dashed rgba(255,255,255,0.04)" }}>
          <span style={{ fontSize: "1rem" }}>🔒</span>
          <span>{requiredText}</span>
        </div>
      )}

      {/* Grid de Temas */}
      {unlocked && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "8px" }}>
          {topics.map((item) => {
            const isTrial = pregunta?.plan === "trial";
            const isAllowed = bypassLocks || !isTrial || TRIAL_TOPICS.includes(item.tema);
            const isCurrent = activeTema === item.tema;
            const isApproved = completedExams.has(item.tema);
            
            // Buscar estadísticas de progreso del tema
            const prog = userProgress.find((p) => p.tema === item.tema);
            const tasa = prog ? Math.round(Number(prog.tasa_acierto)) : null;

            return (
              <button
                type="button"
                key={item.tema}
                onClick={() => {
                  if (isAllowed) {
                    handleSelectTema(item.tema);
                    setShowTopicModal(false);
                  }
                }}
                disabled={!isAllowed || isCurrent}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: isCurrent 
                    ? "1px solid #8b5cf6" 
                    : isApproved 
                      ? "1px solid rgba(16, 185, 129, 0.3)" 
                      : "1px solid #2a204d",
                  background: isCurrent 
                    ? "rgba(139, 92, 246, 0.08)" 
                    : isApproved 
                      ? "rgba(16, 185, 129, 0.03)" 
                      : isAllowed 
                        ? "#15112a" 
                        : "rgba(255,255,255,0.01)",
                  color: isAllowed ? "#e8e4f0" : "#64748b",
                  textAlign: "left",
                  cursor: isAllowed ? "pointer" : "not-allowed",
                  fontSize: "0.82rem",
                  transition: "all 150ms ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", maxWidth: "70%" }}>
                  <span style={{ fontSize: "0.95rem" }}>
                    {item.materia === "lengua" ? "✍️" : "🔢"}
                  </span>
                  <span style={{ 
                    fontWeight: isCurrent ? "700" : "500", 
                    overflow: "hidden", 
                    textOverflow: "ellipsis", 
                    whiteSpace: "nowrap" 
                  }}>
                    {item.tema.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem" }}>
                  {isCurrent ? (
                    <span style={{ color: "#a855f7", fontWeight: "600" }}>Estudiando</span>
                  ) : isApproved ? (
                    <span style={{ color: "#10b981", fontWeight: "600", display: "flex", alignItems: "center", gap: "3px" }}>
                      ✓ {tasa ? `${tasa}%` : ""}
                    </span>
                  ) : isAllowed ? (
                    <span style={{ color: "#a59ec9" }}>
                      {tasa ? `Prac. ${tasa}%` : "Iniciar"}
                    </span>
                  ) : (
                    <span style={{ color: "#64748b" }}>🔒 Premium</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
