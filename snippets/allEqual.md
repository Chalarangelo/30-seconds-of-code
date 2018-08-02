### allEqual

Check if all elements are equal

Use `Array.every()` to check if all the elements of the array are the same as the first one.

```js
const allEqual = arr => arr.every(val => val === arr[0]);
```

```js
allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```
