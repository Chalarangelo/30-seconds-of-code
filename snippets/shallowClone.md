---
title: Shallow clone object
tags: object,beginner
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Creates a shallow clone of an object.

- Use `Object.assign()` and an empty object (`{}`) to create a shallow clone of the original.

```js
const shallowClone = obj => Object.assign({}, obj);
```

```js
const a = { x: true, y: 1 };
const b = shallowClone(a); // a !== b
```
