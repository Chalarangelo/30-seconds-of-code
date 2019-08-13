---
title: coalesceFactory
tags: utility,intermediate
---

Returns a customized coalesce function that returns the first argument that returns `true` from the provided argument validation function.

Use `Array.prototype.find()` to return the first argument that returns `true` from the provided argument validation function.

```js
const coalesceFactory = valid => (...args) => args.find(valid);
```

```js
const customCoalesce = coalesceFactory(_ => ![null, undefined, '', NaN].includes(_));
customCoalesce(undefined, null, NaN, '', 'Waldo'); // "Waldo"
```