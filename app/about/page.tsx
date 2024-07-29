import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Image from "next/image";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Navigation />
      <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 items-center">
        <div className="flex-shrink-0 mx-auto md:mx-0 p-4 md:p-8">
          <Image
            className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
            src="/profile_enhance_no_img.png"
            alt="Resty"
            width={384}
            height={512}
          />
        </div>
        <div className="pt-6 md:pt-8 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p className="text-md font-medium">
              Hi! I'm Resty S. Galido, a dedicated Software Developer and Web
              Developer with extensive experience working across various
              industries, ranging from academic institutions to IT companies.
            </p>
          </blockquote>
          <blockquote>
            <p className="text-md font-medium">
              My journey has equipped me with a robust set of skills in both
              software and web development, allowing me to deliver tailored
              solutions that meet the unique needs of each client. My approach
              to development is rooted in a deep understanding of the latest
              technologies and a commitment to continuous learning. Whether it's
              developing a sophisticated web application or streamlining
              software processes, I strive to provide efficient and innovative
              solutions. While I may not claim to be the best, my passion for
              technology drives me to give my utmost effort in every project,
              ensuring that I contribute meaningfully to my clients' success.
            </p>
          </blockquote>
          <blockquote>
            <p className="text-md font-medium">
              I am always eager to collaborate and assist others in overcoming
              their technological challenges.
            </p>
          </blockquote>
          <figcaption className="font-medium">
            <div className="text-sky-500 dark:text-sky-400">
              Resty S. Galido
            </div>
            <div className="text-slate-700 dark:text-slate-500">
              Software/Web Developer
            </div>
          </figcaption>
        </div>
      </figure>
    </main>
  );
}
