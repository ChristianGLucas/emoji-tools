import { EmojiText, EmojiTextResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { checkText, findAllEmoji } from './emoji_helper';

/**
 * Removes every emoji from `text`, returning the cleaned string with the
 * surrounding text otherwise untouched (no whitespace collapsing -- an
 * emoji surrounded by spaces leaves both spaces behind, e.g. "hi \u{1F525}
 * bye" -> "hi  bye" with two spaces). Matching uses the same emoji-regex
 * scan as CountEmoji/ExtractEmoji/ReplaceEmoji, so a skin-toned/ZWJ/flag
 * composed sequence is removed as a single unit. Text with no emoji is
 * returned unmodified. `text` over 20,000 UTF-16 code units returns a
 * structured error instead of processing.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function stripEmoji(ax: AxiomContext, input: EmojiText): EmojiTextResult {
  const result = new EmojiTextResult();
  const text = input.getText() ?? '';
  const err = checkText(text);
  if (err) {
    result.setError(err);
    return result;
  }

  const matches = findAllEmoji(text);
  if (matches.length === 0) {
    result.setText(text);
    return result;
  }

  let out = '';
  let cursor = 0;
  for (const m of matches) {
    out += text.slice(cursor, m.start);
    cursor = m.end;
  }
  out += text.slice(cursor);
  result.setText(out);
  return result;
}
