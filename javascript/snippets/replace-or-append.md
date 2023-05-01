---
title: Replace or append array value
type: snippet
tags: [array]
author: chalarangelo
cover: boutique-home-office-2
dateModified: 2023-02-19T05:00:00-04:00
---

Replaces an item in an array or appends it, if it doesn't exist.

- Use the spread operator (`...`) to create a shallow copy of the array.
- Use `Array.prototype.findIndex()` to find the index of the first element that satisfies the provided comparison function, `compFn`.
- If no such element is found, use `Array.prototype.push()` to append the new value to the array.
- Otherwise, use `Array.prototype.splice()` to replace the value at the found index with the new value.

```js
const replaceOrAppend = (arr, val, compFn) => {
  const res = [...arr];
  const i = arr.findIndex(v => compFn(v, val));
  if (i === -1) res.push(val);
  else res.splice(i, 1, val);
  return res;
};
```

```js
const people = [ { name: 'John', age: 30 }, { name: 'Jane', age: 28 } ];
const jane = { name: 'Jane', age: 29 };
const jack = { name: 'Jack', age: 28 };
replaceOrAppend(people, jane, (a, b) => a.name === b.name);
// [ { name: 'John', age: 30 }, { name: 'Jane', age: 29 } ]
replaceOrAppend(people, jack, (a, b) => a.name === b.name);
// [
//   { name: 'John', age: 30 },
//   { name: 'Jane', age: 28 },
//   { name: 'Jack', age: 28 }
// ]
```
