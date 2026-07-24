import { EmojiText, EmojiTextResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { unemojify } from './emoji_helper';

/**
 * Converts every Unicode emoji in `text` to its ":shortcode:" name (e.g.
 * the fire emoji -> ":fire:"), using node-emoji's shortcode database. An
 * emoji present in Unicode but absent from that curated database is left
 * as-is in the output (no error). Text with no emoji at all is returned
 * unmodified. `text` over 20,000 UTF-16 code units returns a structured
 * error instead of processing.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function demojize(ax: AxiomContext, input: EmojiText): EmojiTextResult {
  const result = new EmojiTextResult();
  const text = input.getText() ?? '';
  result.setText(unemojify(text));
  return result;
}
