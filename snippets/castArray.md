---
title: castArray
tags: type,array,beginner
firstSeen: 2018-01-23T20:54:12+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Casts the provided valueue as an array if it's not one.

- Use `Array.prototype.isArray()` to determine if `value` is an array and return it as-is or encapsulated in an array accordingly.

```js
const castArray = value => (Array.isArray(value) ? value : [value]);
```

```js
castArray('foo'); // ['foo']
castArray([1]); // [1]
```
