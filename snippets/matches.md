---
title: matches
tags: object,intermediate
firstSeen: 2018-01-23T20:17:32+02:00
lastUpdated: 2020-11-03T22:11:18+02:00
---

Compares two objects to determine if the first one contains equivalent property values to the second one.

- Use `Object.keys()` to get all the keys of the second object.
- Use `Array.prototype.every()`, `Object.prototype.hasOwnProperty()` and strict comparison to determine if all keys exist in the first object and have the same values.

```js
const matches = (obj, source) =>
  Object.keys(source).every(
    key => obj.hasOwnProperty(key) && obj[key] === source[key]
  );
```

```js
matches({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true });
// true
matches({ hair: 'long', beard: true }, { age: 25, hair: 'long', beard: true });
// false
```
