---
title: Generate a random boolean value in JavaScript
shortTitle: Random boolean
language: javascript
tags: [math,random]
cover: malibu
excerpt: A quick, one-liner to generate a random boolean value in JavaScript.
listed: true
dateModified: 2024-03-14
---

JavaScript doesn't have a built-in function to generate a random boolean value, but you can easily create one using `Math.random()`. All you need to do is check if the result of `Math.random()` is greater than or equal to `0.5`.

As `Math.random()` generates a random number between 0 and 1, the **probability** of the result being greater than or equal to `0.5` is 50%, which makes for an **even distribution** of `true` and `false` values.

```js
const randomBoolean = () => Math.random() >= 0.5;

randomBoolean(); // true
```
