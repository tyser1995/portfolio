"use client"; // Mark this component as a Client Component

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FaQuestionCircle, FaUserCog, FaTools } from "react-icons/fa";

export default function Navigation() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleNavigationClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    path: string
  ) => {
    e.preventDefault();
    setIsLoading(true);
    window.location.href = path;
  };

  const isActive = (path: string) => pathname === path;

  const handleMouseEnter = (link: string) => setHoveredLink(link);
  const handleMouseLeave = () => setHoveredLink(null);

  return (
    <nav className="p-10 mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
      <Link href="/about" legacyBehavior>
        <a
          href="#"
          onClick={(e) => handleNavigationClick(e, "/about")}
          onMouseEnter={() => handleMouseEnter("about")}
          onMouseLeave={handleMouseLeave}
          className={`group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
            isActive("/about") ? "bg-gray-200 dark:bg-neutral-800" : ""
          }`}
        >
          <h2
            className={
              hoveredLink === "about"
                ? "mb-3 text-2xl font-semibold flex items-center justify-center"
                : "mb-3 text-2xl font-semibold"
            }
          >
            {hoveredLink === "about" ? (
              <FaQuestionCircle className="w-16 h-16 text-center mr-2" />
            ) : (
              <>
                {"About "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </>
            )}
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            It's all about me.
          </p>
        </a>
      </Link>

      <Link href="/skills" legacyBehavior>
        <a
          href="#"
          onClick={(e) => handleNavigationClick(e, "/skills")}
          onMouseEnter={() => handleMouseEnter("skills")}
          onMouseLeave={handleMouseLeave}
          className={`group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
            isActive("/skills") ? "bg-gray-200 dark:bg-neutral-800" : ""
          }`}
        >
          <h2
            className={
              hoveredLink === "skills"
                ? "mb-3 text-2xl font-semibold flex items-center justify-center"
                : "mb-3 text-2xl font-semibold"
            }
          >
            {hoveredLink === "skills" ? (
              <FaUserCog className="w-16 h-16 text-center mr-2" />
            ) : (
              <>
                {"Skills "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </>
            )}
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            List of skills I learned.
          </p>
        </a>
      </Link>

      <Link href="/maintenance" legacyBehavior>
        <a
          href="#"
          onClick={(e) => handleNavigationClick(e, "/maintenance")}
          onMouseEnter={() => handleMouseEnter("projects")}
          onMouseLeave={handleMouseLeave}
          className={`group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
            isActive("/projects") ? "bg-gray-200 dark:bg-neutral-800" : ""
          }`}
        >
          <h2
            className={
              hoveredLink === "projects"
                ? "mb-3 text-2xl font-semibold flex items-center justify-center"
                : "mb-3 text-2xl font-semibold"
            }
          >
            {hoveredLink === "projects" ? (
              <FaTools className="w-16 h-16 text-center mr-2" />
            ) : (
              <>
                {"Projects "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </>
            )}
          </h2>

          {hoveredLink === "projects" ? (
            <>{"Under Maintenance"}</>
          ) : (
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              List of projects developed.
            </p>
          )}
        </a>
      </Link>

      <Link href="/maintenance" legacyBehavior>
        <a
          href="#"
          onClick={(e) => handleNavigationClick(e, "/maintenance")}
          onMouseEnter={() => handleMouseEnter("resume")}
          onMouseLeave={handleMouseLeave}
          className={`group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
            isActive("/resume") ? "bg-gray-200 dark:bg-neutral-800" : ""
          }`}
        >
          <h2
            className={
              hoveredLink === "resume"
                ? "mb-3 text-2xl font-semibold flex items-center justify-center"
                : "mb-3 text-2xl font-semibold"
            }
          >
            {hoveredLink === "resume" ? (
              <FaTools className="w-16 h-16 text-center mr-2" />
            ) : (
              <>
                {"Resume "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </>
            )}
          </h2>
          {hoveredLink === "resume" ? (
            <>{"Under Maintenance"}</>
          ) : (
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Download my resume.
            </p>
          )}
        </a>
      </Link>

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
    </nav>
  );
}
