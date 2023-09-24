---
title: Value is boolean
type: snippet
language: javascript
tags: [type]
cover: book-stopper
dateModified: 2020-09-15
---

Checks if the given argument is a native boolean element.

- Use `typeof` to check if a value is classified as a boolean primitive.

```js
const isBoolean = val => typeof val === 'boolean';
```

```js
isBoolean(null); // false
isBoolean(false); // true
```
