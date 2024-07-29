"use client"; // Mark this component as a Client Component

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="p-10 mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
      <Link href="/about" legacyBehavior>
        <a href="#"
          className={`group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
            isActive("/about") ? "bg-gray-200 dark:bg-neutral-800" : ""
          }`}
        >
          <h2 className="mb-3 text-2xl font-semibold">
            About{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            It's all about me.
          </p>
        </a>
      </Link>

      <Link href="/skills" legacyBehavior>
        <a href="#"
          className={`group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
            isActive("/skills") ? "bg-gray-200 dark:bg-neutral-800" : ""
          }`}
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Skills{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            List of skills I learned.
          </p>
        </a>
      </Link>

      <Link href="/maintenance" legacyBehavior>
        <a href="#"
          className={`group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
            isActive("/projects") ? "bg-gray-200 dark:bg-neutral-800" : ""
          }`}
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Projects{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            List of projects developed.
          </p>
        </a>
      </Link>

      <Link href="/maintenance" legacyBehavior>
        <a href="#"
          className={`group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
            isActive("/resume") ? "bg-gray-200 dark:bg-neutral-800" : ""
          }`}
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Resume{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Download my resume.
          </p>
        </a>
      </Link>
    </nav>
  );
}
