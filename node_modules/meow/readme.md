# meow [![Build Status](https://travis-ci.org/sindresorhus/meow.svg?branch=master)](https://travis-ci.org/sindresorhus/meow)

> CLI app helper

![](meow.gif)


## Features

- Parses arguments using [minimist](https://github.com/substack/minimist)
- Converts flags to [camelCase](https://github.com/sindresorhus/camelcase)
- Outputs version when `--version`
- Outputs description and supplied help text when `--help`
- Makes unhandled rejected promises [fail loudly](https://github.com/sindresorhus/loud-rejection) instead of the default silent fail
- Sets the process title to the binary name defined in package.json


## Install

```
$ npm install --save meow
```


## Usage

```
$ ./foo-app.js unicorns --rainbow-cake
```

```js
#!/usr/bin/env node
'use strict';
const meow = require('meow');
const foo = require('./');

const cli = meow(`
	Usage
	  $ foo <input>

	Options
	  -r, --rainbow  Include a rainbow

	Examples
	  $ foo unicorns --rainbow
	  🌈 unicorns 🌈
`, {
	alias: {
		r: 'rainbow'
	}
});
/*
{
	input: ['unicorns'],
	flags: {rainbow: true},
	...
}
*/

foo(cli.input[0], cli.flags);
```


## API

### meow(options, [minimistOptions])

Returns an object with:

- `input` *(array)* - Non-flag arguments
- `flags` *(object)* - Flags converted to camelCase
- `pkg` *(object)* - The `package.json` object
- `help` *(object)* - The help text used with `--help`
- `showHelp([code=0])` *(function)* - Show the help text and exit with `code`

#### options

Type: `object`, `array`, `string`

Can either be a string/array that is the `help` or an options object.

##### description

Type: `string`, `boolean`
Default: The package.json `"description"` property

A description to show above the help text.

Set it to `false` to disable it altogether.

##### help

Type: `string`, `boolean`

The help text you want shown.

The input is reindented and starting/ending newlines are trimmed which means you can use a [template literal](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings) without having to care about using the correct amount of indent.

<del>If it's an array each item will be a line.</del>  
*(Still supported, but you should use a template literal instead.)*

The description will be shown above your help text automatically.

Set it to `false` to disable it altogether.

##### version

Type: `string`, `boolean`  
Default: The package.json `"version"` property

Set a custom version output.

Set it to `false` to disable it altogether.

##### pkg

Type: `string`, `object`  
Default: Closest package.json upwards

Relative path to package.json or as an object.

##### argv

Type: `array`  
Default: `process.argv.slice(2)`

Custom arguments object.

#### minimistOptions

Type: `object`  
Default: `{}`

Minimist [options](https://github.com/substack/minimist#var-argv--parseargsargs-opts).

Keys passed to the minimist `default` option are [decamelized](https://github.com/sindresorhus/decamelize), so you can for example pass in `fooBar: 'baz'` and have it be the default for the `--foo-bar` flag.


## Promises

Meow will make unhandled rejected promises [fail loudly](https://github.com/sindresorhus/loud-rejection) instead of the default silent fail. Meaning you don't have to manually `.catch()` promises used in your CLI.


## Tips

See [`chalk`](https://github.com/chalk/chalk) if you want to colorize the terminal output.

See [`get-stdin`](https://github.com/sindresorhus/get-stdin) if you want to accept input from stdin.

See [`update-notifier`](https://github.com/yeoman/update-notifier) if you want update notifications.

See [`configstore`](https://github.com/yeoman/configstore) if you need to persist some data.

[More useful CLI utilities.](https://github.com/sindresorhus/awesome-nodejs#command-line-utilities)


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
