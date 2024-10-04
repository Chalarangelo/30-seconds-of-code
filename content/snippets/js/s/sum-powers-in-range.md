---
title: Sum of powers in range
language: javascript
tags: [math]
cover: boat-port
excerpt: s the sum of the powers of all the numbers from `start` to `end` (both inclusive).
listed: true
dateModified: 2024-08-16
---

Calculating the **sum of the powers** of all the numbers from `start` to `end` (both inclusive) can be done using a combination of **array methods** and JavaScript's exponentiation operator (`**`).

Using `Array.from()`, we create an array of the appropriate size. Then, we iterate over all elements, using `Array.prototype.reduce()`, and calculate the sum of their powers. In order to get the value of each element, we add the `start` value to the current index `i`, then use the exponentiation operator (`**`) to raise it to the `power`.

Omitting the `power` argument will default to a power of `2`, and omitting the `start` argument will default to a starting value of `1`.

```js
const sumPower = (end, power = 2, start = 1) =>
  Array.from({ length: end + 1 - start }).reduce(
    (acc, _, i) => acc + (i + start) ** power, 0
  );

sumPower(10); // 385
sumPower(10, 3); // 3025
sumPower(10, 3, 5); // 2925
```

> [!NOTE]
>
> If you're working with **older browsers** or environments that don't support the exponentiation operator (`**`), you can use `Math.pow()` instead.
