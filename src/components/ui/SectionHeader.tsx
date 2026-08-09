import { motion } from 'framer-motion';
import './SectionHeader.css';

type SectionHeaderProps = { num: string; title: string };

export function SectionHeader({ num, title }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <motion.span
        className="section-num"
        initial={{ fontSize: '13px' }}
        whileInView={{ fontSize: '48px' }}
        viewport={{ once: false, margin: '-15% 0px -15% 0px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {num}
      </motion.span>
      <motion.h2
        className="section-title"
        initial={{ y: 16 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
