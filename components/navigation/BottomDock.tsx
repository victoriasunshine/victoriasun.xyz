"use client";
type TabId = "home" | "projects" | "fun" | "contact";

const navItems : {id: TabId; label : string} []= [
  { id: "home", label: "HOME" },
  { id: "projects", label: "PROJECTS" },
  { id: "fun", label: "FUN" },
  { id: "contact", label: "CONTACT" },
];

type BottomDockProps = {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
};

export function BottomDock({ activeTab, setActiveTab }: BottomDockProps) {

  return (
    <nav className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-neutral-950/30 px-4 py-2 sm:px-6 md:px-7 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.03)]">
        <ul className="flex items-center gap-6 sm:gap-10 md:gap-16">
            {navItems.map((item) => {
          const isActive = item.id === activeTab;

          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}

                className={`
                  font-serif italic uppercase
                  text-[13px] font-light
                  leading-none tracking-[0.28em]
                  transition-colors duration-300
                  ${
                    isActive
                      ? "text-[#c49aae]"
                      : "text-neutral-400 hover:text-neutral-200"
                  }
                `}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}