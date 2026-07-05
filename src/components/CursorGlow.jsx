import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  
  // Spring settings for smooth physics-based inertia
  const springConfig = { damping: 30, stiffness: 180 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      // 200px offset to center the 400px glow on the cursor tip
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 hidden md:block w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,rgba(168,85,247,0.06)_40%,transparent_75%)] blur-[45px]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
}
