---
title: Logarithm in specific base
type: snippet
tags: [math]
cover: yellow-white-mug-2
dateModified: 2020-10-22T20:23:47+03:00
---

Calculates the logarithm of the given number in the given base.

- Use `Math.log()` to get the logarithm from the value and the base and divide them.

```js
const logBase = (n, base) => Math.log(n) / Math.log(base);
```

```js
logBase(10, 10); // 1
logBase(100, 10); // 2
```
