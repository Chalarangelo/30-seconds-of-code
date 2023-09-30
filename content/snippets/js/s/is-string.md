---
title: Value is string
type: snippet
language: javascript
tags: [type,string]
cover: overgrown
dateModified: 2020-10-20
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
