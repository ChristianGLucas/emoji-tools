import { EmojiText, EmojiExtractResult, EmojiMatch } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { checkText, findAllEmoji, nameFor, MAX_EXTRACT_MATCHES } from './emoji_helper';

/**
 * Lists every emoji occurrence in `text`, in order, each with its Unicode
 * character(s), node-emoji shortcode name (when the database has one), and
 * UTF-16 code-unit [start, end) span so a caller can slice the original
 * string. Capped at 2,000 matches on pathological input (extras are
 * silently dropped, not an error). `text` over 20,000 UTF-16 code units
 * returns a structured error instead of scanning it.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractEmoji(ax: AxiomContext, input: EmojiText): EmojiExtractResult {
  const result = new EmojiExtractResult();
  const text = input.getText() ?? '';
  const err = checkText(text);
  if (err) {
    result.setError(err);
    return result;
  }
  const matches = findAllEmoji(text).slice(0, MAX_EXTRACT_MATCHES);
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
