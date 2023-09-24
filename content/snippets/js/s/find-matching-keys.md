---
title: Find matching keys
type: snippet
language: javascript
tags: [object]
cover: beach-riders
dateModified: 2020-11-15
---

Finds all the keys in the provided object that match the given value.

- Use `Object.keys()` to get all the properties of the object.
- Use `Array.prototype.filter()` to test each key-value pair and return all keys that are equal to the given value.


```js
const findKeys = (obj, val) =>
  Object.keys(obj).filter(key => obj[key] === val);
```

```js
const ages = {
  Leo: 20,
  Zoey: 21,
  Jane: 20,
};
findKeys(ages, 20); // [ 'Leo', 'Jane' ]
```
