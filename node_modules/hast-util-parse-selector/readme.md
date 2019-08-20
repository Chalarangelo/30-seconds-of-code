# hast-util-parse-selector

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**hast**][hast] utility to create an [*element*][element] from a simple CSS
selector.

## Install

[npm][]:

```sh
npm install hast-util-parse-selector
```

## Usage

```js
var parseSelector = require('hast-util-parse-selector')

console.log(parseSelector('.quux#bar.baz.qux'))
```

Yields:

```js
{ type: 'element',
  tagName: 'div',
  properties: { id: 'bar', className: [ 'quux', 'baz', 'qux' ] },
  children: [] }
```

## API

### `parseSelector([selector][, defaultTagName])`

Create an [*element*][element] [*node*][node] from a simple CSS selector.

###### `selector`

`string`, optional — Can contain a tag-name (`foo`), classes (`.bar`),
and an ID (`#baz`).
Multiple classes are allowed.
Uses the last ID if multiple IDs are found.

###### `defaultTagName`

`string`, optional, defaults to `div` — Tag name to use if `selector` does not
specify one.

###### Returns

[`Element`][element].

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

[build-badge]: https://img.shields.io/travis/syntax-tree/hast-util-parse-selector.svg

[build]: https://travis-ci.org/syntax-tree/hast-util-parse-selector

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-parse-selector.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-parse-selector

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-parse-selector.svg

[downloads]: https://www.npmjs.com/package/hast-util-parse-selector

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-parse-selector.svg

[size]: https://bundlephobia.com/result?p=hast-util-parse-selector

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

[hast]: https://github.com/syntax-tree/hast

[node]: https://github.com/syntax-tree/hast#nodes

[element]: https://github.com/syntax-tree/hast#element
