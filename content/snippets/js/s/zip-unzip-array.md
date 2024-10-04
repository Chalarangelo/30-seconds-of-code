---
title: How can I zip and unzip arrays in JavaScript?
shortTitle: Zip or unzip arrays
language: javascript
tags: [array]
cover: new-york-skyline
excerpt: Learn how to implement array zipping, a grouping of elements based on position in the original arrays, and its inverse, unzipping.
listed: true
dateModified: 2024-01-11
---

Zipping two or more arrays refers to **combining their elements into a single array of arrays**. As it sounds pretty vague, let's look at an example:

```js
const arrays = ['a', 'b'], [1, 2], [true, false];
const zipped = [['a', 1, true], ['b', 2, false]]
```

As you can see, this first array in this example contains all the first elements of the original arrays, the second array contains all the second elements, and so on.

## Zip arrays

Zipping requires the creation of an array with the **length of the longest array** in the arguments. We can use `Math.max()` and the spread operator (`...`) to get the longest subarray in the array and `Array.from()` to create an array of appropriate length.

Then, using `Array.prototype.map()`, we can create an **array for each element** of the new array. The length of each array is the **number of arguments** passed to the function. Using the last argument in `Array.from()`, we can map over the **indices of the original arrays** and create a new array with the elements at that index.

```js
const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
  });
};

zip(['a', 'b'], [1, 2], [true, false]); // [['a', 1, true], ['b', 2, false]]
zip(['a'], [1, 2], [true, false]); // [['a', 1, true], [undefined, 2, false]]
```

## Unzip arrays

The inverse of zipping is unzipping, which converts the array of arrays back into separate arrays. We can use `Math.max()` and the spread operator (`...`) to get the **longest subarray** in the array and `Array.from()` to create an array of appropriate length.

Then, using `Array.prototype.reduce()` and `Array.prototype.forEach()`, we can **map grouped values to individual arrays**, by pushing each value to the **array at the same index**.

```js
const unzip = arr =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  );

unzip([['a', 1, true], ['b', 2, false]]); // [['a', 'b'], [1, 2], [true, false]]
unzip([['a', 1, true], ['b', 2]]); // [['a', 'b'], [1, 2], [true]]
```

## Zip array into object

If you want to zip an array into an object, you can use a similar technique to the one used for zipping arrays. The only difference is that you need to use `Array.prototype.reduce()` to **assign the key-value pairs** to the object.

```js
const zipObject = (props, values) =>
  props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {});

zipObject(['a', 'b', 'c'], [1, 2]); // {a: 1, b: 2, c: undefined}
zipObject(['a', 'b'], [1, 2, 3]); // {a: 1, b: 2}
```

## Unzip object into array

Unzipping an object into a pair of arrays is quite simple. You can use `Object.keys()` and `Object.values()` to **get the keys and values** of the object as arrays.

```js
const unzipObject = obj => [
  Object.keys(obj),
  Object.values(obj)
];

unzipObject({a: 1, b: 2, c: 3}); // [['a', 'b', 'c'], [1, 2, 3]]
unzipObject({a: 1, b: 2}); // [['a', 'b'], [1, 2]]
```
