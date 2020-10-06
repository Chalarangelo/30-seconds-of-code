---
title: lerp
tags: math,intermediate
---

A lerp returns the value between two numbers at a specified, decimal midpoint

```js
const lerp = (from, to, t) => from * (1 - t) + to * t;
```

```js
lerp(50, 100, 0); // 50
lerp(50, 100, 0.5); // 75
lerp(50, 100, 1); // 100
```
