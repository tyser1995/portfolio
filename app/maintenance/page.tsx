import { FaLaptopCode, FaStar, FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  "C#": "bg-purple-500",
  PHP: "bg-indigo-400",
  Dart: "bg-sky-400",
  HTML: "bg-orange-500",
  CSS: "bg-pink-500",
  Go: "bg-cyan-400",
  Java: "bg-red-500",
  Kotlin: "bg-orange-400",
  Swift: "bg-orange-500",
};

async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/tyser1995/repos?sort=updated&per_page=20&type=public",
      { next: { revalidate: 3600 } } // cache for 1 hour
    );
    if (!res.ok) return [];
    const data: Repo[] = await res.json();
    return data.filter((r) => !r.name.startsWith("."));
  } catch {
    return [];
  }
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default async function Projects() {
  const repos = await getRepos();

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-6 md:p-12">
      <Header />
      <Navigation />

      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaLaptopCode className="w-6 h-6 text-sky-500" />
            <h2 className="text-2xl font-bold text-slate-200">Projects</h2>
          </div>
          <a
            href="https://github.com/tyser1995"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors"
          >
            View on GitHub
            <FaExternalLinkAlt className="w-3 h-3" />
          </a>
        </div>

        {repos.length === 0 ? (
          <p className="text-slate-500 text-sm">Could not load repositories. Try again later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 border border-neutral-700 rounded-lg p-5 bg-neutral-900/50 hover:border-sky-500/50 hover:bg-neutral-800/60 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-200 group-hover:text-sky-400 transition-colors truncate">
                    {repo.name}
                  </h3>
                  <FaExternalLinkAlt className="w-3 h-3 text-slate-600 group-hover:text-sky-500 flex-shrink-0 mt-1 transition-colors" />
                </div>

                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 flex-1">
                  {repo.description ?? "No description provided."}
                </p>

                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-slate-500 mt-auto pt-2 border-t border-neutral-800">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${languageColors[repo.language] ?? "bg-slate-500"}`}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <FaStar className="w-3 h-3" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch className="w-3 h-3" />
                    {repo.forks_count}
                  </span>
                  <span className="ml-auto">Updated {timeAgo(repo.updated_at)}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
