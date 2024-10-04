---
title: Initialize a JavaScript array with the specified values
shortTitle: Initialize array with values
language: javascript
tags: [array]
cover: flower-portrait-1
excerpt: Initialize and fill a JavaScript array with the specified values, quickly and easily.
listed: true
dateModified: 2023-12-26
---

Oftentimes, you will need to initialize an array with a given length and fill it with the same value. For example, you might want to create an array filled with `0` or `null` values. Other times, you might want to initialize an array with a repeated sequence of values. Luckily, these tasks are trivial in JavaScript.

## Initialize an array with the specified value

The simplest and most common scenario is to initialize an array with the s**ame value for all items**. We can use the `Array()` constructor to create an array of the desired length and then use `Array.prototype.fill()` to fill it with the desired value. You can set up the **default value** to `0` if you don't supply one, for convenience.

```js
const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val);

initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]
```

## Initialize an array with multiple values

A more complex scenario is to initialize an array with **multiple values**. Supplying an array of values is undesirable, as the value we want might be in itself the array. Instead, we will opt to use **rest parameters**, which will allow us to supply any number of arguments. This way, we can supply **as many values as we want** and even allow arrays to be treated as any other value.

Having decided on the interface, we can **check the length of the values** to handle each case differently. If there are **no values**, we'll still default to `0`, and **exactly one values** will be treated the same as the previous code snippet.

Finally, if **multiple values** are supplied, we will use `Array.from()` to create an array of the desired length. Then, we will use the second argument of the method to **map the array to the given values**, using the modulo (`%`) operator to cycle through them.

```js
const initializeArrayWithValues = (n, ...vals) => {
  if (vals.length === 0) return Array(n).fill(0);
  if (vals.length === 1) return Array(n).fill(vals[0]);
  return Array.from({ length: n }, (_, i) => vals[i % vals.length]);
};

initializeArrayWithValues(5); // [0, 0, 0, 0, 0]
initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]
initializeArrayWithValues(5, 2, 3); // [2, 3, 2, 3, 2]
initializeArrayWithValues(3, [2, 3]); // [[2, 3], [2, 3], [2, 3]]
```
