---
title: Value is boolean
type: snippet
tags: [type]
cover: book-stopper
dateModified: 2020-09-15T16:28:04+03:00
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
