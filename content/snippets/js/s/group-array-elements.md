---
title: Group array elements based on a function
shortTitle: Group array elements
language: javascript
tags: [array,object]
cover: man-cup-laptop
excerpt: Group the elements of an array based on the given function, producing an object with the grouped values.
listed: true
dateModified: 2024-07-13
---

While JavaScript has a lot of built-in methods for working with arrays, sometimes you need to craft your own solutions to fit specific requirements. One such requirement is to **group array elements** based on a specific function or property.

Using `Array.prototype.reduce()`, one can easily perform grouping operations on an array, using an **object** as the accumulator. Each value iterated over will determine the **key** under which it should be stored in the resulting object.

Then, knowing the key, `Array.prototype.concat()` can be used to add the value to the corresponding array in the object. If the key doesn't exist yet, a new array is created with the value as the first element.

In order to make the function more versatile, it accepts either a **function** or a **property name** as the grouping criterion. If a function is provided, it will be called with the value, index, and array as arguments. If a property name is provided, the value will be accessed using that property.

```js
const groupBy = (arr, fn) =>
  arr.reduce((acc, val, i) => {
    const key = typeof fn === 'function' ? fn(val, i, arr) : val[fn];
    acc[key] = (acc[key] || []).concat(arr[i]);
    return acc;
  }, {});

groupBy([6.1, 4.2, 6.3], Math.floor);
// { 4: [4.2], 6: [6.1, 6.3] }
groupBy(['one', 'two', 'three'], 'length');
// { 3: ['one', 'two'], 5: ['three'] }
```
