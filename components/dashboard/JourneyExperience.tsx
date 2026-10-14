"use client";

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./JourneyExperience.module.css";

const preferenceQuery = "(prefers-reduced-motion: reduce)";
function subscribeToPreference(onChange: () => void) {
  const query = window.matchMedia(preferenceQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function readPreference() { return window.matchMedia(preferenceQuery).matches; }
function serverPreference() { return true; }

const MotionContext = createContext({
  motionEnabled: false,
  reducedMotion: true,
  toggleMotion: () => {},
});

export function useJourneyMotion() { return useContext(MotionContext); }

export default function JourneyExperience({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useSyncExternalStore(subscribeToPreference, readPreference, serverPreference);
  const [userEnabled, setUserEnabled] = useState(true);
  const motionEnabled = userEnabled && !reducedMotion;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = rootRef.current?.querySelector<HTMLElement>("#intro");
    if (!hero || !motionEnabled) return;
    let visible = false;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const finePointer = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    function update() {
      frame = 0;
      if (!hero || !visible || document.hidden) return;
      const bounds = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -bounds.top / bounds.height));
      hero.style.setProperty("--hero-scroll", String(progress));
      hero.style.setProperty("--hero-x", `${pointerX * 12}px`);
      hero.style.setProperty("--hero-y", `${pointerY * 10}px`);
    }
    function schedule() {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(update);
    }
    function pointer(event: PointerEvent) {
      if (!finePointer.matches) return;
      const bounds = hero!.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      schedule();
    }
    function resetPointer() { pointerX = 0; pointerY = 0; schedule(); }
    function playback() {
      hero!.dataset.heroActive = String(visible && !document.hidden);
      schedule();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      playback();
    });
    observer.observe(hero);
    window.addEventListener("scroll", schedule, { passive: true });
    hero.addEventListener("pointermove", pointer, { passive: true });
    hero.addEventListener("pointerleave", resetPointer);
    document.addEventListener("visibilitychange", playback);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      hero.removeEventListener("pointermove", pointer);
      hero.removeEventListener("pointerleave", resetPointer);
      document.removeEventListener("visibilitychange", playback);
      delete hero.dataset.heroActive;
      ["--hero-scroll", "--hero-x", "--hero-y"].forEach((property) => hero.style.removeProperty(property));
    };
  }, [motionEnabled]);

  useEffect(() => {
    if (!motionEnabled || !rootRef.current || !("IntersectionObserver" in window)) return;
    // Content is visible before observation: motion is an enhancement, never a gate.
    const chapters = rootRef.current.querySelectorAll<HTMLElement>("[data-journey-reveal]");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.entered = "true";
        observer.unobserve(entry.target);
      }
    }, { threshold: .08 });
    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, [motionEnabled]);

  return (
    <MotionContext.Provider value={{ motionEnabled, reducedMotion, toggleMotion: () => setUserEnabled((enabled) => !enabled) }}>
      <div ref={rootRef} className={className} data-motion={motionEnabled ? "enabled" : "paused"}>
        {children}
      </div>
    </MotionContext.Provider>
  );
}

export function ReadingProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`;
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(document.documentElement);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={progressRef} className={styles.progress} aria-hidden="true" />;
}

export function MotionControl() {
  const { motionEnabled, reducedMotion, toggleMotion } = useJourneyMotion();
  const Icon = motionEnabled ? Pause : Play;
  return (
    <button
      type="button"
      className={styles.control}
      onClick={toggleMotion}
      disabled={reducedMotion}
      aria-pressed={motionEnabled}
      aria-label={reducedMotion ? "Motion disabled by your device preference" : motionEnabled ? "Pause visual effects" : "Enable visual effects"}
      title={reducedMotion ? "Reduced motion follows your device preference" : "Toggle visual effects"}
    >
      <Icon size={13} aria-hidden="true" />
      <span>{reducedMotion ? "Reduced motion" : motionEnabled ? "Motion on" : "Motion off"}</span>
    </button>
  );
}
