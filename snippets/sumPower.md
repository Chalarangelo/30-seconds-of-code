---
title: Sum of powers in range
tags: math
cover: blog_images/boat-port.jpg
firstSeen: 2018-01-01T15:49:25+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Calculates the sum of the powers of all the numbers from `start` to `end` (both inclusive).

- Use `Array.prototype.fill()` to create an array of all the numbers in the target range.
- Use `Array.prototype.map()` and the exponent operator (`**`) to raise them to `power` and `Array.prototype.reduce()` to add them together.
- Omit the second argument, `power`, to use a default power of `2`.
- Omit the third argument, `start`, to use a default starting value of `1`.

```js
const sumPower = (end, power = 2, start = 1) =>
  Array(end + 1 - start)
    .fill(0)
    .map((x, i) => (i + start) ** power)
    .reduce((a, b) => a + b, 0);
```

```js
sumPower(10); // 385
sumPower(10, 3); // 3025
sumPower(10, 3, 5); // 2925
```
