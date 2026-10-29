import { useState } from "react";
import { insigniaDesbloqueada } from "@/lib/insignias";

export default function ModalPremiosEstudiante({
  isOpen,
  onClose,
  userId,
  premiosConfig = [],
  balance = {},
  canjes = [],
  insignias = [],
  onCanjeExitoso,
  retosCompletados = 0
}) {
  const [activeTab, setActiveTab] = useState("premios"); // 'premios' | 'insignias'
  const [loadingCanje, setLoadingCanje] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [errorCanje, setErrorCanje] = useState("");

  if (!isOpen) return null;

  const estrellasDisponibles = balance?.estrellasDisponibles ?? 0;
  const estrellasTotales = balance?.estrellasTotales ?? 0;

  const handleCanjear = async (premio) => {
    if (estrellasDisponibles < premio.estrellas) return;
    const confirma = window.confirm(`¿Querés canjear ${premio.estrellas} estrellas por "${premio.titulo}"?`);
    if (!confirma) return;

    setLoadingCanje(true);
    setMensajeExito("");
    setErrorCanje("");

    try {
      const res = await fetch("/api/premios/canjear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          premio_id: premio.id,
          estrellas_totales_cliente: estrellasTotales
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo procesar el canje.");

      setMensajeExito(data.mensaje || `¡Genial! Canjeaste "${premio.titulo}".`);
      onCanjeExitoso?.(data);
    } catch (err) {
      setErrorCanje(err.message);
    } finally {
      setLoadingCanje(false);
    }
  };

  const canjesPendientes = canjes.filter((c) => c.estado === "pendiente");
  const canjesEntregados = canjes.filter((c) => c.estado === "entregado");

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(6, 12, 24, 0.82)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "16px",
      animation: "fadeIn 0.25s ease-out"
    }}>
      <div style={{
        background: "linear-gradient(150deg, #06281e 0%, #0d1a29 50%, #151128 100%)",
        border: "1px solid rgba(16, 185, 129, 0.4)",
        borderRadius: "20px",
        padding: "24px",
        maxWidth: "680px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 25px 50px rgba(0,0,0,0.6), 0 0 30px rgba(16, 185, 129, 0.25)",
        color: "#f1f5f9",
        position: "relative"
      }}>
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#e2e8f0",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            cursor: "pointer",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ✕
        </button>

        {/* Encabezado con Maomao */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
          <img
            src="/avatars/maomao.png"
            alt="Maomao"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "3px solid #10b981",
              boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)",
              objectFit: "cover",
              background: "#064e3b"
            }}
          />
          <div>
            <span style={{ fontSize: "0.8rem", color: "#34d399", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Boticaria & Detective
            </span>
            <h2 style={{ margin: "2px 0 4px", fontSize: "1.45rem", color: "#ffffff", fontWeight: "800" }}>
              Cofre de Premios de Maomao
            </h2>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "#94a3b8" }}>
              Canjeá tu esfuerzo por premios reales en familia y coleccioná insignias anime.
            </p>
          </div>
        </div>

        {/* Barra de pestañas */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("premios")}
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              fontSize: "0.92rem",
              fontWeight: "700",
              cursor: "pointer",
              border: "none",
              background: activeTab === "premios" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "rgba(255,255,255,0.06)",
              color: activeTab === "premios" ? "#ffffff" : "#94a3b8",
              boxShadow: activeTab === "premios" ? "0 4px 12px rgba(16, 185, 129, 0.4)" : "none"
            }}
          >
            🎁 Premios Familiares
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("insignias")}
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              fontSize: "0.92rem",
              fontWeight: "700",
              cursor: "pointer",
              border: "none",
              background: activeTab === "insignias" ? "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" : "rgba(255,255,255,0.06)",
              color: activeTab === "insignias" ? "#ffffff" : "#94a3b8",
              boxShadow: activeTab === "insignias" ? "0 4px 12px rgba(139, 92, 246, 0.4)" : "none"
            }}
          >
            🏆 Álbum Anime ({insignias.length})
          </button>
        </div>

        {/* Tarjeta de Saldo de Estrellas */}
        <div style={{
          background: "rgba(16, 185, 129, 0.12)",
          border: "1px solid rgba(16, 185, 129, 0.35)",
          borderRadius: "14px",
          padding: "14px 18px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px"
        }}>
          <div>
            <span style={{ fontSize: "0.78rem", color: "#6ee7b7", textTransform: "uppercase", fontWeight: "700" }}>
              Estrellas disponibles para canjear
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "2rem", fontWeight: "900", color: "#fbbf24" }}>
                ⭐ {estrellasDisponibles}
              </span>
              <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                (de {estrellasTotales} ganadas en total)
              </span>
            </div>
          </div>
          <div style={{ fontSize: "0.82rem", color: "#a7f3d0", maxWidth: "230px", lineHeight: "1.4" }}>
            Cada reto superado suma +2 estrellas. ¡Tu esfuerzo tiene recompensa real!
          </div>
        </div>

        {mensajeExito && (
          <div style={{
            background: "rgba(16, 185, 129, 0.2)",
            border: "1px solid #10b981",
            borderRadius: "10px",
            padding: "12px 16px",
            marginBottom: "16px",
            color: "#6ee7b7",
            fontSize: "0.92rem",
            fontWeight: "600"
          }}>
            🎉 {mensajeExito}
          </div>
        )}

        {errorCanje && (
          <div style={{
            background: "rgba(239, 68, 68, 0.2)",
            border: "1px solid #ef4444",
            borderRadius: "10px",
            padding: "12px 16px",
            marginBottom: "16px",
            color: "#fca5a5",
            fontSize: "0.9rem"
          }}>
            ⚠️ {errorCanje}
          </div>
        )}

        {/* TAB 1: PREMIOS FAMILIARES */}
        {activeTab === "premios" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px", marginBottom: "24px" }}>
              {premiosConfig.map((premio) => {
                const puede = estrellasDisponibles >= premio.estrellas;
                const porcentaje = Math.min(100, Math.round((estrellasDisponibles / premio.estrellas) * 100));

                return (
                  <div
                    key={premio.id}
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: `1px solid ${puede ? "rgba(16, 185, 129, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
                      borderRadius: "14px",
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: puede ? "0 4px 16px rgba(16, 185, 129, 0.15)" : "none",
                      transition: "transform 0.15s ease"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                        <span style={{ fontSize: "1.8rem" }}>{premio.icono || "🎁"}</span>
                        <span style={{
                          background: puede ? "rgba(16, 185, 129, 0.25)" : "rgba(255, 255, 255, 0.08)",
                          color: puede ? "#34d399" : "#cbd5e1",
                          fontSize: "0.85rem",
                          fontWeight: "800",
                          padding: "3px 10px",
                          borderRadius: "12px",
                          border: `1px solid ${puede ? "#10b981" : "rgba(255,255,255,0.15)"}`
                        }}>
                          ⭐ {premio.estrellas}
                        </span>
                      </div>
                      <h4 style={{ margin: "10px 0 4px", fontSize: "1rem", color: "#ffffff", fontWeight: "700" }}>
                        {premio.titulo}
                      </h4>
                      {premio.descripcion && (
                        <p style={{ margin: "0 0 12px", fontSize: "0.82rem", color: "#94a3b8", lineHeight: "1.4" }}>
                          {premio.descripcion}
                        </p>
                      )}
                    </div>

                    <div>
                      {/* Barra de progreso si falta */}
                      {!puede && (
                        <div style={{ marginBottom: "10px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#94a3b8", marginBottom: "4px" }}>
                            <span>Progreso</span>
                            <span>{estrellasDisponibles} / {premio.estrellas} ⭐</span>
                          </div>
                          <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                            <div style={{ width: `${porcentaje}%`, height: "100%", background: "#10b981", borderRadius: "3px" }} />
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleCanjear(premio)}
                        disabled={!puede || loadingCanje}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "10px",
                          fontWeight: "700",
                          fontSize: "0.88rem",
                          border: "none",
                          cursor: puede && !loadingCanje ? "pointer" : "not-allowed",
                          background: puede
                            ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                            : "rgba(255, 255, 255, 0.08)",
                          color: puede ? "#ffffff" : "#64748b",
                          boxShadow: puede ? "0 4px 14px rgba(16, 185, 129, 0.4)" : "none"
                        }}
                      >
                        {puede ? "✨ ¡Canjear este premio!" : `Te faltan ${premio.estrellas - estrellasDisponibles} ⭐`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Lista de Canjes Pendientes */}
            {canjesPendientes.length > 0 && (
              <div style={{
                background: "rgba(245, 158, 11, 0.08)",
                border: "1px solid rgba(245, 158, 11, 0.35)",
                borderRadius: "14px",
                padding: "16px",
                marginBottom: "16px"
              }}>
                <h4 style={{ margin: "0 0 10px", color: "#fbbf24", fontSize: "0.95rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>⏳</span> Canjes pedidos (Pendientes de entrega de mamá y papá)
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {canjesPendientes.map((c) => (
                    <div
                      key={c.id}
                      style={{
                        background: "rgba(0, 0, 0, 0.25)",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "1.3rem" }}>{c.icono || "🎁"}</span>
                        <div>
                          <strong style={{ color: "#ffffff", fontSize: "0.9rem" }}>{c.titulo}</strong>
                          <span style={{ display: "block", fontSize: "0.76rem", color: "#94a3b8" }}>
                            Pedido el {new Date(c.fecha_solicitud).toLocaleDateString("es-AR")}
                          </span>
                        </div>
                      </div>
                      <span style={{
                        background: "rgba(245, 158, 11, 0.2)",
                        color: "#fbbf24",
                        fontSize: "0.78rem",
                        fontWeight: "700",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        border: "1px solid rgba(245, 158, 11, 0.4)"
                      }}>
                        Pendiente ⭐ {c.estrellas}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Canjes ya entregados */}
            {canjesEntregados.length > 0 && (
              <div style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "14px",
                padding: "14px"
              }}>
                <h4 style={{ margin: "0 0 8px", color: "#94a3b8", fontSize: "0.85rem", fontWeight: "600" }}>
                  ✅ Premios ya disfrutados ({canjesEntregados.length})
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {canjesEntregados.map((c) => (
                    <span
                      key={c.id}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "0.82rem",
                        color: "#cbd5e1",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <span>{c.icono}</span>
                      <span>{c.titulo}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ÁLBUM DE INSIGNIAS ANIME */}
        {activeTab === "insignias" && (
          <div>
            <p style={{ margin: "0 0 16px", fontSize: "0.88rem", color: "#cbd5e1" }}>
              Cada vez que mostrás constancia, paciencia o explorás nuevas ideas, desbloqueás personajes de tus mangas y animes favoritos:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
              {insignias.map((ins) => {
                const desbloqueada = insigniaDesbloqueada(ins, { estrellasTotales, retosCompletados });

                return (
                  <div
                    key={ins.id}
                    style={{
                      background: desbloqueada
                        ? "linear-gradient(145deg, rgba(139, 92, 246, 0.15) 0%, rgba(30, 27, 75, 0.3) 100%)"
                        : "rgba(255, 255, 255, 0.02)",
                      border: `1px solid ${desbloqueada ? "rgba(139, 92, 246, 0.45)" : "rgba(255, 255, 255, 0.08)"}`,
                      borderRadius: "14px",
                      padding: "16px",
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                      boxShadow: desbloqueada ? "0 4px 16px rgba(139, 92, 246, 0.15)" : "none"
                    }}
                  >
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: desbloqueada ? "rgba(139, 92, 246, 0.3)" : "rgba(255, 255, 255, 0.05)",
                      border: `2px solid ${desbloqueada ? "#a78bfa" : "rgba(255, 255, 255, 0.1)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.8rem",
                      shrink: 0
                    }}>
                      {ins.icono}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.75rem", color: "#c084fc", fontWeight: "700", textTransform: "uppercase" }}>
                          {ins.anime}
                        </span>
                        <span style={{
                          background: desbloqueada ? "rgba(34, 197, 94, 0.2)" : "rgba(148, 163, 184, 0.15)",
                          color: desbloqueada ? "#4ade80" : "#94a3b8",
                          fontSize: "0.7rem",
                          fontWeight: "700",
                          padding: "2px 6px",
                          borderRadius: "6px"
                        }}>
                          {desbloqueada ? "¡Coleccionada!" : "Todavía no"}
                        </span>
                      </div>
                      <h4 style={{ margin: "4px 0 2px", fontSize: "0.98rem", color: "#ffffff", fontWeight: "700" }}>
                        {ins.personaje} · {ins.titulo}
                      </h4>
                      <p style={{ margin: 0, fontSize: "0.82rem", color: "#94a3b8", lineHeight: "1.4" }}>
                        {ins.descripcion}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
