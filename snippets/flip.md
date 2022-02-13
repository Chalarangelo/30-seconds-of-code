---
title: Flip function arguments
tags: function,intermediate
firstSeen: 2017-12-22T02:42:15+02:00
lastUpdated: 2021-06-13T13:50:25+03:00
---

Takes a function as an argument, then makes the first argument the last.

- Use argument destructuring and a closure with variadic arguments.
- Splice the first argument, using the spread operator (`...`), to make it the last before applying the rest.

```js
const flip = fn => (first, ...rest) => fn(...rest, first);
```

```js
let a = { name: 'John Smith' };
let b = {};
const mergeFrom = flip(Object.assign);
let mergePerson = mergeFrom.bind(null, a);
mergePerson(b); // == b
b = {};
Object.assign(b, a); // == b
```
