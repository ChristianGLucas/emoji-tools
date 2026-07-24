import { EmojiSearchRequest, EmojiSearchResult, EmojiNameEmojiPair } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { checkToken, search } from './emoji_helper';

/**
 * Finds every known emoji whose ":shortcode:" name contains `keyword` as a
 * literal, CASE-SENSITIVE substring, using node-emoji's database, e.g.
 * "cat" matches "cat", "smiley_cat", "scream_cat", etc., but "CAT" does
 * not (names in the database are lowercase). An empty result list (not an
 * error) means no known emoji name contains `keyword` verbatim. `keyword`
 * must be non-empty, or a structured error is returned.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function searchEmoji(ax: AxiomContext, input: EmojiSearchRequest): EmojiSearchResult {
  const result = new EmojiSearchResult();
  const keyword = input.getKeyword() ?? '';
  const err = checkToken(keyword, 'keyword');
  if (err) {
    result.setError(err);
    return result;
  }
  const found = search(keyword);
  for (const f of found) {
    const pair = new EmojiNameEmojiPair();
    pair.setEmoji(f.emoji);
    pair.setName(f.name);
    result.addResults(pair);
  }
  return result;
}
