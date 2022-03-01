---
title: Nth argument
tags: function
expertise: beginner
firstSeen: 2018-01-23T21:27:37+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Creates a function that gets the argument at index `n`.

- Use `Array.prototype.slice()` to get the desired argument at index `n`.
- If `n` is negative, the nth argument from the end is returned.

```js
const nthArg = n => (...args) => args.slice(n)[0];
```

```js
const third = nthArg(2);
third(1, 2, 3); // 3
third(1, 2); // undefined
const last = nthArg(-1);
last(1, 2, 3, 4, 5); // 5
```
