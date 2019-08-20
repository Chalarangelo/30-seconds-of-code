# hast-util-to-html [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Transform [HAST][] to HTML.

## Installation

[npm][]:

```bash
npm install hast-util-to-html
```

## Usage

```javascript
var h = require('hastscript')
var toHTML = require('hast-util-to-html')

var tree = h('.alpha', [
  'bravo ',
  h('b', 'charlie'),
  ' delta ',
  h('a.echo', {download: true}, 'foxtrot')
])

console.log(toHTML(tree))
```

Yields:

```html
<div class="alpha">bravo <b>charlie</b> delta <a class="echo" download>foxtrot</a></div>
```

## API

### `toHTML(tree[, options])`

Stringify the given [HAST tree][hast].

###### `options.space`

Whether the root of the given tree is in the `'html'` or `'svg'` space (enum,
`'svg'` or `'html'`, default: `'html'`).

If an `svg` element is found in the HTML space, `toHTML` automatically switches
to the SVG space when entering the element, and switches back when leaving.

###### `options.entities`

Configuration for [`stringify-entities`][stringify-entities]
(`Object`, default: `{}`).  Do not use `escapeOnly`, `attribute`, or
`subset` (`toHTML` already passes those).  However, `useNamedReferences`,
`useShortestReferences`, and `omitOptionalSemicolons` are all fine.

###### `options.voids`

Tag-names of elements to stringify without closing tag (`Array.<string>`,
default: [`html-void-elements`][html-void-elements]).

Not used in the SVG space.

###### `options.quote`

Preferred quote to use (`'"'` or `'\''`, default: `'"'`).

###### `options.quoteSmart`

Use the other quote if that results in less bytes (`boolean`, default:
`false`).

###### `options.preferUnquoted`

Leave attributes unquoted if that results in less bytes (`boolean`,
default: `false`).

Not used in the SVG space.

###### `options.omitOptionalTags`

Omit optional opening and closing tags (`boolean`, default: `false`).
For example, in `<ol><li>one</li><li>two</li></ol>`, both `</li>`
closing tags can be omitted.  The first because it’s followed by
another `li`, the last because it’s followed by nothing.

Not used in the SVG space.

###### `options.collapseEmptyAttributes`

Collapse empty attributes: `class=""` is stringified as `class` instead
(`boolean`, default: `false`).  **Note**: boolean attributes, such as
`hidden`, are always collapsed.

Not used in the SVG space.

###### `options.closeSelfClosing`

Close self-closing nodes with an extra slash (`/`): `<img />` instead of
`<img>` (`boolean`, default: `false`).

Not used in the SVG space.

###### `options.closeEmptyElements`

Close SVG elements without any content with slash (`/`) on the opening tag
instead of an end tag: `<circle />` instead of `<circle></circle>` (`boolean`,
default: `false`).

Not used in the HTML space.

###### `options.tightSelfClosing`

Do not use an extra space when closing self-closing elements: `<img/>`
instead of `<img />` (`boolean`, default: `false`).  **Note**: Only used
if `closeSelfClosing: true` or `closeEmptyElements: true`.

###### `options.tightCommaSeparatedLists`

Join known comma-separated attribute values with just a comma (`,`),
instead of padding them on the right as well (`,·`, where `·` represents a
space) (`boolean`, default: `false`).

###### `options.tightAttributes`

Join attributes together, without white-space, if possible:
`class="a b" title="c d"` is stringified as `class="a b"title="c d"`
instead to save bytes (`boolean`, default: `false`).  **Note**: creates
invalid (but working) markup.

Not used in the SVG space.

###### `options.tightDoctype`

Drop unneeded spaces in doctypes: `<!doctypehtml>` instead of `<!doctype html>`
to save bytes (`boolean`, default: `false`).  **Note**: creates
invalid (but working) markup.

###### `options.allowParseErrors`

Do not encode characters which trigger parse errors (even though they
work), to save bytes (`boolean`, default: `false`).  **Note**: creates
invalid (but working) markup.

Not used in the SVG space.

###### `options.allowDangerousCharacters`

Do not encode some characters which cause XSS vulnerabilities in older
browsers (`boolean`, default: `false`).  **Note**: Only set this if you
completely trust the content.

###### `options.allowDangerousHTML`

Allow `raw` nodes and insert them as raw HTML.  When falsey, encodes
`raw` nodes (`boolean`, default: `false`).  **Note**: Only set this if
you completely trust the content.

## Related

*   [`hast-util-sanitize`][hast-util-sanitize]
    — Sanitize HAST nodes
*   [`rehype-stringify`](https://github.com/wooorm/rehype/tree/master/packages/rehype-stringify)
    — Wrapper around this project for [**rehype**](https://github.com/wooorm/rehype)

## Contribute

See [`contributing.md` in `syntax-tree/hast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/hast-util-to-html.svg

[travis]: https://travis-ci.org/syntax-tree/hast-util-to-html

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-to-html.svg

[codecov]: https://codecov.io/github/syntax-tree/hast-util-to-html

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[html-void-elements]: https://github.com/wooorm/html-void-elements

[stringify-entities]: https://github.com/wooorm/stringify-entities

[hast-util-sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[contributing]: https://github.com/syntax-tree/hast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/hast/blob/master/code-of-conduct.md
