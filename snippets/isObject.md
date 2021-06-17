---
title: isObject
tags: type,object,beginner
firstSeen: 2018-01-11T12:24:06+02:00
lastUpdated: 2021-01-08T00:23:44+02:00
---

Checks if the passed value is an object or not.

- Uses the `Object` constructor to create an object wrapper for the given value.
- If the value is `null` or `undefined`, create and return an empty object.
- Otherwise, return an object of a type that corresponds to the given value.

```js
const isObject = obj => obj === Object(obj);
```

```js
isObject([1, 2, 3, 4]); // true
isObject([]); // true
isObject(['Hello!']); // true
isObject({ a: 1 }); // true
isObject({}); // true
isObject(true); // false
```
