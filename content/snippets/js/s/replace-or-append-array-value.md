---
title: Replace or append a value in a JavaScript array
shortTitle: Replace or append array value
language: javascript
tags: [array]
cover: boutique-home-office-2
excerpt: Quickly and easily replace or append a value in a JavaScript array.
listed: true
dateModified: 2024-03-23
---

When working with arrays in JavaScript, especially when dealing with objects, you might need to replace an item in the array if it already exists or append it if it doesn't. While this sounds fairly simple, it can be a bit tricky to implement.

Given a comparison function, `compFn`, you have to first **determine if the item already exists** in the array. This can be done using `Array.prototype.findIndex()`. If the item exists, you can **replace** it using `Array.prototype.splice()`. If it doesn't exist, you can **append** it using `Array.prototype.push()`.

Finally, instead of mutating the original array, you should return a **new array** with the updated item. This can be done by creating a **shallow copy** of the original array using the spread operator (`...`) at the beginning of the function.

```js
const replaceOrAppend = (arr, val, compFn) => {
  const res = [...arr];
  const i = arr.findIndex(v => compFn(v, val));
  if (i === -1) res.push(val);
  else res.splice(i, 1, val);
  return res;
};

const people = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 28 },
];
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
