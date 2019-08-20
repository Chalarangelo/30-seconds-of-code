'use strict';
const pFinally = require('p-finally');

class TimeoutError extends Error {
	constructor(message) {
		super(message);
		this.name = 'TimeoutError';
	}
}

module.exports = (promise, ms, fallback) => new Promise((resolve, reject) => {
	if (typeof ms !== 'number' || ms < 0) {
		throw new TypeError('Expected `ms` to be a positive number');
	}

	const timer = setTimeout(() => {
		if (typeof fallback === 'function') {
			try {
				resolve(fallback());
			} catch (err) {
				reject(err);
			}
			return;
		}

		const message = typeof fallback === 'string' ? fallback : `Promise timed out after ${ms} milliseconds`;
		const err = fallback instanceof Error ? fallback : new TimeoutError(message);

		if (typeof promise.cancel === 'function') {
			promise.cancel();
		}

		reject(err);
	}, ms);

	pFinally(
		promise.then(resolve, reject),
		() => {
			clearTimeout(timer);
		}
	);
});

module.exports.TimeoutError = TimeoutError;
