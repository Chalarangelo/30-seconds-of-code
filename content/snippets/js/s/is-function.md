---
title: Value is function
type: snippet
language: javascript
tags: [type,function]
cover: boulder-beach
dateModified: 2020-09-15
---

Checks if the given argument is a function.

- Use `typeof` to check if a value is classified as a function primitive.

```js
const isFunction = val => typeof val === 'function';
```

```js
isFunction('x'); // false
isFunction(x => x); // true
```
