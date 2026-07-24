import { EmojiText, EmojiExtractResult, EmojiMatch } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { findAllEmoji, nameFor } from './emoji_helper';

/**
 * Lists every emoji occurrence in `text`, in order, each with its Unicode
 * character(s), node-emoji shortcode name (when the database has one), and
 * UTF-16 code-unit [start, end) span so a caller can slice the original
 * string.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractEmoji(ax: AxiomContext, input: EmojiText): EmojiExtractResult {
  const result = new EmojiExtractResult();
  const text = input.getText() ?? '';
  const matches = findAllEmoji(text);
  for (const m of matches) {
    const match = new EmojiMatch();
    match.setEmoji(m.emoji);
    const name = nameFor(m.emoji);
    if (name) match.setName(name);
    match.setStartIndex(m.start);
    match.setEndIndex(m.end);
    result.addMatches(match);
  }
  return result;
}
