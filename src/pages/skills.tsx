import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { useFetch } from '../hooks/useFetch';
import './skills.css';

type SkillCategory = { id: string; category: string; items: string[] };

function SkillPill({ item, delay }: { item: string; delay: number }) {
  return (
    <motion.span
      className="skills-pill"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay }}
    >
      {item}
    </motion.span>
  );
}

function SkillRow({ cat, rowIndex }: { cat: SkillCategory; rowIndex: number }) {
  return (
    <motion.div
      className="skills-row"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: rowIndex * 0.08 }}
    >
      <div className="skills-cat-label">{cat.category}</div>
      <div className="skills-pills">
        {cat.items.map((item, ii) => (
          <SkillPill key={item} item={item} delay={rowIndex * 0.08 + ii * 0.04} />
        ))}
      </div>
    </motion.div>
  );
}

function Skills() {
  const categories = useFetch<SkillCategory[]>('/data/skills.json', []);
  return (
    <Section num="07" title="Skills">
      <div className="skills-grid">
        {categories.map((cat, ci) => (
          <SkillRow key={cat.id} cat={cat} rowIndex={ci} />
        ))}
      </div>
    </Section>
  );
}

export default Skills;
