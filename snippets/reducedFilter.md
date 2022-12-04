---
title: Filter matching and unspecified values
tags: array
cover: blog_images/little-bird.jpg
firstSeen: 2017-12-22T09:37:36+02:00
lastUpdated: 2020-10-22T20:24:04+03:00
---

Filters an array of objects based on a condition while also filtering out unspecified keys.

- Use `Array.prototype.filter()` to filter the array based on the predicate `fn` so that it returns the objects for which the condition returned a truthy value.
- On the filtered array, use `Array.prototype.map()` to return the new object.
- Use `Array.prototype.reduce()` to filter out the keys which were not supplied as the `keys` argument.

```js
const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );
```

```js
const data = [
  {
    id: 1,
    name: 'john',
    age: 24
  },
  {
    id: 2,
    name: 'mike',
    age: 50
  }
];
reducedFilter(data, ['id', 'name'], item => item.age > 24);
// [{ id: 2, name: 'mike'}]
```
