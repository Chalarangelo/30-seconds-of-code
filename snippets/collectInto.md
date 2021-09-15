---
title: collectInto
tags: function,array,intermediate
firstSeen: 2017-12-22T05:08:36+02:00
lastUpdated: 2021-06-13T13:50:25+03:00
---

Changes a function that accepts an array into a variadic function.

- Given a function, return a closure that collects all inputs into an array-accepting function.

```js
const collectInto =
  (fn) =>
  (...args) =>
    fn(args);
```

```js
const Pall = collectInto(Promise.all.bind(Promise));
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = new Promise((resolve) => setTimeout(resolve, 2000, 3));
Pall(p1, p2, p3).then(console.log); // [1, 2, 3] (after about 2 seconds)
```
