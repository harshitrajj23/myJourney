"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Globe,
  Zap,
  Save,
} from "lucide-react";

export interface SiteConfig {
  authorName: string;
  tagline: string;
  githubUrl: string;
  enableSnakeLine: boolean;
  enableLenisScroll: boolean;
  enableWaterCanvas: boolean;
  enableCursorGlow: boolean;
  enableSoundscape: boolean;
  seoDescription: string;
  themeMode: "obsidian" | "midnight" | "neon";
}

interface SiteConfigTabProps {
  config: SiteConfig;
  onSaveConfig: (updated: SiteConfig) => void;
}

export default function SiteConfigTab({
  config,
  onSaveConfig,
}: SiteConfigTabProps) {
  const [form, setForm] = useState<SiteConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggle = (key: keyof SiteConfig) => {
    setForm((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#090d16] border border-white/5">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Site Configuration & Feature Flags
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Toggle runtime features, customize author bio, and tune visual shaders.
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Configuration</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400 text-xs font-mono">
          <CheckCircle2 className="w-4 h-4" />
          <span>Configuration saved and applied to runtime cache!</span>
        </div>
      )}

      {/* Feature Flags Grid */}
      <div className="rounded-2xl bg-[#090d16] border border-white/5 p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/5">
          <Zap className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Runtime Feature Flags</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Flag 1: Snake Journey Line */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div>
              <span className="text-xs font-semibold text-white block">
                SVG Snake Journey Line
              </span>
              <span className="text-[11px] text-white/40">
                Persistent animated path tracing hackathons down the viewport.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("enableSnakeLine")}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                form.enableSnakeLine ? "bg-cyan-500" : "bg-white/10"
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  form.enableSnakeLine ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Flag 2: Lenis Smooth Scroll */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div>
              <span className="text-xs font-semibold text-white block">
                Lenis Smooth Scroll Engine
              </span>
              <span className="text-[11px] text-white/40">
                Inertial physics-based scroll animation for cinematic pacing.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("enableLenisScroll")}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                form.enableLenisScroll ? "bg-cyan-500" : "bg-white/10"
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  form.enableLenisScroll ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Flag 3: Interactive Water Canvas */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div>
              <span className="text-xs font-semibold text-white block">
                Interactive Water Shaders
              </span>
              <span className="text-[11px] text-white/40">
                WebGL dynamic fluid distortion on Beyond Studies memory album.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("enableWaterCanvas")}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                form.enableWaterCanvas ? "bg-cyan-500" : "bg-white/10"
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  form.enableWaterCanvas ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Flag 4: Cursor Glow */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div>
              <span className="text-xs font-semibold text-white block">
                Ambient Cursor Glow
              </span>
              <span className="text-[11px] text-white/40">
                Hardware-accelerated radial spotlight following pointer position.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("enableCursorGlow")}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                form.enableCursorGlow ? "bg-cyan-500" : "bg-white/10"
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  form.enableCursorGlow ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Author & Profile Information */}
      <div className="rounded-2xl bg-[#090d16] border border-white/5 p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/5">
          <Globe className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Author & Identity Parameters</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-white/60 mb-1.5">
              Author Display Name
            </label>
            <input
              type="text"
              value={form.authorName}
              onChange={(e) =>
                setForm({ ...form, authorName: e.target.value })
              }
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-white/60 mb-1.5">
              Primary Tagline
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-white/60 mb-1.5">
              GitHub Profile Link
            </label>
            <input
              type="text"
              value={form.githubUrl}
              onChange={(e) =>
                setForm({ ...form, githubUrl: e.target.value })
              }
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-white/60 mb-1.5">
              Visual Theme Core
            </label>
            <select
              value={form.themeMode}
              onChange={(e) =>
                setForm({
                  ...form,
                  themeMode: e.target.value as "obsidian" | "midnight" | "neon",
                })
              }
              className="w-full px-3 py-2 bg-[#090d16] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
            >
              <option value="obsidian">Obsidian Deep Space (#050507)</option>
              <option value="midnight">Midnight Carbon (#0a0d14)</option>
              <option value="neon">Cyberpunk Neon Spectrum</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-white/60 mb-1.5">
            Global SEO Description
          </label>
          <textarea
            rows={2}
            value={form.seoDescription}
            onChange={(e) =>
              setForm({ ...form, seoDescription: e.target.value })
            }
            className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>
    </form>
  );
}
