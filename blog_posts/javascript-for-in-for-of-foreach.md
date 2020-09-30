---
title: What is the difference between JavaScript's for...in, for...of and forEach?
type: question
tags: javascript,array,object,iterator
authors: chalarangelo
cover: blog_images/javascript-for-in-for-of-foreach.jpg
excerpt: Learn the differences between the three most commonly used iteration methods offered by JavaScript, which often confuse beginners and veterans alike.
---

`for...in` is used to iterate over all enumerable properties of an object, including inherited enumerable properties.
This iteration statement can be used with arrays strings or plain objects, but not with `Map` or `Set` objects.

```js
for (let prop in ['a', 'b', 'c'])
  console.log(prop);            // 0, 1, 2 (array indexes)

for (let prop in 'str')
  console.log(prop);            // 0, 1, 2 (string indexes)

for (let prop in {a: 1, b: 2, c: 3})
  console.log(prop);            // a, b, c (object property names)

for (let prop in new Set(['a', 'b', 'a', 'd']))
  console.log(prop);            // undefined (no enumerable properties)
```

`for...of` is used to iterate over iterable objects, iterating over their values instead of their properties.
This iteration statement can be used with arrays, strings, `Map` or `Set` objects, but not with plain objects.

```js
for (let val of ['a', 'b', 'c'])
  console.log(val);            // a, b, c (array values)

for (let val of 'str')
  console.log(val);            // s, t, r (string characters)

for (let val of {a: 1, b: 2, c: 3})
  console.log(prop);           // TypeError (not iterable)

for (let val of new Set(['a', 'b', 'a', 'd']))
  console.log(val);            // a, b, d (Set values)
```

Finally, `forEach()` is a method of the `Array` prototype, which allows you to iterate over the elements of an array.
While `forEach()` only iterates over arrays, it can access both the value and the index of each element while iterating.

```js
['a', 'b', 'c'].forEach(
  val => console.log(val)     // a, b, c (array values)
);

['a', 'b', 'c'].forEach(
  (val, i) => console.log(i)  // 0, 1, 2 (array indexes)
);
```

**Image credit:** [Tim Stief](https://unsplash.com/@timstief?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
