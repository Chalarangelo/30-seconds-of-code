---
title: groupBy
tags: array,object,intermediate
---

Groups the elements of an array based on the given function.

- Use `Array.prototype.map()` to map the values of the array to a function or property name.
- Use `Array.prototype.reduce()` to create an object, where the keys are produced from the mapped results.

```js
const groupBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});
```

```js
groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}
```
