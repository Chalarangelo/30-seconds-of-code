'use strict';
const from = require('from2');
const pIsPromise = require('p-is-promise');

module.exports = x => {
	if (Array.isArray(x)) {
		x = x.slice();
	}

	let promise;
	let iterator;

	prepare(x);

	function prepare(value) {
		x = value;
		promise = pIsPromise(x) ? x : null;
		// we don't iterate on strings and buffers since slicing them is ~7x faster
		const shouldIterate = !promise && x[Symbol.iterator] && typeof x !== 'string' && !Buffer.isBuffer(x);
		iterator = shouldIterate ? x[Symbol.iterator]() : null;
	}

	return from(function reader(size, cb) {
		if (promise) {
			promise.then(prepare).then(() => reader.call(this, size, cb), cb);
			return;
		}

		if (iterator) {
			const obj = iterator.next();
			setImmediate(cb, null, obj.done ? null : obj.value);
			return;
		}

		if (x.length === 0) {
			setImmediate(cb, null, null);
			return;
		}

		const chunk = x.slice(0, size);
		x = x.slice(size);

		setImmediate(cb, null, chunk);
	});
};

module.exports.obj = x => {
	if (Array.isArray(x)) {
		x = x.slice();
	}

	let promise;
	let iterator;

	prepare(x);

	function prepare(value) {
		x = value;
		promise = pIsPromise(x) ? x : null;
		iterator = !promise && x[Symbol.iterator] ? x[Symbol.iterator]() : null;
	}

	return from.obj(function reader(size, cb) {
		if (promise) {
			promise.then(prepare).then(() => reader.call(this, size, cb), cb);
			return;
		}

		if (iterator) {
			const obj = iterator.next();
			setImmediate(cb, null, obj.done ? null : obj.value);
			return;
		}

		this.push(x);

		setImmediate(cb, null, null);
	});
};
