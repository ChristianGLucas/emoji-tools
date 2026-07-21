import { EmojiToken, EmojiNameResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { checkToken, nameFor } from './emoji_helper';

/**
 * Looks up the node-emoji ":shortcode:" name for a single emoji token
 * (without the surrounding colons, e.g. "fire" for the fire emoji).
 * `found` is false (with `name` unset) when the emoji is not present in
 * node-emoji's curated database -- this does not necessarily mean it is
 * invalid Unicode, only that this database has no name for it. `emoji`
 * must be non-empty and at most 64 UTF-16 code units, or a structured
 * error is returned.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function getEmojiName(ax: AxiomContext, input: EmojiToken): EmojiNameResult {
  const result = new EmojiNameResult();
  const emoji = input.getEmoji() ?? '';
  const err = checkToken(emoji, 'emoji');
  if (err) {
    result.setError(err);
    return result;
  }
  const name = nameFor(emoji);
  if (name) {
    result.setName(name);
    result.setFound(true);
  } else {
    result.setFound(false);
  }
  return result;
}
