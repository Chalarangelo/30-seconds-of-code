---
title: Number is primitive
tags: type
cover: blog_images/flower-camera.jpg
firstSeen: 2017-12-31T12:48:13+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
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
