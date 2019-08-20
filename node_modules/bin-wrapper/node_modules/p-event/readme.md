# p-event [![Build Status](https://travis-ci.org/sindresorhus/p-event.svg?branch=master)](https://travis-ci.org/sindresorhus/p-event)

> Promisify an event by waiting for it to be emitted

Useful when you need only one event emission and want to use it with promises or await it in an async function.

It's works with any event API in Node.js and the browser (using a bundler).

If you want multiple individual events as they are emitted, you can use the `pEvent.iterator()` method. [Observables](https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87) can be useful too.


## Install

```
$ npm install p-event
```


## Usage

In Node.js:

```js
const pEvent = require('p-event');
const emitter = require('./some-event-emitter');

(async () => {
	try {
		const result = await pEvent(emitter, 'finish');

		// `emitter` emitted a `finish` event
		console.log(result);
	} catch (error) {
		// `emitter` emitted an `error` event
		console.error(error);
	}
})();
```

In the browser:

```js
const pEvent = require('p-event');

(async () => {
	await pEvent(document, 'DOMContentLoaded');
	console.log('😎');
})();
```

Async iteration:

```js
const pEvent = require('p-event');
const emitter = require('./some-event-emitter');

(async () => {
	const asyncIterator = pEvent.iterator(emitter, 'data', {
		resolutionEvents: ['finish']
	});

	for await (const event of asyncIterator) {
		console.log(event);
	}
})();
```


## API

### pEvent(emitter, event, [options])
### pEvent(emitter, event, filter)

Returns a `Promise` that is fulfilled when `emitter` emits an event matching `event`, or rejects if `emitter` emits any of the events defined in the `rejectionEvents` option.

**Note**: `event` is a string for a single event type, for example, `'data'`. To listen on multiple
events, pass an array of strings, such as `['started', 'stopped']`.

The returned promise has a `.cancel()` method, which when called, removes the event listeners and causes the promise to never be settled.

#### emitter

Type: `Object`

Event emitter object.

Should have either a `.on()`/`.addListener()`/`.addEventListener()` and `.off()`/`.removeListener()`/`.removeEventListener()` method, like the [Node.js `EventEmitter`](https://nodejs.org/api/events.html) and [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events).

#### event

Type: `string | string[]`

Name of the event or events to listen to.

If the same event is defined both here and in `rejectionEvents`, this one takes priority.

#### options

Type: `Object`

##### rejectionEvents

Type: `string[]`<br>
Default: `['error']`

Events that will reject the promise.

##### multiArgs

Type: `boolean`<br>
Default: `false`

By default, the promisified function will only return the first argument from the event callback, which works fine for most APIs. This option can be useful for APIs that return multiple arguments in the callback. Turning this on will make it return an array of all arguments from the callback, instead of just the first argument. This also applies to rejections.

Example:

```js
const pEvent = require('p-event');
const emitter = require('./some-event-emitter');

(async () => {
	const [foo, bar] = await pEvent(emitter, 'finish', {multiArgs: true});
})();
```

##### timeout

Type: `number`<br>
Default: `Infinity`

Time in milliseconds before timing out.

##### filter

Type: `Function`

Filter function for accepting an event.

```js
const pEvent = require('p-event');
const emitter = require('./some-event-emitter');

(async () => {
	const result = await pEvent(emitter, '🦄', value => value > 3);
	// Do something with first 🦄 event with a value greater than 3
})();
```

### pEvent.multiple(emitter, event, options)

Wait for multiple event emissions. Returns an array.

This method has the same arguments and options as `pEvent()` with the addition of the following options:

#### options

Type: `Object`

##### count

*Required*<br>
Type: `number`

The number of times the event needs to be emitted before the promise resolves.

##### resolveImmediately

Type: `boolean`<br>
Default: `false`

Whether to resolve the promise immediately. Emitting one of the `rejectionEvents` won't throw an error.

**Note**: The returned array will be mutated when an event is emitted.

Example:

```js
const emitter = new EventEmitter();

const promise = pEvent.multiple(emitter, 'hello', {
	resolveImmediately: true,
	count: Infinity
});

const result = await promise;
console.log(result);
//=> []

emitter.emit('hello', 'Jack');
console.log(result);
//=> ['Jack']

emitter.emit('hello', 'Mark');
console.log(result);
//=> ['Jack', 'Mark']

// Stops listening
emitter.emit('error', new Error('😿'));

emitter.emit('hello', 'John');
console.log(result);
//=> ['Jack', 'Mark']
```

### pEvent.iterator(emitter, event, [options])
### pEvent.iterator(emitter, event, filter)

Returns an [async iterator](http://2ality.com/2016/10/asynchronous-iteration.html) that lets you asynchronously iterate over events of `event` emitted from `emitter`. The iterator ends when `emitter` emits an event matching any of the events defined in `resolutionEvents`, or rejects if `emitter` emits any of the events defined in the `rejectionEvents` option.

This method has the same arguments and options as `pEvent()` with the addition of the following options:

#### options

Type: `Object`

##### limit

Type: `number` *(non-negative integer)*<br>
Default: `Infinity`

Maximum number of events for the iterator before it ends. When the limit is reached, the iterator will be marked as `done`. This option is useful to paginate events, for example, fetching 10 events per page.

##### resolutionEvents

Type: `string[]`<br>
Default: `[]`

Events that will end the iterator.


## Before and after

```js
const fs = require('fs');

function getOpenReadStream(file, callback) {
	const stream = fs.createReadStream(file);

	stream.on('open', () => {
		callback(null, stream);
	});

	stream.on('error', error => {
		callback(error);
	});
}

getOpenReadStream('unicorn.txt', (error, stream) => {
	if (error) {
		console.error(error);
		return;
	}

	console.log('File descriptor:', stream.fd);
	stream.pipe(process.stdout);
});
```

```js
const fs = require('fs');
const pEvent = require('p-event');

async function getOpenReadStream(file) {
	const stream = fs.createReadStream(file);
	await pEvent(stream, 'open');
	return stream;
}

(async () => {
	const stream = await getOpenReadStream('unicorn.txt');
	console.log('File descriptor:', stream.fd);
	stream.pipe(process.stdout);
})().catch(console.error);
```


## Tip

### Dealing with calls that resolve with an error code

Some functions might use a single event for success and for certain errors. Promises make it easy to have combined error handler for both error events and successes containing values which represent errors.

```js
const pEvent = require('p-event');
const emitter = require('./some-event-emitter');

(async () => {
	try {
		const result = await pEvent(emitter, 'finish');

		if (result === 'unwanted result') {
			throw new Error('Emitter finished with an error');
		}

		// `emitter` emitted a `finish` event with an acceptable value
		console.log(result);
	} catch (error) {
		// `emitter` emitted an `error` event or
		// emitted a `finish` with 'unwanted result'
		console.error(error);
	}
})();
```


## Related

- [pify](https://github.com/sindresorhus/pify) - Promisify a callback-style function
- [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
