import { useState } from "react";
import { motion } from "framer-motion";
import "./navBar.css";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const navItems = [
  { text: "Home", link: "/" },
  { text: "Education", link: "/education" },
  { text: "Experience", link: "/experience" },
  { text: "Publications", link: "/publications" },
];

const arrowsAnimation = {
    scale: 1.5, 
    transition:{duration:0.7, type:"spring", stiffness:120}
}

function NavBar() {
  const [activeLink, setActiveLink] = useState("/education"); // Default active link
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <nav className="navBar">
     <motion.a className="navBar-arrows" target="_blank" rel="noreferrer" 
        whileHover={arrowsAnimation} 
        onClick={() => {
            let currentActiveLinkIndex = navItems.findIndex((item => item.link === activeLink)) 

            if (currentActiveLinkIndex === 0) {
                setActiveLink(navItems[navItems.length - 1].link)
            }
            else{
                setActiveLink(navItems[currentActiveLinkIndex - 1].link)
            }

        }}
        >
            <FontAwesomeIcon icon={faAngleLeft} />
      </motion.a>
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
            onClick={() => setActiveLink(link)}
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
                >
              {text}
            </a>
          </div>
        );
      })}
      <motion.a className="navBar-arrows" target="_blank" rel="noreferrer" 
      whileHover={arrowsAnimation} 
      onClick={() => {
        let currentActiveLinkIndex = navItems.findIndex((item => item.link === activeLink)) 

        if (currentActiveLinkIndex === navItems.length - 1) {
            setActiveLink(navItems[0].link)
        }
        else{
            setActiveLink(navItems[currentActiveLinkIndex + 1].link)
        }

        }}
        >
            <FontAwesomeIcon icon={faAngleRight} />
      </motion.a>
    </nav>
  );
}

export default NavBar;
