import { EmojiText, EmojiGraphemeResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { checkText, segmentGraphemes as splitIntoGraphemes } from './emoji_helper';

/**
 * Splits `text` into its grapheme clusters (user-perceived characters),
 * using the ECMAScript built-in Intl.Segmenter in "grapheme" mode. Each
 * element of `clusters` is one cluster in source order -- a skin-toned
 * emoji, a ZWJ-joined sequence, or a two-part flag each appear as a SINGLE
 * array element, not split across several. Joining `clusters` back together
 * with "" reproduces `text` exactly. Result length is bounded by the
 * `text` length cap (at most one cluster per UTF-16 code unit). `text`
 * over 20,000 UTF-16 code units returns a structured error instead of
 * segmenting it.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function segmentGraphemes(ax: AxiomContext, input: EmojiText): EmojiGraphemeResult {
  const result = new EmojiGraphemeResult();
  const text = input.getText() ?? '';
  const err = checkText(text);
  if (err) {
    result.setError(err);
    return result;
  }
  result.setClustersList(splitIntoGraphemes(text));
  return result;
}
