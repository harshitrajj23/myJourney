"use client";

import AnimatedTitle from "./AnimatedTitle";
import EnterButton from "./EnterButton";

interface CinematicIntroProps {
  onEnter: () => void;
}

export default function CinematicIntro({ onEnter }: CinematicIntroProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[#050507]">
      {/* Ambient Radial Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 75%)",
          }}
        />
        <div
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(168, 85, 247, 0.1) 60%, transparent 80%)",
          }}
        />
        {/* Subtle dot matrix grid */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.6) 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* Vignette Effect */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center gap-8">
        {/* Subtle top label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-mono">
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
        <p className="text-sm md:text-base text-white/50 max-w-md font-light tracking-wide mt-4">
          An immersive journey through code, hackathons, and building under
          pressure.
        </p>

        {/* Enter Button */}
        <div className="mt-8">
          <EnterButton onClick={onEnter} />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050507] to-transparent z-[3] pointer-events-none" />
    </div>
  );
}
