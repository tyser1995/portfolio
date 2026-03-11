'use client'
import { useEffect } from "react";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-ZG4ETQG2MN";
    script.async = true;
    document.head.appendChild(script);

    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-ZG4ETQG2MN');
    `;
    document.head.appendChild(inlineScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(inlineScript);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="relative min-h-screen flex flex-col">
        <main className="relative flex flex-col flex-1 items-center justify-center gap-6 px-6 py-16 z-10">
          <Header />
          <p className="text-slate-400 text-center max-w-xl text-base md:text-lg leading-relaxed">
            I build modern web applications and scalable backend solutions —
            turning ideas into clean, functional software.
          </p>
          <Navigation />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
