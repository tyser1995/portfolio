import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
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
  );
}
