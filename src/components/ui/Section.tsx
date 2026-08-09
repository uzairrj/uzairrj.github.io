import './Section.css';
import { SectionHeader } from './SectionHeader';

type SectionProps = {
  num: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ num, title, children }: SectionProps) {
  return (
    <section className="page-section">
      <SectionHeader num={num} title={title} />
      {children}
    </section>
  );
}
