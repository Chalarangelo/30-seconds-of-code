---
title: Random number in range
type: snippet
language: javascript
tags: [math,random]
cover: white-laptop
dateModified: 2020-10-22
---

Generates a random number in the specified range.

- Use `Math.random()` to generate a random value, map it to the desired range using multiplication.

```js
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
```

```js
randomNumberInRange(2, 10); // 6.0211363285087005
```
