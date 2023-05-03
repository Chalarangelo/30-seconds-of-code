---
title: Pluck values from array of objects
type: snippet
tags: [array,object]
cover: birds
dateModified: 2020-10-22T20:24:04+03:00
---

Converts an array of objects into an array of values corresponding to the specified `key`.

- Use `Array.prototype.map()` to map the array of objects to the value of `key` for each one.

```js
const pluck = (arr, key) => arr.map(i => i[key]);
```

```js
const simpsons = [
  { name: 'lisa', age: 8 },
  { name: 'homer', age: 36 },
  { name: 'marge', age: 34 },
  { name: 'bart', age: 10 }
];
pluck(simpsons, 'age'); // [8, 36, 34, 10]
```
