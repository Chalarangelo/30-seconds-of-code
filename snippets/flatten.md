### flatten

Flattens an array up to the specified depth.

Use recursion, decrementing `depth` by 1 for each level of depth.
Use `Array.reduce()` and `Array.concat()` to merge elements or arrays.
Base case, for `depth` equal to `1` stops recursion.
Omit the second element, `depth` to flatten only to a depth of `1` (single flatten).

```js
const flatten = (arr, depth = 1) =>
  depth != 1
    ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v, depth - 1) : v), [])
    : arr.reduce((a, v) => a.concat(v), []);
```

```js
flatten([1, [2], 3, 4]); // [1,2,3,4]
```
