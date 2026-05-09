"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getImagePaths } from "@/lib/utils";
import type { TimelinePhase as TimelinePhaseType } from "@/data/timeline";
import CinematicGallery from "./CinematicGallery";

interface CinematicPhaseProps {
  phase: TimelinePhaseType;
  index: number;
}

export default function CinematicPhase({ phase, index }: CinematicPhaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const images = getImagePaths(phase.imageFolder);
  
  // Rotate through 3 styles based on index
  const styleType = index % 3; // 0, 1, 2 (Styles A, B, C)
  const isWinner = ["cloudathon", "incseption", "push-pull-commit"].includes(phase.id);
  const isLeftNode = index % 2 === 0;

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax for background elements
      gsap.to(".parallax-bg", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Float animation for image clusters
      gsap.to(".floating-card", {
        y: -50,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // Horizontal reveal for large text
      gsap.from(".reveal-text", {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        }
      });

      if (isWinner) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          }
        });

        // Bloom and scale effect
        tl.fromTo(".winner-bloom", 
          { opacity: 0, scale: 0.8 }, 
          { opacity: 1, scale: 1.1, duration: 1.5, ease: "power2.out" }
        )
        .to(".winner-bloom", { opacity: 0, scale: 1, duration: 1.5, ease: "power2.inOut" }, "+=0.5")
        
        // Slight container zoom
        .fromTo(containerRef.current,
          { scale: 0.98 },
          { scale: 1, duration: 1.5, ease: "power2.out" },
          0
        );
        
        // Winner tag drop
        tl.fromTo(".winner-tag",
          { opacity: 0, y: -20, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "back.out(1.7)" },
          0.2
        )
        .to(".winner-tag", { opacity: 0, y: 10, duration: 1, ease: "power2.in" }, "+=2");
      }
    }, containerRef);

    return () => ctx.revert();
  }, [styleType, isWinner]);

  // RENDER STYLE A: SPLIT STORY (Text Left, Image Right)
  if (styleType === 0) {
    return (
      <section ref={containerRef} className={`relative min-h-screen w-full flex items-center justify-center py-32 overflow-hidden ${isWinner ? 'winner-section' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent parallax-bg" />
        
        {isWinner && (
          <div className="winner-bloom absolute inset-0 z-0 pointer-events-none opacity-0 flex items-center justify-center">
            <div className="w-full max-w-5xl h-[600px] bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 blur-[100px] rounded-[100%] mix-blend-screen" />
          </div>
        )}

        {/* Timeline Node & Date */}
        {phase.date && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className={`absolute top-12 z-30 flex items-center gap-4 ${isLeftNode ? 'left-6 md:left-12 lg:left-24' : 'right-6 md:right-12 lg:right-24 flex-row-reverse text-right'}`}
          >
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md animate-pulse"></div>
              <div className={`w-2 h-2 rounded-full ${isWinner ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,1)]' : 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'} z-10`}></div>
            </div>
            <div className="flex flex-col">
              <div className={`flex items-center gap-3 ${!isLeftNode ? 'flex-row-reverse' : ''}`}>
                <span className={`text-sm font-mono tracking-[0.2em] uppercase ${isWinner ? 'text-amber-300' : 'text-cyan-400/80'}`}>{phase.date}</span>
                {isWinner && (
                  <span className="winner-tag opacity-0 inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] uppercase tracking-widest text-amber-400">
                    🏆 Winner
                  </span>
                )}
              </div>
              <span className="text-xs font-light text-white/50 uppercase tracking-widest mt-1">{phase.dateLabel}</span>
            </div>
          </motion.div>
        )}
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 reveal-text">
            <span className="text-xs tracking-[0.4em] uppercase text-cyan-500/50 font-mono">
              Milestone {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
              <span className="text-gradient-cyan opacity-90">{phase.title}</span>
            </h2>
            <div className="max-w-md space-y-6">
              <p className="text-white/60 text-xl font-light leading-relaxed">
                {phase.narrative}
              </p>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <p className="text-white/40 text-sm leading-relaxed italic">
                  &quot;{phase.description}&quot;
                </p>
              </div>
            </div>
          </div>
          
          <div className="floating-card flex flex-col items-end gap-6">
            <CinematicGallery images={images} alt={phase.title} />
            {phase.github && (
              <a
                href={phase.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all text-sm text-white/70 hover:text-white"
              >
                View Project 
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  // RENDER STYLE B: ATMOSPHERIC DEPTH (Blurred BG, Floating Cards)
  if (styleType === 1) {
    return (
      <section ref={containerRef} className={`relative min-h-screen w-full flex items-center justify-center py-32 overflow-hidden ${isWinner ? 'winner-section' : ''}`}>
        {isWinner && (
          <div className="winner-bloom absolute inset-0 z-0 pointer-events-none opacity-0 flex items-center justify-center">
            <div className="w-full max-w-5xl h-[600px] bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 blur-[100px] rounded-[100%] mix-blend-screen" />
          </div>
        )}

        {/* Timeline Node & Date */}
        {phase.date && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className={`absolute top-12 z-30 flex items-center gap-4 ${isLeftNode ? 'left-6 md:left-12 lg:left-24' : 'right-6 md:right-12 lg:right-24 flex-row-reverse text-right'}`}
          >
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md animate-pulse"></div>
              <div className={`w-2 h-2 rounded-full ${isWinner ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,1)]' : 'bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]'} z-10`}></div>
            </div>
            <div className="flex flex-col">
              <div className={`flex items-center gap-3 ${!isLeftNode ? 'flex-row-reverse' : ''}`}>
                <span className={`text-sm font-mono tracking-[0.2em] uppercase ${isWinner ? 'text-amber-300' : 'text-purple-400/80'}`}>{phase.date}</span>
                {isWinner && (
                  <span className="winner-tag opacity-0 inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] uppercase tracking-widest text-amber-400">
                    🏆 Winner
                  </span>
                )}
              </div>
              <span className="text-xs font-light text-white/50 uppercase tracking-widest mt-1">{phase.dateLabel}</span>
            </div>
          </motion.div>
        )}

        {images[0] && (
          <div 
            className="absolute inset-0 opacity-20 blur-3xl scale-110 parallax-bg"
            style={{ 
              backgroundImage: `url('${images[0]}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
           <div className="reveal-text text-center mb-20">
             <span className="text-xs tracking-[0.4em] uppercase text-purple-500/50 font-mono block mb-4">
               {phase.event}
             </span>
             <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
               <span className="text-gradient-purple">{phase.title}</span>
             </h2>
             <p className="text-white/50 text-2xl font-light max-w-2xl mx-auto leading-relaxed">
               {phase.narrative}
             </p>
           </div>
           
           <div className="w-full max-w-5xl floating-card flex flex-col items-end gap-6">
              <CinematicGallery images={images} alt={phase.title} />
              {phase.github && (
                <a
                  href={phase.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all text-sm text-white/70 hover:text-white"
                >
                  View Project 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
           </div>
        </div>
      </section>
    );
  }

  // RENDER STYLE C: MOSAIC NARRATIVE (Spread composition)
  return (
    <section ref={containerRef} className={`relative min-h-screen w-full flex items-center justify-center py-32 overflow-hidden ${isWinner ? 'winner-section' : ''}`}>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/5 to-transparent parallax-bg" />
      
      {isWinner && (
        <div className="winner-bloom absolute inset-0 z-0 pointer-events-none opacity-0 flex items-center justify-center">
          <div className="w-full max-w-5xl h-[600px] bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 blur-[100px] rounded-[100%] mix-blend-screen" />
        </div>
      )}

      {/* Timeline Node & Date */}
      {phase.date && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className={`absolute top-12 z-30 flex items-center gap-4 ${isLeftNode ? 'left-6 md:left-12 lg:left-24' : 'right-6 md:right-12 lg:right-24 flex-row-reverse text-right'}`}
        >
          <div className="relative flex items-center justify-center w-8 h-8">
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md animate-pulse"></div>
            <div className={`w-2 h-2 rounded-full ${isWinner ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,1)]' : 'bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]'} z-10`}></div>
          </div>
          <div className="flex flex-col">
            <div className={`flex items-center gap-3 ${!isLeftNode ? 'flex-row-reverse' : ''}`}>
              <span className={`text-base font-mono tracking-[0.2em] uppercase ${isWinner ? 'text-amber-300' : 'text-indigo-400/80'}`}>{phase.date}</span>
              {isWinner && (
                <span className="winner-tag opacity-0 inline-flex items-center px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs uppercase tracking-widest text-amber-400">
                  🏆 Winner
                </span>
              )}
            </div>
            <span className="text-sm font-light text-white/50 uppercase tracking-widest mt-1">{phase.dateLabel}</span>
          </div>
        </motion.div>
      )}
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 flex flex-col justify-center space-y-10 reveal-text">
           <div className="space-y-4">
             <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
               <span className="text-gradient-multi">{phase.title}</span>
             </h2>
             <p className="text-white/30 text-sm tracking-widest uppercase font-mono">
               {phase.theme}
             </p>
           </div>
           
           <p className="text-white/60 text-lg leading-relaxed border-l-2 border-white/10 pl-8 py-4 italic">
             {phase.narrative}
           </p>

           {phase.techStack && (
             <div className="flex flex-wrap gap-2 pt-4">
               {phase.techStack.map(tech => (
                 <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-white/50">
                   {tech}
                 </span>
               ))}
             </div>
           )}
        </div>
        
        <div className="lg:col-span-8 floating-card flex flex-col items-end gap-6">
           <div className="grid grid-cols-2 gap-4 h-full w-full">
             <div className="space-y-4">
               <CinematicGallery images={images.slice(0, 1)} alt={phase.title} />
               {images[2] && <CinematicGallery images={images.slice(2, 3)} alt={phase.title} />}
             </div>
             <div className="pt-20 space-y-4">
                {images[1] && <CinematicGallery images={images.slice(1, 2)} alt={phase.title} />}
                {images[3] && <CinematicGallery images={images.slice(3, 4)} alt={phase.title} />}
             </div>
           </div>
           {phase.github && (
              <a
                href={phase.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all text-sm text-white/70 hover:text-white mt-4"
              >
                View Project 
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
        </div>
      </div>
    </section>
  );
}
