---
title: nand
tags: math,logic,beginner
---

Returns `true` if at least one of the arguments is `false`, `false` otherwise.

- Use the denial of and (`&&`) operator on the two given values.

```js
const nand = (a, b) => !(a && b);
```

```js
nand(true, false); // true
nand(false, true); // true
nand(true, true); // false
```
