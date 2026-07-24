import { EmojiText, EmojiContainsResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { containsEmoji as hasEmoji } from './emoji_helper';

/**
 * Reports whether `text` contains at least one emoji, matched by the
 * emoji-regex library's spec-tracking pattern (covers single-code-point
 * emoji, skin-tone modified forms, ZWJ sequences, and regional-indicator
 * flags). `text` over 20,000 UTF-16 code units returns a structured error
 * instead of scanning it.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function containsEmoji(ax: AxiomContext, input: EmojiText): EmojiContainsResult {
  const result = new EmojiContainsResult();
  const text = input.getText() ?? '';
  result.setContainsEmoji(hasEmoji(text));
  return result;
}
