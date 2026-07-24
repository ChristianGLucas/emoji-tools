// Shared helpers for every node in this package. Not a node itself — no
// axiom.yaml entry, no AxiomContext. Factors out length-bound checks,
// code-point/ZWJ/skin-tone/regional-indicator glue, and the small set of
// constants shared across nodes so each node file stays a thin call into
// node-emoji / emoji-regex / Intl.Segmenter plus its own message shaping.

import { emojify, unemojify, get, search, which } from 'node-emoji';
import emojiRegexFactory from 'emoji-regex';
import skinToneOf from 'skin-tone';

/** Validates a single-token field (emoji/name/keyword) is non-empty. */
export function checkToken(value: string | undefined | null, fieldName: string): string {
  if (value == null || value.length === 0) return `${fieldName} is required`;
  return '';
}

// A fresh regex each call — emoji-regex's exported regex carries the /g flag
// and thus internal lastIndex state; sharing one instance across invocations
// is a classic footgun (a call that throws or returns early mid-scan leaves
// lastIndex non-zero and corrupts the next call). Constructing a new one is
// cheap (a literal regex compile) relative to the scan itself.
export function emojiRegex(): RegExp {
  return emojiRegexFactory();
}

/** True if `text` contains at least one emoji-regex match. */
export function containsEmoji(text: string): boolean {
  return emojiRegex().test(text);
}

/** Every emoji-regex match in `text`, each with its UTF-16 [start, end) span. */
export function findAllEmoji(text: string): Array<{ emoji: string; start: number; end: number }> {
  const re = emojiRegex();
  const out: Array<{ emoji: string; start: number; end: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    out.push({ emoji: m[0], start: m.index, end: m.index + m[0].length });
    // Zero-length matches cannot happen with emoji-regex's pattern (it never
    // matches an empty string), but guard against an infinite loop
    // regardless in case a future pattern version could.
    if (m[0].length === 0) re.lastIndex++;
  }
  return out;
}

/** node-emoji's shortcode name for a single emoji, without the surrounding colons. */
export function nameFor(emojiChar: string): string | undefined {
  return which(emojiChar) ?? undefined;
}

const ZWJ = '‍';
// Regional indicator symbols: U+1F1E6 (A) .. U+1F1FF (Z).
const REGIONAL_INDICATOR_BASE = 0x1f1e6;
const REGIONAL_INDICATOR_MAX = 0x1f1ff;
// Fitzpatrick skin-tone modifiers, in Unicode code-point order.
const SKIN_TONE_CODEPOINTS: Record<number, string> = {
  0x1f3fb: 'white',
  0x1f3fc: 'creamWhite',
  0x1f3fd: 'lightBrown',
  0x1f3fe: 'brown',
  0x1f3ff: 'darkBrown',
};
export const SKIN_TONE_NAMES = ['none', 'white', 'creamWhite', 'lightBrown', 'brown', 'darkBrown'] as const;
export type SkinToneName = (typeof SKIN_TONE_NAMES)[number];

/** Every Unicode code point of `text`, in order, as "U+XXXX" hex labels. */
export function codePointLabels(text: string): string[] {
  const labels: string[] = [];
  for (const ch of text) {
    const cp = ch.codePointAt(0)!;
    labels.push('U+' + cp.toString(16).toUpperCase().padStart(4, '0'));
  }
  return labels;
}

/**
 * A single fallback label for a whole (possibly multi-code-point) emoji
 * token, joining its code points with "-", e.g. "U+1F468-U+200D-U+1F469".
 * Used when node-emoji's shortcode database has no name for a matched
 * emoji.
 */
export function codePointLabel(text: string): string {
  return codePointLabels(text).join('-');
}

export function isZwjSequence(text: string): boolean {
  return text.includes(ZWJ);
}

/** The skin-tone name present in `text`, if any Fitzpatrick modifier code point occurs. */
export function detectSkinTone(text: string): SkinToneName | undefined {
  for (const ch of text) {
    const cp = ch.codePointAt(0)!;
    const name = SKIN_TONE_CODEPOINTS[cp];
    if (name) return name as SkinToneName;
  }
  return undefined;
}

/**
 * If `text` is exactly a two-regional-indicator flag sequence, returns its
 * decoded ISO 3166-1 alpha-2 code. Requires the ENTIRE string (after
 * iterating by code point) to be exactly two regional-indicator symbols —
 * a regional indicator embedded in a longer sequence does not count.
 */
export function decodeFlagIfExact(text: string): string | undefined {
  const codePoints = Array.from(text, (ch) => ch.codePointAt(0)!);
  if (codePoints.length !== 2) return undefined;
  return decodeRegionalIndicatorPair(codePoints[0], codePoints[1]);
}

function decodeRegionalIndicatorPair(cp0: number, cp1: number): string | undefined {
  if (
    cp0 < REGIONAL_INDICATOR_BASE ||
    cp0 > REGIONAL_INDICATOR_MAX ||
    cp1 < REGIONAL_INDICATOR_BASE ||
    cp1 > REGIONAL_INDICATOR_MAX
  ) {
    return undefined;
  }
  const letter0 = String.fromCharCode(65 + (cp0 - REGIONAL_INDICATOR_BASE)); // 65 = 'A'
  const letter1 = String.fromCharCode(65 + (cp1 - REGIONAL_INDICATOR_BASE));
  return letter0 + letter1;
}

/** Scans `text` for every consecutive pair of regional-indicator symbols. */
export function findAllFlags(text: string): Array<{ emoji: string; countryCode: string; start: number; end: number }> {
  const out: Array<{ emoji: string; countryCode: string; start: number; end: number }> = [];
  // Iterate by code point (not UTF-16 code unit) so we never split a
  // surrogate pair, but report positions in UTF-16 code units per the
  // package's documented index contract.
  const chars: Array<{ cp: number; start: number; end: number }> = [];
  let idx = 0;
  for (const ch of text) {
    chars.push({ cp: ch.codePointAt(0)!, start: idx, end: idx + ch.length });
    idx += ch.length;
  }
  for (let i = 0; i < chars.length - 1; i++) {
    const code = decodeRegionalIndicatorPair(chars[i].cp, chars[i + 1].cp);
    if (code) {
      out.push({
        emoji: text.slice(chars[i].start, chars[i + 1].end),
        countryCode: code,
        start: chars[i].start,
        end: chars[i + 1].end,
      });
      i++; // consume the pair; a regional indicator is never reused across two flags
    }
  }
  return out;
}

/** Grapheme-cluster segmentation via the built-in Intl.Segmenter. */
export function segmentGraphemes(text: string): string[] {
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  const out: string[] = [];
  for (const { segment } of segmenter.segment(text)) {
    out.push(segment);
  }
  return out;
}

export { emojify, unemojify, get, search, which, skinToneOf };
