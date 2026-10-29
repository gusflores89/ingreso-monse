import { useState } from "react";
import { insigniaDesbloqueada } from "@/lib/insignias";

export default function PremiosSectionPapas({ userId, premiosData, loading, onUpdate, nombreAlumno = "tu hijo/a" }) {
  const [actionLoading, setActionLoading] = useState(null);
  const [editandoPremios, setEditandoPremios] = useState(false);
  const [premiosConfig, setPremiosConfig] = useState(premiosData?.premios_config || []);
  const [nuevoPremio, setNuevoPremio] = useState({ titulo: "", estrellas: 50, icono: "🎁", descripcion: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const canjesPendientes = premiosData?.canjes_pendientes || [];
  const canjesEntregados = premiosData?.canjes_entregados || [];
  const estrellasTotales = premiosData?.estrellas_totales ?? 0;
  const estrellasDisponibles = premiosData?.estrellas_disponibles ?? 0;
  const insignias = premiosData?.insignias || [];

  const handleMarcarEntregado = async (canjeId, premioTitulo) => {
    setActionLoading(canjeId);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/premios/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          action: "marcar_entregado",
          canje_id: canjeId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo actualizar el canje.");
      setSuccessMsg(`¡Genial! Marcaste "${premioTitulo}" como entregado a ${nombreAlumno}.`);
      if (onUpdate) await onUpdate();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelarCanje = async (canjeId) => {
    if (!window.confirm(`¿Cancelar esta solicitud y devolver las estrellas a ${nombreAlumno}?`)) return;
    setActionLoading(canjeId);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/premios/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          action: "cancelar_canje",
          canje_id: canjeId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo cancelar el canje.");
      setSuccessMsg(`Solicitud cancelada. Las estrellas volvieron a la cuenta de ${nombreAlumno}.`);
      if (onUpdate) await onUpdate();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleGuardarPremios = async (e) => {
    e.preventDefault();
    setActionLoading("guardar_config");
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/premios/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          action: "actualizar_premios",
          premios_config: premiosConfig,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo guardar la lista de premios.");
      setSuccessMsg("¡Lista de premios actualizada correctamente!");
      setEditandoPremios(false);
      if (onUpdate) await onUpdate();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAgregarPremio = (e) => {
    e.preventDefault();
    if (!nuevoPremio.titulo.trim()) return;
    const item = {
      id: "premio_custom_" + Date.now(),
      titulo: nuevoPremio.titulo.trim(),
      estrellas: parseInt(nuevoPremio.estrellas, 10) || 50,
      icono: nuevoPremio.icono || "🎁",
      descripcion: nuevoPremio.descripcion.trim() || "Premio personalizado acordado en familia."
    };
    setPremiosConfig([...premiosConfig, item]);
    setNuevoPremio({ titulo: "", estrellas: 50, icono: "🎁", descripcion: "" });
  };

  const handleEliminarPremio = (id) => {
    setPremiosConfig(premiosConfig.filter((p) => p.id !== id));
  };

  const handleModificarEstrellas = (id, estrellas) => {
    setPremiosConfig(premiosConfig.map((p) => (p.id === id ? { ...p, estrellas: Math.max(1, parseInt(estrellas, 10) || 1) } : p)));
  };

  return (
    <section id="recompensas" className="dashboard-panel dashboard-section" style={{ margin: "24px 0", animation: "fadeInUp 0.4s ease both" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700", color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>🎁</span> Cofre de Premios & Gamificación Familiar
          </h3>
          <p style={{ margin: "4px 0 0 0", color: "#a59ec9", fontSize: "0.85rem" }}>
            Recompensas reales acordadas en casa y Álbum de Aventuras Manga impulsado por su esfuerzo
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditandoPremios(!editandoPremios);
            setPremiosConfig(premiosData?.premios_config || []);
          }}
          style={{
            background: editandoPremios ? "rgba(239, 68, 68, 0.15)" : "rgba(139, 92, 246, 0.15)",
            border: editandoPremios ? "1px solid rgba(239, 68, 68, 0.4)" : "1px solid rgba(139, 92, 246, 0.4)",
            color: editandoPremios ? "#fca5a5" : "#c084fc",
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "0.82rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          {editandoPremios ? "✕ Cerrar edición" : "✏️ Configurar premios"}
        </button>
      </div>

      {successMsg && (
        <div style={{ padding: "10px 14px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.4)", borderRadius: "8px", color: "#34d399", fontSize: "0.85rem", marginBottom: "16px" }}>
          ✓ {successMsg}
        </div>
      )}
      {errorMsg && (
        <div style={{ padding: "10px 14px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.4)", borderRadius: "8px", color: "#fca5a5", fontSize: "0.85rem", marginBottom: "16px" }}>
          ⚠ {errorMsg}
        </div>
      )}

      {/* KPI Cards de Estrellas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "20px" }}>
        <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "10px", padding: "14px" }}>
          <span style={{ fontSize: "0.75rem", color: "#34d399", fontWeight: 600, textTransform: "uppercase" }}>Estrellas Disponibles</span>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#10b981", marginTop: "4px" }}>⭐ {estrellasDisponibles}</div>
          <small style={{ color: "#a59ec9", fontSize: "0.75rem" }}>Listas para canjear por premios</small>
        </div>

        <div style={{ background: "rgba(139, 92, 246, 0.08)", border: "1px solid rgba(139, 92, 246, 0.25)", borderRadius: "10px", padding: "14px" }}>
          <span style={{ fontSize: "0.75rem", color: "#c084fc", fontWeight: 600, textTransform: "uppercase" }}>Estrellas Totales</span>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#c084fc", marginTop: "4px" }}>✨ {estrellasTotales}</div>
          <small style={{ color: "#a59ec9", fontSize: "0.75rem" }}>Desbloquean insignias de anime</small>
        </div>

        <div style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.25)", borderRadius: "10px", padding: "14px" }}>
          <span style={{ fontSize: "0.75rem", color: "#fbbf24", fontWeight: 600, textTransform: "uppercase" }}>Canjes Pendientes</span>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f59e0b", marginTop: "4px" }}>📬 {canjesPendientes.length}</div>
          <small style={{ color: "#a59ec9", fontSize: "0.75rem" }}>Requieren entrega familiar</small>
        </div>

        <div style={{ background: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59, 130, 246, 0.25)", borderRadius: "10px", padding: "14px" }}>
          <span style={{ fontSize: "0.75rem", color: "#60a5fa", fontWeight: 600, textTransform: "uppercase" }}>Premios Entregados</span>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#3b82f6", marginTop: "4px" }}>🎉 {canjesEntregados.length}</div>
          <small style={{ color: "#a59ec9", fontSize: "0.75rem" }}>Celebrados juntos</small>
        </div>
      </div>

      {/* Editor de Premios (cuando está activo) */}
      {editandoPremios && (
        <div style={{ background: "rgba(17, 13, 36, 0.8)", border: "1px solid rgba(139, 92, 246, 0.3)", borderRadius: "12px", padding: "18px", marginBottom: "20px" }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#c084fc", fontSize: "0.95rem" }}>Editar opciones y costo de premios</h4>
          <p style={{ margin: "0 0 14px 0", color: "#a59ec9", fontSize: "0.82rem" }}>
            Ajustá cuántas estrellas cuesta cada premio acordado con {nombreAlumno} o agregá nuevos.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {premiosConfig.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.03)", padding: "10px 14px", borderRadius: "8px" }}>
                <span style={{ fontSize: "1.3rem" }}>{p.icono}</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: "#ffffff", fontSize: "0.9rem", display: "block" }}>{p.titulo}</strong>
                  <span style={{ color: "#a59ec9", fontSize: "0.75rem" }}>{p.descripcion}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <label style={{ color: "#34d399", fontSize: "0.82rem", fontWeight: 600 }}>⭐</label>
                  <input
                    type="number"
                    min="5"
                    max="1000"
                    step="5"
                    value={p.estrellas}
                    onChange={(e) => handleModificarEstrellas(p.id, e.target.value)}
                    style={{ width: "70px", padding: "4px 8px", background: "#0b081a", border: "1px solid rgba(139, 92, 246, 0.4)", borderRadius: "6px", color: "#ffffff", fontSize: "0.85rem" }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleEliminarPremio(p.id)}
                  style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer", fontSize: "1.1rem" }}
                  title="Eliminar premio"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Form para agregar nuevo premio */}
          <form onSubmit={handleAgregarPremio} style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "10px", borderRadius: "8px", marginBottom: "14px" }}>
            <input
              type="text"
              placeholder="Ícono (ej: 🍦)"
              value={nuevoPremio.icono}
              onChange={(e) => setNuevoPremio({ ...nuevoPremio, icono: e.target.value })}
              style={{ width: "60px", padding: "6px 8px", background: "#0b081a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#ffffff", fontSize: "0.85rem", textAlign: "center" }}
            />
            <input
              type="text"
              placeholder="Título del premio (ej: Salida al cine)"
              value={nuevoPremio.titulo}
              onChange={(e) => setNuevoPremio({ ...nuevoPremio, titulo: e.target.value })}
              style={{ flex: 1, minWidth: "160px", padding: "6px 10px", background: "#0b081a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#ffffff", fontSize: "0.85rem" }}
            />
            <input
              type="number"
              placeholder="Estrellas"
              value={nuevoPremio.estrellas}
              onChange={(e) => setNuevoPremio({ ...nuevoPremio, estrellas: e.target.value })}
              style={{ width: "80px", padding: "6px 8px", background: "#0b081a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#ffffff", fontSize: "0.85rem" }}
            />
            <button
              type="submit"
              style={{ background: "rgba(16, 185, 129, 0.2)", border: "1px solid rgba(16, 185, 129, 0.5)", color: "#34d399", padding: "6px 14px", borderRadius: "6px", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}
            >
              + Agregar opción
            </button>
          </form>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button
              type="button"
              onClick={() => setEditandoPremios(false)}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#a59ec9", padding: "8px 16px", borderRadius: "8px", fontSize: "0.85rem", cursor: "pointer" }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleGuardarPremios}
              disabled={actionLoading === "guardar_config"}
              style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", border: "none", color: "#ffffff", padding: "8px 20px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}
            >
              {actionLoading === "guardar_config" ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      )}

      {/* Solicitudes de canje pendientes */}
      <div style={{ marginBottom: "22px" }}>
        <h4 style={{ margin: "0 0 10px 0", color: "#ffffff", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>📬</span> Canjes Pendientes de Entrega
        </h4>

        {canjesPendientes.length === 0 ? (
          <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px dashed rgba(255, 255, 255, 0.1)", borderRadius: "10px", padding: "16px", textAlign: "center", color: "#a59ec9", fontSize: "0.85rem" }}>
            🎉 No hay canjes pendientes. {nombreAlumno} tiene ⭐ {estrellasDisponibles} listas para canjear cuando quiera desde su pantalla.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {canjesPendientes.map((c) => (
              <div
                key={c.id}
                style={{
                  background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(17, 13, 36, 0.8) 100%)",
                  border: "1px solid rgba(245, 158, 11, 0.35)",
                  borderRadius: "10px",
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "2rem" }}>{c.icono || "🎁"}</span>
                  <div>
                    <h5 style={{ margin: "0 0 2px 0", color: "#ffffff", fontSize: "0.95rem" }}>{c.titulo}</h5>
                    <p style={{ margin: 0, color: "#a59ec9", fontSize: "0.78rem" }}>
                      Solicitado el {new Date(c.fecha).toLocaleDateString("es-AR", { day: "numeric", month: "long" })} · ⭐ {c.estrellas} estrellas
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => handleCancelarCanje(c.id)}
                    disabled={actionLoading === c.id}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      color: "#fca5a5",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    Devolver estrellas
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMarcarEntregado(c.id, c.titulo)}
                    disabled={actionLoading === c.id}
                    style={{
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      border: "none",
                      color: "#ffffff",
                      padding: "7px 16px",
                      borderRadius: "6px",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)"
                    }}
                  >
                    {actionLoading === c.id ? "Guardando..." : "✓ Marcar como entregado"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Historial de Canjes Entregados */}
      {canjesEntregados.length > 0 && (
        <details style={{ marginBottom: "22px" }}>
          <summary style={{ cursor: "pointer", color: "#a59ec9", fontSize: "0.85rem", fontWeight: 600 }}>
            Ver historial de premios ya entregados ({canjesEntregados.length})
          </summary>
          <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {canjesEntregados.map((c) => (
              <div key={c.id} style={{ background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.82rem" }}>
                <span>{c.icono || "🎁"} {c.titulo}</span>
                <span style={{ color: "#34d399", fontWeight: 600 }}>Entregado el {new Date(c.fecha_entregado || c.fecha).toLocaleDateString("es-AR")}</span>
              </div>
            ))}
          </div>
        </details>
      )}

      <div>
        <h4 style={{ margin: "0 0 10px 0", color: "#ffffff", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>📖</span> Álbum anime de {nombreAlumno}
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "10px" }}>
          {insignias.map((insignia) => {
            const desbloqueada = insigniaDesbloqueada(insignia, { estrellasTotales });
            return (
              <div
                key={insignia.id}
                style={{
                  background: desbloqueada ? "rgba(16, 185, 129, 0.06)" : "rgba(255, 255, 255, 0.02)",
                  border: desbloqueada ? `1px solid ${insignia.color || "#10b981"}44` : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  opacity: desbloqueada ? 1 : 0.65
                }}
              >
                <div style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: desbloqueada ? `${insignia.color || "#10b981"}22` : "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem"
                }}>
                  {insignia.icono}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ color: desbloqueada ? "#ffffff" : "#94a3b8", fontSize: "0.82rem", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {insignia.personaje}
                  </strong>
                  <span style={{ color: "#a59ec9", fontSize: "0.72rem", display: "block" }}>
                    {insignia.anime}
                  </span>
                  <small style={{ color: desbloqueada ? "#34d399" : "#f59e0b", fontSize: "0.7rem", fontWeight: 600 }}>
                    {desbloqueada ? "✓ Desbloqueada" : `Faltan ${insignia.estrellas_requeridas - estrellasTotales} ⭐`}
                  </small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
