---
title: Remove elements from array
tags: array
expertise: intermediate
firstSeen: 2018-09-27T01:55:30+03:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Has the same functionality as [`Array.prototype.splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), but returning a new array instead of mutating the original array.

- Use `Array.prototype.slice()` and `Array.prototype.concat()` to get an array with the new contents after removing existing elements and/or adding new elements.
- Omit the second argument, `index`, to start at `0`.
- Omit the third argument, `delCount`, to remove `0` elements.
- Omit the fourth argument, `elements`, in order to not add any new elements.

```js
const shank = (arr, index = 0, delCount = 0, ...elements) =>
  arr
    .slice(0, index)
    .concat(elements)
    .concat(arr.slice(index + delCount));
```

```js
const names = ['alpha', 'bravo', 'charlie'];
const namesAndDelta = shank(names, 1, 0, 'delta');
// [ 'alpha', 'delta', 'bravo', 'charlie' ]
const namesNoBravo = shank(names, 1, 1); // [ 'alpha', 'charlie' ]
console.log(names); // ['alpha', 'bravo', 'charlie']
```
