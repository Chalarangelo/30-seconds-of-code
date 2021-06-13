---
title: Understanding the spread and rest syntax in Javascript
type: story
tags: javascript,array,function
authors: chalarangelo
cover: blog_images/antelope.jpg
excerpt: JavaScript ES6 introduced us to several powerful features, such as the spread and rest syntax. Learn everything you need to know in this quick guide.
firstSeen: 2021-02-15T11:00:00+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

### Spread syntax

The spread operator (`...`) allows you to expand a single array into its values. Some common use-cases for the spread operator include:

- Expanding an array's values to pass them as arguments to a function that does not accept an array.
- Cloning an array by spreading its values into a new array (`[]`).
- Concatenating arrays by spreading them into a new array (`[]`).
- Flattening an array of arrays one level, by spreading nested arrays.
- Converting a non-array iterable (e.g. a string or a `Set`) to an array.

```js
// Array's values as arguments
const a = [1, 2, 3];
Math.max(...a); // 3

// Clone an array
const b = [4, 5, 6];
const c = [...b]; // c = [4, 5, 6], b !== c

// Concatenate two arrays
const d = [...a, ...b]; // d = [1, 2, 3, 4, 5, 6]

// Flatten an array
const e = [[1, 2], [3, 4]];
const f = [...e[0], ...e[1]]; // f = [1, 2, 3, 4]

// Convert iterable to array
const g = [...'hello']; // g = ['h', 'e', 'l', 'l', 'o']
```

### Rest syntax

The rest parameter syntax allows you to collapse any remaining arguments into an array. While it looks very similar to the spread operator, the rest parameter syntax is only used in function declarations (arrow or otherwise).

```js
// Rest parameter syntax, not to be confused with the spread operator
const fn = (str, ...nums) => `${str}_${nums.join('')}`;
fn('hi', 1, 2, 3); // 'hi_123', `nums` will be [1, 2, 3]

const data = [4, 5, 6];
// Spread operator, expanding the array
fn('hey', ...data); // 'hey_456', `nums` will be [4, 5, 6]
```
