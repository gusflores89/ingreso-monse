import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AVATARES = [
  {
    id: "atenea",
    nombre: "Atenea",
    descripcion: "Estratega legendaria",
    imagen: "/avatars/atenea.png",
    imagenMini: "/avatars/atenea.png",
    color: "#7F77DD",
    colorClaro: "#1e1a2e",
    estilo: "epico",
  },
  {
    id: "nyx",
    nombre: "Nyx",
    descripcion: "Guardiana nocturna",
    imagen: "/avatars/nyx.png",
    imagenMini: "/avatars/nyx.png",
    color: "#378ADD",
    colorClaro: "#0f1a2e",
    estilo: "anime",
  },
  {
    id: "lux",
    nombre: "Lux",
    descripcion: "Estrella del saber",
    imagen: "/avatars/lux.png",
    imagenMini: "/avatars/lux.png",
    color: "#1D9E75",
    colorClaro: "#0f2418",
    estilo: "k-pop",
  },
  {
    id: "buho",
    nombre: "Buho",
    descripcion: "Sabio ancestral",
    imagen: "/avatars/buho.png",
    imagenMini: "/avatars/buho.png",
    color: "#D85A30",
    colorClaro: "#1f1a0f",
    estilo: "mistico",
  },
];

export default function Login() {
  const [avatarSeleccionado, setAvatarSeleccionado] = useState(AVATARES[3]);
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = getSavedAvatar();
    if (saved) setAvatarSeleccionado(saved);
  }, []);

  const elegirAvatar = (avatar) => {
    setAvatarSeleccionado(avatar);
    saveAvatar(avatar);
  };

  const handleLogin = async () => {
    const normalizedCode = codigo.trim().toUpperCase();
    setError("");

    if (!normalizedCode || !password.trim()) {
      setError("Escribi tu codigo y la contrasena familiar.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo: normalizedCode,
          password,
          avatar: avatarSeleccionado.id,
          nombre_tutor: avatarSeleccionado.nombre,
          color_tema: avatarSeleccionado.color,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Codigo incorrecto");
        return;
      }

      saveAvatar(avatarSeleccionado);

      const params = new URLSearchParams({
        user_id: data.userId,
        avatar: avatarSeleccionado.id,
        nombre_tutor: avatarSeleccionado.nombre,
        color_tema: avatarSeleccionado.color,
      });

      router.push(`/tutoria?${params.toString()}`);
    } catch (err) {
      console.error(err);
      setError("Error de conexion");
    } finally {
      setLoading(false);
    }
  };

  const scrollToLogin = () => {
    const el = document.getElementById("login-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const input = el.querySelector("input");
      if (input) input.focus();
    }
  };

  return (
    <div className="landing-page">
      {/* NAVBAR */}
      <header className="landing-header">
        <div className="landing-logo">
          🎓 Ingreso Monserrat <span>App IA</span>
        </div>
        <div className="landing-nav-stats">
          <span>Temas de examen: <strong>37 Completos</strong></span>
          <span>Materias: <strong>Matemática + Lengua</strong></span>
          <button type="button" className="landing-btn-login" onClick={scrollToLogin}>
            Iniciar Sesión
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="landing-hero" aria-label="Introducción a la plataforma">
          <div className="landing-hero-content">
            <div className="landing-hero-badges">
              <span className="landing-badge-pill highlight">Ingreso al Monserrat</span>
              <span className="landing-badge-pill">Primaria a Secundario</span>
              <span className="landing-badge-pill">Colegio Monserrat</span>
            </div>
            <h1>
              Preparate para el examen con tu propio <span>Tutor de IA</span>
            </h1>
            <p className="subtitle">
              El método interactivo de práctica diaria diseñado para pre-adolescentes (10-12 años). Aprendé Matemática y Lengua jugando con explicaciones personalizadas y simulacros reales.
            </p>
            <div className="landing-hero-cta">
              <button type="button" className="landing-btn-primary" onClick={scrollToLogin}>
                Empezar a Practicar
              </button>
              <a href="#como-funciona" className="landing-btn-secondary" style={{ textDecoration: "none", textAlign: "center" }}>
                Ver cómo funciona
              </a>
            </div>
          </div>

          {/* INTEGRATED PORTAL LOGIN */}
          <div className="landing-hero-portal" id="login-section">
            <section className="avatar-login-shell" aria-labelledby="portal-title" style={{ width: "100%", margin: 0, padding: 0 }}>
              <div className="avatar-hero" style={{ padding: "0 0 16px 0" }}>
                <div
                  className="avatar-main"
                  style={{
                    borderColor: avatarSeleccionado.color,
                    backgroundColor: avatarSeleccionado.colorClaro,
                    width: "72px",
                    height: "72px",
                  }}
                >
                  <img
                    src={avatarSeleccionado.imagen}
                    alt={avatarSeleccionado.nombre}
                    width="72"
                    height="72"
                    onError={(e) => {
                      if (e.target.src.endsWith(".png")) {
                        e.target.src = e.target.src.replace(".png", ".svg");
                      }
                    }}
                  />
                </div>
                <h2 id="portal-title" style={{ color: avatarSeleccionado.color, fontSize: "1.6rem", margin: "8px 0 0" }}>
                  {avatarSeleccionado.nombre}
                </h2>
                <p style={{ margin: "2px 0 0" }}>{avatarSeleccionado.descripcion}</p>
              </div>

              <div className="avatar-login-card" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
                <p className="avatar-picker-label" style={{ fontSize: "0.85rem", marginBottom: "8px" }}>Elegí tu guía</p>
                <div className="avatar-picker-grid" style={{ gap: "8px", marginBottom: "16px" }}>
                  {AVATARES.map((avatar) => {
                    const selected = avatarSeleccionado.id === avatar.id;
                    return (
                      <button
                        type="button"
                        key={avatar.id}
                        className="avatar-option"
                        onClick={() => elegirAvatar(avatar)}
                        style={{
                          backgroundColor: selected ? avatar.colorClaro : "transparent",
                          borderColor: selected ? avatar.color : "transparent",
                          color: selected ? avatar.color : "#64748B",
                          padding: "6px",
                          borderRadius: "8px",
                        }}
                        aria-pressed={selected}
                        title={avatar.descripcion}
                      >
                        <span style={{ backgroundColor: avatar.colorClaro, width: "32px", height: "32px" }}>
                          <img
                            src={avatar.imagenMini}
                            alt=""
                            width="32"
                            height="32"
                            aria-hidden="true"
                            onError={(e) => {
                              if (e.target.src.endsWith(".png")) {
                                e.target.src = e.target.src.replace(".png", ".svg");
                              }
                            }}
                          />
                        </span>
                        <strong style={{ fontSize: "0.8rem", marginTop: "4px" }}>{avatar.nombre}</strong>
                      </button>
                    );
                  })}
                </div>

                <label className="avatar-login-field" style={{ gap: "4px", marginBottom: "12px" }}>
                  Tu código de alumno
                  <input
                    type="text"
                    value={codigo}
                    onChange={(event) => setCodigo(event.target.value.toUpperCase())}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") handleLogin();
                    }}
                    placeholder="Escribí tu código..."
                    maxLength={12}
                    style={{ padding: "10px", fontSize: "0.95rem" }}
                  />
                </label>

                <label className="avatar-login-field" style={{ gap: "4px", marginBottom: "16px" }}>
                  Contraseña familiar
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") handleLogin();
                    }}
                    placeholder="Contraseña..."
                    style={{ padding: "10px", fontSize: "0.95rem" }}
                  />
                </label>

                {error && <p className="error avatar-login-error" style={{ fontSize: "0.85rem", margin: "0 0 12px 0" }}>{error}</p>}

                <button
                  type="button"
                  className="avatar-login-submit"
                  onClick={handleLogin}
                  disabled={!codigo.trim() || !password.trim() || loading}
                  style={{ backgroundColor: loading ? "#CBD5E1" : avatarSeleccionado.color, padding: "12px", fontSize: "0.95rem" }}
                >
                  {loading ? "Entrando..." : "Entrar a practicar"}
                </button>

                <div className="avatar-signup" style={{ marginTop: "14px" }}>
                  <p style={{ fontSize: "0.85rem" }}>¿No tenés código?</p>
                  <a href="/setup" style={{ color: avatarSeleccionado.color, fontSize: "0.85rem" }}>
                    Registrate con un adulto
                  </a>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="landing-features" id="como-funciona" aria-label="Características de la plataforma">
          <div className="landing-section-title">
            <h2>¿Cómo te ayudamos a ingresar?</h2>
            <p>Un método digital de vanguardia que simplifica el estudio y mantiene motivados a los chicos.</p>
          </div>

          <div className="landing-features-grid">
            <article className="landing-feature-card">
              <div className="landing-feature-icon" aria-hidden="true">🤖</div>
              <h3>Tutores con IA 24/7</h3>
              <p>Cuatro guías interactivos adaptados al estilo de aprendizaje de tu hijo. Explican paso a paso con paciencia infinita, resolviendo dudas teóricas en segundos.</p>
            </article>

            <article className="landing-feature-card">
              <div className="landing-feature-icon" aria-hidden="true">📝</div>
              <h3>Práctica real y Exámenes</h3>
              <p>Más de 37 temas del currículum escolar (Matemática y Lengua) adaptados a las exigencias y formato real del examen de ingreso del Colegio Monserrat.</p>
            </article>

            <article className="landing-feature-card">
              <div className="landing-feature-icon" aria-hidden="true">📊</div>
              <h3>Seguimiento para Padres</h3>
              <p>Olvidate de adivinar cómo va. Accedé a un panel familiar con tasas de acierto, estadísticas de racha, sugerencias de práctica y reportes redactados por IA.</p>
            </article>
          </div>
        </section>

        {/* MOCKUPS SHOWCASE */}
        <section className="landing-mockups-section" aria-label="Capturas de pantalla del producto">
          {/* MOCKUP 1: ESTUDIANTE */}
          <div className="landing-mockup-block">
            <div className="landing-mockup-info">
              <h3>Una consola de estudio diseñada para mantenerlos enfocados</h3>
              <p>
                Los alumnos acceden a una interfaz limpia, sin distracciones de redes sociales ni videos, adaptada a su modo preferido y con sus propios tutores gamer.
              </p>
              <div className="landing-mockup-bullets">
                <div className="landing-mockup-bullet">
                  <span>✓</span> Explicaciones dosificadas paso a paso para no abrumar al estudiante.
                </div>
                <div className="landing-mockup-bullet">
                  <span>✓</span> Gráficos matemáticos interactivos (fracciones, geometría, áreas y secuencias).
                </div>
                <div className="landing-mockup-bullet">
                  <span>✓</span> Retroalimentación motivacional instantánea con consejos prácticos.
                </div>
              </div>
            </div>

            <div className="landing-mockup-viewport" aria-hidden="true">
              <div className="landing-mockup-header">
                <span className="landing-mockup-dot" />
                <span className="landing-mockup-dot" />
                <span className="landing-mockup-dot" />
                <span className="landing-mockup-title">Consola del Estudiante — Nyx</span>
              </div>
              <div className="landing-mockup-body" style={{ background: "#0f0d13" }}>
                <div className="tutor-chip" style={{ background: "rgba(26,23,37,0.85)", padding: "10px 14px", border: "1px solid #2a2636", borderRadius: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <img
                    src="/avatars/nyx.png"
                    alt=""
                    width="32"
                    height="32"
                    style={{ borderRadius: "50%" }}
                    onError={(e) => {
                      if (e.target.src.endsWith(".png")) {
                        e.target.src = e.target.src.replace(".png", ".svg");
                      }
                    }}
                  />
                  <div>
                    <strong style={{ color: "#378ADD", fontSize: "0.85rem" }}>Nyx</strong>
                    <span style={{ fontSize: "0.75rem", color: "#9590a6", display: "block" }}>Tu tutor/a</span>
                  </div>
                </div>
                
                <div className="lesson-step-card" style={{ background: "#1a1725", border: "1px solid #2a2636", padding: "16px", borderRadius: "12px", boxShadow: "0 0 12px rgba(139,92,246,0.1)" }}>
                  <p style={{ color: "#b0adc0", fontSize: "0.75rem", margin: "0 0 4px 0" }}>GEOMETRÍA Y ÁREAS</p>
                  <p style={{ color: "#e8e4f0", fontSize: "0.9rem", fontWeight: "600", margin: "0 0 12px 0", lineHeight: "1.4" }}>
                    "Calcular la superficie de un triángulo isósceles inscrito en un círculo de radio 6 cm, sabiendo que su base coincide con el diámetro del círculo."
                  </p>
                  
                  <div className="lesson-answer" style={{ background: "#0f2418", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "8px", padding: "10px", display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ color: "#22c55e", fontWeight: "bold" }}>✓</span>
                    <div>
                      <small style={{ color: "#86efac", fontSize: "0.7rem", display: "block" }}>Respuesta Correcta</small>
                      <strong style={{ color: "#ffffff", fontSize: "0.85rem" }}>36 cm² (Base = 12 cm, Altura = 6 cm. Área = 12 * 6 / 2 = 36 cm²)</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MOCKUP 2: PAPAS */}
          <div className="landing-mockup-block reverse">
            <div className="landing-mockup-info">
              <h3>El control de progreso que te da tranquilidad total</h3>
              <p>
                El panel para padres te muestra el estado real del alumno sin rodeos. Identifica de un vistazo qué temas ya domina y qué oportunidades de mejora sugiere la IA.
              </p>
              <div className="landing-mockup-bullets">
                <div className="landing-mockup-bullet">
                  <span>✓</span> Grilla horizontal prolija de temas con porcentajes de acierto en vivo.
                </div>
                <div className="landing-mockup-bullet">
                  <span>✓</span> Estado explícito de cada tema: *"Listo para examen"* o *"En práctica"*.
                </div>
                <div className="landing-mockup-bullet">
                  <span>✓</span> Acciones sugeridas personalizadas escritas de forma comprensible.
                </div>
              </div>
            </div>

            <div className="landing-mockup-viewport" aria-hidden="true">
              <div className="landing-mockup-header">
                <span className="landing-mockup-dot" />
                <span className="landing-mockup-dot" />
                <span className="landing-mockup-dot" />
                <span className="landing-mockup-title">Dashboard Familiar — Papás</span>
              </div>
              <div className="landing-mockup-body" style={{ background: "#f8f7fc", color: "#1e1b2e", padding: "16px" }}>
                <div style={{ background: "#ffffff", border: "1px solid #e5e4ea", borderRadius: "12px", padding: "14px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", borderBottom: "1px solid #e5e4ea", paddingBottom: "6px" }}>
                    <span style={{ fontSize: "0.7rem", textTransform: "uppercase", background: "#f5f3ff", color: "#8b5cf6", padding: "2px 6px", borderRadius: "4px", fontWeight: "600" }}>MATEMÁTICA</span>
                    <span style={{ fontSize: "0.7rem", background: "#dcfce7", color: "#15803d", padding: "2px 6px", borderRadius: "4px", fontWeight: "600" }}>Listo examen</span>
                  </div>
                  <strong style={{ fontSize: "0.9rem", color: "#1e1b2e", display: "block" }}>Áreas de Figuras Compuestas</strong>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "8px 0" }}>
                    <div style={{ background: "#e5e4ea", height: "6px", flex: 1, borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ background: "#22c55e", height: "100%", width: "86%" }} />
                    </div>
                    <strong style={{ fontSize: "0.85rem", color: "#1e1b2e" }}>86%</strong>
                  </div>
                  <p style={{ fontSize: "0.72rem", color: "#6b7280", margin: "0", lineHeight: "1.4" }}>
                    "Listo para resolver áreas complejas y perímetros de figuras compuestas en examen final."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AUDIENCE & DISCLAIMER */}
        <section className="landing-audience" aria-label="A quiénes está dirigido">
          <div className="landing-audience-content">
            <h2>Especialmente diseñado para el ingreso</h2>
            <p>
              Preparamos estudiantes que están cursando <strong>4to, 5to y 6to grado</strong> para que lleguen al examen de ingreso del Colegio Nacional de Monserrat con máxima confianza y solidez conceptual. Transformamos horas de frustración en un hábito motivador.
            </p>

            {/* HONEST DISCLAIMER */}
            <div className="landing-disclaimer-card" role="note">
              <span className="landing-disclaimer-icon" aria-hidden="true">💡</span>
              <div className="landing-disclaimer-info">
                <h4>Aviso de Acompañamiento Escolar</h4>
                <p>
                  Esta plataforma web interactiva y sus tutores con Inteligencia Artificial han sido creados como una potente herramienta de refuerzo, práctica y consolidación autónoma del currículum. <strong>No sustituyen</strong> las clases de apoyo presenciales oficiales, la preparación dictada por el Colegio Monserrat ni la valiosa guía de un profesor particular presencial. Representamos una herramienta de apoyo digital de vanguardia para potenciar el estudio diario del alumno en casa.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="landing-footer-brand">
          🎓 Ingreso Monserrat — Plataforma de Preparación Digital
        </div>
        <p className="landing-footer-copy">
          © {new Date().getFullYear()} ingresomonserrat.online. Todos los derechos reservados.
        </p>
        <p style={{ fontSize: "0.75rem", color: "#4b5563", margin: 0 }}>
          Este proyecto es una plataforma independiente de acompañamiento interactivo y no tiene vinculación formal ni representa una vía oficial de inscripción o examen del Colegio Nacional de Monserrat.
        </p>
      </footer>
    </div>
  );
}

function getSavedAvatar() {
  if (typeof window === "undefined") return null;

  try {
    const saved = JSON.parse(window.localStorage.getItem("tutor_avatar") || "null");
    return AVATARES.find((avatar) => avatar.id === saved?.id) || null;
  } catch {
    return null;
  }
}

function saveAvatar(avatar) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    "tutor_avatar",
    JSON.stringify({
      id: avatar.id,
      nombre: avatar.nombre,
      color: avatar.color,
    })
  );
}
