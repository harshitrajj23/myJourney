"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GalleryModal from "./GalleryModal";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const navigateModal = useCallback(
    (direction: "prev" | "next") => {
      if (selectedIndex === null) return;
      if (direction === "prev") {
        setSelectedIndex(
          selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
        );
      } else {
        setSelectedIndex(
          selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
        );
      }
    },
    [selectedIndex, images.length]
  );

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-purple-500/30 transition-all duration-500"
            onClick={() => openModal(index)}
          >
            <Image
              src={src}
              alt={`${alt} - Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              quality={75}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/20 transition-colors duration-500 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="text-white/0 group-hover:text-white/80 text-sm font-medium tracking-wide transition-all duration-300"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
                </svg>
              </motion.div>
            </div>
            {/* Glow border on hover */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 group-hover:ring-purple-500/20 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedIndex !== null && (
        <GalleryModal
          images={images}
          currentIndex={selectedIndex}
          alt={alt}
          onClose={closeModal}
          onNavigate={navigateModal}
        />
      )}
    </>
  );
}
