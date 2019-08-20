# cli-truncate [![Build Status](https://travis-ci.org/sindresorhus/cli-truncate.svg?branch=master)](https://travis-ci.org/sindresorhus/cli-truncate)

> Truncate a string to a specific width in the terminal

Gracefully handles [ANSI escapes](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors_and_Styles). Like a string styled with [`chalk`](https://github.com/chalk/chalk). It also supports Unicode surrogate pairs and fullwidth characters.


## Install

```
$ npm install cli-truncate
```


## Usage

```js
const cliTruncate = require('cli-truncate');

cliTruncate('unicorn', 4);
//=> 'uni…'

// Truncate at different positions
cliTruncate('unicorn', 4, {position: 'start'});
//=> '…orn'

cliTruncate('unicorn', 4, {position: 'middle'});
//=> 'un…n'

cliTruncate('\u001B[31municorn\u001B[39m', 4);
//=> '\u001B[31muni\u001B[39m…'

// Truncate Unicode surrogate pairs
cliTruncate('uni\uD83C\uDE00corn', 5);
//=> 'uni\uD83C\uDE00…'

// Truncate fullwidth characters
cliTruncate('안녕하세요', 3);
//=> '안…'

// Truncate the paragraph to the terminal width
const paragraph = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.';
cliTruncate(paragraph, process.stdout.columns));
//=> 'Lorem ipsum dolor sit amet, consectetuer adipiscing…'
```


## API

### cliTruncate(input, columns, [options])

#### input

Type: `string`

Text to truncate.

#### columns

Type: `number`

Columns to occupy in the terminal.

#### options

Type: `Object`

##### position

Type: `string`<br>
Default: `end`<br>
Values: `start` `middle` `end`

Position to truncate the string.


## Related

- [wrap-ansi](https://github.com/chalk/wrap-ansi) - Wordwrap a string with ANSI escape codes
- [slice-ansi](https://github.com/chalk/slice-ansi) - Slice a string with ANSI escape codes


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
