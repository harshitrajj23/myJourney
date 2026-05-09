"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import Image from "next/image";
import { imageMap } from "@/data/images";

interface FriendshipsAlbumProps {
  onImageClick: (images: string[], index: number) => void;
}

export default function FriendshipsAlbum({ onImageClick }: FriendshipsAlbumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const images = imageMap.friendship || [];

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
    const imageWrappers = gsap.utils.toArray(".friend-img-wrapper") as HTMLElement[];
    imageWrappers.forEach((wrapper) => {
      gsap.from(wrapper, {
        y: 40,
        opacity: 0,
        scale: 0.98,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 85%",
        }
      });

      const img = wrapper.querySelector("img");
      if (img) {
        gsap.to(img, {
          yPercent: 12,
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
    <section id="chapter-friendships" ref={containerRef} className="relative w-full py-24 md:py-40 bg-transparent">
      
      {/* Subtle Warm Background Glow behind text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-amber-500/5 blur-[150px] rounded-[100%] pointer-events-none" />

      {/* Chapter Top Area */}
      <div ref={textRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 flex flex-col items-center text-center relative z-10">
        <p className="text-xs tracking-[0.4em] uppercase text-amber-400/80 font-mono mb-4">
          Chapter II
        </p>
        <h2 className="text-5xl md:text-8xl font-light text-white tracking-tighter mb-8">
          Friendship
        </h2>
        <p className="text-xl md:text-3xl text-white/60 font-light max-w-3xl leading-relaxed">
          “Some people quietly become part of your story.”
        </p>
      </div>

      {/* Editorial Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          
          {/* Top Row: 1 large intimate hero, 1 supporting */}
          {images[0] && (
            <div 
              className="friend-img-wrapper md:col-span-8 relative w-full aspect-[4/3] overflow-hidden rounded-md cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              onClick={() => onImageClick(images, 0)}
            >
              <Image 
                src={images[0]} 
                alt="Friendship Hero" 
                fill 
                className="object-cover scale-110" 
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
            </div>
          )}

          {images[1] && (
            <div 
              className="friend-img-wrapper md:col-span-4 relative w-full aspect-[3/4] md:aspect-auto md:h-full overflow-hidden rounded-md cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              onClick={() => onImageClick(images, 1)}
            >
              <Image 
                src={images[1]} 
                alt="Friendship Supporting 1" 
                fill 
                className="object-cover scale-110" 
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
            </div>
          )}

          {/* Bottom Row: 2 supporting images arranged asymmetrically */}
          {images[2] && (
            <div 
              className="friend-img-wrapper md:col-span-5 md:col-start-2 relative w-full aspect-square md:aspect-[4/5] overflow-hidden rounded-md cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)] mt-0 md:-mt-12 z-20"
              onClick={() => onImageClick(images, 2)}
            >
              <Image 
                src={images[2]} 
                alt="Friendship Supporting 2" 
                fill 
                className="object-cover scale-110" 
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
            </div>
          )}

          {images[3] && (
            <div 
              className="friend-img-wrapper md:col-span-6 md:col-start-7 relative w-full aspect-video md:aspect-[16/10] overflow-hidden rounded-md cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)] mt-0 md:mt-24"
              onClick={() => onImageClick(images, 3)}
            >
              <Image 
                src={images[3]} 
                alt="Friendship Supporting 3" 
                fill 
                className="object-cover scale-110" 
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
            </div>
          )}

        </div>
      </div>
      
    </section>
  );
}
