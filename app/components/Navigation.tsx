"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaQuestionCircle, FaUserCog } from "react-icons/fa";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import PageLoader from "./PageLoader";

const navItems = [
  {
    key: "about",
    href: "/about",
    label: "About",
    subtitle: "It's all about me.",
    Icon: FaQuestionCircle,
    ariaLabel: "About me",
  },
  {
    key: "skills",
    href: "/skills",
    label: "Skills",
    subtitle: "List of skills I learned.",
    Icon: FaUserCog,
    ariaLabel: "My skills",
  },
  {
    key: "projects",
    href: "/projects",
    label: "Projects",
    subtitle: "List of projects developed.",
    Icon: FaLaptopCode,
    ariaLabel: "My projects",
  },
  {
    key: "resume",
    href: "/resume",
    label: "Resume",
    subtitle: "Download my resume.",
    Icon: MdOutlineDocumentScanner,
    ariaLabel: "View my resume",
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState<string | undefined>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setLoading(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    if (pathname === href) return;
    setDrawerOpen(false);
    setLoadingLabel(label);
    setLoading(true);
    setTimeout(() => { window.location.href = href; }, 100);
  };

  const isActive = (href: string) => pathname === href;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader label={loadingLabel} />}
      </AnimatePresence>

      {/* ── MOBILE: hamburger button (fixed top-right) ── */}
      <button
        onClick={() => setDrawerOpen(true)}
        aria-label="Open navigation menu"
        className="lg:hidden fixed top-4 right-4 z-[9980] flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-sm gap-1.5 hover:border-sky-500/40 transition-colors"
      >
        <span className="w-5 h-0.5 bg-slate-300 rounded-full" />
        <span className="w-5 h-0.5 bg-slate-300 rounded-full" />
        <span className="w-3.5 h-0.5 bg-slate-300 rounded-full self-start ml-[5px]" />
      </button>

      {/* ── MOBILE: sidebar drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="lg:hidden fixed inset-0 z-[9981] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              className="lg:hidden fixed top-0 right-0 z-[9982] h-full w-72 bg-neutral-950 border-l border-neutral-800 flex flex-col shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
                <span className="text-sm font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent tracking-wide">
                  Navigation
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-700 text-slate-400 hover:text-white hover:border-neutral-500 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
                {navItems.map(({ key, href, label, subtitle, Icon, ariaLabel }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3, ease: "easeOut" }}
                  >
                    <Link href={href} legacyBehavior>
                      <a
                        href={href}
                        onClick={(e) => handleClick(e, href, label)}
                        aria-label={ariaLabel}
                        className={`group flex items-center gap-4 rounded-xl border px-4 py-3.5 transition-all duration-200
                          ${isActive(href)
                            ? "border-sky-500/60 bg-sky-500/10"
                            : "border-white/8 bg-white/4 hover:border-sky-500/30 hover:bg-white/8"
                          }`}
                      >
                        <span className={`p-2 rounded-lg transition-colors ${isActive(href) ? "bg-sky-500/20" : "bg-sky-500/10 group-hover:bg-sky-500/20"}`}>
                          <Icon className="w-4 h-4 text-sky-400" />
                        </span>
                        <div>
                          <p className={`font-semibold text-sm ${isActive(href) ? "text-sky-400" : "text-slate-200 group-hover:text-sky-400"} transition-colors`}>
                            {label}
                          </p>
                          <p className="text-xs text-slate-500">{subtitle}</p>
                        </div>
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-4 border-t border-neutral-800">
                <p className="text-xs text-neutral-600 text-center">Resty S. Galido · Portfolio</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── DESKTOP: horizontal grid nav ── */}
      <motion.nav
        className="hidden lg:grid p-4 w-full max-w-5xl grid-cols-4 gap-3"
        aria-label="Main navigation"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {navItems.map(({ key, href, label, subtitle, Icon, ariaLabel }) => (
          <motion.div key={key} variants={item}>
            <Link href={href} legacyBehavior>
              <a
                href={href}
                onClick={(e) => handleClick(e, href, label)}
                aria-label={ariaLabel}
                className={`group flex flex-col rounded-xl border px-5 py-4 transition-all duration-300
                  backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/10
                  ${isActive(href)
                    ? "border-sky-500/60 bg-sky-500/10 shadow-md shadow-sky-500/15"
                    : "border-white/10 bg-white/5 hover:border-sky-500/30 hover:bg-white/[0.07]"
                  }`}
              >
                <h2 className="mb-2 text-xl font-semibold flex items-center gap-2">
                  <span className={`p-1.5 rounded-lg transition-colors duration-200
                    ${isActive(href) ? "bg-sky-500/20" : "bg-sky-500/10 group-hover:bg-sky-500/20"}`}>
                    <Icon className="w-4 h-4 text-sky-400" />
                  </span>
                  <span className={`transition-colors duration-200
                    ${isActive(href) ? "text-sky-400" : "group-hover:text-sky-400"}`}>
                    {label}
                  </span>
                </h2>
                <p className="text-sm text-slate-400">{subtitle}</p>
              </a>
            </Link>
          </motion.div>
        ))}
      </motion.nav>
    </>
  );
}
