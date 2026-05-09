"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { beforeEngineeringCards } from "@/data/timeline";

export default function BeforeEngineering() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden shrink-0 py-20"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.04) 0%, transparent 60%), radial-gradient(circle at 50% 100%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center w-full"
        >
          {/* Label */}
          <p className="text-sm tracking-[0.4em] uppercase text-blue-400/50 font-mono mb-[24px]">
            Before Engineering
          </p>

          {/* Large Cinematic Heading */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-[32px] max-w-5xl text-white">
            The <span className="text-gradient-cyan">Foundation</span>
          </h2>

          {/* Supporting Paragraph */}
          <p className="text-white/40 max-w-2xl text-lg md:text-xl leading-relaxed font-light">
            Before code, there were core mental models that shaped my thinking patterns. Click to explore.
          </p>
        </motion.div>

        {/* Properly Spaced Card Grid */}
        <div className="mt-[72px] w-full flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap justify-center items-stretch gap-6 lg:gap-8">
          {beforeEngineeringCards.map((card, index) => (
            <motion.div
              key={card.title}
              layoutId={`card-${card.title}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 min-w-[260px] max-w-[320px] w-full mx-auto"
            >
              <div
                onClick={() => setSelectedCard(card.title)}
                className="group cursor-pointer h-full bg-white/[0.02] backdrop-blur-xl border border-white/[0.04] hover:border-cyan-500/20 rounded-2xl p-8 md:p-10 text-center flex flex-col items-center transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(6,182,212,0.1)] hover:bg-white/[0.04]"
              >
                <motion.div layoutId={`icon-${card.title}`} className="text-5xl mb-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                  {card.icon}
                </motion.div>
                <motion.h3 layoutId={`title-${card.title}`} className="text-xl font-medium text-white/90 mb-4 tracking-wide">
                  {card.title}
                </motion.h3>
                <motion.p layoutId={`desc-${card.title}`} className="text-sm text-white/30 leading-relaxed group-hover:text-white/50 transition-colors duration-500">
                  {card.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-[#050507]/90 backdrop-blur-md cursor-pointer"
            />
            
            {beforeEngineeringCards.map((card) => {
              if (card.title !== selectedCard) return null;
              
              return (
                <motion.div
                  key={card.title}
                  layoutId={`card-${card.title}`}
                  className="relative z-10 w-full max-w-3xl bg-[#0A0A0F] border border-cyan-500/20 rounded-3xl p-10 md:p-16 shadow-[0_32px_80px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col items-center text-center"
                >
                  <button 
                    onClick={() => setSelectedCard(null)}
                    className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                  <motion.div layoutId={`icon-${card.title}`} className="text-7xl mb-8">
                    {card.icon}
                  </motion.div>
                  <motion.h3 layoutId={`title-${card.title}`} className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    {card.title}
                  </motion.h3>
                  <motion.p layoutId={`desc-${card.title}`} className="text-cyan-400/80 font-medium mb-10 text-lg md:text-xl max-w-xl">
                    {card.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="pt-10 border-t border-white/5 w-full"
                  >
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">
                      {card.deepExplanation}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
