[![npm](https://nodei.co/npm/unist-util-select.png)](https://npmjs.com/package/unist-util-select)

# unist-util-select

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Select [Unist] nodes with CSS-like selectors.

[unist]: https://github.com/wooorm/unist

[travis]: https://travis-ci.org/eush77/unist-util-select
[travis-badge]: https://travis-ci.org/eush77/unist-util-select.svg?branch=master
[david]: https://david-dm.org/eush77/unist-util-select
[david-badge]: https://david-dm.org/eush77/unist-util-select.png

## Example

`example.md`:

```
Get all TODO items from this list:

1. Step 1.
2. TODO Step 2.
3. Step 3.
  1. TODO Step 3.1.
  2. Step 3.2.
  3. TODO Step 3.3.
```

[remark] takes this Markdown as an input and returns unist syntax tree. After that, we use `unist-util-select` to extract the required parts:

```js
var select = require('unist-util-select');

var markdown = fs.readFileSync('example.md', 'utf8');
var ast = remark.parse(markdown);

select(ast, 'list text[value*=TODO]')
//=> [ { type: 'text', value: 'TODO Step 2.' },
//     { type: 'text', value: 'TODO Step 3.1.' },
//     { type: 'text', value: 'TODO Step 3.3.' } ]
```

That's it!

[remark]: https://github.com/wooorm/remark

## Features

All the relevant parts of [Selectors Level 3][spec]:

[spec]: http://www.w3.org/TR/css3-selectors/

- [x] Type selectors: `paragraph`
- [x] Descendant selectors: `paragraph text`
- [x] Child selectors: `paragraph > text`
- [x] Sibling selectors: `paragraph ~ text`
- [x] Adjacent sibling selectors: `paragraph + text`
- [x] Group selectors: `paragraph, text`
- [x] Universal selector: `*`
- [x] Attribute selectors: `text[value*="substr"]`
  - [x] Existence: `[value]`
  - [x] Equality: `[value="foo"]`
  - [x] Begins with: `[value^="prefix"]`
  - [x] Containment: `[value*="substr"]`
  - [x] Ends with: `[value$="suffix"]`
- [x] Structural pseudo-classes: `paragraph:first-of-type`
  - [x] `:root`
  - [x] `:nth-child(2n+1)`
  - [x] `:nth-last-child(2n+1)`
  - [x] `:nth-of-type(2n+1)`
  - [x] `:nth-last-of-type(2n+1)`
  - [x] `:first-child`
  - [x] `:last-child`
  - [x] `:first-of-type`
  - [x] `:last-of-type`
  - [x] `:only-child`
  - [x] `:only-of-type`
  - [x] `:empty`
- [x] Negation pseudo-class: `*:not(paragraph)`

## API

### `select(ast, selector)`

*Curried form: `select(ast)(selector)`*

Applies `selector` to `ast`, returns array of matching nodes.

### `select.one(ast, selector)`

*Curried form: `select.one(ast)(selector)`*

Returns a single node matching `selector`.

Throws an error if node is not found or not unique.

## Install

```
npm install unist-util-select
```

## License

MIT
