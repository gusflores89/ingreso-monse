import RepasoSugerido from "./RepasoSugerido";
import { accesoTema } from "@/lib/acceso-temas";
import { fetchRegistrado, leerEnvioPendiente } from "@/lib/envios-cliente";
import { TEMAS_BASES, VERSION_BASES } from "@/lib/metadatos-bases";
import { puedeRetomarMision } from "@/lib/continuidad-mision";
import BarrasFraccion from "./BarrasFraccion";
import { visualizacionSegura } from "@/lib/visualizaciones-seguras";
import { useEffect, useMemo, useRef, useState } from "react";
import PantallaCasoResuelto from "./PantallaCasoResuelto";
import VisualizacionMatematica from "./VisualizacionMatematica";
import { CURRICULUM_MATEMATICA, CURRICULUM_LENGUA } from "@/lib/curriculum";
import { getDiapositivasParaTema, getPdfUrl } from "@/lib/diapositivas";

export function getArgentinaTodayKey() {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  } catch {
    const d = new Date(Date.now() - 3 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
  }
}

export default function PantallaSessionTutoria({ user_id, tema, capa, modo, tutor_preference, forzar_practica: forzarPracticaProp = false }) {
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
  const enviandoRef = useRef(false);
  const enviarRegistrado = (url, options) => fetchRegistrado(url, options, user_id);

  const [userProgress, setUserProgress] = useState([]);
  const [completedExams, setCompletedExams] = useState(new Set());
  const [modalLoading, setModalLoading] = useState(false);
  const [bypassLocks, setBypassLocks] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpTab, setHelpTab] = useState("slides");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Estados pedagógicos y de gamificación (Paso 2 y 3)
  const [intento, setIntento] = useState(1);
  const [desafiosCompletadosMision, setDesafiosCompletadosMision] = useState(0);
  const [retosCompletadosIds, setRetosCompletadosIds] = useState([]);
  const [misionTerminada, setMisionTerminada] = useState(false);
  const [estrellasAcumuladas, setEstrellasAcumuladas] = useState(0);
  const [pistaActiva, setPistaActiva] = useState(null);
  const [forzarPractica, setForzarPractica] = useState(Boolean(forzarPracticaProp));

  const activeTema = pregunta?.tema || tema || "";
  const getStorageKey = () => `monse_mision_${user_id || "abril"}`;
  const getStarsStorageKey = () => `monse_estrellas_${user_id || "abril"}`;

  const getSavedStars = () => {
    if (typeof window === "undefined") return 0;
    try {
      return parseInt(localStorage.getItem(getStarsStorageKey()) || "0", 10) || 0;
    } catch {
      return 0;
    }
  };

  const saveStars = (stars) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(getStarsStorageKey(), String(stars));
    } catch {}
  };

  const saveMissionState = (updates = {}) => {
    if (typeof window === "undefined") return;
    try {
      let base = {};
      const savedRaw = localStorage.getItem(getStorageKey());
      if (savedRaw) {
        try {
          base = JSON.parse(savedRaw) || {};
        } catch {}
      }
      const hoy = getArgentinaTodayKey();
      const esMismoDia = base.fecha === hoy && (!base.user_id || base.user_id === user_id);
      const baseValida = esMismoDia ? base : {};

      const starsFromStorage = getSavedStars();
      const currentStars = updates.estrellas !== undefined
        ? updates.estrellas
        : Math.max(starsFromStorage, estrellasAcumuladas, typeof base.estrellas === "number" ? base.estrellas : 0);
      saveStars(currentStars);

      const currentRespuestasExamen = updates.respuestasExamen !== undefined
        ? updates.respuestasExamen
        : (respuestasExamen && Object.keys(respuestasExamen).length > 0 ? respuestasExamen : (baseValida.respuestasExamen || {}));

      const currentForzarPractica = updates.forzar_practica !== undefined
        ? Boolean(updates.forzar_practica)
        : Boolean(baseValida.forzar_practica ?? forzarPractica);

      const current = {
        tema: activeTema,
        pregunta: baseValida.pregunta !== undefined ? baseValida.pregunta : pregunta,
        sesionId: baseValida.sesionId !== undefined ? baseValida.sesionId : sesionId,
        evaluacion: baseValida.evaluacion !== undefined ? baseValida.evaluacion : evaluacion,
        intento: baseValida.intento !== undefined ? baseValida.intento : intento,
        pasoActual: baseValida.pasoActual !== undefined ? baseValida.pasoActual : pasoActual,
        respuesta: baseValida.respuesta !== undefined ? baseValida.respuesta : respuesta,
        borrador: updates.borrador !== undefined ? updates.borrador : (baseValida.borrador !== undefined ? baseValida.borrador : respuesta),
        pistaActiva: baseValida.pistaActiva !== undefined ? baseValida.pistaActiva : pistaActiva,
        ...baseValida,
        ...updates,
        // CAMPOS GARANTIZADOS DEL DÍA ACTUAL (NUNCA SOBRESCRITOS POR BASE ANTERIOR)
        fecha: hoy,
        user_id: user_id || base.user_id || "abril",
        desafios: updates.desafios !== undefined ? updates.desafios : (esMismoDia ? (base.desafios ?? desafiosCompletadosMision) : 0),
        retosCompletadosIds: updates.retosCompletadosIds !== undefined ? updates.retosCompletadosIds : (esMismoDia ? (base.retosCompletadosIds ?? retosCompletadosIds) : []),
        misionTerminada: updates.misionTerminada !== undefined ? updates.misionTerminada : (esMismoDia ? (base.misionTerminada ?? misionTerminada) : false),
        respuestasExamen: currentRespuestasExamen,
        estrellas: currentStars,
        forzar_practica: currentForzarPractica,
      };
      localStorage.setItem(getStorageKey(), JSON.stringify(current));
      return current;
    } catch (e) {
      console.error("Error al guardar misión:", e);
      setError("No pudimos guardar en esta computadora. Tu actividad sigue abierta; intentá guardar otra vez.");
      return null;
    }
  };

  const registrarDesafioCompletado = (actividadIdOrEstrellas, maybeEstrellas, extraUpdates = {}) => {
    let id = sesionId || (pregunta && (pregunta.sesion_id || pregunta.tarea_id || pregunta.id)) || String(Date.now());
    let estrellas = 2;
    let extra = extraUpdates;

    if (typeof actividadIdOrEstrellas === "string") {
      id = actividadIdOrEstrellas;
      if (typeof maybeEstrellas === "number") {
        estrellas = maybeEstrellas;
      } else if (maybeEstrellas && typeof maybeEstrellas === "object") {
        extra = maybeEstrellas;
      }
    } else if (typeof actividadIdOrEstrellas === "number") {
      if (typeof maybeEstrellas === "number") {
        id = String(actividadIdOrEstrellas);
        estrellas = maybeEstrellas;
      } else {
        estrellas = actividadIdOrEstrellas;
        if (maybeEstrellas && typeof maybeEstrellas === "object") {
          extra = maybeEstrellas;
        }
      }
    }

    setRetosCompletadosIds((prevIds) => {
      const stringId = String(id);
      if (prevIds.includes(stringId)) {
        if (Object.keys(extra).length > 0) {
          saveMissionState(extra);
        }
        return prevIds;
      }
      const nextIds = [...prevIds, stringId];
      const nuevosDesafios = nextIds.length;
      setDesafiosCompletadosMision(nuevosDesafios);
      const starsBase = Math.max(getSavedStars(), estrellasAcumuladas);
      const newStars = starsBase + estrellas;
      setEstrellasAcumuladas(newStars);
      saveStars(newStars);
      const terminada = nuevosDesafios >= 3 || Boolean(pregunta?.repaso_espaciado);
      if (terminada) {
        setMisionTerminada(true);
      }
      saveMissionState({
        retosCompletadosIds: nextIds,
        desafios: nuevosDesafios,
        estrellas: newStars,
        misionTerminada: terminada,
        borrador: "",
        ...extra,
      });
      return nextIds;
    });
  };

  const handleGuardarYSalir = () => {
    const guardado = saveMissionState({
      borrador: respuesta,
      respuesta,
      respuestasExamen,
    });
    if (guardado) window.location.href = "/";
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setError("");

      // 1. Intentar restaurar sesión guardada completa de hoy en Argentina
      let savedTema = null;
      if (typeof window !== "undefined") {
        try {
          const savedRaw = localStorage.getItem(getStorageKey());
          const starsFromStorage = getSavedStars();
          if (starsFromStorage > 0) {
            setEstrellasAcumuladas(starsFromStorage);
          }
          if (savedRaw) {
            const saved = JSON.parse(savedRaw);
            const hoy = getArgentinaTodayKey();
            savedTema = saved.tema;
            if (typeof saved.forzar_practica === "boolean") {
              setForzarPractica(saved.forzar_practica);
            }
            const versionValida = !TEMAS_BASES.includes(saved.tema) || saved.pregunta?.contenido_version === VERSION_BASES;
            if (versionValida && puedeRetomarMision(saved, {usuario:user_id,tema,modo,hoy})) {
              if (saved.fecha !== hoy) { saved.fecha = hoy; localStorage.setItem(getStorageKey(), JSON.stringify(saved)); }
              if (saved.pregunta) setPregunta(saved.pregunta);
              if (saved.sesionId) setSesionId(saved.sesionId);
              if (saved.evaluacion) setEvaluacion(saved.evaluacion);
              if (typeof saved.intento === "number") setIntento(saved.intento);
              if (typeof saved.pasoActual === "number") setPasoActual(saved.pasoActual);
              if (saved.borrador || saved.respuesta) setRespuesta(saved.borrador || saved.respuesta);
              if (saved.respuestasExamen) setRespuestasExamen(saved.respuestasExamen);
              const pendiente = leerEnvioPendiente(localStorage, user_id, saved.sesionId);
              if (pendiente && !saved.evaluacion) {
                if (saved.pregunta?.tipo === 'examen_final') {
                  try { setRespuestasExamen(JSON.parse(pendiente.respuesta_usuario)); } catch {}
                } else if (!pendiente.no_visto) setRespuesta(pendiente.respuesta_usuario);
              }
              if (typeof saved.desafios === "number") setDesafiosCompletadosMision(saved.desafios);
              const starsToRestore = Math.max(starsFromStorage, typeof saved.estrellas === "number" ? saved.estrellas : 0);
              setEstrellasAcumuladas(starsToRestore);
              saveStars(starsToRestore);
              if (Array.isArray(saved.retosCompletadosIds)) setRetosCompletadosIds(saved.retosCompletadosIds);
              if (saved.misionTerminada) setMisionTerminada(true);
              if (saved.pistaActiva) setPistaActiva(saved.pistaActiva);
              setLoading(false);
              return; // Restauración exitosa, no generar nueva pregunta
            } else if (saved.fecha !== hoy) {
              // Día nuevo: resetear contadores diarios pero preservar estrellas
              setDesafiosCompletadosMision(0);
              setRetosCompletadosIds([]);
              setMisionTerminada(false);
              setPistaActiva(null);
              setRespuesta("");
              setRespuestasExamen({});
              setForzarPractica(false);
              const starsToRestore = Math.max(starsFromStorage, typeof saved.estrellas === "number" ? saved.estrellas : 0);
              if (starsToRestore > 0) {
                setEstrellasAcumuladas(starsToRestore);
                saveStars(starsToRestore);
              }
              // Guardar inmediatamente el reinicio limpio en localStorage para que no quede la fecha vieja
              try {
                localStorage.setItem(getStorageKey(), JSON.stringify({
                  fecha: hoy,
                  user_id: user_id || saved.user_id || "abril",
                  tema: tema || savedTema || activeTema,
                  desafios: 0,
                  retosCompletadosIds: [],
                  misionTerminada: false,
                  estrellas: starsToRestore,
                  evaluacion: null,
                  pistaActiva: null,
                  borrador: "",
                  respuesta: "",
                  respuestasExamen: {},
                  intento: 1,
                  pasoActual: 0,
                  forzar_practica: false,
                }));
              } catch {}
            }
          }
        } catch (e) {
          console.error("Error al restaurar sesión guardada:", e);
        }
      }

      // 2. Si no había sesión guardada para hoy, consultar a la API
      const targetTema = tema || savedTema;
      setEvaluacion(null);
      setRespuesta("");
      setRespuestasExamen({});
      startTime.current = Date.now();

      try {
        const activeForzar = Boolean(forzarPracticaProp || forzarPractica);
        const res = await fetch("/api/sesion/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id,
            tema: targetTema,
            capa,
            modo,
            tutor_preference,
            forzar_practica: activeForzar,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "No se pudo iniciar la sesion.");
        setPregunta(data);
        setSesionId(data.sesion_id);
        setPasoActual(0);
        setIntento(1);
        if (data && data.tipo === "leccion") {
          setHelpTab("slides");
          setCurrentSlideIndex(0);
        }
        saveMissionState({
          pregunta: data,
          sesionId: data.sesion_id,
          tema: data.tema || targetTema,
          solicitud_modo: modo || "NORMAL",
          solicitud_tema: tema || null,
          borrador: "",
          respuesta: "",
          respuestasExamen: {},
          evaluacion: null,
          intento: 1,
          pasoActual: 0,
          pistaActiva: null,
          forzar_practica: activeForzar,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [user_id, tema, capa, modo]);

  useEffect(() => {
    if (showTopicModal && user_id) {
      setModalLoading(true);
      fetch(`/api/progreso?user_id=${encodeURIComponent(user_id)}&skip_insight=true`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setUserProgress(data.progreso || []);
            const approved = new Set(
              data.examenes_aprobados && data.examenes_aprobados.length
                ? data.examenes_aprobados
                : (data.sesiones_recientes || [])
                    .filter((s) => s.tipo_pregunta === "examen_final" && s.es_correcta)
                    .map((s) => s.tema)
            );
            setCompletedExams(approved);
            const isTest = !!data.usuario?.rasgos_especiales?.ruta_flexible;
            setBypassLocks(!!isTest);
          }
        })
        .catch((err) => console.error("Error fetching progress for modal:", err))
        .finally(() => setModalLoading(false));
    }
  }, [showTopicModal, user_id]);

  const handleSubmit = async () => {
    if (!respuesta.trim() || !sesionId || enviandoRef.current) return;
    enviandoRef.current = true;
    setLoading(true);
    setError("");

    try {
      const res = await enviarRegistrado("/api/sesion/respuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sesion_id: sesionId,
          respuesta_usuario: respuesta,
          tiempo_segundos: Math.round((Date.now() - startTime.current) / 1000),
          user_id,
          resuelto_con_ayuda: intento > 1,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo evaluar la respuesta.");
      setEvaluacion(data);

      if (data.es_correcta || data.revision_pendiente) {
        // Superó el reto o quedó en revisión diferida: guardar explícitamente la evaluación junto con el reto completado
        setPistaActiva(null);
        registrarDesafioCompletado(sesionId, 2, {
          evaluacion: data,
          respuesta,
          borrador: "",
          pistaActiva: null,
        });
      } else {
        saveMissionState({ evaluacion: data, intento, respuesta, borrador: respuesta });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      enviandoRef.current = false; setLoading(false);
    }
  };

  const abrirTeoria = async () => {
    if (loading || enviandoRef.current) return;
    enviandoRef.current = true;
    setLoading(true);
    setError("");
    try {
      if (sesionId && !evaluacion) {
        const res = await enviarRegistrado("/api/sesion/ayuda", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sesion_id: sesionId }),
        });
        if (!res.ok) throw new Error("No pudimos abrir la ayuda. Probá de nuevo.");
      }
      setHelpTab("slides"); setCurrentSlideIndex(0); setShowHelpModal(true);
    } catch (err) { setError(err.message); }
    finally { enviandoRef.current = false; setLoading(false); }
  };

  const handleNoVisto = async () => {
    if (!sesionId || enviandoRef.current) return;
    enviandoRef.current = true;
    setLoading(true);
    setError("");

    try {
      const res = await enviarRegistrado("/api/sesion/respuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sesion_id: sesionId,
          respuesta_usuario: "Esto todavía no lo vimos",
          tiempo_segundos: Math.round((Date.now() - startTime.current) / 1000),
          user_id,
          no_visto: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo consultar al tutor.");
      setEvaluacion(data);
      // NO declaramos el reto completado acá: Abril debe poder leer la explicación y probar con ayuda
      saveMissionState({
        evaluacion: data,
        respuesta: "",
        borrador: "",
        intento: 1,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      enviandoRef.current = false; setLoading(false);
    }
  };

  const handleEnviarExamen = async () => {
    const tienePreguntas = pregunta?.preguntas?.length > 0;
    const respuestaPayload = tienePreguntas ? respuestasExamen : { texto: respuesta };
    const hayRespuesta = tienePreguntas
      ? pregunta.preguntas.every((item) => String(respuestaPayload[item.id] || "").trim())
      : respuesta.trim();

    if (!hayRespuesta || !sesionId || enviandoRef.current) return;
    enviandoRef.current = true;

    setLoading(true);
    setError("");

    try {
      const res = await enviarRegistrado("/api/sesion/respuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sesion_id: sesionId,
          respuesta_usuario: JSON.stringify(respuestaPayload),
          tiempo_segundos: Math.round((Date.now() - startTime.current) / 1000),
          user_id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo evaluar el examen.");
      setEvaluacion(data);
      registrarDesafioCompletado(sesionId, 2, {
        evaluacion: data,
        respuesta: "",
        borrador: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      enviandoRef.current = false; setLoading(false);
    }
  };

  const handleSiguiente = async (options = {}) => {
    const isReset = Boolean(options.resetMision);
    let yaTerminada = isReset ? false : misionTerminada;
    let retoJustCompleted = false;

    // Si terminó el reto habiendo pasado por el 2do intento y la resolución guiada, o salida voluntaria de no_visto
    if (!isReset && evaluacion && (!evaluacion.es_correcta || evaluacion.no_visto) && (intento >= 2 || options.completadoVoluntario)) {
      const id = String(sesionId || Date.now());
      if (!retosCompletadosIds.includes(id)) {
        const nextIds = [...retosCompletadosIds, id];
        const nuevosDesafios = nextIds.length;
        const starsBase = Math.max(getSavedStars(), estrellasAcumuladas);
        const newStars = starsBase + 2;
        const terminada = nuevosDesafios >= 3 || Boolean(pregunta?.repaso_espaciado);
        setRetosCompletadosIds(nextIds);
        setDesafiosCompletadosMision(nuevosDesafios);
        setEstrellasAcumuladas(newStars);
        saveStars(newStars);
        if (terminada) {
          setMisionTerminada(true);
          yaTerminada = true;
        }
        saveMissionState({
          retosCompletadosIds: nextIds,
          desafios: nuevosDesafios,
          estrellas: newStars,
          misionTerminada: terminada,
          evaluacion: null,
          pistaActiva: null,
          borrador: "",
        });
        retoJustCompleted = true;
      }
    }

    // Si la misión ya quedó terminada (alcanzó 3 retos), mostrar pantalla de cierre y no pedir otra pregunta
    if (yaTerminada || (!isReset && (desafiosCompletadosMision >= 3 || retosCompletadosIds.length >= 3) && !retoJustCompleted)) {
      setMisionTerminada(true);
      setEvaluacion(null);
      setPistaActiva(null);
      setRespuesta("");
      saveMissionState({ misionTerminada: true, evaluacion: null, pistaActiva: null, borrador: "" });
      return;
    }

    const decision = evaluacion?.decision || {};
    const proximoTema = decision.proximo_tema || pregunta?.tema || tema;
    const proximaCapa = decision.proxima_capa || capa;
    const proximoModo = decision.modo_recomendado || modo || "NORMAL";
    const nextForzarPractica = Boolean(options.forzar_practica ?? forzarPractica ?? forzarPracticaProp);
    if (options.forzar_practica !== undefined) {
      setForzarPractica(options.forzar_practica);
    }

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
          forzar_practica: nextForzarPractica,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo cargar la siguiente pregunta.");
      setPregunta(data);
      setSesionId(data.sesion_id);
      setEvaluacion(null);
      setPasoActual(0);
      setIntento(1);
      setPistaActiva(null);
      if (data && data.tipo === "leccion") {
        setHelpTab("slides");
        setCurrentSlideIndex(0);
      }
      setRespuestasExamen({});
      startTime.current = Date.now();

      const missionUpdates = isReset ? {
        desafios: 0,
        retosCompletadosIds: [],
        misionTerminada: false,
      } : {};

      saveMissionState({
        pregunta: data,
        sesionId: data.sesion_id,
        tema: data.tema || proximoTema,
        borrador: "",
        evaluacion: null,
        pistaActiva: null,
        intento: 1,
        pasoActual: 0,
        respuesta: "",
        respuestasExamen: {},
        forzar_practica: nextForzarPractica,
        ...missionUpdates,
      });
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
          forzar_practica: forzarPractica,
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
      saveMissionState({
        pregunta: data,
        sesionId: data.sesion_id,
        tema: data.tema || tema,
        borrador: "",
        evaluacion: null,
        intento: 1,
        pasoActual: 0,
        respuesta: "",
        forzar_practica: forzarPractica,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetomarExamen = async () => {
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
          tema: activeTema,
          capa,
          modo: modo || "NORMAL",
          tutor_preference,
          retomar_examen: Boolean(pregunta?.examen_pendiente),
          rendir_examen: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo retomar el examen.");
      setPregunta(data);
      setSesionId(data.sesion_id);
      setEvaluacion(null);
      setPasoActual(0);
      setIntento(1);
      setRespuestasExamen({});
      startTime.current = Date.now();
      saveMissionState({
        pregunta: data,
        sesionId: data.sesion_id,
        tema: data.tema || activeTema,
        borrador: "",
        evaluacion: null,
        intento: 1,
        pasoActual: 0,
        respuesta: "",
        respuestasExamen: {},
      });
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
      registrarDesafioCompletado(pregunta.tarea_id, 2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIniciarRepaso = async (objetivoId) => {
    if (enviandoRef.current || loading) return;
    // Solo se ofrece antes de empezar a responder o después del cierre de la misión.
    if (!misionTerminada && (desafiosCompletadosMision || respuesta || pasoActual || evaluacion || intento !== 1)) return;
    if (!saveMissionState({})) return;
    enviandoRef.current = true; setLoading(true); setError("");
    try {
      const res = await fetch('/api/sesion/repasos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id,objetivo_id:objetivoId})});
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo iniciar el repaso.');
      const nueva = {avatar:pregunta?.avatar,nombre_tutor:pregunta?.nombre_tutor,color_tema:pregunta?.color_tema,...data};
      setPregunta(nueva);setSesionId(data.sesion_id);setRespuesta('');setEvaluacion(null);setPasoActual(0);setIntento(1);setPistaActiva(null);
      setRespuestasExamen({});setDesafiosCompletadosMision(0);setRetosCompletadosIds([]);setMisionTerminada(false);startTime.current=Date.now();
      saveMissionState({pregunta:nueva,sesionId:data.sesion_id,tema:data.tema,solicitud_tema:tema || null,solicitud_modo:'NORMAL',
        desafios:0,retosCompletadosIds:[],misionTerminada:false,respuesta:'',borrador:'',evaluacion:null,pasoActual:0,intento:1,pistaActiva:null,respuestasExamen:{}});
    } catch(err) { setError(err.message); }
    finally { enviandoRef.current=false;setLoading(false); }
  };

  const handleSelectTema = async (nuevoTema, options = {}) => {
    const shouldForzar = Boolean(options.forzar_practica || (options.forzar_practica === undefined && forzarPractica));
    if (options.forzar_practica !== undefined) {
      setForzarPractica(options.forzar_practica);
    }
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
          modo: options.modo || modo || "NORMAL",
          omitir_caso_resuelto: options.omitir_caso_resuelto || false,
          forzar_practica: shouldForzar,
          tutor_preference,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo iniciar la practica.");
      setPregunta(data);
      setSesionId(data.sesion_id);
      setEvaluacion(null);
      setPasoActual(0);
      setIntento(1);
      setMisionTerminada(false);
      setDesafiosCompletadosMision(0);
      setRetosCompletadosIds([]);
      if (data && data.tipo === "leccion") {
        setHelpTab("slides");
        setCurrentSlideIndex(0);
      }
      setRespuestasExamen({});
      startTime.current = Date.now();
      saveMissionState({
        pregunta: data,
        sesionId: data.sesion_id,
        tema: data.tema || nuevoTema,
        solicitud_modo: options.modo || modo || "NORMAL",
        solicitud_tema: tema || null,
        desafios: 0,
        retosCompletadosIds: [],
        misionTerminada: false,
        borrador: "",
        evaluacion: null,
        intento: 1,
        pasoActual: 0,
        respuesta: "",
        forzar_practica: shouldForzar,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
    if (!pregunta || pregunta.contenido_version === VERSION_BASES) return null;
    let textoParaVisual = pregunta.pregunta || "";
    if (pregunta.tipo === "examen_final" && Array.isArray(pregunta.preguntas)) {
      textoParaVisual += " " + pregunta.preguntas.map((p) => p.texto || "").join(" ");
    }
    const visual = visualizacionParaTema(activeTema, textoParaVisual);
    if (visual?.tipo === "fraccion_operaciones_interactiva" || visual?.tipo === "numeros_naturales_interactivo") {
      return null;
    }
    return visual;
  }, [activeTema, pregunta]);

  const deckTeoria = useMemo(() => getDiapositivasParaTema(activeTema), [activeTema]);

  return (
    <section
      className={`tutoria-panel background-decorative theme-${theme} ${pregunta?.contenido_version === VERSION_BASES ? "bases-panel" : ""}`}
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
      <header className="session-header student-session-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <TutorHeader tutor={tutor} />
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {/* Indicador pedagógico de Micro-Misión */}
          <div style={{
            background: "rgba(139, 92, 246, 0.18)",
            border: "1px solid rgba(139, 92, 246, 0.4)",
            padding: "5px 12px",
            borderRadius: "20px",
            fontSize: "0.82rem",
            fontWeight: "600",
            color: "#c084fc",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 0 10px rgba(139, 92, 246, 0.15)"
          }}>
            <span>{pregunta?.repaso_espaciado ? "🔄 Repaso breve · 1 reto" : `🎯 Reto ${Math.min(3, desafiosCompletadosMision + 1)} de 3`}</span>
            {estrellasAcumuladas > 0 && <span>⭐ {estrellasAcumuladas}</span>}
          </div>

          <button type="button" disabled={loading} onClick={()=>handleSelectTema('comprension_lectora_literal_inferida')}>📚 Leer y escribir</button>
          {pregunta?.plan !== 'trial' && <button type="button" disabled={loading} onClick={()=>handleSelectTema('fracciones_concepto',{modo:'REPASO',forzar_practica:true})}>🌱 Aprender fracciones</button>}
          {pregunta?.tema_sugerido && !pregunta.tema_sugerido.completado && pregunta.tema === pregunta.tema_sugerido.tema && (
            <span className="plan-badge-tutoria" style={{ fontSize: "0.82rem", padding: "4px 12px", borderRadius: "20px", backgroundColor: "rgba(139, 92, 246, 0.2)", color: "#c084fc", border: "1px solid rgba(139, 92, 246, 0.4)", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px", boxShadow: "0 0 10px rgba(139, 92, 246, 0.15)" }}>
              🎯 Misión Familiar
            </span>
          )}

          <button
            type="button"
            onClick={abrirTeoria}
            style={{
              background: "rgba(139, 92, 246, 0.2)",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              color: "#c084fc",
              padding: "6px 12px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.83rem",
              cursor: "pointer",
              transition: "all 200ms ease",
              boxShadow: "0 0 10px rgba(139, 92, 246, 0.15)"
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
              padding: "6px 12px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.83rem",
              cursor: "pointer",
              transition: "all 200ms ease"
            }}
          >
            📖 Elegir Tema
          </button>

          <button
            type="button"
            onClick={handleGuardarYSalir}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#94a3b8",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "0.82rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 150ms ease"
            }}
            title="Guardar y salir por hoy"
          >
            💾 Guardar y salir
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

      {pregunta && !loading && (misionTerminada || (!pregunta.repaso_espaciado && !desafiosCompletadosMision && !respuesta && !pasoActual && !evaluacion && intento === 1)) && (
        <RepasoSugerido userId={user_id} loading={loading} refrescar={sesionId + ':' + misionTerminada} onStart={handleIniciarRepaso} />
      )}

      {!evaluacion && <BarrasFraccion barras={pregunta?.tipo === 'leccion' ? (pasoActual === 0 ? pregunta.visual_apoyo : pasoActualData?.contenido?.visual) : pregunta?.visual_apoyo} />}
      {loading && <p className="status">{tutor.nombre} esta pensando...</p>}
      {error && <p className="error" role="alert" style={{ color: "#fecaca" }}>{error}</p>}

      {!evaluacion && !misionTerminada && (pregunta?.examen_pendiente || pregunta?.examen_disponible) && pregunta?.tipo !== "leccion" && pregunta?.tipo !== "examen_final" && (
        <div style={{
          margin: "12px 0 20px 0",
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%)",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          borderRadius: "12px",
          padding: "14px 18px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          animation: "fadeInUp 0.3s ease both"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.6rem" }}>📝</span>
            <div style={{ textAlign: "left" }}>
              <strong style={{ color: "#fef3c7", fontSize: "0.92rem", display: "block" }}>
                {pregunta?.examen_pendiente ? "Examen pendiente" : "Ya podés probar el examen"}
              </strong>
              <span style={{ color: "#fde68a", fontSize: "0.82rem" }}>
                Podés seguir practicando o elegir el examen cuando tengas ganas.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRetomarExamen}
            disabled={loading}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              background: "#d97706",
              color: "#ffffff",
              fontSize: "0.84rem",
              fontWeight: "700",
              border: "none",
              cursor: "pointer",
            }}
          >
            {pregunta?.examen_pendiente ? "Retomar examen" : "Elegir examen"} →
          </button>
        </div>
      )}

      {!evaluacion && !misionTerminada && pregunta?.tipo === "trial_completado" && (
        <PantallaTrialCompletado tutor={tutor} />
      )}

      {!evaluacion && !misionTerminada && pregunta?.tipo === "manuscrita" && (
        <TareaManuscrita pregunta={pregunta} loading={loading} onComplete={handleTareaCompletada} />
      )}

      {!evaluacion && !misionTerminada && pregunta?.tipo === "caso_resuelto" && (
        <PantallaCasoResuelto
          caso={pregunta.caso}
          metodo={pregunta.metodo}
          loading={loading}
          onContinuar={handleContinuarCasoResuelto}
        />
      )}

      {!evaluacion && !misionTerminada && pregunta?.tipo === "examen_final" && (
        pregunta?.revision_pendiente || pregunta?.entregado ? (
          <PantallaExamenEntregadoRevision
            pregunta={pregunta}
            tema={activeTema}
            onContinuarPractica={() => {
              setForzarPractica(true);
              handleSelectTema(activeTema, { forzar_practica: true });
            }}
            onCambiarTema={() => setShowTopicModal(true)}
          />
        ) : (
          <ExamenFinal
            pregunta={pregunta}
            tema={activeTema}
            respuestas={respuestasExamen}
            respuestaTexto={respuesta}
            loading={loading}
            onRespuesta={(id, value) => {
              setRespuestasExamen((prev) => {
                const next = { ...prev, [id]: value };
                saveMissionState({ respuestasExamen: next });
                return next;
              });
            }}
            onRespuestaTexto={(val) => {
              setRespuesta(val);
              saveMissionState({ respuesta: val, borrador: val });
            }}
            onSubmit={handleEnviarExamen}
            visualParaEjercicio={visualParaEjercicio}
            onSwitchTopic={() => setShowTopicModal(true)}
            onOpenTheory={abrirTeoria}
            onForzarPractica={() => {
              setForzarPractica(true);
              handleSelectTema(activeTema, { forzar_practica: true });
            }}
          />
        )
      )}

      {!evaluacion && !misionTerminada && pregunta?.tipo === "leccion" && pasoActualData && (
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
                <h2>Ahora probá vos</h2>
                <p className="question-text small" style={{whiteSpace:"pre-line"}}>{parseInlineMarkdown(pasoActualData.contenido.enunciado)}</p>
                {visualParaEjercicio && (
                  <div style={{ marginBottom: "20px" }}>
                    <VisualizacionMatematica tipo={visualParaEjercicio.tipo} datos={visualParaEjercicio.datos} mostrarResultado={false} />
                  </div>
                )}
                {pregunta.ejercicio_practica?.opciones ? <div role="group" aria-label="Elegí una respuesta" style={{display:'flex',gap:12,flexWrap:'wrap'}}>{pregunta.ejercicio_practica.opciones.map(op => <button type="button" key={op} disabled={loading} aria-pressed={respuesta===op} onClick={()=>{setRespuesta(op);saveMissionState({respuesta:op,borrador:op});}} style={{padding:'14px 22px',border:respuesta===op?'2px solid #38bdf8':'1px solid #a59ec9',borderRadius:12}}>{op}</button>)}</div> : <textarea
                  placeholder="Escribi tu respuesta aca..."
                  value={respuesta}
                  onChange={(event) => {
                    setRespuesta(event.target.value);
                    saveMissionState({ borrador: event.target.value, respuesta: event.target.value });
                  }}
                  rows={4}
                />}

                {pistaActiva && intento > 1 && (
                  <div style={{
                    margin: "14px 0",
                    padding: "12px 16px",
                    background: "rgba(139, 92, 246, 0.15)",
                    borderLeft: "4px solid #a855f7",
                    borderRadius: "8px",
                    textAlign: "left"
                  }}>
                    <strong style={{ color: "#c084fc", fontSize: "0.88rem" }}>💡 Pista de ayuda para este intento:</strong>
                    <p style={{ margin: "4px 0 0", color: "#e2e8f0", fontSize: "0.9rem", lineHeight: "1.4", whiteSpace: "pre-line" }}>
                      {pistaActiva}
                    </p>
                  </div>
                )}

                <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginTop: "10px" }}>
                  <button className="primary" onClick={handleSubmit} disabled={!respuesta.trim() || loading}>
                    {loading ? "Enviando..." : intento > 1 ? "Reenviar respuesta corregida" : "Enviar respuesta"}
                  </button>
                  <button
                    type="button"
                    onClick={handleNoVisto}
                    disabled={loading}
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px dashed rgba(168, 85, 247, 0.5)",
                      color: "#d8b4fe",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 150ms ease"
                    }}
                    title="Si todavía no aprendiste esto, el tutor te lo explica sin ponerte mala nota"
                  >
                    🤔 Esto todavía no lo vimos
                  </button>
                  {intento > 1 && (
                    <span style={{ fontSize: "0.82rem", color: "#a855f7", fontWeight: "600" }}>
                      💡 2° intento con pista
                    </span>
                  )}
                </div>
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
                  Tip: {parseInlineMarkdown(pasoActualData.contenido.pista || pregunta.concepto_clave_repetir || "Volvé a mirar el ejemplo y comparalo con este reto.")}
                </div>
              </div>
            )}
          </div>

          <div className="lesson-navigation">
            <button
              type="button"
              onClick={() => {
                const prevStep = Math.max(0, pasoActual - 1);
                setPasoActual(prevStep);
                saveMissionState({ pasoActual: prevStep });
              }}
              disabled={pasoActual === 0}
            >
              ← Anterior
            </button>
            <span>
              Paso {pasoActual + 1} de {totalPasos}
            </span>
            {pasoActual < totalPasos - 1 ? (
              <button
                type="button"
                className="primary compact"
                onClick={() => {
                  const nextStep = pasoActual + 1;
                  setPasoActual(nextStep);
                  saveMissionState({ pasoActual: nextStep });
                }}
              >
                Siguiente →
              </button>
            ) : (
              <span className="nav-spacer" aria-hidden="true" />
            )}
          </div>
        </div>
      )}

      {/* Pantalla de Celebración de Micro-Misión */}
      {misionTerminada && (!evaluacion || evaluacion.es_correcta || evaluacion.revision_pendiente) && !evaluacion?.no_visto && (
        <div style={{
          background: "linear-gradient(135deg, rgba(30, 27, 75, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)",
          border: "1px solid rgba(139, 92, 246, 0.5)",
          borderRadius: "16px",
          padding: "32px 24px",
          textAlign: "center",
          maxWidth: "540px",
          margin: "40px auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(139, 92, 246, 0.2)"
        }}>
          <span style={{ fontSize: "3rem" }}>🎉</span>
          <h2 style={{ color: "#ffffff", margin: "16px 0 8px", fontSize: "1.5rem" }}>{pregunta?.repaso_espaciado ? "¡Repaso completado!" : "¡Misión del día completada!"}</h2>
          <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.5" }}>
            Trabajaste {pregunta?.repaso_espaciado ? "una idea que ya conocías" : "tus desafíos de hoy"} sobre <strong>{pregunta?.unidad_titulo || activeTema.replace(/_/g, " ")}</strong>. ¡Podés descansar!
          </p>
          {evaluacion?.retroalimentacion && (
            <div style={{
              background: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "10px",
              padding: "10px 16px",
              margin: "16px 0",
              color: "#86efac",
              fontSize: "0.9rem"
            }}>
              ⭐ {evaluacion.retroalimentacion}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", margin: "24px 0" }}>
            <div style={{ background: "rgba(255,255,255,0.06)", padding: "12px 20px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: "700", color: "#fbbf24" }}>⭐ +{retosCompletadosIds.length * 2}</span>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8" }}>Estrellas ganadas</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.06)", padding: "12px 20px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: "700", color: "#38bdf8" }}>✓ {pregunta?.repaso_espaciado ? "1 de 1" : "3 de 3"}</span>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8" }}>Retos superados</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              className="primary"
              onClick={() => { window.location.href = "/"; }}
              style={{ padding: "12px 24px", borderRadius: "10px", fontWeight: "700", fontSize: "0.95rem" }}
            >
              🌟 Listo por hoy (Descansar)
            </button>
            <button
              type="button"
              onClick={() => {
                setDesafiosCompletadosMision(0);
                setRetosCompletadosIds([]);
                setMisionTerminada(false);
                saveMissionState({
                  desafios: 0,
                  retosCompletadosIds: [],
                  misionTerminada: false,
                  borrador: "",
                  evaluacion: null,
                  intento: 1,
                  pasoActual: 0,
                  respuesta: "",
                });
                handleSiguiente({ resetMision: true });
              }}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem"
              }}
            >
              🚀 Hacer otra misión
            </button>
          </div>
        </div>
      )}

      {!misionTerminada &&
        !evaluacion &&
        pregunta?.tipo !== "leccion" &&
        pregunta?.tipo !== "manuscrita" &&
        pregunta?.tipo !== "examen_final" &&
        pregunta?.tipo !== "caso_resuelto" &&
        pregunta && (
        <div className="question-area">
          <p className="question-text">{parseInlineMarkdown(pregunta.pregunta)}</p>

          {pistaActiva && intento > 1 && (
            <div style={{
              margin: "14px 0",
              padding: "12px 16px",
              background: "rgba(139, 92, 246, 0.15)",
              borderLeft: "4px solid #a855f7",
              borderRadius: "8px",
              textAlign: "left"
            }}>
              <strong style={{ color: "#c084fc", fontSize: "0.88rem" }}>💡 Pista de ayuda para este intento:</strong>
              <p style={{ margin: "4px 0 0", color: "#e2e8f0", fontSize: "0.9rem", lineHeight: "1.4", whiteSpace: "pre-line" }}>
                {pistaActiva}
              </p>
            </div>
          )}

          {visualParaEjercicio && (
            <div style={{ marginBottom: "20px" }}>
              <VisualizacionMatematica tipo={visualParaEjercicio.tipo} datos={visualParaEjercicio.datos} mostrarResultado={false} />
            </div>
          )}

          {pregunta.opciones?.length > 0 ? (
            <div
              className="answer-options-interactive"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "12px",
                margin: "20px 0"
              }}
            >
              {pregunta.opciones.map((opcion) => {
                const isSelected = respuesta.trim() === opcion.trim() || respuesta.trim() === opcion.slice(0, 2).replace(")", "").trim();
                return (
                  <button
                    key={opcion}
                    type="button"
                    onClick={() => {
                      setRespuesta(opcion);
                      saveMissionState({ borrador: opcion });
                    }}
                    style={{
                      padding: "14px 18px",
                      borderRadius: "12px",
                      border: isSelected ? "2px solid #8b5cf6" : "1px solid rgba(255, 255, 255, 0.12)",
                      background: isSelected ? "rgba(139, 92, 246, 0.25)" : "rgba(255, 255, 255, 0.04)",
                      color: "#ffffff",
                      fontSize: "0.95rem",
                      fontWeight: isSelected ? "700" : "500",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s ease",
                      boxShadow: isSelected ? "0 0 14px rgba(139, 92, 246, 0.35)" : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        border: isSelected ? "2px solid #8b5cf6" : "1px solid rgba(255,255,255,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        background: isSelected ? "#8b5cf6" : "transparent"
                      }}
                    >
                      {isSelected ? "✓" : ""}
                    </span>
                    <span>{parseInlineMarkdown(opcion)}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <textarea
              placeholder="Escribi tu respuesta aca..."
              value={respuesta}
              onChange={(event) => {
                setRespuesta(event.target.value);
                saveMissionState({ borrador: event.target.value, respuesta: event.target.value });
              }}
              rows={4}
              style={{ width: "100%", margin: "16px 0", padding: "12px", borderRadius: "8px" }}
            />
          )}

          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <button className="primary" onClick={handleSubmit} disabled={!respuesta.trim() || loading}>
              {loading ? "Enviando..." : intento > 1 ? "Reenviar respuesta corregida" : "Enviar respuesta"}
            </button>
            <button
              type="button"
              onClick={handleNoVisto}
              disabled={loading}
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px dashed rgba(168, 85, 247, 0.5)",
                color: "#d8b4fe",
                padding: "10px 16px",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 150ms ease"
              }}
              title="Si todavía no aprendiste esto, el tutor te lo explica sin ponerte mala nota"
            >
              🤔 Esto todavía no lo vimos
            </button>
            {intento > 1 && (
              <span style={{ fontSize: "0.82rem", color: "#a855f7", fontWeight: "600" }}>
                💡 2° intento con pista
              </span>
            )}
          </div>
        </div>
      )}

      {evaluacion && (!misionTerminada || evaluacion.no_visto || !evaluacion.es_correcta) && (
        <div className={`feedback ${evaluacion.no_visto ? "info" : evaluacion.revision_pendiente ? "info" : evaluacion.es_correcta ? "correct" : "review"}`}>
          <TutorMessage
            tutor={tutor}
            mensaje={
              evaluacion.no_visto
                ? evaluacion.retroalimentacion || "¡Qué bueno que avises! Nadie nace sabiendo. Vamos a descubrir este paso juntos."
                : evaluacion.es_correcta
                ? intento > 1
                  ? `¡Excelente esfuerzo! ${evaluacion.retroalimentacion || "Pensaste con la pista y lo resolviste."}`
                  : evaluacion.retroalimentacion
                : evaluacion.retroalimentacion || evaluacion.razon_error
            }
          />

          {/* Tarjeta explicativa si avisó que todavía no lo vio */}
          {evaluacion.no_visto && (
            <div style={{
              marginTop: "16px",
              padding: "14px 16px",
              background: "rgba(139, 92, 246, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              borderRadius: "12px",
              textAlign: "left"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ fontSize: "1.2rem" }}>✨</span>
                <strong style={{ color: "#c084fc", fontSize: "0.92rem" }}>Aprendamos este paso juntos:</strong>
              </div>
              {evaluacion.pista_concreta && (
                <p style={{ color: "#e2e8f0", fontSize: "0.9rem", margin: "0 0 6px", lineHeight: "1.5" }}>
                  💡 <strong>Idea clave:</strong> {evaluacion.pista_concreta}
                </p>
              )}
              {evaluacion.paso_resuelto && (
                <div style={{
                  background: "rgba(0, 0, 0, 0.25)",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  color: "#cbd5e1",
                  fontSize: "0.88rem",
                  lineHeight: "1.5",
                  whiteSpace: "pre-line",
                  marginBottom: "6px"
                }}>
                  {evaluacion.paso_resuelto}
                </div>
              )}
              <span style={{ color: "#a59ec9", fontSize: "0.82rem" }}>
                ¡Genial tu honestidad y curiosidad! Revisá la idea clave y probemos dar el paso juntos.
              </span>
            </div>
          )}

          {/* Si era no_visto: Ofrecer práctica guiada con la ayuda visible o salida voluntaria */}
          {evaluacion.no_visto && (
            <div style={{ marginTop: "16px" }}>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  const pistaTexto = evaluacion.pista_concreta || evaluacion.paso_resuelto || "Revisá la idea clave y resolvé paso a paso.";
                  setPistaActiva(pistaTexto);
                  setIntento(2);
                  setEvaluacion(null);
                  setRespuesta("");
                  saveMissionState({
                    intento: 2,
                    evaluacion: null,
                    pistaActiva: pistaTexto,
                    borrador: "",
                    respuesta: "",
                  });
                }}
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  width: "100%",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                💡 Probar ahora con esta ayuda
              </button>

              <button
                type="button"
                onClick={() => handleSiguiente({ completadoVoluntario: true })}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "0.84rem",
                  padding: "6px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Prefiero pasar a otro reto por ahora
              </button>
            </div>
          )}

          {/* Si falló en el primer intento (y no era no_visto ni examen final): Circuito de Segundo Intento con Pista Garantizada */}
          {!evaluacion.no_visto && !evaluacion.es_correcta && intento === 1 && pregunta?.tipo !== "examen_final" && (
            <div style={{ marginTop: "16px" }}>
              <div style={{
                padding: "12px 16px",
                background: "rgba(139, 92, 246, 0.15)",
                borderRadius: "10px",
                borderLeft: "4px solid #a855f7",
                marginBottom: "14px",
                textAlign: "left"
              }}>
                <strong style={{ color: "#c084fc", fontSize: "0.88rem" }}>💡 Pista del tutor:</strong>
                <p style={{ margin: "4px 0 0", color: "#e2e8f0", fontSize: "0.9rem", lineHeight: "1.4" }}>
                  {evaluacion.pista_concreta?.trim() ||
                   evaluacion.siguiente_pregunta?.trim() ||
                   evaluacion.razon_error?.trim() ||
                   (pregunta.tipo === "multiple"
                     ? "Descartá las opciones que parezcan imposibles y compará las que quedan con el enunciado."
                     : "Volvé a leer los datos principales con calma y resolvé paso a paso.")}
                </p>
              </div>

              <button
                type="button"
                className="primary"
                onClick={() => {
                  const pistaTexto = evaluacion.pista_concreta?.trim() ||
                    evaluacion.siguiente_pregunta?.trim() ||
                    evaluacion.razon_error?.trim() ||
                    (pregunta.tipo === "multiple"
                      ? "Descartá las opciones que parezcan imposibles y compará las que quedan con el enunciado."
                      : "Volvé a leer los datos principales con calma y resolvé paso a paso.");
                  setPistaActiva(pistaTexto);
                  setIntento(2);
                  setEvaluacion(null);
                  saveMissionState({ intento: 2, evaluacion: null, pistaActiva: pistaTexto });
                }}
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  width: "100%",
                  marginBottom: "10px",
                  cursor: "pointer"
                }}
              >
                💡 Probar de nuevo con esta pista
              </button>

              <button
                type="button"
                onClick={() => handleSiguiente()}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "0.84rem",
                  padding: "6px",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                Prefiero pasar a otra pregunta
              </button>
            </div>
          )}

          {/* Si falló el 2do intento (y no era no_visto ni examen final): Resolver un paso juntos */}
          {!evaluacion.no_visto && !evaluacion.es_correcta && intento >= 2 && pregunta?.tipo !== "examen_final" && (
            <div style={{
              marginTop: "16px",
              padding: "14px 16px",
              background: "rgba(99, 102, 241, 0.12)",
              border: "1px solid rgba(139, 92, 246, 0.35)",
              borderRadius: "12px",
              textAlign: "left"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ fontSize: "1.2rem" }}>🤝</span>
                <strong style={{ color: "#c084fc", fontSize: "0.92rem" }}>Resolvamos este paso juntos:</strong>
              </div>
              <p style={{ color: "#e2e8f0", fontSize: "0.9rem", margin: "0 0 6px", lineHeight: "1.5", whiteSpace: "pre-line" }}>
                {evaluacion.paso_resuelto?.trim() ||
                 (evaluacion.razon_error ? `Paso a recordar: ${evaluacion.razon_error}` : null) ||
                 evaluacion.retroalimentacion ||
                 "Lo importante acá es observar el procedimiento y aprender del intento."}
              </p>
              <span style={{ color: "#a59ec9", fontSize: "0.82rem" }}>
                ¡Buen esfuerzo! Completaste el análisis de este reto y sumás a tu misión.
              </span>
            </div>
          )}

          {/* Si es examen final desaprobado: acceso directo a practicar sin pasar por circuito de reintentos con pista */}
          {pregunta?.tipo === "examen_final" && !evaluacion.es_correcta && !evaluacion.revision_pendiente && (
            <div style={{ marginTop: "16px" }}>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  setForzarPractica(true);
                  handleSiguiente({ forzar_practica: true });
                }}
                disabled={loading}
                style={{ width: "100%", marginBottom: "10px" }}
              >
                {misionTerminada || (desafiosCompletadosMision >= 3 && evaluacion.es_correcta)
                  ? "🎉 Ver misión completada →"
                  : "Practicar para mejorar"}
              </button>

              <button
                type="button"
                onClick={() => setShowTopicModal(true)}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  padding: "10px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                📖 Estudiar otro tema por ahora
              </button>
            </div>
          )}

          {/* Si acertó, si está en revisión diferida, o si ya falló el 2do intento de un ejercicio común */}
          {!evaluacion.no_visto && (pregunta?.tipo !== "examen_final" ? (evaluacion.es_correcta || evaluacion.revision_pendiente || intento > 1) : (evaluacion.es_correcta || evaluacion.revision_pendiente)) && (
            <div style={{ marginTop: "16px" }}>
              <button
                type="button"
                className="primary"
                onClick={() => handleSiguiente()}
                disabled={loading}
                style={{ width: "100%" }}
              >
                {misionTerminada || (desafiosCompletadosMision >= 3 && (evaluacion.es_correcta || evaluacion.revision_pendiente))
                  ? "🎉 Ver misión completada →"
                  : "Siguiente reto →"}
              </button>
            </div>
          )}

          {!evaluacion.es_correcta && intento > 1 && (
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
              📖 Ver la explicación completa
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
                <p style={{ margin: "4px 0 0 0", fontSize: "0.82rem", color: "#a59ec9" }}>Elegí un tema disponible. Cada paso nuevo se apoya en lo que ya aprendiste.</p>
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
                const opcionesAcceso = {plan: pregunta?.plan || "full", aprobados: completedExams, rutaFlexible: bypassLocks};
                const isTopicUnlocked = tema => accesoTema(tema, opcionesAcceso).habilitado;
                const topicsFase1 = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => t.fase === 1);
                const topicsFase2 = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => t.fase === 2);
                const topicsFase3 = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => t.fase === 3);
                const topicsFase4 = [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].filter(t => t.fase === 4);

                const approvedFase1 = topicsFase1.filter(t => completedExams.has(t.tema)).length;
                const approvedFase2 = topicsFase2.filter(t => completedExams.has(t.tema)).length;
                const approvedFase3 = topicsFase3.filter(t => completedExams.has(t.tema)).length;
                const approvedFase4 = topicsFase4.filter(t => completedExams.has(t.tema)).length;

                const unlockedFase1 = topicsFase1.some(t => isTopicUnlocked(t.tema));
                const unlockedFase2 = topicsFase2.some(t => isTopicUnlocked(t.tema));
                const unlockedFase3 = topicsFase3.some(t => isTopicUnlocked(t.tema));
                const unlockedFase4 = topicsFase4.some(t => isTopicUnlocked(t.tema));

                return (
                  <>
                    {/* FASE 1 */}
                    <PhaseSection
                      number={1}
                      title="Primeros pasos"
                      subtitle="Contar, leer y descubrir cómo se escriben las palabras."
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
                      title="Fracciones y palabras"
                      subtitle="Partir en partes iguales, buscar múltiplos y conocer las palabras."
                      unlocked={unlockedFase2}
                      requiredText="Cada tema indica qué conocimientos previos necesita."
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
                      title="Conectar ideas"
                      subtitle="Usar lo aprendido para resolver, comprender y conectar ideas."
                      unlocked={unlockedFase3}
                      requiredText="Cada tema indica qué conocimientos previos necesita."
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
                      title="Formas, medidas e historias"
                      subtitle="Explorar figuras y medidas, descubrir patrones y escribir historias."
                      unlocked={unlockedFase4}
                      requiredText="Cada tema indica qué conocimientos previos necesita."
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

                    <div style={{padding:20,borderRadius:12,border:"1px solid #2a204d",color:"#a59ec9"}}>
                      <h4 style={{margin:"0 0 6px",color:"#e8e4f0"}}>Simulacros de ingreso</h4>
                      <p style={{margin:0}}>Los simulacros completos todavía no están disponibles. Por ahora, podés aprender y practicar cada tema.</p>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Trial Banner Footer */}
            {pregunta?.plan === "trial" && (
              <div style={{ padding: "12px 20px", background: "rgba(239, 68, 68, 0.05)", borderTop: "1px solid #2a204d", borderRadius: "0 0 16px 16px", fontSize: "0.8rem", color: "#fca5a5", textAlign: "center" }}>
                💡 En la muestra gratuita tienes 4 temas disponibles. El acceso completo incluye más temas para aprender paso a paso.
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
                <p style={{ margin: "4px 0 0 0", fontSize: "0.82rem", color: "#a59ec9" }}>Explicaciones y fichas de estudio</p>
              </div>
              <button type="button" onClick={() => setShowHelpModal(false)} style={{ background: "transparent", border: "none", color: "#9590a6", fontSize: "1.8rem", cursor: "pointer", transition: "color 150ms", padding: "0 4px" }}>&times;</button>
            </div>

            {/* Tabs selector */}
            <div style={{ display: "flex", borderBottom: "1px solid #2a204d", padding: "0 24px", background: "rgba(0,0,0,0.15)" }}>
              {[
                { id: "slides", label: "🛝 Diapositivas" },
                ...(activeTema === "fracciones_concepto" ? [{ id: "interactive", label: "🍕 Explorador de Fracciones" }] : []),
                ...(activeTema === "fracciones_operaciones" || activeTema === "fracciones_del_resto" ? [{ id: "interactive_ops", label: "🧮 Simulador de Operaciones" }] : []),
                ...(activeTema === "numeros_naturales_sistema_decimal" ? [{ id: "interactive_decimal", label: "🧮 Tablero y Desintegrador" }] : []),
                { id: "theory", label: "📚 Apunte Teórico" },
                ...(deckTeoria.pdf_url ? [{ id: "pdf", label: "📥 Descargar Ficha PDF" }] : [])
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
                if (!currentSlide) return <p>La ficha de este tema todavía no está disponible. Podés pedirle al tutor que te explique el ejercicio con el botón «Esto todavía no lo vimos».</p>;
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

              {helpTab === "interactive_decimal" && (
                <div style={{ padding: "10px 0" }}>
                  <VisualizacionMatematica tipo="numeros_naturales_interactivo" datos={{}} />
                </div>
              )}

              {helpTab === "theory" && (
                <div style={{ color: "#e8e4f0", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid #2a204d", borderRadius: "12px", padding: "20px" }}>
                    {deckTeoria.apunte_completo ? <MarkdownRenderer content={deckTeoria.apunte_completo} /> : <p>La ficha de este tema todavía no está disponible. Volvé al ejercicio y elegí «Esto todavía no lo vimos» para recibir una explicación.</p>}
                  </div>
                </div>
              )}

              {helpTab === "pdf" && deckTeoria.pdf_url && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", padding: "40px 20px", textAlign: "center" }}>
                  <span style={{ fontSize: "3.5rem" }}>📄</span>
                  <div>
                    <h4 style={{ color: "#ffffff", fontSize: "1.2rem", fontWeight: "700", margin: "0 0 8px 0" }}>Ficha Imprimible de Estudio</h4>
                    <p style={{ color: "#a59ec9", fontSize: "0.88rem", margin: 0, maxWidth: "450px" }}>
                      Descarga este apunte completo en formato PDF listo para imprimir. Ideal para estudiar en papel, realizar anotaciones y resolver ejercicios prácticos a mano.
                    </p>
                  </div>
                  <a
                    href={getPdfUrl(deckTeoria.pdf_url)}
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
  const textoVisual = ejemplo?.enunciado || "";
  const visual = visualizacionParaTema(tema, textoVisual);
  if (!visual) return null;
  return <VisualizacionMatematica tipo={visual.tipo} datos={visual.datos} />;
}

function visualizacionParaTema(tema = "", texto = "") {
  return visualizacionSegura(tema, texto);
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

function ExamenFinal({ pregunta, tema, respuestas, respuestaTexto, loading, onRespuesta, onRespuestaTexto, onSubmit, visualParaEjercicio, onSwitchTopic, onOpenTheory, onForzarPractica }) {
  const tienePreguntas = pregunta.preguntas?.length > 0;
  const puedeEnviar = tienePreguntas
    ? pregunta.preguntas.every((item) => String(respuestas[item.id] || "").trim())
    : String(respuestaTexto || "").trim();

  return (
    <div className="exam-final-shell">
      <section className="exam-banner">
        <p className="eyebrow">Examen Final de Evaluación</p>
        <h2>{tema.replace(/_/g, " ")}</h2>
        <p>{parseInlineMarkdown(pregunta.instrucciones)}</p>

        {/* Barra de opciones de estudio y repaso */}
        <div style={{
          marginTop: "16px",
          background: "rgba(15, 12, 35, 0.65)",
          border: "1px solid rgba(139, 92, 246, 0.35)",
          borderRadius: "12px",
          padding: "14px 18px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          textAlign: "left"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.4rem" }}>🎓</span>
            <div>
              <strong style={{ color: "#ffffff", fontSize: "0.92rem", display: "block" }}>
                ¿Querés repasar antes de rendir el examen?
              </strong>
              <span style={{ color: "#a59ec9", fontSize: "0.82rem" }}>
                Podés leer las fichas teóricas, practicar sin nota o cambiar de materia.
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {onOpenTheory && (
              <button
                type="button"
                onClick={onOpenTheory}
                style={{
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(124, 58, 237, 0.3) 100%)",
                  border: "1px solid rgba(168, 85, 247, 0.5)",
                  color: "#e9d5ff",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "0.83rem",
                  cursor: "pointer",
                  transition: "all 150ms ease"
                }}
              >
                💡 Ver Teoría y Apuntes
              </button>
            )}
            {onForzarPractica && (
              <button
                type="button"
                onClick={onForzarPractica}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  color: "#ffffff",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "0.83rem",
                  cursor: "pointer",
                  transition: "all 150ms ease"
                }}
              >
                🔄 Practicar más (Sin examen)
              </button>
            )}
            {onSwitchTopic && (
              <button
                type="button"
                onClick={onSwitchTopic}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#cbd5e1",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "0.83rem",
                  cursor: "pointer",
                  transition: "all 150ms ease"
                }}
              >
                📖 Elegir otro tema
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="exam-card">
        <p className="exam-statement">{parseInlineMarkdown(pregunta.enunciado)}</p>
        {pregunta.visualizacion ? (
          <VisualizacionMatematica tipo={pregunta.visualizacion.tipo} datos={pregunta.visualizacion.datos} mostrarResultado={false} />
        ) : (
          visualParaEjercicio && <VisualizacionMatematica tipo={visualParaEjercicio.tipo} datos={visualParaEjercicio.datos} mostrarResultado={false} />
        )}
      </section>

      <section className="exam-card exam-answers">
        {tienePreguntas ? (
          pregunta.preguntas.map((item) => (
            <div key={item.id} className="exam-question" role="group" aria-label={`Pregunta ${item.id}`}>
              <label htmlFor={`respuesta-examen-${item.id}`} style={{whiteSpace:"pre-line"}}>
                {item.id}) {parseInlineMarkdown(item.texto)}
              </label>
              {item.opciones?.length ? <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {item.opciones.map(opcion => <button key={opcion} type="button" aria-pressed={respuestas[item.id]===opcion}
                  onClick={()=>onRespuesta(item.id,opcion)} disabled={loading}
                  style={{padding:"12px 16px",borderRadius:10,border:respuestas[item.id]===opcion?"2px solid #38bdf8":"1px solid #64748b",background:respuestas[item.id]===opcion?"#164e63":"#1e293b",color:"#f8fafc",cursor:"pointer",minHeight:44}}>{opcion}</button>)}
              </div> : <input id={`respuesta-examen-${item.id}`} type="text" value={respuestas[item.id] || ""}
                onChange={event => onRespuesta(item.id,event.target.value)} placeholder="Tu respuesta..." />}
            </div>
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

        {onSwitchTopic && (
          <button
            type="button"
            onClick={onSwitchTopic}
            style={{
              marginTop: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#a59ec9",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer",
              width: "100%",
              textAlign: "center",
              transition: "all 200ms"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.color = "#a59ec9";
            }}
          >
            📖 Estudiar otro tema por ahora
          </button>
        )}
      </section>
    </div>
  );
}

function PantallaExamenEntregadoRevision({ pregunta, tema, onContinuarPractica, onCambiarTema }) {
  let textoEntregado = pregunta.respuesta_guardada || pregunta.pregunta || "";
  try {
    const parsed = typeof textoEntregado === "string" && textoEntregado.startsWith("{") ? JSON.parse(textoEntregado) : null;
    if (parsed?.texto) textoEntregado = parsed.texto;
  } catch {}

  const fechaFormateada = pregunta.fecha_entrega
    ? new Date(pregunta.fecha_entrega).toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="exam-final-shell" style={{ maxWidth: "780px", margin: "0 auto" }}>
      <section className="exam-banner" style={{ borderLeft: "4px solid #10b981" }}>
        <p className="eyebrow" style={{ color: "#34d399" }}>Producción Escrita Registrada</p>
        <h2>{tema.replace(/_/g, " ")}</h2>
        <div style={{
          margin: "12px 0 16px 0",
          background: "rgba(16, 185, 129, 0.12)",
          border: "1px solid rgba(16, 185, 129, 0.35)",
          borderRadius: "12px",
          padding: "16px 20px",
          display: "flex",
          gap: "14px",
          alignItems: "flex-start",
        }}>
          <span style={{ fontSize: "1.8rem" }}>📋</span>
          <div>
            <strong style={{ color: "#a7f3d0", fontSize: "1.05rem", display: "block", marginBottom: "4px" }}>
              {pregunta.revision_familiar ? "Tu producción ya tiene una devolución familiar" : "Entregado: pendiente de revisión docente y familiar"}
            </strong>
            <p style={{ color: "#e2e8f0", fontSize: "0.92rem", lineHeight: "1.5", margin: 0 }}>
              {pregunta.revision_familiar ? "Podés leer la devolución y conversar en familia sobre cómo seguir." : "Tu producción escrita fue guardada con éxito y quedó registrada para revisión con rúbrica cualitativa."}
              No necesitás volver a rendirla. Podés continuar practicando para seguir sumando estrellas o elegir otra materia.
            </p>
            {fechaFormateada && (
              <span style={{ color: "#6ee7b7", fontSize: "0.82rem", display: "block", marginTop: "8px", fontWeight: "600" }}>
                📅 Fecha de entrega: {fechaFormateada}
              </span>
            )}
          </div>
        </div>
      </section>

      {pregunta.revision_familiar?.comentario && <section className="exam-card"><h3>Devolución familiar</h3><p style={{whiteSpace:"pre-wrap"}}>{pregunta.revision_familiar.comentario}</p></section>}

      {textoEntregado && (
        <section className="exam-card" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <h3 style={{ color: "#e2e8f0", fontSize: "0.95rem", marginBottom: "10px", fontWeight: "700" }}>
            Texto que enviaste para corrección:
          </h3>
          <div style={{
            background: "rgba(0, 0, 0, 0.25)",
            padding: "16px",
            borderRadius: "8px",
            borderLeft: "3px solid #8b5cf6",
            color: "#f1f5f9",
            fontSize: "0.95rem",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
          }}>
            {textoEntregado}
          </div>
        </section>
      )}

      <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", flexWrap: "wrap", marginTop: "20px" }}>
        {onCambiarTema && (
          <button
            type="button"
            onClick={onCambiarTema}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#e2e8f0",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            📚 Elegir otro tema / materia
          </button>
        )}
        {onContinuarPractica && (
          <button
            type="button"
            className="primary"
            onClick={onContinuarPractica}
            style={{ padding: "10px 20px", fontWeight: "700" }}
          >
            💪 Seguir practicando este tema →
          </button>
        )}
      </div>
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
      opacity: 1,
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
      {(
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "8px" }}>
          {topics.map((item) => {
            const acceso = accesoTema(item.tema, {plan: pregunta?.plan || "full", aprobados: completedExams, rutaFlexible: bypassLocks});
            const isAllowed = acceso.habilitado;
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
                title={acceso.motivo}
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
                  color: "#e8e4f0",
                  opacity: 1,
                  textAlign: "left",
                  cursor: isAllowed ? "pointer" : "not-allowed",
                  fontSize: "0.82rem",
                  transition: "all 150ms ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", maxWidth: "70%" }}>
                  <span style={{ fontSize: "0.95rem" }}>
                    {isAllowed ? (item.materia === "lengua" ? "✍️" : "🔢") : "🔒"}
                  </span>
                  <span style={{ 
                    fontWeight: isCurrent ? "700" : "500", 
                    overflow: "hidden", 
                    textOverflow: "ellipsis", 
                    whiteSpace: "normal"
                  }}>
                    {item.tema.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                    {!isAllowed && <small style={{display:"block",fontWeight:400,color:"#a59ec9",marginTop:4}}>{acceso.motivo}</small>}
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
                    <span style={{ color: "#a59ec9" }}>{acceso.pendientes.length ? "Paso previo" : "Acceso completo"}</span>
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
