import { EmojiText } from '../gen/messages_pb';
import { stripEmoji } from './strip_emoji';
import { ctx } from './testkit';
import { MAX_TEXT_LENGTH } from './emoji_helper';

describe('StripEmoji', () => {
  it('removes a known emoji, leaving the surrounding text', () => {
    const input = new EmojiText();
    input.setText('great work \u{1F525} team!');
    const result = stripEmoji(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getText()).toBe('great work team!');
  });

  it('is a no-op on text with no emoji', () => {
    const input = new EmojiText();
    input.setText('plain text');
    const result = stripEmoji(ctx, input);
    expect(result.getText()).toBe('plain text');
  });

  it('removes a composed ZWJ family sequence as one unit, not leaving orphan fragments', () => {
    const ZWJ = '‍';
    const family = '\u{1F468}' + ZWJ + '\u{1F469}' + ZWJ + '\u{1F467}' + ZWJ + '\u{1F466}';
    const input = new EmojiText();
    input.setText(`before ${family} after`);
    const result = stripEmoji(ctx, input);
    expect(result.getText()).not.toContain(ZWJ);
    expect(result.getText()).not.toContain('\u{1F468}');
    expect(result.getText()).toContain('before');
    expect(result.getText()).toContain('after');
  });

  it('handles empty text', () => {
    const input = new EmojiText();
    input.setText('');
    const result = stripEmoji(ctx, input);
    expect(result.getText()).toBe('');
  });

  it('returns a structured error on oversized text', () => {
    const input = new EmojiText();
    input.setText('a'.repeat(MAX_TEXT_LENGTH + 1));
    const result = stripEmoji(ctx, input);
    expect(result.getError()).not.toBe('');
  });
});
