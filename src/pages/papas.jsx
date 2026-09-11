import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DashboardPapas from "@/components/DashboardPapas";

export default function PapasPage() {
  const router = useRouter();
  const queryUserId = typeof router.query.user_id === "string" ? router.query.user_id : "";
  const [userId, setUserId] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (router.isReady && router.query.pago === "exitoso") {
      setShowSuccessModal(true);
    }
  }, [router.isReady, router.query.pago]);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    if (queryUserId) {
      router.replace(`/papas?user_id=${encodeURIComponent(queryUserId)}`, undefined, { shallow: true });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = userId.trim();
    if (!trimmed) return;
    router.push(`/papas?user_id=${encodeURIComponent(trimmed)}`);
  };

  return (
    <main className="app-shell">
      <nav className="topbar">
        <div>
          <p className="eyebrow">Ingreso Monserrat</p>
          <h1>IngresoMonse</h1>
        </div>
      </nav>

      {queryUserId ? (
        <DashboardPapas userId={queryUserId} />
      ) : (
        <section className="setup-screen">
          <form className="setup-form" onSubmit={handleSubmit}>
            <div>
              <p className="eyebrow">Panel familiar</p>
              <h2>Ingresar Código o ID</h2>
            </div>
            <label>
              Código de acceso o ID de estudiante
              <input
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                placeholder="Ej: ABRIL (el código del alumno)"
                required
              />
            </label>
            <button className="primary">Abrir dashboard</button>
          </form>
        </section>
      )}

      {showSuccessModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(10, 8, 16, 0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px",
          animation: "fadeIn 0.3s ease-out"
        }}>
          <div style={{
            background: "linear-gradient(145deg, rgba(26, 23, 37, 0.95) 0%, rgba(17, 13, 36, 0.98) 100%)",
            border: "1px solid rgba(139, 92, 246, 0.35)",
            borderRadius: "16px",
            padding: "40px 30px",
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(139, 92, 246, 0.25)",
            animation: "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            color: "#e8e4f0"
          }}>
            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.05) 100%)",
              border: "2px solid rgba(139, 92, 246, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "2.5rem",
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
              animation: "pulseGlow 2s infinite"
            }}>
              💎
            </div>

            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              marginBottom: "16px",
              background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em"
            }}>
              ¡Acceso Completo Activado!
            </h2>

            <p style={{
              fontSize: "1.05rem",
              color: "#9590a6",
              lineHeight: "1.6",
              marginBottom: "28px"
            }}>
              ¡Felicitaciones! El plan de tu hijo/a ahora es <strong>Completo</strong>. Disfrutá de acceso ilimitado a las 5 fases de estudio, cuadernillo a mano y simulacros.
            </p>

            <div style={{
              textAlign: "left",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "32px"
            }}>
              <p style={{ fontWeight: "600", fontSize: "0.9rem", color: "#a78bfa", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                ¿Qué se habilitó ahora?
              </p>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { emoji: "🚀", text: "Las 5 fases y los 37 temas completos" },
                  { emoji: "📝", text: "Ejercicios de dictado y escritura a mano" },
                  { emoji: "⏱️", text: "Simulacros de examen reales cronometrados" },
                  { emoji: "📊", text: "Análisis cualitativo IA para padres" }
                ].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#e8e4f0" }}>
                    <span style={{ fontSize: "1.1rem" }}>{item.emoji}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleCloseModal}
              style={{
                width: "100%",
                padding: "14px 28px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                color: "#ffffff",
                fontSize: "1rem",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
                transition: "all 0.2s ease-out",
                outline: "none"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(139, 92, 246, 0.4)";
              }}
            >
              Comenzar a explorar
            </button>
          </div>

          <style jsx global>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.95) translateY(10px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes pulseGlow {
              0%, 100% { box-shadow: 0 0 15px rgba(139, 92, 246, 0.3); border-color: rgba(139, 92, 246, 0.5); }
              50% { box-shadow: 0 0 25px rgba(139, 92, 246, 0.6); border-color: rgba(139, 92, 246, 0.9); }
            }
          `}</style>
        </div>
      )}
    </main>
  );
}
