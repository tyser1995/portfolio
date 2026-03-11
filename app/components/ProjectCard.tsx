"use client";

import { useRef } from "react";
import { FaStar, FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  JavaScript: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
  Python: "bg-green-500/20 text-green-300 border-green-500/30",
  "C#": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  PHP: "bg-indigo-400/20 text-indigo-300 border-indigo-400/30",
  Dart: "bg-sky-400/20 text-sky-300 border-sky-400/30",
  HTML: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  CSS: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Go: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
  Java: "bg-red-500/20 text-red-300 border-red-500/30",
};

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

export default function ProjectCard({ repo }: { repo: Repo }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  const langStyle = repo.language ? (languageColors[repo.language] ?? "bg-slate-500/20 text-slate-300 border-slate-500/30") : null;

  return (
    <a
      ref={cardRef}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease, box-shadow 0.15s ease" }}
      className="flex flex-col gap-3 border border-neutral-700 rounded-xl p-5 bg-neutral-900/50
        hover:border-sky-500/40 hover:bg-neutral-800/60 hover:shadow-lg hover:shadow-sky-500/10
        group"
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
        {repo.language && langStyle && (
          <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-medium ${langStyle}`}>
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
  );
}
