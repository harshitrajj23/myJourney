"use client";

import React, { useState } from "react";
import { X, Layers, Save, Star } from "lucide-react";
import { EliteProject } from "@/data/eliteProjects";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: EliteProject) => void;
  initialData?: EliteProject | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ProjectModalProps) {
  const [formData, setFormData] = useState<EliteProject>(() => {
    if (initialData) return initialData;
    return {
      id: `project-${Date.now().toString().slice(-4)}`,
      title: "",
      category: "ai-ml",
      tagline: "",
      badges: ["Solo Engineered"],
      description: "",
      highlights: [],
      repo: "",
      link: "",
      technologies: [],
      isFeatured: false,
      award: "",
      accent: {
        primary: "#06b6d4",
        secondary: "#3b82f6",
        border: "rgba(6,182,212,0.3)",
        bgGlow: "rgba(6,182,212,0.12)",
        text: "#67e8f9",
        pill: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      },
    };
  });

  const [techInput, setTechInput] = useState(
    () => initialData?.technologies?.join(", ") || ""
  );
  const [badgesInput, setBadgesInput] = useState(
    () => initialData?.badges?.join(", ") || "Solo Engineered"
  );
  const [highlightsInput, setHighlightsInput] = useState(
    () => initialData?.highlights?.join("\n") || ""
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTech = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const finalBadges = badgesInput
      .split(",")
      .map((b) => b.trim())
      .filter(Boolean);

    const finalHighlights = highlightsInput
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    onSave({
      ...formData,
      technologies: finalTech,
      badges: finalBadges,
      highlights: finalHighlights,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {initialData ? "Edit Elite Project" : "Add New Elite Project"}
              </h2>
              <p className="text-xs text-white/40">
                Configure flagship architecture, metrics, and technology layers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 mb-1">Project ID</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
                required
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">Project Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="e.g. Medi AI"
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as EliteProject["category"],
                  })
                }
                className="w-full px-3 py-2 bg-[#090d16] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value="ai-ml">AI / Machine Learning</option>
                <option value="healthcare">Healthcare</option>
                <option value="platform">Platform</option>
                <option value="hackathon">Hackathon</option>
              </select>
            </div>

            <div>
              <label className="block text-white/60 mb-1">Award / Distinction</label>
              <input
                type="text"
                value={formData.award || ""}
                onChange={(e) =>
                  setFormData({ ...formData, award: e.target.value })
                }
                placeholder="e.g. Top 30 / 5,000+ Worldwide"
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/60 mb-1">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) =>
                setFormData({ ...formData, tagline: e.target.value })
              }
              placeholder="e.g. Autonomous Multimodal Clinical Diagnostics & Triage Engine"
              required
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-white/60 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Technical summary, problem statement, and key architectural innovations..."
              required
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-white/60 mb-1">
              Badges (Comma-separated)
            </label>
            <input
              type="text"
              value={badgesInput}
              onChange={(e) => setBadgesInput(e.target.value)}
              placeholder="Top 30 Worldwide, Solo Engineered, International Hackathon"
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-white/60 mb-1">
              Technologies (Comma-separated)
            </label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React 19, FastAPI, ChromaDB, BioClinicalBERT, Web Speech API"
              required
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-white/60 mb-1">
              Key Highlights (1 per line)
            </label>
            <textarea
              rows={3}
              value={highlightsInput}
              onChange={(e) => setHighlightsInput(e.target.value)}
              placeholder="BioClinicalBERT & BiomedNLP semantic clinical reasoning&#10;Multimodal medical imaging ingestion via OpenAI CLIP"
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 mb-1">Repository URL</label>
              <input
                type="text"
                value={formData.repo || ""}
                onChange={(e) =>
                  setFormData({ ...formData, repo: e.target.value })
                }
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">Live Demo URL</label>
              <input
                type="text"
                value={formData.link || ""}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                placeholder="https://..."
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured || false}
              onChange={(e) =>
                setFormData({ ...formData, isFeatured: e.target.checked })
              }
              className="rounded bg-white/10 border-white/20 text-cyan-500 focus:ring-0 cursor-pointer"
            />
            <label
              htmlFor="isFeatured"
              className="text-white/80 cursor-pointer flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 text-amber-300" />
              <span>Mark as Featured Project on Top Section</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Elite Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
