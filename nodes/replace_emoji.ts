import { EmojiReplaceRequest, EmojiTextResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { findAllEmoji, nameFor, codePointLabel } from './emoji_helper';

/**
 * Replaces every emoji in `text` with either a caller-supplied literal
 * `placeholder` string, or (when `with_name` is true and `placeholder` is
 * unset) each emoji's ":shortcode:" name -- falling back to a "U+XXXX"
 * code-point label for emoji absent from node-emoji's database. When
 * neither `placeholder` nor `with_name` is set, every emoji is removed
 * (equivalent to StripEmoji). Matching uses the same emoji-regex scan as
 * CountEmoji/ExtractEmoji, so a skin-toned/ZWJ/flag sequence is replaced
 * as a single unit, not per code point.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function replaceEmoji(ax: AxiomContext, input: EmojiReplaceRequest): EmojiTextResult {
  const result = new EmojiTextResult();
  const text = input.getText() ?? '';
  const hasPlaceholder = input.hasPlaceholder();
  const placeholder = input.getPlaceholder() ?? '';
  const withName = input.hasWithName() && input.getWithName();

  const matches = findAllEmoji(text);
  if (matches.length === 0) {
    result.setText(text);
    return result;
  }

  let out = '';
  let cursor = 0;
  for (const m of matches) {
    out += text.slice(cursor, m.start);
    if (hasPlaceholder) {
      out += placeholder;
    } else if (withName) {
      const name = nameFor(m.emoji);
      out += name ? `:${name}:` : codePointLabel(m.emoji);
    }
    // else: drop the emoji entirely (strip semantics)
    cursor = m.end;
  }
  out += text.slice(cursor);
  result.setText(out);
  return result;
}
