'use client'
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="relative min-h-screen">
        <main className="flex flex-col  min-h-screen items-center justify-between p-24">
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
