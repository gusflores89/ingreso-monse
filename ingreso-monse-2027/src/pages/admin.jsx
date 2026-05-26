import { useEffect, useMemo, useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("todos");

  const login = async (event) => {
    event?.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.error || "No se pudo ingresar.");
      setAuthed(true);
      await loadUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/usuarios");
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "No se pudo cargar usuarios.");
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) loadUsers();
  }, [authed]);

  const usuariosFiltrados = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return (data?.usuarios || []).filter((usuario) => {
      const planOk = planFilter === "todos" || usuario.plan === planFilter;
      const searchOk =
        !normalized ||
        [usuario.nombre, usuario.email, usuario.codigo_acceso, usuario.id]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalized));
      return planOk && searchOk;
    });
  }, [data, search, planFilter]);

  if (!authed) {
    return (
      <main className="admin-console-screen">
        <form className="admin-login-card" onSubmit={login}>
          <p className="eyebrow">Admin privado</p>
          <h1>Panel de usuarios</h1>
          <p>Ingresá con la contraseña admin para ver alumnos, planes y actividad.</p>

          <label>
            Contraseña admin
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Contraseña admin"
              autoFocus
            />
          </label>

          {error && <p className="error">{error}</p>}

          <button className="primary" disabled={!password.trim() || loading}>
            {loading ? "Entrando..." : "Entrar al panel"}
          </button>
        </form>
      </main>
    );
  }

  const resumen = data?.resumen || {};

  return (
    <main className="admin-console-screen">
      <section className="admin-console">
        <header className="admin-console-hero">
          <div>
            <p className="eyebrow">Admin comercial</p>
            <h1>Usuarios y actividad</h1>
            <p>Control rápido de altas freemium, usuarios full y movimiento reciente.</p>
          </div>
          <button type="button" onClick={loadUsers} disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </header>

        {error && <p className="error">{error}</p>}

        <div className="admin-kpi-grid">
          <Kpi label="Usuarios" value={resumen.total || 0} />
          <Kpi label="Trial" value={resumen.trial || 0} />
          <Kpi label="Full" value={resumen.full || 0} />
          <Kpi label="Activos 7 días" value={resumen.activos7d || 0} />
          <Kpi label="Sesiones" value={resumen.sesionesTotales || 0} />
        </div>

        <section className="admin-panel">
          <div className="admin-toolbar">
            <label>
              Buscar usuario
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nombre, email, código o user_id"
              />
            </label>
            <label>
              Plan
              <select value={planFilter} onChange={(event) => setPlanFilter(event.target.value)}>
                <option value="todos">Todos</option>
                <option value="trial">Trial</option>
                <option value="full">Full</option>
              </select>
            </label>
          </div>

          <div className="admin-user-list">
            {usuariosFiltrados.length === 0 ? (
              <p className="empty-state standalone">No hay usuarios para este filtro.</p>
            ) : (
              usuariosFiltrados.map((usuario) => <UserCard key={usuario.id} usuario={usuario} onUpdate={loadUsers} />)
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

function Kpi({ label, value }) {
  return (
    <article className="admin-kpi">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function UserCard({ usuario, onUpdate }) {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const ultima = usuario.metricas?.ultima_sesion;
  const dashboardUrl = `/papas?user_id=${encodeURIComponent(usuario.id)}`;
  const tutoriaUrl = `/tutoria?user_id=${encodeURIComponent(usuario.id)}`;
  const testUrl = `/admin-test`;

  const togglePlan = async () => {
    const nuevoPlan = usuario.plan === "trial" ? "full" : "trial";
    setUpdating(true);
    setError("");

    try {
      const res = await fetch("/api/admin/cambiar-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: usuario.id, nuevo_plan: nuevoPlan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo actualizar el plan.");
      onUpdate?.();
    } catch (err) {
      setError(err.message);
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <article className="admin-user-card">
      <div className="admin-user-main">
        <img src={`/avatars/${usuario.avatar || "buho"}-mini.svg`} alt="" width="42" height="42" />
        <div>
          <h2>{usuario.nombre || "Sin nombre"}</h2>
          <p>{usuario.email || "Sin email"}</p>
          <small>{usuario.id}</small>
        </div>
      </div>

      <div className="admin-user-tags">
        <span className={`plan-tag ${usuario.plan}`}>{usuario.plan}</span>
        <span>{usuario.codigo_acceso || "sin codigo"}</span>
        {usuario.edad && <span>{usuario.edad} años</span>}
        {usuario.grado && <span>{usuario.grado}</span>}
      </div>

      <div className="admin-user-metrics">
        <Metric label="Sesiones" value={usuario.metricas?.total_sesiones || 0} />
        <Metric label="Acierto" value={`${usuario.metricas?.tasa_acierto || 0}%`} />
        <Metric label="Temas" value={usuario.metricas?.temas_trabajados || 0} />
      </div>

      <div className="admin-user-last">
        <strong>Última actividad</strong>
        {ultima ? (
          <p>
            {formatDateTime(ultima.created_at)} · {formatTema(ultima.tema)} ·{" "}
            {ultima.es_correcta === null ? "sin evaluar" : ultima.es_correcta ? "correcto" : "incorrecto"}
          </p>
        ) : (
          <p>Sin sesiones todavía.</p>
        )}
      </div>

      <div className="admin-user-actions" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
        <a href={dashboardUrl} className="admin-action-btn">Dashboard padres</a>
        <a href={tutoriaUrl} className="admin-action-btn">Abrir tutoría</a>
        <button
          type="button"
          onClick={togglePlan}
          disabled={updating}
          style={{
            cursor: "pointer",
            backgroundColor: usuario.plan === "trial" ? "#10b981" : "#64748b",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            padding: "5px 12px",
            fontWeight: "600",
            fontSize: "0.85rem",
            transition: "all 0.2s ease"
          }}
        >
          {updating ? "Cambiando..." : usuario.plan === "trial" ? "Habilitar Full" : "Pasar a Trial"}
        </button>
        <a href={testUrl} className="admin-action-btn">Testing</a>
      </div>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatTema(tema = "") {
  return tema.replaceAll("_", " ");
}

function formatDateTime(value) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
