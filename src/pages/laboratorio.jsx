import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Generador didáctico de operaciones equilibradas y desafiantes para 11 años
function generarOperacion(modo = "mixto") {
  let modoEfectivo = modo;
  if (modo === "mixto") {
    // 50% división, 35% multiplicación, 15% suma/resta desafiante
    const r = Math.random();
    if (r < 0.50) modoEfectivo = "division";
    else if (r < 0.85) modoEfectivo = "multiplicacion";
    else modoEfectivo = "suma_resta";
  }

  if (modoEfectivo === "division") {
    const combinacionesDivision = [
      { a: 12, b: 4, r: 3 },
      { a: 12, b: 3, r: 4 },
      { a: 14, b: 2, r: 7 },
      { a: 16, b: 4, r: 4 },
      { a: 18, b: 3, r: 6 },
      { a: 18, b: 6, r: 3 },
      { a: 21, b: 3, r: 7 },
      { a: 21, b: 7, r: 3 },
      { a: 24, b: 4, r: 6 },
      { a: 24, b: 6, r: 4 },
      { a: 24, b: 8, r: 3 },
      { a: 27, b: 9, r: 3 },
      { a: 28, b: 4, r: 7 },
      { a: 28, b: 7, r: 4 },
      { a: 32, b: 4, r: 8 },
      { a: 32, b: 8, r: 4 },
      { a: 35, b: 7, r: 5 },
      { a: 35, b: 5, r: 7 },
      { a: 36, b: 6, r: 6 },
      { a: 36, b: 9, r: 4 },
      { a: 36, b: 4, r: 9 },
      { a: 40, b: 8, r: 5 },
      { a: 42, b: 6, r: 7 },
      { a: 42, b: 7, r: 6 },
      { a: 45, b: 9, r: 5 },
      { a: 48, b: 6, r: 8 },
      { a: 48, b: 8, r: 6 },
      { a: 54, b: 9, r: 6 },
      { a: 54, b: 6, r: 9 },
      { a: 56, b: 7, r: 8 },
      { a: 56, b: 8, r: 7 },
      { a: 63, b: 7, r: 9 },
      { a: 63, b: 9, r: 7 },
      { a: 64, b: 8, r: 8 },
      { a: 72, b: 8, r: 9 },
      { a: 72, b: 9, r: 8 },
      { a: 81, b: 9, r: 9 },
      { a: 48, b: 4, r: 12 },
      { a: 72, b: 6, r: 12 },
      { a: 84, b: 7, r: 12 },
      { a: 96, b: 8, r: 12 },
    ];
    const elegida = combinacionesDivision[Math.floor(Math.random() * combinacionesDivision.length)];
    return {
      a: elegida.a,
      b: elegida.b,
      op: "÷",
      tipo: "division",
      resultado: elegida.r,
      pistaInversa: `${elegida.b} × ¿ ? = ${elegida.a}`,
      enunciado: `¿Cuánto es ${elegida.a} dividido ${elegida.b}?`,
      preguntaBoticaria: `Tengo ${elegida.a} pociones y ${elegida.b} estantes iguales. ¿Cuántas van en cada estante?`,
    };
  }

  if (modoEfectivo === "multiplicacion") {
    const combinacionesMult = [
      { a: 3, b: 7, r: 21 },
      { a: 4, b: 6, r: 24 },
      { a: 4, b: 7, r: 28 },
      { a: 4, b: 8, r: 32 },
      { a: 4, b: 9, r: 36 },
      { a: 6, b: 6, r: 36 },
      { a: 6, b: 7, r: 42 },
      { a: 6, b: 8, r: 48 },
      { a: 6, b: 9, r: 54 },
      { a: 7, b: 7, r: 49 },
      { a: 7, b: 8, r: 56 },
      { a: 7, b: 9, r: 63 },
      { a: 8, b: 8, r: 64 },
      { a: 8, b: 9, r: 72 },
      { a: 9, b: 9, r: 81 },
      { a: 12, b: 4, r: 48 },
      { a: 12, b: 5, r: 60 },
      { a: 11, b: 6, r: 66 },
      { a: 12, b: 7, r: 84 },
      { a: 14, b: 3, r: 42 },
      { a: 15, b: 4, r: 60 },
    ];
    const base = combinacionesMult[Math.floor(Math.random() * combinacionesMult.length)];
    const invertir = Math.random() > 0.5;
    const a = invertir ? base.b : base.a;
    const b = invertir ? base.a : base.b;
    return {
      a,
      b,
      op: "×",
      tipo: "multiplicacion",
      resultado: base.r,
      pistaInversa: `${a} grupos de ${b}`,
      enunciado: `¿Cuánto es ${a} por ${b}?`,
      preguntaBoticaria: `Si cada frasco lleva ${b} gotas y preparo ${a} frascos, ¿cuántas gotas uso?`,
    };
  }

  // Suma o Resta desafiante de 2 cifras con llevada mental
  const esResta = Math.random() > 0.5;
  if (esResta) {
    const restasDesafiantes = [
      { a: 63, b: 27, r: 36 },
      { a: 72, b: 35, r: 37 },
      { a: 81, b: 46, r: 35 },
      { a: 94, b: 38, r: 56 },
      { a: 85, b: 47, r: 38 },
      { a: 73, b: 28, r: 45 },
      { a: 64, b: 37, r: 27 },
      { a: 100, b: 34, r: 66 },
      { a: 100, b: 47, r: 53 },
      { a: 91, b: 54, r: 37 },
      { a: 52, b: 26, r: 26 },
      { a: 83, b: 49, r: 34 },
    ];
    const rElegida = restasDesafiantes[Math.floor(Math.random() * restasDesafiantes.length)];
    return {
      a: rElegida.a,
      b: rElegida.b,
      op: "-",
      tipo: "resta",
      resultado: rElegida.r,
      pistaInversa: `Pensá cuánto le falta a ${rElegida.b} para llegar a ${rElegida.a}`,
      enunciado: `¿Cuánto es ${rElegida.a} menos ${rElegida.b}?`,
      preguntaBoticaria: `Teníamos ${rElegida.a} gramos de polvo de hierbas y usamos ${rElegida.b}. ¿Cuántos gramos quedan?`,
    };
  } else {
    const sumasDesafiantes = [
      { a: 38, b: 47, r: 85 },
      { a: 46, b: 37, r: 83 },
      { a: 58, b: 25, r: 83 },
      { a: 67, b: 28, r: 95 },
      { a: 49, b: 36, r: 85 },
      { a: 54, b: 38, r: 92 },
      { a: 37, b: 48, r: 85 },
      { a: 65, b: 27, r: 92 },
      { a: 48, b: 39, r: 87 },
      { a: 57, b: 36, r: 93 },
      { a: 29, b: 64, r: 93 },
      { a: 45, b: 48, r: 93 },
    ];
    const sElegida = sumasDesafiantes[Math.floor(Math.random() * sumasDesafiantes.length)];
    return {
      a: sElegida.a,
      b: sElegida.b,
      op: "+",
      tipo: "suma",
      resultado: sElegida.r,
      pistaInversa: `Sumá decenas (${Math.floor(sElegida.a / 10) * 10} + ${Math.floor(sElegida.b / 10) * 10}) y luego sumá las unidades`,
      enunciado: `¿Cuánto es ${sElegida.a} más ${sElegida.b}?`,
      preguntaBoticaria: `Juntamos ${sElegida.a} hojas secas con ${sElegida.b} flores medicinales. ¿Total?`,
    };
  }
}

export default function LaboratorioPage() {
  const router = useRouter();
  const userId = (typeof router.query.user_id === "string" ? router.query.user_id : "").trim();

  // El modo por defecto es "mixto" (Desafío Imperial con 50% división y 35% multiplicación)
  const [modo, setModo] = useState("mixto"); // mixto | division | multiplicacion | suma_resta
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
    por_tipo: {
      division: 0,
      multiplicacion: 0,
      suma_resta: 0,
    },
    racha_actual: 0,
    insignias: [],
    salvoconducto_ganado: false,
  });
  const [estrellasTotales, setEstrellasTotales] = useState(0);
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Canvas para la pizarra de garabatos
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  // Cargar progreso del laboratorio
  useEffect(() => {
    if (!router.isReady || !userId) return;
    const cargar = async () => {
      try {
        const res = await fetch(`/api/laboratorio/progreso?user_id=${encodeURIComponent(userId)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.laboratorio) setProgresoLab(data.laboratorio);
          if (data.estrellas_totales) setEstrellasTotales(data.estrellas_totales);
          if (data.nombre) setNombreEstudiante(data.nombre);
        }
      } catch (err) {
        console.error("Error al cargar progreso del laboratorio:", err);
      }
    };
    cargar();
    nuevaOperacion("mixto");
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
      const tipoOp = operacionActual.tipo;
      const sumaCupoAlcanzado = (tipoOp === "suma" || tipoOp === "resta") && (progresoLab.por_tipo?.suma_resta || 0) >= 10;

      let mensajeExito = `¡Exacto! ${operacionActual.a} ${operacionActual.op} ${operacionActual.b} = ${operacionActual.resultado}. ¡Fórmula perfecta! 🧪✨ (+2 ⭐)`;
      if (sumaCupoAlcanzado) {
        mensajeExito += ` (Nota: Ya completaste el cupo de sumas/restas para el shopping. ¡Pasá a división o multiplicación para avanzar el Salvoconducto!)`;
      }

      setFeedback({
        tipo: "exito",
        mensaje: mensajeExito,
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
            tipo_operacion: tipoOp,
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

      setTimeout(() => {
        nuevaOperacion();
      }, 1400);
    } else {
      let ayudaTexto = "";
      if (operacionActual.tipo === "division") {
        ayudaTexto = `Probemos pensar al revés: ¿Qué número multiplicado por ${operacionActual.b} da ${operacionActual.a}?`;
      } else if (operacionActual.tipo === "multiplicacion") {
        ayudaTexto = `Pensalo como ${operacionActual.a} grupos de ${operacionActual.b}. ¡Podés abrir la mesa de boticaria o la pizarra para comprobarlo!`;
      } else {
        ayudaTexto = `Cerca, pero revisemos el cálculo. Podés rayar en la pizarra para no perder la llevada.`;
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
    ctx.strokeStyle = "#34d399";

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

  // Balance del Salvoconducto Imperial
  const porTipo = progresoLab.por_tipo || { division: 0, multiplicacion: 0, suma_resta: 0 };
  const divCount = porTipo.division || 0;
  const multCount = porTipo.multiplicacion || 0;
  const sumaCount = porTipo.suma_resta || 0;

  // Requisitos: mínimo 15 divisiones, mínimo 15 multiplicaciones, hasta 10 sumas/restas
  const sumaValida = Math.min(sumaCount, 10);
  const puntosValidosSalvoconducto = divCount + multCount + sumaValida;
  const porcentajeMeta = Math.min(100, Math.round((Math.min(puntosValidosSalvoconducto, 40) / 40) * 100));

  if (!router.isReady) {
    return (
      <main className="login-screen">
        <p className="status">Cargando...</p>
      </main>
    );
  }

  if (!userId) {
    return (
      <main className="login-screen">
        <section className="login-card login-card-standalone">
          <h1>Entrá desde tu sesión</h1>
          <p className="login-help">El laboratorio usa la cuenta con la que estás practicando.</p>
          <a className="primary link-button" href="/">Ir al inicio</a>
        </section>
      </main>
    );
  }

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "8px" }}>
          <div>
            <strong style={{ fontSize: "1rem", color: "#fef08a", display: "flex", alignItems: "center", gap: "6px" }}>
              📜 Misión Imperial: Salvoconducto al Shopping (McDonald&apos;s + Cine + Manga)
            </strong>
            <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
              Requisito equilibrado: mínimo 15 divisiones, 15 multiplicaciones y hasta 10 sumas/restas
            </span>
          </div>
          <div style={{ fontWeight: "800", fontSize: "1rem", color: "#34d399" }}>
            {Math.min(puntosValidosSalvoconducto, 40)} / 40 Fórmulas ({porcentajeMeta}%)
          </div>
        </div>

        {/* Barra de progreso global */}
        <div style={{ width: "100%", height: "12px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
          <div style={{ width: `${porcentajeMeta}%`, height: "100%", background: "linear-gradient(90deg, #10b981 0%, #34d399 50%, #fef08a 100%)", transition: "width 0.4s ease", borderRadius: "6px" }} />
        </div>

        {/* Medidores de balance pedagógico por tipo */}
        <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "160px", background: divCount >= 15 ? "rgba(16, 185, 129, 0.15)" : "rgba(30, 41, 59, 0.5)", border: divCount >= 15 ? "1px solid #10b981" : "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "10px", padding: "6px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.82rem", color: divCount >= 15 ? "#34d399" : "#cbd5e1" }}>
              ➗ División: <strong>{divCount} / 15</strong>
            </span>
            <span style={{ fontSize: "0.75rem", fontWeight: "800", color: divCount >= 15 ? "#34d399" : "#94a3b8" }}>
              {divCount >= 15 ? "✓ Listo" : `Faltan ${15 - divCount}`}
            </span>
          </div>

          <div style={{ flex: 1, minWidth: "160px", background: multCount >= 15 ? "rgba(56, 189, 248, 0.15)" : "rgba(30, 41, 59, 0.5)", border: multCount >= 15 ? "1px solid #38bdf8" : "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "10px", padding: "6px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.82rem", color: multCount >= 15 ? "#38bdf8" : "#cbd5e1" }}>
              ✖️ Multiplicación: <strong>{multCount} / 15</strong>
            </span>
            <span style={{ fontSize: "0.75rem", fontWeight: "800", color: multCount >= 15 ? "#38bdf8" : "#94a3b8" }}>
              {multCount >= 15 ? "✓ Listo" : `Faltan ${15 - multCount}`}
            </span>
          </div>

          <div style={{ flex: 1, minWidth: "160px", background: sumaCount >= 10 ? "rgba(168, 85, 247, 0.15)" : "rgba(30, 41, 59, 0.5)", border: sumaCount >= 10 ? "1px solid #a855f7" : "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "10px", padding: "6px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.82rem", color: sumaCount >= 10 ? "#c084fc" : "#cbd5e1" }}>
              ➕➖ Suma & Resta: <strong>{sumaValida} / 10</strong>
            </span>
            <span style={{ fontSize: "0.75rem", fontWeight: "800", color: sumaCount >= 10 ? "#c084fc" : "#94a3b8" }}>
              {sumaCount >= 10 ? "✓ Cupo max." : `${10 - sumaCount} para cupo`}
            </span>
          </div>
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
            { estrellas: 250, icono: "🛍️", titulo: "Salida al Shopping", desc: "Mc + Cine + Manga" },
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
                  transition: "all 0.2s ease",
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
          { id: "mixto", label: "🎲 Desafío Imperial Equilibrado (Recomendado)", color: "#f59e0b" },
          { id: "division", label: "➗ Especialista en División", color: "#10b981" },
          { id: "multiplicacion", label: "✖️ Especialista en Multiplicación", color: "#38bdf8" },
          { id: "suma_resta", label: "➕➖ Suma & Resta Desafiante", color: "#a855f7" },
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

      {/* AVISO DE CUPO DE SUMAS/RESTAS */}
      {modo === "suma_resta" && sumaCount >= 10 && (
        <div style={{ maxWidth: "680px", margin: "10px auto 0", background: "rgba(168, 85, 247, 0.12)", border: "1px solid #a855f7", borderRadius: "10px", padding: "8px 14px", textAlign: "center", fontSize: "0.82rem", color: "#e9d5ff" }}>
          💡 Ya alcanzaste el cupo de sumas y restas (10/10) para el shopping. Las que resuelvas acá te seguirán sumando <strong>+2 ⭐</strong>, pero para el Salvoconducto Imperial pasá al <strong>Desafío Equilibrado, División o Multiplicación</strong>.
        </div>
      )}

      {/* ÁREA CENTRAL DEL JUEGO */}
      <main style={{ maxWidth: "680px", margin: "20px auto", background: "rgba(18, 24, 38, 0.8)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "24px", padding: "28px 24px", boxShadow: "0 20px 45px rgba(0,0,0,0.6)", textAlign: "center" }}>
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

              {/* Casillero de respuesta con cursor */}
              <div
                style={{
                  minWidth: "110px",
                  height: "76px",
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "2.5px solid #10b981",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                  fontWeight: "900",
                  color: "#34d399",
                  padding: "0 16px",
                  boxShadow: "0 0 25px rgba(16, 185, 129, 0.3)",
                }}
              >
                {entrada || <span style={{ opacity: 0.35, fontSize: "2rem" }}>¿?</span>}
              </div>
            </div>

            {/* Feedback animado */}
            {feedback && (
              <div
                style={{
                  padding: "12px 18px",
                  borderRadius: "12px",
                  margin: "16px 0",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  background: feedback.tipo === "exito" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                  border: feedback.tipo === "exito" ? "1.5px solid #10b981" : "1.5px solid #ef4444",
                  color: feedback.tipo === "exito" ? "#34d399" : "#fca5a5",
                }}
              >
                {feedback.mensaje}
              </div>
            )}

            {/* Botones de apoyo: Pista / Mesa de boticaria y Pizarra */}
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
                  Mesa de Trabajo: {operacionActual.enunciado}
                </strong>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: "0 0 14px" }}>
                  Secreto de boticaria: <span style={{ color: "#fef08a", fontWeight: "700" }}>{operacionActual.pistaInversa}</span>
                </p>

                {/* Gráficos de división: pociones en estantes */}
                {operacionActual.tipo === "division" && (
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(operacionActual.b, 4)}, 1fr)`, gap: "10px", maxWidth: "420px", margin: "0 auto" }}>
                    {Array.from({ length: operacionActual.b }).map((_, gIdx) => (
                      <div key={gIdx} style={{ background: "rgba(16, 185, 129, 0.12)", border: "1.5px solid #10b981", borderRadius: "10px", padding: "8px 4px" }}>
                        <span style={{ fontSize: "0.72rem", color: "#34d399", fontWeight: "700", display: "block" }}>
                          Estante {gIdx + 1}
                        </span>
                        <div style={{ fontSize: "1.1rem", marginTop: "4px" }}>
                          {"🧪".repeat(Math.min(operacionActual.resultado, 6))}
                          {operacionActual.resultado > 6 && <span style={{ fontSize: "0.8rem", color: "#fef08a" }}> +{operacionActual.resultado - 6}</span>}
                        </div>
                        <small style={{ color: "#f8fafc", fontWeight: "700", fontSize: "0.8rem" }}>
                          {operacionActual.resultado} pociones
                        </small>
                      </div>
                    ))}
                  </div>
                )}

                {/* Gráficos de multiplicación: frascos con gotas */}
                {operacionActual.tipo === "multiplicacion" && (
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(operacionActual.a, 4)}, 1fr)`, gap: "10px", maxWidth: "420px", margin: "0 auto" }}>
                    {Array.from({ length: operacionActual.a }).map((_, gIdx) => (
                      <div key={gIdx} style={{ background: "rgba(56, 189, 248, 0.12)", border: "1.5px solid #38bdf8", borderRadius: "10px", padding: "8px 4px" }}>
                        <span style={{ fontSize: "0.72rem", color: "#38bdf8", fontWeight: "700", display: "block" }}>
                          Frasco {gIdx + 1}
                        </span>
                        <div style={{ fontSize: "1.1rem", marginTop: "4px" }}>
                          {"💧".repeat(Math.min(operacionActual.b, 6))}
                          {operacionActual.b > 6 && <span style={{ fontSize: "0.8rem", color: "#fef08a" }}> +{operacionActual.b - 6}</span>}
                        </div>
                        <small style={{ color: "#f8fafc", fontWeight: "700", fontSize: "0.8rem" }}>
                          {operacionActual.b} gotas
                        </small>
                      </div>
                    ))}
                  </div>
                )}

                {/* Apoyo para Suma / Resta */}
                {(operacionActual.tipo === "suma" || operacionActual.tipo === "resta") && (
                  <div style={{ background: "rgba(168, 85, 247, 0.12)", border: "1.5px solid #a855f7", borderRadius: "10px", padding: "10px 14px", maxWidth: "440px", margin: "0 auto" }}>
                    <p style={{ margin: 0, color: "#e2e8f0", fontSize: "0.9rem" }}>
                      💡 <strong style={{ color: "#fef08a" }}>Estrategia mental:</strong> {operacionActual.pistaInversa}
                    </p>
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
                ⌫
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
                Pase oficial para: {nombreEstudiante || "el estudiante"}
              </p>
              <p style={{ margin: 0, color: "#cbd5e1", fontSize: "0.92rem", lineHeight: "1.5" }}>
                Por completar con maestría y variedad el desafío de 40 fórmulas (divisiones, multiplicaciones y cálculo mental) en el laboratorio imperial.
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
