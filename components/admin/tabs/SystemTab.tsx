"use client";

import React, { useState } from "react";
import {
  Key,
  Eye,
  EyeOff,
  Copy,
  Check,
  Download,
  Server,
  Code2,
} from "lucide-react";
import { TimelinePhase } from "@/data/timeline";
import { EliteProject } from "@/data/eliteProjects";

interface SystemTabProps {
  timeline: TimelinePhase[];
  projects: EliteProject[];
  imageMap: Record<string, string[]>;
}

export default function SystemTab({
  timeline,
  projects,
  imageMap,
}: SystemTabProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedBackup, setCopiedBackup] = useState(false);

  const adminPassword = "HarshitJourney#2026!SecuredAdminVault99";
  const adminSecret =
    "c92f1b8a4e3d67104bfa902187315a6b87e248109d31f5c6e84920173829ad01";

  const handleCopy = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getFullBackup = () => {
    return {
      exportedAt: new Date().toISOString(),
      siteVersion: "2.4.0",
      architecture: "Next.js 16.2.6 App Router & React 19",
      timelinePhases: timeline,
      eliteProjects: projects,
      imageMap: imageMap,
    };
  };

  const handleDownloadBackup = () => {
    const data = getFullBackup();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `journey-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyBackup = () => {
    const data = getFullBackup();
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedBackup(true);
    setTimeout(() => setCopiedBackup(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Environment Variables & Secrets Vault */}
      <div className="rounded-2xl bg-[#090d16] border border-white/5 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">
              Environment Secrets & Credentials Inspector
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            ENCRYPTION ACTIVE
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {/* Secret 1: ADMIN_PASSWORD */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-white/40 block text-[10px]">
                KEY: ADMIN_PASSWORD
              </span>
              <span className="text-white">
                {showPassword ? adminPassword : "••••••••••••••••••••••••••••••••"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white cursor-pointer"
                title={showPassword ? "Hide password" : "Reveal password"}
              >
                {showPassword ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => handleCopy(adminPassword, "pwd")}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white cursor-pointer"
                title="Copy password"
              >
                {copiedKey === "pwd" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Secret 2: ADMIN_SESSION_SECRET */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-white/40 block text-[10px]">
                KEY: ADMIN_SESSION_SECRET
              </span>
              <span className="text-white truncate max-w-xs md:max-w-md block">
                {showSecret
                  ? adminSecret
                  : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowSecret(!showSecret)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white cursor-pointer"
                title={showSecret ? "Hide secret" : "Reveal secret"}
              >
                {showSecret ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => handleCopy(adminSecret, "sec")}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white cursor-pointer"
                title="Copy secret"
              >
                {copiedKey === "sec" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Telemetry & Engine Diagnostics */}
      <div className="rounded-2xl bg-[#090d16] border border-white/5 p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/5">
          <Server className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">
            Engine & Hardware Diagnostics
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-white/40 block text-[10px] uppercase">
              Application Core
            </span>
            <span className="text-white font-bold text-sm">Next.js 16.2.6</span>
            <span className="text-emerald-400 block text-[10px] mt-1">
              Turbopack Enabled
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-white/40 block text-[10px] uppercase">
              Rendering Target
            </span>
            <span className="text-white font-bold text-sm">React 19.2.4</span>
            <span className="text-cyan-400 block text-[10px] mt-1">
              Async Cookies & Actions
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-white/40 block text-[10px] uppercase">
              Stylesheet System
            </span>
            <span className="text-white font-bold text-sm">Tailwind CSS v4</span>
            <span className="text-purple-400 block text-[10px] mt-1">
              @theme CSS Layer
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-white/40 block text-[10px] uppercase">
              Scroll Orchestration
            </span>
            <span className="text-white font-bold text-sm">Lenis v1.3</span>
            <span className="text-pink-400 block text-[10px] mt-1">
              Smooth Inertial Easing
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-white/40 block text-[10px] uppercase">
              Motion & Physics
            </span>
            <span className="text-white font-bold text-sm">GSAP + Framer</span>
            <span className="text-amber-400 block text-[10px] mt-1">
              ScrollTrigger Integrated
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-white/40 block text-[10px] uppercase">
              Security Protocol
            </span>
            <span className="text-white font-bold text-sm">HMAC-SHA256</span>
            <span className="text-emerald-400 block text-[10px] mt-1">
              HttpOnly Secure Session
            </span>
          </div>
        </div>
      </div>

      {/* Snapshot Backup & JSON Export */}
      <div className="rounded-2xl bg-[#090d16] border border-white/5 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <div>
              <h3 className="text-sm font-semibold text-white">
                Comprehensive State Backup (JSON)
              </h3>
              <p className="text-xs text-white/50">
                Download or copy the complete data snapshot for version control.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyBackup}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-white/80 hover:text-white transition-all cursor-pointer"
            >
              {copiedBackup ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownloadBackup}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs font-mono transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Backup</span>
            </button>
          </div>
        </div>

        {/* JSON Preview Window */}
        <div className="relative rounded-xl bg-black/40 border border-white/5 p-4 max-h-60 overflow-y-auto font-mono text-[11px] text-white/60">
          <pre>{JSON.stringify(getFullBackup(), null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
