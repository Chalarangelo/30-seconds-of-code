---
title: Cast to array
tags: type,array
expertise: beginner
firstSeen: 2018-01-23T20:54:12+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Casts the provided value as an array if it's not one.

- Use `Array.prototype.isArray()` to determine if `val` is an array and return it as-is or encapsulated in an array accordingly.

```js
const castArray = val => (Array.isArray(val) ? val : [val]);
```

```js
castArray('foo'); // ['foo']
castArray([1]); // [1]
```
