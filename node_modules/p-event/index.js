'use strict';
const pTimeout = require('p-timeout');

module.exports = (emitter, event, opts) => {
	let cancel;

	const ret = new Promise((resolve, reject) => {
		if (typeof opts === 'function') {
			opts = {filter: opts};
		}

		opts = Object.assign({
			rejectionEvents: ['error'],
			multiArgs: false
		}, opts);

		let addListener = emitter.on || emitter.addListener || emitter.addEventListener;
		let removeListener = emitter.off || emitter.removeListener || emitter.removeEventListener;

		if (!addListener || !removeListener) {
			throw new TypeError('Emitter is not compatible');
		}

		addListener = addListener.bind(emitter);
		removeListener = removeListener.bind(emitter);

		const resolveHandler = function (value) {
			if (opts.multiArgs) {
				value = [].slice.apply(arguments);
			}

			if (opts.filter && !opts.filter(value)) {
				return;
			}

			cancel();
			resolve(value);
		};

		const rejectHandler = function (reason) {
			cancel();

			if (opts.multiArgs) {
				reject([].slice.apply(arguments));
			} else {
				reject(reason);
			}
		};

		cancel = () => {
			removeListener(event, resolveHandler);

			for (const rejectionEvent of opts.rejectionEvents) {
				removeListener(rejectionEvent, rejectHandler);
			}
		};

		addListener(event, resolveHandler);

		for (const rejectionEvent of opts.rejectionEvents) {
			addListener(rejectionEvent, rejectHandler);
		}
	});

	ret.cancel = cancel;

	if (typeof opts.timeout === 'number') {
		return pTimeout(ret, opts.timeout);
	}

	return ret;
};
