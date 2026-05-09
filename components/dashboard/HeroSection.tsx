"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { heroRoles } from "@/data/timeline";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const advanceRole = useCallback(() => {
    setRoleIndex((prev) => (prev + 1) % heroRoles.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(advanceRole, 2500);
    return () => clearInterval(interval);
  }, [advanceRole]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Parallax on image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: 80,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Text stagger reveal
      if (textRef.current) {
        const elements = textRef.current.querySelectorAll(".reveal-text");
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center overflow-hidden shrink-0"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <video
          src="/animations/dashboardbg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#050507]/80 via-[#050507]/30 to-transparent"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full flex justify-end pr-8 md:pr-16 lg:pr-24 xl:pr-[10vw] py-20 md:py-0">
        <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-end gap-12 md:gap-24">
          {/* Left — Text Content */}
          <div ref={textRef} className="flex-1 space-y-6 md:space-y-8 min-w-[300px] md:pl-10 lg:pl-20">
            <div className="space-y-4">
              <p className="reveal-text text-base md:text-xl tracking-[0.3em] uppercase text-purple-400/90 font-mono">
                The Journey of
              </p>
              <h1 className="reveal-text text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
                Harshit{" "}
                <span className="text-gradient-purple">Raj</span>
              </h1>
            </div>

            {/* Rotating role */}
            <div className="reveal-text h-10 md:h-12 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-lg md:text-xl text-white/60 font-light"
                >
                  {heroRoles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Tagline */}
            <p className="reveal-text text-base md:text-lg text-white/30 max-w-md leading-relaxed">
              Building under pressure. Shipping through chaos.
              <br />
              <span className="text-purple-400/60 font-medium">
                Pressure reveals skill.
              </span>
            </p>

            {/* Stats */}
            <div className="reveal-text flex gap-8 pt-4">
              {[
                { value: "3x", label: "Hackathon Winner" },
                { value: "10+", label: "Projects Built" },
                { value: "∞", label: "Lines of Code" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-2xl md:text-3xl font-bold text-gradient-purple">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/30 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Owner Image */}
          <motion.div
            ref={imageRef}
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative w-64 h-80 md:w-80 md:h-[420px] lg:w-96 lg:h-[500px]">
              {/* Glow behind image */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  transform: "scale(1.2)",
                }}
              />

              {/* Image container */}
              <motion.div
                className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/owner/image.png"
                  alt="Harshit Raj"
                  fill
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  className="object-cover"
                  priority
                  quality={85}
                />
                {/* Edge glow */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-purple-500/20 shadow-[inset_0_0_30px_rgba(168,85,247,0.1)]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050507] to-transparent z-20" />
    </section>
  );
}
