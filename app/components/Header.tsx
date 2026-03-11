"use client";

import { DesktopComputerIcon } from "@heroicons/react/solid";
import Link from "next/link";
import ReactTypingEffect from "react-typing-effect";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      className="flex flex-col items-center text-center gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Avatar with availability dot */}
      <div className="relative mb-1">
        <Image
          src="/profile_enhance_no_img.png"
          alt="Resty S. Galido"
          width={72}
          height={72}
          className="rounded-full object-cover ring-2 ring-sky-500/40 shadow-lg shadow-sky-500/20"
        />
        <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-neutral-950 rounded-full animate-pulse" />
      </div>

      {/* Name with gradient */}
      <Link href="/">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-1 tracking-tight bg-gradient-to-r from-sky-400 via-violet-400 to-sky-400 bg-clip-text text-transparent animate-gradient hover:opacity-90 transition-opacity cursor-pointer">
          Hi! I&apos;m Resty
        </h1>
      </Link>

      {/* Status badges */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Work From Home
        </span>
        <span className="text-xs font-semibold text-sky-400 bg-sky-400/10 border border-sky-400/20 px-3 py-1 rounded-full tracking-wide">
          Open to small projects, capstone collaboration &amp; mentoring
        </span>
      </div>

      {/* Typewriter roles */}
      <div className="flex items-center gap-2 text-base md:text-lg text-slate-300 font-semibold min-h-[28px]">
        <DesktopComputerIcon className="w-5 h-5 text-sky-500 flex-shrink-0" />
        <ReactTypingEffect
          text={["Software Developer", "Web Developer", "Full-Stack Dev"]}
          speed={80}
          eraseSpeed={40}
          typingDelay={500}
          eraseDelay={2000}
          className="text-slate-200"
        />
      </div>
    </motion.header>
  );
}
