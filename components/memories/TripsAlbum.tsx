"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import Image from "next/image";
import { imageMap } from "@/data/images";

interface TripsAlbumProps {
  onImageClick: (images: string[], index: number) => void;
}

export default function TripsAlbum({ onImageClick }: TripsAlbumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const images = imageMap.trips || [];

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
    const imageWrappers = gsap.utils.toArray(".trip-img-wrapper") as HTMLElement[];
    imageWrappers.forEach((wrapper) => {
      gsap.from(wrapper, {
        y: 50,
        opacity: 0,
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
          yPercent: 15,
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
    <section id="chapter-trips" ref={containerRef} className="relative w-full py-24 md:py-40 bg-transparent">
      
      {/* Chapter Top Area */}
      <div ref={textRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 flex flex-col items-start">
        <p className="text-xs tracking-[0.4em] uppercase text-cyan-400/80 font-mono mb-4">
          Chapter I
        </p>
        <h2 className="text-5xl md:text-8xl font-light text-white tracking-tighter mb-8">
          Trips
        </h2>
        <p className="text-xl md:text-3xl text-white/60 font-light max-w-3xl leading-relaxed">
          “Some journeys reset more than your location.”
        </p>
      </div>

      {/* Editorial Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          
          {/* Primary Hero Image */}
          {images[0] && (
            <div 
              className="trip-img-wrapper md:col-span-12 relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden rounded-md cursor-pointer group"
              onClick={() => onImageClick(images, 0)}
            >
              <Image 
                src={images[0]} 
                alt="Trip Hero" 
                fill 
                className="object-cover scale-110" 
                priority
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
            </div>
          )}

          {/* Supporting Images */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mt-4 md:mt-10">
            {images[1] && (
              <div 
                className="trip-img-wrapper md:col-span-5 relative w-full aspect-[4/5] overflow-hidden rounded-md cursor-pointer group"
                onClick={() => onImageClick(images, 1)}
              >
                <Image 
                  src={images[1]} 
                  alt="Trip Supporting 1" 
                  fill 
                  className="object-cover scale-110" 
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
              </div>
            )}
            
            <div className="md:col-span-7 flex flex-col gap-6 md:gap-10">
              {images[2] && (
                <div 
                  className="trip-img-wrapper relative w-full aspect-video overflow-hidden rounded-md cursor-pointer group"
                  onClick={() => onImageClick(images, 2)}
                >
                  <Image 
                    src={images[2]} 
                    alt="Trip Supporting 2" 
                    fill 
                    className="object-cover scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
                </div>
              )}
              {images[3] && (
                <div 
                  className="trip-img-wrapper relative w-full md:w-3/4 self-end aspect-[4/3] overflow-hidden rounded-md cursor-pointer group"
                  onClick={() => onImageClick(images, 3)}
                >
                  <Image 
                    src={images[3]} 
                    alt="Trip Supporting 3" 
                    fill 
                    className="object-cover scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
      
    </section>
  );
}
