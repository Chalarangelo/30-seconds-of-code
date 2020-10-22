---
title: zipObject
tags: array,object,intermediate
---

Associates properties to values, given array of valid property identifiers and an array of values.

- Use `Array.prototype.reduce()` to build an object from the two arrays.
- If the length of `props` is longer than `values`, remaining keys will be `undefined`.
- If the length of `values` is longer than `props`, remaining values will be ignored.

```js
const zipObject = (props, values) =>
  props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {});
```

```js
zipObject(['a', 'b', 'c'], [1, 2]); // {a: 1, b: 2, c: undefined}
zipObject(['a', 'b'], [1, 2, 3]); // {a: 1, b: 2}
```
