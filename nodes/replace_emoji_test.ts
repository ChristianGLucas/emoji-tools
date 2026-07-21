import { EmojiReplaceRequest } from '../gen/messages_pb';
import { replaceEmoji } from './replace_emoji';
import { ctx } from './testkit';
import { MAX_TEXT_LENGTH, MAX_PLACEHOLDER_LENGTH } from './emoji_helper';

describe('ReplaceEmoji', () => {
  it('replaces every emoji with a literal placeholder', () => {
    const input = new EmojiReplaceRequest();
    input.setText('hi \u{1F525} and \u{1F44D} bye');
    input.setPlaceholder('[emoji]');
    const result = replaceEmoji(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getText()).toBe('hi [emoji] and [emoji] bye');
  });

  it('replaces a skin-toned composed emoji as ONE unit with a single placeholder, not per code point', () => {
    const input = new EmojiReplaceRequest();
    input.setText('\u{1F44D}\u{1F3FE} done');
    input.setPlaceholder('X');
    const result = replaceEmoji(ctx, input);
    expect(result.getText()).toBe('X done');
  });

  it('replaces with the shortcode name when with_name is true and placeholder is unset', () => {
    const input = new EmojiReplaceRequest();
    input.setText('great \u{1F525}!');
    input.setWithName(true);
    const result = replaceEmoji(ctx, input);
    expect(result.getText()).toBe('great :fire:!');
  });

  it('falls back to a U+XXXX code-point label for with_name when the emoji has no known name', () => {
    const input = new EmojiReplaceRequest();
    input.setText('\u{1FAE0} test'); // melting face -- no node-emoji name (verified in extract_emoji_test)
    input.setWithName(true);
    const result = replaceEmoji(ctx, input);
    expect(result.getText()).toBe('U+1FAE0 test');
  });

  it('placeholder takes precedence over with_name when both are set', () => {
    const input = new EmojiReplaceRequest();
    input.setText('\u{1F525}');
    input.setPlaceholder('P');
    input.setWithName(true);
    const result = replaceEmoji(ctx, input);
    expect(result.getText()).toBe('P');
  });

  it('removes emoji entirely when neither placeholder nor with_name is set (strip semantics)', () => {
    const input = new EmojiReplaceRequest();
    input.setText('hi \u{1F525} bye');
    const result = replaceEmoji(ctx, input);
    expect(result.getText()).toBe('hi  bye');
  });

  it('is a no-op on text with no emoji', () => {
    const input = new EmojiReplaceRequest();
    input.setText('plain text');
    input.setPlaceholder('X');
    const result = replaceEmoji(ctx, input);
    expect(result.getText()).toBe('plain text');
  });

  it('returns a structured error on oversized text', () => {
    const input = new EmojiReplaceRequest();
    input.setText('a'.repeat(MAX_TEXT_LENGTH + 1));
    const result = replaceEmoji(ctx, input);
    expect(result.getError()).not.toBe('');
  });

  it('returns a structured error on an oversized placeholder', () => {
    const input = new EmojiReplaceRequest();
    input.setText('\u{1F525}');
    input.setPlaceholder('x'.repeat(MAX_PLACEHOLDER_LENGTH + 1));
    const result = replaceEmoji(ctx, input);
    expect(result.getError()).not.toBe('');
  });
});
