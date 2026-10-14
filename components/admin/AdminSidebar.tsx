"use client";

import Link from "next/link";
import { LayoutDashboard, Calendar, Layers, Image as ImageIcon, Sliders, Cpu, LogOut, ArrowUpRight } from "lucide-react";
import styles from "./AdminShell.module.css";

export type AdminTab = "overview" | "timeline" | "projects" | "media" | "site-config" | "system";

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onLogout: () => void;
  counts: { timeline: number; projects: number; mediaAlbums: number };
}

export default function AdminSidebar({ currentTab, onSelectTab, onLogout, counts }: AdminSidebarProps) {
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "timeline", label: "Timeline", icon: Calendar, badge: counts.timeline },
    { id: "projects", label: "Projects", icon: Layers, badge: counts.projects },
    { id: "media", label: "Media", icon: ImageIcon, badge: counts.mediaAlbums },
    { id: "site-config", label: "Site settings", icon: Sliders },
    { id: "system", label: "System", icon: Cpu },
  ] satisfies { id: AdminTab; label: string; icon: typeof Cpu; badge?: number }[];

  return (
    <aside className={styles.sidebar} aria-label="Admin workspace">
      <div className={styles.brand}>
        <span className={styles.brandName}>myJourney</span>
        <span className={styles.brandLabel}>Admin</span>
      </div>

      <nav className={styles.nav} aria-label="Admin sections">
        <div className={styles.navItems}>
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              type="button"
              className={styles.navButton}
              aria-current={currentTab === id ? "page" : undefined}
              onClick={() => onSelectTab(id)}
            >
              <Icon size={16} className={styles.navIcon} aria-hidden="true" />
              <span className={styles.navText}>{label}</span>
              {badge !== undefined && <span className={styles.navCount}>{badge}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.account}>
          <span className={styles.accountAvatar} aria-hidden="true">HR</span>
          <div>
            <p className={styles.accountName}>Harshit Raj</p>
            <p className={styles.accountRole}>Administrator</p>
          </div>
        </div>
        <Link href="/" target="_blank" rel="noopener noreferrer" className={styles.footerAction}>
          <span>Preview portfolio</span><ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only">(opens in new tab)</span>
        </Link>
        <button type="button" onClick={onLogout} className={styles.footerAction}>
          <LogOut size={15} aria-hidden="true" />Sign out
        </button>
      </div>
    </aside>
  );
}
