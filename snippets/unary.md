---
title: Unary function arity
tags: function
cover: flower-portrait-2
firstSeen: 2018-01-24T13:22:32+02:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Creates a function that accepts up to one argument, ignoring any additional arguments.

- Call the provided function, `fn`, with just the first argument supplied.

```js
const unary = fn => val => fn(val);
```

```js
['6', '8', '10'].map(unary(parseInt)); // [6, 8, 10]
```
