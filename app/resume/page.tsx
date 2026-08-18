import Header from "../components/Header";
import Navigation from "../components/Navigation";

export default function Resume() {
  const cvUrl = '/CV.pdf';
  const cvViewUrl = '/resty-galido-portfolio.html';
  const coverLetterUrl = '/CoverLetter.pdf';
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-6 md:p-12">
      <Header />
      <Navigation />

      <div className="w-full max-w-4xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-200">My Resume</h2>
          <div className="flex items-center gap-2">
            <a
              href={cvUrl}
              download="CV.pdf"
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              Download CV
            </a>
            <a
              href={coverLetterUrl}
              download="CoverLetter.pdf"
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              Download Cover Letter
            </a>
          </div>
        </div>

        <div className="w-full rounded-lg overflow-hidden border border-neutral-700">
          <iframe
            title="Resty Galido CV"
            src={cvViewUrl}
            width="100%"
            height="800px"
            style={{ border: "none" }}
          />
        </div>
      </div>
    </main>
  );
}
