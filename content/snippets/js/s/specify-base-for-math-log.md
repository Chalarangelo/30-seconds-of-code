---
title: How can I specify the base for a logarithm in JavaScript?
shortTitle: Specify base for logarithm
language: javascript
tags: [math]
cover: yellow-white-mug-2
excerpt: Calculate the logarithm of a number or check if a number is a power of a specific base.
listed: true
dateModified: 2024-01-03
---

JavaScript's `Math.log()`, `Math.log2()` and `Math.log10()` are useful for calculating logarithms in base `e`, `2` and `10` respectively. But what if you want to **calculate the logarithm of a number in a different base**? Or check if a number is a **power of a specific base**? That's nearly as easy by using some math.

## Calculate the logarithm of a number in a specific base

The **base change formula** allows you to calculate the logarithm of a number in a specific base by dividing the logarithm of the number by the logarithm of the base. This means that for a given base `b` and a number `n` you can calculate the logarithm of `n` in base `b` by using the formula `Math.log(n) / Math.log(b)`.

```js
const logBase = (b, n) => Math.log(n) / Math.log(base);

logBase(5, 25); // 2
logBase(5, 625); // 4
```

Using **partial application**, you can create a function that calculates the logarithm of a number in a specific base by only passing the base as an argument. This returns a **new function** that takes the number as an argument and calculates the logarithm of the number in the specified base.

```js
const logBase = b => n => Math.log(n) / Math.log(base);

const logBase5 = logBase(5);

logBase5(25); // 2
logBase5(625); // 4
```

## Check if a number is a power of a specific base

In order to check if a number is a power of a specific base, you need to calculate its logarithm in that base first. Then, you can use the modulo operator (`%`) to check if the result is an integer. If it is, the number is a power of the specified base, otherwise it isn't.

```js
const isPowerOf10 = n => Math.log10(n) % 1 === 0;
const isPowerOf2 = n => Math.log2(n) % 1 === 0;
const isPowerOf = b => n => Math.log(n) / Math.log(b) % 1 === 0;

isPowerOf10(1); // true
isPowerOf10(10); // true
isPowerOf10(20); // false

isPowerOf2(1); // true
isPowerOf2(2); // true
isPowerOf2(3); // false

const isPowerOf5 = isPowerOf(5);

isPowerOf5(5, 25); // true
isPowerOf5(5, 625); // true
isPowerOf5(5, 20); // false
```

> [!TIP]
>
> Favor the built-in logarithmic functions, whenever available, as they are likely to be more performant than a custom implementation.
