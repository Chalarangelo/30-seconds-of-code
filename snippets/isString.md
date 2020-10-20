---
title: isString
tags: type,string,beginner
---

Checks if the given argument is a string.
Only works for string primitives.

- Use `typeof` to check if a value is classified as a string primitive.

```js
const isString = val => typeof val === 'string';
```

```js
isString('10'); // true
```
