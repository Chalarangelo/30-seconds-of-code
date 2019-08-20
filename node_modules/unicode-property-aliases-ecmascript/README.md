# unicode-property-aliases-ecmascript [![Build status](https://travis-ci.org/mathiasbynens/unicode-property-aliases-ecmascript.svg?branch=master)](https://travis-ci.org/mathiasbynens/unicode-property-aliases-ecmascript)

_unicode-property-aliases-ecmascript_ offers Unicode property alias mappings in an easy-to-consume JavaScript format. It only contains the Unicode property names that are supported in [ECMAScript RegExp property escapes](https://github.com/tc39/proposal-regexp-unicode-property-escapes).

It’s based on [the `PropertyAliases.txt` data for Unicode v12.0.0](http://unicode.org/Public/12.0.0/ucd/PropertyAliases.txt).

## Installation

To use _unicode-property-aliases-ecmascript_ programmatically, install it as a dependency via [npm](https://www.npmjs.com/):

```bash
$ npm install unicode-property-aliases-ecmascript
```

Then, `require` it:

```js
const propertyAliases = require('unicode-property-aliases-ecmascript');
```

## Usage

This module exports a `Map` object. The most common usage is to convert a property alias to its canonical form:

```js
propertyAliases.get('scx')
// → 'Script_Extensions'
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_unicode-property-aliases-ecmascript_ is available under the [MIT](https://mths.be/mit) license.
