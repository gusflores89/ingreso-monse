import Head from "next/head";
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, SITE_TITLE, SITE_URL } from "@/lib/sitio";

export default function Seo({ title, description, path = "" }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE;
  const fullDescription = description || SITE_DESCRIPTION;
  const url = `${SITE_URL}${path}`;

  return (
    <Head>
      <title key="title">{fullTitle}</title>
      <meta key="description" name="description" content={fullDescription} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:locale" property="og:locale" content="es_AR" />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:title" property="og:title" content={fullTitle} />
      <meta key="og:description" property="og:description" content={fullDescription} />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:image" property="og:image" content={SITE_OG_IMAGE} />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />
      <meta key="og:image:alt" property="og:image:alt" content="Ingreso Monse: Matemática y Lengua para el ingreso al Colegio Nacional de Monserrat" />
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={fullTitle} />
      <meta key="twitter:description" name="twitter:description" content={fullDescription} />
      <meta key="twitter:image" name="twitter:image" content={SITE_OG_IMAGE} />
      <link key="canonical" rel="canonical" href={url} />
      <link key="icon" rel="icon" href="/favicon.ico" sizes="any" />
      <link key="icon-png" rel="icon" type="image/png" href="/favicon-32.png" />
      <link key="apple" rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta key="theme-color" name="theme-color" content="#1a1033" />
    </Head>
  );
}
