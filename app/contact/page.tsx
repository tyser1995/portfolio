import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FaViber, FaWhatsapp, FaEnvelope, FaCopy } from "react-icons/fa";
import CopyButton from "../components/CopyButton";

const contacts = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/galidoresty",
    href: "https://www.linkedin.com/in/galidoresty/",
    icon: <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />,
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10 hover:bg-blue-500/15",
    glow: "hover:shadow-blue-500/10",
    description: "Connect with me professionally",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/tyser1995",
    href: "https://github.com/tyser1995",
    icon: <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />,
    color: "text-slate-200",
    border: "border-slate-500/30",
    bg: "bg-slate-500/10 hover:bg-slate-500/15",
    glow: "hover:shadow-slate-500/10",
    description: "Check out my repositories",
    external: true,
  },
  {
    label: "Viber",
    value: "+63 977 887 7083",
    href: "viber://chat?number=639778877083",
    icon: <FaViber className="w-6 h-6" />,
    color: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10 hover:bg-purple-500/15",
    glow: "hover:shadow-purple-500/10",
    description: "Message me on Viber",
    external: false,
    copyValue: "+639778877083",
  },
  {
    label: "WhatsApp",
    value: "+63 977 887 7083",
    href: "https://wa.me/639778877083",
    icon: <FaWhatsapp className="w-6 h-6" />,
    color: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-green-500/10 hover:bg-green-500/15",
    glow: "hover:shadow-green-500/10",
    description: "Chat with me on WhatsApp",
    external: true,
    copyValue: "+639778877083",
  },
  {
    label: "Email",
    value: "restygalido05@gmail.com",
    href: "mailto:restygalido05@gmail.com",
    icon: <FaEnvelope className="w-6 h-6" />,
    color: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10 hover:bg-sky-500/15",
    glow: "hover:shadow-sky-500/10",
    description: "Send me an email",
    external: false,
    copyValue: "restygalido05@gmail.com",
  },
];

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-6 md:p-12">
      <Header />
      <Navigation />

      <div className="w-full max-w-4xl flex flex-col gap-6">

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-200">Get in Touch</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
            Feel free to reach out through any of the platforms below — whether it&apos;s
            a project collaboration, a capstone inquiry, or just to say hello. I&apos;m
            always happy to connect.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map((c) => (
            <div
              key={c.label}
              className={`group flex flex-col gap-4 rounded-xl border ${c.border} ${c.bg} p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${c.glow}`}
            >
              {/* Icon + label */}
              <div className="flex items-center gap-3">
                <span className={`${c.color}`}>{c.icon}</span>
                <div>
                  <p className={`font-semibold ${c.color}`}>{c.label}</p>
                  <p className="text-xs text-slate-500">{c.description}</p>
                </div>
              </div>

              {/* Value + actions */}
              <div className="flex items-center justify-between gap-2">
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className={`text-sm font-mono text-slate-300 hover:${c.color} transition-colors duration-200 truncate`}
                >
                  {c.value}
                </a>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {c.copyValue && <CopyButton value={c.copyValue} />}
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${c.border} ${c.color} bg-black/20 hover:bg-black/40 transition-colors duration-200`}
                  >
                    Open
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-neutral-600 text-center pt-2">
          Response time is usually within 24 hours.
        </p>
      </div>
    </main>
  );
}
