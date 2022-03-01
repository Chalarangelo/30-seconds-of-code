---
title: Size of array, object or string
tags: object,array,string
expertise: intermediate
firstSeen: 2017-12-30T16:46:01+02:00
lastUpdated: 2020-10-21T21:17:45+03:00
---

Gets the size of an array, object or string.

- Get type of `val` (`array`, `object` or `string`).
- Use `Array.prototype.length` property for arrays.
- Use `length` or `size` value if available or number of keys for objects.
- Use `size` of a [`Blob` object](https://developer.mozilla.org/en-US/docs/Web/API/Blob) created from `val` for strings.
- Split strings into array of characters with `String.prototype.split()` and return its length.

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
