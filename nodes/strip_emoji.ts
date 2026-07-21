import { EmojiText, EmojiTextResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { checkText, strip } from './emoji_helper';

/**
 * Removes every emoji from `text`, returning the cleaned string with
 * surrounding whitespace collapsed to a single space where an emoji was
 * removed (node-emoji's default `strip` behavior). Text with no emoji is
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
  result.setText(strip(text));
  return result;
}
