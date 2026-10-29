import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Seo from "@/components/Seo";

const MATERIAS = [
  { id: "matematica", nombre: "Matemática" },
  { id: "lengua", nombre: "Lengua" },
];

function claveLocal(userId, materia) {
  return `monse_simulacro_${userId}_${materia}`;
}

function leerGuardado(userId, materia) {
  try {
    const raw = sessionStorage.getItem(claveLocal(userId, materia));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function SimulacroPage() {
  const router = useRouter();
  const userId = typeof router.query.user_id === "string" ? router.query.user_id : "";
  const [materia, setMateria] = useState("matematica");
  const [intento, setIntento] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [indice, setIndice] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [restante, setRestante] = useState(0);
  const enviando = useRef(false);
  const respuestasRef = useRef({});
  const enviarRef = useRef(async () => {});

  useEffect(() => {
    respuestasRef.current = respuestas;
  }, [respuestas]);

  useEffect(() => {
    if (!router.isReady || !userId) return;
    const guardado = leerGuardado(userId, materia);
    if (guardado?.exp > Date.now() && guardado.preguntas) {
      setIntento(guardado);
      setRespuestas(guardado.respuestas || {});
      setIndice(guardado.indice || 0);
      setResultado(null);
    }
  }, [router.isReady, userId, materia]);

  useEffect(() => {
    if (!intento?.exp || resultado) return undefined;
    const tick = () => {
      const queda = intento.exp - Date.now();
      setRestante(Math.max(0, queda));
      if (queda <= 0) enviarRef.current(true);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [intento, resultado]);

  const pregunta = intento?.preguntas?.[indice];
  const respondidas = useMemo(
    () => (intento ? intento.preguntas.filter((item) => respuestas[item.id]).length : 0),
    [intento, respuestas]
  );

  const empezar = async (materiaElegida = materia) => {
    setError("");
    setCargando(true);
    setResultado(null);
    try {
      const res = await fetch("/api/simulacro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accion: "iniciar", user_id: userId, materia: materiaElegida }),
      });
      const data = await res.json();
      if (!res.ok) {
        const err = new Error(data.error || "No se pudo empezar el simulacro.");
        err.codigo = data.codigo;
        throw err;
      }
      const siguiente = { ...data, respuestas: {}, indice: 0 };
      setIntento(siguiente);
      setRespuestas({});
      setIndice(0);
      sessionStorage.setItem(claveLocal(userId, materiaElegida), JSON.stringify(siguiente));
    } catch (err) {
      setIntento(null);
      setError(err.message);
      setResultado(err.codigo === "plan_trial" ? { bloqueado: true } : null);
    } finally {
      setCargando(false);
    }
  };

  const elegir = (opcion) => {
    if (!pregunta) return;
    const siguientes = { ...respuestas, [pregunta.id]: opcion };
    setRespuestas(siguientes);
    const guardado = { ...intento, respuestas: siguientes, indice };
    sessionStorage.setItem(claveLocal(userId, materia), JSON.stringify(guardado));
  };

  const enviar = async (porTiempo = false) => {
    if (!intento || enviando.current) return;
    const faltan = intento.preguntas.length - Object.keys(respuestas).length;
    if (!porTiempo && faltan > 0 && !window.confirm(`Todavía quedan ${faltan} sin responder. ¿Enviar igual?`)) return;
    enviando.current = true;
    setCargando(true);
    setError("");
    try {
      const res = await fetch("/api/simulacro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accion: "corregir",
          user_id: userId,
          materia,
          token: intento.token,
          respuestas: respuestasRef.current,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo corregir el simulacro.");
      setResultado(data);
      setIntento(null);
      sessionStorage.removeItem(claveLocal(userId, materia));
    } catch (err) {
      setError(err.message);
    } finally {
      enviando.current = false;
      setCargando(false);
    }
  };
  useEffect(() => {
    enviarRef.current = enviar;
  });

  const minutos = String(Math.floor(restante / 60000)).padStart(2, "0");
  const segundos = String(Math.floor((restante % 60000) / 1000)).padStart(2, "0");

  return (
    <main className="simulacro-page">
      <Seo
        title="Simulacro cronometrado"
        description="Simulacro de 60 minutos de Matemática o Lengua para practicar el ingreso al Colegio Nacional de Monserrat."
        path="/simulacro"
      />
      <section className="simulacro-card">
        <p className="eyebrow">Práctica Ingreso Monse</p>
        <h1>Simulacro cronometrado</h1>
        <p className="simulacro-note">
          60 minutos, una materia por vez, con ejercicios de la plataforma y el puntaje al final.
          No es el examen oficial del Colegio Nacional de Monserrat.
        </p>

        {!router.isReady && <p>Cargando...</p>}
        {router.isReady && !userId && (
          <p>Entrá desde tu sesión de práctica para empezar un simulacro. <a href="/">Ir al inicio</a></p>
        )}

        {userId && !intento && !resultado && (
          <div className="simulacro-materias">
            {MATERIAS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={materia === item.id ? "primary" : ""}
                onClick={() => setMateria(item.id)}
              >
                {item.nombre}
              </button>
            ))}
            <button type="button" className="primary" disabled={cargando} onClick={() => empezar(materia)}>
              {cargando ? "Armando..." : `Empezar ${MATERIAS.find((item) => item.id === materia)?.nombre}`}
            </button>
          </div>
        )}

        {resultado?.bloqueado && (
          <p>
            Los simulacros ilimitados forman parte del Acceso Completo.{" "}
            <a href={`/papas?user_id=${encodeURIComponent(userId)}`}>Ver el panel familiar</a>
          </p>
        )}

        {intento && pregunta && (
          <>
            <div className="simulacro-barra">
              <span role="timer" aria-live="off">Tiempo {minutos}:{segundos}</span>
              <span>Pregunta {indice + 1} de {intento.preguntas.length}</span>
              <span>{respondidas} respondidas</span>
            </div>
            <p className="simulacro-tema">{pregunta.tema_nombre}</p>
            <h2>{pregunta.enunciado}</h2>
            <fieldset className="simulacro-opciones">
              <legend className="sr-only">Opciones</legend>
              {pregunta.opciones.map((opcion) => (
                <label key={opcion} className={respuestas[pregunta.id] === opcion ? "elegida" : ""}>
                  <input
                    type="radio"
                    name={pregunta.id}
                    value={opcion}
                    checked={respuestas[pregunta.id] === opcion}
                    onChange={() => elegir(opcion)}
                  />
                  <span>{opcion}</span>
                </label>
              ))}
            </fieldset>
            <div className="simulacro-nav">
              <button type="button" disabled={indice === 0} onClick={() => setIndice((n) => n - 1)}>Anterior</button>
              {indice < intento.preguntas.length - 1 ? (
                <button type="button" onClick={() => setIndice((n) => n + 1)}>Siguiente</button>
              ) : (
                <button type="button" className="primary" disabled={cargando} onClick={() => enviar(false)}>
                  {cargando ? "Corrigiendo..." : "Ver el puntaje"}
                </button>
              )}
            </div>
          </>
        )}

        {resultado && !resultado.bloqueado && (
          <div className="simulacro-resultado">
            <h2>{resultado.correctas} de {resultado.total}</h2>
            <p>{resultado.porcentaje}% en {resultado.materia_nombre}{resultado.fuera_de_tiempo ? ". Se envió al cumplirse la hora." : "."}</p>
            <ul>
              {resultado.detalle?.map((item) => (
                <li key={item.id} className={item.acierto ? "acierto" : "error-item"}>
                  <strong>{item.tema_nombre}.</strong> {item.enunciado}
                  <br />
                  {item.acierto ? "Correcta." : `La opción era: ${item.correcta}.`}
                  {item.explicacion ? ` ${item.explicacion}` : ""}
                </li>
              ))}
            </ul>
            <button type="button" className="primary" onClick={() => { setResultado(null); setMateria(resultado.materia || materia); }}>
              Hacer otro simulacro
            </button>
          </div>
        )}

        {error && !resultado?.bloqueado && <p role="alert">{error}</p>}
        <p><a href={userId ? `/tutoria?user_id=${encodeURIComponent(userId)}` : "/"}>Volver a practicar</a></p>
      </section>
    </main>
  );
}
