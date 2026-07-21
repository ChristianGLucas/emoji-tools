import { EmojiToken } from '../gen/messages_pb';
import { getEmojiName } from './get_emoji_name';
import { ctx } from './testkit';
import { MAX_TOKEN_LENGTH } from './emoji_helper';

describe('GetEmojiName', () => {
  it('finds the known shortcode name for a well-known emoji (independent oracle: the published GitHub/gemoji emoji cheat sheet documents fire = :fire:)', () => {
    const input = new EmojiToken();
    input.setEmoji('\u{1F525}');
    const result = getEmojiName(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getFound()).toBe(true);
    expect(result.getName()).toBe('fire');
  });

  it('reports found=false for an emoji absent from the database, with name unset', () => {
    const input = new EmojiToken();
    input.setEmoji('\u{1FAE0}'); // melting face -- verified absent from node-emoji's dataset
    const result = getEmojiName(ctx, input);
    expect(result.getFound()).toBe(false);
    expect(result.hasName()).toBe(false);
  });

  it('returns a structured error for an empty emoji field', () => {
    const input = new EmojiToken();
    input.setEmoji('');
    const result = getEmojiName(ctx, input);
    expect(result.getError()).not.toBe('');
  });

  it('returns a structured error for an oversized token', () => {
    const input = new EmojiToken();
    input.setEmoji('a'.repeat(MAX_TOKEN_LENGTH + 1));
    const result = getEmojiName(ctx, input);
    expect(result.getError()).not.toBe('');
  });
});
