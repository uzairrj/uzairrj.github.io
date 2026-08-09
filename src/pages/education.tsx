import { useFetch } from '../hooks/useFetch';
import { TimelineSection, type TimelineItem } from '../componenets/section/TimelineSection';

function Education() {
  const items = useFetch<TimelineItem[]>('/data/education.json', []);
  return <TimelineSection num="01" label="Education" items={items} />;
}

export default Education;