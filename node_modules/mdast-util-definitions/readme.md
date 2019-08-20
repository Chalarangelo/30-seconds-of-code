# mdast-util-definitions

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**mdast**][mdast] utility to get definitions by `identifier`.

Supports funky keys, like `__proto__` or `toString`.

## Install

[npm][]:

```sh
npm install mdast-util-definitions
```

## Usage

```js
var remark = require('remark')
var definitions = require('mdast-util-definitions')

var ast = remark().parse('[example]: https://example.com "Example"')

var definition = definitions(ast)

definition('example')
// => {type: 'definition', 'title': 'Example', ...}

definition('foo')
// => null
```

## API

### `definitions(node[, options])`

Create a cache of all [definition][]s in [`node`][node].

###### `options.commonmark`

`boolean`, default: false — Turn on to use CommonMark precedence: ignore
definitions found later for duplicate definitions.
The default behaviour is to prefer the last found definition.

###### Returns

[`Function`][fn-definition]

### `definition(identifier)`

###### Parameters

*   `identifier` (`string`) — [Identifier][] of [definition][].

###### Returns

[`Node?`][node] — [Definition][], if found.

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

[build-badge]: https://img.shields.io/travis/syntax-tree/mdast-util-definitions.svg

[build]: https://travis-ci.org/syntax-tree/mdast-util-definitions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-definitions.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-util-definitions

[downloads-badge]: https://img.shields.io/npm/dm/mdast-util-definitions.svg

[downloads]: https://www.npmjs.com/package/mdast-util-definitions

[size-badge]: https://img.shields.io/bundlephobia/minzip/mdast-util-definitions.svg

[size]: https://bundlephobia.com/result?p=mdast-util-definitions

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

[mdast]: https://github.com/syntax-tree/mdast

[node]: https://github.com/syntax-tree/unist#node

[fn-definition]: #definitionidentifier

[definition]: https://github.com/syntax-tree/mdast#definition

[identifier]: https://github.com/syntax-tree/mdast#association
