import {IOptions as GlobOptions} from 'glob';

declare namespace del {
	interface Options extends Readonly<GlobOptions> {
		/**
		Allow deleting the current working directory and outside.

		@default false
		*/
		readonly force?: boolean;

		/**
		See what would be deleted.

		@default false

		@example
		```
		import del = require('del');

		(async () => {
			const deletedPaths = await del(['tmp/*.js'], {dryRun: true});

			console.log('Files and folders that would be deleted:\n', deletedPaths.join('\n'));
		})();
		```
		*/
		readonly dryRun?: boolean;

		/**
		Concurrency limit. Minimum: `1`.

		@default Infinity
		*/
		readonly concurrency?: number;
	}
}

declare const del: {
	/**
	Delete files and folders using glob patterns.

	@param patterns - See supported minimatch [patterns](https://github.com/isaacs/minimatch#usage).
	- [Pattern examples with expected matches](https://github.com/sindresorhus/multimatch/blob/master/test/test.js)
	- [Quick globbing pattern overview](https://github.com/sindresorhus/multimatch#globbing-patterns)
	@param options - See the [`glob` options](https://github.com/isaacs/node-glob#options).
	@returns A promise for an array of deleted paths.

	@example
	```
	import del = require('del');

	(async () => {
		const deletedPaths = await del(['tmp/*.js', '!tmp/unicorn.js']);

		console.log('Deleted files and folders:\n', deletedPaths.join('\n'));
	})();
	```
	*/
	(
		patterns: string | ReadonlyArray<string>,
		options?: del.Options
	): Promise<string[]>;

	/**
	Synchronously delete files and folders using glob patterns.

	@param patterns - See supported minimatch [patterns](https://github.com/isaacs/minimatch#usage).
	- [Pattern examples with expected matches](https://github.com/sindresorhus/multimatch/blob/master/test/test.js)
	- [Quick globbing pattern overview](https://github.com/sindresorhus/multimatch#globbing-patterns)
	@param options - See the [`glob` options](https://github.com/isaacs/node-glob#options).
	@returns An array of deleted paths.
	*/
	sync(
		patterns: string | ReadonlyArray<string>,
		options?: del.Options
	): string[];

	// TODO: Remove this for the next major release
	default: typeof del;
};

export = del;
