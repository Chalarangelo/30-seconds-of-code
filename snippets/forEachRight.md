---
title: forEachRight
tags: array,intermediate
firstSeen: 2018-01-09T01:38:50+02:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Executes a provided function once for each array element, starting from the array's last element.

- Use `Array.prototype.slice()` to clone the given array and `Array.prototype.reverse()` to reverse it.
- Use `Array.prototype.forEach()` to iterate over the reversed array.

```js
const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);
```

```js
forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'
```
