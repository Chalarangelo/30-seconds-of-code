---
title: pullAtValue
tags: array,advanced
---

Mutates the original array to filter out the values specified.
Returns the removed elements.

- Use `Array.prototype.filter()` and `Array.prototype.includes()` to pull out the values that are not needed.
- Set `Array.prototype.length` to mutate the passed in an array by resetting its length to `0`.
- Use `Array.prototype.push()` to re-populate it with only the pulled values.
- Use `Array.prototype.push()` to keep track of pulled values.

```js
const pullAtValue = (arr, pullArr) => {
  let removed = [],
    pushToRemove = arr.forEach((v, i) =>
      pullArr.includes(v) ? removed.push(v) : v
    ),
    mutateTo = arr.filter((v, i) => !pullArr.includes(v));
  arr.length = 0;
  mutateTo.forEach(v => arr.push(v));
  return removed;
};
```

```js
let myArray = ['a', 'b', 'c', 'd'];
let pulled = pullAtValue(myArray, ['b', 'd']);
// myArray = [ 'a', 'c' ] , pulled = [ 'b', 'd' ]
```
