---
title: Compact an array or object in JavaScript
shortTitle: Compact array or object
language: javascript
tags: [array,object,recursion]
cover: basket-paper
excerpt: Learn how to compact an array or object in JavaScript using the `Boolean` function and recursion.
listed: true
dateModified: 2024-01-02
---

The term **"compact"** is used to describe the process of **removing all falsy values** from an array or object. Generally speaking, you can use the [`Boolean` function](/js/s/boolean-function) to filter out all falsy values (`false`, `null`, `0`, `''`, `undefined`, and `NaN`), compacting the array or object in the process.

## Compact an array

Compacting an **array** is as simple as using `Array.prototype.filter()` combined with the `Boolean` function.

```js
const compact = arr => arr.filter(Boolean);

compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]);
// [ 1, 2, 3, 'a', 's', 34 ]
```

## Compact an object

Compacting an **object** is fairly similar to the array, but you have to use `Object.entries()` to iterate over the object before filtering its key-value pairs.

```js
const compact = obj =>
  Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => Boolean(value))
  );

compact({ a: 0, b: 1, c: false, d: '', e: 2, f: 'a', g: 'e' * 23, h: NaN });
// { b: 1, e: 2, f: 'a' }
```

## Deep compact an array or object

Up until this point, we've only **shallowly compacted arrays and objects**. If you want to **deeply compact** an array or object, you can use **recursion** to compact all nested arrays and objects.

First, initialize the iterable data, using `Array.isArray()`, `Array.prototype.filter()` and `Boolean` for arrays in order to avoid sparse arrays. Using `Object.entries()` and `Array.prototype.reduce()`, we can iterate over each key with an appropriate initial value. We can then use `Boolean` to determine the truthiness of each key's value and add it to the accumulator if it's truthy. Finally, we can use `typeof` to determine if a given value is an `object` and call the function again to deeply compact it.

```js
const deepCompact = val => {
  const data = Array.isArray(val) ? val.filter(Boolean) : val;
  return Object.entries(data).reduce(
    (acc, [key, value]) => {
      if (Boolean(value))
        acc[key] = typeof value === 'object' ? deepCompact(value) : value;
      return acc;
    },
    Array.isArray(val) ? [] : {}
  );
};

const obj = {
  a: null,
  b: false,
  c: true,
  d: 0,
  e: 1,
  f: '',
  g: 'a',
  h: [null, false, '', true, 1, 'a', { i: 0, j: 2}],
  k: { l: 0, m: false, n: 'a', o: [0, 1] }
};
/*
{
  c: true,
  e: 1,
  g: 'a',
  h: [ true, 1, 'a', { j: 2 } ],
  k: { n: 'a', o: [1] }
}
*/
```
