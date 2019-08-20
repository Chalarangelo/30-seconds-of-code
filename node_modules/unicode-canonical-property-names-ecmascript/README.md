# unicode-canonical-property-names-ecmascript [![Build status](https://travis-ci.org/mathiasbynens/unicode-canonical-property-names-ecmascript.svg?branch=master)](https://travis-ci.org/mathiasbynens/unicode-canonical-property-names-ecmascript)

_unicode-canonical-property-names-ecmascript_ exports the set of canonical Unicode property names that are supported in [ECMAScript RegExp property escapes](https://github.com/tc39/proposal-regexp-unicode-property-escapes).

## Installation

To use _unicode-canonical-property-names-ecmascript_, install it as a dependency via [npm](https://www.npmjs.com/):

```bash
$ npm install unicode-canonical-property-names-ecmascript
```

Then, `require` it:

```js
const properties = require('unicode-canonical-property-names-ecmascript');
```

## Example

```js
properties.has('ID_Start');
// → true
properties.has('IDS');
// → false
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_unicode-canonical-property-names-ecmascript_ is available under the [MIT](https://mths.be/mit) license.
