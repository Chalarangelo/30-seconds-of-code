---
title: Find matching keys
tags: object
cover: blog_images/beach-riders.jpg
firstSeen: 2020-10-25T09:59:13+02:00
lastUpdated: 2020-11-15T14:43:44+02:00
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
