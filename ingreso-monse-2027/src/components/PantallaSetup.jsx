import { useState } from "react";

export default function PantallaSetup({ onComplete }) {
  const [form, setForm] = useState({
    nombre: "Abril",
    email: "",
    fecha_examen: "2027-12-01",
    nivel_inicial: "recien_empieza",
    estilo_aprendizaje: "visual",
    dislexia: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/setup-inicial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email || undefined,
          fecha_examen: form.fecha_examen,
          nivel_inicial: form.nivel_inicial,
          estilo_aprendizaje: form.estilo_aprendizaje,
          rasgos_especiales: { dislexia: form.dislexia },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo completar el setup.");
      onComplete(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="setup-screen">
      <form className="setup-form" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">Primer ingreso</p>
          <h2>Configurar el plan de Abril</h2>
        </div>

        <label>
          Nombre
          <input value={form.nombre} onChange={(event) => update("nombre", event.target.value)} required />
        </label>

        <label>
          Email familiar
          <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
        </label>

        <label>
          Fecha de examen
          <input type="date" value={form.fecha_examen} onChange={(event) => update("fecha_examen", event.target.value)} required />
        </label>

        <fieldset className="level-cards">
          <legend>Nivel inicial</legend>
          {[
            ["recien_empieza", "Recien empieza", "Arrancamos suave, con guia visual."],
            ["algo_sabe", "Algo sabe", "Mezcla repaso y desafios cortos."],
            ["bien_preparado", "Bien preparado", "Va directo a ejercicios exigentes."],
          ].map(([value, title, description]) => (
            <button
              type="button"
              key={value}
              className={form.nivel_inicial === value ? "level-card selected" : "level-card"}
              onClick={() => update("nivel_inicial", value)}
            >
              <strong>{title}</strong>
              <span>{description}</span>
            </button>
          ))}
        </fieldset>

        <label>
          Estilo de aprendizaje
          <select value={form.estilo_aprendizaje} onChange={(event) => update("estilo_aprendizaje", event.target.value)}>
            <option value="visual">Visual</option>
            <option value="kinestesico">Kinestesico</option>
            <option value="auditivo">Auditivo</option>
          </select>
        </label>

        <label className="check-row">
          <input type="checkbox" checked={form.dislexia} onChange={(event) => update("dislexia", event.target.checked)} />
          Rasgo a contemplar: dislexia
        </label>

        {error && <p className="error">{error}</p>}

        <button className="primary setup-submit" disabled={loading}>
          {loading ? "Generando plan..." : "Calcular ruta"}
        </button>
      </form>
    </section>
  );
}
