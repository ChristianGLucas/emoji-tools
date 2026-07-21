import { EmojiSkinToneRequest, EmojiTextResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { checkToken, skinToneOf, SKIN_TONE_NAMES } from './emoji_helper';

/**
 * Applies (or removes) a Fitzpatrick skin-tone modifier on a base emoji,
 * wrapping the `skin-tone` package. `tone` must be one of "none" (strips
 * any existing modifier), "white", "creamWhite", "lightBrown", "brown", or
 * "darkBrown" (Fitzpatrick types 1-2 through 6) -- any other value returns
 * a structured error. An `emoji` that does not support skin-tone
 * modification (e.g. an object or animal emoji) is passed through
 * unchanged, not an error -- this mirrors the wrapped library's own
 * documented behavior. `emoji` must be non-empty and at most 64 UTF-16
 * code units.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function applySkinTone(ax: AxiomContext, input: EmojiSkinToneRequest): EmojiTextResult {
  const result = new EmojiTextResult();
  const emojiToken = input.getEmoji() ?? '';
  const emojiErr = checkToken(emojiToken, 'emoji');
  if (emojiErr) {
    result.setError(emojiErr);
    return result;
  }
  const tone = input.getTone() ?? '';
  if (!(SKIN_TONE_NAMES as readonly string[]).includes(tone)) {
    result.setError(`tone must be one of: ${SKIN_TONE_NAMES.join(', ')}`);
    return result;
  }
  result.setText(skinToneOf(emojiToken, tone as any));
  return result;
}
