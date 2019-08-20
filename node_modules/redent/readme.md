# redent [![Build Status](https://travis-ci.org/sindresorhus/redent.svg?branch=master)](https://travis-ci.org/sindresorhus/redent)

> [Strip redundant indentation](https://github.com/sindresorhus/strip-indent) and [indent the string](https://github.com/sindresorhus/indent-string)


## Install

```
$ npm install --save redent
```


## Usage

```js
const redent = require('redent');

redent('\n  foo\n    bar\n', 1);
//=> '\n foo\n   bar\n'
```


## API

### redent(input, [count], [indent])

#### input

Type: `string`

#### count

Type: `number`  
Default: `0`

How many times you want `indent` repeated.

#### indent

Type: `string`  
Default: `' '`

The string to use for the indent.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
