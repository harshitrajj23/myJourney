import type { Metadata } from "next";
import React from "react";
import styles from "@/components/admin/AdminShell.module.css";

export const metadata: Metadata = {
  title: "Admin Mission Control — Harshit Raj Core",
  description: "Private administrative operations and content governance center.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.root} font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200`}>
      {children}
    </div>
  );
}
