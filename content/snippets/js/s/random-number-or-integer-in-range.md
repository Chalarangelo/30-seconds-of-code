---
title: Generate a random number or integer in a range with JavaScript
shortTitle: Random number or integer in range
language: javascript
tags: [math,random]
cover: white-laptop
excerpt: Enhance JavaScript's `Math.random()` to generate a random number or integer in a specified range.
listed: true
dateModified: 2024-03-12
---

JavaScript's `Math.random()` is handy for generating **random numbers between 0 and 1**. If you need a random number in a different range, you'll need to use some simple math to map the random number to the desired range.

## Random number in a range

The simplest use case you'll come across is to generate a **random number in a specified range**. All you need to do is multiply the result of `Math.random()` by the **difference** between the maximum and minimum values, and then add the minimum value.

```js
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

randomNumberInRange(2, 10); // 6.0211363285087005
```

## Random integer in a range

Subsequently, generating a **random integer** is very similar, except for an additional step at the end. You need to use `Math.floor()` to **round the result down** to the nearest integer.

```js
const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

randomIntegerInRange(0, 5); // 2
```

## Gaussian random numbers

Finally, if you need to generate Gaussian (**normally distributed**) random numbers, you can use the [Box-Muller transform](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform) to generate random numbers with a Gaussian distribution.

```js
const randomGauss = () => {
  const theta = 2 * Math.PI * Math.random();
  const rho = Math.sqrt(-2 * Math.log(1 - Math.random()));
  return (rho * Math.cos(theta)) / 10.0 + 0.5;
};

randomGauss(); // 0.5
```
