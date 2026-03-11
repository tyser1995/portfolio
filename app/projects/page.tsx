import { FaLaptopCode, FaExternalLinkAlt } from "react-icons/fa";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import ProjectCard from "../components/ProjectCard";

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

async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/tyser1995/repos?sort=updated&per_page=20&type=public",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data: Repo[] = await res.json();
    return data.filter((r) => !r.name.startsWith("."));
  } catch {
    return [];
  }
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
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
