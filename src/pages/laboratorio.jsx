import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Generador didáctico de operaciones equilibradas para 11 años
function generarOperacion(modo = "division") {
  if (modo === "division") {
    // Tablas del 2 al 9 con división exacta
    const b = Math.floor(Math.random() * 8) + 2; // divisor entre 2 y 9 (ej: 4)
    const resultado = Math.floor(Math.random() * 8) + 2; // cociente entre 2 y 9 (ej: 3)
    const a = b * resultado; // dividendo exacto (ej: 12)
    return {
      a,
      b,
      op: "÷",
      tipo: "division",
      resultado,
      pistaInversa: `${b} × ¿ ? = ${a}`,
      enunciado: `¿Cuánto es ${a} dividido ${b}?`,
      preguntaBoticaria: `Tengo ${a} pociones y ${b} estantes iguales. ¿Cuántas van en cada estante?`,
    };
  }

  if (modo === "multiplicacion") {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    return {
      a,
      b,
      op: "×",
      tipo: "multiplicacion",
      resultado: a * b,
      pistaInversa: `${a} grupos de ${b}`,
      enunciado: `¿Cuánto es ${a} por ${b}?`,
      preguntaBoticaria: `Si cada frasco lleva ${b} gotas y preparo ${a} frascos, ¿cuántas gotas uso?`,
    };
  }

  if (modo === "suma_resta") {
    const esResta = Math.random() > 0.5;
    if (esResta) {
      const a = Math.floor(Math.random() * 25) + 10;
      const b = Math.floor(Math.random() * (a - 4)) + 3;
      return {
        a,
        b,
        op: "-",
        tipo: "resta",
        resultado: a - b,
        pistaInversa: `Si a ${a} le quitás ${b}...`,
        enunciado: `¿Cuánto es ${a} menos ${b}?`,
        preguntaBoticaria: `Había ${a} hojas de menta y usamos ${b}. ¿Cuántas quedan?`,
      };
    } else {
      const a = Math.floor(Math.random() * 25) + 5;
      const b = Math.floor(Math.random() * 20) + 5;
      return {
        a,
        b,
        op: "+",
        tipo: "suma",
        resultado: a + b,
        pistaInversa: `Juntar ${a} con ${b}`,
        enunciado: `¿Cuánto es ${a} más ${b}?`,
        preguntaBoticaria: `Juntamos ${a} flores de loto con ${b} flores de jazmín. ¿Total?`,
      };
    }
  }

  // Mixto: elige entre división (40%), multiplicación (30%), suma/resta (30%)
  const r = Math.random();
  if (r < 0.45) return generarOperacion("division");
  if (r < 0.75) return generarOperacion("multiplicacion");
  return generarOperacion("suma_resta");
}

export default function LaboratorioPage() {
  const router = useRouter();
  const userId = (router.query.user_id || "ABRIL").toString();

  const [modo, setModo] = useState("division"); // division | multiplicacion | suma_resta | mixto
  const [operacionActual, setOperacionActual] = useState(null);
  const [entrada, setEntrada] = useState("");
  const [feedback, setFeedback] = useState(null); // { tipo: 'exito'|'error', mensaje: string }
  const [mostrarPista, setMostrarPista] = useState(false);
  const [mostrarPizarra, setMostrarPizarra] = useState(false);
  const [pausaConcentracion, setPausaConcentracion] = useState(false);
  const [mostrarSalvoconductoModal, setMostrarSalvoconductoModal] = useState(false);

  // Progreso cargado de la API
  const [progresoLab, setProgresoLab] = useState({
    formulas_completadas: 0,
    racha_actual: 0,
    insignias: [],
    salvoconducto_ganado: false,
  });
  const [estrellasTotales, setEstrellasTotales] = useState(312);
  const [guardando, setGuardando] = useState(false);

  // Canvas para la pizarra de garabatos
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  // Cargar progreso del laboratorio
  useEffect(() => {
    if (!router.isReady) return;
    const cargar = async () => {
      try {
        const res = await fetch(`/api/laboratorio/progreso?user_id=${encodeURIComponent(userId)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.laboratorio) setProgresoLab(data.laboratorio);
          if (data.estrellas_totales) setEstrellasTotales(data.estrellas_totales);
        }
      } catch (err) {
        console.error("Error al cargar progreso del laboratorio:", err);
      }
    };
    cargar();
    nuevaOperacion("division");
  }, [router.isReady, userId]);

  // Generar nueva operación
  const nuevaOperacion = (nuevoModo = modo) => {
    const op = generarOperacion(nuevoModo);
    setOperacionActual(op);
    setEntrada("");
    setFeedback(null);
    setMostrarPista(false);
  };

  const cambiarModo = (m) => {
    setModo(m);
    nuevaOperacion(m);
  };

  // Detector amistoso de concentración (anti-calculadora / salida de pestaña)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setPausaConcentracion(true);
      }
    };
    const handleBlur = () => {
      setPausaConcentracion(true);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // Escuchar teclado físico
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (pausaConcentracion || mostrarSalvoconductoModal) return;
      if (e.key >= "0" && e.key <= "9") {
        setEntrada((prev) => (prev.length < 4 ? prev + e.key : prev));
      } else if (e.key === "Backspace") {
        setEntrada((prev) => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        handleVerificar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [entrada, operacionActual, pausaConcentracion, mostrarSalvoconductoModal]);

  // Manejo del teclado táctil en pantalla
  const handleTocarDigito = (d) => {
    if (entrada.length < 4) {
      setEntrada((prev) => prev + d);
    }
  };

  const handleBorrar = () => {
    setEntrada((prev) => prev.slice(0, -1));
  };

  // Verificación de la respuesta
  const handleVerificar = async () => {
    if (!entrada.trim() || !operacionActual || guardando) return;

    const numIngresado = parseInt(entrada.trim(), 10);
    const esCorrecto = numIngresado === operacionActual.resultado;

    if (esCorrecto) {
      setFeedback({
        tipo: "exito",
        mensaje: `¡Exacto! ${operacionActual.a} ${operacionActual.op} ${operacionActual.b} = ${operacionActual.resultado}. ¡Fórmula perfecta! 🧪✨ (+2 ⭐)`,
      });

      setGuardando(true);
      try {
        const res = await fetch("/api/laboratorio/progreso", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            acierto: true,
            con_pista: mostrarPista,
            tipo_operacion: operacionActual.tipo,
            detalle: `${operacionActual.a} ${operacionActual.op} ${operacionActual.b} = ${operacionActual.resultado}`,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setProgresoLab(data.laboratorio);
          setEstrellasTotales(data.estrellas_totales);

          if (data.nuevo_salvoconducto) {
            setMostrarSalvoconductoModal(true);
          }
        }
      } catch (err) {
        console.error("Error al registrar acierto:", err);
      } finally {
        setGuardando(false);
      }

      // Siguiente operación tras 1.4 segundos de celebración
      setTimeout(() => {
        nuevaOperacion();
      }, 1400);
    } else {
      // Error constructivo y andamiaje pedagógico
      let ayudaTexto = "";
      if (operacionActual.tipo === "division") {
        ayudaTexto = `Probemos pensar al revés: ¿Qué número multiplicado por ${operacionActual.b} da ${operacionActual.a}?`;
      } else {
        ayudaTexto = `Cerca, pero revisemos con calma. ¡Podés tocar "Ver en la mesa de boticaria" o rayar en la pizarra!`;
      }

      setFeedback({
        tipo: "error",
        mensaje: ayudaTexto,
      });
    }
  };

  // Lógica de dibujo en la pizarra (canvas)
  const startDrawing = (e) => {
    isDrawing.current = true;
    draw(e);
  };
  const stopDrawing = () => {
    isDrawing.current = false;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) ctx.beginPath();
  };
  const draw = (e) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#34d399"; // Verde esmeralda boticaria

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const limpiarPizarra = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const porcentajeMeta = Math.min(100, Math.round(((progresoLab.formulas_completadas || 0) / 40) * 100));

  return (
    <div className="laboratorio-screen" style={{ minHeight: "100vh", background: "#080c14", color: "#f8fafc", fontFamily: "'Inter', sans-serif", padding: "16px 20px" }}>
      {/* HEADER SUPERIOR */}
      <header style={{ maxWidth: "980px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img src="/avatars/maomao.png" alt="Maomao" width="46" height="46" style={{ borderRadius: "50%", border: "2px solid #10b981", boxShadow: "0 0 14px rgba(16, 185, 129, 0.4)" }} />
          <div>
            <h1 style={{ fontSize: "1.25rem", margin: 0, fontWeight: "800", color: "#f8fafc" }}>
              🧪 Laboratorio de Fórmulas <span style={{ color: "#34d399", fontSize: "0.85rem", fontWeight: "600", background: "rgba(16, 185, 129, 0.15)", padding: "2px 8px", borderRadius: "99px", border: "1px solid rgba(16, 185, 129, 0.3)" }}>Maomao</span>
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#94a3b8" }}>Entrenamiento de cálculo mental sin estrés · 4 Operaciones</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ background: "#241442", border: "1.5px solid #a855f7", color: "#ffffff", padding: "6px 14px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "6px" }}>
            ⭐ {estrellasTotales}
          </span>
          <Link href={`/tutoria?user_id=${encodeURIComponent(userId)}`} style={{ background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "#cbd5e1", padding: "6px 14px", borderRadius: "10px", fontSize: "0.85rem", fontWeight: "600", textDecoration: "none" }}>
            ← Volver a Tutoría
          </Link>
        </div>
      </header>

      {/* BARRA DEL SALVOCONDUCTO IMPERIAL AL SHOPPING */}
      <section style={{ maxWidth: "980px", margin: "20px auto 0", background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(16px)", border: "1.5px solid rgba(16, 185, 129, 0.3)", borderRadius: "16px", padding: "18px 24px", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
          <div>
            <strong style={{ fontSize: "0.98rem", color: "#fef08a", display: "flex", alignItems: "center", gap: "6px" }}>
              📜 Misión Imperial: Salvoconducto al Shopping (McDonald&apos;s + Cine + Manga)
            </strong>
            <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
              Completá 40 fórmulas resueltas para ganar el pergamino oficial acordado con mamá y papá
            </span>
          </div>
          <div style={{ fontWeight: "800", fontSize: "1rem", color: "#34d399" }}>
            {progresoLab.formulas_completadas || 0} / 40 Fórmulas ({porcentajeMeta}%)
          </div>
        </div>

        {/* Barra de llenado */}
        <div style={{ width: "100%", height: "12px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
          <div style={{ width: `${porcentajeMeta}%`, height: "100%", background: "linear-gradient(90deg, #10b981 0%, #34d399 50%, #fef08a 100%)", transition: "width 0.4s ease", borderRadius: "6px" }} />
        </div>

        {progresoLab.salvoconducto_ganado && (
          <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(254, 240, 138, 0.12)", border: "1px solid #fef08a", padding: "8px 16px", borderRadius: "10px" }}>
            <span style={{ color: "#fef08a", fontWeight: "700", fontSize: "0.88rem" }}>
              🎉 ¡Salvoconducto Imperial Ganado! Ya podés coordinar tu salida al shopping.
            </span>
            <button type="button" onClick={() => setMostrarSalvoconductoModal(true)} style={{ background: "#fef08a", color: "#713f12", border: "none", padding: "4px 12px", borderRadius: "6px", fontWeight: "800", fontSize: "0.8rem", cursor: "pointer" }}>
              Ver Pergamino 📜
            </button>
          </div>
        )}
      </section>

      {/* ESCALERA DE HITOS CADA 50 ESTRELLAS */}
      <section style={{ maxWidth: "980px", margin: "14px auto 0", background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(245, 158, 11, 0.35)", borderRadius: "14px", padding: "14px 20px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontSize: "0.88rem", fontWeight: "700", color: "#fef08a", display: "flex", alignItems: "center", gap: "6px" }}>
            ⭐ Premios cada 50 Estrellas (¡Cada fórmula resuelta te suma +2 ⭐ directas a tu cofre!)
          </span>
          <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
            Canjeables en tu Cofre de Tutoría
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "10px" }}>
          {[
            { estrellas: 50, icono: "📍🍦", titulo: "Pin Anime / Helado", desc: "A tu elección" },
            { estrellas: 100, icono: "🍔", titulo: "Salida al McDonald's", desc: "Tu combo favorito" },
            { estrellas: 150, icono: "📚", titulo: "Tomo de Manga", desc: "El que elijas" },
            { estrellas: 200, icono: "💵", titulo: "$10.000 Pesos", desc: "Dinero en efectivo" },
            { estrellas: 250, icono: "🛍️", titulo: "Salida al Shopping", desc: "Mc + Cine + Manga" }
          ].map((h) => {
            const alcanzado = estrellasTotales >= h.estrellas;
            return (
              <div
                key={h.estrellas}
                style={{
                  background: alcanzado ? "rgba(16, 185, 129, 0.12)" : "rgba(30, 41, 59, 0.45)",
                  border: alcanzado ? "1.5px solid #10b981" : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  textAlign: "center",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: "2px" }}>{h.icono}</div>
                <div style={{ fontWeight: "800", fontSize: "0.82rem", color: alcanzado ? "#34d399" : "#f1f5f9" }}>
                  {h.titulo}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{h.desc}</div>
                <div style={{ marginTop: "4px", fontSize: "0.76rem", fontWeight: "700", color: alcanzado ? "#fef08a" : "#64748b" }}>
                  {alcanzado ? `✓ Desbloqueado (${h.estrellas} ⭐)` : `${h.estrellas} ⭐`}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SELECTOR DE MODOS */}
      <section style={{ maxWidth: "980px", margin: "18px auto 0", display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { id: "division", label: "➗ División & Familia Inversa (Recomendado)", color: "#10b981" },
          { id: "multiplicacion", label: "✖️ Multiplicación", color: "#38bdf8" },
          { id: "suma_resta", label: "➕➖ Suma & Resta", color: "#a855f7" },
          { id: "mixto", label: "🎲 Desafío Mixto", color: "#f59e0b" },
        ].map((item) => {
          const activo = modo === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => cambiarModo(item.id)}
              style={{
                background: activo ? item.color : "rgba(255, 255, 255, 0.04)",
                color: activo ? (item.id === "mixto" ? "#451a03" : "#ffffff") : "#94a3b8",
                border: `1.5px solid ${activo ? item.color : "rgba(255, 255, 255, 0.1)"}`,
                padding: "8px 16px",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </section>

      {/* ÁREA CENTRAL DEL JUEGO */}
      <main style={{ maxWidth: "680px", margin: "24px auto", background: "rgba(18, 24, 38, 0.8)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "24px", padding: "28px 24px", boxShadow: "0 20px 45px rgba(0,0,0,0.6)", textAlign: "center" }}>
        {operacionActual && (
          <>
            {/* Mensaje sutil de Maomao */}
            <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "14px", padding: "12px 16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
              <span style={{ fontSize: "1.8rem" }}>💡</span>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "#cbd5e1", lineHeight: "1.4" }}>
                {operacionActual.preguntaBoticaria}
              </p>
            </div>

            {/* FÓRMULA EN GIGANTE */}
            <div style={{ margin: "24px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "clamp(2.5rem, 8vw, 3.8rem)", fontWeight: "800", color: "#f8fafc", letterSpacing: "2px" }}>
                {operacionActual.a} {operacionActual.op} {operacionActual.b} =
              </span>
              <div style={{ minWidth: "90px", height: "70px", background: "rgba(10, 15, 26, 0.9)", border: "2.5px solid #10b981", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.8rem", fontWeight: "900", color: "#34d399", boxShadow: "0 0 20px rgba(16, 185, 129, 0.35)", padding: "0 12px" }}>
                {entrada || "?"}
              </div>
            </div>

            {/* FEEDBACK PEDAGÓGICO */}
            {feedback && (
              <div style={{ marginBottom: "16px", padding: "10px 16px", borderRadius: "12px", background: feedback.tipo === "exito" ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)", border: `1.5px solid ${feedback.tipo === "exito" ? "#22c55e" : "#ef4444"}`, color: feedback.tipo === "exito" ? "#86efac" : "#fca5a5", fontSize: "0.95rem", fontWeight: "600" }}>
                {feedback.mensaje}
              </div>
            )}

            {/* BOTONES DE AYUDA (Mesa de Boticaria & Pizarra) */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setMostrarPista(!mostrarPista)}
                style={{
                  background: mostrarPista ? "rgba(16, 185, 129, 0.25)" : "rgba(255, 255, 255, 0.05)",
                  border: "1.5px solid #10b981",
                  color: "#34d399",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                {mostrarPista ? "🧪 Ocultar Mesa de Boticaria" : "🧪 Ver en la Mesa de Boticaria (Pista Visual)"}
              </button>

              <button
                type="button"
                onClick={() => setMostrarPizarra(!mostrarPizarra)}
                style={{
                  background: mostrarPizarra ? "rgba(56, 189, 248, 0.25)" : "rgba(255, 255, 255, 0.05)",
                  border: "1.5px solid #38bdf8",
                  color: "#38bdf8",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                {mostrarPizarra ? "📝 Cerrar Pizarra de Garabatos" : "📝 Abrir Pizarra para Rayar"}
              </button>
            </div>

            {/* ANDAMIAJE VISUAL (MESA DE BOTICARIA - CRA) */}
            {mostrarPista && (
              <div style={{ background: "rgba(10, 14, 24, 0.85)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "16px", padding: "18px", marginBottom: "20px", textAlign: "center" }}>
                <strong style={{ color: "#34d399", fontSize: "0.95rem", display: "block", marginBottom: "8px" }}>
                  Mesa de Trabajo: Repartiendo {operacionActual.a} ingredientes en {operacionActual.b} grupos
                </strong>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: "0 0 14px" }}>
                  Secreto de boticaria: <span style={{ color: "#fef08a", fontWeight: "700" }}>{operacionActual.pistaInversa}</span>
                </p>

                {/* Gráficos de pociones repartidas */}
                {operacionActual.tipo === "division" && (
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(operacionActual.b, 4)}, 1fr)`, gap: "10px", maxWidth: "420px", margin: "0 auto" }}>
                    {Array.from({ length: operacionActual.b }).map((_, gIdx) => (
                      <div key={gIdx} style={{ background: "rgba(16, 185, 129, 0.12)", border: "1.5px solid #10b981", borderRadius: "10px", padding: "8px 4px" }}>
                        <span style={{ fontSize: "0.72rem", color: "#34d399", fontWeight: "700", display: "block" }}>
                          Estante {gIdx + 1}
                        </span>
                        <div style={{ fontSize: "1.3rem", marginTop: "4px" }}>
                          {"🧪".repeat(operacionActual.resultado)}
                        </div>
                        <small style={{ color: "#f8fafc", fontWeight: "700", fontSize: "0.8rem" }}>
                          {operacionActual.resultado} pociones
                        </small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PIZARRA DE GARABATOS (CANVAS) */}
            {mostrarPizarra && (
              <div style={{ background: "#06090e", border: "1.5px solid #38bdf8", borderRadius: "16px", padding: "14px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ color: "#38bdf8", fontSize: "0.82rem", fontWeight: "700" }}>
                    ✏️ Pizarra libre: dibujá palitos, círculos o cuentas intermedias
                  </span>
                  <button type="button" onClick={limpiarPizarra} style={{ background: "rgba(239, 68, 68, 0.2)", border: "1px solid #ef4444", color: "#fca5a5", padding: "3px 10px", borderRadius: "6px", fontSize: "0.75rem", cursor: "pointer" }}>
                    Limpiar pizarra
                  </button>
                </div>
                <canvas
                  ref={canvasRef}
                  width={560}
                  height={160}
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseMove={draw}
                  onTouchStart={startDrawing}
                  onTouchEnd={stopDrawing}
                  onTouchMove={draw}
                  style={{ width: "100%", height: "160px", background: "#0a0e17", borderRadius: "10px", border: "1px dashed rgba(56, 189, 248, 0.4)", cursor: "crosshair", touchAction: "none" }}
                />
              </div>
            )}

            {/* TECLADO TÁCTIL EN PANTALLA (KEYPAD) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", maxWidth: "340px", margin: "0 auto" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleTocarDigito(String(num))}
                  style={{
                    height: "56px",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1.5px solid rgba(255, 255, 255, 0.15)",
                    color: "#f8fafc",
                    fontSize: "1.5rem",
                    fontWeight: "800",
                    borderRadius: "14px",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                    transition: "transform 100ms ease, background 100ms ease",
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  {num}
                </button>
              ))}

              <button
                type="button"
                onClick={handleBorrar}
                style={{
                  height: "56px",
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1.5px solid rgba(239, 68, 68, 0.4)",
                  color: "#fca5a5",
                  fontSize: "1.1rem",
                  fontWeight: "800",
                  borderRadius: "14px",
                  cursor: "pointer",
                }}
              >
                ⌫ Borrar
              </button>

              <button
                type="button"
                onClick={() => handleTocarDigito("0")}
                style={{
                  height: "56px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1.5px solid rgba(255, 255, 255, 0.15)",
                  color: "#f8fafc",
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  borderRadius: "14px",
                  cursor: "pointer",
                }}
              >
                0
              </button>

              <button
                type="button"
                onClick={handleVerificar}
                disabled={!entrada.trim() || guardando}
                style={{
                  height: "56px",
                  background: entrada.trim() ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "rgba(255, 255, 255, 0.08)",
                  border: "none",
                  color: entrada.trim() ? "#ffffff" : "#64748b",
                  fontSize: "1.05rem",
                  fontWeight: "900",
                  borderRadius: "14px",
                  cursor: entrada.trim() ? "pointer" : "not-allowed",
                  boxShadow: entrada.trim() ? "0 8px 20px rgba(16, 185, 129, 0.4)" : "none",
                }}
              >
                {guardando ? "..." : "🧪 Probar"}
              </button>
            </div>
          </>
        )}
      </main>

      {/* MODAL DE PAUSA DE CONCENTRACIÓN (ANTI-CALCULADORA AMABLE) */}
      {pausaConcentracion && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(8, 12, 20, 0.88)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "20px" }}>
          <div style={{ maxWidth: "460px", background: "#0e1626", border: "2px solid #10b981", borderRadius: "20px", padding: "30px", textAlign: "center", boxShadow: "0 25px 60px rgba(0,0,0,0.8)" }}>
            <img src="/avatars/maomao.png" alt="Maomao" width="70" height="70" style={{ borderRadius: "50%", border: "2.5px solid #10b981", boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)" }} />
            <h2 style={{ color: "#34d399", fontSize: "1.35rem", margin: "14px 0 8px" }}>
              ¡Pausa de Boticaria! 🧪
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.5", margin: "0 0 20px" }}>
              Para que tus sellos cuenten para el Salvoconducto al shopping, resolvamos las fórmulas con tu mente o tu pizarra. En el examen del Monserrat no habrá calculadoras: ¡acá entrenamos tu verdadera fuerza!
            </p>
            <button
              type="button"
              onClick={() => setPausaConcentracion(false)}
              style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#ffffff", border: "none", padding: "12px 28px", borderRadius: "12px", fontSize: "1rem", fontWeight: "800", cursor: "pointer", boxShadow: "0 8px 20px rgba(16, 185, 129, 0.4)" }}
            >
              ¡Volver a concentrarme! 🧠
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE SALVOCONDUCTO IMPERIAL GANADO */}
      {mostrarSalvoconductoModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(8, 12, 20, 0.9)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "20px" }}>
          <div style={{ maxWidth: "520px", background: "radial-gradient(circle at center, #1b2838 0%, #0b1320 100%)", border: "2.5px solid #fef08a", borderRadius: "24px", padding: "34px", textAlign: "center", boxShadow: "0 0 50px rgba(254, 240, 138, 0.35)" }}>
            <span style={{ fontSize: "3rem" }}>📜👑</span>
            <h2 style={{ color: "#fef08a", fontSize: "1.6rem", margin: "12px 0 8px", fontWeight: "900" }}>
              ¡SALVOCONDUCTO IMPERIAL CONCEDIDO!
            </h2>
            <div style={{ background: "rgba(254, 240, 138, 0.1)", border: "1px dashed #fef08a", borderRadius: "14px", padding: "16px", margin: "16px 0", textAlign: "left" }}>
              <p style={{ margin: "0 0 8px", color: "#fef08a", fontWeight: "800", fontSize: "1.05rem" }}>
                Pase Oficial a la Capital para: Abril
              </p>
              <p style={{ margin: 0, color: "#cbd5e1", fontSize: "0.92rem", lineHeight: "1.5" }}>
                Por completar con valentía y esfuerzo 40 fórmulas matemáticas en el laboratorio imperial. 
                <br /><br />
                <strong>Premio otorgado:</strong> Tarde de Shopping, Cine, McDonald&apos;s y Tomo de Manga acordado con mamá y papá.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMostrarSalvoconductoModal(false)}
              style={{ background: "#fef08a", color: "#713f12", border: "none", padding: "12px 28px", borderRadius: "12px", fontSize: "1rem", fontWeight: "900", cursor: "pointer", boxShadow: "0 8px 25px rgba(254, 240, 138, 0.4)" }}
            >
              ¡Celebrar con Maomao! 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
