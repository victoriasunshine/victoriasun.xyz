"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    title: "UCI Legacy Robotics",
    year: "2026",
    role: "Autonomous Navigation Subteam",
    description:
      "Short project description goes here. Replace this with what you worked on, what tools you used, and what the project explores.",
    image: "/images/UCI_Legacy_Robotics_logo.png",
    href: "/projects/legacy-robotics",
    direction: "left",
  },
  {
    title: "Personal Portfolio",
    year: "2026",
    role: "Design + Frontend Development",
    description:
      "Short project description goes here. Replace this with what you learned while rebuilding your personal website in Next.js.",
    image: "/images/project-placeholder.jpg",
    href: "/projects/personal-portfolio",
    direction: "right",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-8 text-neutral-100 md:px-16">
      {/* Header */}
      <header>
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.18em]">
          <Link
            href="/"
            className="text-neutral-100 transition-colors duration-300 hover:text-neutral-300"
          >
            Victoria Sun
          </Link>

          <span className="text-neutral-600">\</span>

          <span className="font-serif italic text-[#c49aae]">projects</span>
        </div>

        <section className="mt-28 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.34em] text-neutral-500">
            Selected Works
          </p>

          <h1 className="mt-5 text-4xl uppercase tracking-[0.12em] text-neutral-100 md:text-5xl">
            Projects
          </h1>

          <p className="mt-6 text-sm leading-7 text-neutral-400">
            Project description intro goes here. You can use this space to frame
            the page as an archive of technical work, experiments, research, and
            software projects.
          </p>
        </section>

        <div className="mt-16 h-px w-full bg-neutral-800" />
      </header>

      {/* Project list */}
      <section className="mt-20 space-y-24">
        {projects.map((project) => {
          const fromLeft = project.direction === "left";

          return (
            <motion.article
                key={project.title}
                initial={{ opacity: 0, x: fromLeft ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="border-b border-neutral-800 py-10"
                >
                <div
                    className={`grid max-w-5xl gap-10 md:items-center ${
                    fromLeft
                        ? "md:grid-cols-[420px_1fr]"
                        : "ml-auto md:grid-cols-[1fr_420px]"
                    }`}
                >
                    {/* Image */}
                    <div className={`${fromLeft ? "" : "md:order-2"}`}>
                    <div className="aspect-[4/3] w-full max-w-[420px] bg-neutral-900/80">
                        <img
                        src={project.image}
                        alt=""
                        className="h-full w-full object-cover opacity-70 grayscale"
                        />
                    </div>
                    </div>

                    {/* Text */}
                    <div className={`${fromLeft ? "" : "md:order-1"}`}>
                    <h2 className="text-2xl uppercase tracking-[0.12em] text-neutral-100">
                        {project.title}{" "}
                        <span className="font-serif italic tracking-normal text-[#c49aae]">
                        | {project.year}
                        </span>
                    </h2>

                    <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-neutral-500">
                        {project.role}
                    </p>

                    <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400">
                        {project.description}
                    </p>

                    <Link
                        href={project.href}
                        className="mt-8 inline-block text-[10px] uppercase tracking-[0.32em] text-neutral-500 transition-colors duration-300 hover:text-[#c49aae]"
                    >
                        See More
                    </Link>
                    </div>
                </div>
                </motion.article>
          );
        })}
      </section>
    </main>
  );
}