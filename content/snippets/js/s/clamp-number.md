---
title: Clamp number
type: snippet
language: javascript
tags: [math]
cover: clay-pot-horizon
dateModified: 2020-10-22
---

Clamps `num` within the inclusive range specified by the boundary values `a` and `b`.

- If `num` falls within the range, return `num`.
- Otherwise, return the nearest number in the range.

```js
const clampNumber = (num, a, b) =>
  Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
```

```js
clampNumber(2, 3, 5); // 3
clampNumber(1, -1, -5); // -1
```
