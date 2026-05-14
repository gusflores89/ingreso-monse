import PantallaSetup from "@/components/PantallaSetup";

export default function SetupPage() {
  return (
    <main className="app-shell">
      <nav className="topbar setup-topbar">
        <div>
          <p className="eyebrow">Ingreso Monserrat 2027</p>
          <h1>Monse</h1>
        </div>
        <a className="family-access compact" href="/">
          Volver al inicio
        </a>
      </nav>
      <PantallaSetup />
    </main>
  );
}
