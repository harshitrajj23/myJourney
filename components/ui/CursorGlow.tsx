"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] mix-blend-screen"
      animate={{
        x: position.x - 200,
        y: position.y - 200,
        opacity: isVisible ? 0.5 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
        mass: 0.5,
        opacity: { duration: 0.3 },
      }}
      style={{
        width: 400,
        height: 400,
        background:
          "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  );
}
