"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const codeLines = [
  "$ g++ -o solution main.cpp",
  "$ ./solution",
  "Test case 1: PASSED ✓",
  "Test case 2: PASSED ✓",
  "Test case 3: PASSED ✓",
  "Time complexity: O(n log n)",
  "Memory: 12.4 MB",
  "─────────────────────────",
  "All test cases passed.",
  "Runtime: 0.02s",
];

function TerminalTyping() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    if (currentLine >= codeLines.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsComplete(true);
      return;
    }

    const line = codeLines[currentLine];

    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.substring(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, 20 + Math.random() * 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setLines((prev) => [...prev, ""]);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, isComplete]);

  return (
    <div className="terminal-bg rounded-lg p-4 md:p-6 font-mono text-xs md:text-sm overflow-hidden border border-green-900/20 shadow-2xl shadow-green-900/10 backdrop-blur-sm">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-green-900/30">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-2 text-green-400/40 text-xs">dsa-solutions</span>
      </div>

      {/* Terminal content */}
      <div className="space-y-1 min-h-[200px]">
        {lines.map((line, i) => (
          <div key={i} className="terminal-text flex">
            <span>{line}</span>
            {i === currentLine && !isComplete && (
              <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 animate-[typing-cursor_1s_infinite]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DSAPhase() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden shrink-0">
      {/* Dark monochrome background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(34, 197, 94, 0.04) 0%, transparent 60%)",
        }}
      />

      {/* Timeline Node */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        className="absolute top-12 left-6 md:left-12 lg:left-24 z-20 flex items-center gap-4"
      >
        <div className="relative flex items-center justify-center w-8 h-8">
          <div className="absolute inset-0 rounded-full bg-green-500/20 blur-md animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-green-400 z-10 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-mono tracking-[0.2em] uppercase text-white/90">SEP 2025</span>
          <span className="text-xs font-light text-white/50 uppercase tracking-widest mt-1">Started Coding Journey with DSA</span>
        </div>
      </motion.div>

      {/* Subtle code rain effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        {Array.from({ length: 15 }).map((_, i) => {
          const duration = 8 + (((i * 7 + 3) % 6));
          const delay = ((i * 3 + 1) % 5);
          const chars = "01{}[]<>/*;:=+&|~#abcdefABCDEF";
          const rainText = Array.from({ length: 20 })
            .map((__, j) => chars[(i * 20 + j * 7 + 13) % chars.length])
            .join("\n");

          return (
            <motion.div
              key={i}
              className="absolute text-green-400 font-mono text-xs"
              style={{
                left: `${(i / 15) * 100}%`,
                top: "-20px",
              }}
              animate={{
                y: ["0vh", "100vh"],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "linear",
              }}
            >
              {rainText}
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left - Narrative */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="space-y-4"
            >
              <span className="text-xs tracking-[0.3em] uppercase text-green-500/50 font-mono">
                The DSA Era
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="text-gradient-multi opacity-80">
                  Refining the Core
                </span>
              </h2>
              <p className="text-white/40 text-lg md:text-xl font-light">
                DSA wasn&apos;t just about patterns. It was about training the mind
                to think in optimizations, edge cases, and architectural
                efficiency.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex gap-6"
            >
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white/80">C++</p>
                <p className="text-xs text-white/20 uppercase tracking-widest font-mono">
                  Primary Language
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="p-6 rounded-2xl bg-green-500/[0.02] border border-green-500/10 backdrop-blur-sm">
                <p className="text-white/30 italic text-sm md:text-base leading-relaxed">
                  &quot;Coding is not just about writing code. It&apos;s about
                  solving problems. DSA was the first step in learning how to
                  solve complex problems systematically.&quot;
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right - Terminal Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: false, amount: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-green-500/10 blur-3xl rounded-full opacity-20" />
            <TerminalTyping />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
