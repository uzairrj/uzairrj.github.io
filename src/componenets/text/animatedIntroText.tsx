import { useEffect, useState, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './animatedIntroText.css';

type AnimatedIntroTextProps = {
  text: string;
  replacements: {
    [key: string]: string[];
  };
};

function AnimatedWord({ words, color }: { words: string[], color: string }) {
  const [index, setIndex] = useState(Math.floor(Math.random() * words.length));
  

  useEffect(() => {
    const randomInterval = (Math.random() * 20000)+4000;
    console.log(randomInterval);
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * words.length));
    }, randomInterval); 
    return () => clearInterval(interval);
  }, [words]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ rotateX: 90 }}
        animate={{ rotateX: 0 }}
        exit={{ rotateX: -90, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="animated-word"
        style={{
          color,
          display: "inline-block",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden", // optional but recommended
        }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}

function AnimatedIntroText({ text, replacements }: AnimatedIntroTextProps) {
  const brightColors = [
    "#ff5656", 
    "#ffaa56", 
    "#ffdd56", 
    "#d4ff56",
    "#56ff56",
    "#56ffd4", 
    "#56ffff", 
    "#56d4ff", 
    "#5699ff", 
    "#8656ff", 
    "#c456ff", 
    "#ff56ff",
    "#ff56c4",
    "#ff567d",
    "#ffc456",
  ];
  
  const parseText = () => {
    const parts: (string | JSX.Element)[] = [];
    const regex = /<p\d+>/g;
    let lastIndex = 0;

    text.replace("<name>", (match, offset) => {
      if (lastIndex < offset) {
        parts.push(text.slice(lastIndex, offset));
      }

      parts.push(<span key={offset} className="name">{replacements[match]}</span>);

      lastIndex = offset + match.length;
      return match
    })

    text.replace(regex, (match, offset) => {
      if (lastIndex < offset) {
        parts.push(text.slice(lastIndex, offset));
      }

      if (replacements[match]) {
        const randomColor = brightColors[Math.floor(Math.random() * brightColors.length)];
        parts.push(<AnimatedWord color={randomColor} key={offset} words={replacements[match]} />);
      } else {
        parts.push(match);
      }

      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    console.log(parts);

    return parts;
  };

  return (
    <div className="text-container">
      <p>{parseText()}</p>
    </div>
  );
}

export default AnimatedIntroText;
