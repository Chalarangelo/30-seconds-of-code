### groupBy

Groups the element of an array based on the given function.

Use `Array.map()` to map the values of an array to a function or property name.
Use `Array.reduce()` to create an object, where the keys are produced from the mapped results.

```js
const groupBy = (arr, func) =>
  arr.map(typeof func === 'function' ? func : val => val[func])
    .reduce((acc, val, i) => { acc[val] = (acc[val] || []).concat(arr[i]); return acc; }, {});
// groupBy([6.1, 4.2, 6.3], Math.floor) -> {4: [4.2], 6: [6.1, 6.3]}
// groupBy(['one', 'two', 'three'], 'length') -> {3: ['one', 'two'], 5: ['three']}
```
