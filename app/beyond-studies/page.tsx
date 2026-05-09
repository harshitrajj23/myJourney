"use client";

import { useState } from "react";
import AlbumHero from "@/components/memories/AlbumHero";
import TripsAlbum from "@/components/memories/TripsAlbum";
import FriendshipsAlbum from "@/components/memories/FriendshipsAlbum";
import FestsAlbum from "@/components/memories/FestsAlbum";
import AlbumEnding from "@/components/memories/AlbumEnding";
import CinematicLightbox from "@/components/memories/CinematicLightbox";
import LenisProvider from "@/components/providers/LenisProvider";
import { useLenis } from "lenis/react";

import InteractiveWaterBackground from "@/components/memories/InteractiveWaterBackground";

export default function BeyondStudiesPage() {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
  }>({
    isOpen: false,
    images: [],
    index: 0,
  });

  const openLightbox = (images: string[], index: number) => {
    setLightboxState({ isOpen: true, images, index });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const lenis = useLenis();

  const scrollToSection = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom cinematic easing
      });
    }
  };

  return (
    <LenisProvider>
      <main className="relative w-full bg-transparent text-white">
        <InteractiveWaterBackground />
        
        {/* Floating Chapter Navigation */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-center mix-blend-difference hidden md:flex">
          <button 
            onClick={() => scrollToSection('chapter-trips')}
            className="group flex flex-col items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors duration-300" />
            <span className="text-[10px] font-mono tracking-widest text-white/0 group-hover:text-white/50 transition-colors duration-300 rotate-90 origin-left ml-2 opacity-0 group-hover:opacity-100 absolute left-4">
              TRIPS
            </span>
          </button>
          <div className="w-[1px] h-8 bg-white/10" />
          <button 
            onClick={() => scrollToSection('chapter-friendships')}
            className="group flex flex-col items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors duration-300" />
            <span className="text-[10px] font-mono tracking-widest text-white/0 group-hover:text-white/50 transition-colors duration-300 rotate-90 origin-left ml-2 opacity-0 group-hover:opacity-100 absolute left-4">
              BONDS
            </span>
          </button>
          <div className="w-[1px] h-8 bg-white/10" />
          <button 
            onClick={() => scrollToSection('chapter-fests')}
            className="group flex flex-col items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors duration-300" />
            <span className="text-[10px] font-mono tracking-widest text-white/0 group-hover:text-white/50 transition-colors duration-300 rotate-90 origin-left ml-2 opacity-0 group-hover:opacity-100 absolute left-4">
              FESTS
            </span>
          </button>
        </div>
        
        {/* Memory Chapters using Sticky Stacking Architecture */}
        <AlbumHero />
        <TripsAlbum onImageClick={openLightbox} />
        <FriendshipsAlbum onImageClick={openLightbox} />
        <FestsAlbum onImageClick={openLightbox} />
        <AlbumEnding />

        {/* Global Interactive Lightbox */}
        <CinematicLightbox 
          isOpen={lightboxState.isOpen}
          images={lightboxState.images}
          initialIndex={lightboxState.index}
          onClose={closeLightbox}
        />
        
      </main>
    </LenisProvider>
  );
}
