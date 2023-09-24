---
title: Min and max of array based on provided function
type: snippet
language: javascript
tags: [array]
cover: orange-coffee
dateModified: 2020-11-03
---

Returns the minimum/maximum value of an array, after applying the provided function to set the comparing rule.

- Use `Array.prototype.reduce()` in combination with the `comparator` function to get the appropriate element in the array.
- Omit the second argument, `comparator`, to use the default one that returns the minimum element in the array.

```js
const reduceWhich = (arr, comparator = (a, b) => a - b) =>
  arr.reduce((a, b) => (comparator(a, b) >= 0 ? b : a));
```

```js
reduceWhich([1, 3, 2]); // 1
reduceWhich([1, 3, 2], (a, b) => b - a); // 3
reduceWhich(
  [
    { name: 'Tom', age: 12 },
    { name: 'Jack', age: 18 },
    { name: 'Lucy', age: 9 }
  ],
  (a, b) => a.age - b.age
); // {name: 'Lucy', age: 9}
```
