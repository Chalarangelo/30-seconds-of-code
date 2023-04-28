---
title: Convert array to identity object
type: snippet
tags: [array]
author: chalarangelo
cover: rain-shopping
dateModified: 2023-04-16T05:00:00-04:00
---

Converts an array of values into an object with the same values as keys and values.

- Use `Array.prototype.map()` to map each value to an array of key-value pairs.
- Use `Object.fromEntries()` to convert the array of key-value pairs into an object.

```js
const toIdentityObject = arr => Object.fromEntries(arr.map(v => [v, v]));
```

```js
toIdentityObject(['a', 'b']); // { a: 'a', b: 'b' }
```
