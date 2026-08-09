import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./navBar.css";

const navItems = [
  { text: "Home",        id: "section-home" },
  { text: "Education",   id: "section-education" },
  { text: "Experience",  id: "section-experience" },
  { text: "Teaching",    id: "section-teaching" },
  { text: "Publications",id: "section-publications" },
  { text: "Reviewer",    id: "section-reviewer" },
  { text: "Honours",     id: "section-honors" },
  { text: "Skills",      id: "section-skills" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function NavBar() {
  const [activeId, setActiveId] = useState("section-home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Track which section is in view
  useEffect(() => {
    const sectionIds = navItems.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    const latestVisible: Record<string, number> = {};

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            latestVisible[id] = entry.intersectionRatio;
            // Pick the section with the highest ratio
            const best = Object.entries(latestVisible).sort(
              (a, b) => b[1] - a[1]
            )[0];
            if (best && best[1] > 0) setActiveId(best[0]);
          });
        },
        { threshold: [0, 0.1, 0.25, 0.5], rootMargin: "-10% 0px -10% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="navBar">
      {navItems.map(({ text, id }) => {
        const isActive = id === activeId;
        const isHovered = id === hoveredId;
        const showBg = isActive || isHovered;

        return (
          <div
            key={id}
            className="navItemWrapper"
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => {
              setActiveId(id);
              scrollToSection(id);
            }}
          >
            {showBg && (
              <motion.div
                layoutId="navBackground"
                className="navBarItemBackground"
                transition={{ type: "spring", stiffness: 2000, damping: 10, mass: 0.1 }}
              />
            )}
            <span
              className={`navBarLink ${isActive && !isHovered ? "navBarLinkActive" : ""} ${isHovered ? "navBarLinkActive" : ""}`}
            >
              {text}
            </span>
          </div>
        );
      })}
    </nav>
  );
}

export default NavBar;
