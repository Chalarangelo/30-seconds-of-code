---
title: Generate Gaussian random numbers
type: snippet
tags: [math,random]
cover: chess-pawns
author: chalarangelo
dateModified: 2023-04-03T05:00:00-04:00
---

Generates Gaussian (normally distributed) random numbers.

- Use the [Box-Muller transform](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform) to generate random numbers with a Gaussian distribution.

```js
const randomGauss = () => {
  const theta = 2 * Math.PI * Math.random();
  const rho = Math.sqrt(-2 * Math.log(1 - Math.random()));
  return (rho * Math.cos(theta)) / 10.0 + 0.5;
};
```

```js
randomGauss(); // 0.5
```
