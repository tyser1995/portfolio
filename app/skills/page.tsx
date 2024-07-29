import skillsData from "../../public/data/skills.json"; // Adjust the path as needed
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaPhp,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import { DiDotnet, DiLaravel, DiVisualstudio } from "react-icons/di"; // Import additional icons
import { HiCode } from "react-icons/hi";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiMysql,
  SiMicrosoftsqlserver,
  SiUmbraco,
  SiXero,
  SiZoho,
  SiJquery,
} from "react-icons/si";
import { GiTortoise } from "react-icons/gi";

// Add mapping for icons
const skillIcons = {
  ReactJS: FaReact,
  NodeJS: FaNodeJs,
  NextJS: RiNextjsFill,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  JavaScript: FaJsSquare,
  "C#": DiVisualstudio,
  "ASP.NET": DiDotnet,
  Laravel: DiLaravel,
  PHP: FaPhp,
  MySQL: SiMysql,
  MSSQL: SiMicrosoftsqlserver,
  "Umbraco CMS": SiUmbraco,
  "Zoho CRM": SiZoho,
  "Xero Application": SiXero,
  Git: FaGitAlt,
  Github: FaGithub,
  "Tortoise SVN": GiTortoise,
  JQuery:SiJquery
  // Add more mappings as needed
};

// Helper function to calculate years of experience
const calculateExperience = (startYear: number, endYear?: number) => {
  const currentYear = new Date().getFullYear();
  return (endYear || currentYear) - startYear;
};

// ProgressBar Component
const ProgressBar = ({
  label,
  startYear,
  endYear,
  Icon,
  iconClassName = "text-md", // Default size
}: {
  label: string;
  startYear: number;
  endYear?: number;
  Icon: React.ElementType;
  iconClassName?: string;
}) => {
  const experience = calculateExperience(startYear, endYear);
  const percentage = (experience / 7) * 100; // Adjust this if needed
  return (
    <div className="mb-4 flex items-center">
      <Icon className="text-2xl mr-2" />
      <div className="w-full">
        <div className="flex justify-between">
          <span>{label}</span>
          <span>
            {experience > 1 ? `${experience} years` : `${experience} year`}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Navigation />

      {/* Data start here */}
      <div className="min-h-screen p-4 w-full mx-auto">
        {skillsData.map((categoryData) => (
          <div key={categoryData.category} className="mb-8">
            <h2 className="mt-4 text-2xl font-semibold">
              {categoryData.category}
            </h2>
            <hr className="my-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {categoryData.skills.map((skill) => {
                const Icon = skillIcons[skill.label] || HiCode; // Fallback to a default icon component
                return (
                  <ProgressBar
                    key={skill.label}
                    label={skill.label}
                    startYear={skill.startYear}
                    endYear={skill.endYear}
                    Icon={Icon}
                    iconClassName="text-md" // Ensure consistent size
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
