import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import Analytics from "@/components/Analytics";
import { trackPageView } from "@/lib/analytics";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const path = router.asPath.split("?")[0];

  useEffect(() => {
    const onRoute = () => trackPageView();
    router.events.on("routeChangeComplete", onRoute);
    return () => router.events.off("routeChangeComplete", onRoute);
  }, [router.events]);

  return (
    <div className="app-root">
      <Seo path={path === "/" ? "" : path} />
      <Analytics />
      <div className="app-root-main">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
