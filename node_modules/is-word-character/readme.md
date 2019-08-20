# is-word-character

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Check if a character is a word character (`\w`, which equals
`[a-zA-Z0-9_]`).

## Installation

[npm][]:

```bash
npm install is-word-character
```

## Usage

```javascript
var wordCharacter = require('is-word-character')

wordCharacter('a') // => true
wordCharacter('Z') // => true
wordCharacter('0') // => true
wordCharacter('_') // => true
wordCharacter(' ') // => false
wordCharacter('💩') // => false
```

## API

### `wordCharacter(character|code)`

Check whether the given character code (`number`), or the character
code at the first position (`string`), is a word character.

## Related

*   [`is-alphabetical`](https://github.com/wooorm/is-alphabetical)
*   [`is-alphanumerical`](https://github.com/wooorm/is-alphanumerical)
*   [`is-decimal`](https://github.com/wooorm/is-decimal)
*   [`is-hexadecimal`](https://github.com/wooorm/is-hexadecimal)
*   [`is-whitespace-character`](https://github.com/wooorm/is-whitespace-character)

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/is-word-character.svg

[build]: https://travis-ci.org/wooorm/is-word-character

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/is-word-character.svg

[coverage]: https://codecov.io/github/wooorm/is-word-character

[downloads-badge]: https://img.shields.io/npm/dm/is-word-character.svg

[downloads]: https://www.npmjs.com/package/is-word-character

[size-badge]: https://img.shields.io/bundlephobia/minzip/is-word-character.svg

[size]: https://bundlephobia.com/result?p=is-word-character

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com
