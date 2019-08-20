# indent-string [![Build Status](https://travis-ci.org/sindresorhus/indent-string.svg?branch=master)](https://travis-ci.org/sindresorhus/indent-string)

> Indent each line in a string


## Install

```
$ npm install --save indent-string
```


## Usage

```js
var indentString = require('indent-string');

indentString('Unicorns\nRainbows', '♥', 4);
//=> ♥♥♥♥Unicorns
//=> ♥♥♥♥Rainbows
```


## API

### indentString(string, indent, count)

#### string

**Required**  
Type: `string`

The string you want to indent.

#### indent

**Required**  
Type: `string`

The string to use for the indent.

#### count

Type: `number`  
Default: `1`

How many times you want `indent` repeated.


## Related

- [indent-string-cli](https://github.com/sindresorhus/indent-string-cli) - CLI for this module
- [strip-indent](https://github.com/sindresorhus/strip-indent) - Strip leading whitespace from every line in a string


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
