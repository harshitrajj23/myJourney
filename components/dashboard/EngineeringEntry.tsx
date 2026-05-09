"use client";

import { motion, Variants } from "framer-motion";

export default function EngineeringEntry() {
  const text = "Entering My Engineering Journey at BMSIT";
  
  // Variants for staggered text reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Fast character reveal
        delayChildren: 0.2,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden shrink-0">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/owner/image%20copy.png')",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 lg:px-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: false, amount: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase text-cyan-400/60 font-mono mb-8"
        >
          Chapter One
        </motion.p>
        
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight text-white flex flex-wrap justify-center"
        >
          {text.split(" ").map((word, wordIndex, array) => (
            <span key={wordIndex} className="inline-flex whitespace-pre">
              {word.split("").map((char, charIndex) => (
                <motion.span key={charIndex} variants={charVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
              {wordIndex !== array.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
        </motion.h2>
      </div>
    </section>
  );
}
