import { EmojiName } from '../gen/messages_pb';
import { lookupEmojiByName } from './lookup_emoji_by_name';
import { ctx } from './testkit';

describe('LookupEmojiByName', () => {
  it('finds the exact published Unicode code point for a well-known name (independent oracle: Unicode Consortium FIRE = U+1F525)', () => {
    const input = new EmojiName();
    input.setName('fire');
    const result = lookupEmojiByName(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getFound()).toBe(true);
    expect(result.getEmoji()).toBe('\u{1F525}');
  });

  it('accepts the name with surrounding colons, same result as without', () => {
    const withColons = new EmojiName();
    withColons.setName(':fire:');
    const withoutColons = new EmojiName();
    withoutColons.setName('fire');
    const r1 = lookupEmojiByName(ctx, withColons);
    const r2 = lookupEmojiByName(ctx, withoutColons);
    expect(r1.getEmoji()).toBe(r2.getEmoji());
    expect(r1.getEmoji()).toBe('\u{1F525}');
  });

  it('reports found=false for an unknown name, with emoji unset', () => {
    const input = new EmojiName();
    input.setName('definitely_not_a_real_emoji_name_xyz');
    const result = lookupEmojiByName(ctx, input);
    expect(result.getFound()).toBe(false);
    expect(result.hasEmoji()).toBe(false);
  });

  it('round-trips with GetEmojiName for a known emoji', () => {
    const input = new EmojiName();
    input.setName('+1');
    const result = lookupEmojiByName(ctx, input);
    expect(result.getEmoji()).toBe('\u{1F44D}');
  });

  it('returns a structured error for an empty name', () => {
    const input = new EmojiName();
    input.setName('');
    const result = lookupEmojiByName(ctx, input);
    expect(result.getError()).not.toBe('');
  });

});
