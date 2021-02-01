---
title: Where and how can I use the destructuring assignment syntax in JavaScript?
type: question
tags: javascript,array,object
authors: chalarangelo
cover: blog_images/building-blocks.jpg
excerpt: Learn the basics of the destructuring assignment syntax in JavaScript ES6 and improve your code with this easy guide.
---

The destructuring assignment syntax, first introduced in JavaScript ES6, allows the unpacking of values from arrays and objects into distinct variables. While it might seem intimidating at first, it's actually quite easy to learn and use. Let's break it down into easier to understand cases.

### Array destructuring

Destructuring an array is very straightforward. All you have to do is declare a variable for each value in the sequence. You can define fewer variables than there are indexes in the array (i.e. if you only want to unpack the first few values), skip some indexes or even use the rest pattern to unpack any remaining values into a new array.

```js
const nums = [ 3, 6, 9, 12, 15 ];
const [
  k,              // k = 3
  l,              // l = 6
  ,               // Skip a value (12)
  ...n            // n = [12, 15]
] = nums;
```

### Object destructuring

Object destructuring is pretty similar to array destructuring, the main difference being that you can reference each key in the object by name, creating a variable with the same name. Additionally, you can also unpack a key to a new variable name, unpack only the keys you need and use the rest pattern to unpack remaining keys into a new object.

```js
const obj = { a: 1, b: 2, c: 3, d: 4 };
const {
  a,              // a = 1
  c: d,           // d = 3
  ...rest         // rest = { b: 2, d: 4 }
} = obj;
```

### Nested destructuring

Nested objects and arrays can be unpacked by following the same rules. The difference here is that you can unpack nested keys or values directly to variables without having to store the parent object in a variable itself.

```js
const nested = { a: { b: 1, c: 2 }, d: [1, 2]};
const {
  a: {
    b: f,         // f = 1
    ...g          // g = { c: 2 }
  },
  ...h            // h = { d: [1, 2]}
} = nested;
```

### Advanced destructuring

As arrays act much like objects, it's possible to use the destructuring assignment syntax to get specific values from an array by using the index as a key in an object destructuring assignment. Additionally, using this method, you can get other properties of the array (e.g. its `length`). Finally, you can also define default values for variables in a destructuring assignment, in case the unpacked value is `undefined`.

```js
const arr = [ 5, 'b', 4, 'd', 'e', 'f', 2 ];
const {
  6: x,           // x = 2
  0: y,           // y = 5
  2: z,           // z = 4
  length: count,  // count = 7
  name = 'array', // name = 'array' (not present in arr)
  ...restData     // restData = { '1': 'b', '3': 'd', '4': 'e', '5': 'f' }
} = arr;
```

**Image credit:** [Xavi Cabrera](https://unsplash.com/@xavi_cabrera?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
