---
title: Value is plain object
type: snippet
language: javascript
tags: [type,object]
cover: yellow-white-mug-1
dateModified: 2020-10-20
---

Checks if the provided value is an object created by the Object constructor.

- Check if the provided value is truthy.
- Use `typeof` to check if it is an object and `Object.prototype.constructor` to make sure the constructor is equal to `Object`.

```js
const isPlainObject = val =>
  !!val && typeof val === 'object' && val.constructor === Object;
```

```js
isPlainObject({ a: 1 }); // true
isPlainObject(new Map()); // false
```
