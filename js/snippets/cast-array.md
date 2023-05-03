---
title: Cast to array
type: snippet
tags: [type,array]
cover: man-red-sunset
dateModified: 2020-09-15T16:28:04+03:00
---

Casts the provided value as an array if it's not one.

- Use `Array.isArray()` to determine if `val` is an array and return it as-is or encapsulated in an array accordingly.

```js
const castArray = val => (Array.isArray(val) ? val : [val]);
```

```js
castArray('foo'); // ['foo']
castArray([1]); // [1]
```
