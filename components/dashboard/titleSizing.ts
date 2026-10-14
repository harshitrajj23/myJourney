/**
 * Conservative em budget for the widest whitespace-delimited title word in
 * Geist/system sans. Ignore the heading's negative tracking for extra room.
 * This is computed on the server so headings fit before fonts or JS load.
 */
export function titleWordBudget(title: string): number {
  const words = title.trim().split(/\s+/u);

  return Math.max(
    1,
    ...words.map((word) => Array.from(word).reduce((width, letter) => {
      if (/[MWmw@%&]/u.test(letter)) return width + 1.1;
      if (/[ilIjtfr.,'’!|]/u.test(letter)) return width + .45;
      if (/[A-Z]/u.test(letter)) return width + .85;
      return width + .7;
    }, .25)),
  );
}
