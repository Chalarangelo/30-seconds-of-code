### xProd

Creates a new array out of the two supplied by creating each possible pair from the arrays.

Use `Array.map()` to produce every possible pair from the elements of the two arrays.

```js
const xProd = (a, b) => a.map(x => b.map(y => [x, y]));
```

```js
xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```
