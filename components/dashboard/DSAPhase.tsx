import { Code2 } from "lucide-react";
import styles from "./OpeningChapters.module.css";

const exampleCode = `#include <vector>

int sum(const std::vector<int>& values) {
  int total = 0;

  for (int value : values) {
    total += value;
  }

  return total;
}`;

export default function DSAPhase() {
  return (
    <section aria-labelledby="dsa-title" className={`${styles.chapter} ${styles.dsaChapter}`} data-journey-reveal>
      <div className={`${styles.container} ${styles.dsaGrid}`}>
        <div className={styles.chapterHeader}>
          <p className={styles.eyebrow}>03 / <time dateTime="2025-09">September 2025</time></p>
          <h2 id="dsa-title" className={styles.chapterTitle}>
            Learning to think<br />in problems.
          </h2>
          <p className={styles.bodyCopy}>
            I started coding with data structures and algorithms in C++. The
            work was about more than recognizing a pattern: it meant breaking
            a problem into steps, considering edge cases, and understanding
            why a solution works.
          </p>
          <p className={styles.bodyCopy}>
            That habit of reasoning carefully became the starting point for
            building larger things.
          </p>
          <dl className={styles.studyDetails}>
            <div><dt>First focus</dt><dd>Data structures &amp; algorithms</dd></div>
            <div><dt>Language</dt><dd>C++</dd></div>
          </dl>
        </div>

        <figure className={styles.codeFigure}>
          <div className={styles.codeArchitecture} aria-hidden="true"><span>01 / INPUT</span><span>02 / REASON</span><span>03 / RETURN</span></div>
          <figcaption className={styles.codeCaption}>
            <span><Code2 size={18} aria-hidden="true" /> A small example</span>
            <span>C++</span>
          </figcaption>
          <pre className={styles.codeBlock}><code>{exampleCode}</code></pre>
          <p className={styles.codeNote}>
            Start with the simple case. What should happen when the collection
            is empty? What changes as the input grows?
          </p>
        </figure>
      </div>
    </section>
  );
}
