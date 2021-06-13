---
title: pullAtIndex
tags: array,advanced
firstSeen: 2017-12-19T00:42:47+02:00
lastUpdated: 2020-10-22T20:24:04+03:00
---

Mutates the original array to filter out the values at the specified indexes.
Returns the removed elements.

- Use `Array.prototype.filter()` and `Array.prototype.includes()` to pull out the values that are not needed.
- Set `Array.prototype.length` to mutate the passed in an array by resetting its length to `0`.
- Use `Array.prototype.push()` to re-populate it with only the pulled values.
- Use `Array.prototype.push()` to keep track of pulled values.

```js
const pullAtIndex = (arr, pullArr) => {
  let removed = [];
  let pulled = arr
    .map((v, i) => (pullArr.includes(i) ? removed.push(v) : v))
    .filter((v, i) => !pullArr.includes(i));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
  return removed;
};
```

```js
let myArray = ['a', 'b', 'c', 'd'];
let pulled = pullAtIndex(myArray, [1, 3]);
// myArray = [ 'a', 'c' ] , pulled = [ 'b', 'd' ]
```
