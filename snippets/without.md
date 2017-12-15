### Without

Use `Array.filter()` to create an array excluding all given values

```js

const without = (arr, ...args) => arr.filter(v => args.indexOf(v) === -1)

// without[2, 1, 2, 3], 1, 2) -> [3]
// without([2, 1, 2, 3, 4, 5, 5, 5, 3, 2, 7, 7], 3, 1, 5, 2) -> [ 4, 7, 7 ]

```
