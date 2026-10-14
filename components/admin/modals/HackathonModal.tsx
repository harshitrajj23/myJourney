"use client";

import React, { useState } from "react";
import { X, Calendar, Save } from "lucide-react";
import { TimelinePhase } from "@/data/timeline";

interface HackathonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (phase: TimelinePhase) => void;
  initialData?: TimelinePhase | null;
  existingCount: number;
}

export default function HackathonModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  existingCount,
}: HackathonModalProps) {
  const [formData, setFormData] = useState<TimelinePhase>(() => {
    if (initialData) return initialData;
    return {
      id: `hackathon-${Date.now().toString().slice(-4)}`,
      title: "",
      event: "",
      project: "",
      github: "",
      liveUrl: "",
      description: "",
      narrative: "",
      achievement: "",
      theme: "Mindset Shift",
      visualMood: "transformative",
      imageFolder: "buildAndConquer",
      order: existingCount + 1,
      emotionalNote: "",
      techStack: [],
      date: "2025",
      dateLabel: "Milestone",
    };
  });

  const [techInput, setTechInput] = useState(
    () => initialData?.techStack?.join(", ") || ""
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalStack = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      ...formData,
      techStack: finalStack,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {initialData ? "Edit Hackathon Milestone" : "Add New Hackathon Milestone"}
              </h2>
              <p className="text-xs text-white/40">
                Configure timeline entry attributes, narrative, and links.
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
              <label className="block text-white/60 mb-1">Milestone ID</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
                required
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">Display Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="e.g. Build & Conquer"
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">Event / Organizer</label>
              <input
                type="text"
                value={formData.event}
                onChange={(e) =>
                  setFormData({ ...formData, event: e.target.value })
                }
                required
                placeholder="e.g. Build and Conquer by Alterino"
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">Date Tag (e.g. OCT 2025)</label>
              <input
                type="text"
                value={formData.date || ""}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                placeholder="OCT 2025"
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">Theme</label>
              <input
                type="text"
                value={formData.theme}
                onChange={(e) =>
                  setFormData({ ...formData, theme: e.target.value })
                }
                placeholder="e.g. Mindset Shift, High-pressure"
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">Image Folder Key</label>
              <input
                type="text"
                value={formData.imageFolder}
                onChange={(e) =>
                  setFormData({ ...formData, imageFolder: e.target.value })
                }
                placeholder="e.g. nakshatra, buildAndConquer"
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/60 mb-1">
              Short Narrative / Impact Quote
            </label>
            <input
              type="text"
              value={formData.narrative}
              onChange={(e) =>
                setFormData({ ...formData, narrative: e.target.value })
              }
              placeholder="e.g. For the first time, building felt more exciting than solving."
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <div>
            <label className="block text-white/60 mb-1">
              Comprehensive Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Detailed summary of the build, challenges, and architectural insights..."
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <div>
            <label className="block text-white/60 mb-1">Emotional Note</label>
            <input
              type="text"
              value={formData.emotionalNote || ""}
              onChange={(e) =>
                setFormData({ ...formData, emotionalNote: e.target.value })
              }
              placeholder="e.g. This was the turning point. The moment building became more thrilling than solving."
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 mb-1">GitHub Repo Link</label>
              <input
                type="text"
                value={formData.github || ""}
                onChange={(e) =>
                  setFormData({ ...formData, github: e.target.value })
                }
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">Live URL (optional)</label>
              <input
                type="text"
                value={formData.liveUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
                placeholder="https://..."
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/60 mb-1">
              Tech Stack (Comma-separated)
            </label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React, Node.js, MongoDB, Express"
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
            />
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
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Milestone</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
