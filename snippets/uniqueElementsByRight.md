### uniqueElementsByRight

Returns all unique values of an array, based on a provided comparator function.

Use `Array.reduce()` and `Array.some()` for an array containing only the last unique occurence of each value, based on the comparator function, `fn`.
The comparator function takes two arguments: the values of the two elements being compared.

```js
const uniqueElementsByRight = (arr, fn) =>
	arr.reduce((acc, v) => {
		if (!acc.some(x => fn(v, x))) acc.push(v);
		return acc;
	}, []);
```

```js
uniqueElementsByRight(
	[
		{ id: 0, value: 'a' },
		{ id: 1, value: 'b' },
		{ id: 2, value: 'c' },
		{ id: 1, value: 'd' },
		{ id: 0, value: 'e' },
	],
	(a, b) => a.id == b.id
); // [ { id: 0, value: 'e' }, { id: 1, value: 'd' }, { id: 2, value: 'c' } ]
```
