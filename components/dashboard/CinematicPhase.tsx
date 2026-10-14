import { getImagePaths } from "@/lib/utils";
import type { CSSProperties } from "react";
import type { TimelinePhase as TimelinePhaseType } from "@/data/timeline";
import CinematicGallery from "./CinematicGallery";
import { titleWordBudget } from "./titleSizing";
import styles from "./JourneyArchive.module.css";

interface CinematicPhaseProps {
  phase: TimelinePhaseType;
  index: number;
}

export default function CinematicPhase({ phase, index }: CinematicPhaseProps) {
  const images = getImagePaths(phase.imageFolder);
  const sceneModes = ["split", "stack", "panorama", "spotlight"] as const;
  const sceneMode = sceneModes[index % sceneModes.length];
  const accentMode = index % 2 === 0 ? "lime" : "violet";
  const titleStyle = {
    "--title-word-em": titleWordBudget(phase.title),
  } as CSSProperties;

  return (
    <section
      id={`entry-${phase.id}`}
      aria-labelledby={`entry-title-${phase.id}`}
      className={`${styles.entry} ${sceneMode === "split" ? styles.splitScene : styles[sceneMode]} ${styles[accentMode]}`}
      data-scene={sceneMode}
      data-phase={phase.id}
      data-journey-reveal
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.noise} />
        <span className={styles.vignette} />
      </div>

      <div className={styles.rail}>
        <span className={styles.railLabel}>Archive / field notes</span>
        <span className={styles.ordinal}>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.railMarker} aria-hidden="true" />
        <div className={styles.dateGroup}>
          {phase.date && <span className={styles.date}>{phase.date}</span>}
          {phase.dateLabel && <span className={styles.dateLabel}>{phase.dateLabel}</span>}
        </div>
      </div>

      <div className={styles.split}>
        <div className={styles.story}>
          <header className={styles.storyHeading}>
            <p className={styles.theme}>{phase.theme}</p>
            {phase.event && phase.event !== phase.title && (
              <p className={styles.eyebrow}>{phase.event}</p>
            )}
            <h2 id={`entry-title-${phase.id}`} className={styles.title} style={titleStyle}>
              {phase.title}
            </h2>
          </header>
          <div className={styles.storyBody}>
            <p className={styles.narrative}>{phase.narrative}</p>
            <p className={styles.description}>{phase.description}</p>

            {(phase.project || phase.techStack?.length) ? (
              <dl className={styles.details}>
                {phase.project && (
                  <div><dt>Project</dt><dd>{phase.project}</dd></div>
                )}
                {Boolean(phase.techStack?.length) && (
                  <div><dt>Built with</dt><dd>{phase.techStack?.join(" · ")}</dd></div>
                )}
              </dl>
            ) : null}

            {phase.achievement && (
              <div className={styles.achievement}>
                <span className={styles.achievementMark} aria-hidden="true">↗</span>
                <div><p>Recognition</p><strong>{phase.achievement}</strong></div>
              </div>
            )}

            {phase.emotionalNote && <p className={styles.emotionalNote}>{phase.emotionalNote}</p>}

            {(phase.liveUrl || phase.github) && (
              <div className={styles.links}>
                {phase.liveUrl && (
                  <a href={phase.liveUrl} target="_blank" rel="noopener noreferrer">
                    Visit project <span aria-hidden="true">↗</span>
                    <span className={styles.srOnly}> (opens in a new tab)</span>
                  </a>
                )}
                {phase.github && (
                  <a href={phase.github} target="_blank" rel="noopener noreferrer">
                    View code <span aria-hidden="true">↗</span>
                    <span className={styles.srOnly}> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <CinematicGallery images={images} alt={phase.title} />
      </div>
    </section>
  );
}
