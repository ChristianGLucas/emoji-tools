import { EmojiText } from '../gen/messages_pb';
import { containsEmoji } from './contains_emoji';
import { ctx } from './testkit';

describe('ContainsEmoji', () => {
  it('is true for text containing a known Unicode emoji', () => {
    const input = new EmojiText();
    input.setText('great work \u{1F525}!');
    const result = containsEmoji(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getContainsEmoji()).toBe(true);
  });

  it('is false for plain ASCII text with no emoji', () => {
    const input = new EmojiText();
    input.setText('plain text, no emoji here 123');
    const result = containsEmoji(ctx, input);
    expect(result.getContainsEmoji()).toBe(false);
  });

  it('is false for empty text', () => {
    const input = new EmojiText();
    input.setText('');
    const result = containsEmoji(ctx, input);
    expect(result.getContainsEmoji()).toBe(false);
  });

  it('is true for a skin-toned emoji (not just base emoji)', () => {
    const input = new EmojiText();
    input.setText('\u{1F44D}\u{1F3FE}'); // thumbs up + medium skin tone modifier
    const result = containsEmoji(ctx, input);
    expect(result.getContainsEmoji()).toBe(true);
  });

});
