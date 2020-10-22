---
title: takeRightWhile
tags: array,intermediate
---

Removes elements from the end of an array until the passed function returns `true`.
Returns the removed elements.

- Loop through the array, using `Array.prototype.reduceRight()` and accumulating elements while `func` returns falsy values.

```js
const takeRightWhile = (arr, func) =>
  arr.reduceRight((acc, el) => (func(el) ? acc : [el, ...acc]), []);
```

```js
takeRightWhile([1, 2, 3, 4], n => n < 3); // [3, 4]
```
