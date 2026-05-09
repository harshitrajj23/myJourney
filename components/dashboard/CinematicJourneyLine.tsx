"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function CinematicJourneyLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress for the path drawing
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 15,
    restDelta: 0.001
  });

  // We'll create a long wavy path that travels down the page
  // The path data will be a series of curves
  const pathData = `
    M 50,0
    Q 80,100 50,200
    T 50,400
    T 50,600
    T 50,800
    T 50,1000
    T 50,1200
    T 50,1400
    T 50,1600
    T 50,1800
    T 50,2000
    T 50,2200
    T 50,2400
    T 50,2600
    T 50,2800
    T 50,3000
    T 50,3200
    T 50,3400
    T 50,3600
    T 50,3800
    T 50,4000
    T 50,4200
    T 50,4400
    T 50,4600
    T 50,4800
    T 50,5000
  `;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-full pointer-events-none z-0 overflow-visible">
      <svg
        viewBox="0 0 100 5000"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full opacity-80"
      >
        {/* Subtler Static background path */}
        <path
          d={pathData}
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        
        {/* Animated glowing path */}
        <motion.path
          ref={pathRef}
          d={pathData}
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            pathLength: pathLength,
            filter: "blur(1px) drop-shadow(0 0 15px rgba(6, 182, 212, 0.9)) drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))",
          }}
        />

        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Floating nodes could be added here mapped to phases */}
    </div>
  );
}
