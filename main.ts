// One Word for the Boss — entry program.
//
// Writes exactly one word to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// The word is the whole entry: no phrase, no caption, no explanation.
//
// The word: "Jargonaut"
//   A boss who speaks only in corporate jargon — every sentence a voyage
//   through synergy, bandwidth, circling back and low-hanging fruit, and
//   never once a plain word. Funny on its own, true of bosses everywhere,
//   and fresh enough that no colleague has heard it at lunch yet.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The single word this entry sends. One token, no spaces, no punctuation.
// It has to land on its own: a colleague should be able to repeat it at
// lunch and get the laugh without any caption attached to it.
const WORD = "Jargonaut";

// The gate, checked before anything is written: UTF-8 text of 1 to 30
// characters, not only white space, and exactly one word.
function validate(word: string): void {
  if (word.length < 1 || word.length > 30) {
    throw new Error(`word must be 1-30 characters, got ${word.length}`);
  }
  if (/\s/.test(word)) {
    throw new Error("word must contain no whitespace");
  }
  if (!/^[\p{L}]+$/u.test(word)) {
    throw new Error("word must be letters only");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validate(WORD);
mkdirSync(outDir, { recursive: true });
// No trailing newline: the file holds the word and nothing else.
writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
console.log(`wrote ${WORD.length}-character entry to ${join(outDir, "entry.txt")}`);
