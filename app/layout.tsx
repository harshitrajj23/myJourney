import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harshit Raj — Cinematic Builder Journey",
  description:
    "An immersive cinematic experience documenting the evolution of a builder. From DSA to hackathons, from pressure to skill. Pressure reveals skill.",
  keywords: [
    "Harshit Raj",
    "Developer",
    "Hackathon",
    "Frontend Engineer",
    "Builder",
    "Portfolio",
  ],
  openGraph: {
    title: "Harshit Raj — Pressure Reveals Skill",
    description:
      "An interactive cinematic journey through hackathons, code, and real-world building.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#050507] text-[#e8e8ec] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
