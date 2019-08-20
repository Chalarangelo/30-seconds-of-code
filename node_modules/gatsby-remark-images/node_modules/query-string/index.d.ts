export interface ParseOptions {
	/**
	Decode the keys and values. URI components are decoded with [`decode-uri-component`](https://github.com/SamVerschueren/decode-uri-component).

	@default true
	*/
	readonly decode?: boolean;

	/**
	@default 'none'

	- `bracket`: Parse arrays with bracket representation:

		```
		queryString.parse('foo[]=1&foo[]=2&foo[]=3', {arrayFormat: 'bracket'});
		//=> {foo: ['1', '2', '3']}
		```

	- `index`: Parse arrays with index representation:

		```
		queryString.parse('foo[0]=1&foo[1]=2&foo[3]=3', {arrayFormat: 'index'});
		//=> {foo: ['1', '2', '3']}
		```

	- `comma`: Parse arrays with elements separated by comma:

		```
		queryString.parse('foo=1,2,3', {arrayFormat: 'comma'});
		//=> {foo: ['1', '2', '3']}
		```

	- `none`: Parse arrays with elements using duplicate keys:

		```
		queryString.parse('foo=1&foo=2&foo=3');
		//=> {foo: ['1', '2', '3']}
		```
	*/
	readonly arrayFormat?: 'bracket' | 'index' | 'comma' | 'none';

	/**
	Supports both `Function` as a custom sorting function or `false` to disable sorting.

	If omitted, keys are sorted using `Array#sort`, which means, converting them to strings and comparing strings in Unicode code point order.

	@default true

	@example
	```
	const order = ['c', 'a', 'b'];

	queryString.parse('?a=one&b=two&c=three', {
		sort: (itemLeft, itemRight) => order.indexOf(itemLeft) - order.indexOf(itemRight)
	});
	// => {c: 'three', a: 'one', b: 'two'}
	```

	queryString.parse('?a=one&c=three&b=two', {sort: false});
	// => {a: 'one', c: 'three', b: 'two'}
	```
	*/
	readonly sort?: ((itemLeft: string, itemRight: string) => number) | false;

	/**
	Parse the value as a number type instead of string type if it's a number.

	@default false

	@example
	```js
	queryString.parse('foo=1', {parseNumbers: true});
	//=> {foo: 1}
	```
	*/
	readonly parseNumbers?: boolean;

	/**
	Parse the value as a boolean type instead of string type if it's a boolean.

	@default false

	@example
	```
	queryString.parse('foo=true', {parseBooleans: true});
	//=> {foo: true}
	```
	*/
	readonly parseBooleans?: boolean;
}

export interface ParsedQuery<T = string> {
	[key: string]: T | T[] | null | undefined;
}

/**
Parse a query string into an object. Leading `?` or `#` are ignored, so you can pass `location.search` or `location.hash` directly.

The returned object is created with [`Object.create(null)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) and thus does not have a `prototype`.

@param query - The query string to parse.
*/
export function parse(query: string, options: {parseBooleans: true, parseNumbers: true} & ParseOptions): ParsedQuery<string | boolean | number>;
export function parse(query: string, options: {parseBooleans: true} & ParseOptions): ParsedQuery<string | boolean>;
export function parse(query: string, options: {parseNumbers: true} & ParseOptions): ParsedQuery<string | number>;
export function parse(query: string, options?: ParseOptions): ParsedQuery;

export interface ParsedUrl {
	readonly url: string;
	readonly query: ParsedQuery;
}

/**
Extract the URL and the query string as an object.

@param url - The URL to parse.

@example
```
queryString.parseUrl('https://foo.bar?foo=bar');
//=> {url: 'https://foo.bar', query: {foo: 'bar'}}
```
*/
export function parseUrl(url: string, options?: ParseOptions): ParsedUrl;

export interface StringifyOptions {
	/**
	Strictly encode URI components with [`strict-uri-encode`](https://github.com/kevva/strict-uri-encode). It uses [`encodeURIComponent`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) if set to `false`. You probably [don't care](https://github.com/sindresorhus/query-string/issues/42) about this option.

	@default true
	*/
	readonly strict?: boolean;

	/**
	[URL encode](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) the keys and values.

	@default true
	*/
	readonly encode?: boolean;

	/**
	@default 'none'

	- `bracket`: Serialize arrays using bracket representation:

		```
		queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'bracket'});
		//=> 'foo[]=1&foo[]=2&foo[]=3'
		```

	- `index`: Serialize arrays using index representation:

		```
		queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'index'});
		//=> 'foo[0]=1&foo[1]=2&foo[2]=3'
		```

	- `comma`: Serialize arrays by separating elements with comma:

		```
		queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'comma'});
		//=> 'foo=1,2,3'
		```

	- `none`: Serialize arrays by using duplicate keys:

		```
		queryString.stringify({foo: [1, 2, 3]});
		//=> 'foo=1&foo=2&foo=3'
		```
	*/
	readonly arrayFormat?: 'bracket' | 'index' | 'comma' | 'none';

	/**
	Supports both `Function` as a custom sorting function or `false` to disable sorting.

	If omitted, keys are sorted using `Array#sort`, which means, converting them to strings and comparing strings in Unicode code point order.

	@default true

	@example
	```
	const order = ['c', 'a', 'b'];

	queryString.stringify({a: 1, b: 2, c: 3}, {
		sort: (itemLeft, itemRight) => order.indexOf(itemLeft) - order.indexOf(itemRight)
	});
	// => 'c=3&a=1&b=2'

	queryString.stringify({b: 1, c: 2, a: 3}, {sort: false});
	// => 'b=1&c=2&a=3'
	```
	*/
	readonly sort?: ((itemLeft: string, itemRight: string) => number) | false;
}

/**
Stringify an object into a query string and sort the keys.
*/
export function stringify(
	object: {[key: string]: any},
	options?: StringifyOptions
): string;

/**
Extract a query string from a URL that can be passed into `.parse()`.
*/
export function extract(url: string): string;
