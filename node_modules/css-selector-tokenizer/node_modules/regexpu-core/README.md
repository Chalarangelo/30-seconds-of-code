# regexpu-core [![Build status](https://travis-ci.org/mathiasbynens/regexpu-core.svg?branch=master)](https://travis-ci.org/mathiasbynens/regexpu-core) [![Code coverage status](http://img.shields.io/coveralls/mathiasbynens/regexpu-core/master.svg)](https://coveralls.io/r/mathiasbynens/regexpu-core) [![Dependency status](https://gemnasium.com/mathiasbynens/regexpu-core.svg)](https://gemnasium.com/mathiasbynens/regexpu-core)

_regexpu_ is a source code transpiler that enables the use of ES6 Unicode regular expressions in JavaScript-of-today (ES5).

_regexpu-core_ contains _regexpu_’s core functionality, i.e. `rewritePattern(pattern, flag)`, which enables rewriting regular expressions that make use of [the ES6 `u` flag](https://mathiasbynens.be/notes/es6-unicode-regex) into equivalent ES5-compatible regular expression patterns.

## Installation

To use _regexpu-core_ programmatically, install it as a dependency via [npm](https://www.npmjs.com/):

```bash
npm install regexpu-core --save-dev
```

Then, `require` it:

```js
const rewritePattern = require('regexpu-core');
```

## API

This module exports a single function named `rewritePattern`.

### `rewritePattern(pattern, flags)`

This function takes a string that represents a regular expression pattern as well as a string representing its flags, and returns an ES5-compatible version of the pattern.

```js
rewritePattern('foo.bar', 'u');
// → 'foo(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uDC00-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF])bar'

rewritePattern('[\\u{1D306}-\\u{1D308}a-z]', 'u');
// → '(?:[a-z]|\\uD834[\\uDF06-\\uDF08])'

rewritePattern('[\\u{1D306}-\\u{1D308}a-z]', 'ui');
// → '(?:[a-z\\u017F\\u212A]|\\uD834[\\uDF06-\\uDF08])'
```

_regexpu-core_ can rewrite non-ES6 regular expressions too, which is useful to demonstrate how their behavior changes once the `u` and `i` flags are added:

```js
// In ES5, the dot operator only matches BMP symbols:
rewritePattern('foo.bar');
// → 'foo(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uFFFF])bar'

// But with the ES6 `u` flag, it matches astral symbols too:
rewritePattern('foo.bar', 'u');
// → 'foo(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uDC00-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF])bar'
```

`rewritePattern` uses [regjsgen](https://github.com/d10/regjsgen), [regjsparser](https://github.com/jviereck/regjsparser), and [regenerate](https://github.com/mathiasbynens/regenerate) as internal dependencies.

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_regexpu-core_ is available under the [MIT](https://mths.be/mit) license.
