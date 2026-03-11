"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const markReady = () => setReady(true);

    if (document.readyState === "complete") {
      // Already loaded — small tick to let React finish painting
      const t = setTimeout(markReady, 80);
      return () => clearTimeout(t);
    }

    window.addEventListener("load", markReady);
    return () => window.removeEventListener("load", markReady);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-neutral-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
          >
            {/* Sonar rings */}
            <div className="relative flex items-center justify-center mb-6">
              {[1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full border border-sky-500/25"
                  style={{ width: 56 + i * 38, height: 56 + i * 38 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [0.85, 1.1, 1.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Center badge */}
              <motion.div
                className="relative w-14 h-14 rounded-full flex items-center justify-center text-xl font-extrabold text-white z-10"
                style={{
                  background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                  boxShadow: "0 0 32px rgba(56,189,248,0.5)",
                }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                RG
              </motion.div>
            </div>

            {/* Name */}
            <motion.p
              className="text-sm font-semibold tracking-widest uppercase text-slate-400 mb-4"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Resty S. Galido
            </motion.p>

            {/* Bouncing dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-violet-400"
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content — hidden until ready */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
