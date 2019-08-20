# trim-trailing-lines

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Remove final newline characters from a string.

## Installation

[npm][]:

```bash
npm install trim-trailing-lines
```

## Usage

```js
var trimTrailingLines = require('trim-trailing-lines')

trimTrailingLines('foo\nbar') // => 'foo\nbar'
trimTrailingLines('foo\nbar\n') // => 'foo\nbar'
trimTrailingLines('foo\nbar\n\n') // => 'foo\nbar'
```

## API

### `trimTrailingLines(value)`

Remove final newline characters from `value`.

###### Parameters

*   `value` (`string`) — Value with trailing newlines, coerced to string.

###### Returns

`string` — Value without trailing newlines.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/trim-trailing-lines.svg

[build]: https://travis-ci.org/wooorm/trim-trailing-lines

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/trim-trailing-lines.svg

[coverage]: https://codecov.io/github/wooorm/trim-trailing-lines

[downloads-badge]: https://img.shields.io/npm/dm/trim-trailing-lines.svg

[downloads]: https://www.npmjs.com/package/trim-trailing-lines

[size-badge]: https://img.shields.io/bundlephobia/minzip/trim-trailing-lines.svg

[size]: https://bundlephobia.com/result?p=trim-trailing-lines

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com
