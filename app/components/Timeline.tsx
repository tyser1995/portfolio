"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGraduationCap,
  FaUniversity,
  FaBriefcase,
  FaWalking,
  FaBicycle,
  FaCar,
} from "react-icons/fa";

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

// ── Phase order: top = present, bottom = start ────────────────────────────────
const PHASES = [
  {
    id: "industry",
    label: "IT Industry",
    sublabel: "Web / Application Developer",
    Icon: FaBriefcase,
    VehicleIcon: FaCar,
    vehicleSpeed: 9,           // 4 + 5
    yearMin: 2021,
    yearMax: 2099,
    direction: "right" as const,
    badgeSide: "left" as const,
    yearSide: "right" as const,
    glow: "rgba(14,165,233,0.45)",
    badgeBg: "bg-sky-500",
    activeBg: "bg-sky-500",
    text: "text-sky-400",
    border: "border-sky-500",
  },
  {
    id: "library",
    label: "Henry Luce III Library",
    sublabel: "Application Developer · CPU",
    Icon: FaUniversity,
    VehicleIcon: FaBicycle,
    vehicleSpeed: 12,          // 7 + 5
    yearMin: 2017,
    yearMax: 2020,
    direction: "left" as const,
    badgeSide: "right" as const,
    yearSide: "left" as const,
    glow: "rgba(16,185,129,0.45)",
    badgeBg: "bg-emerald-500",
    activeBg: "bg-emerald-500",
    text: "text-emerald-400",
    border: "border-emerald-500",
  },
  {
    id: "school",
    label: "School",
    sublabel: "BS Computer Science · CPU",
    Icon: FaGraduationCap,
    VehicleIcon: FaWalking,
    vehicleSpeed: 16,          // 11 + 5
    yearMin: 0,
    yearMax: 2016,
    direction: "right" as const,
    badgeSide: "left" as const,
    yearSide: "right" as const,
    glow: "rgba(245,158,11,0.45)",
    badgeBg: "bg-amber-500",
    activeBg: "bg-amber-500",
    text: "text-amber-400",
    border: "border-amber-500",
  },
];

// School → Library → IT Industry → School → …
const VEHICLE_SEQUENCE = ["school", "library", "industry"];

// ── CSS keyframes (injected once) ─────────────────────────────────────────────
const RoadKeyframes = () => (
  <style>{`
    @keyframes driveRight {
      0%   { left: -80px; }
      100% { left: calc(100% + 80px); }
    }
    @keyframes driveLeft {
      0%   { left: calc(100% + 80px); }
      100% { left: -80px; }
    }
  `}</style>
);

// ── Sequential vehicle – only visible when isActive ───────────────────────────
const Vehicle = ({
  VehicleIcon,
  direction,
  glow,
  speed,
  isActive,
  onDone,
}: {
  VehicleIcon: React.ComponentType<{ style?: React.CSSProperties }>;
  direction: "right" | "left";
  glow: string;
  speed: number;
  isActive: boolean;
  onDone: () => void;
}) => {
  if (!isActive) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 5 }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          animation: `${
            direction === "right" ? "driveRight" : "driveLeft"
          } ${speed}s linear 1 forwards`,
          filter: `drop-shadow(0 0 10px ${glow})`,
        }}
        onAnimationEnd={(e) => {
          if (
            e.animationName === "driveRight" ||
            e.animationName === "driveLeft"
          )
            onDone();
        }}
      >
        <VehicleIcon
          style={{
            fontSize: "1.9rem",
            color: "rgba(255,255,255,0.9)",
            transform: direction === "left" ? "scaleX(-1)" : "none",
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

// ── Animated yellow centre dashes ─────────────────────────────────────────────
const CenterDashes = ({ direction }: { direction: "right" | "left" }) => (
  <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="flex-shrink-0 mx-2.5 h-0.5 w-8 rounded-full bg-yellow-400/40"
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          delay: direction === "right" ? i * 0.11 : (19 - i) * 0.11,
        }}
      />
    ))}
  </div>
);

// ── Skill year-range label ────────────────────────────────────────────────────
const YearRange = ({ skill }: { skill: Skill }) => (
  <div className="flex items-center gap-1.5 text-xs text-slate-500">
    <span>{skill.startYear} –</span>
    {skill.endYear ? (
      <span>{skill.endYear}</span>
    ) : (
      <span className="flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400 font-medium">Present</span>
      </span>
    )}
  </div>
);

// ── Vertical road connector between strips ────────────────────────────────────
// Looks like the road makes a 90-degree turn, drops straight down, then turns again.
const Corner = ({ turnsAt }: { turnsAt: "right" | "left" }) => {
  const r = turnsAt === "right";
  return (
    <div className={`flex ${r ? "justify-end" : "justify-start"}`}>
      {/* Vertical road segment — same width as the road strip's visual lane */}
      <div className="relative w-20 h-16 bg-neutral-800/80">
        {/* Asphalt sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
        {/* Left edge line */}
        <div className="absolute top-0 bottom-0 left-3 w-px bg-white/15" />
        {/* Right edge line */}
        <div className="absolute top-0 bottom-0 right-3 w-px bg-white/15" />
        {/* Center dashes (vertical) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col justify-evenly pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 h-3 rounded-full bg-yellow-400/40"
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const Timeline: React.FC<TimelineProps> = ({ data }) => {
  const allYears = Array.from(
    new Set(
      (
        data
          .flatMap((c) => c.skills.flatMap((s) => [s.startYear, s.endYear]))
          .filter((y) => y !== undefined) as number[]
      )
    )
  ).sort((a, b) => a - b);

  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  // Start with the walker on the school strip
  const [activeVehicle, setActiveVehicle] = useState<string>("school");

  const advanceVehicle = useCallback((donePhaseId: string) => {
    const idx = VEHICLE_SEQUENCE.indexOf(donePhaseId);
    const nextIdx = (idx + 1) % VEHICLE_SEQUENCE.length;
    setActiveVehicle(VEHICLE_SEQUENCE[nextIdx]);
  }, []);

  const toggleYear = (year: number) =>
    setExpandedYear(expandedYear === year ? null : year);

  const skillsForYear = (year: number) =>
    data.flatMap((c) =>
      c.skills.filter(
        (s) =>
          s.startYear <= year &&
          (s.endYear ?? new Date().getFullYear()) >= year
      )
    );

  return (
    <div className="w-full max-w-5xl mx-auto px-2 py-8">
      <RoadKeyframes />

      {/* ── PRESENT marker ──────────────────────────────────────────────── */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <motion.div
            className="px-6 py-1.5 bg-sky-500 text-white text-xs font-bold rounded tracking-widest border border-sky-400"
            animate={{
              boxShadow: [
                "0 0 10px rgba(14,165,233,0.4)",
                "0 0 24px rgba(14,165,233,0.75)",
                "0 0 10px rgba(14,165,233,0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            PRESENT
          </motion.div>
          <div className="w-px h-5 bg-sky-500/40" />
        </div>
      </div>

      {/* ── Phase strips ────────────────────────────────────────────────── */}
      {PHASES.map((phase, idx) => {
        const isLast = idx === PHASES.length - 1;

        const phaseYears = allYears.filter(
          (y) => y >= phase.yearMin && y <= phase.yearMax
        );

        // always ascending order; for left-going strips display is still L→R
        const orderedYears = phaseYears;

        const hasExpanded =
          expandedYear !== null && phaseYears.includes(expandedYear);

        return (
          <React.Fragment key={phase.id}>
            {/* ── Road strip ──────────────────────────────────────────── */}
            <div className="relative h-20 bg-neutral-800/80 border-y border-white/10 overflow-hidden">
              {/* Asphalt sheen */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

              {/* Edge lines */}
              <div className="absolute top-3 inset-x-0 h-px bg-white/15 pointer-events-none" />
              <div className="absolute bottom-3 inset-x-0 h-px bg-white/15 pointer-events-none" />

              {/* Animated centre dashes */}
              <CenterDashes direction={phase.direction} />

              {/* Sequential vehicle */}
              <Vehicle
                VehicleIcon={phase.VehicleIcon}
                direction={phase.direction}
                glow={phase.glow}
                speed={phase.vehicleSpeed}
                isActive={activeVehicle === phase.id}
                onDone={() => advanceVehicle(phase.id)}
              />

              {/* Faint direction arrow */}
              <div
                className="absolute top-1/2 -translate-y-1/2 text-7xl font-black text-white/[0.035] pointer-events-none select-none left-1/2 -translate-x-1/2"
              >
                {phase.direction === "right" ? "›" : "‹"}
              </div>

              {/* Phase badge */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center gap-3
                  ${phase.badgeSide === "left" ? "left-4" : "right-4"}`}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${phase.badgeBg} shadow-lg`}
                  style={{ boxShadow: `0 0 20px ${phase.glow}` }}
                >
                  <phase.Icon className="text-white text-xl" />
                </div>
                <div className="hidden sm:block leading-tight">
                  <p className={`text-sm font-bold ${phase.text}`}>
                    {phase.label}
                  </p>
                  <p className="text-xs text-slate-500">{phase.sublabel}</p>
                </div>
              </div>

              {/* Year buttons */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-3 z-20
                  ${phase.yearSide === "left" ? "left-6" : "right-6"}`}
              >
                {orderedYears.length > 0 ? (
                  orderedYears.map((year) => {
                    const isActive = expandedYear === year;
                    return (
                      <motion.button
                        key={year}
                        onClick={() => toggleYear(year)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.93 }}
                        className={`
                          px-3.5 py-1.5 rounded text-xs font-bold border-2 transition-colors duration-300
                          ${isActive
                            ? `${phase.activeBg} border-transparent text-white`
                            : `bg-neutral-900/70 ${phase.border} ${phase.text} hover:bg-neutral-800`
                          }
                        `}
                        style={
                          isActive ? { boxShadow: `0 0 14px ${phase.glow}` } : {}
                        }
                      >
                        {year}
                      </motion.button>
                    );
                  })
                ) : (
                  <div
                    className={`px-4 py-1.5 rounded text-xs font-bold border-2 ${phase.border} ${phase.text} bg-neutral-900/70 opacity-60`}
                  >
                    Studying…
                  </div>
                )}
              </div>
            </div>

            {/* ── Skills panel ────────────────────────────────────────── */}
            <AnimatePresence>
              {hasExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden border-x border-neutral-700/40 bg-neutral-900/50"
                >
                  <div className="px-6 py-6">
                    <p
                      className={`text-xs font-semibold uppercase tracking-widest mb-4 ${phase.text}`}
                    >
                      Skills active in {expandedYear}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {skillsForYear(expandedYear!).map((skill, i) => (
                        <motion.div
                          key={skill.id ?? skill.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.28, delay: i * 0.05 }}
                          className="p-4 rounded-xl border border-neutral-700 bg-neutral-900 hover:border-sky-500/40 hover:shadow-md hover:shadow-sky-500/10 transition-all duration-200"
                        >
                          <h4 className="text-sm font-semibold text-sky-400 mb-1">
                            {skill.label}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed mb-2">
                            {skill.description}
                          </p>
                          <YearRange skill={skill} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Corner connector ────────────────────────────────────── */}
            {!isLast && (
              <Corner
                turnsAt={phase.direction === "right" ? "right" : "left"}
              />
            )}
          </React.Fragment>
        );
      })}

      {/* ── START marker ────────────────────────────────────────────────── */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <div className="w-px h-5 bg-amber-500/40" />
          <motion.div
            className="px-6 py-1.5 bg-amber-500 text-white text-xs font-bold rounded tracking-widest border border-amber-400"
            animate={{
              boxShadow: [
                "0 0 10px rgba(245,158,11,0.35)",
                "0 0 24px rgba(245,158,11,0.7)",
                "0 0 10px rgba(245,158,11,0.35)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            START
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
