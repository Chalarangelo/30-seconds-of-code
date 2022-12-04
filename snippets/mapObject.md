---
title: Map array to object
tags: array,object
cover: blog_images/two-lighthouses.jpg
firstSeen: 2017-12-18T12:11:58+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Maps the values of an array to an object using a function.

- Use `Array.prototype.reduce()` to apply `fn` to each element in `arr` and combine the results into an object.
- Use `el` as the key for each property and the result of `fn` as the value.

```js
const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});
```

```js
mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }
```
