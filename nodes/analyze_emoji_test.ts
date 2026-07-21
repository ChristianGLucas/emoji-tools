import { EmojiToken } from '../gen/messages_pb';
import { analyzeEmoji } from './analyze_emoji';
import { ctx } from './testkit';
import { MAX_TOKEN_LENGTH } from './emoji_helper';

describe('AnalyzeEmoji', () => {
  it('reports code points and skin tone for a skin-toned emoji, cross-checked against a from-scratch hand computation (independent oracle)', () => {
    const input = new EmojiToken();
    input.setEmoji('\u{1F44D}\u{1F3FE}'); // thumbs up + medium skin tone
    const result = analyzeEmoji(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getIsEmoji()).toBe(true);
    // Independent re-derivation of the expected code points, not by calling
    // the node's own codePointLabels helper.
    const expectedCodePoints = ['\u{1F44D}', '\u{1F3FE}'].map(
      (ch) => 'U+' + ch.codePointAt(0)!.toString(16).toUpperCase()
    );
    expect(result.getCodePointsList()).toEqual(expectedCodePoints);
    expect(result.getIsZwjSequence()).toBe(false);
    expect(result.getHasSkinToneModifier()).toBe(true);
    expect(result.getSkinTone()).toBe('brown'); // U+1F3FE is Fitzpatrick type 5 in skin-tone's vocabulary
    expect(result.getIsRegionalIndicatorFlag()).toBe(false);
    expect(result.hasCountryCode()).toBe(false);
    expect(result.getName()).toBe('+1');
  });

  it('detects a ZWJ-joined sequence', () => {
    const ZWJ = '‍';
    const input = new EmojiToken();
    input.setEmoji('\u{1F468}' + ZWJ + '\u{1F469}' + ZWJ + '\u{1F467}' + ZWJ + '\u{1F466}');
    const result = analyzeEmoji(ctx, input);
    expect(result.getIsEmoji()).toBe(true);
    expect(result.getIsZwjSequence()).toBe(true);
    expect(result.getHasSkinToneModifier()).toBe(false);
    expect(result.getIsRegionalIndicatorFlag()).toBe(false);
  });

  it('decodes a regional-indicator flag to its country code, independently re-derived by hand arithmetic in this test (not by calling the node\'s decode logic)', () => {
    const input = new EmojiToken();
    input.setEmoji('\u{1F1FA}\u{1F1F8}'); // US flag
    const result = analyzeEmoji(ctx, input);
    expect(result.getIsRegionalIndicatorFlag()).toBe(true);
    // Independent derivation: regional indicator base is U+1F1E6 = 'A'.
    const REGIONAL_BASE = 0x1f1e6;
    const letter0 = String.fromCharCode(65 + (0x1f1fa - REGIONAL_BASE));
    const letter1 = String.fromCharCode(65 + (0x1f1f8 - REGIONAL_BASE));
    expect(letter0 + letter1).toBe('US');
    expect(result.getCountryCode()).toBe('US');
  });

  it('is_emoji is false, but code_points still populated, for a non-emoji token', () => {
    const input = new EmojiToken();
    input.setEmoji('ab');
    const result = analyzeEmoji(ctx, input);
    expect(result.getIsEmoji()).toBe(false);
    expect(result.getCodePointsList()).toEqual(['U+0061', 'U+0062']);
    expect(result.getIsZwjSequence()).toBe(false);
    expect(result.getHasSkinToneModifier()).toBe(false);
    expect(result.getIsRegionalIndicatorFlag()).toBe(false);
  });

  it('is_emoji is false for a token that is emoji plus trailing non-emoji text (whole-string match required)', () => {
    const input = new EmojiToken();
    input.setEmoji('\u{1F525}x');
    const result = analyzeEmoji(ctx, input);
    expect(result.getIsEmoji()).toBe(false);
  });

  it('a single plain emoji with no modifiers reports all special-mechanism flags false', () => {
    const input = new EmojiToken();
    input.setEmoji('\u{1F600}'); // grinning face
    const result = analyzeEmoji(ctx, input);
    expect(result.getIsEmoji()).toBe(true);
    expect(result.getIsZwjSequence()).toBe(false);
    expect(result.getHasSkinToneModifier()).toBe(false);
    expect(result.getIsRegionalIndicatorFlag()).toBe(false);
    expect(result.getName()).toBe('grinning');
  });

  it('returns a structured error for an empty emoji field', () => {
    const input = new EmojiToken();
    input.setEmoji('');
    const result = analyzeEmoji(ctx, input);
    expect(result.getError()).not.toBe('');
  });

  it('returns a structured error for an oversized token', () => {
    const input = new EmojiToken();
    input.setEmoji('a'.repeat(MAX_TOKEN_LENGTH + 1));
    const result = analyzeEmoji(ctx, input);
    expect(result.getError()).not.toBe('');
  });
});
