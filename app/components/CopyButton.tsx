"use client";

import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy to clipboard"}
      className={`p-1.5 rounded-lg border transition-all duration-200 text-xs
        ${copied
          ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
          : "border-neutral-700 text-slate-500 hover:text-slate-300 hover:border-neutral-500 bg-black/20"
        }`}
    >
      {copied ? <FaCheck className="w-3 h-3" /> : <FaCopy className="w-3 h-3" />}
    </button>
  );
}
