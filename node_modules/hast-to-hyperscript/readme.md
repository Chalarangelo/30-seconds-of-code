# hast-to-hyperscript [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Transform [HAST][] to something else through a [hyperscript][] DSL.

## Installation

[npm][]:

```bash
npm install hast-to-hyperscript
```

## Usage

```javascript
var toH = require('hast-to-hyperscript')
var h = require('hyperscript')

var tree = {
  type: 'element',
  tagName: 'p',
  properties: {id: 'alpha', className: ['bravo']},
  children: [
    {type: 'text', value: 'charlie '},
    {
      type: 'element',
      tagName: 'strong',
      properties: {style: 'color: red;'},
      children: [{type: 'text', value: 'delta'}]
    },
    {type: 'text', value: ' echo.'}
  ]
}

// Transform (`hyperscript` needs `outerHTML` to stringify):
var doc = toH(h, tree).outerHTML

console.log(doc)
```

Yields:

```html
<p class="bravo" id="alpha">charlie <strong>delta</strong> echo.</p>
```

## API

### `toH(h, node[, options|prefix])`

Transform [HAST][] to something else through a [hyperscript][] DSL.

###### Parameters

*   `h` ([`Function`][h])
*   `node` ([`Element`][element])
*   `prefix` — Treated as `{prefix: prefix}`
*   `options.prefix` (`string` or `boolean`, optional)
    — Prefix to use as a prefix for keys passed in `attrs` to `h()`,
    this behaviour is turned off by passing `false`, turned on by passing
    a `string`.  By default, `h-` is used as a prefix if the given `h`
    is detected as being `virtual-dom/h` or `React.createElement`
*   `options.space` (enum, `'svg'` or `'html'`, default: `'html'`)
    — Whether `node` is in the `'html'` or `'svg'` space.
    If an `svg` element is found when inside the HTML space, `toH` automatically
    switches to the SVG space when entering the element, and switches back when
    leaving

###### Returns

`*` — Anything returned by invoking `h()`.

### `function h(name, attrs, children)`

Transform [HAST][] to something else through a hyperscript DSL.

###### Parameters

*   `name` (`string`) — Tag-name of element to create
*   `attrs` (`Object.<string>`) — Attributes to set
*   `children` (`Array.<* | string>`) — List of children and text,
    where children are the result of invoking `h()` previously

###### Returns

`*` — Anything.

###### Caveats

**Nodes**: Most hyperscript implementations only support elements and text (as
leave nodes).  HAST supports `doctype`, `comment`, and `root` as well.

*   If anything other than an `element` or `root` node is given,
    `hast-to-hyperscript` throws
*   If a `root` is given with one element child, that element is
    transformed
*   If a `root` with no children, a non-element only child, or more than one
    children, the children are wrapped in a `div` element

If unknown nodes are found deeper in the tree, they are ignored: only `text`
and `element` nodes are transformed.

**Support**: Although there are lots of libs mentioning support for this
interface, there are significant differences between them.  For example,
hyperscript doesn’t support classes in `attrs`, `virtual-dom/h` needs an
`attributes` object inside `attrs` most of the time.  `hast-to-hyperscript`
works around these differences for:

*   [`React.createElement`][react]
*   [`virtual-dom/h`][vdom]
*   [`hyperscript`][hyperscript]

## Related

*   [`hastscript`][hastscript]

## Contribute

See [`contributing.md` in `syntax-tree/hast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/hast-to-hyperscript.svg

[travis]: https://travis-ci.org/syntax-tree/hast-to-hyperscript

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-to-hyperscript.svg

[codecov]: https://codecov.io/github/syntax-tree/hast-to-hyperscript

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[element]: https://github.com/syntax-tree/hast#element

[vdom]: https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript

[hyperscript]: https://github.com/dominictarr/hyperscript

[h]: #function-hname-attrs-children

[react]: https://facebook.github.io/react/docs/glossary.html#react-elements

[hastscript]: https://github.com/syntax-tree/hastscript

[contributing]: https://github.com/syntax-tree/hast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/hast/blob/master/code-of-conduct.md
