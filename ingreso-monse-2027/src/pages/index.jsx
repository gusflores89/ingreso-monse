import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const normalizedCode = codigo.trim().toUpperCase();
    setError("");

    if (!normalizedCode) {
      setError("Ingresa tu codigo para empezar.");
      return;
    }

    if (!password.trim()) {
      setError("Ingresa la contrasena familiar para empezar.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo: normalizedCode, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Codigo incorrecto. Pedile ayuda a mama/papa.");
      }

      router.push(`/tutoria?user_id=${data.userId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-screen">
      <section className="login-shell" aria-labelledby="login-title">
        <div className="login-brand">
          <div className="login-owl" aria-hidden="true">
            Monse
          </div>
          <h1 id="login-title">Monse</h1>
          <p>Tu tutora para el ingreso Monserrat</p>
        </div>

        <div className="login-card">
          <h2>Hola</h2>

          <label className="login-code-field">
            Ingresa tu codigo
            <input
              type="text"
              value={codigo}
              onChange={(event) => setCodigo(event.target.value.toUpperCase())}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleLogin();
              }}
              placeholder="Ej: ABRIL"
              maxLength={12}
              autoFocus
            />
          </label>

          <label className="login-code-field">
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

          {error && <p className="error login-error">{error}</p>}

          <button type="button" className="primary login-submit" onClick={handleLogin} disabled={loading}>
            {loading ? "Entrando..." : "Empezar a practicar"}
          </button>

          <p className="login-help">Si no tenes codigo, pedile a mama/papa que configure tu cuenta.</p>
        </div>

        <a href="/setup" className="family-access">
          Acceso para padres/tutores
        </a>
      </section>
    </main>
  );
}
