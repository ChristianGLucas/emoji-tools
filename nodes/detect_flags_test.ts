import { EmojiText } from '../gen/messages_pb';
import { detectFlags } from './detect_flags';
import { ctx } from './testkit';
import { MAX_TEXT_LENGTH } from './emoji_helper';

describe('DetectFlags', () => {
  it('finds two adjacent flags and decodes both correctly, independently re-derived by hand arithmetic (not by calling the node\'s decode logic)', () => {
    const us = '\u{1F1FA}\u{1F1F8}';
    const jp = '\u{1F1EF}\u{1F1F5}';
    const text = `visit ${us}${jp} soon`;
    const input = new EmojiText();
    input.setText(text);
    const result = detectFlags(ctx, input);
    expect(result.getError()).toBe('');
    const flags = result.getFlagsList();
    expect(flags).toHaveLength(2);

    const REGIONAL_BASE = 0x1f1e6;
    const decode = (cp0: number, cp1: number) =>
      String.fromCharCode(65 + (cp0 - REGIONAL_BASE)) + String.fromCharCode(65 + (cp1 - REGIONAL_BASE));
    expect(decode(0x1f1fa, 0x1f1f8)).toBe('US');
    expect(decode(0x1f1ef, 0x1f1f5)).toBe('JP');

    expect(flags[0].getEmoji()).toBe(us);
    expect(flags[0].getCountryCode()).toBe('US');
    expect(flags[1].getEmoji()).toBe(jp);
    expect(flags[1].getCountryCode()).toBe('JP');

    // Positions must round-trip via slice.
    for (const f of flags) {
      expect(text.slice(f.getStartIndex(), f.getEndIndex())).toBe(f.getEmoji());
    }
  });

  it('returns an empty list (not an error) for text with no flags', () => {
    const input = new EmojiText();
    input.setText('no flags here, just \u{1F525} fire');
    const result = detectFlags(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getFlagsList()).toHaveLength(0);
  });

  it('does not treat a single lone regional indicator as a flag', () => {
    const input = new EmojiText();
    input.setText('\u{1F1FA} x'); // single "U" regional indicator, no pair
    const result = detectFlags(ctx, input);
    expect(result.getFlagsList()).toHaveLength(0);
  });

  it('returns a structured error on oversized text', () => {
    const input = new EmojiText();
    input.setText('a'.repeat(MAX_TEXT_LENGTH + 1));
    const result = detectFlags(ctx, input);
    expect(result.getError()).not.toBe('');
  });
});
