"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FaViber, FaWhatsapp } from "react-icons/fa";

const links = [
  {
    href: "https://www.linkedin.com/in/galidoresty/",
    label: "LinkedIn",
    icon: <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />,
    hoverColor: "hover:text-blue-400",
  },
  {
    href: "https://github.com/tyser1995",
    label: "GitHub",
    icon: <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />,
    hoverColor: "hover:text-white",
  },
  {
    href: "viber://chat?number=639778877083",
    label: "Viber",
    icon: <FaViber className="w-5 h-5" />,
    hoverColor: "hover:text-purple-400",
  },
  {
    href: "https://wa.me/639778877083",
    label: "WhatsApp",
    icon: <FaWhatsapp className="w-5 h-5" />,
    hoverColor: "hover:text-green-400",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full px-6 py-6">
      {/* Gradient divider */}
      <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-6" />
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-6">
          {links.map(({ href, label, icon, hoverColor }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className={`flex items-center gap-2 text-slate-500 ${hoverColor} transition-colors duration-200`}
            >
              {icon}
              <span className="hidden sm:inline text-sm">{label}</span>
            </a>
          ))}
        </div>
        <p className="text-xs text-neutral-600">
          &copy; {year} Resty S. Galido. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
