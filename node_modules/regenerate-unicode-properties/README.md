# regenerate-unicode-properties [![Build status](https://travis-ci.org/mathiasbynens/regenerate-unicode-properties.svg?branch=master)](https://travis-ci.org/mathiasbynens/regenerate-unicode-properties)

_regenerate-unicode-properties_ is a collection of [Regenerate](https://github.com/mathiasbynens/regenerate) sets for [various Unicode properties](https://github.com/tc39/proposal-regexp-unicode-property-escapes).

## Installation

To use _regenerate-unicode-properties_ programmatically, install it as a dependency via [npm](https://www.npmjs.com/):

```bash
$ npm install regenerate-unicode-properties
```

## Usage

To get a map of supported properties and their values:

```js
const properties = require('regenerate-unicode-properties');
```

To get a specific Regenerate set:

```js
// Examples:
const Lu = require('regenerate-unicode-properties/General_Category/Uppercase_Letter.js');
const Greek = require('regenerate-unicode-properties/Script_Extensions/Greek.js');
```

To get the Unicode version the data was based on:

```js
const unicodeVersion = require('regenerate-unicode-properties/unicode-version.js');
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_regenerate-unicode-properties_ is available under the [MIT](https://mths.be/mit) license.
