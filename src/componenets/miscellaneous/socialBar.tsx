import "./socialBar.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
  faKaggle,
  faHackerrank,
  faLinkedin,
  faGoogleScholar,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faDownload } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const ICON_MAP: Record<string, IconDefinition> = {
  envelope:       faEnvelope,
  linkedin:       faLinkedin,
  github:         faGithub,
  "google-scholar": faGoogleScholar,
  kaggle:         faKaggle,
  hackerrank:     faHackerrank,
  facebook:       faFacebook,
  instagram:      faInstagram,
};

export type SocialLink = {
  id: string;
  icon: string;
  href: string;
  label: string;
};

const hoverProps = {
  scale: 1.1,
  color: "rgb(255, 255, 255)",
  transition: { duration: 0.5, type: "spring", stiffness: 120 },
};

type SocialBarProps = {
  links: SocialLink[];
  cvUrl: string;
};

function SocialBar({ links, cvUrl }: SocialBarProps) {
  return (
    <motion.div
      className="social-bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.a
        href={cvUrl}
        download
        className="cv-button"
        whileHover={{ scale: 1.05, transition: { duration: 0.3, type: "spring", stiffness: 200 } }}
      >
        <FontAwesomeIcon icon={faDownload} />
        Download CV
      </motion.a>

      {links.map(({ id, icon, href, label }) => {
        const faIcon = ICON_MAP[icon];
        if (!faIcon) return null;
        return (
          <motion.a
            key={id}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            whileHover={hoverProps}
          >
            <FontAwesomeIcon icon={faIcon} />
          </motion.a>
        );
      })}
    </motion.div>
  );
}

export default SocialBar;