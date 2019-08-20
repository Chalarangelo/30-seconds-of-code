# mdast-util-compact

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**mdast**][mdast] utility to make trees compact: collapse text nodes (when
possible) and blockquotes (in commonmark mode).

## Install

[npm][]:

```sh
npm install mdast-util-compact
```

## Usage

```js
var u = require('unist-builder')
var compact = require('mdast-util-compact')

var tree = u('strong', [u('text', 'alpha'), u('text', ' '), u('text', 'bravo')])

compact(tree)

console.log(tree)
```

Yields:

```js
{ type: 'strong',
  children: [ { type: 'text', value: 'alpha bravo' } ] }
```

## API

### `compact(tree[, commonmark])`

Walk the [tree][] and collapse nodes.
Combines adjacent [text][]s (but not when they represent entities or escapes).
If `commonmark` is `true`, collapses [blockquote][]s.

Handles [positional information][position-information] properly.

###### Returns

The given `tree`.

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/mdast-util-compact.svg

[build]: https://travis-ci.org/syntax-tree/mdast-util-compact

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-compact.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-util-compact

[downloads-badge]: https://img.shields.io/npm/dm/mdast-util-compact.svg

[downloads]: https://www.npmjs.com/package/mdast-util-compact

[size-badge]: https://img.shields.io/bundlephobia/minzip/mdast-util-compact.svg

[size]: https://bundlephobia.com/result?p=mdast-util-compact

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md

[mdast]: https://github.com/syntax-tree/mdast

[tree]: https://github.com/syntax-tree/unist#tree

[position-information]: https://github.com/syntax-tree/unist#positional-information

[text]: https://github.com/syntax-tree/mdast#text

[blockquote]: https://github.com/syntax-tree/mdast#blockquote
