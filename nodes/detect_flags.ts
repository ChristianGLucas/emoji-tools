import { EmojiText, EmojiFlagResult, EmojiFlag } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { checkText, findAllFlags, MAX_FLAGS } from './emoji_helper';

/**
 * Scans `text` for every regional-indicator flag sequence (two consecutive
 * regional-indicator symbols, e.g. the France or Japan flag) and decodes
 * each to its ISO 3166-1 alpha-2 country/region code, with its UTF-16
 * code-unit [start, end) span. NOTE: this decodes the letter pair
 * mechanically -- not every resulting two-letter code corresponds to an
 * assigned, renderable flag (Unicode/vendors only render a curated
 * subset), but the code is reported regardless. Capped at 500 flags found.
 * `text` over 20,000 UTF-16 code units returns a structured error instead
 * of scanning it.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function detectFlags(ax: AxiomContext, input: EmojiText): EmojiFlagResult {
  const result = new EmojiFlagResult();
  const text = input.getText() ?? '';
  const err = checkText(text);
  if (err) {
    result.setError(err);
    return result;
  }
  const flags = findAllFlags(text).slice(0, MAX_FLAGS);
  for (const f of flags) {
    const flag = new EmojiFlag();
    flag.setEmoji(f.emoji);
    flag.setCountryCode(f.countryCode);
    flag.setStartIndex(f.start);
    flag.setEndIndex(f.end);
    result.addFlags(flag);
  }
  return result;
}
