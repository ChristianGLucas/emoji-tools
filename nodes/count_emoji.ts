import { EmojiText, EmojiCountResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { findAllEmoji } from './emoji_helper';

/**
 * Counts the emoji occurrences in `text`, matched by the emoji-regex
 * library (each skin-tone modified emoji, ZWJ sequence, or flag pair
 * counts as ONE emoji, not one per code point -- use SegmentGraphemes if
 * you need code-unit-level detail). `text` over 20,000 UTF-16 code units
 * returns a structured error instead of scanning it.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function countEmoji(ax: AxiomContext, input: EmojiText): EmojiCountResult {
  const result = new EmojiCountResult();
  const text = input.getText() ?? '';
  result.setCount(findAllEmoji(text).length);
  return result;
}
