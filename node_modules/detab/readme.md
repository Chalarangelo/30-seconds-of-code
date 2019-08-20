# detab

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Detab: tabs → spaces.

## Installation

[npm][]:

```bash
npm install detab
```

## Usage

```javascript
var detab = require('detab')

console.log(detab('\tfoo\nbar\tbaz'))
console.log(detab('\tfoo\nbar\tbaz', 2))
console.log(detab('\tfoo\nbar\tbaz', 8))
```

Yields:

```text
    foo
bar baz
```

```text
  foo
bar baz
```

```text
        foo
bar     baz
```

## API

### `detab(value[, size=4])`

Replace tabs with spaces in `value` (`string`), being smart about which
column the tab is at and which `size` (`number`, default: `4`) should be used.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/detab.svg

[build]: https://travis-ci.org/wooorm/detab

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/detab.svg

[coverage]: https://codecov.io/github/wooorm/detab

[downloads-badge]: https://img.shields.io/npm/dm/detab.svg

[downloads]: https://www.npmjs.com/package/detab

[size-badge]: https://img.shields.io/bundlephobia/minzip/detab.svg

[size]: https://bundlephobia.com/result?p=detab

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com
