---
title: Apply function when condition is met
tags: function,logic
expertise: beginner
cover: blog_images/flower-portrait-8.jpg
firstSeen: 2018-04-19T03:45:32+03:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Returns a function that takes one argument and runs a callback if it's truthy or returns it if falsy.

- Return a function expecting a single value, `x`, that returns the appropriate value based on `pred`.

```js
const when = (pred, whenTrue) => x => (pred(x) ? whenTrue(x) : x);
```

```js
const doubleEvenNumbers = when(x => x % 2 === 0, x => x * 2);
doubleEvenNumbers(2); // 4
doubleEvenNumbers(1); // 1
```
