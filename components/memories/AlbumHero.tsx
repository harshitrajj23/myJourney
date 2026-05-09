"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AlbumHero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
      {/* Subtle Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-10"
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
      />
      
      {/* Ambient Lighting Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[100px] md:blur-[150px]"
            style={{
               background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 80%)"
            }}
         />
      </div>



      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <p className="text-xs tracking-[0.5em] uppercase text-white/30 font-mono mb-8">
            Cinematic Memory Archive
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-8"
        >
          Beyond The <span className="text-gradient-cyan">Code</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="text-lg md:text-2xl text-white/40 font-light max-w-2xl leading-relaxed"
        >
          Some memories shaped the builder more than the projects did.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <p className="text-[10px] tracking-widest uppercase text-white/20">Scroll to open chapter</p>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
