---
title: isEmpty
tags: type,array,object,string,beginner
firstSeen: 2018-01-23T19:25:17+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Checks if the a value is an empty object/collection, has no enumerable properties or is any type that is not considered a collection.

- Check if the provided value is `null` or if its `length` is equal to `0`.

```js
const isEmpty = val => val == null || !(Object.keys(val) || val).length;
```

```js
isEmpty([]); // true
isEmpty({}); // true
isEmpty(''); // true
isEmpty([1, 2]); // false
isEmpty({ a: 1, b: 2 }); // false
isEmpty('text'); // false
isEmpty(123); // true - type is not considered a collection
isEmpty(true); // true - type is not considered a collection
```
