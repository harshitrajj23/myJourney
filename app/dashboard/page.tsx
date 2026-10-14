import Link from "next/link";
import { ArrowUp, ArrowUpRight, ChevronDown } from "lucide-react";
import HeroSection from "@/components/dashboard/HeroSection";
import BeforeEngineering from "@/components/dashboard/BeforeEngineering";
import EngineeringEntry from "@/components/dashboard/EngineeringEntry";
import DSAPhase from "@/components/dashboard/DSAPhase";
import CinematicPhase from "@/components/dashboard/CinematicPhase";
import { MotionControl, ReadingProgress } from "@/components/dashboard/JourneyExperience";
import { timelinePhases } from "@/data/timeline";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  return (
    <>
      <a className={styles.skipLink} href="#journey-content">Skip to content</a>
      <ReadingProgress />
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <Link href="/" className={styles.wordmark} aria-label="Harshit Raj — home">hr<span>.</span></Link>
          <span className={styles.mastheadNote}>Harshit Raj <span>/</span> Developer &amp; builder</span>
          <nav className={styles.navigation} aria-label="Journey navigation">
            <a href="#intro">Introduction</a>
            <a href="#journey">The journey</a>
            <Link href="/beyond-studies">Beyond code <ArrowUpRight size={13} aria-hidden="true" /></Link>
          </nav>
          <MotionControl />
        </div>
      </header>

      <main id="journey-content" tabIndex={-1}>
        <HeroSection />
        <BeforeEngineering />
        <EngineeringEntry />
        <DSAPhase />

        <section id="journey" className={styles.archiveIntro} aria-labelledby="archive-heading" data-journey-reveal>
          <span className={styles.archiveNumber} aria-hidden="true">{String(timelinePhases.length).padStart(2, "0")}</span>
          <div className={styles.archiveHeading}>
            <div>
              <p className={styles.eyebrow}>The build log / {String(timelinePhases.length).padStart(2, "0")} entries</p>
              <h2 id="archive-heading">Less theory.<br /><span>More making.</span></h2>
            </div>
            <p className={styles.archiveDescription}>
              Hackathons, experiments, and shipped projects. The work, the people,
              and what each experience taught me.
            </p>
          </div>
          <details className={styles.index}>
            <summary>Jump to an entry <ChevronDown size={16} aria-hidden="true" /></summary>
            <nav aria-label="Journey entry index" className={styles.indexGrid}>
              {timelinePhases.map((phase, index) => (
                <a key={phase.id} href={`#entry-${phase.id}`}>
                  <span className={styles.indexNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span>{phase.title}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </details>
        </section>

        {timelinePhases.map((phase, index) => (
          <CinematicPhase key={phase.id} phase={phase} index={index} />
        ))}

        <section className={styles.closing} aria-labelledby="closing-heading" data-journey-reveal>
          <div className={styles.closingInner}>
            <p className={styles.eyebrow}>Still learning. Still building.</p>
            <h2 id="closing-heading">Pressure<br /><span>reveals skill.</span></h2>
            <div className={styles.closingBottom}>
              <p>There’s more to the story than the projects. Find the code on GitHub, or a few moments from life outside it.</p>
              <div className={styles.closingLinks}>
                <a href="https://github.com/harshitrajj23" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>
                <Link href="/beyond-studies">Beyond studies <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Harshit Raj</p>
        <span>Personal work &amp; notes</span>
        <a href="#intro">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
      </footer>
    </>
  );
}
