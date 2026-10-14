import type { Metadata } from "next";
import styles from "./dashboard.module.css";
import JourneyExperience from "@/components/dashboard/JourneyExperience";

export const metadata: Metadata = {
  title: "Dashboard — Harshit Raj's Journey",
  description:
    "A personal record of Harshit Raj’s engineering journey: first principles, hackathons, and projects built along the way.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JourneyExperience className={styles.root}>{children}</JourneyExperience>
  );
}
