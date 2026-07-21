import { EmojiName, EmojiLookupResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { checkToken, get } from './emoji_helper';

/**
 * Looks up the Unicode emoji character(s) for a ":shortcode:" name (the
 * reverse of GetEmojiName). Accepts the name with or without surrounding
 * colons -- both "fire" and ":fire:" resolve to the same emoji. `found` is
 * false (with `emoji` unset) when `name` has no match in node-emoji's
 * database. `name` must be non-empty and at most 64 UTF-16 code units, or
 * a structured error is returned.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function lookupEmojiByName(ax: AxiomContext, input: EmojiName): EmojiLookupResult {
  const result = new EmojiLookupResult();
  const name = input.getName() ?? '';
  const err = checkToken(name, 'name');
  if (err) {
    result.setError(err);
    return result;
  }
  const emoji = get(name);
  if (emoji) {
    result.setEmoji(emoji);
    result.setFound(true);
  } else {
    result.setFound(false);
  }
  return result;
}
