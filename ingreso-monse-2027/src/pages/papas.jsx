import { useRouter } from "next/router";
import { useState } from "react";
import DashboardPapas from "@/components/DashboardPapas";

export default function PapasPage() {
  const router = useRouter();
  const queryUserId = typeof router.query.user_id === "string" ? router.query.user_id : "";
  const [userId, setUserId] = useState("");

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
    </main>
  );
}
