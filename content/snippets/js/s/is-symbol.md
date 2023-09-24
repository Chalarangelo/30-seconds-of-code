---
title: Value is symbol
type: snippet
language: javascript
tags: [type]
cover: naming-conventions
dateModified: 2020-09-15
---

Checks if the given argument is a symbol.

- Use `typeof` to check if a value is classified as a symbol primitive.

```js
const isSymbol = val => typeof val === 'symbol';
```

```js
isSymbol(Symbol('x')); // true
```
