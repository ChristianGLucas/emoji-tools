import { EmojiSearchRequest, EmojiSearchResult, EmojiNameEmojiPair } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { checkToken, search, MAX_SEARCH_RESULTS } from './emoji_helper';

/**
 * Finds every known emoji whose ":shortcode:" name contains `keyword` as a
 * literal, CASE-SENSITIVE substring, using node-emoji's database, e.g.
 * "cat" matches "cat", "smiley_cat", "scream_cat", etc., but "CAT" does
 * not (names in the database are lowercase). Results are capped at 200
 * pairs; an empty result list (not an error) means no known emoji name
 * contains `keyword` verbatim. `keyword` must be non-empty and at most 64
 * UTF-16 code units, or a structured error is returned.
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
  const found = search(keyword).slice(0, MAX_SEARCH_RESULTS);
  for (const f of found) {
    const pair = new EmojiNameEmojiPair();
    pair.setEmoji(f.emoji);
    pair.setName(f.name);
    result.addResults(pair);
  }
  return result;
}
