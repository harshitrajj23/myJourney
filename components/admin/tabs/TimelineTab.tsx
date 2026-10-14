"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Search,
  Plus,
  Edit3,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  GitBranch,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { TimelinePhase } from "@/data/timeline";

interface TimelineTabProps {
  timeline: TimelinePhase[];
  onSaveTimeline: (updated: TimelinePhase[]) => void;
  onOpenEditModal: (phase: TimelinePhase) => void;
  onOpenAddModal: () => void;
}

export default function TimelineTab({
  timeline,
  onSaveTimeline,
  onOpenEditModal,
  onOpenAddModal,
}: TimelineTabProps) {
  const [search, setSearch] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique themes
  const uniqueThemes = useMemo(() => {
    const themes = new Set<string>();
    timeline.forEach((t) => {
      if (t.theme) themes.add(t.theme);
    });
    return Array.from(themes);
  }, [timeline]);

  // Filtered timeline
  const filtered = useMemo(() => {
    return timeline.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.event.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        (item.narrative && item.narrative.toLowerCase().includes(search.toLowerCase())) ||
        (item.techStack &&
          item.techStack.some((t) =>
            t.toLowerCase().includes(search.toLowerCase())
          ));

      const matchTheme =
        selectedTheme === "all" || item.theme === selectedTheme;

      return matchSearch && matchTheme;
    });
  }, [timeline, search, selectedTheme]);

  const handleMove = (index: number, direction: "up" | "down") => {
    const newIdx = direction === "up" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= timeline.length) return;

    const copy = [...timeline];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;

    // Re-assign order numbers
    const updated = copy.map((item, i) => ({
      ...item,
      order: i + 1,
    }));

    onSaveTimeline(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this hackathon milestone?")) {
      const updated = timeline
        .filter((t) => t.id !== id)
        .map((item, i) => ({ ...item, order: i + 1 }));
      onSaveTimeline(updated);
    }
  };

  const handleDuplicate = (phase: TimelinePhase) => {
    const newPhase: TimelinePhase = {
      ...phase,
      id: `${phase.id}-copy-${Date.now().toString().slice(-4)}`,
      title: `${phase.title} (Copy)`,
      order: timeline.length + 1,
    };
    onSaveTimeline([...timeline, newPhase]);
  };

  const copyJson = (phase: TimelinePhase) => {
    navigator.clipboard.writeText(JSON.stringify(phase, null, 2));
    setCopiedId(phase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#090d16] border border-white/5">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hackathons, stacks, narratives..."
              className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          {/* Theme Filter */}
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white/80 focus:outline-none focus:border-purple-500/50"
          >
            <option value="all" className="bg-[#090d16]">All Themes ({timeline.length})</option>
            {uniqueThemes.map((t) => (
              <option key={t} value={t} className="bg-[#090d16]">
                {t}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Hackathon</span>
        </button>
      </div>

      {/* Hackathons Cards List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#090d16] border border-white/5">
            <Calendar className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <p className="text-sm text-white/50">No hackathon milestones match your filter.</p>
          </div>
        ) : (
          filtered.map((phase) => {
            const rawIdx = timeline.findIndex((t) => t.id === phase.id);

            return (
              <div
                key={phase.id}
                className="group relative rounded-2xl bg-[#090d16] border border-white/5 hover:border-purple-500/30 p-6 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Column: Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold flex items-center justify-center">
                        #{rawIdx + 1}
                      </span>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {phase.title}
                      </h3>
                      <span className="text-xs text-white/40 font-mono">
                        ({phase.event})
                      </span>
                      {phase.date && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 text-cyan-300 border border-white/10">
                          {phase.date}
                        </span>
                      )}
                      {phase.theme && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {phase.theme}
                        </span>
                      )}
                    </div>

                    {/* Narrative & Description */}
                    <div className="space-y-1.5 text-xs text-white/60 leading-relaxed">
                      {phase.narrative && (
                        <p className="text-white/80 font-medium italic">
                          &ldquo;{phase.narrative}&rdquo;
                        </p>
                      )}
                      <p className="text-white/50">{phase.description}</p>
                    </div>

                    {/* Emotional Note */}
                    {phase.emotionalNote && (
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-purple-300/80 font-mono">
                        <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-0.5">
                          Emotional Note:
                        </span>
                        {phase.emotionalNote}
                      </div>
                    )}

                    {/* Tech Stack Pills & Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {phase.techStack && phase.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {phase.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-white/60 border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 ml-auto text-xs">
                        {phase.github && (
                          <a
                            href={phase.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-white/40 hover:text-white transition-colors"
                          >
                            <GitBranch className="w-3.5 h-3.5" />
                            <span>Repo</span>
                          </a>
                        )}
                        {phase.liveUrl && (
                          <a
                            href={phase.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex md:flex-col items-center gap-1.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMove(rawIdx, "up")}
                        disabled={rawIdx === 0}
                        title="Move Up"
                        className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/50 hover:text-white disabled:opacity-20 cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMove(rawIdx, "down")}
                        disabled={rawIdx === timeline.length - 1}
                        title="Move Down"
                        className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/50 hover:text-white disabled:opacity-20 cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyJson(phase)}
                        title="Copy JSON snippet"
                        className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/50 hover:text-white cursor-pointer"
                      >
                        {copiedId === phase.id ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDuplicate(phase)}
                        title="Duplicate milestone"
                        className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/50 hover:text-white cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onOpenEditModal(phase)}
                        title="Edit milestone"
                        className="p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(phase.id)}
                        title="Delete milestone"
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
