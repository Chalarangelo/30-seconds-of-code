---
title: Find the most frequent element in a JavaScript array
shortTitle: Most frequent array element
language: javascript
tags: [array]
cover: collab-desk-1
excerpt: Find the most frequently occurring element in a JavaScript array of primitives or objects.
listed: true
dateModified: 2024-03-23
---

Finding the **most frequent element** in an array can be useful in many scenarios. The good news is that it's fairly easy to implement both for primitive and object values using JavaScript's array methods.

> [!NOTE]
>
> If you want to find the **frequency of each value** in an array instead, check [how to group and count values in a JavaScript array](/js/s/count-grouped-elements).

## Most frequent element in an array of primitives

Primitive values are easy to compare and count the frequency of. All you have to do is use `Array.prototype.reduce()` to create an **object** with the unique values of the array as keys and their frequencies as values.

Notice how you can use the nullish coalescing operator (`??`) to **initialize** the value of each key to `0` if it doesn't exist and **increment** it by `1` every time the same value is encountered.

Finally, you can use `Object.entries()` and `Array.prototype.reduce()` again to find the most frequent value.

```js
const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = (a[v] ?? 0) + 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'
```

## Most frequent element in an array of objects

When dealing with **objects**, you can use the same approach, but you'll need a **mapping function** to extract the value you want to compare. As primitive values can be compared using the `===` operator, you can provide a **default mapping function** that returns the value itself. This allows for the same implementation to work with both primitive and object values. Apart from this change, the implementation is the same.

```js
const mostFrequent = (arr, mapFn = x => x) =>
  Object.entries(
    arr.reduce((a, v) => {
      const k = mapFn(v);
      a[k] = (a[k] ?? 0) + 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

const people = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 28 },
  { name: 'John', age: 30 },
];
mostFrequent(people, p => p.age); // '30'

const nums = [1, 2, 3, 1, 2, 1];
mostFrequent(nums); // '1'
```

## A more robust implementation, using `Map`

Both of the previous implementations suffer from the same issue: **the resulting value is always a string**, even if the original values were of a different type. To address this, you can use a `Map` to store the frequencies and then find the most frequent value, as keys in a `Map` can be of any type.

The only changes you need to make to the previous implementation is to create a `Map` as the **accumulator** of `Array.prototype.reduce()` and use `Map.prototype.get()` and `Map.prototype.set()` to interact with it. Finally, you can use the spread operator (`...`) to convert the `Map` to an array and find the most frequent value, instead of using `Object.entries()`.

```js
const mostFrequent = (arr, mapFn = x => x) =>
  [
    ...arr.reduce((a, v) => {
      const k = mapFn(v);
      a.set(k, (a.get(k) ?? 0) + 1);
      return a;
    }, new Map()),
  ].reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

const people = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 28 },
  { name: 'John', age: 30 },
];
mostFrequent(people, p => p.age); // 30

const nums = [1, 2, 3, 1, 2, 1];
mostFrequent(nums); // 1
```
