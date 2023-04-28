---
title: Argument coalescing
type: snippet
tags: [type]
cover: flower-portrait-1
dateModified: 2020-09-15T16:28:04+03:00
---

Returns the first defined, non-null argument.

- Use `Array.prototype.find()` and `Array.prototype.includes()` to find the first value that is not equal to `undefined` or `null`.

```js
const coalesce = (...args) => args.find(v => ![undefined, null].includes(v));
```

```js
coalesce(null, undefined, '', NaN, 'Waldo'); // ''
```
