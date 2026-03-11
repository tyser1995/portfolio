"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FaViber, FaWhatsapp, FaEnvelope, FaAddressBook } from "react-icons/fa";

const contacts = [
  {
    label: "Email",
    href: "mailto:restygalido05@gmail.com",
    icon: <FaEnvelope className="w-4 h-4" />,
    color: "bg-sky-500 hover:bg-sky-400",
    shadow: "shadow-sky-500/40",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/639778877083",
    icon: <FaWhatsapp className="w-4 h-4" />,
    color: "bg-green-500 hover:bg-green-400",
    shadow: "shadow-green-500/40",
    external: true,
  },
  {
    label: "Viber",
    href: "viber://chat?number=639778877083",
    icon: <FaViber className="w-4 h-4" />,
    color: "bg-purple-500 hover:bg-purple-400",
    shadow: "shadow-purple-500/40",
  },
  {
    label: "GitHub",
    href: "https://github.com/tyser1995",
    icon: <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />,
    color: "bg-neutral-600 hover:bg-neutral-500",
    shadow: "shadow-neutral-500/40",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/galidoresty/",
    icon: <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />,
    color: "bg-blue-600 hover:bg-blue-500",
    shadow: "shadow-blue-500/40",
    external: true,
  },
];

export default function ContactWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-[9990] flex flex-col items-center gap-3"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Contact links — stack upward */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="flex flex-col-reverse items-center gap-3"
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {contacts.map((c, i) => (
              <motion.div
                key={c.label}
                className="relative group/tip"
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.8 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { delay: i * 0.06, duration: 0.25, ease: "easeOut" },
                  },
                }}
              >
                {/* Tooltip */}
                <span className="absolute right-12 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-semibold text-white bg-neutral-800 border border-neutral-700 px-2.5 py-1 rounded-lg opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 pointer-events-none">
                  {c.label}
                </span>

                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-white shadow-lg ${c.shadow} ${c.color} transition-all duration-200 hover:scale-110 hover:-translate-x-1`}
                >
                  {c.icon}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        aria-label="Open contact options"
        animate={open ? { rotate: 20, scale: 1.1 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center w-13 h-13 w-[52px] h-[52px] rounded-full text-white shadow-xl shadow-sky-500/30"
        style={{ background: "linear-gradient(135deg, #38bdf8, #818cf8)" }}
      >
        <FaAddressBook className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
