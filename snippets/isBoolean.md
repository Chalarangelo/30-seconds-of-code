---
title: Value is boolean
tags: type
expertise: beginner
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
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
