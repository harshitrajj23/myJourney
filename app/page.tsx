"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CinematicIntro from "@/components/landing/CinematicIntro";
import TransitionPlayer from "@/components/landing/TransitionPlayer";

type LandingState = "intro" | "transition";

export default function LandingPage() {
  const [state, setState] = useState<LandingState>("intro");

  const handleEnterJourney = useCallback(() => {
    setState("transition");
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {state === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <CinematicIntro onEnter={handleEnterJourney} />
          </motion.div>
        )}

        {state === "transition" && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <TransitionPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
