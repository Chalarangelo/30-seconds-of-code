'use strict';

// TODO: Use rest/spread when targeting Node.js 6

module.exports = function (input) {
	const args = Array.isArray(input) ? input : arguments;

	if (args.length === 0) {
		return Promise.reject(new Error('Expected at least one argument'));
	}

	return [].slice.call(args, 1).reduce((a, b) => {
		return function () {
			return Promise.resolve(a.apply(null, arguments)).then(b);
		};
	}, args[0]);
};
