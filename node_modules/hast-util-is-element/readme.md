# hast-util-is-element

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**hast**][hast] utility to check if a [*node*][node] is a (certain)
[*element*][element].

## Install

[npm][]:

```sh
npm install hast-util-is-element
```

## Usage

```js
var is = require('hast-util-is-element')

is({type: 'text', value: 'foo'}) // => false

is({type: 'element', tagName: 'a'}, 'a') // => true

is({type: 'element', tagName: 'a'}, ['a', 'area']) // => true
```

## API

### `isElement(node[, tagName|tagNames])`

Check if the given value is a (certain) [*element*][element].

*   When given a `tagName` or `tagNames`, checks that `node` is an
    [*element*][element] whose `tagName` field matches `tagName` or is included
    in `tagNames`
*   Otherwise checks that `node` is an [*element*][element]

###### Parameters

*   `node` (`*`) — Value to check, probably [`Node`][node]
*   `tagName` (`string`, optional) — Value that `node`s `tagName` field should
    match
*   `tagNames` (`Array.<string>`, optional) — Values that should include `node`s
    `tagName` field should match

###### Returns

`boolean` — whether `node` passes the test.

###### Throws

`Error` — When the second parameter is given but invalid.

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/syntax-tree/hast-util-is-element.svg

[build]: https://travis-ci.org/syntax-tree/hast-util-is-element

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-is-element.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-is-element

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-is-element.svg

[downloads]: https://www.npmjs.com/package/hast-util-is-element

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-is-element.svg

[size]: https://bundlephobia.com/result?p=hast-util-is-element

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

[node]: https://github.com/syntax-tree/unist#node

[element]: https://github.com/syntax-tree/hast#element
