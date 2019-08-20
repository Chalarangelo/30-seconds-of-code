# mdast-util-toc [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status]

Generate a Table of Contents from a [**mdast**][mdast] tree.

## Installation

[npm][]:

```bash
npm install mdast-util-toc
```

**mdast-util-toc** is also available as an AMD, CommonJS, and globals
module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var remark = require('remark');
var toc = require('mdast-util-toc');
```

Parse:

```javascript
var node = remark().parse([
    '# Alpha',
    '',
    '## Bravo',
    '',
    '### Charlie',
    '',
    '## Delta',
    ''
].join('\n'));
```

TOC:

```javascript
var result = toc(node);
```

Yields:

```js
{ index: null,
  endIndex: null,
  map: 
   { type: 'list',
     ordered: false,
     children: [ { type: 'listItem', loose: true, children: [Object] } ] } }
```

## API

### `toc(node[, options])`

Generate a Table of Contents from a Markdown document.

*   If specified, looks for the first heading containing the `heading`
    option (case insensitive, supports alt/title attributes for links
    and images too), and returns a table of contents for all following
    headings.

*   If no `heading` is specified, creates a table of contents for all
    headings in `node`.

Links to headings are based on GitHub’s style.  Only top-level headings
(those not in blockquotes or lists), are used.  The given node is not
modified.

#### `options`

*   `heading` (`string?`)
    — Heading to look for, wrapped in `new RegExp('^(' + value + ')$', 'i');`

*   `maxDepth` (`number?`, default: `6`)
    — Maximum heading depth to include in the table of contents,
    This is inclusive, thus, when set to `3`, level three headings,
    are included (those with three hashes, `###`);

*   `tight` (`boolean?`, default: `false`)
    — Whether to compile list-items tightly.

#### Returns

An object with the following properties:

*   `index` (`number?`)
    — Position of the `heading` in `node`.  `-1` if no heading
    was found, `null` if no heading was given;

*   `endIndex` (`number?`)
    — Position of the last node after `heading` before the TOC starts.
    `-1` if no heading was found, `null` if no heading was given,
    same as `index` if there are no nodes between `heading` and the
    first heading in the TOC;

*   `map` (`Node?`)
    — List node representing the generated table of contents.
    `null` if no table of contents could be created, either because
    no `heading` didn’t exist, or no following headings were found.

## License

[MIT][license] © [Jonathan Haines][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/BarryThePenguin/mdast-util-toc.svg

[build-status]: https://travis-ci.org/BarryThePenguin/mdast-util-toc

[coverage-badge]: https://img.shields.io/codecov/c/github/BarryThePenguin/mdast-util-toc.svg

[coverage-status]: https://codecov.io/github/BarryThePenguin/mdast-util-toc

[releases]: https://github.com/BarryThePenguin/mdast-util-toc/releases

[license]: LICENSE

[author]: http://barrythepenguin.github.io

[npm]: https://docs.npmjs.com/cli/install

[mdast]: https://github.com/wooorm/mdast
