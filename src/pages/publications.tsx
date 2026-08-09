import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { useFetch } from '../hooks/useFetch';
import './publications.css';

type Publication = {
  id: string;
  authors: string;
  title: string;
  venue: string;
  details: string;
  year: string;
  status: 'published' | 'accepted';
};

function highlightAuthor(authors: string) {
  return authors.replace('U. Khan', '<strong>U. Khan</strong>');
}

function PublicationItem({ pub, index }: { pub: Publication; index: number }) {
  return (
    <motion.div
      className="pub-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <span className="pub-num">{String(index + 1).padStart(2, '0')}</span>
      <div className="pub-body">
        <div className="pub-title">{pub.title}</div>
        <div
          className="pub-authors"
          dangerouslySetInnerHTML={{ __html: highlightAuthor(pub.authors) }}
        />
        <div className="pub-venue">
          <em>{pub.venue}</em>
          {pub.details && <span> · {pub.details}</span>}
          <span className="pub-year"> · {pub.year}</span>
          {pub.status === 'accepted' && <span className="pub-badge">Accepted</span>}
        </div>
      </div>
    </motion.div>
  );
}

function Publications() {
  const pubs = useFetch<Publication[]>('/data/publications.json', []);
  return (
    <Section num="04" title="Publications">
      <div className="pub-list">
        {pubs.map((p, i) => (
          <PublicationItem key={p.id} pub={p} index={i} />
        ))}
      </div>
    </Section>
  );
}

export default Publications;
