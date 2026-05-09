import CursorGlow from "@/components/ui/CursorGlow";
import ScrollProgress from "@/components/ui/ScrollProgress";
import LenisProvider from "@/components/providers/LenisProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Harshit Raj's Journey",
  description:
    "Explore the cinematic journey of Harshit Raj through hackathons, projects, and real-world building under pressure.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <CursorGlow />
      <ScrollProgress />
      <main className="relative bg-[#050507] text-white">
        {children}
      </main>
    </LenisProvider>
  );
}
