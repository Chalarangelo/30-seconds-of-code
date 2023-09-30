---
title: Shallow clone object
type: snippet
language: javascript
tags: [object]
cover: neon-desk-1
dateModified: 2020-09-15
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
