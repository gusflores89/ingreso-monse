import Link from "next/link";

export default function Footer() {
  return (
    <footer className="legal-footer">
      <nav className="legal-footer-links" aria-label="Información legal">
        <Link href="/terminos">Términos y Condiciones</Link>
        <Link href="/privacidad">Política de Privacidad</Link>
        <Link href="/arrepentimiento">Botón de Arrepentimiento</Link>
      </nav>
      <p>
        Este producto no esta afiliado, asociado, autorizado ni respaldado por el Colegio Nacional de
        Monserrat ni por la Universidad Nacional de Cordoba.
      </p>
    </footer>
  );
}
