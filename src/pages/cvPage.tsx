import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faDownload,
  faPrint,
  faEnvelope,
  faPhone,
  faGraduationCap,
  faMapMarkerAlt,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useFetch } from '../hooks/useFetch';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import './cvPage.css';

type Profile = {
  name: string;
  intro: string;
  cvUrl: string;
  social: Array<{ id: string; label: string; href: string }>;
};

type EducationItem = {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
};

type ExperienceItem = {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  bullets: string[];
};

type TeachingItem = {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  bullets: string[];
};

type PublicationItem = {
  id: string;
  authors: string;
  title: string;
  venue: string;
  details: string;
  year: string;
  status: 'published' | 'accepted';
};

type ReviewEntry = { id: string; name: string; org: string };
type ReviewerData = { conferences: ReviewEntry[]; journals: ReviewEntry[] };

type HonorItem = {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
};

type SkillCategory = { id: string; category: string; items: string[] };

const EMPTY_PROFILE: Profile = { name: '', intro: '', cvUrl: '/cv.pdf', social: [] };

function formatAuthors(authors: string) {
  return authors.replace('U. Khan', '<strong class="tex-author-self">U. Khan</strong>');
}

function parseEducationSubtitle(subtitle: string) {
  const parts = subtitle.split('·').map((s) => s.trim());
  const uni = parts[0] || '';
  const location = parts[1] || '';
  const grade = parts[2] || '';
  return { uni, location, grade };
}

function CvPage() {
  const profile = useFetch<Profile>('/data/profile.json', EMPTY_PROFILE);
  const education = useFetch<EducationItem[]>('/data/education.json', []);
  const experience = useFetch<ExperienceItem[]>('/data/experience.json', []);
  const teaching = useFetch<TeachingItem[]>('/data/teaching.json', []);
  const publications = useFetch<PublicationItem[]>('/data/publications.json', []);
  const reviewer = useFetch<ReviewerData>('/data/reviewer.json', { conferences: [], journals: [] });
  const honors = useFetch<HonorItem[]>('/data/honors.json', []);
  const skills = useFetch<SkillCategory[]>('/data/skills.json', []);

  const [pages, setPages] = useState<string[]>([]);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    document.title = 'Uzair Khan - Curriculum Vitae';
  }, []);

  // Dynamic layout bin-packing manager based on browser DOM heights
  useEffect(() => {
    let active = true;
    let frameId: number;
    let prevHeight = 0;
    let stableFrames = 0;

    const checkStabilityAndCalculate = () => {
      if (!active) return;
      const source = document.querySelector('.cv-source-flow') as HTMLElement;
      if (!source) {
        frameId = requestAnimationFrame(checkStabilityAndCalculate);
        return;
      }

      const children = Array.from(source.children) as HTMLElement[];
      if (children.length === 0) {
        frameId = requestAnimationFrame(checkStabilityAndCalculate);
        return;
      }

      // Calculate total height sum of all child elements in source flow
      const currentTotalHeight = children.reduce((sum, child) => sum + child.offsetHeight, 0);

      // If the heights are still settling or 0, layout is unstable
      if (currentTotalHeight === 0 || currentTotalHeight !== prevHeight) {
        prevHeight = currentTotalHeight;
        stableFrames = 0;
        frameId = requestAnimationFrame(checkStabilityAndCalculate);
        return;
      }

      // Require 3 consecutive frames with the exact same height to confirm stability
      stableFrames++;
      if (stableFrames < 3) {
        frameId = requestAnimationFrame(checkStabilityAndCalculate);
        return;
      }

      // Layout is stable! Perform page packing
      const calculatedPages: HTMLElement[][] = [[]];
      let currentPageIndex = 0;
      let currentHeight = 0;

      children.forEach((child) => {
        // Measure outer height including computed CSS margins (fixes layout spillage calculations)
        const style = window.getComputedStyle(child);
        const marginTop = parseFloat(style.marginTop) || 0;
        const marginBottom = parseFloat(style.marginBottom) || 0;
        const childHeight = child.offsetHeight + marginTop + marginBottom;

        // Dynamic page budget: Page 1 budget is 980px to push the 3rd bullet,
        // Page 2 budget is 1002px to contain the remaining content without clipping References.
        const pageBudget = currentPageIndex === 0 ? 980 : 1002;

        const isSectionTitle = child.classList.contains('tex-section-header');
        const exceedsHeight = currentHeight + childHeight > pageBudget;
        
        // Prevent orphan headers near page breaks (allow 80px threshold)
        const orphanHeader = isSectionTitle && (currentHeight + childHeight + 80 > pageBudget);

        if ((exceedsHeight || orphanHeader) && calculatedPages[currentPageIndex].length > 0) {
          currentPageIndex++;
          calculatedPages.push([]);
          currentHeight = 0;
        }

        calculatedPages[currentPageIndex].push(child);
        currentHeight += childHeight;
      });

      const pageHtmlStrings = calculatedPages.map(pageNodes =>
        pageNodes.map(node => node.outerHTML).join('')
      );

      setPages(pageHtmlStrings);
      setIsLayoutReady(true);
    };

    // Wait for fonts to load first, then run stability measurements to ensure exact layout metrics
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (active) {
          frameId = requestAnimationFrame(checkStabilityAndCalculate);
        }
      });
    } else {
      setTimeout(() => {
        if (active) {
          frameId = requestAnimationFrame(checkStabilityAndCalculate);
        }
      }, 300);
    }

    return () => {
      active = false;
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [education, experience, teaching, publications, reviewer, honors, skills, profile]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    const container = document.querySelector('.cv-document-viewport') as HTMLElement;
    if (!container) return;

    const clone = container.cloneNode(true) as HTMLElement;
    clone.style.display = 'block';
    clone.style.padding = '0';
    clone.style.margin = '0';
    clone.style.gap = '0';
    clone.style.background = '#ffffff';

    const pagesList = clone.querySelectorAll('.cv-paper-page');
    pagesList.forEach((p, idx) => {
      const el = p as HTMLElement;
      const isLast = idx === pagesList.length - 1;
      const heightVal = isLast ? '295mm' : '297mm';
      
      el.style.width = '210mm';
      el.style.height = heightVal;
      el.style.maxHeight = heightVal;
      el.style.boxShadow = 'none';
      el.style.margin = '0';
      el.style.borderRadius = '0';
      el.style.padding = '1.5cm';
      el.style.boxSizing = 'border-box';
      el.style.overflow = 'hidden';
      
      const content = el.querySelector('.cv-page-content') as HTMLElement;
      if (content) {
        content.style.height = '100%';
        content.style.maxHeight = '100%';
        content.style.overflow = 'hidden';
      }

      // Clear all manual page breaks to let the exact 297mm blocks paginate naturally
      el.style.setProperty('page-break-before', 'avoid', 'important');
      el.style.setProperty('break-before', 'avoid', 'important');
      el.style.setProperty('page-break-after', 'avoid', 'important');
      el.style.setProperty('break-after', 'avoid', 'important');
    });

    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    const opt = {
      margin: 0,
      filename: 'Uzair_Khan_CV.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff', windowWidth: 794 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    html2pdf()
      .set(opt)
      .from(clone)
      .save()
      .then(() => {
        if (document.body.contains(wrapper)) document.body.removeChild(wrapper);
      })
      .catch(() => {
        if (document.body.contains(wrapper)) document.body.removeChild(wrapper);
      });
  };

  const techSkills = skills.filter((s) => s.id !== 'research');
  const researchDomain = skills.find((s) => s.id === 'research');

  return (
    <div className="cv-page-container">
      {/* Top Header Bar */}
      <header className="cv-page-header no-print">
        <Link to="/" className="cv-back-btn">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back to Portfolio</span>
        </Link>
        <h1 className="cv-page-title">Uzair Khan — Curriculum Vitae</h1>
        <div className="cv-header-actions">
          <button onClick={handlePrint} className="cv-action-btn cv-print-btn">
            <FontAwesomeIcon icon={faPrint} />
            <span>Print</span>
          </button>
          <button onClick={handleDownloadPdf} className="cv-action-btn cv-download-btn">
            <FontAwesomeIcon icon={faDownload} />
            <span>Download PDF</span>
          </button>
        </div>
      </header>

      {/* Offscreen Source Flow for Spacing Measurements with inline styles to prevent CSS parsing delays */}
      {/* Set to position: fixed, zIndex: -999, opacity: 0.001 to keep it in the active rendering viewport tree */}
      <div className="cv-source-flow" style={{
        position: 'fixed',
        left: '0',
        top: '0',
        zIndex: -999,
        opacity: 0.001,
        pointerEvents: 'none',
        width: '210mm',
        padding: '1.5cm',
        boxSizing: 'border-box',
        fontSize: '9pt',
        lineHeight: '13pt',
        fontFamily: "'LMRoman10', 'Computer Modern Serif', 'CMU Serif', serif",
        backgroundColor: '#ffffff',
        color: '#323232'
      }}>
        
        {/* Header */}
        <div className="tex-header">
          <h1 className="tex-name">{profile.name || 'Uzair Khan'}</h1>
          <div className="tex-contact-row">
            <span className="tex-contact-item">
              <FontAwesomeIcon icon={faCalendarAlt} className="tex-icon" /> Date of birth: 27/11/1995
            </span>
            <span className="tex-contact-item">
              <FontAwesomeIcon icon={faPhone} className="tex-icon" /> Phone number: (+39) 3245413144
            </span>
            <span className="tex-contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="tex-icon" /> Email: <a href="mailto:uzair.khan@univr.it">uzair.khan@univr.it</a>
            </span>
          </div>
          <div className="tex-contact-row">
            <span className="tex-contact-item">
              <FontAwesomeIcon icon={faGraduationCap} className="tex-icon" /> Google Scholar: <a href="https://scholar.google.com/citations?user=PAsg9gsAAAAJ&hl=en" target="_blank" rel="noreferrer">Uzair Khan</a>
            </span>
            <span className="tex-contact-item">
              <FontAwesomeIcon icon={faGithub} className="tex-icon" /> Github: <a href="https://github.com/uzairrj" target="_blank" rel="noreferrer">https://github.com/uzairrj</a>
            </span>
          </div>
          <div className="tex-contact-row" style={{ marginBottom: '0.3em' }}>
            <span className="tex-contact-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="tex-icon" /> Work: Laboratorio ICE - UniVR Via Santa Teresa, 12, 37134 Verona (Italy)
            </span>
          </div>
        </div>

        {/* Education and Training */}
        {education.length > 0 && (
          <>
            <div className="tex-section-header">
              <h2 className="tex-section-title">Education and Training</h2>
              <div className="tex-rule"></div>
            </div>
            {education.map((item) => {
              const { uni, location, grade } = parseEducationSubtitle(item.subtitle);
              const isThesis = item.description && item.description.includes('Thesis:');
              const thesisParts = isThesis ? item.description.split('Thesis:') : ['', item.description];
              const thesisTitle = isThesis ? thesisParts[1].split('.')[0] + '.' : '';
              const bodyDesc = isThesis ? thesisParts[1].substring(thesisTitle.length).trim() : item.description;

              return (
                <div key={item.id} className="tex-entry">
                  <div className="tex-entry-line1">
                    <strong>{item.title}</strong>
                  </div>
                  <div className="tex-entry-line2">
                    <em>{uni}</em>
                    <span className="tex-entry-date">[{item.date}]</span>
                  </div>
                  {(location || grade) && (
                    <div className="tex-entry-meta">
                      {location && (
                        <span>
                          City: {location.split(',')[0].trim()} &emsp; Country: {location.split(',')[1]?.trim() || 'Italy'}
                        </span>
                      )}
                      {grade && <span> &emsp; <strong>Final grade:</strong> {grade.replace('Grade:', '').trim()}</span>}
                    </div>
                  )}
                  {isThesis && (
                    <div className="tex-entry-desc">
                      <strong>Thesis:</strong> {thesisTitle}
                    </div>
                  )}
                  {bodyDesc && <div className="tex-entry-desc">{bodyDesc}</div>}
                </div>
              );
            })}
          </>
        )}

        {/* Honours and Awards */}
        {honors.length > 0 && (
          <>
            <div className="tex-section-header">
              <h2 className="tex-section-title">Honours and Awards</h2>
              <div className="tex-rule"></div>
            </div>
            {honors.map((item) => {
              const uniName = item.subtitle.split('·')[0].trim();
              return (
                <div key={item.id} className="tex-entry">
                  <div className="tex-entry-line1">
                    <strong>{uniName}</strong>
                  </div>
                  <div className="tex-entry-desc">
                    <strong>{item.title}:</strong> {item.description}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* Personal Qualities & Interests */}
        <>
          <div className="tex-section-header">
            <h2 className="tex-section-title">Personal Qualities &amp; Interests</h2>
            <div className="tex-rule"></div>
          </div>
          <div className="tex-skills-container">
            <strong>Technical Skills</strong>
            {techSkills.map((cat) => (
              <div key={cat.id} className="tex-skill-line">
                <strong>{cat.category}:</strong> {cat.items.join(', ')}
              </div>
            ))}
            
            {researchDomain && (
              <div className="tex-skill-line" style={{ marginTop: '4px' }}>
                <strong>Research Domain</strong><br />
                {researchDomain.items.join(', ')}
              </div>
            )}
          </div>
        </>

        {/* Research Experiences */}
        {/* Decompose experience entries using Fragment (not wrapper div) to allow page breaks to occur INSIDE bullets dynamically */}
        {experience.length > 0 && (
          <>
            <div className="tex-section-header">
              <h2 className="tex-section-title">Research Experiences</h2>
              <div className="tex-rule"></div>
            </div>
            {experience.map((item) => (
              <Fragment key={item.id}>
                {/* 1. Header node */}
                <div className="tex-entry-header" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="tex-entry-line1">
                    <strong>{item.title}</strong>
                    <span className="tex-entry-date">[{item.date}]</span>
                  </div>
                  <div className="tex-entry-line2">
                    <em>{item.subtitle}</em>
                  </div>
                </div>
                {/* 2. Sibling bullet nodes */}
                {item.bullets && item.bullets.map((bullet, i) => (
                  <div className="tex-entry-bullet" key={i} style={{ display: 'block', marginBottom: i === item.bullets.length - 1 ? '1ex' : '0' }}>
                    <ul className="tex-bullets" style={{ marginTop: i === 0 ? '2pt' : '0' }}>
                      <li>{bullet}</li>
                    </ul>
                  </div>
                ))}
              </Fragment>
            ))}
          </>
        )}

        {/* Teaching Experiences */}
        {teaching.length > 0 && (
          <>
            <div className="tex-section-header">
              <h2 className="tex-section-title">Teaching Experiences</h2>
              <div className="tex-rule"></div>
            </div>
            {teaching.map((item) => (
              <div key={item.id} className="tex-entry">
                <div className="tex-entry-line1">
                  <strong>{item.title}</strong>
                  <span className="tex-entry-date">[{item.date}]</span>
                </div>
                <div className="tex-entry-line2" style={{ marginBottom: '2pt' }}>
                  <em>{item.subtitle}</em>
                </div>
                {item.bullets && item.bullets.map((b, idx) => (
                  <ol className="tex-numbered-list" key={idx} style={{ counterReset: `item ${idx}` }}>
                    <li>{b}</li>
                  </ol>
                ))}
              </div>
            ))}
          </>
        )}

        {/* Selected Publications */}
        {publications.length > 0 && (
          <>
            <div className="tex-section-header">
              <h2 className="tex-section-title">Selected Publications</h2>
              <div className="tex-rule"></div>
            </div>
            <div style={{ marginTop: '2pt' }}>
              {publications.map((pub, idx) => (
                <ol className="tex-numbered-list" key={pub.id} style={{ counterReset: `item ${idx}` }}>
                  <li className="tex-pub-li">
                    <span dangerouslySetInnerHTML={{ __html: formatAuthors(pub.authors) }} />. “{pub.title}.” <em>{pub.venue}</em>
                    {pub.details ? `, ${pub.details}` : ''}, {pub.year}.
                    {pub.status === 'accepted' && ' (Accepted)'}
                  </li>
                </ol>
              ))}
            </div>
          </>
        )}

        {/* Reviewer Experiences */}
        {(reviewer.conferences?.length > 0 || reviewer.journals?.length > 0) && (
          <>
            <div className="tex-section-header">
              <h2 className="tex-section-title">Reviewer Experiences</h2>
              <div className="tex-rule"></div>
            </div>
            {reviewer.conferences && reviewer.conferences.length > 0 && (
              <>
                <div style={{ fontWeight: 'bold' }}>Conferences</div>
                <div style={{ marginTop: '2pt' }}>
                  {reviewer.conferences.map((c, idx) => (
                    <ol className="tex-numbered-list" key={c.id} style={{ counterReset: `item ${idx}` }}>
                      <li>{c.name}, {c.org}</li>
                    </ol>
                  ))}
                </div>
              </>
            )}
            {reviewer.journals && reviewer.journals.length > 0 && (
              <>
                <div style={{ fontWeight: 'bold', marginTop: '1ex' }}>Journals</div>
                <div style={{ marginTop: '2pt' }}>
                  {reviewer.journals.map((j, idx) => (
                    <ol className="tex-numbered-list" key={j.id} style={{ counterReset: `item ${idx}` }}>
                      <li>{j.name}, {j.org}</li>
                    </ol>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* References */}
        <>
          <div className="tex-section-header">
            <h2 className="tex-section-title">References</h2>
            <div className="tex-rule"></div>
          </div>
          <div className="tex-references-grid">
            <div className="tex-ref-col">
              <strong>Marco Cristani</strong><br />
              Full Professor, University of Verona, Italy<br />
              Email: <a href="mailto:marco.cristani@univr.it">marco.cristani@univr.it</a>
            </div>
            <div className="tex-ref-col">
              <strong>Francesco Setti</strong><br />
              Associate Professor, University of Verona, Italy<br />
              Email: <a href="mailto:francesco.setti@univr.it">francesco.setti@univr.it</a>
            </div>
          </div>
        </>

      </div>

      {/* Visible Viewport containing exact A4 pages */}
      <div className="cv-document-viewport">
        {isLayoutReady ? (
          pages.map((pageHtml, idx) => (
            <div className="cv-paper-page" key={idx}>
              <div className="cv-page-content" dangerouslySetInnerHTML={{ __html: pageHtml }} />
            </div>
          ))
        ) : (
          <div className="cv-loading">Compiling LaTeX document...</div>
        )}
      </div>
    </div>
  );
}

export default CvPage;