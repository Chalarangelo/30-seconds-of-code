# hast-util-from-parse5 [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Transform [HAST][] to [Parse5’s AST][ast].

## Installation

[npm][]:

```bash
npm install hast-util-from-parse5
```

## Usage

Say we have the following file, `example.html`:

```html
<!doctype html><title>Hello!</title><h1 id="world">World!<!--after-->
```

And our script, `example.js`, looks as follows:

```javascript
var vfile = require('to-vfile')
var parse5 = require('parse5')
var inspect = require('unist-util-inspect')
var fromParse5 = require('hast-util-from-parse5')

var doc = vfile.readSync('example.html')
var ast = parse5.parse(String(doc), {sourceCodeLocationInfo: true})
var hast = fromParse5(ast, doc)

console.log(inspect(hast))
```

Now, running `node example` yields:

```text
root[2] (1:1-2:1, 0-70) [data={"quirksMode":false}]
├─ doctype (1:1-1:16, 0-15) [name="html"]
└─ element[2] [tagName="html"]
   ├─ element[1] [tagName="head"]
   │  └─ element[1] (1:16-1:37, 15-36) [tagName="title"]
   │     └─ text: "Hello!" (1:23-1:29, 22-28)
   └─ element[1] [tagName="body"]
      └─ element[3] (1:37-2:1, 36-70) [tagName="h1"][properties={"id":"world"}]
         ├─ text: "World!" (1:52-1:58, 51-57)
         ├─ comment: "after" (1:58-1:70, 57-69)
         └─ text: "\n" (1:70-2:1, 69-70)
```

## API

### `fromParse5(ast[, options])`

Transform an `ASTNode` to a [HAST Node][node].

##### `options`

If `options` is a [VFile][], it’s treated as `{file: options}`.

###### `options.space`

Whether the root of the given tree is in the `'html'` or `'svg'` space (enum,
`'svg'` or `'html'`, default: `'html'`).

If an element in with the SVG namespace is found in `ast`, `fromParse5`
automatically switches to the SVG space when entering the element, and
switches back when leaving.

###### `options.file`

[Virtual file][vfile], used to add positional information to HAST nodes.
If given, the file should have the original HTML source as its contents.

###### `options.verbose`

Whether to add positional information about starting tags, closing tags,
and attributes to elements (`boolean`, default: `false`).  Note: not used
without `file`.

For the following HTML:

```html
<img src="http://example.com/fav.ico" alt="foo" title="bar">
```

The verbose info would looks as follows:

```js
{
  type: 'element',
  tagName: 'img',
  properties: {
    src: 'http://example.com/fav.ico',
    alt: 'foo',
    title: 'bar'
  },
  children: [],
  data: {
    position: {
      opening: {
        start: {line: 1, column: 1, offset: 0},
        end: {line: 1, column: 61, offset: 60}
      },
      closing: null,
      properties: {
        src: {
          start: {line: 1, column: 6, offset: 5},
          end: {line: 1, column: 38, offset: 37}
        },
        alt: {
          start: {line: 1, column: 39, offset: 38},
          end: {line: 1, column: 48, offset: 47}
        },
        title: {
          start: {line: 1, column: 49, offset: 48},
          end: {line: 1, column: 60, offset: 59}
        }
      }
    }
  },
  position: {
    start: {line: 1, column: 1, offset: 0},
    end: {line: 1, column: 61, offset: 60}
  }
}
```

## Contribute

See [`contributing.md` in `syntax-tree/hast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/hast-util-from-parse5.svg

[travis]: https://travis-ci.org/syntax-tree/hast-util-from-parse5

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-from-parse5.svg

[codecov]: https://codecov.io/github/syntax-tree/hast-util-from-parse5

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[ast]: https://github.com/inikulin/parse5/wiki/Documentation

[node]: https://github.com/syntax-tree/hast#ast

[vfile]: https://github.com/vfile/vfile

[contributing]: https://github.com/syntax-tree/hast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/hast/blob/master/code-of-conduct.md
