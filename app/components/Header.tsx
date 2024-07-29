"use client"; // Mark this component as a Client Component

import { CodeIcon, DesktopComputerIcon } from "@heroicons/react/solid";
import styles from "../styles/global.css"; // Adjust the path as necessary
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" legacyBehavior>
        <a href="#"
          className={`group rounded-lg px-5 py-4 transition-colors`}
        >
          <h1 className={styles.title}>Hi! I'm Resty</h1>
        </a>
      </Link>
     
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <DesktopComputerIcon className="w-6 h-6 text-sky-500" />
          <span className="ml-2">Software Developer</span>
        </div>
        <span className="separator">&nbsp; • &nbsp;</span>
        <div className="flex items-center">
          <CodeIcon className="w-6 h-6 text-sky-500" />
          <span className="ml-2">Web Developer</span>
        </div>
      </div>
    </header>
  );
}