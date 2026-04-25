'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Use window.scrollY for better compatibility
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add listener with passive option for performance
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    // Initial check in case page is already scrolled
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-[100] w-16 h-16 bg-accent text-background border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(26,24,20,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center group"
          aria-label="Back to top"
        >
          <ArrowUp size={32} strokeWidth={3} className="group-hover:-translate-y-1 transition-transform" />
          <span className="absolute -top-12 left-0 bg-foreground text-background text-[9px] font-black uppercase italic px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            RETURN_TO_SUMMIT
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
