import { useState } from "react";
import { useRouter } from "next/router";

export default function PantallaSetup({ onComplete }) {
  const router = useRouter();
  const defaultYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const defaultExamYear = currentMonth >= 11 ? defaultYear + 1 : defaultYear;

  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    grado: "",
    nacimiento_dia: "",
    nacimiento_mes: "",
    nacimiento_anio: "",
    email: "",
    password_familiar: "",
    fecha_examen: `${defaultExamYear}-12-01`,
    nivel_inicial: "recien_empieza",
    estilo_aprendizaje: "visual_ejemplos",
    dislexia: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [setupExitoso, setSetupExitoso] = useState(null);

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
          edad: form.edad ? Number(form.edad) : undefined,
          grado: form.grado || undefined,
          fecha_nacimiento: buildFechaNacimiento(form),
          email: form.email || undefined,
          password_familiar: form.password_familiar,
          fecha_examen: form.fecha_examen,
          nivel_inicial: form.nivel_inicial,
          estilo_aprendizaje: form.estilo_aprendizaje,
          rasgos_especiales: { dislexia: form.dislexia },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo completar el setup.");
      setSetupExitoso(data);
      onComplete?.(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (setupExitoso) {
    const codigoGenerado = setupExitoso.usuario?.codigo_acceso || "";
    const nombre = setupExitoso.usuario?.nombre || form.nombre || "el estudiante";
    const passwordFamiliar = form.password_familiar;

    return (
      <section className="setup-screen">
        <div className="setup-form setup-success">
          <div>
            <p className="eyebrow">Cuenta gratuita lista</p>
            <h2>Cuenta creada exitosamente</h2>
          </div>

          <div className="access-code-card">
            <p>Codigo de acceso</p>
            <strong>{codigoGenerado}</strong>
          </div>

          <div className="access-code-card">
            <p>Contrasena familiar</p>
            <strong>{passwordFamiliar}</strong>
          </div>

          <p>Escribi el codigo y la contrasena en un papel y daselos a {nombre}.</p>
          <p>
            Para practicar, {nombre} debe ir a la pagina principal, escribir <strong>{codigoGenerado}</strong>, ingresar la
            contrasena familiar y tocar "Entrar a practicar".
          </p>
          <p>Esta cuenta empieza en modo gratuito, con acceso a los primeros temas.</p>

          <button type="button" className="primary" onClick={() => router.push("/")}>
            Ir a la pagina principal
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="setup-screen">
      <form className="setup-form" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">Primer ingreso</p>
          <h2>Crear cuenta gratuita</h2>
          <p>Ingresa los datos del alumno/a para probar una muestra real del metodo.</p>
        </div>

        <div className="setup-note">
          <strong>Muestra gratuita</strong>
          <span>Incluye problemas guiados de Matematica y Lengua con estilo Monserrat, no solo ejercicios basicos.</span>
        </div>

        <label>
          Nombre del estudiante
          <input
            value={form.nombre}
            onChange={(event) => update("nombre", event.target.value)}
            placeholder="Ej: Santiago, Lucia..."
            required
          />
        </label>

        <label>
          Edad del alumno/a
          <select value={form.edad} onChange={(event) => update("edad", event.target.value)} required>
            <option value="">Selecciona</option>
            {[8, 9, 10, 11, 12].map((edad) => (
              <option key={edad} value={edad}>
                {edad} anos
              </option>
            ))}
          </select>
        </label>

        <label>
          Grado actual
          <select value={form.grado} onChange={(event) => update("grado", event.target.value)} required>
            <option value="">Selecciona</option>
            <option value="4to">4to grado</option>
            <option value="5to">5to grado</option>
            <option value="6to">6to grado</option>
          </select>
        </label>

        <label>
          Fecha de nacimiento
          <div className="date-triplet">
            <select value={form.nacimiento_dia} onChange={(event) => update("nacimiento_dia", event.target.value)}>
              <option value="">Dia</option>
              {Array.from({ length: 31 }, (_, index) => index + 1).map((dia) => (
                <option key={dia} value={String(dia).padStart(2, "0")}>
                  {String(dia).padStart(2, "0")}
                </option>
              ))}
            </select>
            <select value={form.nacimiento_mes} onChange={(event) => update("nacimiento_mes", event.target.value)}>
              <option value="">Mes</option>
              {[
                ["01", "Enero"],
                ["02", "Febrero"],
                ["03", "Marzo"],
                ["04", "Abril"],
                ["05", "Mayo"],
                ["06", "Junio"],
                ["07", "Julio"],
                ["08", "Agosto"],
                ["09", "Septiembre"],
                ["10", "Octubre"],
                ["11", "Noviembre"],
                ["12", "Diciembre"],
              ].map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select value={form.nacimiento_anio} onChange={(event) => update("nacimiento_anio", event.target.value)}>
              <option value="">AAAA</option>
              {getBirthYears().map((anio) => (
                <option key={anio} value={anio}>
                  {anio}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label>
          Email familiar
          <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
        </label>

        <label>
          Crear contrasena familiar
          <input
            type="password"
            value={form.password_familiar}
            onChange={(event) => update("password_familiar", event.target.value)}
            placeholder="Minimo 6 caracteres"
            minLength={6}
            maxLength={40}
            required
          />
          <small>
            Esta contrasena la usan la familia y el alumno junto con el codigo de acceso.
          </small>
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
          Preferencia de explicacion
          <select value={form.estilo_aprendizaje} onChange={(event) => update("estilo_aprendizaje", event.target.value)}>
            <option value="visual_ejemplos">Visual y con ejemplos</option>
            <option value="paso_a_paso">Paso a paso</option>
            <option value="practica_directa">Mas practica, menos explicacion</option>
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

function buildFechaNacimiento(form) {
  if (!form.nacimiento_anio || !form.nacimiento_mes || !form.nacimiento_dia) return undefined;
  return `${form.nacimiento_anio}-${form.nacimiento_mes}-${form.nacimiento_dia}`;
}

function getBirthYears() {
  const currentYear = new Date().getFullYear();
  const start = currentYear - 12;
  const end = currentYear - 8;
  return Array.from({ length: end - start + 1 }, (_, index) => start + index).reverse();
}
