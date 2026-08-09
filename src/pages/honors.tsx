import { useFetch } from '../hooks/useFetch';
import { TimelineSection, type TimelineItem } from '../componenets/section/TimelineSection';

function Honors() {
  const items = useFetch<TimelineItem[]>('/data/honors.json', []);
  return <TimelineSection num="06" label="Honours & Awards" items={items} />;
}

export default Honors;
