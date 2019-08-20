# hast-util-to-parse5 [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Transform [HAST][] to [Parse5’s AST][ast].

Why not use an adapter?  Because it’s more code weight to use adapters,
and much more fragile.

## Installation

[npm][]:

```bash
npm install hast-util-to-parse5
```

## Usage

```javascript
var toParse5 = require('hast-util-to-parse5')

var ast = toParse5({
  type: 'element',
  tagName: 'h1',
  properties: {},
  children: [{type: 'text', value: 'World!'}]
})

console.log(ast)
```

Yields:

```js
{ nodeName: 'h1',
  tagName: 'h1',
  attrs: [],
  namespaceURI: 'http://www.w3.org/1999/xhtml',
  childNodes: [ { nodeName: '#text', value: 'World!', parentNode: [Circular] } ] }
```

## API

### `toParse5(tree[, space])`

Transform a [HAST Node][node] to an `ASTNode` according to the default
Parse5 adapter.

###### `space`

Whether the root of the given tree is in the `'html'` or `'svg'` space (enum,
`'svg'` or `'html'`, default: `'html'`).

If an `svg` element is found in the HTML space, `toParse5` automatically
switches to the SVG space when entering the element, and switches back when
leaving.

## Contribute

See [`contributing.md` in `syntax-tree/hast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/hast-util-to-parse5.svg

[travis]: https://travis-ci.org/syntax-tree/hast-util-to-parse5

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-to-parse5.svg

[codecov]: https://codecov.io/github/syntax-tree/hast-util-to-parse5

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[ast]: https://github.com/inikulin/parse5/wiki/Documentation

[node]: https://github.com/syntax-tree/hast#ast

[contributing]: https://github.com/syntax-tree/hast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/hast/blob/master/code-of-conduct.md
