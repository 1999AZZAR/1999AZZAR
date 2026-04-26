'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 5. Liquid Cursor Logic: 0.15s easing lag
  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const followerX = useSpring(mouseX, springConfig);
  const followerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 5. Constraint: Disable on touch or small screens
    const checkStatus = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmall = window.innerWidth < 1024;
      setIsDisabled(isTouch || isSmall);
    };

    checkStatus();
    window.addEventListener('resize', checkStatus);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isActionable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.group'); // Group captures our cards

      setIsHovering(!!isActionable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkStatus);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isDisabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* 5. Main Dot (8px) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* 5. Follower (32px) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(139, 26, 26, 0.1)' : 'rgba(139, 26, 26, 0)',
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
