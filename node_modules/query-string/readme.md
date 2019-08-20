# query-string [![Build Status](https://travis-ci.org/sindresorhus/query-string.svg?branch=master)](https://travis-ci.org/sindresorhus/query-string)

> Parse and stringify URL [query strings](https://en.wikipedia.org/wiki/Query_string)

---

<p align="center"><b>🔥 Want to strengthen your core JavaScript skills and master ES6?</b><br>I would personally recommend this awesome <a href="https://ES6.io/friend/AWESOME">ES6 course</a> by Wes Bos.<br>Also check out his <a href="https://LearnNode.com/friend/AWESOME">Node.js</a>, <a href="https://ReactForBeginners.com/friend/AWESOME">React</a>, <a href="https://SublimeTextBook.com/friend/AWESOME">Sublime</a> courses.</p>

---


## Install

```
$ npm install query-string
```

<a href="https://www.patreon.com/sindresorhus">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>


## Usage

```js
const queryString = require('query-string');

console.log(location.search);
//=> '?foo=bar'

const parsed = queryString.parse(location.search);
console.log(parsed);
//=> {foo: 'bar'}

console.log(location.hash);
//=> '#token=bada55cafe'

const parsedHash = queryString.parse(location.hash);
console.log(parsedHash);
//=> {token: 'bada55cafe'}

parsed.foo = 'unicorn';
parsed.ilike = 'pizza';

const stringified = queryString.stringify(parsed);
//=> 'foo=unicorn&ilike=pizza'

location.search = stringified;
// note that `location.search` automatically prepends a question mark
console.log(location.search);
//=> '?foo=unicorn&ilike=pizza'
```


## API

### .parse(*string*, *[options]*)

Parse a query string into an object. Leading `?` or `#` are ignored, so you can pass `location.search` or `location.hash` directly.

The returned object is created with [`Object.create(null)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) and thus does not have a `prototype`.

URI components are decoded with [`decode-uri-component`](https://github.com/SamVerschueren/decode-uri-component).

#### arrayFormat

Type: `string`<br>
Default: `'none'`

Supports both `index` for an indexed array representation or `bracket` for a *bracketed* array representation.

- `bracket`: stands for parsing correctly arrays with bracket representation on the query string, such as:

```js
queryString.parse('foo[]=1&foo[]=2&foo[]=3', {arrayFormat: 'bracket'});
//=> foo: [1,2,3]
```

- `index`: stands for parsing taking the index into account, such as:

```js
queryString.parse('foo[0]=1&foo[1]=2&foo[3]=3', {arrayFormat: 'index'});
//=> foo: [1,2,3]
```

- `none`: is the **default** option and removes any bracket representation, such as:

```js
queryString.parse('foo=1&foo=2&foo=3');
//=> foo: [1,2,3]
```

### .stringify(*object*, *[options]*)

Stringify an object into a query string, sorting the keys.

#### strict

Type: `boolean`<br>
Default: `true`

Strictly encode URI components with [strict-uri-encode](https://github.com/kevva/strict-uri-encode). It uses [encodeURIComponent](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
if set to false. You probably [don't care](https://github.com/sindresorhus/query-string/issues/42) about this option.

#### encode

Type: `boolean`<br>
Default: `true`

[URL encode](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) the keys and values.

#### arrayFormat

Type: `string`<br>
Default: `'none'`

Supports both `index` for an indexed array representation or `bracket` for a *bracketed* array representation.

- `bracket`: stands for parsing correctly arrays with bracket representation on the query string, such as:

```js
queryString.stringify({foo: [1,2,3]}, {arrayFormat: 'bracket'});
// => foo[]=1&foo[]=2&foo[]=3
```

- `index`: stands for parsing taking the index into account, such as:

```js
queryString.stringify({foo: [1,2,3]}, {arrayFormat: 'index'});
// => foo[0]=1&foo[1]=2&foo[3]=3
```

- `none`: is the __default__ option and removes any bracket representation, such as:

```js
queryString.stringify({foo: [1,2,3]});
// => foo=1&foo=2&foo=3
```

#### sort

Type: `Function` `boolean`

Supports both `Function` as a custom sorting function or `false` to disable sorting.

```js
const order = ['c', 'a', 'b'];
queryString.stringify({ a: 1, b: 2, c: 3}, {
	sort: (m, n) => order.indexOf(m) >= order.indexOf(n)
});
// => 'c=3&a=1&b=2'
```

```js
queryString.stringify({ b: 1, c: 2, a: 3}, {sort: false});
// => 'c=3&a=1&b=2'
```

If omitted, keys are sorted using `Array#sort`, which means, converting them to strings and comparing strings in Unicode code point order.

### .extract(*string*)

Extract a query string from a URL that can be passed into `.parse()`.

### .parseUrl(*string*, *[options]*)

Extract the URL and the query string as an object.

The `options` are the same as for `.parse()`.

Returns an object with a `url` and `query` property.

```js
queryString.parseUrl('https://foo.bar?foo=bar');
//=> {url: 'https://foo.bar', query: {foo: 'bar'}}
```


## Nesting

This module intentionally doesn't support nesting as it's not spec'd and varies between implementations, which causes a lot of [edge cases](https://github.com/visionmedia/node-querystring/issues).

You're much better off just converting the object to a JSON string:

```js
queryString.stringify({
	foo: 'bar',
	nested: JSON.stringify({
		unicorn: 'cake'
	})
});
//=> 'foo=bar&nested=%7B%22unicorn%22%3A%22cake%22%7D'
```

However, there is support for multiple instances of the same key:

```js
queryString.parse('likes=cake&name=bob&likes=icecream');
//=> {likes: ['cake', 'icecream'], name: 'bob'}

queryString.stringify({color: ['taupe', 'chartreuse'], id: '515'});
//=> 'color=chartreuse&color=taupe&id=515'
```


## Falsy values

Sometimes you want to unset a key, or maybe just make it present without assigning a value to it. Here is how falsy values are stringified:

```js
queryString.stringify({foo: false});
//=> 'foo=false'

queryString.stringify({foo: null});
//=> 'foo'

queryString.stringify({foo: undefined});
//=> ''
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
