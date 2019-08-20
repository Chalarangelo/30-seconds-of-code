declare namespace pMap {
	interface Options {
		/**
		Number of concurrently pending promises returned by `mapper`.

		@default Infinity
		*/
		concurrency?: number;
	}

	/**
	Function which is called for every item in `input`. Expected to return a `Promise` or value.

	@param input - Iterated element.
	@param index - Index of the element in the source array.
	*/
	type Mapper<Element = any, NewElement = any> = (
		input: Element,
		index: number
	) => NewElement | Promise<NewElement>;
}

declare const pMap: {
	/**
	Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `mapper` are fulfilled, or rejects if any of the promises reject. The fulfilled value is an `Array` of the fulfilled values returned from `mapper` in `input` order.

	@param input - Iterated over concurrently in the `mapper` function.
	@param mapper - Function which is called for every item in `input`. Expected to return a `Promise` or value.

	@example
	```
	import pMap = require('p-map');
	import got = require('got');

	const sites = [
		getWebsiteFromUsername('sindresorhus'), //=> Promise
		'ava.li',
		'todomvc.com',
		'github.com'
	];

	(async () => {
		const mapper = async site => {
			const {requestUrl} = await got.head(site);
			return requestUrl;
		};

		const result = await pMap(sites, mapper, {concurrency: 2});

		console.log(result);
		//=> ['http://sindresorhus.com/', 'http://ava.li/', 'http://todomvc.com/', 'http://github.com/']
	})();
	```
	*/
	<Element, NewElement>(
		input: Iterable<Element>,
		mapper: pMap.Mapper<Element, NewElement>,
		options?: pMap.Options
	): Promise<NewElement[]>;

	// TODO: Remove this for the next major release, refactor the whole definition to:
	// declare function pMap<Element, NewElement>(
	// 	input: Iterable<Element>,
	// 	mapper: pMap.Mapper<Element, NewElement>,
	// 	options?: pMap.Options
	// ): Promise<NewElement[]>;
	// export = pMap;
	default: typeof pMap;
};

export = pMap;
