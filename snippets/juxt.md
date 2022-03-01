---
title: Juxtapose functions
tags: function
expertise: advanced
firstSeen: 2020-05-20T19:58:39+03:00
lastUpdated: 2020-10-20T23:29:39+03:00
---

Takes several functions as argument and returns a function that is the juxtaposition of those functions.

- Use `Array.prototype.map()` to return a `fn` that can take a variable number of `args`.
- When `fn` is called, return an array containing the result of applying each `fn` to the `args`.

```js
const juxt = (...fns) => (...args) => [...fns].map(fn => [...args].map(fn));
```

```js
juxt(
  x => x + 1,
  x => x - 1,
  x => x * 10
)(1, 2, 3); // [[2, 3, 4], [0, 1, 2], [10, 20, 30]]
juxt(
  s => s.length,
  s => s.split(' ').join('-')
)('30 seconds of code'); // [[18], ['30-seconds-of-code']]
```
