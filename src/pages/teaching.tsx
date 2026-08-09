import { useFetch } from '../hooks/useFetch';
import { TimelineSection, type TimelineItem } from '../componenets/section/TimelineSection';

function Teaching() {
  const items = useFetch<TimelineItem[]>('/data/teaching.json', []);
  return <TimelineSection num="03" label="Teaching" items={items} />;
}

export default Teaching;
