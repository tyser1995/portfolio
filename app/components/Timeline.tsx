"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  id?: string; // Optional id
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

  // Toggle year expansion
  const toggleYear = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  // Filter skills based on selected year
  const filteredSkills = (year: number) =>
    data.flatMap((category) =>
      category.skills.filter(
        (skill) =>
          skill.startYear <= year &&
          (skill.endYear ?? new Date().getFullYear()) >= year
      )
    );

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-8 relative">
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 border-l border-gray-300"></div>
        {years.map((year) => (
          <div key={year} className="relative flex flex-col items-center">
            <button
              onClick={() => toggleYear(year)}
              className={`w-16 h-16 flex items-center justify-center transition-colors duration-300 ${
                expandedYear === year
                  ? "bg-blue-500 text-white border rounded-full shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-white rounded-full"
              } text-center`}
            >
              {year}
            </button>
            {expandedYear === year && (
              <motion.div
                className="relative transition-all duration-500 ease-in-out overflow-hidden w-full"
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: expandedYear === year ? 1 : 0,
                  height: expandedYear === year ? "auto" : 0,
                }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex flex-col space-y-4 mt-4 w-full px-4">
                  {filteredSkills(year).map((skill) => (
                    <motion.div
                      key={skill.id}
                      className={`relative flex flex-col p-4 border rounded-lg shadow-md bg-white ${
                        filteredSkills(year).indexOf(skill) % 2 === 0
                          ? "ml-auto"
                          : "mr-auto"
                      } w-full md:w-2/5 transition-transform`}
                      initial={{ opacity: 0, transform: "translateX(-20px)" }}
                      animate={{ opacity: 1, transform: "translateX(0)" }}
                      transition={{
                        duration: 0.5,
                        delay: filteredSkills(year).indexOf(skill) * 0.1,
                      }}
                    >
                      {/* Dashed line connecting to the center line */}
                      <div
                        className={`absolute top-1/2 transform -translate-y-1/2 ${
                          filteredSkills(year).indexOf(skill) % 2 === 0
                            ? "right-full"
                            : "left-full"
                        } border-t border-dashed border-gray-300 w-8 h-0`}
                      ></div>
                      <h4 className="text-xl font-semibold text-blue-600">
                        {skill.label}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {skill.description}
                      </p>
                      <p className="text-sm text-gray-400">
                        {skill.startYear} - {skill.endYear ?? "Present"}
                      </p>
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
