import { EmojiText } from '../gen/messages_pb';
import { extractEmoji } from './extract_emoji';
import { ctx } from './testkit';
import { MAX_TEXT_LENGTH } from './emoji_helper';

describe('ExtractEmoji', () => {
  it('lists each emoji with the exact UTF-16 offsets hand-computed via String.prototype.indexOf (independent of the matching implementation)', () => {
    const fire = '\u{1F525}';
    const thumb = '\u{1F44D}';
    const text = `start ${fire} middle ${thumb} end`;
    const input = new EmojiText();
    input.setText(text);
    const result = extractEmoji(ctx, input);
    expect(result.getError()).toBe('');
    const matches = result.getMatchesList();
    expect(matches).toHaveLength(2);

    // Independent oracle: recompute expected offsets via indexOf, not by
    // calling into the node's own scanning code.
    const fireStart = text.indexOf(fire);
    const thumbStart = text.indexOf(thumb);

    expect(matches[0].getEmoji()).toBe(fire);
    expect(matches[0].getStartIndex()).toBe(fireStart);
    expect(matches[0].getEndIndex()).toBe(fireStart + fire.length);
    expect(matches[0].getName()).toBe('fire');

    expect(matches[1].getEmoji()).toBe(thumb);
    expect(matches[1].getStartIndex()).toBe(thumbStart);
    expect(matches[1].getEndIndex()).toBe(thumbStart + thumb.length);
    expect(matches[1].getName()).toBe('+1');

    // Every slice must reproduce the matched emoji exactly.
    for (const m of matches) {
      expect(text.slice(m.getStartIndex(), m.getEndIndex())).toBe(m.getEmoji());
    }
  });

  it('extracts a multi-code-point skin-toned emoji as a single match', () => {
    const input = new EmojiText();
    input.setText('\u{1F44D}\u{1F3FE}');
    const result = extractEmoji(ctx, input);
    const matches = result.getMatchesList();
    expect(matches).toHaveLength(1);
    expect(matches[0].getEmoji()).toBe('\u{1F44D}\u{1F3FE}');
    expect(matches[0].getStartIndex()).toBe(0);
    expect(matches[0].getEndIndex()).toBe(4); // two surrogate pairs = 4 UTF-16 code units
  });

  it('returns an empty match list (not an error) for text with no emoji', () => {
    const input = new EmojiText();
    input.setText('no emoji here');
    const result = extractEmoji(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getMatchesList()).toHaveLength(0);
  });

  it('matches an emoji absent from node-emoji\'s database (melting face, U+1FAE0) but leaves name unset', () => {
    // Melting face is recognized by emoji-regex (a newer Unicode emoji)
    // but has no entry in node-emoji's emojilib-derived database --
    // verified directly against both libraries before writing this test.
    const input = new EmojiText();
    input.setText('\u{1FAE0}');
    const result = extractEmoji(ctx, input);
    expect(result.getMatchesList()).toHaveLength(1);
    const m = result.getMatchesList()[0];
    expect(m.getEmoji()).toBe('\u{1FAE0}');
    expect(m.hasName()).toBe(false);
  });

  it('returns a structured error on oversized text', () => {
    const input = new EmojiText();
    input.setText('a'.repeat(MAX_TEXT_LENGTH + 1));
    const result = extractEmoji(ctx, input);
    expect(result.getError()).not.toBe('');
    expect(result.getMatchesList()).toHaveLength(0);
  });
});
