"use client";
import skillsData from "../../public/data/skills.json";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaPhp, FaGitAlt, FaGithub,
} from "react-icons/fa";
import { DiDotnet, DiLaravel, DiVisualstudio } from "react-icons/di";
import { HiCode } from "react-icons/hi";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiMysql, SiMicrosoftsqlserver, SiUmbraco, SiXero, SiZoho,
  SiJquery, SiFlutter, SiSupabase, SiGooglecloud,
} from "react-icons/si";
import { GiTortoise } from "react-icons/gi";
import Timeline from "../components/Timeline";

type SkillData = typeof skillsData;
type SkillLabel = SkillData[number]["skills"][number]["label"];

const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ReactJS: FaReact,
  NodeJS: FaNodeJs,
  NextJS: RiNextjsFill,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  JavaScript: FaJsSquare,
  "C#": DiVisualstudio,
  "ASP.NET": DiDotnet,
  Laravel: DiLaravel,
  PHP: FaPhp,
  MySQL: SiMysql,
  MSSQL: SiMicrosoftsqlserver,
  "Umbraco CMS": SiUmbraco,
  "Zoho CRM": SiZoho,
  "Xero Application": SiXero,
  Git: FaGitAlt,
  Github: FaGithub,
  "Tortoise SVN": GiTortoise,
  jQuery: SiJquery,
  Flutter: SiFlutter,
  Supabase: SiSupabase,
  "Google Cloud Run": SiGooglecloud,
};

const getLevel = (years: number): { label: string; color: string } => {
  if (years >= 5) return { label: "Expert", color: "text-violet-400" };
  if (years >= 3) return { label: "Advanced", color: "text-sky-400" };
  if (years >= 2) return { label: "Intermediate", color: "text-emerald-400" };
  return { label: "Beginner", color: "text-amber-400" };
};

const calculateExperience = (startYear: number, endYear?: number): number => {
  const currentYear = new Date().getFullYear();
  return (endYear || currentYear) - startYear;
};

const ProgressBar = ({
  label,
  startYear,
  endYear,
  Icon,
}: {
  label: string;
  startYear: number;
  endYear?: number;
  Icon: React.ElementType;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const experience = calculateExperience(startYear, endYear);
  const percentage = Math.min((experience / 7) * 100, 100);
  const level = getLevel(experience);

  return (
    <div ref={ref} className="mb-4 flex items-center gap-3">
      <Icon className="text-2xl text-sky-500 flex-shrink-0" />
      <div className="w-full">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-slate-200">{label}</span>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${level.color}`}>{level.label}</span>
            <span className="text-sm text-slate-400">
              {experience > 1 ? `${experience} yrs` : `${experience} yr`}
            </span>
          </div>
        </div>
        <div className="w-full bg-neutral-700 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-sky-500 to-violet-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: inView ? `${percentage}%` : 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-6 md:p-12">
      <Header />
      <Navigation />

      <div className="w-full max-w-4xl">
        {skillsData.map((categoryData) => (
          <div key={categoryData.category} className="mb-8">
            <div className="mt-4 mb-3 flex items-center gap-3">
              <span className="inline-flex items-center text-sm font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1 rounded-full whitespace-nowrap">
                {categoryData.category}
              </span>
              <div className="flex-1 h-px bg-neutral-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {categoryData.skills.map((skill) => {
                const Icon = skillIcons[skill.label] || HiCode;
                return (
                  <ProgressBar
                    key={skill.label}
                    label={skill.label}
                    startYear={skill.startYear}
                    endYear={skill.endYear}
                    Icon={Icon}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
        My Development Roadmap
      </h2>
      <Timeline data={skillsData} />
    </main>
  );
}
