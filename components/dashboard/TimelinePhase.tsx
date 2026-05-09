"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import CinematicGallery from "@/components/dashboard/CinematicGallery";
import MagneticButton from "@/components/ui/MagneticButton";
import { getImagePaths } from "@/lib/utils";
import type { TimelinePhase as TimelinePhaseType } from "@/data/timeline";

interface TimelinePhaseProps {
  phase: TimelinePhaseType;
}

// Visual theme evolution based on phase order
function getPhaseStyles(order: number) {
  if (order <= 1) {
    // Build & Conquer — transformative, purple appears
    return {
      accentColor: "purple-400",
      glowColor: "rgba(168, 85, 247, 0.08)",
      secondaryGlow: "rgba(192, 132, 252, 0.05)",
      badgeClass: "text-purple-400/70 border-purple-400/20 bg-purple-400/5",
      headingGradient: "text-gradient-purple",
      tagClass: "text-purple-300/60 border-purple-400/15 bg-purple-400/5",
    };
  } else if (order <= 3) {
    // Growth phase — purple + cyan
    return {
      accentColor: "violet-400",
      glowColor: "rgba(139, 92, 246, 0.07)",
      secondaryGlow: "rgba(6, 182, 212, 0.04)",
      badgeClass: "text-violet-400/70 border-violet-400/20 bg-violet-400/5",
      headingGradient: "text-gradient-purple",
      tagClass: "text-violet-300/60 border-violet-400/15 bg-violet-400/5",
    };
  } else if (order <= 6) {
    // Maturity phase — richer tones
    return {
      accentColor: "cyan-400",
      glowColor: "rgba(6, 182, 212, 0.06)",
      secondaryGlow: "rgba(168, 85, 247, 0.04)",
      badgeClass: "text-cyan-400/70 border-cyan-400/20 bg-cyan-400/5",
      headingGradient: "text-gradient-cyan",
      tagClass: "text-cyan-300/60 border-cyan-400/15 bg-cyan-400/5",
    };
  } else {
    // Premium phase — full evolution
    return {
      accentColor: "purple-300",
      glowColor: "rgba(168, 85, 247, 0.08)",
      secondaryGlow: "rgba(236, 72, 153, 0.04)",
      badgeClass: "text-purple-300/70 border-purple-300/20 bg-purple-300/5",
      headingGradient: "text-gradient-multi",
      tagClass: "text-purple-200/60 border-purple-300/15 bg-purple-300/5",
    };
  }
}

export default function TimelinePhase({ phase }: TimelinePhaseProps) {
  const styles = getPhaseStyles(phase.order);
  const images = getImagePaths(phase.imageFolder);

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden shrink-0"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${styles.glowColor} 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, ${styles.secondaryGlow} 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left — Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="order-2 md:order-1 relative z-20 pr-0 md:pr-4 lg:pr-8"
          >
            {images.length > 0 && (
              <CinematicGallery images={images} alt={phase.title} />
            )}
          </motion.div>

          {/* Right — Narrative + Project */}
          <div className="order-1 md:order-2 flex flex-col justify-center pl-0 md:pl-4 lg:pl-10">
            {/* Phase header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="mb-8 md:mb-10"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs tracking-[0.2em] uppercase text-white/30 font-mono">
                  Phase {String(phase.order + 1).padStart(2, "0")}
                </span>
                {phase.achievement && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${styles.badgeClass}`}
                  >
                    🏆 {phase.achievement}
                  </span>
                )}
              </div>
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2`}
              >
                <span className={styles.headingGradient}>{phase.title}</span>
              </h2>
              <p className="text-white/40 text-sm md:text-base">{phase.event}</p>
            </motion.div>

            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">
                    {phase.narrative}
                  </p>
                </div>
              </motion.div>

              {phase.project && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <GlassCard className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white/80">{phase.project}</h4>
                        {phase.github && (
                          <MagneticButton>
                            <a
                              href={phase.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          </MagneticButton>
                        )}
                      </div>
                      <p className="text-white/40 text-xs md:text-sm line-clamp-2">
                        {phase.description}
                      </p>
                      {phase.techStack && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {phase.techStack.map((tech) => (
                            <span key={tech} className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider ${styles.tagClass}`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
