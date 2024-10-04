---
title: Pluck values from and array of objects in JavaScript
shortTitle: Pluck values from object array
language: javascript
tags: [array,object]
cover: birds
excerpt: Learn how to extract values from an array of objects based on a specified key.
listed: true
dateModified: 2024-03-22
---

Ever wanted to **extract values from an array of objects** based on a specific key? This is pretty common and can be achieved with a simple one-liner in JavaScript.

## Pluck a single value for each object

All you need to do is use `Array.prototype.map()` to map the array of objects to the **value of the specified key** for each object.

```js
const pluck = (arr, key) => arr.map(i => i[key]);

const simpsons = [
  { name: 'Lisa', age: 8, username: 'lisa_simpson' },
  { name: 'Homer', age: 36, username: 'homer_simpson' },
  { name: 'Marge', age: 34, username: 'marge_simpson' },
  { name: 'Bart', age: 10, username: 'bart_simpson' }
];

pluck(simpsons, 'age');
// [8, 36, 34, 10]
```

## Pluck multiple values for each object

If you want to extract **multiple values** for each object, you can use a nested `map()` to iterate over the keys. This results in each object being mapped to an array of values.

```js
const pluck = (arr, keys) => arr.map(i => keys.map(k => i[k]));

const simpsons = [
  { name: 'Lisa', age: 8, username: 'lisa_simpson' },
  { name: 'Homer', age: 36, username: 'homer_simpson' },
  { name: 'Marge', age: 34, username: 'marge_simpson' },
  { name: 'Bart', age: 10, username: 'bart_simpson' }
];

pluck(simpsons, ['name', 'age']);
// [['Lisa', 8], ['Homer', 36], ['Marge', 34], ['Bart', 10]]
```

## Pluck any number of values for each object

Instead of having two separate functions for plucking a single value and multiple values, you can create a single function that accepts a **variable number of keys**. This way, you can pluck any number of values for each object.

In order to do so, you can use the rest argument syntax (`...keys`) to collect all the keys into an array. Then, you can **check the length** of the keys array to determine whether to return **single or multiple values**.

```js
const pluck = (arr, ...keys) =>
  keys.length > 1 ?
    arr.map(i => keys.map(k => i[k])) :
    arr.map(i => i[keys[0]]);

const simpsons = [
  { name: 'Lisa', age: 8, username: 'lisa_simpson' },
  { name: 'Homer', age: 36, username: 'homer_simpson' },
  { name: 'Marge', age: 34, username: 'marge_simpson' },
  { name: 'Bart', age: 10, username: 'bart_simpson' }
];

pluck(simpsons, 'age');
// [8, 36, 34, 10]

pluck(simpsons, 'name', 'age');
// [['Lisa', 8], ['Homer', 36], ['Marge', 34], ['Bart', 10]]
```
