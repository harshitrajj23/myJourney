"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CinematicIntro from "@/components/landing/CinematicIntro";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch dashboard for instantaneous redirect
    router.prefetch("/dashboard");
  }, [router]);

  const handleEnterJourney = () => {
    router.push("/dashboard");
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <CinematicIntro onEnter={handleEnterJourney} />
    </main>
  );
}
