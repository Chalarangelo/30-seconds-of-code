---
title: Copy sign to number
type: snippet
tags: [math]
cover: keyboard-tea
dateModified: 2020-10-07T23:52:57+03:00
---

Returns the absolute value of the first number, but the sign of the second.

- Use `Math.sign()` to check if the two numbers have the same sign.
- Return `x` if they do, `-x` otherwise.

```js
const copySign = (x, y) => Math.sign(x) === Math.sign(y) ? x : -x;
```

```js
copySign(2, 3); // 2
copySign(2, -3); // -2
copySign(-2, 3); // 2
copySign(-2, -3); // -2
```
