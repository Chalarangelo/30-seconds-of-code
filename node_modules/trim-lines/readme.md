# trim-lines

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Remove spaces and tabs around line-breaks.

## Installation

[npm][]:

```bash
npm install trim-lines
```

## Usage

```js
var trimLines = require('trim-lines')

trimLines(' foo\t\n\n bar \n\tbaz ') // => ' foo\nbar\nbaz '
```

## API

### `trimLines(value)`

Remove initial and final spaces and tabs at the line breaks in `value`
(`string`).  Does not trim initial and final spaces and tabs of the value
itself.  Returns the trimmed value.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/trim-lines.svg

[build]: https://travis-ci.org/wooorm/trim-lines

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/trim-lines.svg

[coverage]: https://codecov.io/github/wooorm/trim-lines

[downloads-badge]: https://img.shields.io/npm/dm/trim-lines.svg

[downloads]: https://www.npmjs.com/package/trim-lines

[size-badge]: https://img.shields.io/bundlephobia/minzip/trim-lines.svg

[size]: https://bundlephobia.com/result?p=trim-lines

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com
