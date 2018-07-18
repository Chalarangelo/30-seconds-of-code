### filterNonUniqueBy

Filters out the non-unique values in an array, based on a provided comparator function.

Use `Array.filter()` and `Array.every()` for an array containing only the unique values, based on the comparator function, `fn`.
The comparator function takes four arguments: the values of the two elements being compared and their indexes.

```js
const filterNonUniqueBy = (arr, fn) =>
	arr.filter((v, i) => arr.every((x, j) => i == j == fn(v, x, i, j)));
```

```js
filterNonUniqueBy(
	[
		{ id: 0, value: 'a' },
		{ id: 1, value: 'b' },
		{ id: 2, value: 'c' },
		{ id: 1, value: 'd' },
		{ id: 0, value: 'e' },
	],
	(a, b) => a.id == b.id
); // [ { id: 2, value: 'c' } ]
```
