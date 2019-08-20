# unist-util-visit-children

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[**unist**][unist] direct child visitor.

## Install

[npm][]:

```sh
npm install unist-util-visit-children
```

## Usage

```js
var u = require('unist-builder')
var visitChildren = require('unist-util-visit-children')

var visit = visitChildren(function(node) {
  console.log(node)
})

var tree = u('tree', [
  u('leaf', 'leaf 1'),
  u('node', [u('leaf', 'leaf 2'), u('leaf', 'leaf 3')]),
  u('leaf', 'leaf 4'),
  u('void')
])

visit(tree)
```

Yields:

```js
{ type: 'leaf', value: 'leaf 1' }
{
  type: 'node',
  children: [
    { type: 'leaf', value: 'leaf 2' },
    { type: 'leaf', value: 'leaf 3' }
  ]
}
{ type: 'leaf', value: 'leaf 4' }
{ type: 'void' }
```

## API

### `visit = visitChildren(visitor)`

Wrap [`visitor`][visitor] to be invoked for each [child][] in the nodes later
given to [`visit`][visit].

#### `function visitor(child, index, parent)`

Invoked if [`visit`][visit] is called on a [parent][] node for each [child][].

#### `function visit(parent)`

Invoke [`visitor`][visitor] for each [child][] of the [parent][].

## Related

*   [`unist-util-visit`](https://github.com/syntax-tree/unist-util-visit)
    — Recursively walk over nodes
*   [`unist-util-visit-parents`](https://github.com/syntax-tree/unist-util-visit-parents)
    — Like `visit`, but with a stack of parents
*   [`unist-util-filter`](https://github.com/eush77/unist-util-filter)
    — Create a new tree with all nodes that pass a test
*   [`unist-util-map`](https://github.com/syntax-tree/unist-util-map)
    — Create a new tree with all nodes mapped by a given function
*   [`unist-util-remove`](https://github.com/eush77/unist-util-remove)
    — Remove nodes from a tree that pass a test
*   [`unist-util-select`](https://github.com/eush77/unist-util-select)
    — Select nodes with CSS-like selectors

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

[build-badge]: https://img.shields.io/travis/syntax-tree/unist-util-visit-children.svg

[build]: https://travis-ci.org/syntax-tree/unist-util-visit-children

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-visit-children.svg

[coverage]: https://codecov.io/github/syntax-tree/unist-util-visit-children

[downloads-badge]: https://img.shields.io/npm/dm/unist-util-visit-children.svg

[downloads]: https://www.npmjs.com/package/unist-util-visit-children

[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-visit-children.svg

[size]: https://bundlephobia.com/result?p=unist-util-visit-children

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[unist]: https://github.com/syntax-tree/unist

[parent]: https://github.com/syntax-tree/unist#parent-1

[child]: https://github.com/syntax-tree/unist#child

[visit]: #function-visitparent

[visitor]: #function-visitorchild-index-parent

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md
