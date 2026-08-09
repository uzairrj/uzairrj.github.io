import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { useFetch } from '../hooks/useFetch';
import './reviewer.css';

type ReviewEntry = { id: string; name: string; org: string };
type ReviewerData = { conferences: ReviewEntry[]; journals: ReviewEntry[] };

function ReviewItem({
  item,
  globalIndex,
}: {
  item: ReviewEntry;
  globalIndex: number;
}) {
  return (
    <motion.div
      className="rev-item"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: globalIndex * 0.07 }}
    >
      <span className="rev-num">{String(globalIndex + 1).padStart(2, '0')}</span>
      <div className="rev-body">
        <span className="rev-name">{item.name}</span>
        <span className="rev-org">{item.org}</span>
      </div>
    </motion.div>
  );
}

function ReviewGroup({
  label,
  items,
  startIndex,
}: {
  label: string;
  items: ReviewEntry[];
  startIndex: number;
}) {
  return (
    <div className="rev-group">
      <div className="rev-group-label">{label}</div>
      <div className="rev-list">
        {items.map((item, i) => (
          <ReviewItem key={item.id} item={item} globalIndex={startIndex + i} />
        ))}
      </div>
    </div>
  );
}

function Reviewer() {
  const data = useFetch<ReviewerData | null>('/data/reviewer.json', null);
  if (!data) return null;
  return (
    <Section num="05" title="Reviewer Experience">
      <div className="rev-groups">
        <ReviewGroup label="Conferences" items={data.conferences} startIndex={0} />
        <ReviewGroup label="Journals" items={data.journals} startIndex={data.conferences.length} />
      </div>
    </Section>
  );
}

export default Reviewer;
