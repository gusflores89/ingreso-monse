import "@/styles/globals.css";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <div className="app-root">
      <div className="app-root-main">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
