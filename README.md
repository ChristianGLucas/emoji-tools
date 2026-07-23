# christiangeorgelucas/emoji-tools

Composable [Axiom](https://axiomide.com) nodes for **deterministic emoji and
Unicode-grapheme text operations**. Built for the Axiom marketplace.

Wraps [`node-emoji`](https://www.npmjs.com/package/node-emoji) (MIT,
shortcode <-> Unicode conversion and name lookup/search, built only on the
MIT `emojilib`/`skin-tone`/`char-regex`/`@sindresorhus/is` packages),
[`emoji-regex`](https://www.npmjs.com/package/emoji-regex) (MIT, Mathias
Bynens' spec-tracking emoji-matching regex) for detection/extraction/
counting, and the ECMAScript built-in `Intl.Segmenter` (native to the
Node.js runtime -- zero extra dependency) in grapheme-cluster mode for
correct user-perceived-character segmentation and counting of text
containing emoji, ZWJ sequences, and skin-tone modifiers. Full runtime
dependency tree verified MIT, with no native/compiled bindings anywhere in
the chain -- every library here is pure JS/JSON data plus the JS engine's
own built-in Unicode segmentation.

## Use it from your agent or app

Every node in this package is a **live, auto-scaling API endpoint** on the
[Axiom](https://axiomide.com) marketplace — call it from an AI agent or your own
code, with nothing to self-host.

**📦 See it on the marketplace:**
https://dev.axiomide.com/marketplace/christiangeorgelucas/emoji-tools@0.1.0

**Hook it up to an AI agent (MCP).** Add Axiom's hosted MCP server to any MCP
client and every node becomes a typed tool your agent can call — search the
catalog, inspect a schema, and invoke it directly.

```bash
# Claude Code
claude mcp add --transport http axiom https://api.axiomide.com/mcp \
  --header "Authorization: Bearer $AXIOM_API_KEY"
```

Claude Desktop, Cursor, or any config-based client:

```json
{
  "mcpServers": {
    "axiom": {
      "type": "http",
      "url": "https://api.axiomide.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_AXIOM_API_KEY" }
    }
  }
}
```

**Call it from the CLI.**

```bash
axiom invoke christiangeorgelucas/emoji-tools/Emojize --input '{ ... }'
```

**Call it over HTTP.**

```bash
curl -X POST https://api.axiomide.com/invocations/v1/nodes/christiangeorgelucas/emoji-tools/0.1.0/Emojize \
  -H "Authorization: Bearer $AXIOM_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{ ... }'
```

> Input/output schema for each node is on the marketplace page above, or via
> `axiom inspect node christiangeorgelucas/emoji-tools/Emojize`.

### Get started free

Install the CLI:

```bash
# macOS / Linux — Homebrew
brew install axiomide/tap/axiom

# macOS / Linux — install script
curl -fsSL https://raw.githubusercontent.com/AxiomIDE/axiom-releases/main/install.sh | sh
```

**Windows:** download the `windows/amd64` `.zip` from the
[releases page](https://github.com/AxiomIDE/axiom-releases/releases), unzip it,
and put `axiom.exe` on your `PATH`.

Then `axiom version` to verify, `axiom login` (GitHub or Google) to authenticate,
and create an API key under **Console → API Keys**. Docs and sign-up at
**[axiomide.com](https://axiomide.com)**.

## Nodes

Fifteen nodes, all stateless, deterministic, single-input/single-output:

**Shortcode <-> Unicode:**
- **Emojize** -- `:shortcode:` -> Unicode emoji.
- **Demojize** -- Unicode emoji -> `:shortcode:`.

**Detection, extraction, counting (over a shared `EmojiText { text }`
input):**
- **ContainsEmoji** -- does the text contain any emoji.
- **CountEmoji** -- how many emoji (composed sequences count as one).
- **ExtractEmoji** -- every emoji occurrence with its name and UTF-16
  `[start, end)` span.
- **StripEmoji** -- remove all emoji.
- **ReplaceEmoji** -- replace every emoji with a caller placeholder or its
  name.

**Grapheme clusters** (the correct notion of text "length" once emoji/ZWJ/
skin-tone sequences are involved -- via the built-in `Intl.Segmenter`):
- **CountGraphemes** -- user-perceived character count.
- **SegmentGraphemes** -- split into grapheme clusters.

**Name lookup:**
- **GetEmojiName** -- emoji -> shortcode name.
- **LookupEmojiByName** -- shortcode name -> emoji.
- **SearchEmoji** -- keyword substring search over emoji names.

**Structural analysis:**
- **AnalyzeEmoji** -- code points, ZWJ-sequence detection, skin-tone
  detection, regional-indicator flag detection + decoded ISO country code.
- **ApplySkinTone** -- apply or strip a Fitzpatrick skin-tone modifier.
- **DetectFlags** -- scan text for every regional-indicator flag sequence,
  decoded to its ISO 3166-1 alpha-2 country code.

Every node returns a structured `error` field instead of crashing on
oversized or malformed input; `text` fields are capped at 20,000 UTF-16
code units and single-token (`emoji`/`name`/`keyword`) fields at 64.

## License

MIT. See `LICENSE`.
