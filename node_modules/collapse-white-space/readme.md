# collapse-white-space

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Replace multiple white-space characters with a single space.

## Installation

[npm][npm-install]:

```bash
npm install collapse-white-space
```

## Usage

```javascript
var collapse = require('collapse-white-space')

collapse('\tfoo \n\tbar  \t\r\nbaz') //=> ' foo bar baz'
```

## API

### `collapse(value)`

Replace multiple white-space characters in value with a single space.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/collapse-white-space.svg

[build]: https://travis-ci.org/wooorm/collapse-white-space

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/collapse-white-space.svg

[coverage]: https://codecov.io/github/wooorm/collapse-white-space

[downloads-badge]: https://img.shields.io/npm/dm/collapse-white-space.svg

[downloads]: https://www.npmjs.com/package/collapse-white-space

[size-badge]: https://img.shields.io/bundlephobia/minzip/collapse-white-space.svg

[size]: https://bundlephobia.com/result?p=collapse-white-space

[npm-install]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com
