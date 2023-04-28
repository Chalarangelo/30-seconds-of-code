---
title: Value is symbol
type: snippet
tags: [type]
cover: naming-conventions
dateModified: 2020-09-15T16:28:04+03:00
---

Checks if the given argument is a symbol.

- Use `typeof` to check if a value is classified as a symbol primitive.

```js
const isSymbol = val => typeof val === 'symbol';
```

```js
isSymbol(Symbol('x')); // true
```
