---
title: coalesceFactory
tags: function,type,intermediate
---

Customizes a coalesce function that returns the first argument which is true based on the given validator.

- Use `Array.prototype.find()` to return the first argument that returns `true` from the provided argument validation function, `valid`.

```js
const coalesceFactory = valid => (...args) => args.find(valid);
```

```js
const customCoalesce = coalesceFactory(
  v => ![null, undefined, '', NaN].includes(v)
);
customCoalesce(undefined, null, NaN, '', 'Waldo'); // 'Waldo'
```
