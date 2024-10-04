---
title: How can I calculate the greatest common divisor & least common multiple in JavaScript?
shortTitle: Greatest common divisor & least common multiple
language: javascript
tags: [math,algorithm,recursion]
cover: migrating-birds
excerpt: Use JavaScript to calculate the greatest common divisor and least common multiple of two or more numbers.
listed: true
dateModified: 2023-12-19
---

## Greatest common divisor

The [greatest common divisor](https://en.wikipedia.org/wiki/Greatest_common_divisor) (**GCD**), of two or more integers is the largest positive integer that divides each of the integers.

### The Euclidean algorithm

The **Euclidean algorithm** is an efficient method for computing the GCD of **two numbers**. This, in practice, means **recursively** applying the observation that `gcd(a, b) = gcd(b, a % b)` until `b` is **zero**. When `b` is zero, we have `gcd(a, 0) = a`.

```js
const gcd = (a, b) => (!b ? a : gcd(b, a % b));

gcd(8, 36); // 4
```

### Greatest common divisor of more than two numbers

The GCD of more than two numbers can be calculated by calculating the GCD of each **pair of numbers**. On top of the recursive function, we can use `Array.prototype.reduce()` to apply the operation to **multiple numbers**. The resulting value of a pair of numbers is then used as the first argument in the next step.

```js
const gcd = (a, b) => (!b ? a : gcd(b, a % b));
const gcdMultiple = (...arr) => [...arr].reduce((a, b) => gcd(a, b));

gcdMultiple(8, 36); // 4
gcdMultiple(...[12, 8, 32]); // 4
```

## Least common multiple

The [least common multiple](https://en.wikipedia.org/wiki/Least_common_multiple) (**LCM**) of two numbers is the smallest positive integer that is perfectly divisible by the two given numbers.

### Least common multiple of two numbers

The LCM of two numbers can be calculated by using the **greatest common divisor** (GCD) formula and the fact that `lcm(x, y) = x * y / gcd(x, y)`.

```js
const gcd = (a, b) => (!b ? a : gcd(b, a % b));
const lcm = (x, y) => (x * y) / gcd(x, y);

lcm(12, 7); // 84
```

### Least common multiple of more than two numbers

Similarly to the GCD, the LCM of more than two numbers can be calculated with the help of `Array.prototype.reduce()`. Start by calculating the LCM of the **first two numbers**, then keep applying the operation to the result and the next number until all numbers have been iterated over.

```js
const gcd = (a, b) => (!b ? a : gcd(b, a % b));
const lcm = (x, y) => (x * y) / gcd(x, y);

const lcmMultiple = (...arr) => [...arr].reduce((a, b) => lcm(a, b));

lcmMultiple(12, 7); // 84
lcmMultiple(...[1, 3, 4, 5]); // 60
```
