---
title: Sum of numbers until n
type: snippet
tags: [math]
cover: blue-flower
dateModified: 2020-10-22T20:24:30+03:00
---

Sums all the numbers between `1` and `n`.

- Use the formula `(n * (n + 1)) / 2` to get the sum of all the numbers between 1 and `n`.

```js
const sumN = n => (n * (n + 1)) / 2;
```

```js
sumN(100); // 5050
```
