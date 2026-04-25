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
    <span className="h-14 md:h-24 overflow-hidden inline-flex items-center align-middle ml-2 py-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={skills[index]}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="text-accent font-black italic uppercase tracking-tighter block whitespace-nowrap leading-tight"
        >
          {skills[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}