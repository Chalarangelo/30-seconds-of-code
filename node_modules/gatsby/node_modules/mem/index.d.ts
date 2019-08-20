declare namespace mem {
	interface CacheStorage<KeyType extends unknown, ValueType extends unknown> {
		has(key: KeyType): boolean;
		get(key: KeyType): ValueType | undefined;
		set(key: KeyType, value: ValueType): void;
		delete(key: KeyType): void;
		clear?: () => void;
	}

	interface Options<
		ArgumentsType extends unknown[],
		CacheKeyType extends unknown,
		ReturnType extends unknown
	> {
		/**
		Milliseconds until the cache expires.

		@default Infinity
		*/
		readonly maxAge?: number;

		/**
		Determines the cache key for storing the result based on the function arguments. By default, if there's only one argument and it's a [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive), it's used directly as a key, otherwise it's all the function arguments JSON stringified as an array.

		You could for example change it to only cache on the first argument `x => JSON.stringify(x)`.
		*/
		readonly cacheKey?: (...arguments: ArgumentsType) => CacheKeyType;

		/**
		Use a different cache storage. You could for example use a `WeakMap` instead or [`quick-lru`](https://github.com/sindresorhus/quick-lru) for a LRU cache.

		@default new Map()
		*/
		readonly cache?: CacheStorage<CacheKeyType, {data: ReturnType; maxAge: number}>;

		/**
		Cache rejected promises.

		@default false
		*/
		readonly cachePromiseRejection?: boolean;
	}
}

declare const mem: {
	/**
	[Memoize](https://en.wikipedia.org/wiki/Memoization) functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input.

	@param fn - Function to be memoized.

	@example
	```
	import mem = require('mem');

	let i = 0;
	const counter = () => ++i;
	const memoized = mem(counter);

	memoized('foo');
	//=> 1

	// Cached as it's the same arguments
	memoized('foo');
	//=> 1

	// Not cached anymore as the arguments changed
	memoized('bar');
	//=> 2

	memoized('bar');
	//=> 2
	```
	*/
	<
		ArgumentsType extends unknown[],
		ReturnType extends unknown,
		CacheKeyType extends unknown
	>(
		fn: (...arguments: ArgumentsType) => ReturnType,
		options?: mem.Options<ArgumentsType, CacheKeyType, ReturnType>
	): (...arguments: ArgumentsType) => ReturnType;

	/**
	Clear all cached data of a memoized function.

	@param fn - Memoized function.
	*/
	clear<ArgumentsType extends unknown[], ReturnType extends unknown>(
		fn: (...arguments: ArgumentsType) => ReturnType
	): void;

	// TODO: Remove this for the next major release
	default: typeof mem;
};

export = mem;
