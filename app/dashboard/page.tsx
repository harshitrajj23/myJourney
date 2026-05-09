"use client";

import Link from "next/link";

import HeroSection from "@/components/dashboard/HeroSection";
import BeforeEngineering from "@/components/dashboard/BeforeEngineering";
import EngineeringEntry from "@/components/dashboard/EngineeringEntry";
import DSAPhase from "@/components/dashboard/DSAPhase";
import CinematicPhase from "@/components/dashboard/CinematicPhase";
import CinematicJourneyLine from "@/components/dashboard/CinematicJourneyLine";
import { timelinePhases } from "@/data/timeline";

export default function DashboardPage() {
  return (
    <div className="w-full relative bg-[#050507]">
      {/* Persistent SVG Journey Line (Snake Line) */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <CinematicJourneyLine />
      </div>

      <div className="relative z-10 flex flex-col">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Before Engineering */}
        <BeforeEngineering />

        {/* 3. Engineering Entry */}
        <EngineeringEntry />

        {/* 4. DSA Phase */}
        <DSAPhase />

        {/* 5+. Hackathon Timeline Phases (Immersive Fullscreen Panels) */}
        {timelinePhases.map((phase, index) => (
          <CinematicPhase key={phase.id} phase={phase} index={index} />
        ))}

        {/* End section */}
        <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden py-32">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center">
            <p className="text-xs tracking-[0.3em] uppercase text-purple-400/50 font-mono mb-6">
              The Journey Continues
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              <span className="text-gradient-multi">
                Pressure Reveals Skill
              </span>
            </h2>
            <p className="text-white/30 max-w-xl mx-auto leading-relaxed text-base md:text-lg mb-12">
              This isn&apos;t just a portfolio. It&apos;s the documented evolution of
              someone who builds under pressure, ships through chaos, and
              turns every failure into fuel.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <a
                href="https://github.com/harshitrajj23"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.08] transition-all duration-500 text-white/60 hover:text-white/90"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <Link
                href="/beyond-studies"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 hover:border-cyan-400/60 hover:from-cyan-500/20 hover:to-purple-500/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-500 text-cyan-300 hover:text-cyan-100 font-medium"
              >
                What I did apart from studies →
              </Link>
            </div>
          </div>
          
          <footer className="absolute bottom-0 left-0 right-0 py-8 border-t border-white/5 w-full">
            <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/20">
              <p>© {new Date().getFullYear()} Harshit Raj. Built with pressure.</p>
              <p className="font-mono">Pressure reveals skill.</p>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
