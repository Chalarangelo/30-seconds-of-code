'use strict';
const mimicFn = require('mimic-fn');

module.exports = (fn, opts) => {
	// TODO: Remove this in v3
	if (opts === true) {
		throw new TypeError('The second argument is now an options object');
	}

	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function');
	}

	opts = opts || {};

	let ret;
	let called = false;
	const fnName = fn.displayName || fn.name || '<anonymous>';

	const onetime = function () {
		if (called) {
			if (opts.throw === true) {
				throw new Error(`Function \`${fnName}\` can only be called once`);
			}

			return ret;
		}

		called = true;
		ret = fn.apply(this, arguments);
		fn = null;

		return ret;
	};

	mimicFn(onetime, fn);

	return onetime;
};
