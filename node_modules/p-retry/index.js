'use strict';
const retry = require('retry');

class AbortError extends Error {
	constructor(message) {
		super();

		if (message instanceof Error) {
			this.originalError = message;
			({message} = message);
		} else {
			this.originalError = new Error(message);
			this.originalError.stack = this.stack;
		}

		this.name = 'AbortError';
		this.message = message;
	}
}

function decorateErrorWithCounts(error, attemptNumber, options) {
	// Minus 1 from attemptNumber because the first attempt does not count as a retry
	const retriesLeft = options.retries - (attemptNumber - 1);

	error.attemptNumber = attemptNumber;
	error.retriesLeft = retriesLeft;

	return error;
}

module.exports = (input, options) => new Promise((resolve, reject) => {
	options = Object.assign({
		onFailedAttempt: () => {},
		retries: 10
	}, options);

	const operation = retry.operation(options);

	operation.attempt(attemptNumber => Promise.resolve(attemptNumber)
		.then(input)
		.then(resolve, error => {
			if (error instanceof AbortError) {
				operation.stop();
				reject(error.originalError);
			} else if (error instanceof TypeError) {
				operation.stop();
				reject(error);
			} else if (operation.retry(error)) {
				decorateErrorWithCounts(error, attemptNumber, options);
				options.onFailedAttempt(error);
			} else {
				decorateErrorWithCounts(error, attemptNumber, options);
				options.onFailedAttempt(error);
				reject(operation.mainError());
			}
		})
	);
});

module.exports.AbortError = AbortError;
