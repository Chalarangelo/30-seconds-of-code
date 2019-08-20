# onetime [![Build Status](https://travis-ci.org/sindresorhus/onetime.svg?branch=master)](https://travis-ci.org/sindresorhus/onetime)

> Ensure a function is only called once

When called multiple times it will return the return value from the first call.

*Unlike the module [once](https://github.com/isaacs/once), this one isn't naughty and extending `Function.prototype`.*


## Install

```
$ npm install onetime
```


## Usage

```js
const onetime = require('onetime');

let i = 0;

const foo = onetime(() => ++i);

foo(); //=> 0
foo(); //=> 0
foo(); //=> 0

onetime.callCount(foo); //=> 3
```

```js
const onetime = require('onetime');

const foo = onetime(() => {}, {throw: true});

foo();

foo();
//=> Error: Function `foo` can only be called once
```


## API

### onetime(fn, [options])

Returns a function that only calls `fn` once.

#### fn

Type: `Function`

Function that should only be called once.

#### options

Type: `Object`

##### throw

Type: `boolean`<br>
Default: `false`

Throw an error when called more than once.

### onetime.callCount(fn)

Returns a number representing how many times `fn` has been called.

Note: It throws an error if you pass in a function that is not wrapped by `onetime`.

```js
const foo = onetime(() => {});

foo();
foo();
foo();

console.log(onetime.callCount(foo));
//=> 3
```

#### fn

Type: `Function`

Function to get call count from.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
