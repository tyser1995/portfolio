"use client";

import { motion } from "framer-motion";

interface PageLoaderProps {
  label?: string;
}

export default function PageLoader({ label }: PageLoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Slim gradient top bar */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] rounded-r-full"
        style={{ background: "linear-gradient(90deg, #38bdf8, #818cf8, #38bdf8)" }}
        initial={{ width: "0%" }}
        animate={{ width: "85%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Sonar rings */}
      <div className="relative flex items-center justify-center mb-8">
        {[1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border border-sky-500/30"
            style={{ width: 56 + i * 36, height: 56 + i * 36 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.1, 1.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Center avatar / initials */}
        <motion.div
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-xl font-extrabold text-white z-10"
          style={{
            background: "linear-gradient(135deg, #38bdf8, #818cf8)",
            boxShadow: "0 0 32px rgba(56,189,248,0.45)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          RG
        </motion.div>
      </div>

      {/* Destination label */}
      {label && (
        <motion.p
          className="text-sm font-semibold text-sky-400 tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {label}
        </motion.p>
      )}

      {/* Animated dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-violet-400"
            animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
