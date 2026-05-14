import { useState } from "react";
import { CURRICULUM_LENGUA, CURRICULUM_MATEMATICA } from "@/lib/curriculum";

const DEFAULT_TEST_USER_ID = "f8dbb32d-2498-4fd3-839a-9387b79f01a2";

export default function AdminTest() {
  const [userId, setUserId] = useState(DEFAULT_TEST_USER_ID);
  const [temaSeleccionado, setTemaSeleccionado] = useState("");
  const [capa, setCapa] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);

  const todosLosTemas = [
    ...CURRICULUM_MATEMATICA.map((tema) => ({ ...tema, materiaLabel: "Matematica" })),
    ...CURRICULUM_LENGUA.map((tema) => ({ ...tema, materiaLabel: "Lengua" })),
  ];

  const iniciarSesion = async () => {
    const url = `/?user_id=${encodeURIComponent(userId)}&tema=${encodeURIComponent(temaSeleccionado)}&capa=${capa}`;
    const opened = window.open(url, "_blank");

    setResultado({
      tipo: opened ? "exito" : "error",
      data: opened
        ? {
            sesion_id: "Abriendo prueba",
            tipo: "La sesion carga en la nueva pestana",
            url,
          }
        : null,
      mensaje: opened ? null : `El navegador bloqueo la pestana nueva. Abri manualmente: ${url}`,
    });
  };

  const marcarTemaCompletado = async () => {
    setLoading(true);
    setResultado(null);

    try {
      const res = await fetch("/api/admin/completar-leccion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          tema: temaSeleccionado,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setResultado({ tipo: "error", mensaje: data.error || "No se pudo marcar la leccion." });
        return;
      }

      setResultado({
        tipo: "exito",
        data: {
          sesion_id: "Leccion completada",
          tipo: "practica habilitada",
        },
      });
    } catch (error) {
      setResultado({ tipo: "error", mensaje: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-test-page">
      <section className="admin-test-card">
        <header className="admin-test-header">
          <p className="eyebrow">Testing interno</p>
          <h1>Panel de Testing - Abril Quest</h1>
          <p>Proba cualquier tema del curriculum sin recorrer la progresion completa.</p>
        </header>

        <div className="admin-test-form">
          <label>
            User ID (Abril)
            <input type="text" value={userId} onChange={(event) => setUserId(event.target.value)} />
          </label>

          <label>
            Seleccionar tema para probar
            <select value={temaSeleccionado} onChange={(event) => setTemaSeleccionado(event.target.value)}>
              <option value="">-- Elegir tema --</option>
              {todosLosTemas.map((tema) => (
                <option key={tema.tema} value={tema.tema}>
                  [{tema.materiaLabel}] {formatTema(tema.tema)} (Orden: {tema.orden})
                </option>
              ))}
            </select>
          </label>

          <label>
            Capa (dificultad)
            <select value={capa} onChange={(event) => setCapa(Number(event.target.value))}>
              {[1, 2, 3, 4, 5].map((numero) => (
                <option key={numero} value={numero}>
                  Capa {numero}
                </option>
              ))}
            </select>
          </label>

          <div className="admin-test-actions">
            <button type="button" className="admin-button blue" onClick={iniciarSesion} disabled={!temaSeleccionado || loading}>
              {loading ? "Cargando..." : "Iniciar sesion de prueba"}
            </button>

            <button
              type="button"
              className="admin-button green"
              onClick={marcarTemaCompletado}
              disabled={!temaSeleccionado || loading}
            >
              Marcar leccion completada
            </button>
          </div>

          {resultado && (
            <div className={`admin-result ${resultado.tipo}`}>
              <strong>{resultado.tipo === "exito" ? "Exito" : "Error"}</strong>
              {resultado.tipo === "exito" ? (
                <div>
                  <p>
                    <span>Sesion ID:</span> {resultado.data.sesion_id}
                  </p>
                  <p>
                    <span>Tipo:</span> {resultado.data.tipo || "N/A"}
                  </p>
                  {resultado.data.url && (
                    <p>
                      <span>Link:</span> <a href={resultado.data.url}>Abrir prueba</a>
                    </p>
                  )}
                </div>
              ) : (
                <p>{resultado.mensaje}</p>
              )}
            </div>
          )}
        </div>

        <div className="admin-curriculum-grid">
          <CurriculumList title={`Matematica (${CURRICULUM_MATEMATICA.length})`} temas={CURRICULUM_MATEMATICA} accent="blue" />
          <CurriculumList title={`Lengua (${CURRICULUM_LENGUA.length})`} temas={CURRICULUM_LENGUA} accent="purple" />
        </div>
      </section>
    </main>
  );
}

function CurriculumList({ title, temas, accent }) {
  return (
    <section className={`admin-topic-list ${accent}`}>
      <h2>{title}</h2>
      <ol>
        {temas.map((tema) => (
          <li key={tema.tema}>{formatTema(tema.tema)}</li>
        ))}
      </ol>
    </section>
  );
}

function formatTema(tema) {
  return tema.replaceAll("_", " ");
}
