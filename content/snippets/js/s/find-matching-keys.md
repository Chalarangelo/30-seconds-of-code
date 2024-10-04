---
title: Find matching keys in a JavaScript object
shortTitle: Find matching keys
language: javascript
tags: [object]
cover: beach-riders
excerpt: Find all the keys in a JavaScript object that match the given value.
listed: true
dateModified: 2023-12-15
---

JavaScript objects are commonly used as **dictionaries**, where the keys are used to identify some values. In such cases, it is often useful to **find all the keys that match a given value or condition**.

## Find all matching keys

Using `Object.keys()`, you can get all the keys of an object as an array. You can then use `Array.prototype.filter()` to test each key-value pair and return all keys that match the given condition.

```js
const findKeys = (obj, fn) =>
  Object.keys(obj).filter(key => fn(obj[key], key, obj));

const ages = {
  Leo: 20,
  Zoey: 21,
  Jane: 20,
};
findKeys(ages, x => x === 20); // [ 'Leo', 'Jane' ]
```

If you want to simply test against a value, the implementation can be simplified to accept a single value, instead of a function. In the demonstrated generic implementation, the callback receives **three arguments** - the value, the key and the object.

## Find first matching key

Using `Array.prototype.filter()` is inefficient if you only need the first matching key. In this scenario, `Array.prototype.find()` is the better choice.

```js
const findKey = (obj, fn) =>
  Object.keys(obj).find(key => fn(obj[key], key, obj));

findKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  x => x['active']
); // 'barney'
```

## Find last matching key

Recent versions of JavaScript also added `Array.prototype.findLast()` which can be used to find the last matching key.

```js
const findLastKey = (obj, fn) =>
  Object.keys(obj).findLast(key => fn(obj[key], key, obj));

findLastKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  x => x['active']
); // 'pebbles'
```

For older JavaScript versions, you'll have to use `Array.prototype.reverse()` to reverse the order of the keys and then use `Array.prototype.find()` to find the last matching key.

> [!WARNING]
>
> JavaScript object keys are not ordered, nor is the order guaranteed to match the insertion order. If you need to rely on the order of the keys, you should most likely be using a `Map`, instead.
