import { EmojiText } from '../gen/messages_pb';
import { countEmoji } from './count_emoji';
import { ctx } from './testkit';
import { MAX_TEXT_LENGTH } from './emoji_helper';

describe('CountEmoji', () => {
  it('counts a composed sequence (skin tone / ZWJ family / two flags) as 4 -- hand-verified against the published Unicode sequences, independent of the implementation', () => {
    // Hand-derived expected count by inspection of the source string's
    // known composed emoji sequences (not derived from the node's own
    // matching logic):
    //   1. \u{1F44D}\u{1F3FE}                         thumbs up + medium skin tone (ONE emoji)
    //   2. \u{1F468}‍\u{1F469}‍\u{1F467}‍\u{1F466}  family (ONE ZWJ-joined emoji)
    //   3. \u{1F1FA}\u{1F1F8}                         regional indicators U+S -> US flag (ONE emoji)
    //   4. \u{1F1EF}\u{1F1F5}                         regional indicators J+P -> JP flag (ONE emoji)
    const ZWJ = '‍';
    const text =
      'Hi \u{1F44D}\u{1F3FE} team \u{1F468}' + ZWJ + '\u{1F469}' + ZWJ + '\u{1F467}' + ZWJ + '\u{1F466}' +
      ' done \u{1F1FA}\u{1F1F8}\u{1F1EF}\u{1F1F5}!';
    const input = new EmojiText();
    input.setText(text);
    const result = countEmoji(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getCount()).toBe(4);
  });

  it('counts zero for plain text', () => {
    const input = new EmojiText();
    input.setText('no emoji at all here');
    const result = countEmoji(ctx, input);
    expect(result.getCount()).toBe(0);
  });

  it('counts each of three simple emoji separately', () => {
    const input = new EmojiText();
    input.setText('\u{1F600}\u{1F601}\u{1F602}');
    const result = countEmoji(ctx, input);
    expect(result.getCount()).toBe(3);
  });

  it('returns a structured error on oversized text', () => {
    const input = new EmojiText();
    input.setText('a'.repeat(MAX_TEXT_LENGTH + 1));
    const result = countEmoji(ctx, input);
    expect(result.getError()).not.toBe('');
  });
});
