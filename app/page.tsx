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
    // Load Google Tag Manager script
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-ZG4ETQG2MN";
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
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
      <div className="relative min-h-screen">
        <main className="flex flex-col min-h-screen items-center justify-between p-24">
          <Header />
          <Navigation />
          <div className="flex-grow">
            <></>
          </div>
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}
