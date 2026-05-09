"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { lerp } from "@/lib/utils";

interface EnterButtonProps {
  onClick: () => void;
}

export default function EnterButton({ onClick }: EnterButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = lerp(0, (e.clientX - centerX) * 0.3, 0.5);
      const y = lerp(0, (e.clientY - centerY) * 0.3, 0.5);
      setPosition({ x, y });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      className="group relative px-8 py-4 md:px-10 md:py-5 rounded-full cursor-pointer select-none"
    >
      {/* Glow background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isHovered
            ? "0 0 40px rgba(168, 85, 247, 0.5), 0 0 80px rgba(168, 85, 247, 0.2), inset 0 0 20px rgba(168, 85, 247, 0.1)"
            : "0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(168, 85, 247, 0.1)",
        }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(6, 182, 212, 0.1))",
          border: "1px solid rgba(168, 85, 247, 0.3)",
          backdropFilter: "blur(16px)",
        }}
      />

      {/* Pulse ring */}
      <motion.div
        className="absolute inset-[-2px] rounded-full"
        animate={{
          boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.2)",
            "0 0 40px rgba(168, 85, 247, 0.4)",
            "0 0 20px rgba(168, 85, 247, 0.2)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          border: "1px solid rgba(168, 85, 247, 0.2)",
        }}
      />

      {/* Text */}
      <span className="relative z-10 text-sm md:text-base font-medium tracking-wider text-white/90 group-hover:text-white transition-colors duration-300">
        Enter My Journey
      </span>

      {/* Arrow icon */}
      <motion.span
        className="relative z-10 inline-block ml-2 text-white/70 group-hover:text-white"
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        →
      </motion.span>
    </motion.button>
  );
}
