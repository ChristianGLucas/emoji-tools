import { EmojiText, EmojiTextResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { emojify } from './emoji_helper';

/**
 * Converts every `:shortcode:` in `text` to its Unicode emoji character
 * (e.g. ":fire:" -> the fire emoji), using node-emoji's shortcode database.
 * A shortcode not present in the database is left in the output unchanged
 * (no error, no data loss) -- e.g. ":not_a_real_emoji:" passes through
 * verbatim. Text with no shortcodes at all is returned unmodified. `text`
 * over 20,000 UTF-16 code units returns a structured error instead of
 * processing.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function emojize(ax: AxiomContext, input: EmojiText): EmojiTextResult {
  const result = new EmojiTextResult();
  const text = input.getText() ?? '';
  result.setText(emojify(text));
  return result;
}
