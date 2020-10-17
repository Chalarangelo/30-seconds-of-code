---
title: pluck
tags: array,object,beginner
---

Converts and array of objects into an array of values by returning only the value of the specified key.

- Use `Array.prototype.map()` to map the array of objects.
- Use array-like notation to dynamically return the value, by key, from each object.

```js
const pluck = (arr, key) => arr.map((i) => i[key]);
```

```js
const simpsons = [
  { name: 'lisa', age: 8 },
  { name: 'homer', age: 36 },
  { name: 'marge', age: 34 },
  { name: 'bart', age: 10 },
];
pluck(simpsons, 'age'); // '[8, 36, 34, 10]'
```