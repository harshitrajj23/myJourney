"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { landingPhrases } from "@/data/timeline";

const colors = [
  "from-purple-400 via-violet-400 to-fuchsia-500",
  "from-cyan-400 via-blue-400 to-indigo-500",
  "from-pink-400 via-rose-400 to-red-400",
  "from-emerald-400 via-teal-400 to-cyan-500",
  "from-amber-400 via-orange-400 to-red-500",
  "from-violet-400 via-purple-500 to-indigo-600",
  "from-teal-400 via-cyan-400 to-blue-500",
  "from-fuchsia-400 via-pink-500 to-rose-500",
];

export default function AnimatedTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const advancePhrase = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % landingPhrases.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(advancePhrase, 3000);
    return () => clearInterval(interval);
  }, [advancePhrase]);

  const currentPhrase = landingPhrases[currentIndex];
  const currentColor = colors[currentIndex % colors.length];

  return (
    <div className="h-16 md:h-20 lg:h-24 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="flex items-center justify-center"
        >
          <span
            className={`text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${currentColor} bg-clip-text text-transparent`}
            style={{
              textShadow: "0 0 40px rgba(168, 85, 247, 0.3)",
              filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.2))",
            }}
          >
            {currentPhrase.split("").map((char, i) => (
              <motion.span
                key={`${currentIndex}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.03,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block"
                style={{ minWidth: char === " " ? "0.3em" : undefined }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
