# squeak [![Build Status](http://img.shields.io/travis/kevva/squeak.svg?style=flat)](https://travis-ci.org/kevva/squeak)

> A tiny stream log

![](https://cloud.githubusercontent.com/assets/709159/5165451/f0ca124e-73e4-11e4-8a49-9e278b7aff16.png)


## Install

```
$ npm install --save squeak
```


## Usage

```js
var Squeak = require('squeak');
var log = new Squeak()
	.type('info')
	.type('success', {color: 'green'})
	.type('warn', {color: 'yellow'})
	.type('error', {color: 'red'}, function () {
		log.end();
		process.exit(1);
	});

log.info('this is a info message');
log.success('this is a success message');
log.warn('this is a warning');
log.error(new Error('this is an error').stack);

/*
     info : this is a info message
  success : this is a success message
     warn : this is a warning
    error : this is an error
    at ChildProcess.exithandler (child_process.js:648:15)
    at ChildProcess.emit (events.js:98:17)
 */
```

You can also customize the different types to use a custom prefix using the 
`prefix` option:

```js
var Squeak = require('squeak');
var log = new Squeak({separator: ' '})
	.type('success', {color: 'green', prefix: '✔'})
	.type('warn', {color: 'yellow', prefix: '⚠'});

log.success('this is a success message');
log.warn('this is a warning');

/*
  ✔ this is a success message
  ⚠ this is a warning
 */
```


## API

### new Squeak(options)

Creates a new `Squeak` instance.

#### options.align

Type: `boolean`  
Default: `true`

Whether to align the prefixes or not. E.g:

```sh
     foo : hello
  foobar : world
```

#### options.indent

Type: `number`  
Default: `2`

Sets the indentation.

#### options.separator

Type: `string`  
Default: `  :  `

Customize the separator between the `prefix` and the message.

#### options.stream

Type: `stream`  
Default: `process.stderr`

Which `stream` to write to.

### .write(args)

Type: `string`

Writes to `options.stream`, using `process.stderr` by default.

### .writeln(args)

Type: `string`

Same as `.write()` but with a new line.

### .writelpad(args)

Type: `string`

Same as `.write()` but with padding.

### .type(type, options, callback)

Adds a type.

#### type

Type: `string`

The name of the type. Will be used as `prefix` by default.

#### options.color

Type: `string`

Sets the prefix color. Supported colors can be found [here](https://github.com/sindresorhus/ansi-styles#colors).

#### options.prefix

Type: `string`

Sets the `type` prefix. Uses `type` by default.

#### callback

Type: `function`

An optional callback to be called when the `type` is called.

### .emit(event, data)

Emits an event.

### .end(callback)

Type: `function`

Writes a newline and executes an optional callback function.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
