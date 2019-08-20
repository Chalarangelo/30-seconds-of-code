declare const pIsPromise: {
	/**
	Check if `input` is a ES2015 promise.

	@param input - Value to be checked.

	@example
	```
	import isPromise = require('p-is-promise');

	isPromise(Promise.resolve('🦄'));
	//=> true
	```
	*/
	(input: unknown): input is Promise<unknown>;

	// TODO: Remove this for the next major release, refactor the whole definition to:
	// declare function pIsPromise(input: unknown): input is Promise<unknown>;
	// export = pIsPromise;
	default: typeof pIsPromise;
};

export = pIsPromise;
