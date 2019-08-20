# p-timeout [![Build Status](https://travis-ci.org/sindresorhus/p-timeout.svg?branch=master)](https://travis-ci.org/sindresorhus/p-timeout)

> Timeout a promise after a specified amount of time


## Install

```
$ npm install p-timeout
```


## Usage

```js
const delay = require('delay');
const pTimeout = require('p-timeout');

const delayedPromise = delay(200);

pTimeout(delayedPromise, 50).then(() => 'foo');
//=> [TimeoutError: Promise timed out after 50 milliseconds]
```


## API

### pTimeout(input, ms, [message | fallback])

Returns a decorated `input` that times out after `ms` time.

#### input

Type: `Promise`

Promise to decorate.

#### ms

Type: `number`

Milliseconds before timing out.

#### message

Type: `string` `Error`<br>
Default: `'Promise timed out after 50 milliseconds'`

Specify a custom error message or error.

If you do a custom error, it's recommended to sub-class `pTimeout.TimeoutError`.

#### fallback

Type: `Function`

Do something other than rejecting with an error on timeout.

You could for example retry:

```js
const delay = require('delay');
const pTimeout = require('p-timeout');

const delayedPromise = () => delay(200);

pTimeout(delayedPromise(), 50, () => {
	return pTimeout(delayedPromise(), 300);
});
```

### pTimeout.TimeoutError

Exposed for instance checking and sub-classing.


## Related

- [delay](https://github.com/sindresorhus/delay) - Delay a promise a specified amount of time
- [p-min-delay](https://github.com/sindresorhus/p-min-delay) - Delay a promise a minimum amount of time
- [p-retry](https://github.com/sindresorhus/p-retry) - Retry a promise-returning function
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
