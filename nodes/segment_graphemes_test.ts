import { EmojiText } from '../gen/messages_pb';
import { segmentGraphemes } from './segment_graphemes';
import { ctx } from './testkit';
import { MAX_TEXT_LENGTH } from './emoji_helper';

describe('SegmentGraphemes', () => {
  it('splits mixed text into hand-verified clusters, each a single array element for composed emoji', () => {
    const flag = '\u{1F1FA}\u{1F1F8}';
    const input = new EmojiText();
    input.setText(`Hi ${flag}!`);
    const result = segmentGraphemes(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getClustersList()).toEqual(['H', 'i', ' ', flag, '!']);
  });

  it('joining the clusters back together with "" reproduces the original text exactly', () => {
    const ZWJ = '‍';
    const family = '\u{1F468}' + ZWJ + '\u{1F469}' + ZWJ + '\u{1F467}' + ZWJ + '\u{1F466}';
    const text = `team ${family} done \u{1F44D}\u{1F3FE}!`;
    const input = new EmojiText();
    input.setText(text);
    const result = segmentGraphemes(ctx, input);
    expect(result.getClustersList().join('')).toBe(text);
  });

  it('returns an empty array for empty text', () => {
    const input = new EmojiText();
    input.setText('');
    const result = segmentGraphemes(ctx, input);
    expect(result.getClustersList()).toHaveLength(0);
  });

  it('returns a structured error on oversized text', () => {
    const input = new EmojiText();
    input.setText('a'.repeat(MAX_TEXT_LENGTH + 1));
    const result = segmentGraphemes(ctx, input);
    expect(result.getError()).not.toBe('');
    expect(result.getClustersList()).toHaveLength(0);
  });
});
