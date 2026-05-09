"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicLightboxProps {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function CinematicLightbox({ isOpen, images, initialIndex, onClose }: CinematicLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen && !prevIsOpen) {
    setCurrentIndex(initialIndex);
    setPrevIsOpen(true);
  } else if (!isOpen && prevIsOpen) {
    setPrevIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          {/* Frosted Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#050508]/95 backdrop-blur-2xl cursor-pointer"
            onClick={onClose}
          />
          
          {/* Navigation Controls */}
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

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 md:top-12 md:right-12 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 border border-white/10 text-white transition-all backdrop-blur-md"
          >
            ✕
          </button>

          {/* Expanded Cinematic Image */}
          <motion.div
            key={images[currentIndex]}
            layoutId={`memory-image-${images[currentIndex]}`} // Syncs with thumbnails
            className="relative z-40 w-full max-w-7xl h-[85vh] flex items-center justify-center px-4 md:px-24"
          >
            <motion.img
              src={images[currentIndex]}
              alt={`Memory ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-contain drop-shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            />
          </motion.div>
          
          {/* Pagination Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 text-white/50 font-mono tracking-widest text-sm bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-white/10">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
