import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './verticalNav.css';

const NAV_ITEMS = [
  { id: 'section-home',         label: 'Home' },
  { id: 'section-education',    label: 'Education' },
  { id: 'section-experience',   label: 'Experience' },
  { id: 'section-teaching',     label: 'Teaching' },
  { id: 'section-publications', label: 'Publications' },
  { id: 'section-reviewer',     label: 'Reviewer' },
  { id: 'section-honors',       label: 'Honours & Awards' },
  { id: 'section-skills',       label: 'Skills' },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function VerticalNav() {
  const [activeId, setActiveId] = useState('section-home');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const ratios: Record<string, number> = {};

    const observers = NAV_ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            ratios[id] = e.intersectionRatio;
          });
          const best = Object.entries(ratios).sort((a, b) => b[1] - a[1])[0];
          if (best && best[1] > 0) setActiveId(best[0]);
        },
        { threshold: [0, 0.1, 0.25, 0.5], rootMargin: '-10% 0px -10% 0px' }
      );

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <nav className="vnav">
      {/* Monogram */}
      <button
        className="vnav-monogram"
        onClick={() => scrollTo('section-home')}
        aria-label="Back to top"
      >
        UK
      </button>

      {/* Rail */}
      <div className="vnav-rail">
        {NAV_ITEMS.map(({ id, label }, i) => {
          const isActive = id === activeId;
          const isHovered = id === hoveredId;
          const isLast = i === NAV_ITEMS.length - 1;

          return (
            <div key={id} className="vnav-stop">
              {/* Connector line above the dot (except first) */}
              {i > 0 && <div className="vnav-line" />}

              {/* Dot + tooltip row */}
              <div
                className="vnav-dot-row"
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => scrollTo(id)}
              >
                <motion.div
                  className={`vnav-dot ${isActive ? 'vnav-dot--active' : ''}`}
                  animate={
                    isActive
                      ? { scale: 1.4, boxShadow: '0 0 10px rgba(255,255,86,0.7)' }
                      : { scale: 1, boxShadow: '0 0 0px rgba(255,255,86,0)' }
                  }
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                />

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      className="vnav-tooltip"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.15 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Connector line below the dot (except last) */}
              {!isLast && <div className="vnav-line" />}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default VerticalNav;
