/*
app/page.tsx
Landing Page
4 options at the bottom of the screen
----
home option gives name, resume, and link to github
projects opens a card that navs to portfolio
fun opens a card that navs to
    a personal blog
    with other features too
contact opens a card with email and linkedin
*/
"use client";
import { BottomDock } from "@/components/navigation/BottomDock";
import { SignatureAnimation } from "@/components/SignatureAnimation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";


type TabId = "home" | "projects" | "fun" | "contact";

const panelContent = {
  projects: {
    eyebrow: "SELECTED WORKS",
    title: "projects",
    body: "Currently Working On : \nUCI Legacy Robotics Autonomous Navigation Subteam \nPersonal Portfolio",
  },
  fun: {
    eyebrow: "PERSONAL INTERESTS",
    title: "just a little blog...",
    body: "Books, playlists, movies, and notes on the things I keep returning to outside of code.",
  },
  contact: {
    eyebrow: "GET IN TOUCH",
    title: "contact",
    body: "Find my email, GitHub, CV, and other places where my work lives.",
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* Foreground content */}
      {/* HOME */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <AnimatePresence mode="wait">
        {activeTab === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.01 }}
            className="text-center"
          >
          <div className="text-center">
            <div className="text-center">
              <SignatureAnimation />


              <div className="-mt-6 space-y-2 text-[11px] uppercase tracking-[0.34em]">
                <p className="text-ink">Computer Science</p>

                <p className="text-ink-light">
                  UC Irvine,{" "}
                  <span className="text-ink-light">Donald Bren School</span>
                </p>
              </div>
            </div>
          {/* buttons */}
          <div className="mt-10 flex items-center justify-center gap-8 text-[11px] uppercase tracking-[0.3em]">
            <a
              href="/files/Resume.pdf"
              target="_blank"
              className="text-ink-light transition-colors duration-300 hover:text-dust-blue"
            >
              Resume
            </a>

            <span className="text-ink-faint">•</span>

            <a
              href="https://github.com/victoriasunshine"
              target="_blank"
              className="text-ink-light transition-colors duration-300 hover:text-dust-blue"
            >
              GitHub
            </a>
          </div>
          </div>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-xl rounded-3xl border border-ink-faint/40 bg-cream-dark/80 px-10 py-8 text-center backdrop-blur-sm"
          >
            <p className="text-[10px] uppercase tracking-[0.38em] text-dust-blue">
              {panelContent[activeTab].eyebrow}
            </p>

            <h2 className="mt-4 font-serif text-4xl italic tracking-[0.12em] text-ink">
              {panelContent[activeTab].title}
            </h2>

            <p className="mt-5 text-sm whitespace-pre-line leading-7 text-ink-light">
              {panelContent[activeTab].body}
            </p>

            {activeTab == "contact" && (
              <div className="mt-8 flex items-center justify-center gap-5">
              <a
                href="mailto:victoriasun1230@gmail.com"
                className="text-ink-light transition-colors duration-300 hover:text-dust-blue"
              >
                <Mail size={18} strokeWidth={1.25} />
              </a>

              <a
                href="https://linkedin.com/in/victoriasun1230"
                target="_blank"
                className="text-ink-light transition-colors duration-300 hover:text-dust-blue"
              >
                <FaLinkedinIn size={18} strokeWidth={1.25} />
              </a>
              </div>
            )}

            {activeTab !== "contact" && (
              <a
                href={`/${activeTab}`}
                className="mt-8 inline-block text-[10px] uppercase tracking-[0.32em] text-ink-light transition-colors hover:text-dust-blue"
              >
                See More
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
        <BottomDock activeTab={activeTab} setActiveTab={setActiveTab} />

        </div>
    </main>
  );
}
