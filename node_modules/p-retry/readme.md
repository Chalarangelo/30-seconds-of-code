# p-retry [![Build Status](https://travis-ci.org/sindresorhus/p-retry.svg?branch=master)](https://travis-ci.org/sindresorhus/p-retry)

> Retry a promise-returning or async function

It does exponential backoff and supports custom retry strategies for failed operations.


## Install

```
$ npm install p-retry
```


## Usage

```js
const pRetry = require('p-retry');
const fetch = require('node-fetch');

const run = async () => {
	const response = await fetch('https://sindresorhus.com/unicorn');

	// Abort retrying if the resource doesn't exist
	if (response.status === 404) {
		throw new pRetry.AbortError(response.statusText);
	}

	return response.blob();
};

(async () => {
	console.log(await pRetry(run, {retries: 5}));
})();
```

With the `onFailedAttempt` option:

```js
const run = async () => {
	const response = await fetch('https://sindresorhus.com/unicorn');

	if (response.status !== 200) {
		throw new Error(response.statusText);
	}

	return response.json();
};

(async () => {
	const result = await pRetry(run, {
		onFailedAttempt: error => {
			console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
			// 1st request => Attempt 1 failed. There are 4 retries left.
			// 2nd request => Attempt 2 failed. There are 3 retries left.
			// …
		},
		retries: 5
	});

	console.log(result);
})();
```


## API

### pRetry(input, [options])

Returns a `Promise` that is fulfilled when calling `input` returns a fulfilled promise. If calling `input` returns a rejected promise, `input` is called again until the max retries are reached, it then rejects with the last rejection reason.

It doesn't retry on `TypeError` as that's a user error.

#### input

Type: `Function`

Receives the number of attempts as the first argument and is expected to return a `Promise` or any value.

#### options

Type: `Object`

Options are passed to the [`retry`](https://github.com/tim-kos/node-retry#retryoperationoptions) module.

##### onFailedAttempt(error)

Type: `Function`

Callback invoked on each retry. Receives the error thrown by `input` as the first argument with properties `attemptNumber` and `retriesLeft` which indicate the current attempt number and the number of attempts left, respectively.

### pRetry.AbortError(message|error)

Abort retrying and reject the promise.

### message

Type: `string`

Error message.

### error

Type: `Error`

Custom error.


## Tip

You can pass arguments to the function being retried by wrapping it in an inline arrow function:

```js
const pRetry = require('p-retry');

const run = async emoji => {
	// …
};

(async () => {
	// Without arguments
	await pRetry(run, {retries: 5});

	// With arguments
	await pRetry(() => run('🦄'), {retries: 5});
})();
```


## Related

- [p-timeout](https://github.com/sindresorhus/p-timeout) - Timeout a promise after a specified amount of time
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
