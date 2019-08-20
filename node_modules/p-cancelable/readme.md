# p-cancelable [![Build Status](https://travis-ci.org/sindresorhus/p-cancelable.svg?branch=master)](https://travis-ci.org/sindresorhus/p-cancelable)

> Create a promise that can be canceled

Useful for animation, loading resources, long-running async computations, async iteration, etc.


## Install

```
$ npm install --save p-cancelable
```


## Usage

```js
const PCancelable = require('p-cancelable');

const cancelablePromise = new PCancelable((onCancel, resolve, reject) => {
	const worker = new SomeLongRunningOperation();

	onCancel(() => {
		worker.close();
	});

	worker.on('finish', resolve);
	worker.on('error', reject);
});

cancelablePromise
	.then(value => {
		console.log('Operation finished successfully:', value);
	})
	.catch(reason => {
		if (cancelablePromise.canceled) {
			// Handle the cancelation here
			console.log('Operation was canceled');
			return;
		}

		throw reason;
	});

// Cancel the operation after 10 seconds
setTimeout(() => {
	cancelablePromise.cancel();
}, 10000);
```


## API

### new PCancelable(executor)

Same as the [`Promise` constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), but with a prepended `onCancel` parameter in `executor`.

`PCancelable` is a subclass of `Promise`.

#### onCanceled(fn)

Type: `Function`

Accepts a function that is called when the promise is canceled.

You're not required to call this function.

### PCancelable#cancel()

Type: `Function`

Cancel the promise. The cancellation is synchronous.

Calling it after the promise has settled or multiple times does nothing.

### PCancelable#canceled

Type: `boolean`

Whether the promise is canceled.

### PCancelable.CancelError

Type: `Error`

Rejection reason when `.cancel()` is called.

### PCancelable.fn(fn)

Convenience method to make your promise-returning or async function cancelable.

The function you specify will have `onCancel` prepended to its parameters.

```js
const fn = PCancelable.fn((onCancel, input) => {
	const job = new Job();

	onCancel(() => {
		job.cleanup();
	});

	return job.start(); //=> Promise
});

const promise = fn('input'); //=> PCancelable

// …

promise.cancel();
```


## FAQ

### Cancelable vs. Cancellable

[In American English, the verb cancel is usually inflected canceled and canceling—with one l.](http://grammarist.com/spelling/cancel/)<br>Both a [browser API](https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable) and the [Cancelable Promises proposal](https://github.com/tc39/proposal-cancelable-promises) use this spelling.

### What about the official [Cancelable Promises proposal](https://github.com/tc39/proposal-cancelable-promises)?

~~It's still an early draft and I don't really like its current direction. It complicates everything and will require deep changes in the ecosystem to adapt to it. And the way you have to use cancel tokens is verbose and convoluted. I much prefer the more pragmatic and less invasive approach in this module.~~ The proposal was withdrawn.


## Related

- [p-lazy](https://github.com/sindresorhus/p-lazy) - Create a lazy promise that defers execution until `.then()` or `.catch()` is called
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
