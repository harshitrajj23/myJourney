import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  verifySessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/admin-auth";
import { timelinePhases } from "@/data/timeline";
import { eliteProjects } from "@/data/eliteProjects";
import { imageMap } from "@/data/images";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = verifySessionToken(token);

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Unauthorized access to Admin Core." },
      { status: 401 }
    );
  }

  const siteInfo = {
    title: "Harshit Raj — Cinematic Builder Journey",
    tagline: "Pressure Reveals Skill",
    author: "Harshit Raj",
    github: "https://github.com/harshitrajj23",
    version: "2.4.0",
    buildEngine: "Next.js 16.2.6 (Turbopack) & React 19",
    activeTheme: "Obsidian Cyberpunk Core",
  };

  const systemStatus = {
    uptime: "99.98%",
    nodeEnv: process.env.NODE_ENV || "development",
    totalHackathons: timelinePhases.length,
    totalEliteProjects: eliteProjects.length,
    totalImageAlbums: Object.keys(imageMap).length,
    totalImageAssets: Object.values(imageMap).reduce(
      (acc, curr) => acc + curr.length,
      0
    ),
    lastAudit: new Date().toISOString(),
  };

  return NextResponse.json({
    timelinePhases,
    eliteProjects,
    imageMap,
    siteInfo,
    systemStatus,
  });
}
