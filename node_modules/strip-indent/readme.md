# strip-indent [![Build Status](https://travis-ci.org/sindresorhus/strip-indent.svg?branch=master)](https://travis-ci.org/sindresorhus/strip-indent)

> Strip leading whitespace from every line in a string

The line with the least number of leading whitespace, ignoring empty lines, determines the number to remove.

Useful for removing redundant indentation.


## Install

```sh
$ npm install --save strip-indent
```


## Usage

```js
var str = '\tunicorn\n\t\tcake';
/*
	unicorn
		cake
*/

stripIndent('\tunicorn\n\t\tcake');
/*
unicorn
	cake
*/
```


## CLI

```sh
$ npm install --global strip-indent
```

```sh
$ strip-indent --help

  Usage
    strip-indent <file>
    echo <string> | strip-indent

  Example
    echo '\tunicorn\n\t\tcake' | strip-indent
    unicorn
    	cake
```


## Related

- [indent-string](https://github.com/sindresorhus/indent-string) - Indent each line in a string


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
