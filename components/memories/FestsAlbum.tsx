"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import Image from "next/image";
import { imageMap } from "@/data/images";

interface FestsAlbumProps {
  onImageClick: (images: string[], index: number) => void;
}

export default function FestsAlbum({ onImageClick }: FestsAlbumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const images = imageMap.fest || [];

  useGSAP(() => {
    if (!containerRef.current || images.length === 0) return;

    // Text fade up
    gsap.from(textRef.current?.children || [], {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
      }
    });

    // Images soft reveal & parallax
    const imageWrappers = gsap.utils.toArray(".fest-img-wrapper") as HTMLElement[];
    imageWrappers.forEach((wrapper) => {
      gsap.from(wrapper, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 85%",
        }
      });

      const img = wrapper.querySelector("img");
      if (img) {
        gsap.to(img, {
          yPercent: 20, // Slightly more dynamic for Fests
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });

  }, { scope: containerRef });

  if (images.length === 0) return null;

  return (
    <section id="chapter-fests" ref={containerRef} className="relative w-full py-24 md:py-40 bg-transparent">
      
      {/* Dynamic Blur / Light streaks background */}
      <div className="absolute top-[20%] left-0 w-full h-[600px] overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[50px] bg-fuchsia-500 rounded-full blur-[80px] -rotate-45" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[40px] bg-cyan-500 rounded-full blur-[80px] rotate-12" />
      </div>

      {/* Chapter Top Area */}
      <div ref={textRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 flex flex-col items-end text-right relative z-10">
        <p className="text-xs tracking-[0.4em] uppercase text-fuchsia-400/80 font-mono mb-4">
          Chapter III
        </p>
        <h2 className="text-5xl md:text-8xl font-light text-white tracking-tighter mb-8">
          Fests
        </h2>
        <p className="text-xl md:text-3xl text-white/60 font-light max-w-3xl leading-relaxed">
          “For a while, deadlines disappeared.”
        </p>
      </div>

      {/* Editorial Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          
          {/* Primary Hero Image - Spanning full width but cinematic height */}
          {images[0] && (
            <div 
              className="fest-img-wrapper md:col-span-12 relative w-full aspect-[16/9] md:aspect-[2.35/1] overflow-hidden rounded-md cursor-pointer group shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              onClick={() => onImageClick(images, 0)}
            >
              <Image 
                src={images[0]} 
                alt="Fest Hero" 
                fill 
                className="object-cover scale-110" 
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
            </div>
          )}

          {/* Supporting Images - 3 Column Layout */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-4 md:mt-12">
            {images[1] && (
              <div 
                className="fest-img-wrapper relative w-full aspect-[4/5] overflow-hidden rounded-md cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)] md:mt-12"
                onClick={() => onImageClick(images, 1)}
              >
                <Image 
                  src={images[1]} 
                  alt="Fest Supporting 1" 
                  fill 
                  className="object-cover scale-110" 
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
              </div>
            )}
            
            {images[2] && (
              <div 
                className="fest-img-wrapper relative w-full aspect-square overflow-hidden rounded-md cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                onClick={() => onImageClick(images, 2)}
              >
                <Image 
                  src={images[2]} 
                  alt="Fest Supporting 2" 
                  fill 
                  className="object-cover scale-110" 
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
              </div>
            )}

            {images[3] && (
              <div 
                className="fest-img-wrapper relative w-full aspect-[4/5] overflow-hidden rounded-md cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)] md:mt-24"
                onClick={() => onImageClick(images, 3)}
              >
                <Image 
                  src={images[3]} 
                  alt="Fest Supporting 3" 
                  fill 
                  className="object-cover scale-110" 
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
              </div>
            )}
          </div>
          
        </div>
      </div>
      
    </section>
  );
}
