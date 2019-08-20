# RegJSGen

Generate `RegExp`s from [RegJSParser](https://github.com/jviereck/regjsparser)’s AST.

## Installation

```bash
npm install --save regjsgen
```

## Usage

```js
var regjsgen = require('regjsgen');
// With `regjsparser`
var regjsparser = require('regjsparser');
var regex = '^a$';
var ast = regjsparser.parse(regex);
// Modify AST
// ...
// Regenerate `RegExp`
regex = regjsgen.generate(ast);
```

## See Also

 * [RegJSParser](https://github.com/jviereck/regjsparser)
 * [RegExp.js](https://github.com/jviereck/regexp.js)

## Testing

Run the command

```bash
npm test
```

To create a new reference file, execute

```bash
node test/update-fixture.js
```

from the repo top directory.

## Support

Tested in Node.js 0.8.26~0.10.30.

## Author

| [![twitter/demoneaux](http://gravatar.com/avatar/029b19dba521584d83398ada3ecf6131?s=70)](https://twitter.com/demoneaux "Follow @demoneaux on Twitter") |
|---|
| [Benjamin Tan](http://d10.github.io/) |

## Contributors

| [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](http://mathiasbynens.be/) |
