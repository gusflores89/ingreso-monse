import { useEffect, useMemo, useRef, useState } from "react";
import PantallaCasoResuelto from "./PantallaCasoResuelto";
import VisualizacionMatematica from "./VisualizacionMatematica";

export default function PantallaSessionTutoria({ user_id, tema, capa, modo, tutor_preference }) {
  const [pregunta, setPregunta] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [sesionId, setSesionId] = useState(null);
  const [evaluacion, setEvaluacion] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const activeTema = pregunta?.tema || tema || "";
  const theme = themeForTema(activeTema);
  const tutorAvatar = pregunta?.avatar || tutor_preference?.avatar || "buho";
  const tutor = {
    nombre: pregunta?.nombre_tutor || tutor_preference?.nombre_tutor || "Profe",
    color: pregunta?.color_tema || tutor_preference?.color_tema || "#D85A30",
    avatar: tutorAvatar,
    imagen:
      pregunta?.avatar_imagen ||
      `/avatars/${tutorAvatar}-mini.svg`,
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
        {pregunta?.plan === "trial" && (
          <span className="plan-badge-tutoria" style={{ fontSize: "0.85rem", padding: "4px 10px", borderRadius: "20px", backgroundColor: "rgba(254, 226, 226, 0.8)", color: "#ef4444", border: "1px solid #fca5a5", fontWeight: "600" }}>
            Prueba Gratuita
          </span>
        )}
      </header>

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
                <MathExampleVisual tema={activeTema} ejemplo={pasoActualData.contenido} />

                <div className="lesson-steps">
                  {pasoActualData.contenido.pasos?.map((paso, index) => (
                    <article className="lesson-step-row" key={`${paso}-${index}`}>
                      <span aria-hidden="true">{index + 1}</span>
                      <p>{paso}</p>
                    </article>
                  ))}
                </div>

                {pasoActualData.contenido.respuesta && (
                  <div className="lesson-answer">
                    <span aria-hidden="true">✓</span>
                    <div>
                      <small>Respuesta</small>
                      <strong>{pasoActualData.contenido.respuesta}</strong>
                    </div>
                  </div>
                )}

                {pasoActualData.contenido.refuerzo && (
                  <p className="lesson-reinforcement">
                    <span>Tip:</span> {pasoActualData.contenido.refuerzo}
                  </p>
                )}
              </div>
            )}

            {pasoActualData.tipo === "ejercicio" && (
              <div className="lesson-step-content exercise-step">
                <h2>Ahora proba vos</h2>
                <p className="question-text small">{pasoActualData.contenido.enunciado}</p>
                <textarea
                  placeholder="Escribi tu respuesta aca..."
                  value={respuesta}
                  onChange={(event) => setRespuesta(event.target.value)}
                  rows={4}
                />
                <button className="primary" onClick={handleSubmit} disabled={!respuesta.trim() || loading}>
                  {loading ? "Enviando..." : "Enviar respuesta"}
                </button>
                <div className="exercise-tip">
                  Tip: {pasoActualData.contenido.pista || "Recorda: primero mira que queda, despues resolve con ese resto."}
                </div>
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

      {!evaluacion &&
        pregunta?.tipo !== "leccion" &&
        pregunta?.tipo !== "manuscrita" &&
        pregunta?.tipo !== "examen_final" &&
        pregunta?.tipo !== "caso_resuelto" &&
        pregunta && (
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
          <TutorMessage tutor={tutor} mensaje={evaluacion.retroalimentacion} />
          <button type="button" className="primary" onClick={handleSiguiente} disabled={loading}>
            Siguiente pregunta
          </button>
        </div>
      )}
    </section>
  );
}

function TutorHeader({ tutor }) {
  return (
    <div className="tutor-chip">
      <img src={tutor.imagen} alt={tutor.nombre} width="40" height="40" />
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
      <img src={tutor.imagen} alt={tutor.nombre} width="40" height="40" />
      <div>
        <strong style={{ color: tutor.color }}>{tutor.nombre}</strong>
        <p>{mensaje}</p>
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
    if (fracciones.length >= 2) {
      return {
        tipo: "fraccion_operacion",
        datos: {
          frac1: { num: fracciones[0].numerador, den: fracciones[0].denominador },
          frac2: { num: fracciones[1].numerador, den: fracciones[1].denominador },
          operacion: texto.includes("-") ? "-" : "+",
          resultado: fracciones[2]
            ? { num: fracciones[2].numerador, den: fracciones[2].denominador }
            : { num: Math.min(fracciones[0].numerador + fracciones[1].numerador, fracciones[0].denominador), den: fracciones[0].denominador },
        },
      };
    }
    return { tipo: "fraccion_pizza", datos: { numerador: 1, denominador: 4, titulo: "Partes de un entero" } };
  }

  if (temaNormalizado.includes("fracciones_del_resto")) {
    return { tipo: "fraccion_del_resto", datos: extraerFraccionResto(texto) };
  }

  if (temaNormalizado.includes("fracciones_concepto") || temaNormalizado.includes("decimales_conversion")) {
    return { tipo: "fraccion_pizza", datos: extraerFracciones(texto)[0] || { numerador: 1, denominador: 2, titulo: "Una parte del total" } };
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

function ExamenFinal({ pregunta, tema, respuestas, respuestaTexto, loading, onRespuesta, onRespuestaTexto, onSubmit }) {
  const tienePreguntas = pregunta.preguntas?.length > 0;
  const puedeEnviar = tienePreguntas
    ? pregunta.preguntas.every((item) => String(respuestas[item.id] || "").trim())
    : String(respuestaTexto || "").trim();

  return (
    <div className="exam-final-shell">
      <section className="exam-banner">
        <p className="eyebrow">Examen Final</p>
        <h2>{tema.replace(/_/g, " ")}</h2>
        <p>{pregunta.instrucciones}</p>
      </section>

      <section className="exam-card">
        <p className="exam-statement">{pregunta.enunciado}</p>
        {pregunta.visualizacion && <VisualizacionMatematica tipo={pregunta.visualizacion.tipo} datos={pregunta.visualizacion.datos} />}
      </section>

      <section className="exam-card exam-answers">
        {tienePreguntas ? (
          pregunta.preguntas.map((item) => (
            <label key={item.id} className="exam-question">
              <span>
                {item.id}) {item.texto}
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
      <section className="handwriting-hero" style={{ backgroundColor: tintColor(tutor.color, 90), border: `2px dashed ${tutor.color}` }}>
        <img src={`/avatars/${tutor.avatar || "buho"}.svg`} alt={tutor.nombre} style={{ width: "96px", height: "96px", marginBottom: "16px" }} />
        <h2 style={{ color: tutor.color, fontSize: "2rem", fontWeight: "bold" }}>¡Excelente trabajo!</h2>
        <p style={{ fontSize: "1.15rem", color: "#334155", maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
          ¡Completaste con éxito todos los temas de la muestra gratuita!
        </p>
      </section>

      <section className="handwriting-card">
        <h3>¿Qué sigue ahora?</h3>
        <p style={{ color: "#475569", lineHeight: "1.6" }}>
          Para poder seguir aprendiendo con <strong>{tutor.nombre}</strong> y acceder a los más de 30 temas de Matemática y Lengua con sus explicaciones paso a paso, ejercicios prácticos y exámenes finales, es necesario activar el acceso completo.
        </p>
        <div className="handwriting-panel family" style={{ marginTop: "20px", borderLeft: `4px solid ${tutor.color}` }}>
          <h4 style={{ color: tutor.color }}>📢 Mensaje para mamá o papá</h4>
          <p style={{ color: "#334155", fontWeight: "500" }}>
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
