---
title: Toggle element in a JavaScript array
shortTitle: Toggle array element
language: javascript
tags: [array]
cover: digital-nomad-7
excerpt: Remove an element from an array if it's included in the array, or push it to the array if it isn't.
listed: true
dateModified: 2024-03-23
---

I've often found myself needing to toggle - add or remove - an element in an array based on its presence. While JavaScript has no built-in method for this, it's pretty simple to implement.

## Remove or append an element in an array of primitives

Using `Array.prototype.includes()`, you can **check if the element is already in the array**. If it is, you can use `Array.prototype.filter()` to **remove** it. If it's not, you can use the spread operator (`...`) to **append** it to the array.

Given that both branches of the ternary operator create **shallow clones**, neither case mutates the original array, instead returning a **new array** with the desired changes.

```js
const toggleElement = (arr, val) =>
  arr.includes(val) ? arr.filter(el => el !== val) : [...arr, val];

toggleElement([1, 2, 3], 2); // [1, 3]
toggleElement([1, 2, 3], 4); // [1, 2, 3, 4]
```

## Remove or append an element in an array of objects

When working with arrays of objects, you can use a similar approach. However, you'll need to provide a **comparison function** to determine if the object already exists in the array.

Given a comparison function, `compFn`, you can use `Array.prototype.filter()` to **remove** any matching objects. Then, using `Array.prototype.length`, you can determine if the object was removed and **append** it using the spread operator (`...`), if necessary.

Adding a default value for the `compFn` parameter allows you to use the `===` operator by default, which in turn allows you to **omit the comparison function** when working with arrays of primitives.

```js
const idComparator = (a, b) => a === b;

const toggleElement = (arr, val, compFn = idComparator) => {
  const res = arr.filter(v => !compFn(v, val));
  if (res.length === arr.length) res.push(val);
  return res;
};

const nums = [1, 2, 3];
toggleElement(nums, 2); // [1, 3]
toggleElement(nums, 4); // [1, 2, 3, 4]

const john = { name: 'John', age: 30 };
const jane = { name: 'Jane', age: 28 };
const jack = { name: 'Jack', age: 28 };
const people = [john, jane];
const nameComparator = (a, b) => a.name === b.name;

toggleElement(people, jane, nameComparator);
// [ { name: 'John', age: 30 } ]

toggleElement(people, jack, nameComparator);
// [
//   { name: 'John', age: 30 },
//   { name: 'Jane', age: 28 },
//   { name: 'Jack', age: 28 }
// ]
```
