import { useState } from "react";
import DashboardPapas from "@/components/DashboardPapas";
import PantallaSessionTutoria from "@/components/PantallaSessionTutoria";
import PantallaSetup from "@/components/PantallaSetup";
import { DEFAULT_TOPIC, isCurriculumTopic } from "@/lib/curriculum";

const DEFAULT_USER_ID = process.env.NEXT_PUBLIC_DEMO_USER_ID || "";

export default function Home() {
  const [userId, setUserId] = useState(DEFAULT_USER_ID);
  const [vista, setVista] = useState(DEFAULT_USER_ID ? "tutoria" : "setup");
  const [tema, setTema] = useState(DEFAULT_TOPIC);
  const [capa, setCapa] = useState(1);
  const [modo, setModo] = useState("NORMAL");

  const handleSetupComplete = ({ usuario, plan }) => {
    setUserId(usuario.id);
    setTema(isCurriculumTopic(plan?.proximo_tema) ? plan.proximo_tema : DEFAULT_TOPIC);
    setCapa(plan?.proxima_capa || 1);
    setModo(plan?.modo_recomendado || "NORMAL");
    setVista("tutoria");
  };

  return (
    <main className="app-shell">
      {vista !== "tutoria" && (
        <nav className="topbar">
          <div>
            <p className="eyebrow">Ingreso Monserrat 2027</p>
            <h1>Abril Quest</h1>
          </div>
          <div className="nav-actions" aria-label="Secciones">
            <button className={vista === "setup" ? "active" : ""} onClick={() => setVista("setup")}>
              Setup
            </button>
            <button className={vista === "tutoria" ? "active" : ""} onClick={() => setVista("tutoria")} disabled={!userId}>
              Tutoria
            </button>
            <button className={vista === "dashboard" ? "active" : ""} onClick={() => setVista("dashboard")} disabled={!userId}>
              Papas
            </button>
          </div>
        </nav>
      )}

      {vista === "setup" && <PantallaSetup onComplete={handleSetupComplete} />}

      {vista === "tutoria" && userId && (
        <section className="workspace student-workspace">
          <PantallaSessionTutoria key={`${tema}-${capa}-${modo}`} user_id={userId} tema={tema} capa={capa} modo={modo} />
        </section>
      )}

      {vista === "dashboard" && userId && <DashboardPapas userId={userId} />}
    </main>
  );
}
