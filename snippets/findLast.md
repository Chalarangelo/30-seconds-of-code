### findLast

Returns the last element for which the provided function returns a truthy value.

Use `Array.prototype.reverse()` to reverse `arr` and then  `Array.prototype.find()` to return the last element for which `fn` returns a truthy value.

```js
const findLast = (arr, fn) => arr.reverse().find(fn);
```

```js
findLast([1, 2, 3, 4], n => n % 2 === 1); // 3
```
