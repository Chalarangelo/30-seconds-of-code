---
title: Map array to object
type: snippet
language: javascript
tags: [array,object]
cover: two-lighthouses
dateModified: 2020-10-21
---

Maps the values of an array to an object using a function.

- Use `Array.prototype.reduce()` to apply `fn` to each element in `arr` and combine the results into an object.
- Use `el` as the key for each property and the result of `fn` as the value.

```js
const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});
```

```js
mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }
```
