# regjsgen [![Build status](https://travis-ci.org/bnjmnt4n/regjsgen.svg?branch=master)](https://travis-ci.org/bnjmnt4n/regjsgen) [![Code coverage status](https://codecov.io/gh/bnjmnt4n/regjsgen/branch/master/graph/badge.svg)](https://codecov.io/gh/bnjmnt4n/regjsgen)

Generate regular expressions from [regjsparser](https://github.com/jviereck/regjsparser)’s AST.

## Installation

```bash
npm install --save regjsgen
```

## API

### `regjsgen.generate(ast)`

This function accepts an abstract syntax tree representing a regular expression, and returns the generated regular expression string.

```js
var regjsparser = require('regjsparser');
var regjsgen = require('regjsgen');

// Generate an AST with `regjsparser`.
var ast = regjsparser.parse(regex);

// Modify AST
// …

// Generate `RegExp` string with `regjsgen`.
regex = regjsgen.generate(ast);
```

## Support

Tested in Node.js 0.10, 0.12, 4, 6 and 8.
