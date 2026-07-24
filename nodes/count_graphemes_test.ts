import { EmojiText } from '../gen/messages_pb';
import { countGraphemes } from './count_graphemes';
import { ctx } from './testkit';

describe('CountGraphemes', () => {
  it('counts a ZWJ-joined family sequence as ONE grapheme cluster -- per the published Unicode UAX #29 extended grapheme cluster rules (independent spec oracle), not per code point', () => {
    const ZWJ = '‍';
    const family = '\u{1F468}' + ZWJ + '\u{1F469}' + ZWJ + '\u{1F467}' + ZWJ + '\u{1F466}';
    const input = new EmojiText();
    input.setText(family);
    const result = countGraphemes(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getCount()).toBe(1);
    // Contrast with naive counts, to make the "why this node exists" claim concrete:
    expect(family.length).toBeGreaterThan(1); // UTF-16 code units
    expect(Array.from(family).length).toBeGreaterThan(1); // raw code points
  });

  it('counts a skin-toned emoji as ONE grapheme cluster', () => {
    const input = new EmojiText();
    input.setText('\u{1F44D}\u{1F3FE}');
    const result = countGraphemes(ctx, input);
    expect(result.getCount()).toBe(1);
  });

  it('matches plain ASCII length for text with no composed characters', () => {
    const input = new EmojiText();
    input.setText('hello');
    const result = countGraphemes(ctx, input);
    expect(result.getCount()).toBe(5);
  });

  it('counts a mixed string correctly: "Hi " (3) + 1 flag + " there" (6) = 10', () => {
    const input = new EmojiText();
    input.setText('Hi \u{1F1FA}\u{1F1F8} there');
    const result = countGraphemes(ctx, input);
    expect(result.getCount()).toBe(10);
  });

  it('returns 0 for empty text', () => {
    const input = new EmojiText();
    input.setText('');
    const result = countGraphemes(ctx, input);
    expect(result.getCount()).toBe(0);
  });

});
