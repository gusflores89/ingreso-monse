import Link from "next/link";
import Seo from "@/components/Seo";
import { AVISO_BORRADOR, CONTACTO_LEGAL } from "@/lib/legal";

export default function PaginaLegal({ title, description, path, children }) {
  return (
    <main className="legal-page">
      <Seo title={title} description={description} path={path} />
      <article className="legal-article">
        <p className="legal-draft" role="note">{AVISO_BORRADOR}</p>
        <h1>{title}</h1>
        {children}
        <section className="legal-contact">
          <h2>Contacto del responsable</h2>
          <ul>
            <li>Responsable: {CONTACTO_LEGAL.razonSocial}</li>
            <li>CUIT: {CONTACTO_LEGAL.cuit}</li>
            <li>Domicilio: {CONTACTO_LEGAL.domicilio}</li>
            <li>Email: {CONTACTO_LEGAL.email}</li>
            <li>Teléfono: {CONTACTO_LEGAL.telefono}</li>
          </ul>
          <p>Estos datos son marcadores de posición. Hay que reemplazarlos antes de usar los textos como versión final.</p>
        </section>
        <p className="legal-back">
          <Link href="/">Volver al inicio</Link>
        </p>
      </article>
    </main>
  );
}
