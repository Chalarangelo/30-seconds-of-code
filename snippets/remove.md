### remove

Removes elements from an array for which the given function returns `false`.

Use `Array.filter()` to find array elements that return truthy values and `Array.reduce()` to remove elements using `Array.splice()`.
The `func` is invoked with three arguments (`value, index, array`).

```js
const remove = (arr, func) =>
  Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
    arr.splice(arr.indexOf(val), 1); return acc.concat(val);
  }, [])
  : [];
// remove([1, 2, 3, 4], n => n % 2 == 0) -> [2, 4]
```
