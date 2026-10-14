"use client";

import { ArrowRight, ArrowUpRight, Calendar, Layers, Monitor, Plus } from "lucide-react";
import type { TimelinePhase } from "@/data/timeline";
import type { EliteProject } from "@/data/eliteProjects";
import type { AdminTab } from "../AdminSidebar";
import styles from "./OverviewTab.module.css";

interface OverviewTabProps {
  timeline: TimelinePhase[];
  projects: EliteProject[];
  imageMap: Record<string, string[]>;
  onNavigateTab: (tab: AdminTab) => void;
  onOpenNewHackathon: () => void;
  onOpenNewProject: () => void;
}

const categoryLabels: Record<EliteProject["category"], string> = {
  "ai-ml": "AI / ML",
  healthcare: "Healthcare",
  platform: "Platform",
  hackathon: "Hackathon",
};

export default function OverviewTab({
  timeline,
  projects,
  imageMap,
  onNavigateTab,
  onOpenNewHackathon,
  onOpenNewProject,
}: OverviewTabProps) {
  const totalImages = Object.values(imageMap).reduce(
    (total, images) => total + images.length,
    0
  );
  const featuredProjects = projects.filter((project) => project.isFeatured).length;
  const stats: { title: string; value: number; detail: string; tab: AdminTab }[] = [
    { title: "Projects", value: projects.length, detail: `${featuredProjects} featured`, tab: "projects" },
    { title: "Milestones", value: timeline.length, detail: "Timeline entries", tab: "timeline" },
    { title: "Images", value: totalImages, detail: "Media map entries", tab: "media" },
    { title: "Albums", value: Object.keys(imageMap).length, detail: "Media collections", tab: "media" },
  ];

  return (
    <div className={styles.overview}>
      <header className={styles.heading}>
        <div className={styles.headingCopy}>
          <h2>Portfolio at a glance</h2>
          <p>Review your projects, timeline, and media in this editing workspace.</p>
          <div className={styles.actions}>
            <button type="button" className={styles.primaryButton} onClick={onOpenNewProject}>
              <Plus size={16} aria-hidden="true" /> Add project
            </button>
            <button type="button" className={styles.secondaryButton} onClick={onOpenNewHackathon}>
              <Plus size={16} aria-hidden="true" /> Add hackathon
            </button>
          </div>
        </div>
        <div className={styles.stackScene} aria-hidden="true">
          <div className={styles.stack}>
            <span /><span /><span />
          </div>
        </div>
      </header>

      <section className={styles.metrics} aria-label="Workspace content counts">
        {stats.map((stat) => (
          <button
            key={stat.title}
            type="button"
            className={styles.metric}
            onClick={() => onNavigateTab(stat.tab)}
            aria-label={`${stat.title}: ${stat.value}. ${stat.detail}. Open ${stat.tab}`}
          >
            <span className={styles.metricLabel}>{stat.title}<ArrowUpRight size={14} aria-hidden="true" /></span>
            <span className={styles.metricValue}>{stat.value}</span>
            <span className={styles.metricDetail}>{stat.detail}</span>
          </button>
        ))}
      </section>

      <div className={styles.collections}>
        <section className={styles.panel} aria-labelledby="projects-preview-heading">
          <div className={styles.panelHeader}>
            <div>
              <h3 id="projects-preview-heading">Project collection</h3>
              <p>The work behind your portfolio.</p>
            </div>
            <button type="button" className={styles.textButton} onClick={() => onNavigateTab("projects")}>
              All projects <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>

          {projects.length ? (
            <ul className={styles.projectList}>
              {projects.slice(0, 5).map((project, index) => (
                <li key={project.id}>
                  <button
                    type="button"
                    className={styles.projectRow}
                    onClick={() => onNavigateTab("projects")}
                    aria-label={`Open project collection for ${project.title || "Untitled project"}`}
                  >
                    <span className={styles.rowNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.projectBody}>
                      <span className={styles.projectTitle}>{project.title || "Untitled project"}</span>
                      <span className={styles.projectTagline}>{project.tagline || "No tagline added."}</span>
                      {project.technologies.length > 0 && (
                        <span className={styles.technologies}>
                          {project.technologies.slice(0, 3).join(" · ")}
                          {project.technologies.length > 3 && ` · +${project.technologies.length - 3} more`}
                        </span>
                      )}
                    </span>
                    <span className={styles.projectMeta}>
                      <span>{categoryLabels[project.category] || "Uncategorized"}</span>
                      {project.isFeatured && <span className={styles.featured}>Featured</span>}
                    </span>
                    <ArrowUpRight size={16} className={styles.rowArrow} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyState}>
              <Layers size={24} aria-hidden="true" />
              <h4>No projects yet</h4>
              <p>Add your first project to start the collection.</p>
              <button type="button" className={styles.secondaryButton} onClick={onOpenNewProject}>
                <Plus size={16} aria-hidden="true" /> Add project
              </button>
            </div>
          )}
          <p className={styles.panelFootnote}>Showing {Math.min(projects.length, 5)} of {projects.length} projects · {featuredProjects} featured</p>
        </section>

        <section className={`${styles.panel} ${styles.timelinePanel}`} aria-labelledby="timeline-preview-heading">
          <div className={styles.panelHeader}>
            <div>
              <h3 id="timeline-preview-heading">Timeline</h3>
              <p>Your journey, in list order.</p>
            </div>
            <button type="button" className={styles.textButton} onClick={() => onNavigateTab("timeline")}>
              View all <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
          {timeline.length ? (
            <ol className={styles.timelineList}>
              {timeline.slice(0, 5).map((phase) => (
                <li key={phase.id} className={styles.timelineItem}>
                  <span className={styles.date}>{phase.date || "Date not set"}</span>
                  <h4>{phase.title || "Untitled milestone"}</h4>
                  <p>{phase.theme || phase.narrative || "No description added."}</p>
                </li>
              ))}
            </ol>
          ) : (
            <div className={styles.emptyState}>
              <Calendar size={24} aria-hidden="true" />
              <h4>No milestones yet</h4>
              <p>Add a hackathon to begin your timeline.</p>
              <button type="button" className={styles.secondaryButton} onClick={onOpenNewHackathon}>
                <Plus size={16} aria-hidden="true" /> Add hackathon
              </button>
            </div>
          )}
          <p className={styles.panelFootnote}>Showing {Math.min(timeline.length, 5)} of {timeline.length} milestones</p>
        </section>
      </div>

      <aside className={styles.workspaceNote} aria-label="Editing context">
        <Monitor size={19} aria-hidden="true" />
        <div className={styles.noteContent}>
          <h3>Editing in this browser</h3>
          <p>Edits use browser-local storage. Counts reflect the content loaded here; editing does not publish changes to the public portfolio.</p>
        </div>
        <button type="button" className={styles.textButton} onClick={() => onNavigateTab("system")}>
          System settings <ArrowRight size={15} aria-hidden="true" />
        </button>
      </aside>
    </div>
  );
}
