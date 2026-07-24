import { EmojiText } from '../gen/messages_pb';
import { emojize } from './emojize';
import { ctx } from './testkit';

describe('Emojize', () => {
  it('converts a known shortcode to the exact published Unicode code point (independent oracle: Unicode Consortium FIRE = U+1F525)', () => {
    const input = new EmojiText();
    input.setText('great work :fire:!');
    const result = emojize(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getText()).toBe('great work \u{1F525}!');
  });

  it('leaves an unrecognized shortcode unchanged (no crash, no data loss)', () => {
    const input = new EmojiText();
    input.setText('hi :definitely_not_a_real_emoji_xyz:');
    const result = emojize(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getText()).toBe('hi :definitely_not_a_real_emoji_xyz:');
  });

  it('is a no-op on text with no shortcodes', () => {
    const input = new EmojiText();
    input.setText('plain text, no emoji here');
    const result = emojize(ctx, input);
    expect(result.getText()).toBe('plain text, no emoji here');
  });

  it('handles empty text without error', () => {
    const input = new EmojiText();
    input.setText('');
    const result = emojize(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getText()).toBe('');
  });


  it('is deterministic across repeated invocations', () => {
    const input = new EmojiText();
    input.setText(':fire: :+1: :grinning:');
    const r1 = emojize(ctx, input);
    const r2 = emojize(ctx, input);
    expect(r1.getText()).toBe(r2.getText());
  });
});
