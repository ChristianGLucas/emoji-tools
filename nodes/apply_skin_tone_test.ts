import { EmojiSkinToneRequest } from '../gen/messages_pb';
import { applySkinTone } from './apply_skin_tone';
import { ctx } from './testkit';

describe('ApplySkinTone', () => {
  it('applies the darkBrown modifier, matching the exact published Fitzpatrick code point U+1F3FF (independent oracle)', () => {
    const input = new EmojiSkinToneRequest();
    input.setEmoji('\u{1F44D}');
    input.setTone('darkBrown');
    const result = applySkinTone(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getText()).toBe('\u{1F44D}\u{1F3FF}');
  });

  it('applies each of the five Fitzpatrick tones to the exact published code point', () => {
    const cases: Array<[string, string]> = [
      ['white', '\u{1F3FB}'],
      ['creamWhite', '\u{1F3FC}'],
      ['lightBrown', '\u{1F3FD}'],
      ['brown', '\u{1F3FE}'],
      ['darkBrown', '\u{1F3FF}'],
    ];
    for (const [tone, modifier] of cases) {
      const input = new EmojiSkinToneRequest();
      input.setEmoji('\u{1F44D}');
      input.setTone(tone);
      const result = applySkinTone(ctx, input);
      expect(result.getText()).toBe('\u{1F44D}' + modifier);
    }
  });

  it('strips an existing modifier when tone is "none"', () => {
    const input = new EmojiSkinToneRequest();
    input.setEmoji('\u{1F44D}\u{1F3FE}');
    input.setTone('none');
    const result = applySkinTone(ctx, input);
    expect(result.getText()).toBe('\u{1F44D}');
  });

  it('passes an emoji that does not support skin tone through unchanged', () => {
    const input = new EmojiSkinToneRequest();
    input.setEmoji('\u{1F984}'); // unicorn -- does not support skin tone
    input.setTone('darkBrown');
    const result = applySkinTone(ctx, input);
    expect(result.getText()).toBe('\u{1F984}');
  });

  it('returns a structured error for an invalid tone', () => {
    const input = new EmojiSkinToneRequest();
    input.setEmoji('\u{1F44D}');
    input.setTone('bogus_tone');
    const result = applySkinTone(ctx, input);
    expect(result.getError()).not.toBe('');
  });

  it('returns a structured error for an empty emoji field', () => {
    const input = new EmojiSkinToneRequest();
    input.setEmoji('');
    input.setTone('brown');
    const result = applySkinTone(ctx, input);
    expect(result.getError()).not.toBe('');
  });

});
