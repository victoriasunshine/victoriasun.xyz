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
    <nav className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 rounded-full border border-ink-faint/40 bg-cream-dark/80 px-4 py-2 sm:px-6 md:px-7 backdrop-blur-sm shadow-sm">
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
                      ? "text-dust-blue"
                      : "text-ink-light hover:text-ink"
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