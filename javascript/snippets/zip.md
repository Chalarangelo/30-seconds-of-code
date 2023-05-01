---
title: Group array elements
type: snippet
tags: [array]
cover: orange-flower
dateModified: 2020-10-22T20:24:44+03:00
---

Creates an array of elements, grouped based on their position in the original arrays.

- Use `Math.max()`, `Function.prototype.apply()` to get the longest array in the arguments.
- Create an array with that length as return value and use `Array.from()` with a mapping function to create an array of grouped elements.
- If lengths of the argument arrays vary, `undefined` is used where no value could be found.

```js
const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
  });
};
```

```js
zip(['a', 'b'], [1, 2], [true, false]); // [['a', 1, true], ['b', 2, false]]
zip(['a'], [1, 2], [true, false]); // [['a', 1, true], [undefined, 2, false]]
```
