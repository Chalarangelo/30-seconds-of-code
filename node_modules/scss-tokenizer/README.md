# scss-tokenizer
A tokenzier for Sass' SCSS syntax

![https://travis-ci.org/sasstools/scss-tokenizer.svg?branch=master](https://img.shields.io/travis/sasstools/scss-tokenizer.svg)
![https://www.npmjs.com/package/scss-tokenizer](https://img.shields.io/npm/v/scss-tokenizer.svg)
![https://github.com/sasstools/scss-tokenizer/issues](https://img.shields.io/github/issues/sasstools/scss-tokenizer.svg)
![](https://img.shields.io/github/license/sasstools/scss-tokenizer.svg)

# Install

```
npm install scss-tokenizer
```

# Usage

```js
var scss = require('scss-tokenizer');
scss.tokenize(css);
```

# API

### `tokenize`

Tokenizes source `css` and returns an ordered array of tokens with positional
data.

```js
var tokenizer = require('scss-tokenizer');
var tokens = tokenize.tokenize(css);
```

Arguments:

* `css (string|#toString)`: String with input CSS or any object
  with `toString()` method, like file stream.
* `opts (object) optional`: options:
  * `from`: the path to the source CSS file. You should always set `from`,
    because it is used in map generation and in syntax error messages.

# Test

```
npm test
```

## Attribution

This project started as a fork of the [PostCSS](https://github.com/postcss/postcss) tokenizer.
