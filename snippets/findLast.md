### findLast

Returns the last element for which the provided function returns a truthy value.

Use `Array.filter()` to remove elements for which `fn` returns falsey values, `Array.pop()` to get the last one.

```js
const findLast = (arr, fn) => arr.filter(fn).slice(-1)[0];
```

```js
findLast([1, 2, 3, 4], n => n % 2 === 1); // 3
```
