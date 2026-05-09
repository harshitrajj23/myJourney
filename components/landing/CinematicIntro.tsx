"use client";

import { useRef, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import EnterButton from "./EnterButton";

interface CinematicIntroProps {
  onEnter: () => void;
}

export default function CinematicIntro({ onEnter }: CinematicIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — video will show first frame
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Cinematic Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/animations/journeybg.mp4"
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-[1]" />

      {/* Vignette Effect */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center gap-8">
        {/* Subtle top label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-mono">
            The Journey of
          </p>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-2">
          Harshit{" "}
          <span className="text-gradient-multi">Raj</span>
        </h1>

        {/* Animated cycling text */}
        <AnimatedTitle />

        {/* Tagline */}
        <p className="text-sm md:text-base text-white/40 max-w-md font-light tracking-wide mt-4">
          An immersive journey through code, hackathons, and building under
          pressure.
        </p>

        {/* Enter Button */}
        <div className="mt-8">
          <EnterButton onClick={onEnter} />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[3]" />
    </div>
  );
}
