# remark-stringify [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[Compiler][] for [**unified**][unified].  Stringifies an
[**MDAST**][mdast] syntax tree to markdown.  Used in the [**remark**
processor][processor].  Can be [extended][extend] to change how
markdown is compiled.

## Installation

[npm][]:

```sh
npm install remark-stringify
```

## Usage

```js
var unified = require('unified');
var createStream = require('unified-stream');
var parse = require('remark-parse');
var toc = require('remark-toc');
var stringify = require('remark-stringify');

var processor = unified()
  .use(parse)
  .use(toc)
  .use(stringify, {
    bullet: '*',
    fence: '~',
    fences: true,
    incrementListMarker: false
  });

process.stdin
  .pipe(createStream(processor))
  .pipe(process.stdout);
```

## Table of Contents

*   [API](#api)
    *   [processor.use(stringify\[, options\])](#processorusestringify-options)
    *   [stringify.Compiler](#stringifycompiler)
*   [Extending the Compiler](#extending-the-compiler)
    *   [Compiler#visitors](#compilervisitors)
    *   [function visitor(node\[, parent\])](#function-visitornode-parent)
*   [License](#license)

## API

### `processor.use(stringify[, options])`

Configure the `processor` to stringify [**MDAST**][mdast] syntax trees
to markdown.

##### `options`

Options are passed directly, or passed later through [`processor.data()`][data].

###### `options.gfm`

Stringify with the required escapes for GFM compatible markdown (`boolean`,
default: `true`).

*   Escape pipes (`|`, for tables)
*   Escape colons (`:`, for literal URLs)
*   Escape tildes (`~`, for strike-through)

###### `options.commonmark`

Stringify for CommonMark compatible markdown (`boolean`, default: `false`).

*   Compile adjacent blockquotes separately
*   Escape more characters using slashes, instead of as entities

###### `options.pedantic`

Stringify for pedantic compatible markdown (`boolean`, default: `false`).

*   Escape underscores in words

###### `options.entities`

How to stringify entities (`string` or `boolean`, default: `false`):

*   `true` — Entities are generated for special HTML characters
    (`&` > `&amp;`) and non-ASCII characters (`©` > `&copy;`).
    If named entities are not (widely) supported, numbered character
    references are used (`’` > `&#x2019;`)
*   `'numbers'` — Numbered entities are generated (`&` > `&#x26;`)
    for special HTML characters and non-ASCII characters
*   `'escape'` — Special HTML characters are encoded (`&` >
    `&amp;`, `’` > `&#x2019;`), non-ASCII characters not (ö persists)

###### `options.setext`

Compile headings, when possible, in Setext-style (`boolean`, default: `false`).
Uses `=` for level one headings and `-` for level two headings.  Other heading
levels are compiled as ATX (respecting `closeAtx`).

###### `options.closeAtx`

Compile ATX headings with the same amount of closing hashes as opening hashes
(`boolean`, default: `false`).

###### `options.looseTable`

Create tables without fences: initial and final pipes (`boolean`, default:
`false`).

###### `options.spacedTable`

Create tables without spacing between pipes and content (`boolean`, default:
`true`).

###### `options.paddedTable`

Create tables with padding in each cell so that they are the same size
(`boolean`, default: `true`).

###### `options.stringLength`

Function passed to [`markdown-table`][markdown-table] to detect the length of a
table cell (`Function`, default: [`s => s.length`][string-length]).

###### `options.fence`

Fence marker to use for code blocks (`'~'` or ``'`'``, default: ``'`'``).

###### `options.fences`

Stringify code blocks without language with fences (`boolean`, default:
`false`).

###### `options.bullet`

Bullet marker to use for unordered list items (`'-'`, `'*'`, or `'+'`,
default: `'-'`).

###### `options.listItemIndent`

How to indent the content from list items (`'tab'`, `'mixed'` or `'1'`,
default: `'tab'`).

*   `'tab'`: use tab stops (4 spaces)
*   `'1'`: use one space
*   `'mixed'`: use `1` for tight and `tab` for loose list items

###### `options.incrementListMarker`

Whether to increment ordered list item bullets (`boolean`, default: `true`).

###### `options.rule`

Marker to use for thematic breaks / horizontal rules (`'-'`, `'*'`, or `'_'`,
default: `'*'`).

###### `options.ruleRepetition`

Number of markers to use for thematic breaks / horizontal rules (`number`,
default: `3`).  Should be `3` or more.

###### `options.ruleSpaces`

Whether to pad thematic break (horizontal rule) markers with spaces (`boolean`,
default `true`).

###### `options.strong`

Marker to use for importance (`'_'` or `'*'`, default `'*'`).

###### `options.emphasis`

Marker to use for emphasis (`'_'` or `'*'`, default `'_'`).

### `stringify.Compiler`

Access to the raw [compiler][], if you need it.

## Extending the Compiler

If this plugin is used, it adds a [`Compiler`][compiler] constructor
to the `processor`.  Other plugins can change and add visitors on
the compiler’s prototype to change how markdown is stringified.

The below plugin modifies a [visitor][] to add an extra blank line
before level two headings.

```js
module.exports = gap;

function gap() {
  var Compiler = this.Compiler;
  var visitors = Compiler.prototype.visitors;
  var original = visitors.heading;

  visitors.heading = function heading(node) {
    return (node.depth === 2 ? '\n' : '') + original.apply(this, arguments);
  }
}
```

### `Compiler#visitors`

An object mapping [node][] types to [`visitor`][visitor]s.

### `function visitor(node[, parent])`

Stringify `node`.

###### Parameters

*   `node` ([`Node`][node]) — Node to compile
*   `parent` ([`Node`][node], optional) — Parent of `node`

###### Returns

`string`, the compiled given `node`.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark.svg

[build-status]: https://travis-ci.org/remarkjs/remark

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark.svg

[coverage-status]: https://codecov.io/github/remarkjs/remark

[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg

[chat]: https://gitter.im/remarkjs/Lobby

[license]: https://github.com/remarkjs/remark/blob/master/LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[processor]: https://github.com/remarkjs/remark

[data]: https://github.com/unifiedjs/unified#processordatakey-value

[compiler]: https://github.com/unifiedjs/unified#processorcompiler

[mdast]: https://github.com/syntax-tree/mdast

[node]: https://github.com/syntax-tree/unist#node

[extend]: #extending-the-compiler

[visitor]: #function-visitornode-parent

[markdown-table]: https://github.com/wooorm/markdown-table

[string-length]: https://github.com/wooorm/markdown-table#stringlengthcell
