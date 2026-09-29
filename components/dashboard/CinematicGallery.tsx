"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicGalleryProps {
  images: string[];
  alt: string;
}

export default function CinematicGallery({ images, alt }: CinematicGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-video md:aspect-[4/3] lg:aspect-video rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 shadow-2xl shadow-black/50 p-8 flex flex-col items-center justify-center text-center backdrop-blur-xl group hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500"
        >
          {/* Subtle Cyber Grid & Ambient Radial Glow */}
          <div 
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 70%)"
            }}
          />

          {/* Tech icon */}
          <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-all duration-500 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
            <svg 
              className="w-8 h-8 text-white/40 group-hover:text-cyan-300 transition-colors duration-500" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>

          {/* Typography */}
          <div className="relative z-10 space-y-2 max-w-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] uppercase font-mono tracking-widest text-cyan-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Visual Showcase
            </span>
            <h4 className="text-white/80 font-medium text-base tracking-tight pt-1">
              {alt}
            </h4>
            <p className="text-xs text-white/40 leading-relaxed font-light">
              Production architecture shipped. Visual gallery artifacts pending sync.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Rule: Display maximum 2 images on the main slide.
  const displayImages = images.slice(0, 2);
  const remainingCount = images.length - 2;

  // Lightbox handlers
  const openModal = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! + 1) % images.length);
    }
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className={`grid gap-6 w-full ${displayImages.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
        {displayImages.map((src, index) => (
          <motion.div
            key={src}
            layoutId={`gallery-image-${src}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative cursor-pointer w-full aspect-video md:aspect-[4/3] lg:aspect-video rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 shadow-2xl shadow-black/50 hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500"
            onClick={() => openModal(index)}
          >
            {/* Blurred background plate for non-filling images to prevent harsh black bars */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 pointer-events-none"
              style={{ backgroundImage: `url('${src}')` }}
            />
            
            {/* The actual image using Next.js Image with lazy loading & responsive sizing */}
            <Image
              src={src}
              alt={`${alt} memory ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              className="object-contain p-2 drop-shadow-2xl z-10 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            
            {/* View More Overlay (only on the 2nd image if there are more) */}
            {index === 1 && remainingCount > 0 && (
              <div className="absolute inset-0 z-20 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <span className="text-white text-2xl font-light tracking-widest mb-2">+{remainingCount}</span>
                <span className="text-white/60 text-xs uppercase tracking-[0.2em]">View Gallery</span>
              </div>
            )}
            
            {/* Default Hover indicator */}
            {!(index === 1 && remainingCount > 0) && (
               <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                 <span className="text-white/80 text-xs uppercase tracking-widest backdrop-blur-md px-4 py-2 rounded-full bg-white/5 border border-white/10">Expand</span>
               </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Heavily blurred dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-[#050508]/95 backdrop-blur-2xl cursor-pointer"
              onClick={closeModal}
            />
            
            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 md:left-12 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all backdrop-blur-md"
                >
                  ←
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 md:right-12 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all backdrop-blur-md"
                >
                  →
                </button>
              </>
            )}

            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 md:top-12 md:right-12 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 border border-white/10 text-white transition-all backdrop-blur-md"
            >
              ✕
            </button>

            {/* Main Modal Image */}
            <motion.div
              key={images[selectedImageIndex]}
              layoutId={`gallery-image-${images[selectedImageIndex]}`}
              className="relative z-40 w-full max-w-7xl h-[80vh] flex items-center justify-center px-4 md:px-24"
            >
              <Image
                src={images[selectedImageIndex]}
                alt={`${alt} expanded`}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain drop-shadow-[0_0_100px_rgba(0,0,0,0.8)]"
              />
            </motion.div>
            
            {/* Image Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 text-white/50 font-mono tracking-widest text-sm bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-white/10">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
