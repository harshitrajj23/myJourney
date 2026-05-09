"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "strong" | "subtle";
}

export default function GlassCard({
  children,
  className,
  hover = true,
  variant = "default",
}: GlassCardProps) {
  const variants = {
    default: "bg-white/[0.03] border-white/[0.08] backdrop-blur-xl",
    strong: "bg-white/[0.06] border-white/[0.12] backdrop-blur-2xl",
    subtle: "bg-white/[0.02] border-white/[0.05] backdrop-blur-lg",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-500",
        variants[variant],
        hover &&
          "hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
        className
      )}
    >
      {children}
    </div>
  );
}
