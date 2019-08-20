# hastscript [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[Hyperscript][] (and [`virtual-hyperscript`][virtual-hyperscript])
compatible DSL for creating virtual [HAST][] trees in HTML and SVG.

## Installation

[npm][]:

```bash
npm install hastscript
```

## Usage

```javascript
var h = require('hastscript')
var s = require('hastscript/svg')

// Child nodes as an array
console.log(
  h('.foo#some-id', [
    h('span', 'some text'),
    h('input', {type: 'text', value: 'foo'}),
    h('a.alpha', {class: 'bravo charlie', download: 'download'}, [
      'delta',
      'echo'
    ])
  ])
)

// Child nodes as arguments
console.log(
  h(
    'form',
    {method: 'POST'},
    h('input', {type: 'text', name: 'foo'}),
    h('input', {type: 'text', name: 'bar'}),
    h('input', {type: 'submit', value: 'send'})
  )
)

console.log(
  s('svg', {xmlns: 'http://www.w3.org/2000/svg', viewbox: '0 0 500 500'}, [
    s('title', 'SVG `<circle>` element'),
    s('circle', {cx: 120, cy: 120, r: 100})
  ])
)
```

Yields:

```js
{ type: 'element',
  tagName: 'div',
  properties: { className: [ 'foo' ], id: 'some-id' },
  children:
   [ { type: 'element',
       tagName: 'span',
       properties: {},
       children: [ { type: 'text', value: 'some text' } ] },
     { type: 'element',
       tagName: 'input',
       properties: { type: 'text', value: 'foo' },
       children: [] },
     { type: 'element',
       tagName: 'a',
       properties: { className: [ 'alpha', 'bravo', 'charlie' ], download: true },
       children:
        [ { type: 'text', value: 'delta' },
          { type: 'text', value: 'echo' } ] } ] }
{ type: 'element',
  tagName: 'form',
  properties: { method: 'POST' },
  children:
   [ { type: 'element',
       tagName: 'input',
       properties: { type: 'text', name: 'foo' },
       children: [] },
     { type: 'element',
       tagName: 'input',
       properties: { type: 'text', name: 'bar' },
       children: [] },
     { type: 'element',
       tagName: 'input',
       properties: { type: 'submit', value: 'send' },
       children: [] } ] }
{ type: 'element',
  tagName: 'svg',
  properties: { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 500 500' },
  children:
   [ { type: 'element',
       tagName: 'title',
       properties: {},
       children: [ { type: 'text', value: 'SVG `<circle>` element' } ] },
     { type: 'element',
       tagName: 'circle',
       properties: { cx: 120, cy: 120, r: 100 },
       children: [] } ] }
```

## API

### `h(selector?[, properties][, ...children])`

### `s(selector?[, properties][, ...children])`

DSL to create virtual [HAST][] trees for HTML or SVG.

##### Parameters

###### `selector`

Simple CSS selector (`string`, optional).  Can contain a tag name (`foo`), IDs
(`#bar`), and classes (`.baz`).
If there is no tag name in the selector, `h` defaults to a `div` element,
and `s` to a `g` element.

###### `properties`

Map of properties (`Object.<*>`, optional).

###### `children`

(Lists of) child nodes (`string`, `Node`, `Array.<string|Node>`, optional).
When strings are encountered, they are normalised to [`text`][text] nodes.

##### Returns

[`Element`][element].

## Contribute

See [`contributing.md` in `syntax-tree/hast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/hastscript.svg

[travis]: https://travis-ci.org/syntax-tree/hastscript

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hastscript.svg

[codecov]: https://codecov.io/github/syntax-tree/hastscript

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[element]: https://github.com/syntax-tree/hast#element

[virtual-hyperscript]: https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript

[hyperscript]: https://github.com/dominictarr/hyperscript

[text]: https://github.com/syntax-tree/unist#text

[contributing]: https://github.com/syntax-tree/hast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/hast/blob/master/code-of-conduct.md
