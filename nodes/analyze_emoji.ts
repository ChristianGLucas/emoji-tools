import { EmojiToken, EmojiAnalysis } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import {
  checkToken,
  emojiRegex,
  codePointLabels,
  isZwjSequence,
  detectSkinTone,
  decodeFlagIfExact,
  nameFor,
} from './emoji_helper';

/**
 * Structurally analyzes a single emoji token: its Unicode code points (as
 * "U+XXXX" labels, in order), whether it is a ZWJ-joined sequence (e.g. a
 * family or profession combination), whether it carries a Fitzpatrick
 * skin-tone modifier (and which one), whether it is exactly a two-part
 * regional-indicator flag sequence (and its decoded ISO 3166-1 alpha-2
 * country code), and its node-emoji shortcode name if known. `is_emoji` is
 * false when `emoji` does not match the emoji-regex pattern at all -- in
 * that case every other field is zero-valued/unset except `code_points`,
 * which is still populated (analysis of the raw code points is still
 * meaningful even for non-emoji input). `emoji` must be non-empty and at
 * most 64 UTF-16 code units, or a structured error is returned.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function analyzeEmoji(ax: AxiomContext, input: EmojiToken): EmojiAnalysis {
  const result = new EmojiAnalysis();
  const token = input.getEmoji() ?? '';
  const err = checkToken(token, 'emoji');
  if (err) {
    result.setError(err);
    return result;
  }

  result.setCodePointsList(codePointLabels(token));

  // "Is this whole token an emoji sequence" -- match the regex against the
  // token and require the match to span the entire string, not just a
  // substring of it (so e.g. "a👍" is NOT is_emoji, even though it
  // contains one).
  const re = emojiRegex();
  const m = re.exec(token);
  const isWholeMatch = m !== null && m.index === 0 && m[0].length === token.length;
  result.setIsEmoji(isWholeMatch);
  if (!isWholeMatch) {
    return result;
  }

  result.setIsZwjSequence(isZwjSequence(token));

  const tone = detectSkinTone(token);
  result.setHasSkinToneModifier(tone !== undefined);
  if (tone) result.setSkinTone(tone);

  const countryCode = decodeFlagIfExact(token);
  result.setIsRegionalIndicatorFlag(countryCode !== undefined);
  if (countryCode) result.setCountryCode(countryCode);

  const name = nameFor(token);
  if (name) result.setName(name);

  return result;
}
