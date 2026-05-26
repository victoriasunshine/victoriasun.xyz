"use client";
import { BottomDock } from "@/components/navigation/BottomDock";
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
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-100">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-55"
        style={{
          backgroundImage: "url('/images/background_home.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/55" />
     
      
      {/* Center readability vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.34)_24%,rgba(0,0,0,0)_55%)]" />
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
            transition={{ duration: 0.01

             }}
            className="text-center"
          >
          <div className="text-center">
            <div className="text-center">
              <h1 className="text-5xl font-medium uppercase tracking-[0.14em] text-neutral-100">
                      Victoria Sun
              </h1>

                    
              <div className="mt-6 space-y-2 text-[11px] uppercase tracking-[0.34em]">
                <p className="text-neutral-300">Computer Science</p>

                <p className="text-neutral-400">
                  UC Irvine,{" "}
                  <span className="text-neutral-500">Donald Bren School</span>
                </p>
              </div>
            </div>
          {/* buttons */}
          <div className="mt-10 flex items-center justify-center gap-8 text-[11px] uppercase tracking-[0.3em]">
            <a
              href="/files/Resume_12_2025.pdf"
              target="_blank"
              className="text-neutral-500 transition-colors duration-300 hover:text-[#c49aae]"
            >
              CV
            </a>

            <span className="text-neutral-700">•</span>

            <a
              href="https://github.com/victoriasunshine"
              target="_blank"
              className="text-neutral-500 transition-colors duration-300 hover:text-[#c49aae]"
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
            className="max-w-xl rounded-3xl border border-white/10 bg-black/30 px-10 py-8 text-center backdrop-blur-xl"
          >
            <p className="text-[10px] uppercase tracking-[0.38em] text-[#c49aae]">
              {panelContent[activeTab].eyebrow}
            </p>

            <h2 className="mt-4 font-serif text-4xl italic tracking-[0.12em] text-neutral-100">
              {panelContent[activeTab].title}
            </h2>

            <p className="mt-5 text-sm whitespace-pre-line leading-7 text-neutral-400">
              {panelContent[activeTab].body}
            </p>

            {activeTab == "contact" && (
              <div className="mt-8 flex items-center justify-center gap-5">
              <a
                href="mailto:victoriasun1230@gmail.com"
                className="text-neutral-500 transition-colors duration-300 hover:text-[#c49aae]"
              >
                <Mail size={18} strokeWidth={1.25} />
              </a>

              <a
                href="https://linkedin.com/in/YOURPROFILE"
                target="_blank"
                className="text-neutral-500 transition-colors duration-300 hover:text-[#c49aae]"
              >
                <FaLinkedinIn size={18} strokeWidth={1.25} />
              </a>
              </div>
            )}

            {activeTab !== "contact" && (
              <a
                href={`/${activeTab}`}
                className="mt-8 inline-block text-[10px] uppercase tracking-[0.32em] text-neutral-400 transition-colors hover:text-[#c49aae]"
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