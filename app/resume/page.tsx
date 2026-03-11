import Header from "../components/Header";
import Navigation from "../components/Navigation";

export default function Resume() {
  const fileUrl = '/GalidoResty.pdf';
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-6 md:p-12">
      <Header />
      <Navigation />

      <div className="w-full max-w-4xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-200">My Resume</h2>
          <a
            href={fileUrl}
            download="GalidoResty.pdf"
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
          >
            Download PDF
          </a>
        </div>

        {/* PDF viewer — hidden on mobile */}
        <div className="hidden md:block w-full rounded-lg overflow-hidden border border-neutral-700">
          <iframe
            title="GalidoResty Resume"
            src={fileUrl}
            width="100%"
            height="800px"
            style={{ border: "none" }}
          />
        </div>

        {/* Mobile fallback */}
        <div className="md:hidden flex flex-col items-center gap-4 py-12 border border-neutral-700 rounded-lg text-center px-6">
          <p className="text-slate-400">PDF preview is not available on mobile.</p>
          <a
            href={fileUrl}
            download="GalidoResty.pdf"
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Download Resume
          </a>
        </div>
      </div>
    </main>
  );
}
