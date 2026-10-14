import Image from "next/image";
import styles from "./OpeningChapters.module.css";

export default function EngineeringEntry() {
  return (
    <section aria-labelledby="engineering-title" className={styles.engineering} data-journey-reveal>
      <div className={styles.container}>
        <div className={styles.engineeringBridge}>
          <figure className={styles.campusFigure}>
            <div className={styles.campusImageFrame}>
              <Image
                src="/images/owner/image%20copy.webp"
                alt="The entrance to BMSIT"
                fill
                sizes="(max-width: 360px) calc(100vw - 64px), 300px"
                className={styles.campusImage}
              />
            </div>
            <figcaption className={styles.smallNote}>BMSIT / Where the next chapter began</figcaption>
          </figure>
          <div className={styles.bridgeCopy}>
            <p className={styles.eyebrow}>02 / Engineering at BMSIT</p>
            <h2 id="engineering-title" className={styles.bridgeTitle}>
              Curiosity found a direction.
            </h2>
            <p className={styles.bodyCopy}>
              Entering BMSIT marked the start of my engineering journey. The
              questions became more practical: how does this work, how can I
              build it, and what could I do better next time?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
