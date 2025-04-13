import { useState } from "react";
import { motion } from "framer-motion";
import "./navBar.css";

const navItems = [
  { text: "Home", link: "/" },
  { text: "Education", link: "/education" },
  { text: "Experience", link: "/experience" },
  { text: "Publications", link: "/publications" },
];

function NavBar() {
  const [activeLink, setActiveLink] = useState("/education"); // Default active link
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <nav className="navBar">
      {navItems.map(({ text, link }) => {
        const isActive = link === activeLink;
        const isHovered = link === hoveredLink;
        const isDimmed = hoveredLink && !isHovered;

        return (
          <div
            key={link}
            className="navItemWrapper"
            onMouseEnter={() => setHoveredLink(link)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {(isActive || isHovered) && (
              <motion.div
                layoutId="navBackground"
                className="navBarItemBackground"
                transition={{ type: "spring", stiffness: 2000, damping: 10, mass: 0.1}}
              />
            )}
                <a
                  href={link}
                  className={`navBarLink  ${isActive && !isDimmed ? "navBarLinkActive" : ""} ${isHovered ? "navBarLinkActive" : ""}`}
                  onClick={() => setActiveLink(link)}
                >
              {text}
            </a>
          </div>
        );
      })}
    </nav>
  );
}

export default NavBar;
