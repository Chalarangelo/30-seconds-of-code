---
title: How do I merge two arrays in JavaScript?
type: question
tags: javascript,array
expertise: intermediate
author: chalarangelo
cover: blog_images/arrays.jpg
excerpt: Arrays are one of the most used data types in any programming language. Learn how to merge two arrays in JavaScript with this short guide.
firstSeen: 2020-08-04T13:25:38+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

### Spread operator

The [spread operator (`...`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) was introduced in ES6 and can be used to merge two or more arrays, by spreading each one inside a new array:

```js
const a = [1, 2, 3];
const b = [4, 5, 6];

const merged = [...a, ...b]; // [1, 2, 3, 4, 5, 6]
```

### Array.prototype.concat()

[`Array.prototype.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) is a method on the `Array` prototype and can be used to create a new array, either by concatenating both arrays to a new array or one array to the other. Both methods result in a new array, without mutating the original:

```js
const a = [1, 2, 3];
const b = [4, 5, 6];

const merged = [].concat(a, b); // [1, 2, 3, 4, 5, 6]
// -- OR --
const alsoMerged = a.concat(b); // [1, 2, 3, 4, 5, 6]
```

### Comparing the two

The spread operator version is definitely shorter and as readable as the `Array.prototype.concat()` one. Apart from that, the spread operator seems to be slightly faster based on [some benchmarks I have performed](https://jsben.ch/9txyg) (as of **Aug, 2020 on Google Chrome 84** - this might or might not be the case in the future, as new optimizations land in different browsers).

However, `Array.prototype.concat()` can deal with non-array values better than the spread operator can, which might be something to consider when merging values that you are not certain are arrays:

```js
const a = [1, 2, 3];
const b = true;
const c = 'hi';

const spreadAb = [...a, ...b]; // Error: b is not iterable
const spreadAc = [...a, ...c]; // [1, 2, 3, 'h', 'i'], wrong result
// You should use [...a, b] and [...a, c] instead

const concatAb = [].concat(a, b); // [1, 2, 3, true]
const concatAb = [].concat(a, c); // [1, 2, 3, 'hi']
```

As you can see in the above example, the spread operator either throws an error or doesn't output the correct result when passed a non-iterable object. `Array.prototype.concat()` on the other hand has no trouble being passed mixed input.

So what's the verdict? Use the spread operator (`...`) whenever you know your inputs are arrays, as it performs better and is easy to read and understand. Favor `Array.prototype.concat()` when you are uncertain of one or more of the inputs and do not want to add additional checks, as it handles those cases more gracefully.
