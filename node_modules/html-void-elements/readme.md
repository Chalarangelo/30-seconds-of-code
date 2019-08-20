# html-void-elements

[![Build][build-badge]][build]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

List of known void HTML elements.  Includes ancient (for example,
`nextid` and `basefont`) and modern (for example, `img` and
`meta`) tag-names from both W3C and WHATWG.

**Note**: there’s one special case: `menuitem`.  W3C specifies it to be
void, but WHATWG doesn’t.  I suggest using the void form.

## Installation

[npm][]:

```bash
npm install html-void-elements
```

## Usage

```javascript
var htmlVoidElements = require('html-void-elements')

console.log(htmlVoidElements)
```

Yields:

```js
[ 'area',
  'base',
  'basefont',
  'bgsound',
  'br',
  'col',
  'command',
  'embed',
  'frame',
  'hr',
  'image',
  'img',
  'input',
  'isindex',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'nextid',
  'param',
  'source',
  'track',
  'wbr' ]
```

## API

### `htmlVoidElements`

`Array.<string>` — List of lower-case tag-names.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/wooorm/html-void-elements.svg

[build]: https://travis-ci.org/wooorm/html-void-elements

[downloads-badge]: https://img.shields.io/npm/dm/html-void-elements.svg

[downloads]: https://www.npmjs.com/package/html-void-elements

[size-badge]: https://img.shields.io/bundlephobia/minzip/html-void-elements.svg

[size]: https://bundlephobia.com/result?p=html-void-elements

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com
