---
title: isSymbol
tags: type,beginner
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Checks if the given argument is a symbol.

- Use `typeof` to check if a value is classified as a symbol primitive.

```js
const isSymbol = val => typeof val === 'symbol';
```

```js
isSymbol(Symbol('x')); // true
```
