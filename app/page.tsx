import Navigation from "./components/Navigation";
import Header from "./components/Header";
import ThreeDBackground from "./components/ThreeDBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* <ThreeDBackground /> */}
      <main className="flex flex-col  min-h-screen items-center justify-between p-24">
        <Header />
        <Navigation />
      </main>
    </div>
  );
}
