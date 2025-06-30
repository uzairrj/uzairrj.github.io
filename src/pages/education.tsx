import './education.css'
import { motion } from 'framer-motion';


function EducationContent({title, institution, date, description}: {
  title: string;
  institution: string;
  date: string;
  description: string;
}) {
  return (
    <div>
       <h3 className='education-title'>{title}</h3>
        <p className='education-institution'>{institution}</p>
        <p className='education-date'>{date}</p>
        <p className='education-description'>{description}</p>
    </div>
  )
}

function UnderlineLink( {href, text}: {
  href: string;
  text: string;
}) {
  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: "100%" }
  };
  return (
    <motion.a
      href={href}
      className="education-navbar-link"
      initial="hidden"
      whileHover="visible"
    >
      {text}
      <motion.span
        className="underline"
        variants={underlineVariants}
        transition={{ duration: 0.3 }}
      ></motion.span>
    </motion.a>
  )
}


function Education() {
  return (
    <div className="education-container">
      <div className="education-navbar">
        <ul className="education-navbar-list">
          <UnderlineLink href="#bachelors" text="Bachelors" />
          <UnderlineLink href="#masters" text="Masters" />
          <UnderlineLink href="#certifications" text="Ph. D" />
        </ul>
      </div>
      <EducationContent 
        title='Bachelors in Computer Science' 
        institution='COMSATS University Islamabad' 
        date='Spring 2016 - Spring 2019' 
        description="Graduated with a Bachelor's degree in Computer Science, specializing in software development and data structures. Completed various projects including a web application for managing student records and a mobile app for task management." />
    </div>
  );
}

export default Education;