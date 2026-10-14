"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import styles from "./JourneyArchive.module.css";

interface CinematicGalleryProps {
  images: string[];
  alt: string;
}

function Photograph({ src, alt, sizes, expanded = false }: {
  src: string;
  alt: string;
  sizes: string;
  expanded?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className={styles.imageFallback} role="img" aria-label={`${alt}: photo unavailable`}>Photo unavailable</span>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={expanded ? "eager" : "lazy"}
      className={expanded ? styles.expandedPhoto : styles.photo}
      onError={() => setFailed(true)}
    />
  );
}

export default function CinematicGallery({ images, alt }: CinematicGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const isOpen = selectedIndex !== null;
  const activeIndex = selectedIndex === null ? 0 : selectedIndex % Math.max(images.length, 1);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [isOpen]);

  function openPhoto(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelectedIndex(index);
  }

  function movePhoto(direction: number) {
    if (!images.length) return;
    setSelectedIndex((current) => current === null ? null : (current + direction + images.length) % images.length);
  }

  if (!images.length) {
    return <div className={styles.emptyGallery}><p>No photos added</p></div>;
  }

  return (
    <div className={styles.gallery}>
      <button
        type="button"
        className={styles.mainPhoto}
        aria-label={`Open ${alt} photo 1 of ${images.length}`}
        aria-haspopup="dialog"
        onClick={(event) => openPhoto(0, event.currentTarget)}
      >
        <Photograph key={images[0]} src={images[0]} alt={`${alt} — photo 1`} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1240px) 52vw, 620px" />
        <span className={styles.expandLabel} aria-hidden="true">View photographs ↗</span>
      </button>

      <div className={styles.galleryFooter}>
        <p>{images.length} {images.length === 1 ? "photograph" : "photographs"}</p>
        {images.length > 4 && (
          <button type="button" className={styles.viewAll} onClick={(event) => openPhoto(0, event.currentTarget)} aria-haspopup="dialog">
            View all {images.length} <span aria-hidden="true">↗</span>
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.slice(1, 4).map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              className={styles.thumbnail}
              aria-label={`Open ${alt} photo ${index + 2} of ${images.length}`}
              aria-haspopup="dialog"
              onClick={(event) => openPhoto(index + 1, event.currentTarget)}
            >
              <Photograph src={src} alt="" sizes="(max-width: 760px) 30vw, 180px" />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-labelledby={titleId}
        onClose={() => {
          if (!dialogRef.current?.open) setSelectedIndex(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            movePhoto(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div className={styles.lightboxHeader}>
          <h3 id={titleId}>{alt}</h3>
          <button ref={closeRef} type="button" className={styles.control} onClick={() => dialogRef.current?.close()} aria-label="Close photo gallery">Close ×</button>
        </div>
        {isOpen && (
          <div className={styles.lightboxImage}>
            <Photograph key={images[activeIndex]} src={images[activeIndex]} alt={`${alt} — photo ${activeIndex + 1} of ${images.length}`} sizes="(max-width: 1200px) 94vw, 1120px" expanded />
          </div>
        )}
        <div className={styles.lightboxFooter}>
          <button type="button" className={styles.control} onClick={() => movePhoto(-1)} disabled={images.length < 2} aria-label="Previous photo">← Previous</button>
          <p aria-live="polite" aria-atomic="true">{activeIndex + 1} / {images.length}</p>
          <button type="button" className={styles.control} onClick={() => movePhoto(1)} disabled={images.length < 2} aria-label="Next photo">Next →</button>
        </div>
      </dialog>
    </div>
  );
}
