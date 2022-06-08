---
title: Random integer in range
tags: math,random
expertise: beginner
cover: blog_images/painters-desk.jpg
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-22T20:24:04+03:00
---

Generates a random integer in the specified range.

- Use `Math.random()` to generate a random number and map it to the desired range.
- Use `Math.floor()` to make it an integer.

```js
const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
```

```js
randomIntegerInRange(0, 5); // 2
```
