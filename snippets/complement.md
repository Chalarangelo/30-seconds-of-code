---
title: Logical complement
type: snippet
tags: [function,logic]
cover: flower-portrait-10
dateModified: 2020-09-15T16:28:04+03:00
---

Returns a function that is the logical complement of the given function, `fn`.

- Use the logical not (`!`) operator on the result of calling `fn` with any supplied `args`.

```js
const complement = fn => (...args) => !fn(...args);
```

```js
const isEven = num => num % 2 === 0;
const isOdd = complement(isEven);
isOdd(2); // false
isOdd(3); // true
```
