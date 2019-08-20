# unicode-match-property-value-ecmascript [![Build status](https://travis-ci.org/mathiasbynens/unicode-match-property-value-ecmascript.svg?branch=master)](https://travis-ci.org/mathiasbynens/unicode-match-property-value-ecmascript)

_unicode-match-property-value-ecmascript_ matches a given Unicode property value or [property value alias](https://github.com/mathiasbynens/unicode-property-value-aliases) to its canonical property value without applying [loose matching](https://github.com/mathiasbynens/unicode-loose-match), per the algorithm used for [RegExp Unicode property escapes in ECMAScript](https://github.com/tc39/proposal-regexp-unicode-property-escapes). Consider it a strict alternative to loose matching.

## Installation

To use _unicode-match-property-value-ecmascript_ programmatically, install it as a dependency via [npm](https://www.npmjs.com/):

```bash
$ npm install unicode-match-property-value-ecmascript
```

Then, `require` it:

```js
const matchPropertyValue = require('unicode-match-property-value-ecmascript');
```

## API

This module exports a single function named `matchPropertyValue`.

### `matchPropertyValue(property, value)`

This function takes a string `property` that is a canonical/unaliased Unicode property name, and a string `value`. It attemps to  match `value` to a canonical Unicode property value for the given property. If there’s a match, it returns the canonical property value. Otherwise, it throws an exception.

```js
// Find the canonical property value:
matchPropertyValue('Script_Extensions', 'Aghb')
// → 'Caucasian_Albanian'

matchPropertyValue('Script_Extensions', 'Caucasian_Albanian')
// → 'Caucasian_Albanian'

matchPropertyValue('script_extensions', 'Caucasian_Albanian') // Note: incorrect casing.
// → throws

matchPropertyValue('Script_Extensions', 'caucasian_albanian') // Note: incorrect casing.
// → throws
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_unicode-match-property-value-ecmascript_ is available under the [MIT](https://mths.be/mit) license.
