import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { imageMap } from "@/data/images";

/**
 * Get all image paths from a folder name.
 */
export function getImagePaths(folder: string): string[] {
  return imageMap[folder] || [];
}

/**
 * Lerp helper for smooth interpolation
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}
