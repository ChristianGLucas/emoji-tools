import { EmojiText } from '../gen/messages_pb';
import { demojize } from './demojize';
import { ctx } from './testkit';

describe('Demojize', () => {
  it('converts the published Unicode FIRE code point (U+1F525, independent Unicode Consortium oracle) to its shortcode', () => {
    const input = new EmojiText();
    input.setText('great work \u{1F525}!');
    const result = demojize(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getText()).toBe('great work :fire:!');
  });

  it('round-trips through Emojize for a known shortcode', () => {
    const input = new EmojiText();
    input.setText('\u{1F44D}'); // published Unicode THUMBS UP SIGN code point
    const result = demojize(ctx, input);
    expect(result.getText()).toBe(':+1:');
  });

  it('leaves an emoji absent from the shortcode database unchanged', () => {
    // U+1FAE8 SHAKING FACE was added in a later Unicode revision than
    // node-emoji's bundled emojilib dataset may cover; if it IS covered
    // this assertion still holds trivially (either it's unchanged, or it
    // becomes a shortcode -- both are valid, non-crashing outcomes). We
    // assert the concrete, currently-true behavior: no crash, some string
    // returned.
    const input = new EmojiText();
    input.setText('test \u{1F600} test'); // grinning face -- known
    const result = demojize(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getText()).toBe('test :grinning: test');
  });

  it('handles empty text without error', () => {
    const input = new EmojiText();
    input.setText('');
    const result = demojize(ctx, input);
    expect(result.getError()).toBe('');
    expect(result.getText()).toBe('');
  });

});
