---
title: Random integer in range
type: snippet
language: javascript
tags: [math,random]
cover: collab-desk-1
dateModified: 2020-10-22
---

Generates a random integer in the specified range.

- Use `Math.random()` to generate a random number and map it to the desired range.
- Use `Math.floor()` to make it an integer.

```js
const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
```

```js
randomIntegerInRange(0, 5); // 2
```
