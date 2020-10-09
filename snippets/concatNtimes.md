---
title: concatNtimes
tags: array,function,beginner
---

Concatenate input N times.

- Use `new Array(size)` to create an array with `undefined` elements.
- Use Array.join(separator) to concatenate array elements with the specified separator, while `undefined` elements get converted to empty string.

```js
const concatNtimes = (input, N) => new Array(N+1).join(input)
```

```js
concatNtimes("foo",3); // "foofoofoo"
concatNtimes("HO",4); // "HOHOHOHO"
```
