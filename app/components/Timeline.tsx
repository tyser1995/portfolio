"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  id?: string;
  label: string;
  startYear: number;
  endYear?: number;
  description: string;
}

interface Category {
  category: string;
  skills: Skill[];
}

interface TimelineProps {
  data: Category[];
}

const Timeline: React.FC<TimelineProps> = ({ data }) => {
  const years = Array.from(
    new Set(
      data
        .flatMap((category) =>
          category.skills.flatMap((skill) => [skill.startYear, skill.endYear])
        )
        .filter((year) => year !== undefined)
    )
  ).sort((a, b) => (b as number) - (a as number));

  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const toggleYear = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  const filteredSkills = (year: number) =>
    data.flatMap((category) =>
      category.skills.filter(
        (skill) =>
          skill.startYear <= year &&
          (skill.endYear ?? new Date().getFullYear()) >= year
      )
    );

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-8 relative">
        {/* Gradient vertical line */}
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />

        {years.map((year) => (
          <div key={year} className="relative flex flex-col items-center w-full">
            <button
              onClick={() => toggleYear(year as number)}
              aria-expanded={expandedYear === year}
              aria-label={`Toggle skills from ${year}`}
              className={`w-14 h-14 flex items-center justify-center text-sm font-semibold rounded-full transition-all duration-300 z-10
                ${expandedYear === year
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30 ring-4 ring-sky-500/30 ring-offset-2 ring-offset-neutral-950 scale-110"
                  : "bg-neutral-800 text-slate-300 border border-neutral-600 hover:bg-sky-500/20 hover:border-sky-500 hover:text-sky-400 hover:scale-105"
                }`}
            >
              {year}
            </button>

            {expandedYear === year && (
              <motion.div
                className="relative overflow-hidden w-full mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col md:block space-y-4 md:space-y-0 px-2">
                  {filteredSkills(year as number).map((skill, index) => (
                    <motion.div
                      key={skill.id ?? skill.label}
                      className={`relative p-4 border border-neutral-700 rounded-xl shadow-md bg-neutral-900/80
                        hover:border-sky-500/40 hover:shadow-md hover:shadow-sky-500/10 transition-all duration-200
                        md:w-5/12 md:mb-4
                        ${index % 2 === 0 ? "md:ml-auto md:mr-[calc(50%+1rem)]" : "md:mr-auto md:ml-[calc(50%+1rem)]"}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                    >
                      {/* Connector line — desktop only */}
                      <div
                        className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 border-t border-dashed border-neutral-600 w-6 h-0
                          ${index % 2 === 0 ? "left-full" : "right-full"}`}
                      />
                      <h4 className="text-base font-semibold text-sky-400 mb-1">{skill.label}</h4>
                      <p className="text-sm text-slate-400 mb-2">{skill.description}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{skill.startYear} –</span>
                        {skill.endYear ? (
                          <span>{skill.endYear}</span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-emerald-400 font-medium">Present</span>
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
