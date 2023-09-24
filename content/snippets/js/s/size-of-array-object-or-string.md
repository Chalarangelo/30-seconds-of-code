---
title: Size of array, object or string
type: snippet
language: javascript
tags: [object,array,string]
cover: digital-nomad-13
dateModified: 2023-01-20
---

Gets the size of an array, object or string.

- Get type of `val` (`array`, `object` or `string`).
- Use `Array.prototype.length` property for arrays.
- Use `length` or `size` value if available or number of keys for objects.
- Use `size` of a [`Blob` object](https://developer.mozilla.org/en-US/docs/Web/API/Blob) created from `val` for strings.

```js
const size = val =>
  Array.isArray(val)
    ? val.length
    : val && typeof val === 'object'
      ? val.size || val.length || Object.keys(val).length
      : typeof val === 'string'
        ? new Blob([val]).size
        : 0;
```

```js
size([1, 2, 3, 4, 5]); // 5
size('size'); // 4
size({ one: 1, two: 2, three: 3 }); // 3
```
