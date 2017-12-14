### Group by

Use `Array.map()` to map the values of an array to a function or property name.
Use `Array.reduce()` to create an object, where the keys are produced from the mapped results.

```js
const groupBy = (arr, func) =>
  (typeof func === 'function' ? arr.map(func) : arr.map(val => val[func]))
    .reduce((acc, val, i) => {
      acc[val] = acc[val] === undefined ? [arr[i]] : acc[val].concat(arr[i]); return acc;
    }, {});
// groupBy([6.1, 4.2, 6.3], Math.floor) -> {4: [4.2], 6: [6.1, 6.3]}
// groupBy(['one', 'two', 'three'], 'length') -> {3: ['one', 'two'], 5: ['three']}
```
