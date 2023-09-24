---
title: Number is primitive
type: snippet
language: javascript
tags: [type]
cover: flower-camera
dateModified: 2020-10-22
---

Checks if the passed value is primitive or not.

- Create an object from `val` and compare it with `val` to determine if the passed value is primitive (i.e. not equal to the created object).

```js
const isPrimitive = val => Object(val) !== val;
```

```js
isPrimitive(null); // true
isPrimitive(undefined); // true
isPrimitive(50); // true
isPrimitive('Hello!'); // true
isPrimitive(false); // true
isPrimitive(Symbol()); // true
isPrimitive([]); // false
isPrimitive({}); // false
```
