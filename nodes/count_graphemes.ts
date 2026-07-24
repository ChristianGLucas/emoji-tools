import { EmojiText, EmojiCountResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { segmentGraphemes } from './emoji_helper';

/**
 * Counts the grapheme clusters (user-perceived characters) in `text`, using
 * the ECMAScript built-in Intl.Segmenter in "grapheme" mode -- the Unicode
 * Standard Annex #29 extended grapheme cluster algorithm. This is the
 * correct notion of text "length" for strings containing emoji: a
 * skin-toned emoji, a ZWJ-joined family sequence, or a two-part flag all
 * count as ONE grapheme cluster each, unlike `text.length` (UTF-16 code
 * units) or a raw code-point count, both of which overcount composed
 * emoji. `text` over 20,000 UTF-16 code units returns a structured error
 * instead of segmenting it.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function countGraphemes(ax: AxiomContext, input: EmojiText): EmojiCountResult {
  const result = new EmojiCountResult();
  const text = input.getText() ?? '';
  result.setCount(segmentGraphemes(text).length);
  return result;
}
