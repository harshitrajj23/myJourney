import { Atom, Boxes, Gamepad2, GitBranch, Plus, Ruler } from "lucide-react";
import { beforeEngineeringCards } from "@/data/timeline";
import styles from "./OpeningChapters.module.css";

const foundationIcons = [Gamepad2, Ruler, Atom, GitBranch, Boxes];

export default function BeforeEngineering() {
  return (
    <section
      id="foundations"
      data-journey-reveal
      aria-labelledby="foundations-title"
      className={styles.chapter}
    >
      <div className={`${styles.container} ${styles.foundationGrid}`}>
        <header className={styles.chapterHeader}>
          <p className={styles.eyebrow}>01 / Before engineering</p>
          <h2 id="foundations-title" className={styles.chapterTitle}>
            The thinking<br />before the code.
          </h2>
          <p className={styles.bodyCopy}>
            Games, mathematics, physics, and chess gave me ways to think before
            I had a language to build with. I still return to those foundations.
          </p>
          <p className={styles.smallNote}>Open a note to read the connection.</p>
          <div className={styles.foundationDiagram} aria-hidden="true">
            <span>INPUT</span><span>PLAY / QUESTION / REPEAT</span><strong>THINK → BUILD</strong>
          </div>
        </header>

        <div className={styles.foundationList}>
          {beforeEngineeringCards.map((card, index) => {
            const Icon = foundationIcons[index] ?? Boxes;

            return (
              <details className={styles.foundationItem} key={card.title}>
                <summary className={styles.foundationSummary}>
                  <span className={styles.foundationIndex} aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <Icon className={styles.foundationIcon} size={21} />
                  </span>
                  <span className={styles.foundationText}>
                    <span className={styles.foundationTitle}>{card.title}</span>
                    <span className={styles.foundationDescription}>{card.description}</span>
                  </span>
                  <Plus className={styles.expandIcon} size={18} aria-hidden="true" />
                </summary>
                <p className={styles.foundationExplanation}>{card.deepExplanation}</p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
