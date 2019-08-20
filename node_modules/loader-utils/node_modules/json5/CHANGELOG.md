### v1.0.1 [[code][c1.0.1], [diff][d1.0.1]]

[c1.0.1]: https://github.com/json5/json5/tree/v1.0.1
[d1.0.1]: https://github.com/json5/json5/compare/v1.0.0...v1.0.1

This release includes a bug fix and minor change.

- Fix: `parse` throws on unclosed objects and arrays.

- New: `package.json5` has been removed until an easier way to keep it in sync
  with `package.json` is found.


### v1.0.0 [[code][c1.0.0], [diff][d1.0.0]]

[c1.0.0]: https://github.com/json5/json5/tree/v1.0.0
[d1.0.0]: https://github.com/json5/json5/compare/v0.5.1...v1.0.0

This release includes major internal changes and public API enhancements.

- **Major** JSON5 officially supports Node.js v4 and later. Support for Node.js
  v0.10 and v0.12 have been dropped.

- New: Unicode property names and Unicode escapes in property names are
  supported. ([#1])

- New: `stringify` outputs trailing commas in objects and arrays when a `space`
  option is provided. ([#66])

- New: JSON5 allows line and paragraph separator characters (U+2028 and U+2029)
  in strings in order to be compatible with JSON. However, ES5 does not allow
  these characters in strings, so JSON5 gives a warning when they are parsed and
  escapes them when they are stringified. ([#70])

- New: `stringify` accepts an options object as its second argument. The
  supported options are `replacer`, `space`, and a new `quote` option that
  specifies the quote character used in strings. ([#71])

- New: The CLI supports STDIN and STDOUT and adds `--out-file`, `--space`, and
  `--validate` options. See `json5 --help` for more information. ([#72], [#84],
  and [#108])

- New: In addition to the white space characters space `\t`, `\v`, `\f`, `\n`,
  `\r`, and `\xA0`, the additional white space characters `\u2028`, `\u2029`,
  and all other characters in the Space Separator Unicode category are allowed.

- New: In addition to the character escapes `\'`, `\"`, `\\`, `\b`, `\f`, `\n`,
  `\r`, and `\t`, the additional character escapes `\v` and `\0`, hexadecimal
  escapes like `\x0F`, and unnecessary escapes like `\a` are allowed in string
  values and string property names.

- New: `stringify` outputs strings with single quotes by default but
  intelligently uses double quotes if there are more single quotes than double
  quotes inside the string. (i.e. `stringify('Stay here.')` outputs
  `'Stay here.'` while `stringify('Let\'s go.')` outputs `"Let's go."`)

- New: When a character is not allowed in a string, `stringify` outputs a
  character escape like `\t` when available, a hexadecimal escape like `\x0F`
  when the Unicode code point is less than 256, or a Unicode character escape
  like `\u01FF`, in that order.

- New: `stringify` checks for a `toJSON5` method on objects and, if it exists,
  stringifies its return value instead of the object. `toJSON5` overrides
  `toJSON` if they both exist.

- New: To `require` or `import` JSON5 files, use `require('json5/lib/register')`
  or `import 'json5/lib/register'`. Previous versions used `json5/lib/require`,
  which still exists for backward compatibility but is deprecated and will give
  a warning.

- New: To use JSON5 in browsers, use the file at `dist/index.js` or
  `https://unpkg.com/json5@^1.0.0`.

- Fix: `stringify` properly outputs `Infinity` and `NaN`. ([#67])

- Fix: `isWord` no longer becomes a property of `JSON5` after calling
  `stringify`. ([#68] and [#89])

- Fix: `stringify` no longer throws when an object does not have a `prototype`.
  ([#154])

- Fix: `stringify` properly handles the `key` argument of `toJSON(key)` methods.
  `toJSON5(key)` follows this pattern.

- Fix: `stringify` accepts `Number` and `String` objects as its `space`
  argument.

- Fix: In addition to a function, `stringify` also accepts an array of keys to
  include in the output as its `replacer` argument. Numbers, `Number` objects,
  and `String` objects will be converted to a string if they are given as array
  values.


### v0.5.1 [[code][c0.5.1], [diff][d0.5.1]]

[c0.5.1]: https://github.com/json5/json5/tree/v0.5.1
[d0.5.1]: https://github.com/json5/json5/compare/v0.5.0...v0.5.1

This release includes a minor fix for indentations when stringifying empty
arrays.

- Fix: Indents no longer appear in empty arrays when stringified. ([#134])


### v0.5.0 [[code][c0.5.0], [diff][d0.5.0]]

[c0.5.0]: https://github.com/json5/json5/tree/v0.5.0
[d0.5.0]: https://github.com/json5/json5/compare/v0.4.0...v0.5.0

This release includes major internal changes and public API enhancements.

- **Major:** JSON5 officially supports Node.js v4 LTS and v5. Support for
  Node.js v0.6 and v0.8 have been dropped, while support for v0.10 and v0.12
  remain.

- Fix: YUI Compressor no longer fails when compressing json5.js. ([#97])

- New: `parse` and the CLI provide line and column numbers when displaying error
  messages. ([#101]; awesome work by [@amb26].)


### v0.4.0 [[code][c0.4.0], [diff][d0.4.0]]

[c0.4.0]: https://github.com/json5/json5/tree/v0.4.0
[d0.4.0]: https://github.com/json5/json5/compare/v0.2.0...v0.4.0

Note that v0.3.0 was tagged, but never published to npm, so this v0.4.0
changelog entry includes v0.3.0 features.

This is a massive release that adds `stringify` support, among other things.

- **Major:** `JSON5.stringify()` now exists!
  This method is analogous to the native `JSON.stringify()`;
  it just avoids quoting keys where possible.
  See the [usage documentation](./README.md#usage) for more.
  ([#32]; huge thanks and props [@aeisenberg]!)

- New: `NaN` and `-NaN` are now allowed number literals.
  ([#30]; thanks [@rowanhill].)

- New: Duplicate object keys are now allowed; the last value is used.
  This is the same behavior as JSON. ([#57]; thanks [@jordanbtucker].)

- Fix: Properly handle various whitespace and newline cases now.
  E.g. JSON5 now properly supports escaped CR and CRLF newlines in strings,
  and JSON5 now accepts the same whitespace as JSON (stricter than ES5).
  ([#58], [#60], and [#63]; thanks [@jordanbtucker].)

- New: Negative hexadecimal numbers (e.g. `-0xC8`) are allowed again.
  (They were disallowed in v0.2.0; see below.)
  It turns out they *are* valid in ES5, so JSON5 supports them now too.
  ([#36]; thanks [@jordanbtucker]!)


### v0.2.0 [[code][c0.2.0], [diff][d0.2.0]]

[c0.2.0]: https://github.com/json5/json5/tree/v0.2.0
[d0.2.0]: https://github.com/json5/json5/compare/v0.1.0...v0.2.0

This release fixes some bugs and adds some more utility features to help you
express data more easily:

- **Breaking:** Negative hexadecimal numbers (e.g. `-0xC8`) are rejected now.
  While V8 (e.g. Chrome and Node) supported them, it turns out they're invalid
  in ES5. This has been [fixed in V8][v8-hex-fix] (and by extension, Chrome
  and Node), so JSON5 officially rejects them now, too. ([#36])

- New: Trailing decimal points in decimal numbers are allowed again.
  (They were disallowed in v0.1.0; see below.)
  They're allowed by ES5, and differentiating between integers and floats may
  make sense on some platforms. ([#16]; thanks [@Midar].)

- New: `Infinity` and `-Infinity` are now allowed number literals.
  ([#30]; thanks [@pepkin88].)

- New: Plus signs (`+`) in front of numbers are now allowed, since it can
  be helpful in some contexts to explicitly mark numbers as positive.
  (E.g. when a property represents changes or deltas.)

- Fix: unescaped newlines in strings are rejected now.
  ([#24]; thanks [@Midar].)


### v0.1.0 [[code][c0.1.0], [diff][d0.1.0]]

[c0.1.0]: https://github.com/json5/json5/tree/v0.1.0
[d0.1.0]: https://github.com/json5/json5/compare/v0.0.1...v0.1.0

This release tightens JSON5 support and adds helpful utility features:

- New: Support hexadecimal numbers. (Thanks [@MaxNanasy].)

- Fix: Reject octal numbers properly now. Previously, they were accepted but
  improperly parsed as base-10 numbers. (Thanks [@MaxNanasy].)

- **Breaking:** Reject "noctal" numbers now (base-10 numbers that begin with a
  leading zero). These are disallowed by both JSON5 and JSON, as well as by
  ES5's strict mode. (Thanks [@MaxNanasy].)

- New: Support leading decimal points in decimal numbers.
  (Thanks [@MaxNanasy].)

- **Breaking:** Reject trailing decimal points in decimal numbers now. These
  are disallowed by both JSON5 and JSON. (Thanks [@MaxNanasy].)

- **Breaking:** Reject omitted elements in arrays now. These are disallowed by
  both JSON5 and JSON.

- Fix: Throw proper `SyntaxError` instances on errors now.

- New: Add Node.js `require()` hook. Register via `json5/lib/require`.

- New: Add Node.js `json5` executable to compile JSON5 files to JSON.


### v0.0.1 [[code][c0.0.1], [diff][d0.0.1]]

[c0.0.1]: https://github.com/json5/json5/tree/v0.0.1
[d0.0.1]: https://github.com/json5/json5/compare/v0.0.0...v0.0.1

This was the first implementation of this JSON5 parser.

- Support unquoted object keys, including reserved words. Unicode characters
  and escape sequences sequences aren't yet supported.

- Support single-quoted strings.

- Support multi-line strings.

- Support trailing commas in arrays and objects.

- Support comments, both inline and block.


### v0.0.0 [[code](https://github.com/json5/json5/tree/v0.0.0)]

Let's consider this to be Douglas Crockford's original [json_parse.js] — a
parser for the regular JSON format.


[json_parse.js]: https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js
[v8-hex-fix]: http://code.google.com/p/v8/issues/detail?id=2240

[@MaxNanasy]: https://github.com/MaxNanasy
[@Midar]: https://github.com/Midar
[@pepkin88]: https://github.com/pepkin88
[@rowanhill]: https://github.com/rowanhill
[@aeisenberg]: https://github.com/aeisenberg
[@jordanbtucker]: https://github.com/jordanbtucker
[@amb26]: https://github.com/amb26

[#1]: https://github.com/json5/json5/issues/1
[#16]: https://github.com/json5/json5/issues/16
[#24]: https://github.com/json5/json5/issues/24
[#30]: https://github.com/json5/json5/issues/30
[#32]: https://github.com/json5/json5/issues/32
[#36]: https://github.com/json5/json5/issues/36
[#57]: https://github.com/json5/json5/issues/57
[#58]: https://github.com/json5/json5/pull/58
[#60]: https://github.com/json5/json5/pull/60
[#63]: https://github.com/json5/json5/pull/63
[#66]: https://github.com/json5/json5/issues/66
[#67]: https://github.com/json5/json5/issues/67
[#68]: https://github.com/json5/json5/issues/68
[#70]: https://github.com/json5/json5/issues/70
[#71]: https://github.com/json5/json5/issues/71
[#72]: https://github.com/json5/json5/issues/72
[#84]: https://github.com/json5/json5/pull/84
[#89]: https://github.com/json5/json5/pull/89
[#97]: https://github.com/json5/json5/pull/97
[#101]: https://github.com/json5/json5/pull/101
[#108]: https://github.com/json5/json5/pull/108
[#134]: https://github.com/json5/json5/pull/134
[#154]: https://github.com/json5/json5/issues/154
