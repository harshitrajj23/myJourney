"use client";

import React, { useState } from "react";
import AdminAuthGate from "./AdminAuthGate";
import AdminSidebar, { AdminTab } from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import OverviewTab from "./tabs/OverviewTab";
import TimelineTab from "./tabs/TimelineTab";
import ProjectsTab from "./tabs/ProjectsTab";
import MediaVaultTab from "./tabs/MediaVaultTab";
import SiteConfigTab, { SiteConfig } from "./tabs/SiteConfigTab";
import SystemTab from "./tabs/SystemTab";
import HackathonModal from "./modals/HackathonModal";
import ProjectModal from "./modals/ProjectModal";
import styles from "./AdminShell.module.css";

import { timelinePhases as defaultTimeline, TimelinePhase } from "@/data/timeline";
import { eliteProjects as defaultProjects, EliteProject } from "@/data/eliteProjects";
import { imageMap as defaultImageMap } from "@/data/images";

interface AdminDashboardProps {
  initialIsAuthenticated: boolean;
}

const STORAGE_KEYS = {
  TIMELINE: "journey_admin_timeline",
  PROJECTS: "journey_admin_projects",
  IMAGES: "journey_admin_images",
  CONFIG: "journey_admin_config",
};

const DEFAULT_CONFIG: SiteConfig = {
  authorName: "Harshit Raj",
  tagline: "Pressure Reveals Skill",
  githubUrl: "https://github.com/harshitrajj23",
  enableSnakeLine: true,
  enableLenisScroll: true,
  enableWaterCanvas: true,
  enableCursorGlow: true,
  enableSoundscape: false,
  seoDescription:
    "An immersive cinematic experience documenting the evolution of a builder. From DSA to hackathons, from pressure to skill.",
  themeMode: "obsidian",
};

export default function AdminDashboard({
  initialIsAuthenticated,
}: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);
  const [currentTab, setCurrentTab] = useState<AdminTab>("overview");
  const [timeline, setTimeline] = useState<TimelinePhase[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.TIMELINE);
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return defaultTimeline;
  });

  const [projects, setProjects] = useState<EliteProject[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return defaultProjects;
  });

  const [imageMap, setImageMap] = useState<Record<string, string[]>>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.IMAGES);
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return defaultImageMap;
  });

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return DEFAULT_CONFIG;
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");

  // Modals state
  const [editingHackathon, setEditingHackathon] = useState<TimelinePhase | null>(null);
  const [isAddHackathonOpen, setIsAddHackathonOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<EliteProject | null>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const handleSaveTimeline = (updated: TimelinePhase[]) => {
    setTimeline(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(updated));
    } catch {}
    setLastUpdated(new Date().toLocaleTimeString());
  };

  const handleSaveProjects = (updated: EliteProject[]) => {
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    } catch {}
    setLastUpdated(new Date().toLocaleTimeString());
  };

  const handleSaveImageMap = (updated: Record<string, string[]>) => {
    setImageMap(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(updated));
    } catch {}
    setLastUpdated(new Date().toLocaleTimeString());
  };

  const handleSaveConfig = (updated: SiteConfig) => {
    setSiteConfig(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
    } catch {}
    setLastUpdated(new Date().toLocaleTimeString());
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    setIsAuthenticated(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/data");
      if (res.ok) {
        const data = await res.json();
        if (data.timelinePhases) setTimeline(data.timelinePhases);
        if (data.eliteProjects) setProjects(data.eliteProjects);
        if (data.imageMap) setImageMap(data.imageMap);
      }
    } catch (e) {
      console.warn("Refresh failed:", e);
    } finally {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString());
    }
  };

  // If unauthorized, render high-tech Vault Authentication screen
  if (!isAuthenticated) {
    return <AdminAuthGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className={styles.shell}>
      <a href="#admin-content" className={styles.skipLink}>Skip to content</a>
      {/* Sidebar Navigation */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onLogout={handleLogout}
        counts={{
          timeline: timeline.length,
          projects: projects.length,
          mediaAlbums: Object.keys(imageMap).length,
        }}
      />

      {/* Main Content Area */}
      <div className={styles.workspace}>
        <AdminHeader
          currentTab={currentTab}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          lastUpdated={lastUpdated}
        />

        <main id="admin-content" tabIndex={-1} className={styles.main}>
          <div key={currentTab} className={styles.tabContent}>
          {currentTab === "overview" && (
            <OverviewTab
              timeline={timeline}
              projects={projects}
              imageMap={imageMap}
              onNavigateTab={setCurrentTab}
              onOpenNewHackathon={() => setIsAddHackathonOpen(true)}
              onOpenNewProject={() => setIsAddProjectOpen(true)}
            />
          )}

          {currentTab === "timeline" && (
            <TimelineTab
              timeline={timeline}
              onSaveTimeline={handleSaveTimeline}
              onOpenEditModal={(phase) => setEditingHackathon(phase)}
              onOpenAddModal={() => setIsAddHackathonOpen(true)}
            />
          )}

          {currentTab === "projects" && (
            <ProjectsTab
              projects={projects}
              onSaveProjects={handleSaveProjects}
              onOpenEditModal={(proj) => setEditingProject(proj)}
              onOpenAddModal={() => setIsAddProjectOpen(true)}
            />
          )}

          {currentTab === "media" && (
            <MediaVaultTab
              imageMap={imageMap}
              onSaveImageMap={handleSaveImageMap}
            />
          )}

          {currentTab === "site-config" && (
            <SiteConfigTab
              config={siteConfig}
              onSaveConfig={handleSaveConfig}
            />
          )}

          {currentTab === "system" && (
            <SystemTab
              timeline={timeline}
              projects={projects}
              imageMap={imageMap}
            />
          )}
          </div>
        </main>
      </div>

      {/* Hackathon Add / Edit Modal */}
      <HackathonModal
        key={editingHackathon?.id ?? (isAddHackathonOpen ? "new-hackathon" : "closed")}
        isOpen={isAddHackathonOpen || editingHackathon !== null}
        onClose={() => {
          setIsAddHackathonOpen(false);
          setEditingHackathon(null);
        }}
        initialData={editingHackathon}
        existingCount={timeline.length}
        onSave={(phase) => {
          if (editingHackathon) {
            const updated = timeline.map((t) =>
              t.id === phase.id ? phase : t
            );
            handleSaveTimeline(updated);
          } else {
            handleSaveTimeline([...timeline, phase]);
          }
        }}
      />

      {/* Project Add / Edit Modal */}
      <ProjectModal
        key={editingProject?.id ?? (isAddProjectOpen ? "new-project" : "closed")}
        isOpen={isAddProjectOpen || editingProject !== null}
        onClose={() => {
          setIsAddProjectOpen(false);
          setEditingProject(null);
        }}
        initialData={editingProject}
        onSave={(proj) => {
          if (editingProject) {
            const updated = projects.map((p) =>
              p.id === proj.id ? proj : p
            );
            handleSaveProjects(updated);
          } else {
            handleSaveProjects([...projects, proj]);
          }
        }}
      />
    </div>
  );
}
