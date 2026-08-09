import { motion } from 'framer-motion';
import { Section } from '../../components/ui/Section';
import './TimelineSection.css';

export type TimelineItem = {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description?: string;
  bullets?: string[];
};

function TimelineRow({ item, index }: { item: TimelineItem; index: number }) {
  return (
    <motion.div
      className="tl-row"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="tl-date">{item.date}</div>
      <div className="tl-rail">
        <div className="tl-dot" />
        <div className="tl-line" />
      </div>
      <div className="tl-content">
        <div className="tl-title">{item.title}</div>
        <div className="tl-subtitle">{item.subtitle}</div>
        {item.description && <p className="tl-desc">{item.description}</p>}
        {item.bullets && (
          <ul className="tl-bullets">
            {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export function TimelineSection({
  num,
  label,
  items,
}: {
  num: string;
  label: string;
  items: TimelineItem[];
}) {
  return (
    <Section num={num} title={label}>
      <div className="tl-timeline">
        {items.map((item, i) => (
          <TimelineRow key={item.id} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
