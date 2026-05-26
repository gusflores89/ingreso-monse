import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AVATARES = [
  {
    id: "atenea",
    nombre: "Atenea",
    descripcion: "Diosa de la sabiduria",
    imagen: "/avatars/atenea.svg",
    imagenMini: "/avatars/atenea-mini.svg",
    color: "#7F77DD",
    colorClaro: "#EEEDFE",
    estilo: "griego/epico",
  },
  {
    id: "nyx",
    nombre: "Nyx",
    descripcion: "Guardiana nocturna",
    imagen: "/avatars/nyx.svg",
    imagenMini: "/avatars/nyx-mini.svg",
    color: "#378ADD",
    colorClaro: "#E6F1FB",
    estilo: "anime",
  },
  {
    id: "lux",
    nombre: "Lux",
    descripcion: "Estrella del conocimiento",
    imagen: "/avatars/lux.svg",
    imagenMini: "/avatars/lux-mini.svg",
    color: "#1D9E75",
    colorClaro: "#E1F5EE",
    estilo: "k-pop/moderno",
  },
  {
    id: "buho",
    nombre: "Buho",
    descripcion: "Tu companero sabio",
    imagen: "/avatars/buho.svg",
    imagenMini: "/avatars/buho-mini.svg",
    color: "#D85A30",
    colorClaro: "#FAECE7",
    estilo: "cartoon/mascota",
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

  return (
    <main className="avatar-login-screen">
      <section className="avatar-login-shell" aria-labelledby="login-title">
        <div className="avatar-hero">
          <div
            className="avatar-main"
            style={{
              borderColor: avatarSeleccionado.color,
              backgroundColor: avatarSeleccionado.colorClaro,
            }}
          >
            <img src={avatarSeleccionado.imagen} alt={avatarSeleccionado.nombre} width="88" height="88" />
          </div>
          <h1 id="login-title" style={{ color: avatarSeleccionado.color }}>
            {avatarSeleccionado.nombre}
          </h1>
          <p>{avatarSeleccionado.descripcion}</p>
        </div>

        <div className="avatar-login-card">
          <p className="avatar-picker-label">Elegi tu tutor/a</p>
          <div className="avatar-picker-grid">
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
                  }}
                  aria-pressed={selected}
                  title={avatar.descripcion}
                >
                  <span style={{ backgroundColor: avatar.colorClaro }}>
                    <img src={avatar.imagenMini} alt="" width="40" height="40" aria-hidden="true" />
                  </span>
                  <strong>{avatar.nombre}</strong>
                </button>
              );
            })}
          </div>

          <label className="avatar-login-field">
            Tu codigo
            <input
              type="text"
              value={codigo}
              onChange={(event) => setCodigo(event.target.value.toUpperCase())}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleLogin();
              }}
              placeholder="Escribi tu codigo"
              maxLength={12}
              autoFocus
            />
          </label>

          <label className="avatar-login-field">
            Contrasena familiar
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleLogin();
              }}
              placeholder="Contrasena"
            />
          </label>

          {error && <p className="error avatar-login-error">{error}</p>}

          <button
            type="button"
            className="avatar-login-submit"
            onClick={handleLogin}
            disabled={!codigo.trim() || !password.trim() || loading}
            style={{ backgroundColor: loading ? "#CBD5E1" : avatarSeleccionado.color }}
          >
            {loading ? "Entrando..." : "Entrar a practicar"}
          </button>

          <div className="avatar-signup">
            <p>No tenes codigo?</p>
            <a href="/setup" style={{ color: avatarSeleccionado.color }}>
              Pedile a mama/papa que te anote
            </a>
          </div>
        </div>

        <div className="avatar-login-stats" aria-label="Resumen de la app">
          {[
            { label: "Temas", value: "37", color: "#7F77DD" },
            { label: "Mate + Lengua", value: "2 en 1", color: "#1D9E75" },
            { label: "Metodo", value: "Guiado", color: "#D85A30" },
          ].map((stat) => (
            <div key={stat.label}>
              <span>{stat.label}</span>
              <strong style={{ color: stat.color }}>{stat.value}</strong>
            </div>
          ))}
        </div>

        <a href="/setup" className="avatar-family-access">
          Acceso para padres/tutores
        </a>
      </section>
    </main>
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
