---
title: What is the only value not equal to itself in JavaScript?
shortTitle: The only value not equal to itself
type: question
tags: javascript,type,comparison
author: chalarangelo
cover: blog_images/eagle.jpg
excerpt: Did you know there's a JavaScript value that's not equal to itself?
firstSeen: 2021-12-12T05:00:00-04:00
---

`NaN` (Not-a-Number) is the only JavaScript value not equal to itself when comparing with any of the comparison operators. `NaN` is often the result of meaningless or invalid math computations, so it doesn't make sense for two `NaN` values to be considered equal.

```js
const x = Math.sqrt(-1); // NaN
const y = 0 / 0;         // NaN

x === y;                 // false
x === NaN;               // false

Number.isNaN(x);         // true
Number.isNaN(y);         // true

isNaN(x);                // true
isNan('hello');          // true
```

You can check for `NaN` values using the `Number.isNaN()` function. Note that this is different from the original , global `isNaN()`. Their difference lies in the fact that `isNaN()` forcefully converts its argument to a number, whereas `Number.isNaN()` doesn't. This is why `Number.isNaN()` is considered more robust and preferable in most cases.
