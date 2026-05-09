"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveWaterBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isHovering) setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovering]);

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        src="/animations/wtaerbg.mp4"
      />

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-[#050505]/90" />

      {/* Interactive Glow / Ripple Effect that follows the mouse */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-40 mix-blend-color-dodge transition-opacity duration-500"
        animate={{
          x: mousePos.x - 300, // Center the 600px div
          y: mousePos.y - 300,
          opacity: isHovering ? 0.3 : 0,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 200,
          mass: 0.5,
        }}
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(168,85,247,0.4) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
