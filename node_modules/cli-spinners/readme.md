# cli-spinners [![Build Status](https://travis-ci.org/sindresorhus/cli-spinners.svg?branch=master)](https://travis-ci.org/sindresorhus/cli-spinners)

> 60+ spinners for use in the terminal

<p align="center">
	<img width="700" src="https://cdn.rawgit.com/sindresorhus/cli-spinners/dcac74b75e52d4d9fe980e6fce98c2814275739e/screenshot.svg">
</p>

The list of spinners is just a [JSON file](spinners.json) and can be used wherever.

You probably want to use one of these spinners through the [`ora`](https://github.com/sindresorhus/ora) module.


## Install

```
$ npm install cli-spinners
```


## Usage

```js
const cliSpinners = require('cli-spinners');

console.log(cliSpinners.dots);
/*
{
	interval: 80,
	frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
}
*/
```


## Preview

The header GIF is outdated. See all the [spinner at once](http://jsfiddle.net/sindresorhus/2eLtsbey/embedded/result/) or [one at the time](https://asciinema.org/a/95348?size=big).


## API

Each spinner comes with a recommended `interval` and an array of `frames`.

[See the spinners.](spinners.json)


## Related

- [ora](https://github.com/sindresorhus/ora) - Elegant terminal spinner
- [CLISpinner](https://github.com/kiliankoe/CLISpinner) - Terminal spinners for Swift
- [py-spinners](https://github.com/ManrajGrover/py-spinners) - Python port
- [spinners](https://github.com/FGRibreau/spinners) - Terminal spinners for Rust


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
