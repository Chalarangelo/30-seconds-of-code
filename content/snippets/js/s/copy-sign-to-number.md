---
title: Copy sign from one number to another in JavaScript
shortTitle: Copy sign to number
language: javascript
tags: [math]
cover: cloudy-mountaintop
excerpt: Copy the sign of one number to another without changing its absolute value.
listed: true
dateModified: 2024-05-28
---

If you've ever worked extensively with numeric values, you might have stumbled upon a case where you need to **change the sign of a number**. This is relatively simple, but what if you want to **copy the sign** from another value. Naively, most of us would simply add a ternary operator and check if the second number is positive or negative, then do the same for the first number. But there's a much simpler way to do this.

In the simplest terms possible, either the target value has the correct sign (same as the source value) or it doesn't. All you really need to **compare are the signs** of the two numbers. If they're the same, you're done. If they're different, you just need to change the sign of the target value.

So how can that be done? Luckily, `Math.sign()` can help us out here. This methods returns either `1` (positive), `0` (zero), or `-1` (negative) depending on the sign of the number. By comparing the signs of the two numbers, we can easily determine if the sign needs to be changed.

The only thing left to do is use the ternary operator (`?`) to conditionally apply the unary `-` operator to the target value. If the signs are the same, the target value remains unchanged. If they're different, the **sign is flipped**.

```js
const copySign = (x, y) => Math.sign(x) === Math.sign(y) ? x : -x;

copySign(2, 3); // 2
copySign(2, -3); // -2
copySign(-2, 3); // 2
copySign(-2, -3); // -2
```
