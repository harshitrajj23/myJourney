"use client";

import { RefreshCw, ChevronRight } from "lucide-react";
import type { AdminTab } from "./AdminSidebar";
import styles from "./AdminShell.module.css";

interface AdminHeaderProps {
  currentTab: AdminTab;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: string;
}

const TAB_TITLES: Record<AdminTab, string> = {
  overview: "Overview",
  timeline: "Timeline",
  projects: "Projects",
  media: "Media",
  "site-config": "Site settings",
  system: "System",
};

export default function AdminHeader({ currentTab, onRefresh, isRefreshing, lastUpdated }: AdminHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumb}>
        <span>Admin</span>
        <ChevronRight size={13} aria-hidden="true" />
        <h1 className={styles.sectionTitle}>{TAB_TITLES[currentTab]}</h1>
      </div>
      <p className={styles.lastActivity}>Last activity: {lastUpdated}</p>
      <button
        type="button"
        onClick={onRefresh}
        disabled={isRefreshing}
        aria-label={isRefreshing ? "Refreshing site data" : "Refresh site data"}
        title="Reload source data"
        className={styles.refreshButton}
        aria-busy={isRefreshing}
      >
        <RefreshCw size={14} aria-hidden="true" className={isRefreshing ? styles.refreshing : undefined} />
        <span>{isRefreshing ? "Refreshing…" : "Refresh"}</span>
      </button>
    </header>
  );
}
