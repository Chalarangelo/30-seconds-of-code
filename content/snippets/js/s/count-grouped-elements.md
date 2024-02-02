---
title: How can I group and count values in a JavaScript array?
shortTitle: Group and count values
type: story
language: javascript
tags: [array,object]
cover: tropical-waterfall
excerpt: Learn how to group and count the values of a JavaScript array using simple array methods.
dateModified: 2024-01-28
---

Finding the **count of each value** in an array can come in handy in a lot of situations. It's also fairly straightforward to implement, both for primitive and complex values, using JavaScript's `Array` methods.

## Count the occurrences of each value in an array

You can use `Array.prototype.reduce()` to create an object with the unique values of an array as keys and their **frequencies** as the values. Use the nullish coalescing operator (`??`) to initialize the value of each key to `0` if it doesn't exist and increment it by `1` every time the same value is encountered.

```js
const frequencies = arr =>
  arr.reduce((a, v) => {
    a[v] = (a[v] ?? 0) + 1;
    return a;
  }, {});

frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b']);
// { a: 4, b: 2, c: 1 }
frequencies([...'ball']);
// { b: 1, a: 1, l: 2 }
```

## Group the elements of an array based on a function

You can also **group the elements** of an array based on a given function and return the count of elements in each group. This can be useful when you want to group elements based on a specific property or a function.

To do so, you can use `Array.prototype.map()` to **map the values** of an array to a function or property name, and then use `Array.prototype.reduce()` to create an object, where the keys are produced from the mapped results.

```js
const countBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

countBy([6.1, 4.2, 6.3], Math.floor);
// {4: 1, 6: 2}
countBy(['one', 'two', 'three'], 'length');
// {3: 2, 5: 1}
countBy([{ count: 5 }, { count: 10 }, { count: 5 }], x => x.count);
// {5: 2, 10: 1}
```
