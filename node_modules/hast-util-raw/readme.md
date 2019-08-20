# hast-util-raw [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Parse a [HAST][] tree again, with support for embedded `raw` nodes.

One of the reasons to do this is for “malformed” syntax trees: for
example, say there’s an `h1` element in a `p` element, this utility
will make them siblings.

Another reason to do this is if raw HTML/XML is embedded in a syntax
tree, such as markdown.  If you’re working with markdown, use
[`remark-rehype`][remark-rehype] and [`rehype-raw`][rehype-raw].

## Installation

[npm][]:

```bash
npm install hast-util-raw
```

## Usage

```javascript
var h = require('hastscript')
var raw = require('hast-util-raw')

var tree = h('div', [h('h1', ['Foo ', h('h2', 'Bar'), ' Baz'])])

var clean = raw(tree)

console.log(clean)
```

Yields:

```javascript
{ type: 'element',
  tagName: 'div',
  properties: {},
  children:
   [ { type: 'element',
       tagName: 'h1',
       properties: {},
       children: [Object] },
     { type: 'element',
       tagName: 'h2',
       properties: {},
       children: [Object] },
     { type: 'text', value: ' Baz' } ] }
```

## API

### `raw(tree[, file])`

Given a [HAST][] tree and an optional [vfile][] (for positional info),
return a new parsed-again [HAST][] tree.

## Contribute

See [`contributing.md` in `syntax-tree/hast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/hast-util-raw.svg

[travis]: https://travis-ci.org/syntax-tree/hast-util-raw

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-raw.svg

[codecov]: https://codecov.io/github/syntax-tree/hast-util-raw

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[remark-rehype]: https://github.com/wooorm/remark-rehype

[rehype-raw]: https://github.com/wooorm/rehype-raw

[vfile]: https://github.com/vfile/vfile

[contributing]: https://github.com/syntax-tree/hast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/hast/blob/master/code-of-conduct.md
