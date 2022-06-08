---
title: Value is number
tags: type,math
expertise: beginner
cover: blog_images/red-petals.jpg
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Checks if the given argument is a number.

- Use `typeof` to check if a value is classified as a number primitive.
- To safeguard against `NaN`, check if `val === val` (as `NaN` has a `typeof` equal to `number` and is the only value not equal to itself).

```js
const isNumber = val => typeof val === 'number' && val === val;
```

```js
isNumber(1); // true
isNumber('1'); // false
isNumber(NaN); // false
```
