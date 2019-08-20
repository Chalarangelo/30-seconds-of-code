# regexpu-core [![Build status](https://travis-ci.org/mathiasbynens/regexpu-core.svg?branch=master)](https://travis-ci.org/mathiasbynens/regexpu-core) [![Code coverage status](https://img.shields.io/codecov/c/github/mathiasbynens/regexpu-core.svg)](https://codecov.io/gh/mathiasbynens/regexpu-core)

_regexpu_ is a source code transpiler that enables the use of ES6 Unicode regular expressions in JavaScript-of-today (ES5).

_regexpu-core_ contains _regexpu_’s core functionality, i.e. `rewritePattern(pattern, flag)`, which enables rewriting regular expressions that make use of [the ES6 `u` flag](https://mathiasbynens.be/notes/es6-unicode-regex) into equivalent ES5-compatible regular expression patterns.

## Installation

To use _regexpu-core_ programmatically, install it as a dependency via [npm](https://www.npmjs.com/):

```bash
npm install regexpu-core --save
```

Then, `require` it:

```js
const rewritePattern = require('regexpu-core');
```

## API

This module exports a single function named `rewritePattern`.

### `rewritePattern(pattern, flags, options)`

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

The optional `options` argument recognizes the following properties:

#### `dotAllFlag` (default: `false`)

Setting this option to `true` enables support for [the `s` (`dotAll`) flag](https://github.com/mathiasbynens/es-regexp-dotall-flag).

```js
rewritePattern('.');
// → '[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uFFFF]'

rewritePattern('.', '', {
  'dotAllFlag': true
});
// → '[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uFFFF]'

rewritePattern('.', 's', {
  'dotAllFlag': true
});
// → '[\\0-\\uFFFF]'

rewritePattern('.', 'su', {
  'dotAllFlag': true
});
// → '(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])'
```

#### `unicodePropertyEscape` (default: `false`)

Setting this option to `true` enables [support for Unicode property escapes](property-escapes.md):

```js
rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
  'unicodePropertyEscape': true
});
// → '(?:\\uD811[\\uDC00-\\uDE46])'
```

#### `lookbehind` (default: `false`)

Setting this option to `true` enables support for [lookbehind assertions](https://github.com/tc39/proposal-regexp-lookbehind).

```js
rewritePattern('(?<=.)a', '', {
  'lookbehind': true
});
// → '(?<=[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uFFFF])a'
```

#### `namedGroup` (default: `false`)

Setting this option to `true` enables support for [named capture groups](https://github.com/tc39/proposal-regexp-named-groups).

```js
rewritePattern('(?<name>.)\k<name>', '', {
  'namedGroups': true
});
// → '(.)\1'
```

#### `onNamedGroup`

This option is a function that gets called when a named capture group is found. It receives two parameters:
the name of the group, and its index.

```js
rewritePattern('(?<name>.)\k<name>', '', {
  'namedGroups': true,
  onNamedGroup(name, index) {
    console.log(name, index);
    // → 'name', 1
  }
});
```

#### `useUnicodeFlag` (default: `false`)

Setting this option to `true` enables the use of Unicode code point escapes of the form `\u{…}`. Note that in regular expressions, such escape sequences only work correctly when the ES6 `u` flag is set. Enabling this setting often results in more compact output, although there are cases (such as `\p{Lu}`) where it actually _increases_ the output size.

```js
rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
  'unicodePropertyEscape': true,
  'useUnicodeFlag': true
});
// → '[\\u{14400}-\\u{14646}]'
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_regexpu-core_ is available under the [MIT](https://mths.be/mit) license.
