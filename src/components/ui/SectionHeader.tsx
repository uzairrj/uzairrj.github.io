import { motion } from 'framer-motion';
import './SectionHeader.css';

type SectionHeaderProps = { num: string; title: string };

export function SectionHeader({ num, title }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <span className="section-num">{num}</span>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
