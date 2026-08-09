import { useFetch } from '../hooks/useFetch';
import { TimelineSection, type TimelineItem } from '../componenets/section/TimelineSection';

function Experience() {
  const items = useFetch<TimelineItem[]>('/data/experience.json', []);
  return <TimelineSection num="02" label="Research Experience" items={items} />;
}

export default Experience;
