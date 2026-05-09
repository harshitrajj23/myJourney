"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import Link from "next/link";

export default function AlbumEnding() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Subtly fade in the text
    tl.fromTo(".ending-text", 
      { opacity: 0, y: 30, filter: "blur(10px)" }, 
      { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out" }
    );
    
    // The very end fades to pure black
    tl.to(containerRef.current, { backgroundColor: "#000000", duration: 1 }, "+=0.5");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] flex items-center justify-center bg-transparent">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-6">
        
        {/* Subtle top gradient connecting from the previous section */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none" />

        <div className="ending-text text-center space-y-12 max-w-4xl mx-auto">
          <p className="text-2xl md:text-4xl lg:text-5xl font-light text-white/70 leading-relaxed italic">
            &quot;Not every important chapter<br className="hidden md:block" /> happened in front of a screen.&quot;
          </p>
          
          <div className="pt-20">
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/30 hover:text-white/70 transition-colors duration-300"
            >
              ← Return to Dashboard
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
