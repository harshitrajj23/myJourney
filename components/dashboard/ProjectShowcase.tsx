"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./ProjectShowcase.module.css";

const projects = [
  {
    number: "01",
    title: "Medi AI",
    category: "Clinical intelligence",
    image: "/images/mediAi/image.webp",
    href: "#entry-medi-ai",
    position: "featured",
    alt: "Medi AI clinical dashboard interface",
  },
  {
    number: "02",
    title: "NeuroAdapt",
    category: "Neuro-cognitive telemetry",
    image: "/images/neuroadapt/image.webp",
    href: "#entry-neuroadapt",
    position: "secondary",
    alt: "NeuroAdapt neuro-cognitive telemetry interface",
  },
  {
    number: "03",
    title: "NammaFix",
    category: "Civic intelligence",
    image: "/images/buildforBengaluru/image.webp",
    href: "#entry-build-for-bengaluru",
    position: "tertiary",
    alt: "NammaFix team photograph",
  },
  {
    number: "04",
    title: "Vyntra",
    category: "Campus platform",
    image: "/images/vyntra/image.webp",
    href: "#entry-vyntra",
    position: "quaternary",
    alt: "Vyntra campus platform interface",
  },
] as const;

export default function ProjectShowcase() {
  return (
    <section className={styles.showcase} aria-label="Selected projects">
      <div className={styles.showcaseHeader}>
        <span>Selected work</span>
        <span>Projects / 04</span>
      </div>
      <div className={styles.cards}>
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.href}
            className={`${styles.card} ${styles[project.position]}`}
          >
            <span className={styles.cardImage}>
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 899px) calc(100vw - 40px), (max-width: 1200px) 42vw, 430px"
                className={styles.image}
                priority={project.position === "featured"}
              />
            </span>
            <span className={styles.cardBody}>
              <span className={styles.cardMeta}>
                <span className={styles.cardNumber}>{project.number}</span>
                <span>{project.category}</span>
              </span>
              <span className={styles.cardTitle}>{project.title}</span>
              <span className={styles.cardAction}>
                Explore project <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </span>
          </a>
        ))}
      </div>
      <p className={styles.showcaseNote}>Real systems. Real interfaces. Real constraints.</p>
    </section>
  );
}
