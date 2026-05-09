"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function TransitionPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Autoplay might fail
    });

    // Force transition to happen exactly after 2 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 500); // 0.5s fade to black
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/animations/loop.mp4"
        muted
        playsInline
        preload="auto"
      />

      {/* Fade to black overlay */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeOut ? 1 : 0 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}
