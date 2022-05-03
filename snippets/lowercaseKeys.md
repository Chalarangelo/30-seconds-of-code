---
title: Lowercase object keys
tags: object
expertise: intermediate
cover: blog_images/forest-balcony.jpg
firstSeen: 2017-12-29T13:28:18+02:00
lastUpdated: 2020-10-20T11:21:07+03:00
---

Creates a new object from the specified object, where all the keys are in lowercase.

- Use `Object.keys()` and `Array.prototype.reduce()` to create a new object from the specified object.
- Convert each key in the original object to lowercase, using `String.prototype.toLowerCase()`.

```js
const lowercaseKeys = obj =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});
```

```js
const myObj = { Name: 'Adam', sUrnAME: 'Smith' };
const myObjLower = lowercaseKeys(myObj); // {name: 'Adam', surname: 'Smith'};
```
