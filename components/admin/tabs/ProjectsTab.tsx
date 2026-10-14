"use client";

import React, { useState, useMemo } from "react";
import {
  Layers,
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  GitBranch,
  Star,
  Trophy,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { EliteProject } from "@/data/eliteProjects";

interface ProjectsTabProps {
  projects: EliteProject[];
  onSaveProjects: (updated: EliteProject[]) => void;
  onOpenEditModal: (project: EliteProject) => void;
  onOpenAddModal: () => void;
}

export default function ProjectsTab({
  projects,
  onSaveProjects,
  onOpenEditModal,
  onOpenAddModal,
}: ProjectsTabProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedLayerId, setExpandedLayerId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Projects", count: projects.length },
    {
      id: "healthcare",
      label: "Healthcare",
      count: projects.filter((p) => p.category === "healthcare").length,
    },
    {
      id: "ai-ml",
      label: "AI / ML",
      count: projects.filter((p) => p.category === "ai-ml").length,
    },
    {
      id: "platform",
      label: "Platform",
      count: projects.filter((p) => p.category === "platform").length,
    },
    {
      id: "hackathon",
      label: "Hackathon",
      count: projects.filter((p) => p.category === "hackathon").length,
    },
  ];

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.technologies.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        ) ||
        (p.award && p.award.toLowerCase().includes(search.toLowerCase()));

      const matchCategory =
        activeCategory === "all" || p.category === activeCategory;

      return matchSearch && matchCategory;
    });
  }, [projects, search, activeCategory]);

  const toggleFeatured = (id: string) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    );
    onSaveProjects(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this Elite Project?")) {
      const updated = projects.filter((p) => p.id !== id);
      onSaveProjects(updated);
    }
  };

  const handleDuplicate = (project: EliteProject) => {
    const newProj: EliteProject = {
      ...project,
      id: `${project.id}-copy-${Date.now().toString().slice(-4)}`,
      title: `${project.title} (Clone)`,
      isFeatured: false,
    };
    onSaveProjects([...projects, newProj]);
  };

  return (
    <div className="space-y-6">
      {/* Category Pills & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#090d16] border border-white/5">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === c.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "bg-white/[0.02] text-white/50 hover:text-white border border-white/5"
              }`}
            >
              {c.label} ({c.count})
            </button>
          ))}
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Elite Project</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by title, tech stack, award, category..."
          className="w-full pl-10 pr-4 py-2 bg-[#090d16] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[#090d16] border border-white/5">
            <Layers className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <p className="text-sm text-white/50">No projects match your filter criteria.</p>
          </div>
        ) : (
          filtered.map((proj) => {
            const isLayersOpen = expandedLayerId === proj.id;

            return (
              <div
                key={proj.id}
                className="group rounded-2xl bg-[#090d16] border border-white/5 hover:border-cyan-500/30 p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
              >
                {/* Accent glow corner */}
                <div
                  className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-20"
                  style={{ backgroundColor: proj.accent?.primary || "#06b6d4" }}
                />

                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white tracking-tight">
                          {proj.title}
                        </span>
                        {proj.isFeatured && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-300" />
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-cyan-400 font-medium">
                        {proj.tagline}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider bg-white/5 text-white/50 border border-white/5">
                      {proj.category}
                    </span>
                  </div>

                  {/* Award Notice */}
                  {proj.award && (
                    <div className="mb-3 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
                      <Trophy className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-semibold">{proj.award}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-3 mb-4">
                    {proj.description}
                  </p>

                  {/* Badges */}
                  {proj.badges && proj.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {proj.badges.map((b, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {proj.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Tech Layers Accordion */}
                  {proj.techLayers && proj.techLayers.length > 0 && (
                    <div className="mb-4">
                      <button
                        onClick={() =>
                          setExpandedLayerId(isLayersOpen ? null : proj.id)
                        }
                        className="flex items-center gap-1.5 text-[11px] font-mono text-white/40 hover:text-white transition-colors cursor-pointer"
                      >
                        <span>Architecture Layers ({proj.techLayers.length})</span>
                        {isLayersOpen ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>

                      {isLayersOpen && (
                        <div className="mt-2 space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                          {proj.techLayers.map((layer, idx) => (
                            <div key={idx} className="space-y-0.5">
                              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                                {layer.layer}:
                              </span>
                              <p className="text-white/60 text-[11px]">
                                {layer.technologies}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Controls & Links */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs">
                    {proj.repo && (
                      <a
                        href={proj.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-white/50 hover:text-white transition-colors"
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Preview</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleFeatured(proj.id)}
                      title={proj.isFeatured ? "Unfeature" : "Mark as Featured"}
                      className={`p-2 rounded-lg cursor-pointer ${
                        proj.isFeatured
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-white/[0.03] text-white/40 hover:text-white"
                      }`}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(proj)}
                      title="Duplicate project"
                      className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/40 hover:text-white cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenEditModal(proj)}
                      title="Edit project"
                      className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      title="Delete project"
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
