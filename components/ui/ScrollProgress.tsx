"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
        boxShadow: "0 0 15px rgba(139, 92, 246, 0.6), 0 0 30px rgba(6, 182, 212, 0.4)",
      }}
    />
  );
}
