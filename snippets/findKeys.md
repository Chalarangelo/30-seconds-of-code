---
title: findKeys
tags: object,beginner
---

Return all the keys in the provided object that match the given value.

- Use `Object.keys(object)` to get all the properties of the object.
- Use `Array.prototype.filter()` to test each key-value pair and return all keys that equal to the given value.


```js
const findKeys = (object, value) =>
  Object.keys(object).filter(key => object[key] === value);
```

```js
const ages = {
  "Leo" : 20,
  "Zoey" : 21,
  "Jane" : 20
};

findKeys(ages, 20); // [ "Leo", "Jane" ]
```
