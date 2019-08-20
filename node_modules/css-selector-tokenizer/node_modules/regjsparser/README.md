# RegJSParser

Parsing the JavaScript's RegExp in JavaScript.

## Installation

```bash
npm install regjsparser
```

## Usage

```js
var parse = require('regjsparser').parse;

var parseTree = parse('^a'); // /^a/
console.log(parseTree);
```

## Testing

To run the tests, run the following command:

```bash
npm test
```

To create a new reference file, execute…

```bash
node test/update-fixtures.js
```

…from the repo top directory.
