# markdown-escapes

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

List of escapable characters in markdown.

## Installation

[npm][]:

```bash
npm install markdown-escapes
```

## Usage

```javascript
var escapes = require('markdown-escapes');

// Access by property:
escapes.commonmark; //=> ['\\', '`', ..., '@', '^']

// Access by options object:
escapes({gfm: true}); //=> ['\\', '`', ..., '~', '|']
```

## API

### `escapes([options])`

Get escapes.  Supports `options.commonmark` and `options.gfm`, which
when `true` returns the extra escape characters supported by those
flavours.

###### Returns

`Array.<string>`.

### `escapes.default`

List of default escapable characters.

### `escapes.gfm`

List of escapable characters in GFM (which includes all `default`s).

### `escapes.commonmark`

List of escapable characters in CommonMark (which includes all `gfm`s).

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/markdown-escapes.svg

[build]: https://travis-ci.org/wooorm/markdown-escapes

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/markdown-escapes.svg

[coverage]: https://codecov.io/github/wooorm/markdown-escapes

[downloads-badge]: https://img.shields.io/npm/dm/markdown-escapes.svg

[downloads]: https://www.npmjs.com/package/markdown-escapes

[size-badge]: https://img.shields.io/bundlephobia/minzip/markdown-escapes.svg

[size]: https://bundlephobia.com/result?p=markdown-escapes

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com
