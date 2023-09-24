---
title: Convert Map to object
type: snippet
shortTitle: Map to object
language: javascript
tags: [object]
author: chalarangelo
cover: succulent-1
dateModified: 2022-06-16
---

Converts a `Map` to an object.

- Use `Map.prototype.entries()` to convert the `Map` to an array of key-value pairs.
- Use `Object.fromEntries()` to convert the array to an object.

```js
const mapToObject = map => Object.fromEntries(map.entries());
```

```js
mapToObject(new Map([['a', 1], ['b', 2]])); // {a: 1, b: 2}
```
