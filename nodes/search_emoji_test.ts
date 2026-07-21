import { EmojiSearchRequest } from '../gen/messages_pb';
import { searchEmoji } from './search_emoji';
import { ctx } from './testkit';
import { MAX_TOKEN_LENGTH } from './emoji_helper';

describe('SearchEmoji', () => {
  it('finds every known emoji whose name contains "cat", including the plain "cat" emoji itself (independent oracle: published gemoji/GitHub cheat sheet lists cat/smiley_cat/joy_cat etc.)', () => {
    const input = new EmojiSearchRequest();
    input.setKeyword('cat');
    const result = searchEmoji(ctx, input);
    expect(result.getError()).toBe('');
    const names = result.getResultsList().map((r) => r.getName());
    expect(names).toContain('cat');
    expect(names).toContain('smiley_cat');
    expect(names.every((n) => n.includes('cat'))).toBe(true);
    const catResult = result.getResultsList().find((r) => r.getName() === 'cat');
    expect(catResult?.getEmoji()).toBe('\u{1F431}');
  });

  it('is case-sensitive (an uppercase keyword matching nothing returns an empty, non-error result)', () => {
    const input = new EmojiSearchRequest();
    input.setKeyword('CAT');
    const result = searchEmoji(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getResultsList()).toHaveLength(0);
  });

  it('returns an empty list (not an error) for a keyword matching nothing', () => {
    const input = new EmojiSearchRequest();
    input.setKeyword('zzznotarealemojisubstringzzz');
    const result = searchEmoji(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getResultsList()).toHaveLength(0);
  });

  it('returns a structured error for an empty keyword', () => {
    const input = new EmojiSearchRequest();
    input.setKeyword('');
    const result = searchEmoji(ctx, input);
    expect(result.getError()).not.toBe('');
  });

  it('returns a structured error for an oversized keyword', () => {
    const input = new EmojiSearchRequest();
    input.setKeyword('a'.repeat(MAX_TOKEN_LENGTH + 1));
    const result = searchEmoji(ctx, input);
    expect(result.getError()).not.toBe('');
  });
});
