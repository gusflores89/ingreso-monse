import { useRouter } from "next/router";
import PantallaSessionTutoria from "@/components/PantallaSessionTutoria";
import { isCurriculumTopic } from "@/lib/curriculum";

export default function TutoriaPage() {
  const router = useRouter();

  if (!router.isReady) {
    return (
      <main className="app-shell">
        <p className="status">Cargando...</p>
      </main>
    );
  }

  const userId = firstQueryValue(router.query.user_id);
  const temaQuery = firstQueryValue(router.query.tema);
  const capaQuery = Number(firstQueryValue(router.query.capa));
  const modo = firstQueryValue(router.query.modo) || "NORMAL";
  const tema = isCurriculumTopic(temaQuery) ? temaQuery : null;
  const capa = Number.isFinite(capaQuery) && capaQuery >= 1 && capaQuery <= 5 ? capaQuery : 1;

  if (!userId) {
    return (
      <main className="login-screen">
        <section className="login-card login-card-standalone">
          <h1>Falta el codigo</h1>
          <p className="login-help">Volver a la pagina principal para entrar con tu codigo.</p>
          <a className="primary link-button" href="/">
            Ir al inicio
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="workspace student-workspace">
        <PantallaSessionTutoria key={`${userId}-${tema || "auto"}-${capa}-${modo}`} user_id={userId} tema={tema} capa={capa} modo={modo} />
      </section>
    </main>
  );
}

function firstQueryValue(value) {
  return Array.isArray(value) ? value[0] : value;
}
