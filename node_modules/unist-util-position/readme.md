# unist-util-position

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**unist**][unist] utility to get the positional info of nodes.

## Install

[npm][]:

```sh
npm install unist-util-position
```

## Usage

```js
var remark = require('remark')
var position = require('unist-util-position')

var tree = remark().parse('# foo\n\n* bar\n')

position.start(tree) // => {line: 1, column: 1}
position.end(tree) // => {line: 4, column: 1}

position.start() // => {line: null, column: null}
position.end() // => {line: null, column: null}
```

## API

### `position.start([node])`

### `position.end([node])`

Get the start or end points in the positional info of `node`.

###### Parameters

*   `node` ([`Node?`][node]) — Node to check.

###### Returns

[`Point`][point] — Filled with `line` (nullable `uint32 >= 1`),
`column` (nullable `uint32 >= 1`), `offset` (nullable `uint32 >= 0`).

Note that in [unist][], `line` and `column` are 1-indexed integers and
`offset` is a 0-indexed integer.

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

[build-badge]: https://img.shields.io/travis/syntax-tree/unist-util-position.svg

[build]: https://travis-ci.org/syntax-tree/unist-util-position

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-position.svg

[coverage]: https://codecov.io/github/syntax-tree/unist-util-position

[downloads-badge]: https://img.shields.io/npm/dm/unist-util-position.svg

[downloads]: https://www.npmjs.com/package/unist-util-position

[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-position.svg

[size]: https://bundlephobia.com/result?p=unist-util-position

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[license]: license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[point]: https://github.com/syntax-tree/unist#point
