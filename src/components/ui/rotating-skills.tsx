'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skills = [
  "IoT Development", "Full-Stack Web", "Arduino Programming", 
  "Python", "JavaScript", "AI/ML", "Embedded Systems",
  "DevOps", "Cloud AWS", "Control Systems", "Next.js", "React"
];

export default function RotatingSkills() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % skills.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex items-center align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={skills[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-text font-display font-semibold text-xl md:text-2xl tracking-tight block whitespace-nowrap"
        >
          {skills[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
