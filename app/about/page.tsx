import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Image from "next/image";
import { FaFilm, FaQuoteLeft } from "react-icons/fa";

const movies = [
  {
    title: "Snowden",
    year: 2016,
    director: "Oliver Stone",
    tag: "Privacy · Cybersecurity · Courage",
    quote:
      "The greatest danger to our freedom is the government that surveils everything and explains nothing.",
    description:
      "The story of Edward Snowden opened my eyes to the real power behind code — that a single developer can expose truth, challenge governments, and spark a global conversation about digital privacy. It made me realize that software is not just a tool; it is a statement. That film ignited my drive to understand systems deeply, think critically about the technology I build, and take responsibility for its impact on people.",
    color: "from-sky-500/20 to-sky-500/5",
    border: "border-sky-500/30",
    accent: "text-sky-400",
  },
  {
    title: "Replicas",
    year: 2018,
    director: "Jeffrey Nachmanoff",
    tag: "Neuroscience · AI · Consciousness",
    quote:
      "What makes us human is not just our biology — it is our memory, our consciousness, our code.",
    description:
      "Keanu Reeves playing a neuroscientist who maps human consciousness into machines was a mind-bending concept for me. The idea that the human mind could be translated into data fascinated me deeply. It pushed me to explore the intersection of biology and technology — and made me passionate about artificial intelligence, neural systems, and how data can simulate or preserve human experience. This film made me believe that the future of development is limitless.",
    color: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/30",
    accent: "text-violet-400",
  },
];

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-6 md:p-12">
      <Header />
      <Navigation />

      {/* Profile card */}
      <div className="w-full max-w-4xl">
        <figure className="flex flex-col md:flex-row bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden">
          <div className="flex-shrink-0 flex justify-center md:justify-start p-6 md:p-8">
            <Image
              className="w-32 h-32 md:w-48 md:h-auto rounded-full md:rounded-xl object-cover"
              src="/profile_enhance_no_img.png"
              alt="Resty S. Galido profile photo"
              width={384}
              height={512}
            />
          </div>

          <div className="flex flex-col justify-center gap-4 p-6 md:p-8 text-center md:text-left">
            <figcaption>
              <p className="text-xl font-bold text-sky-400">Resty S. Galido</p>
              <p className="text-sm text-slate-400">Software / Web Developer</p>
            </figcaption>

            <p className="text-slate-300 leading-relaxed">
              A dedicated Software Developer and Web Developer with extensive
              experience across various industries — from academic institutions
              to IT companies.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm">
              My approach to development is rooted in a deep understanding of
              the latest technologies and a commitment to continuous learning.
              Whether it&apos;s developing a sophisticated web application or
              streamlining software processes, I strive to provide efficient and
              innovative solutions. My passion for technology drives me to give
              my utmost effort in every project.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm">
              I am always eager to collaborate and assist others in overcoming
              their technological challenges.
            </p>
          </div>
        </figure>
      </div>

      {/* Inspiration section */}
      <div className="w-full max-w-4xl flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <FaFilm className="w-5 h-5 text-sky-500" />
          <h2 className="text-xl font-bold text-slate-200">What Inspired Me to Become a Developer</h2>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Before I wrote my first line of code, two films fundamentally changed how I viewed technology,
          data, and human potential. They did not just entertain me — they challenged the way I think
          and gave me a deeper purpose for pursuing a career in software development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {movies.map((movie) => (
            <div
              key={movie.title}
              className={`flex flex-col gap-4 rounded-xl border ${movie.border} bg-gradient-to-br ${movie.color} p-6 backdrop-blur-sm`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className={`text-lg font-bold ${movie.accent}`}>{movie.title}</h3>
                  <p className="text-xs text-slate-500">{movie.year} · Directed by {movie.director}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${movie.border} ${movie.accent} bg-black/20 whitespace-nowrap`}>
                  {movie.year}
                </span>
              </div>

              {/* Tags */}
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">{movie.tag}</p>

              {/* Quote */}
              <div className="flex gap-2">
                <FaQuoteLeft className={`w-4 h-4 flex-shrink-0 mt-0.5 ${movie.accent} opacity-60`} />
                <p className={`text-sm italic leading-relaxed ${movie.accent} opacity-80`}>
                  {movie.quote}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed">
                {movie.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-600 text-center">
          These films are not just movies to me — they are the reason I chose this path.
        </p>
      </div>
    </main>
  );
}
