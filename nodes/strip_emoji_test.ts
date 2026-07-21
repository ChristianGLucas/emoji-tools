import { EmojiText } from '../gen/messages_pb';
import { stripEmoji } from './strip_emoji';
import { ctx } from './testkit';
import { MAX_TEXT_LENGTH } from './emoji_helper';

describe('StripEmoji', () => {
  it('removes a known emoji, leaving the surrounding text untouched (no whitespace collapsing)', () => {
    const input = new EmojiText();
    input.setText('great work \u{1F525} team!');
    const result = stripEmoji(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getText()).toBe('great work  team!'); // two spaces where the emoji was
  });

  it('removes a skin-toned emoji entirely -- regression test for a bug where StripEmoji delegated to node-emoji\'s own strip(), which silently left skin-toned emoji (Fitzpatrick modifier sequences) untouched', () => {
    const input = new EmojiText();
    input.setText('hello \u{1F44D}\u{1F3FE} world \u{1F44B}\u{1F3FD} done');
    const result = stripEmoji(ctx, input);
    expect(result.getText()).not.toContain('\u{1F44D}');
    expect(result.getText()).not.toContain('\u{1F3FE}');
    expect(result.getText()).not.toContain('\u{1F44B}');
    expect(result.getText()).not.toContain('\u{1F3FD}');
    expect(result.getText()).toBe('hello  world  done');
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

  it('removes adjacent flag sequences fully', () => {
    const input = new EmojiText();
    input.setText('visit \u{1F1FA}\u{1F1F8}\u{1F1EF}\u{1F1F5} soon');
    const result = stripEmoji(ctx, input);
    expect(result.getText()).toBe('visit  soon');
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
