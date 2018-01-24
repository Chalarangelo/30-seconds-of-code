### xProd

Creates a new array out of the two supplied by creating each possible pair from the arrays.

Use `Array.reduce()`, `Array.map()` and `Array.concat()` to produce every possible pair from the elements of the two arrays and save them in an array.

```js
const xProd = (a, b) => a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);
```

```js
xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```
