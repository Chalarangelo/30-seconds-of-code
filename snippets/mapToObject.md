---
title: Convert Map to object
shortTitle: Map to object
tags: object
author: chalarangelo
cover: blog_images/succulent-1.jpg
firstSeen: 2022-06-16T05:00:00-04:00
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
