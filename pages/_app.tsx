import "@/styles/globals.css";
import Footer from "@/components/Footer";
import { DarkModeFontProvider } from "@/context/dark-mode-font-context";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DarkModeFontProvider>
      <Component {...pageProps} />
      <Footer />
    </DarkModeFontProvider>
  );
}
