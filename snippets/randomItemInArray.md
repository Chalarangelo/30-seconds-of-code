---
title: radomItemInArray
tags: math,random,beginner
firstSeen: 2021-07-16T21:58:49+0000
lastUpdated: 2021-07-16T21:58:49+0000
---

Returns a random item from the array `arr`.

- Use `Math.random()` to generate random numbers and using `Math.floor()` to turn them into integers.
- Use `| 0` in case if `Math.random() * items.length` returns undefined.

```js
const randomItemInArray = (arr) => arr[Math.floor(Math.random() * arr.length | 0)]
```

```js
randomItemInArray(["foo", "bar", "hello"]) // bar
randomItemInArray([3, 1, 5, 8, 6]) // 6
```
