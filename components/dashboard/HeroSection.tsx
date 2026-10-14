import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ProjectShowcase from "./ProjectShowcase";
import styles from "./HeroExperience.module.css";

export default function HeroSection() {
  return (
    <section id="intro" aria-labelledby="intro-title" className={styles.hero}>
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.aurora} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.heroRule} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.overline}>
          <span>Independent mind. In the making.</span>
          <span className={styles.edition}>Personal portfolio / Field notes</span>
        </div>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Developer &amp; engineering student</p>
            <h1 id="intro-title" className={styles.heroTitle}>
              <span className={styles.titleLine}>Harshit</span>
              <span className={styles.titleLine}>Raj<span className={styles.period}>.</span></span>
            </h1>
            <p className={styles.heroLead}>I build for <em>impact.</em></p>
            <p className={styles.heroDescription}>
              I’m Harshit, an engineering student at BMSIT and a developer
              building for the web. Learning through projects, hackathons,
              and the work it takes to turn an idea into something real.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryLink} href="#journey">
                Explore the journey <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a
                className={styles.secondaryLink}
                href="https://github.com/harshitrajj23"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub (opens in a new tab)"
              >
                View GitHub <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className={styles.artwork}>
            <div className={styles.artLabel} aria-hidden="true">
              <span>Selected work</span><span>Projects / 04</span>
            </div>
            <div className={styles.scenePanel} aria-hidden="true">
              <ProjectShowcase />
            </div>
            <div className={styles.artCoordinates} aria-hidden="true">
              <span>Interfaces / systems / impact</span><span>Built in public</span>
            </div>
            <p className={styles.artNote}>A few things I have shipped</p>
            <figure className={styles.portraitFigure}>
              <div className={styles.portraitFrame}>
                <Image
                  src="/images/owner/image.webp"
                  alt="Harshit Raj seated outdoors on a park bench"
                  fill
                  sizes="(max-width: 599px) 100px, 132px"
                  className={styles.portraitImage}
                  priority
                />
              </div>
              <figcaption className={styles.portraitCaption}>
                <span className={styles.portraitIndex}>The human behind the code</span>
                <span>Harshit Raj <ArrowUpRight size={15} aria-hidden="true" /></span>
                <span className={styles.portraitAside}>Curious, by default.</span>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className={styles.heroFooter}>
          <span>Ideas → experiments → real things</span>
          <a href="#journey">The story so far <ArrowDown size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
