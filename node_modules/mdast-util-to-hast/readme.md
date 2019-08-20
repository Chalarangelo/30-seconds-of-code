# mdast-util-to-hast

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]

Transform [mdast][] to [hast][].

> **Note**: You probably want to use [remark-rehype][].

## Installation

[npm][]:

```bash
npm install mdast-util-to-hast
```

## Usage

Say we have the following `example.md`:

```markdown
## Hello **World**!
```

…and next to it, `example.js`:

```javascript
var inspect = require('unist-util-inspect')
var unified = require('unified')
var parse = require('remark-parse')
var vfile = require('to-vfile')
var toHast = require('mdast-util-to-hast')

var tree = unified()
  .use(parse)
  .parse(vfile.readSync('example.md'))

console.log(inspect(toHast(tree)))
```

Which when running with `node example` yields:

```txt
root[1] (1:1-2:1, 0-20)
└─ element[3] (1:1-1:20, 0-19) [tagName="h2"]
   ├─ text: "Hello " (1:4-1:10, 3-9)
   ├─ element[1] (1:10-1:19, 9-18) [tagName="strong"]
   │  └─ text: "World" (1:12-1:17, 11-16)
   └─ text: "!" (1:19-1:20, 18-19)
```

## API

### `toHast(node[, options])`

Transform the given [mdast][] tree to a [hast][] tree.

##### Options

###### `options.allowDangerousHTML`

Whether to allow `html` nodes and inject them as raw HTML (`boolean`, default:
`false`).  Only do this when compiling later with `hast-util-to-html`.

###### `options.commonmark`

Set to `true` (default: `false`) to prefer the first when duplicate definitions
are found.  The default behaviour is to prefer the last duplicate definition.

###### `options.handlers`

Object mapping [mdast nodes][mdast] to functions handling those elements.
Take a look at [`lib/handlers/`][handlers] for examples.

##### Returns

[`HASTNode`][hast].

##### Notes

*   `yaml` and `toml` nodes are ignored
*   [`html`][mdast-html] nodes are ignored if `allowDangerousHTML` is `false`
*   [`position`][unist-position]s are properly patched
*   Unknown nodes with `children` are transformed to `div` elements
*   Unknown nodes with `value` are transformed to `text` nodes
*   [`node.data.hName`][hname] configures the hast element’s tag-name
*   [`node.data.hProperties`][hproperties] is mixed into the hast element’s
    properties
*   [`node.data.hChildren`][hchildren] configures the hast element’s children

##### Examples

###### `hName`

`node.data.hName` sets the tag-name of an element.
The following [mdast][]:

```js
{
  type: 'strong',
  data: {hName: 'b'},
  children: [{type: 'text', value: 'Alpha'}]
}
```

Yields, in [hast][]:

```js
{
  type: 'element',
  tagName: 'b',
  properties: {},
  children: [{type: 'text', value: 'Alpha'}]
}
```

###### `hProperties`

`node.data.hProperties` in sets the properties of an element.
The following [mdast][]:

```js
{
  type: 'image',
  src: 'circle.svg',
  alt: 'Big red circle on a black background',
  title: null
  data: {hProperties: {className: ['responsive']}}
}
```

Yields, in [hast][]:

```js
{
  type: 'element',
  tagName: 'img',
  properties: {
    src: 'circle.svg',
    alt: 'Big red circle on a black background',
    className: ['responsive']
  },
  children: []
}
```

###### `hChildren`

`node.data.hChildren` sets the children of an element.
The following [mdast][]:

```js
{
  type: 'code',
  lang: 'js',
  data: {
    hChildren: [
      {
        type: 'element',
        tagName: 'span',
        properties: {className: ['hljs-meta']},
        children: [{type: 'text', value: '"use strict"'}]
      },
      {type: 'text', value: ';'}
    ]
  },
  value: '"use strict";'
}
```

Yields, in [hast][] (**note**: the `pre` and `language-js` class are normal
`mdast-util-to-hast` functionality):

```js
{
  type: 'element',
  tagName: 'pre',
  properties: {},
  children: [{
    type: 'element',
    tagName: 'code',
    properties: {className: ['language-js']},
    children: [
      {
        type: 'element',
        tagName: 'span',
        properties: {className: ['hljs-meta']},
        children: [{type: 'text', value: '"use strict"'}]
      },
      {type: 'text', value: ';'}
    ]
  }]
}
```

## Related

*   [`mdast-util-to-nlcst`](https://github.com/syntax-tree/mdast-util-to-nlcst)
    — Transform mdast to nlcst
*   [`hast-util-sanitize`](https://github.com/syntax-tree/hast-util-sanitize)
    — Sanitize hast nodes
*   [`hast-util-to-mdast`](https://github.com/syntax-tree/hast-util-to-mdast)
    — Transform hast to mdast
*   [`remark-rehype`](https://github.com/remarkjs/remark-rehype)
    — rehype support for remark
*   [`rehype-remark`](https://github.com/rehypejs/rehype-remark)
    — remark support for rehype

## Contribute

See [`contributing.md` in `syntax-tree/mdast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/mdast-util-to-hast.svg

[build]: https://travis-ci.org/syntax-tree/mdast-util-to-hast

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-to-hast.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-util-to-hast

[downloads-badge]: https://img.shields.io/npm/dm/mdast-util-to-hast.svg

[downloads]: https://www.npmjs.com/package/mdast-util-to-hast

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[mdast]: https://github.com/syntax-tree/mdast

[hast]: https://github.com/syntax-tree/hast

[mdast-html]: https://github.com/syntax-tree/mdast#html

[unist-position]: https://github.com/syntax-tree/unist#location

[handlers]: lib/handlers

[remark-rehype]: https://github.com/remarkjs/remark-rehype

[contributing]: https://github.com/syntax-tree/mdast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/mdast/blob/master/code-of-conduct.md

[hname]: #hname

[hproperties]: #hproperties

[hchildren]: #hchildren
